'use strict';
// config.json (bot Discord sửa): { "executors": { "<key>": { maintenance, url, filename, version, updated, sha256, virustotal } } }
const L = 'https://i.postimg.cc/';
const EXECUTORS = [
  { key: 'client', tab: 'mobile', group: 'client', name: 'Delta', title: 'Download Delta', desc: 'Tải phiên bản mới nhất.', version: '2.741.1062', updated: '2026-10-13', logo: L + '0bNDk5kX/1741705989265.webp' },
  { key: 'D32', tab: 'mobile', group: 'client', name: 'Delta Font Mine', title: 'Download Delta Font Mine', desc: 'Tải phiên bản font mine mới nhất.', version: '2.741.1062', updated: '2026-10-13', logo: L + '0bNDk5kX/1741705989265.webp' },
  { key: 'volcano', tab: 'pc', group: 'nx', name: 'Volcano Executor', desc: 'Fast execution · Multi-instance.', version: '1.0', updated: '2026-10-08', logo: L + 'Hr22Svkc/volcano.png' },
  { key: 'umi', tab: 'pc', group: 'pc', name: 'Umi Executor', desc: 'Fast execution · Multi-instance.', version: '1.0', updated: '2026-10-08', logo: L + 's1HCLK18/Thiet-ke-chua-co-ten.png' },
  { key: 'pc', tab: 'pc', group: 'pc', name: 'Executor Real', desc: 'Real Client', version: '1.7.0', updated: '2026-10-08', logo: L + 'LJRD3F24/logo.png' },
  { key: 'px', tab: 'pc', group: 'pc', name: 'Executor Medium', desc: 'Medium Client', version: '1.5.0', updated: '2026-10-11', logo: L + 'rzBQztH0/images-(2).jpg' },
  { key: 'pv', tab: 'pc', group: 'pc', name: 'Executor Velocity', desc: 'Velocity Client', version: '1.3.7', updated: '2026-10-08', logo: L + 'pm4D1NtV/velocity-logo.webp' },
  { key: 'solara', tab: 'pc', group: 'solara', name: 'Solara Executor', desc: 'Fast execution · Multi-instance.', version: '2.8.0', updated: '2026-10-08', logo: L + 'NKS1Phwr/images-(3).jpg' },
  { key: 'xeno', tab: 'pc', group: 'xeno', name: 'Xeno Executor', desc: 'Fast execution · Multi-instance.', version: '1.3.60', updated: '2026-10-08', logo: L + 'JDcZnGHS/images-(4).jpg' },
  { key: 'nam', tab: 'pc', group: 'pc', name: 'Nam Executor', desc: 'Fast execution · Multi-instance.', version: '1.0', updated: '2026-10-08', logo: L + 'PNJ1hrrp/c492f993-f771-4dcb-853c-a7fa133bb0ed.png' },
  { key: 'nexomia', tab: 'pc', group: 'pc', name: 'Nexomia Executor', desc: 'Fast execution · Multi-instance.', version: '1.0', updated: '2026-10-08', logo: L + 'YjTLH6PH/30527f3c-55cf-4eae-b8cb-9c5d1b5f661e.png' }
];
const CFG = {
  notif: { enabled: true, hideMs: 2 * 3600e3, key: 'matchat_notif_hide_until' },
  verify: { key: 'matchat_verified_until', page: 'verify.html' },
  themeKey: 'theme', cookieKey: 'matchat_cookie_accepted',
  allowedHosts: [] // ví dụ ['github.com','mediafire.com']; để trống = mọi https
};
const GUIDE = {
  mobile: [['Tải file APK', 'Nhấn nút Download executor bạn muốn.'], ['Cho phép cài đặt ngoài', 'Settings → Security → Install unknown apps'], ['Cài đặt APK', 'Mở file vừa tải → nhấn Install'], ['Mở Roblox', 'Đăng nhập Roblox và vào game'], ['Getkey (nếu có)', 'Mở app executor → nhấn Getkey'], ['Paste & Execute', 'Dán script → nhấn Execute']],
  pc: [['Tải file ZIP/EXE', 'Nhấn Download trên card PC'], ['Giải nén', 'Dùng 7-Zip hoặc WinRAR'], ['Kiểm tra file', 'So SHA-256 (nếu có) và quét VirusTotal trước khi chạy'], ['Mở Roblox', 'Vào game bất kỳ'], ['Attach & Execute', 'Chọn Roblox → dán script → Execute']]
};
const FAQ = [
  ['Executor không attach/inject được?', 'Kiểm tra executor có hỗ trợ đúng phiên bản Roblox hiện tại không, rồi chạy lại với quyền Administrator.'],
  ['Antivirus báo virus?', 'Executor hay bị cảnh báo, nhưng đây cũng là nơi mã độc dễ ẩn nấp. Đừng vội tắt antivirus: kiểm tra SHA-256 và VirusTotal trước.'],
  ['Roblox crash sau khi inject?', 'Cập nhật executor lên bản mới nhất.'],
  ['Có bị ban tài khoản không?', 'Có thể. Hãy dùng tài khoản phụ, không dùng tài khoản có Robux/vật phẩm giá trị.']
];
const INFO = {
  about: ['Giới thiệu', 'About Matchat67', '<h4>⚡ Matchat67 Executor</h4><p>Trang tổng hợp Executor &amp; Client Roblox, cập nhật theo từng bản phát hành.</p><h4>💬 Liên hệ</h4><p><a href="https://discord.gg/GrTCy2DHEX" target="_blank" rel="noopener noreferrer">discord.gg/GrTCy2DHEX</a></p>'],
  terms: ['Điều khoản', 'Terms of Service', '<p>Executor được cung cấp cho mục đích học tập và nghiên cứu.</p><ul><li>Không dùng cho mục đích gây hại hay bán lại.</li><li>Bạn chấp nhận rủi ro bị khóa tài khoản Roblox.</li><li>Chúng tôi không chịu trách nhiệm về thiệt hại phát sinh.</li></ul>'],
  privacy: ['Quyền riêng tư', 'Privacy Policy', '<p>Chỉ dùng localStorage để nhớ theme, lựa chọn cookie và trạng thái xác minh. Không thu thập email, mật khẩu hay thông tin cá nhân.</p>'],
  legal: ['Pháp lý', 'Legal Disclaimer', '<p><strong>Trang không liên kết với Roblox Corporation.</strong></p><p>Dùng executor có thể vi phạm <a href="https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use" target="_blank" rel="noopener noreferrer">Điều khoản Roblox</a>. File do bên thứ ba cung cấp, không đảm bảo an toàn tuyệt đối — hãy tự kiểm tra. Yêu cầu gỡ (DMCA): liên hệ Discord.</p>'],
  contact: ['Liên hệ', 'Contact Us', '<p>Discord: <a href="https://discord.gg/GrTCy2DHEX" target="_blank" rel="noopener noreferrer">discord.gg/GrTCy2DHEX</a></p><p>Email: <a href="mailto:kenhmatchat@gmail.com">kenhmatchat@gmail.com</a></p>']
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }
};
function el(tag, props = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (/^(data|aria)-/.test(k) || ['role', 'type', 'title'].includes(k)) e.setAttribute(k, v);
    else e[k] = v;
  }
  kids.forEach((c) => c != null && e.append(c));
  return e;
}
function safeUrl(u) {
  try {
    const x = new URL(u, location.href);
    if (x.protocol !== 'https:') return null;
    if (CFG.allowedHosts.length && !CFG.allowedHosts.some((h) => x.hostname === h || x.hostname.endsWith('.' + h))) return null;
    return x.href;
  } catch { return null; }
}

