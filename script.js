// ============================================================
// CẤU HÌNH BẢO TRÌ
// ============================================================
const MAINTENANCE_MODE = {
    pro: true,
    client: false,
    nx: true,
    pc: false,
    px: false,
    pv: true,
    D32: true,
    solara: false,
    xeno: false
};

// ============================================================
// CẤU HÌNH DOWNLOAD
// ============================================================
const DOWNLOADS = {
    pro:    { url: 'https://vuotnhanh.com/dICD', filename: 'Delta-Pro-v3.245.1782.apk' },
    client: { url: 'https://vuotnhanh.com/j1tZ', filename: 'Delta-v2.735.1138.apk' },
    D32:    { url: 'https://vuotnhanh.com/oJou', filename: 'Delta-32bit-v2.736.1408.apk' },
    nx:     { url: 'https://vuotnhanh.com/TxPF', filename: 'Roblox-Lite-NX-v3.0.1.apk' },
    pc:     { url: 'https://vuotnhanh.com/CEGE', filename: 'Executor-PC-Real-v1.7.0.zip' },
    px:     { url: 'https://vuotnhanh.com/fXSZ', filename: 'Executor-PC-Madium-v1.5.0.zip' },
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
    initLanguage();
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
    initHalloweenSound();
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
        metaTheme.setAttribute('content', theme === 'dark' ? '#100719' : '#fff7ed');
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
// 🎃 HALLOWEEN SOUND
// ============================================================
function initHalloweenSound() {
    const audio = document.getElementById('halloweenAudio');
    const toggle = document.getElementById('soundToggle');
    const label = document.querySelector('[data-role="sound-label"]');
    const icon = toggle?.querySelector('.sound-icon');
    if (!audio || !toggle) return;

    audio.volume = 0.22;
    let enabled = localStorage.getItem('halloweenSound') === 'on';

    const render = () => {
        toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        toggle.classList.toggle('is-on', enabled);
        if (icon) icon.textContent = enabled ? '🔊' : '🔇';
        if (label) label.textContent = currentLang === 'en' ? (enabled ? 'Sound On' : 'Sound') : (enabled ? 'Âm thanh bật' : 'Âm thanh');
        toggle.title = currentLang === 'en'
            ? (enabled ? 'Turn Halloween sound off' : 'Turn Halloween sound on')
            : (enabled ? 'Tắt âm thanh Halloween' : 'Bật âm thanh Halloween');
    };

    const start = async () => {
        try { await audio.play(); enabled = true; localStorage.setItem('halloweenSound', 'on'); }
        catch (_) { enabled = false; localStorage.setItem('halloweenSound', 'off'); }
        render();
    };

    const stop = () => {
        audio.pause();
        audio.currentTime = 0;
        enabled = false;
        localStorage.setItem('halloweenSound', 'off');
        render();
    };

    toggle.addEventListener('click', () => enabled ? stop() : start());
    window.addEventListener('language:change', render);
    render();

    // Browsers block autoplay until user interaction. If the user previously
    // enabled sound, start it on the first click/key interaction.
    if (enabled) {
        const resume = () => {
            start();
            window.removeEventListener('pointerdown', resume);
            window.removeEventListener('keydown', resume);
        };
        window.addEventListener('pointerdown', resume, { once: true });
        window.addEventListener('keydown', resume, { once: true });
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
        btn.textContent = isMaintenance ? `⛔ ${t('maintenance')}` : t('download');
        btn.disabled = isMaintenance;
        btn.setAttribute('aria-disabled', isMaintenance ? 'true' : 'false');

        if (badge) badge.style.display = isMaintenance ? 'inline-block' : 'none';
        if (dot) {
            dot.classList.toggle('online-dot', !isMaintenance);
            dot.classList.toggle('maintenance-dot', isMaintenance);
        }
        if (statusText) statusText.textContent = isMaintenance ? t('maintenance') : t('online');
        if (status) {
            status.setAttribute('aria-label',
                isMaintenance ? `${t('status')}: ${t('maintenance')}` : `${t('status')}: ${t('online')}`);
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
        btn.textContent = `${t('preparing')} ${i}s`;
        await sleep(1000);
    }

    try {
        btn.textContent = t('downloading');
        await sleep(300);

        const link = document.createElement('a');
        link.href = cfg.url;
        link.download = cfg.filename;
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        link.remove();

        btn.textContent = t('downloadSuccess');
        btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        btn.style.color = '#000';
        btn.style.borderColor = 'transparent';

        showToast(`${t('downloading')} ${name}...`, 'success');
        await sleep(2000);
    } catch (err) {
        console.error('[Download] Lỗi:', err);
        btn.textContent = t('downloadError');
        showToast(`${t('downloadError')}: ${name}`, 'error');
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
            text: t('unknownUpdate'),
            class: 'old',
            fullDate: ''
        };
    }

    const locale = currentLang === 'en' ? 'en-US' : 'vi-VN';
    const fullDate = past.toLocaleDateString(locale, {
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
    if (currentLang === 'en') {
        if (diffSeconds < 60) text = 'just updated';
        else if (diffMinutes < 60) text = `${diffMinutes} min ago`;
        else if (diffHours < 24) text = `${diffHours} hr ago`;
        else if (diffDays === 1) text = 'yesterday';
        else if (diffDays < 7) text = `${diffDays} days ago`;
        else if (diffWeeks === 1) text = '1 week ago';
        else if (diffWeeks < 5) text = `${diffWeeks} weeks ago`;
        else if (diffMonths === 1) text = '1 month ago';
        else if (diffMonths < 12) text = `${diffMonths} months ago`;
        else if (diffYears === 1) text = '1 year ago';
        else text = `${diffYears} years ago`;
        return { text: `Updated ${text}`, class: cls, fullDate: `Last updated: ${fullDate}` };
    }

    if (diffSeconds < 60) text = 'vừa mới cập nhật';
    else if (diffMinutes < 60) text = `${diffMinutes} phút trước`;
    else if (diffHours < 24) text = `${diffHours} giờ trước`;
    else if (diffDays === 1) text = 'hôm qua';
    else if (diffDays < 7) text = `${diffDays} ngày trước`;
    else if (diffWeeks === 1) text = '1 tuần trước';
    else if (diffWeeks < 5) text = `${diffWeeks} tuần trước`;
    else if (diffMonths === 1) text = '1 tháng trước';
    else if (diffMonths < 12) text = `${diffMonths} tháng trước`;
    else if (diffYears === 1) text = '1 năm trước';
    else text = `${diffYears} năm trước`;
    return { text: `Cập nhật ${text}`, class: cls, fullDate: `Cập nhật lần cuối: ${fullDate}` };
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


// ============================================================
// 🌐 BILINGUAL UI — VI / EN
// ============================================================
let currentLang = localStorage.getItem('language') || 'vi';

const I18N = {
    vi: {
        title: 'Download Executor & Client',
        subtitle: 'Mobile Executor & Best Client – PC Executor',
        guide: 'Hướng dẫn',
        searchPlaceholder: 'Tìm executor... (Delta, Solara, Xeno...)',
        searchEmpty: 'Không tìm thấy executor nào phù hợp 😢',
        mobile: 'Mobile',
        pc: 'PC',
        download: 'Download',
        maintenance: 'Bảo trì',
        online: 'Online',
        status: 'Trạng thái',
        preparing: 'Chuẩn bị...',
        downloading: 'Đang tải...',
        downloadSuccess: 'Tải thành công! ✓',
        downloadError: 'Lỗi — thử lại',
        notification: 'Thông Báo',
        welcome: 'Welcome to GraiExecutor 👤',
        discordSupport: 'Discord hỗ trợ – giao lưu: Discord 💬',
        disclaimer: 'Tuyên bố miễn trừ trách nhiệm:',
        hideNotification: 'Không hiển thị lại trong 2 giờ',
        guideTitle: 'Hướng dẫn cài đặt & sử dụng',
        faq: '❓ Câu hỏi thường gặp',
        understood: 'Đã hiểu ✓',
        unknownUpdate: 'Không rõ ngày cập nhật',
        footerDisclaimer: 'Trang web không liên kết với Roblox Corporation.'
    },
    en: {
        title: 'Download Executor & Client',
        subtitle: 'Mobile Executor & Best Client – PC Executor',
        guide: 'Guide',
        searchPlaceholder: 'Search executor... (Delta, Solara, Xeno...)',
        searchEmpty: 'No matching executor found 😢',
        mobile: 'Mobile',
        pc: 'PC',
        download: 'Download',
        maintenance: 'Maintenance',
        online: 'Online',
        status: 'Status',
        preparing: 'Preparing...',
        downloading: 'Downloading...',
        downloadSuccess: 'Download complete! ✓',
        downloadError: 'Error — try again',
        notification: 'Notice',
        welcome: 'Welcome to GraiExecutor 👤',
        discordSupport: 'Discord support & community: Discord 💬',
        disclaimer: 'Disclaimer:',
        hideNotification: 'Hide again for 2 hours',
        guideTitle: 'Installation & Usage Guide',
        faq: '❓ Frequently asked questions',
        understood: 'Got it ✓',
        unknownUpdate: 'Unknown update date',
        footerDisclaimer: 'This website is not affiliated with Roblox Corporation.'
    }
};

const STATIC_TRANSLATIONS = {
    'Download Executor & Client': 'Download Executor & Client',
    'Mobile Executor & Best Client – PC Executor': 'Mobile Executor & Best Client – PC Executor',
    'Hướng dẫn': 'Guide',
    'Không tìm thấy executor nào phù hợp 😢': 'No matching executor found 😢',
    'Thông Báo': 'Notice',
    'Hướng dẫn cài đặt & sử dụng': 'Installation & Usage Guide',
    'Welcome to GraiExecutor 👤': 'Welcome to GraiExecutor 👤',
    'Discord hỗ trợ – giao lưu: Discord 💬': 'Discord support & community: Discord 💬',
    'Không hiển thị lại trong 2 giờ': 'Hide again for 2 hours',
    '❓ Câu hỏi thường gặp': '❓ Frequently asked questions',
    'Đã hiểu ✓': 'Got it ✓',
    'Trang web không liên kết với Roblox Corporation.': 'This website is not affiliated with Roblox Corporation.',
    'Tải phiên bản Lite mới nhất.': 'Download the latest Lite version.',
    'Tải phiên bản mới nhất.': 'Download the latest version.',
    'Tải phiên bản 32 bit mới nhất.': 'Download the latest 32-bit version.',
    'Phiên bản nhẹ tối ưu cho Roblox.': 'A lightweight version optimized for Roblox.',
    'Real Client': 'Real Client',
    'Madium Client': 'Madium Client',
    'Velocity Client': 'Velocity Client',
    'Keyless · Fast execution · Multi-instance.': 'Keyless · Fast execution · Multi-instance.',
    'JavaScript đang tắt. Vui lòng bật để sử dụng đầy đủ tính năng.': 'JavaScript is disabled. Please enable it for full functionality.',
    'ĐANG TẢI': 'LOADING',
    'Vui lòng đợi trong giây lát...': 'Please wait a moment...',
    'Cập nhật lần cuối:': 'Last updated:'
};
const STATIC_REVERSE = Object.fromEntries(Object.entries(STATIC_TRANSLATIONS).map(([vi,en]) => [en,vi]));

function t(key) { return I18N[currentLang]?.[key] ?? key; }

function initLanguage() {
    const toggle = document.getElementById('langToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            currentLang = currentLang === 'vi' ? 'en' : 'vi';
            localStorage.setItem('language', currentLang);
            applyLanguage();
            window.dispatchEvent(new CustomEvent('language:change'));
        });
    }
    applyLanguage();
    window.addEventListener('language:change', () => {
        applyMaintenanceMode();
        window.__refreshTimeAgo?.();
    });
}

function replaceTextNodes(root, map) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
        const raw = node.nodeValue;
        const trimmed = raw.trim();
        if (!trimmed) return;
        if (map[trimmed]) node.nodeValue = raw.replace(trimmed, map[trimmed]);
    });
}

function applyLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dataset.language = currentLang;

    const toEnglish = currentLang === 'en';
    const map = toEnglish ? STATIC_TRANSLATIONS : STATIC_REVERSE;
    replaceTextNodes(document.body, map);

    const input = document.getElementById('searchInput');
    if (input) {
        input.placeholder = t('searchPlaceholder');
        input.setAttribute('aria-label', currentLang === 'en' ? 'Search executor' : 'Tìm kiếm executor');
    }

    const label = document.querySelector('[data-role="lang-label"]');
    if (label) label.textContent = currentLang === 'vi' ? 'VI' : 'EN';

    const guide = document.getElementById('guideOpen');
    if (guide) guide.title = currentLang === 'en' ? 'Open installation guide' : 'Mở hướng dẫn cài đặt';

    const notifClose = document.getElementById('notifClose');
    if (notifClose) notifClose.setAttribute('aria-label', currentLang === 'en' ? 'Close notice' : 'Đóng thông báo');

    const guideClose = document.getElementById('guideClose');
    if (guideClose) guideClose.setAttribute('aria-label', currentLang === 'en' ? 'Close guide' : 'Đóng hướng dẫn');

    // Card titles/descriptions
    const cards = document.querySelectorAll('.card[data-executor]');
    const titles = {
        pro: ['Download Delta Lite','Download Delta Lite'],
        client: ['Download Delta','Download Delta'],
        D32: ['Download Delta 32 bit','Download Delta 32 bit'],
        nx: ['Roblox Lite','Roblox Lite'],
        pc: ['Executor Real','Executor Real'],
        px: ['Executor Madium','Executor Madium'],
        pv: ['Executor Velocity','Executor Velocity'],
        solara: ['Solara Executor','Solara Executor'],
        xeno: ['Xeno Executor','Xeno Executor']
    };
    cards.forEach(card => {
        const h2 = card.querySelector('h2');
        if (h2 && h2.firstChild && h2.firstChild.nodeType === Node.TEXT_NODE) {
            h2.firstChild.nodeValue = `\n                    ${titles[card.dataset.executor]?.[0] || h2.firstChild.nodeValue.trim()}\n                    `;
        }
    });

    // FAQ and guide rich paragraphs
    const rich = document.querySelectorAll('.guide-modal .step-body strong, .guide-modal .step-body p, .faq-item strong, .faq-item p');
    const richMap = {
        'Tải file APK':'Download the APK file',
        'Nhấn nút Download executor bạn muốn. File sẽ được tải về thư mục Downloads .':'Click Download on the executor you want. The file will be saved to your Downloads folder.',
        'Cho phép cài đặt từ nguồn không xác định':'Allow installation from unknown sources',
        'Vào Settings → Security → Install unknown apps và cho phép ứng dụng Files hoặc Chrome cài đặt APK.':'Go to Settings → Security → Install unknown apps and allow Files or Chrome to install APKs.',
        'Cài đặt APK':'Install the APK',
        'Mở file vừa tải → nhấn Install → chờ 10–30 giây.':'Open the downloaded file → tap Install → wait 10–30 seconds.',
        'Mở Roblox':'Open Roblox',
        'Đăng nhập tài khoản Roblox như bình thường và vào 1 game bất kỳ.':'Sign in to Roblox normally and join any game.',
        'Mở Executor & Getkey':'Open Executor & Getkey',
        'Mở app executor → nhấn Getkey → sau đó vượt link để có key.':'Open the executor → tap Getkey → complete the link step to get your key.',
        'Dán script & Execute':'Paste script & Execute',
        'Copy script → Paste vào ô editor → nhấn Execute .':'Copy the script → paste it into the editor → click Execute.',
        'Tải file ZIP/EXE':'Download the ZIP/EXE',
        'Nhấn Download trên card executor PC. File về thư mục Downloads .':'Click Download on the PC executor card. The file goes to your Downloads folder.',
        'Giải nén (nếu là ZIP)':'Extract (if ZIP)',
        'Dùng 7-Zip hoặc WinRAR để giải nén ra thư mục riêng.':'Use 7-Zip or WinRAR to extract it into a separate folder.',
        'Tắt antivirus tạm thời':'Temporarily disable antivirus',
        'Windows Defender có thể báo nhầm. Thêm file vào whitelist hoặc tắt tạm thời.':'Windows Defender may report a false positive. Add the file to the whitelist or temporarily disable it.',
        'Có thể dùng Microsoft Edge để tải dễ thở hơn Chrome':'Microsoft Edge may be easier for downloading than Chrome',
        'Mở trình duyệt Microsoft Edge để tải file — đôi khi ít bị chặn hơn Chrome.':'Open Microsoft Edge to download the file — it may be blocked less often than Chrome.',
        'Mở Roblox & vào game':'Open Roblox & join a game',
        'Vào 1 game bất kỳ trên Roblox PC.':'Join any game on Roblox PC.',
        'Attach or Inject & Execute':'Attach or Inject & Execute',
        'Nhấn Attach or Inject trong executor → chọn Roblox → dán script → Execute .':'Click Attach or Inject in the executor → select Roblox → paste the script → Execute.',
        'Executor không attach or inject được?':'Executor cannot attach or inject?',
        'Đúng phiên bản Roblox Executor cần. Tắt antivirus tạm thời. Đảm bảo Roblox đang mở.':'Make sure you use the correct Roblox version. Temporarily disable antivirus and ensure Roblox is open.',
        'Antivirus báo virus?':'Antivirus reports a virus?',
        'False positive — executor thường bị nhận nhầm. Thêm file vào whitelist.':'False positive — executors are often detected incorrectly. Add the file to the whitelist.',
        'Roblox bị crash sau khi inject?':'Roblox crashes after injection?',
        'Cập nhật executor lên bản mới nhất. Nếu vẫn lỗi, đổi executor khác.':'Update the executor to the latest version. If it still fails, try another executor.',
        'Có bị ban tài khoản không?':'Can the account be banned?',
        'Có thể. Khuyến nghị dùng tài khoản phụ (alt) để test script trước.':'Possibly. Consider using an alternate account to test scripts first.'
    };
    const richVi = Object.fromEntries(Object.entries(richMap).map(([vi,en]) => [en,vi]));
    rich.forEach(el => {
        const key = el.textContent.trim();
        if (currentLang === 'en' && richMap[key]) el.textContent = richMap[key];
        if (currentLang === 'vi' && richVi[key]) el.textContent = richVi[key];
    });

    const themeLabel = document.querySelector('[data-role="theme-label"]');
    if (themeLabel) themeLabel.textContent = currentLang === 'en' ? (document.documentElement.dataset.theme === 'dark' ? 'Dark' : 'Light') : (document.documentElement.dataset.theme === 'dark' ? 'Tối' : 'Sáng');

    // Fix dynamic title language for all card descriptions after toggle.
    cards.forEach(card => {
        const p = card.querySelector('h2 + p');
        if (!p) return;
        const key = p.textContent.trim();
        const en = STATIC_TRANSLATIONS[key];
        const vi = STATIC_REVERSE[key];
        if (currentLang === 'en' && en) p.textContent = en;
        if (currentLang === 'vi' && vi) p.textContent = vi;
    });
}

window.__refreshTimeAgo = () => {
    document.querySelectorAll('[data-role="updated"]').forEach(el => {
        const card = el.closest('.card[data-executor]');
        const dateStr = card?.dataset.updated;
        const textEl = el.querySelector('.updated-text');
        if (dateStr && textEl) {
            const result = getTimeAgo(dateStr);
            textEl.textContent = result.text;
            el.title = result.fullDate;
        }
    });
};
