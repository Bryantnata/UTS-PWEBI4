<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Detail Laporan</title>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  </head>
  <body class="bg-gray-100 text-gray-800">
    <button
      onclick="goBack()"
      type="button"
      class="text-red-500 hover:text-red-700 font-semibold focus:outline-none fixed top-4 left-4"
    >
      Kembali
    </button>
    <div class="container mx-auto py-8 px-4 md:px-8 lg:px-16">
      <div class="flex items-center justify-between mb-8">
        <div class="flex-grow">
          <h1 class="text-3xl font-bold text-center">Detail Laporan</h1>
        </div>
      </div>
      <div class="bg-white rounded shadow-md p-6 mx-auto mb-8 w-full max-w-6xl">
        <table class="table-auto w-full">
          <tbody>
            <tr>
              <td class="font-semibold pr-4">Nama Pemilik</td>
              <td class="font-semibold">:</td>
              <td><span id="name"></span></td>
            </tr>
            <tr>
              <td class="font-semibold pr-4">Alamat</td>
              <td class="font-semibold">:</td>
              <td><span id="address"></span></td>
            </tr>
            <tr>
              <td class="font-semibold pr-4">Nama Barang</td>
              <td class="font-semibold">:</td>
              <td><span id="itemName"></span></td>
            </tr>
            <tr>
              <td class="font-semibold pr-4">Merk</td>
              <td class="font-semibold">:</td>
              <td><span id="brand"></span></td>
            </tr>
            <tr>
              <td class="font-semibold pr-4">Tipe</td>
              <td class="font-semibold">:</td>
              <td><span id="type"></span></td>
            </tr>
            <tr>
              <td class="font-semibold pr-4">Keluhan Barang</td>
              <td class="font-semibold">:</td>
              <td><span id="complaint"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-white rounded shadow-md p-6 mx-auto w-full max-w-6xl">
        <h2 class="text-2xl font-bold mb-4">Detail Perbaikan</h2>
        <form id="repairDetailForm" class="mb-8 w-full">
          <div class="mb-4">
            <label class="block font-semibold mb-2" for="repairDetail"
              >Detail Perbaikan:</label
            >
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="repairDetail"
              rows="4"
              placeholder="Masukkan detail perbaikan..."
            ></textarea>
          </div>
          <div class="flex items-center justify-end">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onclick="generateTable()"
            >Rincian
            </button>
          </div>
        </form>
        <div id="tableContainer" class="w-full">
          <!-- Data tabel akan ditampilkan di sini -->
        </div>
        <div class="mt-5 flex justify-center">
          <button
            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
            onclick="perbaiki()"
          >
            Perbaiki
          </button>
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onclick="selesai()"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>

    <script src="/js/script.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        // Panggil fungsi untuk memuat detail laporan saat halaman dimuat
        loadReportDetails();
      });
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
        } else {
          // Jika laporan tidak ditemukan, tampilkan pesan bahwa laporan tidak ditemukan
          document.getElementById("name").textContent =
            "Laporan tidak ditemukan.";
        }
      }
    </script>
  </body>
</html>
