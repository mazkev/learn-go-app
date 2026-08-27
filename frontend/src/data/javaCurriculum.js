/**
 * Java Curriculum & Interactive Roadmap Modules
 * Kurikulum Lengkap Pemrograman Java Modern & Object-Oriented Programming (OOP)
 */

export const JAVA_MODULES = [
  // ==========================================
  // MODUL 1: Dasar Pemrograman Java & JVM
  // ==========================================
  {
    id: "java-module-1",
    order: 1,
    title: "1. Dasar Pemrograman Java",
    subtitle: "Fondasi Sintaks, JVM, Variabel, Tipe Data & Input/Output",
    description: "Mempelajari filosofi Java (Write Once, Run Anywhere), cara kerja JVM/JDK, variabel, tipe data primitif, dan operator dasar.",
    icon: "Coffee",
    badge: "Java Rookie",
    color: "#f89820",
    xp: 250,
    lessons: [
      {
        id: "j-1-1",
        title: "1.1 Pengenalan Java & Anatomi Program",
        summary: "Memahami struktur file .java, class utama, dan method public static void main().",
        content: `### ☕ Selamat Datang di Dunia Java!
Java adalah salah satu bahasa pemrograman paling populer dan tangguh di dunia, digunakan oleh miliaran perangkat, mulai dari sistem perbankan, backend enterprise skala raksasa, hingga aplikasi Android.

#### 📌 Filosofi Java: "Write Once, Run Anywhere" (WORA)
Kode Java dikompilasi menjadi **Bytecode** (.class) yang dapat dijalankan di sistem operasi mana pun (Windows, Linux, macOS) selama memiliki **Java Virtual Machine (JVM)**.

#### 📌 Struktur Dasar File Java:
1. **\`public class Main\`**: Nama class utama harus sama persis dengan nama file (*Main.java*).
2. **\`public static void main(String[] args)\`**: Titik awal eksekusi program Java (Entrypoint).
3. **\`System.out.println(...)\`**: Perintah standar untuk mencetak teks ke layar.

> 💡 **Karakteristik Java:**
> - Strictly Object-Oriented (Hampir semua kode berada di dalam Class).
> - Statically Typed (Tipe data dicek ketat saat kompilasi).
> - Automatic Memory Management (Garbage Collection).`,
        codeSnippet: `public class Main {
    public static void main(String[] args) {
        // Mencetak teks ucapan selamat datang
        System.out.println("Halo, Calon Master Java!");
        System.out.println("Mari kita mulai perjalanan belajar Java dari nol.");
    }
}`,
        exercise: {
          instruction: "Ubah teks di dalam `System.out.println` agar mencetak namamu dan target belajar Java!",
          starterCode: `public class Main {
    public static void main(String[] args) {
        // Tulis kodemu di sini
        System.out.println("Halo, saya siap menguasai Java & OOP Enterprise!");
    }
}`,
          expectedHint: "Gunakan System.out.println() untuk menampilkan teks ke console."
        },
        quiz: [
          {
            question: "Apa fungsi dari Java Virtual Machine (JVM)?",
            options: [
              "Untuk mengedit file kode Java seperti Notepad",
              "Mengeksekusi Java Bytecode agar program Java dapat berjalan di berbagai sistem operasi",
              "Menghapus virus di komputer secara otomatis",
              "Membuat tampilan desain grafis aplikasi Java"
            ],
            correctAnswer: 1,
            explanation: "JVM bertanggung jawab membaca dan mengeksekusi file Bytecode (.class) menjadi instruksi mesin sesuai OS masing-masing."
          }
        ]
      },
      {
        id: "j-1-2",
        title: "1.2 Variabel & Tipe Data Primitif",
        summary: "Mengenal tipe data angka (int, double), teks (String, char), dan boolean.",
        content: `### 📦 Variabel & Tipe Data di Java
Java adalah bahasa bertipe statis (*Statically-Typed*). Setiap variabel harus dideklarasikan tipe datanya secara jelas.

#### 📌 Tipe Data Primitif Utama:
- **\`int\`**: Bilangan bulat (contoh: \`25\`, \`-10\`, \`1000\`).
- **\`double\`**: Bilangan desimal/koma presisi tinggi (contoh: \`3.14\`, \`85.5\`).
- **\`boolean\`**: Nilai logika kebenaran (\`true\` atau \`false\`).
- **\`char\`**: Satu karakter tunggal menggunakan petik satu (contoh: \`'A'\`, \`'9'\`).
- **\`String\`**: Tipe objek untuk kumpulan teks menggunakan petik dua (contoh: \`"Java"\`).

\`\`\`java
int umur = 20;
double ipk = 3.85;
boolean isLulus = true;
String nama = "Kevin Pratama";
\`\`\``,
        codeSnippet: `public class Main {
    public static void main(String[] args) {
        String nama = "Kevin Pratama";
        int umur = 21;
        double ipk = 3.90;
        boolean statusAktif = true;

        System.out.println("Nama Mahasiswa : " + nama);
        System.out.println("Usia          : " + umur + " tahun");
        System.out.println("IPK Terakhir  : " + ipk);
        System.out.println("Status Aktif  : " + statusAktif);
    }
}`,
        exercise: {
          instruction: "Buat variabel `namaBarang` (String), `harga` (int), dan `diskon` (double), lalu cetak semuanya!",
          starterCode: `public class Main {
    public static void main(String[] args) {
        // Deklarasikan variabelmu di sini:
        String namaBarang = "Laptop Gaming";
        int harga = 15000000;
        double diskon = 10.5;

        System.out.println("Produk: " + namaBarang + " | Harga: Rp " + harga + " | Diskon: " + diskon + "%");
    }
}`,
          expectedHint: "Gunakan tanda '+' untuk menggabungkan teks dan variabel (String Concatenation)."
        },
        quiz: [
          {
            question: "Tipe data manakah yang paling tepat untuk menyimpan angka desimal bernilai 3.14159 di Java?",
            options: ["int", "boolean", "double", "char"],
            correctAnswer: 2,
            explanation: "Tipe data 'double' digunakan untuk menyimpan bilangan pecahan/desimal 64-bit."
          }
        ]
      },
      {
        id: "j-1-3",
        title: "1.3 Operator Aritmatika & Type Casting",
        summary: "Melakukan operasi matematika (+, -, *, /, %) dan konversi tipe data eksplisit.",
        content: `### ➗ Operator & Type Casting di Java
Java menyediakan operator aritmatika standar untuk memproses kalkulasi angka.

#### 📌 Operator Aritmatika:
- **\`+\`** (Penjumlahan), **\`-\`** (Pengurangan), **\`*\`** (Perkalian)
- **\`/\`** (Pembagian), **\`%\`** (Modulo / Sisa Bagi)

#### 📌 Type Casting (Konversi Tipe Data):
Jika Anda membagi dua bilangan integer, hasilnya akan dibulatkan ke bawah (*Integer Division*). Untuk mendapatkan desimal, lakukan casting ke \`double\`:
\`\`\`java
int a = 7;
int b = 2;
double hasil = (double) a / b; // Hasil: 3.5
\`\`\``,
        codeSnippet: `public class Main {
    public static void main(String[] args) {
        int a = 15;
        int b = 4;

        int tambah = a + b;
        int sisaBagi = a % b;
        double bagiDesimal = (double) a / b;

        System.out.println("Penjumlahan   : " + a + " + " + b + " = " + tambah);
        System.out.println("Sisa Bagi (%) : " + a + " % " + b + " = " + sisaBagi);
        System.out.println("Bagi Desimal  : " + a + " / " + b + " = " + bagiDesimal);
    }
}`,
        exercise: {
          instruction: "Hitung luas segitiga dengan rumus `(alas * tinggi) / 2.0` menggunakan casting `double`!",
          starterCode: `public class Main {
    public static void main(String[] args) {
        int alas = 10;
        int tinggi = 7;
        double luas = (double) (alas * tinggi) / 2.0;

        System.out.println("Luas Segitiga: " + luas);
    }
}`,
          expectedHint: "Gunakan `(double)` untuk memastikan hasil perkalian dihitung sebagai angka desimal."
        },
        quiz: [
          {
            question: "Berapakah hasil dari operasi integer Java `int hasil = 9 / 2;`?",
            options: ["4.5", "4", "5", "Error kompilasi"],
            correctAnswer: 1,
            explanation: "Pembagian antara dua int di Java selalu membuang angka di belakang koma (menghasilkan 4)."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 2: Kontrol Alur & Percabangan
  // ==========================================
  {
    id: "java-module-2",
    order: 2,
    title: "2. Kontrol Alur & Logika Keputusan",
    subtitle: "Percabangan If/Else, Switch Modern & Perulangan",
    description: "Menguasai pengambilan keputusan logis dengan if-else, switch modern, perulangan for, while, dan for-each.",
    icon: "GitBranch",
    badge: "Logic Crafter",
    color: "#e76f51",
    xp: 300,
    lessons: [
      {
        id: "j-2-1",
        title: "2.1 Percabangan Logika (if, else if, else)",
        summary: "Membuat alur keputusan berdasarkan kondisi benar (true) atau salah (false).",
        content: `### 🔀 Percabangan di Java
Percabangan digunakan untuk mengeksekusi blok kode tertentu hanya jika suatu kondisi terpenuhi.

#### 📌 Sintaks Percabangan:
\`\`\`java
if (kondisi1) {
    // dijalankan jika kondisi1 true
} else if (kondisi2) {
    // dijalankan jika kondisi2 true
} else {
    // dijalankan jika semua kondisi false
}
\`\`\``,
        codeSnippet: `public class Main {
    public static void main(String[] args) {
        int nilai = 85;

        System.out.println("Nilai Ujian: " + nilai);

        if (nilai >= 85) {
            System.out.println("Predikat: Grade A (Sangat Memuaskan! 🏆)");
        } else if (nilai >= 70) {
            System.out.println("Predikat: Grade B (Bagus, Pertahankan! 👍)");
        } else if (nilai >= 55) {
            System.out.println("Predikat: Grade C (Cukup, Perlu Belajar Lagi ⚠️)");
        } else {
            System.out.println("Predikat: Grade D (Remedial / Tidak Lulus ❌)");
        }
    }
}`,
        exercise: {
          instruction: "Buat pengecekan apakah variabel `angka` merupakan bilangan GENAP atau GANJIL menggunakan operator modulo `%`!",
          starterCode: `public class Main {
    public static void main(String[] args) {
        int angka = 14;

        if (angka % 2 == 0) {
            System.out.println(angka + " adalah bilangan GENAP");
        } else {
            System.out.println(angka + " adalah bilangan GANJIL");
        }
    }
}`,
          expectedHint: "Gunakan kondisi `angka % 2 == 0` untuk mendeteksi bilangan genap."
        },
        quiz: [
          {
            question: "Operator apakah yang digunakan untuk memeriksa kesamaan nilai di Java?",
            options: ["=", "==", "===", "!="],
            correctAnswer: 1,
            explanation: "Tanda '==' digunakan untuk perbandingan kesamaan nilai, sedangkan '=' adalah operator penugasan (assignment)."
          }
        ]
      },
      {
        id: "j-2-2",
        title: "2.2 Percabangan Modern Switch-Case",
        summary: "Menyederhanakan banyak kondisi dengan switch-case ekspresi Java modern.",
        content: `### 🚦 Switch-Case di Java
Jika Anda memiliki banyak pilihan nilai diskrit (seperti nama hari, menu pilihan, atau kode status), \`switch\` jauh lebih rapi dibanding rentetan \`if-else\`.

\`\`\`java
switch (hari) {
    case 1 -> System.out.println("Senin");
    case 2 -> System.out.println("Selasa");
    default -> System.out.println("Hari Lain");
}
\`\`\``,
        codeSnippet: `public class Main {
    public static void main(String[] args) {
        int nomorHari = 3;
        String namaHari;

        switch (nomorHari) {
            case 1:
                namaHari = "Senin";
                break;
            case 2:
                namaHari = "Selasa";
                break;
            case 3:
                namaHari = "Rabu";
                break;
            case 4:
                namaHari = "Kamis";
                break;
            case 5:
                namaHari = "Jumat";
                break;
            default:
                namaHari = "Akhir Pekan (Sabtu/Minggu)";
                break;
        }

        System.out.println("Hari ke-" + nomorHari + " adalah: " + namaHari);
    }
}`,
        exercise: {
          instruction: "Gunakan switch-case untuk mencetak peran pengguna berdasarkan variabel `role` ('admin', 'editor', 'user')!",
          starterCode: `public class Main {
    public static void main(String[] args) {
        String role = "admin";

        switch (role) {
            case "admin":
                System.out.println("Akses Penuh: Administrator Sistem");
                break;
            case "editor":
                System.out.println("Akses Terbatas: Editor Konten");
                break;
            default:
                System.out.println("Akses Standar: Pengguna Biasa");
                break;
        }
    }
}`,
          expectedHint: "Pastikan menambahkan keyword `break;` di akhir setiap case agar tidak terjadi fall-through."
        },
        quiz: [
          {
            question: "Apa fungsi dari keyword 'break' pada blok switch-case klasik?",
            options: [
              "Menghentikan seluruh aplikasi Java",
              "Keluar dari blok switch agar tidak mengeksekusi case berikutnya",
              "Mengulang eksekusi switch dari awal",
              "Menghapus variabel di memori"
            ],
            correctAnswer: 1,
            explanation: "Keyword 'break' menghentikan evaluasi switch setelah case yang cocok selesai dijalankan."
          }
        ]
      },
      {
        id: "j-2-3",
        title: "2.3 Perulangan (For & For-Each Loop)",
        summary: "Mengulang instruksi dengan for loop standar dan for-each pada koleksi data.",
        content: `### 🔄 Perulangan di Java
Perulangan (*Looping*) memungkinkan kita mengeksekusi kode berulang kali secara otomatis.

#### 📌 1. For Loop Standar:
\`\`\`java
for (int i = 1; i <= 5; i++) {
    System.out.println("Hitungan ke-" + i);
}
\`\`\`

#### 📌 2. Enhanced For-Each Loop:
\`\`\`java
String[] buah = {"Apel", "Jeruk", "Mangga"};
for (String b : buah) {
    System.out.println(b);
}
\`\`\``,
        codeSnippet: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. For Loop Standar ===");
        for (int i = 1; i <= 4; i++) {
            System.out.println("Putaran loop ke-" + i);
        }

        System.out.println("\\n=== 2. For-Each pada Array ===");
        String[] bahasa = {"Java", "Golang", "Python", "JavaScript"};
        for (String lang : bahasa) {
            System.out.println("Bahasa pemrograman: " + lang);
        }
    }
}`,
        exercise: {
          instruction: "Buat perulangan for untuk menghitung total penjumlahan angka dari 1 sampai 5!",
          starterCode: `public class Main {
    public static void main(String[] args) {
        int total = 0;
        for (int i = 1; i <= 5; i++) {
            total += i;
        }
        System.out.println("Total penjumlahan 1 s/d 5 adalah: " + total);
    }
}`,
          expectedHint: "Gunakan variabel accumulator `total += i` di dalam perulangan."
        },
        quiz: [
          {
            question: "Berapa kali loop `for (int i = 0; i < 5; i++)` akan dieksekusi?",
            options: ["4 kali", "5 kali", "6 kali", "Tak terhingga"],
            correctAnswer: 1,
            explanation: "Loop berjalan untuk i = 0, 1, 2, 3, 4 (total 5 kali iterasi)."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 3: Struktur Data & Collections
  // ==========================================
  {
    id: "java-module-3",
    order: 3,
    title: "3. Struktur Data & Koleksi Java",
    subtitle: "Array Statis, ArrayList Dinamis & HashMap Key-Value",
    description: "Mempelajari cara menyimpan dan memanipulasi banyak data menggunakan Java Collections Framework.",
    icon: "Layers",
    badge: "Data Structurer",
    color: "#2a9d8f",
    xp: 350,
    lessons: [
      {
        id: "j-3-1",
        title: "3.1 ArrayList Dinamis (List)",
        summary: "Menyimpan data dengan ukuran yang dapat membesar dan mengecil secara otomatis.",
        content: `### 📋 ArrayList di Java
Array biasa di Java memiliki ukuran tetap (*Fixed Size*). Jika Anda membutuhkan daftar yang fleksibel, gunakan **\`ArrayList<T>\`** dari package \`java.util\`.

#### 📌 Method Penting ArrayList:
- **\`.add(item)\`**: Menambahkan data ke daftar.
- **\`.get(index)\`**: Mengambil data pada indeks tertentu.
- **\`.size()\`**: Mengetahui jumlah item dalam daftar.
- **\`.remove(index)\`**: Menghapus item dari daftar.`,
        codeSnippet: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> daftarTugas = new ArrayList<>();

        daftarTugas.add("Belajar Java OOP");
        daftarTugas.add("Mengerjakan Kuis");
        daftarTugas.add("Ngoding REST API");

        System.out.println("Jumlah tugas: " + daftarTugas.size());

        for (int i = 0; i < daftarTugas.size(); i++) {
            System.out.println((i + 1) + ". " + daftarTugas.get(i));
        }
    }
}`,
        exercise: {
          instruction: "Tambahkan satu tugas baru ke dalam `daftarTugas` menggunakan method `.add()`!",
          starterCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> daftar = new ArrayList<>();
        daftar.add("Tugas 1");
        daftar.add("Tugas 2: Belajar Java Collections");

        for (String t : daftar) {
            System.out.println("- " + t);
        }
    }
}`,
          expectedHint: "Gunakan `daftar.add(\"...\")` untuk menambah data baru."
        },
        quiz: [
          {
            question: "Bagaimana cara mengambil elemen pertama pada ArrayList di Java?",
            options: ["list[0]", "list.get(0)", "list.first()", "list.fetch(0)"],
            correctAnswer: 1,
            explanation: "Di Java ArrayList, pengambilan elemen dilakukan melalui method `.get(index)`."
          }
        ]
      },
      {
        id: "j-3-2",
        title: "3.2 Kamus Data Key-Value (HashMap)",
        summary: "Menyimpan data berpasangan (Kunci & Nilai) untuk pencarian instan O(1).",
        content: `### 🗄️ HashMap di Java
\`HashMap<K, V>\` adalah struktur data tabel hash yang menyimpan data dalam bentuk pasangan **Kunci (Key)** dan **Nilai (Value)**.

#### 📌 Method Utama HashMap:
- **\`.put(key, value)\`**: Menyimpan pasangan key-value.
- **\`.get(key)\`**: Mengambil nilai berdasarkan key.
- **\`.containsKey(key)\`**: Mengecek apakah key terdaftar.
- **\`.keySet()\`**: Mendapatkan seluruh daftar key.`,
        codeSnippet: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        // Membuat buku kontak (Key: Nama, Value: No HP)
        HashMap<String, String> kontak = new HashMap<>();

        kontak.put("Budi", "08123456789");
        kontak.put("Siti", "08987654321");
        kontak.put("Andi", "08567890123");

        System.out.println("No HP Budi: " + kontak.get("Budi"));
        System.out.println("Total Kontak: " + kontak.size());

        System.out.println("\\n=== Daftar Semua Kontak ===");
        for (String nama : kontak.keySet()) {
            System.out.println("👤 " + nama + " -> 📞 " + kontak.get(nama));
        }
    }
}`,
        exercise: {
          instruction: "Tambahkan data produk baru 'Laptop' dengan harga 15000000 ke dalam `HashMap<String, Integer>`!",
          starterCode: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> harga = new HashMap<>();
        harga.put("Mouse", 150000);
        harga.put("Laptop", 15000000);

        System.out.println("Harga Laptop: Rp " + harga.get("Laptop"));
    }
}`,
          expectedHint: "Gunakan `harga.put(\"Laptop\", 15000000)`."
        },
        quiz: [
          {
            question: "Apa yang terjadi jika kita memanggil `.put(key, value)` dengan key yang sudah pernah ada di HashMap?",
            options: [
              "Akan terjadi error kompilasi",
              "Nilai lama akan ditimpa (overwrite) dengan nilai baru",
              "Key baru akan ditolak otomatis",
              "Program akan freeze"
            ],
            correctAnswer: 1,
            explanation: "HashMap tidak mengizinkan duplikasi key; pemanggilan put() dengan key yang sama akan memperbarui nilainya."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 4: Object-Oriented Programming (OOP) Dasar
  // ==========================================
  {
    id: "java-module-4",
    order: 4,
    title: "4. Object-Oriented Programming (OOP) Dasar",
    subtitle: "Class, Object, Constructor & Enkapsulasi",
    description: "Jantung utama bahasa Java: memahami konsep Class, Constructor, Hak Akses, dan Method.",
    icon: "Boxes",
    badge: "OOP Architect",
    color: "#9b5de5",
    xp: 450,
    lessons: [
      {
        id: "j-4-1",
        title: "4.1 Class & Object (Cetak Biru & Wujud Nyata)",
        summary: "Mendefinisikan Class sebagai blueprint dan membuat Object instansiasi dengan keyword new.",
        content: `### 🏗️ Class dan Object di Java
OOP (*Object-Oriented Programming*) memodelkan program seperti dunia nyata yang terdiri dari objek-objek.

- **Class**: Cetak biru / rancangan (contoh: Cetak biru Mobil).
- **Object**: Wujud nyata yang dibuat dari class (contoh: Mobil Avanza berwarna Merah).

#### 📌 Anatomi Class:
\`\`\`java
class Mobil {
    String merk;
    int tahun;

    void jalan() {
        System.out.println(merk + " sedang berjalan...");
    }
}
\`\`\``,
        codeSnippet: `class Mobil {
    String merk;
    String warna;
    int kecepatanMaksimal;

    void klakson() {
        System.out.println("🚗 " + merk + " berbunyi: Telolet! Telolet!");
    }

    void infoMobil() {
        System.out.println("Mobil: " + merk + " | Warna: " + warna + " | Top Speed: " + kecepatanMaksimal + " km/jam");
    }
}

public class Main {
    public static void main(String[] args) {
        Mobil mobil1 = new Mobil();
        mobil1.merk = "Tesla Model 3";
        mobil1.warna = "Hitam Metalik";
        mobil1.kecepatanMaksimal = 250;

        mobil1.infoMobil();
        mobil1.klakson();
    }
}`,
        exercise: {
          instruction: "Buat object kedua bernama `mobil2` dengan merk 'Toyota Supra' dan warna 'Merah', lalu panggil `infoMobil()`!",
          starterCode: `class Mobil {
    String merk;
    String warna;

    void infoMobil() {
        System.out.println("Mobil: " + merk + " | Warna: " + warna);
    }
}

public class Main {
    public static void main(String[] args) {
        Mobil mobil1 = new Mobil();
        mobil1.merk = "Avanza";
        mobil1.warna = "Putih";
        mobil1.infoMobil();

        Mobil mobil2 = new Mobil();
        mobil2.merk = "Toyota Supra";
        mobil2.warna = "Merah";
        mobil2.infoMobil();
    }
}`,
          expectedHint: "Gunakan keyword `new Mobil()` untuk membuat object baru."
        },
        quiz: [
          {
            question: "Keyword apa yang digunakan untuk membuat instance Object baru di Java?",
            options: ["create", "make", "new", "init"],
            correctAnswer: 2,
            explanation: "Keyword 'new' digunakan untuk mengalokasikan memori di heap dan memanggil constructor objek."
          }
        ]
      },
      {
        id: "j-4-2",
        title: "4.2 Constructor & Keyword 'this'",
        summary: "Inisialisasi otomatis properti objek saat pertama kali dibuat dengan constructor.",
        content: `### 🔨 Constructor di Java
**Constructor** adalah method khusus yang otomatis dipanggil saat objek dibuat dengan keyword \`new\`. Nama constructor **harus sama persis dengan nama Class** dan tidak memiliki return type.

#### 📌 Keyword \`this\`:
Digunakan untuk membedakan antara variabel milik Class (*field*) dengan parameter method yang memiliki nama sama:
\`\`\`java
class Mahasiswa {
    String nama;

    Mahasiswa(String nama) {
        this.nama = nama; // this.nama merujuk ke field class
    }
}
\`\`\``,
        codeSnippet: `class AkunBank {
    String nomorRekening;
    String pemilik;
    double saldo;

    // Constructor
    AkunBank(String nomorRekening, String pemilik, double saldoAwal) {
        this.nomorRekening = nomorRekening;
        this.pemilik = pemilik;
        this.saldo = saldoAwal;
    }

    void cekSaldo() {
        System.out.println("Rekening: " + nomorRekening + " | Pemilik: " + pemilik + " | Saldo: Rp " + saldo);
    }
}

public class Main {
    public static void main(String[] args) {
        // Membuat akun dengan constructor yang praktis
        AkunBank akun1 = new AkunBank("123-456", "Kevin Pratama", 5000000);
        akun1.cekSaldo();
    }
}`,
        exercise: {
          instruction: "Buat constructor pada class `Buku` yang menerima parameter `judul` dan `penulis`!",
          starterCode: `class Buku {
    String judul;
    String penulis;

    Buku(String judul, String penulis) {
        this.judul = judul;
        this.penulis = penulis;
    }

    void info() {
        System.out.println("Buku: " + judul + " oleh " + penulis);
    }
}

public class Main {
    public static void main(String[] args) {
        Buku b = new Buku("Clean Code", "Robert C. Martin");
        b.info();
    }
}`,
          expectedHint: "Gunakan `this.judul = judul;` di dalam blok constructor."
        },
        quiz: [
          {
            question: "Manakah ciri-ciri yang BENAR dari sebuah Constructor di Java?",
            options: [
              "Harus memiliki tipe kembalian void",
              "Namanya harus sama persis dengan nama Class dan tidak memiliki tipe kembalian",
              "Hanya bisa dipanggil dari dalam method static",
              "Wajib dideklarasikan dengan keyword function"
            ],
            correctAnswer: 1,
            explanation: "Constructor tidak memiliki return type (bahkan bukan void) dan namanya identik dengan Class."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 5: OOP Lanjut (Inheritance & Polymorphism)
  // ==========================================
  {
    id: "java-module-5",
    order: 5,
    title: "5. OOP Lanjut & Abstraksi",
    subtitle: "Inheritance, Polymorphism, Abstract Class & Interface",
    description: "Pewarisan sifat class, overriding method, kontrak interface, dan polimorfisme dinamis.",
    icon: "GitFork",
    badge: "Polymorph Master",
    color: "#f72585",
    xp: 500,
    lessons: [
      {
        id: "j-5-1",
        title: "5.1 Pewarisan Sifat (Inheritance - extends)",
        summary: "Menurunkan atribut dan method dari Parent Class ke Child Class menggunakan keyword extends.",
        content: `### 🧬 Pewarisan Sifat (Inheritance)
Inheritance memungkinkan sebuah class baru (*Child Class / Subclass*) mewarisi seluruh kemampuan dari class yang sudah ada (*Parent Class / Superclass*).

#### 📌 Mengapa Menggunakan Inheritance?
- **Code Reusability**: Tidak perlu menulis ulang kode yang sama berkali-kali.
- **Hierarki Jelas**: Membentuk hubungan "is-a" (contoh: Kucing *is-a* Hewan).`,
        codeSnippet: `class Hewan {
    String nama;

    void makan() {
        System.out.println("🐾 " + nama + " sedang makan...");
    }
}

class Kucing extends Hewan {
    void mengeong() {
        System.out.println("🐱 " + nama + " bersuara: Meoww Meoww!");
    }
}

public class Main {
    public static void main(String[] args) {
        Kucing mimi = new Kucing();
        mimi.nama = "Mimi si Kucing Anggora";

        mimi.makan();
        mimi.mengeong();
    }
}`,
        exercise: {
          instruction: "Buat class `Anjing extends Hewan` dengan method `menggonggong()`!",
          starterCode: `class Hewan {
    String nama;
    void makan() {
        System.out.println(nama + " sedang makan.");
    }
}

class Anjing extends Hewan {
    void menggonggong() {
        System.out.println(nama + " bersuara: Guk Guk!");
    }
}

public class Main {
    public static void main(String[] args) {
        Anjing dog = new Anjing();
        dog.nama = "Buddy";
        dog.makan();
        dog.menggonggong();
    }
}`,
          expectedHint: "Gunakan keyword `extends Hewan` saat membuat class Anjing."
        },
        quiz: [
          {
            question: "Keyword apa yang digunakan oleh Child Class untuk mewarisi Parent Class di Java?",
            options: ["inherits", "implements", "extends", "super"],
            correctAnswer: 2,
            explanation: "Keyword 'extends' digunakan untuk pewarisan class, sedangkan 'implements' untuk interface."
          }
        ]
      },
      {
        id: "j-5-2",
        title: "5.2 Interface (Kontrak Perilaku)",
        summary: "Mendefinisikan kontrak method wajib yang harus diimplementasikan oleh class.",
        content: `### 📜 Interface di Java
**Interface** adalah cetak biru murni dari perilaku. Interface hanya berisi deklarasi nama method tanpa isi (*body*). Class yang menandatangani interface wajib mengimplementasikan seluruh method-nya.

\`\`\`java
interface Pembayaran {
    void bayar(double jumlah);
}

class Qris implements Pembayaran {
    public void bayar(double jumlah) {
        System.out.println("Bayar QRIS: Rp " + jumlah);
    }
}
\`\`\``,
        codeSnippet: `interface Notifikasi {
    void kirimPesan(String pesan);
}

class EmailNotifikasi implements Notifikasi {
    public void kirimPesan(String pesan) {
        System.out.println("📧 Mengirim Email: " + pesan);
    }
}

class WhatsappNotifikasi implements Notifikasi {
    public void kirimPesan(String pesan) {
        System.out.println("💬 Mengirim WhatsApp: " + pesan);
    }
}

public class Main {
    public static void main(String[] args) {
        Notifikasi notif1 = new EmailNotifikasi();
        Notifikasi notif2 = new WhatsappNotifikasi();

        notif1.kirimPesan("Akun Anda berhasil dibuat!");
        notif2.kirimPesan("Kode OTP Anda adalah 8899");
    }
}`,
        exercise: {
          instruction: "Buat class `SmsNotifikasi implements Notifikasi` yang mencetak pesan SMS!",
          starterCode: `interface Notifikasi {
    void kirimPesan(String pesan);
}

class SmsNotifikasi implements Notifikasi {
    public void kirimPesan(String pesan) {
        System.out.println("📱 Mengirim SMS: " + pesan);
    }
}

public class Main {
    public static void main(String[] args) {
        Notifikasi sms = new SmsNotifikasi();
        sms.kirimPesan("Saldo Anda berkurang Rp 50.000");
    }
}`,
          expectedHint: "Gunakan keyword `implements Notifikasi` dan sediakan method `public void kirimPesan(String pesan)`."
        },
        quiz: [
          {
            question: "Keyword apa yang digunakan oleh Class untuk mengadopsi Interface di Java?",
            options: ["extends", "implements", "uses", "inherits"],
            correctAnswer: 1,
            explanation: "Keyword 'implements' digunakan untuk mengimplementasikan interface."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 6: Penanganan Error (Exception Handling)
  // ==========================================
  {
    id: "java-module-6",
    order: 6,
    title: "6. Penanganan Error (Exception Handling)",
    subtitle: "Try-Catch, Finally & Pengamanan Crash di Java",
    description: "Mencegah program crash mendadak akibat input salah atau error runtime menggunakan blok try-catch-finally.",
    icon: "ShieldAlert",
    badge: "Crash Defender",
    color: "#00b4d8",
    xp: 400,
    lessons: [
      {
        id: "j-6-1",
        title: "6.1 Try, Catch & Finally",
        summary: "Menangkap error runtime (seperti pembagian dengan nol atau array index out of bounds).",
        content: `### 🛡️ Exception Handling di Java
Di Java, saat terjadi kesalahan tak terduga (*Exception*), program akan berhenti mendadak (*crash*). Untuk mengamankannya, kita menggunakan blok **\`try-catch\`**.

#### 📌 Struktur Try-Catch-Finally:
- **\`try\`**: Blok kode yang berisiko memicu error.
- **\`catch\`**: Blok penangkap error jika terjadi masalah di dalam try.
- **\`finally\`**: Blok yang **PASTI** dijalankan, baik terjadi error maupun tidak (cocok untuk menutup koneksi database/file).`,
        codeSnippet: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== Memulai Program ===");

        try {
            int angka = 10;
            int pembagi = 0;
            int hasil = angka / pembagi;

            System.out.println("Hasil: " + hasil);
        } catch (ArithmeticException e) {
            System.out.println("⚠️ Terjadi Error: Tidak bisa membagi angka dengan nol!");
            System.out.println("Pesan teknis: " + e.getMessage());
        } finally {
            System.out.println("🔒 Blok Finally: Selalu dieksekusi untuk pembersihan sistem.");
        }

        System.out.println("=== Program Selesai dengan Aman (Tidak Crash!) ===");
    }
}`,
        exercise: {
          instruction: "Bungkus akses array di luar batas dengan blok `try-catch` agar program tidak crash!",
          starterCode: `public class Main {
    public static void main(String[] args) {
        try {
            int[] angka = {1, 2, 3};
            System.out.println(angka[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Tertangkap error: Indeks array melebihi panjang data!");
        }
    }
}`,
          expectedHint: "Gunakan `try { ... } catch (Exception e) { ... }` untuk mengamankan kode."
        },
        quiz: [
          {
            question: "Kapan blok 'finally' di Java akan dieksekusi?",
            options: [
              "Hanya saat terjadi error",
              "Hanya saat tidak ada error sama sekali",
              "Selalu dieksekusi, baik terjadi error maupun tidak",
              "Hanya jika dipanggil manual oleh fungsi main"
            ],
            correctAnswer: 2,
            explanation: "Blok 'finally' dijamin selalu berjalan untuk keperluan pembersihan memori atau penutupan file/koneksi."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 7: Fitur Java Modern (Java 8 s/d 17+)
  // ==========================================
  {
    id: "java-module-7",
    order: 7,
    title: "7. Fitur Java Modern (Java 8 - 17+)",
    subtitle: "Generics, Lambda Expressions & Stream API",
    description: "Menulis kode Java modern yang ringkas, deklaratif, dan aman tipe data (Type-Safe).",
    icon: "Sparkles",
    badge: "Modernist",
    color: "#4361ee",
    xp: 500,
    lessons: [
      {
        id: "j-7-1",
        title: "7.1 Lambda Expressions & Stream API",
        summary: "Memproses koleksi data secara deklaratif dengan filter, map, dan forEach.",
        content: `### ⚡ Stream API & Lambda di Java 8+
Java modern memungkinkan kita memproses daftar data secara fungsional dan elegan tanpa perlu menulis perulangan for bertingkat.

#### 📌 Contoh Stream Pipeline:
\`\`\`java
List<Integer> angka = List.of(1, 2, 3, 4, 5, 6);
angka.stream()
     .filter(n -> n % 2 == 0) // Ambil hanya yang genap
     .map(n -> n * 10)        // Kalikan 10
     .forEach(System.out::println);
\`\`\``,
        codeSnippet: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> nama = new ArrayList<>();
        nama.add("Andi");
        nama.add("Budi");
        nama.add("Alex");
        nama.add("Cindy");

        System.out.println("=== 1. Lambda forEach ===");
        nama.forEach(n -> System.out.println("Halo: " + n));

        System.out.println("\\n=== 2. Stream Filter (Huruf Depan 'A') ===");
        nama.stream()
            .filter(n -> n.startsWith("A"))
            .forEach(n -> System.out.println("Nama berawalan A: " + n));
    }
}`,
        exercise: {
          instruction: "Gunakan `.filter()` pada Stream untuk menampilkan nama yang memiliki panjang karakter > 4 huruf!",
          starterCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("Budi");
        list.add("Alexander");
        list.add("Christine");

        list.stream()
            .filter(nama -> nama.length() > 5)
            .forEach(nama -> System.out.println("Nama panjang: " + nama));
    }
}`,
          expectedHint: "Gunakan lambda `nama -> nama.length() > 5` di dalam method `.filter()`."
        },
        quiz: [
          {
            question: "Apa fungsi method `.filter()` pada Java Stream API?",
            options: [
              "Mengubah tipe data elemen",
              "Menyaring elemen berdasarkan kondisi boolean (Predicate)",
              "Menghapus seluruh isi koleksi",
              "Mengurutkan data secara alfabetis"
            ],
            correctAnswer: 1,
            explanation: "Method filter() mengevaluasi setiap elemen dan hanya meloloskan elemen yang memenuhi kondisi true."
          }
        ]
      }
    ]
  },

  // ==========================================
  // MODUL 8: Multithreading & Ekosistem Enterprise
  // ==========================================
  {
    id: "java-module-8",
    order: 8,
    title: "8. Multithreading & Ekosistem Enterprise",
    subtitle: "Thread, Runnable, Concurrency & Pengenalan Spring Boot",
    description: "Menjalankan proses paralel dengan Thread Java dan memahami arsitektur backend Spring Boot.",
    icon: "Cpu",
    badge: "Enterprise Architect",
    color: "#3a0ca3",
    xp: 600,
    lessons: [
      {
        id: "j-8-1",
        title: "8.1 Multithreading Dasar (Thread & Runnable)",
        summary: "Mengeksekusi banyak tugas secara paralel di latar belakang.",
        content: `### 🧵 Multithreading di Java
Multithreading memungkinkan program Java menjalankan beberapa instruksi sekaligus secara bersamaan di CPU multi-core.

#### 📌 Cara Membuat Thread:
Mengimplementasikan interface \`Runnable\` dan menjalankannya dengan \`Thread.start()\`.`,
        codeSnippet: `class TugasLatarBelakang implements Runnable {
    private String namaTugas;

    TugasLatarBelakang(String nama) {
        this.namaTugas = nama;
    }

    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println("⚙️ [" + namaTugas + "] Memproses data tahap " + i);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Main Thread Dimulai...");

        // Menjalankan thread terpisah secara paralel
        Thread t1 = new Thread(new TugasLatarBelakang("Download-File"));
        Thread t2 = new Thread(new TugasLatarBelakang("Sync-Database"));

        t1.start();
        t2.start();

        System.out.println("Main Thread Selesai.");
    }
}`,
        exercise: {
          instruction: "Buat thread baru bernama `worker` dan jalankan dengan method `.start()`!",
          starterCode: `public class Main {
    public static void main(String[] args) {
        Thread worker = new Thread(() -> {
            System.out.println("🚀 Worker thread berjalan secara asinkron!");
        });

        worker.start();
    }
}`,
          expectedHint: "Panggil method `worker.start()` untuk memicu eksekusi thread."
        },
        quiz: [
          {
            question: "Method manakah yang harus dipanggil untuk memulai eksekusi thread baru di Java?",
            options: ["thread.run()", "thread.start()", "thread.execute()", "thread.launch()"],
            correctAnswer: 1,
            explanation: "Memanggil `.start()` akan membuat thread baru di OS dan otomatis memanggil method `.run()` di dalamnya."
          }
        ]
      }
    ]
  }
];
