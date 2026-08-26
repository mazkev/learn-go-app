import React, { useState } from "react";
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
  ArrowRight
} from "lucide-react";
import { ROADMAP_MODULES } from "../../data/curriculum";

export default function W3TutorialReader({
  currentLessonId,
  onSelectLesson,
  onOpenTryIt,
  progress,
  markLessonComplete,
  recordQuizResult
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

  const isCompleted = progress.completedLessons.includes(currentLesson.id);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

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
        <div className="text-xs font-bold theme-muted">
          <span>{currentModule.title}</span> &gt;{" "}
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

      {/* Main Title Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-4xl font-extrabold theme-heading tracking-tight">
          {currentLesson.title}
        </h1>
        <p className="text-sm md:text-base theme-muted leading-relaxed">
          {currentLesson.summary}
        </p>
      </div>

      {/* Tutorial Content Body (W3 Typography) */}
      <div className="space-y-6 text-sm md:text-base theme-body leading-relaxed">
        {currentLesson.content.split("\n\n").map((para, idx) => {
          if (para.startsWith("### ")) {
            return (
              <h2 key={idx} className="text-xl md:text-2xl font-black theme-heading pt-4 border-b border-slate-200 dark:border-white/[0.08] pb-2">
                {para.replace("### ", "")}
              </h2>
            );
          }
          if (para.startsWith("#### ")) {
            return (
              <h3 key={idx} className="text-lg font-bold text-[#04AA6D] pt-2">
                {para.replace("#### ", "")}
              </h3>
            );
          }
          if (para.startsWith("> ")) {
            return (
              <div
                key={idx}
                className="bg-amber-500/[0.08] border-l-4 border-amber-500 p-4 rounded-r-xl text-xs md:text-sm text-amber-900 dark:text-amber-200 space-y-1"
              >
                {para.replace("> ", "")}
              </div>
            );
          }
          if (para.startsWith("```")) {
            return (
              <pre
                key={idx}
                className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs md:text-sm overflow-x-auto shadow-inner leading-relaxed"
              >
                {para.replace(/```go|```/g, "").trim()}
              </pre>
            );
          }
          return <p key={idx}>{para}</p>;
        })}
      </div>

      {/* W3 Example Box with Iconic "Try it Yourself »" Button */}
      <div className="w3-example-box space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-black theme-heading">
            Go Example:
          </h3>
          <span className="text-xs font-mono theme-muted">main.go</span>
        </div>

        <pre className="bg-white dark:bg-[#070d19] text-slate-900 dark:text-emerald-400 p-4 rounded-lg border border-slate-200 dark:border-white/10 font-mono text-xs md:text-sm overflow-x-auto leading-relaxed shadow-inner">
          {currentLesson.codeSnippet}
        </pre>

        <div>
          <button
            onClick={() => onOpenTryIt(currentLesson.codeSnippet)}
            className="w3-btn-green px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <span>Try it Yourself »</span>
          </button>
        </div>
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

          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs md:text-sm overflow-x-auto">
            <pre className="text-emerald-400">{currentLesson.exercise.starterCode}</pre>
          </div>

          <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs theme-muted">
              💡 {currentLesson.exercise.expectedHint}
            </span>
            <button
              onClick={() => onOpenTryIt(currentLesson.exercise.starterCode)}
              className="w3-btn-green px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Buka Latihan di Tryit Editor »</span>
            </button>
          </div>
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
    </div>
  );
}
