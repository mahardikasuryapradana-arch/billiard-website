const jumlahMeja = 12;
let reservasi = JSON.parse(localStorage.getItem("reservasi")) || [];
let openPlay = JSON.parse(localStorage.getItem("openPlay")) || [];

function updateStatus() {
  const total = jumlahMeja;
  const booked = reservasi.length + openPlay.length;
  const available = total - booked;
  document.getElementById("status").textContent = `Tersedia: ${available} meja | Terisi: ${booked} meja`;
}

function renderMeja() {
  const container = document.getElementById("meja-container");
  container.innerHTML = "";

  for (let i = 1; i <= jumlahMeja; i++) {
    const booked = reservasi.some(r => r.meja === i) || openPlay.some(r => r.meja === i);
    const div = document.createElement("div");
    div.className = `p-6 rounded-2xl text-center font-semibold ${booked ? "bg-red-500 text-white shadow-md" : "bg-green-400 text-white shadow-md"}`;
    div.textContent = `Meja ${i}`;
    container.appendChild(div);
  }

  updateDropdown();
  updateOpenDropdown();
  updateStatus();
}

// Update dropdown form reguler
function updateDropdown() {
  const dropdown = document.getElementById("meja");
  dropdown.innerHTML = "";
  for (let i = 1; i <= jumlahMeja; i++) {
    if (!reservasi.some(r => r.meja === i) && !openPlay.some(r => r.meja === i)) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Meja ${i}`;
      dropdown.appendChild(option);
    }
  }
}

// Update dropdown form open play
function updateOpenDropdown() {
  const dropdown = document.getElementById("mejaOpen");
  dropdown.innerHTML = "";
  for (let i = 1; i <= jumlahMeja; i++) {
    if (!reservasi.some(r => r.meja === i) && !openPlay.some(r => r.meja === i)) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Meja ${i}`;
      dropdown.appendChild(option);
    }
  }
}

