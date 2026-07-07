$pairs = @(
    @{ name = "image5"; id = "TkzdkVn1AyA" },
    @{ name = "team2";  id = "mEZ3PoFGs_k" }
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
