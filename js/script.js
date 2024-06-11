//file script.js
// Fungsi untuk menyimpan peran yang dipilih dan mengarahkan ke halaman login
function selectRole(role) {
  sessionStorage.setItem("selectedRole", role);
  window.location.href = "/html/login.html";
}

// Fungsi untuk menghasilkan tabel
function generateTable() {
  // Mendapatkan nilai dari textarea detail perbaikan
  const repairDetail = document.getElementById("repairDetail").value.trim();
  if (repairDetail) {
    // Split setiap baris detail perbaikan
    const rows = repairDetail.split("\n");
    const tableContainer = document.getElementById("tableContainer");

    // Hapus judul kolom jika sudah ada
    const existingHeader = tableContainer.querySelector("thead");
    if (existingHeader) {
      existingHeader.remove();
    }

    // Tambahkan nama kolom
    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const columnHeader1 = document.createElement("th");
    columnHeader1.textContent = "Jumlah";
    const columnHeader2 = document.createElement("th");
    columnHeader2.textContent = "Nama";
    const columnHeader3 = document.createElement("th");
    columnHeader3.textContent = "Tipe";
    const columnHeader4 = document.createElement("th");
    columnHeader4.textContent = "Harga";
    const columnHeader5 = document.createElement("th"); // Kolom untuk tombol hapus baris
    columnHeader5.textContent = "Aksi"; // Nama kolom untuk tombol aksi
    headerRow.appendChild(columnHeader1);
    headerRow.appendChild(columnHeader2);
    headerRow.appendChild(columnHeader3);
    headerRow.appendChild(columnHeader4);
    headerRow.appendChild(columnHeader5); // Menambahkan kolom aksi
    tableHeader.appendChild(headerRow);
    tableContainer.appendChild(tableHeader);

    // Tambahkan baris-baris baru
    rows.forEach((row) => {
      // Buat baris baru untuk setiap detail perbaikan
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const input1 = document.createElement("input");
      input1.setAttribute("type", "text");
      input1.classList.add(
        "border",
        "rounded",
        "px-4",
        "py-2",
        "w-full",
        "focus:outline-none",
        "focus:ring",
        "focus:border-blue-300"
      );
      td1.appendChild(input1);
      tr.appendChild(td1);
      const td2 = document.createElement("td");
      const input2 = document.createElement("input");
      input2.setAttribute("type", "text");
      input2.classList.add(
        "border",
        "rounded",
        "px-4",
        "py-2",
        "w-full",
        "focus:outline-none",
        "focus:ring",
        "focus:border-blue-300"
      );
      td2.appendChild(input2);
      tr.appendChild(td2);
      const td3 = document.createElement("td");
      const input3 = document.createElement("input");
      input3.setAttribute("type", "text");
      input3.classList.add(
        "border",
        "rounded",
        "px-4",
        "py-2",
        "w-full",
        "focus:outline-none",
        "focus:ring",
        "focus:border-blue-300"
      );
      td3.appendChild(input3);
      tr.appendChild(td3);
      const td4 = document.createElement("td");
      const input4 = document.createElement("input");
      input4.setAttribute("type", "text");
      input4.classList.add(
        "border",
        "rounded",
        "px-4",
        "py-2",
        "w-full",
        "focus:outline-none",
        "focus:ring",
        "focus:border-blue-300"
      );
      td4.appendChild(input4);
      tr.appendChild(td4);

      // Tambahkan tombol hapus baris
      const td5 = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Hapus";
      deleteButton.classList.add(
        "bg-red-500",
        "hover:bg-red-600",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded"
      );
      deleteButton.addEventListener("click", function () {
        tr.remove(); // Hapus baris saat tombol hapus ditekan

        // Cek apakah masih ada baris tersisa setelah penghapusan
        if (tableContainer.querySelectorAll("tbody tr").length === 0) {
          // Jika tidak ada, hapus judul kolom juga
          tableHeader.remove();
        }
      });
      td5.appendChild(deleteButton);
      tr.appendChild(td5);

      // Tambahkan baris ke dalam tabel
      tableContainer.appendChild(tr);
    });
  } else {
    // Tampilkan pesan jika detail perbaikan kosong
    Swal.fire({
      title: "Detail Perbaikan Kosong",
      text: "Silakan masukkan detail perbaikan terlebih dahulu",
      icon: "info",
    });
  }
}

