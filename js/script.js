//file script.js
// Fungsi untuk menyimpan peran yang dipilih dan mengarahkan ke halaman login
function selectRole(role) {
  sessionStorage.setItem("selectedRole", role);
  window.location.href = "/html/login.html";
}

// Event listener yang dipanggil ketika dokumen telah dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.forms["loginForm"];

  // Event listener untuk meng-handle submit form login
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

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
    }
  });

  // Fungsi untuk logout
  const logoutButton = document.getElementById('logoutBtn');

  logoutButton.addEventListener('click', function (event) {
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

  // Panggil fungsi displayReports saat halaman dimuat
  const transaksiList = document.getElementById("transaksiList");
  transaksiList.innerHTML = "";
  displayReports();

  // Call the function when the page is loaded
  handleSidebarButtons();

  // Also call handleSidebarButtons() when navigation occurs
  window.addEventListener("popstate", handleSidebarButtons);
});



// Panggil fungsi untuk menampilkan waktu setiap detik
setInterval(displayTime, 1000);

// Fungsi untuk menampilkan waktu
function displayTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("clock").textContent = timeString;
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
function validateForm() {
  var id = document.getElementById("id").value;
  var password = document.getElementById("password").value;

  var idError = document.getElementById("id-error");
  var passwordError = document.getElementById("password-error");
  var commonError = document.getElementById("common-error");

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

  if (id !== "admin") {
    idError.innerHTML = "ID tidak valid!";
    document.getElementById("id").value = "";
    document.getElementById("password").value = "";
    return false;
  }

  if (password !== "admin") {
    passwordError.innerHTML = "Password tidak valid!";
    document.getElementById("password").value = "";
    return false;
  }
  return true;
}


