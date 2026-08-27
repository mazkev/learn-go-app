import React, { useState, useMemo, useRef } from "react";
import {
  Blocks,
  Play,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Sliders,
  Plus,
  Trash2,
  HelpCircle,
  Terminal,
  Code2,
  Layers,
  ArrowRight
} from "lucide-react";
import { executeGoCode } from "../../services/goRunner";
import FriendlyErrorBox from "../common/FriendlyErrorBox";
import CodeAnatomyModal from "../common/CodeAnatomyModal";

const BUILDER_CATEGORIES = [
  { id: "loop", name: "🔄 Perulangan (Loop)", icon: "🔄", desc: "Ulangi proses cetak atau hitung angka" },
  { id: "if_else", name: "🔀 Percabangan (If / Else)", icon: "🔀", desc: "Cek kondisi benar/salah & aturan logika" },
  { id: "slice", name: "📋 Daftar Data (Slice/Array)", icon: "📋", desc: "Simpan kumpulan teks atau angka" },
  { id: "map", name: "🗄️ Kamus Data (Map Key-Value)", icon: "🗄️", desc: "Simpan pasangan kunci & nilai (misal: Kontak)" },
  { id: "func", name: "⚙️ Fungsi Kustom (Function)", icon: "⚙️", desc: "Bungkus rumus perhitungan agar bisa dipakai ulang" },
  { id: "struct", name: "📦 Struktur Data (Struct)", icon: "📦", desc: "Buat cetak biru objek (misal: Data Mahasiswa)" },
];