// Event listener yang dipanggil ketika dokumen telah dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.forms["loginForm"];
  if (loginForm) {
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
        } else if (role === "admin") {
          window.location.href = "/html/admin-Dashboard.html";
        } else {
          alert("Role tidak valid");
        }
      }
    });
  }

  // Fungsi untuk logout
  const logoutButton = document.getElementById("logoutBtn");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
      event.preventDefault(); // Mencegah aksi default dari anchor tag

      // Tampilkan sweetalert2 dialog
      Swal.fire({
        title: "Apakah kamu yakin ingin keluar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, keluar",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          // Jika pengguna menekan tombol "Ya, keluar", arahkan ke halaman index.html
          window.location.href = "/index.html";
        }
      });
    });
  }

  // Panggil fungsi displayReports saat halaman dimuat
  const transaksiList = document.getElementById("transaksiList");
  if (transaksiList) {
    transaksiList.innerHTML = "";
    displayReports();
  }

  // Also call handleSidebarButtons() when navigation occurs
  window.addEventListener("popstate", handleSidebarButtons);

  const searchButton = document.getElementById("searchBtn"); // Ubah id tombol pencarian
  if (searchButton) {
    // Tambahkan event listener untuk tombol pencarian
    searchButton.addEventListener("click", function () {
      // Dapatkan nilai kode laporan yang dimasukkan pengguna
      const reportCode = document.getElementById("searchRowIndex").value;

      // Panggil fungsi untuk mencari laporan berdasarkan kode laporan
      searchReportByReportCode(reportCode);
    });
  }

  // Fungsi untuk mencari laporan berdasarkan kode laporan
  function searchReportByReportCode(code) {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const filteredReports = reports.filter((report) => report.code === code);

    if (filteredReports.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Laporan tidak ditemukan.",
      });
      return;
    }

    // Ambil referensi ke tabel laporan
    const reportTable = document.getElementById("reportTable");
    const tbody = reportTable.querySelector("tbody");

    // Kosongkan isi tabel sebelum menambahkan hasil pencarian
    tbody.innerHTML = "";

    // Tambahkan laporan yang ditemukan ke dalam tabel
    filteredReports.forEach((report) => {
      const row = document.createElement("tr");
      Object.values(report).forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
  }

  // Ambil elemen input dan tombol delete
  const deleteButton = document.getElementById("deleteBtn"); // Ubah id tombol
  if (deleteButton) {
    // Tambahkan event listener untuk tombol delete
    deleteButton.addEventListener("click", function () {
      // Dapatkan nilai kode laporan yang dimasukkan pengguna
      const reportCode = document.getElementById("deleteRowIndex").value;

      // Panggil fungsi untuk menghapus laporan berdasarkan kode laporan
      deleteReportByReportCode(reportCode);
    });
  }

  / Ambil elemen input dan tombol delete
  const deleteButton = document.getElementById("deleteBtnRiwayat"); // Ubah id tombol
  if (deleteButton) {
    // Tambahkan event listener untuk tombol delete
    deleteButton.addEventListener("click", function () {
      // Dapatkan nilai kode laporan yang dimasukkan pengguna
      const reportCode = document.getElementById("deleteRiwayatRowIndex").value;

      // Panggil fungsi untuk menghapus laporan berdasarkan kode laporan
      deleteReportByReportCodeRIwayat(reportCode);
    });
  }

  // Fungsi untuk menghapus laporan berdasarkan kode laporan
  function deleteReportByReportCode(code) {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const updatedReports = reports.filter((report) => report.code !== code);

    if (updatedReports.length === reports.length) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Laporan tidak ditemukan.",
      });
      return;
    }

    localStorage.setItem("reports", JSON.stringify(updatedReports));
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Laporan berhasil dihapus.",
    }).then(() => {
      location.reload();
    });
  }

  // Fungsi untuk menghapus laporan berdasarkan kode laporan
  function deleteReportByReportCodeRIwayat(code) {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const updatedReports = reports.filter((report) => report.code !== code);

    if (updatedReports.length === reports.length) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Laporan tidak ditemukan.",
      });
      return;
    }

    localStorage.setItem("reports", JSON.stringify(updatedReports));
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Laporan berhasil dihapus.",
    }).then(() => {
      location.reload();
    });
  }

  // Ambil elemen button "Hapus Semua Data"
  const deleteAllBtn = document.getElementById("deleteAllBtn");
  if (deleteAllBtn) {
    // Tambahkan event listener untuk tombol "Hapus Semua Data"
    deleteAllBtn.addEventListener("click", function () {
      // Cek apakah ada data yang tersimpan di Local Storage
      const reports = JSON.parse(localStorage.getItem("reports"));
      if (!reports || reports.length === 0) {
        // Jika tidak ada data yang tersimpan, tampilkan pesan bahwa tidak ada data yang bisa dihapus
        Swal.fire("Info", "Tidak ada data yang tersimpan.", "info");
      } else {
        // Jika ada data yang tersimpan, tampilkan pop-up untuk memasukkan password admin
        Swal.fire({
          title: "Konfirmasi",
          text: "Masukkan password untuk menghapus semua data:",
          icon: "info",
          input: "password",
          inputAttributes: {
            placeholder: "Password",
            type: "password",
          },
          showCancelButton: true,
          confirmButtonText: "Hapus",
          cancelButtonText: "Batal",
          preConfirm: (password) => {
            // Validasi password admin
            if (password === "admin") {
              // Hapus semua data dari Local Storage
              localStorage.removeItem("reports");
              // Tampilkan pesan sukses setelah data dihapus
              return Swal.fire(
                "Success!",
                "Semua data berhasil dihapus.",
                "success"
              ).then(() => {
                // Muat ulang halaman untuk menyegarkan tampilan
                location.reload();
              });
            } else {
              // Tampilkan pesan kesalahan jika password admin tidak valid
              Swal.showValidationMessage("Password tidak valid.");
              return false;
            }
          },
        });
      }
    });
  }

  // Ambil elemen button "Hapus Semua Data Riwayat"
  const deleteAllRIwayatBtn = document.getElementById("deleteAllRIwayatBtn");
  if (deleteAllRIwayatBtn) {
    // Tambahkan event listener untuk tombol "Hapus Semua Data"
    deleteAllRIwayatBtn.addEventListener("click", function () {
      // Cek apakah ada data yang tersimpan di Local Storage
      const reports = JSON.parse(localStorage.getItem("reports"));
      if (!reports || reports.length === 0) {
        // Jika tidak ada data yang tersimpan, tampilkan pesan bahwa tidak ada data yang bisa dihapus
        Swal.fire("Info", "Tidak ada data yang tersimpan.", "info");
      } else {
        // Jika ada data yang tersimpan, tampilkan pop-up untuk memasukkan password admin
        Swal.fire({
          title: "Konfirmasi",
          text: "Masukkan password untuk menghapus semua data:",
          icon: "info",
          input: "password",
          inputAttributes: {
            placeholder: "Password",
            type: "password",
          },
          showCancelButton: true,
          confirmButtonText: "Hapus",
          cancelButtonText: "Batal",
          preConfirm: (password) => {
            // Validasi password admin
            if (password === "admin") {
              // Hapus semua data dari Local Storage
              localStorage.removeItem("reports");
              // Tampilkan pesan sukses setelah data dihapus
              return Swal.fire(
                "Success!",
                "Semua data berhasil dihapus.",
                "success"
              ).then(() => {
                // Muat ulang halaman untuk menyegarkan tampilan
                location.reload();
              });
            } else {
              // Tampilkan pesan kesalahan jika password admin tidak valid
              Swal.showValidationMessage("Password tidak valid.");
              return false;
            }
          },
        });
      }
    });
  }

  function loadReportDetails() {
    // Ambil kode laporan dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const reportCode = urlParams.get("code");

    // Ambil data laporan dari Local Storage atau sumber data lainnya
    // Di sini, untuk keperluan contoh, ambil dari Local Storage
    const reports = JSON.parse(localStorage.getItem("reports")) || [];

    // Cari laporan dengan kode yang sesuai
    const report = reports.find((report) => report.code === reportCode);

    // Tampilkan detail laporan
    if (report) {
      // Isi detail laporan ke dalam elemen HTML
      document.getElementById("name").textContent = report.name;
      document.getElementById("address").textContent = report.address;
      document.getElementById("itemName").textContent = report.itemName;
      document.getElementById("brand").textContent = report.brand;
      document.getElementById("type").textContent = report.type;
      document.getElementById("complaint").textContent = report.complaint;
      document.getElementById("repairDetail").textContent = report.repairDetail;
    } else {
      // Jika laporan tidak ditemukan, tampilkan pesan bahwa laporan tidak ditemukan
      document.getElementById("name").textContent = "Laporan tidak ditemukan.";
    }
  }

  // Tambahkan event listener untuk tombol yang memanggil generateTable
  const generateTableButton = document.getElementById("generateTableBtn");
  if (generateTableButton) {
    generateTableButton.addEventListener("click", generateTable);
  }

  // Setelah halaman baru dimuat, panggil kembali handleSidebarButtons()
  window.addEventListener("load", handleSidebarButtons);
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

  // Variabel untuk menyimpan jumlah laporan yang sedang diperbaiki
  var sedangDiperbaikiCount = 0;

  // Variabel untuk menyimpan jumlah laporan yang selesai diperbaiki
  var selesaiDiperbaikiCount = 0;

  var today = new Date().toLocaleDateString();

  // Tentukan elemen tabel berdasarkan lokasi
  if (location === "dashboard") {
    table = document.getElementById("notifikasiList"); // Menggunakan ID notifikasiList untuk kasir-dashboard.html
  } else if (location === "transaksi") {
    table = document.getElementById("transaksiList"); // Menggunakan ID transaksiList untuk kasir-transaksi.html
  } else if (location === "teknisi-laporan") {
    table = document.getElementById("laporanList"); // Menggunakan ID laporanList untuk teknisi-laporan.html
  }

  // Bersihkan isi tabel sebelum menampilkan data baru
  if (table) {
    table.innerHTML = "";
    // Tambahkan kelas border-collapse ke elemen tabel
    table.classList.add("border-collapse");

    // Cek apakah ada data
    if (reports && reports.length > 0) {
      // Sort reports by last modified date descending
      reports.sort(
        (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
      );

      // Limit to maximum 10 reports for notifikasiList
      const limitedReports =
        location === "dashboard" ? reports.slice(0, 10) : reports;

      limitedReports.forEach(function (report, index) {
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
        ); // Tambahkan kelas border dengan ketebalan 1px

        // Isi kolom lainnya
        var dateCell = row.insertCell(1);
        dateCell.textContent = report.date;
        dateCell.classList.add(
          "border",
          "border-gray-400",
          "px-4",
          "py-2",
          "text-center"
        );

        var codeCell = row.insertCell(2);
        codeCell.textContent = report.code;
        codeCell.classList.add(
          "border",
          "border-gray-400",
          "px-4",
          "py-2",
          "text-center"
        );

        var nameCell = row.insertCell(3);
        nameCell.textContent = report.name;
        nameCell.classList.add(
          "border",
          "border-gray-400",
          "px-4",
          "py-2",
          "text-center"
        );

        var typeCell = row.insertCell(4);
        typeCell.textContent = report.type;
        typeCell.classList.add(
          "border",
          "border-gray-400",
          "px-4",
          "py-2",
          "text-center"
        );

        var statusCell = row.insertCell(5);
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
          const editLink = document.createElement("a");
          editLink.textContent = "Edit";
          editLink.href = "/html/detail.html?code=" + report.code; // Mengatur href sesuai dengan URL yang diinginkan
          editLink.classList.add(
            "editBtn",
            "style-bold",
            "rounded-full",
            "text-yellow-600", // Mengatur warna tulisan menjadi kuning
            "px-7",
            "py-2",
            "font-bold",
            "text-center",
            "flex", // Menambahkan kelas flex
            "justify-center" // Menambahkan kelas justify-center
          );

          actionCell.appendChild(editLink);
        }

        // Atur warna latar belakang dan gaya teks untuk status
        if (report.status === "Belum Diperbaiki") {
          statusCell.classList.add("bg-red-800", "text-white", "font-bold");
        } else if (report.status === "Sedang Diperbaiki") {
          statusCell.classList.add("bg-orange-700", "text-white", "font-bold");
          sedangDiperbaikiCount++;
        } else if (report.status === "Selesai Diperbaiki") {
          statusCell.classList.add("bg-green-700", "text-white", "font-bold");
          selesaiDiperbaikiCount++;
        }

        // Hitung laporan yang masuk hari ini
        if (report.date === today) {
          laporanHariIni++;
        }
        totalLaporanMasuk++;
      });
    } else {
      // Tampilkan pesan jika tidak ada laporan
      var row = table.insertRow();
      var cell = row.insertCell(0);
      cell.colSpan = 6;
      cell.textContent = "Tidak ada laporan yang ditemukan.";
      cell.classList.add(
        "border",
        "border-gray-400",
        "px-4",
        "py-2",
        "text-center"
      );
    }
  }

  // Tampilkan total laporan di halaman dashboard
  var totalLaporanElem = document.getElementById("total-laporan");
  if (totalLaporanElem) {
    totalLaporanElem.textContent = totalLaporanMasuk;
  }

  var laporanHariIniElem = document.getElementById("laporan-hari-ini");
  if (laporanHariIniElem) {
    laporanHariIniElem.textContent = laporanHariIni;
  }

  // Tampilkan jumlah laporan yang sedang diperbaiki
  var sedangDiperbaikiElem = document.getElementById("sedang-diperbaiki");
  if (sedangDiperbaikiElem) {
    sedangDiperbaikiElem.textContent = sedangDiperbaikiCount;
  }

  // Tampilkan jumlah laporan yang selesai diperbaiki
  var selesaiDiperbaikiElem = document.getElementById("selesai-diperbaiki");
  if (selesaiDiperbaikiElem) {
    selesaiDiperbaikiElem.textContent = selesaiDiperbaikiCount;
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

function perbaiki() {
  // Ambil kode laporan dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const reportCode = urlParams.get("code");

  // Ambil data laporan dari Local Storage atau sumber data lainnya
  // Di sini, untuk keperluan contoh, ambil dari Local Storage
  let reports = JSON.parse(localStorage.getItem("reports")) || [];

  // Cari laporan dengan kode yang sesuai
  const reportIndex = reports.findIndex((report) => report.code === reportCode);

  // Periksa apakah laporan ditemukan
  if (reportIndex !== -1) {
    // Perbarui status laporan menjadi "Sedang Diperbaiki"
    reports[reportIndex].status = "Sedang Diperbaiki";

    // Simpan perubahan kembali ke Local Storage
    localStorage.setItem("reports", JSON.stringify(reports));

    // Redirect atau lakukan tindakan lainnya setelah perbaikan dilakukan
    // Misalnya, arahkan kembali ke halaman teknisi-laporan.html
    window.location.href = "/html/teknisi-laporan.html";
  } else {
    // Tampilkan pesan bahwa laporan tidak ditemukan
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Laporan tidak ditemukan.",
    });
  }
}

