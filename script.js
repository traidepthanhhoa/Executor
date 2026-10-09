'use strict';
/* ====== DỮ LIỆU: sửa tại đây, giao diện tự cập nhật ====== */
const EXECUTORS = [
  { id:'delta',   name:'Delta',            platform:'mobile', version:'2.738.1397', updated:'2026-10-08', maintenance:false, note:'Bản APK cho Android 64-bit', url:'https://vuotnhanh.com/j1tZ' },
  { id:'delta32', name:'Delta 32 bit',     platform:'mobile', version:'2.736.1408', updated:'2026-10-08', maintenance:true,  note:'Bản APK cho Android 32-bit', url:'https://vuotnhanh.com/oJou' },
  { id:'nx',      name:'Roblox Lite NX',   platform:'mobile', version:'3.0.1',      updated:'2026-10-08', maintenance:true,  note:'Bản APK nhẹ',                 url:'https://vuotnhanh.com/TxPF' },
  { id:'volcano', name:'Volcano',          platform:'pc',     version:'1.0',        updated:'2026-10-08', maintenance:false, note:'Không cần key, đa instance',  url:'https://vuotnhanh.com/YANb' },
  { id:'umi',     name:'Umi',              platform:'pc',     version:'1.0',        updated:'2026-10-08', maintenance:false, note:'Không cần key, đa instance',  url:'https://vuotnhanh.com/OSj9' },
  { id:'real',    name:'Executor Real',    platform:'pc',     version:'1.7.0',      updated:'2026-10-08', maintenance:false, note:'Client Real',                 url:'https://vuotnhanh.com/CEGE' },
  { id:'medium',  name:'Executor Medium',  platform:'pc',     version:'1.5.0',      updated:'2026-10-08', maintenance:false, note:'Client Medium',               url:'https://vuotnhanh.com/fXSZ' },
  { id:'velocity',name:'Executor Velocity',platform:'pc',     version:'1.3.7',      updated:'2026-10-08', maintenance:true,  note:'Client Velocity',             url:'https://vuotnhanh.com/zij1' },
  { id:'solara',  name:'Solara',           platform:'pc',     version:'2.8.0',      updated:'2026-10-08', maintenance:false, note:'Bootstrapper chính chủ',      url:'https://4d38a1ec.solaraweb-alj.pages.dev/download/static/files/Bootstrapper.exe' },
  { id:'xeno',    name:'Xeno',             platform:'pc',     version:'1.3.60',     updated:'2026-10-08', maintenance:false, note:'Trang chủ Xeno',              url:'https://xeno.now/' }
];
const VERIFY = { key:'matchat_verified_until', page:'verify.html' };

/* ====== TIỆN ÍCH ====== */
const $ = (s, r=document) => r.querySelector(s);
const store = {
  get(k){ try{ return localStorage.getItem(k) }catch(e){ return null } },
  set(k,v){ try{ localStorage.setItem(k,v) }catch(e){} }
};
function toast(msg){
  const el = document.createElement('div'); el.className='toast'; el.textContent=msg;
  $('#toasts').append(el); setTimeout(()=>el.remove(), 3000);
}
function ago(iso){
  const d = Math.floor((Date.now()-new Date(iso+'T00:00:00'))/864e5);
  if (isNaN(d)) return 'Không rõ ngày';
  if (d<=0) return 'Hôm nay'; if (d===1) return 'Hôm qua';
  if (d<30) return d+' ngày trước'; if (d<365) return Math.floor(d/30)+' tháng trước';
  return Math.floor(d/365)+' năm trước';
}

/* ====== CỔNG XÁC MINH ====== */
if (Date.now() >= parseInt(store.get(VERIFY.key)||'0',10)) location.replace(VERIFY.page);

/* ====== DANH SÁCH ====== */
let platform = 'mobile', query = '', pending = null;
const list = $('#list');

function render(){
  const q = query.trim().toLowerCase();
  const items = EXECUTORS.filter(e => e.platform===platform && (!q || (e.name+' '+e.note).toLowerCase().includes(q)));
  list.replaceChildren();
  if (!items.length){
    const li = document.createElement('li'); li.className='empty';
    li.textContent = q ? 'Không có executor nào khớp "'+query.trim()+'". Thử tên ngắn hơn hoặc đổi sang tab khác.' : 'Chưa có executor nào ở mục này.';
    list.append(li); return;
  }
  for (const e of items){
    const li = document.createElement('li'); li.className='row'; li.dataset.status = e.maintenance?'maintenance':'ok';
    li.innerHTML = '<span class="rail"></span><div><h2></h2><div class="meta"><span class="tag"></span><span class="upd"></span><span class="state"></span><span class="note"></span></div></div><button class="get" type="button"></button>';
    $('h2',li).textContent = e.name;
    $('.tag',li).textContent = 'v'+e.version;
    $('.upd',li).textContent = 'Cập nhật '+ago(e.updated).toLowerCase();
    $('.upd',li).title = e.updated;
    const st = $('.state',li); st.classList.add(e.maintenance?'maintenance':'ok'); st.textContent = e.maintenance?'Đang bảo trì':'Hoạt động';
    $('.note',li).textContent = e.note; $('.note',li).style.margin='0';
    const b = $('.get',li);
    b.textContent = e.maintenance ? 'Đang bảo trì' : 'Tải xuống';
    b.disabled = e.maintenance;
    if (!e.maintenance) b.addEventListener('click', () => askDownload(e));
    list.append(li);
  }
}
function counts(){
  $('#nMobile').textContent = EXECUTORS.filter(e=>e.platform==='mobile').length;
  $('#nPc').textContent = EXECUTORS.filter(e=>e.platform==='pc').length;
}

