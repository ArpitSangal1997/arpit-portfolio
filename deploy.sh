#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Building main portfolio..."
(cd "$ROOT/arpit-portfolio" && npm ci --legacy-peer-deps && npm run build:gh-pages)

DEPLOY="$ROOT/_site"
rm -rf "$DEPLOY"
mkdir -p "$DEPLOY/arpit-portfolio"
cp -r "$ROOT/arpit-portfolio/dist/arpit-portfolio/browser/." "$DEPLOY/arpit-portfolio/"
cp "$ROOT/arpit-portfolio/public/404.html" "$DEPLOY/404.html"
echo '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/arpit-portfolio/"></head></html>' > "$DEPLOY/index.html"

echo "Publishing to gh-pages branch..."
(cd "$ROOT/arpit-portfolio" && npx gh-pages -d "../_site" -m "Deploy portfolio site")

echo "Done!"
echo "  https://arpitsangal1997.github.io/arpit-portfolio/"
