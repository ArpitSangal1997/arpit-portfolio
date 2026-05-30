$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Building main portfolio..."
Push-Location "$Root/arpit-portfolio"
npm ci --legacy-peer-deps
npm run build:gh-pages
Pop-Location

Write-Host "Building Airtel portfolio..."
Push-Location "$Root/arpit-portfolio-airtel"
npm ci --legacy-peer-deps
npm run build:gh-pages
Pop-Location

$Deploy = "$Root/_site"
if (Test-Path $Deploy) { Remove-Item -Recurse -Force $Deploy }
New-Item -ItemType Directory -Path "$Deploy/arpit-portfolio", "$Deploy/arpit-portfolio-airtel" -Force | Out-Null
Copy-Item -Recurse "$Root/arpit-portfolio/dist/arpit-portfolio/browser/*" "$Deploy/arpit-portfolio/"
Copy-Item -Recurse "$Root/arpit-portfolio-airtel/dist/arpit-portfolio/browser/*" "$Deploy/arpit-portfolio-airtel/"
Copy-Item "$Root/arpit-portfolio/public/404.html" "$Deploy/404.html"
Set-Content -Path "$Deploy/index.html" -Value '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/arpit-portfolio/"></head></html>'

Write-Host "Publishing to gh-pages branch..."
Push-Location "$Root/arpit-portfolio"
npx gh-pages -d "../_site" -m "Deploy both portfolio sites"
Pop-Location

Write-Host "Done!"
Write-Host "  https://arpitsangal1997.github.io/arpit-portfolio/"
Write-Host "  https://arpitsangal1997.github.io/arpit-portfolio-airtel/"
