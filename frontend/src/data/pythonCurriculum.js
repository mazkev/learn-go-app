/**
 * Python 3 Curriculum & Interactive Roadmap Modules
 * Kurikulum Lengkap Pemrograman Python Modern, Data Structures & OOP
 */

export const PYTHON_MODULES = [
  // ==========================================
  // MODUL 1: Dasar Pemrograman Python 3
  // ==========================================
  {
    id: "python-module-1",
    order: 1,
    title: "1. Dasar Pemrograman Python 3",
    subtitle: "Sintaks Bersih, Indentasi, Variabel & f-Strings",
    description: "Mempelajari filosofi 'The Zen of Python', aturan indentasi, variabel dinamis, tipe data primitif, dan formatting string.",
    icon: "Terminal",
    badge: "Python Rookie",
    color: "#3776AB",
    xp: 250,
    lessons: [
      {
        id: "p-1-1",
        title: "1.1 Pengenalan Python & Anatomi Kode",
        summary: "Memahami sintaks ringkas Python tanpa titik koma dan kekuatan fungsi print().",
        content: `### 🐍 Selamat Datang di Dunia Python!
Python adalah bahasa pemrograman tingkat tinggi paling populer di dunia, dikenal karena **sintaksnya yang sangat bersih, mudah dibaca mirip bahasa Inggris**, dan ekosistem raksasanya di bidang Data Science, AI/Machine Learning, dan Web Development.

#### 📌 Aturan Emas Python: Indentasi!
Di bahasa lain seperti C/Java/Go, blok kode dibatasi oleh kurung kurawal \`{}\`. 
Di Python, **blok kode ditentukan oleh spasi / Indentasi (umumnya 4 spasi)**.

#### 📌 Tanpa Titik Koma (No Semicolon):
Setiap baris baru otomatis mengakhiri sebuah instruksi.

> 💡 **Karakteristik Python:**
> - Dynamically Typed (tipe data ditentukan otomatis).
> - Interpreted Language (dieksekusi baris per baris).
> - Multi-Paradigma (mendukung Prosedural, OOP, dan Fungsional).`,
        codeSnippet: `# Program Python Pertama Anda
print("Halo, Calon Master Python!")
print("Belajar ngoding jadi sangat menyenangkan dan ringkas bersama M3.learn!")`,
        exercise: {
          instruction: "Gunakan fungsi `print()` untuk mencetak nama dan alasanmu belajar Python!",
          starterCode: `# Tulis kodemu di sini
nama = "Alex"
print(f"Halo, nama saya {nama} dan saya siap menguasai Python 3!")`,
          expectedHint: "Gunakan print(...) untuk mencetak teks ke layar."
        },
        quiz: [
          {
            question: "Bagaimana cara Python menentukan sebuah blok kode (seperti isi fungsi atau if)?",
            options: [
              "Menggunakan tanda kurung kurawal { }",
              "Menggunakan indentasi (spasi/tab yang konsisten)",
              "Menggunakan tanda petik dua \" \"",
              "Menggunakan keyword begin dan end"
            ],
            correctAnswer: 1,
            explanation: "Python menggunakan spasi indentasi yang rapi sebagai penanda struktur hierarki blok kode."
          }
        ]
      },
      {
        id: "p-1-2",
        title: "1.2 Variabel, Tipe Data & f-Strings",
        summary: "Deklarasi variabel dinamis dan penggabungan teks modern menggunakan f-Strings.",
        content: `### 📦 Variabel & Tipe Data di Python
Di Python, Anda **tidak perlu mendeklarasikan tipe data** secara eksplisit. Python otomatis mendeteksi tipe data dari nilai yang diberikan (*Dynamic Typing*).

#### 📌 Tipe Data Dasar:
- **\`int\`**: Bilangan bulat (contoh: \`25\`, \`-5\`).
- **\`float\`**: Bilangan desimal (contoh: \`3.14\`, \`85.5\`).
- **\`str\`**: Teks string (\`"Python"\` atau \`'Python'\`).
- **\`bool\`**: Boolean (\`True\` atau \`False\` - perhatikan huruf kapital!).

#### 📌 Formatted Strings (f-Strings):
Cara termudah dan paling efisien untuk menggabungkan teks dan variabel:
\`\`\`python
nama = "Budi"
umur = 20
print(f"Nama: {nama}, Umur: {umur} tahun")
\`\`\``,
        codeSnippet: `# Variabel Dinamis
nama_produk = "MacBook Air M3"
harga = 18500000
diskon = 0.10 # 10%
is_tersedia = True

# Kalkulasi
total_bayar = harga - (harga * diskon)

# Output dengan f-Strings modern
print(f"Produk       : {nama_produk}")
print(f"Harga Asli   : Rp {harga:,}")
print(f"Total Bayar  : Rp {int(total_bayar):,}")
print(f"Status Ready : {is_tersedia}")`,
        exercise: {
          instruction: "Buat variabel `nama`, `asal_kota`, dan `tahun_lahir`, lalu cetak perkenalan diri dengan f-string!",
          starterCode: `nama = "Kevin"
asal_kota = "Jakarta"
tahun_lahir = 2003
umur = 2026 - tahun_lahir

print(f"Halo! Saya {nama} dari {asal_kota}, berusia {umur} tahun.")`,
          expectedHint: "Gunakan format `f\"Teks {variabel}\"`."
        },
        quiz: [
          {
            question: "Manakah penulisan nilai boolean yang BENAR di Python?",
            options: ["true", "TRUE", "True", "boolean(true)"],
            correctAnswer: 2,
            explanation: "Di Python, nilai boolean wajib diawali huruf kapital: `True` dan `False`."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 2: Operator & Logika Percabangan
  // ==========================================
  {
    id: "python-module-2",
    order: 2,
    title: "2. Percabangan & Logika Keputusan",
    subtitle: "If, Elif, Else, Operator Logika and / or / not",
    description: "Menguasai pengambilan keputusan logis, perbandingan angka, dan kondisional bersarang.",
    icon: "GitBranch",
    badge: "Logic Crafter",
    color: "#4B8BBE",
    xp: 300,
    lessons: [
      {
        id: "p-2-1",
        title: "2.1 Percabangan (if, elif, else)",
        summary: "Membuat alur keputusan menggunakan if, elif, dan else dengan sintaks ringkas.",
        content: `### 🔀 Percabangan di Python
Python menggunakan kata kunci **\`if\`**, **\`elif\`** (*singkatan dari else-if*), dan **\`else\`** diakhiri tanda titik dua **\`:\`**.

\`\`\`python
if kondisi_1:
    # kode dijalankan jika kondisi_1 True
elif kondisi_2:
    # kode dijalankan jika kondisi_2 True
else:
    # kode dijalankan jika semua kondisi False
\`\`\``,
        codeSnippet: `nilai_ujian = 88

print(f"Nilai Ujian: {nilai_ujian}")

if nilai_ujian >= 85:
    print("Predikat: Grade A (Sangat Memuaskan! 🏆)")
elif nilai_ujian >= 70:
    print("Predikat: Grade B (Bagus, Pertahankan! 👍)")
elif nilai_ujian >= 55:
    print("Predikat: Grade C (Cukup ⚠️)")
else:
    print("Predikat: Grade D (Remedial ❌)")`,
        exercise: {
          instruction: "Buat pengecekan apakah variabel `angka` merupakan bilangan GENAP atau GANJIL menggunakan operator modulo `%`!",
          starterCode: `angka = 14

if angka % 2 == 0:
    print(f"{angka} adalah bilangan GENAP")
else:
    print(f"{angka} adalah bilangan GANJIL")`,
          expectedHint: "Gunakan kondisi `angka % 2 == 0`."
        },
        quiz: [
          {
            question: "Kata kunci apakah yang digunakan Python untuk kondisi 'else if'?",
            options: ["else if", "elseif", "elif", "else_if"],
            correctAnswer: 2,
            explanation: "Python menggunakan kata kunci `elif` yang lebih ringkas."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 3: Struktur Data Inti Python
  // ==========================================
  {
    id: "python-module-3",
    order: 3,
    title: "3. Struktur Data Inti Python",
    subtitle: "List, Dictionary, Tuple, Set & Comprehension",
    description: "Mempelajari 4 struktur data bawaan Python yang sangat fleksibel dan bertenaga.",
    icon: "Layers",
    badge: "Data Structurer",
    color: "#306998",
    xp: 350,
    lessons: [
      {
        id: "p-3-1",
        title: "3.1 List & Slicing",
        summary: "Menyimpan kumpulan data terurut yang dapat diubah (mutable) dan teknik slicing.",
        content: `### 📋 List di Python
**List** adalah kumpulan data terurut yang sangat fleksibel. List dibuat menggunakan kurung siku \`[]\`.

#### 📌 Method Populer List:
- **\`.append(item)\`**: Menambah elemen ke akhir list.
- **\`.pop()\`**: Mengambil dan menghapus elemen terakhir.
- **\`.insert(index, item)\`**: Menyisipkan elemen pada posisi tertentu.
- **\`len(list)\`**: Menghitung jumlah elemen.

#### 📌 List Slicing \`[start:stop:step]\`:
\`\`\`python
angka = [0, 1, 2, 3, 4, 5]
sub = angka[1:4] # Mengambil indeks 1 s/d 3 -> [1, 2, 3]
\`\`\``,
        codeSnippet: `# Membuat List
buah = ["Apel", "Mangga", "Jeruk", "Pisang"]

# Menambahkan item baru
buah.append("Anggur")

print("Daftar Buah:", buah)
print("Buah Pertama :", buah[0])
print("Buah Terakhir:", buah[-1]) # Indeks negatif membaca dari belakang!
print("Slicing 2 item pertama:", buah[:2])`,
        exercise: {
          instruction: "Tambahkan buah 'Durian' ke dalam list `buah` dan cetak item terakhir menggunakan indeks `-1`!",
          starterCode: `buah = ["Apel", "Jeruk", "Melon"]
buah.append("Durian")

print("Item terakhir:", buah[-1])`,
          expectedHint: "Gunakan `buah.append(\"Durian\")` dan `buah[-1]`."
        },
        quiz: [
          {
            question: "Apa arti indeks negatif `list[-1]` di Python?",
            options: [
              "Menghapus elemen pertama",
              "Mengakses elemen terakhir pada list",
              "Menghasilkan error IndexError",
              "Membalikkan urutan seluruh list"
            ],
            correctAnswer: 1,
            explanation: "Di Python, indeks -1 adalah shortcut elegan untuk mengambil elemen paling belakang."
          }
        ]
      },
      {
        id: "p-3-2",
        title: "3.2 Dictionary (Kamus Key-Value)",
        summary: "Menyimpan data berpasangan Kunci & Nilai seperti format JSON.",
        content: `### 🗄️ Dictionary di Python
**Dictionary** (\`dict\`) menyimpan data dalam bentuk pasangan **Key: Value** menggunakan kurung kurawal \`{}\`.

\`\`\`python
user = {
    "nama": "Kevin",
    "role": "Backend Engineer",
    "level": 5
}
\`\`\``,
        codeSnippet: `# Membuat Dictionary
kontak = {
    "Budi": "08123456789",
    "Siti": "08987654321",
    "Andi": "08567890123"
}

# Menambah kontak baru
kontak["Dewi"] = "08771122334"

print("No HP Budi:", kontak["Budi"])
print("Total Kontak:", len(kontak))

print("\\n=== Semua Kontak ===")
for nama, no_hp in kontak.items():
    print(f"👤 {nama} -> 📞 {no_hp}")`,
        exercise: {
          instruction: "Tambahkan key `'email'` dengan nilai `'budi@mail.com'` ke dictionary `profil`!",
          starterCode: `profil = {
    "nama": "Budi Santoso",
    "pekerjaan": "Data Scientist"
}

profil["email"] = "budi@mail.com"
print("Profil Lengkap:", profil)`,
          expectedHint: "Gunakan `profil[\"email\"] = \"budi@mail.com\"`."
        },
        quiz: [
          {
            question: "Bagaimana cara mengambil seluruh pasangan key-value dari sebuah dictionary di Python?",
            options: ["dict.all()", "dict.items()", "dict.pairs()", "dict.entries()"],
            correctAnswer: 1,
            explanation: "Method `.items()` mengembalikan pasangan (key, value) yang siap di-loop."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 4: Perulangan (For & While)
  // ==========================================
  {
    id: "python-module-4",
    order: 4,
    title: "4. Perulangan (For & While Loop)",
    subtitle: "For in, Range, While, dan List Comprehension",
    description: "Mengulang instruksi dengan for loop, fungsi range(), enumerate(), dan list comprehension yang elegan.",
    icon: "Repeat",
    badge: "Loop Master",
    color: "#FFD43B",
    xp: 300,
    lessons: [
      {
        id: "p-4-1",
        title: "4.1 For Loop & Fungsi range()",
        summary: "Mengulang data pada koleksi dan membuat deret angka dengan range().",
        content: `### 🔄 For Loop di Python
For loop di Python sangat intuitif dan langsung membaca elemen dari koleksi (*For-Each by default*).

#### 📌 Fungsi \`range(start, stop, step)\`:
- **\`range(5)\`**: Angka 0, 1, 2, 3, 4.
- **\`range(1, 6)\`**: Angka 1, 2, 3, 4, 5.
- **\`range(1, 10, 2)\`**: Angka ganjil 1, 3, 5, 7, 9.`,
        codeSnippet: `print("=== 1. For Loop dengan range() ===")
for i in range(1, 5):
    print(f"Putaran ke-{i}")

print("\\n=== 2. For Loop pada List ===")
bahasa = ["Python", "Golang", "Java", "JavaScript"]
for lang in bahasa:
    print(f"Saya sedang belajar {lang}")`,
        exercise: {
          instruction: "Buat loop untuk menghitung jumlah total angka dari 1 sampai 5 menggunakan `range(1, 6)`!",
          starterCode: `total = 0
for i in range(1, 6):
    total += i

print(f"Total penjumlahan 1 s/d 5 adalah: {total}")`,
          expectedHint: "Gunakan `range(1, 6)` dan `total += i`."
        },
        quiz: [
          {
            question: "Berapakah angka yang dihasilkan oleh `list(range(3))` di Python?",
            options: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "[1, 2]"],
            correctAnswer: 1,
            explanation: "`range(3)` menghasilkan 3 angka dimulai dari indeks 0: [0, 1, 2]."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 5: Fungsi & Modul (Functions)
  // ==========================================
  {
    id: "python-module-5",
    order: 5,
    title: "5. Fungsi & Parameter (Functions)",
    subtitle: "Def, Return, Default Args, *args, **kwargs & Lambda",
    description: "Membungkus logika modular ke dalam fungsi, parameter dinamis, dan fungsi anonim lambda.",
    icon: "Code",
    badge: "Function Crafter",
    color: "#64B5F6",
    xp: 400,
    lessons: [
      {
        id: "p-5-1",
        title: "5.1 Mendefinisikan Fungsi (def)",
        summary: "Membuat fungsi dengan kata kunci def dan mengembalikan hasil dengan return.",
        content: `### ⚙️ Fungsi di Python
Fungsi didefinisikan menggunakan kata kunci **\`def\`** diikuti nama fungsi dan tanda kurung \`()\`.

\`\`\`python
def hitung_luas_persegi(sisi):
    return sisi * sisi
\`\`\``,
        codeSnippet: `def hitung_diskon(harga, persen_diskon=10):
    """Menghitung harga setelah diskon (default diskon 10%)"""
    potongan = harga * (persen_diskon / 100)
    return harga - potongan

# Memanggil fungsi
harga_awal = 1000000
bayar_1 = hitung_diskon(harga_awal)        # Diskon default 10%
bayar_2 = hitung_diskon(harga_awal, 25)    # Diskon kustom 25%

print(f"Harga Awal : Rp {harga_awal:,}")
print(f"Diskon 10% : Rp {int(bayar_1):,}")
print(f"Diskon 25% : Rp {int(bayar_2):,}")`,
        exercise: {
          instruction: "Buat fungsi `sapa(nama)` yang mengembalikan string `'Halo, {nama}! Selamat datang di Python.'`!",
          starterCode: `def sapa(nama):
    return f"Halo, {nama}! Selamat datang di Python."

pesan = sapa("Budi")
print(pesan)`,
          expectedHint: "Gunakan kata kunci `def sapa(nama):` dan `return`."
        },
        quiz: [
          {
            question: "Kata kunci apa yang digunakan untuk membuat fungsi di Python?",
            options: ["function", "func", "def", "fn"],
            correctAnswer: 2,
            explanation: "Python menggunakan kata kunci `def` (kependekan dari define)."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 6: Object-Oriented Programming (OOP)
  // ==========================================
  {
    id: "python-module-6",
    order: 6,
    title: "6. Pemrograman Berorientasi Objek (OOP)",
    subtitle: "Class, Object, __init__, self & Inheritance",
    description: "Membangun sistem modular berbasis objek dengan konstruktor __init__, parameter self, dan pewarisan class.",
    icon: "Boxes",
    badge: "OOP Architect",
    color: "#AB47BC",
    xp: 450,
    lessons: [
      {
        id: "p-6-1",
        title: "6.1 Class, Objek & Method __init__",
        summary: "Mendefinisikan class cetak biru dan inisialisasi properti dengan constructor __init__.",
        content: `### 🏗️ Class dan Objek di Python
Python adalah bahasa berorientasi objek murni.

#### 📌 Komponen Utama:
- **\`class\`**: Cetak biru objek.
- **\`__init__(self, ...)\`**: Konstruktor yang otomatis dipanggil saat objek dibuat.
- **\`self\`**: Merujuk ke objek itu sendiri (mirip \`this\` di Java/JS).`,
        codeSnippet: `class Mobil:
    def __init__(self, merk, warna, top_speed):
        self.merk = merk
        self.warna = warna
        self.top_speed = top_speed

    def klakson(self):
        print(f"🚗 {self.merk} berbunyi: Telolet! Telolet!")

    def info(self):
        print(f"Mobil: {self.merk} | Warna: {self.warna} | Top Speed: {self.top_speed} km/jam")

# Instansiasi objek
mobil1 = Mobil("Tesla Model 3", "Hitam", 250)
mobil1.info()
mobil1.klakson()`,
        exercise: {
          instruction: "Buat objek `mobil2` dengan merk 'Toyota Supra' dan warna 'Merah', lalu panggil method `info()`!",
          starterCode: `class Mobil:
    def __init__(self, merk, warna):
        self.merk = merk
        self.warna = warna

    def info(self):
        print(f"Mobil: {self.merk} | Warna: {self.warna}")

mobil1 = Mobil("Avanza", "Putih")
mobil1.info()

# Buat mobil2 di sini:
mobil2 = Mobil("Toyota Supra", "Merah")
mobil2.info()`,
          expectedHint: "Gunakan `mobil2 = Mobil(\"Toyota Supra\", \"Merah\")`."
        },
        quiz: [
          {
            question: "Apa fungsi parameter 'self' pada method di dalam class Python?",
            options: [
              "Hanya hiasan penulisan sintaks",
              "Merujuk ke instance objek yang sedang memanggil method tersebut",
              "Mengubah fungsi menjadi variabel global",
              "Menghapus memori objek secara otomatis"
            ],
            correctAnswer: 1,
            explanation: "`self` adalah referensi eksplisit ke objek spesifik yang sedang dieksekusi."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 7: Penanganan Error & File I/O
  // ==========================================
  {
    id: "python-module-7",
    order: 7,
    title: "7. Penanganan Error (Exception Handling)",
    subtitle: "Try, Except, Finally, Raise & Context Manager",
    description: "Mencegah crash aplikasi saat runtime dan mengamankan eksekusi data.",
    icon: "ShieldAlert",
    badge: "Crash Defender",
    color: "#EF5350",
    xp: 400,
    lessons: [
      {
        id: "p-7-1",
        title: "7.1 Blok Try-Except",
        summary: "Menangkap error tak terduga (seperti ZeroDivisionError atau ValueError).",
        content: `### 🛡️ Try-Except di Python
Gunakan blok **\`try-except\`** untuk menangkap exception agar program tidak berhenti mendadak (*crash*).

\`\`\`python
try:
    angka = int("bukan_angka")
except ValueError as e:
    print(f"Terjadi error: {e}")
\`\`\``,
        codeSnippet: `print("=== Memulai Program ===")

try:
    angka = 100
    pembagi = 0
    hasil = angka / pembagi
    print(f"Hasil: {hasil}")
except ZeroDivisionError as err:
    print(f"⚠️ Error Tertangkap: Tidak bisa membagi angka dengan nol! ({err})")
finally:
    print("🔒 Blok Finally: Selalu dieksekusi untuk pembersihan sistem.")

print("=== Program Selesai dengan Aman (Tidak Crash!) ===")`,
        exercise: {
          instruction: "Bungkus konversi string ke integer dengan `try-except ValueError` agar program tidak crash!",
          starterCode: `try:
    nilai = int("123abc")
    print(nilai)
except ValueError:
    print("Error: Teks tidak dapat diubah menjadi angka integer!")`,
          expectedHint: "Gunakan `try: ... except ValueError: ...`."
        },
        quiz: [
          {
            question: "Kata kunci apa yang digunakan Python untuk menangkap error pada blok try?",
            options: ["catch", "except", "trap", "handle"],
            correctAnswer: 1,
            explanation: "Python menggunakan kata kunci `except` (bukan `catch` seperti di Java/JS)."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 8: Ekosistem Python Modern & Web APIs
  // ==========================================
  {
    id: "python-module-8",
    order: 8,
    title: "8. Ekosistem Python Modern & Web APIs",
    subtitle: "PIP, Virtual Environment, FastAPI & Pandas Intro",
    description: "Mengenal arsitektur backend Python modern (FastAPI) dan manipulasi data analitik.",
    icon: "Rocket",
    badge: "Python Pro",
    color: "#26A69A",
    xp: 500,
    lessons: [
      {
        id: "p-8-1",
        title: "8.1 Backend REST API Modern (FastAPI Concept)",
        summary: "Membuat endpoint REST API asinkron berkecepatan tinggi dengan FastAPI.",
        content: `### ⚡ FastAPI: Backend Python Modern
**FastAPI** adalah framework web Python nomor 1 modern yang sangat cepat, berbasis type-hints Python 3.6+, dan mendukung asynchronous (*async/await*).

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/v1/users/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id, "status": "active"}
\`\`\``,
        codeSnippet: `# Simulasi Pola FastAPI Endpoint di Python
class AppFastAPI:
    def get(self, path):
        return f"GET {path} -> 200 OK: {{'status': 'Online', 'engine': 'FastAPI 3.12+'}}"

    def post(self, path, payload):
        return f"POST {path} -> 201 Created: Data tersimpan: {payload}"

# Testing Endpoint API
api = AppFastAPI()
print(api.get("/api/health"))
print(api.post("/api/users", {"nama": "Kevin", "role": "Developer"}))`,
        exercise: {
          instruction: "Buat dictionary response API `{'status': 200, 'message': 'Success'}` dan cetak outputnya!",
          starterCode: `response = {
    "status": 200,
    "message": "Data berhasil dimuat dari server",
    "data": ["Item 1", "Item 2"]
}

print("API Response:", response)`,
          expectedHint: "Definisikan dictionary response dan cetak ke layar."
        },
        quiz: [
          {
            question: "Apa tool package manager bawaan yang digunakan untuk menginstal library di Python?",
            options: ["npm", "pip", "cargo", "maven"],
            correctAnswer: 1,
            explanation: "`pip` (Pip Installs Packages) adalah package manager resmi standar Python."
          }
        ]
      }
    ]
  }
];
