$enc = New-Object System.Text.UTF8Encoding($false)
$src = 'c:\Users\PC\Desktop\Web\Error\index.js'
$dstData = 'c:\Users\PC\Desktop\Web\Error\diagnostics.js'

$lines = [System.IO.File]::ReadAllLines($src, $enc)
Write-Host "Total lines read: $($lines.Count)"

# diagnostics.js = lines 149..4626 (0-indexed: 148..4625)
$dataLines = $lines[148..4625]
[System.IO.File]::WriteAllLines($dstData, $dataLines, $enc)
Write-Host "diagnostics.js written: $($dataLines.Count) lines"

# new index.js = i18n (0..147) + logic (4627..end)
$part1 = $lines[0..147]
$part2 = $lines[4627..($lines.Count - 1)]
$newLines = $part1 + $part2
[System.IO.File]::WriteAllLines($src, $newLines, $enc)
Write-Host "index.js written: $($newLines.Count) lines"
Write-Host "DONE"