function selesai() {
  // Ambil detail perbaikan dari input
  const repairDetail = document.getElementById("repairDetail").value.trim();

  // Jika detail perbaikan tidak kosong
  if (repairDetail !== "") {
    // Tampilkan pesan konfirmasi
    Swal.fire({
      title: "Yakin selesai perbaiki?",
      text: "Anda yakin sudah menyelesaikan perbaikan dan ingin melanjutkan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, selesai",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Ambil kode laporan dari URL
        const urlParams = new URLSearchParams(window.location.search);
        const reportCode = urlParams.get("code");

        // Ambil data laporan dari Local Storage atau sumber data lainnya
        // Di sini, untuk keperluan contoh, ambil dari Local Storage
        let reports = JSON.parse(localStorage.getItem("reports")) || [];

        // Cari laporan dengan kode yang sesuai
        const reportIndex = reports.findIndex(
          (report) => report.code === reportCode
        );

        // Periksa apakah laporan ditemukan
        if (reportIndex !== -1) {
          // Perbarui status laporan menjadi "Selesai Diperbaiki"
          reports[reportIndex].status = "Selesai Diperbaiki";

          // Simpan detail perbaikan ke laporan
          reports[reportIndex].repairDetail = repairDetail;

          // Simpan perubahan kembali ke Local Storage
          localStorage.setItem("reports", JSON.stringify(reports));

          // Redirect atau lakukan tindakan lainnya setelah perbaikan selesai dilakukan
          // Misalnya, arahkan kembali ke halaman teknisi-laporan.html
          window.location.href = "/html/teknisi-laporan.html";
        } else {
          // Tampilkan pesan bahwa laporan tidak ditemukan
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Laporan tidak ditemukan.",
          });
        }
      }
    });
  } else {
    // Tampilkan pesan bahwa detail perbaikan belum diisi
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Detail perbaikan belum diisi.",
    });
  }
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

