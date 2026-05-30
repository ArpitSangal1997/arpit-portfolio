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
New-Item -ItemType Directory -Path "$Deploy/arpit-portfolio-airtel" -Force | Out-Null

# Main portfolio at gh-pages root -> served at /arpit-portfolio/
Copy-Item -Recurse "$Root/arpit-portfolio/dist/arpit-portfolio/browser/*" "$Deploy/"
# Airtel variant in subfolder -> served at /arpit-portfolio/arpit-portfolio-airtel/
Copy-Item -Recurse "$Root/arpit-portfolio-airtel/dist/arpit-portfolio/browser/*" "$Deploy/arpit-portfolio-airtel/"

New-Item -ItemType File -Path "$Deploy/.nojekyll", "$Deploy/arpit-portfolio-airtel/.nojekyll" -Force | Out-Null

Write-Host "Publishing to gh-pages branch..."
Push-Location "$Root/arpit-portfolio"
npx gh-pages -d "../_site" -m "Deploy both portfolio sites"
Pop-Location

Write-Host ""
Write-Host "Live URLs:"
Write-Host "  Original: https://arpitsangal1997.github.io/arpit-portfolio/"
Write-Host "  Airtel:   https://arpitsangal1997.github.io/arpit-portfolio/arpit-portfolio-airtel/"
