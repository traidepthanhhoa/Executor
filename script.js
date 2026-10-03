const MAINTENANCE_MODE = {
  pro: true, client: false, nx: true, pc: false, px: false,
  pv: true, D32: true, solara: false, xeno: false
};

const DOWNLOADS = {
  pro: { url: 'https://vuotnhanh.com/dICD', filename: 'Delta-Pro-v3.245.1782.apk' },
  client: { url: 'https://vuotnhanh.com/j1tZ', filename: 'Delta-v2.735.1138.apk' },
  D32: { url: 'https://vuotnhanh.com/oJou', filename: 'Delta-32bit-v2.736.1408.apk' },
  nx: { url: 'https://vuotnhanh.com/TxPF', filename: 'Roblox-Lite-NX-v3.0.1.apk' },
  pc: { url: 'https://vuotnhanh.com/CEGE', filename: 'Executor-PC-Real-v1.7.0.zip' },
  px: { url: 'https://vuotnhanh.com/fXSZ', filename: 'Executor-PC-Madium-v1.5.0.zip' },
  pv: { url: 'https://vuotnhanh.com/zij1', filename: 'Executor-PC-Velocity-v1.6.0.zip' },
  solara: { url: 'https://4d38a1ec.solaraweb-alj.pages.dev/download/static/files/Bootstrapper.exe', filename: 'Solara-Bootstrapper.exe' },
  xeno: { url: 'https://xeno.now/', filename: 'Xeno-Executor.exe' }
};

