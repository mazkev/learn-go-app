import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Briefcase,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Award,
  Sparkles,
  Cpu,
  Layers,
  Activity,
  Code2,
  Filter,
  Swords,
  Terminal,
  Code
} from "lucide-react";
import QuizArenaLab from "../quiz/QuizArenaLab";
import CodingChallengeLab from "../leetcode/CodingChallengeLab";

export const INTERVIEW_QUESTIONS = [
  // 1. Memory & Internals
  {
    id: "q-1",
    category: "Memory & Internals",
    difficulty: "Senior",
    company: "Google / Gojek",
    question: "Bagaimana struktur internal Slice Header (ptr, len, cap) di level memori, dan apa yang terjadi jika slice di-pass sebagai argumen fungsi?",
    summary: "Slice adalah struct 24-byte (pada arsitektur 64-bit) yang membungkus pointer ke underlying array.",
    explanation: `### 🧠 Anatomi Slice Header di Go Runtime
Secara internal di runtime Go (\`reflect.SliceHeader\`), sebuah slice terdiri dari 3 komponen:
\`\`\`go
type SliceHeader struct {
    Data uintptr // 8 bytes: Pointer ke elemen pertama underlying array
    Len  int     // 8 bytes: Panjang elemen saat ini
    Cap  int     // 8 bytes: Kapasitas memori underlying array
}
\`\`\`

#### 📌 Apa yang Terjadi Saat Di-pass ke Fungsi?
1. **Pass by Value (Shallow Copy)**: Go menyalin nilai struct \`SliceHeader\` (24 byte). Pointer \`Data\` masih menunjuk ke array yang **sama**.
2. **Modifikasi Elemen**: Jika fungsi mengubah \`s[0] = 99\`, perubahan **akan terlihat** di luar fungsi karena underlying array-nya sama.
3. **Panggilan \`append()\`**: Jika di dalam fungsi dilakukan \`append()\` dan memicu alokasi array baru (*capacity exceeded*), pointer \`Data\` di dalam fungsi akan menunjuk ke array baru, sedangkan variabel slice pemanggil di luar **tetap menunjuk ke array lama** dengan \`len\` lama.

> 💡 **Best Practice Interview:** Selalu kembalikan slice baru dari fungsi (\`return s\`) atau gunakan pointer to slice (\`*[]T\`) jika fungsi bermaksud menambah elemen.`,
    codeSnippet: `package main

import "fmt"

func ubah(s []int) {
    s[0] = 999        // Mengubah underlying array (efek terlihat di luar)
    s = append(s, 100) // Membuat array baru jika cap penuh (tidak merubah slice asli)
}

func main() {
    nums := []int{1, 2, 3}
    ubah(nums)
    fmt.Println(nums) // [999, 2, 3] -> len tetap 3
}`
  },
  {
    id: "q-2",
    category: "Memory & Internals",
    difficulty: "Senior",
    company: "Tokopedia / Shopee",
    question: "Apa itu Memory Escape Analysis di Go Compiler, dan kapan suatu variabel dialokasikan ke Heap vs Stack?",
    summary: "Proses analisis kompilasi untuk menentukan apakah umur variabel melampaui fungsi pembuatnya.",
    explanation: `### ⚡ Stack vs Heap Allocation di Go
- **Stack Allocation**: Sangat cepat (alokasi & dealokasi hanya dengan menggeser pointer stack CPU tanpa campur tangan Garbage Collector).
- **Heap Allocation**: Lebih lambat dan membebani Garbage Collector karena memori harus dibersihkan secara dinamis.

#### 🔍 Kapan Variabel 'Escape' ke Heap?
1. **Pointer Returned**: Fungsi mengembalikan pointer ke variabel lokal (\`return &myVar\`). Umur variabel harus tetap ada setelah fungsi selesai.
2. **Dynamic Interface / \`fmt.Println(x)\`**: Fungsi dengan parameter \`any\` / \`interface{}\` memaksa data dialokasikan ke heap (*boxing*).
3. **Ukuran Terlalu Besar**: Slice atau array yang kapasitasnya sangat besar (misal \`make([]int, 100000)\`) atau ukurannya dinamis saat runtime.

> 🛠️ **Command Analisis:** Jalankan \`go build -gcflags="-m" main.go\` untuk melihat laporan escape analysis secara mendetail.`,
    codeSnippet: `package main

type User struct {
    Nama string
}

func buatUser() *User {
    u := User{Nama: "Budi"}
    return &u // 'u' escape to heap karena pointernya dikembalikan
}

func main() {
    _ = buatUser()
}`
  },
  {
    id: "q-3",
    category: "Memory & Internals",
    difficulty: "Mid-Level",
    company: "Traveloka / Grab",
    question: "Apa perbedaan antara fungsi bawaan `make` vs `new` di Golang?",
    summary: "`new` mengembalikan pointer ke zero-value, sedangkan `make` menginisialisasi slice, map, dan channel.",
    explanation: `### 📦 Perbandingan \`new()\` vs \`make()\`

| Aspek | \`new(T)\` | \`make(T, args)\` |
|---|---|---|
| Tipe yang Didukung | Semua tipe data (struct, int, string, dll) | **Hanya** Slice, Map, dan Channel |
| Nilai yang Dikembalikan | Pointer ke tipe tersebut (\`*T\`) yang berisi zero-value | Tipe data terinisialisasi langsung (\`T\`), bukan pointer |
| Inisialisasi Internal | Hanya mengosongkan memori (zeroed memory) | Mengalokasikan struktur internal runtime (misal: hash table buckets map) |

#### ⚠️ Kesalahan Umum:
Jika Anda menggunakan \`new(map[string]int)\`, Anda akan mendapatkan pointer ke \`nil map\`. Menulis ke \`nil map\` akan menyebabkan program **panic**! Selalu gunakan \`make(map[string]int)\`.`
  },
  {
    id: "q-4",
    category: "Memory & Internals",
    difficulty: "Senior",
    company: "Google / Cloudflare",
    question: "Bagaimana cara kerja Garbage Collector (GC) di Go, dan bagaimana strategi mengoptimalkannya?",
    summary: "Go menggunakan Tri-color Concurrent Mark and Sweep Garbage Collector dengan latensi Stop-The-World (STW) di bawah 1 milidetik.",
    explanation: `### 🧹 Tri-Color Marking Algorithm di Go GC
Objek di memori dikategorikan menjadi 3 warna:
1. **Putih (White)**: Kandidat objek yang tidak lagi terjangkau (*unreachable*) dan siap dibersihkan dari memori.
2. **Abu-Abu (Grey)**: Objek terjangkau (*reachable*), namun objek yang ditunjuknya belum diperiksa.
3. **Hitam (Black)**: Objek terjangkau yang seluruh pointer anak-anaknya sudah selesai diperiksa.

#### 🚀 Tips Optimasi GC:
- **Reuse Memory dengan \`sync.Pool\`**: Mengurangi alokasi byte buffer atau struct sementara.
- **Kurangi Pointer dalam Struct Besar**: GC tidak perlu memindai field non-pointer (seperti int, float, byte array).
- **Atur Environment \`GOGC\` / \`GOMEMLIMIT\`**: Mengatur batas memori target untuk memicu siklus GC secara terukur.`
  },

  // 2. Concurrency & Scheduling
  {
    id: "q-5",
    category: "Concurrency & GMP",
    difficulty: "Senior",
    company: "Google / Gojek",
    question: "Jelaskan bagaimana Go Runtime Scheduler mengelola konkurensi menggunakan Model GMP (G, M, P)!",
    summary: "GMP mengabstraksikan ribuan Goroutine (G) ke sejumlah Processor logika (P) yang dijalankan oleh OS Threads (M).",
    explanation: `### ⚙️ Model GMP Scheduler di Go
- **G (Goroutine)**: Representasi thread hijau Go (~2KB stack) yang berisi context program counter dan call stack.
- **M (Machine / OS Thread)**: Thread fisik sistem operasi yang mengeksekusi instruksi CPU.
- **P (Processor / Logical Context)**: Token izin pemrosesan yang jumlahnya sama dengan \`GOMAXPROCS\` (biasanya sejumlah core CPU).

#### 🔀 Fitur Cerdas Scheduler:
1. **Work Stealing**: Jika run-queue lokal pada suatu \`P\` kosong, ia akan 'mencuri' setengah antrian Goroutine dari \`P\` lainnya.
2. **Syscall Hand-off**: Saat \`G\` melakukan blocking I/O atau syscall lama, runtime melepaskan \`P\` dari thread \`M\` dan memindahkannya ke thread \`M\` lain agar goroutine lain tidak tertahan (*non-blocking*).`
  },
  {
    id: "q-6",
    category: "Concurrency & GMP",
    difficulty: "Mid-Level",
    company: "Tokopedia / Bukalapak",
    question: "Kapan harus menggunakan sync.RWMutex dibandingkan sync.Mutex biasa?",
    summary: "RWMutex mengizinkan banyak pembaca (Reader) membaca bersamaan, namun hanya 1 penulis (Writer) yang eksklusif.",
    explanation: `### 🔒 \`sync.Mutex\` vs \`sync.RWMutex\`
- **\`sync.Mutex\`**: Mengunci resource secara eksklusif (baik untuk operasi Read maupun Write). Setiap pembaca harus antre satu per satu.
- **\`sync.RWMutex\`**:
  - \`RLock()\` & \`RUnlock()\`: Banyak goroutine dapat membaca secara serentak tanpa saling memblokir.
  - \`Lock()\` & \`Unlock()\`: Mengunci secara penuh saat ada goroutine yang ingin menulis data.

> 💡 **Kapan Menggunakannya?** Gunakan \`sync.RWMutex\` saat aplikasi memiliki rasio **baca jauh lebih tinggi daripada tulis (Read-Heavy)** seperti in-memory cache.`
  },
  {
    id: "q-7",
    category: "Concurrency & GMP",
    difficulty: "Senior",
    company: "Gojek / DANA",
    question: "Apa itu Goroutine Leak, apa penyebab utamanya, dan bagaimana cara mendeteksinya di produksi?",
    summary: "Kondisi di mana goroutine terus hidup di memori selamanya karena tertahan blocking channel atau I/O tanpa batas waktu.",
    explanation: `### 🚨 Bahaya Goroutine Leak
Goroutine yang bocor tidak akan pernah dibersihkan oleh Garbage Collector, menghabiskan memori RAM secara perlahan hingga server Out of Memory (OOM).

#### ⚠️ Penyebab Utama:
1. Mengirim ke channel unbuffered tanpa ada goroutine penerima.
2. Menerima dari channel yang tidak pernah ditutup (*never closed*).
3. Request HTTP/Database eksternal tanpa batas waktu timeout.

#### 🛡️ Solusi:
- Selalu teruskan \`context.WithTimeout\` atau \`context.WithCancel\` ke semua operasi asinkron.
- Pantau metrik \`runtime.NumGoroutine()\` dengan Prometheus / pprof.`
  },
  {
    id: "q-8",
    category: "Concurrency & GMP",
    difficulty: "Junior",
    company: "Shopee / Blibli",
    question: "Bagaimana cara mendeteksi Data Race pada aplikasi Go saat pengujian?",
    summary: "Gunakan built-in Race Detector Go dengan menambahkan flag `-race`.",
    explanation: `### 🏁 Go Race Detector
Go memiliki pendeteksi *data race* bawaan yang sangat akurat berbasis ThreadSanitizer:

\`\`\`bash
go test -race ./...
go run -race main.go
\`\`\`

Jika ada dua goroutine yang mengakses lokasi memori yang sama di mana minimal satu di antaranya adalah operasi tulis tanpa proteksi Mutex/Channel, compiler akan mencetak jejak *stack trace* lokasi baris yang konflik secara presisi.`
  },

  // 3. OOP, Types & Interfaces
  {
    id: "q-9",
    category: "OOP & Types",
    difficulty: "Senior",
    company: "Google / Tokopedia",
    question: "Bagaimana interface diimplementasikan di balik layar oleh runtime Go (iface vs eface)?",
    summary: "Interface di Go adalah struct fat-pointer berisi tipe data dan pointer nilai asli.",
    explanation: `### 🎭 Fat Pointer Interface di Go
Di dalam runtime Go ada 2 tipe representasi interface:

1. **\`eface\` (Empty Interface / \`any\` / \`interface{}\`)**:
   - Berisi pointer ke metadata tipe (\`_type\`) dan pointer ke data asli (\`data\`).
2. **\`iface\` (Non-Empty Interface dengan Method)**:
   - Berisi pointer ke \`itab\` (tabel method yang memetakan method interface ke implementasi konkret) dan pointer ke data asli (\`data\`).

> 💡 **Karakteristik Kunci:** Interface bernilai \`nil\` **HANYA JIKA** kedua pointer (type dan data) sama-sama bernilai \`nil\`!`
  },
  {
    id: "q-10",
    category: "OOP & Types",
    difficulty: "Junior",
    company: "Semua Perusahaan Tech",
    question: "Kapan wajib menggunakan Pointer Receiver `(u *User)` vs Value Receiver `(u User)` pada method?",
    summary: "Gunakan pointer receiver jika method perlu memutasi struct atau struct berukuran besar.",
    explanation: `### 🎯 Panduan Memilih Receiver

#### Gunakan Pointer Receiver \`(u *User)\` jika:
1. Method perlu **memodifikasi/mengubah** nilai field dari struct pemanggil.
2. Ukuran struct besar sehingga menyalin (*copying*) struct pada setiap pemanggilan method memboroskan memori CPU.
3. Konsistensi: jika salah satu method struct menggunakan pointer receiver, disarankan semua method menggunakan pointer receiver.

#### Gunakan Value Receiver \`(u User)\` jika:
1. Struct berukuran kecil dan immutable (seperti \`time.Time\` atau koordinat \`Point{X, Y}\`).
2. Method hanya membaca data tanpa merubah state.`
  },

  // 4. Backend & Architecture
  {
    id: "q-11",
    category: "Backend Architecture",
    difficulty: "Senior",
    company: "Gojek / Tokopedia",
    question: "Bagaimana cara memisahkan layer di Clean Architecture Golang agar business logic tidak terikat pada database?",
    summary: "Terapkan Dependency Inversion Principle: Service bergantung pada Interface Repository, bukan struct DB konkret.",
    explanation: `### 🏛️ Dependency Inversion di Clean Architecture
1. **Domain Layer**: Mendefinisikan entitas struct dan **kontrak interface**:
   \`\`\`go
   type UserRepository interface {
       FindByID(ctx context.Context, id int) (*User, error)
   }
   \`\`\`
2. **Service / UseCase Layer**: Menerima interface \`UserRepository\` melalui constructor (*Dependency Injection*):
   \`\`\`go
   type UserService struct { repo UserRepository }
   \`\`\`
3. **Repository Layer (GORM/SQL)**: Mengimplementasikan interface tersebut.

> 🌟 **Keuntungan:** Anda dapat menguji Service layer 100% menggunakan Mock Repository tanpa perlu menyalakan database asli saat Unit Testing!`
  },
  {
    id: "q-12",
    category: "Backend Architecture",
    difficulty: "Senior",
    company: "Shopee / Grab",
    question: "Bagaimana cara menangani transaksi saldo/stok agar aman dari Race Condition pada aplikasi dengan jutaan pengguna?",
    summary: "Gunakan Database Pessimistic Locking (`SELECT ... FOR UPDATE`), Optimistic Locking dengan Version, atau Distributed Lock Redis.",
    explanation: `### 💳 Strategi Proteksi Transaksi Finansial di Go

1. **Pessimistic Locking (Database Row Lock)**:
   \`\`\`sql
   SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;
   \`\`\`
   Mengunci baris tersebut di PostgreSQL/MySQL sampai transaksi \`COMMIT\` selesai.
2. **Atomic SQL Query**:
   \`\`\`sql
   UPDATE accounts SET balance = balance - 100 WHERE id = 1 AND balance >= 100;
   \`\`\`
3. **Redis Distributed Lock (Redlock)**:
   Mengunci ID akun di Redis dengan TTL sebelum eksekusi ke database untuk sistem multi-instance microservices.`
  }
];

