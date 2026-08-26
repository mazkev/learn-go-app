import React, { useState, useEffect } from "react";
import {
  Swords,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Sparkles,
  Trophy,
  ChevronRight,
  Flame,
  Zap,
  BarChart3,
  HelpCircle,
  Check,
  ArrowRight,
  Share2
} from "lucide-react";
import { ROADMAP_MODULES } from "../../data/curriculum";

export function extractAllQuizQuestions() {
  const list = [];
  ROADMAP_MODULES.forEach((mod) => {
    mod.lessons.forEach((lesson) => {
      if (lesson.quiz && Array.isArray(lesson.quiz)) {
        lesson.quiz.forEach((q, idx) => {
          list.push({
            id: `${lesson.id}-q-${idx}`,
            moduleId: mod.id,
            moduleTitle: mod.title,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            category: mod.order <= 2 ? "Dasar & Struktur Data" : mod.order <= 4 ? "OOP, Pointer & Concurrency" : "Web, Database & Arsitektur",
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || "Jawaban ini sesuai dengan spesifikasi dan standar idiomatik Go.",
          });
        });
      }
    });
  });
  return list;
}

export default function QuizArenaLab() {
  const allQuestions = extractAllQuizQuestions();

  // Arena States: 'setup' | 'playing' | 'result'
  const [arenaState, setArenaState] = useState("setup");
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timerEnabled, setTimerEnabled] = useState(true);

  // Active Game States
  const [activeQuizList, setActiveQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: selectedOptionIndex }
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins default
  const [isFinished, setIsFinished] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Countdown timer
  useEffect(() => {
    let timer = null;
    if (arenaState === "playing" && timerEnabled && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [arenaState, timerEnabled, timeLeft]);

  // Keyboard shortcut listener for A, B, C, D (0, 1, 2, 3)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (arenaState !== "playing") return;
      const key = e.key.toUpperCase();
      const currentQ = activeQuizList[currentIndex];
      if (!currentQ) return;

      let chosenIndex = null;
      if (key === "1" || key === "A") chosenIndex = 0;
      if (key === "2" || key === "B") chosenIndex = 1;
      if (key === "3" || key === "C") chosenIndex = 2;
      if (key === "4" || key === "D") chosenIndex = 3;

      if (chosenIndex !== null && chosenIndex < currentQ.options.length) {
        handleSelectOption(currentQ.id, chosenIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [arenaState, currentIndex, activeQuizList]);

  const handleStartQuiz = () => {
    let filtered = allQuestions;
    if (selectedCategory !== "all") {
      filtered = allQuestions.filter((q) => q.category === selectedCategory);
    }

    // Shuffle
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setActiveQuizList(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setTimeLeft(selected.length * 30); // 30s per question
    setArenaState("playing");
    setIsFinished(false);
  };

  const handleSelectOption = (qId, optionIdx) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx,
    }));
  };

  const handleNext = () => {
    if (currentIndex < activeQuizList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    setArenaState("result");
    setIsFinished(true);
  };

  // Evaluation calculations
  const totalQuestions = activeQuizList.length;
  let correctCount = 0;
  const topicStats = {};

  activeQuizList.forEach((q) => {
    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    if (isCorrect) correctCount++;

    if (!topicStats[q.category]) {
      topicStats[q.category] = { total: 0, correct: 0 };
    }
    topicStats[q.category].total++;
    if (isCorrect) topicStats[q.category].correct++;
  });

  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Rank determination
  let rankBadge = {
    title: "Gopher Apprentice 🌱",
    color: "text-amber-500",
    desc: "Awal yang bagus! Terus pelajari konsep-konsep inti Golang di modul tutorial.",
  };
  if (scorePercentage >= 90) {
    rankBadge = {
      title: "Gopher Architect 🏆",
      color: "text-emerald-500",
      desc: "Luar biasa! Pemahaman Anda tentang memori, konkurensi, dan arsitektur Go sangat solid.",
    };
  } else if (scorePercentage >= 70) {
    rankBadge = {
      title: "Senior Gopher ⚔️",
      color: "text-blue-500",
      desc: "Kemampuan teknis yang mantap! Siap untuk tantangan backend level industri.",
    };
  }

  const currentQ = activeQuizList[currentIndex];
  const progressPercent = totalQuestions > 0 ? Math.round(((currentIndex + 1) / totalQuestions) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-bold text-xs uppercase tracking-wider mb-1.5">
            <Swords size={15} />
            <span>Interactive Skill Evaluation</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black theme-heading tracking-tight">
            Go <span className="gopher-gradient-text">Knowledge Arena</span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1 max-w-xl leading-relaxed">
            Uji pemahaman sintaks, memori, konkurensi, dan arsitektur Go secara komprehensif dengan simulasi kuis interaktif.
          </p>
        </div>

        {arenaState === "playing" && (
          <div className="flex items-center gap-3">
            {timerEnabled && (
              <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm ${
                timeLeft < 60 ? "bg-rose-500/10 text-rose-500 border-rose-500/30 animate-pulse" : "theme-card-subtle theme-heading"
              }`}>
                <Clock size={14} />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}
            <button
              onClick={() => setArenaState("setup")}
              className="px-3 py-1.5 rounded-xl theme-card-subtle text-xs font-bold theme-muted hover:theme-heading cursor-pointer"
            >
              Keluar
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: SETUP SCREEN */}
      {arenaState === "setup" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="theme-card rounded-2xl p-6 md:p-8 space-y-6 shadow-md border border-slate-200 dark:border-white/[0.08]">
            <h2 className="text-base font-extrabold theme-heading flex items-center gap-2">
              <Flame size={18} className="text-[#04AA6D]" /> Konfigurasi Tantangan Kuis
            </h2>

            {/* 1. Pilih Jumlah Soal */}
            <div className="space-y-3">
              <label className="text-xs font-bold theme-muted uppercase tracking-wider block">
                1. Pilih Mode / Jumlah Soal
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { count: 5, label: "⚡ Quick Sprint", desc: "5 Soal (~2.5 Menit)", badge: "Cepat" },
                  { count: 10, label: "⚔️ Standard Evaluation", desc: "10 Soal (~5 Menit)", badge: "Rekomendasi" },
                  { count: 20, label: "👑 Master Exam", desc: "20 Soal (~10 Menit)", badge: "Komprehensif" },
                ].map((mode) => (
                  <div
                    key={mode.count}
                    onClick={() => setQuestionCount(mode.count)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      questionCount === mode.count
                        ? "border-[#04AA6D] bg-[#04AA6D]/5 ring-1 ring-[#04AA6D]"
                        : "theme-card-subtle hover:border-[#04AA6D]/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm theme-heading">{mode.label}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#04AA6D]/15 text-[#04AA6D]">
                          {mode.badge}
                        </span>
                      </div>
                      <p className="text-xs theme-muted">{mode.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Pilih Kategori Topik */}
            <div className="space-y-3">
              <label className="text-xs font-bold theme-muted uppercase tracking-wider block">
                2. Fokus Topik
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-bold">
                {[
                  { id: "all", label: "🌐 Seluruh Materi" },
                  { id: "Dasar & Struktur Data", label: "📦 Dasar & Data" },
                  { id: "OOP, Pointer & Concurrency", label: "⚡ OOP & Goroutines" },
                  { id: "Web, Database & Arsitektur", label: "🏛️ Web & Arsitektur" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-[#04AA6D] text-white border-[#04AA6D] shadow-sm"
                        : "theme-card-subtle theme-heading hover:border-[#04AA6D]/40"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Toggle Timer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/[0.08]">
              <div>
                <span className="text-xs font-extrabold theme-heading block">Timer Hitung Mundur</span>
                <span className="text-[11px] theme-muted">Beri batas waktu 30 detik per soal</span>
              </div>
              <input
                type="checkbox"
                checked={timerEnabled}
                onChange={(e) => setTimerEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#04AA6D] cursor-pointer"
              />
            </div>

            {/* Action Start Button */}
            <button
              onClick={handleStartQuiz}
              className="w-full w3-btn-green py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-transform active:scale-[0.99]"
            >
              <Swords size={18} />
              <span>Mulai Tantangan Kuis ({questionCount} Soal)</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: ACTIVE QUESTION SCREEN */}
      {arenaState === "playing" && currentQ && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Progress Bar & Header Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="theme-muted">
                Soal <strong className="text-[#04AA6D] font-mono text-sm">{currentIndex + 1}</strong> dari {totalQuestions}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#04AA6D]/15 text-[#04AA6D] font-mono">
                {currentQ.category}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#04AA6D] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="theme-card rounded-2xl p-6 md:p-8 space-y-6 shadow-md border border-slate-200 dark:border-white/[0.08]">
            <div className="space-y-2">
              <span className="text-[11px] font-mono theme-muted">
                Sumber: {currentQ.moduleTitle} • {currentQ.lessonTitle}
              </span>
              <h2 className="text-base md:text-lg font-extrabold theme-heading leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                const letter = ["A", "B", "C", "D"][idx] || idx + 1;

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? "border-[#04AA6D] bg-[#04AA6D]/10 ring-1 ring-[#04AA6D] text-[#04AA6D] font-bold"
                        : "theme-card-subtle theme-heading hover:border-[#04AA6D]/40"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? "bg-[#04AA6D] text-white"
                          : "bg-black/5 dark:bg-white/10 theme-heading"
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-xs md:text-sm leading-relaxed pt-0.5">{option}</span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Nav Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/[0.08]">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl theme-card-subtle text-xs font-bold theme-heading disabled:opacity-30 cursor-pointer"
              >
                « Sebelumnya
              </button>

              <div className="text-[11px] theme-muted hidden md:block">
                Tip: Tekan tombol angka <code>1-4</code> atau huruf <code>A-D</code> di keyboard
              </div>

              <button
                onClick={handleNext}
                disabled={userAnswers[currentQ.id] === undefined}
                className="w3-btn-green px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md disabled:opacity-40 cursor-pointer"
              >
                <span>{currentIndex === totalQuestions - 1 ? "Selesaikan Kuis 🏁" : "Selanjutnya »"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: RESULTS & DIAGNOSIS SCREEN */}
      {arenaState === "result" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Result Hero Card */}
          <div className="theme-card rounded-2xl p-6 md:p-8 text-center space-y-4 shadow-lg border border-slate-200 dark:border-white/[0.08]">
            <div className="w-16 h-16 rounded-2xl bg-[#04AA6D]/15 text-[#04AA6D] mx-auto flex items-center justify-center shadow-inner">
              <Trophy size={32} />
            </div>

            <div>
              <span className={`text-xs font-black uppercase tracking-wider ${rankBadge.color}`}>
                {rankBadge.title}
              </span>
              <h2 className="text-3xl md:text-5xl font-black theme-heading tracking-tight mt-1">
                {scorePercentage}%
              </h2>
              <p className="text-xs theme-muted mt-1">
                Menjawab benar <strong className="text-emerald-500 font-bold">{correctCount}</strong> dari {totalQuestions} soal
              </p>
            </div>

            <p className="text-xs md:text-sm theme-muted max-w-md mx-auto leading-relaxed">
              {rankBadge.desc}
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleStartQuiz}
                className="w3-btn-green px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Ulangi Kuis</span>
              </button>
              <button
                onClick={() => setArenaState("setup")}
                className="px-4 py-2.5 rounded-xl theme-card-subtle text-xs font-bold theme-heading hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                Kembali ke Menu
              </button>
            </div>
          </div>

          {/* Topic Breakdown Bar Stats */}
          <div className="theme-card rounded-2xl p-6 space-y-4 shadow-md border border-slate-200 dark:border-white/[0.08]">
            <h3 className="text-xs font-extrabold theme-heading uppercase tracking-wider flex items-center gap-2">
              <BarChart3 size={15} className="text-[#04AA6D]" /> Evaluasi Kekuatan Per Topik
            </h3>

            <div className="space-y-3">
              {Object.entries(topicStats).map(([topic, stat]) => {
                const percent = Math.round((stat.correct / stat.total) * 100);

                return (
                  <div key={topic} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="theme-heading">{topic}</span>
                      <span className="font-mono text-[11px] theme-muted">
                        {stat.correct}/{stat.total} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          percent >= 80 ? "bg-emerald-500" : percent >= 50 ? "bg-amber-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold theme-heading uppercase tracking-wider flex items-center gap-2">
              <HelpCircle size={15} className="text-[#04AA6D]" /> Review Kunci Jawaban & Pembahasan
            </h3>

            <div className="space-y-3">
              {activeQuizList.map((q, qIndex) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isCorrect
                        ? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/10"
                        : "border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider theme-muted">
                          Soal #{qIndex + 1} • {q.lessonTitle}
                        </span>
                        <h4 className="text-xs md:text-sm font-extrabold theme-heading leading-snug">
                          {q.question}
                        </h4>
                      </div>
                      {isCorrect ? (
                        <span className="text-emerald-500 font-bold text-xs flex items-center gap-1 shrink-0">
                          <CheckCircle2 size={16} /> Benar
                        </span>
                      ) : (
                        <span className="text-rose-500 font-bold text-xs flex items-center gap-1 shrink-0">
                          <XCircle size={16} /> Salah
                        </span>
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/[0.08] space-y-2 text-xs">
                      <div className="space-y-1">
                        <p className="theme-muted">
                          Jawaban Anda:{" "}
                          <strong className={isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                            {userChoice !== undefined ? q.options[userChoice] : "Tidak Dijawab"}
                          </strong>
                        </p>
                        {!isCorrect && (
                          <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                            Kunci Jawaban: {q.options[q.correctAnswer]}
                          </p>
                        )}
                      </div>

                      <div className="p-3 rounded-xl theme-inset text-[11px] theme-body leading-relaxed mt-2">
                        <strong className="text-[#04AA6D] font-bold block mb-0.5">💡 Penjelasan:</strong>
                        <p className="theme-muted">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
