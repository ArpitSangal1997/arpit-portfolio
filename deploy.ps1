$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Building main portfolio..."
Push-Location "$Root/arpit-portfolio"
npm ci --legacy-peer-deps
npm run build:gh-pages
Pop-Location

$Deploy = "$Root/_site"
if (Test-Path $Deploy) { Remove-Item -Recurse -Force $Deploy }
New-Item -ItemType Directory -Path "$Deploy" -Force | Out-Null

# Main portfolio at gh-pages root -> served at /arpit-portfolio/
Copy-Item -Recurse "$Root/arpit-portfolio/dist/arpit-portfolio/browser/*" "$Deploy/"

New-Item -ItemType File -Path "$Deploy/.nojekyll" -Force | Out-Null

Write-Host "Publishing to gh-pages branch..."
Push-Location "$Root/arpit-portfolio"
npx gh-pages -d "../_site" -m "Deploy portfolio site"
Pop-Location

Write-Host ""
Write-Host "Live URLs:"
Write-Host "  Original: https://arpitsangal1997.github.io/arpit-portfolio/"
