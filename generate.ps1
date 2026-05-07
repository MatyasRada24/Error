# generate.ps1 - Error Code Explorer static page generator
# Run: powershell -ExecutionPolicy Bypass -File generate.ps1

$root  = Split-Path -Parent $MyInvocation.MyCommand.Path
$BASE  = 'https://errorsfixer.com'
$TODAY = (Get-Date).ToString('yyyy-MM-dd')

Write-Host 'Reading data.js...' -ForegroundColor Cyan
$dataRaw = [System.IO.File]::ReadAllText("$root\data.js", [System.Text.Encoding]::UTF8)

function StripHtml($s) {
    ([regex]::Replace([string]$s, '<[^>]+>', '')) -replace '\s+', ' ' | ForEach-Object { $_.Trim() }
}
function EscHtml($s) {
    [string]$s -replace '&','&amp;' -replace '"','&quot;' -replace '<','&lt;' -replace '>','&gt;'
}
function SafeJson($s) {
    [string]$s -replace '\\','' -replace '"','\"' -replace "`r`n",' ' -replace "`n",' ' -replace "`r",' '
}

function BuildPage($id, $code, $type, $catCs, $descCs, $descEn, $solCs, $solEn, $detCs) {
    $url       = "$BASE/error/$id/"
    $title     = "$code - Oprava a Reseni | Error Code Explorer"
    $metaDesc  = if ($descCs.Length -gt 155) { $descCs.Substring(0,155) + '...' } else { $descCs }
    $badgeCls  = if ($type -eq 'hardware') { 'hardware' } else { 'software' }
    $typeUp    = $type.ToUpper()

    $titleE    = EscHtml $title
    $metaE     = EscHtml $metaDesc
    $descCsE   = EscHtml $descCs
    $codeE     = EscHtml $code
    $catCsE    = EscHtml $catCs

    # Solution block
    if ($solCs -match '^\s*<') { $solHtml = $solCs }
    else { $solHtml = '<p>' + (EscHtml $solCs) + '</p>' }

    # Details block
    $detBlock = ''
    if ($detCs) {
        $detE = EscHtml $detCs
        $detBlock = '<div class="card"><h2>Technicke detaily</h2><p class="muted">' + $detE + '</p></div>'
    }

    # English block
    $enBlock = ''
    if ($descEn) {
        $descEnE = EscHtml $descEn
        $enBlock = '<div class="card"><p style="font-size:.75rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.5rem">English</p>'
        $enBlock += '<p class="muted" style="margin-bottom:.8rem">' + $descEnE + '</p>'
        if ($solEn -match '^\s*<') { $enBlock += $solEn }
        elseif ($solEn) { $enBlock += '<p class="muted">' + (EscHtml $solEn) + '</p>' }
        $enBlock += '</div>'
    }

    # HowTo steps JSON
    $stepItems = ''
    $pos = 1
    foreach ($sm in [regex]::Matches($solCs, '<li>([\s\S]*?)<\/li>', 'IgnoreCase')) {
        $t = SafeJson (StripHtml $sm.Groups[1].Value)
        $stepItems += '{"@type":"HowToStep","position":' + $pos + ',"text":"' + $t + '"},'
        $pos++
    }
    $stepItems = $stepItems.TrimEnd(',')

    $codeJ  = SafeJson $code
    $descJ  = SafeJson $descCs
    $catJ   = SafeJson $catCs

    $ld1 = '{"@context":"https://schema.org","@type":"HowTo","name":"Jak opravit ' + $codeJ + '","description":"' + $descJ + '","step":[' + $stepItems + ']}'
    $ld2 = '{"@context":"https://schema.org","@type":"TechArticle","headline":"' + $codeJ + ' - Priciny a oprava","description":"' + $descJ + '","url":"' + $url + '","inLanguage":"cs","dateModified":"' + $TODAY + '","publisher":{"@type":"Organization","name":"Error Code Explorer","url":"' + $BASE + '/"}}'
    $ld3 = '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Error Code Explorer","item":"' + $BASE + '/"},{"@type":"ListItem","position":2,"name":"' + $catJ + '","item":"' + $BASE + '/?type=' + $type + '"},{"@type":"ListItem","position":3,"name":"' + $codeJ + '","item":"' + $url + '"}]}'

    $css = ':root{--bg:#0b0f1a;--card:rgba(23,32,53,.8);--border:rgba(148,163,184,.12);--accent:#38bdf8;--text:#f8fafc;--muted:#94a3b8}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Segoe UI,system-ui,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.7;min-height:100vh}
.wrap{max-width:860px;margin:0 auto;padding:1.5rem 1.2rem 3rem}
.logo{display:inline-flex;align-items:center;gap:.6rem;color:var(--accent);text-decoration:none;font-weight:700;font-size:1.05rem;margin-bottom:.6rem}
.back{color:var(--muted);text-decoration:none;font-size:.88rem;display:inline-block;margin-bottom:1.2rem}
.back:hover{color:var(--accent)}
.badge{display:inline-block;font-size:.68rem;font-weight:800;padding:.25rem .7rem;border-radius:50px;text-transform:uppercase;letter-spacing:.06em;margin-right:.5rem}
.badge.hardware{background:rgba(249,115,22,.18);color:#f97316}
.badge.software{background:rgba(139,92,246,.18);color:#8b5cf6}
.cat{font-size:.83rem;color:var(--muted)}
h1{font-size:clamp(1.7rem,4vw,2.5rem);font-weight:800;margin:.6rem 0 .9rem;line-height:1.2}
.lead{color:#cbd5e1;font-size:1rem;margin-bottom:2rem;max-width:700px}
.card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:1.4rem 1.6rem;margin-bottom:1.4rem}
.card h2{font-size:1.05rem;color:var(--accent);margin-bottom:1rem}
ol.sol-steps{padding-left:1.4rem;color:#e2e8f0}
ol.sol-steps li{margin-bottom:.75rem}
ol.sol-steps strong{color:var(--text)}
ol.sol-steps code{background:rgba(56,189,248,.12);color:var(--accent);padding:.1em .4em;border-radius:4px;font-size:.87em;font-family:monospace}
ol.sol-steps a{color:var(--accent)}
.muted{color:var(--muted);font-size:.9rem;line-height:1.8}
.cta{display:inline-flex;align-items:center;gap:.6rem;background:var(--accent);color:#0b0f1a;font-weight:700;font-size:.97rem;padding:.8rem 1.8rem;border-radius:12px;text-decoration:none;margin:.8rem 0;transition:transform .15s}
.cta:hover{transform:translateY(-2px)}
footer{margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--border);color:#475569;font-size:.8rem;text-align:center}
footer a{color:var(--accent);text-decoration:none}'

    $html  = '<!DOCTYPE html><html lang="cs"><head>'
    $html += '<meta charset="UTF-8">'
    $html += '<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">'
    $html += '<title>' + $titleE + '</title>'
    $html += '<meta name="description" content="' + $metaE + '">'
    $html += '<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">'
    $html += '<meta name="author" content="Error Code Explorer">'
    $html += '<link rel="canonical" href="' + $url + '">'
    $html += '<link rel="alternate" hreflang="cs" href="' + $url + '">'
    $html += '<link rel="alternate" hreflang="en" href="' + $url + '?lang=en">'
    $html += '<link rel="alternate" hreflang="x-default" href="' + $url + '">'
    $html += '<meta property="og:title" content="' + $titleE + '">'
    $html += '<meta property="og:description" content="' + $metaE + '">'
    $html += '<meta property="og:url" content="' + $url + '">'
    $html += '<meta property="og:type" content="article">'
    $html += '<meta property="og:image" content="' + $BASE + '/og-image.png">'
    $html += '<meta property="og:site_name" content="Error Code Explorer">'
    $html += '<meta name="twitter:card" content="summary_large_image">'
    $html += '<meta name="twitter:title" content="' + $titleE + '">'
    $html += '<meta name="twitter:description" content="' + $metaE + '">'
    $html += '<meta name="theme-color" content="#0b0f1a">'
    $html += '<link rel="icon" type="image/png" href="/favicon.png?v=1">'
    $html += '<script type="application/ld+json">' + $ld1 + '</script>'
    $html += '<script type="application/ld+json">' + $ld2 + '</script>'
    $html += '<script type="application/ld+json">' + $ld3 + '</script>'
    $html += '<style>' + $css + '</style>'
    $html += '</head><body><div class="wrap">'
    $html += '<header>'
    $html += '<a class="logo" href="/">Error Code Explorer</a><br>'
    $html += '<a class="back" href="/">&larr; Zpet na databazi</a>'
    $html += '<div><span class="badge ' + $badgeCls + '">' + $typeUp + '</span><span class="cat">' + $catCsE + '</span></div>'
    $html += '<h1>' + $codeE + '</h1>'
    $html += '<p class="lead">' + $descCsE + '</p>'
    $html += '</header><main>'
    $html += '<div class="card"><h2>Reseni krok za krokem</h2>' + $solHtml + '</div>'
    $html += $detBlock
    $html += '<a class="cta" href="/?code=' + $id + '">Otevrit interaktivni pruvodce &rarr;</a>'
    $html += $enBlock
    $html += '</main><footer><p>&copy; 2026 <a href="/">Error Code Explorer</a> &mdash; Databaze chybovych kodu PC</p></footer>'
    $html += '</div></body></html>'
    return $html
}

# ── Parse IDs from data.js ────────────────────────────────────────────────────
$ids = [regex]::Matches($dataRaw, 'id:\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
Write-Host "Found $($ids.Count) error IDs" -ForegroundColor Green

$generated  = 0
$sitemapIds = [System.Collections.ArrayList]@()

foreach ($id in $ids) {
    $pat  = 'id:\s*"' + [regex]::Escape($id) + '"'
    $idm  = [regex]::Match($dataRaw, $pat)
    if (-not $idm.Success) { continue }

    $start = [Math]::Max(0, $idm.Index - 100)
    $len   = [Math]::Min($dataRaw.Length - $start, 9000)
    $blk   = $dataRaw.Substring($start, $len)

    $code  = ''; $type = 'software'; $catCs = ''; $descCs = ''; $descEn = ''; $solCs = ''; $solEn = ''; $detCs = ''

    if ($blk -match 'code:\s*"([^"]+)"')   { $code  = $Matches[1] }
    if ($blk -match 'type:\s*"([^"]+)"')   { $type  = $Matches[1] }
    if ($blk -match '(?s)category:\s*\{[^}]*?cs:\s*"([^"]*)"') { $catCs = $Matches[1] }
    if ($blk -match '(?s)description:\s*\{[^}]*?cs:\s*"((?:[^"\\]|\\.)*)"') { $descCs = $Matches[1] -replace '\\n',' ' -replace '\\"','"' }
    if ($blk -match '(?s)description:\s*\{[^}]*?en:\s*"((?:[^"\\]|\\.)*)"') { $descEn = $Matches[1] -replace '\\n',' ' -replace '\\"','"' }

    # Solution - backtick template literals: cs: `...`
    $sm = [regex]::Match($blk, '(?s)solution\s*:\s*\{.*?cs\s*:\s*`(.*?)`', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($sm.Success) { $solCs = $sm.Groups[1].Value.Trim() }
    elseif ($blk -match '(?s)solution\s*:\s*\{[^`"]*?cs\s*:\s*"((?:[^"\\]|\\.)*)"') { $solCs = $Matches[1] -replace '\\n',' ' }

    $em = [regex]::Match($blk, '(?s)solution\s*:\s*\{.*?en\s*:\s*`(.*?)`', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($em.Success) { $solEn = $em.Groups[1].Value.Trim() }
    elseif ($blk -match '(?s)solution\s*:\s*\{[^`"]*?en\s*:\s*"((?:[^"\\]|\\.)*)"') { $solEn = $Matches[1] -replace '\\n',' ' }

    $dm = [regex]::Match($blk, '(?s)details\s*:\s*\{.*?cs\s*:\s*"((?:[^"\\]|\\.)*)"', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($dm.Success) { $detCs = StripHtml ($dm.Groups[1].Value -replace '\\n',' ' -replace '\\"','"') }

    if (-not $code) { continue }

    $html   = BuildPage $id $code $type $catCs $descCs $descEn $solCs $solEn $detCs
    $outDir = "$root\error\$id"
    [System.IO.Directory]::CreateDirectory($outDir) | Out-Null
    [System.IO.File]::WriteAllText("$outDir\index.html", $html, [System.Text.Encoding]::UTF8)

    [void]$sitemapIds.Add($id)
    $generated++
    if ($generated % 25 -eq 0) { Write-Host "  ... $generated pages generated" -ForegroundColor DarkCyan }
}

Write-Host "Generated $generated static error pages in /error/" -ForegroundColor Green

# ── Rebuild sitemap.xml ───────────────────────────────────────────────────────
Write-Host 'Writing sitemap.xml...' -ForegroundColor Cyan

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('<?xml version="1.0" encoding="UTF-8"?>')
[void]$sb.AppendLine('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
[void]$sb.AppendLine('        xmlns:xhtml="http://www.w3.org/1999/xhtml"')
[void]$sb.AppendLine('        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('  <url>')
[void]$sb.AppendLine("    <loc>$BASE/</loc>")
[void]$sb.AppendLine("    <lastmod>$TODAY</lastmod>")
[void]$sb.AppendLine('    <changefreq>weekly</changefreq>')
[void]$sb.AppendLine('    <priority>1.0</priority>')
[void]$sb.AppendLine("    <xhtml:link rel=`"alternate`" hreflang=`"cs`"        href=`"$BASE/`"/>")
[void]$sb.AppendLine("    <xhtml:link rel=`"alternate`" hreflang=`"en`"        href=`"$BASE/?lang=en`"/>")
[void]$sb.AppendLine("    <xhtml:link rel=`"alternate`" hreflang=`"zh`"        href=`"$BASE/?lang=zh`"/>")
[void]$sb.AppendLine("    <xhtml:link rel=`"alternate`" hreflang=`"x-default`" href=`"$BASE/`"/>")
[void]$sb.AppendLine('    <image:image>')
[void]$sb.AppendLine("      <image:loc>$BASE/og-image.png</image:loc>")
[void]$sb.AppendLine('      <image:title>Error Code Explorer - Databaze chybovych kodu PC</image:title>')
[void]$sb.AppendLine('    </image:image>')
[void]$sb.AppendLine('  </url>')
[void]$sb.AppendLine('')

foreach ($sid in $sitemapIds) {
    [void]$sb.AppendLine('  <url>')
    [void]$sb.AppendLine("    <loc>$BASE/error/$sid/</loc>")
    [void]$sb.AppendLine("    <lastmod>$TODAY</lastmod>")
    [void]$sb.AppendLine('    <changefreq>monthly</changefreq>')
    [void]$sb.AppendLine('    <priority>0.8</priority>')
    [void]$sb.AppendLine("    <xhtml:link rel=`"alternate`" hreflang=`"cs`"        href=`"$BASE/error/$sid/`"/>")
    [void]$sb.AppendLine("    <xhtml:link rel=`"alternate`" hreflang=`"en`"        href=`"$BASE/error/$sid/?lang=en`"/>")
    [void]$sb.AppendLine("    <xhtml:link rel=`"alternate`" hreflang=`"x-default`" href=`"$BASE/error/$sid/`"/>")
    [void]$sb.AppendLine('  </url>')
}

[void]$sb.AppendLine('')
[void]$sb.AppendLine('</urlset>')

[System.IO.File]::WriteAllText("$root\sitemap.xml", $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "sitemap.xml rebuilt with $($sitemapIds.Count + 1) URLs" -ForegroundColor Green
Write-Host 'DONE. Upload /error/ folder + sitemap.xml to your server.' -ForegroundColor Yellow
