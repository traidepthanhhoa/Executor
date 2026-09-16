// ============================================================
// CẤU HÌNH BẢO TRÌ
// ============================================================
const MAINTENANCE_MODE = {
    pro: true,
    client: false,
    nx: true,
    pc: false,
    px: true,
    pv: true,
    D32: true,
    solara: false,
    xeno: true
};

// ============================================================
// CẤU HÌNH DOWNLOAD
// ============================================================
const DOWNLOADS = {
    pro:    { url: 'https://vuotnhanh.com/dICD', filename: 'Delta-Pro-v3.245.1782.apk' },
    client: { url: 'https://vuotnhanh.com/RLJD', filename: 'Delta-v2.735.1138.apk' },
    D32:    { url: 'https://vuotnhanh.com/oJou', filename: 'Delta-32bit-v2.736.1408.apk' },
    nx:     { url: 'https://vuotnhanh.com/TxPF', filename: 'Roblox-Lite-NX-v3.0.1.apk' },
    pc:     { url: 'https://vuotnhanh.com/CEGE', filename: 'Executor-PC-Real-v1.7.0.zip' },
    px:     { url: 'https://vuotnhanh.com/G94y', filename: 'Executor-PC-Medium-v1.5.0.zip' },
    pv:     { url: 'https://vuotnhanh.com/zij1', filename: 'Executor-PC-Velocity-v1.6.0.zip' },
    solara: {
        url: 'https://4d38a1ec.solaraweb-alj.pages.dev/download/static/files/Bootstrapper.exe',
        filename: 'Solara-Bootstrapper.exe'
    },
    xeno:   { url: 'https://xeno.now/', filename: 'Xeno-Executor.exe' }
};

// ============================================================
// CẤU HÌNH THÔNG BÁO
// ============================================================
const NOTIFICATION_CONFIG = {
    enabled: true,
    hideDurationMs: 2 * 60 * 60 * 1000,
    storageKey: 'matchat_notif_hide_until',
    delayAfterLoader: 300
};

// ============================================================
// CẤU HÌNH THEME
// ============================================================
const THEME_CONFIG = {
    storageKey: 'theme',
    labels: { dark: 'Dark', light: 'Light' }
};

// ============================================================
// UTILITIES
// ============================================================
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================
// BOOTSTRAP
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('[App] DOMContentLoaded');
    initTheme();
    initLoader();
    initTabs();
    initSearch();
    initDownloadButtons();
    initNotification();
    initGuide();
    initBackToTop();
    initReadingProgress();
    initTimeAgo();
    initDiscordFloat();
});

// ============================================================
// 1️⃣ THEME
// ============================================================
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const label = document.querySelector('[data-role="theme-label"]');

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeLabel(currentTheme, label);

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
        if (!localStorage.getItem(THEME_CONFIG.storageKey)) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            updateThemeLabel(newTheme, label);
        }
    };

    if (mql.addEventListener) mql.addEventListener('change', handleSystemChange);
    else if (mql.addListener) mql.addListener(handleSystemChange);

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(THEME_CONFIG.storageKey, next);
        updateThemeLabel(next, label);
    });

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            toggle.click();
        }
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        metaTheme.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fbfbfd');
    }
}

function updateThemeLabel(theme, labelEl) {
    if (labelEl) labelEl.textContent = THEME_CONFIG.labels[theme] || 'Dark';
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.setAttribute('aria-label',
            theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối');
    }
}

// ============================================================
// 2️⃣ LOADER
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
            loaderBar.style.background = 'linear-gradient(90deg, #10b981, #34d399, #6ee7b7)';
            setTimeout(() => {
                loader.classList.add('hidden');
                onLoaderDone();
            }, 400);
        }
    }, STEP_INTERVAL);

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
// 4️⃣ SEARCH
// ============================================================
let searchDebounce = null;

function initSearch() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('searchClear');
    const emptyMsg = document.getElementById('searchEmpty');

    if (!input) {
        console.error('[Search] ❌ Không tìm thấy #searchInput');
        return;
    }

    const cards = document.querySelectorAll('.card[data-executor]');
    console.log('[Search] ✅ Init OK,', cards.length, 'cards');

    if (cards.length === 0) {
        console.error('[Search] ❌ Không có card nào trong HTML');
        return;
    }

    const performSearch = () => {
        const query = (input.value || '').toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach((card) => {
            const name = (card.dataset.name || '').toLowerCase();
            const key = (card.dataset.executor || '').toLowerCase();
            const desc = (card.querySelector('p')?.textContent || '').toLowerCase();

            const h2 = card.querySelector('h2');
            let titleText = '';
            if (h2) {
                h2.childNodes.forEach((node) => {
                    if (node.nodeType === 3) titleText += ' ' + node.textContent;
                });
                titleText = titleText.toLowerCase();
            }

            const match = !query
                || name.includes(query)
                || key.includes(query)
                || titleText.includes(query)
                || desc.includes(query);

            if (match) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (emptyMsg) emptyMsg.hidden = (visibleCount > 0 || !query);
        if (clearBtn) clearBtn.hidden = !query;

        console.log(`[Search] "${query}" → ${visibleCount}/${cards.length}`);
    };

    const handleInput = () => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(performSearch, 150);
    };

    input.addEventListener('input', handleInput);
    input.addEventListener('keyup', handleInput);
    input.addEventListener('search', handleInput);
    input.addEventListener('paste', () => setTimeout(performSearch, 50));

    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            input.value = '';
            performSearch();
        });
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            input.value = '';
            performSearch();
        }
    });

    performSearch();
}

