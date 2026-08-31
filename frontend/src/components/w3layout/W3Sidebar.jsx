import React, { useState, useMemo, useCallback } from "react";
import { Search, CheckCircle, ChevronDown, ChevronRight, BookOpen, X } from "lucide-react";
import { ROADMAP_MODULES } from "../../data/curriculum";
import LanguageLogo from "../common/LanguageLogo";

export default function W3Sidebar({
  currentLessonId,
  onSelectLesson,
  progress,
  isOpen,
  onCloseMobile,
  modules = ROADMAP_MODULES,
  activeLanguage = "go"
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedModules, setCollapsedModules] = useState({});

  const toggleModule = useCallback((modId) => {
    setCollapsedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  }, []);

  const filteredModules = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return modules;

    return modules.map((mod) => {
      const filteredLessons = mod.lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          mod.title.toLowerCase().includes(q)
      );
      return { ...mod, lessons: filteredLessons };
    }).filter((mod) => mod.lessons.length > 0);
  }, [searchQuery, modules]);

  const handleLessonClick = (lessonId) => {
    onSelectLesson(lessonId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 top-[57px] bg-black/50 backdrop-blur-[2px] z-30 lg:hidden animate-in fade-in duration-150"
        />
      )}

      <aside
        className={`fixed lg:sticky top-[57px] left-0 z-40 w-72 h-[calc(100vh-57px)] theme-sidebar overflow-y-auto shrink-0 transition-transform duration-200 shadow-2xl lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header & Search */}
        <div className="p-3 border-b border-slate-200 dark:border-white/[0.08] sticky top-0 bg-inherit z-10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black tracking-wider uppercase theme-heading flex items-center gap-2">
              <LanguageLogo language={activeLanguage} size={16} />
              <span>{activeLanguage === "javascript" ? "JS / TS TUTORIAL" : `${activeLanguage.toUpperCase()} TUTORIAL`}</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono theme-muted">
                {progress.completedLessons.length}/{modules.flatMap((m) => m.lessons).length} Selesai
              </span>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-md theme-card-subtle theme-heading lg:hidden hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                title="Tutup Menu"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 theme-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi..."
              className="w-full theme-inset rounded-lg pl-8 pr-3 py-1.5 text-xs theme-heading focus:outline-none focus:border-[#04AA6D]"
            />
          </div>
        </div>

        {/* Module & Lessons List */}
        <div className="p-2 space-y-3">
          {filteredModules.map((mod) => {
            const isCollapsed = collapsedModules[mod.id];
            const completedCount = mod.lessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;
            const isModuleComplete = completedCount === mod.lessons.length;

            return (
              <div key={mod.id} className="space-y-0.5">
                {/* Module Header Collapsible Button */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-xs font-black theme-heading truncate">
                      {mod.title}
                    </span>
                    {isModuleComplete && (
                      <CheckCircle size={12} className="text-[#04AA6D] shrink-0" />
                    )}
                  </div>
                  <span className="text-slate-400 shrink-0">
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                  </span>
                </button>

                {/* Lessons in Module */}
                {!isCollapsed && (
                  <div className="pl-1 space-y-0.5 border-l border-slate-200 dark:border-white/[0.08] ml-2">
                    {mod.lessons.map((lesson) => {
                      const isActive = currentLessonId === lesson.id;
                      const isCompleted = progress.completedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonClick(lesson.id)}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all text-left cursor-pointer group ${
                            isActive
                              ? "bg-[#04AA6D] text-white font-extrabold shadow-sm"
                              : "theme-body hover:bg-black/5 dark:hover:bg-white/5 hover:theme-heading"
                          }`}
                        >
                          <span className="truncate pr-2">{lesson.title}</span>
                          {isCompleted && (
                            <CheckCircle
                              size={13}
                              className={`shrink-0 ${
                                isActive ? "text-white" : "text-[#04AA6D]"
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {filteredModules.length === 0 && (
            <div className="p-4 text-center text-xs theme-muted">
              Tidak ada materi yang cocok.
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