export const TOPIC_FILTERS = [
  "Semua Kategori",
  "Memory & Internals",
  "Concurrency & GMP",
  "OOP & Types",
  "Backend Architecture",
];

export const DIFFICULTY_FILTERS = ["Semua Level", "Junior", "Mid-Level", "Senior"];

export default function InterviewPrepLab() {
  const [activeView, setActiveView] = useState("bank"); // "bank" | "arena"
  const [selectedTopic, setSelectedTopic] = useState("Semua Kategori");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Semua Level");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState("q-1");

  // Bookmark / Mastery State
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem("golearn_mastered_interview");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("golearn_mastered_interview", JSON.stringify(masteredIds));
    } catch {}
  }, [masteredIds]);

  const toggleMastered = useCallback((id) => {
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const filteredQuestions = useMemo(() => {
    const qLower = searchQuery.toLowerCase();
    return INTERVIEW_QUESTIONS.filter((q) => {
      const matchTopic = selectedTopic === "Semua Kategori" || q.category === selectedTopic;
      const matchDiff = selectedDifficulty === "Semua Level" || q.difficulty === selectedDifficulty;
      const matchSearch =
        !qLower ||
        q.question.toLowerCase().includes(qLower) ||
        q.summary.toLowerCase().includes(qLower) ||
        q.company.toLowerCase().includes(qLower);
      return matchTopic && matchDiff && matchSearch;
    });
  }, [selectedTopic, selectedDifficulty, searchQuery]);

  const masteryPercent = useMemo(() => {
    return Math.round((masteredIds.length / INTERVIEW_QUESTIONS.length) * 100);
  }, [masteredIds.length]);

  return (
    <div className="min-h-full flex flex-col">
      {/* Sub-Header Hub Switcher */}
      <div className="theme-navbar border-b border-slate-200 dark:border-white/[0.08] px-4 md:px-8 py-3 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#04AA6D]/15 flex items-center justify-center text-[#04AA6D]">
              <Briefcase size={18} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold theme-heading flex items-center gap-2">
                <span>Career & Assessment Center</span>
              </h2>
              <p className="text-[11px] theme-muted">
                {activeView === "bank" && "25 Soal Teknis Wawancara Top Tech"}
                {activeView === "challenges" && "Latihan Algoritma Standar HackerRank & LeetCode (Beginner)"}
                {activeView === "arena" && "Simulasi Ujian & Evaluasi Kuis Interaktif"}
              </p>
            </div>
          </div>

          {/* Sub-tab Switcher Pill (3 Mode) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveView("bank")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeView === "bank"
                  ? "bg-[#04AA6D] text-white shadow-sm"
                  : "theme-card-subtle theme-muted hover:theme-heading hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <Briefcase size={14} />
              <span>Bank Soal Interview</span>
            </button>

            <button
              onClick={() => setActiveView("challenges")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeView === "challenges"
                  ? "bg-[#04AA6D] text-white shadow-sm"
                  : "theme-card-subtle theme-muted hover:theme-heading hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <Code size={14} />
              <span>💻 Coding Challenges</span>
            </button>

            <button
              onClick={() => setActiveView("arena")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeView === "arena"
                  ? "bg-[#04AA6D] text-white shadow-sm"
                  : "theme-card-subtle theme-muted hover:theme-heading hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <Swords size={14} />
              <span>⚔️ Go Quiz Arena</span>
            </button>
          </div>
        </div>
      </div>

      {/* Body View */}
      {activeView === "challenges" && (
        <div className="flex-1 overflow-y-auto">
          <CodingChallengeLab />
        </div>
      )}

      {activeView === "arena" && (
        <div className="flex-1 overflow-y-auto">
          <QuizArenaLab />
        </div>
      )}

      {activeView === "bank" && (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8 flex-1 overflow-y-auto">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
            <div>
              <div className="flex items-center gap-2 text-[#04AA6D] font-bold text-xs uppercase tracking-wider mb-1.5">
                <Briefcase size={15} />
                <span>Top Tech Career Center</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black theme-heading tracking-tight">
                Golang <span className="gopher-gradient-text">Technical Interview Bank</span>
              </h1>
              <p className="text-xs md:text-sm theme-muted mt-1 max-w-2xl leading-relaxed">
                Koleksi pertanyaan wawancara teknis mendalam yang sering diujikan di perusahaan teknologi terkemuka (Google, Gojek, Tokopedia, Shopee).
              </p>
            </div>

            {/* Readiness Meter Card */}
            <div className="theme-card rounded-2xl p-4 flex items-center gap-4 shadow-sm shrink-0 border-l-4 border-l-[#04AA6D]">
              <div>
                <div className="text-[11px] theme-muted font-bold uppercase tracking-wider">
                  Interview Readiness
                </div>
                <div className="text-xl md:text-2xl font-black theme-heading font-mono">
                  {masteryPercent}% <span className="text-xs font-normal theme-muted">Dikuasai</span>
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {masteredIds.length} dari {INTERVIEW_QUESTIONS.length} Pertanyaan
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#04AA6D]/15 flex items-center justify-center text-[#04AA6D] font-black shrink-0">
                <Award size={22} />
              </div>
            </div>
          </div>

      {/* Filter & Search Bar */}
      <div className="theme-card rounded-2xl p-4 space-y-3 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 theme-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata kunci (Slice, Mutex, GMP, GC)..."
              className="w-full theme-inset rounded-xl pl-9 pr-3 py-2 text-xs theme-heading focus:outline-none focus:border-[#04AA6D]"
            />
          </div>

          {/* Topic Filter */}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="theme-inset theme-heading text-xs font-semibold rounded-xl p-2 focus:outline-none cursor-pointer"
          >
            {TOPIC_FILTERS.map((t) => (
              <option key={t} value={t} className="bg-white dark:bg-[#0e1626] text-slate-900 dark:text-white">
                {t}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="theme-inset theme-heading text-xs font-semibold rounded-xl p-2 focus:outline-none cursor-pointer"
          >
            {DIFFICULTY_FILTERS.map((d) => (
              <option key={d} value={d} className="bg-white dark:bg-[#0e1626] text-slate-900 dark:text-white">
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Question Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const isMastered = masteredIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`theme-card rounded-2xl overflow-hidden transition-all shadow-sm ${
                isMastered ? "border-l-4 border-l-[#04AA6D]" : ""
              }`}
            >
              {/* Question Header Row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#04AA6D]/15 text-[#04AA6D]">
                      #{idx + 1} {item.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.difficulty === "Senior"
                          ? "bg-purple-500/15 text-purple-600 dark:text-purple-300"
                          : item.difficulty === "Mid-Level"
                          ? "bg-sky-500/15 text-sky-600 dark:text-sky-300"
                          : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                      }`}
                    >
                      {item.difficulty}
                    </span>
                    <span className="text-[11px] theme-muted font-medium flex items-center gap-1">
                      🏢 Sering Diuji di: <strong>{item.company}</strong>
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-extrabold theme-heading leading-snug">
                    {item.question}
                  </h3>

                  <p className="text-xs md:text-sm theme-muted">{item.summary}</p>
                </div>

                {/* Actions & Chevron */}
                <div className="flex items-center gap-2 shrink-0 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMastered(item.id);
                    }}
                    title={isMastered ? "Tandai Belum Paham" : "Tandai Sudah Paham"}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      isMastered
                        ? "bg-[#04AA6D] text-white shadow-sm"
                        : "theme-card-subtle theme-muted hover:theme-heading"
                    }`}
                  >
                    <CheckCircle2 size={16} />
                  </button>

                  <div className="p-2 theme-muted">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>

              {/* Detailed Explanation Panel */}
              {isExpanded && (
                <div className="border-t border-slate-200 dark:border-white/[0.08] p-6 theme-card-subtle space-y-5">
                  <div className="space-y-4 text-xs md:text-sm theme-body leading-relaxed">
                    {item.explanation.split("\n\n").map((para, pIdx) => {
                      if (para.startsWith("### ")) {
                        return (
                          <h4 key={pIdx} className="text-base font-black theme-heading pt-2 text-[#04AA6D]">
                            {para.replace("### ", "")}
                          </h4>
                        );
                      }
                      if (para.startsWith("#### ")) {
                        return (
                          <h5 key={pIdx} className="text-sm font-bold theme-heading pt-1">
                            {para.replace("#### ", "")}
                          </h5>
                        );
                      }
                      if (para.startsWith("> ")) {
                        return (
                          <div
                            key={pIdx}
                            className="bg-emerald-500/[0.08] border-l-4 border-[#04AA6D] p-3.5 rounded-r-xl text-xs space-y-1"
                          >
                            {para.replace("> ", "")}
                          </div>
                        );
                      }
                      if (para.startsWith("```")) {
                        return (
                          <pre
                            key={pIdx}
                            className="bg-slate-100 dark:bg-[#070d19] text-slate-800 dark:text-emerald-400 p-4 rounded-xl border border-slate-200 dark:border-white/10 font-mono text-xs overflow-x-auto shadow-inner leading-relaxed"
                          >
                            {para.replace(/```go|```/g, "").trim()}
                          </pre>
                        );
                      }
                      return <p key={pIdx}>{para}</p>;
                    })}
                  </div>

                  {item.codeSnippet && (
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
                      <span className="text-xs font-bold theme-heading flex items-center gap-1.5">
                        <Code2 size={14} className="text-[#04AA6D]" /> Contoh Kode Pembuktian:
                      </span>
                      <pre className="bg-slate-100 dark:bg-[#070d19] text-slate-800 dark:text-emerald-400 p-4 rounded-xl border border-slate-200 dark:border-white/10 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                        {item.codeSnippet}
                      </pre>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => toggleMastered(item.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm ${
                        isMastered
                          ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                          : "w3-btn-green"
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      <span>{isMastered ? "✓ Sudah Dikuasai" : "Tandai Sudah Paham"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-16 theme-muted space-y-2">
            <p>Tidak ada pertanyaan yang sesuai dengan kriteria pencarian.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTopic("Semua Kategori");
                setSelectedDifficulty("Semua Level");
              }}
              className="text-xs text-[#04AA6D] hover:underline font-bold"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
        </div>
      )}
    </div>
  );
}
