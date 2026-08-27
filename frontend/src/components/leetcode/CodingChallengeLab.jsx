import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Code,
  Play,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  HelpCircle,
  Terminal,
  Trophy,
  Flame,
  ArrowRight,
  Check,
  Lightbulb
} from "lucide-react";
import { executeGoCode } from "../../services/goRunner";
import FriendlyErrorBox from "../common/FriendlyErrorBox";

export const CODING_CHALLENGES = [
  {
    id: "fizzbuzz",
    title: "1. FizzBuzz Klasik",
    difficulty: "Easy",
    category: "Logika & Percabangan",
    description: `Diberikan sebuah angka integer \`n\`. Buatlah fungsi yang mengembalikan string berdasarkan aturan:
- Jika \`n\` kelipatan 3 dan 5, kembalikan **"FizzBuzz"**
- Jika \`n\` kelipatan 3, kembalikan **"Fizz"**
- Jika \`n\` kelipatan 5, kembalikan **"Buzz"**
- Jika bukan kelipatan keduanya, kembalikan angka tersebut dalam bentuk string (contoh: **"7"**)`,
    starterCode: `package main

import (
    "fmt"
    "strconv"
)

// Selesaikan fungsi FizzBuzz di bawah ini:
func FizzBuzz(n int) string {
    // Tulis kodemu di sini
    if n%15 == 0 {
        return "FizzBuzz"
    } else if n%3 == 0 {
        return "Fizz"
    } else if n%5 == 0 {
        return "Buzz"
    }
    return strconv.Itoa(n)
}

func main() {
    // Jalankan test case
    fmt.Println(FizzBuzz(3))
    fmt.Println(FizzBuzz(5))
    fmt.Println(FizzBuzz(15))
}`,
    testCases: [
      { id: 1, inputDisplay: "n = 3", expected: "Fizz", runnerCall: "fmt.Println(FizzBuzz(3))" },
      { id: 2, inputDisplay: "n = 5", expected: "Buzz", runnerCall: "fmt.Println(FizzBuzz(5))" },
      { id: 3, inputDisplay: "n = 15", expected: "FizzBuzz", runnerCall: "fmt.Println(FizzBuzz(15))" },
      { id: 4, inputDisplay: "n = 7", expected: "7", runnerCall: "fmt.Println(FizzBuzz(7))" },
      { id: 5, inputDisplay: "n = 30", expected: "FizzBuzz", runnerCall: "fmt.Println(FizzBuzz(30))" },
    ],
    hints: [
      "Gunakan operator modulo '%' untuk mengecek sisa bagi (misal n%3 == 0).",
      "Periksa kondisi kelipatan 15 (kelipatan 3 DAN 5) paling awal sebelum mengecek kelipatan 3 atau 5.",
      "Gunakan 'strconv.Itoa(n)' untuk mengubah integer ke string.",
    ],
    xpReward: 50,
  },
  {
    id: "palindrome",
    title: "2. Deteksi Kata Palindrome",
    difficulty: "Easy",
    category: "String & Array",
    description: `Diberikan sebuah string kata \`s\`. Periksa apakah kata tersebut merupakan **Palindrome** (jika dibaca dari depan maupun belakang hasilnya persis sama).
- Kembalikan \`true\` jika kata tersebut palindrome.
- Kembalikan \`false\` jika bukan.
- Contoh: \`"katak"\` $\\rightarrow$ \`true\`, \`"golang"\` $\\rightarrow$ \`false\`.`,
    starterCode: `package main

import "fmt"

// Selesaikan fungsi IsPalindrome di bawah ini:
func IsPalindrome(s string) bool {
    // Tulis kodemu di sini
    n := len(s)
    for i := 0; i < n/2; i++ {
        if s[i] != s[n-1-i] {
            return false
        }
    }
    return true
}

func main() {
    fmt.Println(IsPalindrome("katak"))
    fmt.Println(IsPalindrome("golang"))
}`,
    testCases: [
      { id: 1, inputDisplay: 's = "katak"', expected: "true", runnerCall: 'fmt.Println(IsPalindrome("katak"))' },
      { id: 2, inputDisplay: 's = "golang"', expected: "false", runnerCall: 'fmt.Println(IsPalindrome("golang"))' },
      { id: 3, inputDisplay: 's = "radar"', expected: "true", runnerCall: 'fmt.Println(IsPalindrome("radar"))' },
      { id: 4, inputDisplay: 's = "a"', expected: "true", runnerCall: 'fmt.Println(IsPalindrome("a"))' },
      { id: 5, inputDisplay: 's = "kasurrusak"', expected: "true", runnerCall: 'fmt.Println(IsPalindrome("kasurrusak"))' },
    ],
    hints: [
      "Gunakan teknik two-pointer: bandingkan karakter indeks awal `s[i]` dengan karakter indeks ujung `s[len-1-i]`.",
      "Cukup lakukan perulangan sampai setengah panjang string `len(s)/2`.",
    ],
    xpReward: 60,
  },
  {
    id: "find_min_max",
    title: "3. Nilai Terbesar & Terkecil",
    difficulty: "Easy",
    category: "Slice & Looping",
    description: `Diberikan sebuah slice angka integer \`nums\`. Temukan dan kembalikan dua nilai:
1. Nilai terkecil (\`min\`)
2. Nilai terbesar (\`max\`)

Contoh: \`nums = [15, 3, 90, 22, 5]\` $\\rightarrow$ Nilai terkecil = \`3\`, Nilai terbesar = \`90\`.`,
    starterCode: `package main

import "fmt"

// Selesaikan fungsi FindMinMax di bawah ini:
func FindMinMax(nums []int) (int, int) {
    // Tulis kodemu di sini
    minVal := nums[0]
    maxVal := nums[0]

    for _, v := range nums {
        if v < minVal {
            minVal = v
        }
        if v > maxVal {
            maxVal = v
        }
    }
    return minVal, maxVal
}

func main() {
    min, max := FindMinMax([]int{15, 3, 90, 22, 5})
    fmt.Printf("%d %d\\n", min, max)
}`,
    testCases: [
      { id: 1, inputDisplay: "nums = [15, 3, 90, 22, 5]", expected: "3 90", runnerCall: 'min, max := FindMinMax([]int{15, 3, 90, 22, 5}); fmt.Printf("%d %d\\n", min, max)' },
      { id: 2, inputDisplay: "nums = [100, 200, 50]", expected: "50 200", runnerCall: 'min, max := FindMinMax([]int{100, 200, 50}); fmt.Printf("%d %d\\n", min, max)' },
      { id: 3, inputDisplay: "nums = [7]", expected: "7 7", runnerCall: 'min, max := FindMinMax([]int{7}); fmt.Printf("%d %d\\n", min, max)' },
      { id: 4, inputDisplay: "nums = [-10, 0, 50, -30]", expected: "-30 50", runnerCall: 'min, max := FindMinMax([]int{-10, 0, 50, -30}); fmt.Printf("%d %d\\n", min, max)' },
    ],
    hints: [
      "Inisialisasi `minVal` dan `maxVal` dengan elemen pertama `nums[0]`.",
      "Gunakan perulangan `for _, val := range nums` dan perbarui `minVal` jika `val < minVal`, serta `maxVal` jika `val > maxVal`.",
    ],
    xpReward: 60,
  },
  {
    id: "word_count",
    title: "4. Hitung Frekuensi Kata",
    difficulty: "Easy",
    category: "Map (Hash Table)",
    description: `Diberikan sebuah slice string berisi daftar kata belanjaan \`items\`. 
Hitung berapa kali masing-masing kata muncul dan kembalikan hasilnya dalam bentuk \`map[string]int\`.

Contoh: \`items = ["apel", "jeruk", "apel"]\` $\\rightarrow$ \`map[apel:2 jeruk:1]\`.`,
    starterCode: `package main

import "fmt"

// Selesaikan fungsi CountItems di bawah ini:
func CountItems(items []string) map[string]int {
    // Tulis kodemu di sini
    counts := make(map[string]int)
    for _, item := range items {
        counts[item]++
    }
    return counts
}

func main() {
    hasil := CountItems([]string{"apel", "jeruk", "apel"})
    fmt.Printf("apel:%d jeruk:%d\\n", hasil["apel"], hasil["jeruk"])
}`,
    testCases: [
      { id: 1, inputDisplay: 'items = ["apel", "jeruk", "apel"]', expected: "apel:2 jeruk:1", runnerCall: 'h := CountItems([]string{"apel", "jeruk", "apel"}); fmt.Printf("apel:%d jeruk:%d\\n", h["apel"], h["jeruk"])' },
      { id: 2, inputDisplay: 'items = ["go", "go", "go"]', expected: "go:3", runnerCall: 'h := CountItems([]string{"go", "go", "go"}); fmt.Printf("go:%d\\n", h["go"])' },
      { id: 3, inputDisplay: 'items = ["kucing", "anjing"]', expected: "anjing:1 kucing:1", runnerCall: 'h := CountItems([]string{"kucing", "anjing"}); fmt.Printf("anjing:%d kucing:%d\\n", h["anjing"], h["kucing"])' },
    ],
    hints: [
      "Inisialisasi map dengan `counts := make(map[string]int)`.",
      "Iterasi setiap kata dengan `for _, w := range items` dan tambahkan frekuensinya dengan `counts[w]++`.",
    ],
    xpReward: 70,
  },
  {
    id: "reverse_array",
    title: "5. Membalik Urutan Slice Array",
    difficulty: "Easy",
    category: "Slice & Pointer",
    description: `Diberikan slice angka \`nums\`. Baliklah urutan elemen-elemen di dalamnya dari belakang ke depan tanpa menggunakan library pihak ketiga.

Contoh: \`nums = [1, 2, 3, 4, 5]\` $\\rightarrow$ Output: \`[5, 4, 3, 2, 1]\`.`,
    starterCode: `package main

import "fmt"

// Selesaikan fungsi ReverseSlice di bawah ini:
func ReverseSlice(nums []int) []int {
    // Tulis kodemu di sini
    left := 0
    right := len(nums) - 1
    for left < right {
        nums[left], nums[right] = nums[right], nums[left]
        left++
        right--
    }
    return nums
}

func main() {
    hasil := ReverseSlice([]int{1, 2, 3, 4, 5})
    fmt.Println(hasil)
}`,
    testCases: [
      { id: 1, inputDisplay: "nums = [1, 2, 3, 4, 5]", expected: "[5 4 3 2 1]", runnerCall: 'fmt.Println(ReverseSlice([]int{1, 2, 3, 4, 5}))' },
      { id: 2, inputDisplay: "nums = [10, 20]", expected: "[20 10]", runnerCall: 'fmt.Println(ReverseSlice([]int{10, 20}))' },
      { id: 3, inputDisplay: "nums = [99]", expected: "[99]", runnerCall: 'fmt.Println(ReverseSlice([]int{99}))' },
    ],
    hints: [
      "Gunakan dua pointer: `left` dari 0 dan `right` dari `len(nums)-1`.",
      "Di Go, Anda bisa menukar 2 variabel sekaligus: `nums[left], nums[right] = nums[right], nums[left]`.",
    ],
    xpReward: 70,
  },
  {
    id: "twosum_simple",
    title: "6. Two Sum Sederhana",
    difficulty: "Easy",
    category: "Algoritma Klasik (LeetCode #1)",
    description: `Diberikan slice integer \`nums\` dan integer \`target\`.
Temukan **dua indeks** dari angka-angka yang jika dijumlahkan menghasilkan nilai \`target\`.

Contoh: \`nums = [2, 7, 11, 15], target = 9\`
Karena \`nums[0] + nums[1] = 2 + 7 = 9\`, maka output adalah \`[0, 1]\`.`,
    starterCode: `package main

import "fmt"

// Selesaikan fungsi TwoSum di bawah ini:
func TwoSum(nums []int, target int) []int {
    // Tulis kodemu di sini
    seen := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if idx, exists := seen[complement]; exists {
            return []int{idx, i}
        }
        seen[num] = i
    }
    return []int{}
}

func main() {
    hasil := TwoSum([]int{2, 7, 11, 15}, 9)
    fmt.Println(hasil)
}`,
    testCases: [
      { id: 1, inputDisplay: "nums = [2, 7, 11, 15], target = 9", expected: "[0 1]", runnerCall: 'fmt.Println(TwoSum([]int{2, 7, 11, 15}, 9))' },
      { id: 2, inputDisplay: "nums = [3, 2, 4], target = 6", expected: "[1 2]", runnerCall: 'fmt.Println(TwoSum([]int{3, 2, 4}, 6))' },
      { id: 3, inputDisplay: "nums = [3, 3], target = 6", expected: "[0 1]", runnerCall: 'fmt.Println(TwoSum([]int{3, 3}, 6))' },
    ],
    hints: [
      "Bisa diselesaikan dengan dua loop `for` bertingkat, atau menggunakan `map` untuk pencarian $O(N)$ yang lebih cepat.",
      "Saat membaca angka `num`, cari apakah `target - num` sudah pernah muncul di dalam map.",
    ],
    xpReward: 80,
  },
];

