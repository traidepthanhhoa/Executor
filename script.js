/* ==========================================================
   PHUC03 EXECUTOR HUB - SCRIPT
   Toàn bộ code nằm trong IIFE để không rò rỉ biến global.
   ========================================================== */
(function () {
    'use strict';

    // ============================================================
    // CẤU HÌNH BẢO TRÌ (true = đang bảo trì)
    // ============================================================
    const MAINTENANCE_MODE = {
        client: false, D32: false, nx: true, pc: false, px: false, pv: false,
        solara: false, xeno: false, umi: false, volcano: false, nam: true, nexomia: true,
        supq: false, zynova: false, saiko: false, vortex: false, yubx: false, codex: false,
        worldclient: false, aevix: false, yuari: false, luna: false, madius: false,
        pottasium: false, 'delta-paid': false, 'real-paid': false,
        volt: false, wave: false, isaeva: false
    };

    // ============================================================
    // CẤU HÌNH DOWNLOAD
    // ============================================================
    const DOWNLOADS = {
        client: { url: 'https://vuotnhanh.com/8LD8', filename: 'Delta.apk' },
        D32: { url: 'https://vuotnhanh.com/Lla1', filename: 'Delta-32.apk' },
        nx: { url: 'https://vuotnhanh.com/TxPF', filename: 'Roblox-Lite-NX.apk' },
        pc: { url: 'https://vuotnhanh.com/CEGE', filename: 'Executor-Real.zip' },
        px: { url: 'https://vuotnhanh.com/fXSZ', filename: 'Executor-Medium.zip' },
        pv: { url: 'https://vuotnhanh.com/zij1', filename: 'Executor-Velocity.zip' },
        solara: { url: 'https://4d38a1ec.solaraweb-alj.pages.dev/download/static/files/Bootstrapper.exe', filename: 'Solara.exe' },
        xeno: { url: 'https://xeno.now/', filename: 'Xeno.exe' },
        umi: { url: 'https://vuotnhanh.com/Ypmy', filename: 'Umi.exe' },
        volcano: { url: 'https://vuotnhanh.com/YANb', filename: 'Volcano.exe' },
        nam: { url: 'https://vuotnhanh.com/U0US', filename: 'Nam.exe' },
        nexomia: { url: 'https://vuotnhanh.com/Krls', filename: 'Nexomia.exe' },
        supq: { url: 'https://vuotnhanh.com/79TH', filename: 'supQ.exe' },
        zynova: { url: 'https://vuotnhanh.com/gidc', filename: 'Zynova.exe' },
        saiko: { url: 'https://vuotnhanh.com/bZGB', filename: 'Saiko.exe' },
        vortex: { url: 'https://link4m.net/m605D', filename: 'Vortex.exe' },
        yubx: { url: 'https://vuotnhanh.com/F44n', filename: 'Yub-X.exe' },
        codex: { url: 'https://vuotnhanh.com/POAS', filename: 'CodeX.exe' },
        worldclient: { url: 'https://vuotnhanh.com/j1lz', filename: 'World-Client.exe' },
        aevix: { url: 'https://vuotnhanh.com/E0W7', filename: 'Aevix.exe' },
        yuari: { url: 'https://vuotnhanh.com/LL57', filename: 'Yuari.exe' },
        luna: { url: 'https://vuotnhanh.com/zTlA', filename: 'Luna.exe' },
        madius: { url: 'https://vuotnhanh.com/UXW9', filename: 'Madius.exe' }
    };

    const THEME_CONFIG = { storageKey: 'theme', labels: { dark: 'Dark', light: 'Light' } };
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // ============================================================
    // ĐẾM SỐ CARD CHO BADGE TRÊN TAB
    // ============================================================
    function updateTabCounts() {
        ['mobile', 'pc', 'premium'].forEach((k) => {
            const grid = document.getElementById('grid-' + k);
            const badge = document.querySelector('[data-count="' + k + '"]');
            if (grid && badge) badge.textContent = grid.querySelectorAll('.card[data-executor]').length;
        });
    }

    // ============================================================
    // KHỞI TẠO
    // ============================================================
    document.addEventListener('DOMContentLoaded', () => {
        updateTabCounts();
        initTheme();
        initLoader();
        initTabs();
        initSearch();
        initDownloadButtons();
        initGamePassPopup();
        initGuide();
        initBackToTop();
        initReadingProgress();
        initTopProgress();
        initTimeAgo();
        initDiscordFloat();
        initCookie();
        initInfoModal();
        init3DTilt();
        initEscClose();
    });

    // ============================================================
    // 1. THEME
    // ============================================================
    function initTheme() {
        const toggle = document.getElementById('themeToggle');
        const label = document.querySelector('[data-role="theme-label"]');
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        if (label) label.textContent = THEME_CONFIG.labels[current];
        if (!toggle) return;

        toggle.addEventListener('click', () => {
            const now = document.documentElement.getAttribute('data-theme') || 'dark';
            const next = now === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            try { localStorage.setItem(THEME_CONFIG.storageKey, next); } catch (err) { /* bỏ qua */ }
            if (label) label.textContent = THEME_CONFIG.labels[next];
        });

        // Phím tắt Ctrl+Shift+L
        document.addEventListener('keydown', (ev) => {
            if (ev.ctrlKey && ev.shiftKey && (ev.key === 'L' || ev.key === 'l')) {
                ev.preventDefault();
                toggle.click();
            }
        });
    }

    // ============================================================
    // 2. LOADER (tiến trình giả 0 → 100)
    // ============================================================
    function initLoader() {
        const loader = document.getElementById('loader');
        const percentage = document.getElementById('percentage');
        const bar = document.getElementById('loaderBar');
        if (!loader || !percentage || !bar) { onLoaderDone(); return; }

        let progress = 0;
        const timer = setInterval(() => {
            progress = Math.min(100, progress + Math.random() * 15 + 5);
            percentage.textContent = Math.floor(progress) + '%';
            bar.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(timer);
                setTimeout(() => { loader.classList.add('hidden'); onLoaderDone(); }, 400);
            }
        }, 100);
    }

    function onLoaderDone() {
        applyMaintenanceMode();
    }

    // ============================================================
    // 3. TABS (mobile / pc / premium)
    // ============================================================
    function initTabs() {
        const btns = document.querySelectorAll('.tab-btn');
        const panels = {
            mobile: document.getElementById('tab-mobile'),
            pc: document.getElementById('tab-pc'),
            premium: document.getElementById('tab-premium')
        };
        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;
                if (!panels[target]) return;
                btns.forEach((b) => {
                    b.classList.toggle('active', b === btn);
                    b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
                });
                Object.keys(panels).forEach((k) => panels[k].classList.toggle('active', k === target));

                // Xóa ô tìm kiếm khi đổi tab
                const input = document.getElementById('searchInput');
                if (input && input.value) {
                    input.value = '';
                    input.dispatchEvent(new Event('input'));
                }
            });
        });
    }

    // ============================================================
    // 4. SEARCH (lọc real-time)
    // ============================================================
    function initSearch() {
        const input = document.getElementById('searchInput');
        const clearBtn = document.getElementById('searchClear');
        const emptyMsg = document.getElementById('searchEmpty');
        if (!input) return;
        const cards = document.querySelectorAll('.card[data-executor]');

        const run = () => {
            const q = (input.value || '').toLowerCase().trim();
            let visibleInActive = 0;
            cards.forEach((card) => {
                const name = (card.dataset.name || '').toLowerCase();
                const key = (card.dataset.executor || '').toLowerCase();
                const match = !q || name.includes(q) || key.includes(q);
                card.classList.toggle('hidden', !match);
                if (match && card.closest('.tab-content.active')) visibleInActive++;
            });
            if (emptyMsg) emptyMsg.hidden = !q || visibleInActive > 0;
            if (clearBtn) clearBtn.hidden = !q;
        };

        input.addEventListener('input', run);
        if (clearBtn) clearBtn.addEventListener('click', () => { input.value = ''; run(); input.focus(); });
        run();
    }

    // ============================================================
    // 5. BẢO TRÌ
    // ============================================================
    function applyMaintenanceMode() {
        document.querySelectorAll('.card[data-executor]').forEach((card) => {
            const key = card.dataset.executor;
            const btn = card.querySelector('[data-role="download"]');
            const badge = card.querySelector('[data-role="badge"]');
            const dot = card.querySelector('.dot');
            const statusText = card.querySelector('.status-text');
            if (!btn) return;

            const isMaint = Boolean(MAINTENANCE_MODE[key]);
            const isPremium = card.classList.contains('card-premium');
            btn.classList.toggle('btn-maintenance', isMaint);
            btn.disabled = isMaint;
            btn.textContent = isMaint ? '⛔ Đang bảo trì' : (isPremium ? 'Mua ngay' : 'Download');
            if (badge) badge.style.display = isMaint ? 'inline-flex' : 'none';
            if (dot) {
                dot.classList.toggle('online-dot', !isMaint);
                dot.classList.toggle('maintenance-dot', isMaint);
            }
            if (statusText) statusText.textContent = isMaint ? 'Bảo trì' : 'Online';
        });
    }

    // ============================================================
    // 6. DOWNLOAD
    // ============================================================
    function initDownloadButtons() {
        document.querySelectorAll('[data-role="download"]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.card[data-executor]');
                const key = card && card.dataset.executor;
                if (!key) return;
                if (MAINTENANCE_MODE[key]) return; // đang bảo trì

                if (DOWNLOADS[key]) { handleDownload(key, btn); return; }

                const directUrl = btn.getAttribute('data-url');
                if (directUrl) {
                    window.open(directUrl, '_blank', 'noopener,noreferrer');
                    showToast('Đang mở liên kết...', 'success');
                }
            });
        });
    }

    async function handleDownload(key, btn) {
        const cfg = DOWNLOADS[key];
        if (!cfg) return;
        const originalText = btn.textContent;
        btn.disabled = true;

        // Đếm ngược 3 giây
        for (let i = 3; i > 0; i--) {
            btn.textContent = 'Chờ ' + i + 's...';
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
    // 7. TOAST
    // ============================================================
    function showToast(message, type) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast ' + (type || 'info');
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ============================================================
    // 8. POPUP QUẢNG CÁO (đổi ảnh mỗi 2.5s, nhớ sessionStorage)
    // ============================================================
    function initGamePassPopup() {
        const IMAGES = [
            'https://i.postimg.cc/FkYFc3BN/Quang-cao-Game-Pass-Nhan-Doi-May-Man-(1).png',
            'https://i.postimg.cc/XXPYW1rF/Quang-cao-Game-Pass-Nhan-Doi-May-Man-(2).png'
        ];
        const SWAP_MS = 2500;
        const SHOW_AFTER_MS = 1000;

        const nen = document.getElementById('qcNen');
        const anh = document.getElementById('qcAnh');
        const close = document.getElementById('qcDong');
        if (!nen || !anh || !close) return;

        let timer = null;
        let idx = 0;
        let closed = false;
        try { closed = sessionStorage.getItem('daDongQC') === '1'; } catch (e) { /* bỏ qua */ }

        IMAGES.forEach((u) => { const im = new Image(); im.src = u; });

        const dong = () => {
            nen.classList.remove('hien');
            nen.setAttribute('aria-hidden', 'true');
            clearInterval(timer);
            timer = null;
            try { sessionStorage.setItem('daDongQC', '1'); } catch (e) { /* bỏ qua */ }
        };

        if (!closed) {
            setTimeout(() => {
                anh.src = IMAGES[0];
                nen.classList.add('hien');
                nen.setAttribute('aria-hidden', 'false');
                timer = setInterval(() => { idx = (idx + 1) % IMAGES.length; anh.src = IMAGES[idx]; }, SWAP_MS);
            }, SHOW_AFTER_MS);
        }

        close.addEventListener('click', dong);
        nen.addEventListener('click', (e) => { if (e.target === nen) dong(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nen.classList.contains('hien')) dong();
        });
    }

    // ============================================================
    // 9. MODAL HƯỚNG DẪN
    // ============================================================
    function initGuide() {
        const overlay = document.getElementById('guideOverlay');
        if (!overlay) return;
        const close = () => { overlay.classList.remove('show'); overlay.setAttribute('aria-hidden', 'true'); };
        const open = () => { overlay.classList.add('show'); overlay.setAttribute('aria-hidden', 'false'); };

        // Mọi nút có id="guideOpen" đều mở modal
        document.querySelectorAll('#guideOpen').forEach((b) => b.addEventListener('click', open));
        document.getElementById('guideClose').addEventListener('click', close);
        document.getElementById('guideOk').addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

        // Tabs Mobile / PC trong modal
        const tabs = document.querySelectorAll('.guide-tab');
        const contents = { mobile: document.getElementById('guide-mobile'), pc: document.getElementById('guide-pc') };
        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                tabs.forEach((t) => {
                    t.classList.toggle('active', t === tab);
                    t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
                });
                Object.keys(contents).forEach((k) => contents[k].classList.toggle('active', k === tab.dataset.guideTab));
            });
        });

        // FAQ toggle
        const faqToggle = document.getElementById('faqToggle');
        if (faqToggle) {
            faqToggle.addEventListener('click', () => {
                const expanded = faqToggle.getAttribute('aria-expanded') === 'true';
                faqToggle.setAttribute('aria-expanded', String(!expanded));
            });
        }
    }

    // Đóng modal bằng phím ESC
    function initEscClose() {
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            ['guideOverlay', 'infoOverlay'].forEach((id) => {
                const el = document.getElementById(id);
                if (el) { el.classList.remove('show'); el.setAttribute('aria-hidden', 'true'); }
            });
        });
    }

    // ============================================================
    // 10. BACK TO TOP & TIẾN TRÌNH
    // ============================================================
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    function initReadingProgress() {
        const fill = document.getElementById('readingProgressFill');
        const backTop = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            const top = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            if (fill) fill.style.width = (height > 0 ? (top / height) * 100 : 0) + '%';
            if (backTop) backTop.classList.toggle('show', top > 400);
        }, { passive: true });
    }

    function initTopProgress() {
        const fill = document.getElementById('topProgressFill');
        if (!fill) return;
        let p = 0;
        const timer = setInterval(() => {
            p += Math.max(5, Math.random() * 20);
            if (p >= 100) {
                fill.style.width = '100%';
                clearInterval(timer);
                setTimeout(() => { fill.style.opacity = '0'; }, 500);
            } else {
                fill.style.width = p + '%';
            }
        }, 100);
    }

    // ============================================================
    // 11. NGÀY CẬP NHẬT (dd/mm/yyyy)
    // ============================================================
    function initTimeAgo() {
        document.querySelectorAll('.card[data-updated]').forEach((card) => {
            const textEl = card.querySelector('.updated-text');
            const parts = (card.dataset.updated || '').split('-');
            if (!textEl || parts.length !== 3) return;
            textEl.textContent = 'Cập nhật: ' + parts[2] + '/' + parts[1] + '/' + parts[0];
        });
    }

    // ============================================================
    // 12. DISCORD FLOAT (body.modal-open khi có modal mở)
    // ============================================================
    function initDiscordFloat() {
        const ids = ['guideOverlay', 'infoOverlay'];
        const update = () => {
            const anyOpen = ids.some((id) => {
                const el = document.getElementById(id);
                return el && el.classList.contains('show');
            });
            document.body.classList.toggle('modal-open', anyOpen);
        };
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) new MutationObserver(update).observe(el, { attributes: true, attributeFilter: ['class'] });
        });
    }

    // ============================================================
    // 13. COOKIE BANNER
    // ============================================================
    function initCookie() {
        const banner = document.getElementById('cookieBanner');
        if (!banner) return;
        let accepted = null;
        try { accepted = localStorage.getItem('cookie_accepted'); } catch (e) { /* bỏ qua */ }
        if (accepted === null) setTimeout(() => { banner.hidden = false; }, 2000);

        const save = (val) => {
            try { localStorage.setItem('cookie_accepted', val); } catch (e) { /* bỏ qua */ }
            banner.hidden = true;
        };
        document.getElementById('cookieAccept').addEventListener('click', () => save('1'));
        document.getElementById('cookieDecline').addEventListener('click', () => save('0'));
    }

    // ============================================================
    // 14. MODAL THÔNG TIN (About / Terms / Privacy / Legal / Contact)
    // ============================================================
    function initInfoModal() {
        const overlay = document.getElementById('infoOverlay');
        if (!overlay) return;
        const INFO = {
            about: '<p>Phuc03 Executor Hub là trang tổng hợp liên kết Executor/Client Roblox cho Mobile, PC và Premium.</p>',
            terms: '<p>Sử dụng executor có thể vi phạm Điều khoản dịch vụ của Roblox. Người dùng tự chịu hoàn toàn trách nhiệm và rủi ro.</p>',
            privacy: '<p>Trang chỉ dùng localStorage/sessionStorage để ghi nhớ theme, trạng thái popup và cookie. Không thu thập dữ liệu cá nhân.</p>',
            legal: '<p>Trang web không liên kết với Roblox Corporation. Mọi phần mềm thuộc quyền của nhà phát triển tương ứng.</p>',
            contact: '<p>Liên hệ qua Discord: <a href="https://discord.gg/GrTCy2DHEX" target="_blank" rel="noopener noreferrer">discord.gg/GrTCy2DHEX</a></p>'
        };
        const close = () => { overlay.classList.remove('show'); overlay.setAttribute('aria-hidden', 'true'); };

        document.querySelectorAll('[data-info]').forEach((btn) => {
            btn.addEventListener('click', () => {
                document.getElementById('infoTitle').textContent = btn.textContent;
                document.getElementById('infoBody').innerHTML = INFO[btn.dataset.info] || '<p>Đang cập nhật...</p>';
                overlay.classList.add('show');
                overlay.setAttribute('aria-hidden', 'false');
            });
        });
        document.getElementById('infoClose').addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    }

    // ============================================================
    // 15. HIỆU ỨNG NGHIÊNG 3D (desktop, tôn trọng reduced-motion)
    // ============================================================
    function init3DTilt() {
        if (window.matchMedia('(max-width: 900px)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        document.addEventListener('mousemove', (e) => {
            const card = e.target.closest && e.target.closest('.card[data-executor]');
            if (!card) return;
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            card.style.transform = 'perspective(1000px) rotateX(' + (-y / 30) + 'deg) rotateY(' + (x / 30) + 'deg) translateY(-4px)';
        });
        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest && e.target.closest('.card[data-executor]');
            if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
        });
    }

    // ============================================================
    // XỬ LÝ LỖI TOÀN CỤC (không để loader kẹt)
    // ============================================================
    window.addEventListener('error', () => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    });
})();
