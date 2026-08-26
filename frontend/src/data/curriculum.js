export const ROADMAP_MODULES = [
  {
    id: "module-1",
    order: 1,
    title: "1. Dasar Pemrograman Go",
    subtitle: "Fondasi Sintaks, Variabel, Kontrol Alur & Ekosistem Go",
    description: "Mempelajari filosofi bahasa Go, cara kerja compiler, deklarasi variabel, tipe data statis, percabangan logika if/else, dan loop.",
    icon: "Code2",
    badge: "Gopher Rookie",
    color: "#00ADD8",
    xp: 250,
    lessons: [
      {
        id: "1-1",
        title: "1.1 Pengenalan Go & Anatomi Program",
        summary: "Memahami struktur file .go, package main, import, dan fungsi main().",
        content: `### 🐹 Selamat Datang di Dunia Golang!
Golang (atau Go) adalah bahasa pemrograman open-source yang dikembangkan oleh Google (Robert Griesemer, Rob Pike, dan Ken Thompson) yang dirancang untuk kecepatan, konkurensi efisien, dan sintaks yang bersih.

#### 📌 Struktur Dasar File Go:
Setiap program Go executable harus memenuhi 3 aturan dasar:
1. **\`package main\`**: Mendeklarasikan bahwa file ini adalah titik masuk aplikasi (executable), bukan reusable library.
2. **\`import "fmt"\`**: Mengimpor package bawaan (*Format*) untuk operasi I/O seperti mencetak teks ke console.
3. **\`func main()\`**: Fungsi utama yang otomatis dieksekusi pertama kali oleh Go runtime.

> 💡 **Karakteristik Go:**
> - Static Typing (tipe data dicek saat kompilasi).
> - Fast Compilation (kompilasi langsung ke binary mesin tanpa JVM/VM).
> - Built-in Concurrency (Goroutines & Channels).
> - Garbage Collected (manajemen memori otomatis).`,
        codeSnippet: `package main

import "fmt"

func main() {
    // Mencetak teks ucapan selamat datang
    fmt.Println("Halo, Calon Master Golang! 🚀")
    fmt.Println("Mari kita mulai perjalanan dari nol hingga mahir.")
}`,
        exercise: {
          instruction: "Ubah teks di dalam `fmt.Println` agar mencetak namamu dan target belajar Go!",
          starterCode: `package main

import "fmt"

func main() {
    // Tulis kodemu di sini
    fmt.Println("Halo, nama saya [Nama Anda]! Target saya adalah menguasai Backend Go.")
}`,
          expectedHint: "Gunakan fmt.Println() untuk menampilkan pesan ke terminal."
        },
        quiz: [
          {
            question: "Mengapa program executable di Go harus menggunakan 'package main'?",
            options: [
              "Agar program bisa diunggah ke internet",
              "Memberi tahu compiler bahwa file ini adalah entry point aplikasi yang menghasilkan binary executable",
              "Supaya semua variabel otomatis bernilai global",
              "Karena Go mewajibkan semua file diberi nama main.go"
            ],
            correctAnswer: 1,
            explanation: "'package main' adalah penanda khusus bagi compiler Go bahwa package tersebut harus dikompilasi menjadi berkas biner yang dapat langsung dieksekusi (executable)."
          }
        ]
      },
      {
        id: "1-2",
        title: "1.2 Variabel, Konstanta & Tipe Data",
        summary: "Deklarasi eksplisit (var), short declaration (:=), zero value, dan tipe data dasar.",
        content: `### 📦 Variabel di Go
Go memiliki sistem tipe data yang ketat (*statically typed*). Ada dua cara utama mendeklarasikan variabel:

#### 1. Deklarasi Formal (\`var\`):
\`\`\`go
var umur int = 25
var nama string = "Budi"
var aktif bool // default zero-value: false
\`\`\`

#### 2. Short Declaration (\`:=\`):
Hanya dapat digunakan di dalam fungsi. Tipe data ditentukan otomatis (*Type Inference*):
\`\`\`go
kota := "Jakarta" // otomatis bertipe string
skor := 98.5      // otomatis bertipe float64
\`\`\`

#### 🌟 Zero Value di Go:
Jika variabel dideklarasikan tanpa nilai awal, Go memberikan nilai default:
- \`int\`, \`float\` $\\rightarrow$ \`0\`
- \`string\` $\\rightarrow$ \`""\` (string kosong)
- \`bool\` $\\rightarrow$ \`false\`
- \`pointer\`, \`slice\`, \`map\`, \`channel\` $\\rightarrow$ \`nil\``,
        codeSnippet: `package main

import "fmt"

func main() {
    // Short declaration
    bahasa := "Golang"
    versi := 1.22
    isFast := true

    // Konstanta (nilai tidak dapat diubah)
    const Creator = "Google"

    fmt.Printf("Belajar: %s v%.2f\n", bahasa, versi)
    fmt.Printf("Apakah cepat? %t\n", isFast)
    fmt.Printf("Dibuat oleh: %s\n", Creator)
}`,
        exercise: {
          instruction: "Deklarasikan variabel `namaLengkap` (string), `pengalamanTahun` (int), dan `siapBelajar` (bool), lalu cetak dengan `fmt.Printf`.",
          starterCode: `package main

import "fmt"

func main() {
    namaLengkap := "Alex Gopher"
    pengalamanTahun := 2
    siapBelajar := true

    fmt.Printf("Dev: %s | Pengalaman: %d tahun | Siap: %t\n", namaLengkap, pengalamanTahun, siapBelajar)
}`,
          expectedHint: "Gunakan %s untuk string, %d untuk integer, dan %t untuk boolean pada fmt.Printf."
        },
        quiz: [
          {
            question: "Kapan operator pendek `:=` TIDAK boleh digunakan?",
            options: [
              "Di dalam blok fungsi main()",
              "Di luar fungsi (pada level package global)",
              "Ketika membuat variabel bertipe string",
              "Ketika menginisialisasi angka"
            ],
            correctAnswer: 1,
            explanation: "Short variable declaration `:=` hanya diizinkan di dalam body fungsi. Di luar fungsi (package scope), Anda wajib menggunakan kata kunci `var`."
          }
        ]
      },
      {
        id: "1-3",
        title: "1.3 Pengkondisian (If/Else & Switch)",
        summary: "Percabangan logika, if dengan temporary statement, dan switch case tanpa break.",
        content: `### 🔀 Pengkondisian di Go
Go tidak membutuhkan tanda kurung \`()\` pada kondisi \`if\`, namun kurung kurawal \`{}\` wajib digunakan.

#### 💡 Fitur Keren: If dengan Short Statement
Go mengizinkan deklarasi variabel sementara tepat sebelum evaluasi kondisi:
\`\`\`go
if skor := getSkor(); skor >= 80 {
    fmt.Println("Lulus!")
} // skor tidak dapat diakses di luar blok if ini
\`\`\`

#### 🔄 Switch Case:
Di Go, \`switch\` otomatis berhenti tanpa perlu menulis kata kunci \`break\` di setiap case!`,
        codeSnippet: `package main

import "fmt"

func main() {
    nilai := 85

    // If - Else If - Else
    if nilai >= 90 {
        fmt.Println("Predikat: A (Luar Biasa)")
    } else if nilai >= 75 {
        fmt.Println("Predikat: B (Sangat Baik)")
    } else {
        fmt.Println("Predikat: C (Cukup)")
    }

    // Switch Case
    hari := "Senin"
    switch hari {
    case "Sabtu", "Minggu":
        fmt.Println("Waktunya liburan & ngoding santai! 🏖️")
    case "Senin":
        fmt.Println("Semangat memulai pekan produktif! 💻")
    default:
        fmt.Println("Hari kerja biasa.")
    }
}`,
        exercise: {
          instruction: "Buat logika if-else untuk mengecek status HTTP: jika 200 cetak 'OK', jika 404 cetak 'Not Found', selain itu cetak 'Unknown'.",
          starterCode: `package main

import "fmt"

func main() {
    statusCode := 404

    // Lengkapi logika pengkondisian di bawah
    switch statusCode {
    case 200:
        fmt.Println("Status 200: OK")
    case 404:
        fmt.Println("Status 404: Not Found")
    default:
        fmt.Println("Status: Unknown")
    }
}`,
          expectedHint: "Gunakan switch atau if-else bertingkat."
        },
        quiz: [
          {
            question: "Apakah kata kunci `break` wajib ditulis di setiap `case` pada switch di Go?",
            options: [
              "Ya, jika tidak ada break maka case berikutnya akan selalu dieksekusi",
              "Tidak, Go otomatis melakukan break secara default kecuali menggunakan kata kunci fallthrough",
              "Hanya wajib jika switch berada di dalam looping",
              "Hanya opsional pada tipe data angka"
            ],
            correctAnswer: 1,
            explanation: "Di Go, switch case otomatis berhenti setelah menemukan kecocokan tanpa perlu break. Jika ingin melanjutkan ke case berikutnya, gunakan kata kunci `fallthrough` secara eksplisit."
          }
        ]
      },
      {
        id: "1-4",
        title: "1.4 Perulangan (For Loop)",
        summary: "Go hanya memiliki satu keyword perulangan: 'for' yang multifungsi.",
        content: `### 🔁 Satu Keyword Untuk Semua Perulangan: \`for\`
Di Golang tidak ada keyword \`while\` atau \`do-while\`. Semua kebutuhan loop diselesaikan menggunakan \`for\`.

#### 3 Pola Utama For Loop:
1. **For Klasik (Init; Condition; Post)**:
   \`\`\`go
   for i := 0; i < 5; i++ { fmt.Println(i) }
   \`\`\`
2. **For ala While**:
   \`\`\`go
   for count < 10 { count++ }
   \`\`\`
3. **For Infinite Loop**:
   \`\`\`go
   for {
       // Loop selamanya sampai dipanggil break
       break
   }
   \`\`\``,
        codeSnippet: `package main

import "fmt"

func main() {
    fmt.Println("--- Loop Standar ---")
    for i := 1; i <= 5; i++ {
        fmt.Printf("Iterasi ke-%d\n", i)
    }

    fmt.Println("\n--- Loop ala While ---")
    energi := 3
    for energi > 0 {
        fmt.Printf("Energi tersisa: %d⚡\n", energi)
        energi--
    }
    fmt.Println("Energi habis, istirahat dulu!")
}`,
        exercise: {
          instruction: "Gunakan for loop untuk menjumlahkan angka dari 1 sampai 10 dan cetak total hasilnya.",
          starterCode: `package main

import "fmt"

func main() {
    total := 0
    for i := 1; i <= 10; i++ {
        total += i
    }
    fmt.Printf("Total penjumlahan 1 s/d 10 = %d\n", total)
}`,
          expectedHint: "Total akhir seharusnya adalah 55."
        },
        quiz: [
          {
            question: "Bagaimana cara membuat perulangan tak terbatas (infinite loop) di Go?",
            options: [
              "while(true) { ... }",
              "loop { ... }",
              "for { ... }",
              "do { ... } while(1)"
            ],
            correctAnswer: 2,
            explanation: "Di Go, `for { ... }` tanpa kondisi apapun adalah cara resmi membuat infinite loop yang dapat dihentikan menggunakan `break` atau `return`."
          }
        ]
      }
    ]
  },
  {
    id: "module-2",
    order: 2,
    title: "2. Struktur Data & Logika",
    subtitle: "Array, Slice, Map, Struct & Fungsi Tingkat Lanjut",
    description: "Menguasai struktur data bawaan Go, dynamic slice dengan append, hash map key-value, struct modeling, dan fungsi multi-return.",
    icon: "Boxes",
    badge: "Data Sculptor",
    color: "#10B981",
    xp: 350,
    lessons: [
      {
        id: "2-1",
        title: "2.1 Array vs Slice",
        summary: "Memahami fixed-size array vs dynamic reference slice, fungsi append(), make(), dan slicing.",
        content: `### 📊 Array vs Slice di Go
Memahami perbedaan antara **Array** dan **Slice** adalah kunci penting dalam efisiensi memori di Go.

| Karakteristik | Array | Slice |
|---|---|---|
| Ukuran | Statis / Fixed (\`[5]int\`) | Dinamis / Fleksibel (\`[]int\`) |
| Passing ke Fungsi | Mengcopy seluruh data (Value) | Mengirim referensi ke underlying array |
| Fleksibilitas | Kaku | Sangat fleksibel (append, slice) |

#### 🔪 Memanipulasi Slice:
- \`append(slice, item)\`: Menambahkan elemen baru ke akhir slice.
- \`make([]T, len, cap)\`: Mengalokasikan slice dengan panjang dan kapasitas tertentu.
- \`slice[start:end]\`: Mengambil sub-bagian dari slice.`,
        codeSnippet: `package main

import "fmt"

func main() {
    // Inisialisasi Slice
    bahasa := []string{"Go", "Rust", "TypeScript"}
    fmt.Println("Awal:", bahasa)

    // Menambah elemen dengan append
    bahasa = append(bahasa, "Python", "Kotlin")
    fmt.Println("Setelah append:", bahasa)
    fmt.Printf("Panjang (len): %d, Kapasitas (cap): %d\n", len(bahasa), cap(bahasa))

    // Slicing operator [1:3] (mengambil indeks 1 sampai 2)
    subBahasa := bahasa[1:4]
    fmt.Println("Sub slice [1:4]:", subBahasa)
}`,
        exercise: {
          instruction: "Buat slice integer berisi angka [10, 20, 30], tambahkan angka 40 dan 50 dengan `append`, lalu cetak panjangnya.",
          starterCode: `package main

import "fmt"

func main() {
    angka := []int{10, 20, 30}
    angka = append(angka, 40, 50)
    fmt.Println("Daftar angka:", angka)
    fmt.Println("Jumlah elemen:", len(angka))
}`,
          expectedHint: "Gunakan len(angka) untuk menghitung panjang slice."
        },
        quiz: [
          {
            question: "Apa yang terjadi jika kapasitas slice penuh saat fungsi `append()` dipanggil?",
            options: [
              "Program akan panic dan crash dengan pesan out of memory",
              "Go otomatis mengalokasikan array baru yang lebih besar dan menyalin data lama",
              "Elemen pertama di slice akan terhapus otomatis (FIFO)",
              "Append akan gagal secara diam-diam"
            ],
            correctAnswer: 1,
            explanation: "Saat kapasitas underlying array terlampaui, `append()` secara otomatis membuat underlying array baru dengan kapasitas berlipat ganda, memindahkan data lama, dan mengembalikan slice baru."
          }
        ]
      },
      {
        id: "2-2",
        title: "2.2 Map (Key - Value Hash Table)",
        summary: "Membuat map, CRUD key-value, pengecekan eksistensi key (comma ok idiom).",
        content: `### 🗺️ Map di Go
Map adalah struktur data kumpulan pasangan *Key-Value* yang cepat dan tidak berurutan (*hash map*).

#### 🛠️ Operasi Map:
- **Inisialisasi**: \`make(map[KeyType]ValueType)\` atau map literal.
- **Set/Update**: \`kamus["go"] = "Bahasa cepat"\`
- **Delete**: \`delete(kamus, "go")\`
- **Check Key Existence (Comma-ok idiom)**:
\`\`\`go
nilai, ada := kamus["go"]
if ada {
    fmt.Println("Ditemukan:", nilai)
}
\`\`\``,
        codeSnippet: `package main

import "fmt"

func main() {
    // Map Literal
    hargaBarang := map[string]int{
        "Laptop":   12000000,
        "Keyboard": 750000,
        "Mouse":    300000,
    }

    // Menambah item
    hargaBarang["Monitor"] = 2500000

    // Cek keberadaan key dengan comma-ok idiom
    itemCari := "Headset"
    if harga, exists := hargaBarang[itemCari]; exists {
        fmt.Printf("%s ditemukan seharga Rp %d\n", itemCari, harga)
    } else {
        fmt.Printf("%s TIDAK ditemukan di katalog!\n", itemCari)
    }

    fmt.Println("\n--- Daftar Lengkap ---")
    for barang, harga := range hargaBarang {
        fmt.Printf("- %-10s : Rp %d\n", barang, harga)
    }
}`,
        exercise: {
          instruction: "Buat map `nilaiSiswa` (map[string]int) berisi 3 nama siswa dan nilainya. Loop map tersebut dan cetak siapa saja yang nilainya >= 80.",
          starterCode: `package main

import "fmt"

func main() {
    nilaiSiswa := map[string]int{
        "Andi": 85,
        "Budi": 70,
        "Citra": 92,
    }

    fmt.Println("Siswa Berprestasi (Nilai >= 80):")
    for nama, nilai := range nilaiSiswa {
        if nilai >= 80 {
            fmt.Printf("🌟 %s : %d\n", nama, nilai)
        }
    }
}`,
          expectedHint: "Gunakan for nama, nilai := range nilaiSiswa untuk iterasi."
        },
        quiz: [
          {
            question: "Apa nilai yang dikembalikan jika kita mengakses key yang tidak ada di dalam map?",
            options: [
              "Mengembalikan error exception",
              "Mengembalikan zero-value dari tipe data value map tersebut",
              "Menyebabkan program panic",
              "Mengembalikan null"
            ],
            correctAnswer: 1,
            explanation: "Di Go, mengakses key yang tidak ada akan mengembalikan zero value dari tipe value (misal `0` untuk int, `\"\"` untuk string). Gunakan comma-ok idiom (`v, ok := m[k]`) untuk membedakan antara nilai 0 asli atau key tidak ada."
          }
        ]
      },
      {
        id: "2-3",
        title: "2.3 Struct & Pemodelan Data",
        summary: "Mendefinisikan custom type struct, anonymous struct, dan struct embedding (komposisi).",
        content: `### 🏛️ Struct: Pondasi Tipe Data Kustom
Go bukan bahasa OOP murni berbasis class, melainkan menggunakan **Struct** dan **Composition** (komposisi).

\`\`\`go
type User struct {
    ID       int
    Nama     string
    Email    string
    IsActive bool
}
\`\`\`

#### 🧱 Struct Embedding (Komposisi):
Go tidak mengenal inheritance (pewarisan kelas \`extends\`), melainkan menyematkan (*embedding*) satu struct ke dalam struct lain.`,
        codeSnippet: `package main

import "fmt"

type Alamat struct {
    Kota    string
    Negara  string
}

// User menyematkan Alamat (Composition)
type User struct {
    ID       int
    Nama     string
    Role     string
    Alamat   Alamat
}

func main() {
    user1 := User{
        ID:   101,
        Nama: "Rian Developer",
        Role: "Backend Engineer",
        Alamat: Alamat{
            Kota:   "Bandung",
            Negara: "Indonesia",
        },
    }

    fmt.Printf("User: %s (%s)\n", user1.Nama, user1.Role)
    fmt.Printf("Lokasi: %s, %s\n", user1.Alamat.Kota, user1.Alamat.Negara)
}`,
        exercise: {
          instruction: "Definisikan struct `Produk` dengan field `Nama` (string), `Harga` (float64), dan `Stok` (int). Buat 1 instance dan cetak datanya.",
          starterCode: `package main

import "fmt"

type Produk struct {
    Nama  string
    Harga float64
    Stok  int
}

func main() {
    p := Produk{
        Nama:  "Kopi Arabika",
        Harga: 45000.0,
        Stok:  20,
    }
    fmt.Printf("Produk: %s | Harga: Rp %.0f | Sisa Stok: %d\n", p.Nama, p.Harga, p.Stok)
}`,
          expectedHint: "Buat struct sebelum func main() lalu inisialisasi di dalam main."
        },
        quiz: [
          {
            question: "Bagaimana cara Go menerapkan konsep pewarisan (inheritance) antar objek?",
            options: [
              "Menggunakan kata kunci extends seperti Java",
              "Menggunakan inheritance decorator",
              "Menggunakan Komposisi (Struct Embedding), bukan inheritance",
              "Go tidak mendukung relasi antar tipe data"
            ],
            correctAnswer: 2,
            explanation: "Filosofi Go mengutamakan 'Composition over Inheritance'. Struct dapat menyematkan struct lain di dalamnya sehingga seluruh field dan method dari struct yang disematkan langsung dapat diakses."
          }
        ]
      },
      {
        id: "2-4",
        title: "2.4 Fungsi, Multi-Return & Variadic",
        summary: "Multiple return values, named returns, variadic functions (...), dan anonymous functions.",
        content: `### ⚡ Kekuatan Fungsi di Go
Fungsi di Go adalah *first-class citizens* (bisa disimpan di variabel, dikirim sebagai argumen, atau dikembalikan dari fungsi lain).

#### 🌟 Multiple Return Values:
Salah satu ciri khas Go yang sangat populer untuk penanganan error:
\`\`\`go
func bagi(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("tidak bisa membagi dengan nol")
    }
    return a / b, nil
}
\`\`\`

#### 📦 Variadic Function:
Menerima jumlah argumen dinamis dengan tanda \`...\`:
\`\`\`go
func jumlahSemua(angka ...int) int
\`\`\``,
        codeSnippet: `package main

import "fmt"

// Fungsi dengan multiple return (hasil & boolean sukses)
func hitungDiskon(totalBelanja float64) (float64, bool) {
    if totalBelanja >= 100000 {
        diskon := totalBelanja * 0.10 // Diskon 10%
        return totalBelanja - diskon, true
    }
    return totalBelanja, false
}

// Variadic function
func totalSkor(skor ...int) int {
    total := 0
    for _, s := range skor {
        total += s
    }
    return total
}

func main() {
    total := 150000.0
    bayar, dapetDiskon := hitungDiskon(total)
    fmt.Printf("Belanja: Rp %.0f | Bayar: Rp %.0f | Dapat Diskon: %t\n", total, bayar, dapetDiskon)

    fmt.Printf("Total skor game: %d\n", totalSkor(10, 25, 40, 15))
}`,
        exercise: {
          instruction: "Buat fungsi variadic `rataRata(nilai ...float64) float64` yang menghitung nilai rata-rata dari argumen yang diberikan.",
          starterCode: `package main

import "fmt"

func rataRata(nilai ...float64) float64 {
    if len(nilai) == 0 {
        return 0
    }
    total := 0.0
    for _, n := range nilai {
        total += n
    }
    return total / float64(len(nilai))
}

func main() {
    hasil := rataRata(80, 90, 85, 95)
    fmt.Printf("Nilai Rata-rata: %.2f\n", hasil)
}`,
          expectedHint: "Bagi total dengan float64(len(nilai))."
        },
        quiz: [
          {
            question: "Mengapa fitur Multiple Return Values di Go sangat penting bagi idiom standar Go?",
            options: [
              "Untuk mengembalikan hasil komputasi sekaligus nilai error (result, err)",
              "Agar tidak perlu menggunakan struct sama sekali",
              "Supaya program otomatis berjalan secara multi-thread",
              "Hanya untuk keperluan kompatibilitas dengan bahasa C"
            ],
            correctAnswer: 0,
            explanation: "Pola idiomatis Go dalam menangani error adalah mengembalikan pasangan nilai `(result, err)`. Hal ini membuat pemanggilan fungsi eksplisit dalam mengecek apakah operasi berhasil atau menghasilkan error."
          }
        ]
      }
    ]
  },
  {
    id: "module-3",
    order: 3,
    title: "3. Konsep Menengah (OOP ala Go)",
    subtitle: "Pointer, Method, Receiver, Interface & Error Handling",
    description: "Memahami model OOP unik di Go: manipulasi memori dengan pointer, value vs pointer receiver, polimorfisme dengan interface implisit, dan error handling.",
    icon: "Cpu",
    badge: "Interface Architect",
    color: "#8B5CF6",
    xp: 450,
    lessons: [
      {
        id: "3-1",
        title: "3.1 Pointer & Alamat Memori",
        summary: "Memahami operator '&' (address-of), '*' (dereferencing), dan Pass by Value vs Pass by Reference.",
        content: `### 🎯 Pointer: Mengontrol Memori
Secara default, Go menggunakan prinsip **Pass by Value** (menyalin salinan data saat dikirim ke fungsi).

#### 🗝️ Operator Pointer:
1. **\`&variable\`** (*Address-of*): Mengambil alamat memori tempat variabel disimpan (contoh: \`0xc000014070\`).
2. **\`*pointer\`** (*Dereferencing*): Mengakses atau mengubah nilai asli di alamat memori yang ditunjuk.

> 💡 **Kapan Menggunakan Pointer?**
> - Ketika ingin fungsi mengubah nilai variabel pemanggil secara langsung.
> - Ketika struct berukuran besar, agar tidak boros memori karena dicopy berkali-kali.`,
        codeSnippet: `package main

import "fmt"

// Tanpa pointer (Pass by Value - Nilai asli TIDAK berubah)
func tambahSatu(x int) {
    x = x + 1
}

// Dengan pointer (Pass by Reference - Nilai asli BERUBAH)
func tambahSatuPointer(x *int) {
    *x = *x + 1
}

func main() {
    angka := 10
    fmt.Println("Nilai awal:", angka)

    tambahSatu(angka)
    fmt.Println("Setelah tambahSatu (value):", angka)

    tambahSatuPointer(&angka)
    fmt.Println("Setelah tambahSatuPointer (&pointer):", angka)
}`,
        exercise: {
          instruction: "Buat fungsi `ubahNama(p *string, namaBaru string)` yang mengubah nilai string asli melalui pointer.",
          starterCode: `package main

import "fmt"

func ubahNama(p *string, namaBaru string) {
    *p = namaBaru
}

func main() {
    nama := "Joko"
    fmt.Println("Sebelum:", nama)
    ubahNama(&nama, "Joko Master Go")
    fmt.Println("Sesudah:", nama)
}`,
          expectedHint: "Kirim &nama ke fungsi lalu gunakan *p untuk assign nilai baru."
        },
        quiz: [
          {
            question: "Apa fungsi dari operator `&` sebelum nama variabel di Go?",
            options: [
              "Melakukan operasi bitwise AND",
              "Mengambil alamat memori (memory address) dari variabel tersebut",
              "Menghapus variabel dari memori",
              "Mengubah tipe data menjadi pointer"
            ],
            correctAnswer: 1,
            explanation: "`&` (Address-of operator) digunakan untuk mendapatkan alamat lokasi memori dari suatu variabel."
          }
        ]
      },
      {
        id: "3-2",
        title: "3.2 Method & Receiver",
        summary: "Menempelkan fungsi ke dalam Struct: Value Receiver vs Pointer Receiver.",
        content: `### 🛠️ Method di Go
Method adalah fungsi khusus yang ditempelkan ke tipe data tertentu melalui **Receiver**.

#### 1. Value Receiver:
Menerima salinan struct (tidak bisa mengubah data asli struct).
\`\`\`go
func (u User) Sapa() string
\`\`\`

#### 2. Pointer Receiver:
Menerima pointer ke struct (dapat memodifikasi data asli struct secara langsung).
\`\`\`go
func (u *User) UbahEmail(emailBaru string)
\`\`\``,
        codeSnippet: `package main

import "fmt"

type RekeningBank struct {
    Pemilik string
    Saldo   float64
}

// Value receiver (hanya membaca data)
func (r RekeningBank) Info() {
    fmt.Printf("Pemilik: %s | Saldo: Rp %.2f\n", r.Pemilik, r.Saldo)
}

// Pointer receiver (memodifikasi saldo asli)
func (r *RekeningBank) Setor(jumlah float64) {
    r.Saldo += jumlah
    fmt.Printf("Berhasil setor Rp %.2f ke rekening %s\n", jumlah, r.Pemilik)
}

func main() {
    rek := RekeningBank{Pemilik: "Budi Santoso", Saldo: 1000000}
    rek.Info()

    rek.Setor(500000)
    rek.Info()
}`,
        exercise: {
          instruction: "Tambahkan method pointer receiver `Tarik(jumlah float64)` yang mengurangi saldo rekening jika saldo mencukupi.",
          starterCode: `package main

import "fmt"

type Dompet struct {
    Saldo float64
}

func (d *Dompet) Tarik(jumlah float64) bool {
    if d.Saldo >= jumlah {
        d.Saldo -= jumlah
        return true
    }
    return false
}

func main() {
    d := Dompet{Saldo: 200000}
    berhasil := d.Tarik(75000)
    fmt.Printf("Penarikan berhasil: %t | Sisa Saldo: Rp %.0f\n", berhasil, d.Saldo)
}`,
          expectedHint: "Gunakan d.Saldo -= jumlah di dalam method Tarik."
        },
        quiz: [
          {
            question: "Kapan Anda wajib menggunakan Pointer Receiver `(s *MyStruct)` pada method?",
            options: [
              "Saat method hanya ingin mencetak data",
              "Saat method perlu memodifikasi state/field asli dari struct tersebut",
              "Hanya saat struct memiliki lebih dari 10 field",
              "Tidak pernah, Go otomatis mengubah semua receiver menjadi pointer"
            ],
            correctAnswer: 1,
            explanation: "Pointer receiver mengizinkan method untuk memutasi (mengubah) nilai field pada struct pemanggil secara langsung tanpa membuat duplikat."
          }
        ]
      },
      {
        id: "3-3",
        title: "3.3 Interface & Polimorfisme",
        summary: "Interface implisit (Duck Typing), any / interface{}, dan Type Assertion.",
        content: `### 🎭 Interface di Go: 'Duck Typing'
Interface di Go adalah kontrak kumpulan method (*method set*).

> **"Jika ia berjalan seperti bebek dan bersuara seperti bebek, maka ia adalah bebek."**

Di Go, sebuah struct **TIDAK PERLU** menulis \`implements InterfaceName\`. Cukup buat method dengan nama dan signature yang sesuai, maka otomatis mengimplementasikan interface tersebut (*Implicit Implementation*)!`,
        codeSnippet: `package main

import "fmt"
import "math"

// Kontrak Interface
type BangunDatar interface {
    HitungLuas() float64
}

type Persegi struct {
    Sisi float64
}

func (p Persegi) HitungLuas() float64 {
    return p.Sisi * p.Sisi
}

type Lingkaran struct {
    Radius float64
}

func (l Lingkaran) HitungLuas() float64 {
    return math.Pi * l.Radius * l.Radius
}

// Fungsi polimorfik yang menerima jenis bangun datar apapun
func CetakLuas(b BangunDatar) {
    fmt.Printf("Luas bangun datar: %.2f\n", b.HitungLuas())
}

func main() {
    p := Persegi{Sisi: 4}
    l := Lingkaran{Radius: 7}

    CetakLuas(p)
    CetakLuas(l)
}`,
        exercise: {
          instruction: "Buat struct `Segitiga` dengan field `Alas` dan `Tinggi`, lalu buat method `HitungLuas() float64` agar memenuhi interface `BangunDatar`.",
          starterCode: `package main

import "fmt"

type BangunDatar interface {
    HitungLuas() float64
}

type Segitiga struct {
    Alas   float64
    Tinggi float64
}

func (s Segitiga) HitungLuas() float64 {
    return 0.5 * s.Alas * s.Tinggi
}

func main() {
    s := Segitiga{Alas: 10, Tinggi: 6}
    var b BangunDatar = s
    fmt.Printf("Luas Segitiga: %.1f\n", b.HitungLuas())
}`,
          expectedHint: "Rumus luas segitiga: 0.5 * Alas * Tinggi."
        },
        quiz: [
          {
            question: "Bagaimana cara struct mengimplementasikan interface di Golang?",
            options: [
              "Dengan menambahkan 'implements NamaInterface' pada deklarasi struct",
              "Secara implisit cukup dengan mendefinisikan seluruh method yang ada di interface tersebut",
              "Menggunakan annotation @Override",
              "Mendaftarkannya di file config go.mod"
            ],
            correctAnswer: 1,
            explanation: "Go menggunakan sistem 'implicit interface implementation'. Jika struct memiliki semua method yang dideklarasikan di interface, Go secara otomatis menganggapnya memenuhi interface tersebut."
          }
        ]
      },
      {
        id: "3-4",
        title: "3.4 Error Handling & Defer, Panic, Recover",
        summary: "Pola idiomatik penanganan error di Go, custom errors, defer statement, dan recover.",
        content: `### 🛡️ Error Handling yang Bersih & Eksplisit
Go tidak menggunakan \`try-catch\`. Error diperlakukan sebagai nilai biasa (*Values are errors*).

\`\`\`go
hasil, err := prosesData()
if err != nil {
    // Tangani error di sini
    return err
}
\`\`\`

#### ⏱️ Defer:
Menjadwalkan eksekusi fungsi agar berjalan tepat sebelum fungsi pembungkus selesai (sangat berguna untuk closing file, database connection, atau unlock mutex).`,
        codeSnippet: `package main

import (
    "errors"
    "fmt"
)

func validasiUmur(umur int) (string, error) {
    if umur < 0 {
        return "", errors.New("umur tidak boleh negatif")
    }
    if umur < 17 {
        return "Belum Cukup Umur", nil
    }
    return "Dewasa (Boleh buat KTP)", nil
}

func main() {
    defer fmt.Println("🏁 Program selesai dieksekusi (defer)")

    daftarUmur := []int{20, -5, 15}

    for _, u := range daftarUmur {
        status, err := validasiUmur(u)
        if err != nil {
            fmt.Printf("❌ Error pada umur %d: %v\n", u, err)
            continue
        }
        fmt.Printf("✅ Umur %d: %s\n", u, status)
    }
}`,
        exercise: {
          instruction: "Buat fungsi `hitungDiskon(harga float64)` yang mengembalikan error jika harga <= 0.",
          starterCode: `package main

import (
    "errors"
    "fmt"
)

func hitungDiskon(harga float64) (float64, error) {
    if harga <= 0 {
        return 0, errors.New("harga harus lebih besar dari 0")
    }
    return harga * 0.9, nil
}

func main() {
    if hasil, err := hitungDiskon(100000); err == nil {
        fmt.Printf("Harga diskon: Rp %.0f\n", hasil)
    }
}`,
          expectedHint: "Gunakan errors.New() untuk membuat instance error."
        },
        quiz: [
          {
            question: "Kapan baris kode yang diawali kata kunci `defer` akan dieksekusi?",
            options: [
              "Saat aplikasi pertama kali dijalankan",
              "Tepat sebelum fungsi tempat defer berada selesai dieksekusi (return)",
              "Hanya saat terjadi crash/panic",
              "Dijalankan di background goroutine terpisah"
            ],
            correctAnswer: 1,
            explanation: "`defer` menunda eksekusi suatu fungsi sampai fungsi di sekitarnya selesai (return), biasanya digunakan untuk cleanup resource seperti menutup koneksi atau file."
          }
        ]
      }
    ]
  },
  {
    id: "module-4",
    order: 4,
    title: "4. Konkurensi (Concurrency)",
    subtitle: "Goroutines, Channels, Select, Mutex & Worker Pools",
    description: "Fitur andalan Go: menjalankan ribuan tugas secara paralel dengan ringan menggunakan goroutines, komunikasi aman via channels, dan koordinasi dengan sync package.",
    icon: "Activity",
    badge: "Concurrency Maestro",
    color: "#F59E0B",
    xp: 550,
    lessons: [
      {
        id: "4-1",
        title: "4.1 Goroutines (Green Threads)",
        summary: "Membuat thread ringan dengan kata kunci 'go', memory footprint ~2KB, dan cooperative scheduling.",
        content: `### 🚀 Apa itu Goroutine?
Goroutine adalah fungsi yang dieksekusi secara asinkron/konkuren bersamaan dengan fungsi lainnya.

#### Perbandingan dengan OS Thread Tradisional:
- **OS Thread**: Membutuhkan memori stack awal ~1-2 MB.
- **Goroutine**: Hanya butuh ~2 KB memori stack (bisa menjalankan 100.000+ goroutine sekaligus tanpa kehabisan RAM!).

#### Cara Menjalankan Goroutine:
Cukup tambahkan kata kunci \`go\` sebelum memanggil fungsi:
\`\`\`go
go prosesData(data)
\`\`\``,
        codeSnippet: `package main

import (
    "fmt"
    "time"
)

func cetakPesan(pesan string, delay time.Duration) {
    for i := 1; i <= 3; i++ {
        time.Sleep(delay)
        fmt.Printf("[%s] Detik ke-%d\n", pesan, i)
    }
}

func main() {
    fmt.Println("🚦 Memulai Goroutines...")

    // Jalankan di background goroutines
    go cetakPesan("Worker-A", 100*time.Millisecond)
    go cetakPesan("Worker-B", 150*time.Millisecond)

    // Beri waktu agar goroutine selesai sebelum main exit
    time.Sleep(500 * time.Millisecond)
    fmt.Println("🏁 Semua pekerjaan selesai!")
}`,
        exercise: {
          instruction: "Jalankan fungsi `unduhFile(nama string)` menggunakan goroutine `go unduhFile(...)` untuk 2 file berbeda.",
          starterCode: `package main

import (
    "fmt"
    "time"
)

func unduhFile(nama string) {
    fmt.Printf("⬇️ Mengunduh %s...\n", nama)
    time.Sleep(100 * time.Millisecond)
    fmt.Printf("✅ Selesai unduh %s\n", nama)
}

func main() {
    go unduhFile("gambar.png")
    go unduhFile("dokumen.pdf")

    time.Sleep(200 * time.Millisecond)
}`,
          expectedHint: "Panggil fungsi dengan awalan kata kunci go."
        },
        quiz: [
          {
            question: "Berapa perkiraan alokasi memori stack awal untuk sebuah goroutine di Go?",
            options: [
              "Sekitar 2 Kilobyte (KB)",
              "Sekitar 1 Megabyte (MB)",
              "Sekitar 512 Megabyte (MB)",
              "Sama persis dengan ukuran 1 thread CPU (4MB)"
            ],
            correctAnswer: 0,
            explanation: "Goroutine sangat ringan karena hanya memerlukan stack awal sekitar 2 KB yang dapat tumbuh dan menyusut secara dinamis sesuai kebutuhan runtime."
          }
        ]
      },
      {
        id: "4-2",
        title: "4.2 Channels: Komunikasi Antar Goroutine",
        summary: "Prinsip 'Do not communicate by sharing memory; share memory by communicating'.",
        content: `### 📬 Channels: Pipa Komunikasi
Channel adalah media pipa untuk mengirim dan menerima data antar goroutine dengan aman tanpa *race condition*.

#### 🛠️ Operasi Channel:
- **Buat Channel**: \`ch := make(chan string)\`
- **Kirim Data (Send)**: \`ch <- "Pesan"\`
- **Terima Data (Receive)**: \`pesan := <-ch\`
- **Tutup Channel**: \`close(ch)\`

#### Unbuffered vs Buffered Channel:
- **Unbuffered (\`make(chan T)\`)**: Pengirim akan diblokir (*wait*) sampai penerima siap mengambil data.
- **Buffered (\`make(chan T, 3)\`)**: Pengirim tidak diblokir selama kapasitas antrian channel belum penuh.`,
        codeSnippet: `package main

import "fmt"

func hitungKuadrat(angka int, out chan int) {
    hasil := angka * angka
    out <- hasil // Mengirim hasil ke channel
}

func main() {
    // Membuat unbuffered channel integer
    ch := make(chan int)

    // Jalankan worker di goroutine
    go hitungKuadrat(9, ch)
    go hitungKuadrat(12, ch)

    // Menerima nilai dari channel (blocking sampai data tiba)
    hasil1 := <-ch
    hasil2 := <-ch

    fmt.Printf("Hasil 1: %d\n", hasil1)
    fmt.Printf("Hasil 2: %d\n", hasil2)
}`,
        exercise: {
          instruction: "Buat buffered channel `msgChan := make(chan string, 2)`, kirim 2 pesan ke dalam channel tanpa goroutine, lalu baca dan cetak keduanya.",
          starterCode: `package main

import "fmt"

func main() {
    msgChan := make(chan string, 2)

    msgChan <- "Pesan 1: Golang itu Keren!"
    msgChan <- "Pesan 2: Channel aman & cepat!"

    fmt.Println(<-msgChan)
    fmt.Println(<-msgChan)
}`,
          expectedHint: "Buffered channel berkapasitas 2 dapat menampung 2 kiriman tanpa memblokir thread."
        },
        quiz: [
          {
            question: "Apa yang terjadi pada unbuffered channel saat data dikirim (`ch <- data`) jika belum ada goroutine penerima?",
            options: [
              "Data akan dibuang otomatis",
              "Goroutine pengirim akan tertahan (blocking) menunggu ada penerima",
              "Program akan langsung exit dengan panic",
              "Data disimpan di memori disk"
            ],
            correctAnswer: 1,
            explanation: "Pada unbuffered channel, proses kirim dan terima bersifat sinkron (handshake). Pengirim akan diblokir sampai penerima siap menerima data."
          }
        ]
      },
      {
        id: "4-3",
        title: "4.3 Select Statement & Timeout",
        summary: "Multiplexing channel: mendengarkan banyak channel sekaligus dengan 'select'.",
        content: `### 🎛️ Select: Switch-Case Khusus Channel
\`select\` memungkinkan sebuah goroutine menunggu pada beberapa operasi channel sekaligus.

\`\`\`go
select {
case msg1 := <-ch1:
    fmt.Println("Menerima dari ch1:", msg1)
case msg2 := <-ch2:
    fmt.Println("Menerima dari ch2:", msg2)
case <-time.After(2 * time.Second):
    fmt.Println("Timeout! Tidak ada data dalam 2 detik.")
default:
    fmt.Println("Non-blocking fallback")
}
\`\`\``,
        codeSnippet: `package main

import (
    "fmt"
    "time"
)

func serverA(out chan string) {
    time.Sleep(100 * time.Millisecond)
    out <- "Respons Cepat dari Server A ⚡"
}

func serverB(out chan string) {
    time.Sleep(300 * time.Millisecond)
    out <- "Respons Lambat dari Server B 🐢"
}

func main() {
    chA := make(chan string)
    chB := make(chan string)

    go serverA(chA)
    go serverB(chB)

    // Menangkap mana server yang merespons duluan
    for i := 0; i < 2; i++ {
        select {
        case msgA := <-chA:
            fmt.Println("[Pemenang]:", msgA)
        case msgB := <-chB:
            fmt.Println("[Kedua]:", msgB)
        }
    }
}`,
        exercise: {
          instruction: "Gunakan `select` dengan `time.After` untuk mengantisipasi operasi yang lambat.",
          starterCode: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string)

    go func() {
        time.Sleep(50 * time.Millisecond)
        ch <- "Data Sukses Diambil!"
    }()

    select {
    case res := <-ch:
        fmt.Println("Hasil:", res)
    case <-time.After(200 * time.Millisecond):
        fmt.Println("Waktu tunggu habis (Timeout)!")
    }
}`,
          expectedHint: "time.After mengembalikan channel yang mengirim sinyal waktu setelah durasi berlalu."
        },
        quiz: [
          {
            question: "Apa fungsi dari `default` case di dalam blok `select`?",
            options: [
              "Membuat select menjadi non-blocking jika semua channel belum ada data",
              "Mengatur port default server",
              "Menghentikan semua goroutine",
              "Mengirim pesan broadcast ke semua channel"
            ],
            correctAnswer: 0,
            explanation: "Jika tidak ada channel yang siap dan ada `default` case, `select` tidak akan memblokir dan langsung mengeksekusi blok default."
          }
        ]
      },
      {
        id: "4-4",
        title: "4.4 Sync Package: WaitGroup, Mutex & Worker Pools",
        summary: "Menghindari race condition dengan sync.Mutex dan sinkronisasi goroutine dengan sync.WaitGroup.",
        content: `### 🛡️ Mengamankan Data & Menunggu Goroutine
1. **\`sync.WaitGroup\`**: Menunggu sekumpulan goroutine selesai tanpa perlu \`time.Sleep()\`.
   - \`wg.Add(n)\`: Menambah hitungan tugas.
   - \`wg.Done()\`: Menandai 1 tugas selesai (sering ditaruh di \`defer wg.Done()\`).
   - \`wg.Wait()\`: Memblokir eksekusi sampai hitungan menjadi 0.
2. **\`sync.Mutex\`**: Mengunci resource bersama agar hanya 1 goroutine yang bisa menulis dalam satu waktu (*Mutual Exclusion*).`,
        codeSnippet: `package main

import (
    "fmt"
    "sync"
)

type CounterAman struct {
    mu    sync.Mutex
    nilai int
}

func (c *CounterAman) Tambah() {
    c.mu.Lock()         // Kunci
    defer c.mu.Unlock() // Buka kunci saat fungsi selesai
    c.nilai++
}

func main() {
    var wg sync.WaitGroup
    counter := CounterAman{}

    // Menjalankan 50 goroutine bersamaan
    jumlahWorker := 50
    wg.Add(jumlahWorker)

    for i := 0; i < jumlahWorker; i++ {
        go func() {
            defer wg.Done()
            counter.Tambah()
        }()
    }

    wg.Wait() // Tunggu ke-50 worker selesai
    fmt.Printf("Total akhir counter aman: %d (Sempurna!)\n", counter.nilai)
}`,
        exercise: {
          instruction: "Gunakan `sync.WaitGroup` untuk menunggu 3 goroutine yang mencetak angka 1, 2, 3 selesai.",
          starterCode: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Tugas #%d selesai dijalankan\n", id)
        }(i)
    }

    wg.Wait()
    fmt.Println("Semua tugas beres!")
}`,
          expectedHint: "Pastikan memanggil wg.Done() di setiap goroutine dan wg.Wait() di main thread."
        },
        quiz: [
          {
            question: "Apa bahaya yang terjadi jika banyak goroutine mengakses dan mengubah variabel yang sama tanpa `sync.Mutex`?",
            options: [
              "Kompilasi akan gagal",
              "Terjadi Race Condition (data corrupt atau hasil perhitungan tidak konsisten)",
              "RAM komputer akan otomatis habis",
              "Sistem operasi akan me-restart aplikasi"
            ],
            correctAnswer: 1,
            explanation: "Race condition terjadi ketika beberapa thread/goroutine membaca dan menulis memori bersama secara serentak tanpa koordinasi penguncian (mutex)."
          }
        ]
      }
    ]
  },
  {
    id: "module-5",
    order: 5,
    title: "5. Pemrograman Web & REST API",
    subtitle: "Standard net/http, Routing, Middleware & RESTful JSON API",
    description: "Membangun web server super cepat dengan net/http bawaan Go, mendesain RESTful endpoint dengan HTTP verbs, JSON serialization, dan middleware autentikasi.",
    icon: "Globe",
    badge: "API Craftsman",
    color: "#0284C7",
    xp: 600,
    lessons: [
      {
        id: "5-1",
        title: "5.1 HTTP Server Standar (net/http)",
        summary: "Membuat web server dasar, ResponseWriter, Request struct, dan ListenAndServe.",
        content: `### 🌐 Web Server Bawaan Go (\`net/http\`)
Tanpa perlu framework eksternal, Go sudah memiliki library web server bawaan tingkat produksi yang sangat kencang dan mampu menangani ribuan koneksi konkuren per detik.

#### 📌 Komponen Utama:
1. **\`http.ResponseWriter\`**: Objek untuk menulis respon HTTP (Status code, Header, Body JSON/HTML) kembali ke client.
2. **\`*http.Request\`**: Objek yang memuat semua data request dari client (URL, Query params, Body, Headers).
3. **\`http.HandleFunc(pattern, handler)\`**: Mendaftarkan URL endpoint.
4. **\`http.ListenAndServe(port, handler)\`**: Menyalakan server.`,
        codeSnippet: `package main

import (
    "fmt"
    "net/http"
)

func haloHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, "{\"status\": \"sukses\", \"pesan\": \"Halo dari Go Server! 🚀\"}")
}

func main() {
    http.HandleFunc("/api/halo", haloHandler)

    fmt.Println("🚀 Server berjalan di http://localhost:8080")
    // http.ListenAndServe(":8080", nil) // Menjalankan server
}`,
        exercise: {
          instruction: "Buat handler `/api/status` yang mengembalikan status code 200 dan pesan text 'Server Sehat!'.",
          starterCode: `package main

import (
    "fmt"
    "net/http"
)

func statusHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    fmt.Fprintln(w, "Status: Server Sehat & Siap!")
}

func main() {
    http.HandleFunc("/api/status", statusHandler)
    fmt.Println("Route terdaftar dengan sukses.")
}`,
          expectedHint: "Gunakan fmt.Fprintln(w, ...) untuk menulis data ke ResponseWriter."
        },
        quiz: [
          {
            question: "Bagaimana cara `net/http` di Go menangani setiap request HTTP yang masuk dari browser/client?",
            options: [
              "Semua request diproses antre satu per satu secara sekuensial",
              "Setiap request HTTP otomatis dijalankan di dalam goroutine terpisah yang independen",
              "Menggunakan child process OS baru",
              "Menggunakan Web Worker di browser"
            ],
            correctAnswer: 1,
            explanation: "HTTP server bawaan Go secara otomatis men-spawn sebuah goroutine baru untuk setiap koneksi HTTP yang masuk. Hal ini yang membuat Go sangat efisien untuk high-traffic backend."
          }
        ]
      },
      {
        id: "5-2",
        title: "5.2 Routing & Path Matching (Go 1.22+)",
        summary: "Peningkatan ServeMux di Go terbaru dengan HTTP method matching dan path parameters wildcard.",
        content: `### 🎯 Routing Modern di Go (Go 1.22+)
Mulai Go versi 1.22, \`http.ServeMux\` bawaan mendukung method routing (\`GET /users\`, \`POST /users\`) dan wildcard parameter (\`/users/{id}\`) langsung tanpa third-party router!

\`\`\`go
mux := http.NewServeMux()
mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
    userID := r.PathValue("id")
    fmt.Fprintf(w, "Detail user ID: %s", userID)
})
\`\`\``,
        codeSnippet: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    mux := http.NewServeMux()

    // Route dengan method spesifik dan path parameter
    mux.HandleFunc("GET /api/gophers", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "[GET] Menampilkan semua Gopher")
    })

    mux.HandleFunc("POST /api/gophers", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "[POST] Membuat data Gopher baru")
    })

    fmt.Println("Router ServeMux Go 1.22+ siap digunakan!")
}`,
        exercise: {
          instruction: "Daftarkan route `DELETE /api/items` pada mux untuk menangani request penghapusan item.",
          starterCode: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("DELETE /api/items", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Item berhasil dihapus")
    })
    fmt.Println("Route DELETE berhasil didaftarkan.")
}`,
          expectedHint: "Awali pola route dengan kata kunci DELETE."
        },
        quiz: [
          {
            question: "Bagaimana cara mengambil path parameter (misal `{id}`) dari request di Go 1.22+?",
            options: [
              "r.URL.Query().Get(\"id\")",
              "r.PathValue(\"id\")",
              "r.Header.Get(\"id\")",
              "r.Body.Read(\"id\")"
            ],
            correctAnswer: 1,
            explanation: "Di Go 1.22+, method `r.PathValue(\"namaParam\")` adalah cara standar untuk mengekstrak path variable yang didefinisikan di pola route `{namaParam}`."
          }
        ]
      },
      {
        id: "5-3",
        title: "5.3 Middleware Pattern",
        summary: "Mendesain middleware untuk Logging, Timing request, dan Autentikasi token.",
        content: `### 🛡️ Middleware di Go
Middleware adalah fungsi yang mencegat (*intercept*) request sebelum mencapai handler utama dan dapat mengeksekusi kode sebelum atau sesudah handler berjalan.

\`\`\`go
func LoggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Println("Request masuk:", r.Method, r.URL.Path)
        next.ServeHTTP(w, r) // Lanjut ke handler berikutnya
    })
}
\`\`\``,
        codeSnippet: `package main

import (
    "fmt"
    "net/http"
    "time"
)

// Middleware untuk mencatat waktu eksekusi
func TimerMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        mulai := time.Now()
        
        // Panggil handler asli
        next(w, r)
        
        durasi := time.Since(mulai)
        fmt.Printf("⏱️ [%s] %s selesai dalam %v\n", r.Method, r.URL.Path, durasi)
    }
}

func mainHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Data Dashboard Berhasil Dimuat")
}

func main() {
    // Bungkus handler dengan middleware
    http.HandleFunc("/api/dashboard", TimerMiddleware(mainHandler))
    fmt.Println("Middleware terpasang dengan sukses.")
}`,
        exercise: {
          instruction: "Buat middleware sederhana yang menambahkan Header `X-Powered-By: GoLearn` ke response sebelum memanggil `next(w, r)`.",
          starterCode: `package main

import (
    "fmt"
    "net/http"
)

func CustomHeaderMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("X-Powered-By", "GoLearn")
        next(w, r)
    }
}

func hello(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello World")
}

func main() {
    http.HandleFunc("/hello", CustomHeaderMiddleware(hello))
    fmt.Println("Middleware Header aktif.")
}`,
          expectedHint: "Gunakan w.Header().Set(\"Key\", \"Value\")."
        },
        quiz: [
          {
            question: "Apa tujuan utama dari arsitektur Middleware pada backend web?",
            options: [
              "Menghubungkan ke database secara eksklusif",
              "Menjalankan logic cross-cutting concerns (seperti auth, logging, cors, caching) secara modular sebelum request mencapai handler utama",
              "Mengubah bahasa pemrograman di backend",
              "Mempercepat refresh browser"
            ],
            correctAnswer: 1,
            explanation: "Middleware memungkinkan pemisahan logic umum (auth, logging, metric, security headers) dari business logic utama di handler."
          }
        ]
      },
      {
        id: "5-4",
        title: "5.4 RESTful API & JSON Serialization",
        summary: "Parsing request JSON (Unmarshal / Decoder), encoding response JSON, dan Struct Tags (`json:\"name\"`).",
        content: `### 📦 JSON & REST API di Go
Go memiliki package bawaan \`encoding/json\` yang sangat kuat.

#### 🏷️ Struct Tags:
Menentukan nama key saat struct diubah ke JSON:
\`\`\`go
type Gopher struct {
    ID     int    \`json:"id"\`
    Nama   string \`json:"nama"\`
    Role   string \`json:"role,omitempty"\` // Sembunyikan jika kosong
    Secret string \`json:"-"\`              // Jangan diexport ke JSON
}
\`\`\`

- **Encode (Struct $\\rightarrow$ JSON)**: \`json.Marshal(data)\` atau \`json.NewEncoder(w).Encode(data)\`
- **Decode (JSON $\\rightarrow$ Struct)**: \`json.Unmarshal(bytes, &data)\` atau \`json.NewDecoder(r.Body).Decode(&data)\``,
        codeSnippet: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type Response struct {
    Code    int      \`json:"code"\`
    Message string   \`json:"message"\`
    Data    []string \`json:"data"\`
}

func getCoursesHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    res := Response{
        Code:    200,
        Message: "Daftar materi berhasil diambil",
        Data:    []string{"Dasar Go", "Concurrency", "REST API", "GORM"},
    }

    // Encode struct langsung ke HTTP ResponseWriter
    json.NewEncoder(w).Encode(res)
}

func main() {
    http.HandleFunc("GET /api/courses", getCoursesHandler)
    fmt.Println("REST Endpoint JSON siap melayani client.")
}`,
        exercise: {
          instruction: "Buat struct `UserResponse` dengan tag JSON yang rapi lalu serialize data menjadi JSON string.",
          starterCode: `package main

import (
    "encoding/json"
    "fmt"
)

type UserResponse struct {
    Username string \`json:"username"\`
    Email    string \`json:"email"\`
    IsPro    bool   \`json:"is_pro"\`
}

func main() {
    u := UserResponse{
        Username: "gopher_master",
        Email:    "gopher@example.com",
        IsPro:    true,
    }

    jsonBytes, _ := json.MarshalIndent(u, "", "  ")
    fmt.Println(string(jsonBytes))
}`,
          expectedHint: "Gunakan json.Marshal atau json.MarshalIndent untuk format JSON rapi."
        },
        quiz: [
          {
            question: "Bagaimana cara menyembunyikan sebuah field sensitif (seperti password) agar tidak muncul saat struct di-encode ke JSON?",
            options: [
              "Beri tag json:\"-\"",
              "Hapus field dari memori saat runtime",
              "Beri komentar // hide di atas field",
              "Gunakan tag json:\"hidden\""
            ],
            correctAnswer: 0,
            explanation: "Tag `json:\"-\"` memberi tahu encoder JSON bawaan Go untuk mengabaikan field tersebut sepenuhnya dari output JSON."
          }
        ]
      }
    ]
  },
  {
    id: "module-6",
    order: 6,
    title: "6. Manajemen Database & GORM",
    subtitle: "Koneksi Database, GORM ORM, Migrasi & Relasi Data",
    description: "Menghubungkan aplikasi Go ke database SQL (SQLite, PostgreSQL, MySQL) menggunakan GORM. Mempelajari auto migration, operasi CRUD penuh, dan relasi data (1-N, N-N).",
    icon: "Database",
    badge: "Database Architect",
    color: "#EC4899",
    xp: 700,
    lessons: [
      {
        id: "6-1",
        title: "6.1 Driver Database & database/sql",
        summary: "Koneksi database pool di Go, konfigurasi MaxOpenConns, MaxIdleConns, dan ping.",
        content: `### 🗄️ Konektivitas Database di Go
Go memiliki abstraksi bawaan \`database/sql\` yang bekerja bersama driver SQL spesifik (seperti SQLite, PostgreSQL, MySQL).

#### 🏊 Connection Pooling Otomatis:
\`database/sql\` secara otomatis mengelola *pool* koneksi database:
\`\`\`go
db.SetMaxOpenConns(25)                 // Maksimal koneksi aktif
db.SetMaxIdleConns(10)                 // Koneksi standby
db.SetConnMaxLifetime(5 * time.Minute) // Waktu refresh koneksi
\`\`\``,
        codeSnippet: `package main

import (
    "fmt"
)

// Simulasi konfigurasi DB Connection Pool
type DBConfig struct {
    Driver       string
    Host         string
    MaxOpenConns int
    MaxIdleConns int
}

func main() {
    cfg := DBConfig{
        Driver:       "sqlite3 / postgres",
        Host:         "localhost:5432",
        MaxOpenConns: 50,
        MaxIdleConns: 10,
    }

    fmt.Printf("⚡ Inisialisasi Database Pool: %s\n", cfg.Driver)
    fmt.Printf("📊 Pool: %d Max Open | %d Max Idle\n", cfg.MaxOpenConns, cfg.MaxIdleConns)
    fmt.Println("✅ Koneksi database siap digunakan secara aman dan konkuren!")
}`,
        exercise: {
          instruction: "Lengkapi konfigurasi database struct dengan parameter timeout koneksi.",
          starterCode: `package main

import "fmt"

type DBSetting struct {
    DatabaseName string
    Port         int
    AutoMigrate  bool
}

func main() {
    setting := DBSetting{
        DatabaseName: "golearn_db",
        Port:         5432,
        AutoMigrate:  true,
    }
    fmt.Printf("Koneksi DB: %s pada port %d (Migrate: %t)\n", setting.DatabaseName, setting.Port, setting.AutoMigrate)
}`,
          expectedHint: "Inisialisasi struct DBSetting."
        },
        quiz: [
          {
            question: "Mengapa package `database/sql` di Go aman digunakan oleh ribuan goroutine sekaligus?",
            options: [
              "Karena otomatis memblokir semua request",
              "Karena `database/sql` memiliki Connection Pool bawaan yang thread-safe",
              "Karena Go membuat instance database baru untuk setiap query",
              "Karena hanya mendukung mode single-thread"
            ],
            correctAnswer: 1,
            explanation: "Struct `*sql.DB` di Go dirancang thread-safe dan memelihara connection pool secara otomatis sehingga aman diakses oleh banyak goroutine serentak."
          }
        ]
      },
      {
        id: "6-2",
        title: "6.2 Pengenalan GORM & Model Definition",
        summary: "Apa itu GORM, gorm.Model base struct (ID, CreatedAt, UpdatedAt, DeletedAt / Soft Delete), dan AutoMigrate.",
        content: `### 💎 GORM: ORM Populer untuk Go
**GORM** (*Go Object Relational Mapping*) adalah library ORM yang sangat kaya fitur untuk Golang.

#### 🏛️ Definisi Model dengan \`gorm.Model\`:
\`\`\`go
type Product struct {
    gorm.Model           // Menyematkan ID uint, CreatedAt, UpdatedAt, DeletedAt
    KodeProduk string    \`gorm:"type:varchar(50);uniqueIndex"\`
    Nama       string    \`gorm:"size:255;not null"\`
    Harga      float64   \`gorm:"default:0"\`
}
\`\`\`

#### 🔄 Auto Migration:
GORM dapat secara otomatis menyesuaikan skema tabel database dengan struct Go:
\`\`\`go
db.AutoMigrate(&Product{})
\`\`\``,
        codeSnippet: `package main

import (
    "fmt"
    "time"
)

// Simulasi Model GORM
type GormModel struct {
    ID        uint
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt *time.Time // Soft delete pointer
}

type Article struct {
    GormModel
    Judul     string
    Slug      string
    Views     int
}

func main() {
    art := Article{
        GormModel: GormModel{ID: 1, CreatedAt: time.Now()},
        Judul:     "Panduan Lengkap Belajar Golang 2026",
        Slug:      "panduan-lengkap-belajar-golang-2026",
        Views:     1500,
    }

    fmt.Printf("Model ID: %d | Judul: %s | Dibuat: %s\n", art.ID, art.Judul, art.CreatedAt.Format("02 Jan 2006"))
}`,
        exercise: {
          instruction: "Buat struct model `Customer` dengan field `Nama`, `Email`, dan `Saldo`.",
          starterCode: `package main

import "fmt"

type Customer struct {
    ID    uint
    Nama  string
    Email string
    Saldo float64
}

func main() {
    c := Customer{ID: 1, Nama: "Dewi", Email: "dewi@example.com", Saldo: 500000}
    fmt.Printf("Customer #%d: %s (%s) - Saldo: Rp %.0f\n", c.ID, c.Nama, c.Email, c.Saldo)
}`,
          expectedHint: "Definisikan field struct Customer."
        },
        quiz: [
          {
            question: "Apa fungsi dari field `DeletedAt` yang ada di dalam `gorm.Model`?",
            options: [
              "Menghapus data permanen seketika",
              "Mendukung fitur Soft Delete (record tidak langsung dihapus dari disk, melainkan ditandai timestamp hapus)",
              "Menghitung umur data dalam hari",
              "Mencegah user mengedit data"
            ],
            correctAnswer: 1,
            explanation: "Dengan Soft Delete di GORM, saat perintah `Delete` dipanggil, record tidak dihapus dari tabel melainkan kolom `deleted_at` diisi waktu saat itu, sehingga query biasa tidak akan memunculkannya lagi."
          }
        ]
      },
      {
        id: "6-3",
        title: "6.3 GORM CRUD Operations",
        summary: "Create, First/Find, Where, Updates, dan Delete dengan GORM API.",
        content: `### 📝 Operasi CRUD di GORM
GORM menyediakan sintaks method-chaining yang elegan:

#### 1. Create (Insert):
\`\`\`go
user := User{Nama: "Budi", Email: "budi@mail.com"}
db.Create(&user) // user.ID otomatis terisi nilai autoincrement
\`\`\`

#### 2. Read (Query):
\`\`\`go
var user User
db.First(&user, 1) // Cari berdasarkan Primary Key 1
db.Where("email = ?", "budi@mail.com").First(&user)
\`\`\`

#### 3. Update:
\`\`\`go
db.Model(&user).Update("Nama", "Budi Baru")
db.Model(&user).Updates(User{Nama: "Budi", Email: "budi2@mail.com"})
\`\`\`

#### 4. Delete:
\`\`\`go
db.Delete(&user, 1)
\`\`\``,
        codeSnippet: `package main

import "fmt"

// Simulasi hasil query GORM
func main() {
    fmt.Println("--- Simulasi GORM CRUD Operations ---")
    fmt.Println("1. [CREATE] db.Create(&User{Nama: 'Farhan'}) -> INSERT INTO users ...")
    fmt.Println("2. [READ]   db.Where('active = ?', true).Find(&users) -> SELECT * FROM users WHERE active = true")
    fmt.Println("3. [UPDATE] db.Model(&user).Update('Role', 'Admin') -> UPDATE users SET role = 'Admin' ...")
    fmt.Println("4. [DELETE] db.Delete(&user, 10) -> UPDATE users SET deleted_at = NOW() WHERE id = 10")
    fmt.Println("\n✅ Semua operasi CRUD GORM tervalidasi!")
}`,
        exercise: {
          instruction: "Tuliskan simulasi query GORM untuk mencari produk dengan harga di bawah 50.000.",
          starterCode: `package main

import "fmt"

func main() {
    queryPattern := "db.Where(\"harga < ?\", 50000).Find(&produkMurah)"
    fmt.Println("Query GORM:", queryPattern)
}`,
          expectedHint: "db.Where(\"harga < ?\", 50000).Find(&produkMurah)"
        },
        quiz: [
          {
            question: "Mengapa pada GORM query parameterized `db.Where(\"nama = ?\", inputNama)` lebih disarankan daripada string formatting `fmt.Sprintf`?",
            options: [
              "Agar kode lebih panjang",
              "Mencegah celah keamanan SQL Injection",
              "Karena GORM tidak mendukung string formatting",
              "Hanya aturan penulisan style guide"
            ],
            correctAnswer: 1,
            explanation: "Menggunakan placeholder `?` memastikan driver database melakukan sanitasi input dan prepared statement sehingga aman dari serangan SQL Injection."
          }
        ]
      },
      {
        id: "6-4",
        title: "6.4 Relasi Data (One-to-Many & Preloading)",
        summary: "Relasi Has Many, Belongs To, Foreign Key, dan Eager Loading dengan db.Preload().",
        content: `### 🔗 Relasi Data & Preloading
GORM memudahkan relasi antar tabel (One-to-One, One-to-Many, Many-to-Many).

\`\`\`go
type User struct {
    gorm.Model
    Nama     string
    Orders   []Order // Has Many (1 User punya banyak Order)
}

type Order struct {
    gorm.Model
    UserID      uint   // Foreign Key
    TotalHarga  float64
}
\`\`\`

#### 🚀 Eager Loading dengan \`Preload()\`:
Mencegah masalah performa N+1 Query:
\`\`\`go
var users []User
db.Preload("Orders").Find(&users) // Otomatis JOIN / Fetch tabel Orders
\`\`\``,
        codeSnippet: `package main

import "fmt"

type Order struct {
    ID     uint
    Barang string
    Harga  int
}

type Customer struct {
    ID      uint
    Nama    string
    Pesanan []Order // Relasi One-to-Many
}

func main() {
    c := Customer{
        ID:   1,
        Nama: "Rina Kusuma",
        Pesanan: []Order{
            {ID: 101, Barang: "Mechanical Keyboard", Harga: 850000},
            {ID: 102, Barang: "Desk Mat", Harga: 150000},
        },
    }

    fmt.Printf("Customer: %s (Total Pesanan: %d)\n", c.Nama, len(c.Pesanan))
    for i, o := range c.Pesanan {
        fmt.Printf("  %d. %s - Rp %d\n", i+1, o.Barang, o.Harga)
    }
}`,
        exercise: {
          instruction: "Lengkapi relasi One-to-Many pada struct `Kategori` yang memiliki slice dari struct `Artikel`.",
          starterCode: `package main

import "fmt"

type Artikel struct {
    Judul string
}

type Kategori struct {
    Nama    string
    Daftar  []Artikel
}

func main() {
    kat := Kategori{
        Nama: "Pemrograman Golang",
        Daftar: []Artikel{
            {Judul: "Dasar Concurrency"},
            {Judul: "Mastering GORM"},
        },
    }
    fmt.Printf("Kategori: %s memuat %d artikel.\n", kat.Nama, len(kat.Daftar))
}`,
          expectedHint: "Gunakan slice []Artikel pada struct Kategori."
        },
        quiz: [
          {
            question: "Apa fungsi method `db.Preload(\"Relasi\")` pada GORM?",
            options: [
              "Menghapus relasi tabel",
              "Melakukan Eager Loading untuk memuat data dari tabel relasi secara otomatis dan efisien",
              "Mengunci tabel agar tidak bisa diakses user lain",
              "Mereset foreign key menjadi null"
            ],
            correctAnswer: 1,
            explanation: "`Preload` melakukan eager loading data berelasi (seperti memuat data Orders milik User) secara otomatis dalam query yang dioptimasi untuk menghindari N+1 query problem."
          }
        ]
      }
    ]
  }
];