/* ====== TẢI XUỐNG ====== */
function askDownload(e){ pending = e; $('#dlTitle').textContent = 'Tải '+e.name+' v'+e.version; $('#dlDlg').showModal(); }
$('#dlCancel').onclick = () => { pending=null; $('#dlDlg').close(); };
$('#dlGo').onclick = () => {
  if (!pending) return;
  window.open(pending.url, '_blank', 'noopener,noreferrer');
  toast('Đã mở liên kết tải '+pending.name); pending=null; $('#dlDlg').close();
};

/* ====== ĐIỀU KHIỂN ====== */
document.querySelectorAll('.seg [data-p]').forEach(b => b.addEventListener('click', () => {
  platform = b.dataset.p;
  document.querySelectorAll('.seg [data-p]').forEach(x => x.setAttribute('aria-pressed', String(x===b)));
  render();
}));
const qi = $('#q'), qc = $('#qClear');
qi.addEventListener('input', () => { query = qi.value; qc.hidden = !query; render(); });
qc.onclick = () => { qi.value=''; query=''; qc.hidden=true; render(); qi.focus(); };
qi.addEventListener('keydown', e => { if (e.key==='Escape') qc.click(); });

$('#themeBtn').onclick = () => {
  const next = document.documentElement.dataset.theme==='dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next; store.set('theme', next);
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.content = next==='dark' ? '#0d1322' : '#e8edf5');
};

/* ====== HƯỚNG DẪN ====== */
const GUIDE = {
  mobile:['Bấm Tải xuống ở bản bạn chọn, rồi quét file APK bằng VirusTotal.','Vào Cài đặt → Bảo mật → Cho phép cài ứng dụng không rõ nguồn gốc (chỉ cho trình duyệt đang dùng).','Mở file APK và bấm Cài đặt.','Mở Roblox, đăng nhập bằng tài khoản phụ và vào game.','Mở app executor, làm theo bước lấy key nếu có.','Dán script và bấm Execute.'],
  pc:['Bấm Tải xuống ở bản bạn chọn, rồi quét file bằng VirusTotal.','Giải nén bằng 7-Zip hoặc WinRAR nếu là file ZIP.','Nếu Windows Defender báo, đừng tắt hẳn: chỉ thêm đúng file đã quét vào danh sách loại trừ.','Mở Roblox và vào game.','Mở executor, chọn Attach hoặc Inject.','Dán script và bấm Execute.']
};
function guide(k){
  $('#guideSteps').replaceChildren(...GUIDE[k].map(t => Object.assign(document.createElement('li'),{textContent:t})));
  document.querySelectorAll('[data-g]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.g===k)));
}
$('#guideBtn').onclick = () => { guide(platform); $('#guideDlg').showModal(); };
document.querySelectorAll('[data-g]').forEach(b => b.onclick = () => guide(b.dataset.g));
$('#guideOk').onclick = () => $('#guideDlg').close();

/* ====== THÔNG TIN ====== */
const INFO = {
  about:['Giới thiệu','<p>Matchat67 tổng hợp liên kết executor Roblox cho Mobile và PC, kèm trạng thái và phiên bản để bạn biết bản nào đang dùng được.</p>'],
  terms:['Điều khoản','<ul><li>Chỉ dùng cho mục đích tìm hiểu cá nhân.</li><li>Bạn chịu rủi ro bị khóa tài khoản Roblox.</li><li>Không bán lại hoặc phân phối lại để kiếm lời.</li><li>Trang không chịu trách nhiệm về nội dung của bên thứ ba.</li></ul>'],
  privacy:['Quyền riêng tư','<p>Trang chỉ lưu trong trình duyệt của bạn: giao diện sáng/tối và thời hạn xác minh. Không thu thập email, mật khẩu hay thông tin cá nhân. Xóa dữ liệu trình duyệt để gỡ các mục này.</p>'],
  contact:['Liên hệ','<p>Discord: <a href="https://discord.gg/GrTCy2DHEX" target="_blank" rel="noopener noreferrer">discord.gg/GrTCy2DHEX</a><br>Email: <a href="mailto:kenhmatchat@gmail.com">kenhmatchat@gmail.com</a></p>']
};
document.querySelectorAll('[data-info]').forEach(b => b.onclick = () => {
  const [t,h] = INFO[b.dataset.info]; $('#infoTitle').textContent = t; $('#infoBody').innerHTML = h; $('#infoDlg').showModal();
});
$('#infoOk').onclick = () => $('#infoDlg').close();
document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', e => { if (e.target===d) d.close(); }));

counts(); render();
