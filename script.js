// ============================================================
// 🛠️ CẤU HÌNH BẢO TRÌ – SỬA TRUE/FALSE 🛠️
// ============================================================
const MAINTENANCE_MODE = {
    pro: false,     // Delta Lite
    client: false,  // Delta
    nx: false,      // Roblox Lite NX
    pc: false,      // Real (PC)
    px: false,      // Medium (PX)
    pv: true,       // Velocity (PV) — đang bảo trì
    D32: false,     // Delta 32 Bit
    solara: false,  // Solara
    xeno: false     // Xeno
};

// ============================================================
// 📦 CẤU HÌNH DOWNLOAD – SỬA LINK Ở ĐÂY 📦
// ============================================================
const DOWNLOADS = {
    pro: {
        url: 'https://vuotnhanh.com/dICD',
        filename: 'Delta-Pro-v3.245.1782.apk'
    },
    client: {
        url: 'https://vuotnhanh.com/9G1D',
        filename: 'Delta-v2.735.1138.apk'
    },
    D32: {
        url: 'https://vuotnhanh.com/oJou',
        filename: 'Delta-32bit-v2.736.1408.apk'
    },
    nx: {
        url: 'https://vuotnhanh.com/TxPF',
        filename: 'Roblox-Lite-NX-v3.0.1.apk'
    },
    pc: {
        url: 'https://vuotnhanh.com/CEGE',
        filename: 'Executor-PC-Real-v1.7.0.zip'
    },
    px: {
        url: 'https://vuotnhanh.com/G94y',
        filename: 'Executor-PC-Medium-v1.5.0.zip'
    },
    pv: {
        url: 'https://vuotnhanh.com/zij1',
        filename: 'Executor-PC-Velocity-v1.6.0.zip'
    },
    solara: {
        url: 'https://4d38a1ec.solaraweb-alj.pages.dev/download/static/files/Bootstrapper.exe',
        filename: 'Solara-Bootstrapper.exe'
    },
    xeno: {
        url: 'https://xeno.now/',
        filename: 'Xeno-Executor.exe'
    }
};

// ============================================================
// 🔔 CẤU HÌNH THÔNG BÁO
// ============================================================
const NOTIFICATION_CONFIG = {
    enabled: true,
    hideDurationMs: 2 * 60 * 60 * 1000, // 2 giờ
    storageKey: 'matchat_notif_hide_until',
    delayAfterLoader: 300
};

// ============================================================
// 🌗 CẤU HÌNH THEME
// ============================================================
const THEME_CONFIG = {
    storageKey: 'theme',
    labels: {
        dark: 'Dark',
        light: 'Light'
    }
};

// ============================================================
// 🧰 UTILITIES
// ============================================================
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================
// 🚀 BOOTSTRAP
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLoader();
    initTabs();
    initDownloadButtons();
    initNotification();
});

// ============================================================
// 1️⃣ THEME TOGGLE
// ============================================================
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const label = document.querySelector('[data-role="theme-label"]');

    // Đọc theme hiện tại (đã set bởi inline script trong <head>)
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeLabel(currentTheme, label);

    // Theo dõi thay đổi theme hệ thống (chỉ khi user chưa chọn)
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
        if (!localStorage.getItem(THEME_CONFIG.storageKey)) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            updateThemeLabel(newTheme, label);
        }
    };

    if (mql.addEventListener) {
        mql.addEventListener('change', handleSystemChange);
    } else if (mql.addListener) {
        // Safari cũ
        mql.addListener(handleSystemChange);
    }

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';

        applyTheme(next);
        localStorage.setItem(THEME_CONFIG.storageKey, next);
        updateThemeLabel(next, label);
    });

    // Phím tắt: Ctrl/Cmd + Shift + L
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            toggle.click();
        }
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Đổi màu address bar trên mobile
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        metaTheme.setAttribute(
            'content',
            theme === 'dark' ? '#0a0a0a' : '#fbfbfd'
        );
    }
}

function updateThemeLabel(theme, labelEl) {
    if (labelEl) {
        labelEl.textContent = THEME_CONFIG.labels[theme] || 'Dark';
    }

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.setAttribute(
            'aria-label',
            theme === 'dark'
                ? 'Chuyển sang chế độ sáng'
                : 'Chuyển sang chế độ tối'
        );
    }
}

// ============================================================
// 2️⃣ LOADER — ease-out curve, có safety timeout
// ============================================================
function initLoader() {
    const loader = document.getElementById('loader');
    const percentage = document.getElementById('percentage');
    const loaderBar = document.getElementById('loader-bar');

    if (!loader || !percentage || !loaderBar) {
        loader?.classList.add('hidden');
        onLoaderDone();
        return;
    }

    const DURATION = 1500;
    const STEP_INTERVAL = 50;
    const totalSteps = DURATION / STEP_INTERVAL;
    let step = 0;
    let finished = false;

    const interval = setInterval(() => {
        step++;
        const t = Math.min(1, step / totalSteps);
        const progress = Math.round(100 * (1 - Math.pow(1 - t, 3)));

        percentage.textContent = progress + '%';
        loaderBar.style.width = progress + '%';

        if (progress >= 100 && !finished) {
            finished = true;
            clearInterval(interval);
            loaderBar.style.background =
                'linear-gradient(90deg, #10b981, #34d399, #6ee7b7)';

            setTimeout(() => {
                loader.classList.add('hidden');
                onLoaderDone();
            }, 400);
        }
    }, STEP_INTERVAL);

    // Safety: force-hide sau 4s
    setTimeout(() => {
        if (!finished) {
            finished = true;
            clearInterval(interval);
            percentage.textContent = '100%';
            loaderBar.style.width = '100%';
            loader.classList.add('hidden');
            onLoaderDone();
        }
    }, 4000);
}

