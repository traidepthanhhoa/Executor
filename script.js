// ============================================================
// CẤU HÌNH BẢO TRÌ
// ============================================================
const MAINTENANCE_MODE = {
    client: false,
    nx: true,
    pc: false,
    px: false,
    pv: true,
    D32: false,
    solara: false,
    xeno: false,
    umi: false,
    volcano: false,
    nam: true,
    nexomia: true,
    supq: false,     // ← NEW
    zynova: false,   // ← NEW
    saiko: false,    // ← NEW
    vortex: false,   // ← NEW
    yubx: false      // ← NEW
};

// ============================================================
// CẤU HÌNH DOWNLOAD
// ============================================================
const DOWNLOADS = {
    client:  { url: 'https://vuotnhanh.com/8LD8', filename: 'Delta-v2.735.1138.apk' },
    D32:     { url: 'https://vuotnhanh.com/Lla1', filename: 'Delta-32bit-v2.736.1408.apk' },
    nx:      { url: 'https://vuotnhanh.com/TxPF', filename: 'Roblox-Lite-NX-v3.0.1.apk' },
    pc:      { url: 'https://vuotnhanh.com/CEGE', filename: 'Executor-PC-Real-v1.7.0.zip' },
    px:      { url: 'https://vuotnhanh.com/fXSZ', filename: 'Executor-PC-Medium-v1.5.0.zip' },
    pv:      { url: 'https://vuotnhanh.com/zij1', filename: 'Executor-PC-Velocity-v1.6.0.zip' },
    solara:  {
        url: 'https://4d38a1ec.solaraweb-alj.pages.dev/download/static/files/Bootstrapper.exe',
        filename: 'Solara-Bootstrapper.exe'
    },
    xeno:    { url: 'https://xeno.now/', filename: 'Xeno-Executor.exe' },
    umi:     { url: 'https://vuotnhanh.com/Ypmy', filename: 'Umi-Executor.exe' },
    volcano: { url: 'https://vuotnhanh.com/YANb', filename: 'Volcano-Executor.exe' },
    nam:     { url: 'https://vuotnhanh.com/U0US', filename: 'Nam-Executor.exe' },
    nexomia: { url: 'https://vuotnhanh.com/Krls', filename: 'Nexomia-Executor.exe' },
    // ↓↓↓ NEW ↓↓↓
    supq:    { url: 'https://vuotnhanh.com/79TH', filename: 'supQ-Executor.exe' },
    zynova:  { url: 'https://vuotnhanh.com/rhN3', filename: 'Zynova-Executor.exe' },
    saiko:   { url: 'https://vuotnhanh.com/bZGB', filename: 'Saiko-Executor.exe' },
    vortex:  { url: 'https://link4m.net/m605D',   filename: 'Vortex-Executor.exe' },
    yubx:    { url: 'https://vuotnhanh.com/F44n', filename: 'Yub-X-Executor.exe' }
};

// ============================================================
// CẤU HÌNH THEME, VERIFY
// ============================================================
const THEME_CONFIG = { storageKey: 'theme', labels: { dark: 'Dark', light: 'Light' } };
const VERIFY_CONFIG = { storageKey: 'matchat_verified_until', verifyPage: 'verify.html', webUrl: 'https://kenhmatchat-executor.vercel.app/' };
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================
// VERIFY CHECK (an toàn, tránh loop)
// ============================================================
(function checkVerify() {
    try {
        const currentPath = window.location.pathname;
        if (currentPath.includes('verify')) return;
        // Tránh redirect loop: nếu đã thử trong session này thì bỏ qua
        if (sessionStorage.getItem('verify_redirect') === '1') return;

        const verifiedUntil = parseInt(localStorage.getItem(VERIFY_CONFIG.storageKey) || '0', 10);
        if (Date.now() >= verifiedUntil) {
            sessionStorage.setItem('verify_redirect', '1');
            window.location.replace(VERIFY_CONFIG.verifyPage);
        }
    } catch (e) {
        console.warn('Verify check skipped:', e);
    }
})();

