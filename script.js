// ============================================================
// CẤU HÌNH BẢO TRÌ
// ============================================================
const MAINTENANCE_MODE = {
    client: false,
    nx: true,
    pc: false,
    px: false,
    pv: false,
    D32: false,
    solara: false,
    xeno: false,
    umi: false,
    volcano: false,
    nam: false,       
    nexomia: false    
};

// ============================================================
// CẤU HÌNH DOWNLOAD
// ============================================================
const DOWNLOADS = {
    client:  { url: 'https://vuotnhanh.com/BBDK', filename: 'Delta-v2.735.1138.apk' },
    D32:     { url: 'https://vuotnhanh.com/olXP', filename: 'Delta-32bit-v2.736.1408.apk' },
    nx:      { url: 'https://vuotnhanh.com/TxPF', filename: 'Roblox-Lite-NX-v3.0.1.apk' },
    pc:      { url: 'https://vuotnhanh.com/CEGE', filename: 'Executor-PC-Real-v1.7.0.zip' },
    px:      { url: 'https://vuotnhanh.com/fXSZ', filename: 'Executor-PC-Medium-v1.5.0.zip' },
    pv:      { url: 'https://vuotnhanh.com/zij1', filename: 'Executor-PC-Velocity-v1.6.0.zip' },
    solara:  {
        url: 'https://4d38a1ec.solaraweb-alj.pages.dev/download/static/files/Bootstrapper.exe',
        filename: 'Solara-Bootstrapper.exe'
    },
    xeno:    { url: 'https://xeno.now/', filename: 'Xeno-Executor.exe' },
    umi:     { url: 'https://vuotnhanh.com/OSj9', filename: 'Umi-Executor.exe' },
    volcano: { url: 'https://vuotnhanh.com/YANb', filename: 'Volcano-Executor.exe'},
    nam:     { url: 'https://vuotnhanh.com/U0US', filename: 'Nam-Executor.exe' },
    nexomia: { url: 'https://vuotnhanh.com/Krls', filename: 'Nexomia-Executor.exe' }
};

// ============================================================
// CẤU HÌNH THÔNG BÁO, THEME, VERIFY
// ============================================================
const NOTIFICATION_CONFIG = { enabled: true, hideDurationMs: 2 * 60 * 60 * 1000, storageKey: 'matchat_notif_hide_until', delayAfterLoader: 300 };
const THEME_CONFIG = { storageKey: 'theme', labels: { dark: 'Dark', light: 'Light' } };
const VERIFY_CONFIG = { storageKey: 'matchat_verified_until', verifyPage: 'verify.html', webUrl: 'https://kenhmatchat-executor.vercel.app/' };
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// VERIFY CHECK
(function checkVerify() {
    const verifiedUntil = parseInt(localStorage.getItem(VERIFY_CONFIG.storageKey) || '0', 10);
    if (Date.now() >= verifiedUntil) {
        window.location.replace(VERIFY_CONFIG.verifyPage);
        return;
    }
})();

// BOOTSTRAP
document.addEventListener('DOMContentLoaded', () => {
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
    initCookie();
    initInfoModal();
    init3DTilt();
    initRippleEffect();
    initCardStagger();
    initTopProgress();
});

// 1️⃣ THEME
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const label = document.querySelector('[data-role="theme-label"]');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (label) label.textContent = THEME_CONFIG.labels[currentTheme] || 'Dark';

    if (!toggle) return;
    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(THEME_CONFIG.storageKey, next);
        if (label) label.textContent = THEME_CONFIG.labels[next];
    });
}

// 2️⃣ LOADER
function initLoader() {
    const loader = document.getElementById('loader');
    const percentage = document.getElementById('percentage');
    const loaderBar = document.getElementById('loader-bar');
    if (!loader || !percentage || !loaderBar) {
        if (loader) loader.classList.add('hidden');
        onLoaderDone();
        return;
    }
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) progress = 100;
        percentage.textContent = Math.floor(progress) + '%';
        loaderBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                onLoaderDone();
            }, 400);
        }
    }, 100);
}
function onLoaderDone() {
    applyMaintenanceMode();
    window.dispatchEvent(new CustomEvent('loader:done'));
}

