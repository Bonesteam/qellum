$pairs = @(
    @{ name = "image1";  id = "RjmGzTg4_mw" },
    @{ name = "image2";  id = "KTrov7eujms" },
    @{ name = "image3";  id = "3iexvMShGfQ" },
    @{ name = "image4";  id = "7GO11y7bznw" },
    @{ name = "coach1";  id = "4NQEvxW2_4w" },
    @{ name = "coach2";  id = "0sYLBZjgTTw" },
    @{ name = "coach3";  id = "v3OlBE6-fhU" },
    @{ name = "coach4";  id = "-eKZLpj7U0E" }
)

foreach ($p in $pairs) {
    $url  = "https://unsplash.com/photos/$($p.id)/download?force=true"
    $dest = "src\assets\images\$($p.name).jpg"
    Write-Host "Downloading $($p.name) ..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
        $size = (Get-Item $dest).Length
        Write-Host "  OK -> $dest ($size bytes)"
    } catch {
        Write-Host "  FAIL: $_"
    }
}
Write-Host "All done."