// ============================================================
// BOOTSTRAP
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLoader();
    initTabs();
    initSearch();
    initDownloadButtons();
    initGamePassPopup();
    initGuide();
    initBackToTop();
    initReadingProgress();
    initTimeAgo();
    initDiscordFloat();
    initCookie();
    initInfoModal();
    init3DTilt();
    initTopProgress();
});

// ============================================================
// 1️⃣ THEME
// ============================================================
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
        try { localStorage.setItem(THEME_CONFIG.storageKey, next); } catch (e) {}
        if (label) label.textContent = THEME_CONFIG.labels[next];
    });

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            toggle.click();
        }
    });
}

// ============================================================
// 2️⃣ LOADER
// ============================================================
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

// ============================================================
// 3️⃣ TABS
// ============================================================
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
            const searchInput = document.getElementById('searchInput');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }
        });
    });
}

// ============================================================
// 4️⃣ SEARCH (fix: filter theo data-name/data-executor)
// ============================================================
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
            const name = (card.dataset.name || '').toLowerCase();
            const key = (card.dataset.executor || '').toLowerCase();
            const match = !query || name.includes(query) || key.includes(query);
            card.classList.toggle('hidden', !match);
            if (match) visibleCount++;
        });
        if (emptyMsg) emptyMsg.hidden = (visibleCount > 0 || !query);
        if (clearBtn) clearBtn.hidden = !query;
    };

    input.addEventListener('input', performSearch);
    if (clearBtn) clearBtn.addEventListener('click', () => { input.value = ''; performSearch(); input.focus(); });
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

// ============================================================
// 6️⃣ DOWNLOAD
// ============================================================
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
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
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

// ============================================================
// 7️⃣ TOAST
// ============================================================
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

// ============================================================
// 8️⃣ POPUP QUẢNG CÁO
// ============================================================
function initGamePassPopup() {
    var DANH_SACH_ANH = [
        "https://i.postimg.cc/FkYFc3BN/Quang-cao-Game-Pass-Nhan-Doi-May-Man-(1).png",
        "https://i.postimg.cc/XXPYW1rF/Quang-cao-Game-Pass-Nhan-Doi-May-Man-(2).png"
    ];

    var DOI_ANH_MS = 2500;
    var HIEN_SAU_MS = 1000;
    var NHO_DONG = true;

    var nen = document.getElementById("qcNen");
    var anh = document.getElementById("qcAnh");
    var nutDong = document.getElementById("qcDong");

    if (!nen || !anh || !nutDong) return;

    var timer = null;
    var i = 0;
    var daDong = false;

    try {
        daDong = NHO_DONG && sessionStorage.getItem("daDongQC") === "1";
    } catch (e) {}

    // Preload ảnh
    DANH_SACH_ANH.forEach(function (url) {
        var img = new Image();
        img.src = url;
    });

    function doiAnh() {
        i = (i + 1) % DANH_SACH_ANH.length;
        anh.src = DANH_SACH_ANH[i];
    }

    function dong() {
        nen.classList.remove("hien");
        nen.setAttribute("aria-hidden", "true");
        clearInterval(timer);
        timer = null;
        if (NHO_DONG) {
            try {
                sessionStorage.setItem("daDongQC", "1");
            } catch (e) {}
        }
    }

    if (!daDong) {
        setTimeout(function () {
            anh.src = DANH_SACH_ANH[0];
            nen.classList.add("hien");
            nen.setAttribute("aria-hidden", "false");
            timer = setInterval(doiAnh, DOI_ANH_MS);
        }, HIEN_SAU_MS);
    }

    nutDong.addEventListener("click", dong);
    nen.addEventListener("click", function (e) {
        if (e.target === nen) dong();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nen.classList.contains("hien")) {
            dong();
        }
    });
}

