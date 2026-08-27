/**
 * Go Code Explainer Engine ("Bedah Kode Baris per Baris")
 * Menganalisis sintaks kode Go secara mendalam dan menghasilkan penjelasan
 * terstruktur baris demi baris dalam bahasa Indonesia yang mudah dipahami pemula.
 */

export function analyzeGoCodeAnatomy(rawCode = "") {
  const lines = (rawCode || "").split("\n");
  const breakdown = [];

  let inImportBlock = false;
  let inStructBlock = false;
  let inInterfaceBlock = false;
  let currentBlockName = "";

  lines.forEach((rawLine, index) => {
    const lineNum = index + 1;
    const trimmed = rawLine.trim();

    // Baris kosong
    if (!trimmed) {
      return;
    }

    // Komentar baris tunggal
    if (trimmed.startsWith("//")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Komentar",
        badgeColor: "text-slate-500 bg-slate-500/10 border-slate-500/30",
        title: "Komentar Dokumentasi Kode",
        summary: trimmed.replace(/^\/\/\s*/, ""),
        details: "Teks ini diabaikan oleh compiler dan hanya berfungsi sebagai catatan penjelasan bagi programmer.",
      });
      return;
    }

    // 1. Package Declaration
    if (trimmed.startsWith("package ")) {
      const pkgName = trimmed.replace("package ", "").trim();
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Struktur Dasar",
        badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/30",
        title: `Deklarasi Package: '${pkgName}'`,
        summary: `Menentukan modul kepemilikan file ini sebagai package '${pkgName}'.`,
        details: pkgName === "main"
          ? "Package 'main' menandakan bahwa file ini adalah titik masuk utama (Entrypoint) yang akan dikompilasi menjadi aplikasi mandiri."
          : `Package '${pkgName}' adalah pustaka/library yang dapat di-import oleh file Go lainnya.`,
      });
      return;
    }

    // 2. Import Single Line
    if (trimmed.startsWith("import ") && trimmed.includes('"')) {
      const pkg = trimmed.match(/"([^"]+)"/)?.[1] || "";
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Import Library",
        badgeColor: "text-purple-500 bg-purple-500/10 border-purple-500/30",
        title: `Mengimpor Package '${pkg}'`,
        summary: explainPackagePurpose(pkg),
        details: `Package '${pkg}' dimasukkan agar fungsinya dapat dipanggil di dalam file ini.`,
      });
      return;
    }

    // 3. Import Block Start
    if (trimmed.startsWith("import (")) {
      inImportBlock = true;
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Import Library",
        badgeColor: "text-purple-500 bg-purple-500/10 border-purple-500/30",
        title: "Membuka Blok Import Multi-Package",
        summary: "Mengimpor beberapa pustaka standar atau library eksternal sekaligus.",
        details: "Format tanda kurung kurawal 'import (...)' digunakan agar impor banyak package terlihat rapi.",
      });
      return;
    }

    // Import Block Content
    if (inImportBlock) {
      if (trimmed === ")") {
        inImportBlock = false;
        return;
      }
      const pkg = trimmed.match(/"([^"]+)"/)?.[1] || trimmed.replace(/"/g, "");
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Import Library",
        badgeColor: "text-purple-500 bg-purple-500/10 border-purple-500/30",
        title: `Package: '${pkg}'`,
        summary: explainPackagePurpose(pkg),
        details: `Menyediakan fungsi-fungsi pustaka standar '${pkg}'.`,
      });
      return;
    }

    // 4. Struct Declaration Start
    if (trimmed.match(/^type\s+(\w+)\s+struct\s*\{/)) {
      const structName = trimmed.match(/^type\s+(\w+)\s+struct/)[1];
      inStructBlock = true;
      currentBlockName = structName;
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Struktur Data (Struct)",
        badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
        title: `Mendefinisikan Struct: '${structName}'`,
        summary: `Membuat cetak biru (blueprint) objek data bernama '${structName}'.`,
        details: "Struct di Go mirip seperti 'Class' pada bahasa OOP lain, digunakan untuk mengelompokkan berbagai properti yang saling berhubungan.",
      });
      return;
    }

    // 5. Interface Declaration Start
    if (trimmed.match(/^type\s+(\w+)\s+interface\s*\{/)) {
      const ifaceName = trimmed.match(/^type\s+(\w+)\s+interface/)[1];
      inInterfaceBlock = true;
      currentBlockName = ifaceName;
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Kontrak Perilaku (Interface)",
        badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
        title: `Mendefinisikan Interface: '${ifaceName}'`,
        summary: `Membuat kontrak perilaku (daftar method wajib) bernama '${ifaceName}'.`,
        details: "Interface di Go bersifat implisit (Duck Typing): tipe data apa pun yang memiliki method-method ini otomatis dianggap memenuhi interface tersebut.",
      });
      return;
    }

    // Tutup Struct atau Interface
    if ((inStructBlock || inInterfaceBlock) && trimmed === "}") {
      inStructBlock = false;
      inInterfaceBlock = false;
      return;
    }

    // 6. Function main()
    if (trimmed.startsWith("func main()")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Fungsi Utama",
        badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/30",
        title: "Pintu Masuk Utama: func main()",
        summary: "Titik awal di mana sistem operasi mulai mengeksekusi baris kode aplikasi.",
        details: "Fungsi main() tidak menerima parameter dan tidak mengembalikan nilai. Semua alur program bermula dari sini.",
      });
      return;
    }

    // 7. Custom Function Declaration
    const funcMatch = trimmed.match(/^func\s+(\w+)\s*\((.*?)\)\s*([^{]*)/);
    if (funcMatch) {
      const fnName = funcMatch[1];
      const params = funcMatch[2] || "tanpa parameter";
      const returns = funcMatch[3].trim() || "tanpa return value";
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Fungsi & Method",
        badgeColor: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30",
        title: `Deklarasi Fungsi: ${fnName}()`,
        summary: `Menerima parameter (${params}) dan mengembalikan (${returns}).`,
        details: "Fungsi membungkus potongan logika agar dapat dipanggil berkali-kali secara efisien dan rapi.",
      });
      return;
    }

    // 8. Goroutine (go keyword)
    if (trimmed.startsWith("go ")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Konkurensi (Goroutine)",
        badgeColor: "text-orange-500 bg-orange-500/10 border-orange-500/30",
        title: "Menjalankan Goroutine (Thread Asinkron)",
        summary: "Mengeksekusi fungsi di latar belakang (background) tanpa menahan alur baris berikutnya.",
        details: "Goroutine adalah 'Green Thread' ultra-ringan khas Go yang hanya memakan memori ~2 KB saat pertama dibuat.",
      });
      return;
    }

    // 9. Defer Statement
    if (trimmed.startsWith("defer ")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Manajemen Eksekusi",
        badgeColor: "text-pink-500 bg-pink-500/10 border-pink-500/30",
        title: "Eksekusi Tertunda (defer)",
        summary: "Menunda eksekusi perintah ini sampai fungsi pembungkusnya selesai berjalan.",
        details: "Sangat berguna untuk operasi pembersihan sumber daya (seperti menutup file 'file.Close()', melepas kunci mutex, atau menutup koneksi database).",
      });
      return;
    }

    // 10. Make Channel / Map / Slice
    if (trimmed.includes("make(chan ")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Konkurensi (Channel)",
        badgeColor: "text-indigo-500 bg-indigo-500/10 border-indigo-500/30",
        title: "Membuat Channel Komunikasi Goroutine",
        summary: "Menyediakan pipa aliran data aman antar goroutine yang berjalan bersamaan.",
        details: "Channel dapat berupa Unbuffered (otomatis blocking sampai ada penerima) atau Buffered dengan kapasitas tertentu.",
      });
      return;
    }

    if (trimmed.includes("make(map[")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Struktur Data (Map)",
        badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
        title: "Inisialisasi Hash Map (Key-Value)",
        summary: "Mengalokasikan tabel hash untuk pencarian data berkecepatan O(1).",
        details: "Fungsi make(map[K]V) menyiapkan memori agar map siap diisi tanpa memicu panic nil map.",
      });
      return;
    }

    // 11. Error Handling (if err != nil)
    if (trimmed.includes("if err != nil")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Error Handling",
        badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
        title: "Pemeriksaan Error Idiomatis Go",
        summary: "Mengecek apakah operasi sebelumnya menghasilkan error atau berjalan sukses.",
        details: "Go tidak menggunakan mekanisme 'try-catch'. Semua potensi error dikembalikan secara eksplisit sebagai nilai nilai dan wajib ditangani langsung.",
      });
      return;
    }

    // 12. Short Variable Declaration (:=)
    if (trimmed.includes(":=") && !trimmed.startsWith("for ")) {
      const varName = trimmed.split(":=")[0].trim();
      const valExpr = trimmed.split(":=")[1]?.replace(/;$/, "").trim() || "";
      const isPointer = valExpr.startsWith("&");

      breakdown.push({
        lineNum,
        code: rawLine,
        category: isPointer ? "Pointer & Memori" : "Variabel",
        badgeColor: isPointer ? "text-cyan-500 bg-cyan-500/10 border-cyan-500/30" : "text-blue-500 bg-blue-500/10 border-blue-500/30",
        title: `Deklarasi Variabel Singkat: '${varName}'`,
        summary: isPointer
          ? `Mengambil alamat memori objek (&) dan menyimpannya ke variabel pointer '${varName}'.`
          : `Membuat variabel '${varName}' dengan tipe data yang dideteksi otomatis oleh Go.`,
        details: `Operator ':=' hanya digunakan pertama kali saat variabel dibuat. Nilai awalnya adalah: ${valExpr}`,
      });
      return;
    }

    // 13. fmt.Println / fmt.Printf
    if (trimmed.includes("fmt.Println(")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Input / Output (Terminal)",
        badgeColor: "text-teal-500 bg-teal-500/10 border-teal-500/30",
        title: "Mencetak Teks ke Terminal (fmt.Println)",
        summary: "Menampilkan teks atau variabel ke layar dan otomatis menambahkan baris baru di akhir.",
        details: "Fungsi dari package 'fmt' untuk mencetak data dengan format standar.",
      });
      return;
    }

    if (trimmed.includes("fmt.Printf(")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Input / Output (Terminal)",
        badgeColor: "text-teal-500 bg-teal-500/10 border-teal-500/30",
        title: "Mencetak Teks Berformat (fmt.Printf)",
        summary: "Menggabungkan nilai variabel ke dalam format teks menggunakan placeholder (%s, %d, %v).",
        details: "%s untuk string, %d untuk angka integer, %f untuk angka desimal, dan %v untuk format umum bawaan Go.",
      });
      return;
    }

    // 14. For Range Loop
    if (trimmed.startsWith("for ") && trimmed.includes("range")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Perulangan (Loop)",
        badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
        title: "Perulangan Koleksi Data (for ... range)",
        summary: "Mengunjungi setiap elemen di dalam slice, array, atau map secara berurutan.",
        details: "Pada slice mengembalikan (indeks, nilai), sedangkan pada map mengembalikan (key, value).",
      });
      return;
    }

    // 15. For Standard Loop
    if (trimmed.startsWith("for ")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Perulangan (Loop)",
        badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
        title: "Perulangan Logika (for loop)",
        summary: "Menjalankan blok kode berulang kali selama kondisi terpenuhi.",
        details: "Go hanya memiliki satu kata kunci perulangan yaitu 'for' (dapat bertindak sebagai for standar, while-loop, atau infinite loop).",
      });
      return;
    }

    // 16. Return statement
    if (trimmed.startsWith("return")) {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Alur Fungsi",
        badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
        title: "Mengembalikan Nilai (return)",
        summary: "Mengakhiri eksekusi fungsi dan mengembalikan hasil kalkulasi ke pemanggil fungsi.",
        details: "Di Go, sebuah fungsi dapat mengembalikan lebih dari satu nilai sekaligus (contoh: hasil, err).",
      });
      return;
    }

    // Default Fallback Baris Kode
    if (trimmed !== "}" && trimmed !== "{" && trimmed !== ");") {
      breakdown.push({
        lineNum,
        code: rawLine,
        category: "Instruksi Logika",
        badgeColor: "text-slate-500 bg-slate-500/10 border-slate-500/30",
        title: "Instruksi Perintah Kode",
        summary: "Menjalankan evaluasi ekspresi atau penugasan nilai pada baris ini.",
        details: `Perintah: ${trimmed}`,
      });
    }
  });

  return breakdown;
}

function explainPackagePurpose(pkgName) {
  switch (pkgName) {
    case "fmt":
      return "Pustaka Format I/O untuk mencetak teks ke terminal dan membaca input.";
    case "time":
      return "Pustaka Waktu untuk mengukur durasi, jeda waktu (Sleep), dan timer.";
    case "sync":
      return "Pustaka Sinkronisasi Konkurensi (Mutex, WaitGroup) untuk mengamankan data bersama.";
    case "net/http":
      return "Pustaka Jaringan & Web Server untuk membangun REST API dan HTTP client.";
    case "encoding/json":
      return "Pustaka Serialisasi JSON untuk konversi Struct ke JSON string dan sebaliknya.";
    case "strconv":
      return "Pustaka Konversi String ke Angka (Atoi, Itoa, ParseFloat).";
    case "context":
      return "Pustaka Kontrol Batas Waktu (Timeout/Deadline) dan pembatalan proses antar API.";
    case "os":
      return "Pustaka Akses Sistem Operasi (membaca environment variable, file, dll).";
    case "database/sql":
      return "Antarmuka standar komunikasi basis data SQL di Go.";
    default:
      return `Pustaka '${pkgName}' untuk mendukung fungsionalitas modul.`;
  }
}