export const CHEATSHEET_CATEGORIES = [
  {
    title: "1. Variabel & Tipe Data",
    snippets: [
      { label: "Short Variable", code: "nama := \"Gopher\"\numur := 25\nisDev := true" },
      { label: "Explicit Variable", code: "var skor float64 = 99.5\nvar status bool" },
      { label: "Constants", code: "const MaxConnections = 100\nconst Pi = 3.14159" },
      { label: "Type Conversion", code: "var a int = 42\nvar b float64 = float64(a)\nvar c string = fmt.Sprint(a)" }
    ]
  },
  {
    title: "2. Struktur Data",
    snippets: [
      { label: "Slice & Append", code: "items := []string{\"A\", \"B\"}\nitems = append(items, \"C\")\nsub := items[1:3]" },
      { label: "Map (Hash Table)", code: "m := make(map[string]int)\nm[\"kunci\"] = 100\nval, exists := m[\"kunci\"]\ndelete(m, \"kunci\")" },
      { label: "Struct", code: "type User struct {\n    ID   int\n    Nama string\n}\nu := User{ID: 1, Nama: \"Alex\"}" }
    ]
  },
  {
    title: "3. Pointer & Method",
    snippets: [
      { label: "Pointer Syntax", code: "var x int = 10\nvar p *int = &x // Ambil alamat\n*p = 20         // Dereference" },
      { label: "Method Receiver", code: "func (u *User) UbahNama(baru string) {\n    u.Nama = baru\n}" },
      { label: "Interface", code: "type Greeter interface {\n    Greet() string\n}" }
    ]
  },
  {
    title: "4. Concurrency (Goroutines & Channels)",
    snippets: [
      { label: "Spawn Goroutine", code: "go func() {\n    fmt.Println(\"Background task\")\n}()" },
      { label: "Channel Communication", code: "ch := make(chan int, 2)\nch <- 42\nhasil := <-ch\nclose(ch)" },
      { label: "Select Statement", code: "select {\ncase msg := <-ch:\n    fmt.Println(msg)\ncase <-time.After(1 * time.Second):\n    fmt.Println(\"Timeout\")\n}" },
      { label: "Sync WaitGroup", code: "var wg sync.WaitGroup\nwg.Add(1)\ngo func() {\n    defer wg.Done()\n    // proses...\n}()\nwg.Wait()" }
    ]
  },
  {
    title: "5. Web & GORM",
    snippets: [
      { label: "HTTP Server", code: "http.HandleFunc(\"GET /ping\", func(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprintln(w, \"pong\")\n})\nhttp.ListenAndServe(\":8080\", nil)" },
      { label: "JSON Encode", code: "w.Header().Set(\"Content-Type\", \"application/json\")\njson.NewEncoder(w).Encode(data)" },
      { label: "GORM CRUD", code: "db.Create(&user)\ndb.First(&user, id)\ndb.Model(&user).Update(\"Nama\", \"Baru\")\ndb.Delete(&user, id)" }
    ]
  }
];
