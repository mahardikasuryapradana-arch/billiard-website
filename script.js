const jumlahMeja = 12;
let reservasi = JSON.parse(localStorage.getItem("reservasi")) || [];

function updateStatus() {
  const today = document.getElementById("tanggal").value || new Date().toISOString().split("T")[0];
  const total = jumlahMeja;
  const booked = reservasi.filter(r => r.tanggal === today).length;
  const available = total - booked;
  document.getElementById("status").textContent = `Tersedia: ${available} meja | Terisi: ${booked} meja`;
}

function renderMeja() {
  const container = document.getElementById("meja-container");
  container.innerHTML = "";
  const today = document.getElementById("tanggal").value || new Date().toISOString().split("T")[0];
  for (let i = 1; i <= jumlahMeja; i++) {
    const booked = reservasi.some(r => r.meja === i && r.tanggal === today);
    const div = document.createElement("div");
    div.className = `p-4 rounded-lg text-center font-semibold ${booked ? "bg-red-400 text-white" : "bg-green-400 text-white"}`;
    div.textContent = `Meja ${i}`;
    container.appendChild(div);
  }
  updateDropdown(today);
  updateStatus();
}

function updateDropdown(tanggal) {
  const dropdown = document.getElementById("meja");
  dropdown.innerHTML = "";
  for (let i = 1; i <= jumlahMeja; i++) {
    const booked = reservasi.some(r => r.meja === i && r.tanggal === tanggal);
    if (!booked) {
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
    li.className = "flex justify-between items-center p-2 border rounded";
    li.innerHTML = `<span>${r.nama} - Meja ${r.meja} (${r.tanggal} ${r.jam})</span>`;
    const btn = document.createElement("button");
    btn.textContent = "Batal";
    btn.className = "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600";
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

document.getElementById("formReservasi").addEventListener("submit", e => {
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const tanggal = document.getElementById("tanggal").value;
  const jam = document.getElementById("jam").value;
  const meja = parseInt(document.getElementById("meja").value);

  if (reservasi.some(r => r.tanggal === tanggal && r.jam === jam && r.meja === meja)) {
    alert("Meja sudah dipesan pada waktu tersebut.");
    return;
  }

  reservasi.push({ nama, tanggal, jam, meja });
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