// ============================================================
// 9️⃣ GUIDE
// ============================================================
function initGuide() {
    const openBtn = document.getElementById('guideOpen');
    const overlay = document.getElementById('guideOverlay');
    if (!openBtn || !overlay) return;

    openBtn.addEventListener('click', () => overlay.classList.add('show'));
    document.getElementById('guideClose').onclick = () => overlay.classList.remove('show');
    document.getElementById('guideOk').onclick = () => overlay.classList.remove('show');

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('show');
    });

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

    const faqToggle = document.getElementById('faqToggle');
    const faqList = document.getElementById('faqList');
    if (faqToggle && faqList) {
        faqToggle.addEventListener('click', () => {
            const isExpanded = faqToggle.getAttribute('aria-expanded') === 'true';
            faqToggle.setAttribute('aria-expanded', String(!isExpanded));
        });
    }
}

// ============================================================
// 🔟 BACK TO TOP & PROGRESS
// ============================================================
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
        p += Math.max(5, Math.random() * 20); // luôn tăng tối thiểu 5%
        if (p >= 100) {
            p = 100;
            fill.style.width = '100%';
            clearInterval(int);
            setTimeout(() => { fill.style.opacity = '0'; }, 500);
        } else fill.style.width = p + '%';
    }, 100);
}

// ============================================================
// 📅 TIME AGO
// ============================================================
function initTimeAgo() {
    document.querySelectorAll('[data-role="updated"]').forEach(el => {
        const card = el.closest('.card[data-executor]');
        if (!card || !card.dataset.updated) return;
        const d = new Date(card.dataset.updated);
        const textEl = el.querySelector('.updated-text');
        if (textEl) textEl.textContent = 'Cập nhật ' + d.toLocaleDateString('vi-VN');
    });
}

// ============================================================
// 💬 DISCORD FLOAT, COOKIE, INFO
// ============================================================
function initDiscordFloat() {
    const overlayIds = ['guideOverlay', 'infoOverlay'];
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
    let accepted = null;
    try { accepted = localStorage.getItem('cookie_accepted'); } catch (e) {}
    if (accepted === null) setTimeout(() => banner.hidden = false, 2000);
    document.getElementById('cookieAccept').onclick = () => {
        try { localStorage.setItem('cookie_accepted', '1'); } catch (e) {}
        banner.hidden = true;
    };
    document.getElementById('cookieDecline').onclick = () => {
        try { localStorage.setItem('cookie_accepted', '0'); } catch (e) {}
        banner.hidden = true;
    };
}

function initInfoModal() {
    const overlay = document.getElementById('infoOverlay');
    if (!overlay) return;
    const INFO_CONTENT = {
        about: '<p>Trang web tổng hợp các executor Roblox miễn phí cho Mobile và PC, được cập nhật thường xuyên bởi Matchat67.</p>',
        terms: '<p>Sử dụng executor có thể vi phạm Điều khoản dịch vụ của Roblox. Người dùng tự chịu hoàn toàn trách nhiệm.</p>',
        privacy: '<p>Chúng tôi chỉ dùng localStorage/sessionStorage để ghi nhớ theme, trạng thái popup và cookie. Không thu thập dữ liệu cá nhân.</p>',
        legal: '<p>Trang web không liên kết với Roblox Corporation. Mọi file thực thi thuộc bản quyền của nhà phát triển tương ứng.</p>',
        contact: '<p>Liên hệ qua Discord: <a href="https://discord.gg/GrTCy2DHEX" target="_blank" rel="noopener">discord.gg/GrTCy2DHEX</a></p>'
    };
    document.querySelectorAll('[data-info]').forEach(btn => {
        btn.onclick = () => {
            const key = btn.dataset.info;
            document.getElementById('infoTitle').textContent = btn.textContent;
            document.getElementById('infoBody').innerHTML = INFO_CONTENT[key] || '<p>Đang cập nhật...</p>';
            overlay.classList.add('show');
        };
    });
    document.getElementById('infoClose').onclick = () => overlay.classList.remove('show');
    overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove('show'); };
}

// ============================================================
// 🎬 ANIMATIONS
// ============================================================
function init3DTilt() {
    if (window.matchMedia('(max-width: 900px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================
window.addEventListener('error', () => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    onLoaderDone(); // fix: đảm bảo maintenance mode vẫn áp dụng
});