// Verify gate (chỉ là rào UX; muốn chặn thật phải kiểm tra phía server)
const verified = Date.now() < parseInt(store.get(CFG.verify.key) || '0', 10);
if (!verified) location.replace(CFG.verify.page);
else document.addEventListener('DOMContentLoaded', main);

const state = { items: [], tab: 'mobile' };

async function main() {
  initTheme(); initModals(); initTabs();
  const [ok] = await Promise.all([loadConfig(), sleep(400)]);
  renderCards(); initSearch(); initTimeAgo(); initMisc(); initTilt();
  $('#loader')?.classList.add('hidden');
  if (!ok) showToast('Không tải được config.json — dùng dữ liệu mặc định', 'info', 4000);
  setTimeout(showNotification, 300);
}

async function loadConfig() {
  state.items = EXECUTORS.map((e) => ({ ...e, maintenance: false, url: '', filename: '' }));
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 5000);
    const res = await fetch('config.json?t=' + Date.now(), { cache: 'no-store', signal: ctl.signal });
    clearTimeout(t);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = (await res.json()).executors || {};
    state.items.forEach((it) => {
      const c = data[it.key]; if (!c) return;
      it.maintenance = Boolean(c.maintenance);
      it.url = c.url || ''; it.filename = c.filename || '';
      ['version', 'updated', 'sha256', 'virustotal'].forEach((f) => { if (c[f]) it[f] = c[f]; });
    });
    return true;
  } catch (err) { console.error('[Config]', err); return false; }
}

