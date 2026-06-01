// Database Siswa SMP GKST Beteleme TA 2025/2026
const databaseSiswa = [
    { nisn: "0112924353", nama: "ALINE TAMANAMPO", status: "LULUS" },
    { nisn: "0116566147", nama: "ALVANDRI VALDES DURUKA", status: "LULUS" },
    { nisn: "0118670739", nama: "ALWY SUNRISE HINGKUA", status: "LULUS" },
    { nisn: "0118865339", nama: "CHANIA RISLIANTI SOEWAR", status: "LULUS" },
    { nisn: "0114895181", nama: "CHERIN VERLISYAH MONTORUTU", status: "LULUS" },
    { nisn: "0084725460", nama: "CRIS VERNANDO BATE", status: "LULUS" },
    { nisn: "0118471529", nama: "EUGENE JEREMI PUTRA. P", status: "LULUS" },
    { nisn: "0101273546", nama: "FARADILAH INAYA LAINURU", status: "LULUS" },
    { nisn: "0104228185", nama: "FITO MELQIOR MASE", status: "LULUS" },
    { nisn: "0111467498", nama: "GLEN ALFARIS KADOENA", status: "LULUS" },
    { nisn: "0118889293", nama: "JELITA ZEBAOTH", status: "LULUS" },
    { nisn: "0103068998", nama: "JUAN CHARLOS MEIDY NGANTUNG", status: "LULUS" },
    { nisn: "0112999426", nama: "MAUREN VALENCIA TAWERO", status: "LULUS" },
    { nisn: "0102546116", nama: "RAVI MANGELA", status: "LULUS" },
    { nisn: "0106730199", nama: "REYNARD BENEDICTA LAGASIH", status: "LULUS" },
    { nisn: "0118284655", nama: "RICARD AKOLO", status: "LULUS" },
    { nisn: "0106034620", nama: "SILVANA NOVALISA SINDA", status: "LULUS" },
    { nisn: "0094511866", nama: "SINDY PALAYUKAN", status: "TERTUNDA" },
    { nisn: "0102329731", nama: "STENLY ORLANDO HUMBU", status: "LULUS" },
    { nisn: "0114819708", nama: "YESLIAN SETMI POGO", status: "LULUS" },
    { nisn: "0111600088", nama: "YOAS IGLESIA DREANTAMA", status: "LULUS" },
    { nisn: "0106052414", nama: "ZEFANYA PRICILYA", status: "LULUS" }
];

// Pengaturan Jadwal Rilis Resmi: 1 Juni 2026, Pukul 10:00 Pagi WITA/WIB setempat
const targetDate = new Date("2026-06-01T10:00:00").getTime();

// --- LOGIKA COUNTDOWN (Untuk index.html) ---
function initCountdown() {
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.querySelector(".countdown-section").innerHTML = "<h3>Pengumuman Telah Dibuka!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }, 1000);
}

// --- LOGIKA CEK KELULUSAN (Untuk cek.html) ---
function prosesCekKelulusan() {
    const inputVal = document.getElementById("nisnInput").value.trim();
    const resultBox = document.getElementById("resultBox");
    const now = new Date().getTime();
    
    resultBox.className = "result-box"; // reset class
    stopFireworks(); // Reset kembang api jika ada sebelumnya

    if (!inputVal) {
        alert("Harap isi kolom pencarian terlebih dahulu!");
        return;
    }

    // 1. CEK FITUR ADMIN (Melihat Semua Data)
    if (inputVal.toUpperCase() === "ADMIN") {
        tampilkanSemuaSiswa(resultBox);
        return;
    }

    // 2. CEK FITUR ADMIN [NISN] (Bypass Jadwal Waktu)
    if (inputVal.toUpperCase().startsWith("ADMIN ")) {
        const targetNisn = inputVal.substring(6).trim();
        const siswa = databaseSiswa.find(s => s.nisn === targetNisn);
        if (siswa) {
            renderHasilSiswa(siswa, resultBox);
        } else {
            resultBox.innerHTML = "<p style='color:red; font-weight:bold;'>[Mode Admin] NISN Tidak ditemukan, harap cek kembali NISN Anda</p>";
        }
        return;
    }

    // 3. JALUR UMUM (Cek Batasan Waktu Rilis)
    if (now < targetDate) {
        resultBox.innerHTML = "<p style='color:#e67e22; font-weight:bold;'>Pengumuman kelulusan belum dimulai, harap dicek sesuai waktu yang telah ditentukan (1 Juni 2026, 10:00 Pagi).</p>";
        return;
    }

    // 4. JALUR UMUM (Cek Database Berdasarkan NISN)
    const siswa = databaseSiswa.find(s => s.nisn === inputVal);
    if (siswa) {
        renderHasilSiswa(siswa, resultBox);
    } else {
        resultBox.innerHTML = "<p style='color:red; font-weight:bold;'>NISN Tidak ditemukan, harap cek kembali NISN Anda</p>";
    }
}

