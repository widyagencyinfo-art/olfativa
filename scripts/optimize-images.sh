#!/bin/bash
# Optimiza los PNGs sin fondo (rembg) convirtiendolos a WebP a 800x800
# con calidad 82 y alpha-quality 80. Reduce tamano ~80% manteniendo
# la calidad visual y la transparencia.

set -e

IN_DIR="public/photos/perfumes-clean"
OUT_DIR="public/photos/perfumes-clean-webp"
mkdir -p "$OUT_DIR"

count=0
for f in "$IN_DIR"/*.png; do
  base=$(basename "$f" .png)
  out="$OUT_DIR/$base.webp"
  if [ -f "$out" ]; then
    continue
  fi
  cwebp -quiet -q 82 -alpha_q 80 -resize 800 0 "$f" -o "$out"
  count=$((count + 1))
  if [ $((count % 30)) -eq 0 ]; then
    echo "  $count procesados..."
  fi
done

echo "Total convertidos: $count"
du -sh "$OUT_DIR"
