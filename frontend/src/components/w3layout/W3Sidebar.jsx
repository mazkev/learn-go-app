import React, { useState } from "react";
import { Search, CheckCircle, ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { ROADMAP_MODULES } from "../../data/curriculum";

export default function W3Sidebar({
  currentLessonId,
  onSelectLesson,
  progress,
  isOpen,
  onCloseMobile
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedModules, setCollapsedModules] = useState({});

  const toggleModule = (modId) => {
    setCollapsedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const filteredModules = ROADMAP_MODULES.map((mod) => {
    const filteredLessons = mod.lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...mod, lessons: filteredLessons };
  }).filter((mod) => mod.lessons.length > 0);

  return (
    <aside
      className={`fixed lg:sticky top-[57px] left-0 z-40 w-72 h-[calc(100vh-57px)] theme-sidebar overflow-y-auto shrink-0 transition-transform duration-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Sidebar Header & Search */}
      <div className="p-3 border-b border-slate-200 dark:border-white/[0.08] sticky top-0 bg-inherit z-10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black tracking-wider uppercase theme-heading flex items-center gap-1.5">
            <BookOpen size={14} className="text-[#04AA6D]" /> GO TUTORIAL
          </span>
          <span className="text-[11px] font-mono theme-muted">
            {progress.completedLessons.length}/32 Selesai
          </span>
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
      <div className="py-2">
        {filteredModules.map((mod) => {
          const isCollapsed = collapsedModules[mod.id];
          const completedInMod = mod.lessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;

          return (
            <div key={mod.id} className="mb-2">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full px-3.5 py-1.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wide theme-heading hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 truncate">
                  {isCollapsed ? <ChevronRight size={13} /> : <ChevronDown size={13} />}
                  <span className="truncate">{mod.title}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0 ml-1">
                  {completedInMod}/{mod.lessons.length}
                </span>
              </button>

              {/* Lesson Links */}
              {!isCollapsed && (
                <div className="space-y-0.5 mt-0.5">
                  {mod.lessons.map((lesson) => {
                    const isActive = currentLessonId === lesson.id;
                    const isCompleted = progress.completedLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          onSelectLesson(lesson.id);
                          if (onCloseMobile) onCloseMobile();
                        }}
                        className={`w-full text-left px-5 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          isActive
                            ? "bg-[#04AA6D] text-white font-bold"
                            : "theme-body hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className="truncate">{lesson.title}</span>
                        {isCompleted && (
                          <CheckCircle
                            size={13}
                            className={`shrink-0 ml-2 ${isActive ? "text-white" : "text-[#04AA6D]"}`}
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
      </div>
    </aside>
  );
}
