const errorCodes = [
    // =========================================================
    // === GPU ===
    // =========================================================
    {
        id: "gpu-43", type: "hardware", subcategory: "gpu",
        vendors: ["nvidia", "amd", "intel"],
        code: "Code 43",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "Windows zastavil grafickou kartu (chybová zpráva ve Správci zařízení). Ovladač GPU ohlásil kernelu neobnovitelnou chybu přes TDR mechanismus – karta přestala komunikovat s OS. Nejčastěji jde o poškozený ovladač, vadnou VRAM nebo fyzicky poškozenou kartu.",
            en: "Windows has stopped the GPU (shown in Device Manager). The GPU driver reported an unrecoverable error to the kernel via the TDR mechanism. Most commonly caused by a corrupted driver, faulty VRAM, or physically damaged card.",
            zh: "Windows 已停止 GPU（设备管理器中显示）。GPU 驱动通过 TDR 机制向内核报告了不可恢复的错误，通常由驱动损坏、显存故障或硬件损坏引起。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Čistá reinstalace ovladače:</strong> Stáhněte <a href="https://www.guru3d.com/files-details/display-driver-uninstaller-download.html" target="_blank">DDU (Display Driver Uninstaller)</a>, spusťte Windows v <strong>Safe Mode</strong>, odinstalujte vše a nainstalujte nejnovější ovladač z webu NVIDIA/AMD.</li>
<li><strong>Přesuňte kartu do jiného PCIe slotu</strong> – testujete tak, zda nejde o vadný slot na základní desce.</li>
<li><strong>Zkontrolujte napájení:</strong> Ujistěte se, že jsou zapojeny všechny PCIe napájecí konektory (8-pin / 16-pin) přímo z PSU (ne přes rozbočovač/adaptér).</li>
<li><strong>Ověřte teplotu GPU</strong> v GPU-Z nebo HWInfo64 – přehřátí nad 90 °C způsobuje TDR resety. Vyčistěte prach a vyměňte termální pastu.</li>
<li><strong>Testujte GPU v jiném PC</strong> – pokud chyba přetrvá, je potvrzeno fyzické poškození hardwaru (BGA spoje, VRAM).</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Clean driver reinstall:</strong> Download <a href="https://www.guru3d.com/files-details/display-driver-uninstaller-download.html" target="_blank">DDU</a>, boot into <strong>Safe Mode</strong>, uninstall all GPU drivers, then install the latest from NVIDIA/AMD website.</li>
<li><strong>Try a different PCIe slot</strong> – rules out a damaged slot on the motherboard.</li>
<li><strong>Check power connectors:</strong> Ensure all PCIe power cables (8-pin / 16-pin) are plugged directly from the PSU (no splitters).</li>
<li><strong>Monitor GPU temperature</strong> via GPU-Z or HWInfo64 – temps above 90°C cause TDR resets. Clean dust and replace thermal paste if needed.</li>
<li><strong>Test GPU in another PC</strong> – if the error persists, physical damage (BGA joints, VRAM) is confirmed.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>清洁重装驱动：</strong>下载 DDU，进入安全模式彻底卸载驱动，再从 NVIDIA/AMD 官网安装最新驱动。</li>
<li><strong>换一个 PCIe 插槽</strong>以排除主板插槽损坏。</li>
<li><strong>检查供电接口：</strong>确保所有 PCIe 供电线直接来自电源（不用分叉线）。</li>
<li><strong>通过 GPU-Z 监控温度</strong>——超过 90°C 会触发 TDR 重置，需清灰并更换硅脂。</li>
<li><strong>在另一台 PC 测试显卡</strong>——若仍报错则确认为硬件物理损坏。</li>
</ol>`
        },
        youtube: [
            { title: "Code 43 GPU Fix – kompletní průvodce (EN)", url: "https://www.youtube.com/results?search_query=code+43+GPU+fix+DDU+windows+10+11" }
        ],
        details: {
            cs: "Kód 43 je generická chyba na úrovni kernel mód ovladače (TDR/Device timeout). Když Windows obdrží od GPU signál o chybě, Kernel Mode Driver Framework (KMDF) okamžitě zastaví zařízení a zaznamená chybu do Event Vieweru. Nejčastější příčiny: (1) Poškozené BGA spoje pod GPU jádrem vlivem teplotního cyklu – dochází k mikroprasklinám, které vedou k přerušovanému kontaktu. (2) Defektní paměťový čip VRAM (GDDR6/6X) způsobující nevalidní ECC opravy. (3) Korupce ovladačového souboru nvlddmkm.sys nebo amdkmdag.sys. (4) Nedostatek napájení – PCIe slot poskytuje max 75W, u karet nad 200W je nutné 8pin/16pin konektory. Diagnostický postup: spusťte GPU-Z, zkontrolujte Bus Interface (měl by být PCI-E x16 3.0/4.0), ověřte teplotu a napájecí limity. Poté spusťte DDU v Safe Mode, nainstalujte ovladač od nuly. Pokud karta stále generuje chybu 43 v jiném systému, je potvrzeno fyzické poškození HW.",
            en: "Code 43 is a generic Kernel Mode Driver Framework (KMDF) error triggered when the GPU driver reports an unrecoverable fault to Windows via the TDR (Timeout Detection and Recovery) mechanism. Root causes: (1) Degraded BGA solder joints beneath the GPU die – thermal cycling causes micro-fractures leading to intermittent contact loss. (2) Defective VRAM IC (GDDR6/6X) producing uncorrectable ECC errors. (3) Corrupt driver file nvlddmkm.sys (NVIDIA) or amdkmdag.sys (AMD). (4) Inadequate power delivery – the PCIe slot supplies max 75W; high-end GPUs require additional 8-pin/16-pin connectors. Diagnostic: open GPU-Z and verify Bus Interface, check temperature sensors, then boot into Safe Mode, run DDU to fully purge all GPU driver traces, then do a clean install. If the error persists in a different system, the GPU hardware is physically damaged.",
            zh: "代码 43 是 Windows 内核模式驱动框架（KMDF）触发的通用错误，通过 TDR 机制响应 GPU 驱动的不可恢复故障。根本原因：(1) GPU 芯片下方的 BGA 焊点退化导致间歇性接触失效；(2) VRAM 颗粒产生无法纠正的 ECC 错误；(3) 驱动文件 nvlddmkm.sys 或 amdkmdag.sys 损坏；(4) 供电不足。诊断流程：打开 GPU-Z 验证 Bus Interface，检查温度，随后进入安全模式运行 DDU 彻底清除驱动，再重新安装。若在另一台系统中仍然报错，则为硬件物理损坏。"
        }
    },
    {
        id: "gpu-artifacts", type: "hardware", subcategory: "gpu",
        vendors: ["nvidia", "amd"],
        code: "Artifacts / Glitches",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: { cs: "Artefakty, čtverečky nebo problikávání barev na obrazovce.", en: "Artifacts, squares, or flickering colors across the screen.", zh: "屏幕上出现伪影、方块或彩色闪烁。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Otevřete MSI Afterburner</strong> (stáhněte zdarma z msi.com) a posuňte posuvník <em>Memory Clock</em> o 100–200 MHz dolů. Klikněte na Apply. Artefakty (čtverečky, barevné pruhy) jsou téměř vždy způsobeny nestabilní VRAM.</li>
<li><strong>Snižte takt jádra GPU:</strong> Posuňte <em>Core Clock</em> o 50–100 MHz dolů. Tím snížíte teplotu a stabilizujete kartu.</li>
<li><strong>Zkontrolujte teplotu GPU:</strong> V GPU-Z záložce <em>Sensors</em> sledujte hodnotu <em>GPU Hot Spot</em>. Pokud přesahuje 90 °C, je karta přehřátá – vyčistěte prach ze žeber chladiče stlačeným vzduchem.</li>
<li><strong>Spusťte zátěžový test:</strong> FurMark nebo 3DMark zobrazí, zda artefakty přetrvávají. Pokud ano i po podtaktování, pravděpodobně jde o fyzicky poškozenou VRAM – zvažte výměnu karty.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Open MSI Afterburner</strong> (free download from msi.com) and drag the <em>Memory Clock</em> slider down by 100–200 MHz, then click Apply. Artifacts (squares, colored streaks) are almost always caused by unstable VRAM.</li>
<li><strong>Lower the GPU core clock too:</strong> Move <em>Core Clock</em> down by 50–100 MHz to reduce heat and stabilize the card.</li>
<li><strong>Check GPU temperature:</strong> In GPU-Z on the <em>Sensors</em> tab, watch the <em>GPU Hot Spot</em> value. Above 90 °C means the card is overheating – clean dust from heatsink fins with compressed air.</li>
<li><strong>Run a stress test:</strong> Use FurMark or 3DMark to see if artifacts persist. If they do even after underclocking, you likely have physically damaged VRAM – consider GPU replacement.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>打开 MSI Afterburner</strong>（从 msi.com 免费下载），将<em>内存时钟</em>滑块向下调 100–200 MHz，然后点击应用。伪影（方块、彩色条纹）几乎总是由显存不稳定引起的。</li>
<li><strong>同时降低 GPU 核心频率：</strong>将<em>核心时钟</em>向下调 50–100 MHz，以降低温度并稳定显卡。</li>
<li><strong>检查 GPU 温度：</strong>在 GPU-Z 的<em>传感器</em>标签中查看 <em>GPU Hot Spot</em>。超过 90°C 表示显卡过热，用压缩空气清洁散热器鳍片上的灰尘。</li>
<li><strong>运行压力测试：</strong>使用 FurMark 或 3DMark 检查降频后伪影是否持续。若持续，可能是显存物理损坏，考虑更换显卡。</li>
</ol>`
        },
        details: {
            cs: "Vizuální artefakty jsou přímým projevem chyby v GPU rendering pipeline. Existují dva hlavní zdroje: (1) Vertex shader corruption – výsledkem jsou trojúhelníkové nebo geometrické deformace ve scéně. (2) VRAM bit-flip – jednotlivé bity v paměťových buňkách GDDR mění hodnotu vlivem přehřátí nebo nestability napájení (VDDQ). Při přetaktování paměti nastávají neúplná načtení textur, projevující se jako kostičky nebo pruhy. Diagnostika: spusťte 3DMark TimeSpy nebo FurMark a vizuálně sledujte výstup; monitorujte teplotu VRAM přes GPU-Z Sensors (hotspot >105°C je kritický). Stabilizace: snižte VRAM clock o 100–200 MHz a zablokujte Power Limit na 80–90% v MSI Afterburner.",
            en: "Visual artifacts are direct manifestations of errors in the GPU rendering pipeline. Two primary sources: (1) Vertex shader corruption – triangulated or geometric deformations in the 3D scene. (2) VRAM bit-flip – individual bits in GDDR memory cells flip their value due to overheating or VDDQ power instability. Overclocking memory beyond spec causes incomplete texture fetches appearing as blocks or streaks. Best diagnostic: run 3DMark TimeSpy or FurMark; simultaneously watch VRAM temperature via GPU-Z Sensors (hotspot >105°C is critical). Stabilization: reduce VRAM clock by 100–200MHz and cap Power Limit at 80–90% in MSI Afterburner.",
            zh: "视觉伪影是 GPU 渲染管线错误的直接表现。两个主要来源：(1) 顶点着色器损坏——在 3D 场景中出现三角形或几何变形；(2) 显存位翻转——由于过热或 VDDQ 供电不稳，GDDR 存储单元中的比特翻转，导致纹理加载不完整，表现为方块或条纹。最佳诊断：运行 3DMark TimeSpy 或 FurMark，通过 GPU-Z Sensors 监测 VRAM 温度（热点超过 105°C 为危险值）。稳定方法：在 MSI Afterburner 中将 VRAM 频率降低 100–200MHz，功耗限制设为 80–90%。"
        }
    },
    {
        id: "gpu-d3d", type: "hardware", subcategory: "gpu",
        vendors: ["nvidia", "amd", "intel"],
        code: "D3D Device Removed / Lost",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: { cs: "Grafická karta byla během hraní náhle odpojena (DXGI_ERROR_DEVICE_REMOVED).", en: "GPU suddenly disconnected during operation (DXGI_ERROR_DEVICE_REMOVED).", zh: "游戏时显卡突然断开连接（DXGI_ERROR_DEVICE_REMOVED）。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Snižte Power Limit v MSI Afterburner na 85–90 %:</strong> Otevřete Afterburner, posuňte posuvník <em>Power Limit</em> dolů a klikněte Apply. Tím omezíte proudové špičky, které způsobují odpojení GPU od sběrnice.</li>
<li><strong>Zkontrolujte PCIe napájecí kabely:</strong> Ujistěte se, že jsou pevně zasunuty všechny 8-pin nebo 16-pin konektory přímo ze zdroje – nikdy nepoužívejte Y-rozbočovač (splitter).</li>
<li><strong>Otestujte jiný napájecí zdroj:</strong> Pokud máte možnost, zapojte PSU s vyšším výkonem a certifikací 80+ Gold. Slabý nebo levný zdroj je nejčastější příčinou DXGI_ERROR_DEVICE_REMOVED.</li>
<li><strong>Hledejte chybu v Event Vieweru:</strong> Stiskněte Win+R, napište <code>eventvwr</code>, přejděte do Windows Logs → System a filtrujte Event ID 4101. Zobrazí přesnou příčinu výpadku.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Reduce Power Limit to 85–90% in MSI Afterburner:</strong> Open Afterburner, drag the <em>Power Limit</em> slider down and click Apply. This limits current spikes that cause the GPU to drop off the PCIe bus.</li>
<li><strong>Check PCIe power connectors:</strong> Make sure all 8-pin or 16-pin connectors are firmly seated and run directly from the PSU – never use Y-splitter cables.</li>
<li><strong>Test with a different PSU:</strong> If possible, try a higher-wattage PSU with 80+ Gold rating. A weak or cheap PSU is the most common cause of DXGI_ERROR_DEVICE_REMOVED.</li>
<li><strong>Check Event Viewer for clues:</strong> Press Win+R, type <code>eventvwr</code>, go to Windows Logs → System and filter for Event ID 4101. It shows the exact cause of the dropout.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>在 MSI Afterburner 中将功耗限制降至 85–90%：</strong>打开 Afterburner，向下拖动<em>功耗限制</em>滑块并点击应用。这可以限制导致 GPU 从 PCIe 总线脱落的电流尖峰。</li>
<li><strong>检查 PCIe 供电接口：</strong>确保所有 8-pin 或 16-pin 接口直接来自电源，切勿使用 Y 型分叉线。</li>
<li><strong>测试其他电源：</strong>如有条件，换一个更高功率且有 80+ Gold 认证的电源。低质量电源是 DXGI_ERROR_DEVICE_REMOVED 最常见的原因。</li>
<li><strong>在事件查看器中查找原因：</strong>按 Win+R，输入 <code>eventvwr</code>，进入 Windows 日志 → 系统，筛选事件 ID 4101，即可看到掉线的确切原因。</li>
</ol>`
        },
        details: {
            cs: "DXGI_ERROR_DEVICE_REMOVED je hlášen DirectX runtime frameworkem, když karta přestane reagovat na příkazy GPU. Vnitřní příčiny: (1) Transientní power spike překráčí TDP a způsobí výpadek GPU ze sběrnice. Moderní GPU (RTX 4090) spotřebovávají až 600W ve špičce, přičemž levné PSU mají špatnou regulaci 12V linky. (2) Přehřátí GPU způsobí thermal throttle a reset se nezdaří. (3) Vadné PCIe x16 sloty – špatný elektrický kontakt. (4) Chyba ovladačového zásobníku při práci s Vulkan/DX12 async compute. Diagnostika: v Event Vieweru hledejte Event ID 4101 (TDR Recovery) nebo 134 (Video Hardware Error). Spusťte PSU tester nebo vyměňte PSU za 80+ Gold certifikovaný model.",
            en: "DXGI_ERROR_DEVICE_REMOVED is reported by the DirectX runtime when the GPU stops responding to commands. Internal causes: (1) A transient power spike exceeds TDP, causing the GPU to drop off the PCIe bus. Modern GPUs (RTX 4090) peak at 600W while cheap PSUs have poor 12V line regulation. (2) GPU overheating causes thermal throttling; if recovery fails, the device is marked as removed. (3) Faulty PCIe x16 slot – poor electrical contact. (4) Driver stack fault during Vulkan/DX12 async compute. Diagnostics: in Event Viewer, look for Event ID 4101 (TDR Recovery) or Event ID 134 (Video Hardware Error). Run a PSU tester or swap the PSU with an 80+ Gold certified unit.",
            zh: "DXGI_ERROR_DEVICE_REMOVED 由 DirectX 运行时在 GPU 停止响应命令时报告。内部原因：(1) 瞬时功率尖峰超过 TDP，导致 GPU 从 PCIe 总线脱落——RTX 4090 峰值功耗达 600W，低质量电源 12V 线路调节能力差；(2) GPU 过热导致热降频，恢复失败则设备被标记为已移除；(3) PCIe x16 插槽接触不良；(4) Vulkan/DX12 异步计算时驱动栈出错。诊断：在事件查看器中查找事件 ID 4101 或 134，使用电源测试仪或更换 80+ Gold 认证电源。"
        }
    },
    {
        id: "gpu-tdr", type: "hardware", subcategory: "gpu",
        vendors: ["nvidia", "amd"],
        code: "nvlddmkm.sys / TDR Crash",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: { cs: "Obrazovka zčerná a systém hlásí 'Display driver stopped responding'.", en: "Screen goes black and system reports 'Display driver stopped responding and has recovered'.", zh: "屏幕变黑，系统提示'显示驱动程序停止响应并已恢复'。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Čistá reinstalace GPU ovladače:</strong> Stáhněte <a href="https://www.guru3d.com/files-details/display-driver-uninstaller-download.html" target="_blank">DDU (Display Driver Uninstaller)</a>, spusťte Windows v <strong>Safe Mode</strong> (Win+R → msconfig → Boot → Safe boot), spusťte DDU a odinstalujte vše. Poté nainstalujte nejnovější ovladač z nvidia.com nebo amd.com.</li>
<li><strong>Zvyšte hodnotu TdrDelay v registru:</strong> Stiskněte Win+R, napište <code>regedit</code>. Přejděte na <code>HKLM\System\CurrentControlSet\Control\GraphicsDrivers</code>. Klikněte pravým tlačítkem → Nová hodnota DWORD (32-bit) → pojmenujte ji <em>TdrDelay</em> → nastavte hodnotu <strong>8</strong>. Restartujte PC. Tím prodloužíte timeout z 2 na 8 sekund.</li>
<li><strong>Zkontrolujte teplotu a přetaktování:</strong> Pokud máte GPU přetaktovanou, resetujte ji na výchozí hodnoty v MSI Afterburner. Přehřátí nad 90 °C způsobuje TDR resety.</li>
<li><strong>Ověřte verzi DirectX Runtime:</strong> Spusťte <code>dxdiag</code> a zkontrolujte, zda je DirectX 12 nainstalován správně.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Clean GPU driver reinstall:</strong> Download <a href="https://www.guru3d.com/files-details/display-driver-uninstaller-download.html" target="_blank">DDU (Display Driver Uninstaller)</a>, boot into <strong>Safe Mode</strong> (Win+R → msconfig → Boot → Safe boot), run DDU to wipe all driver traces, then install the latest driver from nvidia.com or amd.com.</li>
<li><strong>Increase TdrDelay in the registry:</strong> Press Win+R, type <code>regedit</code>. Navigate to <code>HKLM\System\CurrentControlSet\Control\GraphicsDrivers</code>. Right-click → New DWORD (32-bit) → name it <em>TdrDelay</em> → set value to <strong>8</strong>. Restart. This extends the GPU timeout from 2 to 8 seconds.</li>
<li><strong>Check temperature and overclocking:</strong> If your GPU is overclocked, reset to defaults in MSI Afterburner. Temperatures above 90 °C cause TDR resets.</li>
<li><strong>Verify DirectX Runtime:</strong> Run <code>dxdiag</code> and confirm DirectX 12 is installed correctly.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>彻底重装 GPU 驱动：</strong>下载 DDU（显示驱动程序卸载器），进入<strong>安全模式</strong>（Win+R → msconfig → 引导 → 安全引导），运行 DDU 彻底清除驱动，然后从 nvidia.com 或 amd.com 安装最新驱动。</li>
<li><strong>在注册表中增加 TdrDelay 值：</strong>按 Win+R，输入 <code>regedit</code>。导航到 <code>HKLM\System\CurrentControlSet\Control\GraphicsDrivers</code>。右键 → 新建 DWORD（32 位）→ 命名为 <em>TdrDelay</em> → 设置值为 <strong>8</strong>。重启。这将 GPU 超时从 2 秒延长到 8 秒。</li>
<li><strong>检查温度和超频：</strong>如果 GPU 已超频，在 MSI Afterburner 中重置为默认值。温度超过 90°C 会导致 TDR 重置。</li>
<li><strong>验证 DirectX 运行时：</strong>运行 <code>dxdiag</code> 确认 DirectX 12 安装正确。</li>
</ol>`
        },
        details: {
            cs: "TDR (Timeout Detection and Recovery) je bezpečnostní mechanismus Windows. Pokud GPU neodpoví na příkaz jádra do 2 sekund (výchozí TdrDelay=2), Windows předpokládá zamrznutí GPU a pokusí se o reset ovladače – projeví se krátkým blackoutem obrazovky. Pokud reset selže 3× za sebou, systém havarijně ukončí s BSOD VIDEO_TDR_FAILURE. Soubor MINIDUMP obsahuje název modulu nvlddmkm.sys (NVIDIA) nebo atikmpag.sys (AMD). Hlavní příčiny: přetaktování GPU mimo stabilní rozsah, malware blokující GPU zdroje, shader kompilační spike v nové hře, nebo zastaralý DirectX runtime. Pokročilé řešení: v regeditu nastavte HKLM\\System\\CurrentControlSet\\Control\\GraphicsDrivers\\TdrDelay = 8, nebo TdrLevel = 0 pro zakázání TDR (pouze pro diagnostiku).",
            en: "TDR (Timeout Detection and Recovery) is a Windows safety mechanism. If the GPU fails to respond to a kernel command within 2 seconds (default TdrDelay=2), Windows assumes the GPU has hung and attempts a driver reset, visible as a brief screen blackout. If the reset fails 3 consecutive times, the system crashes with BSOD VIDEO_TDR_FAILURE. The MINIDUMP file identifies nvlddmkm.sys (NVIDIA) or atikmpag.sys (AMD). Primary causes: GPU overclocking beyond stable limits, malware consuming GPU resources, shader compilation spikes in new games, or outdated DirectX runtime. Advanced fix: set HKLM\\System\\CurrentControlSet\\Control\\GraphicsDrivers\\TdrDelay = 8 in Registry Editor, or set TdrLevel = 0 to disable TDR entirely (for diagnostics only).",
            zh: "TDR（超时检测与恢复）是 Windows 安全机制。若 GPU 在 2 秒内未响应内核命令（默认 TdrDelay=2） ,Windows 假定 GPU 挂起并尝试重置驱动，表现为屏幕短暂变黑。若连续 3 次重置失败，系统发生蓝屏 VIDEO_TDR_FAILURE。MINIDUMP 标识故障模块为 nvlddmkm.sys（NVIDIA）或 atikmpag.sys（AMD）。主要原因：超频超出稳定范围、恶意软件占用 GPU 资源、新游戏着色器编译尖峰或 DirectX 运行时过旧。高级修复：在注册表中将 TdrDelay 设为 8，或将 TdrLevel 设为 0 禁用 TDR（仅用于诊断）。"
        }
    },
    {
        id: "gpu-no-signal", type: "hardware", subcategory: "gpu",
        vendors: ["nvidia", "amd", "intel"],
        code: "No Signal / Black Screen on Boot",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: { cs: "Monitor nezobrazuje žádný signál při startu PC, přestože systém běží.", en: "Monitor shows no signal at PC startup, even though the system appears to run.", zh: "PC 启动时显示器无信号，但系统似乎在运行。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Zkontrolujte kabel a port:</strong> Vyzkoušejte jiný HDMI nebo DisplayPort kabel. Zapojte ho do jiného výstupního portu na GPU (ne na základní desce!). Připojení k integrovanému výstupu máteřské desky je nejčastější chyba.</li>
<li><strong>Resetujte CMOS:</strong> Vypněte PC, odpojte ze zásuvky a držte tlačítko Power 10 sekund. Poté vyjměte CR2032 baterii na základní desce na 30 sekund a vložte zpět.</li>
<li><strong>Otestujte GPU v jiném PCIe slotu:</strong> Vytáhněte kartu a zasuňte ji do druhého PCIe x16 slotu na desce. První slot může být poškozený.</li>
<li><strong>Zkontrolujte RAM:</strong> Odstraňte XMP profil v BIOSu a zkuste boot na základním JEDEC taktu. Přetaktovaná RAM může bránit dokončení POST.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Check cable and port:</strong> Try a different HDMI or DisplayPort cable. Plug it into a different output port on the GPU (not on the motherboard!). Connecting to the motherboard's integrated output is the most common mistake.</li>
<li><strong>Reset CMOS:</strong> Power off the PC, unplug from the wall and hold Power for 10 seconds. Then remove the CR2032 battery on the motherboard for 30 seconds and reinsert it.</li>
<li><strong>Test GPU in a different PCIe slot:</strong> Remove the card and insert it into the second PCIe x16 slot on the board. The primary slot may be damaged.</li>
<li><strong>Check RAM:</strong> Remove the XMP profile in BIOS and try booting at the default JEDEC speed. Overclocked RAM can prevent POST from completing.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>检查线缆和接口：</strong>尝试其他 HDMI 或 DisplayPort 线缆，并插入显卡上的其他输出接口（而非主板上的！）。接到主板集显输出是最常见的错误。</li>
<li><strong>重置 CMOS：</strong>关机并断开电源，按住电源按钟 10 秒。然后取出主板上的 CR2032 电池 30 秒后重新插入。</li>
<li><strong>在其他 PCIe 插槽中测试显卡：</strong>取出显卡并将其插入主板上的第二个 PCIe x16 插槽。主插槽可能损坏。</li>
<li><strong>检查内存：</strong>在 BIOS 中删除 XMP 配置文件，尝试以默认 JEDEC 频率启动。超频内存可能阅止 POST 完成。</li>
</ol>`
        },
        details: {
            cs: "No Signal je symptom, nikoli konkrétní chyba - příčin může být mnoho. Systematická diagnostika: (1) Zkontrolujte, zda je monitor připojen ke GPU (ne k integrovanému výstupu na základní desce). (2) CMOS reset – vyjmutí baterie CR2032 na 30 sekund nebo zkrat JBAT1 jumperu. (3) Zkuste GPU v jiném PCIe x16 slotu – první slot může být poškozený. (4) Zkuste jinou GPU nebo iGPU (Intel Quick Sync / AMD Vega) pro izolaci problému. (5) Zkontrolujte PCIe retiming – u AMD GPU + Intel 12. gen mohou nastat problémy s PCIe 4.0 signálovou integritou. Pomůže downgrade na PCIe 3.0 v BIOSu. (6) Overclocked RAM může způsobovat no-POST stav, resetujte RAM na JEDEC. Nástroj: zapněte PC bez GPU a sledujte BIOS diag LED – určí, kde POST havaruje.",
            en: "No Signal is a symptom, not a specific error - causes are numerous. Systematic diagnostics: (1) Verify the monitor is connected to the GPU (not the integrated output on the motherboard). (2) CMOS reset – remove CR2032 battery for 30 seconds or short JBAT1 jumper. (3) Test GPU in a different PCIe x16 slot – the primary slot may be damaged. (4) Try a different GPU or iGPU (Intel Quick Sync / AMD Vega) to isolate the problem. (5) Check PCIe retiming – AMD GPU + Intel 12th Gen can have PCIe 4.0 signal integrity issues; downgrading to PCIe 3.0 in BIOS may help. (6) Overclocked RAM can cause a no-POST state; reset RAM to JEDEC. Tool: boot without GPU and watch BIOS debug LED to determine where POST halts.",
            zh: "无信号是一种症状而非具体错误，原因众多。"
        }
    },
    {
        id: "cpu-whea", type: "hardware", subcategory: "cpu",
        vendors: ["intel", "amd"],
        code: "WHEA_UNCORRECTABLE_ERROR",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "BSOD chybový kód 0x0000124 – Windows zachytil Machine Check Exception přímo z CPU nebo chipset. Nastává při hardwarové nestabilitě: přetaktování mimo limity, podnapájení jádra nebo vadná paměť RAM způsobující data corruption.",
            en: "BSOD error code 0x0000124 – Windows caught a Machine Check Exception directly from the CPU or chipset. Occurs during hardware instability: overclocking beyond limits, CPU undervolt below threshold, or faulty RAM causing data corruption.",
            zh: "蓝屏错误代码 0x0000124——Windows 从 CPU 或芯片组直接捕获了机器检查异常。发生在超频超限、CPU 电压不足或内存故障导致数据损坏时。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Zakažte veškerý overclock v BIOSu</strong> – načtěte <em>Load Optimized Defaults</em> a otestujte stabilitu.</li>
<li><strong>Pokud XMP/EXPO profil RAM je aktivní</strong>, zkuste RAM na výchozí JEDEC frekvenci (2133/3200 MHz) a sledujte, zda BSOD zmizí.</li>
<li><strong>Spusťte paměťový test:</strong> Přes <code>Windows Security → Diagnostika paměti</code> nebo lépe bootovatelné <a href="https://www.memtest86.com/" target="_blank">MemTest86</a> (přes USB, alespoň 2 průchody).</li>
<li><strong>Zkontrolujte Event Viewer:</strong> <code>Win+X → Event Viewer → Windows Logs → System</code>, filtrujte zdroj <em>WHEA-Logger</em> – záznamy odhalí přesný vadný komponent.</li>
<li><strong>Při Intel 13/14. gen CPU:</strong> Nainstalujte nejnovější BIOS s opravou degradace (Intel Baseline Profile) a omezte PL1/PL2 na spec hodnoty.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Disable all overclocking in BIOS</strong> – load <em>Optimized Defaults</em> and test for stability.</li>
<li><strong>If XMP/EXPO RAM profile is active</strong>, try RAM at stock JEDEC frequency (2133/3200 MHz) to isolate the issue.</li>
<li><strong>Run a memory test:</strong> Use <code>Windows Memory Diagnostic</code> or bootable <a href="https://www.memtest86.com/" target="_blank">MemTest86</a> (USB, at least 2 passes).</li>
<li><strong>Check Event Viewer:</strong> <code>Win+X → Event Viewer → Windows Logs → System</code>, filter source <em>WHEA-Logger</em> – logs reveal the exact failing component.</li>
<li><strong>Intel 13/14th gen CPU:</strong> Flash the latest BIOS with the degradation fix (Intel Baseline Profile) and limit PL1/PL2 to spec values.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>在 BIOS 中禁用所有超频</strong>——加载优化默认值并测试稳定性。</li>
<li><strong>如果 XMP/EXPO 内存配置文件处于激活状态</strong>，尝试使用 JEDEC 默认频率运行内存以隔离问题。</li>
<li><strong>运行内存测试：</strong>使用 Windows 内存诊断或可引导的 MemTest86（USB，至少 2 轮）。</li>
<li><strong>检查事件查看器：</strong>筛选来源 WHEA-Logger，日志将揭示确切的故障组件。</li>
<li><strong>Intel 13/14 代 CPU：</strong>刷新含降级修复的最新 BIOS（Intel 基准配置文件）并限制 PL1/PL2。</li>
</ol>`
        },
        youtube: [
            { title: "WHEA_UNCORRECTABLE_ERROR – Fix krok za krokem (EN)", url: "https://www.youtube.com/results?search_query=WHEA+UNCORRECTABLE+ERROR+fix+windows+10+11+2024" }
        ],
        details: {
            cs: "WHEA (Windows Hardware Error Architecture) je low-level framework zachytávající Machine Check Exceptions (MCE) přímo z CPU. BSOD kód 0x0000124 je vyvolán, když CPU nahlásí nekorigovatelnou chybu přes MCE mechanismus (MSR registr IA32_MCG_STATUS). Nejčastější zdroje: (1) L1/L2/L3 cache parity error – nastává při undervoltu procesoru pod stability hranici nebo při přetaktování nad maximální frekvenci. (2) Interní UPI/Infinity Fabric link error u víceprocesorových systémů. (3) Vadná paměť způsobující data corruption při přístupu z CPU prefetcheru. (4) Koroze CPU kontaktů vlivem vlhkosti. Pokročilá diagnostika: v Event Vieweru → Windows Logs → System filtrujte na zdroj 'WHEA-Logger' – záznamy obsahují přesný MCi_STATUS registr identifikující postiženou část CPU (FPU, Load/Store, Instruction Fetch Unit).",
            en: "WHEA (Windows Hardware Error Architecture) is a low-level framework that captures Machine Check Exceptions (MCE) directly from the CPU. BSOD code 0x0000124 is triggered when the CPU reports an uncorrectable error via the MCE mechanism (MSR register IA32_MCG_STATUS). Most common sources: (1) L1/L2/L3 cache parity error – occurs when the CPU is undervolted below the stability threshold or overclocked above the maximum stable frequency. (2) Internal UPI/Infinity Fabric link error in multi-CPU systems. (3) Faulty RAM causing data corruption during CPU prefetcher access. (4) Corrosion on CPU contacts due to humidity. Advanced diagnostics: in Event Viewer → Windows Logs → System, filter by source 'WHEA-Logger' – entries contain the exact MCi_STATUS register value identifying the affected CPU sub-unit (FPU, Load/Store, Instruction Fetch Unit).",
            zh: "WHEA（Windows 硬件错误架构）是直接从 CPU 捕获机器检查异常（MCE）的底层框架。当 CPU 通过 MCE 机制（MSR 寄存器 IA32_MCG_STATUS）报告不可纠正错误时，触发蓝屏代码 0x0000124。最常见原因：(1) L1/L2/L3 缓存奇偶校验错误——降压低于稳定阈值或超频超过最大稳定频率时发生；(2) 多处理器系统中内部 UPI/Infinity Fabric 链路错误；(3) 内存故障导致 CPU 预取器数据损坏；(4) CPU 触点因湿气腐蚀。高级诊断：在事件查看器按来源'WHEA-Logger'筛选，条目包含精确的 MCi_STATUS 寄存器值，可识别受影响的 CPU 子单元。"
        }
    },
    {
        id: "cpu-throttle", type: "hardware", subcategory: "cpu",
        vendors: ["intel", "amd"],
        code: "CPU Thermal Throttling",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: { cs: "Procesor snižuje frekvenci kvůli přehřátí – drastický pokles výkonu.", en: "CPU reduces frequency due to overheating – severe performance drop.", zh: "CPU 因过热降低频率，性能大幅下降。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Vyčistěte chladič od prachu:</strong> Vypněte PC, odpojte ze zásuvky. Stlačeným vzduchem vyfoukejte žebra chladiče a ventilátor. Prach jako izolant zvyšuje teplotu o 15–30 °C.</li>
<li><strong>Vyměňte teplovodivou pastu:</strong> Sejměte chladič, vyčistěte starou pastu isopropylalkoholem (hadříkem nebo tampónem). Naneste malou kapku nové pasty (Thermal Grizzly Kryonaut, Noctua NT-H1) na střed CPU a připevněte chladič.</li>
<li><strong>Sledujte teploty v HWInfo64:</strong> Stáhněte HWInfo64 (zdarma), klikněte Sensors. Sledujte <em>CPU Core Max</em>. Pokud přesáhne 90–95 °C při zátěži, CPU třímá výkon.</li>
<li><strong>Zvažte lepší chladič:</strong> Pokud máte box chladič nebo levný 3rd-party, upgradujte na kvalitu jako Noctua NH-U12A nebo Deepcool AK620. Pro high-end CPU je AIO vodní chladič 240/360 mm ideální.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Clean dust from the cooler:</strong> Power off and unplug. Blow compressed air through the heatsink fins and fan. Dust acts as an insulator and can raise temperatures by 15–30 °C.</li>
<li><strong>Replace thermal paste:</strong> Remove the cooler, clean old paste with isopropyl alcohol (coffee filter or cotton pad). Apply a small rice-grain amount of fresh paste (Thermal Grizzly Kryonaut, Noctua NT-H1) to the center of the CPU and reattach the cooler.</li>
<li><strong>Monitor temperatures in HWInfo64:</strong> Download HWInfo64 (free), click Sensors. Watch <em>CPU Core Max</em>. If it exceeds 90–95 °C under load, the CPU is throttling.</li>
<li><strong>Consider a better cooler:</strong> If using the box or a cheap cooler, upgrade to something like Noctua NH-U12A or Deepcool AK620. For high-end CPUs an AIO liquid cooler (240/360 mm) is ideal.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>清洁散热器的灰尘：</strong>关机并拔插头。用压缩空气吹空散热器鳍片和风扇上的灰尘。灰尘就像隔热层，会使温度升高 15–30°C。</li>
<li><strong>更换导热硅脂：</strong>拧下散热器，用异丙醇清洁旧硅脂。在 CPU 中心涂上少量新硅脂（大米粒大小），然后重新安装散热器。</li>
<li><strong>在 HWInfo64 中监控温度：</strong>下载 HWInfo64（免费），点击传感器。查看 <em>CPU Core Max</em>。若负载下超过 90–95°C，则 CPU 正在降频。</li>
<li><strong>考虑更佳散热器：</strong>若使用盒装或便宜散热器，可升级为 Noctua NH-U12A 或 Deepcool AK620。高端 CPU 可考虑 240/360mm AIO 水冷。</li>
</ol>`
        },
        details: {
            cs: "Tepelné škrtení (thermal throttling) je hardwarový ochranný mechanismus integrovaný do CPU (Intel RAPL, AMD Precision Boost Overdrive). Jakmile teplota jádra překročí Tjmax (Intel 100°C, AMD 95°C), CPU automaticky snižuje frekvenci a napětí. Monitorování: HWInfo64 nebo CoreTemp zobrazí 'Thermal Throttling' flag (bit 1 v MSR IA32_THERM_STATUS). Příčiny degradace chlazení: (1) Vyschnutí teplovodivé pasty po 3–5 letech – tepelná vodivost klesá z ~12 W/mK na méně než 3 W/mK. (2) Ucpání heatpipe nebo žebrování chladiče prachem. (3) Špatná instalace chladiče – nerovnoměrný kontakt IHS (Integrated Heat Spreader). (4) Nedostatečný průtok vzduchu v skříni. Řešení: aplikujte kvalitní pastu (Thermal Grizzly Kryonaut, Noctua NT-H1), ověřte kontakt chladiče, zvyšte RPM ventilátorů.",
            en: "Thermal throttling is a hardware protection mechanism built into the CPU (Intel RAPL, AMD Precision Boost Overdrive). When core temperature exceeds Tjmax (typically 100°C Intel, 95°C AMD), the CPU automatically reduces frequency and voltage. Monitoring: HWInfo64 or CoreTemp shows the 'Thermal Throttling' flag (bit 1 in MSR IA32_THERM_STATUS). Cooling degradation causes: (1) Thermal paste drying out after 3–5 years – conductivity drops from ~12 W/mK to under 3 W/mK. (2) Blocked heatpipes or heatsink fins from dust. (3) Improper cooler installation – uneven contact with the IHS. (4) Insufficient chassis airflow. Solution: use quality paste (Thermal Grizzly Kryonaut, Noctua NT-H1), verify cooler seating, increase fan RPMs.",
            zh: "热降频是直接集成到 CPU 中的硬件保护机制（Intel RAPL，AMD 精准睿频超载）。当核心温度超过 Tjmax（Intel 100°C，AMD 95°C）时，CPU 自动降低频率和电压。监控：HWInfo64 或 CoreTemp 显示'Thermal Throttling'标志位。散热退化原因：(1) 硅脂 3-5 年后干涸——热导率从约 12 W/mK 降至 3 W/mK 以下；(2) 散热管或鳍片被灰尘堵塞；(3) 散热器安装不当——与 IHS 接触不均匀；(4) 机箱气流不足。解决方案：使用优质硅脂，确认散热器安装，提高风扇转速。"
        }
    },

    // =========================================================
    // === RAM ===
    // =========================================================
    {
        id: "ram-55", type: "hardware", subcategory: "ram",
        vendors: ["ddr4", "ddr5"],
        code: "Q-Code 53 / 55",
        category: { cs: "Paměť RAM", en: "Memory (RAM)", zh: "内存" },
        description: { cs: "Memory not installed – BIOS nerozpoznal paměťové moduly.", en: "Memory not installed – BIOS could not initialize memory modules.", zh: "未安装内存——BIOS 无法初始化内存模块。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Vyjměte a zasťte RAM moduly:</strong> Vypněte PC a odpojte ho zásuvky. Uchopte modul za okraje a tahem kolmo nahoru ho vytáhněte. Vyčistěte kontakty gumovasem a zasuněte pevně zpět dokud ne slyšíte cvaknutí na obou stranách.</li>
<li><strong>Otestujte jeden modul ve slotu A2:</strong> Slot A2 je nejbližší k CPU (nebo dle manuálu desky). Zapojte jen jeden modul a zkuste boot. Pokud funguje, druhý modul nebo jeho slot je vadný.</li>
<li><strong>Vypněte XMP profil:</strong> V BIOSu nastavte frekvenci RAM na výchozí 2133/3200 MHz bez XMP. Agresivní XMP profil může bránit inicializaci.</li>
<li><strong>Resetujte CMOS:</strong> Odpojte PC od proudu, vyjměte CR2032 baterii na 30 sekund. Tím vymažete uloženou konfiguraci RAM.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Remove and reseat RAM modules:</strong> Power off and unplug. Grip the module by its edges and pull straight up to remove. Clean contacts with an eraser, then firmly press back in until you hear a click on both latches.</li>
<li><strong>Test one module in slot A2:</strong> Slot A2 is nearest the CPU (or per your board's manual). Insert only one stick and try to boot. If it works, the other stick or its slot is faulty.</li>
<li><strong>Disable XMP profile:</strong> In BIOS, set RAM frequency to the default 2133/3200 MHz without XMP. An aggressive XMP profile can prevent initialization.</li>
<li><strong>Reset CMOS:</strong> Unplug the PC and remove the CR2032 battery for 30 seconds. This clears the stored RAM configuration.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>取出并重新插入内存条：</strong>关机并拔插头。抓住内存条两侧直接向上拔出。用橡皮擦清洁金手指，然后用力插回直到两侧卡扣哓发出哓声。</li>
<li><strong>单条在 A2 插槽测试：</strong>A2 插槽最靠近 CPU（或参考主板手册）。只插一条内存尝试启动。若成功，则另一条或其插槽有问题。</li>
<li><strong>关闭 XMP 配置文件：</strong>在 BIOS 中将内存频率设置为默认 2133/3200 MHz，不使用 XMP。过于激进的 XMP 可能阻止初始化。</li>
<li><strong>重置 CMOS：</strong>拔插头并取出 CR2032 电池 30 秒，即可清除已存展的内存配置。</li>
</ol>`
        },
        details: {
            cs: "Q-Code 53 nebo 55 znamená selhání Memory Training, tj. BIOS nedokázal inicializovat SPD (Serial Presence Detect) komunikaci s RAM modulem přes I2C/SMBus sběrnici. Training probíhá v fázích: SPD čtení → XMP/DOCP profil aplikace → ZQ kalibrace → DDR training (CA/CS, WR Leveling, Read/Write DQ). Příčiny a řešení: (1) Fyzicky špatný kontakt modulu – očistěte zlaté kontakty pryžovou gumou a isopropylalkoholem. (2) Příliš vysoký tlak chladiče CPU deformuje socket – zkontrolujte rovnoměrné docisnění. (3) Testujte RAM JEDEC profilem (bez XMP) – snižte frekvenci na 3200 MHz. (4) Zkuste moduly v jiném slotu nebo na jiné základní desce. (5) Poškozené piny v DIMM slotu – prohlédněte pod lupou.",
            en: "Q-Code 53 or 55 signals a Memory Training failure – the BIOS could not initialize SPD (Serial Presence Detect) communication with the RAM module over I2C/SMBus. Training occurs in phases: SPD read → XMP/DOCP profile application → ZQ calibration → DDR training (CA/CS, WR Leveling, Read/Write DQ). Causes and fixes: (1) Poor physical module contact – clean gold contacts with a pencil eraser and isopropyl alcohol. (2) Excessive CPU cooler pressure deforms the socket – check for even cooler mounting. (3) Test RAM with JEDEC profile only (no XMP) – reduce frequency to 3200MHz. (4) Try modules in different slots or on a different motherboard. (5) Damaged DIMM slot pins – inspect under magnification.",
            zh: "Q-Code 53 或 55 表示内存训练失败——BIOS 无法通过 I2C/SMBus 总线初始化与内存模块的 SPD 通信。训练分多个阶段：SPD 读取 → XMP/DOCP 配置文件应用 → ZQ 校准 → DDR 训练。原因与解决方案：(1) 模块物理接触不良——用橡皮擦和异丙醇清洁金手指；(2) CPU 散热器压力过大使插槽变形；(3) 仅使用 JEDEC 配置文件测试内存，将频率降至 3200MHz；(4) 在不同插槽或主板上测试模块；(5) DIMM 插槽引脚损坏——用放大镜检查。"
        }
    },
    {
        id: "ram-irql", type: "hardware", subcategory: "ram",
        vendors: ["ddr4", "ddr5"],
        code: "IRQL_NOT_LESS_OR_EQUAL",
        category: { cs: "Paměť RAM", en: "Memory (RAM)", zh: "内存" },
        description: { cs: "BSOD 0x0000000A – kernel přistoupil k paměti na nesprávné IRQ úrovni.", en: "BSOD 0x0000000A – kernel accessed memory at an improper IRQ level.", zh: "蓝屏 0x0000000A——内核以不正确的中断请求级别访问内存。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Vytvořte bootovací USB s MemTest86:</strong> Stáhněte MemTest86 z memtest86.com, rozbalte na USB klicič a nabootujte z něj. Nechte proběhnout alespoň <strong>2 kompletní průchody</strong>. Jakákoli chyba (non-zero count) znamená vadnou RAM.</li>
<li><strong>Vypněte XMP/DOCP v BIOSu:</strong> Restartujte do BIOSu (Del nebo F2 při startu), vyhledejte sekci <em>DRAM Frequency</em> nebo <em>AI Overclock Tuner</em> a vypněte XMP. Boot na výchozích 2133/3200 MHz je stabiližující krok.</li>
<li><strong>Testujte moduly samostatně:</strong> Vložte jen jeden modul RAM a spusťte MemTest86. Poté vystrnadejte a vyzkoušejte druhý. Tak izolujete vadný kus.</li>
<li><strong>Zjistěte vadnou součástku:</strong> Zkontrolujte MINIDUMP soubory v <code>C:\Windows\Minidump</code> pomocí nástroje <strong>WhoCrashed</strong> (zdarma) – ukáže, který ovladač způsobil BSOD.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Create a bootable MemTest86 USB:</strong> Download MemTest86 from memtest86.com, extract it to a USB drive and boot from it. Let it run for at least <strong>2 complete passes</strong>. Any error (non-zero count) means faulty RAM.</li>
<li><strong>Disable XMP/DOCP in BIOS:</strong> Restart into BIOS (Del or F2 on boot), find the <em>DRAM Frequency</em> or <em>AI Overclock Tuner</em> section and disable XMP. Booting at default 2133/3200 MHz is a stabilizing step.</li>
<li><strong>Test modules individually:</strong> Insert only one RAM stick and run MemTest86. Then swap and test the other. This isolates the faulty piece.</li>
<li><strong>Identify the culprit:</strong> Check MINIDUMP files in <code>C:\Windows\Minidump</code> using the free tool <strong>WhoCrashed</strong> – it shows which driver caused the BSOD.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>创建 MemTest86 启动 USB：</strong>从 memtest86.com 下载 MemTest86，解压到 U 盘并从中启动。至少运行 <strong>2 个完整轮次</strong>。任何错误（非零计数）表示内存有缺陷。</li>
<li><strong>在 BIOS 中关闭 XMP/DOCP：</strong>重启进入 BIOS（启动时按 Del 或 F2），找到 <em>DRAM 频率</em>或超频设置并关闭 XMP。以默认 2133/3200 MHz 启动是稳定性步骤。</li>
<li><strong>单条测试内存：</strong>只插一条内存条运行 MemTest86，然后换另一条测试。这样可以隔离故障部件。</li>
<li><strong>确定罪魁：</strong>使用免费工具 <strong>WhoCrashed</strong> 检查 <code>C:\Windows\Minidump</code> 中的文件，它会显示导致蓝屏的驱动程序。</li>
</ol>`
        },
        details: {
            cs: "IRQL_NOT_LESS_OR_EQUAL (stop kód 0x0000000A) nastává, když kernel-mode kód se pokusí přistoupit k paměti na nesprávné IRQ úrovni nebo přistoupí na neplatnou virtuální adresu. Téměř vždy je způsoben: (1) Nestabilní RAM – bit-flip způsobí, že pointer ukazuje na neplatnou adresu. Spusťte MemTest86 (bootovatelný USB) – jakýkoli non-zero počet chyb je kritický. (2) XMP profil mimo specifikaci základní desky – tCL, tRCD hodnoty příliš agresivní. (3) Poškozený ovladač – hledejte v MINIDUMP souboru (C:\\Windows\\Minidump) jméno faulting modulu přes WinDBG nebo WhoCrashed. (4) Hardwarová chyba IMC (Integrated Memory Controller) na CPU. Testovací metodika: MemTest86 → PassMark PerformanceTest Memory → Windows paměťový diagnostický nástroj (mdsched.exe).",
            en: "IRQL_NOT_LESS_OR_EQUAL (stop code 0x0000000A) occurs when kernel-mode code tries to access memory at an improper IRQ level or dereferences an invalid virtual address. It is almost always caused by: (1) Unstable RAM – a bit-flip causes a pointer to reference an invalid address. Run MemTest86 (bootable USB) – any non-zero error count is critical. (2) An XMP profile exceeding the motherboard's capabilities – aggressive tCL, tRCD timings. (3) A corrupted driver – check the MINIDUMP file (C:\\Windows\\Minidump) using WinDBG or WhoCrashed. (4) A hardware fault in the CPU's Integrated Memory Controller (IMC). Testing sequence: MemTest86 → PassMark PerformanceTest Memory → Windows Memory Diagnostic (mdsched.exe).",
            zh: "IRQL_NOT_LESS_OR_EQUAL（停止代码 0x0000000A）发生在内核模式代码尝试以不正确的 IRQ 级别访问内存或取消引用无效虚拟地址时。几乎总是由以下原因引起：(1) 不稳定的内存——位翻转导致指针引用无效地址，运行 MemTest86（可启动 USB）任何非零错误值都是危险的；(2) XMP 配置文件超出主板能力；(3) 驱动程序损坏——使用 WinDBG 或 WhoCrashed 在 MINIDUMP 中查找故障模块；(4) CPU 集成内存控制器（IMC）硬件故障。"
        }
    },
    {
        id: "ram-xmp", type: "hardware", subcategory: "ram",
        vendors: ["ddr4", "ddr5"],
        code: "XMP / EXPO Profile Instability",
        category: { cs: "Paměť RAM", en: "Memory (RAM)", zh: "内存" },
        description: { cs: "Systém je nestabilní nebo se nespustí po aktivaci XMP/EXPO profilu v BIOSu.", en: "System is unstable or fails to boot after enabling XMP/EXPO profile in BIOS.", zh: "在 BIOS 中启用 XMP/EXPO 配置文件后系统不稳定或无法启动。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Snižte frekvenci RAM o jeden stupeň:</strong> Např. máte-li XMP 6000 MHz, zkuste XMP2 nebo manualně nastavte 5600 MHz. V BIOSu hledejte <em>DRAM Frequency</em> nebo <em>Memory Ratio</em>.</li>
<li><strong>Mírně zvyšte DRAM napětí:</strong> V BIOSu vyhledejte <em>DRAM Voltage</em> – DDR4 nastavte na 1,35 V (max 1,45 V), DDR5 na 1,1–1,15 V. Vyšší napětí pomáhá stabilitní margiň pro vyšší frekvence.</li>
<li><strong>Aktivujte XMP1 místo XMP3:</strong> V BIOSu zvolte nižší XMP profil. XMP3 má agresivnější timingové hodnoty, které ne každá deska zvládne.</li>
<li><strong>Aktualizujte BIOS:</strong> Novější verze BIOSu běžně zlepšují kompatibilitu s XMP profily. Stáhněte ze stránek výrobce desky.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Lower RAM frequency by one step:</strong> E.g. if you have XMP 6000 MHz, try XMP2 or manually set 5600 MHz. In BIOS look for <em>DRAM Frequency</em> or <em>Memory Ratio</em>.</li>
<li><strong>Slightly increase DRAM voltage:</strong> In BIOS find <em>DRAM Voltage</em> – set DDR4 to 1.35V (max 1.45V), DDR5 to 1.1–1.15V. Higher voltage provides stability margin for higher frequencies.</li>
<li><strong>Select XMP1 instead of XMP3:</strong> In BIOS choose the lower XMP profile. XMP3 has more aggressive timing values that not every board can handle.</li>
<li><strong>Update BIOS:</strong> Newer BIOS versions routinely improve XMP compatibility. Download from your motherboard manufacturer's website.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>将内存频率降一个档位：</strong>例如若 XMP 为 6000 MHz，尝试 XMP2 或手动设置 5600 MHz。在 BIOS 中找 <em>DRAM 频率</em>或<em>内存比率</em>。</li>
<li><strong>小幅提高 DRAM 电压：</strong>在 BIOS 中找 <em>DRAM 电压</em>，DDR4 设置为 1.35V（最大 1.45V），DDR5 设置为 1.1–1.15V。高电压为高频现提供稳定性裕量。</li>
<li><strong>选择 XMP1 而非 XMP3：</strong>在 BIOS 中选择较低的 XMP 配置文件。XMP3 有更激进的时序值，并非所有主板都能应对。</li>
<li><strong>更新 BIOS：</strong>新版 BIOS 通常改善了 XMP 兼容性。从主板制造商网站下载。</li>
</ol>`
        },
        details: {
            cs: "XMP (eXtreme Memory Profile) je Intel certifikovaný overclocking profil uložený v SPD EEPROM modulu. EXPO je AMD ekvivalent. Profily definují frekvenci, primární timingový sextuplet (tCL-tRCD-tRP-tRAS-tRC-tCR) a napájecí napětí (VDD, VDDQ). Problémy nastávají, protože XMP profily jsou testovány na referenčních základních deskách. Konkrétní problémy: (1) Frekvence 6000+ MHz DDR5 vyžaduje silnější Integrated Memory Controller – ne všechny CPU generace to zvládají. (2) Nestabilita DRAM SA (System Agent) nebo IO napětí. (3) Dual-rank moduly jsou výrazně náročnější na trénink. Diagnostika: zkuste ručně nastavit nižší frekvenci (např. 5600 MHz) se zachováním XMP timingů, nebo použijte EXPO/XMP1 profil místo XMP3.",
            en: "XMP (eXtreme Memory Profile) is an Intel-certified overclocking profile stored in the SPD EEPROM. EXPO is the AMD equivalent. Profiles define frequency, the primary timing sextuplet (tCL-tRCD-tRP-tRAS-tRC-tCR), and supply voltages. Issues arise because XMP profiles are validated on reference motherboards; real boards have varying PCB trace lengths and DIMM slot quality. Specific problems: (1) DDR5 frequencies above 6000MHz require a robust Integrated Memory Controller – not all CPU generations support it. (2) DRAM SA or IO voltage instability. (3) Dual-rank modules are significantly harder to train. Diagnosis: try manually setting a lower frequency while retaining XMP timings, or use the EXPO/XMP1 profile instead of XMP3.",
            zh: "XMP 是存储在内存模块 SPD EEPROM 中的 Intel 认证超频配置文件，EXPO 是 AMD 的等效版本。配置文件定义频率、主要时序六元组和供电电压。问题出现是因为 XMP 在参考主板上验证，而实际主板有不同的走线长度和插槽质量。具体问题：(1) DDR5 6000MHz+ 需要强大的集成内存控制器；(2) DRAM SA 或 IO 电压不稳定；(3) 双 Rank 模块训练难度大。诊断：尝试手动设置较低频率并保留 XMP 时序，或使用 EXPO/XMP1 配置文件代替 XMP3。"
        }
    },

    // =========================================================
    // === DISK ===
    // =========================================================
    {
        id: "disk-smart", type: "hardware", subcategory: "disk",
        vendors: ["hdd", "ssd", "nvme"],
        code: "S.M.A.R.T. Status Bad",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: { cs: "Firmware disku detekoval kritický stav – hrozí ztráta dat.", en: "Drive firmware detected an imminent failure – data loss is probable.", zh: "硬盘固件检测到临近故障状态，数据丢失风险极高。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>❗ Okamžitě zálohujte všechna data!</strong> Použijte externí disk, cloud (Google Drive, OneDrive) nebo druhý interní disk. S.M.A.R.T. Status Bad znamená, že disk může selhat kdykoli – minuta navíc může být příliš pozdně.</li>
<li><strong>Ověřte stav S.M.A.R.T. v CrystalDiskInfo:</strong> Stáhněte zdarma z crystalmark.info. Otevřete program a zkontrolujte atributy <em>05 Reallocated Sectors</em>, <em>C5 Current Pending Sectors</em> a <em>C6 Uncorrectable Sectors</em>. Jakákoli non-zero hodnota = kritický stav.</li>
<li><strong>Objednejte náhradní disk:</strong> Po záloze naplánujte výměnu. Pro rychlou obnovu systému použijte Macrium Reflect Free (klonovací software) pro příkřížení Windows na nový disk.</li>
<li><strong>Nezahajujte chkdsk na porušeným disku:</strong> chkdsk /r může situaci zhoršit u fyzicky umírajícího HDD. Záloha je priorita.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>❗ Back up ALL data immediately!</strong> Use an external drive, cloud storage (Google Drive, OneDrive), or a second internal disk. S.M.A.R.T. Status Bad means the drive can fail at any moment – every extra minute counts.</li>
<li><strong>Verify S.M.A.R.T. status in CrystalDiskInfo:</strong> Download free from crystalmark.info. Open and check attributes <em>05 Reallocated Sectors</em>, <em>C5 Current Pending Sectors</em>, and <em>C6 Uncorrectable Sectors</em>. Any non-zero value = critical state.</li>
<li><strong>Order a replacement drive:</strong> After backing up, plan the swap. Use Macrium Reflect Free (cloning software) to clone Windows to the new drive for a quick system restore.</li>
<li><strong>Do not run chkdsk on a dying drive:</strong> chkdsk /r can worsen the situation on a physically failing HDD. Backup is the priority.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>❗ 立即备份所有数据！</strong>使用外置硬盘、云存储（Google Drive、OneDrive）或第二块内置硬盘。S.M.A.R.T. 状态差意味着硬盘可能随时故障，每多一分钟都可能太晚。</li>
<li><strong>在 CrystalDiskInfo 中验证 S.M.A.R.T. 状态：</strong>从 crystalmark.info 免费下载。打开后检查属性 <em>05 重新分配扰区</em>、<em>C5 当前待处理扰区</em>和 <em>C6 不可纠正扰区</em>。任何非零值 = 危险状态。</li>
<li><strong>订购更换硬盘：</strong>备份后计划更换。使用 Macrium Reflect Free（克隆软件）将 Windows 克隆到新硬盘以快速恢复系统。</li>
<li><strong>不要在故障硬盘上运行 chkdsk：</strong>在物理损坏的 HDD 上，chkdsk /r 可能加剧情况。备份才是首要任务。</li>
</ol>`
        },
        details: {
            cs: "S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) je standardizovaný firmware diagnostický systém ve všech moderních HDD a SSD. Obsahuje desítky atributů; kritické atributy mají 'Threshold' hodnotu – pokud Current Value klesne pod Threshold, disk je klasifikován jako 'BAD'. Nejkritičtější atributy: (1) #05 Reallocated Sectors Count – počet sektorů přesměrovaných do rezervní oblasti. Non-zero = problém; rostoucí počet = selhání blízko. (2) #187 Reported Uncorrectable Errors – chyby, které ECC nedokázal opravit. (3) #197 Current Pending Sectors – nestabilní sektory čekající na realokaci. (4) #198 Offline Uncorrectable Sectors. Nástroje: CrystalDiskInfo (Windows), smartmontools (CLI), HD Tune Pro. Pro SSD navíc sledujte #233 Media Wearout Indicator a #177 Wear Leveling Count.",
            en: "S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) is a standardized firmware diagnostic system in all modern HDDs and SSDs. It tracks dozens of attributes; critical attributes have a 'Threshold' value – when Current Value drops below Threshold, the drive is classified as 'BAD'. Most critical attributes: (1) #05 Reallocated Sectors Count – sectors remapped to the spare area. Any non-zero value is a warning; rising count signals imminent failure. (2) #187 Reported Uncorrectable Errors – errors the ECC algorithm couldn't correct. (3) #197 Current Pending Sectors – unstable sectors awaiting reallocation. (4) #198 Offline Uncorrectable Sectors. Tools: CrystalDiskInfo (Windows), smartmontools (CLI), HD Tune Pro. For SSDs, additionally monitor #233 Media Wearout Indicator and #177 Wear Leveling Count.",
            zh: "S.M.A.R.T. 是所有现代 HDD 和 SSD 中的标准化固件诊断系统。关键属性有一个'阈值'——当当前值低于阈值时，硬盘被归类为'差'。最关键的属性：(1) #05 重新分配扇区计数——任何非零值都是警告，持续增长表示即将故障；(2) #187 报告的不可纠正错误；(3) #197 当前待处理扇区；(4) #198 离线不可纠正扇区。工具：CrystalDiskInfo、smartmontools、HD Tune Pro。对于 SSD，还需监控 #233 媒体磨损指示器和 #177 磨损均衡计数。"
        }
    },
    {
        id: "disk-nvme-reset", type: "hardware", subcategory: "disk",
        vendors: ["nvme"],
        code: "NVMe Controller Reset / 0xc0000185",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: { cs: "Windows hlásí chybu přístupu k NVMe disku nebo BSOD 0xc0000185.", en: "Windows reports NVMe access error or BSOD 0xc0000185 (STATUS_IO_DEVICE_ERROR).", zh: "Windows 报告 NVMe 访问错误或蓝屏 0xc0000185。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Vyzkoušejte jiný M.2 slot:</strong> Vypněte PC, odpojte ze zásuvky. Vytašuchte NVMe disk (odroubujte šroubek na konci) a přesuňte ho do druhého M.2 slotu. Sloty sdílejí PCIe linky a některé kombinace mohou způsobovat problémy.</li>
<li><strong>Aktualizujte firmware NVMe disku:</strong> Samsung Magician, Western Digital Dashboard nebo Crucial Storage Executive umí aktualizovat firmware přímo. Firmware bugy jsou běžné u všech výrobců.</li>
<li><strong>Zkontrolujte teplotu disku:</strong> V CrystalDiskInfo otevřete sekci <em>Temperature</em>. Pokud NVMe přesahuje 70 °C při zátěži, dojde k thermal throttling – přidejte M.2 heatsink nebo zleněšete okolní průduch v skříni.</li>
<li><strong>Spusťte opravu systému:</strong> Otevřete Příkazový řádek jako správce a spusťte <code>sfc /scannow</code> následované <code>DISM /Online /Cleanup-Image /RestoreHealth</code> pro opravu Windows.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Try a different M.2 slot:</strong> Power off and unplug. Remove the NVMe drive (unscrew the retaining screw) and move it to the second M.2 slot. Slots share PCIe lanes and some combinations cause conflicts.</li>
<li><strong>Update NVMe firmware:</strong> Samsung Magician, Western Digital Dashboard, or Crucial Storage Executive can update firmware directly. Firmware bugs are common across all manufacturers.</li>
<li><strong>Check drive temperature:</strong> In CrystalDiskInfo check the <em>Temperature</em> field. If NVMe exceeds 70 °C under load, thermal throttling occurs – add an M.2 heatsink or improve airflow in the case.</li>
<li><strong>Run system repair:</strong> Open Command Prompt as administrator and run <code>sfc /scannow</code> followed by <code>DISM /Online /Cleanup-Image /RestoreHealth</code> to fix Windows.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>尝试其他 M.2 插槽：</strong>关机并拔插头。拧出 NVMe 硬盘（拧下尾部浮动耕钉）并移动到第二个 M.2 插槽。插槽共享 PCIe 通道，某些组合可能引起冲突。</li>
<li><strong>更新 NVMe 固件：</strong>Samsung Magician、Western Digital Dashboard 或 Crucial Storage Executive 可直接更新固件。固件错误在所有制造商中常见。</li>
<li><strong>检查硬盘温度：</strong>在 CrystalDiskInfo 中查看<em>温度</em>字段。如果 NVMe 在负载下超过 70°C，会发生热降频，需添加 M.2 散热片或改善机算内的气流。</li>
<li><strong>运行系统修复：</strong>以管理员身份打开命令提示符，运行 <code>sfc /scannow</code>，然后运行 <code>DISM /Online /Cleanup-Image /RestoreHealth</code> 修复 Windows。</li>
</ol>`
        },
        details: {
            cs: "Chyba STATUS_IO_DEVICE_ERROR (0xC0000185) na NVMe SSD indikuje selhání komunikace mezi PCIe řadičem a SSD kontrolérem na úrovni NVMe protokolu. Příčiny: (1) Vadné PCIe spoje nebo poškozený M.2 slot – kolíky M.2 konektoru se opotřebují. (2) NVMe disk přehřívá (throttle nastane ≥ 70°C u TLC NAND) – přidejte M.2 heatsink. (3) Firmware bug NVMe kontroléru – Samsung 970 Evo Plus měl notoricky bug ve firmwaru 2B2QEXM7. (4) Koruptovaný systémový oddíl ovlivňující NVMe driver stack (StorNVMe.sys). Diagnostika: v Správci zařízení zkontrolujte Device Properties → Events; spusťte CrystalDiskMark nebo NVMe CLI (nvme smart-log); v Event Vieweru filtrujte zdroje 'disk' a 'nvme'.",
            en: "STATUS_IO_DEVICE_ERROR (0xC0000185) on an NVMe SSD indicates communication failure between the PCIe controller and the SSD controller at the NVMe protocol level. Causes: (1) Faulty PCIe traces or a damaged M.2 slot – M.2 connector pins can wear out. (2) NVMe overheating (throttling at ≥70°C for TLC NAND) – add an M.2 heatsink. (3) NVMe controller firmware bug – Samsung 970 Evo Plus had a notorious issue in firmware 2B2QEXM7. (4) Corrupted system partition affecting the NVMe driver stack (StorNVMe.sys). Diagnostics: check Device Manager → Device Properties → Events; run CrystalDiskMark or NVMe CLI (nvme smart-log); filter 'disk' and 'nvme' sources in Event Viewer.",
            zh: "NVMe SSD 上的 STATUS_IO_DEVICE_ERROR（0xC0000185）表示 PCIe 控制器与 SSD 控制器之间的通信在 NVMe 协议层面失败。原因：(1) PCIe 走线故障或 M.2 插槽损坏——M.2 连接器引脚可能磨损；(2) NVMe 过热（TLC NAND 在 ≥70°C 时降频）——添加 M.2 散热片；(3) NVMe 控制器固件错误——三星 970 Evo Plus 在固件 2B2QEXM7 中有著名问题；(4) 系统分区损坏影响 NVMe 驱动栈（StorNVMe.sys）。"
        }
    },

    // =========================================================
    // === MOTHERBOARD ===
    // =========================================================
    {
        id: "mb-ez-debug", type: "hardware", subcategory: "mb",
        vendors: ["asus", "msi", "gigabyte"],
        code: "EZ Debug LED (VGA/BOOT/DRAM/CPU)",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: { cs: "Jedna ze čtyř debug LED svítí po zapnutí – PC se nespustí.", en: "One of four debug LEDs is lit after power-on – PC fails to boot.", zh: "开机后四个调试 LED 之一亮起，PC 无法启动。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Určete, která LED svítí:</strong> CPU LED = problém s procesorem. DRAM LED = problém s RAM. VGA LED = problém s GPU. BOOT LED = problém s diskem nebo bootovacím zařízením.</li>
<li><strong>Resetujte CMOS:</strong> Odpojte PC ze zásuvky a vyjměte CR2032 baterii na základní desce na 30 sekund. Tím vymazĞte všechna ulozena nastavení BIOSu.</li>
<li><strong>Zredukujte systém na minimum:</strong> Odpojte všechny disky, ponechte jen jeden RAM modul ve slotu A2 a GPU (nebo použijte iGPU pokud máte). Spusťte znovu a sledujte LED.</li>
<li><strong>Testujte komponentu izolovaně:</strong> Pokud DRAM LED svítí, vyzkoušejte RAM v jiném slotu nebo jiný modul. Pokud VGA LED svítí, vyzkoušejte GPU v jiném PCIe slotu nebo použijte iGPU.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Identify which LED is lit:</strong> CPU LED = processor issue. DRAM LED = RAM issue. VGA LED = GPU issue. BOOT LED = disk or boot device issue.</li>
<li><strong>Reset CMOS:</strong> Unplug the PC and remove the CR2032 battery on the motherboard for 30 seconds. This erases all saved BIOS settings.</li>
<li><strong>Strip to bare minimum:</strong> Disconnect all drives, keep only one RAM stick in slot A2 and the GPU (or use iGPU if available). Power on and watch the LEDs.</li>
<li><strong>Test the component in isolation:</strong> If DRAM LED is lit, try RAM in another slot or use a different stick. If VGA LED is lit, test the GPU in another PCIe slot or use iGPU.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>确认哪个 LED 亮起：</strong>CPU LED = 处理器问题。DRAM LED = 内存问题。VGA LED = 显卡问题。BOOT LED = 硬盘或引导设备问题。</li>
<li><strong>重置 CMOS：</strong>拔插头并取出主板上的 CR2032 电池 30 秒。这会清除所有已保存的 BIOS 设置。</li>
<li><strong>精简到最少配置：</strong>断开所有硬盘，只在 A2 插槽保留一条内存和显卡（或使用集显）。再次开机并观察 LED。</li>
<li><strong>单独测试部件：</strong>若 DRAM LED 亮起，尝试将内存插入其他插槽或换一条。若 VGA LED 亮起，在其他 PCIe 插槽测试显卡或使用集显。</li>
</ol>`
        },
        details: {
            cs: "EZ Debug LED je čtyřmístný diagnostický systém přítomný na základních deskách MSI, ASUS (Q-LED), Gigabyte (Debug LED). Každá LED odpovídá fázi POST: CPU LED → základní napájení procesoru; DRAM LED → memory training; VGA LED → GPU inicializace; BOOT LED → hledání bootovacího zařízení. Pokud LED zůstane svítit, POST se zastavil v dané fázi. Metodika izolace: (1) Odstraňte vše nepotřebné ze systému (GPU pokud má CPU iGPU, všechny disky, extra RAM). (2) Resetujte BIOS – fyzickým JBAT1 jumperem nebo vyjmutím CR2032 baterie na 30 sekund. (3) Proveďte Power Cycle – odpojte ATX napájení, stiskněte power button pro vybití kondenzátorů. (4) Testujte každou komponentu izolovaně. Debug LED slouží jako první triáž; přesnější kódy poskytuje 2-místný nebo 3-místný POST-Code displej u high-end desek.",
            en: "EZ Debug LED is a four-LED diagnostic system found on MSI, ASUS (Q-LED), and Gigabyte (Debug LED) motherboards. Each LED corresponds to a POST phase: CPU LED → basic CPU power; DRAM LED → memory training; VGA LED → GPU initialization; BOOT LED → searching for a boot device. If a LED stays lit, POST has stalled in that phase. Isolation method: (1) Strip the system to bare essentials (remove GPU if CPU has iGPU, all drives, extra RAM sticks). (2) Reset BIOS – via the physical JBAT1 jumper or by removing the CR2032 battery for 30 seconds. (3) Power cycle – unplug ATX power, press the power button to drain capacitors. (4) Test each component individually. The Debug LED is a first-pass triage; more precise codes are provided by 2-digit or 3-digit POST-Code displays on high-end boards.",
            zh: "EZ 调试 LED 是 MSI、ASUS（Q-LED）和 Gigabyte（调试 LED）主板上的四灯诊断系统。每个 LED 对应一个 POST 阶段：CPU LED → 基本 CPU 供电；DRAM LED → 内存训练；VGA LED → GPU 初始化；BOOT LED → 搜索引导设备。若 LED 保持亮起，则 POST 在该阶段停滞。隔离方法：(1) 将系统精简至最小配置；(2) 重置 BIOS——通过 JBAT1 跳线或取下 CR2032 电池 30 秒；(3) 断电循环；(4) 单独测试每个组件。"
        }
    },
    {
        id: "mb-vrm-overtemp", type: "hardware", subcategory: "mb",
        vendors: ["asus", "msi", "gigabyte", "asrock"],
        code: "VRM Overheat / MOS Thermal Throttle",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: { cs: "CPU snižuje výkon kvůli přehřátí VRM MOSFETů na základní desce.", en: "CPU throttles performance due to overheating VRM MOSFETs on the motherboard.", zh: "由于主板 VRM MOSFET 过热，CPU 降低性能。" },
        solution: { cs: "Zlepšete průtok vzduchu přes VRM oblast. Přidejte VRM heatsink nebo aktivní chlazení.", en: "Improve airflow over the VRM area. Add VRM heatsink or active cooling.", zh: "改善 VRM 区域气流，添加 VRM 散热器或主动冷却。" },
        details: {
            cs: "VRM (Voltage Regulator Module) převádí 12V napájení z ATX zdroje na přesné napájení CPU Vcore (1,0–1,4 V). Moderní procesory (Ryzen 9, Core i9) vyžadují stovky ampér a VRM musí přepínat MOSFETy vysokou frekvencí. MOSFET spínání generuje teplo – při přetížení dosáhnou MOSFETy 120°C+ a throttlují výstupní proud. Důsledky: CPU vidí nestabilní Vcore, frekvence poklesne o 30–50%. Monitorování: HWInfo64 sensor 'VRM MOS Temp' nebo 'VDDCR CPU Temp'. Preventivní opatření: (1) Ujistěte se, že přední ventilátor fouká vzduch přes VRM oblast. (2) Přidejte vlastní VRM heatsink s teplovodivou páskou (4W/mK). (3) Vyhněte se long-duration power limitům (PL2 pro Intel), které způsobují vysoký proud přes delší dobu.",
            en: "VRM (Voltage Regulator Module) converts the 12V ATX supply to precise CPU Vcore (1.0–1.4V). Modern CPUs (Ryzen 9, Core i9) demand hundreds of amps and the VRM must switch MOSFETs at high frequency. Switching generates heat – under overload, MOSFETs reach 120°C+ and throttle output current. Consequences: the CPU sees unstable Vcore and frequency drops 30–50%. Monitoring: HWInfo64 sensor 'VRM MOS Temp' or 'VDDCR CPU Temp'. Preventive measures: (1) Ensure a front case fan pushes air across the VRM area. (2) Attach a VRM heatsink with thermal tape (4W/mK). (3) Avoid extended long-duration power limits (PL2 for Intel) that sustain high VRM current.",
            zh: "VRM（电压调节模块）将 ATX 电源的 12V 转换为精确的 CPU Vcore（1.0–1.4V）。现代处理器需要数百安培电流，VRM 必须高频开关 MOSFET。开关产生热量——在过载情况下，MOSFET 温度超过 120°C 并限制输出电流。后果：CPU 感受到不稳定的 Vcore，频率下降 30–50%。监控：HWInfo64 传感器'VRM MOS Temp'。预防措施：(1) 确保前置机箱风扇将空气吹过 VRM 区域；(2) 使用导热胶带安装 VRM 散热片；(3) 避免延长 CPU 长时间功耗限制（Intel 的 PL2）。"
        }
    },
    {
        id: "mb-beep", type: "hardware", subcategory: "mb",
        vendors: ["asus", "msi", "gigabyte", "asrock"],
        code: "POST Beep Codes (No Display)",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: { cs: "PC vydává série pípnutí při startu a nic nezobrazuje.", en: "PC emits a series of beeps at startup and displays nothing.", zh: "PC 在启动时发出一系列蜂鸣声，且无显示。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Spočtačte pípnutí a určete kód:</strong> Pozorujte počet krátkých a dlouhých pípnutí. Např. 1 dlouhé + 3 krátká = problém s GPU (AMI BIOS). 2–3 krátká = problém s RAM.</li>
<li><strong>Prohleděte kód v manuálu desky:</strong> Manuál vaší základní desky (PDF online) obsahuje tabulku beep kódů. Nebo hledejte na Googlu „[název desky] beep codes“.</li>
<li><strong>Vyřešte dle diagnostiky:</strong> RAM problém → vyjměte a znovu vložte moduly, zkuste jediný modul ve slotu A2. GPU problém → vyjměte GPU a vyzkoušejte integrovanou grafiku (pokud CPU má).</li>
<li><strong>Zkontrolujte zapojení napájení:</strong> Ujistěte se, že 24-pin ATX a 8-pin CPU EPS konektory jsou pevně zasunuty. Chybějící CPU napájení způsobuje okamžité pípnutí.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Count the beeps and identify the code:</strong> Note the number of short and long beeps. E.g. 1 long + 3 short = GPU issue (AMI BIOS). 2–3 short = RAM issue.</li>
<li><strong>Look up the code in your board's manual:</strong> The manual for your motherboard (PDF online) has a beep code table. Or search Google for “[board name] beep codes”.</li>
<li><strong>Fix according to the diagnosis:</strong> RAM issue → remove and reseat modules, try a single stick in slot A2. GPU issue → remove GPU and try integrated graphics (if CPU has it).</li>
<li><strong>Check power connectors:</strong> Ensure the 24-pin ATX and 8-pin CPU EPS connectors are firmly seated. A missing CPU power connector causes an immediate beep.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>计数蜂鸣声并确定代码：</strong>记录长短蜂鸣声的次数。例如 1 长 + 3 短 = GPU 问题（AMI BIOS）。2–3 短 = 内存问题。</li>
<li><strong>在主板手册中查询代码：</strong>主板手册（在线 PDF）包含蜂鸣声代码表。或在 Google 搜索“[主板名称] beep codes”。</li>
<li><strong>根据诊断进行修复：</strong>内存问题 → 取出并重新插入内存条，尝试单条在 A2 插槽。GPU 问题 → 取出显卡并使用集显（如果 CPU 有）。</li>
<li><strong>检查供电接口：</strong>确保 24-pin ATX 和 8-pin CPU EPS 接口牢固插入。缺少 CPU 供电接口会导致立即蜂鸣声。</li>
</ol>`
        },
        details: {
            cs: "POST beep kódy jsou standardizovanou diagnostikou starých BIOS chipů (AMI, Award, Phoenix). Piezo bzučák na základní desce generuje sekvenci tónů kódující typ chyby. Nejčastější kódy AMI BIOS: (1) 1 krátké pípnutí = POST prošel OK (normální). (2) 2–3 krátká pípnutí = chyba paměti RAM (nejčastější). (3) 4 krátká = chyba systémových hodin. (4) 5 krátká = chyba procesoru. (5) 6 krátká = chyba klavesnicového kontroleru. (6) 1 dlouhé + 3 krátká = chyba videokart. (7) 1 dlouhé + 8 krátkých = test obrazovky selhal. Award BIOS: 1 dlouhé + 2 krátká = vadná GPU. Phoenix BIOS kódy mají 3 skupiny oddělené pauzami (např. 1-1-3 = CMOS chyba). Moderní desky bez bzučáku lze vybavit externím POST kódem přes PCIe slot (CMOS checker).",
            en: "POST beep codes are standardized diagnostics for legacy BIOS chips (AMI, Award, Phoenix). The piezo buzzer on the motherboard generates a sequence of tones encoding the error type. Common AMI BIOS codes: (1) 1 short beep = POST passed OK (normal). (2) 2–3 short beeps = RAM error (most common). (3) 4 short = system clock failure. (4) 5 short = CPU error. (5) 6 short = keyboard controller error. (6) 1 long + 3 short = video card error. (7) 1 long + 8 short = display test failure. Award BIOS: 1 long + 2 short = faulty GPU. Phoenix BIOS codes have 3 groups separated by pauses (e.g. 1-1-3 = CMOS failure). Modern boards without a buzzer can be equipped with an external POST code card via PCIe slot.",
            zh: "POST 蜂鸣声代码是旧版 BIOS 芯片（AMI、Award、Phoenix）的标准化诊断。主板上的压电蜂鸣器会产生代表错误类型的音调序列。常见 AMI BIOS 代码：(1) 1 声短促 = POST 通过（正常）；(2) 2–3 声短促 = 内存错误（最常见）；(3) 4 声短促 = 系统时钟故障；(4) 5 声短促 = CPU 错误；(5) 1 长 + 3 短 = 显卡错误；(6) 1 长 + 8 短 = 显示测试失败。Award BIOS：1 长 + 2 短 = 显卡故障。Phoenix BIOS 代码有 3 组，由停顿分隔。没有蜂鸣器的现代主板可通过 PCIe 插槽安装外部 POST 代码卡。"
        }
    },

    // =========================================================
    // === WINDOWS ===
    // =========================================================
    {
        id: "win-registry", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "REGISTRY_ERROR (0x00000051)",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: { cs: "Poškozený registr Windows způsobuje BSOD nebo nespuštění systému.", en: "Corrupted Windows registry causes BSOD or prevents system startup.", zh: "Windows 注册表损坏导致蓝屏或系统无法启动。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Použijte bod obnovy:</strong> Stiskněte Win+R, napište <code>rstrui.exe</code>. Zvolte bod obnovy před problémem a klikněte Další. Systém se vrátí do dřívějšího stavu bez dopadů na osobní soubory.</li>
<li><strong>Spusťte opravu z Recovery Mode:</strong> Při bootu stiskněte F8 nebo držte Shift+Restart → Odstranek potíž → Rozložené možnosti → Příkazový řádek. Zadejte <code>chkdsk C: /f /r</code> a stiskněte Enter.</li>
<li><strong>Opravte systémové soubory:</strong> V příkazovém řádku (jako správce) spusťte <code>sfc /scannow</code>, poté <code>DISM /Online /Cleanup-Image /RestoreHealth</code>. Tyto příkazy opraví poškozené systémové soubory.</li>
<li><strong>Reinstalujte Windows jako poslední možnost:</strong> Pokud nic nepomohlo, použijte Windows USB a vyberte „Přičíně reinstalace ponechat soubory“ pro zachování dat.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Use System Restore:</strong> Press Win+R, type <code>rstrui.exe</code>. Choose a restore point before the problem and click Next. The system rolls back without affecting personal files.</li>
<li><strong>Run repair from Recovery Mode:</strong> Press F8 at boot or hold Shift+Restart → Troubleshoot → Advanced Options → Command Prompt. Type <code>chkdsk C: /f /r</code> and press Enter.</li>
<li><strong>Repair system files:</strong> In an elevated Command Prompt run <code>sfc /scannow</code>, then <code>DISM /Online /Cleanup-Image /RestoreHealth</code>. These commands fix corrupted system files.</li>
<li><strong>Reinstall Windows as a last resort:</strong> Boot from Windows USB and choose Keep my files to preserve personal data.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>使用系统还原：</strong>按 Win+R，输入 <code>rstrui.exe</code>。选择问题前的还原点并点击下一步。系统回滚不影响个人文件。</li>
<li><strong>从恢复模式运行修复：</strong>启动时按 F8 或按住 Shift+重启 → 疑难解答 → 高级选项 → 命令提示符。输入 <code>chkdsk C: /f /r</code> 并按 Enter。</li>
<li><strong>修复系统文件：</strong>在管理员命令提示符中运行 <code>sfc /scannow</code>，然后 <code>DISM /Online /Cleanup-Image /RestoreHealth</code>。</li>
<li><strong>重装 Windows 作为最后手段：</strong>从 Windows USB 启动，选择“保留我的文件”以保留个人数据。</li>
</ol>`
        },
        details: {
            cs: "Registr Windows je hierarchická databáze uložená jako binární soubory v C:\\Windows\\System32\\config (SYSTEM, SOFTWARE, SAM, SECURITY, DEFAULT). Každý hive soubor je transakčně zálohován do .LOG souborů a automaticky ukládán pomocí VSS (Volume Shadow Copy). BSOD REGISTRY_ERROR (0x51) signalizuje, že kernel nedokázal načíst nebo zapsat do registru, nejčastěji kvůli: (1) Fyzickému poškození sektorů disku, kde registr sídlí. (2) Náhlému výpadku napájení při aktivní transakci. (3) Softwaru (ransomware, antivirový software), který modifikoval hive soubory nesprávně. Oprava z WinRE: 'chkdsk C: /f /r' → opraví disk; 'sfc /scannow' → kontrola integrity systémových souborů; 'DISM /Online /Cleanup-Image /RestoreHealth' → oprava Windows image.",
            en: "The Windows Registry is a hierarchical database stored as binary files in C:\\Windows\\System32\\config (SYSTEM, SOFTWARE, SAM, SECURITY, DEFAULT). Each hive file is transactionally backed up to .LOG files and saved via VSS (Volume Shadow Copy). BSOD REGISTRY_ERROR (0x51) signals the kernel was unable to read from or write to the registry, most commonly due to: (1) Physical sector damage on the disk where the registry resides. (2) Sudden power loss during an active transaction. (3) Software (ransomware, antivirus) that incorrectly modified hive files. Recovery from WinRE: 'chkdsk C: /f /r' to fix disk; 'sfc /scannow' to verify system file integrity; 'DISM /Online /Cleanup-Image /RestoreHealth' to repair the Windows image.",
            zh: "Windows 注册表是一个层次化数据库，以二进制文件形式存储在 C:\\Windows\\System32\\config 中（SYSTEM、SOFTWARE、SAM、SECURITY、DEFAULT）。每个配置单元文件通过 .LOG 文件进行事务备份，并通过 VSS 自动保存。蓝屏 REGISTRY_ERROR（0x51）的最常见原因：(1) 注册表所在磁盘的物理扇区损坏；(2) 活动事务期间突然断电；(3) 软件错误修改了配置单元文件。从 WinRE 修复：\'chkdsk C: /f /r\' 修复磁盘；\'sfc /scannow\' 验证系统文件；\'DISM /Online /Cleanup-Image /RestoreHealth\' 修复 Windows 映像。"
        }
    },
    {
        id: "win-bsod-critical", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "CRITICAL_PROCESS_DIED (0x000000EF)",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: { cs: "Kritický systémový proces byl ukončen – Windows nemůže bez něj pokračovat.", en: "A critical system process was terminated – Windows cannot continue without it.", zh: "关键系统进程被终止，Windows 无法在没有它的情况下继续运行。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Spusťte sfc a DISM:</strong> Otevřete Příkazový řádek jako správce (Win+X → Windows PowerShell (Admin)). Zadejte <code>sfc /scannow</code> a počkejte na dokončení. Poté spusťte <code>DISM /Online /Cleanup-Image /RestoreHealth</code>.</li>
<li><strong>Zkontrolujte, který proces selhal:</strong> Stiskněte Win+R, napište <code>eventvwr</code>. Přejděte do Windows Logs → Application a hledejte chyby těsně před pádem.</li>
<li><strong>Spusťte antivir:</strong> Malware často infikuje kritické systémové procesy. Spusťte Microsoft Defender Full Scan nebo Malwarebytes zdarma.</li>
<li><strong>Použijte bod obnovy:</strong> Pokud problém začal po instalaci softwaru, spusťte <code>rstrui.exe</code> a vyberte bod před instalací.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Run sfc and DISM:</strong> Open Command Prompt as administrator (Win+X → Windows PowerShell (Admin)). Type <code>sfc /scannow</code> and wait. Then run <code>DISM /Online /Cleanup-Image /RestoreHealth</code>.</li>
<li><strong>Check which process failed:</strong> Press Win+R, type <code>eventvwr</code>. Go to Windows Logs → Application and look for errors just before the crash.</li>
<li><strong>Run antivirus:</strong> Malware often infects critical system processes. Run Microsoft Defender Full Scan or Malwarebytes (free).</li>
<li><strong>Use System Restore:</strong> If the problem started after installing software, run <code>rstrui.exe</code> and pick a restore point before the install.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>运行 sfc 和 DISM：</strong>以管理员身份打开命令提示符，输入 <code>sfc /scannow</code> 并等待完成。然后运行 <code>DISM /Online /Cleanup-Image /RestoreHealth</code>。</li>
<li><strong>查看哪个进程崩溃：</strong>按 Win+R，输入 <code>eventvwr</code>。进入 Windows 日志 → 应用程序，查找崩溃前的错误。</li>
<li><strong>运行杀毒软件：</strong>恶意软件常常感染关键系统进程。运行 Microsoft Defender 全面扫描或 Malwarebytes（免费）。</li>
<li><strong>使用系统还原：</strong>若问题在安装软件后出现，运行 <code>rstrui.exe</code> 并选择安装前的还原点。</li>
</ol>`
        },
        details: {
            cs: "CRITICAL_PROCESS_DIED BSOD nastane, když Windows Session Manager (smss.exe), Client/Server Runtime (csrss.exe) nebo Windows Logon (winlogon.exe) neočekávaně skončí. Tyto procesy jsou označeny příznakem CRITICAL v Process Object – jejich ukončení automaticky spustí BSOD. Hlavní příčiny: (1) Poškozené systémové soubory – chybějící nebo přepsané system32 knihovny (DLL Hell). (2) Nevhodný software nebo ovladač zavírající systémový proces. (3) Malware injektující kód do kritických procesů. (4) Poškozená instalace Windows Update. Diagnostika: bootujte do Safe Mode, spusťte sfc /scannow, analyzujte MINIDUMP soubor pomocí WinDBG, zkontrolujte Application Event Log pro záznamy těsně před crashem.",
            en: "CRITICAL_PROCESS_DIED BSOD occurs when the Windows Session Manager (smss.exe), Client/Server Runtime (csrss.exe), or Windows Logon (winlogon.exe) terminates unexpectedly. These processes are flagged as CRITICAL in the Process Object – their termination automatically triggers a BSOD. Main causes: (1) Corrupted system files – missing or overwritten system32 libraries (DLL Hell). (2) Misbehaving software or a driver terminating a system process. (3) Malware modifying or injecting code into critical processes. (4) A corrupted Windows Update installation. Diagnostics: boot into Safe Mode, run 'sfc /scannow', analyze the MINIDUMP using WinDBG, and check the Application Event Log for entries just before the crash.",
            zh: "当 Windows Session Manager（smss.exe）、客户端/服务器运行时（csrss.exe）或 Windows 登录（winlogon.exe）意外终止时，将发生 CRITICAL_PROCESS_DIED 蓝屏。这些进程被标记为 CRITICAL——它们的终止会自动触发蓝屏。主要原因：(1) 系统文件损坏——system32 库丢失或被覆盖；(2) 软件或驱动程序行为异常，终止了系统进程；(3) 恶意软件注入关键进程；(4) Windows Update 安装损坏。诊断：进入安全模式，运行'sfc / scannow'，使用 WinDBG 分析 MINIDUMP，检查崩溃前的事件日志。"
        }
    },
    {
        id: "win-bootmgr", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "BOOTMGR is missing",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: { cs: "Windows Bootloader chybí nebo je poškozený – systém nelze spustit.", en: "Windows boot loader is missing or corrupt – system cannot start.", zh: "Windows 引导程序丢失或损坏，系统无法启动。" },
        solution: { cs: "Spusťte z Windows USB → Opravit počítač → Startup Repair. Nebo příkaz 'bootrec /fixmbr /fixboot /rebuildbcd'.", en: "Boot from Windows USB → Repair your computer → Startup Repair, or run 'bootrec /fixmbr /fixboot /rebuildbcd'.", zh: "从 Windows USB 启动 → 修复计算机 → 启动修复，或运行'bootrec / fixmbr / fixboot / rebuildbcd'。" },
        details: {
            cs: "BOOTMGR (Windows Boot Manager) je první spustitelný soubor, který BIOS/UEFI načte z aktivního oddílu disku (bootmgr na MBR discích, bootmgfw.efi na GPT/UEFI). Chyba nastane pokud: (1) Byl smazán nebo přepsán aktivní boot oddíl. (2) BCD (Boot Configuration Data) store v NVRAM je poškozený nebo neobsahuje záznam pro Windows. (3) Disk byl reinstancializován (MBR → GPT konverze bez úpravy UEFI). (4) Změna pořadí disků v BIOSu. Manuální oprava z CMD při bootu z USB: 'bootrec /fixmbr' opraví Master Boot Record; 'bootrec /fixboot' přepíše boot sector; 'bootrec /scanos' naskenuje disky pro OS záznamy; 'bootrec /rebuildbcd' přebuduje BCD store. Pro UEFI/GPT systémy: 'bcdboot C:\\Windows /s Z: /f UEFI' (nahraďte Z: písmenem EFI oddílu).",
            en: "BOOTMGR (Windows Boot Manager) is the first executable loaded by BIOS/UEFI from the active disk partition (bootmgr on MBR disks, bootmgfw.efi on GPT/UEFI). The error occurs when: (1) The active boot partition was deleted or overwritten. (2) The BCD (Boot Configuration Data) store in NVRAM is corrupted or missing the Windows entry. (3) The disk was re-initialized (MBR → GPT conversion without UEFI adjustment). (4) The boot disk order in BIOS was changed. Manual repair from CMD when booting from USB: 'bootrec /fixmbr' repairs the MBR; 'bootrec /fixboot' rewrites the boot sector; 'bootrec /scanos' scans disks for OS entries; 'bootrec /rebuildbcd' rebuilds the BCD store. For UEFI/GPT: 'bcdboot C:\\Windows /s Z: /f UEFI' (replace Z: with the EFI partition letter).",
            zh: "BOOTMGR（Windows 引导管理器）是 BIOS/UEFI 从活动磁盘分区加载的第一个可执行文件（MBR 磁盘上为 bootmgr，GPT/UEFI 上为 bootmgfw.efi）。错误发生原因：(1) 活动引导分区被删除或覆盖；(2) NVRAM 中的 BCD 存储已损坏或缺少 Windows 条目；(3) 磁盘被重新初始化（MBR → GPT 转换但未调整 UEFI）；(4) BIOS 中引导磁盘顺序被更改。手动修复命令：\'bootrec /fixmbr\'、\'bootrec /fixboot\'、\'bootrec /rebuildbcd\'。UEFI/GPT 系统：\'bcdboot C:\\Windows /s Z: /f UEFI\'。"
        }
    },

    // =========================================================
    // === BIOS ===
    // =========================================================
    {
        id: "bios-flash", type: "software", subcategory: "bios",
        vendors: ["uefi", "legacy"],
        code: "BIOS Update Failed (Bricked)",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS 相关" },
        description: { cs: "PC nelze zapnout po neúspěšné aktualizaci BIOSu – deska je 'bricknutá'.", en: "PC won't power on after a failed BIOS update – board is 'bricked'.", zh: "BIOS 更新失败后无法开机，主板变成'砖头'。" },
        solution: { cs: "Použijte USB BIOS Flashback tlačítko (ASUS/MSI). Alternativně vyměňte BIOS čip.", en: "Use USB BIOS Flashback button (ASUS/MSI). Alternatively, replace the BIOS chip.", zh: "使用 USB BIOS Flashback 按钮（ASUS/MSI），或更换 BIOS 芯片。" },
        details: {
            cs: "BIOS nebo moderní UEFI je uložen v SPI EEPROM čipu (obvykle 128 Mbit). Při flashování firmware je chip nejprve vymazán a pak zapsán po blocích. Pokud je tento proces přerušen (výpadek proudu, chyba souboru, nekompatibilní ROM), čip zůstane s nekompletním kódem – deska se stane 'bricknutou'. Metody obnovy: (1) USB BIOS Flashback (ASUS) nebo Flash Button (MSI): uložte ROM soubor na FAT32 USB pod přesným jménem (např. 'MSI.ROM'), zasuňte USB do speciálního portu a podržte tlačítko ~3s. Flash proběhne bez CPU/RAM/GPU. (2) Dual BIOS: Gigabyte desky mají záložní BIOS chip – přepněte fyzickým přepínačem. (3) Výměna SPI čipu: profesionální servis může desolderovat EEPROM a naprogramovat nový čip na programátoru CH341A. (4) Crisis Recovery USB: u notebooků HP/Lenovo existuje emergency firmware recovery přes speciální kombinaci kláves.",
            en: "BIOS or modern UEFI is stored in an SPI EEPROM chip (typically 128 Mbit). During a firmware flash, the chip is first erased and then written in blocks. If this process is interrupted (power outage, bad file, incompatible ROM), the chip is left with incomplete code – the board becomes 'bricked'. Recovery methods: (1) USB BIOS Flashback (ASUS) or Flash Button (MSI): save the ROM file to a FAT32 USB with the exact required name (e.g., 'MSI.ROM'), insert in the dedicated port and hold the button for ~3s. The flash proceeds without CPU/RAM/GPU. (2) Dual BIOS: Gigabyte boards have a backup BIOS chip – switch it with a physical toggle. (3) SPI chip replacement: professional service can desolder the EEPROM and program a new chip with a CH341A programmer. (4) Crisis Recovery USB: HP/Lenovo laptops have emergency firmware recovery via a special key combination at boot.",
            zh: "BIOS 或现代 UEFI 存储在 SPI EEPROM 芯片中（通常为 128 Mbit）。刷新固件时，芯片首先被擦除，然后按块写入。若此过程被中断（断电、文件错误、ROM 不兼容），芯片中将留有不完整的代码——主板变为'砖头'。恢复方法：(1) USB BIOS Flashback（ASUS）或 Flash Button（MSI）：将 ROM 文件以精确名称保存到 FAT32 U 盘，插入专用端口并按住按钮约 3 秒，无需 CPU/RAM/GPU；(2) 双 BIOS：Gigabyte 主板有备用 BIOS 芯片；(3) SPI 芯片更换：专业服务用 CH341A 编程器烧录新芯片；(4) 紧急恢复 USB：HP/Lenovo 笔记本支持紧急固件恢复。"
        }
    },
    {
        id: "bios-secure-boot", type: "software", subcategory: "bios",
        vendors: ["uefi"],
        code: "Secure Boot Violation / 0xc0000428",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS 相关" },
        description: { cs: "Windows odmítne spustit soubor – digitální podpis je neplatný nebo chybí.", en: "Windows refuses to load a file – digital signature is invalid or missing.", zh: "Windows 拒绝加载文件，数字签名无效或缺失。" },
        solution: { cs: "Zkontrolujte Secure Boot klíče v UEFI. Zakažte Secure Boot pro testování.", en: "Check Secure Boot keys in UEFI. Temporarily disable Secure Boot for testing.", zh: "检查 UEFI 中的安全启动密钥，或暂时禁用安全启动进行测试。" },
        details: {
            cs: "Secure Boot je UEFI bezpečnostní funkce (specifikace UEFI 2.3.1 Errata C) zabraňující načtení nepodepsaného kódu při startu PC. Bootloader (bootmgfw.efi) musí být podepsán klíčem důvěryhodným v UEFI Key Database (db) a nesmí být na revokační listině (dbx). Chyba 0xc0000428 nastane pokud: (1) Nainstalován nepodepsaný nebo self-signed bootloader (Linux distribuce bez shim). (2) Poškozené Secure Boot klíče v UEFI NVRAM. (3) Aktualizace Windows změnila certifikační řetězec. (4) Dual boot s OS, který nerespektuje Secure Boot. Řešení: v UEFI → Secure Boot Maintenance → Reset to Setup Mode; poté re-enroll klíče pomocí 'Restore Factory Keys'. Pro Linux dual-boot: nainstalujte shim (openSUSE/Ubuntu verze) a Microsoft podepsaný GRUB2 bootloader.",
            en: "Secure Boot is a UEFI security feature (UEFI spec 2.3.1 Errata C) that prevents unsigned or malicious code from loading during PC startup. The bootloader (bootmgfw.efi) must be signed by a key trusted in the UEFI Key Database (db) and must not appear on the revocation list (dbx). Error 0xc0000428 occurs when: (1) An unsigned or self-signed bootloader is installed (Linux distro without a shim). (2) Secure Boot keys in UEFI NVRAM are corrupted. (3) A Windows update changed the certificate chain. (4) Dual-boot with an OS that doesn't respect Secure Boot. Fix: in UEFI → Secure Boot Maintenance → Reset to Setup Mode, then re-enroll keys via 'Restore Factory Keys'. For Linux dual-boot: install the shim (openSUSE/Ubuntu version) and Microsoft-signed GRUB2 bootloader.",
            zh: "安全启动是 UEFI 安全功能，防止未签名代码在 PC 启动时加载。引导程序必须由 UEFI 密钥数据库（db）中信任的密钥签名，且不得出现在吊销列表（dbx）中。错误 0xc0000428 发生原因：(1) 安装了未签名或自签名的引导程序（无 shim 的 Linux 发行版）；(2) UEFI NVRAM 中的安全启动密钥损坏；(3) Windows 更新更改了证书链；(4) 与不遵守安全启动的 OS 双启动。修复方法：在 UEFI → 安全启动维护 → 重置为设置模式，然后通过'恢复出厂密钥'重新注册密钥。"
        }
    },
    {
        id: "sw-bios-checksum", type: "software", subcategory: "bios",
        vendors: ["uefi", "legacy"],
        code: "CMOS Checksum Error",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS / UEFI" },
        description: {
            cs: "Kontrolní součet paměti CMOS nesouhlasí. Nastavení BIOSu bylo resetováno na výchozí hodnoty.",
            en: "CMOS checksum mismatch. BIOS settings have been reset to default values.",
            zh: "CMOS 校验和不匹配。BIOS 设置已重置为默认值。"
        },
        solution: {
            cs: "Vyměňte baterii CR2032 na základní desce a znovu nastavte BIOS (XMP, Boot priority).",
            en: "Replace the CR2032 battery on the motherboard and reconfigure BIOS settings (XMP, Boot priority).",
            zh: "更换主板上的 CR2032 电池并重新配置 BIOS 设置（XMP、启动优先级）。"
        },
        details: {
            cs: "Tato chyba nastává, když data uložená v čipu CMOS (napájeném malou baterií) jsou poškozena nebo ztracena. Nejčastější příčinou je nízké napětí baterie CR2032 (pod 2.8V). BIOS pak při POSTu (Power-On Self-Test) detekuje neplatný kontrolní součet a vynutí reset do bezpečného nastavení. Diagnostika: Pokud se čas v systému neustále resetuje na rok 2000, je baterie definitivně vybitá.",
            en: "This error occurs when the data stored in the CMOS chip (powered by a small battery) is corrupted or lost. The most common cause is a low voltage of the CR2032 battery (below 2.8V). During POST (Power-On Self-Test), the BIOS detects an invalid checksum and forces a reset to safe defaults. Diagnostic: If the system time constantly resets to a past date, the battery is depleted.",
            zh: "当存储在 CMOS 芯片（由小电池供电）中的数据损坏或丢失时，就会发生此错误。最常见的原因是 CR2032 电池电压过低（低于 2.8V）。在 POST（上电自检）期间，BIOS 检测到无效的校验和并强制重置为安全默认值。诊断：如果系统时间不断重置为过去的时间，则电池已耗尽。"
        }
    },

    // =========================================================
    // === NETWORK ===
    // =========================================================
    {
        id: "net-dns", type: "software", subcategory: "network",
        vendors: ["wifi", "ethernet"],
        code: "DNS_PROBE_FINISHED_NXDOMAIN",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: { cs: "Prohlížeč nemůže přeložit doménové jméno na IP adresu.", en: "Browser cannot resolve a domain name to an IP address – DNS server unresponsive.", zh: "浏览器无法将域名解析为 IP 地址，DNS 服务器无响应。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Zmeňte DNS server:</strong> Stiskněte Win+R, napište <code>ncpa.cpl</code>. Pravok likněte na aktivní připojení → Vlastnosti → Internet Protocol v4 → Použít následující DNS. Zadejte <strong>8.8.8.8</strong> a <strong>8.8.4.4</strong> (Google) nebo <strong>1.1.1.1</strong> (Cloudflare).</li>
<li><strong>Vymažte DNS cache:</strong> Otevřete Příkazový řádek jako správce a spusťte <code>ipconfig /flushdns</code>. Stara DNS cache může obsahovat zastaralé nebo chybné záznamy.</li>
<li><strong>Zkontrolujte soubor hosts:</strong> Stiskněte Win+R, napište <code>notepad C:\Windows\System32\drivers\etc\hosts</code>. Zkontrolujte, zda daná doména není přesměrována na 127.0.0.1 (malware nebo bloker).</li>
<li><strong>Restartujte router:</strong> Odpojte router ze zásuvky na 30 sekund a znovu zapojte. ISP DNS server může být dočasně nedĖstupný.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Change DNS server:</strong> Press Win+R, type <code>ncpa.cpl</code>. Right-click active connection → Properties → Internet Protocol v4 → Use the following DNS. Enter <strong>8.8.8.8</strong> and <strong>8.8.4.4</strong> (Google) or <strong>1.1.1.1</strong> (Cloudflare).</li>
<li><strong>Flush DNS cache:</strong> Open Command Prompt as administrator and run <code>ipconfig /flushdns</code>. Old cache may contain stale or incorrect records.</li>
<li><strong>Check the hosts file:</strong> Press Win+R, type <code>notepad C:\Windows\System32\drivers\etc\hosts</code>. Check if the domain is being redirected to 127.0.0.1 (malware or blocker).</li>
<li><strong>Restart your router:</strong> Unplug the router for 30 seconds and plug it back in. Your ISP's DNS server may be temporarily unavailable.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>更换 DNS 服务器：</strong>按 Win+R，输入 <code>ncpa.cpl</code>。右键活动连接 → 属性 → Internet 协议版本 4 → 使用以下 DNS。输入 <strong>8.8.8.8</strong> 和 <strong>8.8.4.4</strong>（Google）或 <strong>1.1.1.1</strong>（Cloudflare）。</li>
<li><strong>清除 DNS 缓存：</strong>以管理员身份打开命令提示符，运行 <code>ipconfig /flushdns</code>。旧缓存可能包含过时或错误的记录。</li>
<li><strong>检查 hosts 文件：</strong>按 Win+R，输入 <code>notepad C:\Windows\System32\drivers\etc\hosts</code>。检查该域名是否被重定向到 127.0.0.1（恶意软件或广告拦截器）。</li>
<li><strong>重启路由器：</strong>将路由器断开电源 30 秒并重新插入。您的 ISP DNS 服务器可能暂时不可用。</li>
</ol>`
        },
        details: {
            cs: "NXDOMAIN (Non-Existent Domain) je DNS odpověď kód 3 (RCODE=3), indikující, že autoritativní DNS server potvrdil neexistenci dané domény. Prohlížeč zobrazuje tuto chybu, když recursive resolver (váš ISP DNS) nemůže najít A nebo AAAA záznam. Příčiny: (1) DNS server ISP je nedostupný nebo vrací chybné odpovědi – ověřte přes 'nslookup google.com 8.8.8.8' (bypass ISP DNS). (2) Lokální DNS cache je poškozená nebo neaktuální – vymažte: 'ipconfig /flushdns'. (3) Hosts soubor (C:\\Windows\\System32\\drivers\\etc\\hosts) přesměrovává doménu na 127.0.0.1 (malware, ad-blocker). (4) DNSSEC ověření selhalo – doméno má neplatný podpis. Pokročilé nástroje: 'Resolve-DnsName google.com -Type A' (PowerShell), dig (Linux/WSL), Wireshark DNS filtrace (udp.port == 53).",
            en: "NXDOMAIN (Non-Existent Domain) is DNS response code 3 (RCODE=3), indicating the authoritative DNS server confirmed the domain does not exist. The browser shows this error when the recursive resolver (your ISP DNS) cannot find an A or AAAA record. Causes: (1) ISP DNS server is unreachable or returning incorrect answers – verify with 'nslookup google.com 8.8.8.8'. (2) Local DNS cache is corrupted or stale – flush it: 'ipconfig /flushdns'. (3) The hosts file (C:\\Windows\\System32\\drivers\\etc\\hosts) redirects the domain to 127.0.0.1 (malware, ad-blocker). (4) DNSSEC validation failed – the domain has an invalid signature. Advanced tools: 'Resolve-DnsName google.com -Type A' (PowerShell), dig (Linux/WSL), Wireshark DNS filter (udp.port == 53).",
            zh: "NXDOMAIN 是 DNS 响应码 3（RCODE=3），表示权威 DNS 服务器确认该域名不存在。原因：(1) ISP DNS 服务器不可达或返回错误答案——通过'nslookup google.com 8.8.8.8'验证；(2) 本地 DNS 缓存损坏或过时——清除：'ipconfig / flushdns'；(3) hosts 文件将域名重定向到 127.0.0.1（恶意软件、广告拦截器）；(4) DNSSEC 验证失败。高级工具：PowerShell'Resolve - DnsName'、dig、Wireshark DNS 过滤器（udp.port == 53）。"
        }
    },
    {
        id: "net-tcpip", type: "software", subcategory: "network",
        vendors: ["wifi", "ethernet"],
        code: "0x80070035 / Network Path Not Found",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: { cs: "Síťová cesta nebyla nalezena – nelze přistoupit ke sdíleným složkám v LAN.", en: "Network path not found – cannot access shared folders on the local network.", zh: "网络路径未找到，无法访问局域网共享文件夹。" },
        solution: { cs: "Povolte SMB protokol a síťové zjišťování. Resetujte TCP/IP stack: 'netsh int ip reset'.", en: "Enable SMB protocol and Network Discovery. Reset TCP/IP stack: 'netsh int ip reset'.", zh: "启用 SMB 协议和网络发现，重置 TCP/IP 协议栈：'netsh int ip reset'。" },
        details: {
            cs: "Chyba 0x80070035 nastane při pokusu o přístup k UNC cestě (\\\\server\\share) přes protokol SMB (Server Message Block). Časté příčiny: (1) SMB1 protokol je ve Windows 10/11 výchozně deaktivován kvůli bezpečnosti (WannaCry) – staré NAS nebo tiskárny ho vyžadují. Povolení: 'Enable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol'. (2) Síťové zjišťování vypnuto – Ovládací panely → Síť → Upřesnit nastavení sdílení. (3) Windows Firewall blokuje TCP port 445 (SMB), UDP 137-138 (NetBIOS Name Service). (4) Různé pracovní skupiny nebo domény. (5) Špatné přihlašovací údaje do sdílené složky – Správce pověření Windows. Pokročilá diagnostika: 'Test-NetConnection -ComputerName <IP> -Port 445' v PowerShell.",
            en: "Error 0x80070035 occurs when attempting to access a UNC path (\\\\server\\share) via SMB (Server Message Block). Common causes: (1) SMB1 protocol is disabled by default in Windows 10/11 (WannaCry security fix) – older NAS devices or printers require it. Enable: 'Enable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol'. (2) Network Discovery is turned off – Control Panel → Network → Advanced Sharing Settings. (3) Windows Firewall blocks TCP port 445 (SMB) or UDP 137-138 (NetBIOS Name Service). (4) Different workgroups or domains. (5) Incorrect credentials – Windows Credential Manager. Advanced diagnostic: 'Test-NetConnection -ComputerName <IP> -Port 445' in PowerShell.",
            zh: "尝试通过 SMB 协议访问 UNC 路径时发生错误 0x80070035。常见原因：(1) 出于安全原因（WannaCry），SMB1 协议在 Windows 10/11 中默认禁用——旧 NAS 设备或打印机需要它；(2) 网络发现已关闭；(3) Windows 防火墙阻止 TCP 端口 445 或 UDP 137-138；(4) 工作组或域不同；(5) 共享文件夹凭据不正确。高级诊断：在 PowerShell 中运行'Test - NetConnection - ComputerName < IP > -Port 445'。"
        }
    },
    {
        id: "net-wifi", type: "software", subcategory: "network",
        vendors: ["wifi"],
        code: "Wi-Fi Disconnects / Limited Connectivity",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: { cs: "Wi-Fi se opakovaně odpojuje nebo zobrazuje 'Omezené připojení'.", en: "Wi-Fi repeatedly disconnects or shows 'Limited Connectivity'.", zh: "Wi-Fi 反复断线或显示'受限连接'。" },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Vypněte úsporu energie Wi-Fi adaptéru:</strong> Stiskněte Win+X → Správce zařízení → Síťové adaptéry → dvakrát klikněte Wi-Fi → Správa napájení. Zrušte zatrhávací volbu <em>Povolit počítči vypnout toto zařízení...</em></li>
<li><strong>Resetujte Winsock a TCP/IP:</strong> Otevřete Příkazový řádek jako správce. Zadejte <code>netsh winsock reset</code>, poté <code>netsh int ip reset</code> a restartujte PC.</li>
<li><strong>Aktualizujte ovladač Wi-Fi:</strong> Pravým tlačítkem na Wi-Fi adaptér v Správci zařízení → Aktualizovat ovladač. Intel AX200/AX201 mají časté bugy ve starších verzích ovladačů.</li>
<li><strong>Zkuste jiný kanál na routeru:</strong> Přihlaste se do routeru (192.168.1.1) a změňte kanál 2.4 GHz na 1, 6 nebo 11. Nebo přepněte na 5 GHz pro méně rušení.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Disable Wi-Fi adapter power saving:</strong> Press Win+X → Device Manager → Network Adapters → double-click Wi-Fi → Power Management. Uncheck <em>Allow the computer to turn off this device to save power</em>.</li>
<li><strong>Reset Winsock and TCP/IP:</strong> Open Command Prompt as administrator. Run <code>netsh winsock reset</code>, then <code>netsh int ip reset</code> and restart the PC.</li>
<li><strong>Update Wi-Fi driver:</strong> Right-click the Wi-Fi adapter in Device Manager → Update driver. Intel AX200/AX201 have frequent bugs in older driver versions.</li>
<li><strong>Try a different router channel:</strong> Log into your router (192.168.1.1) and change the 2.4 GHz channel to 1, 6, or 11. Or switch to 5 GHz for less interference.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>关闭 Wi-Fi 适配器的节电功能：</strong>按 Win+X → 设备管理器 → 网络适配器 → 双击 Wi-Fi → 电源管理。去掉“允许计算机关闭此设备以节电”选项。</li>
<li><strong>重置 Winsock 和 TCP/IP：</strong>以管理员身份打开命令提示符，运行 <code>netsh winsock reset</code>，然后 <code>netsh int ip reset</code>，并重启电脑。</li>
<li><strong>更新 Wi-Fi 驱动：</strong>在设备管理器中右键 Wi-Fi 适配器 → 更新驱动程序。Intel AX200/AX201 在较旧驱动版本中有常见缺陷。</li>
<li><strong>尝试不同的路由器信道：</strong>登录路由器（192.168.1.1），将 2.4 GHz 信道改为 1、6 或 11，或切换到 5 GHz 以减少干扰。</li>
</ol>`
        },
        details: {
            cs: "Přerušované Wi-Fi je způsobeno kombinací softwarových a hardwarových faktorů. Nejčastější příčiny: (1) Windows Power Management automaticky vypíná Wi-Fi adaptér pro úsporu energie – adaptive power save mechanismus (802.11 Power Save Mode) způsobuje ztrátu asociace s AP. Oprava: Správce zařízení → Wi-Fi adaptér → Správa napájení → odtrhněte volbu. (2) Saturace Wi-Fi kanálu – příliš mnoho sítí na kanálu 1, 6, 11 (2.4 GHz). Přesměrujte router na 5 GHz nebo změňte kanál. (3) Zastaralý nebo buggy ovladač Wi-Fi adaptéru (Intel AX200/AX201 jsou notoricky problematické). (4) IP adresní konflikt v DHCP – příkaz 'ipconfig /release && ipconfig /renew'. (5) MTU problém pro PPPoE připojení – nastavte MTU na 1472.",
            en: "Intermittent Wi-Fi is caused by a combination of software and hardware factors. Most common causes: (1) Windows Power Management automatically powers down the Wi-Fi adapter; the 802.11 Power Save Mode causes loss of AP association. Fix: Device Manager → Wi-Fi adapter → Power Management → uncheck 'Allow the computer to turn off this device'. (2) Wi-Fi channel saturation – too many networks on 2.4GHz channels 1, 6, or 11. Switch router to 5GHz or change channel. (3) Outdated or buggy drivers (Intel AX200/AX201 is notably problematic). (4) IP address conflict in DHCP – run 'ipconfig /release && ipconfig /renew'. (5) MTU mismatch for PPPoE – set MTU to 1472.",
            zh: "间歇性 Wi-Fi 断线由软硬件综合因素导致。最常见原因：(1) Windows 电源管理自动关闭 Wi-Fi 适配器——802.11 省电模式导致与 AP 断开关联；修复：设备管理器 → Wi-Fi 适配器 → 电源管理 → 取消节电选项；(2) Wi-Fi 信道饱和——2.4GHz 信道过多网络，切换到 5GHz；(3) Wi-Fi 适配器驱动过旧或有缺陷（Intel AX200/AX201 有著名问题）；(4) DHCP IP 地址冲突——运行'ipconfig / release && ipconfig / renew'；(5) PPPoE 连接的 MTU 不匹配，将 MTU 设为 1472。"
        }
    },

    // =========================================================
    // === DRIVERS ===
    // =========================================================
    {
        id: "drv-pnp", type: "software", subcategory: "drivers",
        vendors: ["gpu-drv", "chipset-drv"],
        code: "PNP_DETECTED_FATAL_ERROR (0x000000CA)",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: { cs: "Plug-and-Play správce detekoval fatální chybu při inicializaci zařízení.", en: "Plug-and-Play manager detected a fatal error initializing a device.", zh: "即插即用管理器在初始化设备时检测到致命错误。" },
        solution: { cs: "Spusťte System Restore nebo odinstalujte nedávno přidaný hardware v Správci zařízení.", en: "Run System Restore or uninstall recently added hardware in Device Manager.", zh: "运行系统还原，或在设备管理器中卸载最近添加的硬件。" },
        details: {
            cs: "PNP_DETECTED_FATAL_ERROR (0x000000CA) nastane, když PnP Manager narazí na nekonzistentní nebo neopravitelnou chybu při správě zařízení za běhu. Typické scénáře: (1) Nově připojené USB nebo PCIe zařízení má fatálně vadný INF ovladač, který koruptoval interní PnP datové struktury. (2) Hot-plug operace na non-hotplug PCIe slotu. (3) Memory corruption v PnP device object způsobená jiným vadným ovladačem. Analýza: v MINIDUMP souboru hledejte !analyze -v výstup – bude identifikován vadný driver a Device Instance ID. Spusťte 'verifier /standard /all' (Driver Verifier) v testovacím prostředí pro zachycení nestandardního chování ovladačů.",
            en: "PNP_DETECTED_FATAL_ERROR (0x000000CA) occurs when the PnP Manager encounters an inconsistent or unrecoverable error while managing devices at runtime. Typical scenarios: (1) A newly connected USB or PCIe device has a fatally flawed INF driver that corrupted internal PnP data structures. (2) A hot-plug operation was performed on a non-hot-plug PCIe slot. (3) Memory corruption in a PnP device object caused by another faulty driver. Analysis: in the MINIDUMP file, look at the '!analyze -v' output to identify the faulty driver and Device Instance ID. Run 'verifier /standard /all' (Driver Verifier) in a test environment to catch non-standard driver behavior.",
            zh: "PNP_DETECTED_FATAL_ERROR（0x000000CA）发生在 PnP 管理器在运行时管理设备时遇到不一致或不可恢复的错误。典型场景：(1) 新连接的 USB 或 PCIe 设备有严重缺陷的 INF 驱动程序，破坏了内部 PnP 数据结构；(2) 在非热插拔 PCIe 插槽上执行了热插拔操作；(3) 另一个故障驱动程序导致 PnP 设备对象内存损坏。分析：在 MINIDUMP 文件中运行'!analyze - v'以识别故障驱动程序，并在测试环境中运行'verifier / standard / all'以捕获非标准驱动程序行为。"
        }
    },
    {
        id: "drv-dpc", type: "software", subcategory: "drivers",
        vendors: ["gpu-drv", "chipset-drv"],
        code: "DPC_WATCHDOG_VIOLATION (0x00000133)",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: { cs: "DPC Watchdog odhalil driver, který blokoval systém déle než 100 μs.", en: "DPC Watchdog detected a driver that blocked the system for more than 100μs.", zh: "DPC 看门狗检测到某个驱动程序阻塞系统超过 100 微秒。" },
        solution: { cs: "Aktualizujte SSD firmware. Zakažte SSD HIPM/DIPM úsporné režimy v Nastavení napájení.", en: "Update SSD firmware. Disable SSD HIPM/DIPM power-saving modes in Power Options.", zh: "更新 SSD 固件，在电源选项中禁用 SSD HIPM/DIPM 节电模式。" },
        details: {
            cs: "DPC (Deferred Procedure Call) je mechanismus Windows pro obsluhu přerušení ve dvou fázích na IRQL 2 (DISPATCH_LEVEL). DPC Watchdog sleduje, zda žádný DPC nekompletuje déle než 100 mikrosekund nebo celkový čas DPC nepřesáhne 10ms. Překročení = BSOD 0x133. Nejčastější viník: vadný SSD nebo optická mechanika s chybným AHCI/NVMe ovladačem. Konkrétní diagnostika: (1) Spusťte 'xperf -on latency -stackwalk Profile' a analyzujte v Windows Performance Analyzer (WPA) – zobrazí přesný callstack. (2) V Správci zařízení zkontrolujte, zda Disk Controller nemá žlutý vykřičník. (3) Nastavení napájení → PCI Express → Link State Power Management → vypněte. (4) V BIOSu SATA deaktivujte hot-plug.",
            en: "DPC (Deferred Procedure Call) is a Windows mechanism for two-phase interrupt handling at IRQL 2 (DISPATCH_LEVEL). The DPC Watchdog monitors that no single DPC takes longer than 100 microseconds, or that total DPC time doesn't exceed 10ms. Exceeding limits triggers BSOD 0x133. Most common culprit: a faulty SSD or optical drive with a broken AHCI/NVMe driver. Specific diagnostics: (1) Run 'xperf -on latency -stackwalk Profile' and analyze in Windows Performance Analyzer (WPA) to see the exact callstack. (2) In Device Manager, check if the Disk Controller has a yellow exclamation mark. (3) Power Options → PCI Express → Link State Power Management → disable. (4) In BIOS SATA settings, try disabling hot-plug.",
            zh: "DPC（延迟过程调用）是 Windows 在 IRQL 2 进行两阶段中断处理的机制。DPC 看门狗监控单个 DPC 不超过 100 微秒且 DPC 总时间不超过 10ms，超过限制触发蓝屏 0x133。最常见的罪魁祸首：带有损坏 AHCI/NVMe 驱动程序的故障 SSD 或光驱。具体诊断：(1) 运行'xperf - on latency - stackwalk Profile'并在 WPA 中分析精确调用堆栈；(2) 检查设备管理器中磁盘控制器是否有黄色感叹号；(3) 电源选项 → PCI Express → 链接状态电源管理 → 禁用；(4) 在 BIOS SATA 设置中禁用热插拔。"
        }
    },

    // =========================================================
    // === APPS & GAMES ===
    // =========================================================
    {
        id: "app-vcredist", type: "software", subcategory: "apps",
        vendors: ["runtime"],
        code: "VCRUNTIME140.dll Not Found",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: { cs: "Aplikace nebo hra se nespustí – chybí Visual C++ Runtime knihovna.", en: "App or game won't launch – Visual C++ Runtime library is missing.", zh: "应用程序或游戏无法启动，缺少 Visual C++ 运行库。" },
        solution: { cs: "Nainstalujte Visual C++ Redistributable 2015–2022 (x64 i x86) z webu Microsoftu.", en: "Install Visual C++ Redistributable 2015–2022 (both x64 and x86) from Microsoft's website.", zh: "从微软官网安装 Visual C++ Redistributable 2015–2022（x64 和 x86 版本）。" },
        details: {
            cs: "VCRUNTIME140.dll je součástí Microsoft Visual C++ 2015–2022 Redistributable balíčku. Tento soubor (i jeho varianty VCRUNTIME140_1.dll, MSVCP140.dll) je vyžadován všemi aplikacemi kompilovanými v MSVC kompilátoru. Chyba nastane pokud: (1) Redistributable balíček nebyl nikdy nainstalován. (2) DLL byla smazána antivirem (false positive). (3) Systém obsahuje pouze x64 verzi, ale 32-bit aplikace požaduje x86 verzi. (4) Verze DLL je příliš stará (Visual C++ 2015 vs. 2022 – jsou zpětně kompatibilní ale ne dopředně). Opravy: stáhněte aktuální VC++ Redistributable z Microsoft Download Center (hledejte 'Visual C++ Redistributable for Visual Studio 2022'); spusťte 'sfc /scannow' pro obnovení systémem poškozených DLL.",
            en: "VCRUNTIME140.dll is part of the Microsoft Visual C++ 2015–2022 Redistributable package. This file (and its variants VCRUNTIME140_1.dll, MSVCP140.dll) is required by all applications compiled with the MSVC compiler. The error occurs when: (1) The Redistributable package was never installed. (2) The DLL was deleted by antivirus (false positive). (3) The system only has the x64 version but a 32-bit app requires the x86 version. (4) The DLL version is too old (Visual C++ 2015 vs 2022 – backward compatible but not forward compatible). Fixes: download the latest VC++ Redistributable from the Microsoft Download Center (search 'Visual C++ Redistributable for Visual Studio 2022'); run 'sfc /scannow' to restore system-damaged DLLs.",
            zh: "VCRUNTIME140.dll 是 Microsoft Visual C++ 2015–2022 Redistributable 包的一部分。此文件（及其变体 VCRUNTIME140_1.dll、MSVCP140.dll）是所有使用 MSVC 编译器编译的应用程序所必需的。错误发生原因：(1) Redistributable 包从未安装；(2) DLL 被杀毒软件误删（误报）；(3) 系统只有 x64 版本，但 32 位应用需要 x86 版本；(4) DLL 版本过旧。修复：从 Microsoft 下载中心下载最新 VC++ Redistributable；运行'sfc / scannow'恢复系统损坏的 DLL。"
        }
    },
    {
        id: "app-directx", type: "software", subcategory: "apps",
        vendors: ["games", "runtime"],
        code: "DirectX Error / DXGI_ERROR_DEVICE_HUNG",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: { cs: "Hra crashuje s chybou DirectX – GPU přestala reagovat na DX příkazy.", en: "Game crashes with DirectX error – GPU stopped responding to DX commands.", zh: "游戏崩溃并出现 DirectX 错误——GPU 停止响应 DX 命令。" },
        solution: { cs: "Přeinstalujte DirectX přes 'dxsetup.exe'. Snižte grafické nastavení hry. Aktualizujte GPU ovladač.", en: "Reinstall DirectX via 'dxsetup.exe'. Lower in-game graphics settings. Update GPU driver.", zh: "通过'dxsetup.exe'重装 DirectX，降低游戏图形设置，更新显卡驱动。" },
        details: {
            cs: "DXGI_ERROR_DEVICE_HUNG je DirectX Graphics Infrastructure chyba signalizující, že GPU 'zamrzlo' při zpracování render commandů a nevylilo výsledek do swap chain do časového limitu. Technický kontext: DXGI runtime detekuje timeout v Command Queue – GPU neodpovědělo na fence signal. Příčiny: (1) Příliš vysoké grafické nastavení přetíží GPU fill rate – snižte rozlišení/textury/MSAA. (2) Shader kompilační stutter – nová DX12/Vulkan hra kompiluje PSO (Pipeline State Objects) za běhu, způsobující freeze. (3) Přehřívající se GPU dosáhne TDR timeoutu. (4) GPU driver bug ve specifické verzi hry nebo API verzi. Diagnostika: spusťte 'dxdiag.exe' → záložka Display → ověřte DirectX verzi; ověřte, že jsou nainstalovány nejnovější DirectX End-User Runtime verze.",
            en: "DXGI_ERROR_DEVICE_HUNG is a DirectX Graphics Infrastructure error signaling that the GPU froze while processing render commands and failed to flush results to the swap chain within the timeout. Technical context: the DXGI runtime detects a timeout in the Command Queue – the GPU did not respond to a fence signal. Causes: (1) Graphics settings too high – overloading GPU fill rate. Reduce resolution/textures/MSAA. (2) Shader compilation stutter – a new DX12/Vulkan game compiles PSOs (Pipeline State Objects) at runtime, causing a freeze. (3) Overheating GPU reaches the TDR timeout. (4) GPU driver bug specific to the game version or API. Diagnostics: run 'dxdiag.exe' → Display tab → verify DirectX version; ensure the latest DirectX End-User Runtime is installed.",
            zh: "DXGI_ERROR_DEVICE_HUNG 是 DirectX 图形基础设施错误，表示 GPU 在处理渲染命令时冻结，未能在超时期限内将结果刷新到交换链。原因：(1) 图形设置过高使 GPU 填充率过载——降低分辨率/纹理/MSAA；(2) 着色器编译卡顿——新 DX12/Vulkan 游戏在运行时编译 PSO，导致冻结；(3) 过热 GPU 达到 TDR 超时；(4) 特定游戏版本或 API 的 GPU 驱动错误。诊断：运行'dxdiag.exe' → 显示标签 → 验证 DirectX 版本，确保已安装最新 DirectX 终端用户运行库。"
        }
    },
    // =========================================================
    // === GPU (extended) ===
    // =========================================================
    {
        id: "gpu-overcurrent", type: "hardware", subcategory: "gpu",
        vendors: ["nvidia", "amd"],
        code: "GPU Over-Current / Power Limit Error",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "GPU se automaticky vypíná kvůli překročení proudového limitu napájecích konektorů.",
            en: "GPU shuts down automatically due to exceeding the current limit of power connectors.",
            zh: "由于供电接口电流超限，GPU 自动关机。"
        },
        solution: {
            cs: "Použijte plně modulární PSU kabely (ne splittery). Zkontrolujte specifikace PSU.",
            en: "Use fully modular PSU cables (avoid splitters). Verify PSU wattage specs.",
            zh: "使用全模组 PSU 线缆（避免分叉线），检查电源规格。"
        },
        details: {
            cs: "Moderní vysokovýkonné GPU (RTX 4080/4090, RX 7900 XTX) mohou při plném zatížení absorbovat proudové špičky přesahující přípustné limity napájecích konektorů. Každý 8-pin PCIe konektor je specifikován na 150 W, 16-pin (12VHPWR) na 600 W. Problémy: (1) Levné PSU mají špatnou regulaci napěťové větve 12 V – úbytek napětí při zatížení způsobuje výpadky. (2) Použití Y-splitter kabelů (2× 8pin → 16pin) přetěžuje jednoho PSU výstupu více než předpokládá specifikace. (3) Tenké nebo prodloužené napájecí kabely mají vyšší odpor – úbytek napětí = méně výkonu a potenciální tavení konektoru. Řešení: vždy používejte kabely přímo z PSU (ne adaptéry), ověřte, že PSU má 80+ Gold nebo vyšší certifikaci a dostatečnou rezervu 20–30 % nad TDP karty.",
            en: "Modern high-performance GPUs (RTX 4080/4090, RX 7900 XTX) can draw current spikes exceeding rated limits of power connectors during full load. Each 8-pin PCIe connector is spec'd at 150W; the 16-pin (12VHPWR) at 600W. Issues: (1) Cheap PSUs have poor 12V rail regulation – voltage sag under load causes shutdowns. (2) Y-splitter cables (2×8-pin → 16-pin) overload a single PSU output rail beyond spec. (3) Thin or extended cables have higher resistance – voltage drop reduces power delivery and may melt connectors. Solution: always use cables directly from the PSU (no adapters), verify 80+ Gold or higher certification, and maintain a 20–30% wattage headroom over GPU TDP.",
            zh: "现代高性能 GPU（RTX 4080/4090、RX 7900 XTX）在满载时可产生超过供电接口额定限制的电流尖峰。每个 8-pin PCIe 接口额定 150W，16-pin（12VHPWR）额定 600W。问题：(1) 低端电源 12V 电压调节差——负载下电压骤降导致关机；(2) Y 型分叉线（2×8-pin → 16-pin）使单个电源输出超过规格；(3) 细或延长的线缆阻抗较高——压降减少输出功率并可能造成接口熔化。解决方案：始终直接使用电源线缆（不用适配器），验证 80+ Gold 或更高认证，并保留 GPU TDP 的 20–30% 功率余量。"
        }
    },
    {
        id: "gpu-fan-stop", type: "hardware", subcategory: "gpu",
        vendors: ["nvidia", "amd"],
        code: "GPU Fan Not Spinning (0RPM Mode)",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "Ventilátory GPU se točí, ale karta se extrémně přehřívá, nebo se netočí vůbec.",
            en: "GPU fans spin but card drastically overheats, or fans do not spin at all.",
            zh: "GPU 风扇转动但显卡极度过热，或风扇完全不转。"
        },
        solution: {
            cs: "Zkontrolujte fan curve v MSI Afterburner. Vyčistěte prach z ventilátorů. Vyměňte vadné ventilátory.",
            en: "Check fan curve in MSI Afterburner. Clean dust from fans. Replace defective fan bearings.",
            zh: "在 MSI Afterburner 中检查风扇曲线，清洁风扇灰尘，更换有缺陷的风扇。"
        },
        details: {
            cs: "Mnoho moderních GPU (NVIDIA RTX a AMD RX série) využívá 0RPM (Zero Fan) režim – ventilátory jsou zastaveny při teplotě pod 50–60 °C pro snížení hluku. Problém nastane, pokud: (1) Fan controller čip na PCB selže a ventilátory se nezapnou ani při kritické teplotě. (2) Valivá ložiska ventilátoru jsou opotřebená – při nízkých otáčkách ventilátor zasekne. (3) Poškozený 4-pin PWM signál mezi PCB a ventilátorem. (4) Přehnaně agresivní undervolt způsobuje, že karta nejde do plného výkonu. Diagnostika: v MSI Afterburner nastavte manuální fan curve (100% při 60°C pro test), sledujte GPU Fan Speed v HWInfo64. Pokud nedosáhne zadaných otáček, ventilátory nebo fan controller je vadný.",
            en: "Many modern GPUs (NVIDIA RTX and AMD RX series) use 0RPM (Zero Fan) mode – fans stop below 50–60°C to reduce noise. Problems arise if: (1) The fan controller chip on the PCB fails and fans do not spin even at critical temperature. (2) Worn ball bearings cause the fan to stick at low RPM. (3) A damaged 4-pin PWM signal between PCB and fan. (4) Excessive undervolting may prevent proper power delivery. Diagnostics: in MSI Afterburner set a manual fan curve (100% at 60°C for testing) and monitor GPU Fan Speed in HWInfo64. If target RPM is not reached, the fans or fan controller are faulty.",
            zh: "许多现代 GPU（NVIDIA RTX 和 AMD RX 系列）使用 0RPM 模式——温度低于 50–60°C 时风扇停止以减少噪音。当以下情况发生时会出现问题：(1) PCB 上的风扇控制芯片失效；(2) 磨损的球轴承导致低速时风扇卡住；(3) PCB 与风扇之间的 4-pin PWM 信号损坏；(4) 过度降压。诊断：在 MSI Afterburner 中设置手动风扇曲线并在 HWInfo64 中监控 GPU 风扇转速。"
        }
    },

    // =========================================================
    // === CPU (extended) ===
    // =========================================================
    {
        id: "cpu-allcore-crash", type: "hardware", subcategory: "cpu",
        vendors: ["intel", "amd"],
        code: "CPU Crash Under All-Core Load (Cinebench/Blender)",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "Systém crashuje nebo restartuje pouze při 100% zátěži všech jader (render, kompilace).",
            en: "System crashes or restarts only under full all-core load (rendering, compiling).",
            zh: "仅在所有核心满负荷时（渲染、编译）系统崩溃或重启。"
        },
        solution: {
            cs: "Snižte All-Core boost frekvenci o 100–200 MHz. Navyšte Vcore nebo aktivujte LLC Level 4–5.",
            en: "Reduce All-Core boost by 100–200MHz. Increase Vcore or enable LLC Level 4–5.",
            zh: "将全核心加速频率降低 100–200MHz，提高 Vcore 或启用 LLC 4–5 级。"
        },
        details: {
            cs: "All-Core crash je klasickým projevem nestabilního Vcore při plném zatížení. Na moderních procesorech (Intel 13./14. gen, AMD Ryzen 7000) boost algoritmus dynamicky optimalizuje – při all-core zátěži všechna jádra sdílejí power budget a Vcore může poklesnout pod stabilní minimum (voltage droop). Mechanismy: (1) LLC (Load Line Calibration) v BIOSu kompenzuje voltage droop – Extreme LLC přidá offset, aby Vcore neupadlo pod bezpečnou mez. (2) Intel PL1/PL2 a AMD PPT limity – pokud jsou příliš nízko nastaveny, CPU throttluje lors. (3) Intel Raptor Lake (13./14. gen) měl prokázaný mikroarchitektonický problém s elektromigrace pod kombinací vysokého Vcore a teploty – Intel vydal mikrokód update a doporučené limity napětí. Testovací nástroje: Cinebench R23 multi-core, Prime95 Small FFT, OCCT CPU.",
            en: "An all-core crash is the classic symptom of an unstable Vcore under full load. On modern CPUs (Intel 13th/14th Gen, AMD Ryzen 7000), the boost algorithm operates dynamically – all-core workloads share the power budget and Vcore may droop below the stable minimum. Key mechanisms: (1) LLC (Load Line Calibration) in BIOS compensates for voltage droop – Extreme LLC adds an offset so Vcore does not drop below the safe threshold. (2) Power limits (Intel PL1/PL2, AMD PPT) set too low cause throttling under load. (3) Intel Raptor Lake (13th/14th Gen) had a documented electromigration issue under combined high Vcore and temperature – Intel released a microcode update. Testing tools: Cinebench R23 multi-core, Prime95 Small FFT, OCCT CPU.",
            zh: "全核心崩溃是满负荷时 Vcore 不稳定的典型表现。在现代处理器上，全核心负载时所有核心共享功耗预算，Vcore 可能跌落至稳定最低值以下。关键机制：(1) BIOS 中的 LLC 补偿电压骤降；(2) 功耗包限制设置过低时 CPU 降频；(3) Intel Raptor Lake（13/14 代）在高 Vcore 和温度组合下存在电迁移问题。测试工具：Cinebench R23 多核、Prime95 Small FFT、OCCT CPU。"
        }
    },
    {
        id: "cpu-imc", type: "hardware", subcategory: "cpu",
        vendors: ["intel", "amd"],
        code: "IMC Failure / Memory Controller Error",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "CPU nelze nastavit RAM na deklarovanou XMP frekvenci – IMC je slabý nebo poškozený.",
            en: "CPU cannot run RAM at declared XMP frequency – IMC is weak or damaged.",
            zh: "CPU 无法以声明的 XMP 频率运行内存，IMC 偏弱或已损坏。"
        },
        solution: {
            cs: "Snižte frekvenci RAM. Mírně zvyšte VCCSA/VCCIO napětí (Intel) nebo VDDIO (AMD).",
            en: "Lower RAM frequency. Slightly raise VCCSA/VCCIO voltage (Intel) or VDDIO (AMD).",
            zh: "降低内存频率，略微提高 VCCSA/VCCIO 电压（Intel）或 VDDIO（AMD）。"
        },
        details: {
            cs: "IMC (Integrated Memory Controller) je součástí CPU die a zodpovídá za veškerou komunikaci mezi procesorem a RAM moduly. Kvalita IMC se liší mezi kusy i generacemi – hovoříme o 'IMC loterii'. Slabý IMC nedosáhne vysokých frekvencí nebo přísných timingů, i když RAM moduly jsou certifikovány pro daný profil. Klíčová napětí: (1) Intel: VCCSA řídí System Agent (kde IMC sídlí), VCCIO řídí I/O buffy. Doporučené hodnoty pro DDR5: VCCSA 1.05–1.15 V, VCCIO 1.05 V. (2) AMD: VDDIO (1.1 V pro DDR5), napájení Infinity Fabric (VDDG). Poškozený IMC nastane vlivem výpadku napájení při aktivním tréninku RAM, elektrostatického výboje na DIMM slotu, nebo stabilního undervoltu pod minimální práh IMC. Diagnostika: spusťte MemTest86 s plným průchodem, pak zkuste nižší XMP úrovně.",
            en: "The IMC (Integrated Memory Controller) is part of the CPU die and manages all communication between the processor and RAM. IMC quality varies between individual chips and generations – often called the 'IMC lottery'. A weak IMC cannot reach high frequencies or tight timings even if RAM modules are certified. Key voltages: (1) Intel: VCCSA controls the System Agent (where IMC resides), VCCIO controls I/O buffers. Recommended for DDR5: VCCSA 1.05–1.15V, VCCIO 1.05V. (2) AMD: VDDIO (1.1V for DDR5), Infinity Fabric supply (VDDG). A damaged IMC can result from power loss during memory training, ESD to a DIMM slot, or sustained undervolting below the IMC minimum threshold.",
            zh: "IMC（集成内存控制器）是 CPU 芯片的一部分，管理处理器与内存之间的所有通信。IMC 质量因芯片而异——通常称为'IMC 抽奖'。关键电压：(1) Intel：VCCSA 控制系统代理（IMC 所在位置），VCCIO 控制 I/O 缓冲区；(2) AMD：VDDIO（DDR5 为 1.1V），Infinity Fabric 供电（VDDG）。IMC 损坏可能源于内存训练期间断电、DIMM 插槽静电放电，或持续降压低于 IMC 最低阈值。"
        }
    },

    // =========================================================
    // === RAM (extended) ===
    // =========================================================
    {
        id: "ram-ddr5-pmic", type: "hardware", subcategory: "ram",
        vendors: ["ddr5"],
        code: "DDR5 PMIC Error / No POST with DDR5",
        category: { cs: "Paměť RAM", en: "Memory (RAM)", zh: "内存" },
        description: {
            cs: "Systém s DDR5 RAM se nespustí nebo havaruje – PMIC čip na modulu selhal.",
            en: "DDR5 system fails to POST or crashes – PMIC chip on the module has failed.",
            zh: "DDR5 内存系统无法 POST 或崩溃，模块上的 PMIC 芯片失效。"
        },
        solution: {
            cs: "Aktualizujte BIOS (PMIC regulace). Snižte DRAM napětí na 1.1 V. Testujte modul na jiné desce.",
            en: "Update BIOS (PMIC regulation). Reduce DRAM voltage to 1.1V. Test module on a different board.",
            zh: "更新 BIOS（PMIC 调节），将 DRAM 电压降至 1.1V，在其他主板上测试模块。"
        },
        details: {
            cs: "DDR5 přinesla zásadní architektonickou změnu: Power Management IC (PMIC) je nyní integrován přímo na RAM modulu (ne na základní desce jako u DDR4). PMIC reguluje napájení DRAM čipů (VDD, VDDQ, VPP) s vysokou přesností. Problémy specifické pro DDR5: (1) Starší BIOS verze nedokáže správně inicializovat PMIC – nastavte DRAM napětí v BIOSu manuálně na 1.1 V. (2) Příliš vysoký VDDQ (nad 1.25 V) může tepelně poškodit PMIC čip. (3) Nekompatibilní kombinace PMIC revize čipu a BIOS firmware. (4) PMIC voltage rail error způsobí, že modul nebude schopen startovat – viditelné v POST debug kódu 55. Diagnostika: ověřte BIOS verzi pro DDR5 support; zkontrolujte VDD/VDDQ v BIOSu (měly by být 1.1 V pro DDR5-4800 JEDEC).",
            en: "DDR5 introduced a fundamental architecture change: the Power Management IC (PMIC) is now integrated directly on the RAM module (not on the motherboard as with DDR4). The PMIC regulates DRAM power (VDD, VDDQ, VPP) with high precision. DDR5-specific issues: (1) Older BIOS versions cannot properly initialize PMIC – manually set DRAM voltage to 1.1V in BIOS. (2) Excessive VDDQ (above 1.25V) can thermally damage the PMIC chip. (3) Incompatible PMIC chip revision and BIOS firmware combinations. (4) A PMIC voltage rail error prevents the module from booting – visible in POST debug code 55. Diagnostics: verify board BIOS version for DDR5 support; check VDD/VDDQ in BIOS (should be 1.1V for DDR5-4800 JEDEC).",
            zh: "DDR5 带来了根本性变化：电源管理 IC（PMIC）现在直接集成在内存模块上。PMIC 以高精度调节 DRAM 芯片电源。DDR5 特有问题：(1) 较旧的 BIOS 版本无法正确初始化 PMIC——手动将 DRAM 电压设为 1.1V；(2) 过高的 VDDQ 可能热损坏 PMIC 芯片；(3) PMIC 芯片版本与 BIOS 固件不兼容；(4) PMIC 电压轨错误在 POST 调试代码 55 中可见。"
        }
    },

    // =========================================================
    // === DISK (extended) ===
    // =========================================================
    {
        id: "disk-hdd-click", type: "hardware", subcategory: "disk",
        vendors: ["hdd"],
        code: "HDD Clicking / Click of Death",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: {
            cs: "Pevný disk vydává klikání nebo cvakání – příznak mechanického selhání hlaviček.",
            en: "Hard drive emits clicking or clunking – symptom of read/write head mechanical failure.",
            zh: "硬盘发出咔嗒声，这是读写磁头机械故障的征兆。"
        },
        solution: {
            cs: "IHNED zálohujte data! Disk je ve fázi selhání. Použijte Recuva nebo R-Studio pro záchrannou kopii.",
            en: "IMMEDIATELY back up data! The drive is failing. Use Recuva or R-Studio for emergency data recovery.",
            zh: "立即备份数据！硬盘正在故障中。使用 Recuva 或 R-Studio 进行紧急数据恢复。"
        },
        details: {
            cs: "Klikání HDD (click of death) je mechanická porucha čtecích/zapisovacích hlaviček. Příznak nastane, kdy: (1) Aktuátor arm, který pohybuje hlavičkami, hledá referenční polohu na crash stopu (zarážce) – tento pohyb způsobuje klikání. Nastává typicky po pádu disku nebo vlivem opotřebení. (2) Magnetické plotny jsou mechanicky poškozeny (otěr, prach) – hlavička přeskakuje přes poškozené oblasti. (3) Failure Read/Write Amplifier IC na PCB disku. Záchrana dat v pořadí agresivity: (a) SpinRite pro logické problémy, (b) mrazicí trik pro dočasné oživení, (c) čistá komora pro výměnu ploten. S.M.A.R.T. atribut #07 Seek Error Rate bude extrémně vysoký. Nikdy nespouštějte chkdsk na mechanicky poškozeném disku – zhoršuje stav.",
            en: "HDD clicking (the click of death) is a mechanical failure of the read/write head assembly. The symptom occurs when: (1) The actuator arm seeks its reference position against the crash stop – this movement creates the clicking sound, typically after a drop or from wear. (2) The magnetic platters are physically damaged – the head skips over damaged areas. (3) Read/Write Amplifier IC on the drive PCB fails. Data recovery in order of aggressiveness: (a) SpinRite for logical issues, (b) the freezer trick for temporary revival, (c) clean room platter swap for complete mechanical failure. S.M.A.R.T. attribute #07 Seek Error Rate will be extremely high. Never run chkdsk on a mechanically failing drive – it worsens the condition.",
            zh: "HDD 咔嗒声（死亡之音）是读写磁头组件的机械故障。症状发生原因：(1) 执行臂在碰撞挡块寻找参考位置——此动作产生咔嗒声，通常发生在跌落后或机械磨损后；(2) 磁盘盘片物理损坏——磁头在损坏区域跳过；(3) 硬盘 PCB 上的读写放大器 IC 失效。数据恢复方案：(a) SpinRite 处理逻辑问题，(b) 冰箱法临时恢复，(c) 洁净室换盘片。S.M.A.R.T. #07 寻道错误率将极高。切勿对机械损坏的硬盘运行 chkdsk。"
        }
    },
    {
        id: "disk-trim", type: "hardware", subcategory: "disk",
        vendors: ["ssd"],
        code: "SSD Performance Degradation (TRIM Issue)",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: {
            cs: "SSD je výrazně pomalejší než při koupi – TRIM neběží správně nebo je disk příliš zaplněn.",
            en: "SSD is significantly slower than at purchase – TRIM is not running or drive is too full.",
            zh: "SSD 速度明显比购买时慢，TRIM 未正常运行或磁盘过满。"
        },
        solution: {
            cs: "Spusťte 'Optimize Drives' pro SSD TRIM. Udržujte min. 15–20% volného místa na SSD.",
            en: "Run 'Optimize Drives' (defrag.exe) which performs TRIM on SSDs. Keep at least 15–20% free space.",
            zh: "运行'优化驱动器'（对 SSD 执行 TRIM），保持至少 15–20% 的可用空间。"
        },
        details: {
            cs: "TRIM (ATA Data Set Management Command) informuje SSD firmware o blocích, které již OS nepoužívá, aby je mohl FTL (Flash Translation Layer) předem vymazat a připravit pro zápis. Bez TRIM nastane write amplification – FTL musí nejprve přečíst celý blok (512 KB–4 MB erase block), upravit data, a zapsat celý blok zpět. Příčiny selhání TRIM: (1) SSD v RAID konfiguraci – Windows RAID driver nepropaguje TRIM příkazy přes RAID controller. (2) SSD v USB enclosure – USB-SATA bridge chip musí podporovat TRIM passthrough. (3) Plný disk – FTL nemá dostatek volného prostoru pro garbage collection. (4) Deaktivovaný TRIM: příkaz 'fsutil behavior query DisableDeleteNotify' (výsledek 0 = TRIM aktivní). Aktivace: 'fsutil behavior set DisableDeleteNotify 0'.",
            en: "TRIM (ATA Data Set Management Command) informs the SSD firmware which blocks the OS no longer uses, so the FTL (Flash Translation Layer) can pre-erase them for future writes. Without TRIM, write amplification occurs – the FTL must read an entire erase block (512KB–4MB), modify data, and rewrite the entire block. TRIM failure causes: (1) SSD in RAID – Windows RAID driver does not propagate TRIM commands. (2) SSD in USB enclosure – USB-SATA bridge must support TRIM passthrough. (3) Full disk – FTL lacks free space for garbage collection. (4) Disabled TRIM: 'fsutil behavior query DisableDeleteNotify' (0 = TRIM active). Enable: 'fsutil behavior set DisableDeleteNotify 0'.",
            zh: "TRIM 通知 SSD 固件哪些块 OS 不再使用，以便 FTL 预先擦除它们。没有 TRIM，会发生写放大。TRIM 失效原因：(1) SSD 在 RAID 配置中——Windows RAID 驱动程序不传播 TRIM 命令；(2) USB-SATA 桥接芯片不支持 TRIM 透传；(3) 磁盘已满；(4) TRIM 被禁用。激活：'fsutil behavior set DisableDeleteNotify 0'。"
        }
    },

    // =========================================================
    // === WINDOWS (extended) ===
    // =========================================================
    {
        id: "win-update-error", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "Windows Update Error 0x80080005 / 0x80070005",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Windows Update nelze stáhnout nebo nainstalovat – chyba přístupu nebo poškozená update cache.",
            en: "Windows Update cannot download or install – access error or corrupted update cache.",
            zh: "Windows Update 无法下载或安装，访问错误或更新缓存损坏。"
        },
        solution: {
            cs: "Resetujte Update cache: zastavte wuauserv, smažte SoftwareDistribution, restartujte službu.",
            en: "Reset cache: stop wuauserv service, delete C:\\Windows\\SoftwareDistribution folder, restart service.",
            zh: "重置缓存：停止 wuauserv 服务，删除 SoftwareDistribution 文件夹，重启服务。"
        },
        details: {
            cs: "Chyba 0x80080005 a 0x80070005 jsou oba ACCESS DENIED – Windows Update agent (wuauclt.exe) nemá oprávnění k zápisu do mezipaměti aktualizací. Systematické příčiny: (1) Poškozená složka SoftwareDistribution\\Download – obsahuje nekompletní update soubory. Řešení: 'net stop wuauserv' → smazat obsah C:\\Windows\\SoftwareDistribution → 'net start wuauserv'. (2) Windows Update service (wuauserv) nebo BITS jsou zastaveny. Příkaz: 'sc config wuauserv start= auto && net start wuauserv'. (3) Antivirus blokuje Windows Update agenta. (4) Systémový čas je špatně nastaven – HTTPS certifikáty Windows Update serveru nefungují při nesouladu více než 5 minut. Diagnostika: 'Get-WindowsUpdateLog' v PowerShell pro detailní log.",
            en: "Errors 0x80080005 and 0x80070005 are both ACCESS DENIED – the Windows Update agent (wuauclt.exe) lacks write permission to the update cache. Systematic causes: (1) Corrupted SoftwareDistribution\\Download folder. Fix: 'net stop wuauserv' → delete C:\\Windows\\SoftwareDistribution contents → 'net start wuauserv'. (2) Windows Update service (wuauserv) or BITS stopped. Command: 'sc config wuauserv start= auto && net start wuauserv'. (3) Antivirus blocking the Update agent. (4) Incorrect system time – HTTPS certificates fail when time differs by more than 5 minutes. Diagnostic: use 'Get-WindowsUpdateLog' in PowerShell.",
            zh: "错误 0x80080005 和 0x80070005 均为 ACCESS DENIED。系统性原因：(1) SoftwareDistribution\\Download 文件夹损坏；修复：停止服务 → 删除文件夹 → 重启服务；(2) Windows Update 服务或 BITS 已停止；(3) 杀毒软件阻止 Update 代理；(4) 系统时间不正确。诊断：PowerShell 中使用 'Get-WindowsUpdateLog'。"
        }
    },
    {
        id: "win-page-fault", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "PAGE_FAULT_IN_NONPAGED_AREA (0x00000050)",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "BSOD 0x50 – přístup do neexistující nebo nepřístupné stránky virtuální paměti kernelu.",
            en: "BSOD 0x50 – kernel code accessed a non-existent or inaccessible virtual memory page.",
            zh: "蓝屏 0x50——内核代码访问不存在或无法访问的虚拟内存页。"
        },
        solution: {
            cs: "Spusťte MemTest86. Ověřte integritu systémových souborů: 'sfc /scannow'. Odinstalujte problematický ovladač.",
            en: "Run MemTest86. Verify system file integrity: 'sfc /scannow'. Uninstall the problematic driver.",
            zh: "运行 MemTest86，验证系统文件完整性：'sfc /scannow'，卸载有问题的驱动程序。"
        },
        details: {
            cs: "PAGE_FAULT_IN_NONPAGED_AREA (0x50) nastane, když kernel kód přistoupí ke stránce virtuální paměti, která neexistuje v tabulce stránek nebo je označena jako 'not present'. Nonpaged pool je oblast paměti, která NESMÍ být swapována na disk – přístup na neplatnou adresu v nonpaged pool→ BSOD 0x50. Nejčastější zdroje: (1) Vadná RAM – bit flip v kernel space alokaci. (2) Poškozený nebo nekompatibilní ovladač zařízení – MINIDUMP identifikuje vadný modul. (3) Antivirus kernel driver s chybou hooking mechanismu. (4) Poškozený stránkovací soubor (pagefile.sys) – přesuňte pagefile na jiný disk. Analýza: WinDBG → !analyze -v → zobrazí faulting address, vadný modul a callstack.",
            en: "PAGE_FAULT_IN_NONPAGED_AREA (0x50) occurs when kernel code accesses a virtual memory page that does not exist in the page table or is marked 'not present'. The nonpaged pool MUST NOT be paged to disk – dereferencing an invalid address in it triggers BSOD 0x50. Most common sources: (1) Faulty RAM – bit flip in a kernel-space allocation. (2) Corrupted or incompatible device driver – identified in MINIDUMP. (3) Antivirus kernel driver with a broken hooking mechanism. (4) Corrupted pagefile.sys – move pagefile to a different drive. Analysis: WinDBG → '!analyze -v' → shows faulting address, faulty module, and call stack.",
            zh: "PAGE_FAULT_IN_NONPAGED_AREA（0x50）发生在内核代码访问页表中不存在或标记为'不存在'的虚拟内存页时。非分页池绝对不能被换出——取消引用其中无效地址触发蓝屏 0x50。最常见来源：(1) 有缺陷的 RAM；(2) 损坏或不兼容的设备驱动程序；(3) 防病毒内核驱动程序挂钩机制损坏；(4) 损坏的 pagefile.sys。分析：WinDBG → '!analyze -v'。"
        }
    },

    // =========================================================
    // === BIOS (extended) ===
    // =========================================================
    {
        id: "bios-fan-control", type: "software", subcategory: "bios",
        vendors: ["uefi"],
        code: "BIOS Fan Speed Control Failure",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS / UEFI" },
        description: {
            cs: "Ventilátor CPU/case nereguluje otáčky správně – běží na 100% nebo vůbec nefunguje.",
            en: "CPU/case fan does not regulate speed correctly – runs at 100% or not at all.",
            zh: "CPU/机箱风扇转速调节异常——以 100% 运行或完全不转。"
        },
        solution: {
            cs: "Zkontrolujte zapojení na 4-pin PWM hlavičce. Nastavte fan curve v BIOS → Q-Fan/Smart Fan.",
            en: "Check connection to 4-pin PWM header. Configure fan curve in BIOS Q-Fan or Smart Fan settings.",
            zh: "检查 4-pin PWM 接头连接，在 BIOS → Q-Fan/Smart Fan 中配置风扇曲线。"
        },
        details: {
            cs: "Moderní základní desky řídí ventilátory PWM (Pulse Width Modulation) signálem na 4. pinu konektoru při pevné frekvenci 25 kHz – BIOS Smart Fan algoritmus upravuje duty cycle (0–100 %). 3-pin ventilátor je řízen změnou napětí (DC control). Problémy: (1) Zapojení 3-pin ventilátoru na 4-pin PWM header – BIOS nevidí tachometrický signál a nastaví 100%. (2) Poškozený RPM feedback signál – header nedetekuje otáčky. (3) BIOS chybně nakonfigurovaná fan curve s teplotním zdrojem nastaveným na Ignore. (4) Firmware bug v ITE Super I/O čipu (fan controller). Doporučení: v BIOS nastavte zdrojový senzor (CPU nebo MB temp), definujte fan curve (min 40%, max 100%), aktivujte Smart Fan Control (ASUS Q-Fan, MSI Smart Fan 5, Gigabyte Smart Fan 6). Monitorování: HWInfo64 → ventilátor RPM senzory.",
            en: "Modern motherboards control fans via PWM (Pulse Width Modulation) on the 4th connector pin at a fixed 25kHz frequency – the BIOS Smart Fan algorithm adjusts the duty cycle (0–100%). 3-pin fans are controlled via voltage (DC control). Problems: (1) 3-pin fan on a 4-pin PWM header – BIOS sees no tachometer signal and forces 100%. (2) Damaged RPM feedback signal – header cannot detect fan speed. (3) Misconfigured BIOS fan curve with temperature source set to Ignore. (4) Firmware bug in the ITE Super I/O chip. Recommendation: set temperature source in BIOS (CPU or MB), define fan curve (min 40%, max 100%), enable Smart Fan Control (ASUS Q-Fan, MSI Smart Fan 5, Gigabyte Smart Fan 6). Monitor via HWInfo64 fan RPM sensors.",
            zh: "现代主板通过接口第 4 针的 PWM 信号控制风扇，固定频率 25kHz——BIOS Smart Fan 算法调整占空比（0–100%）。3-pin 风扇通过电压变化（DC 控制）控制。问题：(1) 4-pin PWM 接头上的 3-pin 风扇——BIOS 看不到转速计信号并强制 100%；(2) RPM 反馈信号损坏；(3) BIOS 风扇曲线温度源设置为'忽略'；(4) ITE Super I/O 芯片固件错误。建议：在 BIOS 中设置温度源，定义风扇曲线，启用智能风扇控制。"
        }
    },

    // =========================================================
    // === NETWORK (extended) ===
    // =========================================================
    {
        id: "net-apipa", type: "software", subcategory: "network",
        vendors: ["wifi", "ethernet"],
        code: "APIPA Address (169.254.x.x) / No DHCP Lease",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: {
            cs: "Počítač si přiřadí adresu 169.254.x.x – nelze získat IP od DHCP serveru (routeru).",
            en: "Computer assigns itself 169.254.x.x – cannot obtain an IP address from DHCP server (router).",
            zh: "计算机分配给自己 169.254.x.x 地址，无法从 DHCP 服务器（路由器）获取 IP。"
        },
        solution: {
            cs: "Resetujte síťový stack: 'netsh int ip reset' a 'netsh winsock reset'. Ověřte DHCP server.",
            en: "Reset network stack: 'netsh int ip reset' and 'netsh winsock reset'. Verify DHCP server status.",
            zh: "重置网络协议栈：'netsh int ip reset' 和 'netsh winsock reset'，检查 DHCP 服务器状态。"
        },
        details: {
            cs: "APIPA (Automatic Private IP Addressing) je RFC 3927 mechanismus – pokud síťový adaptér nezíská IP adresu od DHCP serveru do 30 sekund, Windows automaticky přiřadí adresu v rozsahu 169.254.0.1–169.254.255.254. Příčiny: (1) DHCP server (router) je nedostupný, restartuje nebo je saturovaný. (2) Vadný kabel nebo switch port. (3) Windows DHCP client service je zastaven: 'sc query dhcp'. (4) Poškozená Winsock LSP (Layered Service Provider) registrace způsobená VPN klienty nebo malware – oprava: 'netsh winsock reset catalog' + restart. Diagnostika: 'ipconfig /all' – zkontrolujte položku DHCP Enabled a Lease Obtained; 'ping 192.168.1.1' nebo výchozí bránu; 'arp -a' pro zobrazení MAC adresy routeru.",
            en: "APIPA (Automatic Private IP Addressing) is an RFC 3927 mechanism – if the NIC fails to obtain an IP from a DHCP server within 30 seconds, Windows self-assigns an address in the 169.254.0.1–169.254.255.254 range. Causes: (1) DHCP server (router) is unreachable, restarting, or overloaded. (2) Faulty cable or switch port. (3) Windows DHCP Client service stopped: 'sc query dhcp'. (4) Corrupted Winsock LSP registration from a VPN client or malware – fix: 'netsh winsock reset catalog' + restart. Diagnostics: 'ipconfig /all' – check DHCP Enabled and Lease Obtained; 'ping 192.168.1.1'; 'arp -a' to see router MAC address.",
            zh: "APIPA（自动私有 IP 寻址）是 RFC 3927 机制——如果网卡在 30 秒内无法从 DHCP 服务器获取 IP，Windows 自动分配 169.254.0.1–169.254.255.254 范围内的地址。原因：(1) DHCP 服务器（路由器）不可达、重启或过载；(2) 网线或交换机端口故障；(3) Windows DHCP 客户端服务已停止；(4) VPN 客户端或恶意软件导致 Winsock LSP 注册损坏——修复：'netsh winsock reset catalog' + 重启。诊断：'ipconfig /all'、'ping 192.168.1.1'、'arp -a'。"
        }
    },

    // =========================================================
    // === DRIVERS (extended) ===
    // =========================================================
    {
        id: "drv-audio", type: "software", subcategory: "drivers",
        vendors: ["audio-drv"],
        code: "Audio Service Not Running / No Sound",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "Zvuk přestane fungovat – Windows Audio Service je zastavena nebo selhal audio ovladač.",
            en: "Sound stops working – Windows Audio Service stopped or audio driver failed.",
            zh: "声音停止工作，Windows 音频服务停止或音频驱动程序失败。"
        },
        solution: {
            cs: "Restartujte Windows Audio service (services.msc). Přeinstalujte audio ovladač (Realtek).",
            en: "Restart Windows Audio service via services.msc. Reinstall audio driver (Realtek/Microsoft HD Audio).",
            zh: "通过 services.msc 重启 Windows Audio 服务，重新安装 Realtek 音频驱动程序。"
        },
        details: {
            cs: "Windows Audio stack se skládá z: Audio Engine (audiodg.exe – user mode), Windows Audio Service (audiosrv.dll – SVCHOST), Audio Class Driver (portcls.sys – kernel mode), HD Audio codec driver (Realtek/IDT). Příčiny selhání: (1) audiosrv.dll service selhal – restartujte: services.msc → Windows Audio → Restartovat. (2) Realtek HD Audio ovladač (RTKVHD64.sys) nekompatibilní s aktuální verzí Windows – odinstalujte a nainstalujte z webu Realtek. (3) Výchozí zvukové zařízení je nastaveno na Dummy nebo neexistující zařízení. (4) Exclusive Mode aplikace (DAW, ASIO) drží audio zařízení výhradně – jiné aplikace neslyší zvuk. (5) Windows Audio Endpoint Builder service musí také běžet. Diagnostika: 'Get-Service AudioSrv, AudioEndpointBuilder | Select Name, Status' v PowerShell.",
            en: "The Windows Audio stack consists of: Audio Engine (audiodg.exe – user mode), Windows Audio Service (audiosrv.dll – SVCHOST), Audio Class Driver (portcls.sys – kernel mode), and HD Audio codec driver (Realtek/IDT). Failure causes: (1) audiosrv.dll failed – restart: services.msc → Windows Audio → Restart. (2) Realtek HD Audio driver (RTKVHD64.sys) incompatible with current Windows – reinstall from Realtek website. (3) Default audio device set to Dummy or non-existent. (4) Exclusive Mode app (DAW, ASIO driver) holds device exclusively. (5) Windows Audio Endpoint Builder service must also run. Diagnostic: 'Get-Service AudioSrv, AudioEndpointBuilder | Select Name, Status' in PowerShell.",
            zh: "Windows 音频栈由以下组成：音频引擎（audiodg.exe）、Windows 音频服务（audiosrv.dll）、音频类驱动程序（portcls.sys）和 HD 音频编解码器驱动程序。失败原因：(1) audiosrv.dll 服务失败；(2) Realtek HD Audio 驱动程序不兼容；(3) 默认音频设备设置为不存在的设备；(4) 独占模式应用程序独占持有设备；(5) Windows Audio Endpoint Builder 服务未运行。诊断：PowerShell 中运行服务状态查询。"
        }
    },

    // =========================================================
    // === APPS & GAMES (extended) ===
    // =========================================================
    {
        id: "app-easyanticheat", type: "software", subcategory: "apps",
        vendors: ["games"],
        code: "Easy Anti-Cheat / BattlEye Launch Error",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Hra se nespustí kvůli chybě anti-cheat systému – EAC nebo BattlEye odmítá inicializaci.",
            en: "Game won't launch due to anti-cheat error – EAC or BattlEye refuses to initialize.",
            zh: "由于反作弊系统错误，游戏无法启动——EAC 或 BattlEye 拒绝初始化。"
        },
        solution: {
            cs: "Reinstalujte EAC/BattlEye přes složku hry. Ujistěte se, že Launcher běží jako administrátor.",
            en: "Reinstall EAC/BattlEye via the game folder. Ensure Steam/Launcher runs as Administrator.",
            zh: "通过游戏文件夹重新安装 EAC/BattlEye，确保启动器以管理员身份运行。"
        },
        details: {
            cs: "Easy Anti-Cheat (EAC, Epic) a BattlEye jsou kernel-mode anti-cheat ovladače (easyanticheat_launcher.sys, BEDaisy.sys) fungující na Ring 0 úrovni. Tyto ovladače musí být digitálně podepsány. Příčiny selhání: (1) Ovladač EAC nebo BattlEye nebyl nainstalován – spusťte 'EasyAntiCheat_Setup.exe install [GameID]' nebo 'BattlEye/Install_BattlEye.bat'. (2) Secure Boot nebo Kernel Patch Protection (PatchGuard) konflikty s ovladačem třetí strany (VPN, debug software). (3) Virtualizační software (VMware, VirtualBox s nested virtualization) interferuje s privilegovanými instrukcemi anti-cheat ovladače. (4) Poškozená instalace způsobená Windows Update, která přepsala kernel ovladač. Oprava: spusťte hru jako správce, dočasně vypněte VPN, ověřte integritu souborů přes Steam.",
            en: "Easy Anti-Cheat (EAC, Epic) and BattlEye are kernel-mode anti-cheat drivers (easyanticheat_launcher.sys, BEDaisy.sys) operating at Ring 0. These must be digitally signed. Failure causes: (1) EAC or BattlEye driver not installed – run 'EasyAntiCheat_Setup.exe install [GameID]' or 'BattlEye/Install_BattlEye.bat'. (2) Secure Boot or Kernel Patch Protection (PatchGuard) conflicts with a third-party driver (VPN, debug software). (3) Virtualization software (VMware, VirtualBox with nested virtualization) interferes with privileged anti-cheat instructions. (4) Windows Update corrupted the kernel driver. Fix: run game as Administrator, temporarily disable VPN, verify game files via Steam.",
            zh: "Easy Anti-Cheat（EAC）和 BattlEye 是在 Ring 0 级别运行的内核模式反作弊驱动程序，必须经过数字签名。失败原因：(1) EAC 或 BattlEye 驱动程序未安装——运行安装程序；(2) 安全启动或 PatchGuard 与第三方驱动程序冲突；(3) 虚拟化软件干扰特权指令；(4) Windows 更新损坏内核驱动程序。修复：以管理员身份运行游戏，临时禁用 VPN，通过 Steam 验证游戏文件。"
        }
    },
    {
        id: "app-net-framework", type: "software", subcategory: "apps",
        vendors: ["runtime"],
        code: ".NET Framework Error / CLR Crash",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Aplikace selže s chybou .NET Runtime – 'Unhandled Exception' nebo 'The runtime has encountered a fatal error'.",
            en: "App fails with .NET Runtime error – 'Unhandled Exception' or 'The runtime has encountered a fatal error'.",
            zh: "应用程序出现 .NET Runtime 错误——'未处理的异常'或'运行时遇到致命错误'。"
        },
        solution: {
            cs: "Nainstalujte správnou verzi .NET (4.8, 6, 8) z webu Microsoft. Spusťte 'dotnet --list-runtimes'.",
            en: "Install the correct .NET version (4.8, 6, 8) from Microsoft Download Center. Run 'dotnet --list-runtimes' to check.",
            zh: "从 Microsoft 下载中心安装正确的 .NET 版本（4.8、6、8），运行 'dotnet --list-runtimes' 检查。"
        },
        details: {
            cs: ".NET Framework (CLR – Common Language Runtime) je managed execution environment pro C#, VB.NET a F# aplikace. JIT kompilátor překládá CIL bytecode na nativní strojový kód za běhu. Chyba nastane pokud: (1) Aplikace vyžaduje .NET 4.8 ale systém má pouze 4.6.2 – starší verze .NET Framework jsou součástí Windows Update. (2) .NET Runtime 6 nebo 8 (moderní cross-platform .NET) není nainstalován – tyto verze se neinstalují automaticky. (3) Poškozená .NET instalace – použijte Microsoft .NET Repair Tool. (4) Výjimka v managed kódu nebyla zachycena – EventLog → Application log → '.NET Runtime' zdroj obsahuje přesný stack trace. Diagnostika: 'dotnet --info', Event Viewer Application log, Fusion log viewer (fuslogvw.exe) pro assembly binding chyby.",
            en: ".NET Framework (CLR – Common Language Runtime) is the managed execution environment for C#, VB.NET, and F# applications. The JIT compiler translates CIL (Common Intermediate Language) bytecode to native machine code at runtime. Errors occur when: (1) Application requires .NET 4.8 but system has only 4.6.2 – older .NET Framework versions come via Windows Update. (2) .NET Runtime 6 or 8 (modern cross-platform .NET) is not installed – not installed automatically. (3) Corrupted .NET installation – use Microsoft .NET Repair Tool. (4) Unhandled managed exception – EventLog → Application log → '.NET Runtime' source contains the exact stack trace. Diagnostics: 'dotnet --info', Event Viewer Application log, Fusion Log Viewer (fuslogvw.exe) for assembly binding failures.",
            zh: ".NET Framework（CLR——公共语言运行时）是 C#、VB.NET 和 F# 应用程序的托管执行环境。JIT 编译器在运行时将 CIL 字节码翻译为本机代码。错误发生原因：(1) 应用程序需要 .NET 4.8 但系统只有 4.6.2；(2) .NET Runtime 6 或 8 未安装——不会自动安装；(3) .NET 安装损坏——使用 Microsoft .NET 修复工具；(4) 托管代码中未处理的异常——事件查看器应用程序日志中的'.NET Runtime'源包含精确的堆栈跟踪。诊断：'dotnet --info'、Fusion Log Viewer（fuslogvw.exe）。"
        }
    },

    // =========================================================
    // === APPS & GAMES (original continued) ===
    // =========================================================
    {
        id: "app-steam", type: "software", subcategory: "apps",
        vendors: ["games"],
        code: "Steam Disk Write Error",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: { cs: "Steam nemůže zapisovat soubory hry na disk – instalace nebo aktualizace selhala.", en: "Steam cannot write game files to disk – installation or update failed.", zh: "Steam 无法向磁盘写入游戏文件，安装或更新失败。" },
        solution: { cs: "Spusťte Steam jako administrátor. Zkontrolujte integritu herních souborů. Změňte složku Steam Library na jiný disk.", en: "Run Steam as Administrator. Verify game file integrity. Change Steam Library folder to a different drive.", zh: "以管理员身份运行 Steam，验证游戏文件完整性，将 Steam 库文件夹更改到其他磁盘。" },
        details: {
            cs: "Steam Disk Write Error nastane, když Steamworks API nedokáže provést operaci zápisu souboru (CreateFile/WriteFile Win32 API selhalo s ACCESS_DENIED nebo DISK_FULL). Systematické příčiny: (1) Nedostatečná oprávnění – složka Steam Libraries je chráněna proti zápisu. Oprava: Pravý klik na Steam.exe → Spustit jako správce. (2) Plný nebo degradovaný disk – zkontrolujte S.M.A.R.T. stav a volné místo (minimum 15% pro správné fungování NTFS). (3) Antivirový software blokující Steam zapisovací operace – přidejte výjimku pro složku Steam do antivirového softwaru. (4) Poškozená Steam download cache – Steam → Nastavení → Stahování → Vymazat cache stahování. (5) Špatný sektor na disku ve Steam Library složce – spusťte 'chkdsk /f' na příslušném svazku.",
            en: "Steam Disk Write Error occurs when the Steamworks API cannot perform a file write operation (CreateFile/WriteFile Win32 API failed with ACCESS_DENIED or DISK_FULL). Systematic causes: (1) Insufficient permissions – the Steam Libraries folder is write-protected. Fix: Right-click Steam.exe → Run as administrator. (2) Full or degraded disk – check S.M.A.R.T. status and free space (minimum 15% for proper NTFS operation). (3) Antivirus software blocking Steam write operations – add the Steam folder as an exclusion. (4) Corrupted Steam download cache – Steam → Settings → Downloads → Clear Download Cache. (5) Bad sector on the disk in the Steam Library folder – run 'chkdsk /f' on the relevant volume.",
            zh: "当 Steamworks API 无法执行文件写入操作（CreateFile/WriteFile Win32 API 以 ACCESS_DENIED 或 DISK_FULL 失败）时发生 Steam 磁盘写入错误。系统性原因：(1) 权限不足——Steam 库文件夹受写保护；修复：右键点击 Steam.exe → 以管理员身份运行；(2) 磁盘已满或退化——检查 S.M.A.R.T. 状态和可用空间（NTFS 正常运行至少需要 15%）；(3) 杀毒软件阻止 Steam 写入操作——将 Steam 文件夹添加为排除项；(4) Steam 下载缓存损坏——Steam → 设置 → 下载 → 清除下载缓存；(5) Steam 库文件夹所在磁盘有坏扇区——运行'chkdsk / f'。"
        }
    },

    // =========================================================
    // === GPU (extended ×2, total → 9) ===
    // =========================================================
    {
        id: "gpu-pcie-x4", type: "hardware", subcategory: "gpu",
        vendors: ["nvidia", "amd", "intel"],
        code: "PCIe x16 Running at x4 / Bandwidth Degraded",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "GPU běží na PCIe x4 místo x16 – výkon v CPU-limitovaných scénářích je drasticky omezen.",
            en: "GPU is running at PCIe x4 instead of x16 – performance is drastically limited in CPU-bound scenarios.",
            zh: "GPU 以 PCIe x4 而非 x16 运行，在 CPU 受限场景中性能大幅下降。"
        },
        solution: {
            cs: "Instalujte GPU do primárního PCIe x16 slotu (první slot od CPU). Ověřte nastavení v BIOSu.",
            en: "Install GPU in the primary PCIe x16 slot (first slot from CPU). Verify PCIe slot mode in BIOS.",
            zh: "将 GPU 安装到主 PCIe x16 插槽（距 CPU 最近的第一个插槽），在 BIOS 中验证 PCIe 插槽模式。"
        },
        details: {
            cs: "PCIe šířka pásma přímo ovlivňuje přenosovou kapacitu mezi GPU a CPU. PCIe 4.0 x16 poskytuje 32 GB/s (bidirectional), zatímco x4 pouze 8 GB/s. V GPU-Z záložce Bus Interface uvidíte aktuální stav (PCI-E x16 vs x4). Příčiny x4 degradace: (1) GPU zapojena do sekundárního M.2 / PCIe switchovaného slotu – u mnoha desek je druhý slot fyzicky x16, ale elektricky x4. (2) CPU nemá dostatek PCIe linek – Intel Core i5/i7 desktop (bez K) má pouze 16+4 PCIe 5.0 linek; při použití M.2 NVMe a GPU současně může být GPU přepnuta na x8. (3) Poškozený PCIe retimer nebo trace na základní desce. (4) BIOS nastavení PCIe slotu manuálně omezeno na x4 pro M.2 sdílení. Diagnostika: GPU-Z → Bus Interface (aktuální) porovnejte s maximálním; 3DMark PCI Express Feature Test měří efektivní propustnost.",
            en: "PCIe bandwidth directly affects transfer capacity between GPU and CPU. PCIe 4.0 x16 provides 32 GB/s (bidirectional) while x4 provides only 8 GB/s. GPU-Z Bus Interface tab shows the current state (PCI-E x16 vs x4). Causes of x4 degradation: (1) GPU inserted into a secondary M.2/PCIe switched slot – on many boards the second slot is physically x16 but electrically x4. (2) CPU lacks sufficient PCIe lanes – some Intel desktop CPUs have limited lanes; simultaneous NVMe and GPU use may drop GPU to x8. (3) Damaged PCIe retimer or trace on the motherboard. (4) BIOS PCIe slot setting manually limited to x4 for M.2 lane sharing. Diagnostics: GPU-Z → Bus Interface (current) vs maximum; 3DMark PCI Express Feature Test measures effective throughput.",
            zh: "PCIe 带宽直接影响 GPU 和 CPU 之间的传输能力。PCIe 4.0 x16 提供 32 GB/s，而 x4 仅提供 8 GB/s。GPU-Z Bus Interface 标签显示当前状态。x4 降级原因：(1) GPU 插入次级 M.2/PCIe 切换插槽——许多主板第二插槽物理上是 x16 但电气上是 x4；(2) CPU PCIe 通道不足；(3) 主板上 PCIe 重计时器或走线损坏；(4) BIOS PCIe 插槽设置手动限制为 x4。诊断：GPU-Z Bus Interface 比较当前值与最大值；3DMark PCIe 功能测试衡量有效吞吐量。"
        }
    },
    {
        id: "gpu-nvenc", type: "hardware", subcategory: "gpu",
        vendors: ["nvidia", "amd"],
        code: "NVENC / AMF Hardware Encoding Error",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "Hardwarové kódování videa (OBS, Premiere, DaVinci) selže nebo produkuje artefakty.",
            en: "Hardware video encoding (OBS, Premiere, DaVinci) fails or produces corrupted output.",
            zh: "硬件视频编码（OBS、Premiere、DaVinci）失败或产生损坏的输出。"
        },
        solution: {
            cs: "Aktualizujte GPU ovladač. V OBS přepněte na NVENC New nebo AMF H.264. Snižte bitrate.",
            en: "Update GPU driver. In OBS switch to NVENC New or AMF H.264. Reduce encoding bitrate.",
            zh: "更新 GPU 驱动，在 OBS 中切换到 NVENC New 或 AMF H.264，降低编码码率。"
        },
        details: {
            cs: "NVENC (NVIDIA Video Encoder) a AMF (AMD Advanced Media Framework) jsou dedikované enkodovací enginy (fixed-function hardware) integrované do GPU. NVENC od Turing (RTX 20xx) podporuje H.264, HEVC a AV1 (Ada Lovelace, RTX 40xx). Příčiny selhání: (1) Zastaralý ovladač – NVENC API se mění s každou generací; OBS Studio vyžaduje minimálně ovladač 522.25 pro NVENC SDK 12.x. (2) Bitrate příliš vysoký pro VBR/CBR enkodér – NVENC má maximální bitrate limity závisející na profilu. (3) Poškozená VRAM způsobuje artefakty ve výstupu enkodéru – spusťte GPU stress test. (4) Více instancí OBS nebo aplikací sdílí NVENC – NVENC má limit současných sessions (Maxwell: 2, Turing+: 5). (5) Na laptopech s dual-GPU (iGPU + dGPU) OBS může volat iGPU NVENC místo dGPU. Diagnostika: Enable NVENC Debug Log v OBS Settings → Advanced; zkontrolujte eventlog na NvEncOpenEncodeSessionEx chyby.",
            en: "NVENC (NVIDIA Video Encoder) and AMF (AMD Advanced Media Framework) are dedicated fixed-function hardware encoding engines integrated into the GPU. NVENC from Turing (RTX 20xx) onwards supports H.264, HEVC, and AV1 (Ada Lovelace RTX 40xx). Failure causes: (1) Outdated driver – the NVENC API changes per generation; OBS Studio requires at minimum driver 522.25 for NVENC SDK 12.x. (2) Bitrate too high for VBR/CBR encoder – NVENC has maximum bitrate limits depending on profile. (3) Corrupted VRAM causes artifacts in encoder output – run a GPU stress test. (4) Multiple OBS or app instances sharing NVENC – it has a concurrent session limit (Maxwell: 2, Turing+: 5). (5) On dual-GPU laptops OBS may target iGPU NVENC instead of dGPU. Diagnostics: enable NVENC Debug Log in OBS Settings → Advanced; check event log for NvEncOpenEncodeSessionEx errors.",
            zh: "NVENC（NVIDIA 视频编码器）和 AMF（AMD 高级媒体框架）是集成在 GPU 中的专用固定功能硬件编码引擎。失败原因：(1) 驱动过旧——NVENC API 随世代变化，OBS Studio 需要至少驱动 522.25；(2) 码率过高超过编码器 VBR/CBR 限制；(3) 损坏的 VRAM 导致编码器输出出现伪影；(4) 多个 OBS 实例共享 NVENC——有并发会话限制；(5) 双 GPU 笔记本上 OBS 可能调用核显而非独显。诊断：在 OBS 设置中启用 NVENC 调试日志。"
        }
    },

    // =========================================================
    // === CPU (extended ×4, total → 9) ===
    // =========================================================
    {
        id: "cpu-c-state", type: "hardware", subcategory: "cpu",
        vendors: ["intel", "amd"],
        code: "CPU C-State Freeze / System Hang After Idle",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "Systém zamrzne nebo se nereaguje po delší nečinnosti – CPU se neprobudí z hlubokého C-State.",
            en: "System freezes or becomes unresponsive after extended idle – CPU fails to wake from a deep C-state.",
            zh: "长时间空闲后系统冻结，CPU 无法从深度 C-State 唤醒。"
        },
        solution: {
            cs: "Zakažte C6/C8/C10 stavy v BIOSu nebo nastavte Windows Power Plan na 'High Performance'.",
            en: "Disable C6/C8/C10 states in BIOS or set Windows Power Plan to 'High Performance'.",
            zh: "在 BIOS 中禁用 C6/C8/C10 状态，或将 Windows 电源计划设置为'高性能'。"
        },
        details: {
            cs: "C-State (CPU Power State) je hierarchie úsporných stavů procesoru definovaná ACPI specifikací. C0 = aktivní, C1 = halt (zastavení clock), C3 = sleep (cache flush), C6 = deep power down (Vcore vypnuto), C10 (moderní Intel) = téměř kompletní vypnutí. Problémy s wake-up: (1) AMD Ryzen 3000/5000 měly notorický 'USB wakeup bug' – při přechodu do C6/C10 některé USB kontrolery nebyly správně probuzeny. Řešení: AMD vydal AGESA aktualizaci. (2) Intel 12.–14. gen může mít konflikt mezi C-state a DRAM refresh timing. (3) Driver konflikty s ACPI HAL – IRQ21 ACPI může dostat chybný affinity. Diagnostika: powercfg /energy (Windows) odhalí C-state problémy; Processor Idle States v HWInfo64 zobrazí hitrate každého C-state; zkuste 'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 100'.",
            en: "C-States are a hierarchy of CPU power-saving states defined by the ACPI specification. C0 = active, C1 = halt (clock stop), C3 = sleep (cache flush), C6 = deep power down (Vcore off), C10 (modern Intel) = near-complete shutdown. Wake-up issues: (1) AMD Ryzen 3000/5000 had a notorious 'USB wakeup bug' – transitioning to C6/C10 caused some USB controllers to fail to wake. AMD released an AGESA update. (2) Intel 12th–14th Gen can have C-state conflicts with DRAM refresh timing. (3) Driver conflicts with ACPI HAL – IRQ21 ACPI can receive incorrect affinity. Diagnostics: 'powercfg /energy' reveals C-state issues; Processor Idle States in HWInfo64 shows hit rate per C-state; try 'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 100'.",
            zh: "C-State 是 ACPI 规范定义的 CPU 节电状态层次结构。C0=活动，C1=停止，C3=睡眠（缓存刷新），C6=深度断电（Vcore 关闭），C10=近乎完全断电。唤醒问题：(1) AMD Ryzen 3000/5000 有著名的'USB 唤醒错误'——进入 C6/C10 时某些 USB 控制器无法唤醒，AMD 发布了 AGESA 更新；(2) Intel 12–14 代可能存在 C-State 与 DRAM 刷新时序冲突；(3) 驱动程序与 ACPI HAL 冲突。诊断：'powercfg /energy'、HWInfo64 处理器空闲状态。"
        }
    },
    {
        id: "cpu-pbo", type: "hardware", subcategory: "cpu",
        vendors: ["amd"],
        code: "AMD Precision Boost Overdrive (PBO) Not Boosting",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "AMD procesor nedosahuje deklarovaných boost frekvencí ani při PBO aktivaci.",
            en: "AMD processor fails to reach advertised boost clocks even with PBO enabled.",
            zh: "即使启用 PBO，AMD 处理器也无法达到宣传的加速频率。"
        },
        solution: {
            cs: "Aktualizujte BIOS (AGESA). Povolte PBO a nastavte Curve Optimizer. Ověřte chladič.",
            en: "Update BIOS (AGESA). Enable PBO and configure Curve Optimizer. Verify cooler performance.",
            zh: "更新 BIOS（AGESA），启用 PBO 并配置曲线优化器，检查散热器性能。"
        },
        details: {
            cs: "AMD Precision Boost Overdrive (PBO) je automatický overclocking framework pro Ryzen procesory. PBO sleduje čtyři parametry (PPT, TDC, EDC limity a teplotu) a v rámci bezpečných mezí zvyšuje boost frekvenci. Problémy: (1) Nedostatečný chladič – PBO vyžaduje, aby teplota jádra zůstala pod Tjmax. Pokud chladič je slabý, boost je omezován teplotou. (2) Curve Optimizer vychýlený záporně příliš agresivně – podvolt způsobí crash při boost. (3) BIOS příliš nízko nastavené PPT/TDC/EDC power limity (zejména u OEM desek). (4) Procesor nainstalovaný v AM4 socketu s nedostatečným tepelným rozhraním. (5) AMD Ryzen Master Software konflikty s BIOS PBO nastavením. Diagnostika: Ryzen Master zobrazí aktuální PPT, TDC, EDC, Peak Speed. HWInfo64 Effective Clock vs Base Clock porovnání. HWINFO64 'CPU Package Power' ukazuje, zda je výkon limitován tepelně nebo výkonově.",
            en: "AMD Precision Boost Overdrive (PBO) is an automatic overclocking framework for Ryzen CPUs. PBO monitors four parameters (PPT, TDC, EDC limits and temperature) and raises boost frequency within safe margins. Issues: (1) Inadequate cooler – PBO requires core temperature to stay below Tjmax; a weak cooler throttles the boost. (2) Curve Optimizer set too aggressively negative – undervolting causes crashes at boost. (3) BIOS power limits (PPT/TDC/EDC) set too low, especially on OEM boards. (4) Insufficient thermal interface between CPU and cooler. (5) AMD Ryzen Master software conflicts with BIOS PBO settings. Diagnostics: Ryzen Master shows current PPT, TDC, EDC, Peak Speed; HWInfo64 Effective vs Base Clock comparison; 'CPU Package Power' in HWInfo64 shows thermal vs power throttle.",
            zh: "AMD Precision Boost Overdrive（PBO）是 Ryzen 处理器的自动超频框架，监控四个参数（PPT、TDC、EDC 限制和温度）并在安全范围内提高加速频率。问题：(1) 散热器不足——PBO 要求核心温度保持在 Tjmax 以下；(2) 曲线优化器设置过于激进的负值——降压导致加速时崩溃；(3) BIOS 功耗限制过低（尤其是 OEM 主板）；(4) CPU 与散热器之间的导热界面不足；(5) AMD Ryzen Master 软件与 BIOS PBO 设置冲突。诊断：使用 Ryzen Master 和 HWInfo64 监控。"
        }
    },
    {
        id: "cpu-pin-bend", type: "hardware", subcategory: "cpu",
        vendors: ["intel", "amd"],
        code: "Bent CPU/Socket Pin – No POST",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "Ohnutý pin v socketu (Intel LGA) nebo na CPU (AMD AM4/AM5) – systém se vůbec nespustí.",
            en: "Bent pin in socket (Intel LGA) or on CPU (AMD AM4/AM5) – system fails to POST at all.",
            zh: "插槽（Intel LGA）或 CPU（AMD AM4/AM5）引脚弯曲，系统完全无法 POST。"
        },
        solution: {
            cs: "Prohlédněte piny pod lupou. Opatrně narovnejte mechanickou tužkou. Zasílejte do servisu.",
            en: "Inspect pins under magnification. Carefully straighten bent pins with a mechanical pencil. Send for professional repair.",
            zh: "用放大镜检查引脚，用自动铅笔小心矫正弯曲引脚，或委托专业维修。"
        },
        details: {
            cs: "Ohnuté piny jsou nejčastěji způsobeny: (1) Nesprávnou instalací chladiče – mechanický tlak nebo zaklouznutí šroubováku. (2) Pádem CPU na stůl (AMD AM4/AM5 – piny jsou na CPU). (3) Agresivním čištěním slotu. (4) Průmyslovým ESD výbojem. Detekce: vizuální inspekce pod lupou nebo mobilní kamerou s makrem – hledejte odchylku v pravidelném rastru pinů. Oprava na LGA socketu (Intel): použijte mechanickou tužku (0.5 mm tuha) nebo jehlu – jemně zatlačte z boku kolmo k ohnutí. NIKDY netlačte přímo zhora. Oprava na AM4/AM5 CPU: stejný princip, ale piny jsou menší a křehčí. Profesionální servisy používají BGA rework station nebo specializovaný nástroj. Poznámka: u Intel LGA 1700 (Alder/Raptor Lake) dokumentovaný problém s deformací pouzdra CPU způsobující nerovnoměrný kontakt s IHS – řeší se after-market Intel Contact Frame (Thermalright/Thermal Grizzly).",
            en: "Bent pins are most commonly caused by: (1) Improper cooler installation – mechanical pressure or a slipping screwdriver. (2) Dropping the CPU on a surface (AMD AM4/AM5 – pins are on the CPU itself). (3) Aggressive slot cleaning. (4) Industrial ESD discharge. Detection: visual inspection under magnification or phone macro camera – look for misalignment in the regular pin grid array. Repair on LGA socket (Intel): use a mechanical pencil (0.5mm lead) or a sewing needle – gently push from the side perpendicular to the bend direction. NEVER push from directly above. Repair on AM4/AM5 CPU: same principle, but pins are smaller and more fragile. Note: Intel LGA 1700 (Alder/Raptor Lake) has a documented ILM (Independent Loading Mechanism) deformation issue causing uneven CPU-IHS contact – addressed with aftermarket contact frames (Thermalright, Thermal Grizzly Conductonaut Extreme).",
            zh: "引脚弯曲最常见原因：(1) 散热器安装不当——机械压力或螺丝刀滑动；(2) CPU 跌落（AMD AM4/AM5，引脚在 CPU 上）；(3) 激进清洁插槽；(4) 静电放电。检测：用放大镜或手机微距相机进行视觉检查——寻找引脚阵列中的偏差。修复 Intel LGA 插槽：用自动铅笔（0.5mm 铅芯）或针从侧面轻推，切勿从正上方推。注意：Intel LGA 1700 有记录在案的 ILM 变形问题，导致 CPU-IHS 接触不均，可用售后接触框架解决。"
        }
    },
    {
        id: "cpu-fivr", type: "hardware", subcategory: "cpu",
        vendors: ["intel", "amd"],
        code: "Vcore Instability / FIVR / VID Mismatch",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "CPU dostává nestabilní nebo příliš vysoké napájení – systém crashuje i bez přetaktování.",
            en: "CPU receives unstable or excessively high voltage – system crashes without any overclocking.",
            zh: "CPU 接收不稳定或过高的电压，系统在没有超频的情况下崩溃。"
        },
        solution: {
            cs: "V BIOSu nastavte Vcore na 'Auto' nebo 'Offset -0.1V'. Ověřte VRM teploty v HWInfo64.",
            en: "Set Vcore to 'Auto' or 'Offset -0.1V' in BIOS. Verify VRM temperatures in HWInfo64.",
            zh: "在 BIOS 中将 Vcore 设置为'自动'或'偏移 -0.1V'，在 HWInfo64 中验证 VRM 温度。"
        },
        details: {
            cs: "Moderní CPU komunikuje s VRM prostřednictvím VID (Voltage Identification) protokolu (Intel SVID, AMD SVI3). CPU dynamicky žádá o napětí dle zátěže. Problémy: (1) BIOS s agresivním LLC nastavením dává CPU vyšší Vcore než požaduje – Intel procesory s Vcore nad 1.55 V jsou náchylné k degradaci. (2) FIVR (Fully Integrated Voltage Regulator) na starších Intel CPU (Haswell) byl notoricky vadný při zvýšeném Vcore. (3) Poškozený VRM na základní desce poskytuje nestabilní napájení s vysokým ripple (zvlněním). (4) CPU sám hlásí špatný VID přes SVID – nutná výměna CPU. Monitoring: HWInfo64 zobrazí 'CPU Core Voltage' (skutečné napětí) vs 'VID' (požadované napětí). Ripple měření vyžaduje osciloskop na VCC pinu. Doporučené limity: Intel 1.35 V max pro denní uso bez degradace; AMD 1.45 V max SoC.",
            en: "Modern CPUs communicate with the VRM via the VID (Voltage Identification) protocol (Intel SVID, AMD SVI3). The CPU dynamically requests voltage based on load. Issues: (1) BIOS with aggressive LLC gives the CPU higher Vcore than requested – Intel CPUs with Vcore above 1.55V are prone to degradation. (2) FIVR (Fully Integrated Voltage Regulator) on older Intel CPUs (Haswell) was notoriously problematic at elevated Vcore. (3) A damaged VRM delivers unstable power with high ripple. (4) The CPU itself reports an incorrect VID via SVID – requires CPU replacement. Monitoring: HWInfo64 shows 'CPU Core Voltage' (actual) vs 'VID' (requested). Ripple measurement requires an oscilloscope on the VCC pin. Recommended limits: Intel 1.35V max for daily use; AMD 1.45V SoC max.",
            zh: "现代 CPU 通过 VID（电压识别）协议（Intel SVID，AMD SVI3）与 VRM 通信，根据负载动态请求电压。问题：(1) BIOS 激进的 LLC 设置给 CPU 的 Vcore 高于请求——Intel CPU Vcore 超过 1.55V 容易退化；(2) 旧 Intel CPU（Haswell）上的 FIVR 在高 Vcore 下有著名缺陷；(3) 损坏的 VRM 提供具有高纹波的不稳定电源；(4) CPU 本身通过 SVID 报告错误的 VID。监控：HWInfo64 显示实际电压与请求电压对比。"
        }
    },

    // =========================================================
    // === RAM (extended ×5, total → 9) ===
    // =========================================================
    {
        id: "ram-single-channel", type: "hardware", subcategory: "ram",
        vendors: ["ddr4", "ddr5"],
        code: "RAM Running in Single Channel Mode",
        category: { cs: "Paměť RAM", en: "Memory (RAM)", zh: "内存" },
        description: {
            cs: "Systém běží v jednokanálovém módu místo dvoukanálového – propustnost RAM je na polovině.",
            en: "System runs in single-channel mode instead of dual-channel – RAM bandwidth is halved.",
            zh: "系统以单通道模式而非双通道运行，内存带宽减半。"
        },
        solution: {
            cs: "Nainstalujte RAM moduly do slotů A2 a B2 (dle schématu desky). Ověřte v CPU-Z záložka Memory.",
            en: "Install RAM modules in slots A2 and B2 (per board diagram). Verify in CPU-Z Memory tab.",
            zh: "将内存模块安装在 A2 和 B2 插槽中（根据主板图示），在 CPU-Z 内存标签中验证。"
        },
        details: {
            cs: "Dual-channel režim zdvojnásobuje šířku pásma RAM (ze 64-bit na 128-bit datovou sběrnici) což je kritické pro iGPU (Ryzen/Intel Iris Xe, kde GPU přistupuje přímo do RAM) a CPU výkon v memory-bound workloadech. Příčiny single-channel: (1) Moduly instalovány do slotů A1+A2 nebo B1+B2 (stejný kanál) místo A2+B2 (různé kanály). (2) Základní deska má vadný DIMM slot – modul v tom slotu se nerozpozná, výsledkem je single-channel. (3) Nedostatečný kontakt jednoho modulu. (4) Jeden ze dvou modulů je vadný – vyjměte je a testujte jednotlivě. Diagnostika: CPU-Z → Memory → Channel Mode zobrazí Single/Dual/Quad. Vliv na výkon: AMD Ryzen s iGPU ztrácí 30–40% GPU výkonu v single-channel.",
            en: "Dual-channel mode doubles RAM bandwidth (from 64-bit to 128-bit data bus), which is critical for iGPUs (Ryzen/Intel Iris Xe, which access system RAM directly) and CPU performance in memory-bound workloads. Single-channel causes: (1) Modules installed in A1+A2 or B1+B2 slots (same channel) instead of A2+B2 (different channels). (2) A faulty DIMM slot on the motherboard – the module in that slot is undetected, resulting in single-channel. (3) Poor contact from one module. (4) One of the two modules is defective – remove and test individually. Diagnostics: CPU-Z → Memory → Channel Mode shows Single/Dual/Quad. Performance impact: AMD Ryzen with iGPU loses 30–40% GPU performance in single-channel.",
            zh: "双通道模式将 RAM 带宽翻倍（从 64 位到 128 位数据总线），对于核显（Ryzen/Intel Iris Xe，直接访问系统内存）和内存受限工作负载中的 CPU 性能至关重要。单通道原因：(1) 模块安装在 A1+A2 或 B1+B2 插槽（同一通道）而非 A2+B2（不同通道）；(2) 主板上的 DIMM 插槽故障；(3) 单个模块接触不良；(4) 两个模块中的一个有缺陷。诊断：CPU-Z → 内存 → 通道模式。"
        }
    },
    {
        id: "ram-ecc", type: "hardware", subcategory: "ram",
        vendors: ["ddr4", "ddr5"],
        code: "ECC Memory Error / Uncorrectable Bit Error",
        category: { cs: "Paměť RAM", en: "Memory (RAM)", zh: "内存" },
        description: {
            cs: "ECC RAM hlásí nekorigovatelnou chybu – data v paměti jsou poškozena.",
            en: "ECC RAM reports an uncorrectable error – data in memory is corrupted.",
            zh: "ECC 内存报告不可纠正错误，内存中的数据已损坏。"
        },
        solution: {
            cs: "Identifikujte vadný modul přes EDAC nástroje (Linux) nebo Windows Event Log. Vyměňte modul.",
            en: "Identify the faulty module via EDAC tools (Linux) or Windows Event Log. Replace the module.",
            zh: "通过 EDAC 工具（Linux）或 Windows 事件日志识别故障模块，更换该模块。"
        },
        details: {
            cs: "ECC (Error-Correcting Code) RAM přidává extra bity pro detekci a opravu chyb. Standard ECC (SECDED – Single Error Correct, Double Error Detect) opraví 1-bitové chyby a detekuje 2-bitové. Systém funguje normálně při 1-bitové chybě a vypíná se při nekorigovatelné 2-bitové chybě. Platformy s ECC: AMD Ryzen Pro, Intel Xeon, serverové platformy. Chyby: (1) Přehřátí DRAM modulu – ECC chyby dramaticky expandují nad 70°C. (2) Kosmické záření způsobuje single-event upsets (SEU) v DRAM – ECC to koriguje transparentně. (3) Fyzicky pošškozeného DRAM čip produkuje trvalé chyby. (4) Nedostatečné napájení DRAM (VDDQ pokles) způsobuje refresh failures. Monitoring: Linux: 'edac-util -s 0'; Windows: Event Viewer → System → zdroj 'mcupdate_GenuineIntel'; AMD: nectar Dashboard; Intel: RAS Inspector. Kritická alert: single-bit chyby rostoucí v čase = předzvěst hardwarového selhání.",
            en: "ECC (Error-Correcting Code) RAM adds extra bits to detect and correct memory errors. Standard ECC (SECDED – Single Error Correct, Double Error Detect) corrects 1-bit errors and detects 2-bit errors. The system operates normally during a 1-bit error and shuts down on an uncorrectable 2-bit error. ECC-capable platforms: AMD Ryzen Pro, Intel Xeon, server platforms. Error causes: (1) DRAM module overheating – ECC errors increase dramatically above 70°C. (2) Cosmic radiation causes single-event upsets (SEUs) in DRAM – ECC corrects these transparently. (3) A physically damaged DRAM chip produces persistent errors. (4) Inadequate DRAM power (VDDQ droop) causes refresh failures. Monitoring: Linux: 'edac-util -s 0'; Windows: Event Viewer → System → source 'mcupdate_GenuineIntel'. Alert: growing single-bit errors over time signal impending hardware failure.",
            zh: "ECC（纠错码）内存添加额外比特来检测和纠正内存错误。标准 ECC（SECDED）纠正 1 位错误并检测 2 位错误。错误原因：(1) DRAM 模块过热——70°C 以上 ECC 错误显著增加；(2) 宇宙射线导致 DRAM 中的单事件扰动（SEU）；(3) 物理损坏的 DRAM 芯片产生持续错误；(4) DRAM 供电不足导致刷新失败。监控：Linux：'edac-util -s 0'；Windows：事件查看器。"
        }
    },
    {
        id: "ram-speed-fluctuation", type: "hardware", subcategory: "ram",
        vendors: ["ddr4", "ddr5"],
        code: "RAM Speed Revert to 2133MHz After Every Boot",
        category: { cs: "Paměť RAM", en: "Memory (RAM)", zh: "内存" },
        description: {
            cs: "Systém se při každém startu resetuje RAM na výchozí 2133/3200 MHz místo XMP nastavení.",
            en: "System resets RAM to default 2133/3200MHz on every boot instead of XMP settings.",
            zh: "系统每次启动都将内存重置为默认 2133/3200MHz，而非 XMP 设置。"
        },
        solution: {
            cs: "Znovu aktivujte XMP/DOCP v BIOSu. Vyměňte CMOS baterii. Flashujte aktuální BIOS.",
            en: "Re-enable XMP/DOCP in BIOS. Replace the CMOS battery. Flash the latest BIOS.",
            zh: "在 BIOS 中重新启用 XMP/DOCP，更换 CMOS 电池，刷新最新 BIOS。"
        },
        details: {
            cs: "BIOS ukládá XMP/DOCP nastavení do CMOS paměti napájené CR2032 baterií. Nastavení se ztrácí pokud: (1) Baterie CR2032 je vybitá (pod 2.8 V) – BIOS se resetuje na JEDEC výchozí hodnoty po každém vypnutí. (2) Uživatel omylem stiskl 'Load Defaults' nebo 'Restore Factory Settings' v BIOSu. (3) Automatický BIOS safe mode reset – pokud předchozí boot selhal (XMP způsobil nestabilitu), BIOS automaticky resetuje nastavení. (4) UEFI NVRAM korupce způsobená výpadkem napájení při uložení nastavení. (5) Novější BIOS verze změní layout NVRAM – stará nastavení se ztratí. Prevence: po instalaci nového BIOSu vždy manuálně nastavte XMP, Boot Priority a Fan Curves znovu. BIOS flash může (ne vždy) resetovat NVRAM.",
            en: "BIOS stores XMP/DOCP settings in CMOS memory powered by the CR2032 battery. Settings are lost when: (1) CR2032 battery is depleted (below 2.8V) – BIOS resets to JEDEC defaults after every power cycle. (2) User accidentally pressed 'Load Defaults' or 'Restore Factory Settings'. (3) Automatic BIOS safe mode reset – if the previous boot failed (XMP caused instability), BIOS auto-resets settings. (4) UEFI NVRAM corruption from a power loss during a BIOS save operation. (5) A newer BIOS version changes the NVRAM layout – old settings are lost. Prevention: after flashing BIOS, always manually re-configure XMP, Boot Priority, and Fan Curves. BIOS flash may (not always) reset NVRAM.",
            zh: "BIOS 将 XMP/DOCP 设置存储在由 CR2032 电池供电的 CMOS 内存中。设置丢失原因：(1) CR2032 电池耗尽（低于 2.8V）——每次断电后 BIOS 重置为 JEDEC 默认值；(2) 用户不小心按下了'加载默认值'；(3) 自动 BIOS 安全模式重置——若上次启动失败，BIOS 自动重置；(4) UEFI NVRAM 损坏；(5) 新 BIOS 版本更改了 NVRAM 布局。"
        }
    },
    {
        id: "ram-stability-test", type: "hardware", subcategory: "ram",
        vendors: ["ddr4", "ddr5"],
        code: "MemTest86 Errors Found – RAM Instability",
        category: { cs: "Paměť RAM", en: "Memory (RAM)", zh: "内存" },
        description: {
            cs: "MemTest86 nebo Windows Memory Diagnostic nalezl chyby – paměť je fyzicky nestabilní.",
            en: "MemTest86 or Windows Memory Diagnostic found errors – RAM is physically unstable.",
            zh: "MemTest86 或 Windows 内存诊断发现错误，内存物理不稳定。"
        },
        solution: {
            cs: "Testujte každý modul zvlášť. Spusťte HCI MemTest nebo TestMem5 (TM5) s anta777 profilem.",
            en: "Test each module individually. Run HCI MemTest or TestMem5 (TM5) with the anta777 profile.",
            zh: "单独测试每个模块，使用 anta777 配置文件运行 HCI MemTest 或 TestMem5（TM5）。"
        },
        details: {
            cs: "MemTest86 je bootovatelný nástroj testující RAM přes standardizované testovací algoritmy: (1) Moving inversions test – zapíše vzor, invertuje, ověří. (2) Modulo 20 test – testuje adresování. (3) Bit fade test – detekuje řídnutí signálu. Jakákoli non-zero chyba = nestabilní RAM. Upřesnění metodiky: MemTest86 testuje pouze fyzicky namapovanou RAM, nikoli DRAM refresh mechanismus. Pro hlubší testy: HCI MemTest (Windows, testuje přes více vláken), TestMem5 s anta777 ExtremeCPU.cfg profilem (nejagresivnější test). Interpretace výsledků: chyby v konkrétní adresní oblasti identifikují vadný DRAM čip. Moderní DDR5 moduly mají ECC on-die (ECC uvnitř modulu transparent pro systém) – opravují bit-flipy, takže MemTest nemusí odhalit mírné problémy. Spusťte alespoň 2 kompletní průchody (4–8 hodin pro 32 GB).",
            en: "MemTest86 is a bootable tool that tests RAM through standardized algorithms: (1) Moving inversions test – writes a pattern, inverts it, verifies. (2) Modulo 20 test – verifies addressing. (3) Bit fade test – detects signal weakening. Any non-zero error = unstable RAM. Methodology refinement: MemTest86 only tests physically mapped RAM, not the DRAM refresh mechanism. For deeper testing: HCI MemTest (Windows, multi-threaded), TestMem5 with the anta777 ExtremeCPU.cfg profile (most aggressive test). Result interpretation: errors in a specific address region identify the faulty DRAM die. Modern DDR5 modules have on-die ECC (transparent to the system) – they correct bit flips, so MemTest may miss mild issues. Run at least 2 complete passes (4–8 hours for 32GB).",
            zh: "MemTest86 是通过标准化算法测试 RAM 的可启动工具：(1) 移动反转测试；(2) 取模 20 测试；(3) 位衰减测试。任何非零错误 = 不稳定内存。方法细化：MemTest86 仅测试物理映射的 RAM，不测试 DRAM 刷新机制。更深测试：TM5 with anta777 配置文件（最激进测试）。现代 DDR5 有片上 ECC，可能掩盖轻微问题。至少运行 2 次完整测试（32GB 需 4–8 小时）。"
        }
    },

    // =========================================================
    // === DISK (extended ×5, total → 9) ===
    // =========================================================
    {
        id: "disk-bad-sectors", type: "hardware", subcategory: "disk",
        vendors: ["hdd", "ssd"],
        code: "Bad Sectors / chkdsk Errors",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: {
            cs: "chkdsk nebo správce disku hlásí vadné sektory – data na postižených místech jsou ztracena.",
            en: "chkdsk or Disk Management reports bad sectors – data in affected areas is lost.",
            zh: "chkdsk 或磁盘管理报告坏扇区，受影响区域的数据丢失。"
        },
        solution: {
            cs: "Spusťte 'chkdsk /f /r /b' z recovery. Zálohujte okamžitě. Zvažte výměnu disku.",
            en: "Run 'chkdsk /f /r /b' from recovery environment. Back up immediately. Consider drive replacement.",
            zh: "从恢复环境运行'chkdsk /f /r /b'，立即备份，考虑更换硬盘。"
        },
        details: {
            cs: "Vadné sektory (Bad Sectors) jsou oblasti na disku, kde firmware nemůže spolehlivě číst nebo zapisovat data. HDD: fyzické poškození magnetické vrstvy plotny. SSD: NAND flash blok s příliš vyčerpanými P/E cykly. Typy vadných sektorů: (1) Měkké (soft bad sectors) – způsobené dočasnou chybou čtení, lze opravit přepisem (chkdsk /r to dělá). (2) Tvrdé (hard bad sectors) – fyzické poškození, nelze opravit; chkdsk je označí a přestane je používat. chkdsk přepínače: '/f' opraví souborový systém, '/r' nalezne bad sectors, '/b' resetuje seznam bad sectors (Windows 7+). S.M.A.R.T. atributy: #05 (Reallocated Sectors Count – HDD přesunul vadný sektor do rezervy) a #197 (Current Pending Sectors). Bezpečnostní kopírování z disku s bad sectors: použijte ddrescue (Linux) nebo R-Studio s Image Mode – kopíruje co lze, přeskočí bad sectors.",
            en: "Bad sectors are areas on a drive where the firmware cannot reliably read or write data. HDD: physical damage to the platter's magnetic coating. SSD: NAND flash blocks exhausted beyond P/E cycle limits. Types: (1) Soft bad sectors – caused by temporary read errors, recoverable by overwriting ('chkdsk /r' does this). (2) Hard bad sectors – physical damage, cannot be repaired; chkdsk marks them and avoids them. chkdsk switches: '/f' repairs the filesystem, '/r' locates bad sectors, '/b' resets the bad cluster list (Windows 7+). S.M.A.R.T. attributes: #05 (Reallocated Sectors Count) and #197 (Current Pending Sectors). Emergency copying from a bad-sector drive: use ddrescue (Linux) or R-Studio in Image Mode – copies what's readable, skips bad sectors.",
            zh: "坏扇区是磁盘上固件无法可靠读写数据的区域。类型：(1) 软坏扇区——由临时读取错误引起，可通过覆写恢复（'chkdsk /r'会这样做）；(2) 硬坏扇区——物理损坏，无法修复；chkdsk 标记并避免使用它们。chkdsk 开关：'/f'修复文件系统，'/r'定位坏扇区，'/b'重置坏簇列表。S.M.A.R.T. 属性：#05（重新分配扇区计数）和 #197（当前待处理扇区）。从坏扇区磁盘紧急复制：使用 ddrescue 或 R-Studio 镜像模式。"
        }
    },
    {
        id: "disk-ssd-wear", type: "hardware", subcategory: "disk",
        vendors: ["ssd"],
        code: "SSD Endurance Warning (TBW Exceeded)",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: {
            cs: "SSD překročil deklarovanou hodnotu TBW (Total Bytes Written) – flash buňky jsou opotřebené.",
            en: "SSD has exceeded its rated TBW (Total Bytes Written) – NAND flash cells are worn out.",
            zh: "SSD 已超过额定 TBW（总写入字节数），NAND 闪存单元已磨损。"
        },
        solution: {
            cs: "Zálohujte IHNED. Monitor S.M.A.R.T. Wear Leveling Count. Nahraďte SSD.",
            en: "Back up IMMEDIATELY. Monitor S.M.A.R.T. Wear Leveling Count. Replace the SSD.",
            zh: "立即备份，监控 S.M.A.R.T. 磨损均衡计数，更换 SSD。"
        },
        details: {
            cs: "TBW (Total Bytes Written) je garantovaná záruka výrobce pro maximální množství dat zapsaných na SSD po celou dobu jeho životnosti. TLC NAND: 300–600 P/E cyklů; QLC NAND: 100–150 P/E cyklů. Výrobci garantují TBW: 1 TB TLC SSD typicky 600 TBW. Po překročení TBW: SSD přejde do Read-Only módu (chrání existující data). S.M.A.R.T. monitoring: #177 Wear Leveling Count (hodnota klesá od 100 k 0; při 0 jsou NAND buňky opotřebeny); #233 Media Wearout Indicator; #241 Total LBAs Written; #242 Total LBAs Read. Moderní enterprise SSD (Firemní, U.2, EDSFF) mají TBW tisíce PB. Zajímavost: Samsung řady 990 Pro v roce 2023 měl firmware bug způsobující abnormálně vysoké opotřebení – sledujte vendor firmware release notes.",
            en: "TBW (Total Bytes Written) is the manufacturer's guaranteed maximum data write endurance over the SSD's lifetime. TLC NAND: 300–600 P/E cycles; QLC NAND: 100–150 P/E cycles. Typical TBW: 1TB TLC SSD ≈ 600 TBW. After TBW is exceeded: the SSD transitions to Read-Only mode to protect existing data. S.M.A.R.T. monitoring: #177 Wear Leveling Count (counting down from 100 to 0; at 0, NAND cells are worn); #233 Media Wearout Indicator; #241 Total LBAs Written; #242 Total LBAs Read. Enterprise SSDs (U.2, EDSFF) have TBW in the tens of petabytes. Notable: Samsung 990 Pro in 2023 had a firmware bug causing abnormally high wear – always check vendor firmware release notes.",
            zh: "TBW（总写入字节数）是制造商保证的 SSD 整个生命周期内的最大数据写入耐久性。TLC NAND：300–600 P/E 循环；QLC NAND：100–150 P/E 循环。超出 TBW 后：SSD 进入只读模式以保护现有数据。S.M.A.R.T. 监控：#177 磨损均衡计数（从 100 降至 0）；#233 媒体磨损指示器；#241 总 LBA 写入数。企业级 SSD TBW 达数十 PB。注意：Samsung 990 Pro 2023 年有固件错误导致异常高磨损。"
        }
    },
    {
        id: "disk-raid-degraded", type: "hardware", subcategory: "disk",
        vendors: ["hdd", "ssd", "nvme"],
        code: "RAID Array Degraded / Drive Missing",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: {
            cs: "RAID pole hlásí degradovaný stav – jeden disk selhal nebo chybí.",
            en: "RAID array reports degraded state – one drive has failed or is missing.",
            zh: "RAID 阵列报告退化状态，一个磁盘已故障或缺失。"
        },
        solution: {
            cs: "Nezasahujte bez zálohy. Identifikujte vadný disk, vyměňte ho a odpočněte RAID rebuild.",
            en: "Do not intervene without a backup. Identify failing drive, replace it, and wait for RAID rebuild.",
            zh: "在没有备份的情况下不要干预，识别故障磁盘，更换它，等待 RAID 重建。"
        },
        details: {
            cs: "RAID (Redundant Array of Independent Disks) může ztratit redundanci při selhání jednoho disku. Typy: RAID 1 (zrcadlo, 1 disk záloha), RAID 5 (parity, 1 disk záloha), RAID 6 (2 disky záloha), RAID 10 (zrcadlo+stripe). Kritické: během degradovaného stavu a rebuildu je pole extrémně náchylné k selhání dalšího disku. Rebuild RAID 5 s 4TB disky trvá 12–24 hodin a generuje intenzivní čtení, což může odhalit latentní bad sectors. Typy RAID kontrolerů: (1) Hardware RAID (LSI/Broadcom MegaRAID, HPE SmartArray) – dedikovaný čip, BBU cache. (2) Software RAID (Windows Storage Spaces, Linux mdadm). (3) Fake RAID (Intel RST/Rapid Storage) – software na výrobcově řadiči. Monitoring: 'mdadm --detail /dev/md0' (Linux); Intel RST; MegaRAID Storage Manager. Kritická: nevyměňujte více disků najednou.",
            en: "RAID (Redundant Array of Independent Disks) loses redundancy when one drive fails. Types: RAID 1 (mirror, 1-drive redundancy), RAID 5 (parity, 1-drive), RAID 6 (2-drive), RAID 10 (stripe+mirror). Critical: during degraded state and rebuild, the array is extremely vulnerable to additional drive failures. A RAID 5 rebuild with 4TB drives takes 12–24 hours of intensive read activity, which can surface latent bad sectors. RAID controller types: (1) Hardware RAID (LSI/Broadcom MegaRAID, HPE SmartArray) – dedicated chip with BBU cache. (2) Software RAID (Windows Storage Spaces, Linux mdadm). (3) Fake RAID (Intel RST). Monitor: 'mdadm --detail /dev/md0' (Linux); Intel RST; MegaRAID Storage Manager. Critical: never replace more than one drive at a time.",
            zh: "RAID 在一个磁盘故障时失去冗余。类型：RAID 1（镜像，1 盘冗余），RAID 5（奇偶校验，1 盘），RAID 6（2 盘），RAID 10。关键：在退化状态和重建期间，阵列极易受到额外磁盘故障影响。4TB 磁盘的 RAID 5 重建需要 12–24 小时，可能暴露潜在坏扇区。RAID 控制器类型：(1) 硬件 RAID；(2) 软件 RAID；(3) 伪 RAID（Intel RST）。监控：'mdadm --detail'、Intel RST。切勿同时更换多个磁盘。"
        }
    },
    {
        id: "disk-gpt-corrupt", type: "hardware", subcategory: "disk",
        vendors: ["hdd", "ssd", "nvme"],
        code: "Corrupted GPT / Partition Table Error",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: {
            cs: "Disk není rozpoznán nebo systém hlásí neznámý oddíl – GPT tabulka je poškozená.",
            en: "Disk is unrecognized or shows unknown partition – GPT partition table is corrupted.",
            zh: "磁盘无法识别或显示未知分区，GPT 分区表已损坏。"
        },
        solution: {
            cs: "Použijte 'testdisk' (zdarma) pro obnovu GPT. Nebo 'diskpart → sel disk → clean → convert gpt' (ztráta dat!).",
            en: "Use 'testdisk' (free open-source) to recover the GPT. Or 'diskpart → sel disk → clean → convert gpt' (data loss!).",
            zh: "使用'testdisk'（免费开源）恢复 GPT，或'diskpart → sel disk → clean → convert gpt'（数据丢失！）。"
        },
        details: {
            cs: "GPT (GUID Partition Table) je moderní standard pro rozdělení disků (náhrada starého MBR). GPT ukládá tabulku oddílů na začátku disku (LBA 1–33) i na konci disku jako zálohu (poslední 33 LBA). Poškození nastane: (1) Náhlé odpojení disku při zápisu do GPT oblasti. (2) Chybné 'dd' nebo 'diskpart clean' příkazy. (3) Ransomware přepisující první sektory. (4) HDD selhání v oblasti LBA 1–33. Oprava pomocí testdisk: spusťte testdisk → vyberte disk → Analyze → zobrazí nalezené oddíly → Write. testdisk čte záložní GPT na konci disku nebo skenuje souborové systémy. Pro čtení poškozeného GPT v Linuxu: 'gdisk /dev/sdX → v (verify)'. Kritická poznámka: nikdy nespouštějte diskpart clean bez zálohy – smaže všechny oddíly.",
            en: "GPT (GUID Partition Table) is the modern standard for disk partitioning (replacing legacy MBR). GPT stores the partition table at the start of the disk (LBA 1–33) and as a backup copy at the end (last 33 LBA). Corruption occurs during: (1) Sudden disk disconnection while writing to the GPT area. (2) Erroneous 'dd' or 'diskpart clean' commands. (3) Ransomware overwriting the first sectors. (4) HDD failure in the LBA 1–33 region. Repair with testdisk: run testdisk → select disk → Analyze → view found partitions → Write. testdisk reads the backup GPT from the end of the disk or scans for filesystem signatures. To inspect a damaged GPT in Linux: 'gdisk /dev/sdX → v (verify)'. Critical: never run 'diskpart clean' without a backup – it wipes all partitions.",
            zh: "GPT（GUID 分区表）是现代磁盘分区标准（替代旧 MBR）。GPT 在磁盘开头（LBA 1–33）和结尾（最后 33 个 LBA）存储分区表及其备份。损坏发生于：(1) 写入 GPT 区域时突然断开磁盘；(2) 错误的'dd'或'diskpart clean'命令；(3) 勒索软件覆写前几个扇区；(4) LBA 1–33 区域 HDD 故障。使用 testdisk 修复：读取磁盘末尾的备份 GPT 或扫描文件系统签名。切勿在没有备份的情况下运行'diskpart clean'。"
        }
    },

    // =========================================================
    // === MOTHERBOARD (extended ×6, total → 9) ===
    // =========================================================
    {
        id: "mb-usb-controller", type: "hardware", subcategory: "mb",
        vendors: ["asus", "msi", "gigabyte", "asrock"],
        code: "USB Controller Error / USB Device Not Recognized",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "USB zařízení nejsou rozpoznána nebo nefungují – chyba USB controlleru nebo ovladačů.",
            en: "USB devices are not recognized or non-functional – USB controller or driver error.",
            zh: "USB 设备无法识别或无法正常工作，USB 控制器或驱动程序出错。"
        },
        solution: {
            cs: "Odinstalujte USB Root Hub v Správci zařízení a nechte Windows znovu nainstalovat. Aktualizujte chipset driver.",
            en: "Uninstall USB Root Hubs in Device Manager and let Windows reinstall. Update chipset drivers.",
            zh: "在设备管理器中卸载 USB Root Hub 并让 Windows 重新安装，更新芯片组驱动程序。"
        },
        details: {
            cs: "USB (Universal Serial Bus) je implementován přes dedikované USB controller čipy na základní desce. Moderní desky mají: Intel/AMD nativní USB 3.2 Gen 2 (10 Gbps) + add-in kontrolery (Renesas, ASMedia, VIA Labs). Příčiny selhání: (1) Elektrický přepěťový impuls na USB portu (ESD nebo nadproud ze zařízení) poškodí USB controller nebo polyfuse ochranný prvek. (2) Poškozený USB driver stack (usbhub.sys, usbd.sys) – reinstalace přes 'usbhub.inf'. (3) USB polivý hub sdílí IRQ s jiným zařízením způsobující konflikt (starší systémy). (4) ASMedia nebo Renesas USB controller na desce vyžaduje vlastní firmware update. (5) USB Power Delivery konflikt – zařízení vyžaduje více proudu než port poskytuje (max 900mA pro USB 3.x). Diagnostika: Device Manager → Universal Serial Bus → zkontrolujte žluté vykřičníky; USBDeview (NirSoft) zobrazí historii; 'devcon status USB\\*' v cmd.",
            en: "USB is implemented via dedicated USB controller chips on the motherboard. Modern boards have: Intel/AMD native USB 3.2 Gen 2 (10 Gbps) + add-in controllers (Renesas, ASMedia, VIA Labs). Failure causes: (1) Electrical overvoltage impulse on the USB port (ESD or overcurrent from a device) damages the USB controller or polyfuse protection. (2) Corrupted USB driver stack (usbhub.sys, usbd.sys) – reinstall via 'usbhub.inf'. (3) USB hub shares an IRQ with another device causing a conflict (older systems). (4) ASMedia or Renesas USB controller requires a firmware update. (5) USB Power Delivery conflict – device demands more current than the port provides (max 900mA for USB 3.x). Diagnostics: Device Manager → Universal Serial Bus (check for yellow indicators); USBDeview (NirSoft); 'devcon status USB\\*' in CMD.",
            zh: "USB 通过主板上的专用 USB 控制器芯片实现。失败原因：(1) USB 端口上的电气过压冲击（ESD 或设备过流）损坏 USB 控制器或自恢复保险丝；(2) USB 驱动栈损坏（usbhub.sys、usbd.sys）；(3) USB 集线器与其他设备共享 IRQ 导致冲突；(4) ASMedia 或 Renesas USB 控制器需要固件更新；(5) USB 供电冲突。诊断：设备管理器 → 通用串行总线；USBDeview（NirSoft）。"
        }
    },
    {
        id: "mb-power-24pin", type: "hardware", subcategory: "mb",
        vendors: ["asus", "msi", "gigabyte", "asrock"],
        code: "ATX 24-Pin Power Failure / No Power",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "PC se vůbec nespustí nebo okamžitě vypne – problém s 24-pin ATX napájením.",
            en: "PC fails to start or immediately shuts off – issue with 24-pin ATX power supply.",
            zh: "PC 完全无法启动或立即关机，24-pin ATX 供电存在问题。"
        },
        solution: {
            cs: "Testujte PSU paperclip testem (zkrat PS_ON a GND). Zkuste jiný PSU. Zkontrolujte mobo PCB.",
            en: "Test PSU with the paperclip test (short PS_ON to GND). Try a different PSU. Inspect motherboard PCB.",
            zh: "用曲别针测试法测试 PSU（短接 PS_ON 和 GND），尝试其他 PSU，检查主板 PCB。"
        },
        details: {
            cs: "ATX 24-pin konektor přivádí na základní desku napájení +3.3V, +5V, +12V, -12V a PS_ON (pin 16). PSU se zapne, když PS_ON přejde na LOW (< 0.8 V). Paperclip test: zasuňte drtek mezi pin 16 (PS_ON, zelený drát) a pin 17 (COM, černý drát) – PSU by se mělo okamžitě spustit. Příčiny selhání napájení: (1) Přepěťová ochrana PSU (OVP, OCP, SCP) odpojí napájení při detekci zkratu nebo přetížení – testujte s minimálním hardware. (2) Poškozený elektrický filtr nebo kondenzátor na napájecím obvodu základní desky. (3) Koroze nebo oxidace 24-pin konektoru způsobující vysoký kontaktní odpor. (4) Vadný ATX power switch – zkratujte PWR_SW header screwdriverem pro test. (5) Automatické shutdowny způsobené BSOD nebo teplotní ochranou. Diagnostika: digitální PSU tester (10 USD) nebo multimetr na každé napájecí lince (+12V musí být 11.4–12.6 V).",
            en: "The ATX 24-pin connector supplies +3.3V, +5V, +12V, -12V, and the PS_ON signal (pin 16) to the motherboard. The PSU turns on when PS_ON goes LOW (< 0.8V). Paperclip test: insert a wire between pin 16 (PS_ON, green wire) and pin 17 (COM, black wire) – the PSU should start immediately. Power failure causes: (1) PSU protection circuit (OVP, OCP, SCP) trips due to short circuit or overload – test with minimal hardware. (2) Damaged filter capacitors on the motherboard's power circuit. (3) Corrosion or oxidation on the 24-pin connector causing high contact resistance. (4) Faulty ATX power switch – short the PWR_SW header with a screwdriver to test. (5) Automatic shutdowns from BSOD or thermal protection. Diagnostics: a digital PSU tester or multimeter on each rail (+12V must be 11.4–12.6V).",
            zh: "ATX 24-pin 接口为主板提供 +3.3V、+5V、+12V、-12V 和 PS_ON 信号（引脚 16）。曲别针测试法：将导线插入引脚 16（PS_ON，绿线）和引脚 17（GND，黑线之间）——PSU 应立即启动。电源故障原因：(1) PSU 保护电路（OVP、OCP、SCP）响应短路或过载；(2) 主板电源电路上的滤波电容损坏；(3) 24-pin 接口腐蚀导致高接触电阻；(4) ATX 电源开关故障；(5) BSOD 或温度保护导致自动关机。"
        }
    },
    {
        id: "mb-pcie-config", type: "hardware", subcategory: "mb",
        vendors: ["asus", "msi", "gigabyte", "asrock"],
        code: "PCIe Slot Configuration Error / M.2 Conflict",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "Zařízení v PCIe slotu nebo M.2 slotu není detekováno kvůli sdílení PCIe linek.",
            en: "Device in PCIe or M.2 slot is not detected due to PCIe lane sharing between slots.",
            zh: "PCIe 或 M.2 插槽中的设备因插槽间 PCIe 通道共享而未被检测到。"
        },
        solution: {
            cs: "Prostudujte diagram sdílení slotů v manuálu desky. Deaktivujte nevyužívané M.2 sloty v BIOSu.",
            en: "Study the slot sharing diagram in the motherboard manual. Disable unused M.2 slots in BIOS.",
            zh: "研究主板手册中的插槽共享图，在 BIOS 中禁用未使用的 M.2 插槽。"
        },
        details: {
            cs: "Moderní základní desky mají omezený počet PCIe linek z CPU a chipsets. Intel Z790: CPU má 20 PCIe 5.0 linek + Z790 chipset má 28 PCIe 4.0/3.0 linek, ale většina je sdílena. Sdílení linek způsobuje: (1) Zapnutí M.2 slotu 3 deaktivuje PCIe x4 slot 2 nebo USB Controller. (2) Zapnutí PCIe x4 bifurcation pro NVMe RAID deaktivuje 2× M.2 sloty. (3) BIOS nastavení 'Shared Bandwidth' upozornění. Jak určit konflikt: manuál desky obsahuje tabulku 'PCIe Bandwidth Table / Slot Configuration' – podrobně popisuje, které sloty jsou vzájemně exkluzivní. AMD X670E: CPU má 28 PCIe 5.0 linek; X670E chipset přidá PCIe 4.0/3.0. BIOS nastavení: hledejte 'M.2 Mode', 'PCIe Config', 'Bifurcation' sekce.",
            en: "Modern motherboards have a limited number of PCIe lanes from the CPU and chipset. Intel Z790: CPU provides 20 PCIe 5.0 lanes + Z790 chipset adds 28 PCIe 4.0/3.0 lanes, but most are shared. Lane sharing causes: (1) Enabling M.2 slot 3 disables PCIe x4 slot 2 or a USB controller. (2) Enabling PCIe x4 bifurcation for NVMe RAID disables 2× M.2 slots. (3) BIOS 'Shared Bandwidth' warnings. To identify conflicts: the motherboard manual's 'PCIe Bandwidth Table / Slot Configuration' table details which slots are mutually exclusive. AMD X670E: CPU has 28 PCIe 5.0 lanes; X670E chipset adds PCIe 4.0/3.0. In BIOS look for 'M.2 Mode', 'PCIe Config', 'Bifurcation' settings.",
            zh: "现代主板 CPU 和芯片组的 PCIe 通道数量有限。通道共享导致：(1) 启用 M.2 插槽 3 禁用 PCIe x4 插槽 2 或 USB 控制器；(2) 为 NVMe RAID 启用 PCIe x4 分叉禁用 2 个 M.2 插槽；(3) BIOS'共享带宽'警告。如何识别冲突：主板手册的'PCIe 带宽表'详细说明哪些插槽互斥。BIOS 中查找'M.2 模式'、'PCIe 配置'、'分叉'设置。"
        }
    },
    {
        id: "mb-onboard-audio", type: "hardware", subcategory: "mb",
        vendors: ["asus", "msi", "gigabyte", "asrock"],
        code: "Onboard Audio Chip Not Detected",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "Zvukový čip základní desky (Realtek ALC1220 atd.) není rozpoznán systémem.",
            en: "Motherboard onboard audio chip (Realtek ALC1220, etc.) is not recognized by the system.",
            zh: "主板板载音频芯片（Realtek ALC1220 等）未被系统识别。"
        },
        solution: {
            cs: "Povolte onboard audio v BIOSu. Přeinstalujte Realtek audio ovladač. Resetujte CMOS.",
            en: "Enable onboard audio in BIOS Setup. Reinstall Realtek audio driver. Reset CMOS.",
            zh: "在 BIOS 设置中启用板载音频，重新安装 Realtek 音频驱动程序，重置 CMOS。"
        },
        details: {
            cs: "Onboard audio je realizován HD Audio Codec čipem (obvykle Realtek ALC897, ALC1220, ALC4080) připojeným přes HDA (High Definition Audio) sběrnici k PCH/Southbridge. BIOS obsahuje nastavení 'HD Audio Controller' nebo 'Onboard Audio' – pokud je vypnuto, čip není enumerován přes PCI, Windows ho neuvidí. Příčiny absence detekce: (1) BIOS nastavení deaktivuje audio čip (typicky po instalaci diskrétní zvukové karty). (2) Realtek audio čip byl elektricky poškozen přepětím na audio jakách. (3) HDA sběrnicový driver (HDAudBus.sys) je poškozený. (4) HD Audio Codec driver (RTKVHD64.sys) verzí nesouhlasí s OS (Windows 11 vs. starší Realtek driver). (5) Na noteboocích: audio čip je fyzicky desolderován (servisní výměna mateřské desky). Diagnostika: Device Manager → Sound, video and game controllers; aida64 → Audio; BIOS PCI listing zda audio je přítomno.",
            en: "Onboard audio is implemented via an HD Audio Codec chip (typically Realtek ALC897, ALC1220, ALC4080) connected via the HDA (High Definition Audio) bus to the PCH/Southbridge. The BIOS has an 'HD Audio Controller' or 'Onboard Audio' setting – if disabled, the chip is not enumerated over PCI. Causes: (1) BIOS setting disables the audio chip (common after installing a discrete sound card). (2) The Realtek audio chip was electrically damaged by overvoltage on audio jacks. (3) HDA bus driver (HDAudBus.sys) is corrupted. (4) HD Audio Codec driver (RTKVHD64.sys) version doesn't match the OS (Windows 11 vs older Realtek driver). (5) On laptops: the audio chip is physically desoldered during a motherboard service replacement. Diagnostics: Device Manager → Sound, video and game controllers; AIDA64 → Audio; check if audio appears in BIOS PCI listing.",
            zh: "板载音频通过 HD 音频编解码器芯片（通常是 Realtek ALC897、ALC1220、ALC4080）经 HDA 总线连接到 PCH/Southbridge 实现。BIOS 有'HD 音频控制器'或'板载音频'设置——若禁用，芯片不会通过 PCI 枚举。原因：(1) BIOS 设置禁用音频芯片（安装独立声卡后常见）；(2) Realtek 音频芯片因音频插孔过压而损坏；(3) HDA 总线驱动（HDAudBus.sys）损坏；(4) HD 音频编解码器驱动版本与 OS 不匹配；(5) 笔记本中音频芯片被脱焊更换主板。"
        }
    },
    {
        id: "mb-short-circuit", type: "hardware", subcategory: "mb",
        vendors: ["asus", "msi", "gigabyte", "asrock"],
        code: "Motherboard Short Circuit / Standoff Issue",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "PC vůbec nedrží napájení nebo okamžitě vypíná – zkrat způsobený špatnou montáží.",
            en: "PC holds no power or shuts off instantly – short circuit from improper mounting standoffs.",
            zh: "PC 完全无法保持供电或立即关机，安装垫柱不当导致短路。"
        },
        solution: {
            cs: "Zkontrolujte správné umístění standoffů (šroubků/sloupků). Vyjměte desku a testujte mimo skříň.",
            en: "Verify correct standoff placement (only under actual screw holes). Test board outside the case.",
            zh: "验证垫柱位置（仅在实际螺丝孔下方），在机箱外测试主板。"
        },
        details: {
            cs: "Standoff (sloupek) je kovový distanční šroub oddělující základní desku od kovového šasi skříně. Při nesprávném umístění standoffu pod místem BCB kde není montážní otvor nastane zkrat mezi PCB tracemi a šasí. Symptomy zkratu: okamžitý shutdown při zapnutí PSU, PSU přejde do ochranného módu. Test mimo skříň (bench test): umístěte základní desku na krabici od kartonáže, připojte minimální hardware – pokud funguje mimo skříň, problém je v instalaci. Ostatní příčiny zkratu: (1) Kovová rázová trocky (zástrčky I/O krytu) způsobují zkrat na USB/audio pinech při nesprávné instalaci I/O shroud. (2) Uvolněný šroub uvnitř skříně způsobuje pohybující se zkrat. (3) Přehnané dotažení montážních šroubů deformuje PCB. (4) Kovové pozůstatky z frézování skříně zkratují PCB. Diagnostika: testujte PSU paperclip testem mimo systém; vizuálně zkontrolujte všechny standoffy.",
            en: "A standoff (mounting spacer) is a metal post that separates the motherboard from the metal chassis. If a standoff is placed under a spot on the PCB with no mounting hole, it causes a short circuit between PCB traces and the chassis. Short circuit symptoms: immediate shutdown on PSU power-on; PSU enters protection mode. Bench test (outside case): place the motherboard on cardboard, connect minimal hardware – if it works outside the case, the issue is with installation. Other short causes: (1) Metal tabs on the I/O shield shorting USB/audio pins if misinstalled. (2) A loose screw moving inside the case. (3) Over-tightened mounting screws deforming the PCB. (4) Metal filings from case machining shorting the PCB. Diagnostics: test PSU with paperclip test outside the system; visually verify all standoffs.",
            zh: "垫柱（安装间隔柱）是将主板与金属机箱分隔的金属柱。若垫柱放置在 PCB 上没有安装孔的位置，会导致 PCB 走线与机箱之间短路。短路症状：PSU 上电后立即关机，PSU 进入保护模式。机箱外裸奔测试：将主板放在纸板上连接最少硬件——若在机箱外正常工作，则是安装问题。其他短路原因：(1) I/O 挡板金属片安装不当导致短路；(2) 松动螺丝在机箱内部移动；(3) 过度拧紧安装螺丝使 PCB 变形；(4) 机箱加工金属屑短路 PCB。"
        }
    },
    {
        id: "mb-bios-battery-drain", type: "hardware", subcategory: "mb",
        code: "CMOS / RTC Battery Dead (System Time Reset)",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "Systémový čas se resetuje na rok 2000 po každém vypnutí – baterie CR2032 je vybitá.",
            en: "System time resets to year 2000 after every power-off – CR2032 battery is depleted.",
            zh: "每次断电后系统时间重置为 2000 年，CR2032 电池已耗尽。"
        },
        solution: {
            cs: "Vyměňte CR2032 baterii na základní desce (2–5 let životnost). Ověřte napětí baterie multimetrem.",
            en: "Replace the CR2032 battery on the motherboard (2–5 year lifespan). Verify battery voltage with a multimeter.",
            zh: "更换主板上的 CR2032 电池（寿命 2–5 年），用万用表验证电池电压。"
        },
        details: {
            cs: "CR2032 lithiová baterie (3 V, 220 mAh) napájí CMOS RAM (64–512 bytů) a RTC (Real Time Clock) čip při vypnutém PC. Životnost závisí na okolní teplotě a množství uložených dat. Napětí pod 2.8 V způsobuje nestabilní CMOS – BIOS se resetuje na výchozí hodnoty. Vedlejší efekty vyčpělé baterie: (1) Reset systémového času – způsobuje problémy s certifikáty SSL (certifikáty s budoucím datem jsou neplatné), Windows Update (kerberos autentizace citlivá na čas), a časovými razítky souborů. (2) Reset BIOS nastavení – ztráta XMP profilu, Boot Order, Fan Curves. (3) Na starších systémech: ztráta HDD parametrů (CHS – Cylinder/Head/Sector). Výměna: při výměně CR2032 za běhu (PC zapnutý) – CMOS data jsou zachována z napájení ATX. Pokud vyměňujete při vypnutém PC, BIOS se resetuje – připravte si BIOS nastavení předem.",
            en: "The CR2032 lithium battery (3V, 220mAh) powers the CMOS RAM (64–512 bytes) and RTC (Real Time Clock) chip when the PC is off. Lifespan depends on ambient temperature and the amount of stored data. Voltage below 2.8V causes unstable CMOS – the BIOS resets to defaults. Side effects of a dead battery: (1) System time reset – causes SSL certificate issues (certs with future dates are invalid), Windows Update failures (Kerberos authentication is time-sensitive), and incorrect file timestamps. (2) BIOS settings reset – losing XMP profile, Boot Order, Fan Curves. (3) On older systems: loss of HDD CHS (Cylinder/Head/Sector) parameters. Replacement note: replacing CR2032 while the PC is on (via ATX standby power) preserves CMOS data. Replacing while powered off resets the BIOS – note your settings beforehand.",
            zh: "CR2032 锂电池（3V，220mAh）在 PC 关机时为 CMOS RAM（64–512 字节）和 RTC（实时时钟）芯片供电。电压低于 2.8V 导致 CMOS 不稳定——BIOS 重置为默认值。空电池的副作用：(1) 系统时间重置——导致 SSL 证书问题、Windows Update 失败（Kerberos 认证对时间敏感）和文件时间戳错误；(2) BIOS 设置重置——丢失 XMP 配置文件、启动顺序、风扇曲线；(3) 旧系统上丢失 HDD CHS 参数。"
        }
    },

    // =========================================================
    // === WINDOWS (extended ×4, total → 9) ===
    // =========================================================
    {
        id: "win-activation", type: "software", subcategory: "windows",
        code: "Windows Activation Error 0xC004F074 / 0x803F7001",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Windows hlásí chybu aktivace – licenční klíč je neplatný nebo KMS server nedostupný.",
            en: "Windows reports activation failure – license key is invalid or KMS server is unreachable.",
            zh: "Windows 报告激活失败，许可证密钥无效或 KMS 服务器不可达。"
        },
        solution: {
            cs: "Spusťte 'slmgr /ato' pro online aktivaci nebo 'slmgr /ipk [klíč]' pro nový klíč.",
            en: "Run 'slmgr /ato' for online activation or 'slmgr /ipk [key]' to enter a new product key.",
            zh: "运行'slmgr /ato'进行在线激活，或运行'slmgr /ipk [密钥]'输入新产品密钥。"
        },
        details: {
            cs: "Windows aktivace existuje ve třech modelech: (1) Retail/OEM klíč – aktivace přes Microsoft activation server; klíč je vázán na hardware fingerprint (TPM + CPU + HDD). (2) KMS (Key Management Service) – firemní prostředí, PC se aktivuje přes lokální KMS server každých 180 dní. (3) SLMS/MAK – Multiple Activation Key pro hromadné nasazení. Chyba 0xC004F074 = KMS server nedostupný nebo nereaguje na TCPport 1688. Chyba 0x803F7001 = nelze ověřit licenční klíč. Řešení: 'slmgr /skms [KMS_IP]' nastaví KMS server; 'slmgr /ato' spustí aktivaci; 'slmgr /dli' zobrazí stav licence; 'slmgr /xpr' zobrazí datum expirace. Při výměně základní desky/CPU může být retail licence zneplatněna – přilinkujte Windows k Microsoft účtu před výměnou HW pro přenesení licence.",
            en: "Windows activation exists in three models: (1) Retail/OEM key – activation via Microsoft activation server; key is bound to hardware fingerprint (TPM + CPU + HDD). (2) KMS (Key Management Service) – enterprise environment; PC activates against a local KMS server every 180 days. (3) MAK (Multiple Activation Key) for volume deployment. Error 0xC004F074 = KMS server unreachable or not responding on TCP port 1688. Error 0x803F7001 = cannot verify license key. Commands: 'slmgr /skms [KMS_IP]' sets KMS server; 'slmgr /ato' triggers activation; 'slmgr /dli' shows license status; 'slmgr /xpr' shows expiration. When replacing motherboard/CPU, retail license may be deactivated – link Windows to a Microsoft Account before hardware replacement to enable license transfer.",
            zh: "Windows 激活存在三种模式：(1) 零售/OEM 密钥——通过 Microsoft 激活服务器激活，密钥绑定到硬件指纹（TPM + CPU + HDD）；(2) KMS（密钥管理服务）——企业环境，PC 每 180 天对本地 KMS 服务器激活；(3) MAK 批量部署密钥。错误 0xC004F074 = KMS 服务器在 TCP 端口 1688 上不可达。命令：'slmgr /skms [KMS_IP]'设置服务器；'slmgr /ato'触发激活；'slmgr /dli'显示许可证状态。更换主板/CPU 前将 Windows 关联到 Microsoft 帐户。"
        }
    },
    {
        id: "win-wsl", type: "software", subcategory: "windows",
        code: "WSL2 / Hyper-V Error – Virtualization Not Enabled",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "WSL2, Docker nebo Hyper-V hlásí chybu – virtualizace není povolena v BIOS nebo Windows.",
            en: "WSL2, Docker, or Hyper-V reports error – virtualization not enabled in BIOS or Windows.",
            zh: "WSL2、Docker 或 Hyper-V 报告错误，BIOS 或 Windows 中未启用虚拟化。"
        },
        solution: {
            cs: "Povolte Intel VT-x / AMD-V v BIOSu. Povolte Hyper-V ve Windows Features. Spusťte 'bcdedit /set hypervisorlaunchtype auto'.",
            en: "Enable Intel VT-x / AMD-V in BIOS. Enable Hyper-V in Windows Features. Run 'bcdedit /set hypervisorlaunchtype auto'.",
            zh: "在 BIOS 中启用 Intel VT-x / AMD-V，在 Windows 功能中启用 Hyper-V，运行 'bcdedit /set hypervisorlaunchtype auto'。"
        },
        details: {
            cs: "WSL2 (Windows Subsystem for Linux verze 2) funguje jako lehký VM na Hyper-V platformě a vyžaduje hardwarovou virtualizaci. Prerequisity: (1) Intel VT-x nebo AMD-V (AMD-Vi) musí být povoleno v BIOS → Advanced CPU Configuration → Intel Virtualization Technology. (2) Windows 10/11 Pro nebo Enterprise (WSL2 funguje i na Home, Hyper-V ne). (3) Hyper-V role a Virtual Machine Platform musí být nainstalovány: 'Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform'. Časté problémy: (1) Konflikt s jiným hypervisorem (VirtualBox nebo VMware starší verze nemají nested virtualization). (2) Core Isolation (Memory Integrity) v Windows Security brání spuštění WSL2 při konfliktu ovladačů. (3) AMD SVM (Secure Virtual Machine) deaktivováno v BIOS. (4) Starý CPU bez VMX extensí. Diagnostika: Task Manager → Performance → CPU → Virtualization (Enabled/Disabled); 'systeminfo | findstr Hyper-V'.",
            en: "WSL2 (Windows Subsystem for Linux version 2) runs as a lightweight VM on the Hyper-V platform and requires hardware virtualization. Prerequisites: (1) Intel VT-x or AMD-V (AMD-Vi) must be enabled in BIOS → Advanced CPU Configuration → Intel Virtualization Technology. (2) Windows 10/11 Pro or Enterprise (WSL2 works on Home too; Hyper-V does not). (3) Hyper-V role and Virtual Machine Platform must be installed: 'Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform'. Common problems: (1) Conflict with another hypervisor (older VirtualBox/VMware lack nested virtualization). (2) Core Isolation (Memory Integrity) in Windows Security blocks WSL2 when driver conflicts exist. (3) AMD SVM (Secure Virtual Machine) disabled in BIOS. (4) Old CPU without VMX extensions. Diagnostics: Task Manager → Performance → CPU → Virtualization; 'systeminfo | findstr Hyper-V'.",
            zh: "WSL2 作为 Hyper-V 平台上的轻量级虚拟机运行，需要硬件虚拟化。先决条件：(1) 在 BIOS 中启用 Intel VT-x 或 AMD-V；(2) Windows 10/11 专业版或企业版；(3) 安装 Hyper-V 角色和虚拟机平台。常见问题：(1) 与其他虚拟机管理程序冲突（旧版 VirtualBox/VMware 缺乏嵌套虚拟化）；(2) Windows 安全中心的核心隔离（内存完整性）在驱动程序冲突时阻止 WSL2；(3) BIOS 中禁用 AMD SVM；(4) 旧 CPU 没有 VMX 扩展。"
        }
    },
    {
        id: "win-dism", type: "software", subcategory: "windows",
        code: "DISM Component Store Corruption / SFC Fails",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "SFC /scannow hlásí 'Windows Resource Protection nemůže opravit soubory' – Component Store je poškozený.",
            en: "SFC /scannow reports 'Windows Resource Protection could not perform the requested operation' – Component Store is corrupt.",
            zh: "SFC /scannow 报告'Windows 资源保护无法执行请求的操作'，组件存储已损坏。"
        },
        solution: {
            cs: "Spusťte 'DISM /Online /Cleanup-Image /RestoreHealth'. Pokud selže, opravte přes Windows ISO mount.",
            en: "Run 'DISM /Online /Cleanup-Image /RestoreHealth'. If it fails, repair using a mounted Windows ISO.",
            zh: "运行'DISM /Online /Cleanup-Image /RestoreHealth'，若失败则通过挂载 Windows ISO 修复。"
        },
        details: {
            cs: "Windows Component Store (CBS – Component-Based Servicing) je databáze uložena v C:\\Windows\\WinSxS obsahující všechny verze systémových souborů. SFC (System File Checker) ověřuje integritu systémových souborů a jejich checksumů. DISM (Deployment Image Servicing and Management) opravuje Component Store stažením čistých kopií ze serveru Windows Update. Hierarchie oprav: (1) sfc /scannow – opraví poškozené soubory z Component Store. (2) DISM /Cleanup-Image /RestoreHealth – opraví Component Store ze WU. (3) Pokud internet nefunguje: DISM /Source:wim – opraví ze souboru WIM (install.wim z Windows ISO). Příkaz: 'DISM /Online /Cleanup-Image /RestoreHealth /Source:wim:D:\\sources\\install.wim:1 /LimitAccess'. (4) Poslední možnost: In-Place upgrade (Repair Install) – přeinstaluje Windows bez ztráty dat. Logy: C:\\Windows\\Logs\\CBS\\CBS.log a C:\\Windows\\Logs\\DISM\\dism.log.",
            en: "The Windows Component Store (CBS – Component-Based Servicing) is a database stored in C:\\Windows\\WinSxS containing all versions of system files. SFC (System File Checker) verifies system file integrity and checksums. DISM (Deployment Image Servicing and Management) repairs the Component Store by downloading clean copies from Windows Update servers. Repair hierarchy: (1) sfc /scannow – repairs corrupt files from the Component Store. (2) DISM /Cleanup-Image /RestoreHealth – repairs the Component Store from WU. (3) If internet is unavailable: DISM /Source:wim – repairs from a WIM file. Command: 'DISM /Online /Cleanup-Image /RestoreHealth /Source:wim:D:\\sources\\install.wim:1 /LimitAccess'. (4) Last resort: In-Place Upgrade (Repair Install) – reinstalls Windows without data loss. Logs: C:\\Windows\\Logs\\CBS\\CBS.log and DISM\\dism.log.",
            zh: "Windows 组件存储（CBS）是存储在 C:\\Windows\\WinSxS 中的数据库，包含所有版本的系统文件。SFC 验证系统文件完整性。DISM 通过从 Windows Update 服务器下载干净副本来修复组件存储。修复层次：(1) sfc /scannow——从组件存储修复损坏文件；(2) DISM /RestoreHealth——从 WU 修复组件存储；(3) 无网络时：DISM /Source:wim 从 WIM 文件修复；(4) 最后手段：就地升级（修复安装）。日志：CBS.log 和 dism.log。"
        }
    },
    {
        id: "win-driver-signature", type: "software", subcategory: "windows",
        code: "Driver Signature Enforcement Block (DSE)",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Windows odmítá nainstalovat ovladač – 'Odboček digitální podpis vydavatele je neznámý'.",
            en: "Windows refuses to install driver – 'The publisher's digital signature cannot be verified'.",
            zh: "Windows 拒绝安装驱动程序——'无法验证发布者的数字签名'。"
        },
        solution: {
            cs: "Povolte testovací režim: 'bcdedit /set testsigning on'. Nebo použijte WHQL podepsaný ovladač.",
            en: "Enable test mode: 'bcdedit /set testsigning on'. Or obtain a WHQL-signed driver.",
            zh: "启用测试模式：'bcdedit /set testsigning on'，或获取 WHQL 签名的驱动程序。"
        },
        details: {
            cs: "DSE (Driver Signature Enforcement) je bezpečnostní mechanismus Windows 64-bit vyžadující, aby všechny kernel-mode ovladače (ring 0) byly digitálně podepsány Authenticode certifikátem. Typy podpisů: (1) WHQL (Windows Hardware Quality Labs) – Microsoft certifikovaný; nejbezpečnější, ovladač prošel HLK testy. (2) EV (Extended Validation) Code Signing – komerční CA certifikát; od Windows 10 1607 povinný pro nové ovladače. (3) Test Signature – pouze pro vývojáře; vyžaduje test mode ('bcdedit /set testsigning on'). Obejití DSE (pouze pro testování): boot do Advanced Options → Disable Driver Signature Enforcement (platí pouze pro jedno spuštění). Trvalé obejití: test mode ('watermark' v rohu plochy). Proč je DSE důležité: zabraňuje load rootkitů a bootkitů. Ký případy blokace: ovladač od výrobce starého hardware (pre-2015) bez EV certifikátu; custom/hacked driver; Chinaware hardware.",
            en: "DSE (Driver Signature Enforcement) is a Windows 64-bit security mechanism requiring all kernel-mode drivers (ring 0) to be digitally signed with an Authenticode certificate. Signature types: (1) WHQL (Windows Hardware Quality Labs) – Microsoft certified; most trusted, driver passed HLK testing. (2) EV (Extended Validation) Code Signing – commercial CA certificate; mandatory for new drivers since Windows 10 1607. (3) Test Signature – for developers only; requires test mode ('bcdedit /set testsigning on'). Bypassing DSE (testing only): boot to Advanced Options → Disable Driver Signature Enforcement (one-time only). Permanent bypass: test mode (shows watermark on desktop). Why DSE matters: prevents loading of rootkits and bootkits. Common blocking cases: old hardware vendor driver (pre-2015) without EV cert; custom/patched driver; no-name hardware.",
            zh: "DSE（驱动程序签名强制）是 Windows 64 位安全机制，要求所有内核模式驱动程序（Ring 0）必须使用 Authenticode 证书进行数字签名。签名类型：(1) WHQL（Windows 硬件质量实验室）——Microsoft 认证，最受信任；(2) EV（扩展验证）代码签名——商业 CA 证书，Windows 10 1607 起对新驱动程序强制要求；(3) 测试签名——仅限开发人员，需要测试模式。绕过 DSE（仅测试）：高级选项 → 禁用驱动程序签名强制（仅一次）。原因 DSE 重要：防止加载 rootkit 和 bootkit。"
        }
    },

    // =========================================================
    // === BIOS (extended ×5, total → 9) ===
    // =========================================================
    {
        id: "bios-tpm", type: "software", subcategory: "bios",
        code: "TPM 2.0 Error / BitLocker TPM Issue",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS / UEFI" },
        description: {
            cs: "BitLocker nebo Windows Hello selže – TPM 2.0 není detekován nebo je deaktivován.",
            en: "BitLocker or Windows Hello fails – TPM 2.0 is not detected or has been disabled.",
            zh: "BitLocker 或 Windows Hello 失败，TPM 2.0 未检测到或已禁用。"
        },
        solution: {
            cs: "Povolte TPM v BIOSu (AMD fTPM nebo Intel PTT). Spusťte 'tpm.msc' pro ověření stavu.",
            en: "Enable TPM in BIOS (AMD fTPM or Intel PTT). Run 'tpm.msc' to verify TPM status.",
            zh: "在 BIOS 中启用 TPM（AMD fTPM 或 Intel PTT），运行'tpm.msc'验证 TPM 状态。"
        },
        details: {
            cs: "TPM (Trusted Platform Module) 2.0 je kryptografický koprocesor uchovávající šifrovací klíče, certifikáty a platform measurements. Existuje ve dvou formách: (1) Discrete TPM (dTPM) – fyzický čip (Infineon, STMicroelectronics) na základní desce, připojen přes SPI nebo I2C sběrnici. (2) Firmware TPM (fTPM) – implementováno v CPU firmware (AMD fTPM od Ryzen 1000, Intel PTT – Platform Trust Technology). Problémy: (1) AMD fTPM stuttering bug (Ryzen 5000/7000) – fTPM způsoboval přerušované stuttering v hrách; BIOS update nebo přepnutí na dTPM. (2) BitLocker uložil Recovery Key do TPM – po výměně základní desky nebo resetu TPM je zašifrovaný disk nedostupný bez Recovery Key. (3) TPM clear v BIOSu smaže všechny klíče. (4) Windows 11 upgrade blokován: PC Health Check app zjistí TPM 2.0 = Not available. Management: 'tpm.msc' → Manufacturer Version, Specification Version; 'Get-Tpm' v PowerShell.",
            en: "TPM (Trusted Platform Module) 2.0 is a cryptographic coprocessor that stores encryption keys, certificates, and platform measurements. It exists in two forms: (1) Discrete TPM (dTPM) – physical chip (Infineon, STMicroelectronics) on the motherboard, connected via SPI or I2C. (2) Firmware TPM (fTPM) – implemented in CPU firmware (AMD fTPM from Ryzen 1000, Intel PTT). Issues: (1) AMD fTPM stuttering bug (Ryzen 5000/7000) – caused intermittent gaming stutter; resolved with BIOS update or switching to dTPM. (2) BitLocker stored Recovery Key in TPM – after replacing the motherboard or clearing TPM, the encrypted drive is inaccessible without the Recovery Key. (3) 'Clear TPM' in BIOS deletes all keys. (4) Windows 11 upgrade blocked: PC Health Check shows TPM 2.0 = Not available. Management: 'tpm.msc'; 'Get-Tpm' in PowerShell.",
            zh: "TPM（可信平台模块）2.0 是存储加密密钥、证书和平台度量的加密协处理器。两种形式：(1) 离散 TPM（dTPM）——主板上的物理芯片，通过 SPI 或 I2C 连接；(2) 固件 TPM（fTPM）——在 CPU 固件中实现（AMD fTPM、Intel PTT）。问题：(1) AMD fTPM 卡顿错误（Ryzen 5000/7000）——导致游戏间歇性卡顿，BIOS 更新或切换到 dTPM；(2) BitLocker 在 TPM 中存储了恢复密钥——更换主板或清除 TPM 后加密磁盘无法访问；(3) BIOS 中'清除 TPM'删除所有密钥；(4) Windows 11 升级被阻止。"
        }
    },
    {
        id: "bios-nvram-full", type: "software", subcategory: "bios",
        code: "UEFI NVRAM Full / Boot Option Lost",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS / UEFI" },
        description: {
            cs: "BIOS přestane ukládat nové nastavení nebo ztrácí boot záznamy – NVRAM je plná.",
            en: "BIOS stops saving new settings or loses boot entries – UEFI NVRAM storage is full.",
            zh: "BIOS 停止保存新设置或丢失启动条目，UEFI NVRAM 存储已满。"
        },
        solution: {
            cs: "Spusťte 'bcdedit /export backup.bcd'. Proveďte BIOS NVRAM cleanup přes BIOS utility nebo flashnutí BIOSu.",
            en: "Run 'bcdedit /export backup.bcd'. Perform BIOS NVRAM cleanup via BIOS utility or BIOS reflash.",
            zh: "运行'bcdedit /export backup.bcd'，通过 BIOS 工具或重新刷新 BIOS 进行 NVRAM 清理。"
        },
        details: {
            cs: "UEFI NVRAM (Non-Volatile RAM) je vyhrazený prostor v SPI EEPROM (Flash) pro uložení UEFI proměnných: boot záznamy, Secure Boot klíče, BIOS nastavení, síťové profily. Kapacita NVRAM je typicky 64–256 KB. Při přeplnění: (1) UEFI odmítá přidat nové boot záznamy – Linux distribuce instalace selže při přidávání GRUB bootloaderu. (2) Windows Update selže při přidávání nového boot záznamu. (3) BIOS nastavení nelmze uložit. Příčiny plnosti: (1) Roky dual-boot instalací a deinstalací (každá přidá NVRAM záznam). (2) Secure Boot revokační databáze (dbx) roste s každou aktualizací. (3) Network boot profily (iPXE, WDS). Řešení: 'efi-readvar' nebo 'efibootmgr -v' (Linux) zobrazí všechny záznamy; smazání starých: 'efibootmgr -b XXXX -B'; Windows: mountpath EFI partition a ručně odstraňte přebytečné záznamy; nebo BIOS reset/flash.",
            en: "UEFI NVRAM (Non-Volatile RAM) is dedicated space in SPI EEPROM (Flash) for storing UEFI variables: boot entries, Secure Boot keys, BIOS settings, network profiles. NVRAM capacity is typically 64–256KB. When full: (1) UEFI refuses to add new boot entries – Linux distro installation fails when adding the GRUB bootloader. (2) Windows Update fails when adding a new boot entry. (3) BIOS settings cannot be saved. Causes of fullness: (1) Years of dual-boot installs and uninstalls (each adds an NVRAM entry). (2) Secure Boot revocation database (dbx) grows with each update. (3) Network boot profiles (iPXE, WDS). Solution: 'efibootmgr -v' (Linux) lists all entries; delete old ones with 'efibootmgr -b XXXX -B'; on Windows, mount the EFI partition and manually remove excess entries; or reset/reflash BIOS.",
            zh: "UEFI NVRAM 是 SPI EEPROM 中用于存储 UEFI 变量的专用空间：启动条目、安全启动密钥、BIOS 设置、网络配置文件。NVRAM 容量通常为 64–256KB。满时：(1) UEFI 拒绝添加新启动条目；(2) Windows Update 添加新启动条目时失败；(3) BIOS 设置无法保存。满的原因：(1) 多年双系统安装和卸载；(2) 安全启动吊销数据库（dbx）随每次更新增长；(3) 网络启动配置文件。解决方案：'efibootmgr -v'列出所有条目，删除旧的；或重置/重刷 BIOS。"
        }
    },
    {
        id: "bios-agesa", type: "software", subcategory: "bios",
        code: "AMD AGESA Update Issues / Ryzen Compatibility",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS / UEFI" },
        description: {
            cs: "Po aktualizaci BIOS/AGESA se změní chování CPU – jiné boost, RAM training nebo nové chyby.",
            en: "After BIOS/AGESA update, CPU behavior changes – different boost clocks, RAM training failures, or new bugs.",
            zh: "更新 BIOS/AGESA 后 CPU 行为改变——不同的加速频率、内存训练失败或新错误。"
        },
        solution: {
            cs: "Downgrade BIOSu na předchozí stabilní verzi. Zkontrolujte AMD AGESA release notes.",
            en: "Downgrade BIOS to the previous stable version. Check AMD AGESA release notes for known issues.",
            zh: "将 BIOS 降级到之前的稳定版本，检查 AMD AGESA 发布说明中的已知问题。"
        },
        details: {
            cs: "AGESA (AMD Generic Encapsulated Software Architecture) je firmware framework od AMD poskytovaný výrobcům základních desek. AGESA obsahuje: CPU initialization kód, memory training algoritmy, power management, ACPI tabulky a bezpečnostní patche (Spectre/Meltdown). Výrobce desky obalí AGESA do vlastního BIOS firmware. Problémy s AGESA aktualizacemi: (1) Nová AGESA verze mění memory training algoritmus – dřívě fungující XMP profily přestanou fungovat. (2) AGESA ComboAM4PI 1.0.0.7b (Ryzen 3000) způsobovala problémy s BCLK a RAM stabilitou. (3) Nový AGESA změní výchozí power limity PPT/TDC/EDC (přísněji nebo volněji). (4) Nová bezpečnostní patche snižují výkon (Spectre V2, Retbleed, INCEPTION). Strategie: vždy čtěte BIOS release notes výrobce a komunitní diskuze (Reddit r/Amd) před aktualizací. Downgrade je možný u většiny desek pokud si uložíte starý ROM soubor.",
            en: "AGESA (AMD Generic Encapsulated Software Architecture) is AMD's firmware framework supplied to motherboard manufacturers. AGESA contains: CPU initialization code, memory training algorithms, power management, ACPI tables, and security patches (Spectre/Meltdown). Manufacturers wrap AGESA in their own BIOS firmware. AGESA update issues: (1) A new AGESA changes the memory training algorithm – previously working XMP profiles stop working. (2) AGESA ComboAM4PI 1.0.0.7b (Ryzen 3000) caused BCLK and RAM stability problems. (3) New AGESA changes default power limits PPT/TDC/EDC. (4) New security patches reduce performance (Spectre V2, Retbleed, INCEPTION). Strategy: always read board manufacturer BIOS release notes and community forums (Reddit r/AMD) before updating. Downgrading is possible on most boards if you save the old ROM file.",
            zh: "AGESA（AMD 通用封装软件架构）是 AMD 提供给主板制造商的固件框架，包含 CPU 初始化代码、内存训练算法、电源管理、ACPI 表和安全补丁。AGESA 更新问题：(1) 新 AGESA 改变内存训练算法——之前工作的 XMP 配置文件停止工作；(2) AGESA ComboAM4PI 1.0.0.7b（Ryzen 3000）导致 BCLK 和 RAM 稳定性问题；(3) 新 AGESA 更改默认功耗限制；(4) 新安全补丁降低性能。策略：更新前始终阅读主板制造商 BIOS 发布说明和社区论坛。"
        }
    },
    {
        id: "bios-resizable-bar", type: "software", subcategory: "bios",
        code: "Resizable BAR / SAM Not Working",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS / UEFI" },
        description: {
            cs: "Resizable BAR (Smart Access Memory) nefunguje – CPU nemůže adresovat celou VRAM GPU.",
            en: "Resizable BAR (Smart Access Memory) is not working – CPU cannot address the full GPU VRAM.",
            zh: "Resizable BAR（智能访问内存）不工作，CPU 无法寻址完整的 GPU 显存。"
        },
        solution: {
            cs: "Povolte Above 4G Decoding a Resizable BAR v BIOSu. Disk musí být GPT/UEFI boot.",
            en: "Enable Above 4G Decoding and Resizable BAR in BIOS. Boot disk must use GPT/UEFI mode.",
            zh: "在 BIOS 中启用'4G 以上解码'和 Resizable BAR，启动磁盘必须使用 GPT/UEFI 模式。"
        },
        details: {
            cs: "Resizable BAR (Base Address Register) je PCIe specifikace umožňující CPU adresovat celou VRAM GPU najednou místo po 256 MB kusech (legacy BAR limit). AMD označuje tuto funkci jako SAM (Smart Access Memory). Výkon: typicky 2–10% zlepšení FPS v moderních hrách. Prerequisity: (1) BIOS musí mít 'Above 4G Decoding' povoleno (jinak PCIe BAR nemůže překročit 4 GB adresní prostor). (2) 'Resizable BAR Support' nebo 'SAM' musí být povoleno v BIOS → Advanced → PCIe Configuration. (3) Systém musí bootovat v UEFI módu (ne Legacy/CSM) – zkontrolujte msinfo32 → BIOS Mode = UEFI. (4) GPU ovladač musí Resizable BAR podporovat (NVIDIA od driver 461.09; AMD od 20.11.1). Ověření: GPU-Z → Advanced → Resizable BAR = Yes; NVIDIA vysílá ReBAR = Yes; AMD Radeon Software → System Info. Upozornění: u některých kombinací CPU+GPU může ReBAR snižovat výkon – testujte 3DMark s/bez.",
            en: "Resizable BAR (Base Address Register) is a PCIe specification allowing the CPU to address the entire GPU VRAM at once instead of in 256MB chunks (legacy BAR limit). AMD brands this as SAM (Smart Access Memory). Performance: typically 2–10% FPS improvement in modern games. Prerequisites: (1) BIOS must have 'Above 4G Decoding' enabled (otherwise PCIe BAR cannot exceed the 4GB address space). (2) 'Resizable BAR Support' or 'SAM' must be enabled in BIOS → Advanced → PCIe Configuration. (3) System must boot in UEFI mode (not Legacy/CSM) – check msinfo32 → BIOS Mode = UEFI. (4) GPU driver must support Resizable BAR (NVIDIA from driver 461.09; AMD from 20.11.1). Verification: GPU-Z → Advanced → Resizable BAR = Yes. Note: for some CPU+GPU combinations ReBAR can reduce performance – test with 3DMark both ways.",
            zh: "Resizable BAR 是允许 CPU 一次寻址完整 GPU 显存而非 256MB 块（传统 BAR 限制）的 PCIe 规范，AMD 称之为 SAM。性能：现代游戏中通常提升 2–10% FPS。先决条件：(1) BIOS 必须启用'4G 以上解码'；(2) BIOS 中必须启用'Resizable BAR 支持'或'SAM'；(3) 系统必须以 UEFI 模式启动（非 Legacy/CSM）；(4) GPU 驱动必须支持 Resizable BAR。验证：GPU-Z → 高级 → Resizable BAR = 是。"
        }
    },
    {
        id: "bios-xmp-safe-mode", type: "software", subcategory: "bios",
        code: "BIOS Safe Mode Reset After Failed POST",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS / UEFI" },
        description: {
            cs: "BIOS automaticky resetuje nastavení po neúspěšném startu – typicky po přetaktování.",
            en: "BIOS automatically resets settings after unsuccessful boot – typically after overclocking.",
            zh: "BIOS 在启动失败后自动重置设置，通常发生在超频之后。"
        },
        solution: {
            cs: "Postupně zvyšujte OC hodnoty. Uložte stabilní profil do BIOS Profile. Ověřte v Event Viewer.",
            en: "Increase OC values incrementally. Save a stable BIOS Profile. Verify in Windows Event Viewer.",
            zh: "逐步增加超频值，将稳定配置保存到 BIOS Profile，在 Windows 事件查看器中验证。"
        },
        details: {
            cs: "BIOS Safe Mode Reset (také 'FailSafe' nebo 'Recovery Boot') je mechanismus, kdy BIOS detekuje neúspěšný POST (typicky 2–3 za sebou) a automaticky resetuje nastavení na výchozí hodnoty. Trigger: POST nedosáhne boot zařízení do stanoveného limitu (typicky 60 sekund). Příčiny: (1) Příliš agresivní XMP/EXPO RAM profil způsobí nestabilitu memory trainingu. (2) CPU OC nad maximální stabilní frekvenci – systém bootne ale crashuje při POST diagnostice. (3) Nestabilní Vcore způsobí OCP/OVP ochrannou reakci PSU. (4) GPU OC způsobuje BSOD při POST. Prevence: ukládejte stabilní profil do BIOS Profile (ASUS mají F6 pro profil save) – pokud BIOS resetuje kvůli nestabilitě, lze rychle obnovit. Po každé BIOS safe mode reset: zkontrolujte Windows System Event Log pro záznamy 'The previous system shutdown was unexpected'. Fine-tuning: zvyšujte OC po malých krocích (100 MHz na frekvenci, 0.025 V na napětí).",
            en: "BIOS Safe Mode Reset (also called 'FailSafe' or 'Recovery Boot') is a mechanism where the BIOS detects failed POSTs (typically 2–3 consecutive) and automatically resets settings to defaults. Trigger: POST fails to reach a boot device within a set time limit (typically 60 seconds). Causes: (1) Overly aggressive XMP/EXPO RAM profile causes memory training instability. (2) CPU OC beyond maximum stable frequency – system boots but crashes during POST diagnostics. (3) Unstable Vcore triggers PSU OCP/OVP protection. (4) GPU OC causes BSOD during POST. Prevention: save a stable BIOS Profile (ASUS boards use F6 for profile save) – if BIOS resets due to instability, quickly restore the known-good profile. After each safe-mode reset: check Windows System Event Log for 'The previous system shutdown was unexpected' entries. Fine-tuning: increase OC in small increments (100MHz per frequency step, 0.025V per voltage step).",
            zh: "BIOS 安全模式重置是 BIOS 检测到 POST 失败（通常连续 2–3 次）并自动将设置重置为默认值的机制。触发条件：POST 在设定时间内未能到达启动设备。原因：(1) 过于激进的 XMP/EXPO 内存配置文件导致内存训练不稳定；(2) CPU 超频超过最大稳定频率；(3) 不稳定的 Vcore 触发 PSU OCP/OVP 保护；(4) GPU 超频导致 POST 期间蓝屏。预防：将稳定配置保存到 BIOS Profile；每次安全模式重置后检查事件日志。"
        }
    },

    // =========================================================
    // === NETWORK (extended ×5, total → 9) ===
    // =========================================================
    {
        id: "net-packet-loss", type: "software", subcategory: "network",
        code: "High Packet Loss / Latency Spikes (Ping)",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: {
            cs: "Připojení je nestabilní – online hry, video hovory nebo streaming jsou přerušovány.",
            en: "Connection is unstable – online games, video calls, or streaming are frequently interrupted.",
            zh: "连接不稳定，在线游戏、视频通话或流媒体频繁中断。"
        },
        solution: {
            cs: "Testujte 'ping 8.8.8.8 -t' pro baseline. Zkuste Ethernet místo Wi-Fi. Kontaktujte ISP.",
            en: "Test 'ping 8.8.8.8 -t' for a baseline. Try Ethernet instead of Wi-Fi. Contact ISP if persistent.",
            zh: "运行'ping 8.8.8.8 -t'建立基准，尝试有线连接代替 Wi-Fi，若持续则联系 ISP。"
        },
        details: {
            cs: "Packet loss je ztráta dat při přenosu přes síť – každý ztracený paket musí být retransmitován (TCP) nebo ignorován (UDP, hry). Lokalizace příčiny pomocí traceroute: 'tracert 8.8.8.8' nebo 'pathping 8.8.8.8' zobrazí latenci na každém hopu. Příčiny: (1) ISP line issues – ADSL/VDSL attenuation, fiber splitter poškozený, satelitní latence. (2) Přetížený Wi-Fi kanál – použijte Wi-Fi Analyzer (Android/Windows) pro skenování kanálů; přepněte router na 5 GHz/6 GHz. (3) NIC driver buffer overflow – síťová karta nestíhá zpracovávat pakety; zvyšte Receive Buffer ve vlastnostech NIC. (4) QoS shape na routeru – jiné zařízení saturuje uplink. (5) ISP throttling specifického traffiku. Nástroje: WinMTR (kombinace traceroute+ping); iperf3 pro bandwidth test; Wireshark pro analýzu ztraceného trafficu.",
            en: "Packet loss is the loss of data packets during network transmission – each lost packet must be retransmitted (TCP) or discarded (UDP, games). Localizing the cause with traceroute: 'tracert 8.8.8.8' or 'pathping 8.8.8.8' shows latency at each hop. Causes: (1) ISP line issues – ADSL/VDSL attenuation, damaged fiber splitter, satellite latency. (2) Congested Wi-Fi channel – use Wi-Fi Analyzer to scan; switch router to 5GHz/6GHz. (3) NIC driver buffer overflow – NIC cannot process incoming packets fast enough; increase Receive Buffer in NIC properties. (4) Router QoS throttling – another device saturates the uplink. (5) ISP throttling specific traffic types. Tools: WinMTR (traceroute+ping combined); iperf3 for bandwidth testing; Wireshark for traffic analysis.",
            zh: "数据包丢失是网络传输过程中数据包丢失的情况——每个丢失的数据包必须重传（TCP）或丢弃（UDP，游戏）。使用 traceroute 定位原因：'tracert 8.8.8.8'或'pathping 8.8.8.8'显示每跳延迟。原因：(1) ISP 线路问题——ADSL/VDSL 衰减、光纤分路器损坏、卫星延迟；(2) Wi-Fi 信道拥塞；(3) 网卡驱动缓冲区溢出；(4) 路由器 QoS 限速；(5) ISP 对特定流量限速。工具：WinMTR、iperf3、Wireshark。"
        }
    },
    {
        id: "net-firewall-block", type: "software", subcategory: "network",
        code: "Windows Firewall Blocking Application / Port",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: {
            cs: "Aplikace nebo hra nemůže navázat síťové spojení – Windows Firewall blokuje port nebo program.",
            en: "Application or game cannot establish network connection – Windows Firewall is blocking a port or program.",
            zh: "应用程序或游戏无法建立网络连接，Windows 防火墙正在阻止端口或程序。"
        },
        solution: {
            cs: "Přidejte výjimku v Windows Defender Firewall. Nebo spusťte 'netsh advfirewall firewall add rule'.",
            en: "Add an exception in Windows Defender Firewall. Or run 'netsh advfirewall firewall add rule name=...'.",
            zh: "在 Windows Defender 防火墙中添加例外，或运行'netsh advfirewall firewall add rule name=...'。"
        },
        details: {
            cs: "Windows Defender Firewall (WDF) je stavový paketový filtr integrovaný v Windows, fungující na úrovni WFP (Windows Filtering Platform) v kernelu. Pracuje s Inbound a Outbound pravidly pro programy, porty a protokoly. Diagnostika blokování: (1) Event Viewer → Windows Logs → Security → Event ID 5157 (Firewall blocked connection) – zobrazí blokovaný port a PID procesu. (2) 'netsh advfirewall firewall show rule name=all' zobrazí všechna pravidla. (3) Dočasně vypněte firewall pro test: 'netsh advfirewall set allprofiles state off' (NEBEZPEČNÉ, jen pro test!). Přidání výjimky: 'netsh advfirewall firewall add rule name=\"MyApp\" dir=in action=allow program=\"C:\\path\\to\\app.exe\" protocol=TCP localport=8080'. Profily firewallu: Domain (firemní doména), Private (domácí síť), Public (veřejná Wi-Fi) – aplikace může mít různá pravidla pro každý profil. Konflikty: třetí stranný antivirus (Kaspersky, ESET) nahrazuje WDF vlastním firewallem.",
            en: "Windows Defender Firewall (WDF) is a stateful packet filter integrated in Windows, running at the WFP (Windows Filtering Platform) kernel level. It works with Inbound and Outbound rules for programs, ports, and protocols. Diagnosing blocks: (1) Event Viewer → Windows Logs → Security → Event ID 5157 (Firewall blocked connection) – shows blocked port and process PID. (2) 'netsh advfirewall firewall show rule name=all' lists all rules. (3) Temporarily disable for testing: 'netsh advfirewall set allprofiles state off' (DANGEROUS, testing only!). Adding an exception: 'netsh advfirewall firewall add rule name=\"MyApp\" dir=in action=allow program=\"C:\\path\\to\\app.exe\" protocol=TCP localport=8080'. Firewall profiles: Domain (corporate), Private (home), Public – apps can have different rules per profile. Conflicts: third-party antivirus (Kaspersky, ESET) replaces WDF with its own firewall.",
            zh: "Windows Defender 防火墙（WDF）是集成在 Windows 中的有状态数据包过滤器，在 WFP（Windows 过滤平台）内核级别运行。诊断阻止：(1) 事件查看器 → Windows 日志 → 安全 → 事件 ID 5157（防火墙阻止连接）；(2) 'netsh advfirewall firewall show rule name=all'列出所有规则；(3) 临时禁用测试（危险！）。添加例外：使用 netsh 命令或 GUI。防火墙配置文件：域（企业）、专用（家庭）、公共——应用程序每个配置文件可有不同规则。"
        }
    },
    {
        id: "net-nat-upnp", type: "software", subcategory: "network",
        code: "NAT / UPnP Failure – Strict NAT in Games",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: {
            cs: "Online hra hlásí 'Strict NAT' nebo nelze hostit lobby – port forwarding není nakonfigurován.",
            en: "Online game reports 'Strict NAT' or cannot host lobby – port forwarding is not configured.",
            zh: "在线游戏报告'严格 NAT'或无法主持大厅，端口转发未配置。"
        },
        solution: {
            cs: "Povolte UPnP na routeru nebo ručně nastavte Port Forwarding pro požadované porty aplikace.",
            en: "Enable UPnP on the router or manually configure Port Forwarding for the required application ports.",
            zh: "在路由器上启用 UPnP 或手动为应用程序所需端口配置端口转发。"
        },
        details: {
            cs: "NAT (Network Address Translation) je mechanismus routeru překladající privátní IP adresy (192.168.x.x) na veřejnou IP ISP. NAT typy (pro P2P komunikaci): (1) Open NAT – přímý přístup, žádné omezení. (2) Moderate NAT – Port Address Translation (PAT), funguje s většinou her. (3) Strict NAT – router blokuje příchozí spojení; hry nemohou hostit lobby nebo mají omezenou matchmaking. UPnP (Universal Plug and Play) umožňuje aplikacím automaticky požádat router o dočasný port forwarding. Problémy: (1) UPnP je na routeru vypnuto ze bezpečnostních důvodů. (2) UPnP žádost selhává kvůli konfliktu dalšími zařízeními. (3) CGNAT (Carrier-Grade NAT) u ISP – ISP sdílí jednu veřejnou IP pro mnoho zákazníků; Port Forwarding nefunguje bez domluvení s ISP. Řešení: Ruční Port Forwarding v routeru admin panelu (obvykle 192.168.1.1); nebo VPN s vlastní IP (WireGuard, Tailscale); nebo žádost ISP o statickou IP.",
            en: "NAT (Network Address Translation) is a router mechanism that translates private IP addresses (192.168.x.x) to the public ISP IP. NAT types (for P2P): (1) Open NAT – direct access, no restrictions. (2) Moderate NAT – Port Address Translation (PAT), works with most games. (3) Strict NAT – router blocks incoming connections; games cannot host lobbies or have limited matchmaking. UPnP (Universal Plug and Play) allows applications to automatically request temporary port forwarding from the router. Issues: (1) UPnP disabled on router for security reasons. (2) UPnP request fails due to conflicts with other devices. (3) CGNAT (Carrier-Grade NAT) from ISP – ISP shares one public IP for many customers; Port Forwarding doesn't work without ISP coordination. Solutions: manual Port Forwarding in the router admin panel (usually 192.168.1.1); or VPN with a dedicated IP (WireGuard, Tailscale); or request a static IP from ISP.",
            zh: "NAT（网络地址转换）是路由器将私有 IP 地址（192.168.x.x）转换为公共 ISP IP 的机制。NAT 类型（P2P）：(1) 开放 NAT——直接访问；(2) 中等 NAT——端口地址转换，适用于大多数游戏；(3) 严格 NAT——路由器阻止入站连接，游戏无法托管大厅。UPnP 允许应用程序自动向路由器请求临时端口转发。问题：(1) UPnP 出于安全原因在路由器上禁用；(2) ISP CGNAT——ISP 为许多客户共享一个公共 IP，端口转发无效。解决方案：手动端口转发；或 WireGuard/Tailscale VPN；或向 ISP 申请静态 IP。"
        }
    },
    {
        id: "net-ethernet-duplex", type: "software", subcategory: "network",
        code: "Ethernet Link Speed / Duplex Mismatch",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: {
            cs: "Ethernet spojení je pomalé nebo nestabilní – NIC nebo switch negociuje špatnou rychlost/duplex.",
            en: "Ethernet connection is slow or unstable – NIC or switch negotiates wrong link speed or duplex.",
            zh: "以太网连接缓慢或不稳定，网卡或交换机协商了错误的链路速度或双工模式。"
        },
        solution: {
            cs: "Nastavte manuálně rychlost a duplex v Driver Properties NIC na 1 Gbps Full Duplex.",
            en: "Manually set speed and duplex in NIC Driver Properties to 1 Gbps Full Duplex.",
            zh: "在网卡驱动属性中手动将速度和双工设置为 1 Gbps 全双工。"
        },
        details: {
            cs: "Ethernet auto-négociation (IEEE 802.3-2018) je standardizovaný protokol pro automatické dojednání rychlosti (10/100/1000 Mbps/2.5G/10G) a duplex módu (Half/Full) mezi dvěma zařízeními. Duplex mismatch nastane, když jedno zařízení je v Full Duplex a druhé v Half Duplex – výsledkem jsou kolize, CRC chyby a drasticky snížená propustnost (typicky pod 10% kapacity linky). Příčiny: (1) Starý switch bez auto-négociation posílá pouze specifickou rychlost. (2) NIC driver bug způsobuje nesprávnou négociation. (3) Poškozený kabel Cat5e/Cat6 – přerušené páry CT pin 7/8 způsobují fallback na 100 Mbps. (4) Crossover kabel místo přímého (patch) kabelu bez Auto-MDIX. Diagnostika: 'Get-NetAdapterStatistics -Name Ethernet' – sledujte ReceivedPacketErrors, ReceivedFrameErrors; sledujte Link Speed v NIC Properties. Ideálně: Auto-Négociation by mělo fungovat; ruční nastavení Fast Ethernet (100 Mbps) na obou stranách je poslední možnost.",
            en: "Ethernet auto-negotiation (IEEE 802.3-2018) is a standardized protocol for automatically agreeing on link speed (10/100/1000 Mbps/2.5G/10G) and duplex mode (Half/Full) between two devices. A duplex mismatch occurs when one device is in Full Duplex and another in Half Duplex – causing collisions, CRC errors, and drastically reduced throughput (often below 10% of line capacity). Causes: (1) Old switch without auto-negotiation forces a specific speed. (2) NIC driver bug causes incorrect negotiation. (3) Damaged Cat5e/Cat6 cable – broken wire pairs CT pin 7/8 cause fallback to 100Mbps. (4) Crossover cable instead of a straight patch cable without Auto-MDIX. Diagnostics: 'Get-NetAdapterStatistics -Name Ethernet' – watch ReceivedPacketErrors and ReceivedFrameErrors; check Link Speed in NIC Properties. Best practice: auto-negotiation should work; manual 100Mbps forced on both ends is a last resort.",
            zh: "以太网自动协商（IEEE 802.3-2018）是在两个设备之间自动协商链路速度和双工模式的标准化协议。双工不匹配发生在一个设备处于全双工而另一个处于半双工时——导致碰撞、CRC 错误和吞吐量大幅下降（通常低于线路容量的 10%）。原因：(1) 没有自动协商的旧交换机强制特定速度；(2) 网卡驱动错误导致错误协商；(3) 损坏的 Cat5e/Cat6 线缆；(4) 交叉线缆而非直通线缆且不支持 Auto-MDIX。诊断：'Get-NetAdapterStatistics'。"
        }
    },
    {
        id: "net-vpn-conflict", type: "software", subcategory: "network",
        code: "VPN Connection Drop / Routing Conflict",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: {
            cs: "VPN se odpojuje nebo po připojení není přístup k internetu – konflikty routování nebo DNS.",
            en: "VPN disconnects or blocks internet access after connecting – routing or DNS conflicts.",
            zh: "VPN 断开连接或连接后无法访问互联网，存在路由或 DNS 冲突。"
        },
        solution: {
            cs: "Resetujte routing tabulku: 'route /f'. Přidejte VPN server IP jako výjimku pro split tunneling.",
            en: "Reset routing table: 'route /f'. Add VPN server IP as an exception for split tunneling.",
            zh: "重置路由表：'route /f'，将 VPN 服务器 IP 添加为分离隧道例外。"
        },
        details: {
            cs: "VPN (Virtual Private Network) vytváří šifrovaný tunel mezi klientem a VPN serverem. Moderní VPN protokoly: OpenVPN, WireGuard (nejrychlejší, nejmodernější), IKEv2/IPSec (pro mobilní zařízení), L2TP. Problémy s VPN: (1) Full Tunnel VPN přesměruje veškerý traffic přes VPN server – pokud VPN server je přetížen nebo daleko, latence vzroste. Split Tunnel posílá pouze specifický traffic přes VPN. (2) DNS leak – DNS dotazy jdou mimo VPN tunel; testujte na ipleak.net. (3) WebRTC leak – prohlížeč odhalí skutečnou IP skrze WebRTC; blokujte WebRTC v nastavení prohlížeče. (4) Kill Switch selhání – pokud VPN se odpojí a Kill Switch nefunguje, traffic jde čistým připojením. (5) Konflikty s Windows Winsock LSP nebo síťovými ovladači třetích stran. Nástroj WireGuard: 'wg show' zobrazí stav tunelu, přenesená data, last handshake. Diagnostika: 'route print' zobrazí routing tabulku – VPN by měla mít default route (0.0.0.0/0).",
            en: "VPN (Virtual Private Network) creates an encrypted tunnel between the client and VPN server. Modern VPN protocols: OpenVPN, WireGuard (fastest, most modern), IKEv2/IPSec (mobile), L2TP. VPN issues: (1) Full Tunnel VPN redirects all traffic through the VPN server – if the server is overloaded or distant, latency increases. Split Tunnel sends only specific traffic through VPN. (2) DNS leak – DNS queries travel outside the VPN tunnel; test at ipleak.net. (3) WebRTC leak – browser reveals the real IP through WebRTC; disable WebRTC in browser settings. (4) Kill Switch failure – if VPN disconnects without Kill Switch activating, traffic goes over the clear connection. (5) Conflicts with Windows Winsock LSP or third-party network drivers. WireGuard: 'wg show' displays tunnel status, transferred data, last handshake. Diagnostics: 'route print' shows routing table – VPN should have a default route (0.0.0.0/0).",
            zh: "VPN（虚拟私人网络）在客户端和 VPN 服务器之间创建加密隧道。现代 VPN 协议：OpenVPN、WireGuard（最快最现代）、IKEv2/IPSec、L2TP。VPN 问题：(1) 全隧道 VPN 将所有流量重定向——若服务器过载或距离远，延迟增加；分离隧道仅通过 VPN 发送特定流量；(2) DNS 泄漏——DNS 查询在 VPN 隧道外传输；(3) WebRTC 泄漏；(4) 终止开关失败；(5) 与 Windows Winsock LSP 或第三方网络驱动程序冲突。诊断：'route print'显示路由表。"
        }
    },

    // =========================================================
    // === DRIVERS (extended ×6, total → 9) ===
    // =========================================================
    {
        id: "drv-usb-code43", type: "software", subcategory: "drivers",
        code: "USB Device Unknown (Code 43 Error)",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "USB zařízení se zobrazí jako 'Neznámé zařízení' s Code 43 v Správci zařízení.",
            en: "USB device appears as 'Unknown Device' with Code 43 in Device Manager.",
            zh: "USB 设备在设备管理器中显示为带有错误代码 43 的'未知设备'。"
        },
        solution: {
            cs: "Aktualizujte USB ovladač. Zkuste jiný USB port nebo kabel. Odinstalujte zařízení a znovu připojte.",
            en: "Update USB driver. Try a different USB port or cable. Uninstall device and reconnect.",
            zh: "更新 USB 驱动程序，尝试不同的 USB 端口或线缆，卸载设备并重新连接。"
        },
        details: {
            cs: "Code 43 na USB zařízení (na rozdíl od Code 43 na GPU) znamená, že USB ovladač hlásí Windows, že zařízení selhalo ze neznámého důvodu. Technický mechanismus: USB stack (usbd.sys, usbhub.sys) přijme z zařízení chybový stav a oznámí ho Windows Device Manager. Příčiny: (1) Poškozený USB kabel – zejména USB-C kabely s nesprávně zapojeným CC (Configuration Channel) pinem. (2) Zařízení vyžaduje více proudu než port poskytuje – přidejte powered USB hub. (3) Nesprávný nebo zastaralý driver specifický pro zařízení (výrobcový INF). (4) Windows Generic USB driver (usbstor.sys) konflikt s výrobcovým driverem. (5) Defektní zařízení nebo poškozená USB elektronika. (6) USB selective suspend – Windows uspí port; zakažte v Správci napájení → USB Settings. Diagnostika: USBLogView, USB Device Tree Viewer (VID/PID analýza), 'pnputil /enum-devices /class USB'.",
            en: "Code 43 on a USB device (unlike Code 43 on a GPU) means the USB driver reports to Windows that the device has failed for an unknown reason. Technical mechanism: the USB stack (usbd.sys, usbhub.sys) receives an error status from the device and reports it to Windows Device Manager. Causes: (1) Damaged USB cable – especially USB-C cables with incorrectly wired CC (Configuration Channel) pin. (2) Device requires more current than the port provides – add a powered USB hub. (3) Incorrect or outdated device-specific driver (vendor INF). (4) Windows Generic USB driver (usbstor.sys) conflict with vendor driver. (5) Defective device or damaged USB electronics. (6) USB selective suspend – Windows powers down the port; disable in Power Manager → USB Settings. Diagnostics: USBLogView, USB Device Tree Viewer (VID/PID analysis), 'pnputil /enum-devices /class USB'.",
            zh: "USB 设备上的代码 43（与 GPU 上的代码 43 不同）意味着 USB 驱动程序向 Windows 报告设备因未知原因失败。原因：(1) USB 线缆损坏——尤其是 CC 引脚接线错误的 USB-C 线缆；(2) 设备需要的电流超过端口提供量——添加有电源的 USB 集线器；(3) 设备特定驱动程序不正确或过时；(4) Windows 通用 USB 驱动程序与厂商驱动程序冲突；(5) 设备缺陷或 USB 电子损坏；(6) USB 选择性挂起。诊断：USBLogView、USB Device Tree Viewer。"
        }
    },
    {
        id: "drv-bluetooth", type: "software", subcategory: "drivers",
        code: "Bluetooth Driver Error / BTH.sys / Pairing Failure",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "Bluetooth nefunguje nebo nelze spárovat zařízení – chyba BTH.sys nebo Intel Wireless Bluetooth ovladače.",
            en: "Bluetooth is non-functional or device pairing fails – BTH.sys or Intel Wireless Bluetooth driver error.",
            zh: "蓝牙无法正常工作或设备配对失败，BTH.sys 或 Intel 无线蓝牙驱动程序出错。"
        },
        solution: {
            cs: "Odinstalujte Bluetooth ovladač v Správci zařízení + restartujte. Stáhněte ovladač přímo od Intel/Realtek.",
            en: "Uninstall Bluetooth driver in Device Manager + restart. Download driver directly from Intel/Realtek.",
            zh: "在设备管理器中卸载蓝牙驱动程序并重启，直接从 Intel/Realtek 下载驱动程序。"
        },
        details: {
            cs: "Bluetooth stack ve Windows se skládá z: Windows Bluetooth Stack (bthport.sys, bthmini.sys, BTHENUM.sys) + Hardware driver (Intel Wireless Bluetooth, Realtek). Problémy: (1) Konflikt mezi Windows Update nainstalovaným generic Bluetooth driverem a výrobcovým specifickým. Řešení: Správce zařízení → Bluetooth → Pravý klik → Odinstalovat + smazat driver → Restart. (2) Intel AX200/AX210 Bluetooth firmware bug – způsobuje přerušované odpojení Bluetooth LE zařízení. Intel vydával opravné firmware. (3) Pairing DB poškozena – Windows uchovává Bluetooth pairing klíče v registru HKLM\\SYSTEM\\CurrentControlSet\\Services\\BTHPORT\\Parameters\\Devices. Pokud se klíče neshodují s klíči v zařízení, párování selže. (4) Bluetooth 5.0+ a starší HW nemusí být zpětně kompatibilní. Diagnostika: Event Viewer → System → zdroje 'BTHPORT', 'BTHENUM'; 'Get-PnpDevice -Class Bluetooth' v PowerShell.",
            en: "The Bluetooth stack in Windows consists of: Windows Bluetooth Stack (bthport.sys, bthmini.sys, BTHENUM.sys) + Hardware driver (Intel Wireless Bluetooth, Realtek). Issues: (1) Conflict between a Windows Update-installed generic Bluetooth driver and vendor-specific driver. Fix: Device Manager → Bluetooth → right-click → Uninstall + delete driver → Restart. (2) Intel AX200/AX210 Bluetooth firmware bug – causes intermittent Bluetooth LE device disconnections. Intel released corrective firmware updates. (3) Corrupted pairing database – Windows stores pairing keys in HKLM\\SYSTEM\\CurrentControlSet\\Services\\BTHPORT\\Parameters\\Devices. If keys don't match those in the device, pairing fails. (4) Bluetooth 5.0+ and older hardware may not be backward compatible. Diagnostics: Event Viewer → System → 'BTHPORT', 'BTHENUM' sources; 'Get-PnpDevice -Class Bluetooth' in PowerShell.",
            zh: "Windows 中的蓝牙协议栈由以下组成：Windows 蓝牙栈（bthport.sys 等）+ 硬件驱动程序（Intel 无线蓝牙、Realtek）。问题：(1) Windows Update 安装的通用蓝牙驱动程序与厂商特定驱动程序冲突；(2) Intel AX200/AX210 蓝牙固件错误——导致蓝牙 LE 设备间歇性断开；(3) 配对数据库损坏——Windows 在注册表中存储配对密钥；(4) 蓝牙 5.0+ 与旧硬件可能不向后兼容。诊断：事件查看器 → 系统 → BTHPORT 来源。"
        }
    },
    {
        id: "drv-chipset", type: "software", subcategory: "drivers",
        code: "Chipset Driver Missing / Outdated",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "Základní deska nebo CPU funkce nefungují správně – chybí nebo je zastaralý chipset driver.",
            en: "Motherboard or CPU features malfunction – chipset driver is missing or outdated.",
            zh: "主板或 CPU 功能无法正常工作，芯片组驱动程序丢失或过时。"
        },
        solution: {
            cs: "Stáhněte nejnovější Intel Chipset or AMD Chipset Software z webu výrobce do systému.",
            en: "Download latest Intel Chipset Software or AMD Chipset Driver directly from manufacturer's website.",
            zh: "从制造商官网下载最新的 Intel 芯片组软件或 AMD 芯片组驱动程序。"
        },
        details: {
            cs: "Chipset driver (Intel INF Update Utility nebo AMD Chipset Software) instaluje INF soubory popisující PCH (Platform Controller Hub) komponenty systémem Windows. Bez správného chipset driveru: USB porty mohou být zpomalené, PCIe přenosové rychlosti suboptimální, správce napájení nefunguje správně. Intel Chipset Software instaluje: Intel Management Engine Interface (MEI), Intel Dynamic Platform & Thermal Framework, Intel GPIO, SMBus driver. AMD Chipset Software instaluje: AMD GPIO2, AMD SMBus, AMD Display, AMD PSP driver. Důvody aktualizace: (1) Nové verze opravují BSOD způsobené race condition v SMBus driveru. (2) Opravy Spectre/Meltdown microcode. (3) Power management zlepšení pro AMD Ryzen (Precision Boost funguje lépe s novějším PSP). (4) Nové CPU generace vyžadují nový chipset driver (Intel Core 13. gen vyžaduje ICL chipset INF). Diagnostika: Device Manager → System Devices – hledejte 'Unknown Device' nebo žluté vykřičníky na SMS/SMBus/GPIO zařízeních.",
            en: "Chipset drivers (Intel INF Update Utility or AMD Chipset Software) install INF files describing PCH (Platform Controller Hub) components to Windows. Without a proper chipset driver: USB ports may underperform, PCIe transfer rates are suboptimal, power management may malfunction. Intel Chipset Software installs: Intel Management Engine Interface (MEI), Intel Dynamic Platform & Thermal Framework, Intel GPIO, SMBus driver. AMD Chipset Software installs: AMD GPIO2, AMD SMBus, AMD Display, AMD PSP driver. Reasons to update: (1) New versions fix BSODs from race conditions in the SMBus driver. (2) Spectre/Meltdown microcode patches. (3) Power management improvements for AMD Ryzen (Precision Boost works better with newer PSP). (4) New CPU generations require new chipset drivers. Diagnostics: Device Manager → System Devices – look for 'Unknown Device' or yellow indicators on SMBus/GPIO devices.",
            zh: "芯片组驱动程序（Intel INF 更新工具或 AMD 芯片组软件）安装描述 PCH 组件的 INF 文件。没有正确的芯片组驱动程序：USB 端口可能性能不佳，PCIe 传输速率次优，电源管理可能出现故障。Intel 芯片组软件安装：MEI、动态平台与热框架、GPIO、SMBus 驱动程序。AMD 芯片组软件安装：GPIO2、SMBus、Display、PSP 驱动程序。更新原因：(1) 新版本修复 SMBus 驱动程序中的竞态条件导致的蓝屏；(2) Spectre/Meltdown 微代码补丁；(3) AMD Ryzen 电源管理改进；(4) 新 CPU 世代需要新芯片组驱动程序。"
        }
    },
    {
        id: "drv-kernel-verifier", type: "software", subcategory: "drivers",
        code: "Driver Verifier BSOD / Verifier Enabled on Boot",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "Systém BSOD ihned po startu – Driver Verifier je zapnutý a zachytil problém v ovladači.",
            en: "System BSODs immediately after boot – Driver Verifier is enabled and caught a driver issue.",
            zh: "系统启动后立即蓝屏，驱动程序验证器已启用并捕获到驱动程序问题。"
        },
        solution: {
            cs: "Zakažte Verifier: 'verifier /reset' z Recovery CMD. Nebo spusťte v Safe Mode.",
            en: "Disable Verifier: 'verifier /reset' from Recovery CMD. Or boot into Safe Mode and disable.",
            zh: "禁用验证器：从恢复命令提示符运行'verifier /reset'，或进入安全模式禁用。"
        },
        details: {
            cs: "Driver Verifier je nástroj integrovaný v Windows pro testování kernel-mode ovladačů. Aktivuje extra kontroly: Pool Corruption check (detekce přepisování paměti za hranice bufferu), Deadlock Detection, DMA Verification, I/O Verification, Force IRQL Check (ověří, že DPC neběží na nesprávné IRQL úrovni). Pokud Verifier detekuje problém, okamžitě zastaví systém s BSOD specifickým pro typ chyby. Stop kódy při Verifier: DRIVER_VERIFIER_DETECTED_VIOLATION (0xC4), BAD_POOL_CALLER, SYSTEM_SERVICE_EXCEPTION. Typické použití: vývojáři ovladačů spustí 'verifier /standard /all' pro testování. Uživatelé by NEMĚLI zapínat Verifier pokud neví co dělají. Jak zakázat Verifier když systém nebootuje: (1) WinRE CMD: 'verifier /reset'. (2) Safe Mode (F8 / Shift+Restart → Advanced): 'verifier /reset'. (3) BCDedit boot do safe mode: 'bcdedit /set safeboot minimal'.",
            en: "Driver Verifier is a Windows integrated tool for testing kernel-mode drivers. It activates extra checks: Pool Corruption Detection (buffer overrun), Deadlock Detection, DMA Verification, I/O Verification, Force IRQL Check (verifies DPCs run at correct IRQL). When Verifier detects a problem, it immediately halts the system with a BSOD specific to the error type. Stop codes under Verifier: DRIVER_VERIFIER_DETECTED_VIOLATION (0xC4), BAD_POOL_CALLER, SYSTEM_SERVICE_EXCEPTION. Typical use: driver developers run 'verifier /standard /all' for testing. End-users should NOT enable Verifier without understanding the implications. How to disable when system won't boot: (1) WinRE CMD: 'verifier /reset'. (2) Safe Mode: 'verifier /reset'. (3) BCDedit: 'bcdedit /set safeboot minimal'.",
            zh: "驱动程序验证器是 Windows 内置的用于测试内核模式驱动程序的工具，激活额外检查：池损坏检测（缓冲区溢出）、死锁检测、DMA 验证、I/O 验证、IRQL 强制检查。当验证器检测到问题时，立即以特定于错误类型的蓝屏停止系统。验证器下的停止代码：DRIVER_VERIFIER_DETECTED_VIOLATION（0xC4）等。如何在系统无法启动时禁用：(1) WinRE CMD：'verifier /reset'；(2) 安全模式；(3) BCDedit 安全模式启动。"
        }
    },
    {
        id: "drv-storage-controller", type: "software", subcategory: "drivers",
        code: "Storage Controller Driver Failure / storport.sys",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "Systém nemůže přistoupit k diskům – storport.sys nebo iaStorA.sys havaroval.",
            en: "System cannot access disks – storport.sys or iaStorA.sys has crashed.",
            zh: "系统无法访问磁盘，storport.sys 或 iaStorA.sys 已崩溃。"
        },
        solution: {
            cs: "Přepněte SATA Mode v BIOSu na AHCI (ne RAID). Aktualizujte Intel RST nebo AMD SATA ovladač.",
            en: "Switch SATA Mode in BIOS to AHCI (not RAID). Update Intel RST or AMD SATA driver.",
            zh: "在 BIOS 中将 SATA 模式切换为 AHCI（非 RAID），更新 Intel RST 或 AMD SATA 驱动程序。"
        },
        details: {
            cs: "Storage controller driver stack: aplikace → Windows Storage API → storport.sys (port driver) → miniport driver (specifický pro kontroler: storahci.sys pro AHCI, iaStorA.sys pro Intel RST, stornvme.sys pro NVMe) → fyzický disk. Příčiny selhání storport.sys: (1) Vadný miniport driver – Intel RST (iaStorA.sys) má historii bugů zejména ve verzi 17.x; přepněte na Microsoft AHCI driver (storahci.sys) odinstalací Intel RST. (2) Přechod SATA Mode z AHCI na IDE nebo RAID bez reinstalace Windows – ovladač nesouhlasí s hardware mode. Oprava: opravte BIOS Mode zpět a spusťte Windows v safe mode pro aktualizaci driveru. (3) Fyzický disk problém způsobující timeout request → storport error. (4) BSOD DRIVER_IRQL_NOT_LESS_OR_EQUAL s parametrem storport.sys – přepsání paměti v IRQ handleru. Diagnostika: Event Viewer → System, zdroj 'disk', 'storport'; Device Manager → Disk drives → Controller Type.",
            en: "Storage controller driver stack: application → Windows Storage API → storport.sys (port driver) → miniport driver (controller-specific: storahci.sys for AHCI, iaStorA.sys for Intel RST, stornvme.sys for NVMe) → physical disk. Causes of storport.sys failure: (1) Faulty miniport driver – Intel RST (iaStorA.sys) has a history of bugs especially in version 17.x; switch to Microsoft AHCI driver (storahci.sys) by uninstalling Intel RST. (2) Changing SATA Mode from AHCI to IDE or RAID without reinstalling Windows – driver doesn't match hardware mode. Fix: restore BIOS mode and boot Windows in Safe Mode to update driver. (3) Physical disk problem causing request timeout → storport error. (4) BSOD DRIVER_IRQL_NOT_LESS_OR_EQUAL with storport.sys parameter – memory overwrite in IRQ handler. Diagnostics: Event Viewer → System, 'disk', 'storport' sources.",
            zh: "存储控制器驱动栈：应用程序 → Windows 存储 API → storport.sys（端口驱动）→ 微端口驱动（控制器特定：storahci.sys 用于 AHCI，iaStorA.sys 用于 Intel RST，stornvme.sys 用于 NVMe）→ 物理磁盘。storport.sys 故障原因：(1) 微端口驱动有缺陷——Intel RST（iaStorA.sys）在 17.x 版本有已知错误；(2) 不重新安装 Windows 就将 SATA 模式从 AHCI 更改为 IDE 或 RAID；(3) 物理磁盘问题导致请求超时；(4) 带 storport.sys 参数的 DRIVER_IRQL_NOT_LESS_OR_EQUAL 蓝屏。"
        }
    },
    {
        id: "drv-gpu-driver-crash", type: "software", subcategory: "drivers",
        code: "GPU Driver Crash Loop / Safe Mode Required",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "GPU ovladač crashuje ihned po startu Windows – systém se opakovaně restartuje.",
            en: "GPU driver crashes immediately after Windows starts – system restarts in a loop.",
            zh: "GPU 驱动程序在 Windows 启动后立即崩溃，系统循环重启。"
        },
        solution: {
            cs: "Spusťte Safe Mode, spusťte DDU (Display Driver Uninstaller) a přeinstalujte ovladač.",
            en: "Boot into Safe Mode, run DDU (Display Driver Uninstaller), then reinstall a clean GPU driver.",
            zh: "进入安全模式，运行 DDU（显示驱动程序卸载工具），然后重新安装干净的 GPU 驱动程序。"
        },
        details: {
            cs: "GPU driver crash loop nastane pokud: grafický ovladač (nvlddmkm.sys nebo atikmpag.sys) nabootuje s Windows a okamžitě způsobí BSOD nebo restart. Systém se může automaticky vrátit do Safe Mode. Příčiny: (1) Poškozená instalace GPU ovladače – nekompletní soubory nebo registrační záznamy. (2) Neslučitelnost GPU ovladače s Windows verzí (například NVIDIA Game Ready vs. Studio driver). (3) GPU hardware failure způsobuje driver crash při inicializaci. (4) Remnants starého ovladače (AMD→NVIDIA přechod) způsobují konflikt. DDU (Display Driver Uninstaller): bootujte do Safe Mode bez sítě → spusťte DDU → vyberte GPU výrobce → Clean and Restart. DDU smaže veškeré registry, INF soubory a složky relating to GPU driver. Po DDU: připojte internet, stáhněte nejnovější ovladač přímo od NVIDIA/AMD. NVIDIA: cuda.driver + GeForce Experience nebo standalone. AMD: Adrenalin Software.",
            en: "A GPU driver crash loop occurs when the GPU driver (nvlddmkm.sys or atikmpag.sys) loads with Windows and immediately causes a BSOD or restart. The system may automatically fall into Safe Mode. Causes: (1) Corrupted GPU driver installation – incomplete files or registry entries. (2) GPU driver incompatibility with Windows version (e.g. NVIDIA Game Ready vs. Studio driver). (3) GPU hardware failure causes driver crash during initialization. (4) Remnants of an old driver (AMD→NVIDIA switch) cause conflict. DDU (Display Driver Uninstaller): boot into Safe Mode without networking → run DDU → select GPU vendor → Clean and Restart. DDU removes all registry entries, INF files, and folders related to the GPU driver. After DDU: connect to internet, download the latest driver directly from NVIDIA/AMD.",
            zh: "GPU 驱动程序崩溃循环发生在 GPU 驱动程序（nvlddmkm.sys 或 atikmpag.sys）随 Windows 加载并立即导致蓝屏或重启时。原因：(1) GPU 驱动程序安装损坏——文件或注册表项不完整；(2) GPU 驱动程序与 Windows 版本不兼容；(3) GPU 硬件故障在初始化期间导致驱动程序崩溃；(4) 旧驱动程序残留（AMD→NVIDIA 切换）导致冲突。DDU：进入无网络安全模式 → 运行 DDU → 选择 GPU 厂商 → 清理并重启。重启后直接从 NVIDIA/AMD 下载最新驱动程序。"
        }
    },

    // =========================================================
    // === APPS & GAMES (extended ×4, total → 9) ===
    // =========================================================
    {
        id: "app-memory-leak", type: "software", subcategory: "apps",
        code: "Application Memory Leak / RAM Usage Grows",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Aplikace postupně zabere veškerou dostupnou RAM – systém zpomalí nebo crashuje po hodinách provozu.",
            en: "Application gradually consumes all available RAM – system slows down or crashes after hours of use.",
            zh: "应用程序逐渐消耗所有可用 RAM，系统在运行数小时后变慢或崩溃。"
        },
        solution: {
            cs: "Aktualizujte aplikaci. Restartujte ji pravidelně. Hlašte chybu výrobci s Process Monitor logem.",
            en: "Update the application. Restart it regularly. Report the bug to the developer with a Process Monitor log.",
            zh: "更新应用程序，定期重启它，向开发者报告问题并附上 Process Monitor 日志。"
        },
        details: {
            cs: "Memory leak je programátorská chyba kdy aplikace alokuje paměť ale nikdy ji neuvolní (free/delete/Dispose). Výsledek: Working Set aplikace roste dokud systém nevyčerpá dostupnou RAM a nezačne swapovat na disk (pagefile). Typy memory leaks: (1) Native (C/C++) – chybějící free() nebo delete[] call. (2) Managed (.NET, Java) – object references drží objekty živé i po skončení jejich use (závisí GC). (3) GDI handle leak – Windows GDI objekty (pen, brush, bitmap) nejsou uvolněny. (4) COM object leak – AddRef bez Release. Diagnostika Windows: (1) Task Manager → Commit (ne jen Working Set!). (2) Resource Monitor → Memory → Commit Column. (3) Perfmon → Private Bytes counter. (4) Process Monitor (Sysinternals) zachytí volání VirtualAlloc bez VirtualFree. (5) LeakDiag nebo VMMap (Sysinternals) pro grafické zobrazení alokací. Workaround pro uživatele: naplánujte automatický restart aplikace (Task Scheduler nebo skript).",
            en: "A memory leak is a programming error where an application allocates memory but never releases it (free/delete/Dispose). Result: the application's Working Set grows until the system exhausts available RAM and begins swapping to disk (pagefile). Types of memory leaks: (1) Native (C/C++) – missing free() or delete[] call. (2) Managed (.NET, Java) – object references keep objects alive after use (GC-dependent). (3) GDI handle leak – Windows GDI objects (pens, brushes, bitmaps) not released. (4) COM object leak – AddRef without Release. Windows diagnostics: (1) Task Manager → Commit column (not just Working Set). (2) Resource Monitor → Memory → Commit. (3) Perfmon → Private Bytes counter. (4) Process Monitor (Sysinternals) captures VirtualAlloc without VirtualFree. (5) VMMap (Sysinternals) for graphical allocation view. User workaround: schedule automatic application restarts via Task Scheduler.",
            zh: "内存泄漏是应用程序分配内存但从不释放（free/delete/Dispose）的编程错误。结果：应用程序的工作集不断增长，直到系统耗尽可用 RAM 并开始换页到磁盘。内存泄漏类型：(1) 原生（C/C++）——缺少 free() 或 delete[] 调用；(2) 托管（.NET、Java）——对象引用使对象在使用后保持存活；(3) GDI 句柄泄漏；(4) COM 对象泄漏。Windows 诊断：任务管理器提交列；资源监控器内存；Process Monitor 捕获 VirtualAlloc；VMMap 图形化分配视图。"
        }
    },
    {
        id: "app-oom-crash", type: "software", subcategory: "apps",
        code: "Out of Memory (OOM) / Application Crash",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Aplikace nebo hra crashuje s chybou 'Out of Memory' – systém nemá dostatek RAM nebo VRAM.",
            en: "App or game crashes with 'Out of Memory' error – system lacks sufficient RAM or GPU VRAM.",
            zh: "应用程序或游戏以'内存不足'错误崩溃，系统缺少足够的 RAM 或 GPU 显存。"
        },
        solution: {
            cs: "Zvyšte velikost výchozího stránkovacího souboru, snižte grafická nastavení (textury → VRAM), přidejte RAM.",
            en: "Increase pagefile size, reduce graphics settings (textures use VRAM), or add more RAM.",
            zh: "增加分页文件大小，降低图形设置（纹理使用显存），或增加 RAM。"
        },
        details: {
            cs: "OOM (Out of Memory) crash nastane buď při vyčerpání RAM (fyzické + pagefile) nebo VRAM GPU. RAM OOM: (1) 32-bit aplikace může adresovat max 4 GB virtuálního prostoru (LAA flag na 3 GB). (2) Systém přiděluje 'Commit limit' = RAM + pagefile. Pokud aplikace vyžaduje více než commit limit, Windows vrátí ERROR_NOT_ENOUGH_MEMORY a aplikace crashuje. (3) Pagefile příliš malý nebo deaktivován. Doporučení pagefile: min 1×RAM, max 3×RAM. VRAM OOM: (1) Textury, shadow maps, framebuffery přesáhnou VRAM kapacitu GPU. (2) GPU ovladač musí přesunout textury z VRAM do RAM (DRAM jako záloha) → FPS drasticky klesne + potenciální crash. (3) GPU-Z → Dedicated Memory Used → sledujte přiblížení k limitu. Hry s nastavitelným texturovým LOD: snižte Texture Quality / Texture Resolution. Windows OOM diagnostika: Event Viewer → System → Event ID 2004 (Resource-Exhaustion-Detector). 'Rammap.exe' (Sysinternals) zobrazí přesné využití RAM.",
            en: "An OOM (Out of Memory) crash occurs when either RAM (physical + pagefile) or GPU VRAM is exhausted. RAM OOM: (1) 32-bit applications can address a max of 4GB virtual space (LAA flag for 3GB). (2) The system allocates a 'Commit Limit' = RAM + pagefile. If an app requires more than the commit limit, Windows returns ERROR_NOT_ENOUGH_MEMORY and the app crashes. (3) Pagefile too small or disabled. Recommendation: min 1×RAM, max 3×RAM. VRAM OOM: (1) Textures, shadow maps, framebuffers exceed GPU VRAM capacity. (2) The GPU driver spills textures from VRAM into RAM → FPS drops drastically and potential crash. (3) GPU-Z → Dedicated Memory Used – monitor proximity to the limit. For games: reduce Texture Quality. Windows OOM diagnostics: Event Viewer → System → Event ID 2004 (Resource-Exhaustion-Detector). Use 'Rammap.exe' (Sysinternals) for detailed RAM usage.",
            zh: "OOM（内存不足）崩溃发生在 RAM（物理 + 分页文件）或 GPU 显存耗尽时。RAM OOM：(1) 32 位应用程序最多寻址 4GB 虚拟空间；(2) 系统分配'提交限制' = RAM + 分页文件；(3) 分页文件过小或禁用。建议：最小 1×RAM，最大 3×RAM。显存 OOM：(1) 纹理、阴影图、帧缓冲区超过 GPU 显存容量；(2) GPU 驱动程序必须将纹理从显存溢出到 RAM → FPS 大幅下降。Windows OOM 诊断：事件查看器 → 系统 → 事件 ID 2004；'Rammap.exe'。"
        }
    },
    {
        id: "app-shader-cache", type: "software", subcategory: "apps",
        code: "Shader Cache Corruption / Game Stuttering",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Hra náhle stutteruje nebo crashuje – shader cache je poškozená nebo příliš velká.",
            en: "Game suddenly stutters or crashes – shader cache is corrupted or has grown too large.",
            zh: "游戏突然出现卡顿或崩溃，着色器缓存已损坏或增长过大。"
        },
        solution: {
            cs: "Vymažte shader cache: NVIDIA Control Panel → 3D Settings → Delete Shader Cache. Nebo smažte složku C:\\Users\\[user]\\AppData\\Local\\NVIDIA.",
            en: "Clear shader cache: NVIDIA Control Panel → 3D Settings → Delete Shader Cache, or delete C:\\Users\\[user]\\AppData\\Local\\NVIDIA folder.",
            zh: "清除着色器缓存：NVIDIA 控制面板 → 3D 设置 → 删除着色器缓存，或删除 AppData/Local/NVIDIA 文件夹。"
        },
        details: {
            cs: "Shader cache je lokálně uložená kompilovaná verze shaderů (GLSL → SPIR-V → nativní GPU instrukce). Cílem je vyhnout se stutter při prvním spuštění hry (shader compilation stutter). Problémy: (1) Shader cache se zkompilovala s jedním GPU ovladačem, ale po aktualizaci ovladače je nevalidní. Výsledkem je koridacea při načítání → crash. (2) Cache překročila disk space limit – Windows SSD s málo místa. (3) DX12/Vulkan PSO (Pipeline State Object) cache je nekompatibilní s novou verzí hry. (4) DX11 runtime cache poškozena výpadkem napájení. Cesty k shader cache: NVIDIA: C:\\Users\\[user]\\AppData\\Local\\NVIDIA\\DXCache; AMD: C:\\Users\\[user]\\AppData\\Local\\AMD\\DxCache. Vulkan: hra-specifická cesta. DirectX Shader Cache: Disk Cleanup → DirectX Shader Cache (cca 1–10 GB). Prevence: nechte po každé GPU driver aktualizaci hru jednou projít shader compilation.",
            en: "Shader cache is a locally stored compiled version of shaders (GLSL → SPIR-V → native GPU instructions). Its purpose is to avoid stutter on first launch (shader compilation stutter). Issues: (1) Shader cache compiled with one GPU driver becomes invalid after a driver update – loading the invalid cache causes corruption → crash. (2) Cache exceeds disk space limits. (3) DX12/Vulkan PSO (Pipeline State Object) cache is incompatible with a new game version. (4) DX11 runtime cache corrupted by power loss. Shader cache paths: NVIDIA: C:\\Users\\[user]\\AppData\\Local\\NVIDIA\\DXCache; AMD: C:\\Users\\[user]\\AppData\\Local\\AMD\\DxCache. Vulkan: game-specific path. DirectX Shader Cache: Disk Cleanup → DirectX Shader Cache (1–10GB typically). Prevention: allow the game to rebuild shader cache after each GPU driver update.",
            zh: "着色器缓存是本地存储的着色器编译版本（GLSL → SPIR-V → 本机 GPU 指令），目的是避免首次启动时的卡顿（着色器编译卡顿）。问题：(1) 用一个 GPU 驱动程序编译的着色器缓存在驱动程序更新后失效——加载无效缓存导致损坏→崩溃；(2) 缓存超过磁盘空间限制；(3) DX12/Vulkan PSO 缓存与新游戏版本不兼容；(4) DX11 运行时缓存因断电损坏。缓存路径：NVIDIA AppData/Local/NVIDIA/DXCache；AMD AppData/Local/AMD/DxCache。"
        }
    },
    {
        id: "app-antivirus-conflict", type: "software", subcategory: "apps",
        code: "Antivirus False Positive / Software Conflict",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Antivirus smaže nebo zablokuje legitimní soubor aplikace – program se nespustí nebo chybí DLL.",
            en: "Antivirus deletes or blocks a legitimate application file – program won't start or DLL is missing.",
            zh: "杀毒软件删除或阻止合法应用程序文件，程序无法启动或缺少 DLL。"
        },
        solution: {
            cs: "Zkontrolujte Quarantine v antiviru. Přidejte hru/aplikaci do výjimek (Exclusions). Přeinstalujte hru.",
            en: "Check antivirus Quarantine. Add game/app folder to exclusions (Whitelist). Reinstall the application.",
            zh: "检查杀毒软件隔离区，将游戏/应用程序文件夹添加到排除项（白名单），重新安装应用程序。"
        },
        details: {
            cs: "False Positive je chybná klasifikace legitimního souboru jako malware antivirovým softwarem. Příčiny false positives v hrách/aplikacích: (1) Ochranné mechanismy (executable packers, custom loaders, anti-tamper technologie jako Denuvo) vypadají heuristicky jako malware. (2) Nové nebo málo rozšířené aplikace nemají dostatečnou reputaci v antivirové databázi. (3) Aktualizace antiviru přidala nový podpis, který chybně matchuje legitimní kód. (4) Heuristic nebo behaviorální detekce zachytí legitimní akci (například systémový volání potřebný pro game engine). Oprava: zkontrolujte antivirus Quarantine (karanténu) – soubor tam může být umístěný; obnovte ho a přidejte do výjimek. Exclusions/Whitelist: Windows Defender: Settings → Virus Protection → Manage Settings → Add Exclusion; u třetí strany: výrobce-specifické nastavení. Pokud soubor byl odstraněn: přeinstalujte hru přes Steam Verify nebo plnou reinstalaci. Hlaste false positive výrobci antiviru – má vliv na celou komunitu uživatelů.",
            en: "A false positive is an antivirus software's incorrect classification of a legitimate file as malware. Causes in games/apps: (1) Protection mechanisms (executable packers, custom loaders, anti-tamper tech like Denuvo) appear heuristically similar to malware. (2) New or niche applications lack sufficient reputation in the antivirus database. (3) An antivirus update added a new signature that incorrectly matches legitimate code. (4) Heuristic or behavioral detection catches a legitimate action (e.g., a syscall needed by the game engine). Fix: check antivirus Quarantine – the file may be there; restore and add to exclusions. Windows Defender exclusions: Settings → Virus Protection → Manage Settings → Add Exclusion. If the file is gone: verify game files via Steam or do a full reinstall. Report false positives to the AV vendor – it affects the entire user community.",
            zh: "误报是杀毒软件将合法文件错误分类为恶意软件。游戏/应用程序中误报的原因：(1) 保护机制（可执行文件打包器、自定义加载器、Denuvo 等防篡改技术）在启发式上看起来像恶意软件；(2) 新的或小众应用程序在杀毒数据库中声誉不足；(3) 杀毒更新添加了错误匹配合法代码的新签名；(4) 启发式或行为检测捕获了合法操作。修复：检查隔离区；恢复文件并添加到排除项。Windows Defender 排除项：设置 → 病毒防护 → 管理设置 → 添加排除项。向杀毒厂商报告误报。"
        }
    },

    // =========================================================
    // === PSU ===
    // =========================================================
    {
        id: "psu-coil-whine", type: "hardware", subcategory: "mb",
        code: "PSU Coil Whine / Electrical Noise",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "Napájecí zdroj vydává vysokofrekvenční pískání nebo bzučení – coil whine z VRM nebo PSU.",
            en: "Power supply emits high-frequency whining or buzzing – coil whine from VRM inductors or PSU.",
            zh: "电源发出高频啸叫或嗡嗡声——来自 VRM 电感或 PSU 的线圈啸叫。"
        },
        solution: {
            cs: "Omezte FPS na hodnotu 2× obnovovací frekvence monitoru. Zkuste jiný PSU nebo přidejte zásuvkový filtr.",
            en: "Cap FPS to 2× monitor refresh rate. Try a different PSU or add a power line conditioner.",
            zh: "将帧率限制为显示器刷新率的 2 倍，尝试更换 PSU 或添加电源线路调节器。"
        },
        details: {
            cs: "Coil whine je elektromagnetická rezonance feromagnetického jádra cívky v LLC resonant converter nebo Buck konvertoru VRM. Frekvence závisí na pracovním cyklu a může být v slyšitelném rozsahu 1–20 kHz. Zdroje: (1) PSU LLC resonance: při nízkém zatížení pracuje LLC converter v jiném operačním módu, způsobující rezonanci. (2) GPU VRM coil whine: při vysokém FPS (600+) GPU spotřebovává proudové špičky ve velmi krátkých intervalech, způsobující coil whine. Řešení: (a) Cap FPS v ovladači na hodnotu 2× VSYNC – sníží frekvenci spínání VRM. (b) Aktivujte VSYNC nebo Adaptive Sync (GSync/FreeSync). (c) Zkuste jiný PSU modelu – stejný výkon, nižší coil whine (závisí na konkrétním exempláři). (d) VRM coil lze 'utlumit' ferrofluidem nebo izolační hmotou – riskantní bez zkušeností. Diagnostika: záznam zvuku mobilním telefonem → spektrální analýza ve Audacity (FFT view) identifikuje dominantní frekvenci.",
            en: "Coil whine is the electromagnetic resonance of a ferromagnetic inductor core in an LLC resonant converter or VRM buck converter. The frequency depends on the duty cycle and can fall within the audible range (1–20kHz). Sources: (1) PSU LLC resonance: at low load the LLC converter enters a different operating mode, causing resonance. (2) GPU VRM coil whine: at very high FPS the GPU draws current spikes in rapid succession, causing VRM inductors to resonate. Solutions: (a) Cap FPS in the driver to 2× VSYNC frequency – reduces VRM switching frequency. (b) Enable VSYNC or Adaptive Sync (GSync/FreeSync). (c) Try a different PSU unit – same model but a different physical sample may be quieter. (d) VRM inductors can be dampened with ferrofluid or conformal coating – risky without experience. Diagnostics: record audio with a phone → spectral analysis in Audacity (FFT view) identifies the dominant frequency.",
            zh: "线圈啸叫是 LLC 谐振转换器或 VRM 降压转换器中铁磁电感磁芯的电磁谐振。频率取决于占空比，可能在可听范围（1–20kHz）内。来源：(1) PSU LLC 谐振：在低负载时 LLC 转换器进入不同工作模式，引起谐振；(2) GPU VRM 线圈啸叫：高帧率时 GPU 频繁产生电流尖峰导致 VRM 电感谐振。解决方案：(a) 将帧率限制为 VSYNC 频率的 2 倍；(b) 启用 VSYNC 或自适应同步；(c) 尝试其他 PSU 样品；(d) 用铁液封胶阻尼 VRM 电感（需经验）。诊断：手机录音 → Audacity FFT 分析。"
        }
    },
    {
        id: "psu-efficiency", type: "hardware", subcategory: "mb",
        code: "PSU Overload / Sudden Shutdown Under Load",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "PC se náhle vypne při herní nebo renderovací zátěži – PSU nestačí pokrýt špičkový příkon.",
            en: "PC shuts down suddenly during gaming or rendering – PSU cannot supply peak power demand.",
            zh: "在游戏或渲染时 PC 突然关机——PSU 无法满足峰值功耗需求。"
        },
        solution: {
            cs: "Zkontrolujte peak TDP GPU+CPU. Upgradujte PSU s 20-30% rezervou. Omezte Power Limit GPU na 90%.",
            en: "Calculate peak TDP of GPU+CPU. Upgrade PSU with 20–30% headroom. Limit GPU Power Limit to 90%.",
            zh: "计算 GPU+CPU 的峰值 TDP，升级留有 20–30% 余量的 PSU，将 GPU 功耗限制设为 90%。"
        },
        details: {
            cs: "Moderní systémy s RTX 4090 + Core i9/Ryzen 9 mohou spotřebovat 700–900 W ve špičce, přičemž laciné 650W PSU nestačí. PSU OVP (overvoltage) nebo OCP (overcurrent) obvody odpojí výstup, aby předešly poškození. Výpočet minimálního PSU: GPU TDP + CPU TDP + 150W (ostatní) × 1.3 (80 Plus Gold při 80% efektivitě). Příklady: RTX 4090 (450W) + Core i9-14900K (253W) + 150W = 853W × 1.3 = 1108W → potřebujete 1000–1200W PSU. Diagnostika: HWInfo64 zobrazí 'CPU Package Power' a 'GPU Power' v reálném čase; použijte Kill A Watt měřič zásuvný pro celkový příkon. Spolehlivé značky: Seasonic, Corsair RMx, be quiet! Dark Power, ASUS ROG Thor. Nikdy nepoužívejte no-name PSU nebo PSU bez 80 Plus certifikace v high-end systémech.",
            en: "Modern systems with RTX 4090 + Core i9/Ryzen 9 can draw 700–900W at peak, while cheap 650W PSUs cannot cope. PSU OVP (overvoltage) or OCP (overcurrent) circuits disconnect output to prevent damage. Minimum PSU calculation: GPU TDP + CPU TDP + 150W (other) × 1.3 factor (accounting for 80 Plus Gold 80% efficiency). Example: RTX 4090 (450W) + Core i9-14900K (253W) + 150W = 853W × 1.3 = 1108W → 1000–1200W PSU needed. Diagnostics: HWInfo64 shows 'CPU Package Power' and 'GPU Power' in real time; use a Kill A Watt plug meter for total draw. Reliable brands: Seasonic, Corsair RMx, be quiet! Dark Power, ASUS ROG Thor. Never use no-name PSUs or uncertified units in high-end systems.",
            zh: "配备 RTX 4090 + Core i9/Ryzen 9 的现代系统峰值功耗可达 700–900W，廉价 650W PSU 无法应对。PSU OVP（过压）或 OCP（过流）电路断开输出以防损坏。最小 PSU 计算：GPU TDP + CPU TDP + 150W（其他）× 1.3（80 Plus Gold 80% 效率）。示例：RTX 4090（450W）+ Core i9-14900K（253W）+ 150W = 853W × 1.3 = 1108W → 需要 1000–1200W PSU。可靠品牌：Seasonic、Corsair RMx、be quiet! Dark Power、ASUS ROG Thor。"
        }
    },

    // =========================================================
    // === USB-C / THUNDERBOLT ===
    // =========================================================
    {
        id: "usbc-power-delivery", type: "hardware", subcategory: "mb",
        code: "USB-C Power Delivery Negotiation Failure",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "USB-C nabíjení nenabíjí nebo nabíjí nesprávným výkonem – PD negociace selhala.",
            en: "USB-C charging fails or charges at the wrong wattage – Power Delivery negotiation failed.",
            zh: "USB-C 充电失败或以错误功率充电——电源传输协商失败。"
        },
        solution: {
            cs: "Použijte originální kabel s e-marker čipem (100W/240W). Zkontrolujte podporu PD verze.",
            en: "Use original cable with e-marker chip (for 100W/240W). Check PD version compatibility.",
            zh: "使用带有 e-marker 芯片的原装线缆（100W/240W），检查 PD 版本兼容性。"
        },
        details: {
            cs: "USB Power Delivery (PD) je protokol pro dohodnutí napájecího výkonu přes USB-C kabel. PD 3.0 podporuje až 100W (20V × 5A), PD 3.1 až 240W (48V × 5A). Negociace probíhá přes CC (Configuration Channel) linku – GoodCRC zprávy vyjednají power profile. Příčiny selhání: (1) Pasivní USB-C kabel bez e-marker čipu (elektronický identifikátor) – kabely nad 60W musí mít e-marker. (2) PD verze nesoulad: starý nabíječ s PD 2.0 nemusí podporovat nové profily zařízení. (3) CC linka v kabelu přerušena nebo má vysoký odpor. (4) USB-C port controller firmware bug – nutná aktualizace firmware. (5) Thunderbolt kabel vs. USB 3.2 kabel – fyzicky stejné, ale Thunderbolt má dodatečné signálové linky. Diagnostika: USB-C Power Delivery tester (např. ChargerLAB Power-Z) zobrazí vyjednaný voltage/current profil; zkuste jiný kabel, nabíječku a port.",
            en: "USB Power Delivery (PD) is a protocol for negotiating power delivery over a USB-C cable. PD 3.0 supports up to 100W (20V × 5A), PD 3.1 up to 240W (48V × 5A). Negotiation occurs via the CC (Configuration Channel) lines – GoodCRC messages establish the power profile. Failure causes: (1) Passive USB-C cable without an e-marker chip – cables above 60W require an e-marker. (2) PD version mismatch: an older PD 2.0 charger may not support newer device profiles. (3) Broken or high-resistance CC line in the cable. (4) USB-C port controller firmware bug – firmware update required. (5) Thunderbolt cable vs USB 3.2 cable – physically identical but Thunderbolt has additional signal lines. Diagnostics: a USB-C PD tester (e.g., ChargerLAB Power-Z) shows the negotiated voltage/current profile; try a different cable, charger, and port.",
            zh: "USB 电源传输（PD）是通过 USB-C 线缆协商供电功率的协议。PD 3.0 支持最高 100W，PD 3.1 支持最高 240W。协商通过 CC 线进行。失败原因：(1) 被动 USB-C 线缆没有 e-marker 芯片——60W 以上线缆必须有 e-marker；(2) PD 版本不匹配；(3) 线缆 CC 线断裂或阻抗高；(4) USB-C 端口控制器固件错误；(5) Thunderbolt 线缆与 USB 3.2 线缆物理上相同但电气不同。诊断：使用 USB-C PD 测试仪查看协商的电压/电流配置文件。"
        }
    },
    {
        id: "thunderbolt-dma", type: "hardware", subcategory: "mb",
        code: "Thunderbolt DMA Attack / Device Not Authorized",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "Thunderbolt zařízení odmítnuto nebo vyžaduje autorizaci – ochrana před DMA útoky.",
            en: "Thunderbolt device rejected or requires authorization – DMA attack protection enabled.",
            zh: "Thunderbolt 设备被拒绝或需要授权——DMA 攻击保护已启用。"
        },
        solution: {
            cs: "Autorizujte zařízení v Intel Thunderbolt Software. Vypněte Thunderbolt Security v BIOSu pro testování.",
            en: "Authorize the device in Intel Thunderbolt Software. Disable Thunderbolt Security in BIOS for testing.",
            zh: "在 Intel Thunderbolt 软件中授权设备，在 BIOS 中禁用 Thunderbolt 安全测试。"
        },
        details: {
            cs: "Thunderbolt (vyvinut Intel, nyní open standard v USB4) poskytuje PCIe přímý přístup přes kabel – to umožňuje DMA (Direct Memory Access) útoky, kde připojené zařízení může číst a zapisovat do RAM hostitele bez vědomí CPU. Intel implementoval Thunderbolt Security Levels: (0) No Security – vše povoleno. (1) User Authorization – uživatel musí schválit připojení. (2) Secure Connect – kryptografické ověření. (3) No PCIe Tunneling – pouze USB a DisplayPort bez PCIe. Windows 10+ implementuje Kernel DMA Protection (Memory Access Protection) přes IOMMU – izoluje DMA přístupy do dedikovaných paměťových oblastí. Thunderbolt DPIA (DisplayPort Input Adapter) mode pro USB4: alternativní mod operace. Problémy: Corporate restricted TB devices požadují autorizaci; BIOS TB security blokuje starší periferie. Ověření stavu: Intel Thunderbolt Software → Devices; nebo Device Manager → Thunderbolt.",
            en: "Thunderbolt (developed by Intel, now an open standard within USB4) provides direct PCIe access over a cable – enabling DMA (Direct Memory Access) attacks where a connected device can read/write the host's RAM without CPU awareness. Intel implemented Thunderbolt Security Levels: (0) No Security. (1) User Authorization. (2) Secure Connect – cryptographic verification. (3) No PCIe Tunneling – USB and DisplayPort only. Windows 10+ implements Kernel DMA Protection (Memory Access Protection) via IOMMU – isolates DMA access to dedicated memory regions. Issues: corporate-restricted TB devices require authorization; BIOS Thunderbolt security blocks older peripherals. Status check: Intel Thunderbolt Software → Devices; Device Manager → Thunderbolt.",
            zh: "Thunderbolt（由 Intel 开发，现为 USB4 开放标准）提供通过线缆的直接 PCIe 访问——使连接设备能够在 CPU 不知情的情况下读写主机 RAM（DMA 攻击）。Intel 实现了 Thunderbolt 安全级别：(0) 无安全；(1) 用户授权；(2) 安全连接——加密验证；(3) 无 PCIe 隧道。Windows 10+ 通过 IOMMU 实现内核 DMA 保护，将 DMA 访问隔离到专用内存区域。检查状态：Intel Thunderbolt 软件 → 设备；设备管理器 → Thunderbolt。"
        }
    },

    // =========================================================
    // === BLUETOOTH ===
    // =========================================================
    {
        id: "bt-pairing-fail", type: "software", subcategory: "drivers",
        code: "Bluetooth Pairing Failed / Device Not Found",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "Bluetooth zařízení se nepáruje nebo není viditelné – problém s ovladačem nebo interferenci 2.4 GHz.",
            en: "Bluetooth device fails to pair or is not discovered – driver issue or 2.4GHz interference.",
            zh: "蓝牙设备无法配对或未被发现，驱动程序问题或 2.4GHz 干扰。"
        },
        solution: {
            cs: "Odstraňte zařízení z párování a opakujte. Aktualizujte Bluetooth ovladač. Vzdáleně přibližte zařízení.",
            en: "Remove device pairing and retry. Update Bluetooth driver. Move device closer and away from USB 3.0 ports.",
            zh: "移除设备配对并重试，更新蓝牙驱动程序，将设备移近并远离 USB 3.0 端口。"
        },
        details: {
            cs: "Bluetooth 5.x pracuje v 2.4 GHz ISM pásmu, stejně jako Wi-Fi 2.4 GHz a USB 3.0 (super-spread noise). USB 3.0 porty emitují širokopásmový elektromagnetický šum v rozsahu 2.4–2.5 GHz, který maskuje Bluetooth signál. Řešení USB 3.0 interference: přesuňte USB 3.0 zařízení dál od Bluetooth adaptéru nebo použijte USB 2.0 pro periferie v blízkosti Bluetooth adaptéru. Bluetooth protokol: párovací fáze používá SMP (Security Manager Protocol) přes LE-ACL nebo BR/EDR. Chyba párovací: (1) Nedostatečná vzdálenost nebo překážka. (2) Zařízení není v párovacím (discovery) módu – podržte párovací tlačítko dle manuálu. (3) Stará Bluetooth cache v Windows – odstranit: Settings → Bluetooth → Remove device; Device Manager → View → Show hidden devices → Bluetooth → odstranit staré záznamy. (4) Nekompatibilní Bluetooth profil (A2DP, HFP, HID) mezi zařízeními. (5) Ovladač Intel/Qualcomm Bluetooth zastaralý.",
            en: "Bluetooth 5.x operates in the 2.4GHz ISM band, shared with 2.4GHz Wi-Fi and USB 3.0 (superspread noise). USB 3.0 ports emit broadband electromagnetic noise in the 2.4–2.5GHz range, masking Bluetooth signals. Mitigation: move USB 3.0 devices away from the Bluetooth adapter or use USB 2.0 for nearby peripherals. Bluetooth pairing protocol: the pairing phase uses SMP (Security Manager Protocol) over LE-ACL or BR/EDR. Pairing failures: (1) Insufficient distance or obstacles. (2) Device not in pairing/discovery mode – hold the pair button per manual. (3) Stale Bluetooth cache in Windows – remove: Settings → Bluetooth → Remove device; Device Manager → View → Show hidden devices → Bluetooth → remove old entries. (4) Incompatible Bluetooth profile (A2DP, HFP, HID) between devices. (5) Outdated Intel/Qualcomm Bluetooth driver.",
            zh: "蓝牙 5.x 在 2.4GHz ISM 频段运行，与 2.4GHz Wi-Fi 和 USB 3.0（宽带噪声）共享。USB 3.0 端口在 2.4–2.5GHz 范围内发出宽带电磁噪声，遮蔽蓝牙信号。缓解措施：将 USB 3.0 设备远离蓝牙适配器。配对失败原因：(1) 距离不足或障碍物；(2) 设备未处于配对/发现模式；(3) Windows 中蓝牙缓存陈旧；(4) 设备间蓝牙配置文件不兼容（A2DP、HFP、HID）；(5) Intel/Qualcomm 蓝牙驱动过旧。"
        }
    },

    // =========================================================
    // === WINDOWS (nové) ===
    // =========================================================
    {
        id: "win-tpm-error", type: "software", subcategory: "windows",
        code: "TPM 2.0 Error / BitLocker Recovery Required",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Windows 11 nespustí BitLocker nebo hlásí chybu TPM – TPM čip není funkční nebo byl resetován.",
            en: "Windows 11 cannot boot BitLocker or reports TPM error – TPM chip is non-functional or reset.",
            zh: "Windows 11 无法启动 BitLocker 或报告 TPM 错误——TPM 芯片不正常或已重置。"
        },
        solution: {
            cs: "Zadejte BitLocker Recovery Key (záloha v Microsoft účtu). Resetujte TPM v BIOSu Security sekci.",
            en: "Enter BitLocker Recovery Key (backed up in Microsoft account). Reset TPM in BIOS Security section.",
            zh: "输入 BitLocker 恢复密钥（备份在微软账户中），在 BIOS 安全部分重置 TPM。"
        },
        details: {
            cs: "TPM (Trusted Platform Module) 2.0 je bezpečnostní koprocesor implementovaný jako dedikovaný čip (fTPM = firmware TPM integrovaný v CPU/UEFI). Slouží pro: BitLocker disk encryption (ukládá šifrovací klíče v TPM PCR registrech), Windows Hello, Secure Boot attestation. Příčiny TPM chyb: (1) BIOS aktualizace resetovala TPM nebo změnila PCR (Platform Configuration Register) hodnoty – BitLocker detekuje neshodu a požaduje Recovery Key. (2) Změna BIOS bezpečnostního nastavení (Secure Boot, UEFI boot mode) mění PCR hodnoty. (3) Hardware TPM čip selhal (Infineon SLB 9670). (4) Intel PTT (Platform Trust Technology) nebo AMD fTPM: firmware TPM může být deaktivován BIOS nastavením. Prevence: zálohujte BitLocker Recovery Key do Microsoft Účtu (Settings → Privacy → Device Encryption → Backup Recovery Key) PŘED jakoukoli BIOS aktualizací. Diagnostika: 'tpm.msc' v Windows zobrazí TPM status; Event Viewer → TPM source.",
            en: "TPM (Trusted Platform Module) 2.0 is a security coprocessor implemented as a dedicated chip (fTPM = firmware TPM integrated in CPU/UEFI). Uses: BitLocker disk encryption (stores keys in TPM PCR registers), Windows Hello, Secure Boot attestation. TPM error causes: (1) BIOS update reset the TPM or changed PCR values – BitLocker detects mismatch and requests Recovery Key. (2) Security setting changes (Secure Boot, UEFI boot mode) modify PCR values. (3) Physical TPM chip failure (Infineon SLB 9670). (4) Intel PTT or AMD fTPM can be disabled in BIOS. Prevention: back up the BitLocker Recovery Key to a Microsoft Account BEFORE any BIOS update. Diagnostics: 'tpm.msc' shows TPM status; Event Viewer → TPM source.",
            zh: "TPM（可信平台模块）2.0 是作为专用芯片实现的安全协处理器（fTPM = 固件 TPM，集成在 CPU/UEFI 中）。用途：BitLocker 磁盘加密、Windows Hello、安全启动证明。TPM 错误原因：(1) BIOS 更新重置了 TPM 或更改了 PCR 值——BitLocker 检测到不匹配并请求恢复密钥；(2) 安全设置更改修改了 PCR 值；(3) 物理 TPM 芯片故障；(4) Intel PTT 或 AMD fTPM 在 BIOS 中被禁用。预防：在任何 BIOS 更新之前，将 BitLocker 恢复密钥备份到微软账户。"
        }
    },
    {
        id: "win-hyper-v", type: "software", subcategory: "windows",
        code: "Hyper-V / Virtualization Error (BSOD 0x0000005D)",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Windows nemůže spustit virtuální stroje nebo BSOD 0x5D – Hyper-V není podporován nebo konfliktuje.",
            en: "Windows cannot start virtual machines or BSOD 0x5D – Hyper-V not supported or conflicting.",
            zh: "Windows 无法启动虚拟机或蓝屏 0x5D——Hyper-V 不受支持或存在冲突。"
        },
        solution: {
            cs: "Povolte virtualizaci (Intel VT-x/AMD-V) v BIOSu. Zkontrolujte konflikty s třetím VMware/VirtualBox.",
            en: "Enable virtualization (Intel VT-x/AMD-V) in BIOS. Check conflicts with third-party VMware/VirtualBox.",
            zh: "在 BIOS 中启用虚拟化（Intel VT-x/AMD-V），检查与第三方 VMware/VirtualBox 的冲突。"
        },
        details: {
            cs: "Hyper-V je Type-1 hypervisor integrovaný v Windows 10/11 Pro a Enterprise. BSOD HARDWARE_VIRTUALIZATION_ERROR (0x5D) nastane, když Hyper-V nemůže inicializovat virtualizační extensions. Příčiny: (1) Intel VT-x nebo AMD-V není povoleno v BIOS → BIOS Security → CPU virtualization nebo SVM Mode. (2) VT-d (Intel Virtualization for Directed I/O) nebo AMD-Vi není povoleno – nutné pro device passthrough. (3) Konflikt mezi Hyper-V a třetí hypervizory (VMware Workstation 16+ umí koexistovat přes WHPX API, VirtualBox starší verze ne). (4) Windows Subsystem for Android (WSA) nebo WSL2 vyžadují Hyper-V – pokud zakážete Hyper-V pro VirtualBox, WSA přestane fungovat. (5) Memory integrity (HVCI – Hypervisor-Protected Code Integrity) v Windows Security může blokovat Hyper-V. Diagnostika: 'systeminfo | find Hyper-V' nebo Get-ComputerInfo HyperV* v PowerShell.",
            en: "Hyper-V is a Type-1 hypervisor integrated in Windows 10/11 Pro and Enterprise. BSOD HARDWARE_VIRTUALIZATION_ERROR (0x5D) occurs when Hyper-V cannot initialize virtualization extensions. Causes: (1) Intel VT-x or AMD-V not enabled in BIOS → BIOS Security → CPU virtualization or SVM Mode. (2) VT-d or AMD-Vi not enabled – required for device passthrough. (3) Conflict between Hyper-V and third-party hypervisors (VMware Workstation 16+ can coexist via WHPX API; older VirtualBox cannot). (4) Windows Subsystem for Android or WSL2 require Hyper-V – disabling Hyper-V for VirtualBox breaks WSA. (5) Memory Integrity (HVCI) in Windows Security may block Hyper-V. Diagnostics: 'systeminfo | find Hyper-V' or 'Get-ComputerInfo HyperV*' in PowerShell.",
            zh: "Hyper-V 是集成在 Windows 10/11 Pro 和 Enterprise 中的 Type-1 虚拟化管理程序。蓝屏 HARDWARE_VIRTUALIZATION_ERROR（0x5D）发生在 Hyper-V 无法初始化虚拟化扩展时。原因：(1) Intel VT-x 或 AMD-V 未在 BIOS 中启用；(2) VT-d 或 AMD-Vi 未启用；(3) Hyper-V 与第三方虚拟机管理器冲突；(4) WSA 或 WSL2 需要 Hyper-V；(5) 内存完整性（HVCI）可能阻止 Hyper-V。诊断：PowerShell 中运行相关命令。"
        }
    },
    {
        id: "win-kernel-security", type: "software", subcategory: "windows",
        code: "KERNEL_SECURITY_CHECK_FAILURE (0x00000139)",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "BSOD 0x139 – kernel detekoval poškození datové struktury běžící v chráněném paměťovém prostoru.",
            en: "BSOD 0x139 – kernel detected corruption of a data structure in protected memory space.",
            zh: "蓝屏 0x139——内核检测到受保护内存空间中数据结构损坏。"
        },
        solution: {
            cs: "Spusťte 'sfc /scannow' a DISM RestoreHealth. Zkontrolujte RAM MemTest86. Odinstalujte problematické ovladače.",
            en: "Run 'sfc /scannow' and DISM RestoreHealth. Check RAM with MemTest86. Uninstall problematic drivers.",
            zh: "运行'sfc /scannow'和 DISM RestoreHealth，用 MemTest86 检查内存，卸载有问题的驱动程序。"
        },
        details: {
            cs: "KERNEL_SECURITY_CHECK_FAILURE (0x139) nastane, když Windows kernel detekuje poškození kritické datové struktury jako: Executive Object, Pool header, Lookaside list, Stack canary. Windows 8+ implementuje Stack Protector (GS cookie), Pool integrity checks a Kernel Patch Protection (KPP/PatchGuard). Příčiny: (1) Vadná RAM způsobující bit-flip v kernel datové struktuře. (2) Vadný kernel-mode ovladač přepisující cizí paměť. (3) Exploit pokus narušující kernel integritu. (4) Poškozené systémové soubory. (5) Anti-cheat nebo overlay software instrumentující kernel struktury nesprávně. Analýza: WinDBG – !analyze -v → zobrazí porušenou strukturu; .bugcheck → parametry; !pool → analýza pool corruption. Prevence: aktivujte HVCI (Memory integrity) v Windows Security – izoluje kernel pomocí Hyper-V virtualizace a zabraňuje unsigned driver injection.",
            en: "KERNEL_SECURITY_CHECK_FAILURE (0x139) occurs when the Windows kernel detects corruption of critical data structures such as Executive Objects, Pool headers, Lookaside lists, or Stack canaries. Windows 8+ implements Stack Protector (GS cookie), Pool integrity checks, and Kernel Patch Protection (KPP/PatchGuard). Causes: (1) Faulty RAM causing a bit-flip in a kernel data structure. (2) A buggy kernel-mode driver overwriting foreign memory. (3) An exploit attempting to subvert kernel integrity. (4) Corrupted system files. (5) Anti-cheat or overlay software incorrectly instrumenting kernel structures. Analysis: WinDBG → '!analyze -v' shows the violated structure; '.bugcheck' shows parameters; '!pool' analyzes pool corruption. Prevention: enable HVCI (Memory Integrity) in Windows Security.",
            zh: "KERNEL_SECURITY_CHECK_FAILURE（0x139）发生在 Windows 内核检测到关键数据结构损坏时，如执行对象、池标头、后备列表或堆栈金丝雀。Windows 8+ 实现了堆栈保护器（GS cookie）、池完整性检查和内核补丁保护（KPP/PatchGuard）。原因：(1) 有缺陷的 RAM 导致内核数据结构位翻转；(2) 有缺陷的内核模式驱动程序覆盖外部内存；(3) 利用漏洞破坏内核完整性；(4) 系统文件损坏；(5) 反作弊或覆盖软件错误地检测内核结构。分析：WinDBG → '!analyze -v'。"
        }
    },
    {
        id: "win-acpi-error", type: "software", subcategory: "windows",
        code: "ACPI_BIOS_ERROR / System Sleeps Won't Wake",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "PC nevzbudí ze spánku (S3/S0ix) nebo BSOD ACPI_BIOS_ERROR – ACPI tabulky jsou chybné.",
            en: "PC won't wake from sleep (S3/S0ix) or BSOD ACPI_BIOS_ERROR – ACPI tables are malformed.",
            zh: "PC 无法从睡眠（S3/S0ix）唤醒或蓝屏 ACPI_BIOS_ERROR——ACPI 表格式错误。"
        },
        solution: {
            cs: "Aktualizujte BIOS. Zakažte Fast Startup. Nastavte 'powercfg /h off' pro zakázání hibernace.",
            en: "Update BIOS. Disable Fast Startup. Run 'powercfg /h off' to disable hibernation if it causes issues.",
            zh: "更新 BIOS，禁用快速启动，运行'powercfg /h off'禁用休眠。"
        },
        details: {
            cs: "ACPI (Advanced Configuration and Power Interface) je standard pro správu napájení a konfiguraci hardware. ACPI tabulky (DSDT, SSDT) jsou umístěny v BIOS/UEFI a popisují hardware systému a jeho napájecí stavy. Windows ACPI driver (acpi.sys) parsuje tyto tabulky při startu. Problémy: (1) Poškozená nebo nesprávně implementovaná DSDT tabulka v BIOS – výrobci někdy porušují specifikaci. (2) S3 sleep (Suspend-to-RAM) vs S0ix (Modern Standby) konflikt – Intel 12+ gen a AMD Ryzen preferují S0ix, ale starý HW/SW může očekávat S3. (3) Ovladač nebo BIOS neumí správně obnovit hardware ze spánku (GPU, USB, NIC). (4) Fast Startup (hybridní spánek) ukládá stav do souboru hiberfil.sys – při nekonzistentním stavu naváže špatnou relaci. Diagnostika: 'powercfg /sleepstudy' → HTML report o spánkových cyklech; 'powercfg /requests' → co brání spánku; Event Viewer → System → Kernel-Power.",
            en: "ACPI (Advanced Configuration and Power Interface) is the standard for power management and hardware configuration. ACPI tables (DSDT, SSDT) reside in BIOS/UEFI and describe system hardware and power states. The Windows ACPI driver (acpi.sys) parses these tables at startup. Issues: (1) Corrupted or incorrectly implemented DSDT in BIOS – vendors sometimes violate the spec. (2) S3 sleep (Suspend-to-RAM) vs S0ix (Modern Standby) conflict – Intel 12th+ Gen and AMD Ryzen prefer S0ix, but legacy hardware/software may expect S3. (3) Driver or BIOS cannot properly restore hardware from sleep (GPU, USB, NIC). (4) Fast Startup (hybrid sleep) saves state to hiberfil.sys – an inconsistent state causes a bad resume. Diagnostics: 'powercfg /sleepstudy' → HTML report on sleep cycles; 'powercfg /requests' → what is blocking sleep; Event Viewer → System → Kernel-Power.",
            zh: "ACPI（高级配置和电源接口）是电源管理和硬件配置标准。ACPI 表（DSDT、SSDT）位于 BIOS/UEFI 中，描述系统硬件和电源状态。问题：(1) BIOS 中损坏或不正确实现的 DSDT——厂商有时违反规范；(2) S3 睡眠与 S0ix（现代待机）冲突；(3) 驱动程序或 BIOS 无法正确从睡眠恢复硬件；(4) 快速启动（混合睡眠）将状态保存到 hiberfil.sys——状态不一致导致恢复失败。诊断：'powercfg /sleepstudy'、'powercfg /requests'。"
        }
    },
    {
        id: "win-store-error", type: "software", subcategory: "windows",
        code: "Microsoft Store Error 0x80073D05 / App Install Fail",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Microsoft Store nemůže nainstalovat nebo aktualizovat aplikaci – chyba APPX balíčku.",
            en: "Microsoft Store cannot install or update an app – APPX package error.",
            zh: "Microsoft Store 无法安装或更新应用程序——APPX 软件包错误。"
        },
        solution: {
            cs: "Resetujte Store cache: 'wsreset.exe'. Přeinstalujte Store přes PowerShell: Get-AppxPackage *Store* | Remove-AppxPackage.",
            en: "Reset Store cache: run 'wsreset.exe'. Reinstall Store via PowerShell: Get-AppxPackage *WindowsStore* | Remove-AppxPackage.",
            zh: "重置 Store 缓存：运行'wsreset.exe'，通过 PowerShell 重新安装 Store。"
        },
        details: {
            cs: "Microsoft Store (MSIX/APPX balíčky) používá jiný deployment model než tradiční .exe instalátory. Chyby jsou způsobeny: (1) Poškozený APPX cache nebo SoftwareDistribution Store komponenta – wsreset.exe vymaže cache a restartuje Store. (2) Licenční problém – Microsoft Store License Server nedostupný nebo vypršela dočasná licence. (3) Firewall nebo proxy blokuje Store servery (*.store.microsoft.com). (4) Windows Identity Foundation (WIF) chyba – autentizace Microsoft účtu selhala. (5) Nedostatečné místo na systémovém oddílu (APPX se instalují do C:\\Program Files\\WindowsApps). Příkazy pro diagnostiku: 'Get-AppxPackage -AllUsers | Where-Object {$_.Status -ne \"Ok\"}' zobrazí poškozené balíčky; 'Add-AppxPackage -DisableDevelopmentMode -Register \"$($_.InstallLocation)\\AppXManifest.xml\"' pro opravu; Event Viewer → Applications and Services → Microsoft → Windows → AppxDeployment-Server.",
            en: "Microsoft Store (MSIX/APPX packages) uses a different deployment model than traditional .exe installers. Errors occur due to: (1) Corrupted APPX cache or Store component – wsreset.exe clears cache and restarts Store. (2) Licensing issue – Microsoft Store License Server unreachable or temporary license expired. (3) Firewall or proxy blocking Store servers (*.store.microsoft.com). (4) Windows Identity Foundation (WIF) failure – Microsoft account authentication failed. (5) Insufficient space on the system partition (APPXs install to C:\\Program Files\\WindowsApps). Diagnostic commands: 'Get-AppxPackage -AllUsers | Where-Object {$_.Status -ne \"Ok\"}' shows broken packages; Event Viewer → Applications and Services → Microsoft → Windows → AppxDeployment-Server.",
            zh: "Microsoft Store（MSIX/APPX 软件包）使用与传统 .exe 安装程序不同的部署模型。错误原因：(1) APPX 缓存或 Store 组件损坏——wsreset.exe 清除缓存；(2) 许可问题——Microsoft Store 许可服务器不可达或临时许可已过期；(3) 防火墙或代理阻止 Store 服务器；(4) Windows Identity Foundation 故障——Microsoft 账户认证失败；(5) 系统分区空间不足。诊断：PowerShell 查询损坏软件包；事件查看器 → AppxDeployment-Server。"
        }
    },

    // =========================================================
    // === APPS & GAMES (nové) ===
    // =========================================================
    {
        id: "app-direct-storage", type: "software", subcategory: "apps",
        code: "DirectStorage Stutter / GPU Decompression Error",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Hra využívající DirectStorage mrzne nebo koktá při načítání textur – GDeflate GPU dekomprese selhává.",
            en: "Game using DirectStorage freezes or stutters while loading textures – GDeflate GPU decompression fails.",
            zh: "使用 DirectStorage 的游戏在加载纹理时冻结或卡顿——GDeflate GPU 解压缩失败。"
        },
        solution: {
            cs: "Aktualizujte GPU ovladač. Ověřte, že NVMe je připojen k CPU PCIe slotu (ne chipset). Zapněte DirectStorage v nastavení hry.",
            en: "Update GPU driver. Verify NVMe is on CPU PCIe lane (not chipset). Enable DirectStorage in game settings.",
            zh: "更新 GPU 驱动，验证 NVMe 连接到 CPU PCIe 通道（而非芯片组），在游戏设置中启用 DirectStorage。"
        },
        details: {
            cs: "Microsoft DirectStorage API (DS 1.2+) obchází CPU při dekompresi herních assetů – GPU přímo čte z NVMe SSD přes PCIe Ring Buffer a dekomprimuje GDeflate (GPU-accelerated deflate) bez CPU zapojení. Výhody: dramaticky rychlejší načítání (Forza Horizon 5, Ratchet & Clank: Rift Apart PC). Problémy: (1) GPU ovladač musí podporovat DS – staré ovladače neimplementují GDeflate shader. (2) NVMe musí být na CPU PCIe linkách pro optimální výkon – chipset přidává 1–2μs latence. (3) RAM kapacita > 16 GB preferována – DS GPU buffer streaming. (4) Hra musí obsahovat DStorage compilované assety – ne všechny hry to mají. (5) Windows 11 22H2+ pro nejlepší kompatibilitu. Diagnostika: GPU-Z shader model musí být SM 6.0+; NVMe PCIe přes CPU ověřte v GPU-Z → Bus Interface; DirectStorage Debug Layer dostupný přes DirectX Developer SDK.",
            en: "Microsoft DirectStorage API (DS 1.2+) bypasses the CPU for game asset decompression – the GPU reads directly from the NVMe SSD via a PCIe Ring Buffer and decompresses using GDeflate (GPU-accelerated deflate) without CPU involvement. Benefits: dramatically faster loading. Issues: (1) GPU driver must support DS – older drivers don't implement the GDeflate shader. (2) NVMe should be on CPU PCIe lanes for optimal performance – chipset adds 1–2μs latency. (3) RAM ≥ 16GB preferred for DS GPU buffer streaming. (4) Game must ship with DStorage-compiled assets. (5) Windows 11 22H2+ for best compatibility. Diagnostics: GPU-Z shader model must be SM 6.0+; verify NVMe PCIe lane via CPU in GPU-Z; DirectStorage Debug Layer available via DirectX Developer SDK.",
            zh: "Microsoft DirectStorage API（DS 1.2+）绕过 CPU 进行游戏资产解压缩——GPU 通过 PCIe 环形缓冲区直接从 NVMe SSD 读取并使用 GDeflate（GPU 加速的 deflate）解压，无需 CPU 参与。问题：(1) GPU 驱动必须支持 DS——旧驱动不实现 GDeflate 着色器；(2) NVMe 应位于 CPU PCIe 通道上；(3) 内存最好 ≥ 16GB；(4) 游戏必须提供 DirectStorage 编译的资产；(5) 最好使用 Windows 11 22H2+。诊断：GPU-Z 着色器模型必须为 SM 6.0+。"
        }
    },
    {
        id: "app-raytracing-crash", type: "software", subcategory: "apps",
        code: "Ray Tracing Crash / RTX Feature Error",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Hra crashuje nebo zamrzá při zapnutém ray tracingu – DXR nebo Vulkan RT extension selhává.",
            en: "Game crashes or freezes with ray tracing enabled – DXR or Vulkan RT extension failure.",
            zh: "启用光线追踪时游戏崩溃或冻结——DXR 或 Vulkan RT 扩展失败。"
        },
        solution: {
            cs: "Aktualizujte GPU driver. Snižte RT nastavení z Ultra na High. Snižte VRAM spotřebu jinými nastaveními.",
            en: "Update GPU driver. Lower RT setting from Psycho/Ultra to High. Reduce VRAM usage by lowering other settings.",
            zh: "更新 GPU 驱动，将光追设置从极高降至高，通过降低其他设置来减少显存使用。"
        },
        details: {
            cs: "DirectX Raytracing (DXR) a Vulkan Ray Tracing extensions vyžadují RT cores (NVIDIA RTX 20xx+, AMD RX 6000+, Intel Arc). DXR pipeline: TraceRay() → BLAS/TLAS BVH traversal → Any Hit, Closest Hit nebo Miss shader. Příčiny pádu: (1) VRAM overflow – ray tracing dramaticky zvyšuje VRAM spotřebu (BVH struktury, RT buffer). RTX 3080 10GB může nestačit pro 4K RT+DLSS. (2) Shader compilation spike – RTX SER (Shader Execution Reordering) na Ada Lovelace způsobuje long compile při prvním spuštění. (3) Poškozený nebo chybný RT shader v konkrétní verzi hry. (4) GPU overclocking destabilizuje RT cores – jsou náchylnější než rasterizační pipeline. (5) Ovladač bug v BLAS/TLAS build operaci. Diagnostika: GPU-Z VRAM usage monitor při RT; zkuste snížit shadow/reflection RT kategorie individuálně pro izolaci.",
            en: "DirectX Raytracing (DXR) and Vulkan Ray Tracing extensions require dedicated RT cores (NVIDIA RTX 20xx+, AMD RX 6000+, Intel Arc). DXR pipeline: TraceRay() → BLAS/TLAS BVH traversal → Any Hit, Closest Hit, or Miss shader. Crash causes: (1) VRAM overflow – ray tracing dramatically increases VRAM usage (BVH structures, RT buffers). RTX 3080 10GB may run out at 4K RT+DLSS. (2) Shader compilation spike – RTX SER (Shader Execution Reordering) on Ada Lovelace causes a long compile on first run. (3) Corrupted or buggy RT shader in a specific game version. (4) GPU overclocking destabilizes RT cores – they are more sensitive than the rasterization pipeline. (5) Driver bug in BLAS/TLAS build operation. Diagnostics: monitor GPU-Z VRAM usage with RT enabled; isolate by lowering individual shadow/reflection RT settings.",
            zh: "DirectX 光线追踪（DXR）和 Vulkan 光线追踪扩展需要专用 RT 核心（NVIDIA RTX 20xx+、AMD RX 6000+、Intel Arc）。崩溃原因：(1) 显存溢出——光线追踪大幅增加显存使用（BVH 结构、RT 缓冲区）；(2) 着色器编译尖峰——Ada Lovelace 的 RTX SER 在首次运行时导致长时间编译；(3) 特定游戏版本中损坏或有缺陷的 RT 着色器；(4) GPU 超频使 RT 核心不稳定；(5) BLAS/TLAS 构建操作中的驱动错误。诊断：启用光追时使用 GPU-Z 监控显存。"
        }
    },
    {
        id: "app-wsl2-error", type: "software", subcategory: "apps",
        code: "WSL2 / Linux Subsystem Error (0x80370102)",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Windows Subsystem for Linux 2 nespustí distribuci – virtualizace nebo kernel error.",
            en: "Windows Subsystem for Linux 2 cannot start a distribution – virtualization or kernel error.",
            zh: "Windows Subsystem for Linux 2 无法启动发行版——虚拟化或内核错误。"
        },
        solution: {
            cs: "Povolte virtualizaci v BIOSu. Spusťte 'wsl --update'. Ověřte: 'wsl --status'.",
            en: "Enable virtualization in BIOS. Run 'wsl --update'. Verify with 'wsl --status'.",
            zh: "在 BIOS 中启用虚拟化，运行'wsl --update'，用'wsl --status'验证。"
        },
        details: {
            cs: "WSL2 (Windows Subsystem for Linux 2) přešel z WSL1 (emulace syscalls) na skutečný Linux kernel běžící v lehkém Hyper-V virtuálním stroji (Utility VM – UVM). Chyba 0x80370102 nastane, když Hyper-V nemůže inicializovat UVM. Požadavky: CPU virtualizace (Intel VT-x + VT-d nebo AMD-V + AMD-Vi), povolené v BIOS. Windows 10 build 19041+ nebo Windows 11. Instalace: 'wsl --install' automaticky aktivuje Hyper-V, Virtual Machine Platform, WSL komponenty. Příčiny chyb: (1) BIOS virtualizace vypnuta – viz výše. (2) Konflikt s jiným hypervisorem (starší VirtualBox, Hyper-V na starém HW). (3) Poškozená WSL distribuce: 'wsl --unregister Ubuntu && wsl --install Ubuntu'. (4) WSL kernel je zastaralý – 'wsl --update'. (5) Memory integrity (HVCI) na starém hardware může způsobit inkompatibilitu. Výkon: WSL2 I/O na Windows filesystem (/mnt/c) je pomalejší než na Linux filesystem (~/). Pro vývoj: pracujte v ~/home, ne v /mnt/c.",
            en: "WSL2 switched from WSL1 (syscall emulation) to a real Linux kernel running in a lightweight Hyper-V virtual machine (Utility VM – UVM). Error 0x80370102 occurs when Hyper-V cannot initialize the UVM. Requirements: CPU virtualization (Intel VT-x + VT-d or AMD-V + AMD-Vi) enabled in BIOS; Windows 10 build 19041+ or Windows 11. Install: 'wsl --install' automatically activates Hyper-V, Virtual Machine Platform, and WSL components. Error causes: (1) BIOS virtualization disabled. (2) Conflict with another hypervisor (older VirtualBox). (3) Corrupted WSL distro: 'wsl --unregister Ubuntu && wsl --install Ubuntu'. (4) Outdated WSL kernel: 'wsl --update'. (5) Memory Integrity (HVCI) on old hardware may be incompatible. Performance note: WSL2 I/O on the Windows filesystem (/mnt/c) is slower than on the Linux filesystem (~/). For development: work in ~/ not /mnt/c.",
            zh: "WSL2 从 WSL1（syscall 模拟）切换为在轻量级 Hyper-V 虚拟机（实用程序 VM – UVM）中运行的真实 Linux 内核。错误 0x80370102 发生在 Hyper-V 无法初始化 UVM 时。要求：BIOS 中启用 CPU 虚拟化；Windows 10 build 19041+ 或 Windows 11。错误原因：(1) BIOS 虚拟化已禁用；(2) 与其他虚拟机管理程序冲突；(3) WSL 发行版损坏；(4) WSL 内核过旧；(5) 内存完整性（HVCI）与旧硬件不兼容。性能注意：WSL2 在 Windows 文件系统上的 I/O 比 Linux 文件系统慢。"
        }
    },

    // =========================================================
    // === DISPLAY / VIDEO ===
    // =========================================================
    {
        id: "disp-hdmi-no-audio", type: "hardware", subcategory: "gpu",
        code: "HDMI / DisplayPort No Audio",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "Obraz funguje, ale zvuk přes HDMI nebo DisplayPort není přenášen do monitoru/TV/AV receiveru.",
            en: "Video works but audio is not transmitted over HDMI or DisplayPort to monitor/TV/AV receiver.",
            zh: "视频正常但音频无法通过 HDMI 或 DisplayPort 传输到显示器/电视/AV 接收器。"
        },
        solution: {
            cs: "Nastavte HDMI audio jako výchozí výstup v Sound Settings. Nainstalujte GPU audio ovladač (NVIDIA HD Audio).",
            en: "Set HDMI audio as default output in Sound Settings. Install GPU audio driver (NVIDIA HD Audio / AMD HDMI Audio).",
            zh: "在声音设置中将 HDMI 音频设置为默认输出，安装 GPU 音频驱动程序（NVIDIA HD Audio/AMD HDMI Audio）。"
        },
        details: {
            cs: "HDMI a DisplayPort přenáší audio spolu s videem ve stejném kabelu. GPU obsahuje vestavěný HD Audio Codec čip pro HDMI/DP audio kodování. Příčiny selhání: (1) Windows výchozí zvukové zařízení není nastaveno na GPU HDMI výstup – Settings → Sound → výstupní zařízení = 'NVIDIA High Definition Audio' nebo 'AMD High Definition Audio'. (2) GPU audio ovladač není nainstalován – GPU video driver instaluje NVIDIA HD Audio nebo AMD HDMI Audio jako separátní součást; Device Manager → Sound zkontrolujte přítomnost. (3) Monitor nebo receiver nepřijímá audio na daném HDMI portu – HDMI ARC (Audio Return Channel) musí být povoleno v TV nastavení pro 2-way audio. (4) HDMI kabel starší verze (HDMI 1.4) nemusí podporovat high-fidelity audio (Dolby Atmos, DTS:X). (5) Exclusive Mode aplikace drží audio endpoint. Diagnostika: Device Manager → Sound → Playback přes kliknutí pravým tlačítkem → Show Disabled Devices – HDMI výstup může být deaktivován.",
            en: "HDMI and DisplayPort transmit audio together with video in the same cable. The GPU contains a built-in HD Audio Codec chip for HDMI/DP audio encoding. Failure causes: (1) Windows default sound device is not set to the GPU HDMI output – Settings → Sound → output device = 'NVIDIA High Definition Audio' or 'AMD High Definition Audio'. (2) GPU audio driver not installed – the GPU video driver installs NVIDIA HD Audio or AMD HDMI Audio as a separate component; check Device Manager → Sound. (3) Monitor or receiver doesn't accept audio on that HDMI port – HDMI ARC must be enabled in TV settings for 2-way audio. (4) Older HDMI cable (1.4) may not support high-fidelity audio (Dolby Atmos, DTS:X). (5) Exclusive Mode app holds the audio endpoint. Diagnostics: Device Manager → Sound → Playback (right-click → Show Disabled Devices – HDMI output may be disabled).",
            zh: "HDMI 和 DisplayPort 在同一线缆中同时传输音频和视频。GPU 包含内置 HD 音频编解码器芯片用于 HDMI/DP 音频编码。失败原因：(1) Windows 默认声音设备未设置为 GPU HDMI 输出；(2) GPU 音频驱动未安装；(3) 显示器或接收器不接受该 HDMI 端口的音频——需要在电视设置中启用 HDMI ARC；(4) 旧 HDMI 线缆可能不支持高保真音频；(5) 独占模式应用程序持有音频端点。诊断：设备管理器 → 声音 → 播放（右键 → 显示禁用设备）。"
        }
    },
    {
        id: "disp-g-sync-flicker", type: "hardware", subcategory: "gpu",
        code: "G-Sync / FreeSync Flickering or Not Working",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "G-Sync nebo FreeSync způsobuje problikávání obrazovky nebo je úplně nefunkční.",
            en: "G-Sync or FreeSync causes screen flickering or does not work at all.",
            zh: "G-Sync 或 FreeSync 导致屏幕闪烁或完全无法工作。"
        },
        solution: {
            cs: "Použijte DisplayPort kabel (ne HDMI). V NVIDIA Control Panel povolte G-Sync. Aktualizujte monitor firmware.",
            en: "Use a DisplayPort cable (not HDMI). Enable G-Sync in NVIDIA Control Panel. Update monitor firmware.",
            zh: "使用 DisplayPort 线缆（不是 HDMI），在 NVIDIA 控制面板中启用 G-Sync，更新显示器固件。"
        },
        details: {
            cs: "G-Sync (NVIDIA proprietární) a FreeSync (AMD open standard, VESA Adaptive-Sync) jsou Variable Refresh Rate (VRR) technologie eliminující screen tearing bez pevné latence V-Sync. Technické rozdíly: G-Sync module = dedikovaný hardware scaler v monitoru; G-Sync Compatible = monitor certifikovaný pro Adaptive-Sync bez modulu. FreeSync Premium Pro přidá HDR a Low Framerate Compensation (LFC). Příčiny flickeru: (1) FPS klesne pod minimální refresh rate monitoru (např. 48 Hz v LFC range) – mimo VRR rozsah způsobí flicker. (2) HDMI limitace: FreeSync 2 vyžaduje HDMI 2.1 pro plný VRR rozsah;  G-Sync prefer DisplayPort. (3) Monitor firmware bug – výrobci vydávají opravy pro flicker. (4) GPU driver nekompletně implementuje VRR handshake. (5) Nastavení G-Sync není povoleno pro fullscreen i windowed mode. Diagnostika: NVIDIA Control Panel → G-Sync indicator (zelený badge v rohu); FreeSync: AMD Radeon Software → Display → FreeSync stav.",
            en: "G-Sync (NVIDIA proprietary) and FreeSync (AMD open standard, VESA Adaptive-Sync) are Variable Refresh Rate (VRR) technologies that eliminate screen tearing without V-Sync's fixed latency. Technical differences: G-Sync module = dedicated hardware scaler in monitor; G-Sync Compatible = certified Adaptive-Sync without the module; FreeSync Premium Pro adds HDR and Low Framerate Compensation (LFC). Flicker causes: (1) FPS drops below monitor's minimum refresh rate (e.g., 48Hz LFC floor) – out-of-range VRR causes flicker. (2) HDMI limitation: FreeSync 2 requires HDMI 2.1 for full VRR range; G-Sync prefers DisplayPort. (3) Monitor firmware bug – manufacturers release flicker fixes. (4) GPU driver incomplete VRR handshake. (5) G-Sync not enabled for both fullscreen and windowed. Diagnostics: NVIDIA Control Panel → G-Sync indicator (corner badge); AMD Radeon Software → Display → FreeSync status.",
            zh: "G-Sync（NVIDIA 专有）和 FreeSync（AMD 开放标准，VESA 自适应同步）是消除撕裂的可变刷新率（VRR）技术。闪烁原因：(1) 帧率降至显示器最低刷新率以下——超出 VRR 范围导致闪烁；(2) HDMI 限制：FreeSync 2 需要 HDMI 2.1 才能获得完整 VRR 范围；(3) 显示器固件错误；(4) GPU 驱动 VRR 握手不完整；(5) G-Sync 未对全屏和窗口模式启用。诊断：NVIDIA 控制面板 → G-Sync 指示器；AMD Radeon 软件 → 显示 → FreeSync 状态。"
        }
    },

    // =========================================================
    // === BIOS (nové) ===
    // =========================================================
    {
        id: "bios-uefi-boot-order", type: "software", subcategory: "bios",
        code: "UEFI Boot Order Lost / Boot to BIOS Loop",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS / UEFI" },
        description: {
            cs: "PC se opakovaně bootuje do BIOSu nebo Windows odmítá nastartovat po přidání nového disku.",
            en: "PC repeatedly boots into BIOS or Windows refuses to boot after adding a new drive.",
            zh: "PC 反复进入 BIOS 或添加新驱动器后 Windows 拒绝启动。"
        },
        solution: {
            cs: "V BIOSu Boot sekci nastavte Windows Boot Manager jako první prioritu. Zkontrolujte, zda nový disk nepřebírá boot.",
            en: "Set Windows Boot Manager as first priority in BIOS Boot section. Verify the new drive is not overriding boot.",
            zh: "在 BIOS 启动部分将 Windows Boot Manager 设为第一优先级，验证新驱动器是否覆盖了启动。"
        },
        details: {
            cs: "UEFI boot pořadí je uloženo v NVRAM jako seřazená lista Boot#### UEFI variables. Boot Manager hledá EFI systémový oddíl (ESP – obvykle 100–500 MB FAT32) a načte bootloader (bootmgfw.efi). Příčiny bootovací smyčky: (1) Přidání nového disku přidalo nový UEFI boot záznam s vyšší prioritou. (2) BIOS resetoval boot order po CMOS resetu – Windows Boot Manager se ztratil. (3) Fast Boot přeskočil detekci nového disku. (4) Secure Boot zakázal boot záznam podepsaný neduveryhhodným klíčem. (5) EFI partition (ESP) na novém SSD přebírá boot (pokud má vlastní EFI/BOOT/bootx64.efi). Oprava: BIOS → Boot → Boot Override nebo Boot Priority List → přesunout Windows Boot Manager na vrchol; nebo Advanced Boot Options (delete klávesa při startu) → Boot from File → navigujte na ESP oddíl → EFI\\Microsoft\\Boot\\bootmgfw.efi.",
            en: "UEFI boot order is stored in NVRAM as an ordered list of Boot#### UEFI variables. The Boot Manager looks for an EFI System Partition (ESP – typically 100–500MB FAT32) and loads the bootloader (bootmgfw.efi). Boot loop causes: (1) Adding a new drive created a higher-priority UEFI boot entry. (2) BIOS reset the boot order after a CMOS reset – Windows Boot Manager entry was lost. (3) Fast Boot skipped detection of the new drive. (4) Secure Boot rejected a boot entry signed by an untrusted key. (5) EFI partition on the new SSD overrides boot (if it has its own EFI/BOOT/bootx64.efi). Fix: BIOS → Boot → Boot Override or Boot Priority List → move Windows Boot Manager to top; or Advanced Boot Options → Boot from File → navigate to ESP → EFI\\Microsoft\\Boot\\bootmgfw.efi.",
            zh: "UEFI 启动顺序作为 Boot#### UEFI 变量的有序列表存储在 NVRAM 中。启动循环原因：(1) 添加新驱动器创建了优先级更高的 UEFI 启动条目；(2) CMOS 重置后 BIOS 重置了启动顺序——Windows Boot Manager 条目丢失；(3) Fast Boot 跳过了新驱动器的检测；(4) Secure Boot 拒绝了由不受信任密钥签名的启动条目；(5) 新 SSD 上的 EFI 分区覆盖了启动。修复：BIOS → Boot → Boot Override → 将 Windows Boot Manager 移至顶部。"
        }
    },
    {
        id: "bios-overclocking-instability", type: "software", subcategory: "bios",
        code: "Overclock Instability / BIOS Safe Mode Loop",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS / UEFI" },
        description: {
            cs: "Přetaktování způsobí opakovaný restart a BIOS se automaticky resetuje do Safe Mode (bezpečného nastavení).",
            en: "Overclocking causes repeated restarts and BIOS automatically resets to Safe Mode (conservative defaults).",
            zh: "超频导致反复重启，BIOS 自动重置为安全模式（保守的默认设置）。"
        },
        solution: {
            cs: "Snižte OC parametry postupně. Zvyšte napětí či LLC. Používejte stress testy (OCCT, Prime95) pro validaci.",
            en: "Reduce OC parameters gradually. Increase voltage or LLC. Validate with stress tests (OCCT, Prime95, Cinebench).",
            zh: "逐步降低超频参数，提高电压或 LLC，使用压力测试（OCCT、Prime95、Cinebench）验证。"
        },
        details: {
            cs: "BIOS Safe Mode (nebo 'FailSafe Defaults') je automatický mechanismus: po 3 po sobě jdoucích neúspěšných bootech (POST fail nebo crash vyvolaný nestabilitou OC) BIOS automaticky obnoví bezpečné hodnoty. Na ASUS deskách se zobrazí 'The system booted in safe mode because incorrect BIOS settings were applied'. Metodika stabilního přetaktování: (1) Zvyšte frekvenci o 100 MHz krokůjte a testujte minimálně 30 min OCCT CPU Power před dalším krokem. (2) Po každém navýšení frekvence zkontrolujte teploty a Vdroop. (3) Prime95 Small FFT = nejnáročnější stres test (teplo, napětí). Cinebench R23 = reprezentativní workload test. OCCT CPU = kombinovaný test. (4) Pro OC paměti RAM: TestMem5 (TM5) s anta777 ExtremeCPU.cfg profilem po každé úpravě timingů. Bezpečnostní limity: Intel Raptor Lake – Intel doporučuje nepřekračovat 1.36V Vcore; AMD Ryzen 7000 – max 1.45V Vcore.",
            en: "BIOS Safe Mode (or 'FailSafe Defaults') is an automatic mechanism: after 3 consecutive failed boots (POST fail or OC-instability crash), BIOS automatically restores conservative values. On ASUS boards it shows: 'The system booted in safe mode because incorrect BIOS settings were applied'. Stable overclocking methodology: (1) Increase frequency in 100MHz steps and test with OCCT CPU Power for at least 30 minutes before proceeding. (2) After each frequency increase, check temperatures and voltage droop. (3) Prime95 Small FFT = most demanding (heat + voltage); Cinebench R23 = representative workload; OCCT CPU = combined test. (4) For RAM OC: TestMem5 with anta777 ExtremeCPU.cfg profile after each timing change. Safety limits: Intel Raptor Lake – Intel recommends staying below 1.36V Vcore; AMD Ryzen 7000 – max 1.45V Vcore.",
            zh: "BIOS 安全模式（或'故障安全默认值'）是自动机制：连续 3 次启动失败后（POST 失败或超频不稳定崩溃），BIOS 自动恢复保守值。稳定超频方法：(1) 每次增加 100MHz 频率并用 OCCT CPU Power 测试至少 30 分钟；(2) 每次增加频率后检查温度和电压跌落；(3) Prime95 Small FFT = 最苛刻（热量+电压）；Cinebench R23 = 代表性工作负载；(4) 内存超频：每次调整时序后使用 TM5 with anta777 配置文件。安全限制：Intel RPL <1.36V Vcore；AMD Ryzen 7000 <1.45V。"
        }
    },

    // =========================================================
    // === DRIVERS (nové) ===
    // =========================================================
    {
        id: "drv-printer", type: "software", subcategory: "drivers",
        code: "Printer Spooler Error / Printer Offline",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "Tiskárna se zobrazuje jako offline nebo tisk selže – Print Spooler service nebo ovladač je poškozen.",
            en: "Printer shows as offline or print jobs fail – Print Spooler service or driver is corrupted.",
            zh: "打印机显示为离线或打印作业失败——打印机假脱机服务或驱动程序损坏。"
        },
        solution: {
            cs: "Restartujte Print Spooler (services.msc). Vymažte spooler frontu. Přeinstalujte tiskový ovladač.",
            en: "Restart Print Spooler via services.msc. Clear spooler queue. Reinstall printer driver.",
            zh: "通过 services.msc 重启打印机假脱机程序，清除假脱机队列，重新安装打印机驱动程序。"
        },
        details: {
            cs: "Windows Print Spooler (spoolsv.exe) je service spravující tiskové fronty a komunikaci s tiskárnou přes tiskový ovladač. Chyba spooleru je kritická protože crashuje celou tiskovou funkcionalitu. Příčiny: (1) Poškozená tisková úloha zůstala zablokována ve frontě – zastavte Spooler, smažte C:\\Windows\\System32\\spool\\PRINTERS\\*, restartujte Spooler. (2) Vadný tiskový ovladač způsobující crash spoolsv.exe – odinstalujte ovladač přes PrintManagement.msc. (3) Tiskárna je nastavena jako offline v nastavení tisku (Use Printer Offline) – klikněte pravým tlačítkem → See What's Printing → Printer menu → odtrhněte Use Printer Offline. (4) Tiskárna připojená přes Wi-Fi změní IP adresu přes DHCP – tiskárna bude nedostupná dokud neobnoví IP ve Windows. Prevence: nastavte statickou IP tiskárně nebo DHCP reservation v routeru; nainstalujte správný ovladač (ne generický).",
            en: "Windows Print Spooler (spoolsv.exe) is the service managing print queues and printer communication via the print driver. A spooler crash disables all printing. Causes: (1) Corrupted print job stuck in queue – stop Spooler, delete C:\\Windows\\System32\\spool\\PRINTERS\\*, restart Spooler. (2) Buggy print driver crashing spoolsv.exe – uninstall via PrintManagement.msc. (3) Printer set to offline in print settings – right-click → See What's Printing → Printer menu → uncheck Use Printer Offline. (4) Wi-Fi-connected printer changes IP via DHCP – printer becomes unreachable until Windows refreshes. Prevention: assign a static IP or DHCP reservation in router; install the correct driver (not generic).",
            zh: "Windows 打印机假脱机程序（spoolsv.exe）是管理打印队列和通过打印驱动程序与打印机通信的服务。原因：(1) 损坏的打印作业卡在队列中——停止假脱机程序，删除 C:\\Windows\\System32\\spool\\PRINTERS\\*，重启服务；(2) 有缺陷的打印驱动程序导致 spoolsv.exe 崩溃；(3) 打印机设置为'使用离线打印机'；(4) Wi-Fi 连接的打印机通过 DHCP 更改 IP。预防：为打印机分配静态 IP 或 DHCP 保留；安装正确的驱动程序。"
        }
    },
    {
        id: "drv-gpu-opencl", type: "software", subcategory: "drivers",
        code: "OpenCL / CUDA Compute Error",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "AI, rendering nebo vědecké aplikace hlásí OpenCL nebo CUDA chybu – GPU compute pipeline selhala.",
            en: "AI, rendering, or scientific applications report OpenCL or CUDA error – GPU compute pipeline failed.",
            zh: "AI、渲染或科学应用程序报告 OpenCL 或 CUDA 错误——GPU 计算管线失败。"
        },
        solution: {
            cs: "Přeinstalujte CUDA Toolkit. Aktualizujte GPU ovladač. Ověřte VRAM kapacitu pro daný model.",
            en: "Reinstall CUDA Toolkit. Update GPU driver. Verify VRAM capacity matches model requirements.",
            zh: "重新安装 CUDA Toolkit，更新 GPU 驱动程序，验证显存容量是否满足模型要求。"
        },
        details: {
            cs: "CUDA (NVIDIA) a OpenCL (otevřený standard) jsou GPU compute frameworky pro paralelní výpočty. CUDA pracuje výhradně na NVIDIA GPU; OpenCL podporuje NVIDIA, AMD a Intel. Příčiny compute chyb: (1) CUDA verze nesoulad – aplikace vyžaduje CUDA 12.x ale nainstalováno je CUDA 11.x; CUDA není zpětně kompatibilní pro compute (každá CUDA verze vyžaduje minimální verzi ovladače). (2) VRAM overflow – modely umělé inteligence (LLaMA, Stable Diffusion) vyžadují specifické VRAM; při nedostatku VRAM nastane CUDA out of memory error. (3) Poškozená CUDA instalace – přeinstalujte přes NVIDIA CUDA Toolkit installer. (4) OpenCL runtime chyba při AMD – amdocl.dll verze nesouhlasí s GPU architekturou. (5) Multi-GPU setup (SLI/NVLink) – compute aplikace musí explicitně cílit konkrétní GPU přes CUDA_VISIBLE_DEVICES env variable. Diagnostika: 'nvidia-smi' zobrazí GPU stav, VRAM a CUDA verzi; 'clinfo' (OpenCL info tool) zobrazí dostupné platformy.",
            en: "CUDA (NVIDIA) and OpenCL (open standard) are GPU compute frameworks for parallel computing. CUDA exclusively targets NVIDIA GPUs; OpenCL supports NVIDIA, AMD, and Intel. Compute error causes: (1) CUDA version mismatch – app requires CUDA 12.x but CUDA 11.x is installed; CUDA is not backward-compatible for compute (each CUDA version requires a minimum driver version). (2) VRAM overflow – AI models (LLaMA, Stable Diffusion) require specific VRAM; insufficient VRAM triggers a CUDA out-of-memory error. (3) Corrupted CUDA installation – reinstall via NVIDIA CUDA Toolkit installer. (4) OpenCL runtime error on AMD – amdocl.dll version mismatch with GPU architecture. (5) Multi-GPU setup – compute apps must explicitly target a GPU via the CUDA_VISIBLE_DEVICES env variable. Diagnostics: 'nvidia-smi' shows GPU status, VRAM, and CUDA version; 'clinfo' shows available OpenCL platforms.",
            zh: "CUDA（NVIDIA）和 OpenCL（开放标准）是用于并行计算的 GPU 计算框架。计算错误原因：(1) CUDA 版本不匹配——应用程序需要 CUDA 12.x 但安装的是 CUDA 11.x；(2) 显存溢出——AI 模型需要特定显存，显存不足触发 CUDA out-of-memory 错误；(3) CUDA 安装损坏；(4) AMD 上 OpenCL 运行库错误；(5) 多 GPU 设置——计算应用程序必须通过 CUDA_VISIBLE_DEVICES 明确指定 GPU。诊断：'nvidia-smi'显示 GPU 状态；'clinfo'显示可用平台。"
        }
    },

    // =========================================================
    // === COOLING / THERMAL ===
    // =========================================================
    {
        id: "cool-cpu-throttle", type: "hardware", subcategory: "cpu",
        code: "CPU Thermal Throttling / TjMax Reached",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "Procesor snižuje frekvenci pod základní takt kvůli přehřátí – výkon je dramaticky omezen.",
            en: "CPU drops below base clock due to overheating – performance is drastically reduced.",
            zh: "CPU 因过热降至基准频率以下——性能大幅下降。"
        },
        solution: {
            cs: "Vyčistěte chladič od prachu. Vyměňte teplovodivou pastu (Thermal Grizzly Kryonaut). Zkontrolujte otáčky větrák.",
            en: "Clean cooler dust. Replace thermal paste (Thermal Grizzly Kryonaut). Verify fan RPM in BIOS/HWInfo64.",
            zh: "清除散热器灰尘，更换导热硅脂（Thermal Grizzly Kryonaut），检查 BIOS/HWInfo64 中的风扇转速。"
        },
        details: {
            cs: "Thermal Throttling (tepelné škrcení) nastane, když teplota čipu dosáhne TjMax (Thermal Junction Maximum) – u Intel 12–14. gen je TjMax 100 °C, u AMD Ryzen 5000/7000 je Tdie_max 95 °C. Mechanismus: CPU snižuje násobič (Intel) nebo frekvenci (AMD PBO) o 100–200 MHz za každý stupeň nad TjMax, dokud teplota neklese. Příčiny: (1) Vyčerpání teplovodivé pasty – pasta vysychá a ztrácí vodivost po 3–5 letech. Doporučena výměna: Thermal Grizzly Kryonaut (6 W/mK) nebo Thermal Grizzly Conductonaut Extreme (kapalný kov, 73 W/mK – NELZE na AMD AM5 kvůli hliníkovému IHS). (2) Zanesený chladič prachem – žebra zakrytá prachem zvyšují odpor vzduchového proudění. Čistěte stlačeným vzduchem každých 6–12 měsíců. (3) Nedostatečný kontakt chladiče s IHS – nerovnoměrné dotažení šroubů nebo deformace základní desky (Intel LGA 1700 bow issue). (4) Case airflow – pozitivní tlak (více přívodů než výfuků) nebo negativní tlak; ideální: vyrovnaný tok s případným mírným pozitivním tlakem. Monitoring: HWInfo64 → CPU Temperature, CPU Throttling (zkratka THRM v sensor listu); Intel XTU zobrazí Thermal Throttle v % podílu; AMD Ryzen Master zobrazí Peak Temperature.",
            en: "Thermal throttling occurs when chip temperature reaches TjMax (Thermal Junction Maximum) – Intel 12th–14th Gen: TjMax = 100°C; AMD Ryzen 5000/7000: Tdie_max = 95°C. Mechanism: the CPU reduces its multiplier (Intel) or frequency (AMD PBO) by 100–200MHz per degree above TjMax until temps drop. Causes: (1) Dried thermal paste – paste loses conductivity after 3–5 years; replace with Thermal Grizzly Kryonaut (6 W/mK) or Conductonaut Extreme (73 W/mK liquid metal – NOT for AMD AM5 due to aluminium IHS). (2) Dust-clogged cooler – dust-filled fins raise airflow resistance; clean with compressed air every 6–12 months. (3) Poor cooler-IHS contact – uneven screw torque or motherboard flex (Intel LGA 1700 bow). (4) Case airflow – positive pressure (more intakes than exhausts) vs negative; ideal: balanced or slight positive pressure. Monitoring: HWInfo64 → CPU Temperature + CPU Throttling sensor; Intel XTU shows Thermal Throttle %; AMD Ryzen Master shows Peak Temperature.",
            zh: "热降频发生在芯片温度达到 TjMax（热接点最高温度）时——Intel 12–14 代：TjMax = 100°C；AMD Ryzen 5000/7000：Tdie_max = 95°C。机制：CPU 每超过 TjMax 一度就降低 100–200MHz 频率直到温度下降。原因：(1) 导热硅脂干涸——3–5 年后硅脂失去导热性，更换 Thermal Grizzly Kryonaut（6 W/mK）或 Conductonaut Extreme（73 W/mK 液态金属，不可用于 AMD AM5 铝制 IHS）；(2) 散热器被灰尘堵塞——每 6–12 个月用压缩空气清洁；(3) 散热器与 IHS 接触不良；(4) 机箱气流不平衡。监控：HWInfo64 → CPU 温度 + CPU 降频传感器。"
        }
    },
    {
        id: "cool-gpu-overheat", type: "hardware", subcategory: "gpu",
        code: "GPU Overheating / Hotspot Temperature Warning",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "GPU nebo jeho hotspot (Memory Junction) překračuje bezpečné limity – artefakty nebo shutdown.",
            en: "GPU or its hotspot (Memory Junction) exceeds safe limits – artifacts or emergency shutdown.",
            zh: "GPU 或其热点（显存结点温度）超过安全限制——出现伪影或紧急关机。"
        },
        solution: {
            cs: "Vyčistěte GPU chladič. Nastavte vlastní fan curve v MSI Afterburner. Vyměňte teplovodivé podložky (thermal pads).",
            en: "Clean GPU heatsink. Set custom fan curve in MSI Afterburner. Replace GPU thermal pads.",
            zh: "清洁 GPU 散热片，在 MSI Afterburner 中设置自定义风扇曲线，更换 GPU 导热垫。"
        },
        details: {
            cs: "Moderní GPU mají dva klíčové teplotní senzory: GPU Die Temperature a GPU Hotspot (nebo Memory Junction pro GDDR6X). GDDR6X paměti (RTX 3080, 4080, 4090) mají samostatný senzor Memory Temperature a jejich bezpečný limit je ~105 °C. Příčiny přehřívání: (1) Zanesený GPU chladič prachem – žebra heatsink zablokována. (2) Vyschlé nebo chybějící thermal pads na VRAM čipech nebo VRM – po 3–5 letech thermal pads ztrácejí tloušťku a vodivost. Výměna: 1.0–2.0 mm pads dle tloušťky (Thermal Grizzly Minus Pad 8 doporučená). (3) Nedostatečný airflow v case – GPU umístěna v uzavřeném segmentu skříně bez přívodu vzduchu. (4) GPU throttluje kvůli Power Limit (PL) – RTX 4090 FE throttluje při 83 °C GPU temp (Power Thermal Throttle). MSI Afterburner: nastavte fan curve 50% při 60°C, 100% při 80°C; sledujte Temperature, Hotspot, Memory Temperature senzory.",
            en: "Modern GPUs have two key thermal sensors: GPU Die Temperature and GPU Hotspot (or Memory Junction for GDDR6X). GDDR6X memory (RTX 3080, 4080, 4090) has a separate Memory Temperature sensor with a safe limit of ~105°C. Overheating causes: (1) Dust-clogged GPU heatsink. (2) Dried or missing thermal pads on VRAM chips or VRMs – pads lose thickness and conductivity after 3–5 years; replace with 1.0–2.0mm pads (Thermal Grizzly Minus Pad 8 recommended). (3) Insufficient case airflow – GPU in an enclosed area with no intake air. (4) GPU throttles due to Power Limit – RTX 4090 FE throttles at 83°C GPU temp (Power Thermal Throttle). MSI Afterburner: set fan curve 50% at 60°C, 100% at 80°C; monitor Temperature, Hotspot, and Memory Temperature sensors.",
            zh: "现代 GPU 有两个关键热传感器：GPU 核心温度和 GPU 热点温度（GDDR6X 的显存结点温度）。GDDR6X 显存（RTX 3080、4080、4090）有独立的显存温度传感器，安全限制约 105°C。过热原因：(1) GPU 散热片被灰尘堵塞；(2) VRAM 芯片或 VRM 上的导热垫干涸或缺失——3–5 年后更换 1.0–2.0mm 导热垫（推荐 Thermal Grizzly Minus Pad 8）；(3) 机箱气流不足；(4) GPU 因功耗限制降频——RTX 4090 FE 在 83°C 时降频。MSI Afterburner：设置自定义风扇曲线。"
        }
    },
    {
        id: "cool-aio-pump", type: "hardware", subcategory: "cpu",
        code: "AIO Liquid Cooler Pump Failure / No Cooling",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "Vodní chlazení (AIO) nepřenáší teplo – čerpadlo nefunguje nebo je vzduch v systému.",
            en: "AIO liquid cooler is not transferring heat – pump is not running or air bubble in loop.",
            zh: "AIO 液冷未传热——泵未运行或回路中有气泡。"
        },
        solution: {
            cs: "Ověřte obrátek čerpadla v HWInfo64/HWMonitor. Zapojte pump header na CPU_OPT nebo AIO_PUMP. Nakloňte skříň.",
            en: "Verify pump RPM in HWInfo64. Connect pump to CPU_OPT or AIO_PUMP header (not SYS_FAN). Tilt case to clear air bubble.",
            zh: "在 HWInfo64 中验证泵转速，将泵接头连接到 CPU_OPT 或 AIO_PUMP（而非 SYS_FAN），倾斜机箱排除气泡。"
        },
        details: {
            cs: "AIO (All-In-One) uzavřené vodní chlazení obsahuje čerpadlo, radiátor, hadičky a blok na CPU. Selhání čerpadla způsobí dramatické přehřátí (CPU na 100°C za sekundy). Příčiny: (1) Čerpadlo zapojeno do SYS_FAN headeru s výchozím PWM profilem, který ho podnapájí – zapojte do CPU_OPT nebo AIO_PUMP (vždy plné napájení). (2) Vzduchová bublina v smyčce – projevuje se bublající hlukem; nakloňte skříň na 45° a jemně zatřeste aby se bublina přesunula k radiátoru. (3) Čerpadlo selhalo fyzicky – projevuje se 0 RPM v senzoru; BIOS alarm při nízkých otáčkách CPU Fan. (4) Chladivo se odpařilo – AIO jsou hermeticky uzavřené ale po 5–7 letech může chladivo poklesnout. Diagnostika: HWInfo64 → CPU Cooler Pump Speed (RPM); BIOS → Hardware Monitor → nastavte Fan Fail Warning pro pump header; pokud GPU je na vodě: GPU Water Pump senzor. Životnost AIO: Corsair/NZXT/be quiet! garantují 5–6 let za normálního provozu.",
            en: "AIO (All-In-One) closed-loop coolers contain a pump, radiator, tubes, and CPU block. Pump failure causes dramatic overheating (CPU reaches 100°C in seconds). Causes: (1) Pump connected to a SYS_FAN header with a default PWM profile that undervolts it – connect to CPU_OPT or AIO_PUMP (always full power). (2) Air bubble in the loop – presents as bubbling noise; tilt the case 45° and gently shake to move the bubble toward the radiator. (3) Physical pump failure – shows as 0 RPM in sensors; BIOS alarms on low CPU Fan RPM. (4) Coolant evaporation – AIOs are sealed but coolant level can drop after 5–7 years. Diagnostics: HWInfo64 → CPU Cooler Pump Speed; BIOS → Hardware Monitor → set Fan Fail Warning for pump header. AIO lifespan: Corsair/NZXT/be quiet! guarantee 5–6 years under normal operation.",
            zh: "AIO 封闭式液冷包含泵、散热排、软管和 CPU 水冷头。泵故障导致急剧过热（CPU 在几秒内达到 100°C）。原因：(1) 泵连接到具有默认 PWM 配置的 SYS_FAN 接头导致欠压——连接到 CPU_OPT 或 AIO_PUMP（始终全功率）；(2) 回路中有气泡——呈现冒泡声，倾斜机箱 45° 轻轻摇晃将气泡移向散热排；(3) 泵物理故障——传感器显示 0 RPM；(4) 冷却液蒸发——5–7 年后液面可能下降。诊断：HWInfo64 → CPU 泵转速。"
        }
    },

    // =========================================================
    // === LAPTOP-SPECIFIC ===
    // =========================================================
    {
        id: "lap-battery-calibration", type: "hardware", subcategory: "mb",
        code: "Laptop Battery Not Charging / Stuck at 80%",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "Baterie notebooku se nenabíjí nad 80 % nebo vůbec – Battery Care Mode nebo vadná baterie.",
            en: "Laptop battery won't charge above 80% or at all – Battery Care Mode enabled or degraded battery.",
            zh: "笔记本电池无法充电超过 80% 或完全不充电——电池保护模式已启用或电池已退化。"
        },
        solution: {
            cs: "Zkontrolujte Battery Care / Conservation Mode v nastavení (ASUS Armory, Lenovo Vantage). Kalibrujte baterii.",
            en: "Check Battery Care / Conservation Mode in vendor software (ASUS Armory, Lenovo Vantage, HP Command Center). Calibrate battery.",
            zh: "检查制造商软件中的电池保护/节能模式（ASUS Armory、Lenovo Vantage、HP Command Center），校准电池。"
        },
        details: {
            cs: "Li-Ion baterie degraduje nejrychleji při nabíjení na 100% a vybíjení na 0%. Výrobci implementují Battery Care Mode (nazývaný také Conservation Mode, Optimized Battery Charging nebo Battery Health Mode), který omezí nabíjení na 60–80% pro prodloužení životnosti. Stavy: (1) Battery Care Mode aktivní – laptop se automaticky zastaví nabíjení na nastavené mezní hodnotě. Vypněte nebo upravte v: ASUS: MyASUS / Armoury Crate → Battery Care Mode; Lenovo: Lenovo Vantage → Power → Battery Charge Threshold; HP: HP Command Center → Power Mode; Dell: Dell Power Manager. (2) Baterie vykazuje špatnou kapacitu – Windows Battery Report: 'powercfg /batteryreport' zobrazí Design Capacity vs Full Charge Capacity; pokles pod 80% = doporučená výměna. (3) Vadný nabíjecí čip nebo konektor – fyzické poškození USB-C nebo barrel DC jacku. (4) Nekompatibilní nabíječ – nižší wattáž než TDP notebooku způsobí nabíjení jen za nečinnosti nebo vůbec. Diagnostika: 'powercfg /batteryreport'; Device Manager → Batteries → Microsoft ACPI-Compliant Control Method Battery.",
            en: "Li-Ion batteries degrade fastest when regularly charged to 100% and discharged to 0%. Manufacturers implement Battery Care Mode (also Called Conservation Mode, Optimized Battery Charging, or Battery Health Mode), which limits charging to 60–80% to extend lifespan. States: (1) Battery Care Mode active – laptop automatically stops charging at the configured threshold. Disable/adjust in: ASUS: MyASUS / Armoury Crate → Battery Care Mode; Lenovo: Lenovo Vantage → Power → Battery Charge Threshold; HP: HP Command Center; Dell: Dell Power Manager. (2) Battery showing poor capacity – Windows Battery Report: 'powercfg /batteryreport' shows Design Capacity vs Full Charge Capacity; below 80% = recommended replacement. (3) Faulty charging IC or connector – physical damage to USB-C or barrel DC jack. (4) Incompatible charger – lower wattage than laptop TDP means it only charges at idle or not at all. Diagnostics: 'powercfg /batteryreport'; Device Manager → Batteries.",
            zh: "锂离子电池在频繁充至 100% 和放至 0% 时退化最快。制造商实现电池保护模式（也称节能模式、优化电池充电或电池健康模式），将充电限制在 60–80% 以延长寿命。状态：(1) 电池保护模式启用——在各制造商软件中调整；(2) 电池容量差——Windows 电池报告：'powercfg /batteryreport' 显示设计容量与完全充电容量，低于 80% 建议更换；(3) 充电 IC 或连接器故障；(4) 不兼容充电器——功率低于笔记本 TDP。诊断：'powercfg /batteryreport'。"
        }
    },
    {
        id: "lap-screen-flicker", type: "hardware", subcategory: "gpu",
        code: "Laptop Screen Flickering / eDP Signal Loss",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "Obrazovka notebooku bliká nebo na určitém úhlu zhasne – uvolněný eDP kabel nebo vadný panel.",
            en: "Laptop screen flickers or goes dark at certain angles – loose eDP cable or failing panel.",
            zh: "笔记本屏幕闪烁或在特定角度变黑——eDP 线缆松动或面板故障。"
        },
        solution: {
            cs: "Otevřete a uzavřete víko na různých úhlech – pokud flicker závisí na úhlu, jde o kabel. Připojte externí monitor pro ověření GPU.",
            en: "Open and close lid at various angles – angle-dependent flicker = cable issue. Connect external monitor to verify GPU is working.",
            zh: "以不同角度开合屏幕盖——依赖角度的闪烁=线缆问题，连接外部显示器验证 GPU 是否正常工作。"
        },
        details: {
            cs: "Laptop displej je připojen k GPU přes eDP (embedded DisplayPort) kabel, který prochází pantem. Každé otevření/zavření víka ohýbá kabel a postupně ho poškodí. Detekce: (1) Flicker závisí na úhlu víka → eDP kabel. (2) Flicker je systematický (každých X sekund) bez ohledu na úhel → vadný panel backlight (WLED driver) nebo panel samotný. (3) Flicker zmizí při připojení externího monitoru → panel/kabel, ne GPU. (4) Flicker přetrvává na externím monitoru → GPU nebo ovladač. PWM Flickering: levné IPS a TN panely používají PWM (Pulse Width Modulation) pro ztmavení podsvícení – způsobuje flickering při nízkém jasu (120–1000 Hz). Diagnostika: Flicker-free tester app nebo kamera na 240 fps. Řešení PWM: nastavte jas na 100% a externě regulujte pomocí brýlí nebo fyzického ztmavovacího filtru; nebo kupte DC-dimming panel. Oprava eDP kabelu: vyžaduje disassembly, náhradní díl 5–30 EUR na aliexpress dle modelu.",
            en: "The laptop display is connected to the GPU via an eDP (embedded DisplayPort) cable that runs through the hinge. Each lid open/close cycle bends the cable and gradually damages it. Detection: (1) Flicker is angle-dependent → eDP cable. (2) Flicker is systematic (every X seconds regardless of angle) → faulty panel backlight (WLED driver) or panel itself. (3) Flicker disappears on external monitor → panel/cable, not GPU. (4) Flicker persists on external monitor → GPU or driver. PWM Flickering: budget IPS and TN panels use PWM (Pulse Width Modulation) for dimming – causes flickering at low brightness (120–1000 Hz). Diagnostics: Flicker-free tester app or 240fps camera. PWM solution: set brightness to 100% and use physical dimming filters; or buy a DC-dimming panel. eDP cable repair: requires disassembly; replacement part typically €5–30 on AliExpress depending on model.",
            zh: "笔记本显示屏通过穿过转轴的 eDP（嵌入式 DisplayPort）线缆连接到 GPU。每次开合屏幕盖都会弯曲线缆逐渐损坏它。检测：(1) 闪烁与角度相关 → eDP 线缆；(2) 系统性闪烁（每 X 秒，与角度无关）→ 面板背光（WLED 驱动器）或面板本身故障；(3) 外部显示器上闪烁消失 → 面板/线缆，非 GPU；(4) 外部显示器上闪烁持续 → GPU 或驱动程序。PWM 闪烁：廉价面板使用 PWM 调光，在低亮度下引起闪烁。eDP 线缆更换：需要拆解，备件约 5–30 欧元。"
        }
    },
    {
        id: "lap-thermal-paste-repaste", type: "hardware", subcategory: "cpu",
        code: "Laptop CPU/GPU Repaste Required",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "Notebook je po 2–4 letech výrazně pomalejší a hlučnější – teplovodivá pasta zaschla.",
            en: "Laptop is noticeably slower and louder after 2–4 years – thermal paste has dried out.",
            zh: "笔记本 2–4 年后明显变慢变吵——导热硅脂已干涸。"
        },
        solution: {
            cs: "Proveďte repaste CPU a GPU (Thermal Grizzly Kryonaut). Po výkonu ověřte HWInfo64 teploty.",
            en: "Repaste CPU and GPU with quality paste (Thermal Grizzly Kryonaut). Verify temps in HWInfo64 after repaste.",
            zh: "用优质硅脂（Thermal Grizzly Kryonaut）重新涂抹 CPU 和 GPU 导热硅脂，重涂后在 HWInfo64 中验证温度。"
        },
        details: {
            cs: "Notebooky jsou zvláště náchylné na zhoršení tepelné pasty kvůli: (1) Malým chladičům s vysokým tepelným odporem – každý °C teplotního rozhraní je zesílen. (2) Vysokému tepelnému cyklistice (ohřev/chlazení mnohem rychleji než stolní PC – přenosnost). (3) Větší vzdálenosti od chladiče ke GPU die (výsledek integrovaných laptopových modulů). Metodika repaste: (a) Zjistěte servisní příručku (iFixit.com nebo výrobcův web). (b) Odstraňte starou pastu isopropylalkoholem 99% + bavlněnou vatou. (c) Naneste novou pastu metodou dot center (středová kapka) nebo přímá linie pro dlouhé obdélníkové die. (d) Zkontrolujte thermal pads na VRAM a VRM – viz záložka GPU pro detaily. Výsledek: typicky 10–25°C snížení teplot po repastu. Garantované zhoršení pasty u laptopů (Kryonaut): 2–3 roky při intenzivním provozu. Pro herní notebooky zvažte liquid metal (Conductonaut Extreme) – vyžaduje zkušenosti, nelze nanést na AM (aluminium) IHS.",
            en: "Laptops are particularly susceptible to thermal paste degradation due to: (1) Small heatsinks with high thermal resistance – every °C at the thermal interface is amplified. (2) High thermal cycling (heat/cool faster than desktop PCs due to mobility). (3) Greater distance from heatsink to GPU die (result of integrated laptop modules). Repaste methodology: (a) Find the service manual (iFixit.com or manufacturer site). (b) Remove old paste with 99% isopropyl alcohol + cotton swabs. (c) Apply new paste using dot-center or direct-line method for elongated rectangular dies. (d) Check thermal pads on VRAM and VRM – see GPU entry for details. Results: typically 10–25°C drop after repaste. Guaranteed paste degradation for laptops (Kryonaut): 2–3 years under heavy use. For gaming laptops consider liquid metal (Conductonaut Extreme) – requires experience; cannot be used on aluminium IHS.",
            zh: "笔记本特别容易受到导热硅脂退化影响：(1) 小散热器热阻高——热接口每 1°C 都被放大；(2) 高热循环（移动性导致比台式机更快加热/冷却）；(3) 散热器到 GPU 核心距离更大。重涂方法：(a) 查找维修手册（iFixit.com 或制造商网站）；(b) 用 99% 异丙醇棉签去除旧硅脂；(c) 用点状或直线法涂抹新硅脂；(d) 检查 VRAM 和 VRM 上的导热垫。结果：重涂后通常降低 10–25°C。重涂建议周期：2–3 年（重度使用）。"
        }
    },

    // =========================================================
    // === AUDIO ===
    // =========================================================
    {
        id: "audio-asio-latency", type: "software", subcategory: "drivers",
        code: "Audio Latency / ASIO Buffer Underrun",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "Zvukové nahrávání nebo přehrávání přes DAW má praskání a výpadky – ASIO buffer underrun.",
            en: "Audio recording or playback via DAW has crackling and dropouts – ASIO buffer underrun.",
            zh: "通过 DAW 录音或播放时有噼啪声和中断——ASIO 缓冲区欠载。"
        },
        solution: {
            cs: "Zvyšte ASIO buffer size (256→512 samples). Aktivujte WASAPI Exclusive Mode. Zakažte USB power saving.",
            en: "Increase ASIO buffer size (256→512 samples). Enable WASAPI Exclusive Mode. Disable USB power management.",
            zh: "增加 ASIO 缓冲区大小（256→512 采样），启用 WASAPI 独占模式，禁用 USB 电源管理。"
        },
        details: {
            cs: "ASIO (Audio Stream Input/Output) je profesionální audio standard pro Windows umožňující nízkolatenční přístup k audio hardware bez Windows Audio Stack. Buffer underrun nastane, kdy audio engine nemůže dodat audio data do bufferu dostatečně rychle (CPU nestíhá nebo je přerušen). Latence = buffer size / sample rate; příklad: 256 samples při 44.1 kHz = 5.8 ms round-trip. Příčiny underrunů: (1) CPU load spikes způsobující přerušení audio threadu (DPC latency). Diagnostika: LatencyMon (freeware) ukáže problematické drivery způsobující DPC (Deferred Procedure Call) latence > 1000 μs. (2) USB 2.0 audio interface sdílí interrupt s jiným USB hubem – přesuňte na dedikovaný USB port přímo na základní desce. (3) Wi-Fi nebo Bluetooth driver způsobující DPC latency spiky. (4) Windows power plan – nastavte 'High Performance' pro minimalizaci CPU frequency scaling. (5) GPU driver DPC latency (nvlddmkm.sys nebo amdkmdag.sys) – upgrade GPU driveru nebo použijte DDU (Display Driver Uninstaller) pro čistou instalaci. ASIO4ALL: je wrapper pro WDM drivery – použijte nativní ASIO driver od výrobce interface pro nejlepší výsledky.",
            en: "ASIO (Audio Stream Input/Output) is a professional Windows audio standard enabling low-latency access to audio hardware, bypassing the Windows Audio Stack. Buffer underruns occur when the audio engine cannot deliver audio data to the buffer quickly enough (CPU is too busy or interrupted). Latency = buffer size / sample rate; example: 256 samples at 44.1kHz = 5.8ms round-trip. Underrun causes: (1) CPU load spikes interrupting the audio thread (DPC latency). Diagnostics: LatencyMon (freeware) shows problematic drivers causing DPC (Deferred Procedure Call) latencies > 1000μs. (2) USB 2.0 audio interface shares interrupt with another hub – move to a dedicated USB port on the motherboard. (3) Wi-Fi or Bluetooth driver causing DPC latency spikes. (4) Windows power plan – set 'High Performance' to minimize CPU frequency scaling. (5) GPU driver DPC latency (nvlddmkm.sys or amdkmdag.sys) – update GPU driver or use DDU for a clean install. ASIO4ALL: is a WDM driver wrapper – use the native ASIO driver from the interface manufacturer for best results.",
            zh: "ASIO（音频流输入/输出）是 Windows 专业音频标准，可绕过 Windows 音频栈实现低延迟访问音频硬件。缓冲区欠载发生在音频引擎无法足够快地向缓冲区提供数据时。延迟 = 缓冲区大小 / 采样率；例：44.1kHz 下 256 样本 = 5.8ms 往返。欠载原因：(1) CPU 负载尖峰中断音频线程（DPC 延迟）——使用 LatencyMon 诊断；(2) USB 2.0 音频接口与其他集线器共享中断；(3) Wi-Fi 或蓝牙驱动引起 DPC 延迟尖峰；(4) Windows 电源计划——设置'高性能'；(5) GPU 驱动 DPC 延迟。"
        }
    },
    {
        id: "audio-spatial", type: "software", subcategory: "drivers",
        code: "Windows Sonic / Dolby Atmos Audio Not Working",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "Prostorový zvuk (Windows Sonic, Dolby Atmos) nefunguje nebo způsobuje zhoršenou kvalitu zvuku.",
            en: "Spatial audio (Windows Sonic, Dolby Atmos) not working or causing degraded audio quality.",
            zh: "空间音频（Windows Sonic、Dolby Atmos）不工作或导致音质下降。"
        },
        solution: {
            cs: "Restartujte Windows Audio service. Zkontrolujte exkluzivní přístup ke zvukovému zařízení. Přeinstalujte Dolby Access.",
            en: "Restart Windows Audio service. Check exclusive access settings on audio device. Reinstall Dolby Access app.",
            zh: "重启 Windows Audio 服务，检查音频设备的独占访问设置，重新安装 Dolby Access 应用。"
        },
        details: {
            cs: "Windows Sonic je vestavěný prostorový zvukový engine Microsoftu (HDR binaural rendering přes sluchátka). Dolby Atmos a DTS:X jsou komerční alternativy. Technicky: prostorový zvuk funguje jako APO (Audio Processing Object) vložený do Windows Audio pipeline (audiodg.exe). Příčiny problémů: (1) APO je neaktivní nebo se nesnaží vzít nad audio – Settings → Sound → Device Properties → Spatial Sound → zvolte Windows Sonic nebo Dolby Atmos. (2) Exclusive mode aplikace (hry, Spotify) obchází APO pipeline – vypněte 'Allow applications to take exclusive control' v Audio device Advanced Properties. (3) Dolby Access app vyžaduje aktivní Microsoft Store licence – bez licence deaktivuje Atmos po trial periodu. (4) 'Dolby Audio' na notebooku je OEM verze bez Atmos – jiná licence než standalone Atmos. (5) HDMI bitstream výstup (Dolby Digital Plus pass-through) vyžaduje AV receiver s Atmos decoder – nelze použít Windows Sonic přes HDMI bitstream. Diagnostika: Settings → Sound → zvolte device → Problém nastaven → check Realtek HD Audio driver APO registration v regsvr.",
            en: "Windows Sonic is Microsoft's built-in spatial audio engine (HDR binaural rendering via headphones). Dolby Atmos and DTS:X are commercial alternatives. Technically: spatial audio works as an APO (Audio Processing Object) inserted into the Windows Audio pipeline (audiodg.exe). Issue causes: (1) APO inactive – Settings → Sound → Device Properties → Spatial Sound → select Windows Sonic or Dolby Atmos. (2) Exclusive mode app (games, Spotify) bypasses the APO pipeline – disable 'Allow applications to take exclusive control' in Audio device Advanced Properties. (3) Dolby Access app requires an active Microsoft Store license – without license, Atmos is disabled after the trial period. (4) Laptop 'Dolby Audio' is an OEM version without Atmos – different license from standalone Atmos. (5) HDMI bitstream output (Dolby Digital Plus pass-through) requires an AV receiver with an Atmos decoder – Windows Sonic cannot be applied over HDMI bitstream. Diagnostics: Settings → Sound → select device → Troubleshoot.",
            zh: "Windows Sonic 是微软内置的空间音频引擎（通过耳机进行 HDR 双耳渲染）。技术上：空间音频作为 APO（音频处理对象）插入 Windows 音频管道（audiodg.exe）。问题原因：(1) APO 未激活——设置→声音→设备属性→空间音效；(2) 独占模式应用绕过 APO 管道；(3) Dolby Access 应用需要有效的 Microsoft Store 许可证；(4) 笔记本上的'Dolby Audio'是没有 Atmos 的 OEM 版本；(5) HDMI 比特流输出需要带 Atmos 解码器的 AV 接收器。"
        }
    },

    // =========================================================
    // === NIC / NETWORK CARD ===
    // =========================================================
    {
        id: "nic-realtek-lag", type: "software", subcategory: "drivers",
        code: "Realtek NIC Latency Spikes / TCP Offload Issues",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "Realtek Ethernet adaptér způsobuje periodické latency spiky nebo výpadky spojení.",
            en: "Realtek Ethernet adapter causes periodic latency spikes or connection drops.",
            zh: "Realtek 以太网适配器导致周期性延迟尖峰或连接中断。"
        },
        solution: {
            cs: "Nainstalujte ovladač přímo z Realtek webu (ne Windows Update). Zakažte Energy-Efficient Ethernet a TCP Offload.",
            en: "Install driver directly from Realtek website (not Windows Update). Disable Energy-Efficient Ethernet and TCP Offload.",
            zh: "直接从 Realtek 官网安装驱动程序（而非 Windows 更新），禁用节能以太网和 TCP 卸载。"
        },
        details: {
            cs: "Realtek je nejrozšířenější NIC chipset na spotřebitelských základních deskách (RTL8125B, RTL8111H). Notoricky trpí latency problémy kvůli: (1) Zastaralý nebo generický Windows Update ovladač – Windows automaticky nainstaluje Realtek ovladač bez vendor-specifických optimalizací. Stáhněte nejnovější z realtek.com. (2) Energy-Efficient Ethernet (EEE / IEEE 802.3az) – NIC přechází do low-power stavu v nečinnosti, způsobující 'wake latency' při obnovení. Vypnutí: Device Manager → NIC → Properties → Advanced → Energy-Efficient Ethernet = Disabled. (3) TCP Checksum Offload / TCP Segmentation Offload – HW-akcelerovaná zpracování paketů někdy způsobují problémy s určitými routery. Vypnutí: Advanced → Large Send Offload v2 (IPv4) a (IPv6) = Disabled; IPv4 Checksum Offload = Disabled. (4) Interrupt Moderation – Realtek shlukuje přerušení pro snížení CPU load, ale přidává latency. Advanced → Interrupt Moderation = Disabled pro nejnižší latenci (za cenu 5-10% CPU). Diagnostika: PingPlotter nebo WinMTR pro sledování mikro-spike latency; Device Manager → NIC → View Properties Event Log.",
            en: "Realtek is the most common NIC chipset on consumer motherboards (RTL8125B, RTL8111H). It notoriously suffers from latency issues due to: (1) Outdated or generic Windows Update driver – Windows auto-installs a Realtek driver without vendor-specific optimizations; download the latest from realtek.com. (2) Energy-Efficient Ethernet (EEE / IEEE 802.3az) – NIC enters a low-power state during idle, causing 'wake latency' on resume; disable in Device Manager → NIC → Properties → Advanced → Energy-Efficient Ethernet = Disabled. (3) TCP Checksum/Segmentation Offload – hardware-accelerated packet processing can cause issues with certain routers; disable Large Send Offload v2 and IPv4 Checksum Offload in Advanced tab. (4) Interrupt Moderation – Realtek batches interrupts to reduce CPU load but adds latency; disable via Advanced → Interrupt Moderation = Disabled for lowest latency (at 5–10% CPU cost). Diagnostics: PingPlotter or WinMTR for micro-spike latency; Device Manager → NIC → Event Log.",
            zh: "Realtek 是消费级主板上最常见的 NIC 芯片组（RTL8125B、RTL8111H），因以下原因有延迟问题：(1) 过旧或通用的 Windows Update 驱动程序——从 realtek.com 下载最新版；(2) 节能以太网（EEE）——NIC 在空闲时进入低功耗状态，恢复时产生'唤醒延迟'，在设备管理器中禁用；(3) TCP 校验和/分段卸载——禁用 Large Send Offload v2 和 IPv4 校验和卸载；(4) 中断调制——禁用可降低延迟但增加 5–10% CPU 负载。诊断：PingPlotter 或 WinMTR。"
        }
    },

    // =========================================================
    // === WINDOWS UPDATE ===
    // =========================================================
    {
        id: "win-update-stuck", type: "software", subcategory: "windows",
        code: "Windows Update Stuck / Error 0x80070002",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Windows Update se zasekne nebo hlásí chybu 0x80070002 – SoftwareDistribution složka je poškozena.",
            en: "Windows Update is stuck or reports error 0x80070002 – SoftwareDistribution folder is corrupted.",
            zh: "Windows 更新卡住或报告错误 0x80070002——SoftwareDistribution 文件夹已损坏。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Spusťte vestavěný průvodce opravou:</strong> Jděte do Nastavení → Windows Update → Řešení problémů. Systém automaticky nalezne a opraví nejčastější závady.</li>
<li><strong>Zastavte Update službu (CMD jako admin):</strong> Napište <code>net stop wuauserv</code> a potvrďte. Tím dočasně pozastavíte stahování.</li>
<li><strong>Vymažte poškozenou mezipaměť:</strong> Smažte veškerý obsah složky <code>C:\\Windows\\SoftwareDistribution\\Download</code>. Tato složka uchovává stažené, ale poškozené aktualizace.</li>
<li><strong>Restartujte Update službu:</strong> Zpět v CMD napište <code>net start wuauserv</code>. Systém začne stahovat aktualizace znovu, tentokrát do čisté mezipaměti.</li>
<li><strong>Opravte systémové soubory:</strong> Pokud problém přetrvává, spusťte <code>DISM /Online /Cleanup-Image /RestoreHealth</code> a poté <code>sfc /scannow</code>.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Run the built-in Troubleshooter:</strong> Go to Settings → Windows Update → Troubleshoot. It automatically detects and fixes the most common issues.</li>
<li><strong>Stop the Update service (CMD as admin):</strong> Type <code>net stop wuauserv</code>. This temporarily pauses the download queue.</li>
<li><strong>Clear the corrupted cache:</strong> Delete all contents inside <code>C:\\Windows\\SoftwareDistribution\\Download</code>. This folder holds partial or broken update files.</li>
<li><strong>Restart the Update service:</strong> Back in CMD, type <code>net start wuauserv</code>. Windows will re-download updates into the clean cache.</li>
<li><strong>Repair system files:</strong> If the issue persists, run <code>DISM /Online /Cleanup-Image /RestoreHealth</code> then <code>sfc /scannow</code>.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>运行内置疑难解答：</strong>前往设置 → Windows 更新 → 疑难解答。系统会自动检测并修复最常见的问题。</li>
<li><strong>停止更新服务（以管理员身份运行 CMD）：</strong>输入 <code>net stop wuauserv</code>。这将暂时暂停下载队列。</li>
<li><strong>清除损坏的缓存：</strong>删除 <code>C:\\Windows\\SoftwareDistribution\\Download</code> 内的所有内容。</li>
<li><strong>重新启动更新服务：</strong>在 CMD 中输入 <code>net start wuauserv</code>。Windows 将重新下载更新。</li>
<li><strong>修复系统文件：</strong>如果问题仍然存在，运行 <code>DISM /Online /Cleanup-Image /RestoreHealth</code>，然后运行 <code>sfc /scannow</code>。</li>
</ol>`
        },
        details: {
            cs: "Windows Update Service (wuauserv) stahuje aktualizace do C:\\Windows\\SoftwareDistribution\\Download. Chyba 0x80070002 = ERROR_FILE_NOT_FOUND – komponenta aktualizace nenalezne soubor, který by měl existovat. Manuální reset WU: (1) Otevřete cmd jako admin. (2) 'net stop wuauserv && net stop cryptsvc && net stop bits && net stop msiserver'. (3) Přejmenujte: 'ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.bak'. (4) 'ren C:\\Windows\\System32\\catroot2 catroot2.bak'. (5) 'net start wuauserv && net start cryptsvc && net start bits && net start msiserver'. (6) Restartujte a zkuste Windows Update znovu. Alternativa: Microsoft Fix it nástroj nebo 'Reset Windows Update Agent' skript od Microsoftu. Další chyby WU: 0x80240034 = WU_E_DOWNLOAD_FAILED (download selhal – zkontrolujte firewall); 0x8024402C = WU_E_PT_WINHTTP_NAME_NOT_RESOLVED (DNS nebo proxy blokuje wu.deploy.microsoft.com); 0x80073712 = poškozené komponenty – spusťte 'DISM /Online /Cleanup-Image /RestoreHealth'.",
            en: "Windows Update Service (wuauserv) downloads updates to C:\\Windows\\SoftwareDistribution\\Download. Error 0x80070002 = ERROR_FILE_NOT_FOUND – an update component cannot find a file that should exist. Manual WU reset: (1) Open CMD as admin. (2) 'net stop wuauserv && net stop cryptsvc && net stop bits && net stop msiserver'. (3) Rename: 'ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.bak'. (4) 'ren C:\\Windows\\System32\\catroot2 catroot2.bak'. (5) 'net start wuauserv && net start cryptsvc && net start bits && net start msiserver'. (6) Restart and retry Windows Update. Alternative: Microsoft Fix it tool or the 'Reset Windows Update Agent' script. Other WU errors: 0x80240034 = WU_E_DOWNLOAD_FAILED (check firewall); 0x8024402C = DNS or proxy blocking wu.deploy.microsoft.com; 0x80073712 = corrupted components – run 'DISM /Online /Cleanup-Image /RestoreHealth'.",
            zh: "Windows Update 服务（wuauserv）将更新下载到 C:\\Windows\\SoftwareDistribution\\Download。错误 0x80070002 = ERROR_FILE_NOT_FOUND。手动重置步骤：(1) 以管理员打开 CMD；(2) 停止相关服务；(3) 重命名 SoftwareDistribution 文件夹；(4) 重命名 catroot2 文件夹；(5) 重启服务；(6) 重新运行 Windows 更新。其他 WU 错误：0x80240034=下载失败；0x8024402C=DNS 或代理阻止；0x80073712=组件损坏运行 DISM。"
        }
    },
    {
        id: "win-winsock-reset", type: "software", subcategory: "windows",
        code: "Network Stack Corruption / Winsock Error",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Veškeré síťové připojení selhává po instalaci VPN nebo malware – Winsock katalog je poškozen.",
            en: "All network connectivity fails after VPN or malware install – Winsock catalog is corrupted.",
            zh: "安装 VPN 或恶意软件后所有网络连接失败——Winsock 目录已损坏。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Otevřete Příkazový řádek jako správce:</strong> Stiskněte <kbd>Win + X</kbd> a zvolte „Windows Terminal (Správce)" nebo „CMD (Správce)".</li>
<li><strong>Resetujte Winsock katalog:</strong> Napište <code>netsh winsock reset</code> a stiskněte Enter. Tím odstraníte poškozené síťové zásuvky způsobené VPN nebo malwarem.</li>
<li><strong>Resetujte IP stack:</strong> Napište <code>netsh int ip reset</code>. Tím se obnoví nastavení IP protokolu do výchozího stavu.</li>
<li><strong>Vyčistěte DNS cache:</strong> Spusťte <code>ipconfig /flushdns</code> a poté <code>ipconfig /release</code> + <code>ipconfig /renew</code> pro obnovení DHCP.</li>
<li><strong>Restartujte PC a odinstalujte VPN:</strong> Po restartu zkontrolujte připojení. Pokud jste nedávno instalovali VPN klienta, odinstalujte jej přes Nastavení → Aplikace.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Open Command Prompt as Administrator:</strong> Press <kbd>Win + X</kbd> and select "Windows Terminal (Admin)" or "CMD (Admin)".</li>
<li><strong>Reset the Winsock catalog:</strong> Type <code>netsh winsock reset</code> and press Enter. This removes corrupt network socket entries left by VPNs or malware.</li>
<li><strong>Reset the IP stack:</strong> Type <code>netsh int ip reset</code>. This restores the IP protocol configuration to factory defaults.</li>
<li><strong>Flush DNS cache:</strong> Run <code>ipconfig /flushdns</code>, then <code>ipconfig /release</code> and <code>ipconfig /renew</code> to get a fresh DHCP lease.</li>
<li><strong>Restart PC and remove VPN:</strong> After rebooting, verify connectivity. If a VPN client was recently installed, uninstall it via Settings → Apps.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>以管理员身份打开命令提示符：</strong>按 <kbd>Win + X</kbd>，选择"Windows 终端（管理员）"。</li>
<li><strong>重置 Winsock 目录：</strong>输入 <code>netsh winsock reset</code> 并按 Enter。这将清除 VPN 或恶意软件留下的损坏网络套接字条目。</li>
<li><strong>重置 IP 协议栈：</strong>输入 <code>netsh int ip reset</code>，将 IP 协议配置恢复为默认值。</li>
<li><strong>清除 DNS 缓存：</strong>运行 <code>ipconfig /flushdns</code>，再运行 <code>ipconfig /release</code> 和 <code>ipconfig /renew</code>。</li>
<li><strong>重启电脑并卸载 VPN：</strong>重启后验证网络连接。如果最近安装了 VPN 客户端，请通过设置 → 应用将其卸载。</li>
</ol>`
        },
        details: {
            cs: "Winsock (Windows Sockets API) je rozhraní mezi síťovými aplikacemi a transport stack (TCP/IP). Winsock katalog je seznam LSP (Layered Service Provider) – vrstev vložených do Winsock pipeline (VPN, firewall, antivirus přidávají svoje LSP). Poškození nastane, když: (1) LSP instalace selhala nebo byl LSP nainstalován vadnou aplikací/malwarem. (2) Neúplné odinstalování VPN klientů (Cisco AnyConnect, Pulse Secure) zanechá poškozené LSP záznamy. (3) Malware nainstaloval rootkit LSP pro sledování provozu. Kompletní reset příkazy (admin CMD): 'netsh winsock reset catalog' → resetuje Winsock LSP na výchozí stav. 'netsh int ip reset' → resetuje IP stack (routing tabulku a IP záznamy). 'ipconfig /flushdns' → vymaže DNS cache. 'ipconfig /release && ipconfig /renew' → obnoví DHCP lease. Po restartu: zkontrolujte 'netsh winsock show catalog' – ne-Microsoft LSP jsou podezřelé. Další diagnostika: 'netstat -an' zobrazí aktivní spojení; 'ping 127.0.0.1' testuje loopback stack.",
            en: "Winsock (Windows Sockets API) is the interface between network applications and the transport stack (TCP/IP). The Winsock catalog is a list of LSPs (Layered Service Providers) – layers injected into the Winsock pipeline (VPNs, firewalls, and AV add their own LSPs). Corruption occurs when: (1) An LSP installation failed or was installed by a faulty app/malware. (2) Incomplete uninstallation of VPN clients (Cisco AnyConnect, Pulse Secure) leaves corrupt LSP entries. (3) Malware installs a rootkit LSP for traffic monitoring. Complete reset commands (admin CMD): 'netsh winsock reset catalog' → resets Winsock LSP to defaults. 'netsh int ip reset' → resets the IP stack. 'ipconfig /flushdns' → clears DNS cache. 'ipconfig /release && /renew' → renews DHCP lease. After restart: 'netsh winsock show catalog' – non-Microsoft LSPs are suspicious. Further: 'netstat -an' shows active connections; 'ping 127.0.0.1' tests loopback stack.",
            zh: "Winsock（Windows 套接字 API）是网络应用程序与传输堆栈（TCP/IP）之间的接口。Winsock 目录是 LSP（分层服务提供者）的列表。损坏发生在：(1) LSP 安装失败或被恶意程序安装；(2) 不完整卸载 VPN 客户端留下损坏的 LSP 条目；(3) 恶意软件安装根套件 LSP 进行流量监控。重置命令（管理员 CMD）：'netsh winsock reset catalog'、'netsh int ip reset'、'ipconfig /flushdns'、'ipconfig /release && /renew'。重启后用 'netsh winsock show catalog' 检查非 Microsoft LSP。"
        }
    },

    // =========================================================
    // === DIRECTX / GAMING RUNTIME ===
    // =========================================================
    {
        id: "dx-runtime-error", type: "software", subcategory: "apps",
        code: "DirectX Runtime Error / Missing d3dx9_43.dll",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Starší hra nebo aplikace hlásí chybějící d3dx9_43.dll nebo DirectX verze – runtime není nainstalován.",
            en: "Older game or app reports missing d3dx9_43.dll or DirectX version error – runtime not installed.",
            zh: "旧游戏或应用程序报告缺少 d3dx9_43.dll 或 DirectX 版本错误——运行库未安装。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Přejděte do složky instalace hry:</strong> Otevřete Steam/GOG → klikněte pravým tlačítkem na hru → Spravovat → Procházet místní soubory. Hledejte podsložku <code>_CommonRedist\DirectX</code>.</li>
<li><strong>Spusťte DXSETUP.exe jako správce:</strong> V nalezené složce spusťte <code>DXSETUP.exe</code>. Tím se nainstaluje starší DirectX runtime s potřebnými DLL soubory (d3dx9_43.dll apod.).</li>
<li><strong>Stáhněte Microsoft DirectX Web Installer:</strong> Pokud složka neexistuje, stáhněte <code>dxwebsetup.exe</code> přímo z webu Microsoftu a spusťte jej — automaticky stáhne a nainstaluje vše potřebné.</li>
<li><strong>Nainstalujte Visual C++ Redistributable:</strong> Stáhněte a nainstalujte všechny verze VC++ (2010, 2013, 2015-2022) v obou variantách (x86 i x64) z webu Microsoftu. Většina her je potřebuje.</li>
<li><strong>Restartujte PC a spusťte hru znovu.</strong> Pokud error stále trvá, zkontrolujte Event Viewer → Application pro přesné jméno chybějícího modulu.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Go to the game's install folder:</strong> In Steam/GOG, right-click the game → Manage → Browse local files. Look for a subfolder named <code>_CommonRedist\DirectX</code>.</li>
<li><strong>Run DXSETUP.exe as Administrator:</strong> Inside that folder, run <code>DXSETUP.exe</code>. This installs the legacy DirectX runtime (D3DX DLLs like d3dx9_43.dll) the game needs.</li>
<li><strong>Download the Microsoft DirectX Web Installer:</strong> If the folder doesn't exist, download <code>dxwebsetup.exe</code> directly from Microsoft's website — it automatically downloads and installs everything needed.</li>
<li><strong>Install Visual C++ Redistributable:</strong> Download and install all VC++ versions (2010, 2013, 2015-2022) in both x86 and x64 variants from Microsoft. Most games require these.</li>
<li><strong>Restart your PC and relaunch the game.</strong> If the error persists, check Event Viewer → Application for the exact name of the missing module.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>找到游戏安装文件夹：</strong>在 Steam/GOG 中右键点击游戏 → 管理 → 浏览本地文件，查找子文件夹 <code>_CommonRedist\DirectX</code>。</li>
<li><strong>以管理员身份运行 DXSETUP.exe：</strong>在该文件夹中运行 <code>DXSETUP.exe</code>，这将安装游戏所需的旧版 DirectX 运行库（d3dx9_43.dll 等）。</li>
<li><strong>下载 Microsoft DirectX Web 安装程序：</strong>如果文件夹不存在，请直接从微软网站下载 <code>dxwebsetup.exe</code> 并运行，它会自动下载并安装所需的一切。</li>
<li><strong>安装 Visual C++ 可再发行程序包：</strong>从微软下载并安装所有版本的 VC++（2010、2013、2015-2022），包括 x86 和 x64 版本。</li>
<li><strong>重启电脑并重新启动游戏。</strong>如果错误仍然存在，请检查事件查看器→应用程序以获取缺少模块的确切名称。</li>
</ol>`
        },
        details: {
            cs: "Windows 10/11 dodává nativně DirectX 12, ale starší hry (DirectX 9/10/11 éra) vyžadují D3DX helper DLL knihovny (d3dx9_43.dll, d3dx10_43.dll, d3dx11_43.dll), které nejsou součástí base Windows instalace. Tyto knihovny jsou součástí 'DirectX End-User Runtime' balíčku (odlišného od DirectX 12 WDDM driveru). Instalace: (1) Microsoft DirectX End-User Runtime Web Installer (dxwebsetup.exe) – stáhněte z Microsoft.com. (2) Alternativně spusťte _CommonRedist\\DirectX\\DXSETUP.exe z instalační složky hry (Steam/GOG). (3) Visual C++ Redistributable – většina her vyžaduje také VC++ 2010–2022 runtime. Knihovny a verze: d3dx9_24.dll – d3dx9_43.dll (DirectX 9.0c, poslední build) – každé číslo = nová verze DX SDK. d3dcompiler_43.dll / d3dcompiler_47.dll – HLSL shader compiler. xinput1_3.dll – XInput (gamepad API, Xbox controller). Diagnostika: Dependency Walker nebo Process Monitor zachytí chybějící DLL při spuštění; Event Viewer → Application → Application Error zobrazí chybějící modul.",
            en: "Windows 10/11 natively ships DirectX 12, but older games (DirectX 9/10/11 era) require D3DX helper DLL libraries (d3dx9_43.dll, d3dx10_43.dll, d3dx11_43.dll) not included in the base Windows installation. These are part of the 'DirectX End-User Runtime' package (distinct from the DirectX 12 WDDM driver). Installation: (1) Microsoft DirectX End-User Runtime Web Installer (dxwebsetup.exe) – download from Microsoft.com. (2) Alternatively, run _CommonRedist\\DirectX\\DXSETUP.exe from the game's install folder. (3) Visual C++ Redistributable – most games also require VC++ 2010–2022 runtimes. Library versions: d3dx9_24.dll through d3dx9_43.dll (DirectX 9.0c); d3dcompiler_43.dll / d3dcompiler_47.dll – HLSL shader compiler; xinput1_3.dll – XInput (gamepad API). Diagnostics: Dependency Walker or Process Monitor captures missing DLLs at launch; Event Viewer → Application → Application Error shows the missing module.",
            zh: "Windows 10/11 原生提供 DirectX 12，但旧游戏（DirectX 9/10/11 时代）需要不包含在 Windows 基本安装中的 D3DX 辅助 DLL 库。这些属于'DirectX 最终用户运行库'软件包（与 DirectX 12 WDDM 驱动不同）。安装：(1) 从 Microsoft.com 下载 dxwebsetup.exe；(2) 运行游戏 _CommonRedist\\DirectX\\DXSETUP.exe；(3) 安装 Visual C++ 2010–2022 运行时。库版本：d3dx9_24.dll 到 d3dx9_43.dll；d3dcompiler 系列；xinput1_3.dll。诊断：Dependency Walker 捕获缺少的 DLL；事件查看器→应用程序错误。"
        }
    },
    {
        id: "dx-vulkan-validation", type: "software", subcategory: "apps",
        code: "Vulkan Validation Layer Error / VK_ERROR_DEVICE_LOST",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Hra nebo aplikace (Vulkan API) crashuje s VK_ERROR_DEVICE_LOST – GPU přestala reagovat na Vulkan příkazy.",
            en: "Game or app (Vulkan API) crashes with VK_ERROR_DEVICE_LOST – GPU stopped responding to Vulkan commands.",
            zh: "游戏或应用程序（Vulkan API）崩溃并显示 VK_ERROR_DEVICE_LOST——GPU 停止响应 Vulkan 命令。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Aktualizujte ovladač GPU:</strong> Stáhněte nejnovější ovladač z webu NVIDIA nebo AMD. Pro čistou instalaci nejprve použijte nástroj DDU (Display Driver Uninstaller) v nouzovém režimu.</li>
<li><strong>Odinstalujte Vulkan SDK (pokud byl nainstalován ručně):</strong> Jděte do Nastavení → Aplikace a odinstalujte „Vulkan Runtime". GPU ovladač si správnou verzi nainstaluje sám.</li>
<li><strong>Resetujte přetaktování GPU:</strong> Pokud máte OC profil v MSI Afterburner nebo EVGA Precision, resetujte jej na výchozí hodnoty. Nestabilní OC je nejčastější příčinou.</li>
<li><strong>Snižte frekvenci VRAM:</strong> V Afterburneru snižte Memory Clock o 100–200 MHz. Nestabilní nebo přetížená VRAM způsobuje VK_ERROR_DEVICE_LOST.</li>
<li><strong>Zapněte Vulkan Validation Layers (pro vývojáře):</strong> Nastavte proměnnou prostředí <code>VK_INSTANCE_LAYERS=VK_LAYER_KHRONOS_validation</code> před spuštěním aplikace pro detailní log chyb API.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Update your GPU driver:</strong> Download the latest driver from NVIDIA or AMD. For a clean install, use DDU (Display Driver Uninstaller) in Safe Mode first.</li>
<li><strong>Uninstall user-installed Vulkan SDK:</strong> Go to Settings → Apps and uninstall any "Vulkan Runtime" you manually installed. The GPU driver installs the correct loader automatically.</li>
<li><strong>Reset your GPU overclock:</strong> If you have an OC profile in MSI Afterburner or similar tools, reset all clocks to stock. An unstable OC is the most common cause.</li>
<li><strong>Lower VRAM frequency:</strong> In Afterburner, reduce Memory Clock by 100–200 MHz. Unstable or overflowing VRAM triggers this error.</li>
<li><strong>Enable Vulkan Validation Layers (for developers):</strong> Set the environment variable <code>VK_INSTANCE_LAYERS=VK_LAYER_KHRONOS_validation</code> before launching the app for detailed API error logging.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>更新 GPU 驱动程序：</strong>从 NVIDIA 或 AMD 网站下载最新驱动。如需彻底清除，请先在安全模式下使用 DDU（显示驱动卸载工具）。</li>
<li><strong>卸载手动安装的 Vulkan SDK：</strong>前往设置 → 应用程序，卸载手动安装的 Vulkan 运行时。GPU 驱动会自动安装正确的加载器。</li>
<li><strong>重置 GPU 超频设置：</strong>如果 MSI Afterburner 中有超频配置，请将所有频率重置为默认值。超频不稳定是最常见的原因。</li>
<li><strong>降低显存频率：</strong>在 Afterburner 中将显存频率降低 100-200 MHz。不稳定或过满的显存会触发此错误。</li>
<li><strong>启用 Vulkan 验证层（适用于开发者）：</strong>在启动应用程序之前设置环境变量 <code>VK_INSTANCE_LAYERS=VK_LAYER_KHRONOS_validation</code>，以获取详细的 API 错误日志。</li>
</ol>`
        },
        details: {
            cs: "Vulkan je nízkoúrovňové 3D API od Khronos Group (nástupce OpenGL). VK_ERROR_DEVICE_LOST je Vulkan error code indikující, že GPU ztratila kontext – ekvivalent Windows TDR (Timeout Detection and Recovery) pro Vulkan. Příčiny: (1) GPU ovladač bug v Vulkan command buffer execution – upgrade nebo rollback ovladače. (2) GPU nestabilita kvůli přetaktování – snižte Memory Clock nebo Core Clock. (3) Aplikace posílá nevalidní Vulkan příkazy – diagnostikujte Vulkan Validation Layers: nastavte VK_INSTANCE_LAYERS=VK_LAYER_KHRONOS_validation environment variable před spuštěním pro zachycení API chyb. (4) VRAM overflow – Vulkan allocates fixed VRAM heaps; přeplnění způsobí device lost. (5) Konflikt Vulkan instancí – user-installed Vulkan Runtime (Vulkan SDK) přepíše systémový Vulkan loader. Odinstalujte SDK a nechte GPU driver instalovat loader. Diagnostika: Vulkan SDK obsahuje 'vulkaninfo' CLI nástroj; RenderDoc (free GPU debugger) umí zachytit Vulkan frame a poskytnout detailní chybový reporting.",
            en: "Vulkan is a low-level 3D API from Khronos Group (successor to OpenGL). VK_ERROR_DEVICE_LOST is a Vulkan error code indicating the GPU has lost its context – the Vulkan equivalent of Windows TDR (Timeout Detection and Recovery). Causes: (1) GPU driver bug in Vulkan command buffer execution – upgrade or rollback driver. (2) GPU instability from overclocking – reduce Memory Clock or Core Clock. (3) App sending invalid Vulkan commands – diagnose with Vulkan Validation Layers: set VK_INSTANCE_LAYERS=VK_LAYER_KHRONOS_validation env variable before launch to capture API errors. (4) VRAM overflow – Vulkan allocates fixed VRAM heaps; overflow causes device lost. (5) User-installed Vulkan Runtime (SDK) overrides the system Vulkan loader – uninstall SDK and let the GPU driver install the loader. Diagnostics: Vulkan SDK includes 'vulkaninfo' CLI tool; RenderDoc (free GPU debugger) can capture Vulkan frames for detailed error reporting.",
            zh: "Vulkan 是 Khronos Group 的低级 3D API（OpenGL 的继承者）。VK_ERROR_DEVICE_LOST 是 Vulkan 错误代码，表示 GPU 丢失了其上下文——相当于 Windows TDR 的 Vulkan 版本。原因：(1) Vulkan 命令缓冲区执行中的 GPU 驱动错误；(2) 超频导致 GPU 不稳定；(3) 应用程序发送无效 Vulkan 命令——使用 Vulkan 验证层诊断；(4) 显存溢出；(5) 用户安装的 Vulkan SDK 覆盖系统 Vulkan 加载器。诊断：Vulkan SDK 'vulkaninfo' 工具；RenderDoc GPU 调试器。"
        }
    },

    // =========================================================
    // === GAMING PLATFORMS ===
    // =========================================================
    {
        id: "plat-steam-api", type: "software", subcategory: "apps",
        code: "Steam API Init Failed / steam_api64.dll Error",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Hra hlásí 'Failed to initialize Steam API' nebo chybějící steam_api64.dll – Steam není spuštěn.",
            en: "Game reports 'Failed to initialize Steam API' or missing steam_api64.dll – Steam is not running.",
            zh: "游戏报告'Failed to initialize Steam API'或缺少 steam_api64.dll——Steam 未运行。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Spusťte Steam jako první:</strong> Před spuštěním hry vždy nejdříve otevřete samotný Steam. Hra potřebuje Steam jako aktivní pozadí — bez něj nemůže inicializovat Steamworks API.</li>
<li><strong>Ověřte integritu herních souborů:</strong> V knihovně Steam klikněte pravým tlačítkem na hru → Vlastnosti → Místní soubory → Ověřit integritu herních souborů. Tím se opraví nebo stáhne chybějící <code>steam_api64.dll</code>.</li>
<li><strong>Přidejte výjimku v antiviru:</strong> Některé antivirové programy označují <code>steam_api64.dll</code> jako falešný pozitivní. Přidejte celou složku hry a Steam do výjimek vašeho antiviru.</li>
<li><strong>Spusťte hru přímo přes Steam:</strong> Nikdy nespouštějte .exe soubor hry přímo ze Správce souborů — vždy klikněte „Hrát" ve Steam knihovně.</li>
<li><strong>Zkontrolujte bránu firewall:</strong> Windows Firewall nebo třetí strana může blokovat Steam IPC. Dočasně firewall vypněte a otestujte, zda se hra spustí.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Launch Steam first:</strong> Always open Steam before starting the game. The game needs Steam running in the background — without it, the Steamworks API cannot initialize.</li>
<li><strong>Verify game file integrity:</strong> In the Steam library, right-click the game → Properties → Local Files → Verify integrity of game files. This repairs or re-downloads a missing <code>steam_api64.dll</code>.</li>
<li><strong>Add an antivirus exception:</strong> Some antivirus programs flag <code>steam_api64.dll</code> as a false positive. Add the game folder and Steam to your antivirus exclusions.</li>
<li><strong>Launch only through Steam:</strong> Never run the game's .exe directly from File Explorer — always click "Play" in the Steam library.</li>
<li><strong>Check your firewall:</strong> Windows Firewall or a third-party tool may block Steam IPC. Temporarily disable the firewall and test if the game launches.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>先启动 Steam：</strong>在启动游戏之前，请始终先打开 Steam。游戏需要 Steam 在后台运行——没有它，Steamworks API 无法初始化。</li>
<li><strong>验证游戏文件完整性：</strong>在 Steam 库中右键点击游戏 → 属性 → 本地文件 → 验证游戏文件的完整性。这将修复或重新下载缺失的 <code>steam_api64.dll</code>。</li>
<li><strong>添加杀毒软件例外：</strong>某些杀毒软件会将 <code>steam_api64.dll</code> 标记为误报。将游戏文件夹和 Steam 添加到杀毒软件的排除列表中。</li>
<li><strong>仅通过 Steam 启动：</strong>永远不要直接从文件资源管理器运行游戏的 .exe 文件——始终在 Steam 库中点击"开始游戏"。</li>
<li><strong>检查防火墙：</strong>Windows 防火墙或第三方工具可能会阻止 Steam IPC。暂时禁用防火墙并测试游戏是否启动。</li>
</ol>`
        },
        details: {
            cs: "steam_api64.dll (nebo steam_api.dll pro 32-bit) je Steamworks SDK knihovna implementující Steam DRM, achievementy, cloud save, P2P lobby a další Steam funkce. Hra ji vyžaduje pro inicializaci Steamworks. 'Failed to initialize Steam API' nastane: (1) Steam není spuštěn – spusťte Steam.exe a teprve poté hru. (2) Hra je spouštěna z jiného umístění než Steam Library (přesun hry bez Steam). (3) steam_api64.dll je poškozená nebo chybí – Steam → Properties → Local Files → Verify integrity. (4) Antivirus nebo EMET quarantine steam_api64.dll jako falešný pozitiv – viz antivirus entry. (5) Více Steam instalací – Steam Steam client je nainstalován na jiném místě než hra. (6) Firewall blokuje Steam IPC (Inter-Process Communication přes local pipe). Steamworks komponenty: SteamAPI_Init() inicializuje komunikaci s SteamClient.dll; pokud Steam není spuštěn jako background process, volání selže. Alternativa: Steam Input API pro gamepad – oddělená inicializace od main Steamworks.",
            en: "steam_api64.dll (or steam_api.dll for 32-bit) is the Steamworks SDK library implementing Steam DRM, achievements, cloud saves, P2P lobbies, and other Steam features. The game requires it to initialize Steamworks. 'Failed to initialize Steam API' occurs when: (1) Steam is not running – launch Steam.exe first, then the game. (2) The game is launched from a location outside its Steam Library (game moved without Steam). (3) steam_api64.dll is corrupted or missing – Steam → Properties → Local Files → Verify integrity. (4) Antivirus quarantines steam_api64.dll as a false positive. (5) Multiple Steam installations – the Steam client is installed at a different location than the game expects. (6) Firewall blocks Steam IPC. Steamworks internals: SteamAPI_Init() initiates communication with SteamClient.dll; if Steam is not running as a background process, the call fails.",
            zh: "steam_api64.dll 是 Steamworks SDK 库，实现 Steam DRM、成就、云存档、P2P 大厅等 Steam 功能。游戏需要它来初始化 Steamworks。'Failed to initialize Steam API'发生在：(1) Steam 未运行——先启动 Steam；(2) 游戏从 Steam 库外启动；(3) steam_api64.dll 损坏或缺失——Steam 验证文件完整性；(4) 杀毒软件隔离 steam_api64.dll；(5) 多个 Steam 安装版本；(6) 防火墙阻止 Steam IPC。"
        }
    },
    {
        id: "plat-eac-error", type: "software", subcategory: "apps",
        code: "Easy Anti-Cheat / BattlEye Error / Kicked from Game",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Hráč je odpojen z důvodu chyby EAC nebo BattlEye – anti-cheat nenastartoval nebo detekoval porušení.",
            en: "Player is kicked due to EAC or BattlEye error – anti-cheat failed to launch or detected a violation.",
            zh: "玩家因 EAC 或 BattlEye 错误被踢出——反作弊未能启动或检测到违规。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Přeinstalujte anti-cheat driver jako správce:</strong> Přejděte do instalační složky hry (přes Steam → Procházet místní soubory) a spusťte <code>EasyAntiCheat_Setup.exe</code> nebo <code>BattlEye/Install_BattlEye.bat</code> jako administrátor.</li>
<li><strong>Zakažte všechny overlaye:</strong> Vypněte Discord overlay (Nastavení → Overlay ve hře), GeForce Experience overlay a Steam overlay. Anti-cheat může zaměnit overlay injection za cheat.</li>
<li><strong>Přidejte výjimku v antiviru:</strong> Windows Defender nebo třetí strana může zablokovat kernel driver anti-cheatu. Přidejte celou složku hry do výjimek antiviru.</li>
<li><strong>Ověřte integritu herních souborů:</strong> V Steam knihovně → klikněte pravým na hru → Vlastnosti → Místní soubory → Ověřit integritu. Tím se opraví poškozené soubory anti-cheatu.</li>
<li><strong>Zkontrolujte Secure Boot:</strong> EAC a BattlEye mohou vyžadovat Secure Boot zapnutý nebo vypnutý závisí na hře. Zkontrolujte fórum hry pro aktuální požadavky.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Reinstall the anti-cheat driver as Administrator:</strong> Go to the game's install folder (via Steam → Browse local files) and run <code>EasyAntiCheat_Setup.exe</code> or <code>BattlEye/Install_BattlEye.bat</code> as Administrator.</li>
<li><strong>Disable all overlays:</strong> Turn off Discord overlay (Settings → In-Game Overlay), GeForce Experience overlay, and Steam overlay. Anti-cheat may mistake overlay injection for a cheat.</li>
<li><strong>Add an antivirus exception:</strong> Windows Defender or a third-party AV may block the anti-cheat kernel driver. Add the entire game folder to your antivirus exclusions.</li>
<li><strong>Verify game file integrity:</strong> In Steam library → right-click game → Properties → Local Files → Verify integrity. This repairs corrupted anti-cheat files.</li>
<li><strong>Check Secure Boot settings:</strong> EAC and BattlEye may require Secure Boot on or off depending on the game. Check the game's official forums for current requirements.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>以管理员身份重新安装反作弊驱动：</strong>进入游戏安装文件夹（通过 Steam → 浏览本地文件），以管理员身份运行 <code>EasyAntiCheat_Setup.exe</code> 或 <code>BattlEye/Install_BattlEye.bat</code>。</li>
<li><strong>禁用所有覆盖层：</strong>关闭 Discord 覆盖层、GeForce Experience 覆盖层和 Steam 覆盖层。反作弊系统可能将覆盖层注入误判为作弊行为。</li>
<li><strong>添加杀毒软件例外：</strong>Windows Defender 或第三方杀毒软件可能阻止反作弊内核驱动程序。将整个游戏文件夹添加到杀毒软件排除列表。</li>
<li><strong>验证游戏文件完整性：</strong>在 Steam 库中右键点击游戏 → 属性 → 本地文件 → 验证完整性。这将修复损坏的反作弊文件。</li>
<li><strong>检查安全启动设置：</strong>EAC 和 BattlEye 对安全启动的要求因游戏而异。请查看游戏官方论坛以获取当前要求。</li>
</ol>`
        },
        details: {
            cs: "EAC (Easy Anti-Cheat, Fortnite, Apex Legends, Rust) a BattlEye (PUBG, Rainbow Six Siege, Arma) jsou kernel-mode anti-cheat systémy. Fungují jako kernel-mode drivery (EACServer.sys, BEService.sys) s přístupem k celé paměti systému. Příčiny chyb: (1) Anti-cheat driver není nainstalován nebo je poškozený – spusťte 'EasyAntiCheat_Setup.exe' nebo 'BattlEye/Install_BattlEye.bat' z instalační složky hry jako administrátor. (2) Overlay software (Discord overlay, NVIDIA ShadowPlay, Steam overlay, MSI Afterburner) inject do herního procesu – anti-cheat to detekuje jako potenciální injektování. Zakažte overlaye na čas testování. (3) Outdated anti-cheat – hra nainstalovala novou verzi anti-cheatu bez předchozí odinstalace. (4) Secure Boot konfigurace – EAC/BattlEye mohou vyžadovat Secure Boot ON nebo específické nastavení BIOS. (5) Windows Defender / třetí antivirus blokující kernel driver – přidejte výjimku pro herní složku. Poznámka: EAC/BattlEye jsou kontroverzní z důvodu privacy (přístup k systémové paměti), ale jsou standardem průmyslu.",
            en: "EAC (Easy Anti-Cheat – Fortnite, Apex Legends, Rust) and BattlEye (PUBG, Rainbow Six Siege, Arma) are kernel-mode anti-cheat systems. They operate as kernel-mode drivers (EACServer.sys, BEService.sys) with access to the entire system memory. Error causes: (1) Anti-cheat driver is not installed or is corrupted – run 'EasyAntiCheat_Setup.exe' or 'BattlEye/Install_BattlEye.bat' from the game folder as Administrator. (2) Overlay software (Discord, NVIDIA ShadowPlay, Steam overlay, MSI Afterburner) injects into the game process – anti-cheat detects this as potential injection; disable overlays for testing. (3) Outdated anti-cheat – game installed a new version without uninstalling the old one. (4) Secure Boot configuration may be required. (5) Windows Defender / third-party AV blocking the kernel driver. Note: EAC/BattlEye are controversial due to privacy concerns (system memory access) but are an industry standard.",
            zh: "EAC（Easy Anti-Cheat——Fortnite、Apex Legends、Rust）和 BattlEye（PUBG、彩虹六号、武装突袭）是内核模式反作弊系统，作为内核模式驱动程序运行，可访问整个系统内存。错误原因：(1) 反作弊驱动未安装或损坏——以管理员身份从游戏文件夹运行安装程序；(2) 覆盖软件（Discord、NVIDIA ShadowPlay 等）注入游戏进程；(3) 过旧的反作弊版本；(4) 安全启动配置要求；(5) Windows Defender/杀毒软件阻止内核驱动程序。"
        }
    },

    // =========================================================
    // === S.M.A.R.T. / DISK ===
    // =========================================================
    {
        id: "disk-smart-failure", type: "hardware", subcategory: "disk",
        code: "S.M.A.R.T. Failure Predicted / Drive Failing",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: {
            cs: "BIOS nebo nástroj hlásí S.M.A.R.T. Failure Predicted – disk se blíží fyzickému selhání.",
            en: "BIOS or monitoring tool reports S.M.A.R.T. Failure Predicted – drive is approaching physical failure.",
            zh: "BIOS 或监控工具报告 S.M.A.R.T. 故障预测——磁盘正接近物理故障。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>⚠️ OKAMŽITĚ ZÁLOHUJTE DATA:</strong> Toto je priorita č. 1. Připojte externí disk nebo USB flash disk a zkopírujte všechna důležitá data (dokumenty, fotky, projekty) IHNED — disk může selhat kdykoliv.</li>
<li><strong>Ověřte stav disku pomocí CrystalDiskInfo:</strong> Stáhněte bezplatný nástroj <strong>CrystalDiskInfo</strong>. Otevřete jej a zkontrolujte hodnoty atributů #05 (Reallocated Sectors), #197 a #198. Červené nebo žluté hodnoty = vážný problém.</li>
<li><strong>Zálohujte systémový oddíl:</strong> Použijte <strong>Macrium Reflect Free</strong> pro vytvoření bitové kopie celého systémového disku na zdravé úložiště — tím budete mít i Windows zálohu.</li>
<li><strong>Objednejte nový disk:</strong> S.M.A.R.T. varování nelze opravit — disk je fyzicky poškozený. Pořiďte náhradní SSD nebo NVMe disk.</li>
<li><strong>Proveďte migraci nebo čistou instalaci:</strong> Pomocí Macrium Reflect klonujte data na nový disk, nebo proveďte čistou instalaci Windows na nový disk a obnovte data ze zálohy.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>⚠️ BACK UP YOUR DATA IMMEDIATELY:</strong> This is Priority #1. Connect an external drive or USB stick and copy all important files (documents, photos, projects) RIGHT NOW — the drive can fail at any moment.</li>
<li><strong>Verify drive health with CrystalDiskInfo:</strong> Download the free tool <strong>CrystalDiskInfo</strong>. Open it and check attributes #05 (Reallocated Sectors), #197, and #198. Red or yellow values indicate serious hardware damage.</li>
<li><strong>Back up the system partition:</strong> Use <strong>Macrium Reflect Free</strong> to create a full disk image of the failing drive to healthy storage — this preserves your Windows installation too.</li>
<li><strong>Order a replacement drive:</strong> A S.M.A.R.T. warning cannot be repaired — the drive has physical damage. Purchase a replacement SSD or NVMe drive immediately.</li>
<li><strong>Migrate or clean install:</strong> Clone your data to the new drive using Macrium Reflect, or perform a clean Windows installation and restore data from your backup.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>⚠️ 立即备份数据：</strong>这是第一优先事项。连接外部硬盘或 U 盘，立即复制所有重要文件（文档、照片、项目）——硬盘随时可能发生故障。</li>
<li><strong>使用 CrystalDiskInfo 验证磁盘健康状态：</strong>下载免费工具 <strong>CrystalDiskInfo</strong>，打开后检查属性 #05（重新分配扇区）、#197 和 #198。红色或黄色值表示严重的硬件损坏。</li>
<li><strong>备份系统分区：</strong>使用 <strong>Macrium Reflect Free</strong> 将故障磁盘的完整镜像备份到健康存储设备，这也会保留您的 Windows 安装。</li>
<li><strong>订购替换磁盘：</strong>S.M.A.R.T. 警告无法修复——磁盘存在物理损坏。请立即购买替换 SSD 或 NVMe 磁盘。</li>
<li><strong>迁移或全新安装：</strong>使用 Macrium Reflect 将数据克隆到新磁盘，或在新磁盘上全新安装 Windows 并从备份恢复数据。</li>
</ol>`
        },
        details: {
            cs: "S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) je systém pro sledování zdravotního stavu disků. BIOS zobrazí varování pokud disk nahlásí 'Threshold Exceeded' na klíčových atributech. Kritické S.M.A.R.T. atributy HDD: #01 Raw Read Error Rate, #05 Reallocated Sectors Count (nenulová hodnota = vadný sektor nahrazen ze zásoby), #197 Current Pending Sector Count (sektory čekající na realokaci = potenciálně vadné), #198 Uncorrectable Sector Count, #199 UDMA CRC Error Count (chyby datového přenosu), #187 Reported Uncorrectable Errors. SSD kritické: #177 Wear Leveling Count, #232 Available Reserved Space, #233 Media Wearout Indicator. Nástroje: CrystalDiskInfo (Windows, zdarma), smartmontools (cross-platform CLI, 'smartctl -a /dev/sdX'). Záloha poškozujícího se disku: ddrescue (Linux) kopíruje data přes bad sectors; R-Studio nebo GetDataBack (Windows) pro uživatelsky přívětivé recovery. Klonování: Macrium Reflect Free, Clonezilla (free), nebo rovnou pořiďte nový disk a proveďte 'sector-by-sector clone' přes ddrescue na Linux LiveUSB.",
            en: "S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology) is a disk health monitoring system. BIOS shows a warning when the drive reports 'Threshold Exceeded' on key attributes. Critical S.M.A.R.T. attributes – HDD: #01 Raw Read Error Rate; #05 Reallocated Sectors Count (non-zero = bad sector relocated from reserve); #197 Current Pending Sector Count (sectors awaiting reallocation = potentially bad); #198 Uncorrectable Sector Count; #199 UDMA CRC Error Count; #187 Reported Uncorrectable Errors. SSD: #177 Wear Leveling Count; #232 Available Reserved Space; #233 Media Wearout Indicator. Tools: CrystalDiskInfo (Windows, free); smartmontools (cross-platform CLI, 'smartctl -a /dev/sdX'). Failing drive backup: ddrescue (Linux) copies data across bad sectors; R-Studio or GetDataBack (Windows) for user-friendly recovery. Cloning: Macrium Reflect Free, Clonezilla, or sector-by-sector clone via ddrescue on a Linux LiveUSB.",
            zh: "S.M.A.R.T.（自我监测、分析和报告技术）是磁盘健康监控系统。当磁盘在关键属性上报告'阈值超出'时，BIOS 显示警告。关键 S.M.A.R.T. 属性 HDD：#05 重新分配扇区数（非零=坏扇区已从备用区重定位）；#197 当前待处理扇区数；#198 不可纠正扇区数；#199 UDMA CRC 错误数。SSD：#177 磨损均衡计数；#232 可用保留空间；#233 媒体磨损指示器。工具：CrystalDiskInfo（Windows，免费）；smartmontools CLI。故障磁盘备份：Linux 下 ddrescue；Windows 下 R-Studio。克隆：Macrium Reflect Free、Clonezilla。"
        }
    },
    {
        id: "disk-nvme-queue-depth", type: "hardware", subcategory: "disk",
        code: "NVMe SSD Poor Performance / Wrong Queue Depth",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: {
            cs: "NVMe SSD dosahuje jen zlomku deklarovaného výkonu – špatná konfigurace, ovladač nebo AHCI místo NVMe.",
            en: "NVMe SSD delivers only a fraction of advertised performance – misconfiguration, wrong driver, or AHCI mode.",
            zh: "NVMe SSD 仅达到宣传性能的一小部分——配置错误、驱动程序错误或使用 AHCI 模式。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Zkontrolujte nastavení M.2 slotu v BIOSu:</strong> Restartujte do BIOSu (obvykle <kbd>Del</kbd> nebo <kbd>F2</kbd>). Najděte nastavení M.2 slotu (v sekci Storage nebo Advanced). Ujistěte se, že je nastaveno na <strong>NVMe / PCIe</strong>, nikoli AHCI nebo SATA — AHCI omezí výkon na ~550 MB/s.</li>
<li><strong>Nainstalujte NVMe ovladač výrobce:</strong> Stáhněte ovladač přímo od výrobce disku: Samsung → Samsung Magician; WD → Dashboard; Seagate → SeaTools. Ovladač výrobce je optimalizovanější než standardní Microsoft <code>stornvme.sys</code>.</li>
<li><strong>Zkontrolujte tepelné škrcení (thermal throttling):</strong> Nainstalujte M.2 chladič (heatsink). Během intenzivního zápisu mohou Gen4/Gen5 NVMe disky v M.2 slotech bez chlazení přehřát a zpomalit z 7000 MB/s na 500 MB/s.</li>
<li><strong>Benchmarkujte výkon:</strong> Spusťte <strong>CrystalDiskMark</strong> a srovnejte výsledky s deklarovanými hodnotami výrobce. Pokud jsou výsledky výrazně nižší, je konfigurace špatná.</li>
<li><strong>Zkontrolujte PCIe generaci:</strong> Gen 5 NVMe v Gen 4 slotu = 50% propustnosti. GPU-Z nebo CPU-Z Hardware zobrazí skutečnou PCIe generaci slotu.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Check the M.2 slot mode in BIOS:</strong> Restart into BIOS (usually <kbd>Del</kbd> or <kbd>F2</kbd>). Find the M.2 slot setting (in Storage or Advanced). Make sure it is set to <strong>NVMe / PCIe</strong>, not AHCI or SATA — AHCI limits performance to ~550 MB/s.</li>
<li><strong>Install the manufacturer's NVMe driver:</strong> Download the driver directly from the drive maker: Samsung → Samsung Magician; WD → Dashboard; Seagate → SeaTools. The vendor driver is better optimized than Microsoft's standard <code>stornvme.sys</code>.</li>
<li><strong>Check for thermal throttling:</strong> Install an M.2 heatsink. During heavy writes, Gen4/Gen5 NVMe drives in unshielded M.2 slots can overheat and drop from 7000 MB/s to 500 MB/s.</li>
<li><strong>Benchmark the performance:</strong> Run <strong>CrystalDiskMark</strong> and compare the results against the manufacturer's rated speeds. If far below spec, there's a configuration issue.</li>
<li><strong>Verify the PCIe generation:</strong> A Gen 5 NVMe in a Gen 4 slot provides only 50% bandwidth. Use GPU-Z or HWiNFO to check the actual PCIe generation of the slot.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>在 BIOS 中检查 M.2 插槽模式：</strong>重启进入 BIOS（通常按 <kbd>Del</kbd> 或 <kbd>F2</kbd>），找到 M.2 插槽设置（在存储或高级选项中）。确保设置为 <strong>NVMe / PCIe</strong>，而非 AHCI 或 SATA——AHCI 会将性能限制在约 550 MB/s。</li>
<li><strong>安装制造商的 NVMe 驱动：</strong>直接从磁盘制造商下载驱动：Samsung → Samsung Magician；WD → Dashboard；Seagate → SeaTools。厂商驱动比微软标准的 <code>stornvme.sys</code> 优化更好。</li>
<li><strong>检查热降频：</strong>安装 M.2 散热片。在繁重写入期间，无散热 M.2 插槽中的 Gen4/Gen5 NVMe 磁盘可能过热，速度从 7000 MB/s 降至 500 MB/s。</li>
<li><strong>测试性能：</strong>运行 <strong>CrystalDiskMark</strong> 并将结果与制造商的额定速度进行比较。如果远低于规格，则存在配置问题。</li>
<li><strong>验证 PCIe 代际：</strong>Gen 5 NVMe 在 Gen 4 插槽中仅提供 50% 的带宽。使用 GPU-Z 或 HWiNFO 检查插槽的实际 PCIe 代际。</li>
</ol>`
        },
        details: {
            cs: "NVMe (Non-Volatile Memory Express) je komunikační protokol navržený specificky pro flash storage přes PCIe. Dosahuje 5000–7000 MB/s (PCIe 4.0 x4) vs SATA SSD 550 MB/s. Příčiny nízkého výkonu: (1) BIOS nastavil M.2 slot do AHCI/SATA kompatibilního módu – NVMe disk pracuje v AHCI místo NVMe protokolu, výkon omezen na ~550 MB/s. Oprava: BIOS → Storage Configuration → M.2 Mode = NVMe. (2) Microsoft Standard NVMe driver (stornvme.sys) místo vendor specifického – Samsung, WD, Seagate vydávají vlastní optimalizované NVMe drivery. (3) Queue Depth limit – Windows 10 Home limituje NVMe queue depth na 32; Windows 10 Pro a Enterprise: 64. (4) PCIe Gen mismatch – PCIe Gen 5 SSD v PCIe Gen 4 slotu = 50% propustnost. Ověřte: CrystalDiskMark, AS SSD Benchmark. (5) Thermal throttle NVMe – M.2 sloty bez heatspreader přehřívají při sustained write; namontujte M.2 heatsink. SMART pro NVMe: 'nvme smart-log /dev/nvme0' (Linux) nebo CrystalDiskInfo.",
            en: "NVMe (Non-Volatile Memory Express) is a communication protocol designed specifically for flash storage over PCIe. It achieves 5000–7000 MB/s (PCIe 4.0 x4) vs 550 MB/s for SATA SSDs. Low-performance causes: (1) BIOS configured M.2 slot in AHCI/SATA-compatible mode – NVMe drive runs in AHCI instead of NVMe protocol, limiting performance to ~550 MB/s; fix: BIOS → Storage Configuration → M.2 Mode = NVMe. (2) Microsoft Standard NVMe driver (stornvme.sys) instead of vendor-specific – Samsung, WD, Seagate release optimized NVMe drivers. (3) Queue Depth limit – Windows 10 Home limits NVMe queue depth to 32; Pro/Enterprise: 64. (4) PCIe Gen mismatch – Gen 5 SSD in Gen 4 slot = 50% throughput. Verify with CrystalDiskMark, AS SSD. (5) NVMe thermal throttle – M.2 slots without heat spreader overheat under sustained writes; install an M.2 heatsink. NVMe S.M.A.R.T.: 'nvme smart-log /dev/nvme0' (Linux) or CrystalDiskInfo.",
            zh: "NVMe（非易失性内存快速）是专为 PCIe 上闪存存储设计的通信协议，可达 5000–7000 MB/s。低性能原因：(1) BIOS 将 M.2 插槽配置为 AHCI/SATA 兼容模式——NVMe 磁盘在 AHCI 而非 NVMe 协议下运行，性能限制在约 550MB/s；(2) 使用微软标准 NVMe 驱动而非厂商专用驱动；(3) 队列深度限制——Windows 10 Home 限制为 32；(4) PCIe 代际不匹配——Gen 5 SSD 在 Gen 4 插槽中性能减半；(5) NVMe 热降频——安装 M.2 散热片。"
        }
    },

    // =========================================================
    // === USB HUB / PERIPHERAL ===
    // =========================================================
    {
        id: "usb-hub-power", type: "hardware", subcategory: "mb",
        code: "USB Hub / Devices Disconnecting Randomly",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "USB zařízení se náhodně odpojují nebo restartují – hub nemá dostatek napájení nebo USB suspend.",
            en: "USB devices randomly disconnect or reset – hub insufficient power or USB selective suspend.",
            zh: "USB 设备随机断开或重置——集线器电源不足或 USB 选择性挂起。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Vypněte USB Selective Suspend (Selektivní pozastavení):</strong> Jděte do Ovládací panely → Možnosti napájení → Změnit nastavení plánu → Změnit rozšířená nastavení napájení → USB nastavení → USB Selective Suspend → nastavte na <strong>Zakázáno</strong>.</li>
<li><strong>Zakažte správu napájení pro USB Root Hub v Device Manageru:</strong> Otevřete Správce zařízení → Řadiče sběrnice USB → klikněte pravým na každý „USB Root Hub" → Vlastnosti → Správa napájení → odtrhněte „Umožnit počítači vypnout toto zařízení". Opakujte pro všechny instance.</li>
<li><strong>Přepněte na napájený (aktivní) USB hub:</strong> Pasivní hub bez napájecího adaptéru sdílí omezený proud (500 mA) mezi porty. Aktivní hub s vlastním napájecím adaptérem poskytuje plný proud na každý port — ideální pro myš, klávesnici, audio interface.</li>
<li><strong>Zapojte zařízení přímo do základní desky:</strong> Pokud to zařízení dovoluje, zapojte jej přímo do portů na zadním panelu PC, nikoliv do pasivního hubu.</li>
<li><strong>Diagnostika:</strong> Stáhněte bezplatný nástroj <strong>USBDeview</strong> (NirSoft) — zobrazí historii odpojení a aktuální spotřebu proudu všech zařízení.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Disable USB Selective Suspend:</strong> Go to Control Panel → Power Options → Change plan settings → Change advanced power settings → USB settings → USB selective suspend setting → set to <strong>Disabled</strong>.</li>
<li><strong>Disable power management for USB Root Hubs:</strong> Open Device Manager → Universal Serial Bus controllers → right-click each "USB Root Hub" → Properties → Power Management → uncheck "Allow the computer to turn off this device to save power". Repeat for all instances.</li>
<li><strong>Switch to a powered (active) USB hub:</strong> A passive hub without its own power adapter shares a limited current (500 mA) across all ports. An active hub with its own adapter provides full current per port — ideal for mice, keyboards, and audio interfaces.</li>
<li><strong>Plug devices directly into the motherboard:</strong> Where possible, connect devices to the ports on the rear I/O panel of your PC instead of a passive hub.</li>
<li><strong>Diagnose with USBDeview:</strong> Download the free tool <strong>USBDeview</strong> (NirSoft) — it shows disconnect history and current power draw for all USB devices.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>禁用 USB 选择性挂起：</strong>前往控制面板 → 电源选项 → 更改计划设置 → 更改高级电源设置 → USB 设置 → USB 选择性挂起设置 → 设为<strong>已禁用</strong>。</li>
<li><strong>禁用 USB 根集线器的电源管理：</strong>打开设备管理器 → 通用串行总线控制器 → 右键点击每个"USB 根集线器" → 属性 → 电源管理 → 取消选中"允许计算机关闭此设备以节省电源"。对所有实例重复此操作。</li>
<li><strong>改用有源（独立供电）USB 集线器：</strong>无电源适配器的无源集线器在所有端口间共享有限电流（500 mA）。有自己适配器的有源集线器为每个端口提供完整电流——非常适合鼠标、键盘和音频接口。</li>
<li><strong>将设备直接插入主板：</strong>在可能的情况下，将设备连接到 PC 后面板上的端口，而不是无源集线器。</li>
<li><strong>使用 USBDeview 进行诊断：</strong>下载免费工具 <strong>USBDeview</strong>（NirSoft）——它显示所有 USB 设备的断开历史和当前功耗。</li>
</ol>`
        },
        details: {
            cs: "USB Selective Suspend je Windows funkce pro úsporu energie – pozastaví napájení USB portu nebo hubu po nečinnosti. Pro audio, gaming periferie a úložná zařízení je to nežádoucí. Vypnutí Selective Suspend: (1) Device Manager → Universal Serial Bus Controllers → USB Root Hub → Properties → Power Management → odtrhněte 'Allow the computer to turn off this device to save power'. Opakujte pro všechny USB Root Hub (obvykle 4–8 instancí). (2) Nastavení napájení: Control Panel → Power Options → Change plan settings → Change advanced power settings → USB Settings → USB selective suspend setting = Disabled. (3) Registry: HKLM\\SYSTEM\\CurrentControlSet\\Services\\USB → DisableSelectiveSuspend = 1. Napájení USB hubů: Pasivní (bus-powered) hub sdílí 500 mA (USB 2.0) nebo 900 mA (USB 3.x) mateřského portu mezi svými porty. Aktivní (self-powered) hub má vlastní napájecí adaptér a poskytuje plných 900 mA na každý port. Pro gaming periferie, audio interface, flashdisky: vždy používejte aktivní hub nebo přímý port na základní desce. Diagnostika: USBDeview (NirSoft) zobrazí historii odpojení a proudové problémy.",
            en: "USB Selective Suspend is a Windows power-saving feature that suspends power to a USB port or hub after inactivity. It is undesirable for audio interfaces, gaming peripherals, and storage devices. Disable Selective Suspend: (1) Device Manager → Universal Serial Bus Controllers → USB Root Hub → Properties → Power Management → uncheck 'Allow the computer to turn off this device to save power'. Repeat for all USB Root Hub instances. (2) Power settings: Power Options → Change advanced power settings → USB Settings → USB selective suspend = Disabled. (3) Registry: HKLM\\SYSTEM\\CurrentControlSet\\Services\\USB → DisableSelectiveSuspend = 1. USB hub power: passive (bus-powered) hub shares 500mA (USB 2.0) or 900mA (USB 3.x) from the parent port across all its ports. Active (self-powered) hub has its own adapter and provides full 900mA per port. For gaming peripherals, audio interfaces, flash drives: always use an active hub or a direct motherboard port. Diagnostics: USBDeview (NirSoft) shows disconnect history and power draw.",
            zh: "USB 选择性挂起是 Windows 节能功能，在空闲后暂停 USB 端口或集线器的电源。对于音频接口、游戏外设和存储设备不可取。禁用方法：(1) 设备管理器 → USB 根集线器 → 属性 → 电源管理 → 取消选中允许关闭设备；(2) 电源选项 → 高级设置 → USB 选择性挂起 = 禁用；(3) 注册表设置。USB 集线器电源：无源（总线供电）集线器在所有端口间共享 500mA（USB 2.0）或 900mA（USB 3.x）；有源（独立供电）集线器每端口提供完整 900mA。诊断：USBDeview（NirSoft）显示断开历史。"
        }
    },

    // =========================================================
    // === GPU – rozšíření ===
    // =========================================================
    {
        id: "gpu-multi-monitor", type: "hardware", subcategory: "gpu",
        code: "Multi-Monitor Setup Issues / Wrong Refresh Rate",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "Druhý monitor zobrazuje špatné rozlišení nebo refresh rate, nebo primární monitor zpomaluje.",
            en: "Second monitor displays wrong resolution or refresh rate, or primary monitor performance drops.",
            zh: "第二台显示器显示错误分辨率或刷新率，或主显示器性能下降。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Nastavte refresh rate manuálně:</strong> Klikněte pravým na plochu → Nastavení zobrazení → klikněte na konkrétní monitor → Rozšířená nastavení zobrazení → Obnovovací frekvence zobrazení → vyberte správnou hodnotu (např. 144 Hz).</li>
<li><strong>Použijte DisplayPort pro primární monitor:</strong> DisplayPort 1.4 podporuje 4K@144Hz. Přepněte z HDMI na DP pokud to vaše GPU a monitor dovolují — HDMI 2.0 je omezeno na 4K@60Hz.</li>
<li><strong>Zkontrolujte, z jakého GPU výstup vede:</strong> V hybridních systémech (notebook nebo PC s iGPU + dGPU) ujistěte se, že kabel vede z diskrétní GPU (NVIDIA/AMD), ne z integrované (Intel). Špatný port = omezený výkon.</li>
<li><strong>Nahraďte levný KVM switch:</strong> Pokud používáte přepínač KVM nebo dokovací stanici, může způsobovat špatné EDID (informace o monitoru). Zkuste přímé připojení bez switche.</li>
<li><strong>Nastavte EDID ručně:</strong> Pro pokročilé uživatele — stáhněte <strong>CRU (Custom Resolution Utility)</strong> a přidejte správné rozlišení/refresh rate pokud monitor nelze nastavit přes standardní rozhraní.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Set the refresh rate manually:</strong> Right-click the desktop → Display settings → click the specific monitor → Advanced display settings → Refresh rate → select the correct value (e.g., 144 Hz).</li>
<li><strong>Use DisplayPort for the primary monitor:</strong> DisplayPort 1.4 supports 4K@144Hz. Switch from HDMI to DP if your GPU and monitor allow it — HDMI 2.0 is limited to 4K@60Hz.</li>
<li><strong>Check which GPU the output comes from:</strong> In hybrid systems (laptops or PCs with iGPU + dGPU), make sure the cable goes from the discrete GPU (NVIDIA/AMD), not the integrated one (Intel). Wrong port = limited performance.</li>
<li><strong>Replace a cheap KVM switch:</strong> If you use a KVM switch or docking station, it may be sending incorrect EDID (monitor info). Try a direct connection without the switch.</li>
<li><strong>Set EDID manually (advanced):</strong> Download <strong>CRU (Custom Resolution Utility)</strong> and add the correct resolution/refresh rate if the monitor can't be set through standard Display Settings.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>手动设置刷新率：</strong>右键点击桌面 → 显示设置 → 点击具体显示器 → 高级显示设置 → 刷新率 → 选择正确的值（如 144 Hz）。</li>
<li><strong>主显示器使用 DisplayPort：</strong>DisplayPort 1.4 支持 4K@144Hz。如果 GPU 和显示器都支持，请从 HDMI 切换到 DP——HDMI 2.0 限制为 4K@60Hz。</li>
<li><strong>检查输出来自哪个 GPU：</strong>在混合系统（带 iGPU + dGPU 的笔记本或台式机）中，确保线缆来自独立 GPU（NVIDIA/AMD），而非集成显卡（Intel）。错误的端口=性能受限。</li>
<li><strong>更换廉价 KVM 切换器：</strong>如果使用 KVM 切换器或扩展坞，它可能发送错误的 EDID（显示器信息）。尝试不使用切换器直接连接。</li>
<li><strong>手动设置 EDID（高级）：</strong>下载 <strong>CRU（自定义分辨率实用程序）</strong>，如果无法通过标准显示设置设置显示器，则添加正确的分辨率/刷新率。</li>
</ol>`
        },
        details: {
            cs: "Multi-monitor konfigurace má specifické omezení dané GPU architekturou a DisplayPort/HDMI verzemi. Problémy: (1) Refresh rate cap – Windows nastavuje refresh rate dle nejnižšího kapacitního jmenovatele při použití Duplicate mode. V Extend mode: každý monitor může mít jiný refresh rate. Settings → System → Display → Advanced display settings → Refresh rate. (2) HDMI 2.0 vs 2.1: HDMI 2.0 = max 4K@60Hz; HDMI 2.1 = 4K@144Hz nebo 8K@60Hz. DisplayPort 1.4: 4K@144Hz (s DSC kompresí až 4K@240Hz). (3) Daisy chaining via DisplayPort MST (Multi-Stream Transport) – umožňuje propojení monitorů; každý monitor musí podporovat DP MST jako průchozí; snižuje celkovou propustnost. (4) HDMI/DP switch (KVM) – levné switche nepodporují všechny EDID profily, způsobujíce špatné rozlišení nebo refresh rate. Použijte kvalitní switch nebo přímé připojení. (5) GPU HDMI port na integrované GPU vs diskrétní GPU – ověřte, že kabel jde z diskrétní GPU pří hybridním systému. Diagnostika: CRU (Custom Resolution Utility) pro manuální EDID úpravu; Display cable identifier chip ověří datový datový standard kabelu.",
            en: "Multi-monitor configurations have specific limitations from GPU architecture and DisplayPort/HDMI versions. Issues: (1) Refresh rate cap – Windows sets refresh rate to the lowest common denominator in Duplicate mode; in Extend mode each monitor can have its own rate. Settings → System → Display → Advanced display settings → Refresh rate. (2) HDMI 2.0 = max 4K@60Hz; HDMI 2.1 = 4K@144Hz or 8K@60Hz; DisplayPort 1.4 = 4K@144Hz (with DSC up to 4K@240Hz). (3) DisplayPort MST daisy chaining – each monitor must support DP MST passthrough; reduces total bandwidth. (4) HDMI/DP switch (KVM) – budget switches don't support all EDID profiles, causing wrong resolution or refresh rate; use a quality switch or direct connection. (5) HDMI port from iGPU vs dGPU – verify cable goes to the discrete GPU in hybrid systems. Diagnostics: CRU (Custom Resolution Utility) for manual EDID editing; display cable identifier chip.",
            zh: "多显示器配置有 GPU 架构和 DisplayPort/HDMI 版本的特定限制。问题：(1) 刷新率限制——复制模式下 Windows 按最低公分母设置刷新率，扩展模式下每台显示器可有自己的刷新率；(2) HDMI 2.0 最高 4K@60Hz，HDMI 2.1 最高 4K@144Hz，DisplayPort 1.4 最高 4K@144Hz（DSC 压缩下 4K@240Hz）；(3) DP MST 菊花链——每台显示器须支持 DP MST 直通，降低总带宽；(4) KVM 切换器——廉价切换器不支持所有 EDID 配置文件；(5) iGPU 与 dGPU 的 HDMI 端口混淆。诊断：CRU（自定义分辨率实用程序）。"
        }
    },
    {
        id: "gpu-color-output", type: "hardware", subcategory: "gpu",
        code: "GPU Color Output / Washed Out Colors on Monitor",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "Barvy na monitoru jsou vybledlé nebo příliš saturované po reinstalaci ovladače – špatný color range nebo ICC profil.",
            en: "Colors on monitor look washed out or oversaturated after driver reinstall – wrong color range or ICC profile.",
            zh: "重新安装驱动程序后显示器颜色看起来褪色或过度饱和——颜色范围或 ICC 配置文件错误。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Nastavte Full Dynamic Range v NVIDIA Control Panel:</strong> Klikněte pravým na plochu → NVIDIA Control Panel → Zobrazení → Upravit nastavení barev plochy → Výstupní dynamický rozsah = <strong>Full (0-255)</strong>. Tím odstraníte „vybledlý" obraz způsobený Limited range (16-235).</li>
<li><strong>Nastavte Full Range na AMD:</strong> Klikněte pravým na plochu → Radeon Software → Zobrazení → Hloubka barev a pixelový formát → nastavte <strong>RGB Full</strong> nebo <strong>YCbCr 4:4:4</strong>.</li>
<li><strong>Zkontrolujte ICC profil monitoru:</strong> Spusťte <code>colorcpl.exe</code> (vyhledejte „Správa barev" v Start) → záložka Zařízení → vyberte monitor → zkontrolujte, zda je přiřazen správný profil. Správný ICC profil stáhněte z webu výrobce monitoru.</li>
<li><strong>Vypněte HDR pokud je nežádoucí:</strong> Nastavení → Systém → Zobrazení → HDR → vypněte, pokud váš monitor nepodporuje plný HDR (FALD). HDR v Windows může způsobovat nepřirozené barvy na SDR obsahu.</li>
<li><strong>Zkuste jiný kabel nebo port:</strong> Poškozený nebo levný HDMI kabel může způsobit omezení bitové hloubky (6-bit místo 8-bit) a tím nepřirozené barvy.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Set Full Dynamic Range in NVIDIA Control Panel:</strong> Right-click the desktop → NVIDIA Control Panel → Display → Adjust desktop color settings → Output dynamic range = <strong>Full (0–255)</strong>. This removes the "washed out" effect caused by the Limited range (16–235) setting.</li>
<li><strong>Set Full Range on AMD:</strong> Right-click the desktop → Radeon Software → Display → Color Depth & Pixel Format → set to <strong>RGB Full</strong> or <strong>YCbCr 4:4:4</strong>.</li>
<li><strong>Check the monitor's ICC profile:</strong> Run <code>colorcpl.exe</code> (search "Color Management" in Start) → Devices tab → select your monitor → verify the correct profile is assigned. Download the correct ICC profile from your monitor manufacturer's website.</li>
<li><strong>Disable HDR if unwanted:</strong> Settings → System → Display → HDR → disable it if your monitor doesn't support full HDR (FALD). Windows HDR mode can cause unnatural colors on SDR content.</li>
<li><strong>Try a different cable or port:</strong> A damaged or cheap HDMI cable can reduce color depth (6-bit instead of 8-bit), causing unnatural colors on screen.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>在 NVIDIA 控制面板中设置全动态范围：</strong>右键点击桌面 → NVIDIA 控制面板 → 显示 → 调整桌面颜色设置 → 输出动态范围 = <strong>全（0-255）</strong>。这将消除由受限范围（16-235）设置引起的"褪色"效果。</li>
<li><strong>在 AMD 上设置全范围：</strong>右键点击桌面 → Radeon 软件 → 显示 → 颜色深度和像素格式 → 设置为 <strong>RGB 全范围</strong>或 <strong>YCbCr 4:4:4</strong>。</li>
<li><strong>检查显示器的 ICC 配置文件：</strong>运行 <code>colorcpl.exe</code>（在开始菜单搜索"颜色管理"）→ 设备选项卡 → 选择您的显示器 → 验证是否分配了正确的配置文件。从显示器制造商的网站下载正确的 ICC 配置文件。</li>
<li><strong>禁用不需要的 HDR：</strong>设置 → 系统 → 显示 → HDR → 如果您的显示器不支持完整 HDR，请禁用。Windows HDR 模式可能会导致 SDR 内容颜色失真。</li>
<li><strong>尝试其他线缆或端口：</strong>损坏或廉价的 HDMI 线缆可能降低色深（6位而非8位），导致屏幕颜色失真。</li>
</ol>`
        },
        details: {
            cs: "GPU color output má dvě klíčová nastavení: Color Range a Color Space. Color Range: Full (0–255, PC standard) vs Limited (16–235, TV standard). Po reinstalaci GPU ovladače nebo přepnutí na HDMI připojení může ovladač automaticky přepnout na Limited range, způsobujíce 'vybledlý' obraz. Oprava: NVIDIA Control Panel → Display → Adjust desktop color settings → Output dynamic range = Full. AMD: Radeon Software → Display → Color Depth & Pixel Format → nastavte YCbCr 4:4:4 nebo RGB Full. ICC profily: každý monitor má svůj ICC profil popisující color gamut a gamma. Chybný ICC profil = špatná barevná reprodukce. Windows → Color Management (colorcpl.exe) → Devices → vyberte monitor → přidejte správný ICC profil (stáhněte z webu výrobce monitoru). Kalibrace: DisplayCAL (free) + kolorimetr (X-Rite i1Display Pro, Calibrite ColorChecker) pro professional kalibrace. HDR nastavení: NVIDIA RTX/AMD RX podporuje HDR10 přes HDMI 2.1 nebo DP 1.4 – Windows HDR mode může způsobit nesprávné barvy v SDR obsahu pokud monitor nepodporuje FALD (Full Array Local Dimming).",
            en: "GPU color output has two key settings: Color Range and Color Space. Color Range: Full (0–255, PC standard) vs Limited (16–235, TV standard). After a GPU driver reinstall or switching to HDMI the driver may auto-switch to Limited range, causing a washed-out image. Fix: NVIDIA Control Panel → Display → Adjust desktop color settings → Output dynamic range = Full. AMD: Radeon Software → Display → Color Depth & Pixel Format → set YCbCr 4:4:4 or RGB Full. ICC profiles: each monitor has an ICC profile describing its color gamut and gamma; a wrong ICC profile = incorrect color reproduction. Windows Color Management (colorcpl.exe) → Devices → select monitor → add the correct ICC profile (download from monitor manufacturer). Calibration: DisplayCAL (free) + colorimeter (X-Rite i1Display Pro, Calibrite ColorChecker). HDR: NVIDIA RTX/AMD RX supports HDR10 via HDMI 2.1 or DP 1.4 – Windows HDR mode may cause incorrect SDR colors if the panel lacks FALD.",
            en: "GPU color output has two key settings: Color Range and Color Space. Color Range: Full (0–255, PC standard) vs Limited (16–235, TV standard). After a GPU driver reinstall or switching to HDMI, the driver may auto-switch to Limited range, causing a washed-out image. Fix: NVIDIA Control Panel → Display → Adjust desktop color settings → Output dynamic range = Full. AMD: Radeon Software → Display → Color Depth & Pixel Format → set YCbCr 4:4:4 or RGB Full. ICC profiles: each monitor has an ICC profile describing its color gamut and gamma; a wrong profile causes incorrect color reproduction. Windows Color Management (colorcpl.exe) → Devices → add correct ICC profile (from monitor manufacturer). Calibration: DisplayCAL (free) + colorimeter (X-Rite i1Display Pro). HDR: Windows HDR mode may cause incorrect SDR colors if the panel lacks FALD.",
            zh: "GPU 颜色输出有两个关键设置：颜色范围和颜色空间。颜色范围：全（0–255，PC 标准）vs 受限（16–235，电视标准）。重装 GPU 驱动或切换到 HDMI 后，驱动可能自动切换为受限范围，导致图像褪色。修复：NVIDIA 控制面板→显示→输出动态范围=全；AMD：Radeon 软件→显示→设置 YCbCr 4:4:4 或 RGB 全范围。ICC 配置文件：每台显示器有 ICC 配置文件描述色域和伽马，错误的配置文件=颜色再现不正确。Windows 颜色管理→添加正确的 ICC 配置文件。校准：DisplayCAL + 色度计。"
        }
    },

    // =========================================================
    // === CPU – rozšíření ===
    // =========================================================
    {
        id: "cpu-imc-instability", type: "hardware", subcategory: "cpu",
        code: "IMC Instability / Memory Controller Error",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "Systém havaruje při vysoké rychlosti RAM i přes správné XMP nastavení – IMC procesoru nestabilní.",
            en: "System crashes with high RAM speed even with correct XMP – CPU Integrated Memory Controller instability.",
            zh: "即使 XMP 设置正确，高速内存时系统崩溃——CPU 集成内存控制器不稳定。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Snižte frekvenci RAM na stabilní hodnotu:</strong> Restartujte do BIOSu a snižte frekvenci RAM (XMP) na DDR4-3600 nebo DDR5-6000 — to jsou typicky nejstabilnější „sweet spoty" pro AMD Ryzen a Intel.</li>
<li><strong>Zkontrolujte nastavení FCLK (AMD Ryzen):</strong> Otevřete Ryzen Master nebo BIOS → AMD Overclocking. FCLK by měl odpovídat přesně polovině RAM frekvence (např. RAM 3600 MT/s = FCLK 1800 MHz). Nesoulad způsobuje záseky a nestabilitu.</li>
<li><strong>Mírně zvyšte SOC napětí nebo VDDQ:</strong> V BIOSu zkuste zvýšit SOC napětí (AMD) nebo VDDQ (Intel DDR5) o 0,025 V. Tím podpoříte IMC při přenosu dat přes paměťový řadič.</li>
<li><strong>Otestujte RAM stabilitní testem:</strong> Spusťte <strong>MemTest86</strong> přes USB (bootovací médium) minimálně 2 průchody, nebo <strong>TM5 Extreme</strong> ve Windows. Chyba = IMC nestabilní nebo špatné paměťové moduly.</li>
<li><strong>Zkuste jednu paměťovou tyč ve slotu A2:</strong> Testujte každý modul samostatně v doporučeném slotu (obvykle A2 nebo B2) pro izolování vadného modulu nebo slotu.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Lower the RAM frequency to a stable value:</strong> Restart into BIOS and lower the RAM speed (XMP) to DDR4-3600 or DDR5-6000 — these are typically the most stable "sweet spots" for AMD Ryzen and Intel.</li>
<li><strong>Check the FCLK setting (AMD Ryzen):</strong> Open Ryzen Master or BIOS → AMD Overclocking. FCLK should equal exactly half the RAM frequency (e.g., RAM 3600 MT/s = FCLK 1800 MHz). A mismatch causes micro-stutter and instability.</li>
<li><strong>Slightly increase SOC voltage or VDDQ:</strong> In BIOS, try increasing SOC voltage (AMD) or VDDQ (Intel DDR5) by 0.025 V. This helps the IMC handle data transfers through the memory controller.</li>
<li><strong>Test RAM stability:</strong> Run <strong>MemTest86</strong> via a bootable USB (minimum 2 passes), or <strong>TM5 Extreme</strong> within Windows. Any errors indicate IMC instability or faulty memory modules.</li>
<li><strong>Test one stick at a time in slot A2:</strong> Test each module separately in the recommended slot (usually A2 or B2) to isolate a faulty module or a bad slot.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>将内存频率降低到稳定值：</strong>重启进入 BIOS，将内存速度（XMP）降低到 DDR4-3600 或 DDR5-6000——这些通常是 AMD Ryzen 和 Intel 最稳定的"甜蜜点"。</li>
<li><strong>检查 FCLK 设置（AMD Ryzen）：</strong>打开 Ryzen Master 或 BIOS → AMD 超频。FCLK 应等于内存频率的一半（例如内存 3600 MT/s = FCLK 1800 MHz）。不匹配会导致微卡顿和不稳定。</li>
<li><strong>轻微提高 SOC 电压或 VDDQ：</strong>在 BIOS 中，尝试将 SOC 电压（AMD）或 VDDQ（Intel DDR5）提高 0.025 V，这有助于 IMC 处理通过内存控制器的数据传输。</li>
<li><strong>测试内存稳定性：</strong>通过可启动 USB 运行 <strong>MemTest86</strong>（至少 2 次），或在 Windows 中运行 <strong>TM5 Extreme</strong>。任何错误都表明 IMC 不稳定或内存模块有故障。</li>
<li><strong>每次测试一根内存条（插在 A2 槽）：</strong>在推荐的插槽（通常是 A2 或 B2）中单独测试每个模块，以隔离故障模块或插槽。</li>
</ol>`
        },
        details: {
            cs: "IMC (Integrated Memory Controller) je součást CPU die, která přímo řídí komunikaci s DRAM. Každý CPU exemplář má odlišnou 'silicon lottery' kvalitu IMC, ovlivňující, jak vysokou frekvenci RAM toleruje. AMD Ryzen specifika: Infinity Fabric (FCLK) je interní sběrnice AMD – výkon Ryzenu závisí na FCLK = MCLK (memory clock) synchronním modu (1:1 ratio). Ryzen 5000: maximum FCLK je zpravidla 1800–2000 MHz (závisí na konkrétním CPU). Při DDR4-3600: FCLK = 1800 MHz – obvykle stabilní. Při DDR4-4000: FCLK = 2000 MHz – mnoho CPU nestabilní. Řešení: zůstaňte na DDR4-3600 nebo DDR4-4000 s 2:1 ratio (FCLK 1600 MHz, pomalejší ale stabilní). AMD Ryzen 7000 (DDR5): FCLK až 2400–2800 MHz, limitován SOC voltage a IMC kvality. Intel 12.–14. gen: IMC toleruje DDR5-7000+ na lepších vzárcích; VDDQ (DDR5 VDD2) napájení ovlivní stabilitu. Diagnostika: Ryzen Master zobrazí FCLK; HWInfo64 Memory Bus Speed; MemTest86 nebo TM5 odhalí IMC instabilitu.",
            en: "The IMC (Integrated Memory Controller) is a part of the CPU die that directly manages DRAM communication. Each CPU sample has a different 'silicon lottery' IMC quality, affecting the maximum stable RAM frequency. AMD Ryzen specifics: the Infinity Fabric (FCLK) is AMD's internal interconnect – Ryzen performance depends on FCLK = MCLK synchronous mode (1:1 ratio). Ryzen 5000: typical max FCLK 1800–2000MHz (CPU-specific). DDR4-3600: FCLK = 1800MHz – usually stable. DDR4-4000: FCLK = 2000MHz – many CPUs unstable. Solution: stay at DDR4-3600 or use a 2:1 ratio (FCLK 1600MHz, slower but stable). AMD Ryzen 7000 (DDR5): FCLK up to 2400–2800MHz, limited by SOC voltage and IMC quality. Intel 12th–14th Gen: IMC tolerates DDR5-7000+ on better samples; VDDQ (DDR5 VDD2) voltage affects stability. Diagnostics: Ryzen Master shows FCLK; HWInfo64 Memory Bus Speed; MemTest86 or TM5 reveals IMC instability.",
            zh: "IMC（集成内存控制器）是 CPU 芯片中直接管理 DRAM 通信的部分。每个 CPU 样品有不同的'芯片彩票'IMC 质量，影响最大稳定内存频率。AMD Ryzen 特点：Infinity Fabric（FCLK）是 AMD 内部互联——Ryzen 性能取决于 FCLK = MCLK 同步模式（1:1 比例）。Ryzen 5000 典型最大 FCLK 1800–2000MHz。DDR4-3600 通常稳定；DDR4-4000 很多 CPU 不稳定。解决方案：保持 DDR4-3600 或使用 2:1 比例。Intel 12–14 代 IMC 在更好的样品上可容忍 DDR5-7000+。诊断：Ryzen Master 显示 FCLK；MemTest86 或 TM5 暴露 IMC 不稳定。"
        }
    },

    // =========================================================
    // === WINDOWS – rozšíření ===
    // =========================================================
    {
        id: "win-profile-corrupt", type: "software", subcategory: "windows",
        code: "Windows User Profile Corrupted",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Přihlášení selže nebo Windows vytvoří dočasný profil – uživatelský profil v registru je poškozen.",
            en: "Login fails or Windows creates a temporary profile – user profile registry hive is corrupted.",
            zh: "登录失败或 Windows 创建临时配置文件——用户配置文件注册表配置单元已损坏。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Přihlaste se jako jiný správce:</strong> Na přihlašovací obrazovce vyberte jiný účet (Admin nebo Správce). Pokud nemáte jiný účet, spusťte PC do nouzového režimu s příkazovým řádkem.</li>
<li><strong>Otevřete Editor registru (regedit):</strong> Stiskněte <kbd>Win + R</kbd>, napište <code>regedit</code> a potvrďte. Přejděte na <code>HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList</code>.</li>
<li><strong>Najděte a opravte duplicitní GUID klíče:</strong> Hledejte dvě podobné složky (S-1-5-21-...). Jedna má příponu <code>.bak</code>. Přejmenujte tu bez .bak na <code>S-1-5-21-...Název.bak2</code> a tu s .bak přejmenujte (odeberte .bak). V opravené složce ověřte hodnotu <code>ProfileImagePath</code> = <code>C:\Users\váš_účet</code>.</li>
<li><strong>Restartujte PC a přihlaste se normálně.</strong> Pokud Windows stále vytváří dočasný profil, přejděte na krok 5.</li>
<li><strong>Vytvořte nový účet a přeneste data:</strong> Vytvořte nový uživatelský účet v Nastavení → Účty. Zkopírujte obsah ze starého profilu (<code>C:\Users\starý_profil</code>) do nového — VYJMA souborů <code>NTUSER.*</code>.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Log in as a different administrator:</strong> On the login screen, select a different account (Admin or Administrator). If you have no other account, boot into Safe Mode with Command Prompt.</li>
<li><strong>Open the Registry Editor (regedit):</strong> Press <kbd>Win + R</kbd>, type <code>regedit</code> and confirm. Navigate to <code>HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList</code>.</li>
<li><strong>Find and fix the duplicate GUID keys:</strong> Look for two similar folders (S-1-5-21-...). One has a <code>.bak</code> suffix. Rename the one without .bak to <code>S-1-5-21-...Name.bak2</code>, then rename the .bak one to remove .bak. In the repaired key, verify <code>ProfileImagePath</code> = <code>C:\Users\your_account</code>.</li>
<li><strong>Restart your PC and log in normally.</strong> If Windows still creates a temporary profile, proceed to step 5.</li>
<li><strong>Create a new account and transfer data:</strong> Create a new user account in Settings → Accounts. Copy the contents of the old profile folder (<code>C:\Users\old_profile</code>) to the new one — EXCLUDING <code>NTUSER.*</code> files.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>以其他管理员身份登录：</strong>在登录屏幕上，选择其他账户（管理员）。如果没有其他账户，请以带命令提示符的安全模式启动。</li>
<li><strong>打开注册表编辑器 (regedit)：</strong>按 <kbd>Win + R</kbd>，输入 <code>regedit</code> 并确认。导航到 <code>HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList</code>。</li>
<li><strong>查找并修复重复的 GUID 键：</strong>查找两个相似的文件夹（S-1-5-21-...），其中一个有 <code>.bak</code> 后缀。将没有 .bak 的重命名为 <code>S-1-5-21-...名称.bak2</code>，然后将带 .bak 的重命名为不带 .bak。在修复的键中，验证 <code>ProfileImagePath</code> = <code>C:\Users\您的账户</code>。</li>
<li><strong>重启电脑并正常登录。</strong>如果 Windows 仍创建临时配置文件，请继续执行步骤 5。</li>
<li><strong>创建新账户并转移数据：</strong>在设置 → 账户中创建新用户账户。将旧配置文件文件夹 (<code>C:\Users\旧_配置文件</code>) 的内容复制到新文件夹——排除 <code>NTUSER.*</code> 文件。</li>
</ol>`
        },
        details: {
            cs: "Windows User Profile je sada složek (C:\\Users\\[username]) a registrových úlů (NTUSER.DAT). Při přihlášení Windows načte NTUSER.DAT do HKEY_CURRENT_USER. Příznaky poškození: 'You have been signed in with a temporary profile', nebo prázdná plocha, nebo bílá obrazovka. Příčiny: (1) Výpadek napájení nebo tvrdý reset při zápisu NTUSER.DAT. (2) Disková chyba poškodila NTUSER.DAT. (3) Antivirový scan uzamkl soubor při přihlešení. Oprava: (a) Přihlaste se jako jiný uživatel/Admin. (b) Regedit → HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList → hledejte dvě GUID s podobným S-1-5-21... (jedno s připojeným .bak). (c) Přejmenujte: bez .bak přidejte .bak, původní .bak přejmenujte na bez .bak. (d) U přejmenovaného záznamu ověřte ProfileImagePath = C:\\Users\\[username]. (e) Restartujte. (f) Pokud Windows vytvoří nový profil: zkopírujte obsah C:\\Users\\[old_profile] do nového profilu (kromě NTUSER.* souborů). SFC + DISM po opravě pro ověření integrity.",
            en: "A Windows User Profile consists of a folder set (C:\\Users\\[username]) and registry hives (NTUSER.DAT). At login, Windows loads NTUSER.DAT into HKEY_CURRENT_USER. Corruption symptoms: 'You have been signed in with a temporary profile', empty desktop, or white screen. Causes: (1) Power loss or hard reset while writing NTUSER.DAT. (2) Disk error corrupted NTUSER.DAT. (3) Antivirus scan locked the file during login. Fix: (a) Log in as another user/Admin. (b) Regedit → HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList → look for two GUIDs (one with .bak suffix). (c) Rename: add .bak to the one without it; rename .bak to without .bak. (d) Verify ProfileImagePath = C:\\Users\\[username] on the renamed entry. (e) Restart. (f) If Windows creates a new profile: copy contents of C:\\Users\\[old_profile] to the new profile (excluding NTUSER.* files). Run SFC + DISM post-repair for integrity verification.",
            zh: "Windows 用户配置文件由文件夹集（C:\\Users\\[用户名]）和注册表配置单元（NTUSER.DAT）组成。损坏症状：'您已使用临时配置文件登录'、空桌面或白屏。原因：(1) 写入 NTUSER.DAT 时断电或强制重启；(2) 磁盘错误损坏了 NTUSER.DAT；(3) 登录时杀毒软件锁定文件。修复：(a) 以其他用户/管理员登录；(b) 在 regedit 的 ProfileList 中找到两个相似的 GUID（一个带 .bak 后缀）；(c) 重命名以交换它们；(d) 验证 ProfileImagePath 正确；(e) 重启；(f) 如需要，将旧配置文件数据复制到新配置文件。"
        }
    },
    {
        id: "win-registry-bloat", type: "software", subcategory: "windows",
        code: "Registry Corruption / Slow Boot from Registry Bloat",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Systém startuje pomalu nebo aplikace hlásí chyby registru – registr je přeplněný nebo poškozen.",
            en: "System boots slowly or apps report registry errors – registry is bloated or contains corrupted keys.",
            zh: "系统启动缓慢或应用程序报告注册表错误——注册表臃肿或包含损坏的键。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Opravte systémové soubory pomocí SFC:</strong> Otevřete CMD jako správce a spusťte <code>sfc /scannow</code>. Nástroj zkontroluje a automaticky opraví poškozené systémové soubory včetně registrových komponent.</li>
<li><strong>Proveďte hlubší opravu pomocí DISM:</strong> Pokud SFC ohlásí chyby, spusťte nejprve <code>DISM /Online /Cleanup-Image /RestoreHealth</code>. Tento příkaz stáhne čisté systémové soubory přímo od Microsoftu.</li>
<li><strong>⚠️ NEPOUŽÍVEJTE registry cleanery!</strong> Nástroje jako CCleaner „Registry Cleaner" mohou způsobit nenávratné poškození systému. Microsoft ani žádný odborník je nedoporučuje — nepoužívejte je.</li>
<li><strong>Obnovte systém ze záchranného bodu:</strong> Vyhledejte „Vytvořit bod obnovení" v Start → klikněte na „Obnovení systému" → vyberte záchranný bod ze doby, kdy systém fungoval správně.</li>
<li><strong>Zkontrolujte autostart programy:</strong> Stáhněte nástroj <strong>Autoruns</strong> (Microsoft/Sysinternals) — zobrazí všechny programy spouštěné při startu. Podezřelé nebo neznámé položky deaktivujte nebo smažte.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Repair system files with SFC:</strong> Open CMD as Administrator and run <code>sfc /scannow</code>. The tool checks and automatically repairs corrupted system files including registry components.</li>
<li><strong>Perform deeper repair with DISM:</strong> If SFC reports errors, first run <code>DISM /Online /Cleanup-Image /RestoreHealth</code>. This command downloads clean system files directly from Microsoft.</li>
<li><strong>⚠️ DO NOT use registry cleaners!</strong> Tools like CCleaner's "Registry Cleaner" can cause irreversible system damage. Neither Microsoft nor any expert recommends them — avoid them entirely.</li>
<li><strong>Restore from a System Restore Point:</strong> Search "Create a restore point" in Start → click "System Restore" → select a restore point from when the system was working correctly.</li>
<li><strong>Check autostart programs:</strong> Download <strong>Autoruns</strong> (Microsoft/Sysinternals) — it shows all programs launched at startup. Disable or delete any suspicious or unknown entries.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>使用 SFC 修复系统文件：</strong>以管理员身份打开 CMD，运行 <code>sfc /scannow</code>。该工具检查并自动修复损坏的系统文件，包括注册表组件。</li>
<li><strong>使用 DISM 进行更深层次的修复：</strong>如果 SFC 报告错误，先运行 <code>DISM /Online /Cleanup-Image /RestoreHealth</code>。此命令直接从微软下载干净的系统文件。</li>
<li><strong>⚠️ 不要使用注册表清理器！</strong>像 CCleaner 的"注册表清理器"这样的工具可能会造成无法修复的系统损坏。微软和任何专家都不推荐它们——完全避免使用。</li>
<li><strong>从系统还原点恢复：</strong>在开始菜单搜索"创建还原点" → 点击"系统还原" → 选择系统正常工作时的还原点。</li>
<li><strong>检查自启动程序：</strong>下载 <strong>Autoruns</strong>（微软/Sysinternals）——它显示启动时运行的所有程序。禁用或删除任何可疑或未知的条目。</li>
</ol>`
        },
        details: {
            cs: "Windows Registry je hierarchická databáze konfigurace systému uložena v hive souborech (SYSTEM, SOFTWARE, SECURITY, SAM, NTUSER.DAT) v C:\\Windows\\System32\\config. Registry Bloat nastane po dlouhodobém provozu s mnoha instalacemi/odinstalacemi, ale vliv na výkon je typicky minimální (moderní Windows loader). Skutečné problémy registru: (1) Poškozené klíče aplikací způsobující Application Error 'Error accessing the Windows Registry'. (2) Chybějící HKCR (HKEY_CLASSES_ROOT) asociace souborů – soubory se neotvírají správnou aplikací. (3) Poškozené Run klíče způsobující pády při startu. (4) Malware zanechávající záznamy v autostart klíčích (HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run). Bezpečná oprava: SFC opraví poškozené systémové klíče. System Restore obnoví registr do dřívějšího stavu. Varování: Nikdy nepoužívejte 'registry cleanery' jako CCleaner Registry Cleaner – Microsoft ani experti je nedoporučují; mohou způsobit neopravitelné poškození. Ruční analýza: Autoruns (Sysinternals/Microsoft) zobrazí všechny autostart položky registru – podezřelé lze deaktivovat nebo smazat.",
            en: "The Windows Registry is a hierarchical configuration database stored in hive files (SYSTEM, SOFTWARE, SECURITY, SAM, NTUSER.DAT) in C:\\Windows\\System32\\config. Registry bloat occurs after prolonged use with many installs/uninstalls, but its performance impact is typically minimal on modern Windows. Real registry issues: (1) Corrupted application keys causing 'Error accessing the Windows Registry'. (2) Missing HKCR (HKEY_CLASSES_ROOT) file associations – files don't open with the correct app. (3) Corrupted Run keys causing startup crashes. (4) Malware leaving entries in autostart keys (HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run). Safe repairs: SFC fixes corrupted system keys. System Restore reverts the registry to an earlier state. Warning: never use 'registry cleaners' (CCleaner Registry Cleaner, etc.) – neither Microsoft nor experts recommend them; they can cause irreparable damage. Manual analysis: Autoruns (Sysinternals) shows all autostart registry entries – suspicious entries can be disabled or deleted.",
            zh: "Windows 注册表是分层配置数据库，存储在 C:\\Windows\\System32\\config 中的配置单元文件中。注册表臃肿发生在长期使用大量安装/卸载后，但对现代 Windows 性能影响通常很小。真正的注册表问题：(1) 应用程序键损坏导致'访问注册表错误'；(2) HKCR 文件关联缺失；(3) Run 键损坏导致启动崩溃；(4) 恶意软件在自启动键中留下条目。安全修复：SFC 修复损坏的系统键；系统还原回滚注册表。警告：切勿使用注册表清理器——可能造成不可挽回的损坏。分析工具：Autoruns（Sysinternals）。"
        }
    },

    // =========================================================
    // === BIOS – rozšíření ===
    // =========================================================
    {
        id: "bios-secure-boot-fail", type: "software", subcategory: "bios",
        vendors: ["uefi"],
        code: "Secure Boot Violation / OS Won't Boot",
        category: { cs: "BIOS / UEFI", en: "BIOS / UEFI", zh: "BIOS / UEFI" },
        description: {
            cs: "PC odmítá bootovat po přidání nového OS nebo po aktualizaci – Secure Boot blokuje nezpodepsaný bootloader.",
            en: "PC refuses to boot after adding a new OS or update – Secure Boot blocks an unsigned bootloader.",
            zh: "添加新操作系统或更新后 PC 拒绝启动——安全启动阻止未签名的启动加载程序。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Dočasně zakažte Secure Boot pro instalaci:</strong> Restartujte do BIOSu (<kbd>Del</kbd> nebo <kbd>F2</kbd>) → UEFI / Security / Boot → Secure Boot → Disabled. Nainstalujte OS nebo bootloader a poté Secure Boot opět zapněte.</li>
<li><strong>Použijte distro s podporou Secure Boot (Linux):</strong> Ubuntu, Fedora a openSUSE mají předinstalovaný shim bootloader podepsaný Microsoftem — fungují s aktivním Secure Boot bez nutnosti jeho vypínání.</li>
<li><strong>Enrollujte certifikát přes MokManager (Arch/Gentoo):</strong> Po restartu se zobrazí obrazovka MokManager (Machine Owner Key Manager). Vyberte „Enroll key" a přidejte svůj podpisový certifikát (.cer soubor). Tím autorizujete vlastní jádro.</li>
<li><strong>Obnovte výchozí Secure Boot klíče:</strong> V BIOSu hledejte možnost „Restore factory keys" nebo „Reset to Setup Mode" pro obnovení původních UEFI klíčů. Pak znovu zaregistrujte potřebné certifikáty.</li>
<li><strong>Pro dual boot (Windows + Linux):</strong> Ujistěte se, že při instalaci Linuxu je Secure Boot dočasně vypnutý. Po instalaci přidejte bootloader do UEFI přes <code>efibootmgr</code> nebo MokManager.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Temporarily disable Secure Boot for installation:</strong> Restart into BIOS (<kbd>Del</kbd> or <kbd>F2</kbd>) → UEFI / Security / Boot → Secure Boot → Disabled. Install the OS or bootloader, then re-enable Secure Boot afterward.</li>
<li><strong>Use a distro with Secure Boot support (Linux):</strong> Ubuntu, Fedora, and openSUSE include the shim bootloader signed by Microsoft — they work with Secure Boot enabled without disabling it.</li>
<li><strong>Enroll your certificate via MokManager (Arch/Gentoo):</strong> After reboot, a MokManager screen appears. Select "Enroll key" and add your signing certificate (.cer file). This authorizes your custom kernel.</li>
<li><strong>Restore default Secure Boot keys:</strong> In BIOS, look for "Restore factory keys" or "Reset to Setup Mode" to restore original UEFI keys. Then re-enroll any needed certificates.</li>
<li><strong>For dual boot (Windows + Linux):</strong> Ensure Secure Boot is disabled during Linux installation. After installing, add the bootloader to UEFI via <code>efibootmgr</code> or MokManager.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>临时禁用安全启动以进行安装：</strong>重启进入 BIOS（<kbd>Del</kbd> 或 <kbd>F2</kbd>）→ UEFI/安全/启动 → 安全启动 → 禁用。安装操作系统或引导加载程序后，重新启用安全启动。</li>
<li><strong>使用支持安全启动的发行版（Linux）：</strong>Ubuntu、Fedora 和 openSUSE 包含经微软签名的 shim 引导加载程序——无需禁用安全启动即可正常工作。</li>
<li><strong>通过 MokManager 注册证书（Arch/Gentoo）：</strong>重启后出现 MokManager 界面，选择"注册密钥"并添加您的签名证书（.cer 文件），这将授权您的自定义内核。</li>
<li><strong>恢复默认安全启动密钥：</strong>在 BIOS 中查找"恢复出厂密钥"或"重置为设置模式"以恢复原始 UEFI 密钥，然后重新注册所需证书。</li>
<li><strong>双系统启动（Windows + Linux）：</strong>确保在安装 Linux 时临时禁用安全启动。安装后，通过 <code>efibootmgr</code> 或 MokManager 将引导加载程序添加到 UEFI。</li>
</ol>`
        },
        details: {
            cs: "Secure Boot je UEFI bezpečnostní funkce zabraňující spuštění nepodepsaného nebo nezjávněného bootloaderu. Funguje přes digitální podpisový řetězec: UEFI db (databáze povolených klíčů) → shim (podepsaný Microsoft) → GRUB/bootmgr (podepsaný distribucí). Databáze klíčů: PK (Platform Key – master klíč, výrobce desky), KEK (Key Exchange Key), db (allowed), dbx (forbidden – blacklist). Příčiny selhání: (1) Linux distribuce bez shim (Arch Linux, Gentoo, custom) – bootloader není podepsán Microsoftem. (2) UEFI dbx update (Microsoft vydal blacklist aktualizaci) zablokoval starší GRUB/shim. (3) Dual boot s Windows a Linux: Windows nainstaloval UEFI update konfigurující SVN (Secure Version Number), zablokující starší GRUB. (4) Reinstalace Windows přepsala EFI partition a odstranil Linux záznamy. Řešení pro Linux: distributions s shim (Ubuntu, Fedora, openSUSE) jsou Secure Boot kompatibilní. Arch/Gentoo: generujte vlastní klíče, podepište kernel, enrollujte přes 'sbctl'. MokManager: Machine Owner Key Manager – jednorázová boot GUI pro enrollování certifikátů. Diagnostika: efibootmgr -v (Linux) zobrazí UEFI boot záznamy; Windows: msinfo32 → BIOS Mode = UEFI + Secure Boot State.",
            en: "Secure Boot is a UEFI security feature preventing the execution of unsigned or unrecognized bootloaders. It works via a digital signature chain: UEFI db (allowed keys database) → shim (Microsoft-signed) → GRUB/bootmgr (distro-signed). Key databases: PK (Platform Key – master, board manufacturer), KEK (Key Exchange Key), db (allowed), dbx (forbidden – blacklist). Failure causes: (1) Linux distros without shim (Arch, Gentoo, custom) – bootloader not Microsoft-signed. (2) UEFI dbx update (Microsoft blacklist update) blocked older GRUB/shim. (3) Windows UEFI update configured SVN (Secure Version Number), blocking older GRUB. (4) Windows reinstall overwrote EFI partition, removing Linux entries. Solutions for Linux: distros with shim (Ubuntu, Fedora, openSUSE) are Secure Boot compatible. Arch/Gentoo: generate own keys, sign kernel, enroll via 'sbctl'. MokManager: Machine Owner Key Manager – one-time boot GUI for enrolling certificates. Diagnostics: 'efibootmgr -v' (Linux) shows UEFI boot entries; Windows: msinfo32 → BIOS Mode = UEFI + Secure Boot State.",
            zh: "安全启动是 UEFI 安全功能，防止执行未签名或未识别的引导加载程序，通过数字签名链运作：UEFI db → shim（微软签名）→ GRUB/bootmgr（发行版签名）。密钥数据库：PK（平台密钥）、KEK、db（允许）、dbx（禁止黑名单）。失败原因：(1) 没有 shim 的 Linux 发行版（Arch、Gentoo）；(2) UEFI dbx 更新阻止了旧 GRUB/shim；(3) Windows UEFI 更新配置了 SVN 阻止旧 GRUB；(4) Windows 重装覆盖 EFI 分区删除 Linux 条目。Linux 解决方案：使用带 shim 的发行版（Ubuntu、Fedora）；Arch/Gentoo 使用 sbctl 注册自定义密钥。"
        }
    },
    {
        id: "gpu-coil-whine", type: "hardware", subcategory: "gpu",
        vendors: ["nvidia", "amd"],
        code: "GPU Coil Whine / High Pitch Buzzing",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "Grafická karta vydává vysoký pískavý nebo bzučivý zvuk, který se mění podle FPS.",
            en: "GPU emits a high-pitched squealing or buzzing sound that changes with frame rate.",
            zh: "显卡发出高频尖叫或嗡嗡声，并随帧率变化。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Omezte FPS pomocí V-Sync nebo Frame Limiter:</strong> Povolte V-Sync v nastavení hry nebo nastavte Frame Cap (max FPS) v NVIDIA/AMD ovladači. Neomezené FPS = maximální proudový odběr = nejhlasitější pískání.</li>
<li><strong>Proveďte undervolt GPU (snížení napětí):</strong> Otevřete <strong>MSI Afterburner</strong> → klikněte na „Voltage/Frequency Curve" → snižte napětí při maximálním taktu. Méně napětí = méně proudu = méně vibrací cívek.</li>
<li><strong>Spusťte burn-in test:</strong> Nechte kartu běžet pod zátěží (FurMark) 1–2 hodiny. Vibrace měděného vinutí se někdy usadí přirozeně po zahřívání a ochlazování.</li>
<li><strong>Zkontrolujte zdroj napájení (PSU):</strong> Levné PSU s vysokým napěťovým zvlněním (ripple) zhoršují coil whine. Vyměňte za kvalitnější model (80+ Gold nebo Platinum certifikát).</li>
<li><strong>Poznámka:</strong> Coil whine není závada — jedná se o fyzikální vlastnost elektroniky. Je to neodstranitelné, pouze zmírnitelné. Pokud je zvuk nepřijatelný, kontaktujte výrobce karty pro výměnu.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Limit FPS with V-Sync or a Frame Limiter:</strong> Enable V-Sync in the game settings, or set a Frame Cap (max FPS) in the NVIDIA/AMD driver. Unlimited FPS = maximum current draw = loudest whine.</li>
<li><strong>Undervolt the GPU (reduce voltage):</strong> Open <strong>MSI Afterburner</strong> → click "Voltage/Frequency Curve" → reduce the voltage at maximum clock speed. Less voltage = less current = less coil vibration.</li>
<li><strong>Run a burn-in test:</strong> Let the card run under load (FurMark) for 1–2 hours. The copper winding vibrations sometimes settle naturally after repeated heating and cooling cycles.</li>
<li><strong>Check your power supply (PSU):</strong> Cheap PSUs with high voltage ripple worsen coil whine. Replace with a higher-quality unit (80+ Gold or Platinum certified).</li>
<li><strong>Note:</strong> Coil whine is not a hardware failure — it is a physical property of electronics. It can only be reduced, not eliminated. If the sound is unacceptable, contact the GPU manufacturer for a replacement.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>通过垂直同步或帧率限制器限制 FPS：</strong>在游戏设置中启用垂直同步，或在 NVIDIA/AMD 驱动中设置帧率上限。不限帧 = 最大电流消耗 = 最响的啸叫声。</li>
<li><strong>对 GPU 进行降压：</strong>打开 <strong>MSI Afterburner</strong> → 点击"电压/频率曲线" → 降低最大频率时的电压。电压越低 = 电流越小 = 线圈振动越小。</li>
<li><strong>进行烤机测试：</strong>让显卡在负载下运行（FurMark）1-2 小时。铜线圈振动有时会在反复加热和冷却循环后自然稳定。</li>
<li><strong>检查电源（PSU）：</strong>低质量的电源具有高电压纹波，会加剧电感啸叫。更换为更高质量的型号（80+ 金牌或铂金认证）。</li>
<li><strong>注意：</strong>电感啸叫不是硬件故障——它是电子设备的物理特性。只能减轻，无法消除。如果声音难以接受，请联系显卡制造商申请更换。</li>
</ol>`
        },
        details: {
            cs: "Coil Whine (pískání cívek) je fyzikální jev známý jako elektromagnetická interference. Dochází k němu v cívkách VRM (Voltage Regulator Module) grafické karty. Když proud prochází cívkou, vzniká magnetické pole, které způsobuje mikroskopické vibrace měděného vinutí. Pokud frekvence těchto vibrací odpovídá slyšitelnému spektru, slyšíme pískání. Intenzita roste s protékajícím proudem (vysoké FPS = více spínání MOSFETů). Nejedná se o závadu, ale o vlastnost komponenty. Pokročilé řešení: (1) Undervolting – snížením napětí (Vcore) snížíte protékající proud a tím i intenzitu vibrací. (2) Zahoření (Burn-in) – nechte kartu běžet pod vysokou zátěží (FurMark) několik hodin, někdy se vinutí 'usadí'. (3) Výměna zdroje – interference se mohou přenášet z PSU.",
            en: "Coil whine is a physical phenomenon caused by electromagnetically induced acoustic noise. It occurs within the inductors (coils) of the GPU's VRM. As current passes through the copper windings, it creates a magnetic field that causes the coil to vibrate microscopically. If the switching frequency matches the audible spectrum, high-pitched noise is produced. It scales with current draw (high FPS = higher switching frequency). It is not a hardware failure but a characteristic of high-power electronics. Mitigation: (1) Undervolting – lowering Vcore reduces the amperage flowing through the VRM, dampening vibration. (2) Burn-in – running a stress test (FurMark) for several hours can sometimes settle the windings. (3) PSU Swap – Ripple/noise from a low-quality PSU can exacerbate coil vibration.",
            zh: "电感啸叫是一种由电磁感应引起的声学噪声现象。发生在 GPU VRM 的电感器（线圈）中。当电流通过铜线圈时，产生的磁场导致线圈发生微观振动。如果开关频率落在人耳可听范围内，就会产生高频噪音。高帧率意味着更高频率的开关动作。这并非硬件故障。缓解方法：(1) 降压：降低 Vcore 可减少通过 VRM 的电流，从而减弱振动；(2) 烤机：运行压力测试（FurMark）数小时有时能让线圈沉降；(3) 更换电源：低质量电源的纹波/噪声会加剧电感振动。"
        }
    },
    {
        id: "cpu-fpu-error", type: "hardware", subcategory: "cpu",
        vendors: ["intel", "amd"],
        code: "CPU FPU / Math Execution Error",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "Procesor generuje matematicky nesprávné výsledky. Aplikace crashují při vědeckých výpočtech.",
            en: "The processor generates mathematically incorrect results. Apps crash during floating-point calculations.",
            zh: "处理器产生错误的数学运算结果。应用程序在进行浮点运算时崩溃。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Nastavte AVX Offset v BIOSu:</strong> Přejděte do BIOSu → CPU konfigurace → AVX Offset nebo AVX-512 Offset → nastavte hodnotu -2 nebo -3. CPU sníží takt pouze při AVX operacích, čímž se stabilizuje bez ztráty výkonu v hrách.</li>
<li><strong>Spusťte diagnostický test FPU:</strong> Stáhněte <strong>Prime95</strong> → vyberte „Small FFTs" (s AVX) a nechte běžet 30 minut. Jakákoliv chyba nebo pád = FPU nestabilní.</li>
<li><strong>Snižte takt procesoru nebo vraťte OC:</strong> Pokud máte přetaktovaný CPU, vraťte takt na výchozí hodnoty v BIOSu. Agresivní OC je nejčastější příčinou FPU nestability.</li>
<li><strong>Mírně zvyšte napětí Vcore:</strong> V BIOSu zvyšte Vcore o 0,025–0,05 V. Tím dodáte procesoru více energie pro stabilní AVX výpočty, zejména u degradovaných CPU.</li>
<li><strong>Zkontrolujte teploty pod zátěží:</strong> Spusťte <strong>HWiNFO64</strong> nebo <strong>OCCT</strong> a sledujte teploty. Přehřívání způsobuje CPU throttling a nestabilitu — vyčistěte chlazení nebo vyměňte teplotní pastu.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Set AVX Offset in BIOS:</strong> Go to BIOS → CPU Configuration → AVX Offset or AVX-512 Offset → set a value of -2 or -3. The CPU lowers its multiplier only during AVX operations, stabilizing without losing gaming performance.</li>
<li><strong>Run an FPU diagnostic test:</strong> Download <strong>Prime95</strong> → select "Small FFTs" (with AVX) and let it run for 30 minutes. Any error or crash = unstable FPU.</li>
<li><strong>Lower the CPU clock or revert your OC:</strong> If you have an overclocked CPU, reset the clock to default values in BIOS. Aggressive overclocking is the most common cause of FPU instability.</li>
<li><strong>Slightly increase Vcore voltage:</strong> In BIOS, raise Vcore by 0.025–0.05 V. This provides more power for stable AVX calculations, especially on degraded CPUs.</li>
<li><strong>Check temperatures under load:</strong> Run <strong>HWiNFO64</strong> or <strong>OCCT</strong> and monitor temperatures. Overheating causes CPU throttling and instability — clean the cooling system or replace the thermal paste.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>在 BIOS 中设置 AVX 偏置：</strong>进入 BIOS → CPU 配置 → AVX 偏置或 AVX-512 偏置 → 设置值为 -2 或 -3。仅在 AVX 操作期间，CPU 会降低其倍频以保持稳定，而不影响游戏性能。</li>
<li><strong>运行 FPU 诊断测试：</strong>下载 <strong>Prime95</strong> → 选择"Small FFTs"（带 AVX），运行 30 分钟。任何错误或崩溃 = FPU 不稳定。</li>
<li><strong>降低 CPU 频率或撤销超频：</strong>如果 CPU 已超频，请在 BIOS 中将频率重置为默认值。激进的超频是 FPU 不稳定最常见的原因。</li>
<li><strong>轻微提高 Vcore 电压：</strong>在 BIOS 中将 Vcore 提高 0.025-0.05 V，这为稳定的 AVX 计算提供更多功率，尤其适用于已退化的 CPU。</li>
<li><strong>检查负载下的温度：</strong>运行 <strong>HWiNFO64</strong> 或 <strong>OCCT</strong> 并监控温度。过热会导致 CPU 降频和不稳定——清洁散热系统或更换导热膏。</li>
</ol>`
        },
        details: {
            cs: "FPU (Floating Point Unit) je část CPU dedikovaná pro operace s pohyblivou řádovou čárkou. Moderní instrukční sady jako AVX-512 jsou extrémně náročné na spotřebu a generování tepla v specifických částech čipu. Pokud je CPU nestabilní (vlivem degradace nebo undervoltu), může FPU jednotka vrátit chybný výsledek (např. 1+1=2.00000004), což vede k okamžitému pádu aplikace nebo korupci dat. Diagnostika: (1) Prime95 (Small FFTs) s aktivním AVX – teto test prověří integritu datových registrů. (2) Intel Processor Diagnostic Tool (IPDT) – spustí specifický Floating Point test. (3) OCCT CPU test s instrukční sadou AVX2. Oprava: V BIOSu nastavte 'AVX Offset' na hodnotu 2 nebo 3 – to sníží frekvenci CPU pouze při detekci AVX instrukcí, čímž zajistí stabilitu bez ztráty výkonu v běžných úlohách.",
            en: "The FPU (Floating Point Unit) is a dedicated CPU sub-component for floating-point arithmetic. Modern instruction sets like AVX-512 place extreme electrical and thermal stress on specific silicon areas. If a CPU is unstable (due to degradation or undervolting), the FPU might return incorrect values (e.g., bit-flips in mantissa), leading to immediate application crashes or silent data corruption. Diagnostics: (1) Prime95 (Small FFTs) with AVX enabled – verifies data register integrity. (2) Intel Processor Diagnostic Tool (IPDT) – runs a dedicated Floating Point pass. (3) OCCT CPU test using AVX2 instructions. Fix: Apply an 'AVX Offset' (e.g., -2 or -3) in BIOS – this reduces the multiplier only when AVX instructions are active, maintaining stability while preserving high clocks for gaming/standard apps.",
            zh: "FPU（浮点运算单元）是专门用于浮点运算的 CPU 子组件。AVX-512 等现代指令集会对特定硅片区域造成极大的电力和热量压力。如果 CPU 不稳定，FPU 可能会返回错误值，导致应用崩溃或静默数据损坏。诊断：(1) 开启 AVX 的 Prime95；(2) Intel 处理器诊断工具（IPDT）中的浮点测试；(3) 使用 AVX2 指令的 OCCT 测试。修复：在 BIOS 中设置 'AVX Offset'（例如 -2 或 -3），这仅在 AVX 指令活动时降低倍频，保障稳定性的同时不影响普通应用的频率。"
        }
    },
    {
        id: "ram-ecc-unreliable", type: "hardware", subcategory: "ram",
        vendors: ["ddr4", "ddr5"],
        code: "Uncorrectable ECC Error / Memory Parity",
        category: { cs: "Paměť RAM", en: "Memory (RAM)", zh: "内存" },
        description: {
            cs: "Detekována nekorigovatelná chyba v RAM (ECC). Systém se zastavil, aby zabránil poškození dat.",
            en: "Uncorrectable ECC error detected. System halted to prevent data corruption (NMI).",
            zh: "检测到不可纠正的 ECC 错误。系统已停止以防止数据损坏。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Zkontrolujte Event Viewer pro identifikaci slotu:</strong> Otevřete Event Viewer → Windows Logs → System → hledejte zdroj <code>WHEA-Logger</code> s typem chyby "Memory". Záznamy obvykle uvádějí, který slot DIMM (A1, A2, B1, B2) selhal.</li>
<li><strong>Vyjměte a znovu nasaďte paměťové moduly:</strong> Vypněte PC, vyjměte RAM, vyčistěte zlaté kontakty suchým hadříkem nebo pogumovanou gumou, a znovu vložte. Oxidace na kontaktech může způsobovat chyby.</li>
<li><strong>Testujte moduly postupně (jeden po druhém):</strong> Vložte pouze jednu tyč paměti, spusťte systém a sledujte, zda chyba stále nastává. Tím izolujete vadný modul.</li>
<li><strong>Spusťte MemTest86+ z USB:</strong> Stáhněte MemTest86+, vytvořte bootovací USB a spusťte nejméně 2 průchody. Přetrvávající chyby na stejném rozsahu adres = vadný modul RAM.</li>
<li><strong>Vyměňte vadný modul:</strong> Pokud se chyby opakují u konkrétního modulu, vyměňte jej. ECC RAM zakoupujte ve spárovaných sadách od stejného výrobce a šarže.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Check Event Viewer to identify the slot:</strong> Open Event Viewer → Windows Logs → System → look for source <code>WHEA-Logger</code> with error type "Memory". Entries often specify which DIMM slot (A1, A2, B1, B2) is failing.</li>
<li><strong>Reseat the memory modules:</strong> Power down your PC, remove the RAM, clean the gold contacts with a dry cloth or pencil eraser, and firmly reinsert. Oxidation on contacts can cause errors.</li>
<li><strong>Test modules one at a time:</strong> Insert only one stick of RAM, boot the system, and check if the error recurs. This isolates the specific failing module.</li>
<li><strong>Run MemTest86+ from USB:</strong> Download MemTest86+, create a bootable USB, and run at least 2 complete passes. Persistent errors in the same address range = a faulty RAM module.</li>
<li><strong>Replace the faulty module:</strong> If errors consistently occur with one specific module, replace it. Buy ECC RAM in matched pairs from the same manufacturer and batch.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>检查事件查看器以识别插槽：</strong>打开事件查看器 → Windows 日志 → 系统 → 查找来源为 <code>WHEA-Logger</code>、类型为"内存"的错误。条目通常会指定哪个 DIMM 插槽（A1、A2、B1、B2）出现故障。</li>
<li><strong>重新插拔内存模块：</strong>关闭电脑，取出内存条，用干布或铅笔橡皮擦清洁金手指，然后重新牢固插入。触点氧化可能导致错误。</li>
<li><strong>每次测试一根内存条：</strong>只插入一根内存条启动系统，检查错误是否仍然出现，以隔离故障模块。</li>
<li><strong>从 USB 运行 MemTest86+：</strong>下载 MemTest86+，创建可启动 USB，运行至少 2 次完整测试。在相同地址范围内持续出现错误 = 内存模块有故障。</li>
<li><strong>更换故障模块：</strong>如果某个特定模块持续出现错误，请更换它。购买 ECC RAM 时应购买同一制造商和批次的匹配套装。</li>
</ol>`
        },
        details: {
            cs: "ECC (Error Correction Code) paměti používají Hammingův kód k detekci a opravě bit-flipů. Single-bit erro r (SBE) je opraven automaticky a zaznamenán v logu. Multi-bit error (MBE) je nekorigovatelný – Windows spustí BSOD nebo NMI (Non-Maskable Interrupt), protože data v RAM jsou považována za nevalidní. Příčiny: (1) Fyzická degradace paměťové buňky v DRAM čipu. (2) Kosmické záření způsobující náhodné bit-flipy (u serverů v datacentrech). (3) Přehřívání RAM modulů (nad 85°C). (4) Nestabilní napájení VDDQ. Diagnostika: (1) Windows Event Viewer → Source: 'WHEA-Logger' hledejte 'Memory Error'. (2) IPMI / iDRAC / iLO logy u serverů – přesně určí slot (např. DIMM_A1). (3) MemTest86+ s aktivovaným ECC injection testem. Pokud se chyby opakují na stejném modulu, je nutná výměna.",
            en: "ECC (Error Correction Code) memory uses Hamming codes to detect and fix bit-flips. A single-bit error (SBE) is auto-corrected and logged. A multi-bit error (MBE) is uncorrectable – the system triggers a BSOD or NMI (Non-Maskable Interrupt) as the data is deemed invalid and dangerous to use. Causes: (1) Physical DRAM cell degradation. (2) Cosmic rays causing random bit-flips (especially in data centers). (3) High operating temperatures (above 85°C). (4) Unstable VDDQ/VPP voltages. Diagnostics: (1) Windows Event Viewer → Source: 'WHEA-Logger', search for Memory errors. (2) IPMI/iDRAC/iLO logs on servers – these pin-point the specific slot (e.g., DIMM_B2). (3) MemTest86+ with ECC support. Persistent errors in the same address range mandate module replacement.",
            zh: "ECC（纠错码）内存使用汉明码检测并修复位翻转。单位错误（SBE）会自动纠正并记录。多位错误（MBE）不可纠正，系统将触发蓝屏或 NMI 停止运行。原因：(1) 物理 DRAM 单元退化；(2) 宇宙射线引起的随机位翻转；(3) 运行温度过高（超过 85°C）；(4) 供电电压不稳定。诊断：(1) Windows 事件查看器中搜索 'WHEA-Logger' 内存错误；(2) 服务器上的 IPMI/iDRAC 日志可精确定位插槽；(3) 启用 ECC 支持的 MemTest86+。相同地址范围的持续错误提示必须更换模块。"
        }
    },
    {
        id: "disk-partition-lost", type: "hardware", subcategory: "disk",
        vendors: ["hdd", "ssd"],
        code: "RAW Partition / Missing File System",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: {
            cs: "Oddíl disku se zobrazuje jako 'RAW'. Windows nemůže přistoupit k souborům a navrhuje formátování.",
            en: "Disk partition appears as 'RAW'. Windows cannot access files and suggests formatting.",
            zh: "磁盘分区显示为 'RAW'。Windows 无法访问文件并建议格式化。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>⛔ NEFORMÁTUJTE DISK!</strong> Kliknutím na „Formátovat" v dialogu Windows trvale zničíte data. Odmítněte všechny výzvy k formátování a zavřete okna Správce souborů.</li>
<li><strong>Zkuste nejprve chkdsk:</strong> Otevřete CMD jako správce a spusťte <code>chkdsk X: /f</code> (kde X je písmeno vašeho disku). Tento příkaz se pokusí opravit poškozené indexy souborového systému.</li>
<li><strong>Obnovte partition table pomocí TestDisk:</strong> Stáhněte zdarma <strong>TestDisk</strong> (cgsecurity.org). Spusťte → vyberte disk → Analyze → Quick Search. TestDisk zobrazí ztracené oddíly a umožní znovuzapsání partition table.</li>
<li><strong>Pokud selže oprava, zachraňte soubory Recuvou:</strong> Stáhněte <strong>Recuva</strong> (Piriform) → vyberte „All Files" → zvolte poškozený oddíl → Deep Scan. Recuva prohledá raw data a extrahuje soubory i bez platného souborového systému.</li>
<li><strong>Po záchraně dat naformátujte a obnovte systém:</strong> Jakmile jsou data v bezpečí na jiném disku, oddíl naformátujte jako NTFS a pokračujte normálně.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>⛔ DO NOT FORMAT THE DISK!</strong> Clicking "Format" in the Windows dialog will permanently destroy your data. Decline all format prompts and close File Explorer windows.</li>
<li><strong>Try chkdsk first:</strong> Open CMD as Administrator and run <code>chkdsk X: /f</code> (replace X with your drive letter). This attempts to repair corrupted file system indices.</li>
<li><strong>Recover the partition table with TestDisk:</strong> Download the free tool <strong>TestDisk</strong> (cgsecurity.org). Launch → select disk → Analyze → Quick Search. TestDisk will show lost partitions and let you rewrite the partition table.</li>
<li><strong>If repair fails, rescue files with Recuva:</strong> Download <strong>Recuva</strong> (Piriform) → select "All Files" → choose the damaged partition → Deep Scan. Recuva scans raw data and extracts files even without a valid file system.</li>
<li><strong>After data recovery, format and restore:</strong> Once your data is safely on another drive, format the partition as NTFS and proceed normally.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>⛔ 切勿格式化磁盘！</strong>点击 Windows 对话框中的"格式化"将永久销毁您的数据。拒绝所有格式化提示并关闭文件资源管理器窗口。</li>
<li><strong>先尝试 chkdsk：</strong>以管理员身份打开 CMD，运行 <code>chkdsk X: /f</code>（X 替换为您的磁盘盘符）。这将尝试修复损坏的文件系统索引。</li>
<li><strong>使用 TestDisk 恢复分区表：</strong>下载免费工具 <strong>TestDisk</strong>（cgsecurity.org）。启动 → 选择磁盘 → 分析 → 快速搜索。TestDisk 将显示丢失的分区并允许您重写分区表。</li>
<li><strong>如果修复失败，使用 Recuva 恢复文件：</strong>下载 <strong>Recuva</strong>（Piriform）→ 选择"所有文件" → 选择损坏的分区 → 深度扫描。即使没有有效的文件系统，Recuva 也能扫描原始数据并提取文件。</li>
<li><strong>数据恢复后，格式化并恢复：</strong>将数据安全转移到另一个磁盘后，将分区格式化为 NTFS 并正常继续使用。</li>
</ol>`
        },
        details: {
            cs: "Stav 'RAW' znamená, že Windows vidí fyzický oddíl, ale nedokáže identifikovat souborový systém (NTFS/FAT32/exFAT). Důvodem je poškození Boot Sectoru nebo Partition Table (MBR/GPT). Příčiny: (1) Odpojení USB disku během zápisu (poškození $MFT - Master File Table). (2) Selhání řadiče disku generující nevalidní IO požadavky. (3) Malware modifikující boot sektory. (4) Fyzické vadné sektory na začátku partition. Diagnostika: Správa disků (diskmgmt.msc) – pokud je v sloupci 'Systém souborů' uvedeno RAW, je tabulka poškozená. Postup obnovy: (1) Příkaz 'chkdsk X: /f' (kde X je písmeno disku) – Windows se pokusí opravit indexy. (2) TestDisk – utilita pro hloubkové skenování a znovuzapsání partition tabulky. (3) Recuva – pokud selže oprava tabulky, Recuva dokáže extrahovat soubory i z RAW oddílu.",
            en: "A 'RAW' state means Windows recognizes the partition but cannot identify the file system (NTFS/FAT32/exFAT). This is caused by a corrupted Boot Sector or Partition Table (MBR/GPT). Root causes: (1) Unplugging a USB drive during a write operation (damaging $MFT). (2) Disk controller failure sending invalid I/O requests. (3) Malware modifying boot sectors. (4) Physical bad sectors at the start of the partition. Diagnosis: Disk Management (diskmgmt.msc) – filesystem column says RAW. Recovery: (1) 'chkdsk X: /f' (replace X with drive letter) – Windows attempts to repair indices. (2) TestDisk – a deep-scan utility to rewrite partition structures. (3) Recuva/R-Studio – if table repair is impossible, these tools extract files by scanning raw data directly.",
            zh: "RAW 状态意味着 Windows 识别出分区但无法识别其文件系统（NTFS/FAT32/exFAT）。由引导扇区或分区表（MBR/GPT）损坏引起。根本原因：(1) 在写入时拔掉 U 盘；(2) 磁盘控制器故障发送无效 I/O 请求；(3) 恶意软件修改引导扇区；(4) 分区起始位置存在物理坏道。诊断：磁盘管理中显示文件系统为 RAW。恢复方法：(1) 运行 'chkdsk X: /f' 尝试修复索引；(2) 使用 TestDisk 工具深度扫描并重写分区表；(3) 使用 Recuva 或 R-Studio 直接扫描原始数据以提取文件。"
        }
    },
    {
        id: "mb-usb-overcurrent", type: "hardware", subcategory: "mb",
        vendors: ["asus", "msi", "gigabyte", "asrock"],
        code: "USB Device Over Current Status Detected",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "Počítač se nespustí a hlásí 'USB Device Over Current Status'! Systém se vypne za 15 sekund.",
            en: "PC fails to boot and reports 'USB Device Over Current Status'! System shuts down in 15s.",
            zh: "PC 无法启动并报告 'USB Device Over Current Status'！系统将在 15 秒内关机。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Okamžitě odpojte všechna USB zařízení:</strong> Odpojte veškerá zařízení zapojená do USB portů (myš, klávesnice, flash disky, huby, kabely). Znovu spusťte PC a sledujte, zda chyba zmizela.</li>
<li><strong>Odpojte kabel čelního USB panelu:</strong> Otevřete skříň a odpojte kabel vedoucí z čelního panelu skříně na USB header základní desky. Pokud chyba zmizí, problém je ve čelním panelu (ohnuté piny nebo zkrat).</li>
<li><strong>Zkontrolujte piny USB portů s baterkou:</strong> Svítidlem prozkoumejte všechny USB porty (zadní i přední) — ohnutý pin dotýkající se kovového šasi způsobuje zkrat a spustí tuto ochranu.</li>
<li><strong>Testujte USB zařízení jedno po druhém:</strong> Zapojujte zařízení postupně. Vadné zařízení (myš, hub) s vnitřním zkratem okamžitě způsobí chybu — identifikujte a vyřaďte vadné.</li>
<li><strong>Pokud chyba trvá bez jakýchkoliv zařízení:</strong> Je poškozený USB řadič na základní desce. Kontaktujte servis nebo zvažte výměnu základní desky.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Immediately unplug all USB devices:</strong> Disconnect everything from USB ports (mouse, keyboard, flash drives, hubs, cables). Restart the PC and check if the error is gone.</li>
<li><strong>Disconnect the front panel USB cable:</strong> Open the case and unplug the cable running from the front panel to the USB header on the motherboard. If the error clears, the front panel has a short (bent pins or damage).</li>
<li><strong>Inspect USB port pins with a flashlight:</strong> Examine all USB ports (front and rear) carefully — a bent pin touching the metal housing causes a short circuit and triggers this protection.</li>
<li><strong>Test USB devices one at a time:</strong> Plug in devices one by one. A faulty device (mouse, hub) with an internal short will instantly trigger the error — identify and discard the faulty one.</li>
<li><strong>If the error persists with nothing connected:</strong> The USB controller on the motherboard is likely damaged. Contact a service centre or consider replacing the motherboard.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>立即拔掉所有 USB 设备：</strong>断开所有 USB 端口上的设备（鼠标、键盘、U 盘、集线器、线缆）。重启电脑并检查错误是否消失。</li>
<li><strong>断开前置 USB 面板线缆：</strong>打开机箱，拔掉从前置面板延伸到主板 USB 接头的线缆。如果错误消失，则前置面板存在短路（引脚弯曲或损坏）。</li>
<li><strong>用手电筒检查 USB 接口引脚：</strong>仔细检查所有 USB 接口（前置和后置）——弯曲的引脚接触到金属外壳会造成短路并触发此保护机制。</li>
<li><strong>逐一测试 USB 设备：</strong>逐个插入设备。内部短路的故障设备（鼠标、集线器）会立即触发错误——找到并丢弃故障设备。</li>
<li><strong>如果在不连接任何设备时错误仍然存在：</strong>主板上的 USB 控制器可能已损坏，请联系维修中心或考虑更换主板。</li>
</ol>`
        },
        details: {
            cs: "Tato chybová hláška je hardwarová pojistka základní desky. Super I/O čip detekoval zkrat na 5V napájecí větvi USB portů. Pokud by se systém nevypnul, hrozilo by shoření cest na PCB nebo zničení jižního můstku (PCH). Příčiny: (1) Fyzicky ohnuté piny uvnitř USB portu (často na čelním panelu skříně), které se dotýkají kovového šasi. (2) Vadné USB zařízení (myš, flash disk) s vnitřním zkratem. (3) Chybějící jumper na 'USB Power' hlavičce základní desky. (4) Prasklý keramický kondenzátor poblíž USB portů na desce. Diagnostika: (1) Odpojte vnitřní USB header skříně (kabel vedoucí k čelním portům) – pokud chyba zmizí, je chyba ve skříni. (2) Vizuálně prohlédněte všechny porty (zadní i přední) – piny nesmí být ohnuté. (3) Pokud chyba trvá i bez připojených zařízení a panelů, je poškozený USB controller na desce.",
            en: "This error is a hardware protection trigger. The Super I/O chip detected a short circuit on the 5V USB power rail. Shuting down prevents permanent PCB trace damage or burning out the Southbridge (PCH). Root causes: (1) Physically bent pins inside a USB port (often front panel) touching the metal shield. (2) A faulty USB peripheral with an internal short. (3) A missing jumper on the 'USB Power' motherboard header. (4) A cracked MLCC capacitor near the USB hub on the motherboard. Diagnostics: (1) Unplug the front panel USB headers from the motherboard – if the error clears, the case ports are damaged. (2) Inspect all ports with a flashlight for bent pins. (3) If the error persists with no devices or headers connected, the motherboard's internal USB controller is likely dead.",
            zh: "该错误是硬件保护触发机制。Super I/O 芯片检测到 USB 5V 供电轨短路。关机是为了防止 PCB 走线烧毁或南桥（PCH）损坏。根本原因：(1) USB 接口（通常是机箱前置）内部引脚弯曲触碰到金属外壳；(2) USB 外设内部短路；(3) 主板 'USB Power' 跳线丢失；(4) 主板 USB 枢纽附近的贴片电容开裂。诊断：(1)拔掉主板上的前置 USB 线缆，如果错误消失则是机箱接口损坏；(2) 用手电筒检查所有接口是否有弯曲引脚；(3) 如果拔掉所有外设和排线后错误依旧，则主板内部控制器已损坏。"
        }
    },
    {
        id: "win-defender-service", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "Defender Service Stop / 0x80070422",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Microsoft Defender Antivirus se nespustil. Služba je zakázána nebo blokována malwarem.",
            en: "Microsoft Defender Antivirus failed to start. Service is disabled or blocked by malware.",
            zh: "Microsoft Defender 无法启动。服务已被禁用或被恶意软件拦截。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Restartujte službu Defender v services.msc:</strong> Stiskněte <kbd>Win + R</kbd>, napište <code>services.msc</code>. Najděte „Microsoft Defender Antivirus Service" → klikněte pravým → Vlastnosti → Typ spouštění = <strong>Automaticky</strong> → Spustit.</li>
<li><strong>Zkontrolujte, zda máte jiný aktivní antivirus:</strong> Windows automaticky zakáže Defender, pokud detekuje jiný AV (Avast, AVG, McAfee). Otevřete Zabezpečení Windows → Ochrana před viry a hrozbami → zkontrolujte, která ochrana je aktivní.</li>
<li><strong>Spusťte Malwarebytes pro detekci malwaru:</strong> Pokud Defender nelze spustit a jiný AV není nainstalován, mohlo dojít k napadení. Stáhněte <strong>Malwarebytes Free</strong> a proveďte úplnou kontrolu.</li>
<li><strong>Resetujte Windows Security aplikaci:</strong> Nastavení → Aplikace → nainstalované aplikace → Windows Security → tři tečky → Rozšířené možnosti → Opravit (nebo Obnovit).</li>
<li><strong>Krajní možnost — offline skener:</strong> Pokud jsou výše uvedené kroky bezúčinné (malware blokuje přístup), stáhněte a spusťte <strong>ESET Online Scanner</strong> nebo <strong>Malwarebytes offline installer</strong> z USB.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Restart the Defender service in services.msc:</strong> Press <kbd>Win + R</kbd>, type <code>services.msc</code>. Find "Microsoft Defender Antivirus Service" → right-click → Properties → Startup type = <strong>Automatic</strong> → Start.</li>
<li><strong>Check if another antivirus is active:</strong> Windows automatically disables Defender if it detects another AV (Avast, AVG, McAfee). Open Windows Security → Virus & threat protection → check which protection is currently active.</li>
<li><strong>Run Malwarebytes to check for malware:</strong> If Defender won't start and no other AV is installed, your system may be infected. Download <strong>Malwarebytes Free</strong> and run a full scan.</li>
<li><strong>Reset the Windows Security app:</strong> Settings → Apps → Installed apps → Windows Security → three dots → Advanced options → Repair (or Reset).</li>
<li><strong>Last resort — offline scanner:</strong> If the above steps are blocked (malware preventing access), download and run <strong>ESET Online Scanner</strong> or <strong>Malwarebytes offline installer</strong> from a USB drive.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>在 services.msc 中重启 Defender 服务：</strong>按 <kbd>Win + R</kbd>，输入 <code>services.msc</code>。找到"Microsoft Defender 防病毒服务" → 右键点击 → 属性 → 启动类型 = <strong>自动</strong> → 启动。</li>
<li><strong>检查是否有其他防病毒软件处于活动状态：</strong>如果检测到其他防病毒软件（Avast、AVG、McAfee），Windows 会自动禁用 Defender。打开 Windows 安全中心 → 病毒和威胁防护 → 检查当前活动的防护。</li>
<li><strong>运行 Malwarebytes 检查恶意软件：</strong>如果 Defender 无法启动且未安装其他防病毒软件，系统可能已被感染。下载 <strong>Malwarebytes Free</strong> 并运行完整扫描。</li>
<li><strong>重置 Windows 安全中心应用：</strong>设置 → 应用 → 已安装应用 → Windows 安全中心 → 三个点 → 高级选项 → 修复（或重置）。</li>
<li><strong>最后手段——离线扫描工具：</strong>如果上述步骤被阻止（恶意软件阻止访问），请从 USB 驱动器下载并运行 <strong>ESET 在线扫描器</strong>或 <strong>Malwarebytes 离线安装程序</strong>。</li>
</ol>`
        },
        details: {
            cs: "Chyba 0x80070422 (The service cannot be started) u Windows Defenderu často značí, že služba 'WinDefend' byla v registrech natvrdo zakázána. Toto je typické chování pokročilého malwaru, který chce vyřadit ochranu. Příčiny: (1) Malware (Ransomware/Trojan) změnil Start typ služby na 'Disabled'. (2) Konflikt s jiným antivirem – Windows automaticky vypne Defender, pokud detekuje jiný aktivní AV. (3) Poškozená databáze 'Security Center' (WMI repository). Oprava: (1) Regedit → HKLM\\SYSTEM\\CurrentControlSet\\Services\\WinDefend → set 'Start' to 2. (2) PowerShell (Admin): 'Start-Service WinDefend'. (3) Pokud se služba okamžitě zase vypne, použijte offline skener (např. ESET SysRescue Live) k odstranění rootkitu. (4) Resetování aplikace: Nastavení → Aplikace → Zabezpečení Windows → Upřesnit možnosti → Opravit / Obnovit.",
            en: "Error 0x80070422 (The service cannot be started) with Windows Defender often indicates the 'WinDefend' service was forcefully disabled in the registry. This is common behavior for advanced malware seeking to evade detection. Root causes: (1) Malware (Ransomware/Trojan) set service Startup type to 'Disabled'. (2) Conflict with third-party AV – Windows auto-disables Defender when another AV is active. (3) Corrupted Security Center WMI repository. Fixes: (1) Registry Editor → Path: HKLM\\SYSTEM\\CurrentControlSet\\Services\\WinDefend → Change 'Start' DWORD to 2. (2) PowerShell (Admin): 'Start-Service WinDefend'. (3) If it insta-stops, use an offline scanner (ESET SysRescue Live) to remove rootkits. (4) App Reset: Settings → Apps → Windows Security → Advanced Options → Terminate/Repair/Reset.",
            zh: "Defender 报告错误 0x80070422（无法启动服务）通常意味着 'WinDefend' 服务在注册表中被强制禁用。这是高级恶意软件规避检测的常见手段。根本原因：(1) 病毒（勒索软件/木马）将服务启动类型设为 '禁用'；(2) 与第三方杀毒软件冲突；(3) 安全中心 WMI 存储库损坏。修复方法：(1) 在注册表中将 WinDefend 服务的 'Start' 值改为 2；(2) 以管理员身份在 PowerShell 中启动服务；(3) 如果服务启动后立即停止，请使用离线扫描工具清除内核级木马；(4) 在设置中重置 'Windows 安全中心' 应用。"
        }
    },
    {
        id: "net-ipv6-conflict", type: "software", subcategory: "network",
        vendors: ["wifi", "ethernet"],
        code: "IPv6 Duplicate Address Detected (DAD)",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: {
            cs: "Detekována duplicitní IPv6 adresa v síti. Síťové připojení může být nestabilní.",
            en: "Duplicate IPv6 address detected in the network. Connectivity may be unstable.",
            zh: "检测到网络中存在重复的 IPv6 地址。连接可能不稳定。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Zakažte a znovu povolte síťový adaptér:</strong> Otevřete Správce zařízení → Síťové adaptéry → klikněte pravým na váš adaptér → Zakázat. Počkejte 5 sekund → Povolit. Adaptér dostane novou IPv6 adresu.</li>
<li><strong>Restartujte router a síťová zařízení:</strong> Vypněte router a switch na 30 sekund. Po zapnutí router přegeneruje IPv6 prefixy a adresy přidělí znovu.</li>
<li><strong>Povolte náhodné identifikátory rozhraní:</strong> Otevřete CMD jako správce a spusťte: <code>netsh interface ipv6 set global randomizeidentifiers=enabled</code>. Tím zabráníte budoucím konfliktům způsobeným statickými MAC-based adresami.</li>
<li><strong>Zkontrolujte manuální přiřazení IP adres:</strong> Přejděte do Nastavení sítě → Vlastnosti adaptéru → Internet Protocol Version 6 → ujistěte se, že je nastaveno <strong>Získat adresu automaticky</strong> (ne manuální IP).</li>
<li><strong>Ověřte stav v příkazovém řádku:</strong> Spusťte <code>netsh interface ipv6 show address</code> — hledejte stav <code>Duplicate</code>. Po výše uvedených krocích by se měl stav změnit na <code>Preferred</code>.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Disable and re-enable the network adapter:</strong> Open Device Manager → Network Adapters → right-click your adapter → Disable. Wait 5 seconds → Enable. The adapter will obtain a new IPv6 address.</li>
<li><strong>Restart your router and network devices:</strong> Power off the router and any switch for 30 seconds. After restarting, the router regenerates IPv6 prefixes and reassigns addresses.</li>
<li><strong>Enable random interface identifiers:</strong> Open CMD as Administrator and run: <code>netsh interface ipv6 set global randomizeidentifiers=enabled</code>. This prevents future conflicts caused by static MAC-based addresses.</li>
<li><strong>Check for manual IP address assignments:</strong> Go to Network settings → Adapter properties → Internet Protocol Version 6 → make sure <strong>Obtain an address automatically</strong> is selected (not a manual IP).</li>
<li><strong>Verify the status in Command Prompt:</strong> Run <code>netsh interface ipv6 show address</code> — look for a <code>Duplicate</code> status. After the steps above, it should change to <code>Preferred</code>.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>禁用并重新启用网络适配器：</strong>打开设备管理器 → 网络适配器 → 右键点击您的适配器 → 禁用。等待 5 秒 → 启用。适配器将获取新的 IPv6 地址。</li>
<li><strong>重启路由器和网络设备：</strong>关闭路由器和交换机 30 秒。重新启动后，路由器将重新生成 IPv6 前缀并重新分配地址。</li>
<li><strong>启用随机接口标识符：</strong>以管理员身份打开 CMD，运行：<code>netsh interface ipv6 set global randomizeidentifiers=enabled</code>。这可防止由静态基于 MAC 地址引起的未来冲突。</li>
<li><strong>检查手动 IP 地址分配：</strong>进入网络设置 → 适配器属性 → Internet 协议版本 6 → 确保选择了<strong>自动获取地址</strong>（而非手动 IP）。</li>
<li><strong>在命令提示符中验证状态：</strong>运行 <code>netsh interface ipv6 show address</code>——查找 <code>Duplicate</code> 状态。完成上述步骤后，状态应更改为 <code>Preferred</code>。</li>
</ol>`
        },
        details: {
            cs: "DAD (Duplicate Address Detection) je mechanismus ICMPv6 (Neighbor Discovery Protocol), který ověřuje unikátnost adresy před jejím použitím. PC pošle 'Neighbor Solicitation' zprávu pro svou vlastní adresu; pokud někdo odpoví 'Neighbor Advertisement', adresa je duplicitní a Windows ji označí jako 'Duplicate' v ipconfig. Příčiny: (1) Slaac (Stateless Address Autoconfiguration) vygeneroval stejné Interface ID (extrémně vzácné, ale možné u klonovaných VM). (2) MAC Address spoofing – dvě zařízení mají stejnou MAC adresu. (3) Bug ve firmware routeru poskytující stejný prefix více zařízením. Diagnostika: 'netsh interface ipv6 show address' – hledejte stav 'Duplicate'. Řešení: příkaz 'netsh interface ipv6 set global randomizeidentifiers=enabled' vynutí generování náhodného ID, což vyřeší konflikt vyvolaný z MAC adresy.",
            en: "DAD (Duplicate Address Detection) is an ICMPv6 mechanism (part of Neighbor Discovery Protocol) that verifies address uniqueness before use. A host sends a 'Neighbor Solicitation' for its own address; if a 'Neighbor Advertisement' is received in response, the address is marked as 'Duplicate'. Root causes: (1) SLAAC generated the same Interface ID (extremely rare, but possible with cloned VMs). (2) MAC Address spoofing – two devices share the same hardware address. (3) Router firmware bug in prefix delegation. Diagnostics: 'netsh interface ipv6 show address' – look for 'Duplicate' status. Fix: Run 'netsh interface ipv6 set global randomizeidentifiers=enabled' to force random privacy IDs, resolving conflicts derived from EUI-64/MAC logic.",
            zh: "DAD（重复地址检测）是 ICMPv6 的一种机制，用于在使用前验证地址唯一性。主机为其自身地址发送 '邻居请求'，如果收到 '邻居公告'，则该地址被标记为 '重复'。根本原因：(1) SLAAC 生成了相同的接口 ID（克隆虚拟机时可能发生）；(2) MAC 地址欺骗导致硬件地址冲突；(3) 路由器固件在协议分配上存在漏洞。诊断：运行 'netsh interface ipv6 show address' 查找重复状态。修复：运行命令开启随机标识符生成，强制生成随机隐私 ID 以解决冲突。"
        }
    },
    {
        id: "drv-verifier", type: "software", subcategory: "drivers",
        vendors: ["gpu-drv", "audio-drv", "net-drv", "chipset-drv"],
        code: "DRIVER_VERIFIER_DETECTED_VIOLATION",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "BSOD 0xC4 – Driver Verifier odhalil ovladač, který porušuje integritu systému.",
            en: "BSOD 0xC4 – Driver Verifier detected a driver violating system integrity.",
            zh: "蓝屏 0xC4——驱动程序验证程序检测到驱动程序违反系统完整性。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Zakažte verifikátor v nouzovém režimu:</strong> Restartujte PC → při startu opakovaně mačkejte <kbd>F8</kbd> → Nouzový režim. Otevřete CMD jako správce a spusťte: <code>verifier /reset</code>. Restartujte normálně.</li>
<li><strong>Identifikujte vadný ovladač z minidupu:</strong> Stáhněte <strong>WinDbg</strong> nebo použijte online nástroj <strong>WhoCrashed</strong>. Otevřete minidump soubor z <code>C:\Windows\Minidump</code> — zobrazí název ovladače, který selhal.</li>
<li><strong>Aktualizujte nebo přeinstalujte vadný ovladač:</strong> Na základě výsledku z minidupu aktualizujte daný ovladač (GPU, audio, síťový) přes stránky výrobce. Nepoužívejte ovladače od Windows Update pro specializovaný hardware.</li>
<li><strong>Zkontrolujte, kdo spustil Driver Verifier:</strong> Spusťte <code>verifier /query</code> v CMD — zobrazí, jaké testy jsou aktivní. Verifikátor je obvykle aktivovaný vývojáři nebo diagnostickými nástroji, ne uživateli běžně.</li>
<li><strong>Proveďte systémovou opravu:</strong> Spusťte <code>sfc /scannow</code> a poté <code>DISM /Online /Cleanup-Image /RestoreHealth</code> pro opravu poškozených systémových souborů, které mohly spustit verifikátor.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Disable Verifier in Safe Mode:</strong> Restart your PC → press <kbd>F8</kbd> repeatedly during boot → Safe Mode. Open CMD as Administrator and run: <code>verifier /reset</code>. Restart normally.</li>
<li><strong>Identify the faulty driver from the minidump:</strong> Download <strong>WinDbg</strong> or use the online tool <strong>WhoCrashed</strong>. Open the minidump file from <code>C:\Windows\Minidump</code> — it shows the name of the driver that failed.</li>
<li><strong>Update or reinstall the faulty driver:</strong> Based on the minidump result, update the identified driver (GPU, audio, network) from the manufacturer's website. Do not use Windows Update for specialized hardware drivers.</li>
<li><strong>Check who enabled Driver Verifier:</strong> Run <code>verifier /query</code> in CMD — it shows which tests are active. Verifier is typically activated by developers or diagnostic tools, not regular users.</li>
<li><strong>Perform a system repair:</strong> Run <code>sfc /scannow</code> followed by <code>DISM /Online /Cleanup-Image /RestoreHealth</code> to repair corrupted system files that may have triggered the verifier.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>在安全模式下禁用验证程序：</strong>重启电脑 → 在启动期间反复按 <kbd>F8</kbd> → 安全模式。以管理员身份打开 CMD，运行：<code>verifier /reset</code>。正常重启。</li>
<li><strong>从内存转储中识别故障驱动：</strong>下载 <strong>WinDbg</strong> 或使用在线工具 <strong>WhoCrashed</strong>。打开 <code>C:\Windows\Minidump</code> 中的转储文件——它显示失败驱动的名称。</li>
<li><strong>更新或重新安装故障驱动：</strong>根据转储结果，从制造商网站更新识别出的驱动（GPU、音频、网络）。不要使用 Windows Update 更新专用硬件驱动。</li>
<li><strong>检查是谁启用了驱动程序验证程序：</strong>在 CMD 中运行 <code>verifier /query</code>——它显示哪些测试处于活动状态。验证程序通常由开发人员或诊断工具激活，而非普通用户。</li>
<li><strong>执行系统修复：</strong>运行 <code>sfc /scannow</code>，然后运行 <code>DISM /Online /Cleanup-Image /RestoreHealth</code>，修复可能触发验证程序的损坏系统文件。</li>
</ol>`
        },
        details: {
            cs: "Chyba DRIVER_VERIFIER_DETECTED_VIOLATION (0x000000C4) je 'přátelský' crash vyvolaný diagnostickým nástrojem Windows Driver Verifier. Tento nástroj úmyslně vystavuje ovladače extrémním podmínkám (neplatné alokace paměti, IRQL stres), aby odhalil chyby dříve, než způsobí náhodné pády. Pokud uvidíte tento BSOD, znamená to, že verifikátor je aktivní. Diagnostika: (1) První parametr BSOD (Arg1) určuje typ porušení (viz dokumentace Microsoft). (2) 'verifier /query' zobrazí běžící testy. (3) Minidump obsahuje jméno ovladače, který testem neprošel. Oprava: dočasně vypněte verifikátor v nouzovém režimu ('verifier /reset') pro boot do systému, poté aktualizujte daný hardware ovladač nebo hledejte WHQL podepsanou verzi. Driver Verifier by neměl být spuštěn trvale, protože výrazně snižuje výkon systému.",
            en: "The DRIVER_VERIFIER_DETECTED_VIOLATION (0xC4) is a 'forced' crash triggered by the Windows Driver Verifier diagnostic tool. This tool subjects drivers to extreme conditions (invalid memory allocation, IRQL stress, pool tracking) to expose bugs before they cause random instability. If you see this BSOD, it means Verifier is currently active. Diagnostics: (1) The first BSOD parameter (Arg1) defines the violation type. (2) 'verifier /query' in CMD shows active tests. (3) The minidump identifies the failed driver. Fix: In Safe Mode, run 'verifier /reset' to disable the tool and allow a normal boot. Then, update or replace the specific driver identified in the crash. Driver Verifier should not be left running permanently as it causes significant performance overhead.",
            zh: "DRIVER_VERIFIER_DETECTED_VIOLATION（0xC4）是由 Windows 驱动程序验证程序触发的'强制'崩溃。该工具使驱动程序处于极端条件下以在导致随机不稳定前暴露 Bug。如果看到此蓝屏，说明验证程序正处于活动状态。诊断：(1) 蓝屏第一参数定义违规类型；(2) 运行 'verifier /query' 查看活跃测试；(3) 内存转储文件会标明失败的驱动。修复：在安全模式下运行 'verifier /reset' 禁用该工具以正常启动，然后更新或更换故障驱动。不应永久运行验证程序，因为它会造成巨大的系统开销。"
        }
    },
    {
        id: "mb-bent-pins", type: "hardware", subcategory: "mb",
        vendors: ["asus", "msi", "gigabyte", "asrock"],
        code: "Bent CPU Socket Pins",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "Základní deska nefunguje správně nebo nespustí PC kvůli ohnutým pinům v socketu.",
            en: "Motherboard malfunctions or fails to POST due to bent pins in the CPU socket.",
            zh: "由于 CPU 插槽引脚弯曲，主板无法正常工作或无法通过 POST。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Vyjměte CPU a prohlédněte socket:</strong> Vypněte PC, vyjměte procesor a pod silnou baterkou (nebo bílou LED) prozkoumejte socket z různých úhlů. Ohnuté piny budou mít jiný odraz světla než okolní rovné piny.</li>
<li><strong>⚠️ Oprava pinů je delicate — buďte opatrní:</strong> Použijte mechanickou tužku (bez tuhy) nebo jehlu. Pod lupou/mikroskopem velmi jemně tlačte na ohnutý pin zpět do svislé polohy. Jeden lom pinu = nutná výměna desky.</li>
<li><strong>Alternativně — kontaktujte profesionální servis:</strong> Narovnání pinů v CPU socketu vyžaduje trpělivost a pevnou ruku. Pokud si nevěříte, svěřte desku servisnímu technikovi — cena opravy bývá nižší než výměna základní desky.</li>
<li><strong>Zkontrolujte příznaky před demontáží:</strong> Typické příznaky ohnutých pinů zahrnují: CPU LED svítí červeně, POST kód 00, RAM sloty nefungují (nelze detekovat paměť), nebo PC vůbec nereaguje.</li>
<li><strong>Po narovnání — reinstalujte CPU opatrně:</strong> Vložte CPU přesně podle šipky/označení, bez jakéhokoliv tlaku do stran. Šroubujte chladič rovnoměrně (ne po jedné straně).</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Remove the CPU and inspect the socket:</strong> Power off the PC, remove the processor, and examine the socket under a bright flashlight (or white LED) from various angles. Bent pins will reflect light differently than the surrounding straight pins.</li>
<li><strong>⚠️ Pin repair is delicate — proceed carefully:</strong> Use a mechanical pencil (without lead) or a sewing needle. Under a magnifying glass/microscope, gently push the bent pin back to vertical. One broken pin = motherboard replacement required.</li>
<li><strong>Alternatively — contact a professional repair shop:</strong> Straightening CPU socket pins requires patience and a steady hand. If you're unsure, take the board to a technician — repair costs are often lower than replacing the motherboard.</li>
<li><strong>Check symptoms before disassembling:</strong> Typical signs of bent pins include: CPU LED solid red, POST code 00, RAM slots not detected (no memory), or PC not responding at all.</li>
<li><strong>After straightening — reinstall CPU carefully:</strong> Insert the CPU precisely following the arrow/alignment marks, with no lateral pressure. Tighten the cooler evenly (not one side at a time).</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>取出 CPU 并检查插槽：</strong>关闭电脑，取出处理器，在强光手电筒（或白色 LED）下从不同角度检查插槽。弯曲的引脚与周围直立引脚的反光方式不同。</li>
<li><strong>⚠️ 引脚修复需要细心——谨慎操作：</strong>使用自动铅笔（不带铅芯）或缝纫针，在放大镜/显微镜下轻轻将弯曲的引脚推回垂直位置。一根引脚折断 = 需要更换主板。</li>
<li><strong>或者——联系专业维修店：</strong>拉直 CPU 插槽引脚需要耐心和稳定的手。如果您不确定，请将主板交给技术人员——维修费用通常低于更换主板。</li>
<li><strong>拆解前检查症状：</strong>引脚弯曲的典型症状包括：CPU LED 红色常亮、POST 代码 00、无法检测到内存（RAM 插槽故障），或电脑完全没有反应。</li>
<li><strong>拉直后——小心重新安装 CPU：</strong>按照箭头/对齐标记精确插入 CPU，不要有任何横向压力。均匀拧紧散热器（不要只拧一侧）。</li>
</ol>`
        },
        details: {
            cs: "Základní desky Intel (LGA) a novější AMD (LGA17xx/AM5) mají křehké piny přímo v CPU patici. Při nesprávné instalaci nebo neopatrné manipulaci s procesorem se piny mohou ohnout. Ohnutý pin může způsobit ztrátu kontaktu s CPU podložkami, což vyvolá různé potíže: chybějící paměťové kanály (RAM sloty nefungují), nefunkční PCIe linky nebo úplné selhání startu (kód 00 / CPU LED svítí). Diagnostika: Vyjměte CPU a pod různými úhly svítilnou zkontrolujte pravidelnost odrazu světla od pinů. Oprava vyžaduje lupu, mikroskop nebo pevnou ruku s mechanickou tužkou, do jejíž špičky lze nasadit poškozený pin a jemně jej narovnat.",
            en: "Intel (LGA) and newer AMD (AM5) motherboards feature fragile pins inside the CPU socket. Incorrect installation or mishandling can bend these pins. A bent pin loses contact with the CPU pads, causing issues ranging from missing memory channels (RAM slots failing), broken PCIe lanes, to total POST failure (Code 00 / CPU LED on). Diagnostics: Remove the CPU and inspect the socket pad reflectivity under a bright flashlight from various angles to spot anomalies. Repairing bent pins requires a magnifying glass or microscope, a steady hand, and a needle or a mechanical pencil tip to gently bend the pin back into alignment.",
            zh: "Intel (LGA) 和较新的 AMD (AM5) 主板在 CPU 插槽内具有脆弱的引脚。不正确的安装或处理不当可能会弯曲这些引脚。弯曲的引脚失去与 CPU 触点的连接，导致各种问题：内存通道丢失（RAM 插槽故障）、PCIe 通道损坏，甚至完全无法启动（代码 00 / CPU LED 常亮）。诊断：取出 CPU 并用强光手电筒从不同角度检查插槽引脚的反光是否均匀。修复引脚需要放大镜或显微镜，稳定的人手，以及一根针或自动铅笔尖端，以便轻轻将引脚校正。"
        }
    },
    {
        id: "app-0xc000007b", type: "software", subcategory: "apps",
        vendors: ["runtime", "games"],
        code: "Application Error 0xc000007b",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Hra nebo program se nedá spustit a zobrazí chybový kód 0xc000007b.",
            en: "Game or program fails to start and displays the error code 0xc000007b.",
            zh: "游戏或程序无法启动，并显示错误代码 0xc000007b。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Přeinstalujte Visual C++ Redistributable (obě architektury):</strong> Stáhněte si z webu Microsoft <strong>Visual C++ Redistributable</strong> — stáhněte a nainstalujte verze <strong>x86 i x64</strong>. Staré verze ponechejte, přidejte jen chybějící.</li>
<li><strong>Přeinstalujte DirectX End-User Runtime:</strong> Stáhněte <strong>DirectX End-User Runtime Web Installer</strong> přímo z webu Microsoft. Nainstalujte a restartujte PC.</li>
<li><strong>Spusťte aplikaci jako správce:</strong> Klikněte pravým na spustitelný soubor → Spustit jako správce. Někdy jsou problémem oprávnění pro přístup ke sdíleným DLL souborům.</li>
<li><strong>Pokud problém přetrvává — zkontrolujte architekturu:</strong> Stáhněte <strong>Dependency Walker</strong> nebo <strong>Dependencies</strong> (moderní alternativa). Otevřete .exe soubor aplikace a zjistěte, které DLL hlásí chybu architektury (32-bit/64-bit mix).</li>
<li><strong>Necopírujte DLL soubory ručně!</strong> Ručně nakopírované DLL soubory do System32 nebo SysWOW64 způsobují právě tento typ chyby. Odinstalujte a přeinstalujte aplikaci standardně přes instalátor.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Reinstall Visual C++ Redistributable (both architectures):</strong> Download from Microsoft's website the <strong>Visual C++ Redistributable</strong> — install both <strong>x86 and x64</strong> versions. Keep old versions installed and only add missing ones.</li>
<li><strong>Reinstall DirectX End-User Runtime:</strong> Download the <strong>DirectX End-User Runtime Web Installer</strong> directly from Microsoft. Install it and restart your PC.</li>
<li><strong>Run the application as Administrator:</strong> Right-click the executable → Run as Administrator. Sometimes permission issues prevent access to shared DLL files.</li>
<li><strong>If the problem persists — check the architecture:</strong> Download <strong>Dependency Walker</strong> or <strong>Dependencies</strong> (the modern alternative). Open the application's .exe file and identify which DLL reports an architecture error (32-bit/64-bit mismatch).</li>
<li><strong>Do not manually copy DLL files!</strong> Manually pasting DLL files into System32 or SysWOW64 causes exactly this type of error. Uninstall and reinstall the application properly using its official installer.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>重新安装 Visual C++ 运行库（两种架构）：</strong>从微软网站下载 <strong>Visual C++ 运行库</strong>——安装 <strong>x86 和 x64</strong> 两个版本。保留旧版本，只添加缺少的版本。</li>
<li><strong>重新安装 DirectX 最终用户运行时：</strong>直接从微软下载 <strong>DirectX 最终用户运行时 Web 安装程序</strong>。安装后重启电脑。</li>
<li><strong>以管理员身份运行应用程序：</strong>右键点击可执行文件 → 以管理员身份运行。有时权限问题会阻止访问共享 DLL 文件。</li>
<li><strong>如果问题仍然存在——检查架构：</strong>下载 <strong>Dependency Walker</strong> 或 <strong>Dependencies</strong>（现代替代品）。打开应用程序的 .exe 文件，找出哪个 DLL 报告架构错误（32位/64位不匹配）。</li>
<li><strong>不要手动复制 DLL 文件！</strong>手动将 DLL 文件粘贴到 System32 或 SysWOW64 正是导致此类错误的原因。请通过官方安装程序正常卸载并重新安装应用程序。</li>
</ol>`
        },
        details: {
            cs: "Chyba 0xc000007b (STATUS_INVALID_IMAGE_FORMAT) je velmi běžná při spouštění náročných aplikací v OS Windows. Nastává typicky při konfliktu bitové architektury – např. 64-bitová aplikace se pokouší načíst 32-bitovou sdílenou knihovnu (DLL), nebo naopak. Nejčastěji se jedná o chybné nebo smazané součásti DirectX, Visual C++ Redistributable a .NET Framework. Příčinami může být také ruční stažení a nakopírování DLL přímo do System32/SysWOW64 od nezkušeného uživatele. Řešením je kompletní přeinstalování VC++ distributables, využití nástroje 'Dependency Walker' (umožní odhalit, která knihovna nerespektuje architekturu), a aktualizace DX přes webový instalátor Microsoftu.",
            en: "Error 0xc000007b (STATUS_INVALID_IMAGE_FORMAT) is a very common issue when launching complex applications in Windows. It typically occurs during an architecture conflict—e.g., a 64-bit application attempting to load a 32-bit shared library (DLL), or vice versa. The most frequent culprits are mismatched or missing DirectX, Visual C++ Redistributables, and .NET Framework components. Other causes include inexperienced users manually pasting downloaded DLLs into System32/SysWOW64 directories. The solution involves a complete clean wipe and reinstall of VC++ distributables, diagnosing with 'Dependency Walker' to pinpoint the mismatched library, and updating DirectX via the Microsoft web installer.",
            zh: "错误 0xc000007b (STATUS_INVALID_IMAGE_FORMAT) 是在 Windows 系统中启动大型程序时非常常见的问题。它通常发生在架构冲突时——例如，一个 64 位应用程序试图加载一个 32 位共享库 (DLL)，反之亦然。最常见的原因是 DirectX、Visual C++ 运行库和 .NET Framework 组件不匹配或丢失。导致该错误的其他原因包括新手手动将下载的 DLL 粘贴到 System32 或 SysWOW64 目录中。解决方案包括卸载并重新安装所有的 VC++ 运行库，使用 'Dependency Walker' 工具诊断哪一个库存在架构不匹配，并通过微软在线安装程序更新 DirectX。"
        }
    },
    {
        id: "win-inaccessible-boot", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "INACCESSIBLE_BOOT_DEVICE",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "BSOD při startu systému. Windows ztratil přístup k systémovému oddílu disku.",
            en: "BSOD at system startup. Windows lost access to the system disk partition.",
            zh: "系统启动时蓝屏。Windows 失去了对系统磁盘分区的访问权限。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Zkontrolujte nastavení SATA v BIOSu:</strong> Restartujte do BIOSu → Storage / SATA Configuration → zkontrolujte, zda je nastaveno AHCI (nebo RAID pokud jste to měli). Pokud jste nedávno změnili tento parametr, vraťte ho zpět.</li>
<li><strong>Spusťte Windows Recovery Environment (WinRE):</strong> Na přihlašovací obrazovce klikněte na tlačítko napájení → Restartovat se stisknutou klávesou <kbd>Shift</kbd>. Nebo spusťte PC z instalačního USB Windows → Opravit počítač.</li>
<li><strong>Odinstalujte problematické aktualizace přes WinRE:</strong> V WinRE → Odstraňování problémů → Pokročilé možnosti → Odinstalovat aktualizace → vyberte poslední aktualizaci kvality nebo ovladačů a odinstalujte ji.</li>
<li><strong>Spusťte Startup Repair:</strong> V WinRE → Odstraňování problémů → Pokročilé možnosti → Oprava při spuštění. Windows automaticky prohledá a opraví konfiguraci bootloaderu (BCD).</li>
<li><strong>Pokud jste migrovali OS na jiný disk:</strong> Ujistěte se, že BIOS bootuje ze správného disku. Spusťte <code>bootrec /fixmbr</code> a <code>bootrec /rebuildbcd</code> v CMD z WinRE pro opravu boot záznamu.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Check SATA configuration in BIOS:</strong> Restart into BIOS → Storage / SATA Configuration → verify the mode is set to AHCI (or RAID if that's what you had). If you recently changed this setting, revert it.</li>
<li><strong>Launch Windows Recovery Environment (WinRE):</strong> On the login screen, click the power button → hold <kbd>Shift</kbd> + Restart. Or boot from a Windows USB installation media → Repair your computer.</li>
<li><strong>Uninstall problematic updates via WinRE:</strong> In WinRE → Troubleshoot → Advanced options → Uninstall Updates → select the most recent quality or driver update and remove it.</li>
<li><strong>Run Startup Repair:</strong> In WinRE → Troubleshoot → Advanced options → Startup Repair. Windows will automatically scan and fix the bootloader configuration (BCD).</li>
<li><strong>If you migrated the OS to a new drive:</strong> Make sure the BIOS is booting from the correct disk. Run <code>bootrec /fixmbr</code> and <code>bootrec /rebuildbcd</code> in CMD from WinRE to repair the boot record.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>检查 BIOS 中的 SATA 配置：</strong>重启进入 BIOS → 存储/SATA 配置 → 确认模式设置为 AHCI（或如果您之前是 RAID 则选 RAID）。如果您最近更改了此设置，请将其恢复。</li>
<li><strong>启动 Windows 恢复环境 (WinRE)：</strong>在登录屏幕上，点击电源按钮 → 按住 <kbd>Shift</kbd> + 重启。或者从 Windows USB 安装介质启动 → 修复计算机。</li>
<li><strong>通过 WinRE 卸载有问题的更新：</strong>在 WinRE → 疑难解答 → 高级选项 → 卸载更新 → 选择最近的质量更新或驱动更新并将其删除。</li>
<li><strong>运行启动修复：</strong>在 WinRE → 疑难解答 → 高级选项 → 启动修复。Windows 将自动扫描并修复引导加载程序配置 (BCD)。</li>
<li><strong>如果您将 OS 迁移到新驱动器：</strong>确保 BIOS 从正确的磁盘启动。在 WinRE 的 CMD 中运行 <code>bootrec /fixmbr</code> 和 <code>bootrec /rebuildbcd</code> 来修复启动记录。</li>
</ol>`
        },
        details: {
            cs: "Tento kód na modré obrazovce (0x0000007B) nastává, když init proces načte jádro operačního systému do paměti, ale následně jádro nemá nezbytné ovladače úložiště k pokračování ve čtení z bootovacího disku. Nejčastější příčiny tvoří: (1) Změna SATA Configuration z AHCI na RAID/IDE v BIOS/UEFI. (2) Chybný storage driver (např. Intel RST) aktualizovaný z Windows Update, který na daný řadič nepasuje. (3) Migrace OS na jiný disk nebo výměna základní desky bez instalace klíčových ovladačů. Řešení: Opětovné navrácení nastavení řadiče do původního stavu v BIOSu, vstup do Nouzového režimu a ruční reinstalace odinstalovaných storage driverů.",
            en: "This Blue Screen error code (0x0000007B) happens when the boot process successfully loads the OS kernel into memory, but the kernel lacks the necessary storage device drivers to continue reading from the boot drive. The most common triggers are: (1) Changing the SATA Configuration mode (AHCI to RAID/IDE or vice versa) in BIOS/UEFI. (2) A faulty or incompatible mass storage driver (like Intel RST) installed via Windows Update. (3) Migrating the OS to a different drive or drastically changing the motherboard hardware without injecting key drivers beforehand. Fixes involve reverting the controller mode to its original state in BIOS, or booting to Safe Mode / Windows Recovery Environment to uninstall recent suspect driver updates.",
            zh: "该蓝屏错误代码 (0x0000007B) 发生于启动过程成功将操作系统内核加载到内存中，但内核随后缺乏必要的存储设备驱动程序以继续读取启动磁盘的情况。最常见的原因是：(1) 在 BIOS/UEFI 中变更了 SATA 配置模式 (AHCI、RAID、IDE 之间切换)；(2) Windows Update 更新了不兼容的存储驱动程序（如 Intel RST）；(3) 迁移系统到另一个磁盘或更换主板硬件但没有提前注入关键驱动程序。修复方法包括在 BIOS 中将控制器模式恢复到原始状态，或进入安全模式/恢复环境卸载最近出现问题的驱动及系统更新。"
        }
    },
    {
        id: "win-system-thread", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "SYSTEM_THREAD_EXCEPTION_NOT_HANDLED",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "BSOD způsobený neošetřenou výjimkou v systémovém vlákně, velmi často ovladačem GPU.",
            en: "BSOD caused by an unhandled exception in a system thread, very often by a GPU driver.",
            zh: "由系统线程中未处理的异常引起的蓝屏，极常见原因为显卡驱动。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Přečtěte .sys soubor z obrazovky BSOD:</strong> Na BSOD obrazovce nebo v Event Vieweru (systémové logy) si zapište název souboru .sys (např. <code>nvlddmkm.sys</code> = NVIDIA driver, <code>atikmdag.sys</code> = AMD driver). Toto je vinná komponenta.</li>
<li><strong>Otevřete minidump pomocí BlueScreenView:</strong> Stáhněte <strong>BlueScreenView</strong> (Nirsoft) a otevřete jej. Program automaticky analyzuje soubory z <code>C:\Windows\Minidump</code> a zobrazí název vadného ovladače.</li>
<li><strong>Odinstalujte GPU ovladač pomocí DDU:</strong> Stáhněte <strong>Display Driver Uninstaller (DDU)</strong>. Spusťte jej v nouzovém režimu → vyberte GPU → Clean and Restart. DDU kompletně odstraní všechny ovladačové soubory.</li>
<li><strong>Nainstalujte čistý ovladač z webu výrobce:</strong> Stáhněte nejnovější (nebo předchozí stabilní) ovladač přímo z webu NVIDIA/AMD. NIKDY nepoužívejte ovladače přes Windows Update pro GPU.</li>
<li><strong>Pokud není vinníkem GPU ovladač:</strong> Dle .sys souboru identifikujte výrobce komponenty a navštivte jejich web pro aktualizaci (audio, síť, chipset). Zvažte také aktualizaci BIOSu základní desky.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Note the .sys file name from the BSOD screen:</strong> On the BSOD screen or in Event Viewer (system logs), write down the .sys file name (e.g., <code>nvlddmkm.sys</code> = NVIDIA driver, <code>atikmdag.sys</code> = AMD driver). This is the guilty component.</li>
<li><strong>Open the minidump with BlueScreenView:</strong> Download <strong>BlueScreenView</strong> (Nirsoft) and open it. The program automatically analyzes files from <code>C:\Windows\Minidump</code> and shows the name of the faulty driver.</li>
<li><strong>Uninstall the GPU driver using DDU:</strong> Download <strong>Display Driver Uninstaller (DDU)</strong>. Run it in Safe Mode → select your GPU → Clean and Restart. DDU completely removes all driver files.</li>
<li><strong>Install a clean driver from the manufacturer's website:</strong> Download the latest (or a previous stable) driver directly from NVIDIA/AMD's website. NEVER use Windows Update for GPU drivers.</li>
<li><strong>If the GPU driver is not the culprit:</strong> Use the .sys file to identify the component manufacturer and visit their website for an update (audio, network, chipset). Also consider updating the motherboard BIOS.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>记录蓝屏上的 .sys 文件名：</strong>在蓝屏界面或事件查看器（系统日志）中，记下 .sys 文件名（例如，<code>nvlddmkm.sys</code> = NVIDIA 驱动，<code>atikmdag.sys</code> = AMD 驱动）。这是导致问题的组件。</li>
<li><strong>使用 BlueScreenView 打开内存转储：</strong>下载 <strong>BlueScreenView</strong>（Nirsoft），它会自动分析 <code>C:\Windows\Minidump</code> 中的文件并显示故障驱动的名称。</li>
<li><strong>使用 DDU 卸载 GPU 驱动：</strong>下载 <strong>Display Driver Uninstaller (DDU)</strong>。在安全模式下运行 → 选择您的 GPU → 清除并重启。DDU 会彻底删除所有驱动文件。</li>
<li><strong>从制造商网站安装干净的驱动：</strong>直接从 NVIDIA/AMD 网站下载最新（或之前的稳定版）驱动。切勿通过 Windows Update 更新 GPU 驱动。</li>
<li><strong>如果 GPU 驱动不是问题所在：</strong>根据 .sys 文件识别组件制造商，访问其网站获取更新（音频、网络、芯片组）。也可以考虑更新主板 BIOS。</li>
</ol>`
        },
        details: {
            cs: "Chyba 0x0000007E indikuje, že systémové vlákno vygenerovalo výjimku, kterou error handler jádra nezvládl zachytit. Jedním z nejprofláklejších viníků je zastaralý nebo chybný grafický ovladač (atikmdag.sys, nvlddmkm.sys) či ovladač zvukové karty. Často tuto obrazovku přímo doprovází označení postižené knihovny `.sys`. Diagnostika vyžaduje procházení složky 'C:\\Windows\\Minidump' a vytažení konkrétního souboru k analýze např. z BlueScreenView nebo moderního rozboru WinDbg na odhalení původce výjimky.",
            en: "Error code 0x0000007E indicates that a system thread generated an exception which the kernel's error handler failed to catch. One of the most notorious culprits behind this crash is an outdated or faulty graphics driver (such as atikmdag.sys or nvlddmkm.sys) or audio driver. Oftentimes, this BSOD will explicitly list the `.sys` file that triggered the crash. Diagnostics require examining the 'C:\\Windows\\Minidump' folder and parsing the dmp file using BlueScreenView or WinDbg to pinpoint the offending driver and upgrade or roll back the relevant software.",
            zh: "错误代码 0x0000007E 表明系统线程生成了一个异常，而内核的错误处理程序未能捕获。这一崩溃背后最出名的罪魁祸首是过时或故障的显卡驱动（如 atikmdag.sys 或 nvlddmkm.sys）或音频驱动。通常情况下，蓝屏界面会明确列出引发崩溃的 `.sys` 文件。诊断过程需要检查 'C:\\Windows\\Minidump' 文件夹并使用 BlueScreenView 或 WinDbg 分析 dmp 文件，查明出错的驱动程序并将其升级或降级回滚。"
        }
    },
    {
        id: "disk-100-usage", type: "hardware", subcategory: "disk",
        vendors: ["hdd"],
        code: "100% Disk Usage in Task Manager",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: {
            cs: "Disk ve Správci úloh indikuje neustálé 100% využití. Systém extrémně zamrzá a nelze jej ovládat.",
            en: "Task Manager shows constant 100% disk usage. The system freezes heavily and is unresponsive.",
            zh: "任务管理器显示磁盘利用率持续 100%。系统严重卡顿且无法响应。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Identifikujte viníka ve Správci úloh:</strong> Otevřete Správce úloh (<kbd>Ctrl + Shift + Esc</kbd>) → záložka Výkon → Disk. V záložce Procesy seřaďte sloupec „Disk" sestupně — zjistíte, který proces disk zahlcuje (typicky: Antimalware Service, SysMain, Windows Update).</li>
<li><strong>Dočasně zakažte SysMain (Superfetch):</strong> Stiskněte <kbd>Win + R</kbd> → napište <code>services.msc</code> → najděte „SysMain" → Vlastnosti → Typ spouštění = Zakázáno → Stop. Tato služba předem načítá soubory do RAM, ale na HDD je velmi zátěžová.</li>
<li><strong>Zkontrolujte stav disku (SMART):</strong> Stáhněte <strong>CrystalDiskInfo</strong> — pokud zobrazuje žlutou nebo červenou výstrahu (Reallocated Sectors, Pending Sectors), je disk fyzicky poškozený a je nutná výměna.</li>
<li><strong>Vyčkejte dokončení Windows Update:</strong> 100% disk využití bývá dočasné při probíhajícím stahování nebo instalaci Windows Update. Nechte PC pracovat bez zásahu a zkontrolujte po hodině.</li>
<li><strong>Trvalé řešení — přechod na SSD:</strong> Nejúčinnější oprava je výměna HDD za SSD (SATA nebo NVMe). SSD zvládá tisíce IOPS vs. ~100 u HDD — zmizení problému je okamžité a trvalé.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Identify the culprit in Task Manager:</strong> Open Task Manager (<kbd>Ctrl + Shift + Esc</kbd>) → Performance tab → Disk. In the Processes tab, sort the "Disk" column descending — find which process is saturating the disk (typically: Antimalware Service, SysMain, Windows Update).</li>
<li><strong>Temporarily disable SysMain (Superfetch):</strong> Press <kbd>Win + R</kbd> → type <code>services.msc</code> → find "SysMain" → Properties → Startup type = Disabled → Stop. This service pre-loads files into RAM but is very demanding on HDDs.</li>
<li><strong>Check the disk health (SMART):</strong> Download <strong>CrystalDiskInfo</strong> — if it shows a yellow or red warning (Reallocated Sectors, Pending Sectors), the drive is physically damaged and needs replacing.</li>
<li><strong>Wait for Windows Update to finish:</strong> 100% disk usage is often temporary during an active Windows Update download or installation. Let the PC work without interruption and check again after an hour.</li>
<li><strong>Permanent fix — upgrade to an SSD:</strong> The most effective cure is replacing the HDD with an SSD (SATA or NVMe). SSDs handle thousands of IOPS vs. ~100 for HDDs — the problem disappears immediately and permanently.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>在任务管理器中识别问题进程：</strong>打开任务管理器（<kbd>Ctrl + Shift + Esc</kbd>）→ 性能选项卡 → 磁盘。在进程选项卡中，按"磁盘"列降序排列——找出哪个进程在占用磁盘（通常是：防病毒服务、SysMain、Windows 更新）。</li>
<li><strong>临时禁用 SysMain (Superfetch)：</strong>按 <kbd>Win + R</kbd> → 输入 <code>services.msc</code> → 找到"SysMain" → 属性 → 启动类型 = 禁用 → 停止。此服务会预先将文件加载到 RAM，但对机械硬盘压力很大。</li>
<li><strong>检查磁盘健康状态（SMART）：</strong>下载 <strong>CrystalDiskInfo</strong>——如果显示黄色或红色警告（坏扇区重新分配、待定扇区），则磁盘已物理损坏，需要更换。</li>
<li><strong>等待 Windows 更新完成：</strong>100% 磁盘占用通常是 Windows 更新下载或安装过程中的临时现象。让电脑无干扰地工作，一小时后再检查。</li>
<li><strong>永久解决方案——升级到 SSD：</strong>最有效的解决方案是将 HDD 更换为 SSD（SATA 或 NVMe）。SSD 处理数千 IOPS 对比 HDD 的约 100 IOPS——问题立即且永久消失。</li>
</ol>`
        },
        details: {
            cs: "Fenomén '100% disku' je extrémně častý u systémů vybavených klasickým plotnovým harddiskem (HDD), na kterém běží Windows 10/11. Moderní OS spoléhají na vysoký počet souběžných IOPS (vstupy a výstupy za sekundu), ať už jde o telemetrii, Windows Defender skener na pozadí, indexování souborů a Superfetch. HDD disk disponuje běžně rychlostmi pod 150 IOPS, zatímco moderní systémy v peaku vyžadují tisíce IOPS – proto se disk zahltí a čekací fronty systémových procesů způsobí, že UI vytuhne. Opravdovým a konečným lékem je vždy čistá migrace OS na NVMe nebo SATA SSD. Dočasně lze pomoci zákazem služeb connected user experiences / sysmain.",
            en: "The '100% active disk time' phenomenon is incredibly common on computers running Windows 10/11 on a traditional mechanical Hard Disk Drive (HDD). Modern operating systems rely on a very high level of concurrent IOPS (Input/Output Operations Per Second) for telemetry, background Windows Defender scans, search indexing, and Superfetch loading. While older HDDs offer fewer than 150 IOPS, these modern background tasks frequently demand thousands—saturating the drive completely and freezing the user interface by stalling I/O requests. The only permanent and true remedy is cloning or clean-installing the OS onto a SATA or NVMe SSD. Temporary mitigations include disabling the 'SysMain' service.",
            zh: "'100% 磁盘占用' 现象在使用传统机械硬盘 (HDD) 运行 Windows 10/11 的计算机上非常普遍。现代操作系统在处理遥测、Windows Defender 后台扫描、文件索引和 Superfetch 预读时极为依赖同时进行的 IOPS（每秒输入输出操作）。机械硬盘通常只能提供低于 150 的 IOPS，而这些后台任务需要数千的并发读取——致使硬盘完全饱和，I/O 请求陷入等待引起界面严重冻结。唯一真正且永久的解决方案是将系统迁移到 SATA 或 NVMe 固态硬盘上。通过禁用系统内的 'SysMain' 和相关服务只可作为临时的临时缓解措施。"
        }
    },
    { "id": "gpu-artifacts-vram", "type": "hardware", "subcategory": "gpu", "vendors": ["nvidia", "amd", "intel"], "code": "VRAM Artifacts / Checkerboarding", "category": { "cs": "Grafická karta", "en": "Graphics Card", "zh": "显卡" }, "description": { "cs": "Vizuální artefakty (šachovnice, náhodné barevné tečky) se objevují na obrazovce.", "en": "Visual artifacts (checkerboard patterns, random colored dots) appear on screen.", "zh": "Visual artifacts (checkerboard patterns, random colored dots) appear on screen. (ZH)" }, "solution": { "cs": "Snižte frekvenci pamětí, zvyšte napětí, nebo kartu reklamujte.", "en": "Reduce memory clock, increase voltage, or RMA the card.", "zh": "Reduce memory clock, increase voltage, or RMA the card. (ZH)" }, "details": { "cs": "Artefakty jsou typicky způsobeny přehříváním nebo degradací VRAM. Paměťové čipy GDDR, které neudrží svůj stav, způsobí poškození snímku ve frame bufferu.", "en": "Artifacts are typically caused by VRAM overheating or degradation. GDDR memory chips failing to hold state will result in corruption of the frame buffer.", "zh": "Artifacts are typically caused by VRAM overheating or degradation. GDDR memory chips failing to hold state will result in corruption of the frame buffer. (ZH)" } },
    { "id": "gpu-power-limit", "type": "hardware", "subcategory": "gpu", "vendors": ["nvidia", "amd", "intel"], "code": "Power Limit Throttling (PerfCap: Pwr)", "category": { "cs": "Grafická karta", "en": "Graphics Card", "zh": "显卡" }, "description": { "cs": "Takt GPU výrazně klesá pod velkou zátěží i přes nízké teploty.", "en": "GPU clocks drop significantly under heavy load despite low temperatures.", "zh": "GPU clocks drop significantly under heavy load despite low temperatures. (ZH)" }, "solution": { "cs": "Zvyšte limit napájení v MSI Afterburner, zkontrolujte PCIe kabely, nebo upgradujte zdroj (PSU).", "en": "Increase power limit in MSI Afterburner, check PCIe cables, or upgrade PSU.", "zh": "Increase power limit in MSI Afterburner, check PCIe cables, or upgrade PSU. (ZH)" }, "details": { "cs": "BIOS grafické karty monitoruje spotřebu pomocí bočníků (shunt resistors). Pokud spotřeba překročí programovaný limit, dojde ke snížení taktu jádra (PerfCap Reason: Pwr).", "en": "The GPU BIOS monitors power draw via shunt resistors. If the draw exceeds the programmed limit, it throttles the core clock (PerfCap Reason: Pwr).", "zh": "The GPU BIOS monitors power draw via shunt resistors. If the draw exceeds the programmed limit, it throttles the core clock (PerfCap Reason: Pwr). (ZH)" } },
    { "id": "gpu-fan-rattle", "type": "hardware", "subcategory": "gpu", "vendors": ["nvidia", "amd", "intel"], "code": "GPU Fan Rattling / Bearing Failure", "category": { "cs": "Grafická karta", "en": "Graphics Card", "zh": "显卡" }, "description": { "cs": "Jeden z ventilátorů GPU vydává hlasité chrčivé nebo drhnoucí zvuky.", "en": "One of the GPU fans makes a loud rattling or grinding noise.", "zh": "One of the GPU fans makes a loud rattling or grinding noise. (ZH)" }, "solution": { "cs": "Vyměňte poškozený ventilátor nebo připevněte standardní ventilátory k pasivu (deshroud).", "en": "Replace the affected fan or zip-tie standard case fans to the heatsink (deshroud).", "zh": "Replace the affected fan or zip-tie standard case fans to the heatsink (deshroud). (ZH)" }, "details": { "cs": "Kluzná ložiska u levnějších ventilátorů GPU časem vysychají, což způsobuje viklání rotoru. Kuličková ložiska (Ball bearings) nebo fluidní ložiska (FDB) vydrží déle.", "en": "Sleeve bearings in cheaper GPU fans dry out over time, causing the impeller to wobble. Ball bearings or fluid dynamic bearings (FDB) last longer.", "zh": "Sleeve bearings in cheaper GPU fans dry out over time, causing the impeller to wobble. Ball bearings or fluid dynamic bearings (FDB) last longer. (ZH)" } },
    { "id": "gpu-pcie-lane", "type": "hardware", "subcategory": "gpu", "vendors": ["nvidia", "amd", "intel"], "code": "PCIe running at x8 instead of x16", "category": { "cs": "Grafická karta", "en": "Graphics Card", "zh": "显卡" }, "description": { "cs": "GPU-Z hlásí pod zátěží PCIe x8 3.0/4.0 namísto plných x16.", "en": "GPU-Z reports PCIe x8 3.0/4.0 under load instead of x16.", "zh": "GPU-Z reports PCIe x8 3.0/4.0 under load instead of x16. (ZH)" }, "solution": { "cs": "Znovu osaďte GPU, zkontrolujte, zda nejsou ohnuté piny CPU, nebo se ujistěte, že M.2 disky nesdílejí linky s GPU.", "en": "Reseat the GPU, check for bent CPU pins, or ensure M.2 drives aren't sharing lanes.", "zh": "Reseat the GPU, check for bent CPU pins, or ensure M.2 drives aren't sharing lanes. (ZH)" }, "details": { "cs": "Běžné platformy mají omezený počet PCIe linek. Obsazení určitých M.2 slotů nebo prach v PCIe slotu může způsobit, že GPU dojedná nižší počet linek.", "en": "Consumer platforms have limited PCIe lanes. Populating certain M.2 slots or having dust in the PCIe slot can force the GPU to negotiate a lower lane count.", "zh": "Consumer platforms have limited PCIe lanes. Populating certain M.2 slots or having dust in the PCIe slot can force the GPU to negotiate a lower lane count. (ZH)" } },
    { "id": "gpu-hotspot", "type": "hardware", "subcategory": "gpu", "vendors": ["nvidia", "amd", "intel"], "code": "Extreme GPU Hotspot Delta", "category": { "cs": "Grafická karta", "en": "Graphics Card", "zh": "显卡" }, "description": { "cs": "Teplota jádra GPU je 70°C, ale hotspot je nad 105°C, což způsobuje náhlé zvýšení otáček ventilátorů.", "en": "GPU core is 70°C but hotspot is 105°C+ causing fan spikes.", "zh": "GPU core is 70°C but hotspot is 105°C+ causing fan spikes. (ZH)" }, "solution": { "cs": "Přepastujte jádro GPU, zkontrolujte přítlak chladiče, nebo vyměňte teplovodivé podložky.", "en": "Repaste the GPU die, check mounting pressure, or replace thermal pads.", "zh": "Repaste the GPU die, check mounting pressure, or replace thermal pads. (ZH)" }, "details": { "cs": "Hotspot je nejteplejší senzor na čipu. Rozdíl (delta) nad 25°C mezi průměrem a hotspotem značí nerovnoměrné nanesení teplovodivé pasty nebo špatný přítlak chladiče.", "en": "The hotspot is the hottest sensor on the die. A delta >25°C between average and hotspot indicates uneven thermal paste application or cooler mounting.", "zh": "The hotspot is the hottest sensor on the die. A delta >25°C between average and hotspot indicates uneven thermal paste application or cooler mounting. (ZH)" } },
    { "id": "gpu-black-screen-100", "type": "hardware", "subcategory": "gpu", "vendors": ["nvidia", "amd", "intel"], "code": "Black Screen & 100% Fans", "category": { "cs": "Grafická karta", "en": "Graphics Card", "zh": "显卡" }, "description": { "cs": "Monitor ztratí signál a ventilátory GPU se okamžitě roztočí na 100 %.", "en": "Monitor loses signal and GPU fans instantly ramp to 100%.", "zh": "Monitor loses signal and GPU fans instantly ramp to 100%. (ZH)" }, "solution": { "cs": "Zkontrolujte zapojení 12VHPWR konektoru, snižte limit napájení nebo vyměňte napájecí zdroj (PSU).", "en": "Check 12VHPWR connector seating, lower power limit, or replace PSU.", "zh": "Check 12VHPWR connector seating, lower power limit, or replace PSU. (ZH)" }, "details": { "cs": "Jedná se o klasické sepnutí OCP (Over Current Protection) nebo ztrátu snímání 12V napájení. Často souvisí s přechodovými špičkami nebo tavením 12VHPWR kabelů.", "en": "This is a classic OCP (Over Current Protection) trip or loss of 12V power sensing. Often related to transient spikes or melting 12VHPWR cables.", "zh": "This is a classic OCP (Over Current Protection) trip or loss of 12V power sensing. Often related to transient spikes or melting 12VHPWR cables. (ZH)" } },
    { "id": "gpu-dxgi-error", "type": "hardware", "subcategory": "gpu", "vendors": ["nvidia", "amd", "intel"], "code": "DXGI_ERROR_DEVICE_HUNG", "category": { "cs": "Grafická karta", "en": "Graphics Card", "zh": "显卡" }, "description": { "cs": "Hry padají na plochu s chybou DXGI device hung.", "en": "Games crash to desktop with a DXGI device hung error.", "zh": "Games crash to desktop with a DXGI device hung error. (ZH)" }, "solution": { "cs": "Podtaktujte jádro GPU o 50 MHz, pro účely testování vypněte XMP, nebo aktualizujte ovladače.", "en": "Underclock GPU core by 50MHz, disable XMP to test, or update drivers.", "zh": "Underclock GPU core by 50MHz, disable XMP to test, or update drivers. (ZH)" }, "details": { "cs": "Subsystém DirectX Graphics Infrastructure ztratil komunikaci s GPU. Často způsobeno nestabilním továrním přetaktováním nebo nestabilitou časování pamětí.", "en": "The DirectX Graphics Infrastructure subsystem lost communication with the GPU. Often caused by unstable factory overclocks or memory timing instability.", "zh": "The DirectX Graphics Infrastructure subsystem lost communication with the GPU. Often caused by unstable factory overclocks or memory timing instability. (ZH)" } },
    { "id": "gpu-displayport-pin20", "type": "hardware", "subcategory": "gpu", "vendors": ["nvidia", "amd", "intel"], "code": "DisplayPort Pin 20 Power Issue", "category": { "cs": "Grafická karta", "en": "Graphics Card", "zh": "显卡" }, "description": { "cs": "PC se spouští podivně, nebo GPU se chová nestabilně s připojeným DP kabelem.", "en": "PC turns on weirdly or GPU behaves erratically with DP cable connected.", "zh": "PC turns on weirdly or GPU behaves erratically with DP cable connected. (ZH)" }, "solution": { "cs": "Kupte VESA certifikovaný DisplayPort kabel, který nemá zapojený pin 20 pro napájení (3.3V).", "en": "Buy a VESA-certified DisplayPort cable that lacks the 3.3V pin 20 connection.", "zh": "Buy a VESA-certified DisplayPort cable that lacks the 3.3V pin 20 connection. (ZH)" }, "details": { "cs": "Pin 20 na DP přenáší napájení 3.3V. Nekvalitní kabely tento pin propojují, což způsobuje, že monitor zpětně napájí GPU, což může bránit normálnímu startu.", "en": "Pin 20 on DP carries 3.3V power. Non-compliant cables connect this pin, causing the monitor to back-feed power into the GPU, preventing normal boot.", "zh": "Pin 20 on DP carries 3.3V power. Non-compliant cables connect this pin, causing the monitor to back-feed power into the GPU, preventing normal boot. (ZH)" } },
    { "id": "gpu-sag", "type": "hardware", "subcategory": "gpu", "vendors": ["nvidia", "amd", "intel"], "code": "GPU Sag / PCB Bending", "category": { "cs": "Grafická karta", "en": "Graphics Card", "zh": "显卡" }, "description": { "cs": "Těžké GPU je na pravé straně prověšené, což způsobuje výpadky obrazu.", "en": "Heavy GPU sags on the right side, causing display dropouts.", "zh": "Heavy GPU sags on the right side, causing display dropouts. (ZH)" }, "solution": { "cs": "Nainstalujte podpůrný držák pro GPU (anti-sag stand).", "en": "Install a GPU support bracket or anti-sag stand.", "zh": "Install a GPU support bracket or anti-sag stand. (ZH)" }, "details": { "cs": "Moderní těžké grafické karty vyvíjejí extrémní tlak na PCIe slot a BGA pájené spoje v blízkosti PCIe rozhraní, což vede k mikroprasklinám.", "en": "Modern heavy GPUs place extreme stress on the PCIe slot and the BGA solder joints near the PCIe interface, leading to micro-fractures.", "zh": "Modern heavy GPUs place extreme stress on the PCIe slot and the BGA solder joints near the PCIe interface, leading to micro-fractures. (ZH)" } },
    { "id": "gpu-coil-whine-psu", "type": "hardware", "subcategory": "gpu", "vendors": ["nvidia", "amd", "intel"], "code": "Coil Whine related to PSU", "category": { "cs": "Grafická karta", "en": "Graphics Card", "zh": "显卡" }, "description": { "cs": "Grafická karta hlasitě píská (coil whine), ale při změně zdroje (PSU) se mění výška tónu.", "en": "GPU whines loudly, but changing the PSU changes the pitch.", "zh": "GPU whines loudly, but changing the PSU changes the pitch. (ZH)" }, "solution": { "cs": "Změňte zdroj za kvalitnější model s lepší filtrací zvlnění (ripple suppression).", "en": "Swap to a higher-tier power supply with better ripple suppression.", "zh": "Swap to a higher-tier power supply with better ripple suppression. (ZH)" }, "details": { "cs": "Coil whine může být zhoršen nečistým napájením (vysoké zvlnění napětí) ze zdroje, což způsobuje hlasitější rezonanci induktorů VRM na GPU.", "en": "Coil whine can be exacerbated by dirty power (high ripple voltage) from the PSU, causing the VRM inductors on the GPU to resonate louder.", "zh": "Coil whine can be exacerbated by dirty power (high ripple voltage) from the PSU, causing the VRM inductors on the GPU to resonate louder. (ZH)" } },
    { "id": "cpu-cache-hierarchy", "type": "hardware", "subcategory": "cpu", "vendors": ["intel", "amd"], "code": "Cache Hierarchy Error (WHEA 18)", "category": { "cs": "Procesor", "en": "Processor", "zh": "处理器" }, "description": { "cs": "Systém se restartuje pod zátěží a v Event Vieweru zaznamená chybu WHEA 18.", "en": "System reboots under load with WHEA logger Event ID 18.", "zh": "System reboots under load with WHEA logger Event ID 18. (ZH)" }, "solution": { "cs": "Zvyšte napětí Curve Optimizeru, snižte limity PBO, nebo otestujte systém na továrním nastavení.", "en": "Increase Curve Optimizer voltage, lower PBO limits, or test stock settings.", "zh": "Increase Curve Optimizer voltage, lower PBO limits, or test stock settings. (ZH)" }, "details": { "cs": "Obecná chyba indikující selhání hardwaru uvnitř cache nebo jader procesoru, velmi často spojována s nestabilním podtaktováním AMD Curve Optimizer.", "en": "A generic error indicating a hardware failure inside the CPU cache or cores, heavily associated with unstable AMD Curve Optimizer undervolts.", "zh": "A generic error indicating a hardware failure inside the CPU cache or cores, heavily associated with unstable AMD Curve Optimizer undervolts. (ZH)" } },
    { "id": "cpu-edc-limit", "type": "hardware", "subcategory": "cpu", "vendors": ["intel", "amd"], "code": "EDC/TDC Limit Reached", "category": { "cs": "Procesor", "en": "Processor", "zh": "处理器" }, "description": { "cs": "Výkon procesoru ve vícejádrové zátěži je nižší než by měl být.", "en": "CPU multi-core performance is lower than expected.", "zh": "CPU multi-core performance is lower than expected. (ZH)" }, "solution": { "cs": "Zvyšte EDC/TDC limity v nastavení PBO v BIOSu.", "en": "Increase EDC/TDC limits in BIOS under PBO settings.", "zh": "Increase EDC/TDC limits in BIOS under PBO settings. (ZH)" }, "details": { "cs": "Electrical Design Current (EDC) je limit maximálního proudu. Zasahování tohoto limitu znamená, že VRM nebo BIOS omezují špičkový proud k procesoru.", "en": "Electrical Design Current (EDC) is the peak current limit. Throttling here means the VRM or BIOS is restricting peak amperage to the CPU.", "zh": "Electrical Design Current (EDC) is the peak current limit. Throttling here means the VRM or BIOS is restricting peak amperage to the CPU. (ZH)" } },
    { "id": "cpu-thermal-throttle", "type": "hardware", "subcategory": "cpu", "vendors": ["intel", "amd"], "code": "PROCHOT / Thermal Throttling", "category": { "cs": "Procesor", "en": "Processor", "zh": "处理器" }, "description": { "cs": "Takt CPU padá na základní hodnotu nebo níže během renderování.", "en": "CPU clock speeds drop to base clock or lower during rendering.", "zh": "CPU clock speeds drop to base clock or lower during rendering. (ZH)" }, "solution": { "cs": "Zkontrolujte otáčky čerpadla, přepastujte CPU, nebo odstraňte plastovou fólii z chladiče.", "en": "Check pump RPM, repaste CPU, or remove plastic peel from cooler.", "zh": "Check pump RPM, repaste CPU, or remove plastic peel from cooler. (ZH)" }, "details": { "cs": "CPU dosáhlo své maximální kritické teploty (TjMax, obvykle 95-100°C) a aktivovalo signál PROCHOT (Processor Hot) ke snížení napětí a frekvence.", "en": "The CPU hit its maximum junction temperature (TjMax, usually 95-100C) and asserted PROCHOT (Processor Hot) to drop voltage and frequency to survive.", "zh": "The CPU hit its maximum junction temperature (TjMax, usually 95-100C) and asserted PROCHOT (Processor Hot) to drop voltage and frequency to survive. (ZH)" } },
    { "id": "cpu-bent-pin-mem", "type": "hardware", "subcategory": "cpu", "vendors": ["intel", "amd"], "code": "Bent Pin (Memory Channel Loss)", "category": { "cs": "Procesor", "en": "Processor", "zh": "处理器" }, "description": { "cs": "Systém detekuje pouze polovinu nainstalované paměti RAM.", "en": "Only half of installed RAM is detected.", "zh": "Only half of installed RAM is detected. (ZH)" }, "solution": { "cs": "Zkontrolujte piny na CPU nebo v patici, zda nejsou ohnuté. Namontujte chladič s rovnoměrným přítlakem.", "en": "Check CPU socket or CPU pins for bends, remount cooler with less pressure.", "zh": "Check CPU socket or CPU pins for bends, remount cooler with less pressure. (ZH)" }, "details": { "cs": "Paměťové kanály jsou přímo napojeny na specifické piny. Ohnutý pin nebo nerovnoměrný přítlak chladiče může přerušit kontakt a znefunkčnit celý kanál.", "en": "Memory channels are directly wired to specific pins. A bent pin or uneven cooler mounting pressure can break contact, disabling an entire channel.", "zh": "Memory channels are directly wired to specific pins. A bent pin or uneven cooler mounting pressure can break contact, disabling an entire channel. (ZH)" } },
    { "id": "cpu-vccsa", "type": "hardware", "subcategory": "cpu", "vendors": ["intel", "amd"], "code": "System Agent / VCCSA Instability", "category": { "cs": "Procesor", "en": "Processor", "zh": "处理器" }, "description": { "cs": "Blue Screen of Death (BSOD) při zapnutí vysokorychlostních XMP profilů.", "en": "BSODs when enabling high-speed XMP profiles.", "zh": "BSODs when enabling high-speed XMP profiles. (ZH)" }, "solution": { "cs": "Ručně zvyšte napětí VCCSA (System Agent) v BIOSu o malou hodnotu.", "en": "Manually increase VCCSA (System Agent) voltage slightly.", "zh": "Manually increase VCCSA (System Agent) voltage slightly. (ZH)" }, "details": { "cs": "System Agent se stará o řadič paměti. Rychlé RAM vyžadují vyšší SA napětí pro udržení stabilní signalizace mezi CPU a pamětí.", "en": "The System Agent handles the memory controller. High-speed RAM requires higher SA voltage to maintain stable signaling.", "zh": "The System Agent handles the memory controller. High-speed RAM requires higher SA voltage to maintain stable signaling. (ZH)" } },
    { "id": "cpu-clock-watchdog", "type": "hardware", "subcategory": "cpu", "vendors": ["intel", "amd"], "code": "CLOCK_WATCHDOG_TIMEOUT", "category": { "cs": "Procesor", "en": "Processor", "zh": "处理器" }, "description": { "cs": "Systém kompletně zamrzne, po čemž následuje modrá obrazovka (BSOD).", "en": "System freezes completely followed by a BSOD.", "zh": "System freezes completely followed by a BSOD. (ZH)" }, "solution": { "cs": "Zrušte přetaktování CPU, aktualizujte BIOS, nebo zvyšte napětí Vcore.", "en": "Remove CPU overclock, update BIOS, or increase Vcore.", "zh": "Remove CPU overclock, update BIOS, or increase Vcore. (ZH)" }, "details": { "cs": "Vyskytuje se v multiprocesorových systémech. Očekávané přerušení hodin na sekundárním procesoru nebylo přijato. Vždy ukazuje na nestabilitu jader CPU.", "en": "An expected clock interrupt on a secondary processor in a multi-processor system was not received. Always indicates CPU core instability.", "zh": "An expected clock interrupt on a secondary processor in a multi-processor system was not received. Always indicates CPU core instability. (ZH)" } },
    { "id": "cpu-spikes", "type": "hardware", "subcategory": "cpu", "vendors": ["intel", "amd"], "code": "Random Temperature Spikes at Idle", "category": { "cs": "Procesor", "en": "Processor", "zh": "处理器" }, "description": { "cs": "Teplota CPU náhodně skáče ze 40°C na 65°C, i když jen procházíte internet.", "en": "CPU temp jumps from 40C to 65C randomly while browsing.", "zh": "CPU temp jumps from 40C to 65C randomly while browsing. (ZH)" }, "solution": { "cs": "Změňte plán napájení Windows, nebo upravte křivku ventilátorů, aby ignorovaly krátké špičky.", "en": "Change Windows Power Plan or adjust fan curves to ignore short spikes.", "zh": "Change Windows Power Plan or adjust fan curves to ignore short spikes. (ZH)" }, "details": { "cs": "Jedná se o normální chování moderních procesorů (Ryzen 3000/5000/7000). Jeden úkol na pozadí probudí jádro a okamžitě mu přidělí maximální napětí.", "en": "Normal behavior for modern high-density CPUs (Ryzen 3000/5000/7000). A single background task wakes a core and boosts it to max voltage instantly.", "zh": "Normal behavior for modern high-density CPUs (Ryzen 3000/5000/7000). A single background task wakes a core and boosts it to max voltage instantly. (ZH)" } },
    { "id": "cpu-c-state-bsod", "type": "hardware", "subcategory": "cpu", "vendors": ["intel", "amd"], "code": "Idle BSOD (Low C-State Crash)", "category": { "cs": "Procesor", "en": "Processor", "zh": "处理器" }, "description": { "cs": "PC spadne, když je zcela nečinné (idle), ale pod zátěží běží normálně.", "en": "PC crashes when left completely idle, fine under load.", "zh": "PC crashes when left completely idle, fine under load. (ZH)" }, "solution": { "cs": "Vypněte Global C-States v BIOSu, nebo použijte režim napájení Typical Current Idle (u AMD).", "en": "Disable Global C-States in BIOS or use Typical Current Idle.", "zh": "Disable Global C-States in BIOS or use Typical Current Idle. (ZH)" }, "details": { "cs": "Když napětí klesne příliš nízko během spánku jader (C6/C7), horší kusy křemíku nemusí mít dostatek napětí pro udržení stability jádra.", "en": "When voltage drops too low in deep sleep states (C6/C7), silicon lottery losers might not have enough voltage to maintain core stability.", "zh": "When voltage drops too low in deep sleep states (C6/C7), silicon lottery losers might not have enough voltage to maintain core stability. (ZH)" } },
    { "id": "cpu-bclk", "type": "hardware", "subcategory": "cpu", "vendors": ["intel", "amd"], "code": "BCLK Spread Spectrum Instability", "category": { "cs": "Procesor", "en": "Processor", "zh": "处理器" }, "description": { "cs": "Základní takt neustále kolísá kolem 99.8 MHz, což může způsobovat mikro-záseky.", "en": "Base clock fluctuates around 99.8MHz causing micro-stutters.", "zh": "Base clock fluctuates around 99.8MHz causing micro-stutters. (ZH)" }, "solution": { "cs": "Vypněte BCLK Spread Spectrum v nastavení BIOSu.", "en": "Disable BCLK Spread Spectrum in BIOS.", "zh": "Disable BCLK Spread Spectrum in BIOS. (ZH)" }, "details": { "cs": "Spread spectrum moduluje frekvenci základního taktu pro snížení elektromagnetického rušení (EMI), avšak při extrémním přetaktování může způsobovat lehkou nestabilitu.", "en": "Spread spectrum modulates the base clock to reduce EMI (electromagnetic interference), but can cause slight instability in extreme overclocks.", "zh": "Spread spectrum modulates the base clock to reduce EMI (electromagnetic interference), but can cause slight instability in extreme overclocks. (ZH)" } },
    { "id": "cpu-delid-liquid", "type": "hardware", "subcategory": "cpu", "vendors": ["intel", "amd"], "code": "Liquid Metal Pump-Out", "category": { "cs": "Procesor", "en": "Processor", "zh": "处理器" }, "description": { "cs": "Teploty CPU se masivně zhorší měsíce po provedení delidu (odstranění rozvaděče tepla).", "en": "CPU temps degrade severely months after delidding.", "zh": "CPU temps degrade severely months after delidding. (ZH)" }, "solution": { "cs": "Aplikujte tekutý kov znovu, popř. jemně zdrrsněte povrch křemíku.", "en": "Re-apply liquid metal, rough up the die surface slightly.", "zh": "Re-apply liquid metal, rough up the die surface slightly. (ZH)" }, "details": { "cs": "Tepelné cyklování způsobuje takzvaný pump-out efekt – tekutý kov se vytlačí ze středu jádra ke krajům, zanechá suchá místa a tvoří nebezpečné hotspoty.", "en": "Thermal cycling causes liquid metal to migrate (pump-out) from the center of the die, leaving dry spots and causing massive hotspots.", "zh": "Thermal cycling causes liquid metal to migrate (pump-out) from the center of the die, leaving dry spots and causing massive hotspots. (ZH)" } },
    { "id": "ram-tm5-error2", "type": "hardware", "subcategory": "ram", "vendors": ["ddr4", "ddr5"], "code": "TestMem5 Error 2/6", "category": { "cs": "Paměť RAM", "en": "Memory (RAM)", "zh": "内存" }, "description": { "cs": "Chyby v paměti jsou v TestMem5 detekovány velmi rychle po startu.", "en": "Memory errors detected very quickly in TM5.", "zh": "Memory errors detected very quickly in TM5. (ZH)" }, "solution": { "cs": "Zvyšte napětí VDD/VDDQ nebo povolte primární časování (tCL/tRCD).", "en": "Increase VDD/VDDQ voltage or loosen primary timings.", "zh": "Increase VDD/VDDQ voltage or loosen primary timings. (ZH)" }, "details": { "cs": "Indikuje závažnou nestabilitu, obvykle nedostatek napětí nebo přehnaně agresivní (nízké) hodnoty tCL nebo tRCD.", "en": "Indicates severe instability, usually lack of voltage or overly tight tCL/tRCD.", "zh": "Indicates severe instability, usually lack of voltage or overly tight tCL/tRCD. (ZH)" } },
    { "id": "ram-trfc-temp", "type": "hardware", "subcategory": "ram", "vendors": ["ddr4", "ddr5"], "code": "tRFC Temperature Sensitivity", "category": { "cs": "Paměť RAM", "en": "Memory (RAM)", "zh": "内存" }, "description": { "cs": "Hry padají po 30 minutách hraní, ačkoliv zpočátku běží v pořádku.", "en": "Games crash after 30 minutes of play, fine initially.", "zh": "Games crash after 30 minutes of play, fine initially. (ZH)" }, "solution": { "cs": "Namiřte ventilátor přímo na paměti, nebo zvyšte hodnotu tRFC.", "en": "Point a fan at the RAM or loosen tRFC timing.", "zh": "Point a fan at the RAM or loosen tRFC timing. (ZH)" }, "details": { "cs": "tRFC určuje, jak dlouho se buňky občerstvují (refresh). Při vysokých teplotách (>50°C) kondenzátory paměti ztrácejí náboj rychleji a vyžadují častější občerstvení.", "en": "tRFC determines how long cells refresh. At high temperatures (50C+), capacitors leak faster, requiring longer or more frequent refreshes.", "zh": "tRFC determines how long cells refresh. At high temperatures (50C+), capacitors leak faster, requiring longer or more frequent refreshes. (ZH)" } },
    { "id": "ram-gear2", "type": "hardware", "subcategory": "ram", "vendors": ["ddr4", "ddr5"], "code": "Gear 1 to Gear 2 Failure", "category": { "cs": "Paměť RAM", "en": "Memory (RAM)", "zh": "内存" }, "description": { "cs": "Systém nenabootuje s RAM nad 3600 MHz u procesorů Intel.", "en": "System won't boot with RAM above 3600MHz on Intel.", "zh": "System won't boot with RAM above 3600MHz on Intel. (ZH)" }, "solution": { "cs": "Přepněte řadič paměti do režimu Gear 2.", "en": "Switch memory controller to Gear 2 mode.", "zh": "Switch memory controller to Gear 2 mode. (ZH)" }, "details": { "cs": "V režimu Gear 1 běží řadič paměti se zbytkem systému 1:1. Nad frekvencí 3600-4000 MHz už řadič rychlostně nestačí a je nutné zapnout Gear 2 (poměr 1:2).", "en": "In Gear 1, the memory controller runs 1:1 with the RAM. Above 3600-4000MHz, the controller cannot keep up, requiring Gear 2 (1:2 ratio).", "zh": "In Gear 1, the memory controller runs 1:1 with the RAM. Above 3600-4000MHz, the controller cannot keep up, requiring Gear 2 (1:2 ratio). (ZH)" } },
    { "id": "ram-fclk-desync", "type": "hardware", "subcategory": "ram", "vendors": ["ddr4", "ddr5"], "code": "FCLK Desync (Infinity Fabric)", "category": { "cs": "Paměť RAM", "en": "Memory (RAM)", "zh": "内存" }, "description": { "cs": "Praskání zvuku a záseky na systémech AMD při frekvenci RAM 3800 MHz a více.", "en": "Audio crackling and stuttering on AMD when RAM is at 3800+.", "zh": "Audio crackling and stuttering on AMD when RAM is at 3800+. (ZH)" }, "solution": { "cs": "Snižte rychlost RAM na 3600 MHz nebo zvyšte napětí SoC.", "en": "Lower RAM speed to 3600 or increase SoC voltage.", "zh": "Lower RAM speed to 3600 or increase SoC voltage. (ZH)" }, "details": { "cs": "Takt Infinity Fabric (FCLK) začne být nestabilní při frekvencích nad 1800-1900 MHz. Výsledkem jsou chyby na sběrnici PCIe a USB (WHEA 19).", "en": "The Infinity Fabric clock (FCLK) becomes unstable when pushed past 1800-1900MHz, causing PCIe and USB bus errors (WHEA 19).", "zh": "The Infinity Fabric clock (FCLK) becomes unstable when pushed past 1800-1900MHz, causing PCIe and USB bus errors (WHEA 19). (ZH)" } },
    { "id": "ram-spdif", "type": "hardware", "subcategory": "ram", "vendors": ["ddr4", "ddr5"], "code": "SPD Corruption", "category": { "cs": "Paměť RAM", "en": "Memory (RAM)", "zh": "内存" }, "description": { "cs": "RGB na paměti přestane svítit a v BIOSu se zobrazuje podivný název.", "en": "RAM stick RGB stops working and shows weird generic name in BIOS.", "zh": "RAM stick RGB stops working and shows weird generic name in BIOS. (ZH)" }, "solution": { "cs": "Přehrátte (reflash) SPD pomocí Thaiphoon Burner nebo modul reklamujte.", "en": "Reflash SPD using Thaiphoon Burner or RMA.", "zh": "Reflash SPD using Thaiphoon Burner or RMA. (ZH)" }, "details": { "cs": "Použití několika RGB softwarů současně může narušit sběrnici SMBus a přepsat čip SPD. Následkem je poškození profilu paměti (tzv. brick).", "en": "Using multiple RGB control software concurrently can corrupt the SMBus and overwrite the SPD chip, bricking the RAM profile.", "zh": "Using multiple RGB control software concurrently can corrupt the SMBus and overwrite the SPD chip, bricking the RAM profile. (ZH)" } },
    { "id": "ram-pmic-lock", "type": "hardware", "subcategory": "ram", "vendors": ["ddr4", "ddr5"], "code": "DDR5 PMIC Voltage Lock", "category": { "cs": "Paměť RAM", "en": "Memory (RAM)", "zh": "内存" }, "description": { "cs": "Není možné nastavit napětí pro DDR5 paměti nad hodnotu 1.435 V.", "en": "Cannot set DDR5 voltage above 1.435V.", "zh": "Cannot set DDR5 voltage above 1.435V. (ZH)" }, "solution": { "cs": "Aktivujte režim High Voltage Mode v nastavení BIOSu.", "en": "Enable High Voltage Mode in BIOS.", "zh": "Enable High Voltage Mode in BIOS. (ZH)" }, "details": { "cs": "Rané moduly DDR5 obsahují zamčené obvody PMIC (Power Management IC), které fyzicky blokují nastavení napětí VDD nad bezpečný limit JEDEC/Intel bez odblokování v BIOSu.", "en": "Early DDR5 modules have locked Power Management ICs (PMICs) that physically prevent setting VDD above JEDEC/Intel safe limits without BIOS override.", "zh": "Early DDR5 modules have locked Power Management ICs (PMICs) that physically prevent setting VDD above JEDEC/Intel safe limits without BIOS override. (ZH)" } },
    { "id": "ram-training-fail", "type": "hardware", "subcategory": "ram", "vendors": ["ddr4", "ddr5"], "code": "Memory Training Failure (0d / C5)", "category": { "cs": "Paměť RAM", "en": "Memory (RAM)", "zh": "内存" }, "description": { "cs": "Základní deska se při studeném startu zasekne na debug LED kontrolce RAM.", "en": "Motherboard gets stuck on RAM LED during cold boot.", "zh": "Motherboard gets stuck on RAM LED during cold boot. (ZH)" }, "solution": { "cs": "Povolte funkci Memory Context Restore nebo upravte ProcODT.", "en": "Enable Memory Context Restore or check ProcODT.", "zh": "Enable Memory Context Restore or check ProcODT. (ZH)" }, "details": { "cs": "Základní deska nedokázala najít stabilní časování RTL/IOL během fáze trénování při spouštění. Velmi časté u 4 osazených modulů (dual-rank).", "en": "The motherboard failed to find stable RTL/IOL timings during the boot training phase. Common with 4 sticks of dual-rank memory.", "zh": "The motherboard failed to find stable RTL/IOL timings during the boot training phase. Common with 4 sticks of dual-rank memory. (ZH)" } },
    { "id": "ram-mixed-kits", "type": "hardware", "subcategory": "ram", "vendors": ["ddr4", "ddr5"], "code": "Mixed RAM Kit Instability", "category": { "cs": "Paměť RAM", "en": "Memory (RAM)", "zh": "内存" }, "description": { "cs": "Modrá obrazovka (BSOD) při kombinování dvou vizuálně identických kitů RAM.", "en": "Blue screens when combining two identical-looking RAM kits.", "zh": "Blue screens when combining two identical-looking RAM kits. (ZH)" }, "solution": { "cs": "Časování nastavte ručně nebo prodejte obě sady a kupte jeden spárovaný kit.", "en": "Manually tune timings or sell and buy a single matched kit.", "zh": "Manually tune timings or sell and buy a single matched kit. (ZH)" }, "details": { "cs": "I přes stejné označení modelu pamětí mění výrobci interní čipy (Samsung, Micron, Hynix) bez varování. Mísení rozdílných čipů pak vede k neshodě v časování.", "en": "Even with the same part number, RAM manufacturers change the underlying ICs (Samsung, Micron, Hynix) without notice, causing timing mismatch.", "zh": "Even with the same part number, RAM manufacturers change the underlying ICs (Samsung, Micron, Hynix) without notice, causing timing mismatch. (ZH)" } },
    { "id": "ram-page-fault", "type": "hardware", "subcategory": "ram", "vendors": ["ddr4", "ddr5"], "code": "PAGE_FAULT_IN_NONPAGED_AREA", "category": { "cs": "Paměť RAM", "en": "Memory (RAM)", "zh": "内存" }, "description": { "cs": "Časté BSOD chyby odkazující na systémový soubor ntoskrnl.exe.", "en": "Frequent blue screens pointing to ntoskrnl.exe.", "zh": "Frequent blue screens pointing to ntoskrnl.exe. (ZH)" }, "solution": { "cs": "Spusťte MemTest86. Popřípadě zvyšte napětí DRAM.", "en": "Run MemTest86. Increase DRAM voltage.", "zh": "Run MemTest86. Increase DRAM voltage. (ZH)" }, "details": { "cs": "Windows se pokusil přečíst data z paměti, která by neměla být přesouvána na disk, ale daná data v RAM byla poškozena (tzv. bit flip).", "en": "Windows tried to read memory that wasn't paged to disk, but the data was corrupted in RAM.", "zh": "Windows tried to read memory that wasn't paged to disk, but the data was corrupted in RAM. (ZH)" } },
    { "id": "ram-rank-interleave", "type": "hardware", "subcategory": "ram", "vendors": ["ddr4", "ddr5"], "code": "Dual Rank vs Single Rank Perf", "category": { "cs": "Paměť RAM", "en": "Memory (RAM)", "zh": "内存" }, "description": { "cs": "Systém běží stabilně, ale herní výkon procesoru je nižší než v recenzích.", "en": "System runs fine but CPU performance is lower than benchmarks.", "zh": "System runs fine but CPU performance is lower than benchmarks. (ZH)" }, "solution": { "cs": "Zajistěte použití alespoň 2 ranků na kanál (buď 2x dual-rank moduly nebo 4x single-rank).", "en": "Ensure you have 2 ranks per channel (2x dual-rank or 4x single-rank).", "zh": "Ensure you have 2 ranks per channel (2x dual-rank or 4x single-rank). (ZH)" }, "details": { "cs": "Prokládání (interleaving) ranků umožňuje paměťovému řadiči přistupovat k jedné vrstvě zatímco se druhá obnovuje, což zvyšuje výkon až o 10 % ve scénářích náročných na CPU.", "en": "Rank interleaving allows the controller to access one rank while another refreshes, granting up to 10% more CPU performance in CPU-bound scenarios.", "zh": "Rank interleaving allows the controller to access one rank while another refreshes, granting up to 10% more CPU performance in CPU-bound scenarios. (ZH)" } },
    { "id": "disk-dma-crc", "type": "hardware", "subcategory": "disk", "vendors": ["hdd", "ssd", "nvme"], "code": "Ultra DMA CRC Error Count", "category": { "cs": "Disk (SSD/HDD)", "en": "Disk (SSD/HDD)", "zh": "硬盘" }, "description": { "cs": "Systém mrzne. Prohlížeč událostí (Event Viewer) ukazuje chyby stornvme nebo chyby disku.", "en": "System freezes, Event Viewer shows stornvme or disk errors.", "zh": "System freezes, Event Viewer shows stornvme or disk errors. (ZH)" }, "solution": { "cs": "Vyměňte SATA kabel, nebo vyjměte a znovu zasuňte NVMe disk do M.2 slotu.", "en": "Replace the SATA cable or reseat the NVMe drive.", "zh": "Replace the SATA cable or reseat the NVMe drive. (ZH)" }, "details": { "cs": "Indikuje poškození dat během jejich přenosu mezi diskem a základní deskou. Téměř vždy se jedná o vadný kabel SATA nebo znečištěné piny M.2 konektoru.", "en": "Indicates data corruption during transfer between the drive and motherboard. Almost always a bad SATA cable or dirty M.2 contacts.", "zh": "Indicates data corruption during transfer between the drive and motherboard. Almost always a bad SATA cable or dirty M.2 contacts. (ZH)" } },
    { "id": "disk-nvme-overheat", "type": "hardware", "subcategory": "disk", "vendors": ["hdd", "ssd", "nvme"], "code": "NVMe Controller Thermal Throttling", "category": { "cs": "Disk (SSD/HDD)", "en": "Disk (SSD/HDD)", "zh": "硬盘" }, "description": { "cs": "Rychlost disku spadne ze 7000 MB/s na 500 MB/s po přibližně 10 sekundách.", "en": "Drive speed drops from 7000MB/s to 500MB/s after 10 seconds.", "zh": "Drive speed drops from 7000MB/s to 500MB/s after 10 seconds. (ZH)" }, "solution": { "cs": "Nainstalujte chladič pro M.2 SSD disk nebo zlepšete chlazení uvnitř skříně.", "en": "Install an M.2 heatsink or improve case airflow.", "zh": "Install an M.2 heatsink or improve case airflow. (ZH)" }, "details": { "cs": "Řadiče rychlých Gen4 a Gen5 NVMe disků běží extrémně horké. Pokud překročí cca 80-85°C, výrazně zpomalí výkon, aby zabránily poškození čipů NAND.", "en": "Gen4/Gen5 NVMe controllers run extremely hot. If they hit 80-85C, they severely throttle to prevent NAND degradation.", "zh": "Gen4/Gen5 NVMe controllers run extremely hot. If they hit 80-85C, they severely throttle to prevent NAND degradation. (ZH)" } },
    { "id": "disk-cache-full", "type": "hardware", "subcategory": "disk", "vendors": ["hdd", "ssd", "nvme"], "code": "SLC Cache Exhaustion", "category": { "cs": "Disk (SSD/HDD)", "en": "Disk (SSD/HDD)", "zh": "硬盘" }, "description": { "cs": "Rychlost zápisu obrovsky klesne během kopírování velkých souborů.", "en": "Write speeds plummet during large file transfers.", "zh": "Write speeds plummet during large file transfers. (ZH)" }, "solution": { "cs": "Počkejte, než se cache na disku vyprázdní, nebo kupte disk s dedikovanou pamětí DRAM.", "en": "Wait for the drive to flush cache, or buy a drive with DRAM.", "zh": "Wait for the drive to flush cache, or buy a drive with DRAM. (ZH)" }, "details": { "cs": "Levné disky TLC/QLC používají část své kapacity jako extrémně rychlou SLC vyrovnávací paměť. Jakmile se tato paměť zaplní, je přímý zápis do NAND paměti pomalejší než starý HDD disk.", "en": "TLC/QLC drives use a portion of storage as fast SLC cache. Once full, direct-to-NAND writing is extremely slow (often slower than HDDs).", "zh": "TLC/QLC drives use a portion of storage as fast SLC cache. Once full, direct-to-NAND writing is extremely slow (often slower than HDDs). (ZH)" } },
    { "id": "disk-smart-05", "type": "hardware", "subcategory": "disk", "vendors": ["hdd", "ssd", "nvme"], "code": "Reallocated Sectors Count (05)", "category": { "cs": "Disk (SSD/HDD)", "en": "Disk (SSD/HDD)", "zh": "硬盘" }, "description": { "cs": "S.M.A.R.T. varování: Zdraví disku klesá, blíží se konec jeho životnosti.", "en": "SMART warning: Drive health is failing.", "zh": "SMART warning: Drive health is failing. (ZH)" }, "solution": { "cs": "Okamžitě zálohujte data na jiné médium a disk vyřaďte.", "en": "Backup data immediately and replace the drive.", "zh": "Backup data immediately and replace the drive. (ZH)" }, "details": { "cs": "Disk objevil fyzicky poškozené sektory a nahradil je volnými záložními. Jakmile záložní sektory dojdou, hrozí nevratná ztráta dat. Neustále rostoucí počet znamená blízkou smrt disku.", "en": "The drive found bad sectors and replaced them with spares. Once spares run out, data loss occurs. A rising number indicates imminent failure.", "zh": "The drive found bad sectors and replaced them with spares. Once spares run out, data loss occurs. A rising number indicates imminent failure. (ZH)" } },
    { "id": "disk-bitrot", "type": "hardware", "subcategory": "disk", "vendors": ["hdd", "ssd", "nvme"], "code": "Silent Data Corruption / Bit Rot", "category": { "cs": "Disk (SSD/HDD)", "en": "Disk (SSD/HDD)", "zh": "硬盘" }, "description": { "cs": "Starší fotografie nejdou otevřít nebo se videa zasekávají a obsahují čtverečky (artefakty).", "en": "Old photos refuse to open or videos have artifacts.", "zh": "Old photos refuse to open or videos have artifacts. (ZH)" }, "solution": { "cs": "Obnovte je ze zálohy. Pro dlouhodobé ukládání je vhodné použít souborový systém s kontrolou (ZFS/BTRFS).", "en": "Restore from backup, use ZFS/BTRFS for future storage.", "zh": "Restore from backup, use ZFS/BTRFS for future storage. (ZH)" }, "details": { "cs": "Magnetický náboj nebo napětí v buňkách NAND paměti s přibývajícími lety sláblo a postupně potichu a nepozorovaně poškodilo část zapsaných dat.", "en": "Magnetic charge or NAND cell voltage drifted over years without being rewritten, corrupting the data silently.", "zh": "Magnetic charge or NAND cell voltage drifted over years without being rewritten, corrupting the data silently. (ZH)" } },
    { "id": "disk-head-crash", "type": "hardware", "subcategory": "disk", "vendors": ["hdd", "ssd", "nvme"], "code": "Click of Death (HDD)", "category": { "cs": "Disk (SSD/HDD)", "en": "Disk (SSD/HDD)", "zh": "硬盘" }, "description": { "cs": "Starší mechanický HDD disk vydává pravidelné hlasité cvakání nebo pískání.", "en": "HDD makes rhythmic clicking or beeping noises.", "zh": "HDD makes rhythmic clicking or beeping noises. (ZH)" }, "solution": { "cs": "Disk už nezapínejte! Odešlete jej profesionálům na obnovu dat z laboratoře.", "en": "Do not power on. Send to professional data recovery.", "zh": "Do not power on. Send to professional data recovery. (ZH)" }, "details": { "cs": "Čtecí/zápisová hlavička mechanicky narazila do rotujících ploten disku nebo uvízla ramínka, která fyzicky odškrabují záznam s vašimi daty.", "en": "The read/write head crashed into the platter or the actuator arm is stuck, physically scraping the data away.", "zh": "The read/write head crashed into the platter or the actuator arm is stuck, physically scraping the data away. (ZH)" } },
    { "id": "disk-controller-fail", "type": "hardware", "subcategory": "disk", "vendors": ["hdd", "ssd", "nvme"], "code": "Drive Disconnects Under Load", "category": { "cs": "Disk (SSD/HDD)", "en": "Disk (SSD/HDD)", "zh": "硬盘" }, "description": { "cs": "SSD se během zátěže náhodně odpojuje a mizí z BIOSu i Windows.", "en": "SSD disappears from BIOS or Windows randomly.", "zh": "SSD disappears from BIOS or Windows randomly. (ZH)" }, "solution": { "cs": "Aktualizujte firmware disku a ve Windows změňte plán napájení (vypnout ASPM pro PCIe).", "en": "Update SSD firmware, disable PCIe ASPM in Windows Power Plan.", "zh": "Update SSD firmware, disable PCIe ASPM in Windows Power Plan. (ZH)" }, "details": { "cs": "Hlavní řadič SSD disku při určité specifické zátěži nebo střídání napájecích stavů (Active State Power Management) havaruje a odpojí se úplně ze sběrnice PCIe.", "en": "The SSD controller crashes under specific load or power states (Active State Power Management) and drops off the PCIe bus.", "zh": "The SSD controller crashes under specific load or power states (Active State Power Management) and drops off the PCIe bus. (ZH)" } },
    { "id": "disk-mft-corrupt", "type": "hardware", "subcategory": "disk", "vendors": ["hdd", "ssd", "nvme"], "code": "Corrupt Master File Table", "category": { "cs": "Disk (SSD/HDD)", "en": "Disk (SSD/HDD)", "zh": "硬盘" }, "description": { "cs": "Úložiště se najednou tváří jako neformátované (typ RAW).", "en": "Drive shows as RAW or unformatted suddenly.", "zh": "Drive shows as RAW or unformatted suddenly. (ZH)" }, "solution": { "cs": "Do příkazového řádku napište 'chkdsk /f', popř. obnovte poškozenou tabulku pomocí nástroje TestDisk.", "en": "Run chkdsk /f or use TestDisk to rebuild the MFT.", "zh": "Run chkdsk /f or use TestDisk to rebuild the MFT. (ZH)" }, "details": { "cs": "Tabulka Master File Table ($MFT) sleduje naprosto všechny soubory na disku. Ztráta proudu ve chvíli jejího zápisu korumpuje tento index, což dělá soubory zdánlivě nedosažitelné.", "en": "The $MFT tracks all files. Power loss during MFT writes corrupts the index, making files inaccessible despite physical health being fine.", "zh": "The $MFT tracks all files. Power loss during MFT writes corrupts the index, making files inaccessible despite physical health being fine. (ZH)" } },
    { "id": "disk-readonly", "type": "hardware", "subcategory": "disk", "vendors": ["hdd", "ssd", "nvme"], "code": "SSD Locked in Read-Only Mode", "category": { "cs": "Disk (SSD/HDD)", "en": "Disk (SSD/HDD)", "zh": "硬盘" }, "description": { "cs": "Na disk už nelze formátovat ani zapisovat data, jde z něj pouze číst.", "en": "Cannot format or write files, but can read them.", "zh": "Cannot format or write files, but can read them. (ZH)" }, "solution": { "cs": "Vše si rychle zkopírujte mimo. Disk se blíží ke svému fyzickému selhání a zablokoval se.", "en": "Copy data off. The drive is dead and cannot be fixed.", "zh": "Copy data off. The drive is dead and cannot be fixed. (ZH)" }, "details": { "cs": "Při detekci katastrofického selhání bloků NAND paměti většina slušných SSD řadičů permanentně zablokuje veškeré zápisy na disk pro zachování existujících dat (Read-Only mod).", "en": "When SSDs detect catastrophic NAND failure or run out of spare blocks, the controller permanently locks into read-only to preserve existing data.", "zh": "When SSDs detect catastrophic NAND failure or run out of spare blocks, the controller permanently locks into read-only to preserve existing data. (ZH)" } },
    { "id": "disk-raid-desync", "type": "hardware", "subcategory": "disk", "vendors": ["hdd", "ssd", "nvme"], "code": "RAID Array Degraded", "category": { "cs": "Disk (SSD/HDD)", "en": "Disk (SSD/HDD)", "zh": "硬盘" }, "description": { "cs": "Intel RST (nebo mdadm Linux utility) ohlašuje chybějící disk pole a poškozené pole.", "en": "Intel RST or mdadm reports a missing array member.", "zh": "Intel RST or mdadm reports a missing array member. (ZH)" }, "solution": { "cs": "Zjistěte porouchaný disk, proveďte výměnu za fungující a v aplikaci dejte přestavět (Rebuild) pole.", "en": "Identify the failed drive, replace it, and rebuild the array.", "zh": "Identify the failed drive, replace it, and rebuild the array. (ZH)" }, "details": { "cs": "Jeden z členů v diskovém RAID poli neodpověděl nebo byl odpojen. Aby byl zachován bezpečný chod pole (zrcadlení u RAID 1 nebo paritní data u RAID 5), musí se pole obnovit.", "en": "One drive in the RAID 1/5/10 array dropped offline due to a timeout or failure. The array must be rebuilt to restore redundancy.", "zh": "One drive in the RAID 1/5/10 array dropped offline due to a timeout or failure. The array must be rebuilt to restore redundancy. (ZH)" } },
    { "id": "mb-vrm-throttle", "type": "hardware", "subcategory": "mb", "vendors": ["asus", "msi", "gigabyte", "asrock"], "code": "VRM Thermal Throttling", "category": { "cs": "Základní deska", "en": "Motherboard", "zh": "主板" }, "description": { "cs": "Procesor podává horší výkon pod plnou zátěží, ačkoli jeho samotná teplota je zcela v pořádku.", "en": "CPU clocks down under load, but CPU temps are fine.", "zh": "CPU clocks down under load, but CPU temps are fine. (ZH)" }, "solution": { "cs": "Nasmerujte ventilátor na chladič u patice CPU. Tímto místem prochází hlavní napájecí modul pro CPU.", "en": "Point a fan at the motherboard heatsinks around the CPU.", "zh": "Point a fan at the motherboard heatsinks around the CPU. (ZH)" }, "details": { "cs": "Modul VRM na základní desce se přehřál (obvykle 105–115°C) a donutil BIOS přidusit procesor pro snížení odebíraného elektrického proudu.", "en": "The Voltage Regulator Modules (VRMs) are exceeding 105C-115C, forcing the motherboard to throttle the CPU to reduce current draw.", "zh": "The Voltage Regulator Modules (VRMs) are exceeding 105C-115C, forcing the motherboard to throttle the CPU to reduce current draw. (ZH)" } },
    { "id": "mb-cmos-bat", "type": "hardware", "subcategory": "mb", "vendors": ["asus", "msi", "gigabyte", "asrock"], "code": "CMOS Checksum Error", "category": { "cs": "Základní deska", "en": "Motherboard", "zh": "主板" }, "description": { "cs": "PC ztrácí přehled o čase a nastavení BIOSu je vynulované, pokud vytáhnete napájecí kabel ze zdi.", "en": "PC loses time and BIOS settings when unplugged.", "zh": "PC loses time and BIOS settings when unplugged. (ZH)" }, "solution": { "cs": "Na základní desce vyměňte malou knoflíkovou baterii (CR2032).", "en": "Replace the CR2032 battery on the motherboard.", "zh": "Replace the CR2032 battery on the motherboard. (ZH)" }, "details": { "cs": "Malá knoflíková baterie (CMOS baterie) slouží k napájení čipu, který ukládá systémový čas a uložená nastavení BIOSu, když je PC bez napětí.", "en": "The CMOS battery keeps the RTC (Real Time Clock) and volatile BIOS settings alive. When it dies, settings revert to default upon power loss.", "zh": "The CMOS battery keeps the RTC (Real Time Clock) and volatile BIOS settings alive. When it dies, settings revert to default upon power loss. (ZH)" } },
    { "id": "mb-pcie-bifurcation", "type": "hardware", "subcategory": "mb", "vendors": ["asus", "msi", "gigabyte", "asrock"], "code": "PCIe Bifurcation Failure", "category": { "cs": "Základní deska", "en": "Motherboard", "zh": "主板" }, "description": { "cs": "Při vložení expanzní karty s několika NVMe M.2 disky počítač rozpozná pouze ten první v pořadí.", "en": "Only one M.2 drive shows up on an expansion card.", "zh": "Only one M.2 drive shows up on an expansion card. (ZH)" }, "solution": { "cs": "V nastavení BIOSu na daném PCIe slotu přepněte režim dělení linek na možnost typu x4/x4/x4/x4.", "en": "Set PCIe slot to x4/x4/x4/x4 in BIOS.", "zh": "Set PCIe slot to x4/x4/x4/x4 in BIOS. (ZH)" }, "details": { "cs": "Funkce označovaná jako bifurkace umí rozdělit jednu jedinou silnou PCIe linku na více malých, aby obsloužila všechny osazené disky. Bez ní BIOS aktivuje linku pouze na první zařízení.", "en": "Bifurcation splits a x16 slot into multiple x4 links. If the BIOS doesnt support it or its not configured, only the first drive is seen.", "zh": "Bifurcation splits a x16 slot into multiple x4 links. If the BIOS doesnt support it or its not configured, only the first drive is seen. (ZH)" } },
    { "id": "mb-rgb-conflict", "type": "hardware", "subcategory": "mb", "vendors": ["asus", "msi", "gigabyte", "asrock"], "code": "SMBus RGB Controller Conflict", "category": { "cs": "Základní deska", "en": "Motherboard", "zh": "主板" }, "description": { "cs": "Řídící programy osvětlení způsobují lagy počítače, nebo úplně padají při hledání připojených prvků.", "en": "RGB software freezes PC or doesn't detect devices.", "zh": "RGB software freezes PC or doesn't detect devices. (ZH)" }, "solution": { "cs": "Nenechávejte najednou zapnuté konfliktní aplikace pro RGB (např. Armoury Crate, iCUE, RGB Fusion).", "en": "Uninstall conflicting software (Armoury Crate, iCUE, RGB Fusion).", "zh": "Uninstall conflicting software (Armoury Crate, iCUE, RGB Fusion). (ZH)" }, "details": { "cs": "Několik spuštěných aplikací, jež současně oslovují řídicí I2C/SMBus sběrnici vede k takzvaným kolizím, uzamyká se tím komunikace nebo ve špatném případě zamrzne celé PC.", "en": "Multiple apps polling the I2C/SMBus simultaneously causes collisions, locking up the bus and sometimes freezing the entire system.", "zh": "Multiple apps polling the I2C/SMBus simultaneously causes collisions, locking up the bus and sometimes freezing the entire system. (ZH)" } },
    { "id": "mb-usb-dropout", "type": "hardware", "subcategory": "mb", "vendors": ["asus", "msi", "gigabyte", "asrock"], "code": "USB Disconnects on AMD B550/X570", "category": { "cs": "Základní deska", "en": "Motherboard", "zh": "主板" }, "description": { "cs": "Při využívání AMD Ryzen na deskách B550 a X570 začne myš blbnout a připojení zařízení USB začne padat.", "en": "Mouse and audio interface randomly disconnect.", "zh": "Mouse and audio interface randomly disconnect. (ZH)" }, "solution": { "cs": "Rozhodně nahrajte BIOS ve verzi AGESA 1.2.0.2 a vyšší nebo si manuálně omezte generaci rozhraní PCIe na 3.0.", "en": "Update BIOS to AGESA 1.2.0.2 or newer, force PCIe Gen3.", "zh": "Update BIOS to AGESA 1.2.0.2 or newer, force PCIe Gen3. (ZH)" }, "details": { "cs": "Jde o dobře zdokumentovanou chybu první řady AGESA ovladačů pro Ryzeny 5000 ohledně propustnosti dat na PCIe, ze které pramenily chvilkové výpadky portů USB.", "en": "A known errata in early Ryzen 5000 AGESA code caused PCIe bus contention, resulting in brief USB controller dropouts.", "zh": "A known errata in early Ryzen 5000 AGESA code caused PCIe bus contention, resulting in brief USB controller dropouts. (ZH)" } },
    { "id": "mb-audio-shield", "type": "hardware", "subcategory": "mb", "vendors": ["asus", "msi", "gigabyte", "asrock"], "code": "Front Panel Audio Whine", "category": { "cs": "Základní deska", "en": "Motherboard", "zh": "主板" }, "description": { "cs": "Ze zapojených sluchátek do předního panelu neustále slyšíte šum připomínající pohyb myší nebo rušení.", "en": "Static noise heard in headphones when moving the mouse.", "zh": "Static noise heard in headphones when moving the mouse. (ZH)" }, "solution": { "cs": "Přesuňte konektor s 3.5mm jackem přímo na zadní desku, anebo zapojte speciální externí zvukovou DAC kartu.", "en": "Use rear audio ports or a USB DAC.", "zh": "Use rear audio ports or a USB DAC. (ZH)" }, "details": { "cs": "Nedostatečně odstíněné cestičky analogového signálu na základních deskách působí únik rušivého šumu z elektrických obvodů silných grafických karet (EMI).", "en": "Poor trace isolation on the motherboard allows GPU power delivery interference (EMI) to leak into the analog audio traces.", "zh": "Poor trace isolation on the motherboard allows GPU power delivery interference (EMI) to leak into the analog audio traces. (ZH)" } },
    { "id": "mb-clear-cmos-short", "type": "hardware", "subcategory": "mb", "vendors": ["asus", "msi", "gigabyte", "asrock"], "code": "Clear CMOS Jumper Left On", "category": { "cs": "Základní deska", "en": "Motherboard", "zh": "主板" }, "description": { "cs": "Stisknutím tlačítka napájení na skříni vůbec nespustíte systém (zcela bez reakce).", "en": "System refuses to power on at all.", "zh": "System refuses to power on at all. (ZH)" }, "solution": { "cs": "Propojení u pinů zvaných Clear CMOS ponechte odpojené. Na přepínacím jumperu využijte standardně piny 1 a 2.", "en": "Move the clear CMOS jumper back to pins 1-2.", "zh": "Move the clear CMOS jumper back to pins 1-2. (ZH)" }, "details": { "cs": "Jestliže jumper (fyzický kolíček) propojí spoj určený výhradně k mazání aktuální paměti čipu CMOS a není odstraněn, brání tzv. Super I/O obvodu nastartovat.", "en": "If the clear CMOS jumper bridges the reset pins, the Super I/O chip is held in a constant reset state, preventing POST.", "zh": "If the clear CMOS jumper bridges the reset pins, the Super I/O chip is held in a constant reset state, preventing POST. (ZH)" } },
    { "id": "mb-standoff-short", "type": "hardware", "subcategory": "mb", "vendors": ["asus", "msi", "gigabyte", "asrock"], "code": "Motherboard Standoff Short", "category": { "cs": "Základní deska", "en": "Motherboard", "zh": "主板" }, "description": { "cs": "Hned vzápětí po spuštění počítač cvakne a rychle se natvrdo vypne jako ochrana (OCP stav).", "en": "System turns on for 1 second then shuts off (OCP).", "zh": "System turns on for 1 second then shuts off (OCP). (ZH)" }, "solution": { "cs": "Povolte všechny šrouby a ujistěte se, že není navíc nainstalovaný zbytečný měděný sloupkový distanční čep pod základní deskou.", "en": "Remove motherboard and check for extra brass standoffs.", "zh": "Remove motherboard and check for extra brass standoffs. (ZH)" }, "details": { "cs": "Nadbytečný sloupkový nosník se zkratuje s napájenou vodivou vrstvou na zadní straně základní desky a to nutí napájecí zdroj počítače do stavu rychlé tvrdé ochrany.", "en": "An extra standoff touching a solder point on the back of the motherboard triggers a direct short to ground, tripping PSU protection.", "zh": "An extra standoff touching a solder point on the back of the motherboard triggers a direct short to ground, tripping PSU protection. (ZH)" } },
    { "id": "mb-lan-intel", "type": "hardware", "subcategory": "mb", "vendors": ["asus", "msi", "gigabyte", "asrock"], "code": "Intel I225-V Ethernet Disconnects", "category": { "cs": "Základní deska", "en": "Motherboard", "zh": "主板" }, "description": { "cs": "Vaše síťové připojení přes kabel se čas od času svévolně přeruší přibližně na pět sekund.", "en": "Network drops out for 5 seconds randomly.", "zh": "Network drops out for 5 seconds randomly. (ZH)" }, "solution": { "cs": "Zakáže funkci ekologického napájení (Energy Efficient Ethernet), popřípadě omezte síť přímo na gigabit.", "en": "Update firmware, disable Energy Efficient Ethernet, or force 1Gbps.", "zh": "Update firmware, disable Energy Efficient Ethernet, or force 1Gbps. (ZH)" }, "details": { "cs": "U několika raných řad síťových karet od Intelu typů I225-V šlo o velký fyzický defekt designu celého kontroléru, jenž působí masivní propad přijatých datových odeslaných bloků.", "en": "Hardware flaw in Intel I225-V rev 1/2 controllers causes packet loss and link drops. Rev 3 fixed this.", "zh": "Hardware flaw in Intel I225-V rev 1/2 controllers causes packet loss and link drops. Rev 3 fixed this. (ZH)" } },
    { "id": "mb-post-code-99", "type": "hardware", "subcategory": "mb", "vendors": ["asus", "msi", "gigabyte", "asrock"], "code": "Q-Code 99 / Super IO Init", "category": { "cs": "Základní deska", "en": "Motherboard", "zh": "主板" }, "description": { "cs": "Počítač vyčká na hlášení s POST číslem 99 ukázaném přímo u sedmisegmentového ukazatele.", "en": "Motherboard stuck on code 99.", "zh": "Motherboard stuck on code 99. (ZH)" }, "solution": { "cs": "Zastavte napájení a odeberte co nejvíce nepotřebných USB, všech myší či zapojených starších úložných jednotek s označením SATA a znovu aktivujte stroj.", "en": "Unplug all USB devices, SATA drives, and try again.", "zh": "Unplug all USB devices, SATA drives, and try again. (ZH)" }, "details": { "cs": "Vypsaný chybový zápis 99 znamená v podání BIOSu kritické pozdržení postupu právě ve snaze připojit periferní obslužná vstupně-výstupní zařízení k desce (klávesnice / storage disky).", "en": "Code 99 generally means the board is trying to initialize IO devices (USB/SATA) and one is unresponsive, halting the boot process.", "zh": "Code 99 generally means the board is trying to initialize IO devices (USB/SATA) and one is unresponsive, halting the boot process. (ZH)" } },
    {
        id: "win-time-sync", type: "software", subcategory: "windows",
        code: "Windows Time Sync Error / CMOS Drift",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Systémový čas se rozchází nebo se nesynchronizuje s internetem – problém se službou W32Time nebo CMOS baterií.",
            en: "System time is incorrect or fails to sync with internet – W32Time service issue or CMOS battery.",
            zh: "系统时间不正确或无法与互联网同步——W32Time 服务问题或 CMOS 电池问题。"
        },
        solution: {
            cs: "Restartujte službu Windows Time (w32time). Vyměňte CMOS baterii (CR2032). Nastavte časový server na pool.ntp.org.",
            en: "Restart Windows Time service (w32time). Replace CMOS battery (CR2032). Set time server to pool.ntp.org.",
            zh: "重启 Windows Time 服务 (w32time)，更换 CMOS 电池 (CR2032)，将时间服务器设置为 pool.ntp.org。"
        },
        details: {
            cs: "Windows Time service (W32Time) udržuje synchronizaci času přes NTP (Network Time Protocol). Problémy: (1) Služba je zastavena nebo zakázána – 'net start w32time'. (2) Firewall blokuje UDP port 123. (3) CMOS baterie na základní desce je vybitá – PC ztrácí čas při odpojení od napájení. (4) Dual-boot s Linuxem: Linux ukládá čas v UTC, Windows v Local Time – v registrech nastavte 'RealTimeIsUniversal' = 1. Diagnostika: 'w32tm /query /status' zobrazí zdroj času; 'w32tm /resync' vynutí synchronizaci.",
            en: "The Windows Time service (W32Time) maintains synchronization via NTP. Issues: (1) Service stopped – 'net start w32time'. (2) Firewall blocking UDP port 123. (3) Dead CMOS battery (CR2032) – PC loses time when unplugged. (4) Dual-boot with Linux conflict (UTC vs Local Time) – set 'RealTimeIsUniversal' = 1 in registry. Diagnostics: 'w32tm /query /status' shows time source; 'w32tm /resync' forces sync.",
            zh: "Windows Time 服务 (W32Time) 通过 NTP 维持同步。问题：(1) 服务停止；(2) 防火墙阻止 UDP 123 端口；(3) CMOS 电池（CR2032）耗尽导致断电后丢失时间；(4) 与 Linux 双系统冲突（UTC vs 本地时间）。诊断：'w32tm /query /status' 显示时间源。"
        }
    },
    {
        id: "win-hello-fail", type: "software", subcategory: "windows",
        code: "Windows Hello / Biometrics Not Working",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Přihlášení obličejem nebo otiskem prstu nefunguje – biometrické zařízení není rozpoznáno.",
            en: "Face or fingerprint login fails – biometric device not recognized.",
            zh: "面部或指纹登录失败——未识别到生物识别设备。"
        },
        solution: {
            cs: "Přeinstalujte ovladač biometrického zařízení. Resetujte biometrickou databázi v C:\\Windows\\System32\\WinBioDatabase.",
            en: "Reinstall biometric device driver. Reset biometric database in C:\\Windows\\System32\\WinBioDatabase.",
            zh: "重新安装生物识别设备驱动程序，重置 C:\\Windows\\System32\\WinBioDatabase 中的生物识别数据库。"
        },
        details: {
            cs: "Windows Hello Framework (WinBio) spravuje biometrická data. Příčiny selhání: (1) Ovladač čtečky otisků nebo IR kamery je zastaralý. (2) Služba Windows Biometric Service je zastavena. (3) Poškozená databáze biometrických šablon – zastavte službu WinBio, smažte soubory v WinBioDatabase, restartujte. (4) TPM modul byl resetován – Windows Hello vyžaduje funkční TPM 2.0. Diagnostika: Event Viewer -> Applications and Services Logs -> Microsoft -> Windows -> Biometrics.",
            en: "The Windows Hello Framework (WinBio) manages biometric data. Failure causes: (1) Outdated fingerprint reader or IR camera driver. (2) Windows Biometric Service stopped. (3) Corrupted template database – stop WinBio service, delete files in WinBioDatabase folder, restart. (4) TPM reset – Windows Hello relies on TPM 2.0. Diagnostics: Event Viewer -> Biometrics log.",
            zh: "Windows Hello 框架 (WinBio) 管理生物识别数据。失败原因：(1) 指纹读取器或红外摄像头驱动过旧；(2) Windows Biometric 服务停止；(3) 模板数据库损坏——停止服务并删除 WinBioDatabase 中的文件；(4) TPM 已重置。诊断：事件查看器中的生物识别日志。"
        }
    },
    {
        id: "app-overlay-stutter", type: "software", subcategory: "apps",
        code: "Overlay Stutter / Performance Drop in Games",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Hry se trhají nebo mají nižší FPS při aktivních overlayích (Discord, Steam, GeForce Experience).",
            en: "Games stutter or have lower FPS when overlays (Discord, Steam, GeForce Experience) are active.",
            zh: "激活覆盖层（Discord、Steam、GeForce Experience）时，游戏出现卡顿或 FPS 降低。"
        },
        solution: {
            cs: "Zakažte nepotřebné overlaye. Vypněte HW akceleraci v Discordu. Použijte 'Game Mode' ve Windows.",
            en: "Disable unnecessary overlays. Turn off hardware acceleration in Discord. Enable Windows Game Mode.",
            zh: "禁用不必要的覆盖层，关闭 Discord 中的硬件加速，启用 Windows 游戏模式。"
        },
        details: {
            cs: "Overlaye se vykreslují jako další vrstva nad hrou pomocí injektování DLL (např. GameOverlayRenderer64.dll). Problémy: (1) Konflikt mezi více overlayi – nekombinujte Discord, Steam a MSI Afterburner najednou. (2) HW akcelerace overlaye (Discord) soupeří o GPU zdroje s hrou. (3) Zastaralé verze overlayů nekompatibilní s novými DirectX/Vulkan verzemi. (4) Windows Fullscreen Optimization – zkuste vypnout ve vlastnostech .exe hry. Diagnostika: sledujte frame times v MSI Afterburner (frametime graph) – overlaye způsobují nepravidelné spiky.",
            en: "Overlays render as an extra layer via DLL injection (e.g., GameOverlayRenderer64.dll). Issues: (1) Conflict between multiple active overlays. (2) Hardware acceleration in apps like Discord competing for GPU resources. (3) Outdated overlays incompatible with newer DX/Vulkan. (4) Windows Fullscreen Optimizations – try disabling in game .exe properties. Diagnostics: monitor frametime graphs in MSI Afterburner for irregular spikes.",
            zh: "覆盖层通过 DLL 注入作为额外层渲染。问题：(1) 多个活动覆盖层之间的冲突；(2) Discord 等应用中的硬件加速竞争 GPU 资源；(3) 旧版覆盖层与新版 DX/Vulkan 不兼容；(4) Windows 全屏优化。诊断：使用 MSI Afterburner 监控帧时间图中的异常尖峰。"
        }
    },
    {
        id: "lap-touchpad-err", type: "hardware", subcategory: "mb",
        code: "Laptop Touchpad Not Responding / I2C HID Error",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "Touchpad notebooku náhodně přestává fungovat nebo se kurzor pohybuje trhaně – chyba I2C sběrnice.",
            en: "Laptop touchpad randomly stops working or cursor jumps – I2C bus error.",
            zh: "笔记本电脑触摸板随机停止工作或光标跳动——I2C 总线错误。"
        },
        solution: {
            cs: "Aktualizujte Serial I/O ovladač. Vypněte 'Allow computer to turn off this device' v Device Manager. Zkontrolujte flex kabel.",
            en: "Update Serial I/O driver. Disable 'Allow computer to turn off this device' in Device Manager. Check internal flex cable.",
            zh: "更新 Serial I/O 驱动程序，在设备管理器中禁用'允许计算机关闭此设备'，检查内部排线。"
        },
        details: {
            cs: "Moderní touchpady (Precision Touchpads) komunikují přes I2C (Inter-Integrated Circuit) sběrnici místo staršího PS/2. Problémy: (1) Ovladač Intel Serial I/O nebo AMD I2C Controller je zastaralý nebo chybí. (2) Power management: Windows vypíná I2C controller pro úsporu energie, což způsobí lag při 'probuzení' touchpadu. (3) Statická elektřina – nahromaděný náboj na šasi může blokovat kapacitní snímání. (4) Fyzické opotřebení nebo uvolnění flex kabelu uvnitř šasi notebooku. Diagnostika: Device Manager -> Human Interface Devices -> I2C HID Device (zkontrolujte status kód).",
            en: "Modern Precision Touchpads use the I2C bus instead of legacy PS/2. Issues: (1) Missing or outdated Intel Serial I/O or AMD I2C driver. (2) Power management – Windows suspends the I2C controller, causing wake-up lag. (3) Static electricity buildup on the chassis interfering with capacitive sensing. (4) Physical wear or loose internal flex cable. Diagnostics: Check 'I2C HID Device' status in Device Manager.",
            zh: "现代精确触摸板使用 I2C 总线。问题：(1) 缺少或过旧的 Intel Serial I/O 或 AMD I2C 驱动；(2) 电源管理导致 I2C 控制器挂起；(3) 机壳静电干扰电容感应；(4) 内部排线磨损或松动。诊断：检查设备管理器中的 'I2C HID Device' 状态。"
        }
    },
    {
        id: "mon-dead-pixels", type: "hardware", subcategory: "gpu",
        code: "Dead or Stuck Pixels / Panel Defects",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "Na monitoru jsou trvale svítící (stuck) nebo černé (dead) body – vada LCD/OLED panelu.",
            en: "Permanent bright (stuck) or black (dead) spots on screen – LCD/OLED panel defect.",
            zh: "屏幕上出现永久亮点（卡住）或黑点（死亡）——LCD/OLED 面板缺陷。"
        },
        solution: {
            cs: "Zkuste nástroj JScreenFix. Jemně masírujte místo hadříkem. Reklamujte při překročení limitu (ISO 9241-307).",
            en: "Try JScreenFix tool. Gently massage the area with a soft cloth. RMA if pixel policy limit is exceeded.",
            zh: "尝试使用 JScreenFix 工具，用软布轻轻按摩该区域，如果超过像素策略限制则申请售后。"
        },
        details: {
            cs: "Mrtvý pixel (Dead) je trvale vypnutý subpixel (černý). Zaseknutý pixel (Stuck) je trvale zapnutý (červený, zelený, modrý). Příčiny: (1) Výrobní vada tranzistoru v TFT matici. (2) Mechanické poškození (tlak na panel). (3) U OLED: burn-in (vypálení obrazu) po dlouhodobém zobrazení statického obsahu. ISO 9241-307 definuje třídy monitorů a povolený počet vad (Třída 1 = 0 vad, Třída 2 = běžný standard, povoluje několik vad). Stuck pixely lze někdy 'rozmrazit' rychlou změnou barev (JScreenFix) nebo mírným tlakem, mrtvé pixely jsou fyzicky poškozené a neopravitelné.",
            en: "A dead pixel is a permanently off subpixel (black). A stuck pixel is permanently on (red, green, or blue). Causes: (1) Manufacturing defect in the TFT transistor. (2) Physical damage from pressure. (3) OLED burn-in from static content. ISO 9241-307 defines monitor classes and allowed defect counts (Class 1 = 0 defects, Class 2 = common standard, allows some). Stuck pixels can sometimes be 'revived' by rapid color cycling (JScreenFix) or gentle pressure; dead pixels are physically broken.",
            zh: "坏点是永久关闭的子像素（黑色），亮点是永久开启的（红、绿或蓝）。原因：(1) TFT 晶体管制造缺陷；(2) 压力导致的物理损坏；(3) 静态内容导致的 OLED 烧屏。ISO 9241-307 定义了显示器等级和允许的缺陷数量。亮点有时可以通过快速颜色循环恢复，而死点通常无法修复。"
        }
    },
    {
        id: "gpu-vram-leak", type: "hardware", subcategory: "gpu",
        code: "VRAM Leak / Performance Degradation Over Time",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "FPS ve hře postupně klesá až k zamrznutí – hra neuvolňuje video paměť (VRAM).",
            en: "Game FPS gradually drops until freeze – game fails to release video memory (VRAM).",
            zh: "游戏 FPS 逐渐下降直到冻结——游戏未能释放显存 (VRAM)。"
        },
        solution: {
            cs: "Restartujte hru. Snižte Texture Resolution. Aktualizujte GPU ovladač.",
            en: "Restart the game. Lower Texture Resolution. Update GPU driver.",
            zh: "重启游戏，降低纹理分辨率，更新 GPU 驱动程序。"
        },
        details: {
            cs: "VRAM leak nastává, když herní engine alokuje textury a buffery v paměti GPU, ale neodstraní je po změně scény. Výsledek: VRAM se zaplní, GPU začne swapovat textury do systémové RAM (přes PCIe sběrnici), což způsobí masivní propady FPS (stutter). Diagnostika: Sledujte 'Dedicated Video Memory' v MSI Afterburner nebo GPU-Z. Pokud využití lineárně roste bez ohledu na scénu, jde o leak. Časté u neoptimalizovaných portů z konzolí. Dočasné řešení: snížení nastavení textur sníží rychlost zaplňování paměti.",
            en: "A VRAM leak occurs when a game engine allocates textures and buffers in GPU memory but fails to free them after scene changes. Result: VRAM fills up, forcing the GPU to swap textures to system RAM via PCIe, causing massive stutter. Diagnostics: Monitor 'Dedicated Video Memory' in MSI Afterburner; if usage grows linearly regardless of scene, it's a leak. Common in unoptimized console ports. Temporary fix: lowering texture settings delays saturation.",
            zh: "当游戏引擎在 GPU 内存中分配纹理和缓冲区但在场景切换后未能释放它们时，就会发生显存泄漏。结果：显存填满，迫使 GPU 通过 PCIe 将纹理交换到系统 RAM，导致严重卡顿。诊断：在 MSI Afterburner 中监控'专用显存'；如果使用量随场景线性增长，则是泄漏。临时修复：降低纹理设置可减缓饱和速度。"
        }
    },
    {
        id: "ram-training-fail", type: "hardware", subcategory: "ram",
        code: "Memory Training Failed / Long POST Times",
        category: { cs: "Paměť RAM", en: "Memory (RAM)", zh: "内存" },
        description: {
            cs: "Počítač dlouho startuje (černá obrazovka) nebo se opakovaně restartuje před načtením BIOSu – selhalo ladění paměti.",
            en: "PC takes a long time to boot (black screen) or power cycles before BIOS – memory training failure.",
            zh: "电脑启动时间过长（黑屏）或在进入 BIOS 前反复重启——内存训练失败。"
        },
        solution: {
            cs: "Povolte 'Memory Context Restore' v BIOSu. Zkontrolujte kompatibilitu modulů v QVL listu. Zkuste nižší frekvenci.",
            en: "Enable 'Memory Context Restore' in BIOS. Check module compatibility in motherboard QVL. Try a lower frequency.",
            zh: "在 BIOS 中启用'Memory Context Restore'，检查主板 QVL 中的模块兼容性，尝试降低频率。"
        },
        details: {
            cs: "Memory Training je proces, při kterém BIOS testuje stabilitu signálu mezi CPU a RAM při vysokých frekvencích (DDR5). Nastavuje parametry jako tREFI, napětí a impedance. Problémy: (1) První start s novou RAM trvá i několik minut (běžné u AM5). (2) Nestabilní XMP/EXPO profil – training selže a BIOS se vrátí k základní frekvenci. (3) 'Memory Context Restore' u AMD může zkrátit boot, ale u některých desek způsobuje BSOD – vyžaduje stabilitu. Diagnostika: Sledujte Debug LED na základní desce (DRAM LED svítí dlouho).",
            en: "Memory Training is the process where BIOS tests signal integrity between CPU and RAM at high frequencies (DDR5). It tunes parameters like tREFI, voltages, and impedances. Issues: (1) First boot with new RAM takes several minutes (common on AM5). (2) Unstable XMP/EXPO profiles – training fails and BIOS reverts to base clocks. (3) 'Memory Context Restore' on AMD shortens boot time but may cause BSODs if timing is borderline. Diagnostics: Watch motherboard Debug LEDs (DRAM LED staying on).",
            zh: "内存训练是 BIOS 在高频率下测试 CPU 和内存之间信号完整性的过程。它调整 tREFI、电压和阻抗等参数越。问题：(1) 新内存首次启动耗时几分钟（AM5 常见）；(2) XMP/EXPO 配置文件不稳定——训练失败且 BIOS 恢复基础频率；(3) AMD 上的'Memory Context Restore'可缩短启动时间，但在时序边缘可能导致蓝屏。诊断：查看主板 Debug LED。"
        }
    },
    {
        id: "cpu-cold-boot", type: "hardware", subcategory: "cpu",
        code: "Cold Boot Bug / POST Failure When Cold",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "PC se nespustí napoprvé po delší odstávce, ale po restartu funguje bez problémů – napěťová nestabilita za studena.",
            en: "PC fails first boot after being off, but works fine after restart – voltage instability at cold temperatures.",
            zh: "电脑在长时间关机后首次启动失败，但在重启后工作正常——低温下电压不稳定。"
        },
        solution: {
            cs: "Zvyšte mírně napětí SOC nebo Vcore. Vypněte 'Fast Boot' v BIOSu. Zkontrolujte kondenzátory zdroje.",
            en: "Slightly increase SOC or Vcore voltage. Disable 'Fast Boot' in BIOS. Inspect PSU capacitors.",
            zh: "轻微提高 SOC 或 Vcore 电压，在 BIOS 中禁用'快速启动'，检查电源电容。"
        },
        details: {
            cs: "Cold Boot Bug je stav, kdy elektronika (VRM, CPU) vyžaduje mírně odlišné napěťové charakteristiky při nízké teplotě. Příčiny: (1) Degradované kondenzátory (v PSU nebo na desce) ztrácejí kapacitu za studena. (2) Agresivní undervolt, který je stabilní při 60°C, ale ne při 20°C. (3) BIOS bug v inicializaci hardware. Diagnostika: Pokud PC vyžaduje 2-3 pokusy o start ráno, ale pak běží celý den stabilně, jde o Cold Boot problém. Řešení: nastavení 'Initial Boot Voltage' (pokud deska dovoluje) nebo mírné navýšení základních napětí.",
            en: "A Cold Boot Bug occurs when components (VRM, CPU) require slightly different voltage characteristics at low temperatures. Causes: (1) Degraded capacitors (PSU or MB) losing capacity when cold. (2) Aggressive undervolting stable at 60°C but not at 20°C. (3) BIOS hardware initialization bug. Diagnostics: If PC needs 2-3 tries to start in the morning but runs stable afterward, it's a Cold Boot issue. Fix: Increase boot voltages or base SOC/Vcore slightly.",
            zh: "冷启动 Bug 是指组件在低温下需要略有不同的电压特性。原因：(1) 电源或主板上的电容退化在低温时容量降低；(2) 激进的降压在 60°C 稳定但在 20°C 不稳定；(3) BIOS 硬件初始化错误。诊断：如果电脑早上需要 2-3 次启动尝试但之后运行稳定，则是冷启动问题。修复：稍微提高启动电压或基础 SOC/Vcore。"
        }
    },
    {
        id: "net-mismatch-mtu", type: "software", subcategory: "network",
        code: "MTU Mismatch / Packet Fragmentation Issues",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: {
            cs: "Některé webové stránky se nenačítají nebo VPN spojení padá – nesprávná velikost MTU paketu.",
            en: "Some websites won't load or VPN connection drops – incorrect MTU packet size.",
            zh: "某些网站无法加载或 VPN 连接断开——MTU 数据包大小不正确。"
        },
        solution: {
            cs: "Zjistěte optimální MTU pomocí 'ping -f -l'. Nastavte MTU na 1492 (pro PPPoE) nebo 1500 (standard).",
            en: "Find optimal MTU using 'ping -f -l'. Set MTU to 1492 (for PPPoE) or 1500 (standard Ethernet).",
            zh: "使用 'ping -f -l' 查找最佳 MTU，将 MTU 设置为 1492（PPPoE）或 1500（标准以太网）。"
        },
        details: {
            cs: "MTU (Maximum Transmission Unit) určuje maximální velikost paketu (standardně 1500 bajtů). Pokud je paket větší než limit na cestě (např. u PPPoE DSL linky), musí dojít k fragmentaci. Pokud je fragmentace zakázána (DF flag), paket je zahozen. Příznaky: Google funguje, ale specifické weby (např. bankovnictví) ne. VPN tunely přidávají vlastní hlavičky, čímž snižují efektivní MTU (často na 1400). Diagnostika: 'ping google.com -f -l 1472'. Pokud 'Packet needs to be fragmented', snižte číslo dokud ping neprojde.",
            en: "MTU (Maximum Transmission Unit) defines the largest packet size (default 1500 bytes). If a packet exceeds a path limit (e.g., PPPoE DSL), it must be fragmented. If fragmentation is disabled (DF flag), the packet is dropped. Symptoms: Google works, but specific sites (e.g., banking) fail. VPNs add headers, reducing effective MTU (often to 1400). Diagnostics: 'ping google.com -f -l 1472'; if fragmentation is needed, lower the value until it passes.",
            zh: "MTU 定义最大数据包大小（默认 1500 字节）。如果数据包超过路径限制（如 PPPoE），则必须分段。如果禁用分段，数据包将被丢弃。症状：Google 可用，但特定网站（如银行）失败。VPN 会添加标头，降低有效 MTU（通常为 1400）。诊断：'ping google.com -f -l 1472'；如果需要分段，则降低该值直到通过。"
        }
    },
    {
        id: "drv-ghost-devices", type: "software", subcategory: "drivers",
        code: "Ghost Devices / Driver Cache Bloat",
        category: { cs: "Ovladače", en: "Drivers", zh: "驱动程序" },
        description: {
            cs: "Staré a nepoužívané ovladače zůstávají v systému a mohou způsobovat konflikty s novým hardwarem.",
            en: "Old and unused drivers remain in the system and may cause conflicts with new hardware.",
            zh: "旧的和未使用的驱动程序保留在系统中，可能与新硬件产生冲突。"
        },
        solution: {
            cs: "Zapněte 'Show hidden devices' v Device Manageru. Odinstalujte zašedlé položky. Použijte 'Ghostbuster' nebo 'DriverStore Explorer'.",
            en: "Enable 'Show hidden devices' in Device Manager. Uninstall grayed-out items. Use 'Ghostbuster' or 'DriverStore Explorer' (RAPR).",
            zh: "在设备管理器中启用'显示隐藏的设备'，卸载灰色项目，使用 'Ghostbuster' 或 'DriverStore Explorer'。"
        },
        details: {
            cs: "Windows uchovává ovladače pro každé zařízení, které kdy bylo připojeno (např. každý USB flashdisk). Tyto 'duchy' (ghost devices) jsou vidět v Device Manageru pouze po nastavení 'set devmgr_show_nonpresent_devices=1'. Problémy: (1) Konflikt COM portů u sériových zařízení. (2) Starý síťový ovladač blokující IP adresu. (3) Zaplnění Driver Store (C:\\Windows\\System32\\DriverStore) starými verzemi (stovky GB). Diagnostika: DriverStore Explorer (RAPR) umožní bezpečně smazat staré verze ovladačů a uvolnit místo na disku.",
            en: "Windows keeps drivers for every device ever connected. These 'ghost devices' are only visible in Device Manager after enabling hidden devices. Issues: (1) COM port conflicts for serial devices. (2) Old network drivers holding IP reservations. (3) Driver Store bloat (C:\\Windows\\System32\\DriverStore) with multiple old versions. Diagnostics: Use DriverStore Explorer (RAPR) to safely delete old driver versions and reclaim disk space.",
            zh: "Windows 保留每个连接过的设备的驱动程序。这些'幽灵设备'仅在启用隐藏设备后可见。问题：(1) 串口设备的 COM 端口冲突；(2) 旧网络驱动占用 IP 保留；(3) Driver Store 臃肿。诊断：使用 DriverStore Explorer 安全删除旧驱动版本并腾出空间。"
        }
    },
    {
        id: "win-update-80070643", type: "software", subcategory: "windows",
        code: "Windows Update Error 0x80070643 / Recovery Partition",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Instalace aktualizace (typicky KB5034441) selhává s chybou 0x80070643 – nedostatek místa v oddílu pro obnovení (WinRE).",
            en: "Update installation (typically KB5034441) fails with error 0x80070643 – insufficient space in Recovery Partition (WinRE).",
            zh: "更新安装（通常为 KB5034441）失败，错误代码为 0x80070643——恢复分区 (WinRE) 空间不足。"
        },
        solution: {
            cs: "Zvětšete oddíl WinRE o 250 MB pomocí nástroje 'reagentc' a 'diskpart'.",
            en: "Increase WinRE partition size by 250 MB using 'reagentc' and 'diskpart' commands.",
            zh: "使用 'reagentc' 和 'diskpart' 命令将 WinRE 分区大小增加 250 MB。"
        },
        details: {
            cs: "K chybě 0x80070643 u bezpečnostních aktualizací WinRE dochází, protože výchozí velikost oddílu pro obnovení (cca 500 MB) nestačí pro nové bitové kopie Safe OS. Diagnostika: 'reagentc /info' zobrazí status WinRE. Řešení vyžaduje: (1) 'reagentc /disable'. (2) Zmenšení hlavního C: oddílu o 250 MB. (3) Smazání starého WinRE oddílu a vytvoření nového většího. (4) 'reagentc /enable'. Jde o kritickou opravu pro zabezpečení BitLockeru proti útoku typu 'Evil Maid'.",
            en: "Error 0x80070643 occurs when the Recovery Partition (WinRE) is too small for new Safe OS images. Diagnostics: 'reagentc /info' shows WinRE status. Fix requires: (1) 'reagentc /disable'. (2) Shrinking C: partition by 250MB. (3) Deleting old WinRE partition and creating a larger one. (4) 'reagentc /enable'. This is critical for patching BitLocker vulnerabilities.",
            zh: "当恢复分区 (WinRE) 对于新的安全操作系统映像而言过小时，会出现错误 0x80070643。诊断：'reagentc /info' 显示 WinRE 状态。修复需要：(1) 禁用 WinRE；(2) 缩小 C 盘 250MB；(3) 删除旧恢复分区并创建更大的分区；(4) 重新启用 WinRE。"
        }
    },
    {
        id: "net-ssh-timeout", type: "software", subcategory: "apps",
        code: "SSH Connection Timeout / Key Exchange Error",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Nelze se připojit k serveru přes SSH – spojení vyprší nebo dojde k chybě při výměně klíčů.",
            en: "Unable to connect to server via SSH – connection timeout or key exchange failure.",
            zh: "无法通过 SSH 连接到服务器——连接超时或密钥交换失败。"
        },
        solution: {
            cs: "Zkontrolujte port 22 ve firewallu. Použijte 'ssh -v' pro debugování. Povolte novější algoritmy v ssh_config.",
            en: "Check port 22 in firewall. Use 'ssh -v' for verbose debugging. Enable modern algorithms in ssh_config.",
            zh: "检查防火墙中的 22 端口，使用 'ssh -v' 进行详细调试，在 ssh_config 中启用现代算法。"
        },
        details: {
            cs: "Problémy s SSH (Secure Shell) bývají způsobeny: (1) Síťovou vrstvou (firewall, NAT). (2) Nekompatibilitou šifer – starší klienti nemusí podporovat ed25519 nebo rsa-sha2-512. (3) MTU problémy (viz net-mismatch-mtu) – SSH session zamrzne po zadání hesla při přenosu velkých dat (hlaviček). (4) Nesprávná oprávnění k souboru .ssh/authorized_keys na serveru (musí být 600). Diagnostika: 'ssh -vvv user@host' odhalí přesný moment selhání (Authentication, Kex, or Network).",
            en: "SSH issues are caused by: (1) Network layer (firewall, NAT). (2) Cipher mismatch – older clients failing to support ed25519. (3) MTU issues – session hangs after login during large data transfer. (4) Incorrect permissions on .ssh/authorized_keys (must be 600). Diagnostics: 'ssh -vvv' reveals if the hang is during Key Exchange or Authentication.",
            zh: "SSH 问题原因：(1) 网络层（防火墙、NAT）；(2) 加密算法不匹配；(3) MTU 问题导致登录后挂起；(4) 服务器上 .ssh/authorized_keys 权限错误（必须为 600）。诊断：使用 'ssh -vvv' 查看失败的具体阶段。"
        }
    },
    {
        id: "gpu-pcie-gen-mismatch", type: "hardware", subcategory: "gpu",
        code: "PCIe Bus Link Speed Mismatch / Gen 3 vs Gen 4",
        category: { cs: "Grafická karta", en: "Graphics Card", zh: "显卡" },
        description: {
            cs: "Grafická karta běží na nižší rychlosti sběrnice (např. x8 1.1 místo x16 4.0), což omezuje výkon.",
            en: "GPU runs at lower bus speed (e.g., x8 1.1 instead of x16 4.0), limiting performance.",
            zh: "显卡在较低的总线速度下运行（例如 x8 1.1 而不是 x16 4.0），从而限制了性能。"
        },
        solution: {
            cs: "Zasuňte kartu do horního slotu. Vynuťte 'Gen 4' v BIOSu. Zkontrolujte kontakty a riser kabel.",
            en: "Seat GPU in the top (primary) slot. Force 'Gen 4' in BIOS settings. Check riser cable quality.",
            zh: "将显卡插入顶部（主）插槽，在 BIOS 设置中强制开启 'Gen 4'，检查转接线质量。"
        },
        details: {
            cs: "Moderní GPU vyžadují plnou propustnost PCIe. Příčiny degradace: (1) Karta je ve spodním slotu, který je zapojen pouze jako x4 přes čipset. (2) Použití levného PCIe riser kabelu, který nezvládá Gen 4 signál. (3) Power Saving: GPU v klidu sníží linku na Gen 1.1 (normální chování – otestujte v GPU-Z Render Testu). (4) Sdílení linek s M.2 NVMe disky – zapojení SSD do určitých slotů může deaktivovat linky pro GPU. Diagnostika: GPU-Z -> Bus Interface (klikněte na '?' pro zátěžový test).",
            en: "Modern GPUs need full PCIe bandwidth. Causes of degradation: (1) GPU in bottom slot (wired via chipset at x4). (2) Low-quality PCIe riser cable failing Gen 4 signal integrity. (3) Power Saving – link drops to 1.1 at idle (test with GPU-Z Render Test). (4) Lane bifurcation/sharing with M.2 SSDs. Diagnostics: Check GPU-Z Bus Interface status during load.",
            zh: "现代 GPU 需要全额 PCIe 带宽。降速原因：(1) 显卡位于底部插槽（通过芯片组连接）；(2) 劣质 PCIe 转接线；(3) 待机时的节能模式（正常，需负载测试）；(4) 与 M.2 SSD 共享通道。诊断：在负载下检查 GPU-Z 的总线接口状态。"
        }
    },
    {
        id: "mb-post-d7", type: "hardware", subcategory: "mb",
        code: "POST Code D7 / No Console Input Device",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "Základní deska se zastaví na kódu D7 – nebyla nalezena klávesnice ani myš během inicializace.",
            en: "Motherboard hangs on POST code D7 – no keyboard or mouse detected during initialization.",
            zh: "主板停在 POST 代码 D7——初始化期间未检测到键盘或鼠标。"
        },
        solution: {
            cs: "Připojte klávesnici do USB 2.0 portu. Zkuste jiný port. Resetujte CMOS.",
            en: "Connect keyboard to a USB 2.0 port. Try a different port. Reset CMOS.",
            zh: "将键盘连接到 USB 2.0 端口，尝试其他端口，重置 CMOS。"
        },
        details: {
            cs: "Kód D7 (nebo 99 u některých výrobců) značí chybu inicializace vstupních zařízení. Problémy: (1) USB 3.x porty vyžadují ovladače, které v BIOSu nemusí být aktivní (použijte černé USB 2.0 sloty). (2) Vadný USB hub nebo periferie zkratuje sběrnici. (3) 'Fast Boot' v BIOSu přeskakuje inicializaci USB – znemožní vstup do BIOSu. (4) Statický náboj v USB portech – odpojte zdroj a podržte tlačítko napájení 30s. Diagnostika: Sledujte 7-segmentový displej na desce (pokud je přítomen).",
            en: "Code D7 indicates an input device initialization failure. Issues: (1) USB 3.x ports might not be active in pre-OS environment (use black USB 2.0 slots). (2) Faulty USB hub or peripheral shorting the bus. (3) 'Fast Boot' skipping USB initialization, preventing BIOS entry. (4) Static buildup in USB ports. Diagnostics: Watch the 7-segment debug display on the motherboard.",
            zh: "代码 D7 表示输入设备初始化失败。问题：(1) USB 3.x 端口在进入系统前可能未激活（请使用黑色 USB 2.0 插槽）；(2) 故障的 USB 集线器或外设导致总线短路；(3) '快速启动'跳过了 USB 初始化。诊断：查看主板上的七段数码调试显示屏。"
        }
    },
    {
        id: "cpu-fclk-desync", type: "hardware", subcategory: "cpu",
        code: "FCLK/UCLK Desync / Latency Spikes",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "Procesor (AMD Ryzen) vykazuje nepravidelné záseky a vysokou latenci paměti – vnitřní sběrnice (Infinity Fabric) není synchronizovaná.",
            en: "Processor (AMD Ryzen) shows irregular micro-stutter and high memory latency – Infinity Fabric (FCLK) is desynced.",
            zh: "处理器（AMD Ryzen）出现不规则的微卡顿和高内存延迟——Infinity Fabric (FCLK) 不同步。"
        },
        solution: {
            cs: "Nastavte poměr FCLK:UCLK:MCLK na 1:1:1 v BIOSu. Aktualizujte AGESA (BIOS).",
            en: "Set FCLK:UCLK:MCLK ratio to 1:1:1 in BIOS. Update motherboard AGESA (BIOS).",
            zh: "在 BIOS 中将 FCLK:UCLK:MCLK 比例设置为 1:1:1，更新主板 AGESA (BIOS)。"
        },
        details: {
            cs: "U procesorů Ryzen je kritické, aby frekvence Infinity Fabric (FCLK), paměťového řadiče (UCLK) a RAM (MCLK) byly v poměru 1:1. Pokud FCLK nestíhá vysokou frekvenci RAM (např. nad 3600MHz u DDR4 nebo 6000MHz u DDR5), přepne se do režimu 2:1, což přidá ~10-20ns latence a způsobí stutter v hrách. Diagnostika: Použijte 'ZenTimings'. FCLK by mělo odpovídat reálné frekvenci RAM (např. 1800MHz pro 3600MT/s RAM). Pokud je v BIOSu nastaveno 'Auto', může dojít k desynchronizaci při použití XMP profilu.",
            en: "For Ryzen CPUs, keeping Infinity Fabric (FCLK), Memory Controller (UCLK), and RAM (MCLK) in 1:1 sync is critical. If RAM frequency exceeds FCLK limits, it drops to 2:1 mode, adding ~10-20ns latency and causing micro-stutter. Diagnostics: Use 'ZenTimings' to verify ratios. FCLK should match real RAM clock (e.g., 1800MHz for 3600MT/s RAM). 'Auto' settings in BIOS often fail to sync correctly with high-speed XMP.",
            zh: "对于 Ryzen CPU，保持 FCLK、UCLK 和 MCLK 1:1 同步至关重要。如果内存频率超过 FCLK 限制，它会切换到 2:1 模式，增加约 10-20ns 的延迟并导致微卡顿。诊断：使用 'ZenTimings' 验证比例。BIOS 中的 'Auto' 设置在开启高速 XMP 时经常无法正确同步。"
        }
    },

    // =========================================================
    // === NOVÉ ERRORY (2025) ===
    // =========================================================
    {
        id: "win-0x80070643", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "Windows Update Error 0x80070643",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Windows Update selhává s kódem 0x80070643 – instalace aktualizace nebo .NET frameworku se nezdaří.",
            en: "Windows Update fails with code 0x80070643 – update or .NET framework installation is unsuccessful.",
            zh: "Windows Update 以代码 0x80070643 失败——更新或 .NET Framework 安装未成功。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Spusťte Windows Update Troubleshooter:</strong> Nastavení → Aktualizace → Řešení problémů.</li>
<li><strong>Resetujte Update cache:</strong> Spusťte CMD jako admin: <code>net stop wuauserv</code>, smažte obsah <code>C:\\Windows\\SoftwareDistribution\\Download</code>, pak <code>net start wuauserv</code>.</li>
<li><strong>Opravte .NET Framework:</strong> Stáhněte <a href="https://www.microsoft.com/en-us/download/details.aspx?id=30135" target="_blank">Microsoft .NET Repair Tool</a> a spusťte jej.</li>
<li><strong>DISM oprava:</strong> <code>DISM /Online /Cleanup-Image /RestoreHealth</code> → <code>sfc /scannow</code>.</li>
<li><strong>Ruční instalace:</strong> Stáhněte aktualizaci přímo z <a href="https://catalog.update.microsoft.com" target="_blank">Microsoft Update Catalog</a> jako .msu soubor.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Run Windows Update Troubleshooter:</strong> Settings → Windows Update → Troubleshoot.</li>
<li><strong>Reset Update cache:</strong> Open CMD as admin: <code>net stop wuauserv</code>, delete contents of <code>C:\\Windows\\SoftwareDistribution\\Download</code>, then <code>net start wuauserv</code>.</li>
<li><strong>Repair .NET Framework:</strong> Download and run the <a href="https://www.microsoft.com/en-us/download/details.aspx?id=30135" target="_blank">Microsoft .NET Repair Tool</a>.</li>
<li><strong>DISM repair:</strong> <code>DISM /Online /Cleanup-Image /RestoreHealth</code> → <code>sfc /scannow</code>.</li>
<li><strong>Manual install:</strong> Download the update directly from <a href="https://catalog.update.microsoft.com" target="_blank">Microsoft Update Catalog</a> as an .msu file.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>运行 Windows Update 疑难解答：</strong>设置 → Windows 更新 → 疑难解答。</li>
<li><strong>重置更新缓存：</strong>以管理员身份运行 CMD：<code>net stop wuauserv</code>，删除 SoftwareDistribution\\Download 内容，然后 <code>net start wuauserv</code>。</li>
<li><strong>修复 .NET Framework：</strong>下载并运行 Microsoft .NET Repair Tool。</li>
<li><strong>DISM 修复：</strong><code>DISM /Online /Cleanup-Image /RestoreHealth</code> → <code>sfc /scannow</code>。</li>
<li><strong>手动安装：</strong>从 Microsoft 更新目录直接下载 .msu 文件。</li>
</ol>`
        },
        youtube: [
            { title: "Fix Windows Update Error 0x80070643 (EN)", url: "https://www.youtube.com/results?search_query=fix+windows+update+error+0x80070643" }
        ],
        details: {
            cs: "Chyba 0x80070643 je ERROR_INSTALL_FAILURE – instalační engine (Windows Installer nebo CBS) hlásí obecné selhání instalace. Nejčastěji je způsobena: (1) Poškozeným .NET Framework – aktualizace KB5034441 (WinRE update) notoricky selhávala kvůli nedostatečně velké WinRE partition. Microsoft vydal manuální postup rozšíření partition. (2) Poškozenou CBS (Component-Based Servicing) databází. (3) Antivirem blokujícím zápis do systémových složek. Diagnostika: 'Get-WindowsUpdateLog' v PowerShell → prohledejte CBS.log v C:\\Windows\\Logs\\CBS.",
            en: "Error 0x80070643 is ERROR_INSTALL_FAILURE – the installation engine (Windows Installer or CBS) reports a generic installation failure. Most commonly caused by: (1) Corrupted .NET Framework – notably update KB5034441 (WinRE update) was notorious for failing due to insufficient WinRE partition size; Microsoft published a manual partition resize procedure. (2) Corrupted CBS database. (3) Antivirus blocking writes to system folders. Diagnostics: 'Get-WindowsUpdateLog' in PowerShell → search CBS.log in C:\\Windows\\Logs\\CBS.",
            zh: "错误 0x80070643 是 ERROR_INSTALL_FAILURE——安装引擎报告通用安装失败。最常见原因：(1) .NET Framework 损坏——特别是 KB5034441（WinRE 更新）因 WinRE 分区不足而失败；(2) CBS 数据库损坏；(3) 杀毒软件阻止写入系统文件夹。诊断：PowerShell 中运行 'Get-WindowsUpdateLog'。"
        }
    },
    {
        id: "cpu-intel-degradation", type: "hardware", subcategory: "cpu",
        vendors: ["intel"],
        code: "Intel 13th/14th Gen Instability / Degradation",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "Procesory Intel Core 13./14. generace (Raptor Lake) vykazují nestabilitu a pády – mikroarchitektonický problém s elektromigracÍ při vysokém napětí.",
            en: "Intel 13th/14th Gen (Raptor Lake) CPUs show instability and crashes – microarchitectural issue caused by elevated voltages leading to electromigration.",
            zh: "Intel 13/14 代（Raptor Lake）处理器出现不稳定和崩溃——高电压导致电迁移引起的微架构问题。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Aktualizujte BIOS na nejnovější verzi</strong> s Intel doporučeným mikrokódem (0x125 nebo novější pro Raptor Lake).</li>
<li><strong>Aktivujte Intel Baseline Profile</strong> v BIOSu – omezí PL1/PL2 na specifikované hodnoty (125W PL1 pro K-procesory).</li>
<li><strong>Omezte napětí Vcore:</strong> Nastavte max. 1.35V pro denní používání. Vypněte Adaptive Boost Technology (ABT).</li>
<li><strong>Testujte stabilitu:</strong> Prime95 Small FFT po dobu 30+ minut – pokud crashuje, poškození jader je pokročilé.</li>
<li><strong>Kontaktujte Intel support</strong> – Intel nabídl rozšíření záruky pro postižené procesory i po expiraci standardní záruky.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Update BIOS to the latest version</strong> containing Intel's recommended microcode (0x125 or newer for Raptor Lake).</li>
<li><strong>Enable Intel Baseline Profile</strong> in BIOS – restricts PL1/PL2 to spec values (125W PL1 for K-series).</li>
<li><strong>Limit Vcore voltage:</strong> Set max 1.35V for daily use. Disable Adaptive Boost Technology (ABT).</li>
<li><strong>Test stability:</strong> Prime95 Small FFT for 30+ minutes – if it crashes, core degradation is advanced.</li>
<li><strong>Contact Intel support</strong> – Intel extended warranty coverage for affected CPUs beyond standard warranty.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>将 BIOS 更新到最新版本</strong>，包含 Intel 推荐微码（Raptor Lake 为 0x125 或更新）。</li>
<li><strong>在 BIOS 中启用 Intel 基准配置文件</strong>——将 PL1/PL2 限制为规格值（K 系列 PL1 为 125W）。</li>
<li><strong>限制 Vcore 电压：</strong>日常使用最大 1.35V，禁用自适应增强技术（ABT）。</li>
<li><strong>测试稳定性：</strong>运行 Prime95 Small FFT 30 分钟以上——若崩溃则核心退化已严重。</li>
<li><strong>联系 Intel 支持</strong>——Intel 为受影响的 CPU 延长了超出标准保修期的保修范围。</li>
</ol>`
        },
        details: {
            cs: "V roce 2024 Intel potvrdil, že procesory Raptor Lake (13. a 14. gen Core i5/i7/i9) trpí mikroarchitektonickým problémem. Příčina: výrobci desek nastavili příliš vysoké napěťové limity (eTVB – enhanced Thermal Velocity Boost) a vysoká hodnota Vcore spolu s teplotou způsobovaly elektromigracÍ v IA cores. Elektromigrace je nevratné fyzické poškození tranzistorů – CPU se časem degraduje a začne crashovat v náročných aplikacích. Intel vydal mikrokód patch a doporučil Baseline Profile, ale poškozené CPU nelze opravit – lze pouze zpomalit degradaci. Postižené modely: Core i9-13900K/KS, i9-14900K/KS, i7-13700K, i7-14700K a další.",
            en: "In 2024, Intel confirmed that Raptor Lake CPUs (13th and 14th Gen Core i5/i7/i9) suffer from a microarchitectural issue. Cause: motherboard vendors set excessive voltage limits (eTVB – enhanced Thermal Velocity Boost), and the combination of high Vcore and temperature caused electromigration in IA cores. Electromigration is irreversible physical damage to transistors – the CPU degrades over time and begins crashing under demanding workloads. Intel released a microcode patch and recommended the Baseline Profile, but damaged CPUs cannot be repaired – degradation can only be slowed. Affected models: Core i9-13900K/KS, i9-14900K/KS, i7-13700K, i7-14700K, and others.",
            zh: "2024 年，Intel 确认 Raptor Lake CPU（13/14 代 Core i5/i7/i9）存在微架构问题。原因：主板制造商设置了过高的电压限制（eTVB），高 Vcore 和温度组合导致 IA 核心中发生电迁移。电迁移是晶体管不可逆的物理损坏——CPU 随时间退化，在高负载下开始崩溃。Intel 发布了微码补丁并推荐基准配置文件，但受损 CPU 无法修复。受影响型号：Core i9-13900K/KS、i9-14900K/KS、i7-13700K 等。"
        }
    },
    {
        id: "win-ksecf", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "KERNEL_SECURITY_CHECK_FAILURE (0x00000139)",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "BSOD 0x139 – Windows detekoval porušení bezpečnostních struktur kernelu, nejčastěji vlivem vadného ovladače nebo RAM.",
            en: "BSOD 0x139 – Windows detected corruption of kernel security structures, usually caused by a faulty driver or RAM.",
            zh: "蓝屏 0x139——Windows 检测到内核安全结构损坏，通常由故障驱动程序或内存引起。"
        },
        solution: {
            cs: "Spusťte MemTest86. Odinstalujte nedávno nainstalované ovladače. Zkontrolujte MINIDUMP v WinDBG nebo WhoCrashed.",
            en: "Run MemTest86. Uninstall recently installed drivers. Check MINIDUMP via WinDBG or WhoCrashed.",
            zh: "运行 MemTest86，卸载最近安装的驱动程序，使用 WinDBG 或 WhoCrashed 检查 MINIDUMP。"
        },
        details: {
            cs: "KERNEL_SECURITY_CHECK_FAILURE (0x139) nastane, když Windows Kernel detekuje, že bezpečnostní ochranné struktury (stack canary, guard pages, Control Flow Guard) byly porušeny. Typické příčiny: (1) Vadný ovladač přepsal kernel stack – MINIDUMP identifikuje faulting modul. (2) Nestabilní RAM způsobující bit-flip v kernel prostoru. (3) Malware nebo rootkit modifikující kernel struktury. (4) Přetaktování CPU mimo stabilní rozsah. Diagnostika: WinDBG příkaz '!analyze -v' → zobrazí ExceptionCode a faulting stack; alternativně WhoCrashed (GUI nástroj) automaticky analyzuje MINIDUMP soubory z C:\\Windows\\Minidump.",
            en: "KERNEL_SECURITY_CHECK_FAILURE (0x139) occurs when the Windows Kernel detects that security protection structures (stack canary, guard pages, Control Flow Guard) have been violated. Typical causes: (1) Faulty driver overwriting the kernel stack – MINIDUMP identifies the faulting module. (2) Unstable RAM causing a bit-flip in kernel space. (3) Malware or rootkit modifying kernel structures. (4) CPU overclocking beyond stable limits. Diagnostics: WinDBG command '!analyze -v' shows ExceptionCode and faulting stack; alternatively, WhoCrashed (GUI tool) automatically analyzes MINIDUMP files from C:\\Windows\\Minidump.",
            zh: "KERNEL_SECURITY_CHECK_FAILURE（0x139）发生在 Windows 内核检测到安全保护结构（堆栈金丝雀、保护页、控制流保护）被违反时。典型原因：(1) 故障驱动程序覆写内核堆栈——MINIDUMP 识别故障模块；(2) 不稳定 RAM 导致内核空间位翻转；(3) 恶意软件或 rootkit 修改内核结构；(4) CPU 超频超过稳定限制。诊断：WinDBG '!analyze -v' 显示异常代码和故障堆栈；或使用 WhoCrashed 自动分析 MINIDUMP 文件。"
        }
    },
    {
        id: "disk-plp-failure", type: "hardware", subcategory: "disk",
        vendors: ["ssd", "nvme"],
        code: "SSD Data Loss After Power Cut (PLP Failure)",
        category: { cs: "Disk (SSD/HDD)", en: "Disk (SSD/HDD)", zh: "硬盘" },
        description: {
            cs: "SSD ztratil data nebo je poškozený po výpadku proudu – chybí Power Loss Protection kondenzátory.",
            en: "SSD lost data or is corrupted after a power outage – Power Loss Protection (PLP) capacitors are absent.",
            zh: "断电后 SSD 数据丢失或损坏，缺少断电保护（PLP）电容。"
        },
        solution: {
            cs: "Používejte UPS (záložní zdroj). Povolte Write Cache Buffer Flushing ve vlastnostech disku. Pro kritická data používejte enterprise SSD s PLP.",
            en: "Use a UPS (uninterruptible power supply). Enable Write Cache Buffer Flushing in disk properties. For critical data, use enterprise SSDs with PLP capacitors.",
            zh: "使用 UPS（不间断电源），在磁盘属性中启用写入缓存缓冲区刷新，对于关键数据使用带 PLP 电容的企业级 SSD。"
        },
        details: {
            cs: "PLP (Power Loss Protection) jsou kondenzátory na SSD PCB, které při výpadku napájení dodají energii na dokončení zápisu všech dat z DRAM cache do NAND flash. Spotřebitelské SSD (Samsung 970 Evo, WD Black SN850) PLP nemají – při výpadku proudu během zápisu může FTL (Flash Translation Layer) mapping tabulka skončit v nekonzistentním stavu, což vede k nerozpoznání disku nebo ztrátě dat. Enterprise SSD (Samsung PM9A3, Intel Optane P5800X, Micron 9300) PLP mají. Prevence: (1) UPS chrání celý systém. (2) 'Write-through cache' místo 'Write-back cache' – pomalejší, ale bezpečnější (Správce zařízení → disk → Zásady → Zakázat vyrovnávací paměť pro zápis). (3) ZFS nebo Btrfs souborové systémy mají COW (Copy-on-Write) – odolnější vůči výpadkům.",
            en: "PLP (Power Loss Protection) capacitors on the SSD PCB provide emergency power during a power outage to complete flushing all data from DRAM cache to NAND flash. Consumer SSDs (Samsung 970 Evo, WD Black SN850) lack PLP – during a write operation, a power cut can leave the FTL (Flash Translation Layer) mapping table in an inconsistent state, leading to the drive being unrecognized or data loss. Enterprise SSDs (Samsung PM9A3, Intel Optane P5800X, Micron 9300) include PLP. Prevention: (1) UPS protects the entire system. (2) 'Write-through cache' instead of 'Write-back cache' – slower but safer (Device Manager → disk → Policies → Disable write cache buffer). (3) ZFS or Btrfs file systems use COW (Copy-on-Write) – more resilient to power failures.",
            zh: "SSD PCB 上的 PLP（断电保护）电容在断电时提供紧急电源，以完成将 DRAM 缓存中的所有数据刷新到 NAND 闪存。消费级 SSD 缺少 PLP——写入操作期间断电可能使 FTL 映射表处于不一致状态，导致磁盘无法识别或数据丢失。企业级 SSD 包含 PLP。预防：(1) UPS 保护整个系统；(2) 使用'直写缓存'而非'回写缓存'；(3) ZFS 或 Btrfs 文件系统使用 COW，对断电更具弹性。"
        }
    },
    {
        id: "mb-usb4-thunderbolt", type: "hardware", subcategory: "mb",
        vendors: ["asus", "msi", "gigabyte", "asrock"],
        code: "USB4 / Thunderbolt 4 Device Not Recognized",
        category: { cs: "Základní deska", en: "Motherboard", zh: "主板" },
        description: {
            cs: "Zařízení připojené přes USB4 nebo Thunderbolt 4 není rozpoznáno nebo nefunguje správně.",
            en: "Device connected via USB4 or Thunderbolt 4 is not recognized or does not function correctly.",
            zh: "通过 USB4 或 Thunderbolt 4 连接的设备无法识别或无法正常工作。"
        },
        solution: {
            cs: "Aktualizujte firmware Thunderbolt kontroleru. Povolte Thunderbolt v BIOSu. Použijte certifikovaný kabel (40 Gbps).",
            en: "Update Thunderbolt controller firmware. Enable Thunderbolt in BIOS Security settings. Use a certified cable (40 Gbps rated).",
            zh: "更新 Thunderbolt 控制器固件，在 BIOS 安全设置中启用 Thunderbolt，使用认证线缆（额定 40 Gbps）。"
        },
        details: {
            cs: "USB4 Gen 3×2 (40 Gbps) a Thunderbolt 4 sdílejí fyzický konektor USB-C, ale mají odlišné protokoly. Thunderbolt 4 vyžaduje Intel certifikaci. Problémy: (1) BIOS Security Level pro Thunderbolt může blokovat nepárová zařízení – nastavte na 'No Security' nebo 'User Authorization'. (2) Firmware Thunderbolt kontroleru (Intel JHL8540) je zastaralý – aktualizujte přes Intel Thunderbolt Software. (3) Kabel není certifikovaný pro 40 Gbps – levné USB-C kabely podporují pouze 10 Gbps nebo USB 2.0. (4) Zařízení vyžaduje Thunderbolt (eGPU, Thunderbolt docking station) a port podporuje pouze USB4 bez TB4 certifikace. Diagnostika: Intel Thunderbolt Software → Devices tab zobrazí připojená Thunderbolt zařízení; Device Manager → Thunderbolt kontroler.",
            en: "USB4 Gen 3×2 (40 Gbps) and Thunderbolt 4 share the USB-C physical connector but use different protocols. Thunderbolt 4 requires Intel certification. Issues: (1) BIOS Thunderbolt Security Level may block non-paired devices – set to 'No Security' or 'User Authorization'. (2) Thunderbolt controller firmware (Intel JHL8540) is outdated – update via Intel Thunderbolt Software. (3) Cable is not certified for 40 Gbps – cheap USB-C cables only support 10 Gbps or USB 2.0. (4) Device requires Thunderbolt (eGPU, TB docking station) but port only supports USB4 without TB4 certification. Diagnostics: Intel Thunderbolt Software → Devices tab; Device Manager → Thunderbolt controller.",
            zh: "USB4 Gen 3×2（40 Gbps）和 Thunderbolt 4 共用 USB-C 物理接口，但使用不同协议。问题：(1) BIOS Thunderbolt 安全级别可能阻止未配对设备——设置为'无安全'或'用户授权'；(2) Thunderbolt 控制器固件过旧——通过 Intel Thunderbolt 软件更新；(3) 线缆未认证 40 Gbps——廉价 USB-C 线缆仅支持 10 Gbps；(4) 设备需要 Thunderbolt 认证但端口仅支持 USB4。诊断：Intel Thunderbolt 软件 → 设备标签。"
        }
    },
    {
        id: "app-0xc000007b", type: "software", subcategory: "apps",
        vendors: ["games", "runtime"],
        code: "Application Error 0xc000007b",
        category: { cs: "Aplikace & Hry", en: "Apps & Games", zh: "应用和游戏" },
        description: {
            cs: "Aplikace nebo hra se nespustí s kódem 0xc000007b – neplatný formát obrazu (32-bit app načítá 64-bit DLL nebo naopak).",
            en: "App or game fails to start with code 0xc000007b – invalid image format (32-bit app loading 64-bit DLL or vice versa).",
            zh: "应用程序或游戏以代码 0xc000007b 启动失败——无效映像格式（32 位应用程序加载 64 位 DLL 或反之）。"
        },
        solution: {
            cs: "Nainstalujte Visual C++ Redistributable 2015-2022 (x86 i x64). Přeinstalujte DirectX. Spusťte jako administrátor.",
            en: "Install Visual C++ Redistributable 2015-2022 (both x86 and x64). Reinstall DirectX End-User Runtime. Run as administrator.",
            zh: "安装 Visual C++ Redistributable 2015-2022（x86 和 x64 版本），重新安装 DirectX，以管理员身份运行。"
        },
        details: {
            cs: "Chyba 0xc000007b je STATUS_INVALID_IMAGE_FORMAT – Windows Loader odmítl načíst PE (Portable Executable) soubor, protože architektura DLL neodpovídá architektuře procesu. Konkrétní příklady: 32-bit aplikace se pokouší načíst 64-bit DirectX DLL (d3d11.dll) ze System32 místo SysWOW64. Nejčastější příčiny: (1) Chybějící nebo poškozený Visual C++ Redistributable – nejprve nainstalujte x86 verzi, pak x64. (2) Poškozená DirectX instalace – spusťte 'dxsetup.exe' z DirectX End-User Runtime Web Installer. (3) Antivirový software smazal nebo přemístil systémovou DLL. (4) Aplikace je zkompilovaná pro jinou platformu než nainstalovaný OS. Diagnostika: Process Monitor (Sysinternals) zobrazí přesnou DLL která způsobila selhání; Dependency Walker (depends.exe) analyzuje závislosti EXE.",
            en: "Error 0xc000007b is STATUS_INVALID_IMAGE_FORMAT – the Windows Loader refused to load a PE (Portable Executable) file because the DLL architecture doesn't match the process architecture. Specific example: a 32-bit app tries to load the 64-bit DirectX DLL (d3d11.dll) from System32 instead of SysWOW64. Most common causes: (1) Missing or corrupted Visual C++ Redistributable – install the x86 version first, then x64. (2) Corrupted DirectX installation – run 'dxsetup.exe' from the DirectX End-User Runtime Web Installer. (3) Antivirus deleted or moved a system DLL. (4) Application compiled for a different platform. Diagnostics: Process Monitor (Sysinternals) shows the exact DLL that caused failure; Dependency Walker (depends.exe) analyzes EXE dependencies.",
            zh: "错误 0xc000007b 是 STATUS_INVALID_IMAGE_FORMAT——Windows 加载器拒绝加载 PE 文件，因为 DLL 架构与进程架构不匹配。最常见原因：(1) 缺少或损坏的 Visual C++ Redistributable——先安装 x86 版本，再安装 x64；(2) DirectX 安装损坏——运行 DirectX 终端用户运行时 Web 安装程序；(3) 杀毒软件删除或移动了系统 DLL；(4) 应用程序为不同平台编译。诊断：Process Monitor（Sysinternals）显示导致失败的确切 DLL。"
        }
    },
    {
        id: "win-update-0x80070002", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "Windows Update Error 0x80070002",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Windows Update nemůže stáhnout nebo nainstalovat aktualizace – soubor nebo adresář nenalezen.",
            en: "Windows Update cannot download or install updates – file or directory not found.",
            zh: "Windows 更新无法下载或安装更新——文件或目录未找到。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Resetujte Windows Update komponentu:</strong> Otevřete CMD jako správce a spusťte postupně: <code>net stop wuauserv</code>, <code>net stop cryptSvc</code>, <code>net stop bits</code>, <code>net stop msiserver</code>. Poté smažte složky <code>C:\\Windows\\SoftwareDistribution</code> a <code>C:\\Windows\\System32\\catroot2</code> a služby znovu spusťte.</li>
<li><strong>Spusťte Windows Update Troubleshooter:</strong> Nastavení → Systém → Odstraňování potíží → Doporučené nástroje pro odstraňování potíží → Windows Update.</li>
<li><strong>Opravte systémové soubory:</strong> <code>sfc /scannow</code> a poté <code>DISM /Online /Cleanup-Image /RestoreHealth</code>.</li>
<li><strong>Ruční instalace aktualizace:</strong> Navštivte <a href="https://www.catalog.update.microsoft.com" target="_blank">catalog.update.microsoft.com</a>, vyhledejte KB číslo aktualizace a stáhněte ji ručně.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Reset Windows Update components:</strong> Open CMD as admin and run: <code>net stop wuauserv</code>, <code>net stop cryptSvc</code>, <code>net stop bits</code>, <code>net stop msiserver</code>. Then delete <code>C:\\Windows\\SoftwareDistribution</code> and <code>C:\\Windows\\System32\\catroot2</code>, then restart services.</li>
<li><strong>Run Windows Update Troubleshooter:</strong> Settings → System → Troubleshoot → Other troubleshooters → Windows Update.</li>
<li><strong>Repair system files:</strong> Run <code>sfc /scannow</code> then <code>DISM /Online /Cleanup-Image /RestoreHealth</code>.</li>
<li><strong>Manual update install:</strong> Visit <a href="https://www.catalog.update.microsoft.com" target="_blank">catalog.update.microsoft.com</a>, search for the KB number and download it manually.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>重置 Windows 更新组件：</strong>以管理员身份打开 CMD，依次运行停止服务命令，然后删除 SoftwareDistribution 和 catroot2 文件夹，再重新启动服务。</li>
<li><strong>运行 Windows 更新疑难解答：</strong>设置 → 系统 → 疑难解答 → Windows 更新。</li>
<li><strong>修复系统文件：</strong>运行 <code>sfc /scannow</code>，然后运行 DISM 修复命令。</li>
<li><strong>手动安装更新：</strong>访问 catalog.update.microsoft.com，搜索 KB 编号并手动下载。</li>
</ol>`
        },
        details: {
            cs: "Chyba 0x80070002 (ERROR_FILE_NOT_FOUND) nastane, když Windows Update Agent nemůže najít soubor nutný pro instalaci. Nejčastěji je příčinou poškozená SoftwareDistribution databáze nebo chybějící dočasné soubory. Reset komponenty: zastavit wuauserv → smazat SoftwareDistribution → spustit wuauserv znovu. BITS (Background Intelligent Transfer Service) je zodpovědný za stahování – pokud je poškozený, aktualizace se nestáhnou.",
            en: "Error 0x80070002 (ERROR_FILE_NOT_FOUND) occurs when the Windows Update Agent cannot locate a file needed for installation. Most commonly caused by a corrupted SoftwareDistribution database or missing temp files. The component reset clears the cached update state and forces a fresh download. BITS (Background Intelligent Transfer Service) handles downloads – if corrupted, updates won't download.",
            zh: "错误 0x80070002（ERROR_FILE_NOT_FOUND）发生在 Windows 更新代理找不到安装所需文件时。最常见原因是 SoftwareDistribution 数据库损坏。重置组件会清除缓存的更新状态并强制重新下载。BITS 服务负责下载——若损坏则更新无法下载。"
        }
    },
    {
        id: "win-tdr-failure", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "VIDEO_TDR_FAILURE (BSOD)",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "BSOD s kódem VIDEO_TDR_FAILURE – grafický ovladač přestal reagovat a nepodařilo se ho obnovit.",
            en: "BSOD VIDEO_TDR_FAILURE – the graphics driver stopped responding and could not be recovered.",
            zh: "蓝屏 VIDEO_TDR_FAILURE——显卡驱动程序停止响应且无法恢复。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Čistá reinstalace GPU ovladače přes DDU:</strong> Stáhněte <a href="https://www.guru3d.com/files-details/display-driver-uninstaller-download.html" target="_blank">DDU</a>, spusťte Windows v Safe Mode, odstraňte veškeré ovladače GPU a nainstalujte nejnovější z webu výrobce.</li>
<li><strong>Zvyšte TdrDelay v registru:</strong> Win+R → <code>regedit</code> → <code>HKLM\System\CurrentControlSet\Control\GraphicsDrivers</code> → nový DWORD <em>TdrDelay</em> = hodnota <strong>8</strong>.</li>
<li><strong>Zkontrolujte teplotu GPU:</strong> HWInfo64 – pokud GPU Hot Spot přesahuje 90 °C, vyčistěte prach a vyměňte termální pastu.</li>
<li><strong>Deaktivujte hardware-accelerated GPU scheduling:</strong> Nastavení → Systém → Displej → Grafika → Výchozí nastavení grafiky → vypněte HAGS.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Clean GPU driver reinstall via DDU:</strong> Download <a href="https://www.guru3d.com/files-details/display-driver-uninstaller-download.html" target="_blank">DDU</a>, boot into Safe Mode, remove all GPU drivers, then install the latest from the manufacturer's website.</li>
<li><strong>Increase TdrDelay in registry:</strong> Win+R → <code>regedit</code> → <code>HKLM\System\CurrentControlSet\Control\GraphicsDrivers</code> → new DWORD <em>TdrDelay</em> = <strong>8</strong>.</li>
<li><strong>Check GPU temperature:</strong> HWInfo64 – if GPU Hot Spot exceeds 90°C, clean dust and replace thermal paste.</li>
<li><strong>Disable Hardware-Accelerated GPU Scheduling:</strong> Settings → System → Display → Graphics → Default graphics settings → turn off HAGS.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>通过 DDU 彻底重装 GPU 驱动：</strong>下载 DDU，进入安全模式彻底卸载驱动，再从制造商网站安装最新驱动。</li>
<li><strong>在注册表中增加 TdrDelay：</strong>Win+R → regedit → GraphicsDrivers → 新建 DWORD TdrDelay = 8。</li>
<li><strong>检查 GPU 温度：</strong>使用 HWInfo64 监控，超过 90°C 需清灰并更换硅脂。</li>
<li><strong>禁用硬件加速 GPU 调度（HAGS）：</strong>设置 → 系统 → 显示 → 图形 → 默认图形设置。</li>
</ol>`
        },
        details: {
            cs: "VIDEO_TDR_FAILURE je výsledek selhání TDR (Timeout Detection and Recovery) pro grafický subsystém. MINIDUMP soubor identifikuje konkrétní driver: atikmpag.sys (AMD), nvlddmkm.sys (NVIDIA), igdkmd64.sys (Intel). Na rozdíl od BSOD VIDEO_SCHEDULER_INTERNAL_ERROR je tento kód specificky pro selhání hardware recovery. Pokročilá diagnostika: WinDBG → .sympath srv*; .reload; !analyze -v. Hledejte faulting module a stack trace.",
            en: "VIDEO_TDR_FAILURE results from a failed TDR (Timeout Detection and Recovery) cycle for the graphics subsystem. The MINIDUMP file identifies the specific driver: atikmpag.sys (AMD), nvlddmkm.sys (NVIDIA), igdkmd64.sys (Intel). Unlike VIDEO_SCHEDULER_INTERNAL_ERROR, this code is specific to hardware recovery failure. Advanced diagnostics: WinDBG → .sympath srv*; .reload; !analyze -v – look for faulting module and stack trace.",
            zh: "VIDEO_TDR_FAILURE 是显卡子系统 TDR 周期失败的结果。MINIDUMP 文件标识具体驱动：atikmpag.sys（AMD）、nvlddmkm.sys（NVIDIA）、igdkmd64.sys（Intel）。高级诊断：使用 WinDBG 分析 MINIDUMP，查找故障模块和调用栈。"
        }
    },
    {
        id: "net-ssl-err", type: "software", subcategory: "network",
        vendors: ["wifi", "ethernet"],
        code: "NET::ERR_CERT_INVALID / SSL_ERROR",
        category: { cs: "Síť", en: "Network", zh: "网络" },
        description: {
            cs: "Prohlížeč blokuje stránku kvůli neplatnému nebo expirovanému SSL/TLS certifikátu.",
            en: "Browser blocks a website due to an invalid or expired SSL/TLS certificate.",
            zh: "浏览器因 SSL/TLS 证书无效或过期而阻止网站。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Zkontrolujte datum a čas systému:</strong> Nesprávné datum způsobuje falešnou expiraci certifikátů. Klikněte pravým tlačítkem na hodiny → Upravit datum a čas → Automaticky nastavit čas = zapnuto.</li>
<li><strong>Vymažte SSL cache prohlížeče:</strong> Chrome: Nastavení → Ochrana soukromí → Vymazat data prohlížení → Certifikáty. Nebo stiskněte <code>Ctrl+Shift+Delete</code>.</li>
<li><strong>Zkontrolujte antivirový SSL scanning:</strong> Některé antiviry (Avast, Kaspersky) zachycují HTTPS a mohou způsobovat chyby certifikátu. Dočasně vypněte SSL scanning v nastavení antiviru.</li>
<li><strong>Aktualizujte kořenové certifikáty:</strong> Win+R → <code>certmgr.msc</code> → Důvěryhodné kořenové certifikační autority → Akce → Importovat z Windows Update.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Check system date and time:</strong> Incorrect date causes false certificate expiration. Right-click clock → Adjust date/time → Set time automatically = on.</li>
<li><strong>Clear browser SSL cache:</strong> Chrome: Settings → Privacy → Clear browsing data → Certificates. Or press <code>Ctrl+Shift+Delete</code>.</li>
<li><strong>Check antivirus SSL scanning:</strong> Some antiviruses (Avast, Kaspersky) intercept HTTPS and can cause certificate errors. Temporarily disable SSL scanning in antivirus settings.</li>
<li><strong>Update root certificates:</strong> Win+R → <code>certmgr.msc</code> → Trusted Root CAs → Action → Import from Windows Update.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>检查系统日期和时间：</strong>错误的日期会导致证书误判为过期。右键点击时钟 → 调整日期/时间 → 自动设置时间。</li>
<li><strong>清除浏览器 SSL 缓存：</strong>Chrome：设置 → 隐私 → 清除浏览数据 → 证书。</li>
<li><strong>检查杀毒软件 SSL 扫描：</strong>某些杀毒软件会拦截 HTTPS 并导致证书错误，临时禁用 SSL 扫描。</li>
<li><strong>更新根证书：</strong>Win+R → certmgr.msc → 受信任的根证书颁发机构 → 操作 → 导入。</li>
</ol>`
        },
        details: {
            cs: "SSL/TLS handshake selhání nastane, když prohlížeč ověřuje certifikát serveru a zjistí nesoulad: vypršela platnost, self-signed certifikát nebo neplatný CA řetězec. ERR_CERT_AUTHORITY_INVALID znamená, že CA není v trusted store; ERR_CERT_DATE_INVALID indikuje expiraci. Interní síťové prostředí s proxy nebo firewall DPI může vkládat vlastní certifikáty – je třeba importovat korporátní CA do trust store.",
            en: "SSL/TLS handshake failures occur when the browser validates the server certificate and detects a mismatch: expired validity, self-signed certificate, or invalid CA chain. ERR_CERT_AUTHORITY_INVALID means the CA isn't in the trusted store; ERR_CERT_DATE_INVALID indicates expiration. Corporate networks with proxy or firewall DPI may inject their own certificates – import the corporate CA into the OS trust store.",
            zh: "SSL/TLS 握手失败发生在浏览器验证服务器证书并发现不匹配时：有效期过期、自签名证书或无效的 CA 链。企业网络中的代理或防火墙 DPI 可能注入自己的证书——需将企业 CA 导入操作系统信任库。"
        }
    },
    {
        id: "win-activation-0xc004", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "Windows Activation Error 0xC004F213",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Windows se nepodařilo aktivovat – licence není platná pro aktuální hardware nebo KMS server je nedostupný.",
            en: "Windows failed to activate – license is not valid for current hardware or KMS server is unreachable.",
            zh: "Windows 激活失败——许可证对当前硬件无效或 KMS 服务器不可达。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Spusťte automatické řešení potíží:</strong> Nastavení → Systém → Aktivace → Odstraňování potíží s aktivací. Windows se pokusí znovu aktivovat přes Microsoft servery.</li>
<li><strong>Zkontrolujte přiřazení licence k účtu:</strong> Přihlaste se na account.microsoft.com → Zařízení → Zkontrolujte, zda je digitální licence přiřazena k vašemu účtu.</li>
<li><strong>Propojte licenci s Microsoft účtem:</strong> Nastavení → Systém → Aktivace → Přidat účet Microsoft. Digitální licence se pak přenese při reinstalocí Windows.</li>
<li><strong>Kontaktujte podporu Microsoft:</strong> Zavolejte na aktivační linku (zobrazí se v okně aktivace) nebo použijte online chat na support.microsoft.com.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Run activation troubleshooter:</strong> Settings → System → Activation → Troubleshoot. Windows will attempt to re-activate via Microsoft servers.</li>
<li><strong>Check license assignment to account:</strong> Sign in at account.microsoft.com → Devices → verify the digital license is linked to your account.</li>
<li><strong>Link license to Microsoft account:</strong> Settings → System → Activation → Add a Microsoft account. The digital license then transfers during Windows reinstallation.</li>
<li><strong>Contact Microsoft support:</strong> Call the activation hotline (shown in the activation window) or use online chat at support.microsoft.com.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>运行激活疑难解答：</strong>设置 → 系统 → 激活 → 疑难解答。Windows 将尝试通过 Microsoft 服务器重新激活。</li>
<li><strong>检查许可证与账户绑定：</strong>登录 account.microsoft.com → 设备，验证数字许可证是否关联到您的账户。</li>
<li><strong>将许可证关联到 Microsoft 账户：</strong>设置 → 系统 → 激活 → 添加 Microsoft 账户。</li>
<li><strong>联系 Microsoft 支持：</strong>拨打激活热线或在 support.microsoft.com 使用在线聊天。</li>
</ol>`
        },
        details: {
            cs: "0xC004F213 (Hardware Hash Mismatch) nastane po výměně klíčových hardwarových komponent (základní deska, CPU). Windows ukládá 'hardware hash' pro identifikaci počítače – příliš velká změna hashů způsobí deaktivaci. Digitální licence propojená s Microsoft účtem lze přenést na nový hardware přes Activation Troubleshooter. OEM licence (vázané na základní desku) jsou nepřenosné. Volume/KMS licence vyžadují dostupný KMS server v síti.",
            en: "0xC004F213 (Hardware Hash Mismatch) occurs after replacing key hardware components (motherboard, CPU). Windows stores a 'hardware hash' to identify the PC – too large a change invalidates the activation. A digital license linked to a Microsoft account can be transferred to new hardware via the Activation Troubleshooter. OEM licenses (tied to the motherboard) are non-transferable. Volume/KMS licenses require a reachable KMS server on the network.",
            zh: "0xC004F213（硬件哈希不匹配）发生在更换关键硬件组件（主板、CPU）后。Windows 存储'硬件哈希'来标识 PC——变化过大会导致激活失效。与 Microsoft 账户关联的数字许可证可通过激活疑难解答转移到新硬件。OEM 许可证与主板绑定，不可转移。"
        }
    },
    {
        id: "win-ntfs-0x24", type: "software", subcategory: "windows",
        vendors: ["win10", "win11"],
        code: "NTFS_FILE_SYSTEM (0x00000024)",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "BSOD 0x00000024 – chyba NTFS souborového systému způsobená poškozením disku nebo metadat.",
            en: "BSOD 0x00000024 – NTFS file system error caused by disk corruption or metadata damage.",
            zh: "蓝屏 0x00000024——由磁盘损坏或元数据损坏引起的 NTFS 文件系统错误。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Spusťte chkdsk z Recovery prostředí:</strong> Bootujte z Windows USB → Opravit počítač → Odstraňování potíží → Příkazový řádek. Spusťte <code>chkdsk C: /f /r /x</code> a nechte dokončit (může trvat hodiny).</li>
<li><strong>Spusťte SFC a DISM:</strong> V příkazovém řádku jako správce: <code>sfc /scannow</code>, poté <code>DISM /Online /Cleanup-Image /RestoreHealth</code>.</li>
<li><strong>Zkontrolujte S.M.A.R.T. stav disku:</strong> CrystalDiskInfo – pokud jsou Reallocated Sectors nebo Pending Sectors nenulové, disk fyzicky selhává a je nutná výměna.</li>
<li><strong>Deaktivujte rychlé spuštění Windows:</strong> Ovládací panely → Možnosti napájení → Zvolte funkci tlačítek napájení → Vypnout rychlé spuštění. Tato funkce někdy způsobuje poškození NTFS metadat.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Run chkdsk from Recovery Environment:</strong> Boot from Windows USB → Repair your computer → Troubleshoot → Command Prompt. Run <code>chkdsk C: /f /r /x</code> and let it complete (may take hours).</li>
<li><strong>Run SFC and DISM:</strong> Elevated Command Prompt: <code>sfc /scannow</code>, then <code>DISM /Online /Cleanup-Image /RestoreHealth</code>.</li>
<li><strong>Check S.M.A.R.T. status:</strong> CrystalDiskInfo – if Reallocated Sectors or Pending Sectors are non-zero, the drive is physically failing and must be replaced.</li>
<li><strong>Disable Windows Fast Startup:</strong> Control Panel → Power Options → Choose what the power buttons do → Turn off fast startup. This can sometimes corrupt NTFS metadata.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>从恢复环境运行 chkdsk：</strong>从 Windows USB 启动 → 修复计算机 → 疑难解答 → 命令提示符。运行 <code>chkdsk C: /f /r /x</code>。</li>
<li><strong>运行 SFC 和 DISM：</strong>管理员命令提示符：sfc /scannow，然后 DISM 修复命令。</li>
<li><strong>检查 S.M.A.R.T. 状态：</strong>使用 CrystalDiskInfo——若重新分配扇区或待处理扇区非零，驱动器正在物理故障，必须更换。</li>
<li><strong>禁用 Windows 快速启动：</strong>控制面板 → 电源选项 → 选择电源按钮功能 → 关闭快速启动。</li>
</ol>`
        },
        details: {
            cs: "NTFS_FILE_SYSTEM BSOD (0x24) nastane, kdy ntfs.sys driver zjistí kritickou nekonzistenci ve struktuře NTFS svazku. Nejčastější příčiny: (1) Fyzicky poškozené sektory – S.M.A.R.T. atribut #197 Current Pending Sectors. (2) Náhlý výpadek napájení během zápisu do MFT (Master File Table) nebo $LogFile. (3) Vadná RAM způsobující bit-flips při práci s NTFS cache. (4) Rychlé spuštění Windows – hybridní shutdown neodpojí svazek správně. Diagnostika: bootujte z Live CD a spusťte TestDisk pro opravu partition table a NTFS boot sektoru.",
            en: "The NTFS_FILE_SYSTEM BSOD (0x24) occurs when the ntfs.sys driver detects a critical inconsistency in the NTFS volume structure. Most common causes: (1) Physically bad sectors – S.M.A.R.T. attribute #197 Current Pending Sectors. (2) Sudden power loss during writes to MFT (Master File Table) or $LogFile. (3) Faulty RAM causing bit-flips in NTFS cache. (4) Windows Fast Startup – the hybrid shutdown doesn't properly dismount the volume. Diagnostics: boot from a live CD and run TestDisk to repair the partition table and NTFS boot sector.",
            zh: "NTFS_FILE_SYSTEM 蓝屏（0x24）发生在 ntfs.sys 驱动检测到 NTFS 卷结构严重不一致时。最常见原因：(1) 物理坏道；(2) 写入 MFT 时突然断电；(3) 内存故障导致 NTFS 缓存位翻转；(4) Windows 快速启动导致卷未正确卸载。诊断：从 Live CD 启动并运行 TestDisk 修复分区表和 NTFS 引导扇区。"
        }
    }
    , {
        id: "win-7b-boot", type: "software", subcategory: "windows",
        code: "0x0000007B",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {

            cs: "INACCESSIBLE_BOOT_DEVICE – BSOD při startu Windows. Systém ztratil přístup k systémovému oddílu. Typicky po výměně základní desky, změně režimu SATA (IDE/AHCI) v BIOSu, klonování disku, nebo aktualizaci diskového řadiče.",
            en: "INACCESSIBLE_BOOT_DEVICE – BSOD at Windows startup. The system lost access to the system partition. Typically occurs after a motherboard swap, changing SATA mode (IDE/AHCI/RAID) in BIOS, disk cloning, or storage controller driver updates.",
            zh: "INACCESSIBLE_BOOT_DEVICE——Windows 启动时蓝屏。系统失去了对系统分区的访问权限。通常发生在更换主板、在 BIOS 中更改 SATA 模式（IDE/AHCI）、克隆磁盘或存储控制器驱动更新后。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Zkontrolujte nastavení SATA v BIOSu:</strong> Restartujte PC, vstupte do BIOSu/UEFI a zkontrolujte <em>SATA Mode</em> nebo <em>Storage Configuration</em>. Pokud je nastaveno na IDE nebo RAID, změňte na <strong>AHCI</strong> (případně opačně, pokud to předtím fungovalo).</li>
<li><strong>Zkontrolujte pořadí bootování:</strong> Ujistěte se, že Windows Boot Manager (nebo správný disk) je na prvním místě v Boot Priority.</li>
<li><strong>Opravte bootloader po klonování disku:</strong> Bootujte z Windows instalačního USB → Opravit počítač → Příkazový řádek. Zadejte <code>bootrec /rebuildbcd</code>, <code>bootrec /fixmbr</code> a <code>bootrec /fixboot</code>.</li>
<li><strong>Safe Mode:</strong> Zkuste spustit Windows v Nouzovém režimu. Během bootu do Safe Mode si Windows mohou samy nahrát chybějící základní AHCI ovladače, následný normální restart pak proběhne v pořádku.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Check SATA mode in BIOS:</strong> Restart PC, enter BIOS/UEFI and check <em>SATA Mode</em> or <em>Storage Configuration</em>. Change IDE/RAID to <strong>AHCI</strong> (or vice versa, depending on previous working state).</li>
<li><strong>Check Boot Order:</strong> Ensure 'Windows Boot Manager' (or the correct SSD) is #1 in Boot Priority.</li>
<li><strong>Repair bootloader after cloning:</strong> Boot from Windows USB → Repair your computer → Command Prompt. Run <code>bootrec /rebuildbcd</code>, <code>bootrec /fixmbr</code>, and <code>bootrec /fixboot</code>.</li>
<li><strong>Boot into Safe Mode:</strong> Booting into Safe Mode forces Windows to load standard AHCI storage drivers. Once successfully in Safe Mode, a normal reboot often fixes the issue.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>检查 BIOS 中的 SATA 模式：</strong>重启进入 BIOS/UEFI，检查存储配置。将 IDE/RAID 更改为 AHCI（或恢复为其以前的工作模式）。</li>
<li><strong>检查启动顺序：</strong>确保 Windows Boot Manager 或正确的硬盘在启动优先级的第一位。</li>
<li><strong>克隆后修复引导：</strong>通过 Windows 安装 USB 启动 → 修复计算机 → 命令提示符。运行 bootrec /rebuildbcd 等修复命令。</li>
<li><strong>尝试进入安全模式：</strong>启动安全模式会迫使 Windows 加载标准存储驱动程序。成功进入后，正常的重启通常即可解决问题。</li>
</ol>`
        },
        details: {
            cs: "Při startu Windows převezme řízení bootloader (bootmgr), který předá jádru informace o tom, kde se nachází systém. Jádro následně musí nahrát ovladač diskového řadiče (např. storahci.sys nebo iaStorA.sys). Pokud se ovladač neshoduje s aktuálním hardwarem (SATA mód, nový chipset), Windows nemohou číst z disku a okamžitě padají na 0x7B. Tento problém se 100% vyskytne, pokud nainstalujete Windows v IDE režimu a v BIOSu později přepnete na AHCI. Řešení přes registry v Safe Mode: HKLM\\SYSTEM\\CurrentControlSet\\Services\\storahci → Start = 0.",
            en: "During startup, Windows loads storage controller drivers critical for mounting the system volume (e.g., storahci.sys, iaStorA.sys). If the installed driver fails to initialize the hardware (due to BIOS SATA mode change, motherboard swap, or bad cloning), the NT kernel cannot mount the boot partition, resulting in an immediate 0x7B bugcheck. If you installed Windows in IDE mode and switch to AHCI, it will crash. Safe Mode registry fix: HKLM\\SYSTEM\\CurrentControlSet\\Services\\storahci → set Start to 0.",
            zh: "启动期间，Windows 会加载对于挂载系统卷至关重要的存储控制器驱动程序。如果安装的驱动无法初始化硬件（因为更改了 BIOS SATA 模式、更换主板或克隆硬盘），NT 内核将无法挂载启动分区，从而立即引发 0x7B 蓝屏。安全模式下的注册表修复方案：将 HKLM\\SYSTEM\\CurrentControlSet\\Services\\storahci 的 Start 值修改为 0。"
        }
    },
    {
        id: "win-update-800f081f", type: "software", subcategory: "windows",
        code: "0x800f081f",
        category: { cs: "Windows Update", en: "Windows Update", zh: "Windows 更新" },
        description: {
            cs: "Chyba Windows Update nebo instalace .NET Framework. Znamená 'CBS_E_SOURCE_MISSING' – Windows Update nemůže najít zdrojové soubory potřebné k instalaci aktualizace nebo k opravě systému přes DISM.",
            en: "Windows Update or .NET Framework installation error. It translates to 'CBS_E_SOURCE_MISSING' – Windows Update cannot find the source files required to install the update or to repair the system via DISM.",
            zh: "Windows 更新或 .NET Framework 安装错误。这表示“CBS_E_SOURCE_MISSING”——Windows 更新无法找到安装更新或通过 DISM 修复系统所需的源文件。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Spusťte Poradce při potížích:</strong> Nastavení → Aktualizace a zabezpečení → Odstranit potíže → Další poradci → Windows Update. Tento nástroj resetuje služby wuauserv a BITS.</li>
<li><strong>Vyčistěte složku SoftwareDistribution:</strong> Otevřete CMD jako správce. Zadejte <code>net stop wuauserv</code> a <code>net stop bits</code>. Smažte obsah složky <code>C:\\Windows\\SoftwareDistribution</code>. Poté znovu spusťte <code>net start wuauserv</code> a <code>net start bits</code>.</li>
<li><strong>Opravte obraz přes DISM:</strong> V CMD (správce) spusťte: <code>DISM /Online /Cleanup-Image /RestoreHealth</code>. Pokud to nefunguje a vrátí stejnou chybu 0x800f081f, musíte připojit Windows ISO a spustit: <code>DISM /Online /Cleanup-Image /RestoreHealth /Source:WIM:D:\\sources\\install.wim:1 /LimitAccess</code> (kde D: je vaše připojené ISO).</li>
<li><strong>In-place upgrade:</strong> Pokud vše selže, stáhněte Windows Media Creation Tool a zvolte 'Upgradovat tento počítač'. Soubory a programy zůstanou zachovány, pouze se opraví jádro Windows.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Run the Update Troubleshooter:</strong> Settings → Update & Security → Troubleshoot → Additional troubleshooters → Windows Update. This resets the wuauserv and BITS services.</li>
<li><strong>Clear SoftwareDistribution folder:</strong> Open CMD as Admin. Run <code>net stop wuauserv</code> and <code>net stop bits</code>. Delete all files inside <code>C:\\Windows\\SoftwareDistribution</code>. Then run <code>net start wuauserv</code> and <code>net start bits</code>.</li>
<li><strong>Repair image via DISM:</strong> In CMD (Admin), run: <code>DISM /Online /Cleanup-Image /RestoreHealth</code>. If it fails with 0x800f081f, mount a Windows ISO and run: <code>DISM /Online /Cleanup-Image /RestoreHealth /Source:WIM:D:\\sources\\install.wim:1 /LimitAccess</code> (where D: is your mounted ISO).</li>
<li><strong>In-place upgrade:</strong> If all else fails, download the Windows Media Creation Tool and select 'Upgrade this PC now'. Files and apps are kept; it just reinstalls the Windows core.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>运行更新疑难解答：</strong>设置 → 更新和安全 → 疑难解答 → 其他疑难解答 → Windows 更新。</li>
<li><strong>清除 SoftwareDistribution 文件夹：</strong>以管理员身份打开 CMD。运行 net stop wuauserv 和 net stop bits。删除 C:\\Windows\\SoftwareDistribution 中的所有内容，然后重启服务。</li>
<li><strong>通过 DISM 修复镜像：</strong>在 CMD（管理员）中运行 DISM /Online /Cleanup-Image /RestoreHealth。如果仍然报错，需挂载 Windows ISO 并在命令中添加 /Source:WIM:D:\\sources\\install.wim:1 /LimitAccess 参数。</li>
<li><strong>就地升级（覆盖安装）：</strong>使用 Windows 媒体创建工具选择“立即升级这台电脑”。文件和应用将保留。</li>
</ol>`
        },
        details: {
            cs: "Tato chyba se obvykle vztahuje na poškozený Component-Based Servicing (CBS) manifest v adresáři WinSxS. DISM zjistí korupci, ale nepodaří se mu stáhnout náhradní zdravý payload z Windows Update serverů (nebo máte WSUS server, který danou aktualizaci nemá). V souboru C:\\Windows\\Logs\\CBS\\CBS.log můžete vyhledat 'Failed to resolve package' pro zjištění přesného chybějícího CAB souboru.",
            en: "This error refers to a corrupted Component-Based Servicing (CBS) manifest within the WinSxS directory. DISM detects corruption but fails to download a healthy replacement payload from Windows Update servers (or WSUS is missing the package). You can inspect C:\\Windows\\Logs\\CBS\\CBS.log and search for 'Failed to resolve package' to identify the exact missing CAB file.",
            zh: "此错误通常涉及 WinSxS 目录中损坏的基于组件的服务（CBS）清单。DISM 检测到损坏，但无法从 Windows 更新服务器下载健康的替换负载。您可以检查 C:\\Windows\\Logs\\CBS\\CBS.log 并搜索“Failed to resolve package”来识别缺失的确切 CAB 文件。"
        }
    },
    {
        id: "win-133-dpc", type: "hardware", subcategory: "disk",
        code: "DPC_WATCHDOG_VIOLATION",
        category: { cs: "Windows / Hardware", en: "Windows / Hardware", zh: "Windows / 硬件" },
        description: {
            cs: "DPC_WATCHDOG_VIOLATION (BSOD 0x00000133). Ukazuje na to, že nějaký Deferred Procedure Call (DPC) běžel příliš dlouho a zablokoval procesor. V 90 % případů to způsobuje SSD firmware, nekompatibilní řadič pevných disků (storahci.sys vs iastor.sys), nebo zastaralý síťový/Wi-Fi ovladač.",
            en: "DPC_WATCHDOG_VIOLATION (BSOD 0x00000133). Indicates that a single Deferred Procedure Call (DPC) ran for too long and stalled the CPU. In 90% of cases, this is caused by SSD firmware, incompatible SATA AHCI controllers (storahci.sys vs iaStorA.sys), or an outdated network/Wi-Fi driver.",
            zh: "DPC_WATCHDOG_VIOLATION（蓝屏 0x00000133）。表明延迟过程调用（DPC）运行时间过长并导致 CPU 停滞。在 90% 的情况下，这是由 SSD 固件、不兼容的 SATA AHCI 控制器或过时的网卡驱动程序引起的。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Vyměňte SATA AHCI ovladač na Standardní:</strong> Pravé tlačítko na Start → Správce zařízení → Řadiče IDE ATA/ATAPI. Rozbalte, klikněte pravým na řadič (např. Intel SATA) → Aktualizovat ovladač → Vyhledat v počítači → Vybrat ze seznamu → Zvolte <strong>Standardní řadič SATA AHCI</strong> a restartujte.</li>
<li><strong>Aktualizujte firmware vašeho SSD:</strong> Stáhněte si software výrobce (Samsung Magician, Crucial Storage Executive, Kingston SSD Manager) a zkontrolujte dostupné aktualizace firmware.</li>
<li><strong>Zakažte Fast Startup (Rychlé spuštění):</strong> Ovládací panely → Možnosti napájení → Zvolte akci pro tlačítka napájení → Odškrtněte 'Zapnout rychlé spuštění'.</li>
<li><strong>Odpojte USB huby a externí disky:</strong> Neadekvátní napájení USB portů občas drží DPC rutinu ve smyčce, což vyústí v tuto BSOD.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Change SATA AHCI driver to Standard:</strong> Right-click Start → Device Manager → IDE ATA/ATAPI controllers. Right-click the controller (e.g., Intel SATA) → Update driver → Browse my computer → Let me pick from a list → Choose <strong>Standard SATA AHCI Controller</strong> and reboot.</li>
<li><strong>Update SSD firmware:</strong> Download your SSD manufacturer's software (Samsung Magician, Crucial Storage Executive, etc.) and check for firmware updates.</li>
<li><strong>Disable Fast Startup:</strong> Control Panel → Power Options → Choose what the power buttons do → Uncheck 'Turn on fast startup'.</li>
<li><strong>Disconnect external USB hubs/drives:</strong> Inadequate USB power delivery can sometimes hold a DPC routine in an infinite loop, causing this BSOD.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>将 SATA AHCI 驱动更改为标准版：</strong>右键开始菜单 → 设备管理器 → IDE ATA/ATAPI 控制器。右键控制器 → 更新驱动程序 → 浏览我的电脑 → 从列表中选择 → 选择“标准 SATA AHCI 控制器”并重启。</li>
<li><strong>更新 SSD 固件：</strong>下载制造商的软件（如 Samsung Magician）并检查固件更新。</li>
<li><strong>禁用快速启动：</strong>控制面板 → 电源选项 → 选择电源按钮的功能 → 取消选中“启用快速启动”。</li>
<li><strong>断开外部 USB 集线器/驱动器：</strong>USB 供电不足有时会导致 DPC 例程陷入死循环，从而引发此蓝屏。</li>
</ol>`
        },
        details: {
            cs: "Jádro Windows obsahuje watchdog timer (KeDpcWatchdog), který neustále měří čas provádění DPC (Deferred Procedure Call) na úrovni IRQL DISPATCH_LEVEL. Pokud jakýkoliv ovladač zablokuje procesor na úrovni DPC déle než 100 ms (což znemožňuje plánování threadů), watchdog systém záměrně shodí do BSOD s kódem 0x133, aby zabránil úplnému zamrznutí a poškození dat. Nekompatibilita starších 'iaStorA.sys' ovladačů od Intelu s novými buildy Windows 10/11 je zdaleka nejčastější příčinou, přepnutí na Microsoftí 'storahci.sys' problém obvykle vyřeší.",
            en: "The Windows kernel features a watchdog timer (KeDpcWatchdog) that tracks DPC (Deferred Procedure Call) execution time at IRQL DISPATCH_LEVEL. If a driver blocks the CPU at this level for more than 100 milliseconds (preventing thread scheduling), the watchdog intentionally bugchecks the system with 0x133 to prevent a hard hang and data corruption. Incompatibility between older 'iaStorA.sys' Intel drivers and newer Windows builds is the most common culprit, and reverting to Microsoft's in-box 'storahci.sys' driver usually resolves it.",
            zh: "Windows 内核包含一个看门狗定时器，用于跟踪 IRQL DISPATCH_LEVEL 级别的 DPC 执行时间。如果驱动程序在该级别阻塞 CPU 超过 100 毫秒，看门狗会故意引发 0x133 蓝屏，以防止硬挂起和数据损坏。旧版英特尔 'iaStorA.sys' 驱动程序与较新 Windows 版本的互不兼容是最常见的罪魁祸首，将其还原为微软内置的 'storahci.sys' 驱动程序通常能解决此问题。"
        }
    },
    {
        id: "win-50-pagefault", type: "hardware", subcategory: "ram",
        code: "PAGE_FAULT_IN_NONPAGED_AREA",
        category: { cs: "RAM / Ovladače", en: "RAM / Drivers", zh: "内存 / 驱动程序" },
        description: {
            cs: "BSOD s kódem 0x00000050. Systém se pokusil o přístup k paměti, která neexistuje, nebo k paměti v ne-stránkovaném poolu (Non-Paged Pool) z nesprávné IRQL úrovně. Ve většině případů jde o vadný modul RAM, agresivní časování pamětí (XMP), nebo chybný antivirový program zachytávající file systémové události.",
            en: "BSOD bugcheck 0x00000050. The system attempted to access non-existent memory, or accessed the Non-Paged Pool memory from an invalid IRQL. Typically indicates faulty RAM modules, unstable XMP memory timings, or a buggy third-party antivirus hooking into file system events.",
            zh: "蓝屏代码 0x00000050。系统试图访问不存在的内存，或者从无效的 IRQL 级别访问非分页池内存。通常表明 RAM 模块故障、XMP 内存时序不稳定，或第三方杀毒软件截获文件系统事件出错。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Zakažte XMP/DOCP v BIOSu:</strong> Restartujte do BIOSu a vraťte rychlost RAM na základní JEDEC frekvenci (např. 2133 MHz nebo 4800 MHz). Pokud BSOD zmizí, paměťový řadič CPU nezvládá daný XMP profil.</li>
<li><strong>MemTest86 Diagnostika:</strong> Otestujte RAM, jeden modul po druhém. Pokud MemTest zobrazí byť jen jednu červenou chybu, modul je vadný.</li>
<li><strong>Odinstalujte antivirový program 3. strany:</strong> Avast, McAfee, Kaspersky atd. mohou špatně alokovat non-paged paměť pro skenování souborů v reálném čase. Přejděte dočasně na Windows Defender.</li>
<li><strong>Zvyšte virtuální paměť (Pagefile):</strong> Výjimečně je na vině plně obsazený diskový oddíl. Ujistěte se, že máte na disku C: alespoň 15 GB volného místa.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Disable XMP/DOCP in BIOS:</strong> Reboot to BIOS and disable memory overclocking. Let RAM run at its base JEDEC speed (e.g., 2133 MHz or 4800 MHz). If the BSOD stops, the CPU's memory controller cannot handle the XMP profile.</li>
<li><strong>Run MemTest86:</strong> Test your RAM sticks one at a time. If MemTest displays even a single red error line, that RAM stick is physically defective.</li>
<li><strong>Uninstall third-party Antivirus:</strong> AV software (Avast, McAfee) injects filter drivers into the storage stack and uses non-paged memory pools. A bug can cause this BSOD. Temporarily use Windows Defender instead.</li>
<li><strong>Check Pagefile space:</strong> Ensure you have at least 15 GB of free space on your C: drive so Windows can properly manage the pagefile.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>在 BIOS 中禁用 XMP/DOCP：</strong>重启进入 BIOS 并禁用内存超频，让 RAM 以基础 JEDEC 速度运行。如果蓝屏消失，则说明 CPU 内存控制器无法处理该 XMP 配置文件。</li>
<li><strong>运行 MemTest86：</strong>逐条测试内存条。如果出现任何红色错误，说明该内存条存在物理缺陷。</li>
<li><strong>卸载第三方杀毒软件：</strong>杀软会使用非分页内存池进行文件扫描，驱动错误会导致此蓝屏。请暂时改用 Windows Defender。</li>
<li><strong>检查虚拟内存空间：</strong>确保 C 盘至少有 15 GB 的可用空间，以便 Windows 管理分页文件。</li>
</ol>`
        },
        details: {
            cs: "Memory Management Windows rozděluje RAM na 'Paged' (stránkovanou paměť, která může být odložena na disk do pagefile.sys) a 'Non-Paged' (ne-stránkovanou paměť, která musí být navždy uložena v RAM – sem patří ovladače a systémové jádro). Chyba 0x50 znamená, že kód běžící v Kernel režimu požadoval adresu z Non-Paged poolu, ale adresa směřovala na neplatné (uvolněné) nebo neexistující místo. Analyzováním Minidump souboru přes WinDbg (příkaz !analyze -v) obvykle zjistíte jméno viníka (.sys soubor) přímo na call stacku.",
            en: "Windows Memory Management divides RAM into 'Paged Pool' (can be swapped to disk in pagefile.sys) and 'Non-Paged Pool' (must stay resident in RAM – used by drivers and the NT Kernel). Bugcheck 0x50 means kernel-mode code requested an address expected to be in the Non-Paged Pool, but the address pointed to an invalid, freed, or non-existent region. Analyzing the Minidump file via WinDbg (using !analyze -v) will usually identify the exact offending driver (.sys file) on the call stack.",
            zh: "Windows 内存管理将 RAM 分为“分页池”（可以交换到磁盘）和“非分页池”（必须驻留在 RAM 中，用于驱动和内核）。错误代码 0x50 表示内核模式代码请求了一个预期的非分页池地址，但该地址指向无效或已释放的区域。通过 WinDbg 分析 Minidump 文件通常可以在调用堆栈中直接找出导致问题的驱动程序（.sys 文件）。"
        }
    },
    {
        id: "cpu-clock-watchdog", type: "hardware", subcategory: "cpu",
        vendors: ["intel", "amd"],
        code: "CLOCK_WATCHDOG_TIMEOUT (Clock Watchdog)",
        category: { cs: "Procesor", en: "Processor", zh: "处理器" },
        description: {
            cs: "BSOD chybový kód 0x00000101. Znamená, že specifikovaný procesor neodpovídá na přerušení (interrupt). Značí to zamrzlé jádro procesoru.",
            en: "BSOD error code 0x00000101. Indicates that an expected clock interrupt on a secondary processor was not received. Means a CPU core has hung.",
            zh: "蓝屏错误代码 0x00000101。表示未在辅助处理器上收到预期的时钟中断，即 CPU 核心挂起。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Odstraňte přetaktování CPU:</strong> Vstupte do BIOSu a načtěte výchozí hodnoty (Load Optimized Defaults). Nestabilní VCore při přetaktování je hlavní příčinou.</li>
<li><strong>Zvyšte napětí CPU (Vcore):</strong> Pokud nepoužíváte přetaktování a stále dochází k chybě, váš procesor možná degradoval a potřebuje vyšší napětí (+0.05V) ke stabilitě.</li>
<li><strong>Aktualizujte BIOS:</strong> Nový mikrokód procesoru od výrobce desky (Intel/AMD) často opravuje interní chyby správy napájení a komunikace jader.</li>
<li><strong>Aktualizujte ovladače chipsetu:</strong> Stáhněte si nejnovější ovladače základní desky přímo od AMD nebo Intelu (nikoli přes Windows Update).</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Remove CPU overclocking:</strong> Enter BIOS and load optimized defaults. Unstable VCore voltage during overclocking is the leading cause.</li>
<li><strong>Increase CPU Vcore voltage:</strong> If running at stock speeds and the error persists, the CPU may have degraded and needs slightly more voltage (+0.05V) to be stable.</li>
<li><strong>Update BIOS:</strong> A new CPU microcode from your motherboard manufacturer often fixes internal core communication and power state bugs.</li>
<li><strong>Update chipset drivers:</strong> Download the latest chipset drivers directly from AMD or Intel (not via Windows Update).</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>移除 CPU 超频：</strong>进入 BIOS 加载优化默认值。超频期间 VCore 电压不稳定是主要原因。</li>
<li><strong>提高 CPU VCore 电压：</strong>如果未超频仍发生错误，CPU 可能已降级，需要略高的电压（+0.05V）才能稳定。</li>
<li><strong>更新 BIOS：</strong>主板制造商提供的新 CPU 微代码通常会修复内部核心通信和电源状态错误。</li>
<li><strong>更新芯片组驱动：</strong>直接从 AMD 或 Intel 下载最新芯片组驱动（不要通过 Windows Update）。</li>
</ol>`
        },
        details: {
            cs: "Kód 0x00000101. Windows používá přerušení od hardwarových hodin ke sledování stavu jader procesoru. Pokud jedno jádro neodpoví včas, kernel zjistí zablokování a vyvolá CLOCK_WATCHDOG_TIMEOUT BSOD, aby zabránil poškození paměti a pádu jiných subsystémů. Často způsobeno nesprávnou komunikací (C-states), VDrop u slabých VRM, nebo fyzickou degradací CPU.",
            en: "Stop code 0x00000101. Windows uses clock interrupts to track the state of CPU cores. If a core fails to respond within the allotted timeframe, the kernel detects a deadlock and triggers a CLOCK_WATCHDOG_TIMEOUT BSOD to prevent memory corruption. Often caused by faulty C-states, severe VDrop from weak VRMs, or physical CPU degradation.",
            zh: "停止代码 0x00000101。Windows 使用时钟中断来跟踪 CPU 核心状态。如果某个核心未能在分配的时间内响应，内核将检测到死锁并触发 CLOCK_WATCHDOG_TIMEOUT 蓝屏，以防止内存损坏。通常由 C-states 错误、VRM 弱导致的严重掉压或 CPU 物理退化引起。"
        }
    },
    {
        id: "win-0xc0000225", type: "software", subcategory: "windows",
        vendors: ["microsoft"],
        code: "0xc0000225 / BCD Error",
        category: { cs: "Windows OS", en: "Windows OS", zh: "Windows 操作系统" },
        description: {
            cs: "Windows nedokázal najít systémové soubory použité k zavedení (Boot Configuration Data - BCD). Start OS se zastaví na modré obrazovce Recovery.",
            en: "Windows cannot find the system files used for booting (Boot Configuration Data - BCD). OS startup halts on a blue Recovery screen.",
            zh: "Windows 找不到用于启动的系统文件（引导配置数据 - BCD）。操作系统启动在蓝色恢复屏幕上停止。"
        },
        solution: {
            cs: `<ol class="sol-steps">
<li><strong>Spusťte Automatickou opravu:</strong> Vytvořte a nabootujte z instalačního USB Windows. Vyberte <em>Opravit tento počítač -> Řešení potíží -> Automatická oprava</em>.</li>
<li><strong>Obnovte BCD pomocí Příkazového řádku:</strong> Z instalačního USB (nebo v Recovery) jděte do <em>Řešení potíží -> Příkazový řádek</em>. Napište <code>bootrec /rebuildbcd</code> a stiskněte Enter.</li>
<li><strong>Zkontrolujte disk:</strong> V tomtéž příkazovém řádku napište <code>chkdsk c: /f /r</code> (kde c: je váš systémový disk). Počkejte na dokončení oprav sektorů.</li>
<li><strong>Zkontrolujte aktivní oddíl:</strong> Ujistěte se, že EFI oddíl (nebo MBR aktivní oddíl) nebyl nechtěně smazán při manipulaci s disky v programech na úpravu oddílů.</li>
</ol>`,
            en: `<ol class="sol-steps">
<li><strong>Run Startup Repair:</strong> Boot from a Windows installation USB. Select <em>Repair your computer -> Troubleshoot -> Startup Repair</em>.</li>
<li><strong>Rebuild BCD via Command Prompt:</strong> From the installation USB (or Recovery), go to <em>Troubleshoot -> Command Prompt</em>. Type <code>bootrec /rebuildbcd</code> and press Enter.</li>
<li><strong>Check disk for errors:</strong> In the same Command Prompt, type <code>chkdsk c: /f /r</code> (where c: is your system drive). Wait for sector repairs to finish.</li>
<li><strong>Verify active partition:</strong> Ensure the EFI partition (or MBR active partition) wasn't accidentally deleted while using disk partition management software.</li>
</ol>`,
            zh: `<ol class="sol-steps">
<li><strong>运行启动修复：</strong>从 Windows 安装 USB 启动。选择<em>修复计算机 -> 疑难解答 -> 启动修复</em>。</li>
<li><strong>通过命令提示符重建 BCD：</strong>从安装 USB（或恢复模式），转到<em>疑难解答 -> 命令提示符</em>。输入 <code>bootrec /rebuildbcd</code> 并按 Enter。</li>
<li><strong>检查磁盘错误：</strong>在同一命令提示符中，输入 <code>chkdsk c: /f /r</code>（其中 c: 是系统驱动器）。等待扇区修复完成。</li>
<li><strong>验证活动分区：</strong>确保在使用磁盘分区管理软件时未意外删除 EFI 分区（或 MBR 活动分区）。</li>
</ol>`
        },
        details: {
            cs: "Kód chyby 0xc0000225 nastává při chybějících, nebo poškozených údajích o spuštění (BCD). Soubor \\\\Boot\\\\BCD (nebo EFI\\\\Microsoft\\\\Boot\\\\BCD) slouží jádru jako instrukce, kde se systémové soubory nacházejí. K poškození dochází nejčastěji při klonování disků, výpadcích proudu během updatů Windows nebo po připojení disku do jiného počítače.",
            en: "Error code 0xc0000225 occurs when Boot Configuration Data (BCD) is missing or corrupted. The file \\\\Boot\\\\BCD (or EFI\\\\Microsoft\\\\Boot\\\\BCD) provides instructions to the kernel on where system files are located. Corruption most commonly occurs during disk cloning, power failures during Windows updates, or after attaching the drive to a different computer.",
            zh: "当引导配置数据 (BCD) 缺失或损坏时，将出现错误代码 0xc0000225。\\\\Boot\\\\BCD（或 EFI\\\\Microsoft\\\\Boot\\\\BCD）文件向内核提供有关系统文件所在位置的指令。损坏最常见于磁盘克隆期间、Windows 更新期间断电或将驱动器连接到其他计算机后。"
        }
    }
];
//# sourceMappingURL=data.js.map
