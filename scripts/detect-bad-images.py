#!/usr/bin/env python3
"""
Detecta imagenes WebP donde rembg fallo:
- Demasiado transparente (rembg borro el frasco entero): < 5% pixels visibles
- Demasiado opaco (rembg no quito el fondo): > 95% pixels visibles

Para cada caso, imprime el slug. El JS posterior elimina la image
de los que fallaron para que caigan al SVG placeholder por familia.
"""

from PIL import Image
from pathlib import Path
import sys

DIR = Path(__file__).resolve().parent.parent / "public" / "photos" / "perfumes-clean-webp"

bad_empty = []
bad_full = []
ok = 0

for f in sorted(DIR.glob("*.webp")):
    try:
        img = Image.open(f).convert("RGBA")
        # alpha channel
        alpha = img.split()[3]
        # count pixels > 32 (no completely transparent)
        visible = sum(1 for p in alpha.getdata() if p > 32)
        total = alpha.size[0] * alpha.size[1]
        ratio = visible / total

        slug = f.stem
        if ratio < 0.08:
            bad_empty.append((slug, ratio))
        elif ratio > 0.85:
            bad_full.append((slug, ratio))
        else:
            ok += 1
    except Exception as e:
        print(f"err {f.name}: {e}", file=sys.stderr)

print(f"OK: {ok}")
print(f"VACIAS ({len(bad_empty)}): rembg elimino frasco entero")
for s, r in bad_empty:
    print(f"  {s}  ({r*100:.1f}%)")
print(f"LLENAS ({len(bad_full)}): rembg no quito fondo")
for s, r in bad_full:
    print(f"  {s}  ({r*100:.1f}%)")
