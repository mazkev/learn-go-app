/**
 * PHP 8+ & Laravel 11 Curriculum & Interactive Roadmap Modules
 * Kurikulum Lengkap Modern PHP 8.2+, Match Expressions, Constructor Promotion, OOP & Laravel 11
 */

export const PHP_MODULES = [
  // ==========================================
  // MODUL 1: Dasar Modern PHP 8+
  // ==========================================
  {
    id: "php-module-1",
    order: 1,
    title: "1. Dasar Modern PHP 8+",
    subtitle: "Sintaks <?php, Variabel $, Tipe Data & String Interpolation",
    description: "Mempelajari fundamental modern PHP 8+, aturan penulisan variabel dengan tanda dollar ($), tipe data skalar, dan string interpolation.",
    icon: "Code2",
    badge: "PHP ElePHPant",
    color: "#8892BF",
    xp: 250,
    lessons: [
      {
        id: "php-1-1",
        title: "1.1 Pengenalan Sintaks PHP & Variabel",
        summary: "Memahami tag <?php, deklarasi variabel $, dan output echo.",
        content: `### 🐘 Selamat Datang di PHP 8 Modern!
PHP (*Hypertext Preprocessor*) adalah bahasa pemrograman backend paling banyak digunakan di dunia, menggerakkan lebih dari 75% website di internet termasuk ekosistem raksasa **Laravel**.

#### 📌 Aturan Dasar Sintaks PHP:
1. Setiap file PHP dimulai dengan tag pembuka **\`<?php\`**.
2. Seluruh variabel **wajib diawali dengan simbol tanda dollar (\`$\`)** (contoh: \`$nama\`, \`$umur\`).
3. Setiap baris pernyataan diakhiri dengan titik koma (**\`;\`**).
4. **String Interpolation**: Menggunakan tanda kutip ganda (\`"..."\`) untuk menyisipkan variabel langsung ke dalam teks.`,
        codeSnippet: `<?php
// Deklarasi Variabel Modern PHP 8
$nama = "Kevin Pratama";
$role = "Backend PHP & Laravel Developer";
$pengalamanTahun = 4;
$isAktif = true;

// Output dengan String Interpolation
echo "Halo, nama saya $nama!\\n";
echo "Role: $role\\n";
echo "Pengalaman: $pengalamanTahun tahun\\n";
echo "Status: " . ($isAktif ? "🟢 Aktif" : "🔴 Nonaktif") . "\\n";
?>`,
        exercise: {
          instruction: "Buat variabel `$framework = 'Laravel 11'` dan cetak menggunakan `echo`!",
          starterCode: `<?php
$framework = "Laravel 11";
echo "Saya sedang menguasai $framework di platform M3.learn!";
?>`,
          expectedHint: "Gunakan `$framework = \"Laravel 11\";` dan `echo`."
        },
        quiz: [
          {
            question: "Karakter apakah yang wajib diletakkan di depan nama setiap variabel dalam bahasa PHP?",
            options: ["@", "#", "$", "%"],
            correctAnswer: 2,
            explanation: "Dalam PHP, semua variabel wajib diawali dengan simbol tanda dollar (`$`)."
          }
        ]
      },
      {
        id: "php-1-2",
        title: "1.2 Tipe Data & Operator PHP 8",
        summary: "Mengenal tipe data integer, float, string, boolean, dan operator concatenation (.)",
        content: `### 🧩 Tipe Data & Operator Concatenation
PHP mendukung tipe data skalar:
- **String**: Teks (\`"Hello"\` atau \`'World'\`).
- **Integer**: Bilangan bulat (\`42\`).
- **Float**: Bilangan desimal (\`3.14\`).
- **Boolean**: Nilai kebenaran (\`true\` / \`false\`).

#### 📌 Operator Penggabung String (\`.\`):
Berbeda dengan bahasa lain yang menggunakan tanda tambah (\`+\`), PHP menggunakan **tanda titik (\`.\`)** untuk menggabungkan string (*concatenation*).`,
        codeSnippet: `<?php
$hargaBarang = 150000;
$jumlahBeli = 3;
$ongkir = 20000;

// Perhitungan Matematika
$subtotal = $hargaBarang * $jumlahBeli;
$totalBayar = $subtotal + $ongkir;

// Menggabungkan string dengan operator titik (.)
echo "=== Struk Pembelian ===\\n";
echo "Subtotal : Rp " . number_format($subtotal, 0, ',', '.') . "\\n";
echo "Ongkir   : Rp " . number_format($ongkir, 0, ',', '.') . "\\n";
echo "Total    : Rp " . number_format($totalBayar, 0, ',', '.') . "\\n";
?>`,
        exercise: {
          instruction: "Hitung perkalian `$a = 15` dan `$b = 4`, lalu cetak hasilnya!",
          starterCode: `<?php
$a = 15;
$b = 4;
$hasil = $a * $b;
echo "Hasil perkalian: " . $hasil;
?>`,
          expectedHint: "Gunakan `$hasil = $a * $b;`."
        },
        quiz: [
          {
            question: "Operator apakah yang digunakan untuk menggabungkan dua string di PHP?",
            options: ["+", "&", ".", "->"],
            correctAnswer: 2,
            explanation: "Operator titik (`.`) adalah operator resmi string concatenation di PHP."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 2: Struktur Kontrol & Match Expression (PHP 8)
  // ==========================================
  {
    id: "php-module-2",
    order: 2,
    title: "2. Percabangan & Match Expression",
    subtitle: "If/Else, Match Expression (PHP 8) & Null Coalescing (??)",
    description: "Menguasai percabangan modern menggunakan fitur sakti PHP 8 match expression dan operator null safe.",
    icon: "GitBranch",
    badge: "Logic Crafter",
    color: "#7A86B8",
    xp: 300,
    lessons: [
      {
        id: "php-2-1",
        title: "2.1 Match Expression Modern (PHP 8+)",
        summary: "Pengganti switch-case yang lebih aman, ringkas, dan mengembalikan nilai langsung.",
        content: `### ⚡ Fitur Sakti PHP 8: Match Expression
Di PHP 8+, **\`match\`** diperkenalkan sebagai evolusi modern dari \`switch\`:
- Menggunakan perbandingan tipe data ketat (**Strict Comparison \`===\`**).
- Mengembalikan nilai secara langsung (*returns a value*).
- Tidak memerlukan keyword \`break\`.

\`\`\`php
$statusText = match($statusCode) {
    200, 201 => "OK / Created",
    404 => "Not Found",
    500 => "Internal Server Error",
    default => "Unknown Status"
};
\`\`\``,
        codeSnippet: `<?php
$role = "admin";
$httpStatus = 200;

// 1. Match Expression PHP 8
$aksesMenu = match($role) {
    "admin" => "Full Dashboard, User Management, Finance",
    "editor" => "Create & Edit Articles",
    "member" => "Read Only Content",
    default => "Guest Access"
};

// 2. Match untuk Status Code HTTP
$statusLabel = match($httpStatus) {
    200 => "🟢 200 OK - Request Berhasil",
    401 => "🟡 401 Unauthorized - Wajib Login",
    404 => "🔴 404 Not Found - Data Tidak Ada",
    default => "Status Lainnya"
};

echo "Role: $role -> Hak Akses: $aksesMenu\\n";
echo "HTTP Status: $statusLabel\\n";
?>`,
        exercise: {
          instruction: "Gunakan `match` untuk memetakan level `'gold'` ke diskon `20` persen!",
          starterCode: `<?php
$level = "gold";
$diskon = match($level) {
    "bronze" => 5,
    "silver" => 10,
    "gold" => 20,
    default => 0
};

echo "Diskon Member: $diskon%";
?>`,
          expectedHint: "Gunakan ekspresi `match($level) { ... }`."
        },
        quiz: [
          {
            question: "Apa keunggulan utama `match` dibandingkan `switch` di PHP 8?",
            options: [
              "`match` melakukan perbandingan ketat (===) dan me-return nilai langsung tanpa butuh break",
              "`match` hanya bisa digunakan untuk angka",
              "`match` mengharuskan penggunaan tag HTML",
              "`match` berjalan lebih lambat"
            ],
            correctAnswer: 0,
            explanation: "`match` menggunakan strict comparison (`===`) dan langsung me-return nilai ekspresi secara aman."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 3: Array & Manipulasi Data
  // ==========================================
  {
    id: "php-module-3",
    order: 3,
    title: "3. Array Modern & Data Collections",
    subtitle: "Indexed Array, Associative Array & Array Functions",
    description: "Mengolah kumpulan data kompleks dengan Array Asosiatif dan fungsi bawaan array_map, array_filter.",
    icon: "Layers",
    badge: "Array Artisan",
    color: "#8892BF",
    xp: 350,
    lessons: [
      {
        id: "php-3-1",
        title: "3.1 Associative Array & Manipulasi",
        summary: "Struktur data key-value penting untuk konfigurasi dan pemrosesan database di PHP.",
        content: `### 📦 Associative Array di PHP
Array di PHP sangat fleksibel dan dapat berfungsi sebagai *List*, *Map/Dictionary*, atau *Record*:

\`\`\`php
// Associative Array (Key => Value)
$user = [
    "id" => 1,
    "nama" => "Alex",
    "email" => "alex@mail.com"
];
echo $user["nama"]; // Output: Alex
\`\`\``,
        codeSnippet: `<?php
// Daftar Produk (Array of Associative Arrays)
$produkList = [
    ["id" => 1, "nama" => "Laptop ThinkPad", "harga" => 14000000, "kategori" => "Laptop"],
    ["id" => 2, "nama" => "Logitech MX Master", "harga" => 1250000, "kategori" => "Aksesoris"],
    ["id" => 3, "nama" => "Keychron Q1 Pro", "harga" => 2800000, "kategori" => "Aksesoris"],
];

// Menampilkan Data dengan Foreach Loop
echo "=== DAFTAR PRODUK ===\\n";
foreach ($produkList as $p) {
    $hargaFormatted = number_format($p["harga"], 0, ',', '.');
    echo "- [{$p['kategori']}] {$p['nama']} -> Rp $hargaFormatted\\n";
}

// Menghitung Total Harga
$total = array_sum(array_column($produkList, "harga"));
echo "\\nTotal Nilai Inventaris: Rp " . number_format($total, 0, ',', '.') . "\\n";
?>`,
        exercise: {
          instruction: "Buat array asosiatif `$buku = ['judul' => 'Clean Code', 'tahun' => 2008]` dan cetak judulnya!",
          starterCode: `<?php
$buku = [
    "judul" => "Clean Code",
    "penulis" => "Robert C. Martin",
    "tahun" => 2008
];

echo "Judul Buku: " . $buku["judul"];
?>`,
          expectedHint: "Akses elemen dengan `$buku['judul']`."
        },
        quiz: [
          {
            question: "Fungsi bawaan PHP manakah yang digunakan untuk menghitung jumlah total elemen di dalam sebuah array?",
            options: ["length()", "size()", "count()", "total()"],
            correctAnswer: 2,
            explanation: "`count($array)` digunakan untuk menghitung jumlah elemen array di PHP."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 4: Fungsi & Type Hinting Modern
  // ==========================================
  {
    id: "php-module-4",
    order: 4,
    title: "4. Fungsi & Type Hinting PHP 8",
    subtitle: "Named Arguments, Type Hints, Return Types & Arrow Functions",
    description: "Menulis fungsi PHP modern yang aman dengan type declarations dan sintaks arrow function ringkas.",
    icon: "Zap",
    badge: "Function Master",
    color: "#6C7EB7",
    xp: 400,
    lessons: [
      {
        id: "php-4-1",
        title: "4.1 Type Declarations & Named Arguments",
        summary: "Menghindari bug dengan type hinting ketat dan pemanggilan argumen bernama.",
        content: `### 🛡️ Type Hinting & Named Arguments
PHP 8 mendukung deklarasi tipe data yang ketat:

\`\`\`php
function hitungPajak(float $harga, float $persen = 0.11): float {
    return $harga * $persen;
}

// Named Arguments (Memanggil berdasarkan nama parameter!)
hitungPajak(harga: 500000, persen: 0.12);
\`\`\``,
        codeSnippet: `<?php
// Deklarasi Fungsi dengan Type Hinting
function hitungTotalBelanja(int $hargaSatuan, int $qty, float $diskonPersen = 0.10): int {
    $subtotal = $hargaSatuan * $qty;
    $potongan = $subtotal * $diskonPersen;
    return (int)($subtotal - $potongan);
}

// Memanggil fungsi dengan Named Arguments
$total = hitungTotalBelanja(
    hargaSatuan: 250000,
    qty: 4,
    diskonPersen: 0.15
);

echo "Total Akhir Setelah Diskon 15%: Rp " . number_format($total, 0, ',', '.') . "\\n";

// Arrow Function (fn() => ...)
$kaliDua = fn(int $n): int => $n * 2;
echo "Arrow Function 7 x 2 = " . $kaliDua(7) . "\\n";
?>`,
        exercise: {
          instruction: "Buat fungsi `function sapa(string $nama): string` yang mengembalikan `'Halo, ' . $nama`!",
          starterCode: `<?php
function sapa(string $nama): string {
    return "Halo, $nama!";
}

echo sapa("Kevin");
?>`,
          expectedHint: "Gunakan `function sapa(string $nama): string { ... }`."
        },
        quiz: [
          {
            question: "Fitur PHP 8 apakah yang memungkinkan kita memanggil fungsi dengan menyebutkan nama parameter tanpa harus terikat urutan posisi?",
            options: ["Positional Parameters", "Named Arguments", "Dynamic Invocation", "Variable Variables"],
            correctAnswer: 1,
            explanation: "`Named Arguments` di PHP 8 memungkinkan pemanggilan fungsi seperti `foo(name: 'John', age: 30)`."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 5: Object-Oriented Programming (PHP 8 OOP)
  // ==========================================
  {
    id: "php-module-5",
    order: 5,
    title: "5. OOP & Constructor Promotion",
    subtitle: "Class, Constructor Promotion (PHP 8), Readonly & Interfaces",
    description: "Membangun kode berorientasi objek bersih dengan fitur Constructor Property Promotion PHP 8.",
    icon: "Boxes",
    badge: "OOP Architect",
    color: "#8892BF",
    xp: 450,
    lessons: [
      {
        id: "php-5-1",
        title: "5.1 Constructor Property Promotion (PHP 8)",
        summary: "Menghilangkan boilerplate class dengan deklarasi properti langsung di dalam parameter constructor.",
        content: `### 💎 Constructor Property Promotion
Sebelum PHP 8, membuat class membutuhkan penulisan properti berulang-ulang. Di PHP 8+, Anda cukup mendeklarasikannya di parameter constructor!

\`\`\`php
class User {
    public function __construct(
        public readonly int $id,
        public string $nama,
        public string $email
    ) {}
}
\`\`\``,
        codeSnippet: `<?php
// Class Modern dengan PHP 8 Constructor Promotion
class AkunBank {
    public function __construct(
        public readonly string $nomorRekening,
        public string $pemilik,
        private int $saldo = 0
    ) {}

    public function setor(int $nominal): void {
        $this->saldo += $nominal;
        echo "✅ Berhasil setor Rp " . number_format($nominal, 0, ',', '.') . "\\n";
    }

    public function getInfo(): string {
        $saldoFormatted = number_format($this->saldo, 0, ',', '.');
        return "[$this->nomorRekening] $this->pemilik -> Saldo: Rp $saldoFormatted";
    }
}

// Inisialisasi Objek
$akun = new AkunBank(
    nomorRekening: "BCA-987654321",
    pemilik: "Kevin Pratama",
    saldo: 5000000
);

echo $akun->getInfo() . "\\n";
$akun->setor(1500000);
echo "Setelah Setor: " . $akun->getInfo() . "\\n";
?>`,
        exercise: {
          instruction: "Buat class `Produk` dengan properti `public string $nama` dan `public int $harga`, lalu inisialisasi objeknya!",
          starterCode: `<?php
class Produk {
    public function __construct(
        public string $nama,
        public int $harga
    ) {}
}

$p = new Produk("Monitor 4K", 4500000);
echo "Produk: {$p->nama} | Harga: Rp " . number_format($p->harga, 0, ',', '.');
?>`,
          expectedHint: "Gunakan `class Produk { public function __construct(...) {} }`."
        },
        quiz: [
          {
            question: "Keyword apakah yang digunakan di PHP untuk mengakses properti atau method milik objek saat ini?",
            options: ["self::", "$this->", "parent::", "$current->"],
            correctAnswer: 1,
            explanation: "`$this->` digunakan untuk mengakses properti atau method instance di dalam class."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 6: Penanganan Error & Exception
  // ==========================================
  {
    id: "php-module-6",
    order: 6,
    title: "6. Exception Handling & Error Safe",
    subtitle: "Try, Catch, Finally & Custom Exception",
    description: "Menangani kegagalan sistem dan kesalahan input dengan blok try-catch yang aman.",
    icon: "ShieldAlert",
    badge: "Bug Hunter",
    color: "#E57373",
    xp: 400,
    lessons: [
      {
        id: "php-6-1",
        title: "6.1 Try-Catch & Exception Safety",
        summary: "Mencegah aplikasi web crash dengan penanganan error terstruktur.",
        content: `### 🛡️ Exception Handling di PHP
Gunakan blok **\`try-catch-finally\`** untuk menangani operasi berisiko (seperti kalkulasi matematika, koneksi database, atau file I/O).

\`\`\`php
try {
    if ($pembagi === 0) {
        throw new InvalidArgumentException("Pembagi tidak boleh nol!");
    }
    $hasil = $angka / $pembagi;
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
\`\`\``,
        codeSnippet: `<?php
function transferSaldo(int $saldo, int $nominal): int {
    if ($nominal <= 0) {
        throw new InvalidArgumentException("Nominal transfer harus lebih dari 0!");
    }
    if ($nominal > $saldo) {
        throw new Exception("Saldo tidak mencukupi untuk transfer sebesar Rp " . number_format($nominal, 0, ',', '.'));
    }
    return $saldo - $nominal;
}

$saldoAwal = 1000000;

try {
    echo "Mencoba transfer Rp 300.000...\\n";
    $saldoAwal = transferSaldo($saldoAwal, 300000);
    echo "Transfer Sukses! Sisa Saldo: Rp " . number_format($saldoAwal, 0, ',', '.') . "\\n\\n";

    echo "Mencoba transfer melebihi saldo (Rp 1.500.000)...\\n";
    $saldoAwal = transferSaldo($saldoAwal, 1500000);
} catch (Exception $e) {
    echo "⚠️ TERTANGKAP EXCEPTION: " . $e->getMessage() . "\\n";
} finally {
    echo "🔒 Audit Log: Proses transaksi selesai.\\n";
}
?>`,
        exercise: {
          instruction: "Buat blok `try-catch` yang menangkap `Exception` saat melakukan `throw new Exception('Gagal!')`!",
          starterCode: `<?php
try {
    throw new Exception("Koneksi API Gagal!");
} catch (Exception $e) {
    echo "Tertangkap: " . $e->getMessage();
}
?>`,
          expectedHint: "Gunakan `try { ... } catch (Exception $e) { ... }`."
        },
        quiz: [
          {
            question: "Blok apakah yang selalu dieksekusi baik ketika terjadi exception maupun saat operasi berhasil?",
            options: ["catch", "finally", "always", "after"],
            correctAnswer: 1,
            explanation: "Blok `finally` selalu dieksekusi di akhir setelah try atau catch selesai."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 7: Ekosistem Web & JSON REST API
  // ==========================================
  {
    id: "php-module-7",
    order: 7,
    title: "7. Web API & JSON Envelope",
    subtitle: "json_encode, json_decode & Standar REST API Response",
    description: "Membangun endpoint backend REST API standar industri yang menghasilkan data format JSON.",
    icon: "Server",
    badge: "API Engineer",
    color: "#8892BF",
    xp: 450,
    lessons: [
      {
        id: "php-7-1",
        title: "7.1 Membangun REST API Response dengan JSON",
        summary: "Mengonversi array PHP menjadi response JSON berstandar industri.",
        content: `### 🌐 REST API Backend dengan PHP
PHP memiliki fungsi bawaan berkecepatan tinggi untuk encoding dan decoding data JSON:
- **\`json_encode($data, JSON_PRETTY_PRINT)\`**: Mengonversi array/objek PHP menjadi string JSON.
- **\`json_decode($jsonString, true)\`**: Mem-parsing string JSON menjadi array asosiatif PHP.`,
        codeSnippet: `<?php
// Simulasi Response Controller REST API
function createApiResponse(bool $success, string $message, mixed $data = null, int $statusCode = 200): string {
    $response = [
        "success" => $success,
        "statusCode" => $statusCode,
        "message" => $message,
        "data" => $data,
        "timestamp" => date("Y-m-d H:i:s")
    ];
    return json_encode($response, JSON_PRETTY_PRINT);
}

// Data User
$userData = [
    "id" => 101,
    "username" => "gopher_php",
    "nama" => "Kevin Pratama",
    "role" => "Software Engineer"
];

// Response JSON
$jsonOutput = createApiResponse(
    success: true,
    message: "Data user berhasil diambil.",
    data: $userData,
    statusCode: 200
);

echo $jsonOutput;
?>`,
        exercise: {
          instruction: "Gunakan `json_encode` untuk mengubah array `['status' => 'OK']` menjadi JSON!",
          starterCode: `<?php
$data = ["status" => "OK", "code" => 200];
echo json_encode($data);
?>`,
          expectedHint: "Gunakan `json_encode($data)`."
        },
        quiz: [
          {
            question: "Fungsi bawaan PHP manakah yang digunakan untuk mengonversi array menjadi format string JSON?",
            options: ["to_json()", "json_encode()", "json_stringify()", "parse_json()"],
            correctAnswer: 1,
            explanation: "`json_encode()` mengonversi struktur data PHP menjadi string format JSON."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 8: Framework Laravel 11 Essentials
  // ==========================================
  {
    id: "php-module-8",
    order: 8,
    title: "8. Framework Laravel 11 Essentials",
    subtitle: "Routing, Controller, Eloquent ORM & Artisan CLI",
    description: "Mengenal arsitektur framework terpopuler dunia: Laravel 11, Eloquent ORM, dan MVC Pattern.",
    icon: "Sparkles",
    badge: "Laravel Master",
    color: "#FF2D20",
    xp: 500,
    lessons: [
      {
        id: "php-8-1",
        title: "8.1 Arsitektur Routing & Eloquent ORM di Laravel 11",
        summary: "Konsep routing elegan dan pemodelan database Active Record dengan Eloquent ORM.",
        content: `### 🔥 Selamat Datang di Dunia Laravel 11!
**Laravel** adalah framework PHP paling elegan di dunia dengan fitur *Active Record* tercanggih bernama **Eloquent ORM**.

#### 📌 Fitur Utama Laravel 11:
1. **Sleek Routing**:
   \`\`\`php
   use App\\Http\\Controllers\\UserController;
   Route::get('/api/users', [UserController::class, 'index']);
   \`\`\`
2. **Eloquent ORM Query**:
   \`\`\`php
   $users = User::where('aktif', true)->orderBy('nama')->get();
   \`\`\``,
        codeSnippet: `<?php
// Simulasi Framework Laravel 11 Router & Eloquent Pattern
class Router {
    private array $routes = [];

    public function get(string $path, callable $action): void {
        $this->routes["GET $path"] = $action;
    }

    public function post(string $path, callable $action): void {
        $this->routes["POST $path"] = $action;
    }

    public function dispatch(string $method, string $path): void {
        $key = "$method $path";
        if (isset($this->routes[$key])) {
            echo "🚀 [Laravel 11 Router] $key -> Match!\\n";
            $response = $this->routes[$key]();
            echo json_encode($response, JSON_PRETTY_PRINT) . "\\n";
        } else {
            echo "🔴 404 Route Not Found for $key\\n";
        }
    }
}

// Definisi Route Aplikasi Laravel
$app = new Router();

$app->get('/api/v1/users', function() {
    return [
        "status" => "success",
        "data" => [
            ["id" => 1, "nama" => "Kevin Pratama", "role" => "Tech Lead"],
            ["id" => 2, "nama" => "Budi Santoso", "role" => "Senior Gopher"]
        ]
    ];
});

$app->dispatch("GET", "/api/v1/users");
?>`,
        exercise: {
          instruction: "Buat simulasi response route `['message' => 'Laravel 11 is awesome!']` dan cetak outputnya!",
          starterCode: `<?php
$response = [
    "framework" => "Laravel 11",
    "message" => "Framework PHP paling elegan di dunia!"
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>`,
          expectedHint: "Gunakan `json_encode($response)`."
        },
        quiz: [
          {
            question: "Nama ORM (Object-Relational Mapping) bawaan framework Laravel yang terkenal sangat ekspresif adalah?",
            options: ["Hibernate", "Doctrine", "Eloquent", "GORM"],
            correctAnswer: 2,
            explanation: "Eloquent ORM adalah sistem Active Record bawaan Laravel yang sangat populer karena sintaks kueri yang sangat ekspresif."
          }
        ]
      }
    ]
  }
];
