$pairs = @(
    # image5 — FAQ section (gourmet meal plate)
    @{ name = "image5";   id = "vuDXjSKn_jA" },
    # image9 — contact page (restaurant interior)
    @{ name = "image9";   id = "KTrov7eujms" },
    # image10 — get-started page (breakfast table)
    @{ name = "image10";  id = "oqStl2L5oxI" },
    # image11 — about page (cooking class / couple cooking)
    @{ name = "image11";  id = "pMW4jzELQCw" },
    # image6 — extra food
    @{ name = "image6";   id = "fdlZBWIP0aM" },
    # image7 — extra food
    @{ name = "image7";   id = "sA3wymYqyaI" },
    # image8 — extra food
    @{ name = "image8";   id = "MqT0asuoIcU" },
    # image12 — extra
    @{ name = "image12";  id = "eeqbbemH9-c" },
    # review avatars — real smiling people portraits
    @{ name = "review1";  id = "rDEOVtE7vOs" },
    @{ name = "review2";  id = "95UF6LXe-Lo" },
    @{ name = "review3";  id = "mEZ3PoFGs_k" },
    @{ name = "review4";  id = "g1Kr4Ozfoac" },
    # team members
    @{ name = "team1";    id = "ZHvM3XIOHoE" },
    @{ name = "team2";    id = "6anudmpILw4" },
    @{ name = "team3";    id = "d2MSDujJl2g" }
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
