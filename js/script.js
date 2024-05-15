//file script.js
// Fungsi untuk menyimpan peran yang dipilih dan mengarahkan ke halaman login
function selectRole(role) {
  sessionStorage.setItem("selectedRole", role);
  window.location.href = "/html/login.html";
}

// Event listener yang dipanggil ketika dokumen telah dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.forms["loginForm"];
  if (loginForm) {
    // Event listener untuk meng-handle submit form login
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Panggil fungsi validasi form login
      if (validateLoginForm()) {
        const id = document.getElementById("id").value;
        const password = document.getElementById("password").value;

        if (id === "admin" && password === "admin") {
          const role = sessionStorage.getItem("selectedRole");
          if (role === "kasir") {
            window.location.href = "/html/kasir-Dashboard.html";
          } else if (role === "teknisi") {
            window.location.href = "/html/teknisi-Dashboard.html";
          } else {
            alert("Role tidak valid");
          }
        } else {
          alert("ID atau Password salah!");
        }
      }
    });
  }

  // Fungsi untuk logout
  const logoutButton = document.getElementById("logoutBtn");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
      event.preventDefault(); // Mencegah aksi default dari anchor tag
      swal({
        title: "Apakah kamu yakin ingin keluar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willLogout) => {
        if (willLogout) {
          window.location.href = "/index.html";
        }
      });
    });
  }

  // Panggil fungsi displayReports saat halaman dimuat
  const transaksiList = document.getElementById("transaksiList");
  if (transaksiList) {
    displayReports("transaksi");
  }

  // Call the function when the page is loaded
  handleSidebarButtons();

  // Also call handleSidebarButtons() when navigation occurs
  window.addEventListener("popstate", handleSidebarButtons);

  // Ambil elemen input dan tombol delete
  const deleteButton = document.getElementById("deleteBtn");
  if (deleteButton) {
    deleteButton.addEventListener("click", function () {
      const reportCode = document.getElementById("deleteRowIndex").value;
      deleteReportByReportCode(reportCode);
    });
  }

  const deleteAllBtn = document.getElementById("deleteAllBtn");
  if (deleteAllBtn) {
    deleteAllBtn.addEventListener("click", function () {
      const reports = JSON.parse(localStorage.getItem("reports"));
      if (!reports || reports.length === 0) {
        swal("Info", "Tidak ada data yang tersimpan.", "info");
      } else {
        swal({
          title: "Konfirmasi",
          text: "Masukkan password untuk menghapus semua data:",
          icon: "info",
          content: {
            element: "input",
            attributes: {
              type: "password",
              placeholder: "Password",
            },
          },
          buttons: {
            cancel: "Batal",
            confirm: {
              text: "Hapus",
              closeModal: false,
            },
          },
        }).then((password) => {
          if (password === "admin") {
            localStorage.removeItem("reports");
            swal("Success!", "Semua data berhasil dihapus.", "success").then(
              () => {
                location.reload();
              }
            );
          } else if (password === null) {
            // Jika pengguna menekan tombol "Batal", tidak melakukan apa-apa
          } else {
            swal("Error!", "Password tidak valid.", "error");
          }
        });
      }
    });
  }
});

function tambahBtn() {
  window.location.href = "/html/laporan.html"; // Sesuaikan dengan path menuju halaman dashboard yang benar
}

function goToDashboard() {
  window.location.href = "/html/kasir-Dashboard.html"; // Sesuaikan dengan path menuju halaman dashboard yang benar
}

// Panggil fungsi untuk menampilkan waktu setiap detik
setInterval(displayTime, 1000);

// Fungsi untuk menampilkan waktu
function displayTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;
  const clockElement = document.getElementById("clock");
  if (clockElement) {
    clockElement.textContent = timeString;
  }
}

// Fungsi untuk kembali ke halaman role
function goRole() {
  window.location.href = "/html/role.html";
}

//untuk kembali ke halaman sebelumnya
function goBack() {
  window.history.back();
}

// Fungsi untuk memvalidasi form login
function validateLoginForm() {
  const id = document.getElementById("id").value;
  const password = document.getElementById("password").value;

  const idError = document.getElementById("id-error");
  const passwordError = document.getElementById("password-error");
  const commonError = document.getElementById("common-error");

  idError.innerHTML = "";
  passwordError.innerHTML = "";
  commonError.innerHTML = "";

  if (id === "" && password === "") {
    commonError.innerHTML = "ID dan password belum diisi!";
    commonError.classList.remove("hidden");
    return false;
  }

  if (id === "") {
    idError.innerHTML = "Silakan masukkan ID anda!";
    return false;
  }

  if (password === "") {
    passwordError.innerHTML = "Silakan masukkan password anda!";
    return false;
  }

  return true;
}

