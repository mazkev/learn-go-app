import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Play,
  Sparkles,
  HelpCircle,
  Check,
  X,
  Code,
  Zap,
  Terminal,
  RotateCcw,
  BookOpen,
  Info,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { ROADMAP_MODULES } from "../../data/curriculum";
import { executeMultiCode } from "../../services/languageManager";
import FriendlyErrorBox from "../common/FriendlyErrorBox";
import CodeAnatomyModal from "../common/CodeAnatomyModal";

/**
 * Format string inline (bold, code, arrow)
 */
function renderInlineFormatted(text) {
  if (!text) return text;

  // Split by inline code first `...`
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="inline-code mx-0.5">
          {part.slice(1, -1)}
        </code>
      );
    }

    // Split by bold **...**
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bPart, j) => {
      if (bPart.startsWith("**") && bPart.endsWith("**")) {
        return (
          <strong key={j} className="font-extrabold theme-heading tracking-tight">
            {bPart.slice(2, -2)}
          </strong>
        );
      }
      return bPart.replace(/\\rightarrow|->/g, "→");
    });
  });
}

/**
 * Rich Tutorial Markdown Content Renderer
 */
function RichContentRenderer({ content }) {
  if (!content) return null;

  const blocks = content.split("\n\n");

  return (
    <div className="space-y-5 text-sm md:text-base theme-body leading-relaxed">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // 1. Heading 3: ### Title
        if (trimmed.startsWith("### ")) {
          return (
            <div key={idx} className="pt-5 border-b border-slate-200 dark:border-white/[0.08] pb-2.5">
              <h2 className="text-xl md:text-2xl font-black theme-heading tracking-tight flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#04AA6D]" />
                <span>{trimmed.replace("### ", "")}</span>
              </h2>
            </div>
          );
        }

        // 2. Heading 4: #### Subtitle
        if (trimmed.startsWith("#### ")) {
          return (
            <h3 key={idx} className="text-base md:text-lg font-bold text-[#04AA6D] pt-3 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#04AA6D]" />
              <span>{trimmed.replace("#### ", "")}</span>
            </h3>
          );
        }

        // 3. Blockquote: > Note / Warning
        if (trimmed.startsWith("> ")) {
          const cleanText = trimmed.replace(/^>\s*/gm, "");
          return (
            <div
              key={idx}
              className="bg-emerald-500/[0.07] dark:bg-emerald-500/[0.1] border-l-4 border-[#04AA6D] p-4 rounded-r-xl text-xs md:text-sm theme-heading space-y-1 my-3 shadow-sm flex items-start gap-3"
            >
              <Info size={18} className="text-[#04AA6D] shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                {cleanText.split("\n").map((line, lIdx) => (
                  <p key={lIdx}>{renderInlineFormatted(line)}</p>
                ))}
              </div>
            </div>
          );
        }

        // 4. Code Block: ```go ... ```
        if (trimmed.startsWith("```")) {
          const codeLines = trimmed.replace(/```go|```/g, "").trim();
          return (
            <div key={idx} className="my-3">
              <pre className="bg-slate-100 dark:bg-[#070d19] text-slate-800 dark:text-emerald-400 p-4 rounded-xl border border-slate-200 dark:border-white/10 font-mono text-xs md:text-sm overflow-x-auto shadow-inner leading-relaxed">
                {codeLines}
              </pre>
            </div>
          );
        }

        // 5. Markdown Table: | Col1 | Col2 |
        if (trimmed.startsWith("|") && trimmed.includes("\n|")) {
          const tableLines = trimmed.split("\n").filter((l) => l.trim().startsWith("|"));
          if (tableLines.length >= 2) {
            const headerCols = tableLines[0].split("|").filter((c) => c.trim()).map((c) => c.trim());
            const bodyRows = tableLines.slice(2).map((row) =>
              row.split("|").filter((c) => c.trim()).map((c) => c.trim())
            );

            return (
              <div key={idx} className="overflow-x-auto my-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="theme-card-subtle theme-heading border-b border-slate-200 dark:border-white/10 font-bold">
                    <tr>
                      {headerCols.map((h, hIdx) => (
                        <th key={hIdx} className="p-3">{renderInlineFormatted(h)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/5 font-mono text-xs">
                    {bodyRows.map((r, rIdx) => (
                      <tr key={rIdx} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                        {r.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 theme-body">{renderInlineFormatted(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // 6. Unordered List: - item / * item
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const items = trimmed.split("\n").filter((l) => l.trim().startsWith("- ") || l.trim().startsWith("* "));
          return (
            <ul key={idx} className="space-y-2 my-2 pl-1">
              {items.map((item, itemIdx) => {
                const textOnly = item.replace(/^[-*]\s+/, "");
                return (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#04AA6D] shrink-0 mt-2" />
                    <span className="flex-1">{renderInlineFormatted(textOnly)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 7. Ordered List: 1. item
        if (/^\d+\.\s+/.test(trimmed)) {
          const items = trimmed.split("\n").filter((l) => /^\d+\.\s+/.test(l.trim()));
          return (
            <ol key={idx} className="space-y-2.5 my-2 pl-1">
              {items.map((item, itemIdx) => {
                const textOnly = item.replace(/^\d+\.\s+/, "");
                return (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#04AA6D]/15 text-[#04AA6D] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      {itemIdx + 1}
                    </span>
                    <span className="flex-1">{renderInlineFormatted(textOnly)}</span>
                  </li>
                );
              })}
            </ol>
          );
        }

        // 8. Regular Paragraph
        return (
          <p key={idx} className="leading-relaxed">
            {renderInlineFormatted(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export default function W3TutorialReader({
  currentLessonId,
  onSelectLesson,
  onOpenTryIt,
  progress,
  markLessonComplete,
  recordQuizResult,
  modules = ROADMAP_MODULES,
  activeLanguage = "go"
}) {
  const { currentModule, currentLesson, prevLesson, nextLesson } = useMemo(() => {
    let mod = null;
    let les = null;

    for (const m of modules) {
      const found = m.lessons.find((l) => l.id === currentLessonId);
      if (found) {
        mod = m;
        les = found;
        break;
      }
    }

    if (!les) {
      mod = modules[0] || ROADMAP_MODULES[0];
      les = mod.lessons[0];
    }

    const allLessons = modules.flatMap((m) => m.lessons);
    const cIdx = allLessons.findIndex((l) => l.id === les.id);
    const prev = cIdx > 0 ? allLessons[cIdx - 1] : null;
    const next = cIdx < allLessons.length - 1 ? allLessons[cIdx + 1] : null;

    return {
      currentModule: mod,
      currentLesson: les,
      prevLesson: prev,
      nextLesson: next,
    };
  }, [currentLessonId, modules]);

  const isCompleted = progress.completedLessons.includes(currentLesson.id);

  // Inline Quick Runner State for Example Box
  const [exampleRun, setExampleRun] = useState({
    isRunning: false,
    isOpen: false,
    text: "",
    isError: false,
    executionTime: null,
  });

  // Inline Quick Runner State for Exercise Box
  const [exerciseRun, setExerciseRun] = useState({
    isRunning: false,
    isOpen: false,
    text: "",
    isError: false,
    executionTime: null,
  });

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Code Anatomy Modal Target
  const [anatomyTarget, setAnatomyTarget] = useState(null);

  useEffect(() => {
    setExampleRun({ isRunning: false, isOpen: false, text: "", isError: false, executionTime: null });
    setExerciseRun({ isRunning: false, isOpen: false, text: "", isError: false, executionTime: null });
    setSelectedAnswers({});
    setQuizSubmitted(false);
  }, [currentLessonId]);

  const handleRunExampleDirect = async () => {
    setExampleRun({
      isRunning: true,
      isOpen: true,
      text: "⚡ Mengompilasi kode...",
      isError: false,
      executionTime: null,
    });

    try {
      const result = await executeMultiCode(currentLesson.codeSnippet, activeLanguage);
      setExampleRun({
        isRunning: false,
        isOpen: true,
        text: result.output,
        isError: result.isError,
        executionTime: result.executionTime,
      });
    } catch (e) {
      setExampleRun({
        isRunning: false,
        isOpen: true,
        text: `Error: ${e.message}`,
        isError: true,
        executionTime: null,
      });
    }
  };

  const handleRunExerciseDirect = async () => {
    setExerciseRun({
      isRunning: true,
      isOpen: true,
      text: "⚡ Mengompilasi kode latihan...",
      isError: false,
      executionTime: null,
    });

    try {
      const result = await executeMultiCode(currentLesson.exercise.starterCode, activeLanguage);
      setExerciseRun({
        isRunning: false,
        isOpen: true,
        text: result.output,
        isError: result.isError,
        executionTime: result.executionTime,
      });
    } catch (e) {
      setExerciseRun({
        isRunning: false,
        isOpen: true,
        text: `Error: ${e.message}`,
        isError: true,
        executionTime: null,
      });
    }
  };

  const handleQuizAnswer = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const questions = currentLesson.quiz || [];
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) correctCount++;
    });
    recordQuizResult(currentLesson.id, correctCount, correctCount === questions.length);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 space-y-8">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-white/[0.08] pb-4">
        <div className="text-xs font-bold theme-muted flex items-center gap-1.5 flex-wrap">
          <span>{currentModule.title}</span>
          <span>&gt;</span>
          <span className="text-[#04AA6D]">{currentLesson.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {prevLesson ? (
            <button
              onClick={() => onSelectLesson(prevLesson.id)}
              className="w3-nav-btn cursor-pointer"
            >
              <ChevronLeft size={16} /> ❮ Previous
            </button>
          ) : (
            <div />
          )}

          {nextLesson && (
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="w3-nav-btn cursor-pointer"
            >
              Next ❯ <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Main Title Header with Modern Typography */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#04AA6D]/15 text-[#04AA6D] font-mono text-xs font-bold">
          <BookOpen size={13} />
          <span>Pelajaran {currentLesson.id}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black theme-heading tracking-tight">
          {currentLesson.title}
        </h1>

        <p className="text-sm md:text-base theme-muted leading-relaxed font-normal">
          {currentLesson.summary}
        </p>
      </div>

      {/* Tutorial Content Body with Rich Typography & Markdown Formatting */}
      <RichContentRenderer content={currentLesson.content} />

      {/* W3 Example Box with BOTH "Run Direct" & "Try it Yourself »" */}
      <div className="w3-example-box space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-black theme-heading flex items-center gap-2">
            <Code size={18} className="text-[#04AA6D]" />
            <span>Go Example:</span>
          </h3>
          <span className="text-xs font-mono theme-muted">main.go</span>
        </div>

        <pre className="bg-white dark:bg-[#070d19] text-slate-900 dark:text-emerald-400 p-4 rounded-xl border border-slate-200 dark:border-white/10 font-mono text-xs md:text-sm overflow-x-auto leading-relaxed shadow-inner">
          {currentLesson.codeSnippet}
        </pre>

        {/* Action Buttons: Run Direct vs Try It vs Bedah Kode */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleRunExampleDirect}
            disabled={exampleRun.isRunning}
            className="w3-btn-green px-5 py-2 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            <Play size={14} className={exampleRun.isRunning ? "animate-spin" : "fill-white"} />
            <span>{exampleRun.isRunning ? "Menjalankan..." : "⚡ Jalankan di Tempat (Run Direct)"}</span>
          </button>

          <button
            onClick={() => setAnatomyTarget({ code: currentLesson.codeSnippet, title: currentLesson.title })}
            className="px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-[#04AA6D] border border-[#04AA6D]/30 text-xs md:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles size={14} />
            <span>🔬 Bedah Kode Ini</span>
          </button>

          <button
            onClick={() => onOpenTryIt(currentLesson.codeSnippet)}
            className="px-4 py-2 rounded-lg theme-card-subtle theme-heading text-xs md:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
          >
            <span>Buka di Tryit Editor »</span>
          </button>
        </div>

        {/* Inline Mini Terminal for Example */}
        {exampleRun.isOpen && (
          <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-950 text-slate-100 shadow-lg">
            <div className="flex items-center justify-between bg-slate-900 px-4 py-2 text-xs font-mono font-bold">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#04AA6D]" />
                <span className="text-slate-200">Terminal Output (Di Tempat):</span>
              </div>
              <div className="flex items-center gap-3">
                {exampleRun.executionTime && (
                  <span className="text-emerald-400 text-[11px]">⏱ {exampleRun.executionTime}</span>
                )}
                <button
                  onClick={() => setExampleRun((prev) => ({ ...prev, isOpen: false }))}
                  className="text-slate-400 hover:text-white cursor-pointer"
                  title="Tutup Terminal"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            <div className="p-4 font-mono text-xs overflow-x-auto bg-slate-950 shadow-inner">
              {exampleRun.isError ? (
                <FriendlyErrorBox rawError={exampleRun.text} />
              ) : (
                <pre className="text-emerald-400 leading-relaxed">
                  {exampleRun.text}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>

      {/* W3 Exercise Section ("Test Yourself With Exercises") */}
      {currentLesson.exercise && (
        <div className="theme-card rounded-2xl p-6 space-y-4 shadow-md border-t-4 border-t-[#04AA6D]">
          <div className="flex items-center gap-2 text-[#04AA6D] font-extrabold text-sm uppercase tracking-wider">
            <Code size={16} />
            <span>Test Yourself With Exercises</span>
          </div>

          <h3 className="text-lg font-extrabold theme-heading">Exercise:</h3>
          <p className="text-sm theme-body leading-relaxed">
            {currentLesson.exercise.instruction}
          </p>

          <div className="bg-slate-100 dark:bg-[#070d19] text-slate-800 dark:text-emerald-400 p-4 rounded-xl border border-slate-200 dark:border-white/10 font-mono text-xs md:text-sm overflow-x-auto shadow-inner">
            <pre>{currentLesson.exercise.starterCode}</pre>
          </div>

          <div className="pt-2 flex items-center justify-between flex-wrap gap-2.5">
            <span className="text-xs theme-muted">
              💡 {currentLesson.exercise.expectedHint}
            </span>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleRunExerciseDirect}
                disabled={exerciseRun.isRunning}
                className="w3-btn-green px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play size={13} className={exerciseRun.isRunning ? "animate-spin" : "fill-white"} />
                <span>{exerciseRun.isRunning ? "Menguji..." : "⚡ Uji Latihan di Tempat"}</span>
              </button>

              <button
                onClick={() => setAnatomyTarget({ code: currentLesson.exercise.starterCode, title: `Latihan: ${currentLesson.title}` })}
                className="px-3.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-[#04AA6D] border border-[#04AA6D]/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Sparkles size={13} />
                <span>🔬 Bedah Kode Latihan</span>
              </button>

              <button
                onClick={() => onOpenTryIt(currentLesson.exercise.starterCode)}
                className="px-3.5 py-2 rounded-lg theme-card-subtle theme-heading text-xs font-bold transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
              >
                <span>Edit di Tryit »</span>
              </button>
            </div>
          </div>

          {/* Inline Mini Terminal for Exercise */}
          {exerciseRun.isOpen && (
            <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-950 text-slate-100 shadow-lg">
              <div className="flex items-center justify-between bg-slate-900 px-4 py-2 text-xs font-mono font-bold">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#04AA6D]" />
                  <span className="text-slate-200">Hasil Uji Latihan:</span>
                </div>
                <div className="flex items-center gap-3">
                  {exerciseRun.executionTime && (
                    <span className="text-emerald-400 text-[11px]">⏱ {exerciseRun.executionTime}</span>
                  )}
                  <button
                    onClick={() => setExerciseRun((prev) => ({ ...prev, isOpen: false }))}
                    className="text-slate-400 hover:text-white cursor-pointer"
                    title="Tutup Terminal"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className="p-4 font-mono text-xs overflow-x-auto bg-slate-950 shadow-inner">
                {exerciseRun.isError ? (
                  <FriendlyErrorBox rawError={exerciseRun.text} />
                ) : (
                  <pre className="text-emerald-400 leading-relaxed">
                    {exerciseRun.text}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* W3 Quiz Section */}
      {currentLesson.quiz && currentLesson.quiz.length > 0 && (
        <div className="theme-card rounded-2xl p-6 space-y-5 shadow-md">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-extrabold text-sm uppercase tracking-wider">
            <HelpCircle size={16} />
            <span>Test Your Knowledge (Quiz)</span>
          </div>

          {currentLesson.quiz.map((q, qIndex) => {
            const selected = selectedAnswers[qIndex];

            return (
              <div key={qIndex} className="space-y-3">
                <p className="text-sm md:text-base font-bold theme-heading">
                  {qIndex + 1}. {q.question}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = selected === optIndex;
                    const isCorrect = optIndex === q.correctAnswer;

                    let optClass = "theme-card-subtle theme-heading hover:border-[#04AA6D]";
                    if (quizSubmitted) {
                      if (isCorrect) optClass = "bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold";
                      else if (isSelected && !isCorrect) optClass = "bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300";
                    } else if (isSelected) {
                      optClass = "bg-[#04AA6D]/20 border-[#04AA6D] text-[#04AA6D] font-bold";
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleQuizAnswer(qIndex, optIndex)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <Check size={16} className="text-emerald-600 shrink-0" />}
                        {quizSubmitted && isSelected && !isCorrect && <X size={16} className="text-rose-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3.5 rounded-lg theme-inset text-xs theme-body">
                    <strong className="text-[#04AA6D]">Penjelasan:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          <div>
            {!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="w3-btn-green px-5 py-2 rounded-lg text-xs font-bold cursor-pointer disabled:opacity-50"
              >
                Submit Answer »
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setQuizSubmitted(false);
                }}
                className="px-4 py-2 rounded-lg theme-card-subtle theme-heading text-xs font-bold cursor-pointer"
              >
                Coba Lagi
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bottom Completion & Navigation Bar */}
      <div className="border-t border-slate-200 dark:border-white/[0.08] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <button
          onClick={() => markLessonComplete(currentLesson.id, 100)}
          className={`px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md ${
            isCompleted
              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40"
              : "w3-btn-green"
          }`}
        >
          <CheckCircle size={16} />
          <span>{isCompleted ? "✓ Materi Sudah Selesai (+100 XP)" : "Tandai Selesai (+100 XP)"}</span>
        </button>

        <div className="flex items-center gap-2">
          {prevLesson && (
            <button
              onClick={() => onSelectLesson(prevLesson.id)}
              className="w3-nav-btn cursor-pointer"
            >
              <ChevronLeft size={16} /> ❮ Previous
            </button>
          )}

          {nextLesson && (
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="w3-nav-btn cursor-pointer"
            >
              Next ❯ <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Code Anatomy Modal */}
      {anatomyTarget && (
        <CodeAnatomyModal
          isOpen={Boolean(anatomyTarget)}
          onClose={() => setAnatomyTarget(null)}
          code={anatomyTarget.code}
          title={anatomyTarget.title}
        />
      )}
    </div>
  );
}