// Fungsi untuk membuat kode primary key
function generateReportCode(date) {
  const day = ("0" + date.getDate()).slice(-2); // Mendapatkan tanggal dalam format DD
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Mendapatkan bulan dalam format MM
  const year = date.getFullYear().toString().slice(-2); // Mendapatkan tahun dalam format YY
  const hours = ("0" + date.getHours()).slice(-2); // Mendapatkan jam dalam format HH
  const minutes = ("0" + date.getMinutes()).slice(-2); // Mendapatkan menit dalam format MM
  const seconds = ("0" + date.getSeconds()).slice(-2); // Mendapatkan detik dalam format SS

  // Gabungkan tanggal dan waktu untuk membuat kode unik
  const reportCode = `${year}${month}${day}${hours}${minutes}${seconds}`;

  return reportCode;
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

  // Ambil tanggal saat ini dan format sesuai preferensi
  const currentDate = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("id-ID", options);

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
    status: "Belum Diperbaiki", // Status default
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
      Swal.fire({
        title: "Success!",
        text: "Laporan berhasil disimpan.",
        icon: "success",
      }).then(() => {
        // Redirect ke halaman dashboard.html setelah pengguna menekan OK pada pesan sukses
        window.location.href = "/html/kasir-Dashboard.html";
      });
      // Di sini bisa dilakukan penyimpanan data ke server atau local storage
    } else {
      // Jika ada data yang tidak valid, tampilkan pesan error menggunakan SweetAlert2
      Swal.fire({
        title: "Error!",
        text: "Mohon isi data dengan benar.",
        icon: "error",
      });
    }
  } else {
    // Jika ada input yang kosong, tampilkan pesan error menggunakan SweetAlert2
    Swal.fire({
      title: "Error!",
      text: "Mohon lengkapi semua data.",
      icon: "error",
    });
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

/// Function to handle sidebar button behavior
function handleSidebarButtons() {
  // Get the sidebar buttons
  const buttons = document.querySelectorAll(".sidebar button");

  // Loop through each button and add event listener
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Remove active class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      event.target.classList.add("active");

      // Optionally, you can store the active button's state in localStorage or sessionStorage
      sessionStorage.setItem("activeSidebarButton", event.target.id);
    });
  });

  // On page load, set the active button based on stored state
  const activeButtonId = sessionStorage.getItem("activeSidebarButton");
  if (activeButtonId) {
    const activeButton = document.getElementById(activeButtonId);
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }
}

function clearForm() {
  // Dapatkan semua elemen input dalam form
  const form = document.forms["reportForm"];
  if (form) {
    form.reset();
  }
}