function renderCards() {
  const panes = { mobile: $('#tab-mobile .hero'), pc: $('#tab-pc .hero') };
  state.items.forEach((it, i) => {
    const g = it.group;
    const infoCls = { nx: 'info-nx', client: 'info-client', solara: 'info-solara', xeno: 'info-xeno' }[g] || 'info-pc';
    const card = el('article', { class: `card card-${g}`, 'data-executor': it.key, 'data-name': it.name },
      el('h2', {},
        el('img', { class: 'executor-logo', src: encodeURI(it.logo), alt: it.name + ' logo', width: 28, height: 28, loading: 'lazy', decoding: 'async', referrerPolicy: 'no-referrer' }),
        it.title || it.name,
        it.tab === 'pc' ? el('span', { class: 'pc-icon', title: 'Chỉ hỗ trợ PC', text: '💻 PC' }) : null,
        el('span', { class: 'maintenance-badge', 'data-role': 'badge', text: '🔧 Bảo trì' })),
      el('p', { text: it.desc }),
      el('p', { class: 'card-updated', 'data-role': 'updated' }, el('span', { class: 'updated-text' })),
      el('button', { class: `btn ${g === 'client' ? 'btn-client' : 'btn-pc'}`, 'data-role': 'download', type: 'button' }),
      el('div', { class: `info ${infoCls}` },
        el('span', { text: 'Version: ' + it.version }),
        el('span', { 'data-role': 'status' }, 'Status: ', el('span', { class: 'dot' }), el('span', { class: 'status-text' }))));
    if (it.sha256) {
      const b = el('button', { class: 'sha-btn', type: 'button', title: 'Bấm để copy SHA-256', text: 'SHA-256: ' + it.sha256.slice(0, 12) + '…' });
      b.addEventListener('click', () => navigator.clipboard?.writeText(it.sha256).then(() => showToast('Đã copy SHA-256', 'success')));
      card.append(b);
    }
    const vt = safeUrl(it.virustotal);
    if (vt) card.append(el('a', { class: 'vt-link', href: vt, target: '_blank', rel: 'noopener noreferrer', text: 'VirusTotal ↗' }));
    card._item = it;
    $('[data-role="download"]', card).addEventListener('click', (e) => handleDownload(it, card, e.currentTarget));
    panes[it.tab].append(card);
    if (!reduceMotion) card.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: i * 70, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
    applyMaintenance(card);
  });
  updateBadges();
}

function applyMaintenance(card) {
  const it = card._item, m = it.maintenance || !safeUrl(it.url);
  const btn = $('[data-role="download"]', card);
  btn.classList.toggle('btn-maintenance', m);
  btn.textContent = m ? '⛔ Đang bảo trì' : 'Download';
  btn.disabled = m;
  $('[data-role="badge"]', card).style.display = m ? 'inline-block' : 'none';
  const dot = $('.dot', card);
  dot.classList.toggle('online-dot', !m); dot.classList.toggle('maintenance-dot', m);
  $('.status-text', card).textContent = m ? 'Bảo trì' : 'Online';
}

