/**
 * Go Error Explainer ("Smart Error Doctor")
 * Menerjemahkan pesan error teknis compiler Go ke bahasa Indonesia yang ramah,
 * informatif, dan memberikan petunjuk perbaikan instan untuk pemula.
 */

export function explainGoError(rawErrorMessage = "", codeContext = "") {
  const err = String(rawErrorMessage || "").trim();
  if (!err) return null;

  // 1. Variabel dibuat tapi tidak pernah digunakan (declared and not used)
  const unusedVarMatch = err.match(/(?:declared and not used|declared but not used):\s*(\w+)/i) ||
    err.match(/(\w+)\s+declared (?:and|but) not used/i);
  if (unusedVarMatch) {
    const varName = unusedVarMatch[1];
    return {
      title: `Variabel '${varName}' Menganggur (Tidak Dipakai)`,
      summary: "Di Golang, semua variabel yang dideklarasikan WAJIB digunakan dalam program.",
      explanation: `Golang memiliki aturan ketat untuk mencegah pemborosan memori. Variabel '${varName}' sudah dibuat, tetapi tidak ada kode yang membaca nilainya.`,
      solution: `Cetak nilainya dengan 'fmt.Println(${varName})', gunakan nilainya dalam kalkulasi, atau ganti namanya menjadi '_' (blank identifier) jika sengaja diabaikan.`,
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
      icon: "variable",
    };
  }

  // 2. Package di-import tapi tidak digunakan (imported and not used)
  const unusedImportMatch = err.match(/(?:imported and not used|imported but not used):\s*"([^"]+)"/i) ||
    err.match(/"([^"]+)"\s+imported (?:and|but) not used/i);
  if (unusedImportMatch) {
    const pkgName = unusedImportMatch[1];
    return {
      title: `Package '${pkgName}' Tidak Digunakan`,
      summary: "Package di-import tetapi fungsinya tidak pernah dipanggil di dalam kode.",
      explanation: `Go melarang import yang tidak terpakai agar proses kompilasi tetap secepat kilat dan ukuran biner tidak membengkak.`,
      solution: `Hapus baris 'import "${pkgName}"' dari bagian atas kode, atau panggil fungsi dari package tersebut.`,
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
      icon: "package",
    };
  }

  // 3. Typo fungsi atau variabel belum dideklarasikan (undefined)
  const undefinedMatch = err.match(/undefined:\s*([\w.]+)/i);
  if (undefinedMatch) {
    const identifier = undefinedMatch[1];
    let customHint = `Pastikan nama '${identifier}' sudah dideklarasikan sebelum dipanggil.`;

    if (identifier === "fmt.Printl") {
      customHint = "Kemungkinan typo: maksud Anda 'fmt.Println' (dengan huruf 'n') atau 'fmt.Printf'.";
    } else if (identifier.startsWith("fmt.")) {
      customHint = `Fungsi '${identifier}' tidak ada di package fmt. Contoh yang benar: fmt.Println, fmt.Printf, fmt.Sprintf, atau fmt.Print.`;
    } else if (identifier.toLowerCase() === "true" || identifier.toLowerCase() === "false") {
      customHint = "Huruf besar/kecil berpengaruh: di Go boolean ditulis dengan huruf kecil 'true' dan 'false'.";
    }

    return {
      title: `'${identifier}' Tidak Dikenal / Belum Dibuat`,
      summary: `Compiler tidak menemukan definisi fungsi atau variabel '${identifier}'.`,
      explanation: customHint,
      solution: `Periksa ejaan huruf besar/kecil (case-sensitive) atau buat variabelnya terlebih dahulu dengan tanda ':=' (misal: ${identifier} := ...).`,
      badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
      icon: "help",
    };
  }

  // 4. Kurang tanda koma di akhir baris struct/map/slice multiline
  if (
    err.includes("unexpected newline, expecting comma or }") ||
    err.includes("syntax error: unexpected newline, expected comma") ||
    err.includes("missing ',' before newline")
  ) {
    return {
      title: "Kurang Tanda Koma (,) di Akhir Baris",
      summary: "Elemen multiline di Go wajib diakhiri tanda koma pada setiap baris.",
      explanation: "Saat Anda menulis Struct, Map, atau Slice dalam banyak baris, Go mewajibkan adanya koma ',' di setiap akhir baris termasuk baris elemen paling bawah.",
      solution: "Tambahkan tanda koma ',' di ujung baris sebelum tanda kurung kurawal penutup '}'.",
      badgeColor: "text-purple-500 bg-purple-500/10 border-purple-500/30",
      icon: "comma",
    };
  }

  // 5. Tipe data tidak cocok (mismatched types / cannot use)
  const mismatchMatch = err.match(/mismatched types\s*(\w+)\s*and\s*(\w+)/i) ||
    err.match(/cannot use\s*(.*?)\s*\(type\s*(\w+)\)\s*as\s*(?:type\s*)?(\w+)/i);
  if (mismatchMatch) {
    const type1 = mismatchMatch[1] || mismatchMatch[2];
    const type2 = mismatchMatch[2] || mismatchMatch[3];
    return {
      title: `Tipe Data Tidak Cocok (${type1} vs ${type2})`,
      summary: "Go adalah bahasa Statically-Typed yang tidak otomatis mengubah tipe data.",
      explanation: `Anda mencoba mengoperasikan atau memasukkan data bertipe '${type1}' ke tempat yang membutuhkan '${type2}'.`,
      solution: `Lakukan konversi tipe secara manual/eksplisit, misalnya dengan '${type2}(${type1})' atau gunakan fungsi 'strconv' / 'fmt.Sprintf'.`,
      badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/30",
      icon: "type",
    };
  }

  // 6. Deadlock pada Concurrency / Goroutines
  if (err.includes("all goroutines are asleep - deadlock") || err.includes("deadlock")) {
    return {
      title: "Terjadi Deadlock pada Goroutine / Channel",
      summary: "Semua alur proses tertahan menunggu data channel yang tidak pernah datang.",
      explanation: "Channel unbuffered akan menahan pengirim sampai ada penerima yang siap. Jika tidak ada goroutine lain yang membaca channel tersebut, seluruh program membeku (deadlock).",
      solution: "Jalankan pengirim/penerima dalam goroutine terpisah ('go func()') atau buat buffered channel dengan kapasitas ('make(chan T, 2)').",
      badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
      icon: "lock",
    };
  }

  // 7. Nil pointer dereference (Akses pointer kosong)
  if (err.includes("nil pointer dereference") || err.includes("invalid memory address")) {
    return {
      title: "Mengakses Alamat Memori Kosong (Nil Pointer)",
      summary: "Mencoba membaca isi (*pointer) dari pointer yang belum diberi alamat objek nyata.",
      explanation: "Pointer yang bernilai 'nil' tidak menunjuk ke variabel mana pun di RAM, sehingga memanggil nilainya memicu crash runtime.",
      solution: "Inisialisasi pointer dengan alamat variabel ('p = &variabel') atau buat objek baru dengan 'new(NamaStruct)' sebelum mengakses field-nya.",
      badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
      icon: "pointer",
    };
  }

  // 8. Lupa 'package main'
  if (err.includes("expected 'package main'") || err.includes("non-package declaration")) {
    return {
      title: "Baris Pertama Wajib 'package main'",
      summary: "File program Go executable wajib diawali dengan deklarasi nama package.",
      explanation: "Compiler Go memerlukan 'package main' di baris paling atas agar tahu file ini dapat dikompilasi menjadi aplikasi mandiri.",
      solution: "Pastikan baris nomor 1 pada kode Anda tertulis: package main",
      badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/30",
      icon: "package",
    };
  }

  // 9. Lupa fungsi utama 'func main()'
  if (err.includes("function main is undeclared") || err.includes("main_main·f")) {
    return {
      title: "Fungsi Utama 'func main()' Belum Ada",
      summary: "Compiler mencari pintu masuk utama eksekusi program namun tidak menemukannya.",
      explanation: "Setiap aplikasi Go yang dijalankan harus memiliki satu fungsi bernama 'main' tanpa parameter.",
      solution: "Tambahkan fungsi 'func main() { ... }' dan masukkan kode program Anda di dalamnya.",
      badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/30",
      icon: "function",
    };
  }

  // 10. Menggunakan := pada variabel yang sudah ada (no new variables on left side of :=)
  if (err.includes("no new variables on left side of :=") || err.includes("expected =")) {
    return {
      title: "Menggunakan ':=' Dua Kali pada Variabel yang Sama",
      summary: "Operator ':=' hanya digunakan saat mendeklarasikan variabel baru pertama kali.",
      explanation: "Untuk mengubah nilai variabel yang sudah pernah dibuat sebelumnya, gunakan tanda '=' biasa, bukan ':='.",
      solution: "Ganti baris kedua menjadi 'namaVariabel = nilaiBaru' (tanpa tanda titik dua).",
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
      icon: "assign",
    };
  }

  // 11. Index out of range
  if (err.includes("index out of range") || err.includes("slice bounds out of range")) {
    return {
      title: "Indeks Array / Slice Melebihi Batas Panjang",
      summary: "Mencoba mengakses nomor indeks yang lebih besar dari jumlah elemen yang ada.",
      explanation: "Jika slice hanya memiliki 3 elemen (indeks 0, 1, 2), maka memanggil indeks [3] atau lebih tinggi akan memicu crash.",
      solution: "Periksa batas loop atau gunakan 'len(slice)' untuk memastikan indeks berada dalam batas yang aman.",
      badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
      icon: "range",
    };
  }

  // 12. Syntax error umum
  if (err.includes("syntax error")) {
    return {
      title: "Kesalahan Penulisan Sintaks (Syntax Error)",
      summary: "Ada karakter, tanda kurung, atau titik koma yang tidak sesuai aturan penulisan Go.",
      explanation: "Compiler menemukan susunan kode yang tidak bisa dipahami pada baris yang disebutkan di bawah.",
      solution: "Periksa keseimbangan tanda kurung () {} [], tanda petik ganda \"\", atau pastikan tidak ada karakter terlewat.",
      badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
      icon: "syntax",
    };
  }

  // Default fallback jika error tidak cocok dengan pola di atas
  return {
    title: "Diagnosa Kompilasi Go",
    summary: "Compiler Go mendeteksi ketidaksesuaian saat memproses kode Anda.",
    explanation: "Periksa nomor baris dan kolom yang tertera pada pesan log di bawah untuk menelusuri lokasi kesalahan.",
    solution: "Bandingkan kode Anda dengan contoh kode awal atau gunakan tombol Reset jika ingin kembali ke template.",
    badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/30",
    icon: "info",
  };
}
