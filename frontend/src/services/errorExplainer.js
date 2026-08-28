/**
 * Polyglot AI Smart Code Mentor & Diagnostic Doctor
 * 100% Client-Side, 100% Gratis, Instan 0.00s, & Berfungsi Penuh Offline.
 * Mendiagnosis error teknis compiler 5 bahasa (Go, Java, Python, JS, PHP) ke panduan solutif bahasa Indonesia.
 */

export function explainPolyglotError(rawErrorMessage = "", codeContext = "", language = "go") {
  const err = String(rawErrorMessage || "").trim();
  if (!err) return null;

  const lang = String(language || "go").toLowerCase();

  // ROUTER BERDASARKAN BAHASA
  if (lang === "go" || lang === "golang") {
    return explainGoError(err, codeContext);
  } else if (lang === "java") {
    return explainJavaError(err, codeContext);
  } else if (lang === "python" || lang === "py") {
    return explainPythonError(err, codeContext);
  } else if (lang === "javascript" || lang === "js" || lang === "typescript" || lang === "ts") {
    return explainJsError(err, codeContext);
  } else if (lang === "php") {
    return explainPhpError(err, codeContext);
  }

  // Fallback generic
  return explainGoError(err, codeContext);
}

// 1. GO DIAGNOSTIC ENGINE
export function explainGoError(err = "", codeContext = "") {
  // Variabel tidak dipakai
  const unusedVarMatch = err.match(/(?:declared and not used|declared but not used):\s*(\w+)/i) ||
    err.match(/(\w+)\s+declared (?:and|but) not used/i);
  if (unusedVarMatch) {
    const varName = unusedVarMatch[1];
    return {
      title: `Variabel '${varName}' Tidak Digunakan`,
      summary: "Di Go, semua variabel yang dibuat WAJIB digunakan dalam program.",
      explanation: `Go memiliki aturan ketat untuk mencegah pemborosan memori. Variabel '${varName}' sudah dibuat, tetapi tidak pernah dibaca.`,
      solution: `Cetak nilainya dengan 'fmt.Println(${varName})' atau ganti namanya menjadi '_' (blank identifier).`,
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    };
  }

  // Package tidak dipakai
  const unusedImportMatch = err.match(/(?:imported and not used|imported but not used):\s*"([^"]+)"/i) ||
    err.match(/"([^"]+)"\s+imported (?:and|but) not used/i);
  if (unusedImportMatch) {
    const pkgName = unusedImportMatch[1];
    return {
      title: `Package '${pkgName}' Tidak Digunakan`,
      summary: "Package di-import tetapi fungsinya tidak pernah dipanggil.",
      explanation: `Go melarang import yang menganggur agar kompilasi secepat kilat dan biner tetap ramping.`,
      solution: `Hapus baris 'import "${pkgName}"' dari atas file jika memang tidak diperlukan.`,
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    };
  }

  // Undefined identifier
  const undefinedMatch = err.match(/undefined:\s*([\w.]+)/i);
  if (undefinedMatch) {
    const id = undefinedMatch[1];
    return {
      title: `'${id}' Belum Dideklarasikan / Typo`,
      summary: `Compiler tidak menemukan fungsi atau variabel '${id}'.`,
      explanation: `Periksa penulisan huruf besar/kecil (Go bersifat case-sensitive) atau pastikan variabel sudah dibuat sebelumnya.`,
      solution: `Buat variabel terlebih dahulu (misal: ${id} := ...) atau perbaiki ejaan nama package.`,
      badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
    };
  }

  // Missing comma
  if (err.includes("unexpected newline, expecting comma or }") || err.includes("missing ',' before newline")) {
    return {
      title: "Kurang Tanda Koma (,) di Akhir Baris",
      summary: "Elemen multiline di Go wajib diakhiri koma pada setiap baris.",
      explanation: "Saat menulis Struct, Map, atau Slice banyak baris, Go mewajibkan tanda koma ',' di baris terakhir.",
      solution: "Tambahkan koma ',' di ujung baris sebelum kurung kurawal penutup '}'.",
      badgeColor: "text-purple-500 bg-purple-500/10 border-purple-500/30",
    };
  }

  // Deadlock
  if (err.includes("all goroutines are asleep - deadlock") || err.includes("deadlock")) {
    return {
      title: "Terjadi Deadlock pada Goroutine / Channel",
      summary: "Semua goroutine sedang tertahan menunggu data yang tidak pernah dikirim.",
      explanation: "Sebuah channel unbuffered dibaca '<-ch' tanpa ada goroutine lain yang mengirim data ke dalamnya.",
      solution: "Pastikan operasi kirim channel 'ch <- data' dijalankan di goroutine terpisah dengan kata kunci 'go'.",
      badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
    };
  }

  return {
    title: "Petunjuk Analisis Kode Go",
    summary: "Compiler Go menemukan ketidaksesuaian sintaks atau tipe data.",
    explanation: err,
    solution: "Periksa kembali baris kode yang ditunjuk oleh nomor baris compiler.",
    badgeColor: "text-slate-500 bg-slate-500/10 border-slate-500/30",
  };
}