function updateBadges(counts) {
  ['mobile', 'pc'].forEach((t) => {
    const b = $(`[data-count="${t}"]`);
    if (b) b.textContent = counts ? counts[t] : state.items.filter((i) => i.tab === t).length;
  });
}

const downloading = new Set();
async function handleDownload(it, card, btn) {
  const url = safeUrl(it.url);
  if (it.maintenance || !url) return showToast('Executor này chưa có link tải', 'error');
  if (downloading.has(it.key)) return;
  downloading.add(it.key);
  const original = btn.textContent;
  btn.disabled = true;
  try {
    for (let i = 3; i > 0; i--) {
      btn.replaceChildren(el('span', { class: 'countdown-num', text: String(i) }));
      btn.classList.add('countdown-active');
      await sleep(1000);
      btn.classList.remove('countdown-active');
    }
    btn.textContent = 'Đang tải...';
    const a = el('a', { href: url, target: '_blank', rel: 'noopener noreferrer' });
    a.style.display = 'none';
    document.body.append(a); a.click(); a.remove();
    btn.textContent = '✓ Tải thành công!';
    btn.classList.add('success-anim');
    showToast(`Đang tải ${it.name}...`, 'success');
    await sleep(2200);
  } catch (err) {
    console.error(err);
    btn.textContent = 'Lỗi — thử lại';
    showToast(`Lỗi tải ${it.name}`, 'error');
    await sleep(2000);
  } finally {
    btn.classList.remove('success-anim', 'countdown-active');
    downloading.delete(it.key);
    applyMaintenance(card);
  }
}

function moveIndicator(btn) {
  const ind = $('#tabIndicator');
  if (ind && btn) { ind.style.left = btn.offsetLeft + 'px'; ind.style.width = btn.offsetWidth + 'px'; }
}
function switchTab(name) {
  state.tab = name;
  $$('.tab-btn').forEach((b) => {
    const on = b.dataset.tab === name;
    b.classList.toggle('active', on); b.setAttribute('aria-selected', String(on));
    if (on) moveIndicator(b);
  });
  ['mobile', 'pc'].forEach((t) => {
    const p = $('#tab-' + t);
    p.classList.toggle('active', t === name);
    if (t === name && !reduceMotion) { p.style.animation = 'none'; void p.offsetWidth; p.style.animation = 'tabSlideIn .4s cubic-bezier(.2,.8,.2,1)'; }
  });
}
function initTabs() {
  $$('.tab-btn').forEach((b) => b.addEventListener('click', () => switchTab(b.dataset.tab)));
  requestAnimationFrame(() => moveIndicator($('.tab-btn.active')));
  addEventListener('resize', () => moveIndicator($('.tab-btn.active')));
}

function initSearch() {
  const input = $('#searchInput'), clear = $('#searchClear'), empty = $('#searchEmpty');
  let timer;
  const run = () => {
    const q = input.value.toLowerCase().trim();
    const counts = { mobile: 0, pc: 0 };
    $$('.card[data-executor]').forEach((c) => {
      const hit = !q || c._item.name.toLowerCase().includes(q) || c._item.key.toLowerCase().includes(q);
      c.classList.toggle('hidden', !hit);
      if (hit) counts[c._item.tab]++;
    });
    updateBadges(counts);
    clear.hidden = !q;
    empty.hidden = !q || counts.mobile + counts.pc > 0;
    if (q && !counts[state.tab]) { const o = state.tab === 'pc' ? 'mobile' : 'pc'; if (counts[o]) switchTab(o); }
  };
  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(run, 120); });
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape') { input.value = ''; run(); } });
  clear.addEventListener('click', () => { input.value = ''; run(); input.focus(); });
  addEventListener('keydown', (e) => {
    if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
  });
}

