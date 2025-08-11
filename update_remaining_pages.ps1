# PowerShell script to add mobile-announcement.js to all HTML files in the pages directory

$pagesDir = "d:\Desktop\School\pages"

# Get all HTML files in the pages directory
$htmlFiles = Get-ChildItem -Path $pagesDir -Filter "*.html"

# Files we've already updated manually
$updatedFiles = @(
    "about.html",
    "academics.html",
    "admission-notice.html",
    "admission.html",
    "announcements.html",
    "apply-online.html"
)

foreach ($file in $htmlFiles) {
    # Skip files we've already updated
    if ($updatedFiles -contains $file.Name) {
        Write-Host "Skipping $($file.Name) - already updated"
        continue
    }
    
    $filePath = $file.FullName
    $content = Get-Content -Path $filePath -Raw
    
    # Check if the file already contains the mobile-announcement.js script
    if ($content -match "mobile-announcement\.js") {
        Write-Host "$($file.Name) already contains mobile-announcement.js"
        continue
    }
    
    # Insert before closing body tag
    $scriptTag = "    <script src=\"../assets/js/mobile-announcement.js\"></script>"
    $newContent = $content -replace "</body>", "$scriptTag`n</body>"
    
    # Write the updated content back to the file
    Set-Content -Path $filePath -Value $newContent
    Write-Host "Updated $($file.Name) - Added mobile-announcement.js before closing body tag"
}

Write-Host "Script completed successfully"