// 2. JAVA DIAGNOSTIC ENGINE
export function explainJavaError(err = "", codeContext = "") {
  if (err.includes("NullPointerException")) {
    return {
      title: "NullPointerException (Objek Kosong)",
      summary: "Anda memanggil method atau atribut pada variabel bernilai 'null'.",
      explanation: "Objek belum diinisialisasi dengan kata kunci 'new' sebelum digunakan.",
      solution: "Inisialisasi objek terlebih dahulu (misal: String s = new String() atau MyClass obj = new MyClass()) sebelum memanggil method-nya.",
      badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
    };
  }

  if (err.includes("cannot find symbol") || err.includes("symbol not found")) {
    return {
      title: "Cannot Find Symbol (Variabel/Method Tidak Ditemukan)",
      summary: "Java tidak mengenali nama variabel, class, atau method yang dipanggil.",
      explanation: "Bisa disebabkan oleh typo penulisan, belum di-import package terkait, atau variabel belum dibuat.",
      solution: "Pastikan huruf besar-kecil sudah tepat dan import library yang sesuai di bagian atas file.",
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    };
  }

  if (err.includes("non-static") && err.includes("static context")) {
    return {
      title: "Non-Static Method Dipanggil dari Static Context",
      summary: "Method biasa dipanggil langsung di dalam 'public static void main'.",
      explanation: "Method static tidak bisa langsung mengakses method/variabel non-static tanpa membuat objek instance.",
      solution: "Tambahkan kata kunci 'static' pada definisi fungsi Anda, atau buat instance objek (Main app = new Main(); app.myMethod()).",
      badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/30",
    };
  }

  return {
    title: "Petunjuk Analisis Kode Java",
    summary: "Compiler JVM mendeteksi kesalahan struktur class atau pengetikan.",
    explanation: err,
    solution: "Periksa kelengkapan tanda titik koma ';' dan penutup kurung kurawal class.",
    badgeColor: "text-slate-500 bg-slate-500/10 border-slate-500/30",
  };
}

