import React, { useState, useEffect, useMemo } from "react";
import {
  Briefcase,
  UserCheck,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  MessageSquare,
  Play,
  Volume2,
  VolumeX,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Building,
  Target
} from "lucide-react";

export const INTERVIEW_PERSONAS = [
  {
    id: "alex",
    name: "Alex Pratama",
    title: "Principal Engineer @ GoTo / Tier-1 Tech",
    avatar: "👔",
    color: "#00ADD8",
    style: "Fokus pada arsitektur konkurensi, bottleneck sistem, dan skalabilitas microservices.",
  },
  {
    id: "sarah",
    name: "Sarah Jenkins",
    title: "Senior Backend Lead @ Shopee Global",
    avatar: "👩‍💻",
    color: "#f89820",
    style: "Fokus pada alokasi memori runtime, clean code, dan penanganan kegagalan database.",
  },
  {
    id: "david",
    name: "David Chen",
    title: "Engineering Manager @ FinTech Unicorn",
    avatar: "⚡",
    color: "#10b981",
    style: "Fokus pada keandalan sistem transaksi finansial, idempotency, dan rate limiting.",
  },
];

export const MOCK_INTERVIEW_TRACKS = {
  go: {
    title: "🐹 Go Backend Engineer Track",
    language: "Go",
    questions: [
      {
        id: "g1",
        stage: "Stage 1: Memory & Runtime Internals",
        scenario: "Dalam sistem pembayaran ber-throughput tinggi, tim Anda mendeteksi lonjakan CPU akibat Garbage Collection (GC).",
        question: "Bagaimana cara Anda meminimalkan alokasi memori pada heap di Go untuk meredam beban Garbage Collector?",
        options: [
          {
            id: "a",
            text: "Menggunakan sync.Pool untuk me-reuse struct objek dan menghindari konversi string <-> []byte yang tidak perlu.",
            isCorrect: true,
            score: 25,
            feedback: "Tepat sekali! sync.Pool sangat efektif mereduksi alokasi objek sementara di heap, meringankan beban GC secara signifikan.",
          },
          {
            id: "b",
            text: "Mengganti semua pass-by-value menjadi pointer (*) pada semua struct kecil 8 byte.",
            isCorrect: false,
            score: 5,
            feedback: "Kurang tepat. Mengoper pointer pada struct kecil justru sering memicu 'escape to heap', yang malah menambah beban GC!",
          },
          {
            id: "c",
            text: "Menonaktifkan Garbage Collector secara permanen dengan debug.SetGCPercent(-1).",
            isCorrect: false,
            score: 0,
            feedback: "Sangat berbahaya! Mematikan GC akan memicu Out-Of-Memory (OOM) crash saat server berjalan beberapa jam.",
          },
        ],
      },
      {
        id: "g2",
        stage: "Stage 2: Concurrency & Race Condition",
        scenario: "Ada 1.000 goroutine paralel yang secara bersamaan membaca dan memperbarui saldo dompet pengguna di dalam map memori.",
        question: "Pendekatan mana yang paling aman dan berkinerja tinggi untuk mencegah data race panic di Go?",
        options: [
          {
            id: "a",
            text: "Menggunakan sync.RWMutex (Lock untuk tulis, RLock untuk baca) atau sync.Map bawaan Go.",
            isCorrect: true,
            score: 25,
            feedback: "Sempurna! sync.RWMutex mengizinkan multi-reader tanpa memblokir satu sama lain, sangat ideal untuk rasio baca-tinggi.",
          },
          {
            id: "b",
            text: "Membiarkan map diakses langsung karena Go runtime otomatis menangani thread-safety map.",
            isCorrect: false,
            score: 0,
            feedback: "Fatal error! Map standar di Go TIDAK thread-safe dan akan memicu 'fatal error: concurrent map writes' yang langsung mematikan aplikasi.",
          },
          {
            id: "c",
            text: "Menggunakan time.Sleep(1 * time.Millisecond) sebelum setiap goroutine mengakses map.",
            isCorrect: false,
            score: 0,
            feedback: "Salah. time.Sleep bukan mekanisme sinkronisasi dan tidak menjamin pencegahan data race.",
          },
        ],
      },
      {
        id: "g3",
        stage: "Stage 3: Distributed Microservices Resilience",
        scenario: "Service downstream katalog produk pihak ketiga mengalami overload dan lambat merespons (&gt;10 detik). Service Anda mulai kehabisan koneksi goroutine.",
        question: "Pola arsitektur apa yang wajib Anda pasang di Go API Gateway untuk melindungi sistem dari efek domino?",
        options: [
          {
            id: "a",
            text: "Menerapkan context.WithTimeout dan Circuit Breaker (seperti sony/gobreaker) untuk fast-fail.",
            isCorrect: true,
            score: 25,
            feedback: "Luar biasa! Context timeout memutus request gantung, dan Circuit Breaker mencegah request berikutnya membebani downstream yang sedang tumbang.",
          },
          {
            id: "b",
            text: "Melipatgandakan timeout HTTP client menjadi 60 detik agar semua request berhasil selesai.",
            isCorrect: false,
            score: 0,
            feedback: "Keliru. Memperbesar timeout justru membuat ribuan goroutine menumpuk di memori dan memicu cascading failure.",
          },
          {
            id: "c",
            text: "Mengabaikan error HTTP dan selalu mengembalikan data kosong status 200 OK.",
            isCorrect: false,
            score: 5,
            feedback: "Kurang baik karena menyembunyikan status kegagalan nyata dari sistem pemantau (monitoring).",
          },
        ],
      },
      {
        id: "g4",
        stage: "Stage 4: Database Transactions & Idempotency",
        scenario: "Pengguna menekan tombol 'Bayar Pesanan' 3 kali berturut-turut dalam 1 detik karena koneksi internet lambat.",
        question: "Bagaimana cara Anda menjamin bahwa saldo pengguna hanya terpotong tepat 1 kali (*Idempotent Payment*)?",
        options: [
          {
            id: "a",
            text: "Mengirim Idempotency-Key unik dari client dan menyimpannya di Redis dengan atomic SETNX / DB Unique Constraint.",
            isCorrect: true,
            score: 25,
            feedback: "Jawaban level Senior! Idempotency key di Redis/DB mencegah eksekusi duplikat meskipun request dikirim berulang kali.",
          },
          {
            id: "b",
            text: "Memeriksa saldo di database, lalu melakukan update jika saldo cukup tanpa transaksi atomic.",
            isCorrect: false,
            score: 5,
            feedback: "Rentan race condition! 3 request konkuren bisa membaca saldo yang sama sebelum salah satu sempat mengupdate.",
          },
          {
            id: "c",
            text: "Menonaktifkan tombol di aplikasi frontend saja tanpa validasi di backend server.",
            isCorrect: false,
            score: 0,
            feedback: "Sangat berisiko karena frontend mudah di-bypass menggunakan tools seperti Postman atau curl.",
          },
        ],
      },
    ],
  },
  java: {
    title: "☕ Java Enterprise Engineer Track",
    language: "Java",
    questions: [
      {
        id: "jv1",
        stage: "Stage 1: JVM & Memory Model",
        scenario: "Aplikasi Spring Boot Anda mengalami 'java.lang.OutOfMemoryError: Java heap space' setelah running 2 hari.",
        question: "Apa langkah awal Anda untuk mendiagnosa akar penyebab kebocoran memori (memory leak) tersebut?",
        options: [
          {
            id: "a",
            text: "Mengambil Heap Dump (jcmd / Eclipse Memory Analyzer) untuk menganalisis objek dominan yang tidak ter-garbage collect.",
            isCorrect: true,
            score: 25,
            feedback: "Tepat sekali! Heap dump inspector akan menunjukkan referensi statis atau unclosed resources yang menahan memori.",
          },
          {
            id: "b",
            text: "Langsung memperbesar -Xmx menjadi 32GB tanpa menganalisis kode.",
            isCorrect: false,
            score: 5,
            feedback: "Memperbesar RAM hanya menunda waktu crash jika terdapat memory leak aktif di kode aplikasi.",
          },
        ],
      },
      {
        id: "jv2",
        stage: "Stage 2: Spring Data JPA & N+1 Problem",
        scenario: "Endpoint menampilkan 100 User beserta Order-nya memicu 101 query SQL terpisah ke database PostgreSQL.",
        question: "Bagaimana cara Anda menyelesaikan masalah N+1 Query ini di Spring Data JPA?",
        options: [
          {
            id: "a",
            text: "Menggunakan 'JOIN FETCH' pada query JPQL atau menggunakan anotasi @EntityGraph.",
            isCorrect: true,
            score: 25,
            feedback: "Sempurna! JOIN FETCH menggabungkan relasi dalam 1 query SQL tunggal yang sangat efisien.",
          },
          {
            id: "b",
            text: "Mengubah FetchType dari LAZY menjadi EAGER di semua entity.",
            isCorrect: false,
            score: 0,
            feedback: "Eager fetching justru memperparah N+1 query di banyak skenario relasi.",
          },
        ],
      },
    ],
  },
  python: {
    title: "🐍 Python AI & Backend Track",
    language: "Python",
    questions: [
      {
        id: "py1",
        stage: "Stage 1: Concurrency & Asyncio",
        scenario: "Anda membangun REST API dengan FastAPI yang memanggil 5 API eksternal secara independen.",
        question: "Bagaimana cara Anda mempercepat response time total dari 5 panggilan API tersebut?",
        options: [
          {
            id: "a",
            text: "Menggunakan asyncio.gather() dengan HTTP client async seperti httpx.",
            isCorrect: true,
            score: 25,
            feedback: "Tepat sekali! asyncio.gather menjalankan ke-5 request secara paralel non-blocking.",
          },
          {
            id: "b",
            text: "Memanggil library 'requests' standar di dalam perulangan for biasa.",
            isCorrect: false,
            score: 5,
            feedback: "Requests standar bersifat blocking/sinkronus, sehingga waktu total menjadi penjumlahan waktu ke-5 API.",
          },
        ],
      },
    ],
  },
};