// Fungsi untuk menampilkan tabel hasil submit
function displayReports(location) {
  // Ambil data dari Local Storage
  var reports = JSON.parse(localStorage.getItem("reports"));
  var table;

  // Variabel untuk menyimpan jumlah laporan yang masuk hari ini
  var totalLaporanMasuk = 0;
  var laporanHariIni = 0;

  // Tentukan elemen tabel berdasarkan lokasi
  if (location === "dashboard") {
    table = document.getElementById("notifikasiList"); // Menggunakan ID notifikasiList untuk kasir-dashboard.html
  } else if (location === "transaksi") {
    table = document.getElementById("transaksiList"); // Menggunakan ID transaksiList untuk kasir-transaksi.html
  } else if (location === "teknisi-laporan") {
    table = document.getElementById("laporanList"); // Menggunakan ID laporanList untuk teknisi-laporan.html
  }

  // Bersihkan isi tabel sebelum menampilkan data baru
  table.innerHTML = "";

  // Tambahkan kelas border-collapse ke elemen tabel
  table.classList.add("border-collapse");

  // Cek apakah ada data
  if (reports && reports.length > 0) {
    reports.forEach(function (report, index) {
      // Buat baris baru untuk setiap laporan
      var row = table.insertRow();

      // Isi kolom nomor urut
      var indexCell = row.insertCell(0);
      indexCell.textContent = index + 1; // Nomor urut dimulai dari 1
      indexCell.classList.add(
        "border",
        "border-gray-400",
        "px-4",
        "py-2",
        "text-center"
      ); // Tambahkan kelas border dengan ketebalan 1px dan warna sesuai dengan Tailwind CSS

      // Isi kolom tanggal
      var dateCell = row.insertCell(1);
      dateCell.textContent = report.date;
      dateCell.classList.add(
        "border",
        "border-gray-400",
        "px-4",
        "py-2",
        "text-center"
      );

      // Isi kolom kode
      var codeCell = row.insertCell(2);
      codeCell.textContent = report.code;
      codeCell.classList.add(
        "border",
        "border-gray-400",
        "px-4",
        "py-2",
        "text-center"
      );

      // Isi kolom nama pemilik
      var nameCell = row.insertCell(3);
      nameCell.textContent = report.name;
      nameCell.classList.add("border", "border-gray-400", "px-4", "py-2");

      // Isi kolom tipe barang
      var typeCell = row.insertCell(4);
      typeCell.textContent = report.type;
      typeCell.classList.add("border", "border-gray-400", "px-4", "py-2");

      // Isi kolom status
      var statusCell = row.insertCell(5);
      statusCell.textContent = report.status;
      statusCell.classList.add("border", "border-gray-400", "px-4", "py-2");

      // Tambahkan kelas Tailwind CSS untuk warna latar belakang sesuai dengan status
      if (report.status === "Belum diperbaiki") {
        statusCell.classList.add("bg-red-500");
      } else if (report.status === "Sedang Diperbaiki") {
        statusCell.classList.add("bg-yellow-500");
      } else if (report.status === "Selesai diperbaiki") {
        statusCell.classList.add("bg-green-500");
      }

      // Tambahkan kelas Tailwind CSS untuk warna teks (putih) dan tebal
      statusCell.classList.add("text-white", "font-bold");

      // Isi kolom button detail (hanya untuk teknisi-laporan)
      if (location === "teknisi-laporan") {
        var detailCell = row.insertCell(6);
        detailCell.classList.add(
          "border",
          "border-gray-400",
          "px-4",
          "py-2",
          "text-center"
        ); // Tambahkan kelas text-center di sini
        var detailButton = document.createElement("button");
        detailButton.textContent = "Detail";
        detailButton.classList.add(
          "bg-blue-500",
          "hover:bg-blue-700",
          "text-white",
          "font-bold",
          "py-2",
          "px-4",
          "rounded"
        );
        // Atur event listener untuk button detail
        detailButton.addEventListener("click", function () {
          // Dapatkan kode laporan dari data pada baris yang sama
          const reportCode = report.code;

          // Ambil data laporan yang sesuai dengan kode dari local storage
          const selectedReport = reports.find(
            (report) => report.code === reportCode
          );

          // Periksa apakah laporan ditemukan
          if (selectedReport) {
            // Simpan data laporan terpilih ke dalam local storage
            localStorage.setItem(
              "selectedReport",
              JSON.stringify(selectedReport)
            );

            // Redirect ke halaman detail.html
            window.location.href = "/html/detail.html";
          } else {
            // Tampilkan pesan jika laporan tidak ditemukan
            swal("Error!", "Laporan tidak ditemukan.", "error");
          }
        });

        detailCell.appendChild(detailButton);
      }
    });
  } else {
    // Tampilkan pesan jika tidak ada laporan
    var row = table.insertRow();
    var cell = row.insertCell();
    cell.colSpan = 6; // Sesuaikan jumlah kolom
    cell.textContent = "Tidak ada laporan yang tersedia.";
    row.classList.add("border", "border-gray-400"); // Tambahkan kelas border dengan ketebalan 1px dan warna sesuai dengan Tailwind CSS pada baris
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
  // Ambil nilai dari input form
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const itemName = document.getElementById("itemName").value;
  const brand = document.getElementById("brand").value;
  const type = document.getElementById("type").value;
  const complaint = document.getElementById("complaint").value;

  // Ambil tanggal saat ini
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(); // Format tanggal sesuai preferensi

  // Buat objek laporan
  const report = {
    code: reportCode, // Tambahkan kode laporan
    date: formattedDate,
    name: name,
    address: address,
    itemName: itemName,
    brand: brand,
    type: type,
    complaint: complaint,
    status: "Belum diperbaiki", // Status default
  };

  // Ambil laporan yang sudah ada di Local Storage atau inisialisasi array kosong jika belum ada
  const reports = JSON.parse(localStorage.getItem("reports")) || [];

  // Tambahkan laporan baru ke array laporan
  reports.push(report);

  // Simpan array laporan ke Local Storage
  localStorage.setItem("reports", JSON.stringify(reports));
}

// Fungsi untuk menyimpan laporan
function submitReport() {
  // Validasi apakah semua input diisi
  if (validateForm()) {
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
function validateForm() {
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

/// Function to handle sidebar button behavior
function handleSidebarButtons() {
  const currentPath = window.location.pathname;
  const buttons = document.querySelectorAll(".sidebar a");

  buttons.forEach((button) => {
    // Remove 'active' class from all buttons
    button.classList.remove("active");

    // Check if button's href matches current path
    if (button.getAttribute("href") === currentPath) {
      button.classList.add("active"); // Add 'active' class to the matched button
    }
  });
}



// Ambil elemen input dan tombol delete
const deleteButton = document.getElementById("deleteBtn"); // Ubah id tombol

// Tambahkan event listener untuk tombol delete
deleteButton.addEventListener("click", function () {
  // Dapatkan nilai kode laporan yang dimasukkan pengguna
  const reportCode = document.getElementById("deleteRowIndex").value;

  // Panggil fungsi untuk menghapus laporan berdasarkan kode laporan
  deleteReportByReportCode(reportCode);
});

// Fungsi untuk menghapus laporan dari local storage berdasarkan kode laporan
function deleteReportByReportCode(reportCode) {
  // Ambil data laporan dari local storage
  const reports = JSON.parse(localStorage.getItem("reports")) || [];

  // Temukan indeks laporan yang memiliki kode laporan yang sesuai
  const index = reports.findIndex((report) => report.code === reportCode);

  // Jika laporan dengan kode laporan yang sesuai ditemukan
  if (index !== -1) {
    // Hapus laporan dari array berdasarkan indeks
    reports.splice(index, 1);

    // Simpan kembali data laporan yang telah diperbarui ke local storage
    localStorage.setItem("reports", JSON.stringify(reports));

    // Tampilkan pesan sukses
    swal("Success!", "Laporan berhasil dihapus.", "success").then(() => {
      // Perbarui tampilan tabel
      displayReports();
    });
  } else {
    // Jika laporan dengan kode laporan yang sesuai tidak ditemukan
    swal("Error!", "Kode laporan tidak ditemukan.", "error"); // Tampilkan pesan error
  }
}

// Ambil elemen button "Hapus Semua Data"
const deleteAllBtn = document.getElementById("deleteAllBtn");

// Tambahkan event listener untuk tombol "Hapus Semua Data"
deleteAllBtn.addEventListener("click", function () {
  // Cek apakah ada data yang tersimpan di Local Storage
  const reports = JSON.parse(localStorage.getItem("reports"));
  if (!reports || reports.length === 0) {
    // Jika tidak ada data yang tersimpan, tampilkan pesan bahwa tidak ada data yang bisa dihapus
    swal("Info", "Tidak ada data yang tersimpan.", "info");
  } else {
    // Jika ada data yang tersimpan, tampilkan pop-up untuk memasukkan password admin
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
      // Validasi password admin
      if (password === "admin") {
        // Hapus semua data dari Local Storage
        localStorage.removeItem("reports");
        // Tampilkan pesan sukses setelah data dihapus
        swal("Success!", "Semua data berhasil dihapus.", "success").then(() => {
          // Muat ulang halaman untuk menyegarkan tampilan
          location.reload();
        });
      } else if (password === null) {
        // Jika pengguna menekan tombol "Batal", tidak melakukan apa-apa
      } else {
        // Tampilkan pesan kesalahan jika password admin tidak valid
        swal("Error!", "Password tidak valid.", "error");
      }
    });
  }
});

// Setelah halaman baru dimuat, panggil kembali handleSidebarButtons()
window.addEventListener("load", handleSidebarButtons);

function tambahBtn() {
  window.location.href = "/html/laporan.html"; // Sesuaikan dengan path menuju halaman dashboard yang benar
}

function goToDashboard() {
  window.location.href = "/html/kasir-Dashboard.html"; // Sesuaikan dengan path menuju halaman dashboard yang benar
}
