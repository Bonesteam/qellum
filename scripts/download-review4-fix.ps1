$pairs = @(
    @{ name = "review4"; id = "sibVwORYqs0" }
)
foreach ($p in $pairs) {
    $url  = "https://unsplash.com/photos/$($p.id)/download?force=true"
    $dest = "src\assets\images\$($p.name).jpg"
    Write-Host "Downloading $($p.name) ..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
        $size = (Get-Item $dest).Length
        Write-Host "  OK -> $($p.name) ($size bytes)"
    } catch {
        Write-Host "  FAIL: $_"
    }
}
Write-Host "Done."
