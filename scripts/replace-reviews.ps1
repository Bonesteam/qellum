$baseDir = "src\assets\images"
foreach ($i in 1,2,3,4) {
    $pngPath = "$baseDir\review$i.png"
    $jpgPath = "$baseDir\review$i.jpg"
    if (Test-Path $pngPath) {
        Remove-Item $pngPath
        Write-Host "Removed old $pngPath"
    }
    if (Test-Path $jpgPath) {
        Rename-Item $jpgPath "$baseDir\review$i.png"
        Write-Host "Renamed review$i.jpg -> review$i.png"
    } else {
        Write-Host "  review$i.jpg not found, skipping"
    }
}
Write-Host "Done."
