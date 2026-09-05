// ============================================================
// 🛠️ CẤU HÌNH BẢO TRÌ – SỬA TRUE/FALSE 🛠️
// ============================================================
const MAINTENANCE_MODE = {
    pro: false,     // Delta Lite
    client: false,  // Delta Client
    nx: false,      // Roblox Lite NX
    pc: false,      // ⭐ Real (PC)
    px: true,       // ⭐ Medium (PX)
    pv: false
};
// ============================================================

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const percentage = document.getElementById('percentage');
    const loaderBar = document.getElementById('loader-bar');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            percentage.textContent = progress + '%';
            loaderBar.style.width = progress + '%';
            loaderBar.style.background = 'linear-gradient(90deg, #10b981, #34d399, #6ee7b7)';
            setTimeout(() => {
                loader.classList.add('hidden');
                applyMaintenanceMode();
            }, 800);
        } else {
            percentage.textContent = progress + '%';
            loaderBar.style.width = progress + '%';
        }
    }, 300);
});

// ===== ÁP DỤNG CHẾ ĐỘ BẢO TRÌ =====
function applyMaintenanceMode() {
    // --- Delta Pro ---
    const btnPro = document.getElementById('downloadBtnPro');
    const badgePro = document.getElementById('badgePro');
    const statusPro = document.getElementById('statusPro');
    if (MAINTENANCE_MODE.pro) {
        btnPro.classList.add('btn-maintenance');
        btnPro.textContent = '⛔ Đang bảo trì';
        btnPro.disabled = true;
        badgePro.style.display = 'inline-block';
        statusPro.innerHTML = 'Status: <span class="maintenance-dot"></span> Bảo trì';
    } else {
        btnPro.classList.remove('btn-maintenance');
        btnPro.textContent = 'Download';
        btnPro.disabled = false;
        badgePro.style.display = 'none';
        statusPro.innerHTML = 'Status: <span class="online-dot"></span> Online';
    }

    // --- Delta Client ---
    const btnClient = document.getElementById('downloadBtnClient');
    const badgeClient = document.getElementById('badgeClient');
    const statusClient = document.getElementById('statusClient');
    if (MAINTENANCE_MODE.client) {
        btnClient.classList.add('btn-maintenance');
        btnClient.textContent = '⛔ Đang bảo trì';
        btnClient.disabled = true;
        badgeClient.style.display = 'inline-block';
        statusClient.innerHTML = 'Status: <span class="maintenance-dot"></span> Bảo trì';
    } else {
        btnClient.classList.remove('btn-maintenance');
        btnClient.textContent = 'Download';
        btnClient.disabled = false;
        badgeClient.style.display = 'none';
        statusClient.innerHTML = 'Status: <span class="online-dot"></span> Online';
    }

    // --- Roblox Lite NX ---
    const btnNx = document.getElementById('downloadBtnNx');
    const badgeNx = document.getElementById('badgeNx');
    const statusNx = document.getElementById('statusNx');
    if (MAINTENANCE_MODE.nx) {
        btnNx.classList.add('btn-maintenance');
        btnNx.textContent = '⛔ Đang bảo trì';
        btnNx.disabled = true;
        badgeNx.style.display = 'inline-block';
        statusNx.innerHTML = 'Status: <span class="maintenance-dot"></span> Bảo trì';
    } else {
        btnNx.classList.remove('btn-maintenance');
        btnNx.textContent = 'Download';
        btnNx.disabled = false;
        badgeNx.style.display = 'none';
        statusNx.innerHTML = 'Status: <span class="online-dot"></span> Online';
    }

    // --- PC Real ---
    const btnPc = document.getElementById('downloadBtnPc');
    const badgePc = document.getElementById('badgePc');
    const statusPc = document.getElementById('statusPc');
    if (MAINTENANCE_MODE.pc) {
        btnPc.classList.add('btn-maintenance');
        btnPc.textContent = '⛔ Đang bảo trì';
        btnPc.disabled = true;
        badgePc.style.display = 'inline-block';
        statusPc.innerHTML = 'Status: <span class="maintenance-dot"></span> Bảo trì';
    } else {
        btnPc.classList.remove('btn-maintenance');
        btnPc.textContent = 'Download';
        btnPc.disabled = false;
        badgePc.style.display = 'none';
        statusPc.innerHTML = 'Status: <span class="online-dot"></span> Online';
    }

    // --- PC Medium (PX) ---
    const btnPx = document.getElementById('downloadBtnPx');
    const badgePx = document.getElementById('badgePx');
    const statusPx = document.getElementById('statusPx');
    if (MAINTENANCE_MODE.px) {
        btnPx.classList.add('btn-maintenance');
        btnPx.textContent = '⛔ Đang bảo trì';
        btnPx.disabled = true;
        badgePx.style.display = 'inline-block';
        statusPx.innerHTML = 'Status: <span class="maintenance-dot"></span> Bảo trì';
    } else {
        btnPx.classList.remove('btn-maintenance');
        btnPx.textContent = 'Download';
        btnPx.disabled = false;
        badgePx.style.display = 'none';
        statusPx.innerHTML = 'Status: <span class="online-dot"></span> Online';
    }

    // --- PC Velocity (Pv) ---
    const btnPv = document.getElementById('downloadBtnPv');
    const badgePv = document.getElementById('badgePv');
    const statusPv = document.getElementById('statusPv');
    if (MAINTENANCE_MODE.pv) {
        btnPv.classList.add('btn-maintenance');
        btnPv.textContent = '⛔ Đang bảo trì';
        btnPv.disabled = true;
        badgePv.style.display = 'inline-block';
        statusPv.innerHTML = 'Status: <span class="maintenance-dot"></span> Bảo trì';
    } else {
        btnPv.classList.remove('btn-maintenance');
        btnPv.textContent = 'Download';
        btnPv.disabled = false;
        badgePv.style.display = 'none';
        statusPv.innerHTML = 'Status: <span class="online-dot"></span> Online';
    }
}

