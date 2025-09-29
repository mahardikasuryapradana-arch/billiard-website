const jumlahMeja = 12;
let reservasi = JSON.parse(localStorage.getItem("reservasi")) || [];

// Fungsi untuk update status meja
function updateStatus() {
  const today = document.getElementById("tanggal").value || new Date().toISOString().split("T")[0];
  const total = jumlahMeja;
  const booked = reservasi.filter(r => r.tanggal === today).length;
  const available = total - booked;
  document.getElementById("status").textContent = `Tersedia: ${available} meja | Terisi: ${booked} meja`;
}

// Render meja di grid
function renderMeja() {
  const container = document.getElementById("meja-container");
  container.innerHTML = "";
  const today = document.getElementById("tanggal").value || new Date().toISOString().split("T")[0];
  const now = Date.now();

  reservasi = reservasi.filter(r => r.endTime > now); // hapus reservasi yang sudah habis
  localStorage.setItem("reservasi", JSON.stringify(reservasi));

  for (let i = 1; i <= jumlahMeja; i++) {
    const booked = reservasi.some(r => r.meja === i && r.tanggal === today);
    const div = document.createElement("div");
    div.className = `p-6 rounded-2xl text-center font-semibold ${booked ? "bg-red-500 text-white shadow-md" : "bg-green-400 text-white shadow-md"}`;
    div.textContent = `Meja ${i}`;
    container.appendChild(div);
  }
  updateDropdown(today);
  updateStatus();
}

// Update dropdown meja yang tersedia
function updateDropdown(tanggal) {
  const dropdown = document.getElementById("meja");
  dropdown.innerHTML = "";
  const now = Date.now();
  for (let i = 1; i <= jumlahMeja; i++) {
    const booked = reservasi.some(r => r.meja === i && r.tanggal === tanggal && r.endTime > now);
    if (!booked) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Meja ${i}`;
      dropdown.appendChild(option);
    }
  }
}

// Render daftar reservasi dengan countdown
function renderReservasi() {
  const list = document.getElementById("daftarReservasi");
  list.innerHTML = "";
  const now = Date.now();

  reservasi = reservasi.filter(r => r.endTime > now); // hapus reservasi habis
  localStorage.setItem("reservasi", JSON.stringify(reservasi));

  reservasi.forEach((r, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center p-3 border rounded-lg shadow-sm bg-gray-50";

    const timerSpan = document.createElement("span");
    function updateTimer() {
      const remaining = Math.max(0, r.endTime - Date.now());
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      timerSpan.textContent = `Sisa waktu: ${minutes}m ${seconds}s`;
      if (remaining <= 0) {
        reservasi.splice(index, 1);
        localStorage.setItem("reservasi", JSON.stringify(reservasi));
        renderMeja();
        renderReservasi();
      }
    }
    updateTimer();
    setInterval(updateTimer, 1000);

    li.innerHTML = `<span>${r.nama} - Meja ${r.meja} (${r.tanggal} ${r.jam})</span>`;
    li.appendChild(timerSpan);

    const btn = document.createElement("button");
    btn.textContent = "Batal";
    btn.className = "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-3";
    btn.onclick = () => {
      reservasi.splice(index, 1);
      localStorage.setItem("reservasi", JSON.stringify(reservasi));
      renderMeja();
      renderReservasi();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Form reservasi
document.getElementById("formReservasi").addEventListener("submit", e => {
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const tanggal = document.getElementById("tanggal").value;
  const jam = document.getElementById("jam").value;
  const meja = parseInt(document.getElementById("meja").value);
  const durasi = parseInt(document.getElementById("durasi").value) || 60; // durasi menit

  const endTime = new Date(`${tanggal}T${jam}`).getTime() + durasi * 60000;

  if (reservasi.some(r => r.tanggal === tanggal && r.jam === jam && r.meja === meja)) {
    alert("Meja sudah dipesan pada waktu tersebut.");
    return;
  }

  reservasi.push({ nama, tanggal, jam, meja, durasi, endTime });
  localStorage.setItem("reservasi", JSON.stringify(reservasi));
  renderMeja();
  renderReservasi();
  e.target.reset();
});

document.getElementById("tanggal").addEventListener("change", renderMeja);

window.onload = () => {
  document.getElementById("tanggal").value = new Date().toISOString().split("T")[0];
  renderMeja();
  renderReservasi();
};
