import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Bug,
  Timer,
  Flame,
  Heart,
  Award,
  RotateCcw,
  Play,
  Pause,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  Trophy,
  AlertTriangle,
  Code2,
  ChevronRight
} from "lucide-react";
import confetti from "canvas-confetti";

export const BUG_BANK = [
  // 1. GO BUGS
  {
    id: "go-1",
    language: "Go",
    langIcon: "🐹",
    langColor: "#00ADD8",
    title: "Runtime Panic: Index Out of Range",
    codeLines: [
      'package main',
      'import "fmt"',
      'func main() {',
      '    numbers := []int{10, 20, 30}',
      '    fmt.Println("Angka ke-5:", numbers[4])',
      '}'
    ],
    bugLineIndex: 4, // 0-indexed
    bugExplanation: "Panik runtime! Slice 'numbers' hanya memiliki 3 elemen (indeks 0, 1, 2). Mengakses indeks 4 memicu 'panic: runtime error: index out of range [4] with length 3'.",
    fixCode: '    fmt.Println("Angka ke-2:", numbers[1])',
  },
  {
    id: "go-2",
    language: "Go",
    langIcon: "🐹",
    langColor: "#00ADD8",
    title: "Syntax Error: Kurang Tanda Koma di Akhir Multiline Struct",
    codeLines: [
      'type User struct {',
      '    Name string',
      '    Age  int',
      '}',
      'u := User{',
      '    Name: "Budi"',
      '    Age:  25', // missing comma
      '}'
    ],
    bugLineIndex: 6,
    bugExplanation: "Go mewajibkan setiap baris pada deklarasi multiline Struct/Map/Slice diakhiri dengan tanda koma ',', termasuk baris elemen terakhir sebelum kurung penutup '}'.",
    fixCode: '    Age:  25,',
  },
  {
    id: "go-3",
    language: "Go",
    langIcon: "🐹",
    langColor: "#00ADD8",
    title: "Compile Error: Variabel Dibuat Tapi Menganggur",
    codeLines: [
      'package main',
      'import "fmt"',
      'func main() {',
      '    skorRahasia := 999', // unused
      '    fmt.Println("Selamat datang di Game!")',
      '}'
    ],
    bugLineIndex: 3,
    bugExplanation: "Compiler Go melarang variabel yang tidak terpakai ('skorRahasia declared and not used') untuk mencegah pemborosan memori.",
    fixCode: '    // Hapus atau gunakan skorRahasia',
  },

  // 2. PYTHON BUGS
  {
    id: "py-1",
    language: "Python",
    langIcon: "🐍",
    langColor: "#3776AB",
    title: "SyntaxError: Kurang Tanda Titik Dua (:)",
    codeLines: [
      'def hitung_diskon(total):',
      '    if total >= 100000', // missing colon
      '        return total * 0.9',
      '    return total'
    ],
    bugLineIndex: 1,
    bugExplanation: "Di Python, semua blok percabangan (if, elif, else) dan perulangan wajib diakhiri dengan tanda titik dua ':' sebelum baris baru.",
    fixCode: '    if total >= 100000:',
  },
  {
    id: "py-2",
    language: "Python",
    langIcon: "🐍",
    langColor: "#3776AB",
    title: "TypeError: Menggabungkan String dengan Integer",
    codeLines: [
      'nama = "Kevin"',
      'level = 5',
      'pesan = "Pemain: " + nama + " | Level: " + level', // TypeError
      'print(pesan)'
    ],
    bugLineIndex: 2,
    bugExplanation: "Python tidak otomatis mengubah integer menjadi string. Menjumlahkan String + Integer menghasilkan 'TypeError: can only concatenate str to str, not int'.",
    fixCode: 'pesan = f"Pemain: {nama} | Level: {level}"',
  },

  // 3. JAVA BUGS
  {
    id: "java-1",
    language: "Java",
    langIcon: "☕",
    langColor: "#f89820",
    title: "NullPointerException: Memanggil Method pada Objek Null",
    codeLines: [
      'public class Main {',
      '    public static void main(String[] args) {',
      '        String teks = null;',
      '        int panjang = teks.length();', // NPE
      '        System.out.println(panjang);',
      '    }',
      '}'
    ],
    bugLineIndex: 3,
    bugExplanation: "Variabel 'teks' bernilai null (belum menunjuk ke memori objek nyata). Memanggil method .length() langsung memicu java.lang.NullPointerException.",
    fixCode: '        String teks = "Halo";',
  },
  {
    id: "java-2",
    language: "Java",
    langIcon: "☕",
    langColor: "#f89820",
    title: "Logic Bug: Perbandingan String Menggunakan ==",
    codeLines: [
      'String passwordInput = new String("rahasia123");',
      'if (passwordInput == "rahasia123") {', // wrong equals
      '    System.out.println("Login Berhasil!");',
      '} else {',
      '    System.out.println("Password Salah!");',
      '}'
    ],
    bugLineIndex: 1,
    bugExplanation: "Di Java, operator '==' membandingkan alamat referensi memori, bukan isi teksnya. Gunakan .equals() untuk membandingkan isi string.",
    fixCode: 'if (passwordInput.equals("rahasia123")) {',
  },

  // 4. JAVASCRIPT BUGS
  {
    id: "js-1",
    language: "JavaScript",
    langIcon: "🟨",
    langColor: "#E5A00D",
    title: "TypeError: Menimpa Nilai Variabel Const",
    codeLines: [
      'const MAX_ATTEMPTS = 3;',
      'let currentAttempt = 1;',
      'MAX_ATTEMPTS = 5;', // assignment to constant
      'console.log(MAX_ATTEMPTS);'
    ],
    bugLineIndex: 2,
    bugExplanation: "Variabel yang dideklarasikan dengan 'const' bersifat tetap dan tidak boleh di-assign ulang nilainya ('Assignment to constant variable').",
    fixCode: 'let MAX_ATTEMPTS = 5;',
  },

  // 5. PHP BUGS
  {
    id: "php-1",
    language: "PHP",
    langIcon: "🐘",
    langColor: "#8892BF",
    title: "Type Error: Menggabungkan String dengan Tanda Plus (+)",
    codeLines: [
      '<?php',
      '$depan = "Budi";',
      '$belakang = "Santoso";',
      '$lengkap = $depan + " " + $belakang;', // PHP string concat is dot (.)
      'echo $lengkap;'
    ],
    bugLineIndex: 3,
    bugExplanation: "Di PHP, operator '+' hanya digunakan untuk penjumlahan aritmatika angka. Untuk menggabungkan string, PHP menggunakan operator titik '.' (dot).",
    fixCode: '$lengkap = $depan . " " . $belakang;',
  },
];