function onLoaderDone() {
    applyMaintenanceMode();
    window.dispatchEvent(new CustomEvent('loader:done'));
}

// ============================================================
// 3️⃣ TABS
// ============================================================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = {
        mobile: document.getElementById('tab-mobile'),
        pc: document.getElementById('tab-pc')
    };

    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            if (!targetTab || !tabContents[targetTab]) return;

            tabBtns.forEach((b) => {
                const isActive = b === btn;
                b.classList.toggle('active', isActive);
                b.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            Object.entries(tabContents).forEach(([key, el]) => {
                el?.classList.toggle('active', key === targetTab);
            });
        });
    });
}

// ============================================================
// 4️⃣ MAINTENANCE MODE
// ============================================================
function applyMaintenanceMode() {
    const cards = document.querySelectorAll('.card[data-executor]');

    cards.forEach((card) => {
        const key = card.dataset.executor;
        if (!key) return;

        const btn = card.querySelector('[data-role="download"]');
        const badge = card.querySelector('[data-role="badge"]');
        const status = card.querySelector('[data-role="status"]');
        const dot = card.querySelector('.dot');
        const statusText = card.querySelector('.status-text');

        if (!btn) return;

        const isMaintenance = Boolean(MAINTENANCE_MODE[key]);

        btn.classList.toggle('btn-maintenance', isMaintenance);
        btn.textContent = isMaintenance ? '⛔ Đang bảo trì' : 'Download';
        btn.disabled = isMaintenance;
        btn.setAttribute('aria-disabled', isMaintenance ? 'true' : 'false');

        if (badge) {
            badge.style.display = isMaintenance ? 'inline-block' : 'none';
        }

        if (dot) {
            dot.classList.toggle('online-dot', !isMaintenance);
            dot.classList.toggle('maintenance-dot', isMaintenance);
        }
        if (statusText) {
            statusText.textContent = isMaintenance ? 'Bảo trì' : 'Online';
        }
        if (status) {
            status.setAttribute(
                'aria-label',
                isMaintenance ? 'Trạng thái: Bảo trì' : 'Trạng thái: Online'
            );
        }
    });
}

// ============================================================
// 5️⃣ DOWNLOAD BUTTONS
// ============================================================
function initDownloadButtons() {
    const buttons = document.querySelectorAll('[data-role="download"]');

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card[data-executor]');
            const key = card?.dataset.executor;
            if (!key) return;

            handleDownload(key, btn);
        });
    });
}

async function handleDownload(key, btn) {
    if (MAINTENANCE_MODE[key]) return;

    const cfg = DOWNLOADS[key];
    if (!cfg) {
        console.warn(`[Download] Không có cấu hình cho key: ${key}`);
        return;
    }

    const originalText = btn.textContent;
    const originalDisabled = btn.disabled;

    btn.disabled = true;
    btn.textContent = 'Đang tải...';

    try {
        await sleep(500);
        btn.textContent = 'Đang chuẩn bị...';
        await sleep(1000);

        const link = document.createElement('a');
        link.href = cfg.url;
        link.download = cfg.filename;
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        link.remove();

        btn.textContent = 'Tải xuống thành công! ✓';
        btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        btn.style.color = '#000';
        btn.style.borderColor = 'transparent';

        await sleep(2000);
    } catch (err) {
        console.error('[Download] Lỗi:', err);
        btn.textContent = 'Lỗi — thử lại';
        await sleep(2000);
    } finally {
        btn.textContent = originalText;
        btn.disabled = originalDisabled;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
    }
}

// ============================================================
// 6️⃣ NOTIFICATION MODAL
// ============================================================
let notifController = null;

function initNotification() {
    window.addEventListener('loader:done', () => {
        setTimeout(showNotificationIfNeeded, NOTIFICATION_CONFIG.delayAfterLoader);
    });

    // Fallback
    setTimeout(() => {
        if (!document.getElementById('notifOverlay')?.classList.contains('show')) {
            showNotificationIfNeeded();
        }
    }, 5000);
}

function showNotificationIfNeeded() {
    if (!NOTIFICATION_CONFIG.enabled) return;

    const overlay = document.getElementById('notifOverlay');
    if (!overlay) return;

    const until = parseInt(
        localStorage.getItem(NOTIFICATION_CONFIG.storageKey) || '0',
        10
    );
    if (Date.now() < until) return;
    if (overlay.classList.contains('show')) return;

    notifController?.abort();
    notifController = new AbortController();
    const { signal } = notifController;

    const close = () => {
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
        notifController?.abort();
        notifController = null;
    };

    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');

    document
        .getElementById('notifClose')
        ?.addEventListener('click', close, { signal });

    document
        .getElementById('notifHide')
        ?.addEventListener(
            'click',
            () => {
                localStorage.setItem(
                    NOTIFICATION_CONFIG.storageKey,
                    String(Date.now() + NOTIFICATION_CONFIG.hideDurationMs)
                );
                close();
            },
            { signal }
        );

    overlay.addEventListener(
        'click',
        (e) => {
            if (e.target === overlay) close();
        },
        { signal }
    );

    document.addEventListener(
        'keydown',
        (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('show')) close();
        },
        { signal }
    );

    // Focus vào nút close cho keyboard user
    setTimeout(() => {
        document.getElementById('notifClose')?.focus();
    }, 100);
}

// ============================================================
// 🛡️ GLOBAL ERROR HANDLER
// ============================================================
window.addEventListener('error', (e) => {
    console.error('[Global Error]', e.error);
    document.getElementById('loader')?.classList.add('hidden');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('[Unhandled Promise]', e.reason);
});
