import React, { useState } from "react";
import {
  Code2,
  Boxes,
  Cpu,
  Activity,
  Globe,
  Database,
  CheckCircle2,
  PlayCircle,
  ChevronRight,
  ChevronDown,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  Check
} from "lucide-react";
import { ROADMAP_MODULES } from "../../data/curriculum";

const ICON_MAP = {
  Code2: Code2,
  Boxes: Boxes,
  Cpu: Cpu,
  Activity: Activity,
  Globe: Globe,
  Database: Database,
};

export default function RoadmapView({
  onSelectLesson,
  progress,
  onOpenLab
}) {
  const [expandedModules, setExpandedModules] = useState({
    "module-1": true,
    "module-2": true,
    "module-3": false,
    "module-4": false,
    "module-5": false,
    "module-6": false,
  });

  const toggleModule = (id) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalLessons = ROADMAP_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const overallPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 theme-card border border-[#00ADD8]/25 shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gradient-to-br from-[#00ADD8]/20 via-[#8B5CF6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ADD8]/10 border border-[#00ADD8]/30 text-[#00ADD8] text-xs font-bold tracking-wide">
              <Sparkles size={14} className="animate-spin" />
              <span>ROADMAP RESMI GOLANG 2026</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black theme-heading tracking-tight leading-tight">
              Belajar <span className="gopher-gradient-text">Golang Interaktif</span> dari Dasar hingga Mahir
            </h1>
            
            <p className="theme-muted text-sm md:text-base leading-relaxed font-normal">
              Pelajari 6 modul utama Go: dasar sintaks, struktur data slice & map, konsep OOP pointer & interface,
              konkurensi goroutine/channel, web REST API, hingga integrasi database GORM.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={() => onOpenLab("concurrency")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-all hover:scale-105"
              >
                <Activity size={14} />
                <span>Simulasi Concurrency Lab</span>
              </button>
              <button
                onClick={() => onOpenLab("apitester")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-300 text-xs font-bold hover:bg-sky-500/20 transition-all hover:scale-105"
              >
                <Globe size={14} />
                <span>REST API Tester</span>
              </button>
              <button
                onClick={() => onOpenLab("gorm")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-600 dark:text-pink-300 text-xs font-bold hover:bg-pink-500/20 transition-all hover:scale-105"
              >
                <Database size={14} />
                <span>GORM Database Lab</span>
              </button>
            </div>
          </div>

          {/* Overall Progress Widget */}
          <div className="w-full lg:w-72 theme-card-subtle p-6 rounded-3xl space-y-4 shrink-0 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs theme-muted font-bold uppercase tracking-wider">Progres Belajar</span>
              <span className="text-sm font-black text-[#00ADD8] font-mono">{overallPercent}%</span>
            </div>
            
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#00ADD8] via-[#8B5CF6] to-[#10B981] rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-1 text-center">
              <div className="theme-card p-3 rounded-2xl">
                <div className="text-lg font-black theme-heading font-mono">{completedCount}/{totalLessons}</div>
                <div className="text-[11px] theme-muted font-medium mt-0.5">Pelajaran</div>
              </div>
              <div className="theme-card p-3 rounded-2xl">
                <div className="text-lg font-black text-amber-500 font-mono">{progress.totalXP}</div>
                <div className="text-[11px] theme-muted font-medium mt-0.5">Poin XP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Modules List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold theme-heading flex items-center gap-2.5">
              <BookOpen className="text-[#00ADD8]" size={22} />
              <span>Tahapan Materi Kurikulum Golang</span>
            </h2>
            <p className="text-xs theme-muted mt-0.5">Pilih modul di bawah untuk mulai belajar & latihan coding</p>
          </div>
          <span className="text-xs font-mono theme-muted theme-card-subtle px-3 py-1.5 rounded-xl font-medium">
            6 Modul • 24 Pelajaran
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {ROADMAP_MODULES.map((module) => {
            const Icon = ICON_MAP[module.icon] || Code2;
            const isExpanded = expandedModules[module.id];
            const completedInModule = module.lessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;
            const isModuleComplete = completedInModule === module.lessons.length;
            const percent = Math.round((completedInModule / module.lessons.length) * 100);

            return (
              <div
                key={module.id}
                className="theme-card rounded-3xl overflow-hidden shadow-sm"
              >
                {/* Module Header Bar */}
                <div
                  onClick={() => toggleModule(module.id)}
                  className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start md:items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0"
                      style={{
                        backgroundColor: `${module.color}15`,
                        border: `1px solid ${module.color}40`,
                        color: module.color,
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-base md:text-lg font-bold theme-heading tracking-tight">{module.title}</h3>
                        {isModuleComplete && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                            <Check size={12} /> Selesai
                          </span>
                        )}
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-white/[0.06] theme-muted font-mono font-bold">
                          +{module.xp} XP
                        </span>
                      </div>
                      <p className="text-xs md:text-sm theme-muted">{module.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    {/* Progress Bar in Card */}
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: module.color,
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono font-bold theme-heading">
                        {completedInModule}/{module.lessons.length}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl theme-card-subtle theme-muted hover:theme-heading transition-colors">
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Content Body */}
                {isExpanded && (
                  <div className="border-t border-slate-200 dark:border-white/[0.08] theme-card-subtle p-5 md:p-6 space-y-4">
                    <p className="text-xs md:text-sm theme-muted theme-card p-4 rounded-2xl leading-relaxed">
                      {module.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                      {module.lessons.map((lesson) => {
                        const isLessonDone = progress.completedLessons.includes(lesson.id);

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => onSelectLesson(lesson.id)}
                            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 group ${
                              isLessonDone
                                ? "bg-emerald-500/[0.06] border-emerald-500/40 hover:border-emerald-500/70"
                                : "theme-card hover:border-[#00ADD8]/50 hover:scale-[1.01]"
                            }`}
                          >
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                {isLessonDone ? (
                                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                                ) : (
                                  <PlayCircle size={16} className="text-[#00ADD8] shrink-0 group-hover:scale-110 transition-transform" />
                                )}
                                <h4 className="text-xs md:text-sm font-bold theme-heading group-hover:text-[#00ADD8] transition-colors truncate">
                                  {lesson.title}
                                </h4>
                              </div>
                              <p className="text-xs theme-muted line-clamp-2 pl-6 leading-relaxed">
                                {lesson.summary}
                              </p>
                            </div>

                            <button className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-white/[0.08] theme-heading group-hover:bg-gradient-to-r group-hover:from-[#00ADD8] group-hover:to-[#0284C7] group-hover:text-white transition-all shrink-0 mt-0.5 flex items-center gap-1 shadow-sm">
                              <span>Mulai</span>
                              <ArrowUpRight size={13} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
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