// 3️⃣ TABS
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = { mobile: document.getElementById('tab-mobile'), pc: document.getElementById('tab-pc') };
    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            if (!targetTab || !tabContents[targetTab]) return;
            tabBtns.forEach((b) => {
                b.classList.toggle('active', b === btn);
                b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
            });
            Object.entries(tabContents).forEach(([key, el]) => {
                if (el) el.classList.toggle('active', key === targetTab);
            });
        });
    });
}

// 4️⃣ SEARCH
function initSearch() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('searchClear');
    const emptyMsg = document.getElementById('searchEmpty');
    if (!input) return;
    const cards = document.querySelectorAll('.card[data-executor]');

    const performSearch = () => {
        const query = (input.value || '').toLowerCase().trim();
        let visibleCount = 0;
        cards.forEach((card) => {
            const text = card.textContent.toLowerCase();
            const match = !query || text.includes(query);
            card.classList.toggle('hidden', !match);
            if (match) visibleCount++;
        });
        if (emptyMsg) emptyMsg.hidden = (visibleCount > 0 || !query);
        if (clearBtn) clearBtn.hidden = !query;
    };

    input.addEventListener('input', performSearch);
    if (clearBtn) clearBtn.addEventListener('click', () => { input.value = ''; performSearch(); });
    performSearch();
}

// 5️⃣ MAINTENANCE MODE
function applyMaintenanceMode() {
    const cards = document.querySelectorAll('.card[data-executor]');
    cards.forEach((card) => {
        const key = card.dataset.executor;
        if (!key) return;
        const btn = card.querySelector('[data-role="download"]');
        const badge = card.querySelector('[data-role="badge"]');
        const dot = card.querySelector('.dot');
        const statusText = card.querySelector('.status-text');
        if (!btn) return;
        const isMaintenance = Boolean(MAINTENANCE_MODE[key]);
        btn.classList.toggle('btn-maintenance', isMaintenance);
        btn.textContent = isMaintenance ? '⛔ Đang bảo trì' : 'Download';
        btn.disabled = isMaintenance;
        if (badge) badge.style.display = isMaintenance ? 'inline-block' : 'none';
        if (dot) {
            dot.classList.toggle('online-dot', !isMaintenance);
            dot.classList.toggle('maintenance-dot', isMaintenance);
        }
        if (statusText) statusText.textContent = isMaintenance ? 'Bảo trì' : 'Online';
    });
}

// 6️⃣ DOWNLOAD
function initDownloadButtons() {
    document.querySelectorAll('[data-role="download"]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card[data-executor]');
            const key = card?.dataset.executor;
            if (key && !MAINTENANCE_MODE[key]) handleDownload(key, btn);
        });
    });
}

async function handleDownload(key, btn) {
    const cfg = DOWNLOADS[key];
    if (!cfg) return;
    const originalText = btn.textContent;
    btn.disabled = true;
    for (let i = 3; i > 0; i--) {
        btn.textContent = `Chờ ${i}s...`;
        await sleep(1000);
    }
    btn.textContent = 'Đang tải...';
    await sleep(500);
    
    const link = document.createElement('a');
    link.href = cfg.url;
    link.download = cfg.filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    btn.textContent = 'Tải thành công!';
    btn.style.background = 'var(--green)';
    btn.style.color = '#000';
    showToast('Đang tải file...', 'success');
    await sleep(2000);
    
    btn.textContent = originalText;
    btn.disabled = false;
    btn.style.background = '';
    btn.style.color = '';
}

// 7️⃣ TOAST
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 8️⃣ NOTIFICATION
function initNotification() {
    window.addEventListener('loader:done', () => {
        setTimeout(showNotificationIfNeeded, NOTIFICATION_CONFIG.delayAfterLoader);
    });
}
function showNotificationIfNeeded() {
    if (!NOTIFICATION_CONFIG.enabled) return;
    const overlay = document.getElementById('notifOverlay');
    if (!overlay) return;
    const until = parseInt(localStorage.getItem(NOTIFICATION_CONFIG.storageKey) || '0', 10);
    if (Date.now() < until) return;
    
    overlay.classList.add('show');
    const close = () => overlay.classList.remove('show');
    
    document.getElementById('notifClose').onclick = close;
    document.getElementById('notifHide').onclick = () => {
        localStorage.setItem(NOTIFICATION_CONFIG.storageKey, String(Date.now() + NOTIFICATION_CONFIG.hideDurationMs));
        close();
    };
}

