#!/usr/bin/env python3
"""
Recentra cada imagen WebP del catalogo:
1. Detecta el bounding box de los pixels no transparentes (el frasco)
2. Recorta a ese bbox
3. Pega el bbox centrado en un canvas cuadrado del mismo tamaño que
   el lado mayor + padding uniforme

Resultado: cada frasco queda perfectamente centrado horizontal y
verticalmente en su canvas. Independiente de donde estuviera en la
foto original.
"""

from PIL import Image
from pathlib import Path
import sys

SRC_DIR = Path(__file__).resolve().parent.parent / "public" / "photos" / "perfumes-clean-webp"
DST_DIR = SRC_DIR  # reemplaza in-place

ALPHA_THRESHOLD = 25
PADDING_PCT = 0.08  # 8% padding alrededor del frasco

count = 0
skipped = 0
errors = 0

for f in sorted(SRC_DIR.glob("*.webp")):
    try:
        img = Image.open(f).convert("RGBA")
        alpha = img.split()[3]
        # bbox de alpha > threshold
        bbox = None
        w, h = img.size
        pixels = alpha.load()
        # rapido: pasar fila a fila buscando primer/ultimo no transparente
        min_x, min_y, max_x, max_y = w, h, 0, 0
        for y in range(h):
            for x in range(w):
                if pixels[x, y] > ALPHA_THRESHOLD:
                    if x < min_x: min_x = x
                    if y < min_y: min_y = y
                    if x > max_x: max_x = x
                    if y > max_y: max_y = y

        if min_x >= max_x or min_y >= max_y:
            # imagen toda transparente, saltar
            skipped += 1
            continue

        # Recorta al bbox
        crop = img.crop((min_x, min_y, max_x + 1, max_y + 1))
        cw, ch = crop.size

        # Canvas cuadrado del lado mayor + padding
        side = max(cw, ch)
        pad = int(side * PADDING_PCT)
        canvas_size = side + pad * 2

        canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
        # Centrado
        off_x = (canvas_size - cw) // 2
        off_y = (canvas_size - ch) // 2
        canvas.paste(crop, (off_x, off_y), crop)

        # Resize a 800x800 manteniendo aspecto cuadrado
        canvas.thumbnail((800, 800), Image.LANCZOS)

        # Guardar como WebP
        canvas.save(f, "WEBP", quality=85, method=6)
        count += 1
        if count % 30 == 0:
            print(f"  {count} procesados...")
    except Exception as e:
        errors += 1
        print(f"err {f.name}: {e}", file=sys.stderr)

print(f"\nRecentrados: {count}")
print(f"Saltados (transparente): {skipped}")
print(f"Errores: {errors}")