export default function CodingChallengeLab() {
  const [selectedChallengeId, setSelectedChallengeId] = useState("fizzbuzz");
  const [activeTestCaseIdx, setActiveTestCaseIdx] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Challenge Solved State in LocalStorage
  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("golearn_solved_challenges");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("golearn_solved_challenges", JSON.stringify(solvedIds));
    } catch {}
  }, [solvedIds]);

  const currentChallenge = useMemo(() => {
    return CODING_CHALLENGES.find((c) => c.id === selectedChallengeId) || CODING_CHALLENGES[0];
  }, [selectedChallengeId]);

  const [userCodes, setUserCodes] = useState({});
  const editorRef = useRef(null);

  const currentCode = userCodes[currentChallenge.id] || currentChallenge.starterCode;

  // Test Results State: { [caseId]: { passed: bool, actual: string, error: string } }
  const [testResults, setTestResults] = useState(null);
  const [overallVerdict, setOverallVerdict] = useState(null); // 'ACCEPTED' | 'WRONG_ANSWER' | 'ERROR'
  const [rawErrorOutput, setRawErrorOutput] = useState(null);

  const handleSelectChallenge = (id) => {
    setSelectedChallengeId(id);
    setActiveTestCaseIdx(0);
    setTestResults(null);
    setOverallVerdict(null);
    setRawErrorOutput(null);
  };

  const handleReset = () => {
    setUserCodes((prev) => ({
      ...prev,
      [currentChallenge.id]: currentChallenge.starterCode,
    }));
    if (editorRef.current) {
      editorRef.current.setValue(currentChallenge.starterCode);
    }
    setTestResults(null);
    setOverallVerdict(null);
    setRawErrorOutput(null);
  };

  // Run Test Cases
  const handleRunTestCases = async (isFullSubmit = false) => {
    setIsSubmitting(true);
    setOverallVerdict(null);
    setRawErrorOutput(null);

    const codeToRun = editorRef.current ? editorRef.current.getValue() : currentCode;

    // Simpan kode terbaru
    setUserCodes((prev) => ({
      ...prev,
      [currentChallenge.id]: codeToRun,
    }));

    const results = {};
    let allPassed = true;
    let hasCompilationError = false;

    // Bangun kode pengujian dengan memodifikasi main()
    for (const tc of currentChallenge.testCases) {
      // Ganti isi main() dengan runnerCall spesifik
      let harnessCode = codeToRun.replace(
        /func main\(\)\s*\{[\s\S]*?\}/,
        `func main() {\n    ${tc.runnerCall}\n}`
      );

      // Jika user menghapus main(), tambahkan di akhir
      if (!harnessCode.includes("func main()")) {
        harnessCode += `\nfunc main() {\n    ${tc.runnerCall}\n}`;
      }

      try {
        const res = await executeGoCode(harnessCode);

        if (res.isError) {
          hasCompilationError = true;
          setRawErrorOutput(res.output);
          results[tc.id] = {
            passed: false,
            actual: "Compilation Error",
            error: res.output,
          };
          allPassed = false;
          break; // Hentikan jika ada error kompilasi
        } else {
          const actualOutput = res.output.trim();
          const passed = actualOutput === tc.expected.trim();
          results[tc.id] = {
            passed,
            actual: actualOutput,
            error: null,
          };
          if (!passed) {
            allPassed = false;
          }
        }
      } catch (err) {
        hasCompilationError = true;
        setRawErrorOutput(err.message);
        results[tc.id] = {
          passed: false,
          actual: "Runtime Error",
          error: err.message,
        };
        allPassed = false;
        break;
      }
    }

    setTestResults(results);
    setIsSubmitting(false);

    if (hasCompilationError) {
      setOverallVerdict("ERROR");
    } else if (allPassed) {
      setOverallVerdict("ACCEPTED");
      if (!solvedIds.includes(currentChallenge.id)) {
        setSolvedIds((prev) => [...prev, currentChallenge.id]);
      }
    } else {
      setOverallVerdict("WRONG_ANSWER");
    }
  };

  const isCurrentSolved = solvedIds.includes(currentChallenge.id);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-bold text-xs uppercase tracking-wider mb-1">
            <Code size={16} />
            <span>HackerRank & LeetCode Practice Arena</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black theme-heading tracking-tight flex items-center gap-2.5">
            <span>Go</span> <span className="gopher-gradient-text">Coding Challenge Arena</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
              Level: Beginner
            </span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1">
            Latih algoritma Go standar tes kerja teknis dengan verifikasi kasus uji (*Test Cases*) otomatis.
          </p>
        </div>

        {/* Progress Solved Pill */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl theme-card border border-emerald-500/30 shadow-sm">
          <Trophy size={18} className="text-amber-500" />
          <div className="text-xs">
            <span className="theme-muted font-medium">Terselesaikan: </span>
            <span className="font-extrabold text-[#04AA6D]">{solvedIds.length} / {CODING_CHALLENGES.length} Soal</span>
          </div>
        </div>
      </div>

      {/* Challenge Problem Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {CODING_CHALLENGES.map((ch, idx) => {
          const isSelected = ch.id === selectedChallengeId;
          const isSolved = solvedIds.includes(ch.id);

          return (
            <button
              key={ch.id}
              onClick={() => handleSelectChallenge(ch.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-[#04AA6D] text-white shadow-md"
                  : "theme-card theme-muted hover:theme-heading hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span>{ch.title}</span>
              {isSolved ? (
                <CheckCircle2 size={14} className={isSelected ? "text-white" : "text-emerald-500"} />
              ) : (
                <span className="text-[10px] opacity-70 font-mono">+{ch.xpReward} XP</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Split Grid (Problem Details Left | Code Editor & Test Cases Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
        {/* Left Col (5 cols): Problem Description, Examples & Hints */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="theme-card rounded-2xl p-5 space-y-4 shadow-sm border border-slate-200 dark:border-white/10 flex-1 overflow-y-auto max-h-[700px]">
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                🟢 {currentChallenge.difficulty}
              </span>
              <span className="text-xs font-mono theme-muted">
                Kategori: {currentChallenge.category}
              </span>
            </div>

            <h2 className="text-lg font-black theme-heading">
              {currentChallenge.title}
            </h2>

            {/* Problem Description */}
            <div className="text-xs md:text-sm theme-body leading-relaxed space-y-2 whitespace-pre-line">
              {currentChallenge.description}
            </div>

            {/* Example Test Cases */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black uppercase tracking-wider theme-heading">
                📋 Contoh Kasus Uji (Sample Cases):
              </h4>
              {currentChallenge.testCases.slice(0, 2).map((tc, idx) => (
                <div
                  key={tc.id}
                  className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 font-mono text-xs space-y-1 shadow-inner"
                >
                  <p className="text-slate-500 dark:text-slate-400">Contoh {idx + 1}:</p>
                  <p className="theme-heading font-bold">Input: <span className="text-blue-500">{tc.inputDisplay}</span></p>
                  <p className="theme-heading font-bold">Output: <span className="text-emerald-500">{tc.expected}</span></p>
                </div>
              ))}
            </div>

            {/* Hints Accordion */}
            <div className="pt-2 space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <Lightbulb size={14} />
                <span>Petunjuk Pengerjaan (Hints):</span>
              </h4>
              <div className="space-y-1.5">
                {currentChallenge.hints.map((hint, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs theme-heading space-y-1"
                  >
                    <p className="leading-relaxed text-[11px] text-amber-700 dark:text-amber-300">
                      💡 <strong>Tip #{hIdx + 1}:</strong> {hint}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col (7 cols): Monaco Editor + Test Cases Runner */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Top Bar for Editor */}
          <div className="theme-card rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm flex flex-col">
            <div className="px-4 py-2.5 bg-slate-100 dark:bg-[#0b1120] border-b border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono shrink-0">
              <span className="font-bold theme-muted">solution.go</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-2.5 py-1 rounded-lg theme-card-subtle theme-muted hover:theme-heading text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Reset ke Template Awal"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
            </div>

            {/* Monaco Editor Container */}
            <div className="h-[340px] min-h-[300px]">
              <Editor
                height="100%"
                defaultLanguage="go"
                theme="vs-dark"
                defaultValue={currentCode}
                key={`${currentChallenge.id}`}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
                options={{
                  fontSize: 13,
                  fontFamily: "'Fira Code', Consolas, 'Courier New', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  formatOnPaste: false,
                  formatOnType: false,
                  disableMonospaceOptimizations: true,
                  renderWhitespace: "none",
                  unicodeHighlight: { ambiguousCharacters: false, invisibleCharacters: false },
                  padding: { top: 10, bottom: 10 },
                }}
              />
            </div>
          </div>

          {/* Test Case Execution & Verdict Panel */}
          <div className="theme-card rounded-2xl p-4 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
            {/* Header Toolbar: Action Buttons */}
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-200 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black theme-heading">Test Results</span>
                {overallVerdict === "ACCEPTED" && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-bold font-mono text-[10px] flex items-center gap-1">
                    <CheckCircle2 size={12} /> ACCEPTED (All Cases Passed!)
                  </span>
                )}
                {overallVerdict === "WRONG_ANSWER" && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-500 font-bold font-mono text-[10px] flex items-center gap-1">
                    <XCircle size={12} /> WRONG ANSWER
                  </span>
                )}
                {overallVerdict === "ERROR" && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-500 font-bold font-mono text-[10px] flex items-center gap-1">
                    <XCircle size={12} /> COMPILATION ERROR
                  </span>
                )}
              </div>

              {/* Run & Submit Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRunTestCases(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl theme-card-subtle theme-heading hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Play size={13} className={isSubmitting ? "animate-spin" : "fill-current"} />
                  <span>{isSubmitting ? "Menguji..." : "Run Code"}</span>
                </button>

                <button
                  onClick={() => handleRunTestCases(true)}
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#04AA6D] hover:bg-[#038857] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send size={13} />
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>

            {/* If there is a compilation error: Smart Error Doctor */}
            {rawErrorOutput && (
              <FriendlyErrorBox rawError={rawErrorOutput} />
            )}

            {/* Test Case Tabs */}
            {!rawErrorOutput && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {currentChallenge.testCases.map((tc, idx) => {
                    const result = testResults ? testResults[tc.id] : null;
                    const isActive = activeTestCaseIdx === idx;

                    return (
                      <button
                        key={tc.id}
                        onClick={() => setActiveTestCaseIdx(idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-slate-200 dark:bg-slate-800 theme-heading shadow-xs"
                            : "theme-muted hover:theme-heading"
                        }`}
                      >
                        <span>Case {idx + 1}</span>
                        {result && (
                          result.passed ? (
                            <CheckCircle2 size={12} className="text-emerald-500" />
                          ) : (
                            <XCircle size={12} className="text-rose-500" />
                          )
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Test Case Detail Card */}
                {(() => {
                  const activeTC = currentChallenge.testCases[activeTestCaseIdx] || currentChallenge.testCases[0];
                  const activeResult = testResults ? testResults[activeTC.id] : null;

                  return (
                    <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 font-mono text-xs space-y-2 border border-slate-200 dark:border-white/10 shadow-inner">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block">
                          Input:
                        </span>
                        <p className="theme-heading font-bold">{activeTC.inputDisplay}</p>
                      </div>

                      <div>
                        <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block">
                          Expected Output:
                        </span>
                        <p className="text-emerald-500 font-bold">{activeTC.expected}</p>
                      </div>

                      {activeResult && (
                        <div className="pt-2 border-t border-slate-200 dark:border-white/10">
                          <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block">
                            Your Output:
                          </span>
                          <p className={`font-bold ${activeResult.passed ? "text-emerald-500" : "text-rose-500"}`}>
                            {activeResult.actual}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