export default function BugHunterGameLab() {
  const [gameState, setGameState] = useState("ready"); // "ready" | "playing" | "gameover"
  const [currentBugIndex, setCurrentBugIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [maxCombo, setMaxCombo] = useState(1);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bugsSquashed, setBugsSquashed] = useState(0);
  const [selectedLineIdx, setSelectedLineIdx] = useState(null);
  const [feedback, setFeedback] = useState(null); // { isCorrect, message }

  const timerRef = useRef(null);

  // Randomized bug queue
  const [bugQueue, setBugQueue] = useState([]);

  const currentChallenge = bugQueue[currentBugIndex] || BUG_BANK[0];

  const startGame = () => {
    // Shuffle bugs
    const shuffled = [...BUG_BANK].sort(() => 0.5 - Math.random());
    setBugQueue(shuffled);
    setCurrentBugIndex(0);
    setScore(0);
    setCombo(1);
    setMaxCombo(1);
    setLives(3);
    setTimeLeft(60);
    setBugsSquashed(0);
    setSelectedLineIdx(null);
    setFeedback(null);
    setGameState("playing");
  };

  // 60-Second Countdown Timer
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState("gameover");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, timeLeft]);

  // Handle clicking on a code line
  const handleLineClick = (lineIndex) => {
    if (gameState !== "playing" || feedback) return;

    setSelectedLineIdx(lineIndex);
    const isCorrect = lineIndex === currentChallenge.bugLineIndex;

    if (isCorrect) {
      // Correct bug found!
      const pointsEarned = 100 * combo + Math.floor(timeLeft * 2);
      const nextCombo = combo + 1;
      const nextScore = score + pointsEarned;
      setScore(nextScore);
      setCombo(nextCombo);
      if (nextCombo > maxCombo) setMaxCombo(nextCombo);
      setBugsSquashed((prev) => prev + 1);

      setFeedback({
        isCorrect: true,
        title: "🎯 BUG BERHASIL DIMUSNAHKAN!",
        explanation: currentChallenge.bugExplanation,
        points: pointsEarned,
      });

      // Confetti burst!
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#10b981", "#00ADD8", "#f59e0b"],
        });
      } catch {}

      // Auto next after 1.8s
      setTimeout(() => {
        setSelectedLineIdx(null);
        setFeedback(null);
        if (currentBugIndex < bugQueue.length - 1) {
          setCurrentBugIndex((prev) => prev + 1);
        } else {
          // Loop shuffle again
          setBugQueue((prev) => [...prev].sort(() => 0.5 - Math.random()));
          setCurrentBugIndex(0);
        }
      }, 2000);
    } else {
      // Wrong line clicked! Lose 1 heart & reset combo
      const nextLives = lives - 1;
      setLives(nextLives);
      setCombo(1);

      setFeedback({
        isCorrect: false,
        title: "❌ BUKAN BARIS ITU!",
        explanation: "Baris tersebut tidak memiliki bug. Teliti lagi baris lainnya!",
        points: 0,
      });

      if (nextLives <= 0) {
        clearInterval(timerRef.current);
        setGameState("gameover");
      } else {
        setTimeout(() => {
          setSelectedLineIdx(null);
          setFeedback(null);
        }, 1200);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 md:px-6 py-6 space-y-6 pb-28">
      {/* 1. Game Header & Stats Bar */}
      <div className="bg-white dark:bg-[#162032] p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-mono font-bold text-xs uppercase tracking-wider mb-1">
            <Bug size={16} />
            <span>Arcade Speed Debugging Arena</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Bug Hunter 60-Detik
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Temukan dan klik baris kode yang memiliki bug tersembunyi sebelum waktu habis!
          </p>
        </div>

        {/* Live Arcade HUD: Timer, Hearts, Combo, Score */}
        {gameState === "playing" && (
          <div className="flex items-center gap-3 flex-wrap">
            {/* Lives / Hearts */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              {[1, 2, 3].map((heartNum) => (
                <Heart
                  key={heartNum}
                  size={16}
                  className={heartNum <= lives ? "fill-rose-500 text-rose-500" : "text-slate-300 dark:text-slate-600"}
                />
              ))}
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border font-mono font-black text-sm ${
              timeLeft <= 10 ? "bg-rose-500 text-white animate-pulse" : "bg-slate-100 dark:bg-black/30 text-slate-900 dark:text-white border-slate-200 dark:border-white/10"
            }`}>
              <Timer size={16} />
              <span>{timeLeft}s</span>
            </div>

            {/* Combo Streak */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono font-black text-xs">
              <Flame size={14} className="fill-amber-500 animate-bounce" />
              <span>Combo x{combo}</span>
            </div>

            {/* Score */}
            <div className="px-3.5 py-1.5 rounded-2xl bg-[#04AA6D] text-white font-mono font-black text-sm shadow-xs">
              {score.toLocaleString()} PTS
            </div>
          </div>
        )}
      </div>

      {/* 2. Ready Screen */}
      {gameState === "ready" && (
        <div className="bg-white dark:bg-[#162032] p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/15 text-[#04AA6D] flex items-center justify-center mx-auto shadow-sm animate-bounce">
            <Bug size={40} />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Uji Kecepatan Mata Debugging Anda!
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Anda memiliki waktu <strong>60 detik</strong> dan <strong>3 nyawa ❤️</strong>. Klik langsung baris kode yang menyimpan bug sintaks atau logika runtime!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-xs text-slate-600 dark:text-slate-300 font-mono">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5">
              ⚡ <strong>Multi-Bahasa:</strong> Go, Java, Python, JS, PHP
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5">
              🔥 <strong>Streak Combo:</strong> Pengali Skor x2, x3, x5
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5">
              💡 <strong>Instant Learn:</strong> Penjelasan Solusi
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-[#04AA6D] hover:bg-[#038857] text-white font-black text-sm transition-all flex items-center justify-center gap-2 mx-auto shadow-lg active:scale-98 cursor-pointer"
          >
            <Play size={18} className="fill-white" />
            <span>Mulai Game Bug Hunter Sekarang! »</span>
          </button>
        </div>
      )}

      {/* 3. Live Game Playing Screen */}
      {gameState === "playing" && currentChallenge && (
        <div className="space-y-4">
          {/* Target Language Card Header */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentChallenge.langIcon}</span>
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                Bahasa: <strong style={{ color: currentChallenge.langColor }}>{currentChallenge.language}</strong>
              </span>
              <span className="text-xs text-slate-400">• {currentChallenge.title}</span>
            </div>

            <span className="text-[11px] font-mono text-slate-400">
              Bug #{bugsSquashed + 1}
            </span>
          </div>

          {/* Code Inspector Box (Interactive Clickable Lines) */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-md bg-slate-950 font-mono text-xs select-none">
            <div className="px-4 py-2 bg-slate-900 border-b border-white/5 flex items-center justify-between text-slate-400 text-[11px]">
              <span>main.{currentChallenge.language.toLowerCase()}</span>
              <span className="text-amber-400 flex items-center gap-1 font-bold">
                <Sparkles size={13} /> Klik baris yang menurutmu adalah BUG!
              </span>
            </div>

            <div className="p-2 sm:p-4 space-y-1">
              {currentChallenge.codeLines.map((line, lIdx) => {
                const isSelected = selectedLineIdx === lIdx;
                const isTheBug = lIdx === currentChallenge.bugLineIndex;

                let rowBg = "hover:bg-white/10 text-slate-300";
                if (isSelected) {
                  if (isTheBug) {
                    rowBg = "bg-emerald-500/30 text-emerald-300 border-l-4 border-emerald-500";
                  } else {
                    rowBg = "bg-rose-500/30 text-rose-300 border-l-4 border-rose-500 animate-shake";
                  }
                }

                return (
                  <div
                    key={lIdx}
                    onClick={() => handleLineClick(lIdx)}
                    className={`flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer ${rowBg}`}
                  >
                    <span className="w-6 text-right text-slate-600 select-none text-[10px]">
                      {lIdx + 1}
                    </span>
                    <pre className="font-mono text-xs flex-1 whitespace-pre-wrap">{line}</pre>
                    {isSelected && isTheBug && (
                      <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1 shrink-0">
                        <CheckCircle2 size={14} /> BUG FOUND!
                      </span>
                    )}
                    {isSelected && !isTheBug && (
                      <span className="text-rose-400 text-[11px] font-bold flex items-center gap-1 shrink-0">
                        <XCircle size={14} /> WRONG LINE!
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback Explanation Card */}
          {feedback && (
            <div className={`p-4 rounded-2xl border text-xs font-mono space-y-1.5 animate-fadeIn ${
              feedback.isCorrect
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                : "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300"
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span>{feedback.title}</span>
                {feedback.points > 0 && <span>+{feedback.points} PTS!</span>}
              </div>
              <p className="text-[11px] font-sans text-slate-700 dark:text-slate-300 leading-relaxed">
                {feedback.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 4. Game Over Screen */}
      {gameState === "gameover" && (
        <div className="bg-white dark:bg-[#162032] p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg text-center space-y-6 animate-scaleUp">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/15 text-amber-500 flex items-center justify-center mx-auto shadow-sm">
            <Trophy size={40} />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono uppercase font-bold text-slate-400">Game Selesai!</span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Hasil Debugging Speed Run
            </h2>
          </div>

          {/* Final Score Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto font-mono">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 block font-bold">SKOR TOTAL</span>
              <div className="text-xl font-black text-[#04AA6D]">{score.toLocaleString()}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 block font-bold">BUG DITUMPAS</span>
              <div className="text-xl font-black text-blue-500">{bugsSquashed}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 block font-bold">MAX COMBO</span>
              <div className="text-xl font-black text-amber-500">x{maxCombo}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] text-slate-400 block font-bold">XP REWARD</span>
              <div className="text-xl font-black text-purple-500">+{Math.round(score / 20)} XP</div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-[#04AA6D] hover:bg-[#038857] text-white font-black text-sm transition-all flex items-center justify-center gap-2 mx-auto shadow-md cursor-pointer"
          >
            <RotateCcw size={16} />
            <span>Mainkan Lagi (Coba Rebut Skor Tertinggi!) »</span>
          </button>
        </div>
      )}
    </div>
  );
}