// Fungsi untuk menampilkan tabel hasil submit
function displayReports(location) {
  const reports = JSON.parse(localStorage.getItem("reports"));
  let table;

  let totalLaporanMasuk = 0;
  let laporanHariIni = 0;

  if (location === "dashboard") {
    table = document.getElementById("notifikasiList");
  } else if (location === "transaksi") {
    table = document.getElementById("transaksiList");
  } else if (location === "teknisi-laporan") {
    table = document.getElementById("laporanList");
  }

  if (table) {
    table.innerHTML = "";
    table.classList.add("border-collapse");

    if (reports && reports.length > 0) {
      reports.forEach(function (report, index) {
        const row = table.insertRow();

        const indexCell = row.insertCell(0);
        indexCell.textContent = index + 1;
        indexCell.classList.add(
          "border",
          "border-gray-400",
          "px-4",
          "py-2",
          "text-center"
        );

        const dateCell = row.insertCell(1);
        dateCell.textContent = report.date;
        dateCell.classList.add(
          "border",
          "border-gray-400",
          "px-4",
          "py-2",
          "text-center"
        );

        const codeCell = row.insertCell(2);
        codeCell.textContent = report.code;
        codeCell.classList.add(
          "border",
          "border-gray-400",
          "px-4",
          "py-2",
          "text-center"
        );

        const ownerCell = row.insertCell(3);
        ownerCell.textContent = report.name;
        ownerCell.classList.add("border", "border-gray-400", "px-4", "py-2");

        const typeCell = row.insertCell(4);
        typeCell.textContent = report.type;
        typeCell.classList.add("border", "border-gray-400", "px-4", "py-2");

        const statusCell = row.insertCell(5);
        statusCell.textContent = report.status;
        statusCell.classList.add(
          "border",
          "border-gray-400",
          "px-4",
          "py-2",
          "text-center"
        );

        // Tambahkan tombol "Edit" hanya untuk tabel teknisi-laporan
        if (location === "teknisi-laporan") {
          const actionCell = row.insertCell(6);
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.classList.add(
            "editBtn",
            "rounded-full",
            "bg-blue-500",
            "text-white",
            "px-7",
            "py-2",
            "text-center",
            "justify-center"
          );
          editButton.addEventListener("click", function () {
            // Logika untuk menangani aksi edit
            // Misalnya, redirect ke halaman edit dengan mengirimkan kode laporan sebagai parameter
            const reportCode = report.code;
            window.location.href = "/html/detail.html?code=" + reportCode;
          });
          actionCell.appendChild(editButton);
        }

        actionCell.classList.add(
          "border",
          "border-gray-400",
          "px-4",
          "py-2",
          "text-center"
        );
      });
    } else {
      const row = table.insertRow();
      const cell = row.insertCell(0);
      cell.textContent = "Tidak ada laporan yang tersedia.";
      cell.colSpan = 6;
      cell.classList.add(
        "border",
        "border-gray-400",
        "px-4",
        "py-2",
        "text-center"
      );
    }
    totalLaporanMasuk++;

    const currentDate = new Date();
    const reportDate = new Date(report.date);
    if (currentDate.toDateString() === reportDate.toDateString()) {
      laporanHariIni++;
    }
  }

  const laporanMasuk = document.getElementById("laporanMasuk");
  if (laporanMasuk) {
    laporanMasuk.textContent = totalLaporanMasuk;
  }

  const laporanMasukHariIni = document.getElementById("laporanMasukHariIni");
  if (laporanMasukHariIni) {
    laporanMasukHariIni.textContent = laporanHariIni;
  }
}

// Retrieve report details from local storage
const reportDetails = JSON.parse(localStorage.getItem("selectedReport"));

// Populate HTML elements with report details
if (reportDetails) {
  document.getElementById("name").innerText = reportDetails.name;
  document.getElementById("address").innerText = reportDetails.address;
  document.getElementById("itemName").innerText = reportDetails.itemName;
  document.getElementById("brand").innerText = reportDetails.brand;
  document.getElementById("type").innerText = reportDetails.type;
  document.getElementById("complaint").innerText = reportDetails.complaint;
}

// Fungsi untuk memeriksa apakah tanggal adalah hari ini
function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

// Fungsi untuk mengarahkan ke halaman laporan
function goToReport() {
  window.location.href = "/html/laporan.html";
}