// 3. PYTHON DIAGNOSTIC ENGINE
export function explainPythonError(err = "", codeContext = "") {
  if (err.includes("IndentationError")) {
    return {
      title: "IndentationError (Spasi / Tab Tidak Sejajar)",
      summary: "Python menggunakan spasi indentasi untuk menandai blok kode (if, for, def).",
      explanation: "Ada baris kode yang spasinya terlalu maju atau terlalu mundur.",
      solution: "Gunakan 4 spasi konsisten untuk setiap blok di dalam fungsi atau perulangan.",
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    };
  }

  if (err.includes("NameError")) {
    const match = err.match(/name '(\w+)' is not defined/i);
    const varName = match ? match[1] : "variabel";
    return {
      title: `NameError: '${varName}' Belum Dibuat`,
      summary: `Python tidak mengenali nama '${varName}'.`,
      explanation: `Variabel '${varName}' dipanggil sebelum didefinisikan nilainya.`,
      solution: `Buat variabelnya terlebih dahulu di baris atas (contoh: ${varName} = 10).`,
      badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
    };
  }

  if (err.includes("TypeError")) {
    return {
      title: "TypeError: Operasi Tipe Data Tidak Valid",
      summary: "Mencoba menggabungkan tipe data yang tidak kompatibel.",
      explanation: "Contohnya menjumlahkan String dengan Integer ('angka: ' + 10).",
      solution: "Gunakan f-string (f'angka: {10}') atau konversi dengan str(10).",
      badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/30",
    };
  }

  return {
    title: "Petunjuk Analisis Kode Python",
    summary: "Python runtime mendeteksi error pada script.",
    explanation: err,
    solution: "Periksa baris kode terakhir yang tertera pada stack trace.",
    badgeColor: "text-slate-500 bg-slate-500/10 border-slate-500/30",
  };
}

// 4. JAVASCRIPT DIAGNOSTIC ENGINE
export function explainJsError(err = "", codeContext = "") {
  if (err.includes("Cannot read properties of undefined") || err.includes("Cannot read property")) {
    return {
      title: "TypeError: Membaca Properti dari 'undefined'",
      summary: "Objek yang ingin Anda akses ternyata bernilai kosong (undefined/null).",
      explanation: "Contoh: memanggil 'user.name' padahal variabel 'user' belum memiliki isi objek.",
      solution: "Gunakan Optional Chaining operator '?.' (contoh: user?.name) untuk mencegah crash.",
      badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
    };
  }

  if (err.includes("Assignment to constant variable")) {
    return {
      title: "Nilai Variabel 'const' Tidak Boleh Diubah",
      summary: "Variabel dideklarasikan dengan 'const' lalu dicoba di-assign nilai baru.",
      explanation: "Variabel 'const' bersifat konstan dan nilainya tidak dapat ditimpa.",
      solution: "Ganti deklarasi variabel dari 'const' menjadi 'let' jika nilainya perlu diubah.",
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    };
  }

  return {
    title: "Petunjuk Analisis Kode JavaScript",
    summary: "V8 Engine menemukan error pada runtime JavaScript.",
    explanation: err,
    solution: "Buka console log untuk melihat traceback eksekusi fungsi.",
    badgeColor: "text-slate-500 bg-slate-500/10 border-slate-500/30",
  };
}

// 5. PHP DIAGNOSTIC ENGINE
export function explainPhpError(err = "", codeContext = "") {
  if (err.includes("syntax error, unexpected") || err.includes("Parse error")) {
    return {
      title: "Parse Error (Sintaks PHP Tidak Valid)",
      summary: "Terdapat kesalahan tata bahasa PHP, kemungkinan kurang titik koma ';' atau kurung.",
      explanation: "PHP mewajibkan titik koma ';' di setiap akhir statement perintah.",
      solution: "Periksa ujung baris perintah sebelum baris yang ditunjuk error dan tambahkan ';'.",
      badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
    };
  }

  if (err.includes("Call to undefined function")) {
    return {
      title: "Fungsi PHP Belum Didefinisikan / Typo",
      summary: "PHP tidak menemukan fungsi yang Anda panggil.",
      explanation: "Periksa apakah fungsi sudah dibuat dengan 'function namaFungsi() { ... }' atau pastikan ejaannya benar.",
      solution: "Definisikan fungsinya atau sertakan file pendukung dengan require_once.",
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    };
  }

  return {
    title: "Petunjuk Analisis Kode PHP",
    summary: "PHP Zend Engine mendeteksi kesalahan pada script.",
    explanation: err,
    solution: "Periksa file PHP dan pastikan diawali dengan tag '<?php'.",
    badgeColor: "text-slate-500 bg-slate-500/10 border-slate-500/30",
  };
}