// 9️⃣ GUIDE
function initGuide() {
    const openBtn = document.getElementById('guideOpen');
    const overlay = document.getElementById('guideOverlay');
    if (!openBtn || !overlay) return;
    
    openBtn.addEventListener('click', () => overlay.classList.add('show'));
    document.getElementById('guideClose').onclick = () => overlay.classList.remove('show');
    document.getElementById('guideOk').onclick = () => overlay.classList.remove('show');
    
    const tabs = document.querySelectorAll('.guide-tab');
    const contents = { mobile: document.getElementById('guide-mobile'), pc: document.getElementById('guide-pc') };
    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            Object.entries(contents).forEach(([k, el]) => {
                if (el) el.classList.toggle('active', k === tab.dataset.guideTab);
            });
        };
    });
}

// 🔟 BACK TO TOP & PROGRESS
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initReadingProgress() {
    const fill = document.getElementById('readingProgressFill');
    const backTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (fill) fill.style.width = percent + '%';
        if (backTop) backTop.classList.toggle('show', scrollTop > 400);
    });
}

function initTopProgress() {
    const fill = document.getElementById('topProgressFill');
    if (!fill) return;
    let p = 0;
    const int = setInterval(() => {
        p += Math.random() * 20;
        if (p >= 100) {
            p = 100; fill.style.width = '100%';
            clearInterval(int);
            setTimeout(() => { fill.style.opacity = '0'; }, 500);
        } else fill.style.width = p + '%';
    }, 100);
}

// 📅 TIME AGO
function initTimeAgo() {
    document.querySelectorAll('[data-role="updated"]').forEach(el => {
        const card = el.closest('.card[data-executor]');
        if (!card || !card.dataset.updated) return;
        const d = new Date(card.dataset.updated);
        const textEl = el.querySelector('.updated-text');
        if (textEl) textEl.textContent = 'Cập nhật ' + d.toLocaleDateString('vi-VN');
    });
}

// 💬 DISCORD FLOAT, COOKIE, INFO
function initDiscordFloat() {
    const overlayIds = ['notifOverlay', 'guideOverlay', 'infoOverlay'];
    const updateModalState = () => {
        const anyOpen = overlayIds.some(id => document.getElementById(id)?.classList.contains('show'));
        document.body.classList.toggle('modal-open', anyOpen);
    };
    overlayIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) new MutationObserver(updateModalState).observe(el, { attributes: true, attributeFilter: ['class'] });
    });
}

function initCookie() {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    if (!localStorage.getItem('cookie_accepted')) setTimeout(() => banner.hidden = false, 2000);
    document.getElementById('cookieAccept').onclick = () => { localStorage.setItem('cookie_accepted', '1'); banner.hidden = true; };
    document.getElementById('cookieDecline').onclick = () => { localStorage.setItem('cookie_accepted', '0'); banner.hidden = true; };
}

function initInfoModal() {
    const overlay = document.getElementById('infoOverlay');
    if (!overlay) return;
    document.querySelectorAll('[data-info]').forEach(btn => {
        btn.onclick = () => {
            document.getElementById('infoTitle').textContent = btn.textContent;
            document.getElementById('infoBody').innerHTML = `<p>Nội dung cho mục <b>${btn.textContent}</b> đang được cập nhật...</p>`;
            overlay.classList.add('show');
        };
    });
    document.getElementById('infoClose').onclick = () => overlay.classList.remove('show');
    overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove('show'); };
}

// 🎬 ANIMATIONS (Basic)
function init3DTilt() {
    if (window.matchMedia('(max-width: 900px)').matches) return;
    document.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.card[data-executor]');
        if (!card || card.classList.contains('roblox-pc-panel')) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(1000px) rotateX(${-y / 30}deg) rotateY(${x / 30}deg) translateY(-5px)`;
    });
    document.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.card[data-executor]');
        if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
    });
}

function initRippleEffect() {} // Bỏ qua để code gọn
function initCardStagger() {} // Bỏ qua để code gọn

// GLOBAL ERROR
window.addEventListener('error', (e) => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
});