// ===== TAB SWITCHING =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = {
    mobile: document.getElementById('tab-mobile'),
    pc: document.getElementById('tab-pc')
};

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        Object.values(tabContents).forEach(el => el.classList.remove('active'));
        const tab = this.dataset.tab;
        if (tabContents[tab]) {
            tabContents[tab].classList.add('active');
        }
    });
});

// ===== DOWNLOAD BUTTON PRO =====
document.getElementById('downloadBtnPro').addEventListener('click', function() {
    if (MAINTENANCE_MODE.pro) return;
    const btn = this, orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Đang tải...';
    setTimeout(() => {
        btn.textContent = 'Đang chuẩn bị...';
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'https://vuotnhanh.com/dICD';
            link.download = 'Delta-Pro-v3.245.1782.apk';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            btn.textContent = 'Tải xuống thành công! ✓';
            btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            setTimeout(() => {
                btn.textContent = orig;
                btn.disabled = false;
                btn.style.background = '';
            }, 2000);
        }, 1000);
    }, 500);
});

// ===== DOWNLOAD BUTTON CLIENT =====
document.getElementById('downloadBtnClient').addEventListener('click', function() {
    if (MAINTENANCE_MODE.client) return;
    const btn = this, orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Đang tải...';
    setTimeout(() => {
        btn.textContent = 'Đang chuẩn bị...';
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'https://vuotnhanh.com/9G1D';
            link.download = 'Delta-v2.735.1138.apk';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            btn.textContent = 'Tải xuống thành công! ✓';
            btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            setTimeout(() => {
                btn.textContent = orig;
                btn.disabled = false;
                btn.style.background = '';
            }, 2000);
        }, 1000);
    }, 500);
});

// ===== DOWNLOAD BUTTON NX =====
document.getElementById('downloadBtnNx').addEventListener('click', function() {
    if (MAINTENANCE_MODE.nx) return;
    const btn = this, orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Đang tải...';
    setTimeout(() => {
        btn.textContent = 'Đang chuẩn bị...';
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'https://vuotnhanh.com/TxPF';
            link.download = 'Roblox-Lite-NX-v3.0.1.apk';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            btn.textContent = 'Tải xuống thành công! ✓';
            btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            setTimeout(() => {
                btn.textContent = orig;
                btn.disabled = false;
                btn.style.background = '';
            }, 2000);
        }, 1000);
    }, 500);
});

// ===== DOWNLOAD PC REAL =====
document.getElementById('downloadBtnPc').addEventListener('click', function() {
    if (MAINTENANCE_MODE.pc) return;
    const btn = this, orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Đang tải...';
    setTimeout(() => {
        btn.textContent = 'Đang chuẩn bị...';
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'https://vuotnhanh.com/CEGE';
            link.download = 'Executor-PC-Real-v1.7.0.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            btn.textContent = 'Tải xuống thành công! ✓';
            btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            setTimeout(() => {
                btn.textContent = orig;
                btn.disabled = false;
                btn.style.background = '';
            }, 2000);
        }, 1000);
    }, 500);
});

// ===== DOWNLOAD PC MEDIUM (PX) =====
document.getElementById('downloadBtnPx').addEventListener('click', function() {
    if (MAINTENANCE_MODE.px) return;
    const btn = this, orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Đang tải...';
    setTimeout(() => {
        btn.textContent = 'Đang chuẩn bị...';
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'https://vuotnhanh.com/G94y';
            link.download = 'Executor-PC-Medium-v1.5.0.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            btn.textContent = 'Tải xuống thành công! ✓';
            btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            setTimeout(() => {
                btn.textContent = orig;
                btn.disabled = false;
                btn.style.background = '';
            }, 2000);
        }, 1000);
    }, 500);
});

// ===== DOWNLOAD PC VELOCITY (PV) =====
document.getElementById('downloadBtnPv').addEventListener('click', function() {
    if (MAINTENANCE_MODE.pv) return;
    const btn = this, orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Đang tải...';
    setTimeout(() => {
        btn.textContent = 'Đang chuẩn bị...';
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'https://vuotnhanh.com/zij1';
            link.download = 'Executor-PC-Velocity-v1.6.0.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            btn.textContent = 'Tải xuống thành công! ✓';
            btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            setTimeout(() => {
                btn.textContent = orig;
                btn.disabled = false;
                btn.style.background = '';
            }, 2000);
        }, 1000);
    }, 500);
});