// Render daftar reservasi reguler
function renderReservasi() {
  const list = document.getElementById("daftarReservasi");
  list.innerHTML = "";

  reservasi.forEach((r, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center p-3 border rounded-lg shadow-sm bg-gray-50";

    const timerSpan = document.createElement("span");
    function updateTimer() {
      const remaining = Math.max(0, r.endTime - Date.now());
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      timerSpan.textContent = `Sisa waktu: ${hours}h ${minutes}m ${seconds}s`;
      if (remaining <= 0) {
        reservasi.splice(index, 1);
        localStorage.setItem("reservasi", JSON.stringify(reservasi));
        renderMeja();
        renderReservasi();
      }
    }
    updateTimer();
    setInterval(updateTimer, 1000);

    li.innerHTML = `<span>${r.nama} - Meja ${r.meja}</span>`;
    li.appendChild(timerSpan);

    const btn = document.createElement("button");
    btn.textContent = "Selesai";
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

// Render daftar open play
function renderOpenPlay() {
  const list = document.getElementById("daftarOpenPlay");
  list.innerHTML = "";

  openPlay.forEach((r, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center p-3 border rounded-lg shadow-sm bg-gray-50";

    const timerSpan = document.createElement("span");
    function updateTimer() {
      const elapsed = Date.now() - r.startTime;
      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      timerSpan.textContent = `Waktu main: ${hours}h ${minutes}m ${seconds}s`;
    }
    updateTimer();
    setInterval(updateTimer, 1000);

    li.innerHTML = `<span>${r.nama} - Meja ${r.meja} (Open Play)</span>`;
    li.appendChild(timerSpan);

    const btn = document.createElement("button");
    btn.textContent = "Selesai";
    btn.className = "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-3";
    btn.onclick = () => {
      openPlay.splice(index, 1);
      localStorage.setItem("openPlay", JSON.stringify(openPlay));
      renderMeja();
      renderOpenPlay();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Form reguler submit
document.getElementById("formReservasi").addEventListener("submit", e => {
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim();
const jumlahMeja = 12;
let reservasi = JSON.parse(localStorage.getItem("reservasi")) || [];
let openPlay = JSON.parse(localStorage.getItem("openPlay")) || [];

function updateStatus() {
  const total = jumlahMeja;
  const booked = reservasi.length + openPlay.length;
  const available = total - booked;
  document.getElementById("status").textContent = `Tersedia: ${available} meja | Terisi: ${booked} meja`;
}

function renderMeja() {
  const container = document.getElementById("meja-container");
  container.innerHTML = "";

  for (let i = 1; i <= jumlahMeja; i++) {
    const booked = reservasi.some(r => r.meja === i) || openPlay.some(r => r.meja === i);
    const div = document.createElement("div");
    div.className = `p-6 rounded-2xl text-center font-semibold ${booked ? "bg-red-500 text-white shadow-md" : "bg-green-400 text-white shadow-md"}`;
    div.textContent = `Meja ${i}`;
    container.appendChild(div);
  }

  updateDropdown();
  updateOpenDropdown();
  updateStatus();
}

function updateDropdown() {
  const dropdown = document.getElementById("meja");
  dropdown.innerHTML = "";
  for (let i = 1; i <= jumlahMeja; i++) {
    if (!reservasi.some(r => r.meja === i) && !openPlay.some(r => r.meja === i)) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Meja ${i}`;
      dropdown.appendChild(option);
    }
  }
}

function updateOpenDropdown() {
  const dropdown = document.getElementById("mejaOpen");
  dropdown.innerHTML = "";
  for (let i = 1; i <= jumlahMeja; i++) {
    if (!reservasi.some(r => r.meja === i) && !openPlay.some(r => r.meja === i)) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Meja ${i}`;
      dropdown.appendChild(option);
    }
  }
}

function renderReservasi() {
  const list = document.getElementById("daftarReservasi");
  list.innerHTML = "";
  reservasi.forEach((r, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center p-3 border rounded-lg shadow-sm bg-gray-50";

    const timerSpan = document.createElement("span");
    function updateTimer() {
      const remaining = Math.max(0, r.endTime - Date.now());
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      timerSpan.textContent = `Sisa waktu: ${hours}h ${minutes}m ${seconds}s`;
      if (remaining <= 0) {
        reservasi.splice(index, 1);
        localStorage.setItem("reservasi", JSON.stringify(reservasi));
        renderMeja();
        renderReservasi();
      }
    }
    updateTimer();
    setInterval(updateTimer, 1000);

    li.innerHTML = `<span>${r.nama} - Meja ${r.meja}</span>`;
    li.appendChild(timerSpan);

    const btn = document.createElement("button");
    btn.textContent = "Selesai";
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

function renderOpenPlay() {
  const list = document.getElementById("daftarOpenPlay");
  list.innerHTML = "";
  openPlay.forEach((r, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center p-3 border rounded-lg shadow-sm bg-gray-50";

    const timerSpan = document.createElement("span");
    function updateTimer() {
      const elapsed = Date.now() - r.startTime;
      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      timerSpan.textContent = `Waktu main: ${hours}h ${minutes}m ${seconds}s`;
    }
    updateTimer();
    setInterval(updateTimer, 1000);

    li.innerHTML = `<span>${r.nama} - Meja ${r.meja} (Open Play)</span>`;
    li.appendChild(timerSpan);

    const btn = document.createElement("button");
    btn.textContent = "Selesai";
    btn.className = "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-3";
    btn.onclick = () => {
      openPlay.splice(index, 1);
      localStorage.setItem("openPlay", JSON.stringify(openPlay));
      renderMeja();
      renderOpenPlay();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

document.getElementById("formReservasi").addEventListener("submit", e => {
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const meja = parseInt(document.getElementById("meja").value);
  const durasiJam = parseFloat(document.getElementById("durasi").value) || 1;

  if (reservasi.some(r => r.meja === meja) || openPlay.some(r => r.meja === meja)) {
    alert("Meja sedang digunakan.");
    return;
  }

  const endTime = Date.now() + durasiJam * 3600000;
  reservasi.push({ nama, meja, durasiJam, endTime });
  localStorage.setItem("reservasi", JSON.stringify(reservasi));

  renderMeja();
  renderReservasi();
  e.target.reset();
});

document.getElementById("formOpenPlay").addEventListener("submit", e => {
  e.preventDefault();
  const nama = document.getElementById("namaOpen").value.trim();
  const meja = parseInt(document.getElementById("mejaOpen").value);

  if (reservasi.some(r => r.meja === meja) || openPlay.some(r => r.meja === meja)) {
    alert("Meja sedang digunakan.");
    return;
  }

  const startTime = Date.now();
  openPlay.push({ nama, meja, startTime });
  localStorage.setItem("openPlay", JSON.stringify(openPlay));

  renderMeja();
  renderOpenPlay();
  e.target.reset();
});

window.onload = () => {
  renderMeja();
  renderReservasi();
  renderOpenPlay();
};


