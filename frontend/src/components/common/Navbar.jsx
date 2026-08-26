import React from "react";
import {
  Code2,
  Map,
  Activity,
  Globe,
  Database,
  BookOpen,
  Award,
  Zap,
  RotateCcw,
  Sun,
  Moon
} from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  progress,
  onResetProgress,
  theme,
  onToggleTheme,
  totalLessonsCount = 32
}) {
  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));
  const userLevel = Math.floor(progress.totalXP / 300) + 1;

  const isLight = theme === "light";

  const navItems = [
    { id: "roadmap", label: "Roadmap", icon: Map },
    { id: "studio", label: "Code Studio", icon: Code2 },
    { id: "concurrency", label: "Concurrency Lab", icon: Activity },
    { id: "apitester", label: "REST API", icon: Globe },
    { id: "grpc", label: "gRPC Lab", icon: Zap },
    { id: "gorm", label: "GORM Lab", icon: Database },
    { id: "cheatsheet", label: "Cheatsheet", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 theme-navbar backdrop-blur-lg px-4 lg:px-8 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab("roadmap")}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00ADD8] via-[#0284C7] to-[#8B5CF6] p-0.5 shadow-md shadow-[#00ADD8]/20 group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full rounded-[14px] flex items-center justify-center bg-white dark:bg-[#070b14]">
              <span className="text-xl">🐹</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg theme-heading tracking-tight">GoLearn Hub</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00ADD8]/15 text-[#00ADD8] border border-[#00ADD8]/30 font-bold font-mono">
                Go 1.22+
              </span>
            </div>
            <p className="text-[11px] theme-muted font-medium">Roadmap Belajar Golang Interaktif</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center flex-wrap justify-center gap-1 theme-card-subtle p-1.5 rounded-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-[#00ADD8] to-[#0284C7] text-white shadow-md shadow-[#00ADD8]/30 scale-[1.02]"
                    : "theme-muted hover:theme-heading hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Stats & Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* XP & Level Badge */}
          <div className="flex items-center gap-2 theme-card px-3 py-1.5 rounded-2xl">
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs font-mono">
              <Zap size={13} className="fill-amber-500 text-amber-500" />
              <span>{progress.totalXP} XP</span>
            </div>
            <div className="h-3 w-px bg-slate-300 dark:bg-white/10" />
            <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
              <Award size={13} />
              <span>Lvl {userLevel}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="hidden lg:flex items-center gap-2.5 theme-card px-3.5 py-1.5 rounded-2xl">
            <div className="w-20 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#00ADD8] to-[#10B981] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-[#00ADD8]">{progressPercent}%</span>
          </div>

          {/* Theme Toggle Button (Light/Dark) */}
          <button
            onClick={onToggleTheme}
            title={isLight ? "Beralih ke Tema Gelap (Dark Mode)" : "Beralih ke Tema Terang (Light Mode)"}
            className="p-2 theme-card hover:border-[#00ADD8]/50 rounded-2xl transition-all flex items-center justify-center cursor-pointer shadow-sm hover:scale-105"
          >
            {isLight ? (
              <Moon size={16} className="text-purple-600 fill-purple-600" />
            ) : (
              <Sun size={16} className="text-amber-400 fill-amber-400" />
            )}
          </button>

          {/* Reset Button */}
          <button
            onClick={() => {
              if (window.confirm("Apakah Anda yakin ingin mereset semua progres belajar?")) {
                onResetProgress();
              }
            }}
            title="Reset Progress"
            className="p-2 theme-card hover:text-rose-500 hover:border-rose-300 rounded-2xl transition-all text-slate-400 hover:scale-105"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