function initTheme() {
  const label = $('[data-role="theme-label"]');
  const apply = (t) => {
    document.documentElement.dataset.theme = t;
    $$('meta[name="theme-color"]').forEach((m) => { m.removeAttribute('media'); m.content = t === 'dark' ? '#0a0a0a' : '#fbfbfd'; });
    if (label) label.textContent = t === 'dark' ? 'Dark' : 'Light';
  };
  apply(document.documentElement.dataset.theme || 'dark');
  const toggle = () => { const n = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; apply(n); store.set(CFG.themeKey, n); };
  $('#themeToggle')?.addEventListener('click', toggle);
  addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') { e.preventDefault(); toggle(); } });
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', (e) => { if (!store.get(CFG.themeKey)) apply(e.matches ? 'dark' : 'light'); });
}

// Modal: focus trap, trả focus, khóa scroll, Esc, click nền
const modalStack = [];
function openModal(overlay) {
  if (!overlay || overlay.classList.contains('show')) return;
  const opener = document.activeElement;
  overlay.classList.add('show'); overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open'); document.body.style.overflow = 'hidden';
  const focusables = () => $$('button,a[href]', overlay).filter((e) => !e.disabled && e.offsetParent !== null);
  focusables()[0]?.focus();
  const onKey = (e) => {
    if (e.key === 'Escape' && modalStack.at(-1) === overlay) return close();
    if (e.key !== 'Tab') return;
    const f = focusables(); if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  };
  const onClick = (e) => { if (e.target === overlay) close(); };
  function close() {
    overlay.classList.remove('show'); overlay.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', onKey); overlay.removeEventListener('click', onClick);
    modalStack.splice(modalStack.indexOf(overlay), 1);
    if (!modalStack.length) { document.body.classList.remove('modal-open'); document.body.style.overflow = ''; }
    opener?.focus?.();
  }
  modalStack.push(overlay);
  document.addEventListener('keydown', onKey); overlay.addEventListener('click', onClick);
  overlay._close = close;
}
const closeModal = (id) => $('#' + id)?._close?.();

function initModals() {
  ['mobile', 'pc'].forEach((p) => {
    const ol = $(`#guide-${p} .guide-steps`);
    GUIDE[p].forEach(([t, d], i) => ol.append(el('li', {}, el('span', { class: 'step-num', text: String(i + 1) }), el('div', { class: 'step-body' }, el('strong', { text: t }), el('p', { text: d })))));
  });
  const faq = $('#faqList');
  FAQ.forEach(([q, a]) => faq.append(el('div', { class: 'faq-item' }, el('strong', { text: q }), el('p', { text: a }))));
  $('#faqToggle').addEventListener('click', (e) => {
    const open = e.currentTarget.getAttribute('aria-expanded') !== 'true';
    e.currentTarget.setAttribute('aria-expanded', String(open)); faq.hidden = !open;
  });
  $$('.guide-tab').forEach((t) => t.addEventListener('click', () => {
    $$('.guide-tab').forEach((x) => { x.classList.toggle('active', x === t); x.setAttribute('aria-selected', String(x === t)); });
    $$('.guide-content').forEach((c) => c.classList.toggle('active', c.id === 'guide-' + t.dataset.guideTab));
  }));
  $('#guideOpen').addEventListener('click', () => openModal($('#guideOverlay')));
  ['guideClose', 'guideOk'].forEach((id) => $('#' + id).addEventListener('click', () => closeModal('guideOverlay')));
  $$('[data-info]').forEach((b) => b.addEventListener('click', () => {
    const [eyebrow, title, body] = INFO[b.dataset.info];
    $('#infoEyebrow').textContent = eyebrow; $('#infoTitle').textContent = title;
    $('#infoBody').innerHTML = body; // nội dung tĩnh do site tự định nghĩa
    openModal($('#infoOverlay'));
  }));
  $('#infoClose').addEventListener('click', () => closeModal('infoOverlay'));
  $('#notifClose').addEventListener('click', () => closeModal('notifOverlay'));
  $('#notifHide').addEventListener('click', () => { store.set(CFG.notif.key, String(Date.now() + CFG.notif.hideMs)); closeModal('notifOverlay'); });
}
function showNotification() {
  if (CFG.notif.enabled && Date.now() >= parseInt(store.get(CFG.notif.key) || '0', 10)) openModal($('#notifOverlay'));
}

