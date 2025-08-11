# PowerShell script to add mobile-announcement.js to all HTML files in the pages directory

$pagesDir = "$PSScriptRoot\pages"
$htmlFiles = Get-ChildItem -Path $pagesDir -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if the file already has the mobile-announcement.js script
    if ($content -notmatch "mobile-announcement\.js") {
        Write-Host "Adding mobile-announcement.js to $($file.Name)..."
        
        # Replace the Bootstrap script tag with Bootstrap + mobile-announcement.js
        $newContent = $content -replace "<script src=\"https://cdn\.jsdelivr\.net/npm/bootstrap@5\.3\.0/dist/js/bootstrap\.bundle\.min\.js\"></script>", "<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js\"></script>\n    <script src=\"../assets/js/mobile-announcement.js\"></script>"
        
        # If the replacement didn't work (different structure), try another approach
        if ($newContent -eq $content) {
            # Try to insert before the closing body tag
            $newContent = $content -replace "</body>", "    <script src=\"../assets/js/mobile-announcement.js\"></script>\n</body>"
        }
        
        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $newContent
        Write-Host "Updated $($file.Name) successfully."
    } else {
        Write-Host "$($file.Name) already has the mobile-announcement.js script. Skipping."
    }
}

Write-Host "\nAll HTML files in the pages directory have been updated."