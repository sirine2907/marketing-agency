# OVH Shared Hosting Deployment Script
# This script builds the Next.js project and fixes asset paths for compatibility

Write-Host "🚀 Starting OVH deployment process..." -ForegroundColor Green

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
yarn deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please check the errors above." -ForegroundColor Red
    exit 1
}

# Fix asset paths in HTML files
Write-Host "🔧 Fixing asset paths for shared hosting..." -ForegroundColor Yellow

# Fix main index.html
if (Test-Path "out\index.html") {
    (Get-Content "out\index.html") -replace '/_next/', './_next/' | Set-Content "out\index.html"
    Write-Host "✅ Fixed paths in index.html" -ForegroundColor Green
} else {
    Write-Host "⚠️  index.html not found!" -ForegroundColor Red
}

# Fix 404 page if it exists
if (Test-Path "out\404.html") {
    (Get-Content "out\404.html") -replace '/_next/', './_next/' | Set-Content "out\404.html"
    Write-Host "✅ Fixed paths in 404.html" -ForegroundColor Green
}

# Fix 404 directory index if it exists
if (Test-Path "out\404\index.html") {
    (Get-Content "out\404\index.html") -replace '/_next/', './_next/' | Set-Content "out\404\index.html"
    Write-Host "✅ Fixed paths in 404/index.html" -ForegroundColor Green
}

Write-Host "" -ForegroundColor White
Write-Host "🎉 Deployment files ready!" -ForegroundColor Green
Write-Host "" -ForegroundColor White
Write-Host "📁 Upload the following from the 'out' folder to your OVH hosting:" -ForegroundColor Cyan
Write-Host "   • index.html" -ForegroundColor White
Write-Host "   • _next/ folder (contains CSS, JS, and other assets)" -ForegroundColor White
Write-Host "   • 404.html" -ForegroundColor White
Write-Host "   • All other files (favicon.ico, etc.)" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "📡 FTP Settings for OVH:" -ForegroundColor Cyan
Write-Host "   • Host: ftp.your-domain.com" -ForegroundColor White
Write-Host "   • Upload to: /www/ folder" -ForegroundColor White
Write-Host "   • Make sure index.html is in the root of your domain" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "✨ Your landing page is ready for OVH hosting!" -ForegroundColor Green 