// ============================================================
// 5️⃣ MAINTENANCE MODE
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

        if (badge) badge.style.display = isMaintenance ? 'inline-block' : 'none';
        if (dot) {
            dot.classList.toggle('online-dot', !isMaintenance);
            dot.classList.toggle('maintenance-dot', isMaintenance);
        }
        if (statusText) statusText.textContent = isMaintenance ? 'Bảo trì' : 'Online';
        if (status) {
            status.setAttribute('aria-label',
                isMaintenance ? 'Trạng thái: Bảo trì' : 'Trạng thái: Online');
        }
    });
}

// ============================================================
// 6️⃣ DOWNLOAD BUTTONS
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
    const card = btn.closest('.card[data-executor]');
    const name = card?.dataset.name || 'Executor';

    if (!cfg) {
        console.warn(`[Download] Không có cấu hình cho key: ${key}`);
        return;
    }

    const originalText = btn.textContent;
    const originalDisabled = btn.disabled;

    btn.disabled = true;

    // Countdown 3 giây
    for (let i = 3; i > 0; i--) {
        btn.textContent = `Chuẩn bị... ${i}s`;
        await sleep(1000);
    }

    try {
        btn.textContent = 'Đang tải...';
        await sleep(300);

        const link = document.createElement('a');
        link.href = cfg.url;
        link.download = cfg.filename;
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        link.remove();

        btn.textContent = 'Tải thành công! ✓';
        btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        btn.style.color = '#000';
        btn.style.borderColor = 'transparent';

        showToast(`Đang tải ${name}...`, 'success');
        await sleep(2000);
    } catch (err) {
        console.error('[Download] Lỗi:', err);
        btn.textContent = 'Lỗi — thử lại';
        showToast(`Lỗi tải ${name}`, 'error');
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
// 7️⃣ TOAST
// ============================================================
const TOAST_ICONS = {
    success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    error: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
};

function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'status');

    const iconWrap = document.createElement('span');
    iconWrap.innerHTML = TOAST_ICONS[type] || TOAST_ICONS.info;

    const text = document.createElement('span');
    text.textContent = message;

    toast.appendChild(iconWrap);
    toast.appendChild(text);
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        toast.addEventListener('animationend', () => toast.remove(), { once: true });
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

// ============================================================
// 8️⃣ NOTIFICATION MODAL
// ============================================================
let notifController = null;

function initNotification() {
    window.addEventListener('loader:done', () => {
        setTimeout(showNotificationIfNeeded, NOTIFICATION_CONFIG.delayAfterLoader);
    });
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

    const until = parseInt(localStorage.getItem(NOTIFICATION_CONFIG.storageKey) || '0', 10);
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

    document.getElementById('notifClose')?.addEventListener('click', close, { signal });
    document.getElementById('notifHide')?.addEventListener('click', () => {
        localStorage.setItem(
            NOTIFICATION_CONFIG.storageKey,
            String(Date.now() + NOTIFICATION_CONFIG.hideDurationMs)
        );
        close();
    }, { signal });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    }, { signal });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('show')) close();
    }, { signal });
}

// ============================================================
// 9️⃣ GUIDE MODAL
// ============================================================
let guideController = null;

function initGuide() {
    const openBtn = document.getElementById('guideOpen');
    const overlay = document.getElementById('guideOverlay');
    if (!openBtn || !overlay) return;

    openBtn.addEventListener('click', openGuide);

    const guideTabs = document.querySelectorAll('.guide-tab');
    const guideContents = {
        mobile: document.getElementById('guide-mobile'),
        pc: document.getElementById('guide-pc')
    };

    guideTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.guideTab;
            if (!target) return;

            guideTabs.forEach((t) => {
                const isActive = t === tab;
                t.classList.toggle('active', isActive);
                t.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            Object.entries(guideContents).forEach(([key, el]) => {
                el?.classList.toggle('active', key === target);
            });
        });
    });

    const faqToggle = document.getElementById('faqToggle');
    const faqList = document.getElementById('faqList');

    if (faqToggle && faqList) {
        faqToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isExpanded = faqToggle.getAttribute('aria-expanded') === 'true';
            const willExpand = !isExpanded;

            faqToggle.setAttribute('aria-expanded', String(willExpand));
            if (willExpand) {
                faqList.removeAttribute('hidden');
            } else {
                faqList.setAttribute('hidden', '');
            }
            console.log('[FAQ]', willExpand ? 'Mở' : 'Đóng');
        });
    } else {
        console.warn('[FAQ] Không tìm thấy #faqToggle hoặc #faqList');
    }

    document.getElementById('guideClose')?.addEventListener('click', closeGuide);
    document.getElementById('guideOk')?.addEventListener('click', closeGuide);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeGuide();
    });
}