export default function VisualCodeBuilder({ onOpenTryIt }) {
  const [activeCategory, setActiveCategory] = useState("loop");

  // State untuk Category: Loop
  const [loopType, setLoopType] = useState("counter"); // 'counter' | 'step' | 'message'
  const [loopStart, setLoopStart] = useState(1);
  const [loopEnd, setLoopEnd] = useState(5);
  const [loopMessage, setLoopMessage] = useState("Semangat Belajar Golang!");

  // State untuk Category: If/Else
  const [ifType, setIfType] = useState("age"); // 'age' | 'even_odd' | 'grade'
  const [ifAge, setIfAge] = useState(18);
  const [ifNumber, setIfNumber] = useState(8);
  const [ifScore, setIfScore] = useState(85);

  // State untuk Category: Slice
  const [sliceItems, setSliceItems] = useState(["Apel", "Jeruk", "Mangga", "Pisang"]);
  const [newSliceItem, setNewSliceItem] = useState("");

  // State untuk Category: Map
  const [mapItems, setMapItems] = useState([
    { key: "Budi", val: "08123456789" },
    { key: "Siti", val: "08987654321" },
    { key: "Andi", val: "08567890123" },
  ]);
  const [newMapKey, setNewMapKey] = useState("");
  const [newMapVal, setNewMapVal] = useState("");

  // State untuk Category: Function
  const [funcType, setFuncType] = useState("discount"); // 'discount' | 'celsius' | 'greeting'
  const [productPrice, setProductPrice] = useState(100000);
  const [discountPercent, setDiscountPercent] = useState(20);
  const [celsiusVal, setCelsiusVal] = useState(30);
  const [personName, setPersonName] = useState("Kevin");

  // State untuk Category: Struct
  const [studentName, setStudentName] = useState("Kevin Pratama");
  const [studentMajor, setStudentMajor] = useState("Teknik Informatika");
  const [studentGpa, setStudentGpa] = useState(3.85);

  // State Eksekusi Kode
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState({
    text: "Klik tombol hijau '⚡ Jalankan Kode' untuk melihat hasil output.",
    isError: false,
    executionTime: null,
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isAnatomyOpen, setIsAnatomyOpen] = useState(false);

  // Generator Kode Go Real-Time
  const generatedCode = useMemo(() => {
    switch (activeCategory) {
      case "loop":
        if (loopType === "counter") {
          return `package main

import "fmt"

func main() {
    fmt.Println("=== Memulai Perulangan Angka ===")
    
    // Perulangan dari angka ${loopStart} sampai ${loopEnd}
    for i := ${loopStart}; i <= ${loopEnd}; i++ {
        fmt.Printf("Putaran ke-%d\\n", i)
    }
    
    fmt.Println("=== Perulangan Selesai ===")
}`;
        } else if (loopType === "step") {
          return `package main

import "fmt"

func main() {
    fmt.Println("=== Perulangan Kelipatan ===")
    
    // Perulangan loncat 2 angka
    for i := ${loopStart}; i <= ${loopEnd}; i += 2 {
        fmt.Printf("Angka: %d\\n", i)
    }
}`;
        } else {
          return `package main

import "fmt"

func main() {
    // Mengulang pesan sebanyak ${loopEnd} kali
    for i := 1; i <= ${loopEnd}; i++ {
        fmt.Printf("[%d] %s\\n", i, "${loopMessage}")
    }
}`;
        }

      case "if_else":
        if (ifType === "age") {
          return `package main

import "fmt"

func main() {
    umur := ${ifAge}
    fmt.Printf("Usia Anda: %d tahun\\n", umur)

    // Pengecekan syarat usia dewasa (>= 17 tahun)
    if umur >= 17 {
        fmt.Println("✅ Status: Sudah Dewasa (Boleh membuat KTP & SIM)")
    } else {
        fmt.Println("⛔ Status: Masih di bawah umur (Belum boleh membuat KTP)")
    }
}`;
        } else if (ifType === "even_odd") {
          return `package main

import "fmt"

func main() {
    angka := ${ifNumber}
    fmt.Printf("Memeriksa angka: %d\\n", angka)

    // Angka genap jika sisa bagi dengan 2 adalah 0
    if angka%2 == 0 {
        fmt.Println("🟢 Angka ini adalah bilangan GENAP")
    } else {
        fmt.Println("🔵 Angka ini adalah bilangan GANJIL")
    }
}`;
        } else {
          return `package main

import "fmt"

func main() {
    nilai := ${ifScore}
    fmt.Printf("Nilai Ujian: %d\\n", nilai)

    // Evaluasi Predikat Nilai
    if nilai >= 85 {
        fmt.Println("🏆 Predikat: Nilai A (Sangat Memuaskan!)")
    } else if nilai >= 70 {
        fmt.Println("👍 Predikat: Nilai B (Bagus, Tingkatkan lagi)")
    } else if nilai >= 55 {
        fmt.Println("⚠️ Predikat: Nilai C (Cukup, Perlu belajar lagi)")
    } else {
        fmt.Println("❌ Predikat: Nilai D (Tidak Lulus / Remedial)")
    }
}`;
        }

      case "slice":
        const itemsFormatted = sliceItems.map((s) => `"${s}"`).join(", ");
        return `package main

import "fmt"

func main() {
    // Membuat daftar (Slice) dengan ${sliceItems.length} data
    daftarBuah := []string{${itemsFormatted}}

    fmt.Printf("Jumlah item di daftar: %d buah\\n", len(daftarBuah))
    fmt.Println("-------------------------------")

    // Menampilkan semua item satu per satu
    for indeks, nama := range daftarBuah {
        fmt.Printf("Item #%d: %s\\n", indeks+1, nama)
    }
}`;

      case "map":
        const mapLines = mapItems.map((m) => `        "${m.key}": "${m.val}",`).join("\n");
        return `package main

import "fmt"

func main() {
    // Membuat buku kontak menggunakan Map (Key: Nama, Value: No HP)
    bukuKontak := map[string]string{
${mapLines}
    }

    fmt.Printf("Total kontak tersimpan: %d orang\\n", len(bukuKontak))
    fmt.Println("==============================")

    // Membaca semua kontak di dalam map
    for nama, noHp := range bukuKontak {
        fmt.Printf("👤 %s -> 📞 %s\\n", nama, noHp)
    }
}`;

      case "func":
        if (funcType === "discount") {
          return `package main

import "fmt"

// Fungsi untuk menghitung harga setelah diskon
func HitungDiskon(hargaAwal float64, persenDiskon float64) float64 {
    potongan := (persenDiskon / 100.0) * hargaAwal
    hargaAkhir := hargaAwal - potongan
    return hargaAkhir
}

func main() {
    harga := float64(${productPrice})
    diskon := float64(${discountPercent})

    totalBayar := HitungDiskon(harga, diskon)

    fmt.Printf("Harga Awal : Rp %.0f\\n", harga)
    fmt.Printf("Diskon     : %.0f%%\\n", diskon)
    fmt.Printf("Total Bayar: Rp %.0f\\n", totalBayar)
}`;
        } else if (funcType === "celsius") {
          return `package main

import "fmt"

// Fungsi konversi suhu Celcius ke Fahrenheit
func CelciusToFahrenheit(c float64) float64 {
    return (c * 9.0 / 5.0) + 32.0
}

func main() {
    suhuC := float64(${celsiusVal})
    suhuF := CelciusToFahrenheit(suhuC)

    fmt.Printf("Suhu Celcius    : %.1f °C\\n", suhuC)
    fmt.Printf("Suhu Fahrenheit : %.1f °F\\n", suhuF)
}`;
        } else {
          return `package main

import "fmt"

// Fungsi pembuat pesan sapaan ramah
func SapaPengguna(nama string) string {
    return "Halo, " + nama + "! Selamat datang di dunia pemrograman Golang! 🚀"
}

func main() {
    pesan := SapaPengguna("${personName}")
    fmt.Println(pesan)
}`;
        }

      case "struct":
        return `package main

import "fmt"

// 1. Cetak Biru (Struct) Mahasiswa
type Mahasiswa struct {
    Nama    string
    Jurusan string
    IPK     float64
}

func main() {
    // 2. Membuat data mahasiswa nyata dari struct
    mhs1 := Mahasiswa{
        Nama:    "${studentName}",
        Jurusan: "${studentMajor}",
        IPK:     ${studentGpa},
    }

    // 3. Menampilkan isi properti struct
    fmt.Println("=== KARTU IDENTITAS MAHASISWA ===")
    fmt.Printf("Nama    : %s\\n", mhs1.Nama)
    fmt.Printf("Jurusan : %s\\n", mhs1.Jurusan)
    fmt.Printf("IPK     : %.2f\\n", mhs1.IPK)
    fmt.Println("=================================")
}`;

      default:
        return `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}`;
    }
  }, [
    activeCategory,
    loopType,
    loopStart,
    loopEnd,
    loopMessage,
    ifType,
    ifAge,
    ifNumber,
    ifScore,
    sliceItems,
    mapItems,
    funcType,
    productPrice,
    discountPercent,
    celsiusVal,
    personName,
    studentName,
    studentMajor,
    studentGpa,
  ]);

  // Eksekusi kode
  const handleRun = async () => {
    setIsRunning(true);
    setOutput({
      text: "⚡ Mengompilasi dan menjalankan kode Go...",
      isError: false,
      executionTime: null,
    });

    try {
      const res = await executeGoCode(generatedCode);
      setOutput({
        text: res.output,
        isError: res.isError,
        executionTime: res.executionTime,
      });
    } catch (err) {
      setOutput({
        text: `Error: ${err.message}`,
        isError: true,
        executionTime: null,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAddSliceItem = () => {
    if (newSliceItem.trim()) {
      setSliceItems((prev) => [...prev, newSliceItem.trim()]);
      setNewSliceItem("");
    }
  };

  const handleRemoveSliceItem = (index) => {
    setSliceItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddMapItem = () => {
    if (newMapKey.trim() && newMapVal.trim()) {
      setMapItems((prev) => [...prev, { key: newMapKey.trim(), val: newMapVal.trim() }]);
      setNewMapKey("");
      setNewMapVal("");
    }
  };

  const handleRemoveMapItem = (index) => {
    setMapItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-bold text-xs uppercase tracking-wider mb-1">
            <Blocks size={16} />
            <span>Beginner Visual Studio</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black theme-heading tracking-tight flex items-center gap-2.5">
            <span>Visual</span> <span className="gopher-gradient-text">Go Code Builder</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
              LEGO Mode 🧩
            </span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1">
            Rakit dan pahami struktur kode Go secara visual tanpa takut salah ketik (*Zero Syntax Frustration*).
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={() => setIsAnatomyOpen(true)}
          className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-[#04AA6D] border border-[#04AA6D]/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Sparkles size={14} />
          <span>🔬 Bedah Kode Rakitan Ini</span>
        </button>
      </div>

      {/* Category Selection Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {BUILDER_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isSelected
                  ? "bg-[#04AA6D] text-white border-[#04AA6D] shadow-md ring-2 ring-[#04AA6D]/20"
                  : "theme-card theme-muted hover:theme-heading hover:bg-black/5 dark:hover:bg-white/5 border-slate-200 dark:border-white/10"
              }`}
            >
              <div className="text-xl">{cat.icon}</div>
              <div>
                <h4 className="text-xs font-black">{cat.name}</h4>
                <p className={`text-[10px] line-clamp-1 ${isSelected ? "text-white/80" : "theme-muted"}`}>
                  {cat.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Split Grid (Visual Controls Left | Live Code & Output Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
        {/* Left Column (5 cols): Interactive Controls */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="theme-card rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-sm flex-1 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
              <Sliders size={16} className="text-[#04AA6D]" />
              <h3 className="text-sm font-black theme-heading">
                Pengaturan Blok Visual
              </h3>
            </div>

            {/* CONTROLS: LOOP */}
            {activeCategory === "loop" && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold theme-heading block mb-1.5">Pilih Model Perulangan:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "counter", label: "🔢 Hitung Angka" },
                      { id: "step", label: "⚡ Loncat Angka" },
                      { id: "message", label: "💬 Ulang Teks" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setLoopType(m.id)}
                        className={`p-2 rounded-xl font-bold transition-all text-center cursor-pointer ${
                          loopType === m.id
                            ? "bg-[#04AA6D] text-white shadow-xs"
                            : "theme-card-subtle theme-muted hover:theme-heading"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Angka Awal:</span>
                      <span className="font-mono text-[#04AA6D] font-black">{loopStart}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={loopStart}
                      onChange={(e) => setLoopStart(Number(e.target.value))}
                      className="w-full accent-[#04AA6D] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Angka Akhir (Maksimal):</span>
                      <span className="font-mono text-[#04AA6D] font-black">{loopEnd}</span>
                    </div>
                    <input
                      type="range"
                      min={loopStart}
                      max="20"
                      value={loopEnd}
                      onChange={(e) => setLoopEnd(Number(e.target.value))}
                      className="w-full accent-[#04AA6D] cursor-pointer"
                    />
                  </div>

                  {loopType === "message" && (
                    <div>
                      <label className="font-bold theme-heading block mb-1">Teks yang Diulang:</label>
                      <input
                        type="text"
                        value={loopMessage}
                        onChange={(e) => setLoopMessage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 theme-heading"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CONTROLS: IF / ELSE */}
            {activeCategory === "if_else" && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold theme-heading block mb-1.5">Pilih Kasus Pengecekan:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "age", label: "🔞 Cek Usia" },
                      { id: "even_odd", label: "🎲 Genap / Ganjil" },
                      { id: "grade", label: "🎓 Nilai Ujian" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setIfType(m.id)}
                        className={`p-2 rounded-xl font-bold transition-all text-center cursor-pointer ${
                          ifType === m.id
                            ? "bg-[#04AA6D] text-white shadow-xs"
                            : "theme-card-subtle theme-muted hover:theme-heading"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  {ifType === "age" && (
                    <div className="space-y-2">
                      <div className="flex justify-between font-bold">
                        <span>Masukkan Umur Pengguna:</span>
                        <span className="font-mono text-[#04AA6D] font-black">{ifAge} Tahun</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="60"
                        value={ifAge}
                        onChange={(e) => setIfAge(Number(e.target.value))}
                        className="w-full accent-[#04AA6D] cursor-pointer"
                      />
                      <p className="text-[11px] theme-muted">
                        💡 Kondisi: Jika umur $\ge 17$ tahun $\rightarrow$ Boleh buat KTP.
                      </p>
                    </div>
                  )}

                  {ifType === "even_odd" && (
                    <div className="space-y-2">
                      <div className="flex justify-between font-bold">
                        <span>Masukkan Angka yang Diuji:</span>
                        <span className="font-mono text-[#04AA6D] font-black">Angka {ifNumber}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={ifNumber}
                        onChange={(e) => setIfNumber(Number(e.target.value))}
                        className="w-full accent-[#04AA6D] cursor-pointer"
                      />
                      <p className="text-[11px] theme-muted">
                        💡 Menggunakan operator sisa bagi: <code>angka % 2 == 0</code>.
                      </p>
                    </div>
                  )}

                  {ifType === "grade" && (
                    <div className="space-y-2">
                      <div className="flex justify-between font-bold">
                        <span>Nilai Ujian (0 - 100):</span>
                        <span className="font-mono text-[#04AA6D] font-black">{ifScore} / 100</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={ifScore}
                        onChange={(e) => setIfScore(Number(e.target.value))}
                        className="w-full accent-[#04AA6D] cursor-pointer"
                      />
                      <p className="text-[11px] theme-muted">
                        💡 Standar Grade: $\ge 85$ (A), $\ge 70$ (B), $\ge 55$ (C), $&lt; 55$ (D).
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CONTROLS: SLICE */}
            {activeCategory === "slice" && (
              <div className="space-y-4 text-xs">
                <label className="font-bold theme-heading block">Daftar Item Slice Saat Ini:</label>
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {sliceItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10"
                    >
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {idx + 1}. {item}
                      </span>
                      <button
                        onClick={() => handleRemoveSliceItem(idx)}
                        className="text-rose-500 hover:text-rose-600 p-1 cursor-pointer"
                        title="Hapus Item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form Tambah Item */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
                  <input
                    type="text"
                    placeholder="Nama buah / barang baru..."
                    value={newSliceItem}
                    onChange={(e) => setNewSliceItem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSliceItem()}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 theme-heading text-xs"
                  />
                  <button
                    onClick={handleAddSliceItem}
                    className="px-3.5 py-2 rounded-xl bg-[#04AA6D] text-white font-bold flex items-center gap-1 cursor-pointer hover:bg-[#038857]"
                  >
                    <Plus size={14} /> Tambah
                  </button>
                </div>
              </div>
            )}

            {/* CONTROLS: MAP */}
            {activeCategory === "map" && (
              <div className="space-y-4 text-xs">
                <label className="font-bold theme-heading block">Daftar Pasangan Kontak (Map):</label>
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {mapItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10"
                    >
                      <span className="font-mono text-xs">
                        <strong>{item.key}</strong>: <span className="text-emerald-600 dark:text-emerald-400">{item.val}</span>
                      </span>
                      <button
                        onClick={() => handleRemoveMapItem(idx)}
                        className="text-rose-500 hover:text-rose-600 p-1 cursor-pointer"
                        title="Hapus Kontak"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form Tambah Map */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Nama (Key)..."
                      value={newMapKey}
                      onChange={(e) => setNewMapKey(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 theme-heading text-xs"
                    />
                    <input
                      type="text"
                      placeholder="No HP (Value)..."
                      value={newMapVal}
                      onChange={(e) => setNewMapVal(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 theme-heading text-xs"
                    />
                  </div>
                  <button
                    onClick={handleAddMapItem}
                    className="w-full py-2 rounded-xl bg-[#04AA6D] text-white font-bold flex items-center justify-center gap-1 cursor-pointer hover:bg-[#038857]"
                  >
                    <Plus size={14} /> Tambah Kontak ke Map
                  </button>
                </div>
              </div>
            )}

            {/* CONTROLS: FUNCTION */}
            {activeCategory === "func" && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold theme-heading block mb-1.5">Pilih Rumus Fungsi:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "discount", label: "🏷️ Diskon Belanja" },
                      { id: "celsius", label: "🌡️ Suhu (°C ke °F)" },
                      { id: "greeting", label: "👋 Sapa Nama" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setFuncType(m.id)}
                        className={`p-2 rounded-xl font-bold transition-all text-center cursor-pointer ${
                          funcType === m.id
                            ? "bg-[#04AA6D] text-white shadow-xs"
                            : "theme-card-subtle theme-muted hover:theme-heading"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  {funcType === "discount" && (
                    <>
                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>Harga Barang:</span>
                          <span className="font-mono text-[#04AA6D]">Rp {productPrice.toLocaleString("id-ID")}</span>
                        </div>
                        <input
                          type="range"
                          min="10000"
                          max="1000000"
                          step="10000"
                          value={productPrice}
                          onChange={(e) => setProductPrice(Number(e.target.value))}
                          className="w-full accent-[#04AA6D] cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>Persentase Diskon:</span>
                          <span className="font-mono text-[#04AA6D]">{discountPercent}%</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="90"
                          step="5"
                          value={discountPercent}
                          onChange={(e) => setDiscountPercent(Number(e.target.value))}
                          className="w-full accent-[#04AA6D] cursor-pointer"
                        />
                      </div>
                    </>
                  )}

                  {funcType === "celsius" && (
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Suhu Celcius (°C):</span>
                        <span className="font-mono text-[#04AA6D]">{celsiusVal} °C</span>
                      </div>
                      <input
                        type="range"
                        min="-20"
                        max="100"
                        value={celsiusVal}
                        onChange={(e) => setCelsiusVal(Number(e.target.value))}
                        className="w-full accent-[#04AA6D] cursor-pointer"
                      />
                    </div>
                  )}

                  {funcType === "greeting" && (
                    <div>
                      <label className="font-bold theme-heading block mb-1">Masukkan Nama Pengguna:</label>
                      <input
                        type="text"
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 theme-heading text-xs"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CONTROLS: STRUCT */}
            {activeCategory === "struct" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold theme-heading block mb-1">Nama Mahasiswa (string):</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 theme-heading text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold theme-heading block mb-1">Jurusan (string):</label>
                  <input
                    type="text"
                    value={studentMajor}
                    onChange={(e) => setStudentMajor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 theme-heading text-xs"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Indeks Prestasi Kumulatif (IPK - float64):</span>
                    <span className="font-mono text-[#04AA6D] font-bold">{studentGpa}</span>
                  </div>
                  <input
                    type="range"
                    min="1.00"
                    max="4.00"
                    step="0.05"
                    value={studentGpa}
                    onChange={(e) => setStudentGpa(Number(e.target.value))}
                    className="w-full accent-[#04AA6D] cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (7 cols): Live Code Output & Result Terminal */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Top Bar for Code Card */}
          <div className="theme-card rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-slate-100 dark:bg-[#0b1120] border-b border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono shrink-0">
              <span className="font-bold text-[#04AA6D] flex items-center gap-1.5">
                <Code2 size={14} /> main.go (Auto-Generated)
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg theme-card-subtle theme-muted hover:theme-heading text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Salin Kode"
                >
                  {isCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  <span>{isCopied ? "Tersalin!" : "Salin"}</span>
                </button>

                {onOpenTryIt && (
                  <button
                    onClick={() => onOpenTryIt(generatedCode)}
                    className="px-2.5 py-1 rounded-lg bg-[#04AA6D]/10 hover:bg-[#04AA6D]/20 text-[#04AA6D] text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Buka di TryIt Studio"
                  >
                    <ExternalLink size={12} /> Buka di Tryit
                  </button>
                )}
              </div>
            </div>

            {/* Generated Code Display */}
            <div className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed max-h-[300px] shadow-inner">
              <pre>{generatedCode}</pre>
            </div>
          </div>

          {/* Execution & Output Panel */}
          <div className="theme-card rounded-2xl p-4 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#04AA6D]" />
                <span className="text-xs font-bold theme-heading">Terminal Hasil Eksekusi:</span>
                {output.executionTime && (
                  <span className="text-[11px] text-emerald-500 font-bold font-mono">
                    ⏱ {output.executionTime}
                  </span>
                )}
              </div>

              {/* Run Button */}
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="px-5 py-2 rounded-xl w3-btn-green text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Play size={13} className={isRunning ? "animate-spin" : "fill-white"} />
                <span>{isRunning ? "Menjalankan..." : "⚡ Jalankan Kode"}</span>
              </button>
            </div>

            {/* Output Display */}
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 font-mono text-xs overflow-x-auto border border-slate-200 dark:border-white/10 shadow-inner">
              {output.isError ? (
                <FriendlyErrorBox rawError={output.text} />
              ) : (
                <pre className="whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-emerald-400 font-bold">
                  {output.text}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Code Anatomy Modal */}
      <CodeAnatomyModal
        isOpen={isAnatomyOpen}
        onClose={() => setIsAnatomyOpen(false)}
        code={generatedCode}
        title={`Bedah Kode ${BUILDER_CATEGORIES.find((c) => c.id === activeCategory)?.name}`}
      />
    </div>
  );
}
