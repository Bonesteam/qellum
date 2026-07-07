Get-ChildItem src\assets\images\review*.jpg | ForEach-Object {
    $newName = $_.BaseName + ".png"
    $newPath = Join-Path $_.DirectoryName $newName
    Rename-Item $_.FullName $newPath
    Write-Host "Renamed $($_.Name) -> $newName"
}
Write-Host "Done."
