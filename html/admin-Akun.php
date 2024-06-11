<!-- admin-laporan.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Laporan</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  </head>
  <body class="bg-gray-100">
    <!-- Sidebar -->
    <aside
      class="sidebar bg-gray-800 text-gray-400 w-64 min-h-screen fixed top-0 left-0 z-50"
    >
      <!-- Logo -->
      <div class="flex items-center justify-center h-20 mb-4">
        <img src="/asset/logopweb.png" alt="Logo" class="h-16 w-auto" />
      </div>
      <!-- Sidebar Content -->
      <nav class="mt-4">
        <!-- teknisi-Laporan.html -->
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Laporan</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
          </head>
          <body class="bg-gray-100">
            <!-- Sidebar -->
            <aside
              class="sidebar bg-gray-800 text-gray-400 w-64 min-h-screen fixed top-0 left-0 z-50"
            >
              <!-- Logo -->
              <div class="flex items-center justify-center h-20 mb-4">
                <img src="/asset/logopweb.png" alt="Logo" class="h-16 w-auto" />
              </div>
              <!-- Sidebar Content -->
              <nav class="mt-4">
                <ul>
                  <li>
                    <a
                      href="/html/admin-Dashboard.php"
                      class="block py-2 px-4 hover:bg-gray-700 active:bg-blue-500"
                      id="dashboardBtn"
                      >Dashboard</a
                    >
                  </li>
                  <li>
                    <a
                      href="/html/admin-Transaksi.php"
                      class="block py-2 px-4 hover:bg-gray-700"
                      id="transaksiBtn"
                      >Transaksi</a
                    >
                  </li>
                  <li>
                    <a
                      href="/html/admin-Pembayaran.php"
                      class="block py-2 px-4 hover:bg-gray-700"
                      id="pembayaranBtn"
                      >Pembayaran</a
                    >
                  </li>
                  <li>
                    <a
                      href="/html/admin-Laporan.php"
                      class="block py-2 px-4 hover:bg-gray-700"
                      id="transaksiBtn"
                      >Laporan</a
                    >
                  </li>
                  <li>
                    <a
                      href="/html/admin-riwayat.php"
                      class="block py-2 px-4 hover:bg-gray-700"
                      id="riwayatBtn"
                      >Riwayat</a
                    >
                  </li>
                  <li>
                    <a
                      href="/html/admin-Akun.php"
                      class="block py-2 px-4 hover:bg-gray-700"
                      id="akunBtn"
                      >Akun</a
                    >
                  </li>
                </ul>
              </nav>
              <!-- Logout Button -->
              <div class="absolute bottom-10 left-0 w-full font-bold lg:block">
                <a
                  href="#"
                  id="logoutBtn"
                  class="block w-2/3 py-3 mx-auto text-sm text-white text-center bg-red-600 hover:bg-red-700 rounded-md z-10"
                  >Log Out</a
                >
              </div>
              <!-- Jam -->
              <div
                id="clock"
                class="absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold lg:block text-center text-white"
              ></div>
            </aside>
            <!-- Content Area: Transaksi -->
            <div class="ml-64 p-8">
              <!-- Transaksi Content Goes Here -->
              <div class="container mx-auto py-8">
                <h1 class="text-3xl font-bold mb-4 text-center">
                  Daftar Laporan
                </h1>
                <table class="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr class="divide-x divide-gray-400">
                      <th class="px-4 py-2 border border-gray-400">No</th>
                      <th class="px-4 py-2 border border-gray-400">Tanggal</th>
                      <th class="px-4 py-2 border border-gray-400">Kode</th>
                      <th class="px-4 py-2 border border-gray-400">
                        Nama Pemilik
                      </th>
                      <th class="px-4 py-2 border border-gray-400">
                        Tipe Barang
                      </th>
                      <th class="px-4 py-2 border border-gray-400">Status</th>
                      <th class="px-4 py-2 border border-gray-400">Edit</th>
                    </tr>
                  </thead>
                  <tbody
                    id="laporanList"
                    class="rounded-full items-center justify-center"
                  >
                    <!-- Data transaksi akan ditampilkan di sini -->
                  </tbody>
                </table>
              </div>
            </div>
            <!-- JavaScript -->
            <script src="/js/script.js"></script>
            <script>
              displayReports("teknisi-laporan");
            </script>
          </body>
        </html>
      </nav>
      <!-- Logout Button -->
      <div class="absolute bottom-10 left-0 w-full font-bold lg:block">
        <a
          href="#"
          id="logoutBtn"
          class="block w-2/3 py-3 mx-auto text-sm text-white text-center bg-red-600 hover:bg-red-700 rounded-md z-10"
          >Log Out</a
        >
      </div>
      <!-- Jam -->
      <div
        id="clock"
        class="absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold lg:block text-center text-white"
      ></div>
    </aside>
    <!-- Content Area: Transaksi -->
    <div class="ml-64 p-8">
      <!-- Transaksi Content Goes Here -->
      <div class="container mx-auto py-8">
        <h1 class="text-3xl font-bold mb-4 text-center">Daftar Laporan</h1>
        <table class="w-full border-collapse border border-gray-400">
          <thead>
            <tr class="divide-x divide-gray-400">
              <th class="px-4 py-2 border border-gray-400">No</th>
              <th class="px-4 py-2 border border-gray-400">Tanggal</th>
              <th class="px-4 py-2 border border-gray-400">Kode</th>
              <th class="px-4 py-2 border border-gray-400">Nama Pemilik</th>
              <th class="px-4 py-2 border border-gray-400">Tipe Barang</th>
              <th class="px-4 py-2 border border-gray-400">Status</th>
              <th class="px-4 py-2 border border-gray-400">Edit</th>
            </tr>
          </thead>
          <tbody
            id="laporanList"
            class="rounded-full items-center justify-center"
          >
            <!-- Data transaksi akan ditampilkan di sini -->
          </tbody>
        </table>
      </div>
    </div>
    <!-- JavaScript -->
    <script src="/js/script.js"></script>
  </body>
</html>
