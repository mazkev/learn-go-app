/**
 * SQL (Structured Query Language) Curriculum & Interactive Roadmap Modules
 * Panduan Lengkap Database Relasional: DDL, DML, Filtering, Agregasi, GROUP BY, dan Relational JOINs.
 * Seluruh database simulasi (mahasiswa, karyawan, produk, users, pesanan, dll) sudah pre-populated
 * dan siap di-query langsung tanpa perlu mengetik ulang CREATE TABLE dan INSERT INTO!
 */

export const SQL_MODULES = [
  // ==========================================
  // MODUL 1: Fondasi Relasional & DDL (Data Definition Language)
  // ==========================================
  {
    id: "sql-module-1",
    order: 1,
    title: "1. Fondasi Relasional & DDL (Tabel & Tipe Data)",
    subtitle: "CREATE TABLE, Tipe Data, Constraints & DROP TABLE",
    description: "Mempelajari dasar arsitektur database relasional, mendesain skema tabel, menetapkan tipe data kolom, dan aturan integritas data.",
    icon: "Database",
    badge: "Schema Architect",
    color: "#336791",
    xp: 300,
    lessons: [
      {
        id: "sql-1-1",
        title: "1.1 CREATE TABLE & Tipe Data Kolom",
        summary: "Membuat tabel baru dengan mendefinisikan nama kolom dan tipe data yang sesuai.",
        content: `### 🗄️ Selamat Datang di Dunia SQL!
**SQL (Structured Query Language)** adalah bahasa standar industri global untuk menyimpan, memanipulasi, dan membaca data dari sistem database relasional (*RDBMS*) seperti PostgreSQL, MySQL, SQLite, dan SQL Server.

#### 📌 DDL (Data Definition Language):
Perintah DDL digunakan untuk mengelola **struktur skema** database, bukan isi datanya.

#### 📌 Tipe Data Dasar SQL:
- **\`VARCHAR(n)\`**: Teks dengan panjang fleksibel hingga n karakter (misal nama, email).
- **\`INT\` / \`INTEGER\`**: Bilangan bulat (misal id, umur, stok).
- **\`DECIMAL(p, s)\`**: Angka desimal presisi tinggi untuk data keuangan/nilai (misal harga, IPK).
- **\`BOOLEAN\`**: Nilai kebenaran (\`TRUE\` atau \`FALSE\`).
- **\`DATE\`**: Tanggal dalam format \`YYYY-MM-DD\`.`,
        codeSnippet: `-- 1. Membuat Tabel Mahasiswa Baru
CREATE TABLE mahasiswa_baru (
  id INT PRIMARY KEY,
  nim VARCHAR(10),
  nama VARCHAR(50),
  jurusan VARCHAR(30),
  ipk DECIMAL(3,2)
);

-- 2. Memasukkan contoh data awal
INSERT INTO mahasiswa_baru (id, nim, nama, jurusan, ipk) VALUES
  (1, '2026001', 'Kevin Pratama', 'Informatika', 3.92),
  (2, '2026002', 'Siti Aminah', 'Sistem Informasi', 3.85);

-- 3. Membaca isi tabel yang baru dibuat
SELECT * FROM mahasiswa_baru;`,
        exercise: {
          instruction: "Buat tabel baru bernama `katalog` dengan kolom `id INT`, `judul VARCHAR(100)`, dan `harga INT`!",
          starterCode: `CREATE TABLE katalog (
  id INT,
  judul VARCHAR(100),
  harga INT
);

INSERT INTO katalog (id, judul, harga) VALUES
  (1, 'Belajar SQL Cepat', 85000),
  (2, 'Mastering Database Systems', 145000);

SELECT * FROM katalog;`,
          expectedHint: "Gunakan perintah `CREATE TABLE katalog (...)` dengan kolom `id`, `judul`, dan `harga`."
        },
        quiz: [
          {
            question: "Tipe data SQL manakah yang paling ideal untuk menyimpan nama lengkap seseorang?",
            options: ["INT", "VARCHAR(100)", "BOOLEAN", "DATE"],
            correctAnswer: 1,
            explanation: "`VARCHAR(100)` digunakan untuk menyimpan teks alfanumerik variabel hingga panjang 100 karakter."
          }
        ]
      },
      {
        id: "sql-1-2",
        title: "1.2 Constraints & Primary Key",
        summary: "Menerapkan aturan integritas data dengan PRIMARY KEY, NOT NULL, dan AUTO_INCREMENT.",
        content: `### 🔒 Constraints (Aturan Integritas Data)
Constraints memastikan kualitas dan validitas data di dalam tabel agar tidak terjadi duplikasi atau data korup.

#### 📌 Macam-macam Constraints:
- **\`PRIMARY KEY\`**: Penanda unik setiap baris (tidak boleh bernilai NULL dan tidak boleh ada nilai kembar).
- **\`NOT NULL\`**: Kolom wajib diisi (tidak boleh dibiarkan kosong).
- **\`AUTO_INCREMENT\`**: Nilai angka otomatis bertambah 1 setiap kali baris baru ditambahkan.
- **\`DEFAULT <nilai>\`**: Nilai standar yang otomatis dipasang jika pengguna tidak mengisinya.`,
        codeSnippet: `CREATE TABLE barang (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_barang VARCHAR(50) NOT NULL,
  kategori VARCHAR(30) DEFAULT 'Umum',
  harga INT NOT NULL
);

INSERT INTO barang (nama_barang, harga) VALUES
  ('Keyboard Mechanical', 650000),
  ('Mouse Wireless', 250000);

SELECT * FROM barang;`,
        exercise: {
          instruction: "Tambahkan barang baru ke dalam tabel dengan nama 'Headset Gaming' dan harga 450000!",
          starterCode: `CREATE TABLE barang (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_barang VARCHAR(50) NOT NULL,
  harga INT NOT NULL
);

INSERT INTO barang (nama_barang, harga) VALUES
  ('Keyboard Mechanical', 650000),
  ('Headset Gaming', 450000);

SELECT * FROM barang;`,
          expectedHint: "Gunakan klausa `INSERT INTO barang (nama_barang, harga) VALUES ('Headset Gaming', 450000);`."
        },
        quiz: [
          {
            question: "Apa fungsi utama dari constraint PRIMARY KEY pada sebuah tabel?",
            options: [
              "Menghapus tabel secara otomatis jika penuh",
              "Menjamin bahwa setiap baris data memiliki identitas unik dan tidak NULL",
              "Mengubah huruf menjadi kapital semua",
              "Menghubungkan database ke internet"
            ],
            correctAnswer: 1,
            explanation: "PRIMARY KEY menjamin keunikan identitas setiap baris dalam tabel dan mencegah nilai NULL."
          }
        ]
      },
      {
        id: "sql-1-3",
        title: "1.3 Menghapus Tabel dengan DROP TABLE & SHOW TABLES",
        summary: "Melihat daftar tabel yang ada dan menghapus tabel yang sudah tidak digunakan.",
        content: `### 🗃️ SHOW TABLES & DROP TABLE
Di M3.learn, database simulasi sudah aktif dengan berbagai tabel pre-populated.

- **\`SHOW TABLES;\`**: Menampilkan daftar seluruh tabel yang ada di dalam database saat ini.
- **\`DESCRIBE <tabel>;\`**: Melihat struktur kolom, tipe data, dan constraint dari tabel.
- **\`DROP TABLE IF EXISTS <tabel>;\`**: Menghapus tabel secara permanen.`,
        codeSnippet: `-- 1. Melihat tabel-tabel bawaan yang sudah tersedia di database M3.learn!
SHOW TABLES;

-- 2. Melihat struktur kolom dari tabel 'mahasiswa'
DESCRIBE mahasiswa;`,
        exercise: {
          instruction: "Gunakan perintah `SHOW TABLES;` untuk melihat seluruh tabel database yang tersedia!",
          starterCode: `SHOW TABLES;`,
          expectedHint: "Cukup ketik `SHOW TABLES;` lalu klik tombol 'Jalankan Kode'."
        },
        quiz: [
          {
            question: "Perintah SQL apakah yang digunakan untuk melihat daftar seluruh tabel di dalam database?",
            options: ["LIST TABLES", "SHOW TABLES", "GET ALL TABLES", "DISPLAY TABLES"],
            correctAnswer: 1,
            explanation: "`SHOW TABLES;` menampilkan seluruh tabel yang ada pada skema database aktif."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 2: DML & Query Dasar (SELECT, WHERE, ORDER BY, LIMIT)
  // ==========================================
  {
    id: "sql-module-2",
    order: 2,
    title: "2. Query Data Dasar (SELECT, WHERE, ORDER BY)",
    subtitle: "Pengambilan Data, Pemilihan Kolom, Pengurutan & Paginasi",
    description: "Mempelajari perintah DML utama untuk membaca data spesifik dari database dengan filter logika dan pengurutan.",
    icon: "Search",
    badge: "Query Specialist",
    color: "#00ADD8",
    xp: 350,
    lessons: [
      {
        id: "sql-2-1",
        title: "2.1 SELECT Kolom Tertentu & Kolom Alias (AS)",
        summary: "Membaca kolom spesifik dan memberi nama alias sementara pada output.",
        content: `### 🔍 Memilih Kolom dengan SELECT
Tabel **\`karyawan\`** sudah tersedia di database simulasi!

Alih-alih menggunakan \`SELECT *\` yang mengambil seluruh kolom dan membebani memori, praktik terbaik (*Best Practice*) di industri adalah selalu menentukan nama kolom yang dibutuhkan secara spesifik.

#### 📌 Kolom Alias dengan \`AS\`:
Kita dapat mengganti nama tampilan kolom hasil query menggunakan keyword \`AS\`.`,
        codeSnippet: `-- Database 'karyawan' sudah siap di-query!
-- Kolom tersedia: id, nama_depan, nama_belakang, divisi, gaji, kota

SELECT nama_depan AS nama, gaji AS pendapatan_bulanan, divisi
FROM karyawan;`,
        exercise: {
          instruction: "Pilih kolom `nama_depan` dengan alias `karyawan` dan kolom `gaji` dari tabel `karyawan`!",
          starterCode: `SELECT nama_depan AS karyawan, gaji FROM karyawan;`,
          expectedHint: "Gunakan `SELECT nama_depan AS karyawan, gaji FROM karyawan;`."
        },
        quiz: [
          {
            question: "Keyword SQL apakah yang digunakan untuk memberikan nama alias pada kolom hasil SELECT?",
            options: ["TO", "AS", "NAME", "ALIAS"],
            correctAnswer: 1,
            explanation: "`AS` digunakan untuk mendefinisikan alias sementara pada kolom atau tabel."
          }
        ]
      },
      {
        id: "sql-2-2",
        title: "2.2 WHERE Clause & Operator Perbandingan",
        summary: "Menyaring baris data berdasarkan kriteria nilai tertentu.",
        content: `### 🎯 Filter Data dengan WHERE
Tabel **\`produk\`** sudah tersedia di database simulasi dengan kolom: \`id\`, \`nama\`, \`kategori\`, \`harga\`, \`stok\`.

Klausa \`WHERE\` digunakan untuk membatasi baris data yang diambil hanya yang memenuhi kriteria kondisi tertentu (*Filter Boolean*).

#### 📌 Operator Perbandingan:
- **\`=\`**: Sama dengan.
- **\`!=\`** atau **\`<>\`**: Tidak sama dengan.
- **\`>\`** & **\`<\`**: Lebih besar / Lebih kecil dari.
- **\`>=\`** & **\`<=\`**: Lebih besar sama dengan / Lebih kecil sama dengan.`,
        codeSnippet: `-- Database 'produk' sudah tersedia!
-- Filter 1: Ambil hanya produk dengan kategori Laptop
SELECT nama, kategori, harga FROM produk WHERE kategori = 'Laptop';

-- Filter 2: Ambil produk dengan harga di bawah 2 juta
SELECT nama, harga, stok FROM produk WHERE harga < 2000000;`,
        exercise: {
          instruction: "Tuliskan query SELECT untuk mencari produk dari tabel `produk` dengan harga >= 20000000!",
          starterCode: `SELECT nama, harga FROM produk WHERE harga >= 20000000;`,
          expectedHint: "Gunakan `WHERE harga >= 20000000`."
        },
        quiz: [
          {
            question: "Manakah operator SQL yang benar untuk menyatakan 'tidak sama dengan'?",
            options: ["==", "!= atau <>", "===", "NOT EQUAL"],
            correctAnswer: 1,
            explanation: "Di SQL standar, operator tidak sama dengan ditulis menggunakan `!=` atau `<>`."
          }
        ]
      },
      {
        id: "sql-2-3",
        title: "2.3 ORDER BY & LIMIT (Pengurutan & Paginasi)",
        summary: "Mengurutkan data secara alfabetis/numerik dan membatasi jumlah baris output.",
        content: `### 📊 Pengurutan & Paginasi
Tabel **\`skor_game\`** sudah tersedia di database dengan kolom: \`pemain\`, \`skor\`.

#### 📌 Aturan ORDER BY:
- **\`ASC\`**: *Ascending* (Terkecil ke terbesar / A-Z) -> Default.
- **\`DESC\`**: *Descending* (Terbesar ke terkecil / Z-A).

#### 📌 LIMIT & OFFSET:
- **\`LIMIT n\`**: Mengambil maksimal n baris pertama.
- **\`OFFSET m\`**: Melompati m baris pertama (vital untuk pagination halaman web).`,
        codeSnippet: `-- Database 'skor_game' sudah tersedia!
-- Leaderboard: Top 3 Skor Tertinggi (Diurutkan dari nilai terbesar)
SELECT pemain, skor
FROM skor_game
ORDER BY skor DESC
LIMIT 3;`,
        exercise: {
          instruction: "Urutkan data pemain dari `skor_game` berdasarkan skor secara DESC dan ambil 2 pemain teratas!",
          starterCode: `SELECT pemain, skor FROM skor_game ORDER BY skor DESC LIMIT 2;`,
          expectedHint: "Tambahkan `ORDER BY skor DESC LIMIT 2` di akhir query."
        },
        quiz: [
          {
            question: "Klausa apakah yang digunakan untuk mengurutkan data dari nilai tertinggi ke terendah?",
            options: ["ORDER BY kolom ASC", "ORDER BY kolom DESC", "SORT HIGH TO LOW", "GROUP BY DESC"],
            correctAnswer: 1,
            explanation: "`ORDER BY <kolom> DESC` mengurutkan baris dari nilai terbesar/tertinggi ke terkecil."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 3: Filter Lanjutan (AND, OR, LIKE, IN, BETWEEN, NULL)
  // ==========================================
  {
    id: "sql-module-3",
    order: 3,
    title: "3. Filter Lanjutan & Operator Logika",
    subtitle: "AND, OR, NOT, LIKE Wildcard, IN & BETWEEN",
    description: "Menguasai logika kondisional multi-syarat, pencarian teks wildcard, dan pengecekan rentang nilai.",
    icon: "Filter",
    badge: "Logic Master",
    color: "#7209b7",
    xp: 400,
    lessons: [
      {
        id: "sql-3-1",
        title: "3.1 Logika Multi-Kondisi (AND, OR, NOT)",
        summary: "Menggabungkan beberapa kriteria filter sekaligus menggunakan operator logika boolean.",
        content: `### ⚡ Logika Boolean di SQL
Tabel **\`karyawan\`** sudah aktif di database simulasi!

- **\`AND\`**: Bernilai benar jika **SEMUA** kondisi terpenuhi.
- **\`OR\`**: Bernilai benar jika **SALAH SATU** kondisi terpenuhi.
- **\`NOT\`**: Membalikkan nilai logika (negasi).`,
        codeSnippet: `-- Database 'karyawan' sudah tersedia!
-- 1. Karyawan divisi Engineering dengan gaji di atas 10 juta
SELECT nama_depan AS nama, divisi, gaji
FROM karyawan
WHERE divisi = 'Engineering' AND gaji > 10000000;

-- 2. Karyawan divisi Design ATAU Marketing
SELECT nama_depan AS nama, divisi, gaji
FROM karyawan
WHERE divisi = 'Design' OR divisi = 'Marketing';`,
        exercise: {
          instruction: "Gunakan klausa WHERE dengan `AND` untuk mencari karyawan divisi 'Engineering' dengan gaji >= 12000000!",
          starterCode: `SELECT nama_depan, gaji FROM karyawan WHERE divisi = 'Engineering' AND gaji >= 12000000;`,
          expectedHint: "Tuliskan `WHERE divisi = 'Engineering' AND gaji >= 12000000`."
        },
        quiz: [
          {
            question: "Jika kita ingin mencari data yang memenuhi kedua syarat A dan B sekaligus, operator manakah yang wajib digunakan?",
            options: ["OR", "AND", "BOTH", "PLUS"],
            correctAnswer: 1,
            explanation: "Operator `AND` memastikan kedua belah kondisi bernilai true."
          }
        ]
      },
      {
        id: "sql-3-2",
        title: "3.2 Pencarian Teks dengan LIKE & Wildcard",
        summary: "Mencari string berdasarkan pola awalan, akhiran, atau potongan kata.",
        content: `### 🔎 Pencarian Pola String (Pattern Matching)
Tabel **\`pengguna\`** sudah tersedia di database simulasi dengan kolom \`id\`, \`nama\`, \`email\`.

Operator \`LIKE\` digunakan bersama simbol **wildcard** untuk mencocokkan kemiripan teks:

- **\`%\` (Persen)**: Mewakili **0, 1, atau banyak karakter bebas**.
  - \`'Alex%'\`: Berawalan kata 'Alex'.
  - \`'%@gmail.com'\`: Berakhiran '@gmail.com'.
  - \`'%Kevin%'\`: Mengandung kata 'Kevin' di posisi mana pun.
- **\`_\` (Garis Bawah)**: Mewakili **tepat 1 karakter bebas**.`,
        codeSnippet: `-- Database 'pengguna' sudah tersedia!
-- 1. Nama yang berawalan kata 'Alex'
SELECT nama, email FROM pengguna WHERE nama LIKE 'Alex%';

-- 2. Pengguna yang menggunakan email '@gmail.com'
SELECT nama, email FROM pengguna WHERE email LIKE '%@gmail.com';`,
        exercise: {
          instruction: "Cari pengguna dari tabel `pengguna` yang namanya mengandung kata 'Kevin'!",
          starterCode: `SELECT nama, email FROM pengguna WHERE nama LIKE '%Kevin%';`,
          expectedHint: "Gunakan `WHERE nama LIKE '%Kevin%'`."
        },
        quiz: [
          {
            question: "Simbol wildcard manakah pada SQL LIKE yang mewakili nol, satu, atau banyak karakter bebas?",
            options: ["*", "%", "?", "_"],
            correctAnswer: 1,
            explanation: "Simbol `%` pada SQL adalah wildcard untuk 0 atau banyak karakter sembarang."
          }
        ]
      },
      {
        id: "sql-3-3",
        title: "3.3 IN, BETWEEN & IS NULL",
        summary: "Menyederhanakan pengecekan multi-pilihan, rentang batas, dan data kosong.",
        content: `### 📦 Operator Himpunan & Rentang
Tabel **\`pesanan\`** sudah tersedia di database simulasi!

- **\`IN (val1, val2, ...)\`**: Memeriksa apakah nilai kolom ada di dalam daftar himpunan.
- **\`BETWEEN a AND b\`**: Memeriksa apakah nilai berada di antara batas bawah 'a' dan batas atas 'b' (inklusif).
- **\`IS NULL\` & \`IS NOT NULL\`**: Memeriksa kolom yang kosong tanpa data. (Catatan: Jangan gunakan \`= NULL\` karena NULL tidak dapat dibandingkan dengan operator sama dengan biasa!).`,
        codeSnippet: `-- Database 'pesanan' sudah tersedia!
-- 1. Status 'PROSES' atau 'PENDING' menggunakan IN
SELECT pelanggan, status, total FROM pesanan WHERE status IN ('PROSES', 'PENDING');

-- 2. Total belanja antara 2jt s/d 10jt dengan BETWEEN
SELECT pelanggan, produk, total FROM pesanan WHERE total BETWEEN 2000000 AND 10000000;

-- 3. Pesanan yang tidak memiliki catatan tambahan (IS NULL)
SELECT pelanggan, status FROM pesanan WHERE catatan IS NULL;`,
        exercise: {
          instruction: "Cari pesanan dari tabel `pesanan` dengan status IN ('PROSES', 'PENDING')!",
          starterCode: `SELECT pelanggan, produk, status FROM pesanan WHERE status IN ('PROSES', 'PENDING');`,
          expectedHint: "Tuliskan `WHERE status IN ('PROSES', 'PENDING')`."
        },
        quiz: [
          {
            question: "Bagaimanakah cara yang tepat dan valid menurut standar SQL untuk memeriksa apakah suatu kolom bernilai kosong/NULL?",
            options: ["WHERE kolom = NULL", "WHERE kolom IS NULL", "WHERE kolom == NULL", "WHERE kolom NULL"],
            correctAnswer: 1,
            explanation: "Di SQL, nilai NULL hanya dapat dievaluasi menggunakan operator `IS NULL` atau `IS NOT NULL`."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 4: Agregasi Data & Pengelompokan (GROUP BY & HAVING)
  // ==========================================
  {
    id: "sql-module-4",
    order: 4,
    title: "4. Agregasi & Pengelompokan (GROUP BY & HAVING)",
    subtitle: "COUNT, SUM, AVG, MIN, MAX, GROUP BY & HAVING",
    description: "Menganalisis dan merangkum metrik data dengan fungsi matematika agregat dan grup kategori.",
    icon: "BarChart3",
    badge: "Data Analyst",
    color: "#f72585",
    xp: 450,
    lessons: [
      {
        id: "sql-4-1",
        title: "4.1 Fungsi Agregasi (COUNT, SUM, AVG, MIN, MAX)",
        summary: "Menghitung total kuantitas, rata-rata, nilai terendah, dan nilai tertinggi.",
        content: `### 📈 Menghitung Metrik Bisnis dengan Fungsi Agregat
Tabel **\`penjualan\`** sudah tersedia di database simulasi!

#### 📌 5 Fungsi Agregat Utama:
- **\`COUNT(*)\`**: Menghitung total jumlah baris data.
- **\`SUM(kolom)\`**: Menjumlahkan total nominal angka.
- **\`AVG(kolom)\`**: Menghitung nilai rata-rata (*Average*).
- **\`MIN(kolom)\`**: Mencari nilai terkecil/terendah.
- **\`MAX(kolom)\`**: Mencari nilai terbesar/tertinggi.`,
        codeSnippet: `-- Database 'penjualan' sudah tersedia!
SELECT
  COUNT(*) AS total_transaksi,
  SUM(jumlah) AS total_unit_terjual,
  AVG(harga) AS rata_rata_harga,
  MIN(harga) AS harga_termurah,
  MAX(harga) AS harga_termahal
FROM penjualan;`,
        exercise: {
          instruction: "Hitung total kuantitas barang yang terjual dari tabel `penjualan` menggunakan `SUM(jumlah)`!",
          starterCode: `SELECT SUM(jumlah) AS total_barang_terjual FROM penjualan;`,
          expectedHint: "Gunakan `SELECT SUM(jumlah) AS total_barang_terjual FROM penjualan;`."
        },
        quiz: [
          {
            question: "Fungsi agregat manakah yang digunakan untuk mencari nilai rata-rata dari sekumpulan data numerik?",
            options: ["AVERAGE()", "AVG()", "MEAN()", "SUM() / COUNT()"],
            correctAnswer: 1,
            explanation: "Di SQL, fungsi standar untuk menghitung rata-rata adalah `AVG()`."
          }
        ]
      },
      {
        id: "sql-4-2",
        title: "4.2 Pengelompokan Data dengan GROUP BY",
        summary: "Mengelompokkan baris data berdasarkan nilai kategori tertentu untuk analisis per divisi/departemen.",
        content: `### 👥 GROUP BY
Tabel **\`mahasiswa\`** sudah aktif di database simulasi dengan data 5 mahasiswa di berbagai jurusan!

Klausa \`GROUP BY\` memecah baris data ke dalam beberapa kelompok (*buckets*) berdasarkan kesamaan nilai kolom, lalu menerapkan fungsi agregat pada masing-masing kelompok tersebut.`,
        codeSnippet: `-- Database 'mahasiswa' sudah tersedia!
-- Menganalisis total mahasiswa dan rata-rata IPK per Jurusan
SELECT
  jurusan,
  COUNT(*) AS total_mahasiswa,
  AVG(ipk) AS rata_rata_ipk
FROM mahasiswa
GROUP BY jurusan;`,
        exercise: {
          instruction: "Kelompokkan data dari tabel `karyawan` berdasarkan `divisi` dan hitung rata-rata gajinya!",
          starterCode: `SELECT divisi, COUNT(*) AS total_karyawan, AVG(gaji) AS rata_rata_gaji
FROM karyawan
GROUP BY divisi;`,
          expectedHint: "Tuliskan `SELECT divisi, COUNT(*), AVG(gaji) FROM karyawan GROUP BY divisi;`."
        },
        quiz: [
          {
            question: "Kapan klausa GROUP BY harus digunakan?",
            options: [
              "Saat ingin menghapus data duplikat",
              "Saat ingin menghitung fungsi agregat (COUNT, SUM, AVG) yang dipecah per kategori",
              "Saat ingin mengganti nama tabel",
              "Saat tabel tidak memiliki primary key"
            ],
            correctAnswer: 1,
            explanation: "`GROUP BY` memisahkan data ke grup-grup kategori agar agregasi dihitung per masing-masing kelompok."
          }
        ]
      },
      {
        id: "sql-4-3",
        title: "4.3 Filter Agregasi dengan HAVING (WHERE vs HAVING)",
        summary: "Menyaring hasil kalkulasi grup agregat yang tidak dapat dilakukan oleh WHERE biasa.",
        content: `### ⚖️ Perbedaan WHERE vs HAVING
Tabel **\`pesanan\`** sudah aktif di database simulasi!

#### 📌 Kapan Menggunakan Masing-masing?
- **\`WHERE\`**: Menyaring baris data **SEBELUM** pengelompokan dilakukan (bekerja pada baris individual).
- **\`HAVING\`**: Menyaring kelompok data **SETELAH** \`GROUP BY\` dan agregasi dihitung (bekerja pada hasil fungsi agregat).`,
        codeSnippet: `-- Database 'pesanan' sudah tersedia!
-- Ambil pelanggan loyal yang total belanjanya di atas 5 Juta Rupiah
SELECT
  pelanggan,
  COUNT(*) AS total_order,
  SUM(total) AS total_belanja
FROM pesanan
GROUP BY pelanggan
HAVING SUM(total) >= 5000000;`,
        exercise: {
          instruction: "Gunakan `HAVING COUNT(*) > 1` untuk mencari pelanggan yang memiliki lebih dari 1 transaksi pesanan!",
          starterCode: `SELECT pelanggan, COUNT(*) AS total_order
FROM pesanan
GROUP BY pelanggan
HAVING COUNT(*) > 1;`,
          expectedHint: "Gunakan klausa `HAVING COUNT(*) > 1` setelah `GROUP BY pelanggan`."
        },
        quiz: [
          {
            question: "Mengapa kita tidak boleh menggunakan klausa WHERE untuk memfilter hasil fungsi agregat seperti `WHERE AVG(nilai) > 80`?",
            options: [
              "Karena klausa WHERE hanya boleh dipakai untuk tipe data teks",
              "Karena WHERE dieksekusi sebelum agregasi dihitung, sehingga harus menggunakan HAVING",
              "Karena SQL tidak mendukung fungsi AVG",
              "Karena nilai AVG harus selalu bernilai bulat"
            ],
            correctAnswer: 1,
            explanation: "Urutan eksekusi query memproses WHERE sebelum GROUP BY dan agregasi, sehingga filter atas hasil agregasi harus memakai HAVING."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 5: Relasi Tabel & Relational JOINs (INNER, LEFT, RIGHT)
  // ==========================================
  {
    id: "sql-module-5",
    order: 5,
    title: "5. Relasi Tabel & Multi-Table JOIN",
    subtitle: "Foreign Key, INNER JOIN, LEFT JOIN & Relasi Antar Entitas",
    description: "Kekuatan sejati database relasional: menggabungkan data dari banyak tabel secara efisien dengan kunci penghubung.",
    icon: "Network",
    badge: "Relational Master",
    color: "#4361ee",
    xp: 500,
    lessons: [
      {
        id: "sql-5-1",
        title: "5.1 Konsep Relasi & INNER JOIN",
        summary: "Menggabungkan dua tabel dan hanya mengambil baris yang memiliki pasangan cocok di kedua sisi.",
        content: `### 🔗 Normalisasi & Relasi Tabel
Tabel **\`users\`** dan **\`pesanan\`** sudah terhubung di database simulasi via Foreign Key \`users.id = pesanan.user_id\`!

#### 📌 INNER JOIN:
Menggabungkan baris dari Tabel A dan Tabel B hanya jika nilai kunci penghubung (*ON condition*) **COCOK di kedua belah pihak**.`,
        codeSnippet: `-- Database 'users' dan 'pesanan' sudah siap saling berelasi!
SELECT users.nama, users.kota, pesanan.produk, pesanan.total
FROM users
INNER JOIN pesanan ON users.id = pesanan.user_id;`,
        exercise: {
          instruction: "Lakukan INNER JOIN antara tabel `users` dan `pesanan` berdasarkan `users.id = pesanan.user_id`!",
          starterCode: `SELECT users.nama, pesanan.produk, pesanan.status
FROM users
INNER JOIN pesanan ON users.id = pesanan.user_id;`,
          expectedHint: "Tuliskan `INNER JOIN pesanan ON users.id = pesanan.user_id`."
        },
        quiz: [
          {
            question: "Bagaimanakah perilaku INNER JOIN jika sebuah baris di Tabel A tidak memiliki pasangan di Tabel B?",
            options: [
              "Baris tersebut tetap muncul dengan nilai NULL",
              "Baris tersebut tidak akan diikutsertakan di dalam hasil query",
              "Database akan otomatis membatalkan seluruh query",
              "Data otomatis dihapus dari database"
            ],
            correctAnswer: 1,
            explanation: "INNER JOIN hanya menampilkan baris yang memiliki pasangan yang cocok di kedua tabel."
          }
        ]
      },
      {
        id: "sql-5-2",
        title: "5.2 LEFT JOIN (Mempertahankan Master Data)",
        summary: "Mengambil SEMUA baris tabel kiri, meskipun tidak memiliki pasangan di tabel kanan.",
        content: `### ⬅️ LEFT JOIN (LEFT OUTER JOIN)
\`LEFT JOIN\` menjamin bahwa **SEMUA baris dari tabel kiri (tabel utama) akan selalu ditampilkan**.

Jika baris tersebut tidak memiliki pasangan transaksi di tabel kanan, kolom tabel kanan otomatis diisi dengan nilai **\`NULL\`** (misal user Budi Santoso yang belum pernah belanja).`,
        codeSnippet: `-- Database 'users' dan 'pesanan' sudah tersedia!
-- Budi Santoso tetap muncul di baris dengan produk bernilai NULL
SELECT users.nama, users.kota, pesanan.produk, pesanan.total
FROM users
LEFT JOIN pesanan ON users.id = pesanan.user_id;`,
        exercise: {
          instruction: "Lakukan LEFT JOIN dari tabel `users` ke tabel `pesanan`!",
          starterCode: `SELECT users.nama, pesanan.produk
FROM users
LEFT JOIN pesanan ON users.id = pesanan.user_id;`,
          expectedHint: "Gunakan klausa `LEFT JOIN pesanan ON users.id = pesanan.user_id`."
        },
        quiz: [
          {
            question: "Apakah nilai yang akan terisi pada kolom tabel kanan jika baris tabel kiri tidak memiliki pasangan pada LEFT JOIN?",
            options: ["0", "EMPTY", "NULL", "UNDEFINED"],
            correctAnswer: 2,
            explanation: "Di SQL, nilai kolom dari tabel kanan yang tidak memiliki pasangan akan terisi `NULL`."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 6: Manipulasi Data Lanjutan (UPDATE & DELETE)
  // ==========================================
  {
    id: "sql-module-6",
    order: 6,
    title: "6. Modifikasi Data & Lanjutan (UPDATE & DELETE)",
    subtitle: "Pembaruan Data, Penghapusan Baris & Integritas Transaksional",
    description: "Memperbarui isi kolom secara selektif dan menghapus data yang kadaluarsa dengan aman.",
    icon: "Edit3",
    badge: "Data Administrator",
    color: "#2ec4b6",
    xp: 400,
    lessons: [
      {
        id: "sql-6-1",
        title: "6.1 UPDATE Data dengan Aman",
        summary: "Memperbarui nilai satu atau beberapa kolom pada baris data tertentu.",
        content: `### ✏️ Memperbarui Data dengan UPDATE
Tabel **\`anggota\`** sudah tersedia di database simulasi!

> 🚨 **PERINGATAN PENTING:** Selalu sertakan klausa **\`WHERE\`** pada perintah \`UPDATE\`! Jika Anda lupa menulis \`WHERE\`, maka **SELURUH baris data di tabel akan tertimpa nilai baru**!`,
        codeSnippet: `-- Database 'anggota' sudah tersedia!
-- 1. Naikkan level Kevin (id = 1) menjadi 'Platinum'
UPDATE anggota
SET status = 'Platinum'
WHERE id = 1;

-- 2. Cek hasil pembaruan langsung
SELECT * FROM anggota;`,
        exercise: {
          instruction: "Perbarui status anggota dengan id = 2 menjadi 'Gold'!",
          starterCode: `UPDATE anggota SET status = 'Gold' WHERE id = 2;
SELECT * FROM anggota;`,
          expectedHint: "Gunakan `UPDATE anggota SET status = 'Gold' WHERE id = 2;`."
        },
        quiz: [
          {
            question: "Apa konsekuensi fatal jika menjalankan query UPDATE tanpa menyertakan klausa WHERE?",
            options: [
              "Query otomatis dibatalkan oleh database",
              "Seluruh baris di dalam tabel akan ikut ter-update",
              "Hanya baris pertama yang berubah",
              "Database akan membuat tabel baru"
            ],
            correctAnswer: 1,
            explanation: "Tanpa WHERE, perintah UPDATE akan menimpa seluruh baris data di tabel tanpa ampun."
          }
        ]
      },
      {
        id: "sql-6-2",
        title: "6.2 DELETE Data Spesifik",
        summary: "Menghapus satu atau beberapa baris data secara terarah.",
        content: `### 🗑️ Menghapus Baris dengan DELETE
Tabel **\`keranjang\`** sudah tersedia di database simulasi!

Sama seperti \`UPDATE\`, klausa \`WHERE\` **mutlak wajib** digunakan kecuali memang berniat mengosongkan seluruh tabel.`,
        codeSnippet: `-- Database 'keranjang' sudah tersedia!
-- Hapus barang dengan id = 3 dari keranjang belanja
DELETE FROM keranjang WHERE id = 3;

-- Cek isi keranjang belanja terkini
SELECT * FROM keranjang;`,
        exercise: {
          instruction: "Hapus baris dari tabel keranjang yang memiliki id = 2!",
          starterCode: `DELETE FROM keranjang WHERE id = 2;
SELECT * FROM keranjang;`,
          expectedHint: "Tuliskan `DELETE FROM keranjang WHERE id = 2;`."
        },
        quiz: [
          {
            question: "Perintah SQL manakah yang benar untuk menghapus data pelanggan yang berstatus 'INAKTIF'?",
            options: [
              "REMOVE FROM pelanggan WHERE status = 'INAKTIF'",
              "DELETE FROM pelanggan WHERE status = 'INAKTIF'",
              "DROP pelanggan WHERE status = 'INAKTIF'",
              "ERASE pelanggan WHERE status = 'INAKTIF'"
            ],
            correctAnswer: 1,
            explanation: "Sintaks standar penghapusan baris data SQL adalah `DELETE FROM <nama_tabel> WHERE <kondisi>`."
          }
        ]
      }
    ]
  }
];
