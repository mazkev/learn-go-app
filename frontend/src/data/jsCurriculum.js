/**
 * JavaScript & TypeScript Curriculum & Interactive Roadmap Modules
 * Kurikulum Lengkap Modern ES6+, Array Methods, Async/Await, TypeScript & Node.js
 */

export const JS_MODULES = [
  // ==========================================
  // MODUL 1: Dasar Modern JavaScript (ES6+)
  // ==========================================
  {
    id: "js-module-1",
    order: 1,
    title: "1. Dasar Modern JavaScript (ES6+)",
    subtitle: "Let, Const, Arrow Functions & Destructuring",
    description: "Mempelajari evolusi modern JavaScript, deklarasi variabel immutable const vs let, template literals, dan arrow functions.",
    icon: "Code2",
    badge: "JS Rookie",
    color: "#F7DF1E",
    xp: 250,
    lessons: [
      {
        id: "js-1-1",
        title: "1.1 Variabel Modern (let vs const)",
        summary: "Memahami mengapa var sudah usang dan menggunakan const sebagai standar utama deklarasi.",
        content: `### 🟨 Selamat Datang di Dunia JavaScript Modern!
JavaScript adalah bahasa pemrograman paling populer di dunia web, menggerakkan seluruh interaktivitas frontend browser hingga backend server modern (*Node.js*).

#### 📌 Aturan Deklarasi Variabel Modern:
- **\`const\`**: Untuk nilai yang **tidak boleh di-reassign** (Gunakan ini secara default 90% waktu!).
- **\`let\`**: Untuk variabel yang nilainya akan berubah (seperti counter loop).
- ❌ **\`var\`**: Hindari penggunaan \`var\` karena memiliki masalah *hoisting* dan *function scope*.

#### 📌 Template Literals:
Menggabungkan string dan variabel secara elegan menggunakan backtick (\`\`) dan \`\${ekspresi}\`.`,
        codeSnippet: `// Deklarasi Variabel Modern
const nama = "Kevin Pratama";
const role = "Fullstack Developer";
let level = 1;

// Template Literals
console.log(\`Halo, nama saya \${nama}!\`);
console.log(\`Posisi: \${role} | Level: \${level}\`);

// Menaikkan level
level += 1;
console.log(\`Selamat! Level naik menjadi: \${level}\`);`,
        exercise: {
          instruction: "Buat variabel `const bahasa = 'JavaScript'` dan cetak menggunakan template literals!",
          starterCode: `const bahasa = "JavaScript";
const tahun = 2026;

console.log(\`Saya sedang menguasai \${bahasa} di tahun \${tahun}!\`);`,
          expectedHint: "Gunakan backtick (\`\`) dan `\${bahasa}`."
        },
        quiz: [
          {
            question: "Keyword deklarasi variabel manakah yang direkomendasikan sebagai pilihan utama di JavaScript modern jika nilainya tidak berubah?",
            options: ["var", "let", "const", "static"],
            correctAnswer: 2,
            explanation: "`const` mencegah variabel di-reassign secara tidak sengaja dan menghasilkan kode yang lebih aman."
          }
        ]
      },
      {
        id: "js-1-2",
        title: "1.2 Arrow Functions & Destructuring",
        summary: "Sintaks fungsi panah ringkas dan pembongkaran properti objek secara instan.",
        content: `### 🏹 Arrow Functions & Object Destructuring
**Arrow Function** (\`=>\`) adalah sintaks ringkas untuk menulis fungsi di JavaScript.

\`\`\`javascript
// Fungsi Panah 1 Baris (Implicit Return)
const tambah = (a, b) => a + b;
\`\`\`

#### 📌 Object & Array Destructuring:
Mengekstrak properti langsung ke variabel:
\`\`\`javascript
const user = { nama: "Alex", skor: 95 };
const { nama, skor } = user; // Instan!
\`\`\``,
        codeSnippet: `// 1. Arrow Function
const hitungTotal = (harga, qty) => harga * qty;
const diskon = (total, persen = 10) => total - (total * (persen / 100));

const totalBelanja = hitungTotal(50000, 3);
console.log(\`Total Belanja : Rp \${totalBelanja.toLocaleString("id-ID")}\`);
console.log(\`Setelah Diskon: Rp \${diskon(totalBelanja, 20).toLocaleString("id-ID")}\`);

// 2. Destructuring
const profil = {
  username: "gopher_js",
  email: "user@mail.com",
  kota: "Bandung"
};

const { username, kota } = profil;
console.log(\`User: \${username} berasal dari \${kota}\`);`,
        exercise: {
          instruction: "Buat arrow function `kuadrat = (x) => x * x` dan hitung nilai kuadrat dari 8!",
          starterCode: `const kuadrat = (x) => x * x;
console.log("8 Kuadrat =", kuadrat(8));`,
          expectedHint: "Gunakan `const kuadrat = (x) => x * x;`."
        },
        quiz: [
          {
            question: "Apakah hasil dari arrow function `const kaliDua = n => n * 2; kaliDua(6);`?",
            options: ["undefined", "12", "6", "error"],
            correctAnswer: 1,
            explanation: "Pada arrow function 1 baris tanpa kurung kurawal `{ }`, nilai ekspresi otomatis di-return (*implicit return*)."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 2: Percabangan & Operator Modern
  // ==========================================
  {
    id: "js-module-2",
    order: 2,
    title: "2. Percabangan & Operator Modern",
    subtitle: "Ternary, Optional Chaining (?.) & Nullish Coalescing (??)",
    description: "Menguasai operator kondisional modern untuk menangani data null/undefined dengan aman.",
    icon: "GitBranch",
    badge: "Logic Crafter",
    color: "#E5A00D",
    xp: 300,
    lessons: [
      {
        id: "js-2-1",
        title: "2.1 Optional Chaining (?.) & Nullish Coalescing (??)",
        summary: "Menghindari error 'Cannot read properties of undefined' dengan operator modern.",
        content: `### 🛡️ Operator Sakti JavaScript Modern
Dua operator paling sering digunakan di industri untuk mencegah crash aplikasi frontend/backend:

#### 1. Optional Chaining (\`?.\`):
Membaca properti bersarang tanpa takut crash jika parent bernilai \`null\` atau \`undefined\`.
\`\`\`javascript
const kota = user?.alamat?.kota; // Bernilai undefined tanpa error!
\`\`\`

#### 2. Nullish Coalescing (\`??\`):
Memberikan nilai default hanya jika bernilai \`null\` atau \`undefined\` (berbeda dengan \`||\` yang menganggap \`0\` atau \`""\` sebagai falsy).`,
        codeSnippet: `const config = {
  appName: "M3.learn",
  settings: {
    timeout: 0, // Nilai 0 adalah angka valid!
    theme: null
  }
};

// Menggunakan ?. dan ??
const userCity = config.user?.profile?.city ?? "Jakarta (Default)";
const timeoutVal = config.settings?.timeout ?? 5000;
const themeVal = config.settings?.theme ?? "dark";

console.log(\`Kota User   : \${userCity}\`);
console.log(\`Timeout     : \${timeoutVal} ms (Nilai 0 tidak ditimpa!)\`);
console.log(\`Tema Aktif  : \${themeVal}\`);`,
        exercise: {
          instruction: "Gunakan `??` untuk memberikan nilai default `'Pengunjung'` jika `namaUser` bernilai `null`!",
          starterCode: `const namaUser = null;
const greetingName = namaUser ?? "Pengunjung";

console.log(\`Selamat datang, \${greetingName}!\`);`,
          expectedHint: "Gunakan `namaUser ?? \"Pengunjung\"`."
        },
        quiz: [
          {
            question: "Kapan operator Nullish Coalescing (`a ?? b`) akan memilih nilai fallback `b`?",
            options: [
              "Hanya saat `a` bernilai `null` atau `undefined`",
              "Saat `a` bernilai `0` atau string kosong `\"\"`",
              "Saat `a` bernilai boolean `false`",
              "Setiap kali kode dijalankan"
            ],
            correctAnswer: 0,
            explanation: "`??` hanya mengevaluasi nullish values (`null` & `undefined`), sehingga angka `0` atau boolean `false` tetap dipertahankan."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 3: Struktur Data & Array Methods (Functional)
  // ==========================================
  {
    id: "js-module-3",
    order: 3,
    title: "3. Array Methods Sakti (Functional JS)",
    subtitle: "Map, Filter, Reduce, Find, Some & Every",
    description: "Mengolah kumpulan data secara deklaratif dan elegan tanpa for-loop manual.",
    icon: "Layers",
    badge: "Array Alchemist",
    color: "#F7DF1E",
    xp: 350,
    lessons: [
      {
        id: "js-3-1",
        title: "3.1 Map, Filter & Reduce",
        summary: "Trio method array terpenting dalam pengembangan React dan aplikasi backend modern.",
        content: `### ⚡ Trio Array Methods: Map, Filter & Reduce
Metode ini tidak memodifikasi array asli (*Immutable & Pure*), melainkan mengembalikan array/nilai baru.

- **\`.map()\`**: Mengubah setiap elemen menjadi bentuk baru.
- **\`.filter()\`**: Menyaring elemen yang lolos kondisi.
- **\`.reduce()\`**: Mengakumulasi seluruh elemen menjadi 1 nilai akhir (misal total harga).`,
        codeSnippet: `const produk = [
  { id: 1, nama: "Laptop Pro", harga: 18000000, kategori: "Komputer" },
  { id: 2, nama: "Mouse Wireless", harga: 250000, kategori: "Aksesoris" },
  { id: 3, nama: "Mechanical Keyboard", harga: 850000, kategori: "Aksesoris" },
  { id: 4, nama: "Monitor 4K", harga: 4500000, kategori: "Komputer" }
];

// 1. Filter: Hanya kategori Aksesoris
const aksesoris = produk.filter(p => p.kategori === "Aksesoris");
console.log("=== 1. Aksesoris ===", aksesoris.map(a => a.nama));

// 2. Map: Format nama dan harga
const labelProduk = produk.map(p => \`\${p.nama} (\${p.harga.toLocaleString('id-ID')})\`);
console.log("=== 2. Label Produk ===", labelProduk);

// 3. Reduce: Hitung total nilai inventaris
const totalInventaris = produk.reduce((total, p) => total + p.harga, 0);
console.log(\`\\n=== 3. Total Inventaris === Rp \${totalInventaris.toLocaleString('id-ID')}\`);`,
        exercise: {
          instruction: "Gunakan `.filter()` untuk mengambil angka yang lebih besar dari 10 dari array `[5, 12, 8, 20, 3]`!",
          starterCode: `const angka = [5, 12, 8, 20, 3];
const lebihBesar10 = angka.filter(n => n > 10);

console.log("Angka > 10:", lebihBesar10);`,
          expectedHint: "Gunakan `angka.filter(n => n > 10)`."
        },
        quiz: [
          {
            question: "Array method manakah yang digunakan untuk mengakumulasi seluruh elemen array menjadi sebuah nilai tunggal?",
            options: [".map()", ".filter()", ".reduce()", ".forEach()"],
            correctAnswer: 2,
            explanation: "`.reduce()` menjumlahkan atau mengakumulasi seluruh elemen berdasarkan accumulator dan fungsi reducer."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 4: Asynchronous JavaScript (Async / Await)
  // ==========================================
  {
    id: "js-module-4",
    order: 4,
    title: "4. Asynchronous JS & Promises",
    subtitle: "Promises, Async / Await, Try-Catch & Fetch API",
    description: "Menguasai eksekusi non-blocking, asynchronous flow, dan konsumsi REST API modern.",
    icon: "Zap",
    badge: "Async Wizard",
    color: "#61DAFB",
    xp: 400,
    lessons: [
      {
        id: "js-4-1",
        title: "4.1 Promises & Async / Await",
        summary: "Menulis kode asinkron yang rapi mirip kode sinkron berurutan.",
        content: `### ⏳ Asynchronous JavaScript (Async / Await)
JavaScript berjalan di atas **Single-Threaded Event Loop**. Untuk tugas yang butuh waktu (seperti request API atau baca database), JavaScript menggunakan pola **Async / Await**.

\`\`\`javascript
async function muatDataUser() {
  try {
    const res = await fetch("https://api.domain.com/users");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Gagal memuat:", err);
  }
}
\`\`\``,
        codeSnippet: `// Simulasi Async Function dengan Promise & Timeout
function ambilDataProduk(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, nama: "MacBook Air M3", harga: 18999000 });
    }, 100);
  });
}

async function jalankanProses() {
  console.log("1. Memulai request ke server database...");
  
  const produk = await ambilDataProduk(101);
  console.log(\`2. Data diterima! Produk: \${produk.nama} | Harga: Rp \${produk.harga.toLocaleString('id-ID')}\`);
  
  console.log("3. Proses transaksi selesai secara sukses.");
}

jalankanProses();`,
        exercise: {
          instruction: "Buat fungsi `async function sapaAsync()` yang me-return string `'Halo Asinkron!'`!",
          starterCode: `async function sapaAsync() {
  return "Halo Asinkron!";
}

sapaAsync().then(pesan => console.log(pesan));`,
          expectedHint: "Gunakan keyword `async function`."
        },
        quiz: [
          {
            question: "Keyword apakah yang wajib diletakkan di depan pemanggilan fungsi yang mengembalikan Promise di dalam fungsi async?",
            options: ["wait", "await", "defer", "yield"],
            correctAnswer: 1,
            explanation: "`await` menunda eksekusi baris berikutnya hingga Promise terselesaikan (resolved/rejected)."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 5: TypeScript Essentials
  // ==========================================
  {
    id: "js-module-5",
    order: 5,
    title: "5. TypeScript Essentials",
    subtitle: "Type Annotations, Interfaces, Generics & Type Safety",
    description: "Meningkatkan JavaScript dengan sistem tipe statis yang ketat untuk mencegah bug di production.",
    icon: "ShieldCheck",
    badge: "TypeScript Pro",
    color: "#3178C6",
    xp: 450,
    lessons: [
      {
        id: "js-5-1",
        title: "5.1 Type Annotations & Interfaces",
        summary: "Mendefinisikan kontrak tipe data objek dengan Interface TypeScript.",
        content: `### 🔷 Mengapa TypeScript?
**TypeScript** adalah superset dari JavaScript yang menambahkan **Static Typing (Pengecekan Tipe Saat Kompilasi)**.

\`\`\`typescript
interface User {
  id: number;
  nama: string;
  role: "admin" | "user"; // Union Literal Type!
  email?: string; // Optional Property!
}
\`\`\``,
        codeSnippet: `// TypeScript Concept di M3.learn
// Interface Kontrak Data
const userList = [
  { id: 1, nama: "Budi", role: "admin", aktif: true },
  { id: 2, nama: "Siti", role: "member", aktif: false }
];

function cetakUser(user) {
  const status = user.aktif ? "🟢 AKTIF" : "🔴 NONAKTIF";
  console.log(\`[\${user.role.toUpperCase()}] \${user.nama} -> Status: \${status}\`);
}

console.log("=== TypeScript Typed User Verification ===");
userList.forEach(u => cetakUser(u));`,
        exercise: {
          instruction: "Buat objek `produk` dengan properti `nama: 'Laptop'` dan `harga: 15000000`, lalu cetak infonya!",
          starterCode: `const item = {
  nama: "Monitor Gaming 144Hz",
  harga: 3200000,
  stok: 15
};

console.log(\`Produk: \${item.nama} | Harga: Rp \${item.harga.toLocaleString('id-ID')}\`);`,
          expectedHint: "Definisikan objek dan cetak ke console."
        },
        quiz: [
          {
            question: "Apa keuntungan terbesar menggunakan TypeScript dibandingkan JavaScript standar pada project besar?",
            options: [
              "Menghapus kebutuhan akan browser",
              "Mendeteksi error tipe data (bug) sejak saat koding sebelum aplikasi dijalankan",
              "Membuat ukuran file biner mengecil",
              "Menjadikan kode HTML otomatis terbuat"
            ],
            correctAnswer: 1,
            explanation: "TypeScript mendeteksi kesalahan tipe data secara dini (*Compile-Time Type Checking*), meningkatkan produktivitas dan keandalan kode."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 6: Backend Node.js & REST API
  // ==========================================
  {
    id: "js-module-6",
    order: 6,
    title: "6. Backend Node.js & REST API",
    subtitle: "Express.js Routing, Middleware, JSON API & NPM",
    description: "Membangun REST API backend cepat menggunakan ekosistem Node.js dan Express.",
    icon: "Server",
    badge: "Backend Node",
    color: "#68A063",
    xp: 500,
    lessons: [
      {
        id: "js-6-1",
        title: "6.1 REST API Endpoint dengan Node.js",
        summary: "Membuat endpoint GET/POST dan response JSON envelope standar industri.",
        content: `### 🟢 Backend REST API dengan Node.js
Node.js memungkinkan JavaScript berjalan di sisi server. Framework paling populer untuk membuat API adalah **Express.js**.

\`\`\`javascript
import express from "express";
const app = express();
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "UP", timestamp: Date.now() });
});
\`\`\``,
        codeSnippet: `// Simulasi Express.js REST API Server
class ExpressApp {
  constructor() {
    this.routes = {};
  }
  get(path, handler) {
    this.routes[\`GET \${path}\`] = handler;
  }
  post(path, handler) {
    this.routes[\`POST \${path}\`] = handler;
  }
  simulateRequest(method, path, body = {}) {
    const handler = this.routes[\`\${method} \${path}\`];
    if (handler) {
      return handler({ body, path });
    }
    return { status: 404, message: "Route Not Found" };
  }
}

// Inisialisasi API
const app = new ExpressApp();

app.get("/api/v1/status", () => ({
  status: 200,
  data: { server: "Node.js v20+ / Express", online: true }
}));

app.post("/api/v1/auth/login", (req) => ({
  status: 200,
  data: { token: "jwt_token_sample", user: req.body.username }
}));

console.log("GET /api/v1/status :", app.simulateRequest("GET", "/api/v1/status"));
console.log("POST /api/v1/auth/login:", app.simulateRequest("POST", "/api/v1/auth/login", { username: "kevin" }));`,
        exercise: {
          instruction: "Buat response objek API `const res = { success: true, count: 5 }` dan cetak outputnya!",
          starterCode: `const apiResponse = {
  success: true,
  statusCode: 200,
  data: {
    usersCount: 150,
    environment: "production"
  }
};

console.log("Response JSON:", JSON.stringify(apiResponse, null, 2));`,
          expectedHint: "Gunakan `JSON.stringify(apiResponse)`."
        },
        quiz: [
          {
            question: "Framework web backend minimalis paling populer di ekosistem Node.js adalah?",
            options: ["Express.js", "Django", "Spring Boot", "Laravel"],
            correctAnswer: 0,
            explanation: "Express.js adalah standar de facto untuk membangun HTTP server dan REST API di Node.js."
          }
        ]
      }
    ]
  }
];
