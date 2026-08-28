import React, { useState } from "react";
import {
  Flame,
  Zap,
  Award,
  Play,
  CheckCircle2,
  Lock,
  BookOpen,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Check,
  ChevronDown,
  Layers,
  Code2,
  Compass,
} from "lucide-react";

export default function MobileLearningHub({
  activeLanguage,
  onSelectLanguage,
  modules,
  currentLessonId,
  onSelectLesson,
  progress,
  onOpenStreakModal,
  onOpenSyncModal,
}) {
  const [expandedModuleId, setExpandedModuleId] = useState(modules[0]?.id || "");

  const languages = [
    { id: "go", name: "Go", icon: "🐹", color: "#00ADD8" },
    { id: "java", name: "Java", icon: "☕", color: "#f89820" },
    { id: "python", name: "Python", icon: "🐍", color: "#3776AB" },
    { id: "javascript", name: "JS/TS", icon: "🟨", color: "#E5A00D" },
    { id: "php", name: "PHP", icon: "🐘", color: "#8892BF" },
  ];

  const currentLang = languages.find((l) => l.id === activeLanguage) || languages[0];
  const allLessons = modules.flatMap((m) => m.lessons);
  const currentLesson = allLessons.find((l) => l.id === currentLessonId) || allLessons[0];
  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.min(100, Math.round((completedCount / Math.max(1, allLessons.length)) * 100));
  const userLevel = Math.floor(progress.totalXP / 300) + 1;

  const toggleModule = (modId) => {
    setExpandedModuleId((prev) => (prev === modId ? "" : modId));
  };

  return (
    <div className="md:hidden flex flex-col min-h-screen bg-slate-100/70 dark:bg-[#070d19] pb-28 animate-fadeIn">
      {/* 1. Mobile Hero Header: Daily Stats & Quick Streak */}
      <div className="p-4 bg-white dark:bg-[#0d1527] border-b border-slate-200 dark:border-white/10 space-y-3 shadow-2xs">
        {/* Top Mini Stats Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Streak Button */}
            <button
              onClick={onOpenStreakModal}
              className="flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-mono font-black border border-orange-500/30 shadow-2xs cursor-pointer active:scale-95 transition-transform"
            >
              <Flame size={14} className="text-orange-500 fill-orange-500 animate-pulse" />
              <span>{progress.currentStreak || 1} Hari Streak</span>
            </button>

            {/* Level & XP */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-slate-100 dark:bg-white/10 text-xs font-mono font-bold border border-slate-200 dark:border-white/10">
              <Zap size={13} className="text-amber-500 fill-amber-500" />
              <span className="text-amber-600 dark:text-amber-400">{progress.totalXP} XP</span>
              <span className="text-slate-300 dark:text-white/20">•</span>
              <span className="text-[#04AA6D]">Lvl {userLevel}</span>
            </div>
          </div>

          <div className="text-[11px] font-mono font-bold text-[#04AA6D]">
            {progressPercent}% Selesai
          </div>
        </div>

        {/* 2. Swipeable Polyglot Language Track (Horizontal Scroll) */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block mb-1.5">
            PILIH JALUR BAHASA PEMROGRAMAN:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            {languages.map((lang) => {
              const isSelected = lang.id === activeLanguage;
              return (
                <button
                  key={lang.id}
                  onClick={() => onSelectLanguage(lang.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold font-mono shrink-0 transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#04AA6D] text-white border-transparent shadow-md scale-105"
                      : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-200"
                  }`}
                >
                  <span className="text-sm">{lang.icon}</span>
                  <span>{lang.name}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Hero "Lanjutkan Belajar" Interactive Card */}
      {currentLesson && (
        <div className="p-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#04AA6D] via-teal-600 to-emerald-800 text-white p-5 shadow-xl shadow-[#04AA6D]/20">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-white/15 blur-xl pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono font-extrabold uppercase tracking-wider text-white">
                  {currentLang.icon} SEDANG DIPELAJARI
                </span>
                <span className="text-xs font-mono font-bold text-emerald-100">
                  Pelajaran {currentLesson.id}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black tracking-tight leading-tight text-white">
                  {currentLesson.title}
                </h3>
                <p className="text-xs text-emerald-100/90 line-clamp-2 mt-1 font-medium">
                  {currentLesson.summary}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectLesson(currentLesson.id, true)}
                className="w-full mt-2 py-3 px-4 rounded-2xl bg-white text-[#04AA6D] hover:bg-emerald-50 text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer"
              >
                <Play size={15} className="fill-[#04AA6D]" />
                <span>Mulai Belajar Sekarang »</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Gamified Module Roadmap List (Island Adventure Map) */}
      <div className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
            <Compass size={14} className="text-[#04AA6D]" /> PETA PETUALANGAN BELAJAR ({modules.length} MODUL)
          </h4>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold">
            {completedCount}/{allLessons.length} Pelajaran
          </span>
        </div>

        {/* Modules Accordion Cards */}
        <div className="space-y-3">
          {modules.map((mod, modIdx) => {
            const isExpanded = expandedModuleId === mod.id;
            const modLessons = mod.lessons || [];
            const modCompletedCount = modLessons.filter((l) => progress.completedLessons.includes(l.id)).length;
            const isModFullyCompleted = modCompletedCount === modLessons.length && modLessons.length > 0;

            return (
              <div
                key={mod.id}
                className="bg-white dark:bg-[#162032] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xs transition-all"
              >
                {/* Module Header Card */}
                <div
                  onClick={() => toggleModule(mod.id)}
                  className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none active:bg-slate-50 dark:active:bg-white/5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                        isModFullyCompleted
                          ? "bg-[#04AA6D] text-white"
                          : "bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white"
                      }`}
                    >
                      {isModFullyCompleted ? <Check size={18} /> : modIdx + 1}
                    </div>

                    <div className="min-w-0">
                      <h5 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                        {mod.title}
                      </h5>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        <span>{modLessons.length} Pelajaran</span>
                        <span>•</span>
                        <span className={isModFullyCompleted ? "text-[#04AA6D] font-bold" : ""}>
                          {modCompletedCount}/{modLessons.length} Selesai
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-[#04AA6D]" : ""
                    }`}
                  />
                </div>

                {/* Expanded Lesson Nodes */}
                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-slate-100 dark:border-white/5 bg-slate-50/80 dark:bg-black/20">
                    {modLessons.map((lesson) => {
                      const isDone = progress.completedLessons.includes(lesson.id);
                      const isCurrent = currentLessonId === lesson.id;

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson.id, true)}
                          className={`p-3 rounded-2xl flex items-center justify-between gap-2 cursor-pointer transition-all ${
                            isCurrent
                              ? "bg-emerald-500/15 border border-[#04AA6D]/40 text-[#04AA6D] shadow-xs"
                              : "bg-white dark:bg-[#1e293b] hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200/70 dark:border-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                                isDone
                                  ? "bg-[#04AA6D] text-white"
                                  : isCurrent
                                  ? "bg-emerald-500/20 text-[#04AA6D] font-bold"
                                  : "bg-slate-200 dark:bg-white/10 text-slate-400"
                              }`}
                            >
                              {isDone ? <Check size={12} /> : "•"}
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                                {lesson.title}
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block">
                                {lesson.summary}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-1">
                            {isDone && (
                              <span className="text-[10px] font-mono font-bold text-[#04AA6D] px-1.5 py-0.5 rounded bg-[#04AA6D]/10">
                                +100 XP
                              </span>
                            )}
                            <ChevronRight size={14} className="text-slate-400" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