function openGuide() {
    const overlay = document.getElementById('guideOverlay');
    if (!overlay || overlay.classList.contains('show')) return;

    guideController?.abort();
    guideController = new AbortController();
    const { signal } = guideController;

    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('show')) closeGuide();
    }, { signal });
}

function closeGuide() {
    const overlay = document.getElementById('guideOverlay');
    if (!overlay) return;

    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    guideController?.abort();
    guideController = null;
}

// ============================================================
// 🔟 BACK TO TOP
// ============================================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// 1️⃣1️⃣ READING PROGRESS
// ============================================================
function initReadingProgress() {
    const progressBar = document.getElementById('readingProgressFill');
    const backTop = document.getElementById('backToTop');

    let ticking = false;

    const update = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = Math.min(100, percent) + '%';
        }
        if (backTop) {
            backTop.classList.toggle('show', scrollTop > 400);
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    update();
}

// ============================================================
// 📅 TIME AGO — "Cập nhật X ngày trước"
// ============================================================
function initTimeAgo() {
    const elements = document.querySelectorAll('[data-role="updated"]');

    if (elements.length === 0) {
        console.log('[TimeAgo] Không có element nào cần update');
        return;
    }

    console.log('[TimeAgo] Tìm thấy', elements.length, 'executor');

    const updateElement = (el) => {
        const card = el.closest('.card[data-executor]');
        if (!card) return;

        const dateStr = card.dataset.updated;
        if (!dateStr) {
            el.style.display = 'none';
            return;
        }

        const textEl = el.querySelector('.updated-text');
        if (!textEl) return;

        const result = getTimeAgo(dateStr);
        textEl.textContent = result.text;

        el.classList.remove('fresh', 'recent', 'old', 'stale');
        el.classList.add(result.class);

        el.title = result.fullDate;
    };

    elements.forEach(updateElement);

    setInterval(() => {
        elements.forEach(updateElement);
    }, 60 * 60 * 1000);
}

/**
 * Tính "X ngày trước" từ chuỗi ngày ISO (YYYY-MM-DD)
 */
function getTimeAgo(dateStr) {
    const now = new Date();
    const past = new Date(dateStr + 'T00:00:00');

    if (isNaN(past.getTime())) {
        return {
            text: 'Không rõ ngày cập nhật',
            class: 'old',
            fullDate: ''
        };
    }

    const fullDate = past.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const diffMs = now - past;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    let cls;
    if (diffDays > 180) cls = 'stale';
    else if (diffDays > 90) cls = 'old';
    else if (diffDays > 30) cls = 'recent';
    else cls = 'fresh';

    let text = '';
    if (diffSeconds < 60) text = 'Vừa mới cập nhật';
    else if (diffMinutes < 60) text = `${diffMinutes} phút trước`;
    else if (diffHours < 24) text = `${diffHours} giờ trước`;
    else if (diffDays === 1) text = 'Hôm qua';
    else if (diffDays < 7) text = `${diffDays} ngày trước`;
    else if (diffWeeks === 1) text = '1 tuần trước';
    else if (diffWeeks < 5) text = `${diffWeeks} tuần trước`;
    else if (diffMonths === 1) text = '1 tháng trước';
    else if (diffMonths < 12) text = `${diffMonths} tháng trước`;
    else if (diffYears === 1) text = '1 năm trước';
    else text = `${diffYears} năm trước`;

    return {
        text: `Cập nhật ${text.toLowerCase()}`,
        class: cls,
        fullDate: `Cập nhật lần cuối: ${fullDate}`
    };
}

// ============================================================
// 💬 DISCORD FLOATING BUTTON
// ============================================================
function initDiscordFloat() {
    const btn = document.getElementById('discordFloat');
    if (!btn) return;

    // Ẩn nút khi có modal mở (tránh đè lên modal)
    const overlayIds = ['notifOverlay', 'guideOverlay'];

    const updateModalState = () => {
        const anyModalOpen = overlayIds.some((id) => {
            const el = document.getElementById(id);
            return el?.classList.contains('show');
        });
        document.body.classList.toggle('modal-open', anyModalOpen);
    };

    overlayIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const observer = new MutationObserver(updateModalState);
        observer.observe(el, {
            attributes: true,
            attributeFilter: ['class']
        });
    });

    // Log khi click (có thể dùng cho analytics sau này)
    btn.addEventListener('click', () => {
        console.log('[Discord] User clicked join button');
    });
}

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================
window.addEventListener('error', (e) => {
    console.error('[Global Error]', e.error);
    document.getElementById('loader')?.classList.add('hidden');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('[Unhandled Promise]', e.reason);
});