const I18N = {
  vi: {
    title: 'NightByte • Halloween Executor Hub',
    subtitle: 'Kho tải Executor & Client • Giao diện Halloween 2026',
    guide: 'Hướng dẫn', themeDark: 'Tối', themeLight: 'Sáng',
    mobile: 'Mobile', real: 'Real', search: 'Tìm executor... (Delta, Solara, Xeno...)',
    empty: 'Không tìm thấy executor phù hợp 😢', maintenance: 'Bảo trì',
    online: 'Online', download: 'Download', calculating: 'Đang tính...',
    notice: 'Thông báo', welcome: 'Chào mừng đến NightByte 👻',
    discordText: 'Discord hỗ trợ & cộng đồng:',
    disclaimer: 'Executor chỉ dành cho mục đích nghiên cứu/tìm hiểu kỹ thuật. Người dùng tự chịu trách nhiệm về việc sử dụng và tuân thủ điều khoản của nền tảng.',
    hideNotice: 'Không hiển thị lại trong 2 giờ',
    guideTitle: 'Hướng dẫn cài đặt & sử dụng', close: 'Đóng', gotIt: 'Đã hiểu ✓',
    faq: 'Câu hỏi thường gặp',
    pcOnly: 'Chỉ hỗ trợ PC',
    footer: 'Không liên kết với Roblox Corporation.',
    updated: 'Cập nhật',
    tabsLabel: 'Chọn nền tảng', guideTabs: 'Chọn nền tảng hướng dẫn',
    heroLabelMobile: 'Executor cho Mobile', heroLabelPC: 'Executor cho PC',
    switchLang: 'Chuyển ngôn ngữ', switchTheme: 'Chuyển chế độ sáng/tối',
    noticeClose: 'Đóng thông báo', guideClose: 'Đóng hướng dẫn', backTop: 'Về đầu trang',
    installMobile: [
      ['Tải file APK', 'Nhấn <b>Download</b> trên executor bạn muốn. File sẽ được lưu vào thư mục <code>Downloads</code>.'],
      ['Cho phép cài đặt', 'Vào <code>Settings → Security → Install unknown apps</code> và cho phép Files hoặc Chrome cài APK.'],
      ['Cài đặt APK', 'Mở file vừa tải → nhấn <b>Install</b> → chờ quá trình cài đặt hoàn tất.'],
      ['Mở Roblox', 'Đăng nhập Roblox và vào game bạn muốn sử dụng.'],
      ['Mở Executor & Getkey', 'Mở executor → chọn <b>Getkey</b> nếu phiên bản yêu cầu key → hoàn tất bước xác thực.'],
      ['Execute', 'Copy script → paste vào editor → nhấn <b>Execute</b>.']
    ],
    installPC: [
      ['Tải ZIP/EXE', 'Nhấn <b>Download</b> trên card PC. File sẽ được lưu vào thư mục <code>Downloads</code>.'],
      ['Giải nén nếu cần', 'Nếu là ZIP, dùng công cụ giải nén của Windows hoặc 7-Zip để mở thư mục.'],
      ['Kiểm tra Windows Security', 'Chỉ chạy file bạn tin tưởng và kiểm tra nguồn tải trước khi mở.'],
      ['Mở Roblox', 'Mở Roblox và vào game bạn muốn sử dụng.'],
      ['Mở Executor', 'Khởi chạy executor PC và làm theo hướng dẫn riêng của phiên bản đó.'],
      ['Execute', 'Dán script vào editor và dùng nút <b>Execute</b> theo giao diện của executor.']
    ],
    faqItems: [
      ['Không attach/inject được?', 'Kiểm tra đúng phiên bản Roblox và executor, sau đó khởi động lại ứng dụng nếu cần.'],
      ['Windows Security cảnh báo?', 'Chỉ tiếp tục khi bạn đã kiểm tra nguồn file và hiểu rõ rủi ro của file tải về.'],
      ['Roblox bị crash?', 'Cập nhật Roblox/executor và thử lại. Nếu lỗi tiếp tục, ngừng sử dụng file không tương thích.'],
      ['Có thể bị khóa tài khoản?', 'Việc sử dụng công cụ bên thứ ba có thể vi phạm điều khoản của nền tảng.']
    ]
  },
  en: {
    title: 'NightByte • Halloween Executor Hub',
    subtitle: 'Executor & Client downloads • Halloween 2026 interface',
    guide: 'Guide', themeDark: 'Dark', themeLight: 'Light',
    mobile: 'Mobile', real: 'Real', search: 'Search executors... (Delta, Solara, Xeno...)',
    empty: 'No matching executor found 😢', maintenance: 'Maintenance',
    online: 'Online', download: 'Download', calculating: 'Calculating...',
    notice: 'Notice', welcome: 'Welcome to NightByte 👻',
    discordText: 'Discord support & community:',
    disclaimer: 'Executors are provided for research and technical learning only. Users are responsible for their use and for following the platform rules.',
    hideNotice: 'Hide again for 2 hours',
    guideTitle: 'Installation & Usage Guide', close: 'Close', gotIt: 'Got it ✓',
    faq: 'Frequently asked questions', pcOnly: 'PC only',
    footer: 'Not affiliated with Roblox Corporation.',
    updated: 'Updated', tabsLabel: 'Choose platform', guideTabs: 'Choose guide platform',
    heroLabelMobile: 'Mobile executors', heroLabelPC: 'PC executors',
    switchLang: 'Switch language', switchTheme: 'Switch light/dark mode',
    noticeClose: 'Close notice', guideClose: 'Close guide', backTop: 'Back to top',
    installMobile: [
      ['Download APK', 'Click <b>Download</b> on the executor you want. The file will be saved to <code>Downloads</code>.'],
      ['Allow installation', 'Open <code>Settings → Security → Install unknown apps</code> and allow Files or Chrome to install APKs.'],
      ['Install the APK', 'Open the downloaded file → tap <b>Install</b> → wait for installation to finish.'],
      ['Open Roblox', 'Sign in to Roblox and join the game you want to use.'],
      ['Open Executor & Getkey', 'Open the executor → choose <b>Getkey</b> if the version requires a key → complete verification.'],
      ['Execute', 'Copy the script → paste it into the editor → press <b>Execute</b>.']
    ],
    installPC: [
      ['Download ZIP/EXE', 'Click <b>Download</b> on the PC card. The file will be saved to <code>Downloads</code>.'],
      ['Extract if needed', 'If it is a ZIP, use Windows extraction or 7-Zip to open the folder.'],
      ['Check Windows Security', 'Only run files you trust and verify the download source before opening them.'],
      ['Open Roblox', 'Open Roblox and join the game you want to use.'],
      ['Open the Executor', 'Launch the PC executor and follow the instructions for that version.'],
      ['Execute', 'Paste the script into the editor and use <b>Execute</b> according to the executor UI.']
    ],
    faqItems: [
      ['Cannot attach/inject?', 'Check that Roblox and the executor versions match, then restart the apps if needed.'],
      ['Windows Security warning?', 'Continue only after checking the file source and understanding the risks of downloaded files.'],
      ['Roblox crashes?', 'Update Roblox/the executor and try again. If the issue continues, stop using an incompatible file.'],
      ['Can an account be banned?', 'Using third-party tools may violate platform terms.']
    ]
  }
};

let currentLang = localStorage.getItem('language') || 'vi';

function $(selector, root = document) { return root.querySelector(selector); }
function $$(selector, root = document) { return [...root.querySelectorAll(selector)]; }
function t(key) { return I18N[currentLang][key] ?? key; }

function initTheme() {
  const toggle = $('#themeToggle');
  const saved = localStorage.getItem('theme');
  const initial = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(initial, false);
  toggle?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  });
}
function applyTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  if (persist) localStorage.setItem('theme', theme);
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#10070f' : '#fff8f1';
  const label = $('[data-role="theme-label"]');
  if (label) label.textContent = theme === 'dark' ? t('themeDark') : t('themeLight');
  $('#themeToggle')?.setAttribute('aria-label', t('switchTheme'));
}