// Render tampilan hasil perorangan
function renderHasilSiswa(siswa, element) {
    if (siswa.status === "LULUS") {
        element.classList.add("status-lulus");
        element.innerHTML = `
            <h3>Selamat! Anda Dinyatakan:</h3>
            <div class="badge badge-lulus">LULUS</div>
            <table class="admin-table" style="margin: 15px auto; max-width: 400px;">
                <tr><td><b>Nama</b></td><td>${siswa.nama}</td></tr>
                <tr><td><b>NISN</b></td><td>${siswa.nisn}</td></tr>
            </table>
            <p style="margin-top:15px; font-style:italic; font-weight:500;">
                "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku. Selamat melanjutkan ke jenjang berikutnya, raih cita-citamu demi kemuliaan Tuhan!"
            </p>
        `;
        startFireworks(); // Pemicu efek kembang api
    } else {
        element.classList.add("status-tertunda");
        element.innerHTML = `
            <h3>Pemberitahuan Status Kelulusan:</h3>
            <div class="badge badge-tertunda">TERTUNDA</div>
            <table class="admin-table" style="margin: 15px auto; max-width: 400px;">
                <tr><td><b>Nama</b></td><td>${siswa.nama}</td></tr>
                <tr><td><b>NISN</b></td><td>${siswa.nisn}</td></tr>
            </table>
            <p style="margin-top:15px; color:#b71c1c;">
                <strong>MOHON SEGERA MENGHADAP WALI KELAS UNTUK INFO LEBIH LANJUT.</strong>
            </p>
        `;
    }
}

// Render tampilan Admin melihat seluruh isi database
function tampilkanSemuaSiswa(element) {
    element.classList.add("status-lulus");
    let tabelHtml = `
        <h3 style="color:var(--primary-blue)">[MODE ADMIN] Data Kelulusan Seluruh Siswa</h3>
        <table class="admin-table">
            <thead>
                <tr>
                    <th>NISN</th>
                    <th>NAMA SISWA</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    databaseSiswa.forEach(s => {
        tabelHtml += `
            <tr>
                <td>${s.nisn}</td>
                <td>${s.nama}</td>
                <td style="font-weight:bold; color:${s.status === 'LULUS' ? 'green' : 'red'}">${s.status}</td>
            </tr>
        `;
    });

    tabelHtml += `</tbody></table>`;
    element.innerHTML = tabelHtml;
}


// --- ENGINE ANIMASI KEMBANG API (HTML5 CANVAS) ---
let canvas, ctx, animationFrameId;
let particles = [];

function startFireworks() {
    canvas = document.getElementById("fireworksCanvas");
    if(!canvas) return;
    ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    loopFireworks();
}

function stopFireworks() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    particles = [];
}

function createFirework(x, y) {
    const count = 60;
    const colors = ['#ff5252', '#ff7675', '#fdcb6e', '#00cec9', '#0984e3', '#6c5ce7', '#e84393'];
    const selectedColor = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: selectedColor,
            gravity: 0.06
        });
    }
}

function loopFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) { 
        createFirework(Math.random() * canvas.width, Math.random() * (canvas.height * 0.6));
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    animationFrameId = requestAnimationFrame(loopFireworks);
}