export default function MockInterviewSimulator() {
  const [selectedTrackKey, setSelectedTrackKey] = useState("go");
  const [selectedPersonaId, setSelectedPersonaId] = useState("alex");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(true);

  const persona = useMemo(() => {
    return INTERVIEW_PERSONAS.find((p) => p.id === selectedPersonaId) || INTERVIEW_PERSONAS[0];
  }, [selectedPersonaId]);

  const track = useMemo(() => {
    return MOCK_INTERVIEW_TRACKS[selectedTrackKey] || MOCK_INTERVIEW_TRACKS.go;
  }, [selectedTrackKey]);

  const currentQ = track.questions[currentQuestionIdx];

  // Voice narration of question
  useEffect(() => {
    if (isInterviewStarted && !isCompleted && currentQ && isVoiceActive) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const textToSpeak = `${currentQ.stage}. ${currentQ.scenario}. ${currentQ.question}`;
        const utter = new SpeechSynthesisUtterance(textToSpeak);
        utter.lang = "id-ID";
        utter.rate = 1.05;
        window.speechSynthesis.speak(utter);
      }
    }
  }, [currentQuestionIdx, isInterviewStarted, isCompleted, currentQ, isVoiceActive]);

  const handleSelectOption = (option) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < track.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setIsInterviewStarted(false);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setIsCompleted(false);
  };

  // Scorecard calculation
  const scorecard = useMemo(() => {
    const totalPossible = track.questions.length * 25;
    let earned = 0;
    Object.values(userAnswers).forEach((ans) => {
      earned += ans.score || 0;
    });

    const percent = Math.round((earned / totalPossible) * 100) || 0;
    let verdict = "STRONG HIRE";
    let badgeClass = "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";

    if (percent < 50) {
      verdict = "NO HIRE";
      badgeClass = "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30";
    } else if (percent < 80) {
      verdict = "LEAN HIRE";
      badgeClass = "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30";
    }

    return {
      percent,
      earned,
      totalPossible,
      verdict,
      badgeClass,
    };
  }, [userAnswers, track]);

  return (
    <div className="max-w-5xl mx-auto px-3 md:px-6 py-6 space-y-6 pb-28">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#162032] p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-mono font-bold text-xs uppercase tracking-wider mb-1">
            <Briefcase size={15} />
            <span>Interactive Tech Interview Simulator</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Mock Technical Interview Room
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Simulasi wawancara kerja teknis level Senior/Lead di Tier-1 Tech Unicorn (Google, Gojek, Tokopedia, Shopee) dengan penilaian langsung (*Scorecard & Feedback*).
          </p>
        </div>

        {/* Voice Toggle Button */}
        <button
          onClick={() => setIsVoiceActive(!isVoiceActive)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-mono font-bold border transition-all cursor-pointer ${
            isVoiceActive
              ? "bg-[#04AA6D]/15 text-[#04AA6D] border-[#04AA6D]/30 shadow-xs"
              : "bg-slate-100 dark:bg-black/30 text-slate-500 border-slate-200 dark:border-white/10"
          }`}
          title="Nyalakan/Matikan Suara Pewawancara"
        >
          {isVoiceActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>{isVoiceActive ? "Suara Interviu: ON" : "Suara Interviu: OFF"}</span>
        </button>
      </div>

      {/* Screen 1: Interview Setup & Role Selection */}
      {!isInterviewStarted && (
        <div className="space-y-6">
          {/* 1. Track Selector */}
          <div className="bg-white dark:bg-[#162032] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-white block">
              1. Pilih Jalur Karir & Bahasa yang Diuji:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(MOCK_INTERVIEW_TRACKS).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTrackKey(key)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer space-y-1 ${
                    selectedTrackKey === key
                      ? "bg-[#04AA6D] text-white border-transparent shadow-md scale-102"
                      : "bg-slate-50 dark:bg-black/20 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/5 hover:bg-slate-100"
                  }`}
                >
                  <h3 className="font-extrabold text-sm">{item.title}</h3>
                  <p className="text-[11px] opacity-80">{item.questions.length} Studi Kasus Wawancara</p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Interviewer Persona Selection */}
          <div className="bg-white dark:bg-[#162032] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-white block">
              2. Pilih Pewawancara (Interviewer Lead):
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {INTERVIEW_PERSONAS.map((p) => {
                const active = selectedPersonaId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPersonaId(p.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      active
                        ? "border-[#04AA6D] bg-emerald-500/10 shadow-sm"
                        : "bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-white/5 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{p.avatar}</span>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{p.name}</h4>
                        <span className="text-[11px] text-[#04AA6D] font-mono font-bold block">{p.title}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {p.style}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Start Button */}
            <div className="pt-3">
              <button
                onClick={() => setIsInterviewStarted(true)}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#04AA6D] hover:bg-[#038857] text-white font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer"
              >
                <Play size={16} className="fill-white" />
                <span>Mulai Sesi Wawancara Kerja Sekarang »</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Live Interview In-Progress */}
      {isInterviewStarted && !isCompleted && currentQ && (
        <div className="space-y-6">
          {/* Progress Bar & Interviewer Header */}
          <div className="bg-white dark:bg-[#162032] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{persona.avatar}</span>
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Pewawancara:</span>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">{persona.name}</h4>
                <span className="text-[11px] text-[#04AA6D] font-mono">{persona.title}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-400">Pertanyaan</span>
              <div className="text-base font-black text-slate-900 dark:text-white font-mono">
                {currentQuestionIdx + 1} / {track.questions.length}
              </div>
            </div>
          </div>

          {/* Question & Scenario Card */}
          <div className="bg-white dark:bg-[#162032] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-[#04AA6D] text-xs font-mono font-bold">
                {currentQ.stage}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                📋 Skenario Studi Kasus Industri:
              </span>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                "{currentQ.scenario}"
              </p>
            </div>

            <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id]?.id === opt.id;
                const isAnswered = !!userAnswers[currentQ.id];

                return (
                  <div
                    key={opt.id}
                    onClick={() => !isAnswered && handleSelectOption(opt)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? opt.isCorrect
                          ? "bg-emerald-500/10 border-emerald-500/40 shadow-xs"
                          : "bg-rose-500/10 border-rose-500/40 shadow-xs"
                        : isAnswered
                        ? "opacity-50 bg-slate-50 dark:bg-black/10 border-slate-200 dark:border-white/5"
                        : "bg-white dark:bg-black/20 border-slate-200 dark:border-white/10 hover:border-slate-400"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                        {opt.id}
                      </span>
                      <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium flex-1">
                        {opt.text}
                      </p>
                      {isSelected && (
                        opt.isCorrect ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> : <XCircle size={18} className="text-rose-500 shrink-0" />
                      )}
                    </div>

                    {/* Instant Feedback from Interviewer */}
                    {isSelected && (
                      <div className="mt-2 p-3 rounded-xl bg-slate-100 dark:bg-black/40 text-xs font-mono border border-slate-200 dark:border-white/5 space-y-1">
                        <span className="font-bold text-[#04AA6D] flex items-center gap-1">
                          💬 Tanggapan {persona.name}:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 font-sans text-[11px] leading-relaxed">
                          {opt.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next Question Navigation */}
            {userAnswers[currentQ.id] && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-2xl bg-[#04AA6D] hover:bg-[#038857] text-white font-black text-xs transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>{currentQuestionIdx < track.questions.length - 1 ? "Lanjut ke Pertanyaan Berikutnya »" : "Selesaikan & Lihat Scorecard »"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Screen 3: Official Candidate Scorecard */}
      {isCompleted && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white dark:bg-[#162032] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#04AA6D]/15 text-[#04AA6D] flex items-center justify-center mx-auto shadow-sm">
              <Award size={32} />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-400">
                Official Candidate Assessment Scorecard
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white">
                Hasil Keputusan Wawancara Kerja
              </h2>
            </div>

            {/* Verdict Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl border text-sm md:text-base font-black font-mono shadow-xs">
              <span>Rekomendasi Pewawancara:</span>
              <span className={`px-3 py-1 rounded-xl border ${scorecard.badgeClass}`}>
                {scorecard.verdict} ({scorecard.percent}%)
              </span>
            </div>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Skor Diperoleh</span>
                <div className="text-xl font-black text-[#04AA6D] font-mono">{scorecard.earned} / {scorecard.totalPossible}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Tingkat Akurasi</span>
                <div className="text-xl font-black text-slate-900 dark:text-white font-mono">{scorecard.percent}%</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Pewawancara</span>
                <div className="text-sm font-black text-slate-900 dark:text-white truncate">{persona.name}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-2xl bg-[#04AA6D] hover:bg-[#038857] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Ulangi Simulasi Wawancara Baru</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