function initLanguage() {
  $('#langToggle')?.addEventListener('click', () => {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    localStorage.setItem('language', currentLang);
    applyLanguage();
    refreshTimeAgo();
  });
  applyLanguage();
}

function renderGuideList(selector, items) {
  const list = $(selector);
  if (!list) return;
  list.innerHTML = items.map((item, i) => `<li><span class="step-num">${i + 1}</span><div class="step-body"><strong>${item[0]}</strong><p>${item[1]}</p></div></li>`).join('');
}
function renderFaq() {
  const list = $('#faqList');
  if (!list) return;
  list.innerHTML = t('faqItems').map(item => `<div class="faq-item"><strong>${item[0]}</strong><p>${item[1]}</p></div>`).join('');
}
function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.documentElement.dataset.language = currentLang;
  const langLabel = $('[data-role="lang-label"]');
  if (langLabel) langLabel.textContent = currentLang.toUpperCase();
  const setText = (sel, value) => { const el = $(sel); if (el) el.textContent = value; };
  setText('#siteSubtitle', t('subtitle'));
  setText('#guideOpen span', t('guide'));
  setText('#tab-mobile-btn .tab-text', t('mobile'));
  setText('#tab-pc-btn .tab-text', t('real'));
  setText('#languageHint', currentLang === 'vi' ? '🇻🇳 Tiếng Việt • 🇬🇧 English' : '🇻🇳 Vietnamese • 🇬🇧 English');
  const input = $('#searchInput'); if (input) input.placeholder = t('search');
  setText('#searchEmpty', t('empty'));
  setText('#notifTitle', t('notice')); setText('.notif-welcome', t('welcome'));
  setText('#notifDiscordText', t('discordText')); setText('#notifDisclaimer', t('disclaimer')); setText('#notifHide', t('hideNotice'));
  setText('#guideTitle', t('guideTitle')); setText('#guideOk', t('gotIt')); setText('#faqLabel', `❓ ${t('faq')}`);
  setText('#guide-mobile-btn .guide-tab-text', t('mobile')); setText('#guide-pc-btn .guide-tab-text', t('real'));
  setText('#footerDisclaimer', t('footer'));
  $('#guide-mobile-btn')?.setAttribute('aria-label', `${t('mobile')} guide`);
  $('#guide-pc-btn')?.setAttribute('aria-label', `${t('real')} guide`);
  $('#tab-mobile-btn')?.setAttribute('aria-label', t('mobile'));
  $('#tab-pc-btn')?.setAttribute('aria-label', t('real'));
  $('#guideOpen')?.setAttribute('aria-label', t('guide'));
  $('#guideClose')?.setAttribute('aria-label', t('guideClose'));
  $('#notifClose')?.setAttribute('aria-label', t('noticeClose'));
  $('#backToTop')?.setAttribute('aria-label', t('backTop'));
  $$('.maintenance-badge').forEach(el => el.textContent = `🔧 ${t('maintenance')}`);
  $$('.status-text').forEach(el => el.textContent = t('online'));
  $$('.pc-icon').forEach(el => el.setAttribute('aria-label', t('pcOnly')));
  $$('.card-description').forEach(el => el.textContent = el.dataset[currentLang] || el.dataset.vi || '');
  renderGuideList('#mobileSteps', t('installMobile'));
  renderGuideList('#pcSteps', t('installPC'));
  renderFaq();
  applyTheme(document.documentElement.dataset.theme || 'dark', false);
}

function initTabs() {
  $$('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    $$('.tab-btn').forEach(b => { const active = b === btn; b.classList.toggle('active', active); b.setAttribute('aria-selected', active); });
    $$('.tab-content').forEach(el => el.classList.toggle('active', el.id === `tab-${target}`));
    window.scrollTo({ top: Math.max(0, $('.content-shell')?.offsetTop - 20 || 0), behavior: 'smooth' });
  }));
}

let searchTimer = 0;
function initSearch() {
  const input = $('#searchInput'), clear = $('#searchClear'), empty = $('#searchEmpty');
  if (!input) return;
  const run = () => {
    const query = input.value.trim().toLowerCase();
    const activeTab = $('.tab-content.active');
    const cards = $$('.card', activeTab || document);
    let visible = 0;
    cards.forEach(card => {
      const hay = `${card.dataset.name || ''} ${card.textContent}`.toLowerCase();
      const show = !query || hay.includes(query);
      card.hidden = !show;
      if (show) visible++;
    });
    if (clear) clear.hidden = !query;
    if (empty) empty.hidden = visible !== 0;
  };
  input.addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(run, 60); });
  clear?.addEventListener('click', () => { input.value = ''; input.focus(); run(); });
}

