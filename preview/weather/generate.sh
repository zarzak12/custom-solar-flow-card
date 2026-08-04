#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# Génère un aperçu PNG du rendu ciel/météo canvas (mode single)
# pour chaque condition possible. Ré-extrait le renderer depuis
# le bundle courant à CHAQUE exécution (reste synchro avec le code).
# Les images de sortie portent des noms fixes → annulées et remplacées
# à chaque passage.
#
# Usage :  bash preview/weather/generate.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"          # .../preview/weather
ROOT="$(cd "$HERE/../.." && pwd)"              # racine du projet
BUNDLE="$ROOT/dist/solar-flow-card.js"

# Navigateur headless (Chrome puis Edge en repli)
CHROME=""
for p in \
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
  "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" \
  "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
  "/c/Program Files/Microsoft/Edge/Application/msedge.exe"; do
  [ -f "$p" ] && CHROME="$p" && break
done
[ -z "$CHROME" ] && { echo "Aucun navigateur headless trouvé (Chrome/Edge)."; exit 1; }

# /c/x/y → C:/x/y (URL et --screenshot attendus en chemin Windows)
winpath() { echo "$1" | sed 's#^/\([a-zA-Z]\)/#\1:/#'; }

# 1) Ré-extraction du renderer depuis le bundle
node -e '
  const fs=require("fs");
  const src=fs.readFileSync(process.argv[1],"utf8");
  const start=src.indexOf("const SFC_QUALITY_PRESETS");
  const marker=src.indexOf("//  SOLAR FLOW CARD ELEMENT");
  const end=src.lastIndexOf("// ═", marker);
  if(start<0||end<0){console.error("Bornes du renderer introuvables");process.exit(1);}
  let block=src.slice(start,end);
  block+="\nwindow.SfcSceneRenderer=SfcSceneRenderer;\nwindow.sfcConditionToScene=sfcConditionToScene;\n";
  fs.writeFileSync(process.argv[2],block);
' "$BUNDLE" "$HERE/renderer.js"
echo "Renderer ré-extrait depuis le bundle."

HTML_URL="file:///$(winpath "$HERE/render.html")"
W=1024; H=800

# 2) Cas météo : nom|cond|elev|az|img|wind|cover|flash
CASES="
jour-beau|sunny|35|150|grid|10|5|0
jour-golden-lever|sunny|2|92|grid|8|5|0
jour-golden-coucher|sunny|2|255|grid|8|5|0
jour-partiel-nuageux|partlycloudy|28|160|grid|18|40|0
jour-couvert|cloudy|22|180|grid|20|90|0
jour-pluie|rainy|18|200|grid|24|85|0
jour-averse|pouring|15|205|grid|35|100|0
jour-orage|lightning-rainy|14|210|grid|30|100|1
jour-neige|snowy|14|170|grid|12|95|0
jour-gresil|snowy-rainy|15|190|grid|20|100|0
jour-grele|hail|16|190|grid|25|100|0
jour-brouillard|fog|12|180|grid|5|100|0
jour-vent|windy|26|220|grid|55|15|0
nuit-beau|clear-night|-25|270|night|8|5|0
nuit-partiel-nuageux|partlycloudy|-25|270|night|15|40|0
nuit-pluie|rainy|-25|270|night|22|85|0
nuit-orage|lightning-rainy|-25|270|night|28|100|1
nuit-neige|snowy|-25|270|night|12|95|0
"

n=0
while IFS='|' read -r name cond elev az img wind cover flash; do
  [ -z "${name:-}" ] && continue
  out="$HERE/${name}.png"
  qs="cond=${cond}&elev=${elev}&az=${az}&img=${img}&wind=${wind}&cover=${cover}&quality=high"
  [ "$flash" = "1" ] && qs="${qs}&flash=1"
  "$CHROME" --headless --disable-gpu --hide-scrollbars --no-sandbox \
    --force-color-profile=srgb --window-size=${W},${H} --virtual-time-budget=3500 \
    --screenshot="$(winpath "$out")" "${HTML_URL}?${qs}" >/dev/null 2>&1
  sz=$(stat -c%s "$out" 2>/dev/null || echo 0)
  printf '  %-22s -> %s (%s o)\n' "$name" "$(basename "$out")" "$sz"
  n=$((n+1))
done <<< "$CASES"

echo "Terminé : $n images (ré)générées dans preview/weather/"