function showToast(msg, type = 'info', ms = 3000) {
  const box = $('#toastContainer'); if (!box) return;
  const t = el('div', { class: 'toast ' + type, role: 'status' }, el('span', { text: msg }));
  box.append(t);
  setTimeout(() => {
    t.classList.add('toast-out');
    t.addEventListener('animationend', () => t.remove(), { once: true });
    setTimeout(() => t.remove(), 600);
  }, ms);
}

function timeAgo(s) {
  const past = new Date(s + 'T00:00:00');
  if (isNaN(past)) return { text: 'Không rõ ngày cập nhật', cls: 'old', full: '' };
  const d = Math.floor((Date.now() - past) / 864e5), w = Math.floor(d / 7), m = Math.floor(d / 30), y = Math.floor(d / 365);
  const cls = d > 180 ? 'stale' : d > 90 ? 'old' : d > 30 ? 'recent' : 'fresh';
  const t = d < 1 ? 'hôm nay' : d === 1 ? 'hôm qua' : d < 7 ? `${d} ngày trước` : w < 5 ? `${w} tuần trước` : m < 12 ? `${m} tháng trước` : `${y} năm trước`;
  return { text: 'Cập nhật ' + t, cls, full: 'Cập nhật lần cuối: ' + past.toLocaleDateString('vi-VN') };
}
function initTimeAgo() {
  const run = () => $$('.card[data-executor]').forEach((c) => {
    const p = $('[data-role="updated"]', c);
    if (!c._item.updated) { p.style.display = 'none'; return; }
    const r = timeAgo(c._item.updated);
    $('.updated-text', p).textContent = r.text; p.className = 'card-updated ' + r.cls; p.title = r.full;
  });
  run(); setInterval(run, 36e5);
}

function initMisc() {
  const bar = $('#readingProgressFill'), top = $('#backToTop');
  let tick = false;
  const upd = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = (h > 0 ? Math.min(100, (scrollY / h) * 100) : 0) + '%';
    top?.classList.toggle('show', scrollY > 400); tick = false;
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  top?.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  upd();
  const banner = $('#cookieBanner');
  if (banner && store.get(CFG.cookieKey) === null) setTimeout(() => (banner.hidden = false), 1500);
  const hide = (v, msg, type) => {
    store.set(CFG.cookieKey, v); banner.classList.add('hide');
    setTimeout(() => { banner.hidden = true; banner.classList.remove('hide'); }, 350);
    showToast(msg, type);
  };
  $('#cookieAccept')?.addEventListener('click', () => hide('1', 'Đã chấp nhận cookies', 'success'));
  $('#cookieDecline')?.addEventListener('click', () => hide('0', 'Đã từ chối cookies', 'info'));
  if (!reduceMotion) document.addEventListener('click', (e) => {
    const card = e.target.closest('.card[data-executor]');
    if (!card || e.target.closest('button,a')) return;
    const r = card.getBoundingClientRect(), s = Math.max(r.width, r.height), rp = el('span', { class: 'ripple' });
    Object.assign(rp.style, { width: s + 'px', height: s + 'px', left: e.clientX - r.left - s / 2 + 'px', top: e.clientY - r.top - s / 2 + 'px' });
    card.append(rp); setTimeout(() => rp.remove(), 700);
  });
}

function initTilt() {
  if (reduceMotion || matchMedia('(max-width: 900px), (hover: none)').matches) return;
  let raf = 0;
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest?.('.card[data-executor]'); if (!card) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -8, ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      card.classList.add('tilting');
    });
  });
  document.addEventListener('pointerout', (e) => {
    const card = e.target.closest?.('.card[data-executor]');
    if (!card || card.contains(e.relatedTarget)) return;
    card.style.transform = ''; card.classList.remove('tilting');
  });
}

addEventListener('error', (e) => { console.error('[Global]', e.error); $('#loader')?.classList.add('hidden'); });
addEventListener('unhandledrejection', (e) => console.error('[Promise]', e.reason));
