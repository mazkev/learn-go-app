/**
 * SQL (Structured Query Language) Curriculum & Interactive Roadmap Modules
 * Panduan Lengkap Database Relasional: DDL, DML, Filtering, Agregasi, GROUP BY, dan Relational JOINs.
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
        codeSnippet: `-- 1. Membuat Tabel Mahasiswa
CREATE TABLE mahasiswa (
  id INT,
  nim VARCHAR(10),
  nama VARCHAR(50),
  jurusan VARCHAR(30),
  ipk DECIMAL(3,2)
);

-- 2. Memasukkan contoh data awal
INSERT INTO mahasiswa (id, nim, nama, jurusan, ipk) VALUES
  (1, '2026001', 'Kevin Pratama', 'Informatika', 3.92),
  (2, '2026002', 'Siti Aminah', 'Sistem Informasi', 3.85);

-- 3. Membaca isi tabel
SELECT * FROM mahasiswa;`,
        exercise: {
          instruction: "Buat tabel bernama `buku` dengan kolom `id INT`, `judul VARCHAR(100)`, dan `harga INT`!",
          starterCode: `CREATE TABLE buku (
  id INT,
  judul VARCHAR(100),
  harga INT
);

INSERT INTO buku (id, judul, harga) VALUES
  (1, 'Belajar SQL Dasar', 85000),
  (2, 'Mastering Database Systems', 145000);

SELECT * FROM buku;`,
          expectedHint: "Gunakan perintah `CREATE TABLE buku (...)` dengan kolom `id`, `judul`, dan `harga`."
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
        codeSnippet: `CREATE TABLE produk (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_produk VARCHAR(50) NOT NULL,
  kategori VARCHAR(30) DEFAULT 'Umum',
  harga INT NOT NULL
);

INSERT INTO produk (nama_produk, harga) VALUES
  ('Keyboard Mechanical', 650000),
  ('Mouse Wireless', 250000);

SELECT * FROM produk;`,
        exercise: {
          instruction: "Tambahkan produk baru ke dalam tabel dengan nama 'Headset Gaming' dan harga 450000!",
          starterCode: `CREATE TABLE produk (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_produk VARCHAR(50) NOT NULL,
  harga INT NOT NULL
);

INSERT INTO produk (nama_produk, harga) VALUES
  ('Keyboard Mechanical', 650000),
  ('Headset Gaming', 450000);

SELECT * FROM produk;`,
          expectedHint: "Gunakan klausa `INSERT INTO produk (nama_produk, harga) VALUES ('Headset Gaming', 450000);`."
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
        title: "1.3 Menghapus Tabel dengan DROP TABLE",
        summary: "Menghapus tabel skema yang sudah tidak digunakan lagi secara aman.",
        content: `### 🗑️ DROP TABLE
Perintah \`DROP TABLE\` digunakan untuk menghapus tabel secara permanen beserta seluruh skema dan baris data di dalamnya.

> ⚠️ **Hati-hati:** Tindakan \`DROP TABLE\` tidak dapat di-undo (*irreversible*).

Gunakan \`IF EXISTS\` untuk mencegah error jika tabel tersebut kebetulan belum ada.`,
        codeSnippet: `-- 1. Membuat tabel sementara
CREATE TABLE tabel_sementara (
  id INT,
  catatan VARCHAR(50)
);

INSERT INTO tabel_sementara VALUES (1, 'Catatan Uji Coba');

-- 2. Menghapus tabel sementara
DROP TABLE IF EXISTS tabel_sementara;

-- 3. Membuat tabel baru yang bersih
CREATE TABLE pengguna (
  id INT PRIMARY KEY,
  username VARCHAR(30)
);

INSERT INTO pengguna VALUES (1, 'kevin_developer');

SELECT * FROM pengguna;`,
        exercise: {
          instruction: "Gunakan `DROP TABLE IF EXISTS draft;` lalu buat tabel `anggota`!",
          starterCode: `CREATE TABLE draft (id INT);
DROP TABLE IF EXISTS draft;

CREATE TABLE anggota (
  id INT PRIMARY KEY,
  nama VARCHAR(50)
);

INSERT INTO anggota VALUES (1, 'Siti Aminah');
SELECT * FROM anggota;`,
          expectedHint: "Tuliskan `DROP TABLE IF EXISTS draft;` sebelum membuat tabel `anggota`."
        },
        quiz: [
          {
            question: "Klausa apa yang disarankan ditambahkan setelah DROP TABLE untuk mencegah runtime error saat tabel tidak ditemukan?",
            options: ["CASCADE ONLY", "IF EXISTS", "FORCE DELETE", "WHERE id = 0"],
            correctAnswer: 1,
            explanation: "`DROP TABLE IF EXISTS nama_tabel` mengecek keberadaan tabel terlebih dahulu sehingga query tidak gagal jika tabel belum ada."
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
Alih-alih menggunakan \`SELECT *\` yang mengambil seluruh kolom dan membebani memori, praktik terbaik (*Best Practice*) di industri adalah selalu menentukan nama kolom yang dibutuhkan secara spesifik.

#### 📌 Kolom Alias dengan \`AS\`:
Kita dapat mengganti nama tampilan kolom hasil query menggunakan keyword \`AS\`.`,
        codeSnippet: `CREATE TABLE karyawan (
  id INT PRIMARY KEY,
  nama_depan VARCHAR(30),
  nama_belakang VARCHAR(30),
  gaji INT,
  divisi VARCHAR(30)
);

INSERT INTO karyawan VALUES
  (1, 'Kevin', 'Pratama', 12500000, 'Engineering'),
  (2, 'Siti', 'Aminah', 9500000, 'Design'),
  (3, 'Budi', 'Santoso', 11000000, 'Engineering');

-- Mengambil hanya kolom yang dibutuhkan dengan nama alias yang rapi
SELECT nama_depan AS nama, gaji AS pendapatan_bulanan, divisi
FROM karyawan;`,
        exercise: {
          instruction: "Pilih kolom `nama_depan` dengan alias `karyawan` dan kolom `gaji` dari tabel karyawan!",
          starterCode: `CREATE TABLE karyawan (
  id INT PRIMARY KEY,
  nama_depan VARCHAR(30),
  gaji INT
);

INSERT INTO karyawan VALUES
  (1, 'Kevin', 12000000),
  (2, 'Rina', 8500000);

SELECT nama_depan AS karyawan, gaji FROM karyawan;`,
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
Klausa \`WHERE\` digunakan untuk membatasi baris data yang diambil hanya yang memenuhi kriteria kondisi tertentu (*Filter Boolean*).

#### 📌 Operator Perbandingan:
- **\`=\`**: Sama dengan.
- **\`!=\`** atau **\`<>\`**: Tidak sama dengan.
- **\`>\`** & **\`<\`**: Lebih besar / Lebih kecil dari.
- **\`>=\`** & **\`<=\`**: Lebih besar sama dengan / Lebih kecil sama dengan.`,
        codeSnippet: `CREATE TABLE produk (
  id INT PRIMARY KEY,
  nama VARCHAR(50),
  kategori VARCHAR(30),
  harga INT
);

INSERT INTO produk VALUES
  (1, 'MacBook Pro', 'Laptop', 24000000),
  (2, 'Logitech MX Master', 'Aksesoris', 1400000),
  (3, 'Dell XPS 15', 'Laptop', 21000000),
  (4, 'Keychron K2', 'Aksesoris', 1200000);

-- Filter 1: Ambil hanya produk dengan kategori Laptop
SELECT nama, harga FROM produk WHERE kategori = 'Laptop';

-- Filter 2: Ambil produk dengan harga di bawah 2 juta
SELECT nama, harga FROM produk WHERE harga < 2000000;`,
        exercise: {
          instruction: "Tuliskan query SELECT untuk mencari produk dengan harga >= 20000000!",
          starterCode: `CREATE TABLE produk (
  id INT PRIMARY KEY,
  nama VARCHAR(50),
  harga INT
);

INSERT INTO produk VALUES
  (1, 'Laptop Gaming', 25000000),
  (2, 'Mouse Office', 150000),
  (3, 'Workstation PC', 35000000);

SELECT nama, harga FROM produk WHERE harga >= 20000000;`,
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
Secara default, database tidak menjamin urutan baris hasil query. Untuk mengurutkannya secara konsisten, gunakan \`ORDER BY\`.

#### 📌 Aturan ORDER BY:
- **\`ASC\`**: *Ascending* (Terkecil ke terbesar / A-Z) -> Default.
- **\`DESC\`**: *Descending* (Terbesar ke terkecil / Z-A).

#### 📌 LIMIT & OFFSET:
- **\`LIMIT n\`**: Mengambil maksimal n baris pertama.
- **\`OFFSET m\`**: Melompati m baris pertama (sangat vital untuk fitur pagination halaman web).`,
        codeSnippet: `CREATE TABLE skor_game (
  pemain VARCHAR(30),
  skor INT
);

INSERT INTO skor_game VALUES
  ('Andi', 850),
  ('Kevin', 1420),
  ('Siti', 1190),
  ('Budi', 670),
  ('Dewi', 1580);

-- Leaderboard: Top 3 Skor Tertinggi (Diurutkan dari terbesar)
SELECT pemain, skor
FROM skor_game
ORDER BY skor DESC
LIMIT 3;`,
        exercise: {
          instruction: "Urutkan data berdasarkan skor secara DESC dan ambil 2 pemain teratas!",
          starterCode: `CREATE TABLE skor_game (
  pemain VARCHAR(30),
  skor INT
);

INSERT INTO skor_game VALUES
  ('Gamer1', 400),
  ('Gamer2', 950),
  ('Gamer3', 820);

SELECT pemain, skor FROM skor_game ORDER BY skor DESC LIMIT 2;`,
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
Ketika kriteria data semakin kompleks, kita dapat merangkai beberapa kondisi di dalam klausa \`WHERE\`.

- **\`AND\`**: Bernilai benar jika **SEMUA** kondisi terpenuhi.
- **\`OR\`**: Bernilai benar jika **SALAH SATU** kondisi terpenuhi.
- **\`NOT\`**: Membalikkan nilai logika (negasi).`,
        codeSnippet: `CREATE TABLE karyawan (
  id INT PRIMARY KEY,
  nama VARCHAR(50),
  divisi VARCHAR(30),
  gaji INT
);

INSERT INTO karyawan VALUES
  (1, 'Kevin', 'IT', 12000000),
  (2, 'Budi', 'IT', 7500000),
  (3, 'Siti', 'Finance', 9000000),
  (4, 'Rina', 'HR', 6500000);

-- Karyawan divisi IT dengan gaji di atas 8 juta
SELECT nama, divisi, gaji
FROM karyawan
WHERE divisi = 'IT' AND gaji > 8000000;

-- Karyawan divisi IT ATAU Finance
SELECT nama, divisi, gaji
FROM karyawan
WHERE divisi = 'IT' OR divisi = 'Finance';`,
        exercise: {
          instruction: "Gunakan klausa WHERE dengan `AND` untuk mencari karyawan divisi 'IT' dengan gaji > 10000000!",
          starterCode: `CREATE TABLE karyawan (
  id INT PRIMARY KEY,
  nama VARCHAR(50),
  divisi VARCHAR(30),
  gaji INT
);

INSERT INTO karyawan VALUES
  (1, 'Kevin', 'IT', 12000000),
  (2, 'Agus', 'IT', 7000000);

SELECT nama, gaji FROM karyawan WHERE divisi = 'IT' AND gaji > 10000000;`,
          expectedHint: "Tuliskan `WHERE divisi = 'IT' AND gaji > 10000000`."
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
Operator \`LIKE\` digunakan bersama simbol **wildcard** untuk mencocokkan kemiripan teks:

- **\`%\` (Persen)**: Mewakili **0, 1, atau banyak karakter bebas**.
  - \`'A%'\`: Berawalan huruf 'A'.
  - \`'%gmail.com'\`: Berakhiran '@gmail.com'.
  - \`'%java%'\`: Mengandung kata 'java' di posisi mana pun.
- **\`_\` (Garis Bawah)**: Mewakili **tepat 1 karakter bebas**.`,
        codeSnippet: `CREATE TABLE pengguna (
  id INT PRIMARY KEY,
  nama VARCHAR(50),
  email VARCHAR(50)
);

INSERT INTO pengguna VALUES
  (1, 'Alexander Kevin', 'kevin@gmail.com'),
  (2, 'Budi Santoso', 'budi@yahoo.com'),
  (3, 'Alexandria Siti', 'siti@gmail.com'),
  (4, 'Cindy Claudia', 'cindy@perusahaan.co.id');

-- 1. Nama yang berawalan kata 'Alex'
SELECT nama, email FROM pengguna WHERE nama LIKE 'Alex%';

-- 2. Pengguna yang menggunakan email '@gmail.com'
SELECT nama, email FROM pengguna WHERE email LIKE '%@gmail.com';`,
        exercise: {
          instruction: "Cari pengguna yang namanya mengandung kata 'Kevin' di posisi mana pun!",
          starterCode: `CREATE TABLE pengguna (
  id INT PRIMARY KEY,
  nama VARCHAR(50)
);

INSERT INTO pengguna VALUES
  (1, 'Dr. Kevin Pratama, M.Kom'),
  (2, 'Budi Santoso');

SELECT nama FROM pengguna WHERE nama LIKE '%Kevin%';`,
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
Daripada menuliskan banyak \`OR\` yang panjang, SQL menyediakan shortcut yang sangat elegan:

- **\`IN (val1, val2, ...)\`**: Memeriksa apakah nilai kolom ada di dalam daftar himpunan.
- **\`BETWEEN a AND b\`**: Memeriksa apakah nilai berada di antara batas bawah 'a' dan batas atas 'b' (inklusif).
- **\`IS NULL\` & \`IS NOT NULL\`**: Memeriksa kolom yang kosong tanpa data. (Catatan: Jangan gunakan \`= NULL\` karena NULL tidak dapat dibandingkan dengan operator sama dengan biasa!).`,
        codeSnippet: `CREATE TABLE pesanan (
  id INT PRIMARY KEY,
  pelanggan VARCHAR(50),
  status VARCHAR(20),
  total INT,
  catatan VARCHAR(50)
);

INSERT INTO pesanan VALUES
  (1, 'Kevin', 'SELESAI', 250000, 'Packing aman ya'),
  (2, 'Budi', 'PROSES', 150000, NULL),
  (3, 'Siti', 'PENDING', 450000, NULL),
  (4, 'Dewi', 'SELESAI', 350000, 'Tolong kirim siang');

-- 1. Status 'PROSES' atau 'PENDING' menggunakan IN
SELECT pelanggan, status FROM pesanan WHERE status IN ('PROSES', 'PENDING');

-- 2. Total belanja antara 200rb s/d 400rb dengan BETWEEN
SELECT pelanggan, total FROM pesanan WHERE total BETWEEN 200000 AND 400000;

-- 3. Pesanan yang tidak memiliki catatan (IS NULL)
SELECT pelanggan, status FROM pesanan WHERE catatan IS NULL;`,
        exercise: {
          instruction: "Cari pesanan dengan total BETWEEN 100000 AND 300000!",
          starterCode: `CREATE TABLE pesanan (
  id INT PRIMARY KEY,
  pelanggan VARCHAR(50),
  total INT
);

INSERT INTO pesanan VALUES
  (1, 'Kevin', 250000),
  (2, 'Budi', 500000);

SELECT pelanggan, total FROM pesanan WHERE total BETWEEN 100000 AND 300000;`,
          expectedHint: "Tuliskan `WHERE total BETWEEN 100000 AND 300000`."
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
Fungsi agregat memproses sekumpulan baris nilai dan merangkumnya menjadi **1 nilai kesimpulan tunggal**.

#### 📌 5 Fungsi Agregat Utama:
- **\`COUNT(*)\`**: Menghitung total jumlah baris data.
- **\`SUM(kolom)\`**: Menjumlahkan total nominal angka.
- **\`AVG(kolom)\`**: Menghitung nilai rata-rata (*Average*).
- **\`MIN(kolom)\`**: Mencari nilai terkecil/terendah.
- **\`MAX(kolom)\`**: Mencari nilai terbesar/tertinggi.`,
        codeSnippet: `CREATE TABLE penjualan (
  id INT PRIMARY KEY,
  produk VARCHAR(50),
  jumlah INT,
  harga INT
);

INSERT INTO penjualan VALUES
  (1, 'Laptop', 2, 10000000),
  (2, 'Monitor', 5, 2000000),
  (3, 'Mouse', 10, 250000),
  (4, 'Keyboard', 4, 750000);

-- Rangkuman Eksekutif Penjualan
SELECT
  COUNT(*) AS total_transaksi,
  SUM(jumlah) AS total_unit_terjual,
  AVG(harga) AS rata_rata_harga,
  MIN(harga) AS harga_termurah,
  MAX(harga) AS harga_termahal
FROM penjualan;`,
        exercise: {
          instruction: "Hitung total kuantitas barang yang terjual menggunakan `SUM(jumlah)`!",
          starterCode: `CREATE TABLE penjualan (
  id INT PRIMARY KEY,
  jumlah INT
);

INSERT INTO penjualan VALUES (1, 10), (2, 25), (3, 15);

SELECT SUM(jumlah) AS total_barang FROM penjualan;`,
          expectedHint: "Gunakan `SELECT SUM(jumlah) AS total_barang FROM penjualan;`."
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
Klausa \`GROUP BY\` memecah baris data ke dalam beberapa kelompok (*buckets*) berdasarkan kesamaan nilai kolom, lalu menerapkan fungsi agregat pada masing-masing kelompok tersebut.

> 💡 **Aturan Emas:** Semua kolom non-agregat yang ditulis di klausa \`SELECT\` **WAJIB** dicantumkan di dalam \`GROUP BY\`.`,
        codeSnippet: `CREATE TABLE mahasiswa (
  id INT PRIMARY KEY,
  nama VARCHAR(50),
  jurusan VARCHAR(30),
  ipk DECIMAL(3,2)
);

INSERT INTO mahasiswa VALUES
  (1, 'Kevin', 'Informatika', 3.92),
  (2, 'Siti', 'Sistem Informasi', 3.85),
  (3, 'Budi', 'Informatika', 3.45),
  (4, 'Rina', 'Sistem Informasi', 3.70),
  (5, 'Dewi', 'Teknik Komputer', 3.90);

-- Menganalisis total mahasiswa dan rata-rata IPK per Jurusan
SELECT
  jurusan,
  COUNT(*) AS total_mahasiswa,
  AVG(ipk) AS rata_rata_ipk
FROM mahasiswa
GROUP BY jurusan;`,
        exercise: {
          instruction: "Kelompokkan data karyawan berdasarkan `divisi` dan hitung total karyawannya!",
          starterCode: `CREATE TABLE karyawan (
  id INT PRIMARY KEY,
  divisi VARCHAR(30)
);

INSERT INTO karyawan VALUES (1, 'IT'), (2, 'HR'), (3, 'IT');

SELECT divisi, COUNT(*) AS total FROM karyawan GROUP BY divisi;`,
          expectedHint: "Tuliskan `GROUP BY divisi` di akhir query."
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
Banyak pemula SQL keliru mencoba memfilter hasil agregat menggunakan \`WHERE\` (misal: \`WHERE COUNT(*) > 5\` ❌ -> Error!).

#### 📌 Kapan Menggunakan Masing-masing?
- **\`WHERE\`**: Menyaring baris data **SEBELUM** pengelompokan dilakukan (bekerja pada baris individual).
- **\`HAVING\`**: Menyaring kelompok data **SETELAH** \`GROUP BY\` dan agregasi dihitung (bekerja pada hasil fungsi agregat).`,
        codeSnippet: `CREATE TABLE pesanan (
  id INT PRIMARY KEY,
  pelanggan VARCHAR(50),
  nominal INT
);

INSERT INTO pesanan VALUES
  (1, 'Kevin', 500000),
  (2, 'Kevin', 750000),
  (3, 'Budi', 200000),
  (4, 'Siti', 900000),
  (5, 'Siti', 400000),
  (6, 'Siti', 300000);

-- Ambil pelanggan loyal yang total belanjanya di atas 1 Juta Rupiah
SELECT
  pelanggan,
  COUNT(*) AS total_order,
  SUM(nominal) AS total_belanja
FROM pesanan
GROUP BY pelanggan
HAVING SUM(nominal) >= 1000000;`,
        exercise: {
          instruction: "Gunakan `HAVING COUNT(*) > 1` untuk mencari pelanggan yang memiliki lebih dari 1 pesanan!",
          starterCode: `CREATE TABLE pesanan (
  id INT PRIMARY KEY,
  pelanggan VARCHAR(50)
);

INSERT INTO pesanan VALUES (1, 'Kevin'), (2, 'Kevin'), (3, 'Budi');

SELECT pelanggan, COUNT(*) AS total
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
Dalam arsitektur database modern, kita tidak menumpuk seluruh data dalam 1 tabel raksasa (mencegah redundansi data). Kita memisahkannya ke dalam tabel-tabel spesifik dan menghubungkannya via **Foreign Key**.

#### 📌 INNER JOIN:
Menggabungkan Baris dari Tabel A dan Tabel B hanya jika nilai kunci penghubung (*ON condition*) **COCOK di kedua belah pihak**.`,
        codeSnippet: `CREATE TABLE users (
  id INT PRIMARY KEY,
  nama VARCHAR(50),
  kota VARCHAR(30)
);

CREATE TABLE pesanan (
  id INT PRIMARY KEY,
  user_id INT,
  produk VARCHAR(50),
  total INT
);

INSERT INTO users VALUES
  (1, 'Kevin Pratama', 'Jakarta'),
  (2, 'Siti Aminah', 'Bandung'),
  (3, 'Budi Santoso', 'Surabaya'); -- Budi belum pernah belanja

INSERT INTO pesanan VALUES
  (101, 1, 'MacBook Air M3', 17500000),
  (102, 1, 'Magic Mouse', 1250000),
  (103, 2, 'iPad Pro 11', 14000000);

-- INNER JOIN: Menampilkan data pemesan dan produk yang dibeli
SELECT users.nama, users.kota, pesanan.produk, pesanan.total
FROM users
INNER JOIN pesanan ON users.id = pesanan.user_id;`,
        exercise: {
          instruction: "Lakukan INNER JOIN antara tabel `users` dan `pesanan` berdasarkan `users.id = pesanan.user_id`!",
          starterCode: `CREATE TABLE users (id INT PRIMARY KEY, nama VARCHAR(50));
CREATE TABLE pesanan (id INT PRIMARY KEY, user_id INT, produk VARCHAR(50));

INSERT INTO users VALUES (1, 'Kevin'), (2, 'Siti');
INSERT INTO pesanan VALUES (101, 1, 'Laptop');

SELECT users.nama, pesanan.produk
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

Jika baris tersebut tidak memiliki pasangan transaksi di tabel kanan, kolom tabel kanan otomatis diisi dengan nilai **\`NULL\`**.

Sangat bermanfaat untuk skenario analitik:
- Menemukan pengguna yang *belum pernah belanja sama sekali*.
- Menemukan barang di gudang yang *belum pernah terjual*.`,
        codeSnippet: `CREATE TABLE users (
  id INT PRIMARY KEY,
  nama VARCHAR(50)
);

CREATE TABLE pesanan (
  id INT PRIMARY KEY,
  user_id INT,
  produk VARCHAR(50)
);

INSERT INTO users VALUES
  (1, 'Kevin Pratama'),
  (2, 'Siti Aminah'),
  (3, 'Budi Santoso'); -- Tidak ada pesanan

INSERT INTO pesanan VALUES
  (101, 1, 'Laptop Ultra'),
  (102, 2, 'Monitor 4K');

-- LEFT JOIN: Budi tetap muncul meskipun kolom produk bernilai NULL
SELECT users.nama, pesanan.produk
FROM users
LEFT JOIN pesanan ON users.id = pesanan.user_id;`,
        exercise: {
          instruction: "Lakukan LEFT JOIN dari tabel `users` ke tabel `pesanan`!",
          starterCode: `CREATE TABLE users (id INT PRIMARY KEY, nama VARCHAR(50));
CREATE TABLE pesanan (id INT PRIMARY KEY, user_id INT, produk VARCHAR(50));

INSERT INTO users VALUES (1, 'Kevin'), (2, 'Budi');
INSERT INTO pesanan VALUES (101, 1, 'Kamera');

SELECT users.nama, pesanan.produk
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
  // MODUL 6: Manipulasi Data Lanjutan (UPDATE, DELETE & Subquery)
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
Perintah \`UPDATE\` digunakan untuk memodifikasi nilai data yang sudah ada di dalam tabel.

> 🚨 **PERINGATAN PENTING:** Selalu sertakan klausa **\`WHERE\`** pada perintah \`UPDATE\`! Jika Anda lupa menulis \`WHERE\`, maka **SELURUH baris data di tabel akan tertimpa nilai baru**!`,
        codeSnippet: `CREATE TABLE anggota (
  id INT PRIMARY KEY,
  nama VARCHAR(50),
  status VARCHAR(20),
  poin INT
);

INSERT INTO anggota VALUES
  (1, 'Kevin Pratama', 'Silver', 150),
  (2, 'Siti Aminah', 'Silver', 200),
  (3, 'Budi Santoso', 'Bronze', 50);

-- 1. Naikkan level Kevin menjadi 'Gold' dan tambah poinnya
UPDATE anggota
SET status = 'Gold', poin = poin + 100
WHERE id = 1;

-- 2. Cek hasil pembaruan
SELECT * FROM anggota;`,
        exercise: {
          instruction: "Perbarui status anggota dengan id = 2 menjadi 'Gold'!",
          starterCode: `CREATE TABLE anggota (
  id INT PRIMARY KEY,
  nama VARCHAR(50),
  status VARCHAR(20)
);

INSERT INTO anggota VALUES (1, 'Kevin', 'Silver'), (2, 'Siti', 'Silver');

UPDATE anggota SET status = 'Gold' WHERE id = 2;

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
Perintah \`DELETE FROM\` digunakan untuk menghapus baris data yang sudah tidak valid atau dibatalkan.

Sama seperti \`UPDATE\`, klausa \`WHERE\` **mutlak wajib** digunakan kecuali memang berniat mengosongkan seluruh tabel.`,
        codeSnippet: `CREATE TABLE keranjang (
  id INT PRIMARY KEY,
  produk VARCHAR(50),
  qty INT
);

INSERT INTO keranjang VALUES
  (1, 'Kaos Polos', 2),
  (2, 'Topi Baseball', 1),
  (3, 'Barang Batal', 1);

-- Hapus barang dengan id = 3 dari keranjang belanja
DELETE FROM keranjang WHERE id = 3;

-- Cek isi keranjang belanja terkini
SELECT * FROM keranjang;`,
        exercise: {
          instruction: "Hapus baris dari tabel keranjang yang memiliki id = 2!",
          starterCode: `CREATE TABLE keranjang (
  id INT PRIMARY KEY,
  produk VARCHAR(50)
);

INSERT INTO keranjang VALUES (1, 'Buku'), (2, 'Pulpen Batal');

DELETE FROM keranjang WHERE id = 2;

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