// Fungsi untuk membuat kode laporan berdasarkan tanggal dan urutan submit
function generateReportCode(date, reports) {
  const day = ("0" + date.getDate()).slice(-2); // Mendapatkan tanggal dalam format DD
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Mendapatkan bulan dalam format MM
  const year = date.getFullYear().toString().slice(-2); // Mendapatkan tahun dalam format YY

  // Mendapatkan jumlah laporan pada tanggal yang sama
  const count =
    reports.filter((report) => {
      const reportDate = new Date(report.date);
      return (
        reportDate.getDate() === date.getDate() &&
        reportDate.getMonth() === date.getMonth() &&
        reportDate.getFullYear() === date.getFullYear()
      );
    }).length + 1;

  // Menggabungkan tanggal, bulan, tahun, dan urutan submit untuk membuat kode
  const code = `${day}${month}${year}${("0" + count).slice(-2)}`;
  return code;
}

// Fungsi untuk menyimpan laporan ke Local Storage
function saveReportToLocalStorage(reportCode) {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const itemName = document.getElementById("itemName").value;
  const brand = document.getElementById("brand").value;
  const type = document.getElementById("type").value;
  const complaint = document.getElementById("complaint").value;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  const report = {
    code: reportCode,
    date: formattedDate,
    name: name,
    address: address,
    itemName: itemName,
    brand: brand,
    type: type,
    complaint: complaint,
    status: "Belum diperbaiki",
  };

  const reports = JSON.parse(localStorage.getItem("reports")) || [];
  reports.push(report);
  localStorage.setItem("reports", JSON.stringify(reports));

  console.log("Data tersimpan:", reports); // Tambahkan log ini
}

// Fungsi untuk menyimpan laporan
function submitReport() {
  // Validasi apakah semua input diisi
  if (validateInputForm()) {
    // Validasi apakah semua input berisi data yang benar
    if (validateData()) {
      // Mendapatkan tanggal saat ini
      const currentDate = new Date();
      // Membuat kode laporan
      const reportCode = generateReportCode(
        currentDate,
        JSON.parse(localStorage.getItem("reports")) || []
      );

      // Simpan data ke Local Storage
      saveReportToLocalStorage(reportCode);
      // Tampilkan pesan sukses
      swal("Success!", "Laporan berhasil disimpan.", "success").then(() => {
        // Redirect ke halaman dashboard.html setelah pengguna menekan OK pada pesan sukses
        window.location.href = "/html/kasir-Dashboard.html";
      });
      // Di sini bisa dilakukan penyimpanan data ke server atau local storage
    } else {
      // Jika ada data yang tidak valid, tampilkan pesan error
      swal("Error!", "Mohon isi data dengan benar.", "error");
    }
  } else {
    // Jika ada input yang kosong, tampilkan pesan error
    swal("Error!", "Mohon lengkapi semua data.", "error");
  }
}

// Fungsi untuk validasi input form
function validateInputForm() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const itemName = document.getElementById("itemName").value;
  const brand = document.getElementById("brand").value;
  const type = document.getElementById("type").value;
  const complaint = document.getElementById("complaint").value;

  if (name && address && itemName && brand && type && complaint) {
    return true; // Semua input terisi
  } else {
    return false; // Ada input yang kosong
  }
}

// Fungsi untuk validasi data yang diinput
function validateData() {
  // Di sini bisa dilakukan validasi khusus untuk masing-masing jenis data
  // Misalnya, validasi apakah email valid, apakah format tanggal benar, dll.
  // Untuk contoh sederhana, kita akan asumsikan semua data yang diisi adalah benar
  return true;
}

// Fungsi untuk meng-handle tombol sidebar
function handleSidebarButtons() {
  const sidebarButtons = document.querySelectorAll("#sidebar a");
  sidebarButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      sidebarButtons.forEach((btn) =>
        btn.classList.remove("bg-gray-100", "dark:bg-gray-800")
      );
      this.classList.add("bg-gray-100", "dark:bg-gray-800");
    });
  });
}

function clearForm() {
  // Dapatkan semua elemen input dalam form
  const form = document.forms["reportForm"];
  if (form) {
    form.reset();
  }
}

// Fungsi untuk menghapus laporan berdasarkan kode laporan
function deleteReportByReportCode(reportCode) {
  const reports = JSON.parse(localStorage.getItem("reports")) || [];
  const updatedReports = reports.filter(
    (report) => report.reportCode !== reportCode
  );

  if (updatedReports.length === reports.length) {
    swal("Error!", "Laporan tidak ditemukan.", "error");
    return;
  }

  localStorage.setItem("reports", JSON.stringify(updatedReports));
  swal("Success!", "Laporan berhasil dihapus.", "success").then(() => {
    location.reload();
  });
}

// Setelah halaman baru dimuat, panggil kembali handleSidebarButtons()
window.addEventListener("load", handleSidebarButtons);
