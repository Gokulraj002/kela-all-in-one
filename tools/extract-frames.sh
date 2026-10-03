#!/bin/bash
# extract-frames.sh — convert every design's hero-loop.mp4 into a lightweight
# scroll-scrubbed JPG frame sequence (72 frames, 640px wide).
# Usage: ./tools/extract-frames.sh [category-slug ...]
# With no args, processes all 9 video categories.
set -euo pipefail

ATELIER="$(cd "$(dirname "$0")/.." && pwd)"
CATS="${*:-coffee ecommerce fashion technology agency hotel restaurant realestate travel}"
FRAMES=72
W=640

total_before=0
total_after=0

for cat in $CATS; do
  for d in "$ATELIER/src/templates/$cat"/design-*/; do
    [ -d "$d" ] || continue
    id="$(basename "$d")"
    mp4="$d/assets/hero-loop.mp4"
    [ -f "$mp4" ] || { echo "SKIP $id (no hero-loop.mp4)"; continue; }
    outdir="$d/assets/frames"
    if [ -f "$outdir/frame-072.jpg" ]; then
      echo "SKIP $id (frames exist)"
      continue
    fi
    dur="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$mp4" 2>/dev/null || echo 10)"
    fps="$(awk -v f="$FRAMES" -v d="$dur" 'BEGIN{printf "%.4f", f/d}')"
    mkdir -p "$outdir"
    ffmpeg -v error -y -i "$mp4" -vf "fps=$fps,scale=$W:-2" -q:v 4 "$outdir/frame-%03d.jpg"
    # Normalize to exactly FRAMES files (pad or trim edge cases)
    count="$(ls "$outdir"/frame-*.jpg | wc -l)"
    if [ "$count" -lt "$FRAMES" ]; then
      last="$(ls "$outdir"/frame-*.jpg | tail -1)"
      for i in $(seq $((count+1)) "$FRAMES"); do
        cp "$last" "$(printf "$outdir/frame-%03d.jpg" "$i")"
      done
    elif [ "$count" -gt "$FRAMES" ]; then
      ls "$outdir"/frame-*.jpg | tail -n +"$((FRAMES+1))" | xargs rm -f
    fi
    before="$(stat -c%s "$mp4")"
    after="$(du -sb "$outdir" | cut -f1)"
    total_before=$((total_before + before))
    total_after=$((total_after + after))
    echo "OK $id: $(numfmt --to=iec "$before") mp4 -> $(numfmt --to=iec "$after") frames ($FRAMES)"
  done
done

echo "----------------------------------------"
echo "TOTAL video bytes: $(numfmt --to=iec "$total_before")"
echo "TOTAL frame bytes: $(numfmt --to=iec "$total_after")"