function initDownloadButtons() {
  $$('.card [data-role="download"]').forEach(btn => btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const key = card?.dataset.executor;
    const item = DOWNLOADS[key];
    if (!item || MAINTENANCE_MODE[key]) return;
    btn.disabled = true;
    btn.classList.add('is-loading');
    const old = btn.textContent;
    btn.textContent = '...';
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = item.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.download = item.filename;
      document.body.appendChild(a); a.click(); a.remove();
      btn.disabled = false; btn.classList.remove('is-loading'); btn.textContent = old;
    }, 220);
  }));
}

function applyMaintenanceMode() {
  $$('.card[data-executor]').forEach(card => {
    const key = card.dataset.executor;
    const maintenance = !!MAINTENANCE_MODE[key];
    card.classList.toggle('is-maintenance', maintenance);
    const badge = $('[data-role="badge"]', card), btn = $('[data-role="download"]', card);
    if (badge) badge.hidden = !maintenance;
    if (btn) { btn.disabled = maintenance; btn.classList.toggle('disabled', maintenance); }
  });
}

function refreshTimeAgo() {
  $$('.card-updated').forEach(el => {
    const card = el.closest('.card');
    const date = card?.dataset.updated;
    const target = $('.updated-text', el);
    if (!date || !target) return;
    const past = new Date(`${date}T00:00:00`);
    const days = Math.max(0, Math.floor((Date.now() - past.getTime()) / 86400000));
    const text = currentLang === 'en'
      ? `${t('updated')} ${days === 0 ? 'today' : days === 1 ? '1 day ago' : `${days} days ago`}`
      : `${t('updated')} ${days === 0 ? 'hôm nay' : days === 1 ? '1 ngày trước' : `${days} ngày trước`}`;
    target.textContent = text;
    el.title = past.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'vi-VN');
  });
}

function initGuide() {
  const overlay = $('#guideOverlay');
  $('#guideOpen')?.addEventListener('click', () => overlay?.classList.add('show'));
  $('#guideClose')?.addEventListener('click', () => overlay?.classList.remove('show'));
  $('#guideOk')?.addEventListener('click', () => overlay?.classList.remove('show'));
  overlay?.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('show'); });
  $$('.guide-tab').forEach(tab => tab.addEventListener('click', () => {
    const target = tab.dataset.guideTab;
    $$('.guide-tab').forEach(t => { const active = t === tab; t.classList.toggle('active', active); t.setAttribute('aria-selected', active); });
    $$('.guide-content').forEach(c => c.classList.toggle('active', c.id === `guide-${target}`));
  }));
  $('#faqToggle')?.addEventListener('click', () => {
    const expanded = $('#faqToggle').getAttribute('aria-expanded') === 'true';
    $('#faqToggle').setAttribute('aria-expanded', !expanded);
    $('#faqList').hidden = expanded;
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay?.classList.remove('show'); });
}

function initNotice() {
  const overlay = $('#notifOverlay');
  const hiddenUntil = Number(localStorage.getItem('nightbyte_notice_until') || 0);
  if (Date.now() < hiddenUntil) return;
  setTimeout(() => overlay?.classList.add('show'), 500);
  $('#notifClose')?.addEventListener('click', () => overlay?.classList.remove('show'));
  $('#notifHide')?.addEventListener('click', () => {
    localStorage.setItem('nightbyte_notice_until', String(Date.now() + 2 * 60 * 60 * 1000));
    overlay?.classList.remove('show');
  });
  overlay?.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('show'); });
}

function initLoader() {
  const loader = $('#loader');
  if (!loader) return;
  const bar = $('#loader-bar'), pct = $('#percentage');
  let start = performance.now();
  const duration = 650;
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    if (bar) bar.style.width = `${p * 100}%`;
    if (pct) pct.textContent = `${Math.round(p * 100)}%`;
    if (p < 1) requestAnimationFrame(tick); else { loader.classList.add('hidden'); applyMaintenanceMode(); }
  }
  requestAnimationFrame(tick);
}

function initScrollUI() {
  const fill = $('#readingProgressFill'), top = $('#backToTop');
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (fill) fill.style.width = `${max > 0 ? Math.min(100, scrollY / max * 100) : 0}%`;
    top?.classList.toggle('show', scrollY > 420);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  top?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  update();
}

addEventListener('DOMContentLoaded', () => {
  initTheme(); initLanguage(); initLoader(); initTabs(); initSearch(); initDownloadButtons();
  initGuide(); initNotice(); initScrollUI(); applyMaintenanceMode(); refreshTimeAgo();
});
