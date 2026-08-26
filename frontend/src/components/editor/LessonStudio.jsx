import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  RotateCcw,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Terminal,
  BookOpen,
  HelpCircle,
  Code,
  Sparkles,
  Check,
  X,
  Eye,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { ROADMAP_MODULES } from "../../data/curriculum";
import { executeGoCode } from "../../services/goRunner";

export default function LessonStudio({
  currentLessonId,
  setCurrentLessonId,
  progress,
  markLessonComplete,
  recordQuizResult,
  saveUserCode,
  theme = "dark"
}) {
  let currentModule = null;
  let currentLesson = null;

  for (const mod of ROADMAP_MODULES) {
    const found = mod.lessons.find((l) => l.id === currentLessonId);
    if (found) {
      currentModule = mod;
      currentLesson = found;
      break;
    }
  }

  if (!currentLesson) {
    currentModule = ROADMAP_MODULES[0];
    currentLesson = ROADMAP_MODULES[0].lessons[0];
  }

  const allLessons = ROADMAP_MODULES.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const [activeLeftTab, setActiveLeftTab] = useState("theory");
  const [code, setCode] = useState(
    progress.userCodes[currentLesson.id] || currentLesson.codeSnippet
  );
  const editorRef = React.useRef(null);
  const codeRef = React.useRef(progress.userCodes[currentLesson.id] || currentLesson.codeSnippet);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState({
    text: "Klik tombol 'Jalankan Kode' di atas untuk mengompilasi dan melihat output terminal.",
    isError: false,
    executionTime: null,
    source: null,
  });

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const saved = progress.userCodes[currentLesson.id] || currentLesson.codeSnippet;
    setCode(saved);
    codeRef.current = saved;
    if (editorRef.current && editorRef.current.getValue() !== saved) {
      editorRef.current.setValue(saved);
    }
    setOutput({
      text: "Program siap dikompilasi.",
      isError: false,
      executionTime: null,
      source: null,
    });
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setShowSolution(false);
    setActiveLeftTab("theory");
  }, [currentLesson.id]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput({
      text: "⚡ Mengompilasi dan mengeksekusi kode Go...",
      isError: false,
      executionTime: null,
      source: null,
    });

    try {
      const result = await executeGoCode(code);
      setOutput({
        text: result.output,
        isError: result.isError,
        executionTime: result.executionTime,
        source: result.source,
      });

      saveUserCode(currentLesson.id, code);
    } catch (e) {
      setOutput({
        text: `Error sistem: ${e.message}`,
        isError: true,
        executionTime: null,
        source: "Local Error",
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Instant Reset Code tanpa browser prompt blocking
  const handleResetCode = () => {
    const defaultTemplate = currentLesson.codeSnippet;
    setCode(defaultTemplate);
    saveUserCode(currentLesson.id, defaultTemplate);
    setOutput({
      text: "Kode berhasil di-reset. Klik 'Jalankan Kode' untuk menguji kembali.",
      isError: false,
      executionTime: null,
      source: null,
    });
    showToast("✓ Kode berhasil di-reset ke template awal!");
  };

  const handleLoadExercise = () => {
    if (currentLesson.exercise?.starterCode) {
      setCode(currentLesson.exercise.starterCode);
      saveUserCode(currentLesson.id, currentLesson.exercise.starterCode);
      setOutput({
        text: "Kode tantangan latihan dimuat. Silakan modifikasi dan klik 'Jalankan Kode'.",
        isError: false,
        executionTime: null,
        source: null,
      });
      showToast("✓ Kode latihan berhasil dimuat ke editor!");
    }
  };

  const handleApplySolution = () => {
    if (currentLesson.exercise?.starterCode) {
      setCode(currentLesson.exercise.starterCode);
      saveUserCode(currentLesson.id, currentLesson.exercise.starterCode);
      setOutput({
        text: "Solusi latihan diterapkan. Klik 'Jalankan Kode' untuk verifikasi.",
        isError: false,
        executionTime: null,
        source: null,
      });
      showToast("✓ Solusi berhasil diterapkan ke editor!");
    }
  };

  const handleQuizAnswer = (qIndex, optionIndex) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const questions = currentLesson.quiz || [];
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const passed = correctCount === questions.length;
    recordQuizResult(currentLesson.id, correctCount, passed);
  };

  const isCompleted = progress.completedLessons.includes(currentLesson.id);
  const monacoTheme = theme === "light" ? "light" : "vs-dark";

  return (
    <div className="max-w-[1700px] mx-auto px-4 py-4 flex flex-col h-[calc(100vh-76px)] min-h-[720px] gap-3 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-6 right-6 z-50 bg-emerald-600 text-white px-4 py-2 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 theme-card px-4 py-2.5 rounded-2xl shrink-0 shadow-md">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="text-xs font-bold px-3 py-1 rounded-xl tracking-wide"
            style={{
              backgroundColor: `${currentModule.color}15`,
              color: currentModule.color,
              border: `1px solid ${currentModule.color}35`,
            }}
          >
            {currentModule.title}
          </span>

          <select
            value={currentLesson.id}
            onChange={(e) => setCurrentLessonId(e.target.value)}
            className="theme-inset theme-heading text-xs md:text-sm font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#00ADD8] shadow-sm cursor-pointer"
          >
            {ROADMAP_MODULES.map((mod) => (
              <optgroup key={mod.id} label={mod.title} className="bg-white dark:bg-[#0e1626] text-slate-900 dark:text-white">
                {mod.lessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {progress.completedLessons.includes(l.id) ? "✓ " : ""}{l.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          {isCompleted && (
            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25 font-mono">
              <CheckCircle size={13} /> Selesai
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {prevLesson && (
            <button
              onClick={() => setCurrentLessonId(prevLesson.id)}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl theme-card-subtle theme-muted hover:theme-heading transition-all font-semibold cursor-pointer"
            >
              <ChevronLeft size={14} /> Sebelumnya
            </button>
          )}

          <button
            onClick={() => markLessonComplete(currentLesson.id, 100)}
            className={`flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-xl font-bold transition-all shadow-md cursor-pointer ${
              isCompleted
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40"
                : "bg-gradient-to-r from-[#00ADD8] to-[#0284C7] text-white shadow-[#00ADD8]/20 hover:opacity-95"
            }`}
          >
            <CheckCircle size={14} />
            <span>{isCompleted ? "Tandai Ulang" : "Selesaikan (+100 XP)"}</span>
          </button>

          {nextLesson && (
            <button
              onClick={() => setCurrentLessonId(nextLesson.id)}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl theme-card-subtle theme-muted hover:theme-heading transition-all font-semibold cursor-pointer"
            >
              Berikutnya <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace (Split Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1 min-h-0 overflow-hidden">
        {/* Left Column: Lesson Reader / Tabs (5 cols) */}
        <div className="lg:col-span-5 flex flex-col theme-card rounded-3xl overflow-hidden min-h-0 shadow-lg">
          {/* Tab Selector */}
          <div className="flex items-center border-b border-slate-200 dark:border-white/[0.08] theme-card-subtle px-3 pt-2.5 shrink-0">
            <button
              onClick={() => setActiveLeftTab("theory")}
              className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeLeftTab === "theory"
                  ? "border-[#00ADD8] text-[#00ADD8]"
                  : "border-transparent theme-muted hover:theme-heading"
              }`}
            >
              <BookOpen size={15} /> Teori & Konsep
            </button>
            <button
              onClick={() => setActiveLeftTab("exercise")}
              className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeLeftTab === "exercise"
                  ? "border-[#10B981] text-[#10B981]"
                  : "border-transparent theme-muted hover:theme-heading"
              }`}
            >
              <Code size={15} /> Tantangan Latihan
            </button>
            <button
              onClick={() => setActiveLeftTab("quiz")}
              className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeLeftTab === "quiz"
                  ? "border-[#8B5CF6] text-[#8B5CF6]"
                  : "border-transparent theme-muted hover:theme-heading"
              }`}
            >
              <HelpCircle size={15} /> Kuis Modul
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4 text-sm leading-relaxed">
            {activeLeftTab === "theory" && (
              <div className="space-y-4">
                <div className="border-b border-slate-200 dark:border-white/[0.08] pb-4">
                  <h2 className="text-xl font-extrabold theme-heading tracking-tight">{currentLesson.title}</h2>
                  <p className="text-xs theme-muted mt-1.5 leading-relaxed">{currentLesson.summary}</p>
                </div>

                <div className="space-y-3.5">
                  {currentLesson.content.split("\n\n").map((para, idx) => {
                    if (para.startsWith("### ")) {
                      return <h3 key={idx} className="text-lg font-bold theme-heading pt-2">{para.replace("### ", "")}</h3>;
                    }
                    if (para.startsWith("#### ")) {
                      return <h4 key={idx} className="text-sm font-bold text-[#00ADD8] pt-1">{para.replace("#### ", "")}</h4>;
                    }
                    if (para.startsWith("> ")) {
                      return (
                        <div key={idx} className="bg-[#00ADD8]/10 border-l-4 border-[#00ADD8] p-3.5 rounded-r-2xl text-xs space-y-1">
                          {para.replace("> ", "")}
                        </div>
                      );
                    }
                    if (para.startsWith("```")) {
                      return (
                        <pre key={idx} className="bg-slate-900 text-emerald-400 p-3.5 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto shadow-inner">
                          {para.replace(/```go|```/g, "").trim()}
                        </pre>
                      );
                    }
                    return <p key={idx} className="text-xs md:text-sm theme-body leading-relaxed">{para}</p>;
                  })}
                </div>
              </div>
            )}

            {activeLeftTab === "exercise" && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/30 space-y-3 shadow-sm">
                  <h3 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <Sparkles size={16} /> Instruksi Tantangan:
                  </h3>
                  <p className="text-xs md:text-sm theme-body leading-relaxed">
                    {currentLesson.exercise?.instruction || "Ubah dan modifikasi kode pada editor untuk mencoba berbagai skenario."}
                  </p>
                  {currentLesson.exercise?.expectedHint && (
                    <div className="pt-2.5 border-t border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400">
                      💡 <strong>Petunjuk:</strong> {currentLesson.exercise.expectedHint}
                    </div>
                  )}
                </div>

                {/* Actions: Muat Kode & Lihat Solusi */}
                <div className="flex items-center gap-2.5 flex-wrap pt-1">
                  <button
                    onClick={handleLoadExercise}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Code size={14} />
                    <span>Muat Kode Latihan</span>
                  </button>

                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="px-4 py-2 rounded-xl theme-card-subtle theme-heading text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>{showSolution ? "Tutup Solusi" : "Lihat Solusi Lengkap"}</span>
                  </button>
                </div>

                {/* Solution Accordion */}
                {showSolution && (
                  <div className="p-4 rounded-2xl theme-inset border border-indigo-500/30 space-y-3 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-500 flex items-center gap-1.5">
                        <Sparkles size={14} /> Solusi Kode Terverifikasi:
                      </span>
                      <button
                        onClick={handleApplySolution}
                        className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Terapkan ke Editor</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                    <pre className="bg-slate-900 text-emerald-400 p-3.5 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed">
                      {currentLesson.exercise?.starterCode || currentLesson.codeSnippet}
                    </pre>
                  </div>
                )}

                {/* Syntax Notice Alert */}
                <div className="p-3.5 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2 leading-relaxed">
                  <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-500" />
                  <span>
                    <strong>Tips Penulisan Go:</strong> Hindari memotong baris (Enter) di dalam tanda petik ganda <code>"..."</code>. Jika teks panjang, gunakan backtick <code>`...`</code> atau tulis dalam satu baris.
                  </span>
                </div>
              </div>
            )}

            {activeLeftTab === "quiz" && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 dark:border-white/[0.08] pb-3">
                  <h3 className="text-base font-bold theme-heading">Kuis Pemahaman Materi</h3>
                  <p className="text-xs theme-muted mt-1">Uji pemahaman Anda terhadap konsep yang baru dipelajari.</p>
                </div>

                {(currentLesson.quiz || []).map((q, qIndex) => {
                  const selected = selectedAnswers[qIndex];

                  return (
                    <div key={qIndex} className="p-5 rounded-2xl theme-card-subtle space-y-3.5 shadow-sm">
                      <p className="text-xs md:text-sm font-bold theme-heading">
                        {qIndex + 1}. {q.question}
                      </p>

                      <div className="space-y-2">
                        {q.options.map((opt, optIndex) => {
                          const isOptionSelected = selected === optIndex;
                          const isCorrectOption = optIndex === q.correctAnswer;

                          let btnStyle = "theme-card hover:border-[#00ADD8]/40";
                          if (quizSubmitted) {
                            if (isCorrectOption) {
                              btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-bold";
                            } else if (isOptionSelected && !isCorrectOption) {
                              btnStyle = "bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-300 font-bold";
                            }
                          } else if (isOptionSelected) {
                            btnStyle = "bg-[#8B5CF6]/20 border-[#8B5CF6] text-purple-700 dark:text-purple-300 font-semibold";
                          }

                          return (
                            <button
                              key={optIndex}
                              onClick={() => handleQuizAnswer(qIndex, optIndex)}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && isCorrectOption && <Check size={15} className="text-emerald-500 shrink-0" />}
                              {quizSubmitted && isOptionSelected && !isCorrectOption && <X size={15} className="text-rose-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-3.5 rounded-xl theme-card text-xs theme-body space-y-1">
                          <p className="font-bold text-[#00ADD8]">Penjelasan:</p>
                          <p className="leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="pt-2">
                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className="w-full py-2.5 rounded-2xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-extrabold transition-all disabled:opacity-50 shadow-md shadow-[#8B5CF6]/25 cursor-pointer"
                    >
                      Periksa Jawaban
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className="w-full py-2.5 rounded-2xl theme-card-subtle text-xs font-bold transition-all cursor-pointer"
                    >
                      Ulangi Kuis
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Terminal (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3 min-h-0">
          {/* Monaco Editor Container */}
          <div className="flex-1 flex flex-col theme-card rounded-3xl overflow-hidden min-h-[300px] shadow-lg">
            {/* Editor Action Bar */}
            <div className="flex items-center justify-between theme-card-subtle px-4 py-2.5 border-b border-slate-200 dark:border-white/[0.08] shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono font-bold theme-muted ml-2">main.go</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCode}
                  title="Reset Kode ke Template Awal"
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl theme-card theme-muted hover:theme-heading transition-colors font-semibold cursor-pointer"
                >
                  <RotateCcw size={13} /> Reset
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#00ADD8] to-[#0284C7] text-white font-black hover:shadow-lg hover:shadow-[#00ADD8]/30 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Play size={13} className={isRunning ? "animate-spin" : "fill-white"} />
                  <span>{isRunning ? "Running..." : "Jalankan Kode"}</span>
                </button>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                defaultLanguage="go"
                theme={monacoTheme}
                defaultValue={code}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
                onChange={(value) => {
                  const val = value || "";
                  codeRef.current = val;
                  setCode(val);
                  saveUserCode(currentLesson.id, val);
                }}
                options={{
                  fontSize: 13,
                  fontFamily: "'Fira Code', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  formatOnPaste: true,
                  lineNumbersMinChars: 3,
                  padding: { top: 12, bottom: 12 },
                }}
              />
            </div>
          </div>

          {/* Terminal Console */}
          <div className="h-44 md:h-52 flex flex-col rounded-3xl overflow-hidden shrink-0 shadow-lg bg-slate-950 text-slate-100 border border-slate-800">
            {/* Terminal Header */}
            <div className="flex items-center justify-between bg-slate-900 px-4 py-2 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Terminal size={15} className="text-[#00ADD8]" />
                <span className="text-xs font-mono font-bold text-slate-200">Terminal Output</span>
              </div>
              <div className="flex items-center gap-2">
                {output.executionTime && (
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    ⏱ {output.executionTime}
                  </span>
                )}
                {output.source && (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                    {output.source}
                  </span>
                )}
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-4 bg-slate-950 flex-1 overflow-y-auto font-mono text-xs shadow-inner">
              <pre
                className={`whitespace-pre-wrap leading-relaxed ${
                  output.isError ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {output.text}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
