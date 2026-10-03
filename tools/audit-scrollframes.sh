#!/bin/bash
# audit-scrollframes.sh — verify the video→ScrollFrames conversion across all designs.
# Usage: ./tools/audit-scrollframes.sh [category ...]  (default: all 9 video categories)
# Exit 0 = all checks pass. Any FAIL line = must fix.
set -uo pipefail
ATELIER="$(cd "$(dirname "$0")/.." && pwd)"
CATS="${*:-coffee ecommerce fashion technology agency hotel restaurant realestate travel}"
fail=0
pass=0

chk() { # chk <design-id> <ok:1/0> <message>
  if [ "$2" = 1 ]; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL [$1] $3"; fi
}

for cat in $CATS; do
  for d in "$ATELIER/src/templates/$cat"/design-*/; do
    [ -d "$d" ] || continue
    id="$(basename "$d")"
    # 1. frames present
    nframes="$(ls "$d/assets/frames"/frame-*.jpg 2>/dev/null | wc -l)"
    chk "$id" "$([ "$nframes" -ge 60 ] && echo 1 || echo 0)" "only $nframes frames (need >=60)"
    # 2. mp4 gone
    chk "$id" "$([ ! -f "$d/assets/hero-loop.mp4" ] && echo 1 || echo 0)" "hero-loop.mp4 still on disk"
    # 3. no dangling references
    refs="$(grep -rl "hero-loop\|LoopVideo" "$d" --include="*.jsx" --include="*.js" 2>/dev/null | wc -l)"
    chk "$id" "$([ "$refs" -eq 0 ] && echo 1 || echo 0)" "$refs files still reference hero-loop/LoopVideo"
    # 4. ScrollFrames wired
    uses="$(grep -l "ScrollFrames" "$d/index.jsx" 2>/dev/null | wc -l)"
    chk "$id" "$([ "$uses" -eq 1 ] && echo 1 || echo 0)" "ScrollFrames not used in index.jsx"
    glob="$(grep -c "import.meta.glob" "$d/index.jsx" 2>/dev/null || echo 0)"
    chk "$id" "$([ "$glob" -ge 1 ] && echo 1 || echo 0)" "import.meta.glob missing in index.jsx"
    # 5. contract: no :root SELECTOR (word mentions inside comments are fine)
    root="$(grep -rEn "^\s*:root(\s*|\s*[{,]" "$d" --include="*.css" 2>/dev/null | wc -l)"
    chk "$id" "$([ "$root" -eq 0 ] && echo 1 || echo 0)" ":root write in css"
    # 6. export zip fresh and correct
    zip="$ATELIER/public/downloads/$id-source.zip"
    if [ -f "$zip" ]; then
      zframes="$(unzip -l "$zip" 2>/dev/null | grep -c "assets/frames/frame-")"
      chk "$id" "$([ "$zframes" -ge 60 ] && echo 1 || echo 0)" "export zip has only $zframes frames"
      zmp4="$(unzip -l "$zip" 2>/dev/null | grep -c "hero-loop.mp4" || true)"
      chk "$id" "$([ "$zmp4" -eq 0 ] && echo 1 || echo 0)" "export zip still contains hero-loop.mp4"
      zsf="$(unzip -l "$zip" 2>/dev/null | grep -c "_shared/ScrollFrames.jsx" || true)"
      chk "$id" "$([ "$zsf" -ge 1 ] && echo 1 || echo 0)" "export zip missing _shared/ScrollFrames.jsx"
    else
      chk "$id" 0 "export zip missing: $id-source.zip"
    fi
  done
done

echo "----------------------------------------"
echo "PASS: $pass   FAIL: $fail"
[ "$fail" = 0 ]
