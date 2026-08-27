import React from "react";
import {
  Menu,
  X,
  BookOpen,
  FlaskConical,
  Briefcase,
  FileCode,
  Sun,
  Moon,
  Award,
  FolderSync
} from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  progress,
  theme,
  onToggleTheme,
  onToggleSidebar,
  isSidebarOpen,
  onOpenSyncModal,
  totalLessonsCount = 32
}) {
  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));
  const userLevel = Math.floor(progress.totalXP / 300) + 1;
  const isLight = theme === "light";

  const navLinks = [
    { id: "tutorial", label: "Tutorial", icon: BookOpen },
    { id: "labs", label: "Interactive Labs", icon: FlaskConical },
    { id: "interview", label: "Interview Prep", icon: Briefcase },
    { id: "cheatsheet", label: "Cheatsheet", icon: FileCode },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 theme-navbar h-[57px] flex items-center px-4 md:px-6 shadow-sm">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            {/* Hamburger button for tutorial sidebar on mobile */}
            {activeTab === "tutorial" && (
              <button
                onClick={onToggleSidebar}
                className="p-1.5 rounded-lg theme-card-subtle theme-heading lg:hidden hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                title="Toggle Sidebar Menu"
                aria-label="Toggle Sidebar Menu"
              >
                {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}

            <div
              onClick={() => setActiveTab("tutorial")}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#04AA6D] flex items-center justify-center text-white font-black shadow-sm group-hover:scale-105 transition-transform">
                <span className="text-base">🐹</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-base md:text-lg theme-heading tracking-tight">
                  W3.<span className="text-[#04AA6D]">GoLearn</span>
                </span>
                <span className="text-[10px] font-mono text-[#04AA6D] font-bold hidden sm:inline">
                  v1.22
                </span>
              </div>
            </div>
          </div>

          {/* Middle: 4 Clean Primary Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-[#04AA6D] text-white shadow-sm"
                      : "theme-body hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Stats, Sync, Progress, Theme */}
          <div className="flex items-center gap-2">
            {/* XP & Level */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg theme-card-subtle text-xs font-mono font-bold">
              <span className="text-amber-500">⚡ {progress.totalXP} XP</span>
              <span className="h-3 w-px bg-slate-300 dark:bg-white/10 hidden sm:block" />
              <span className="text-[#04AA6D] hidden sm:flex items-center gap-1">
                <Award size={12} /> Lvl {userLevel}
              </span>
            </div>

            {/* Progress % */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono theme-muted">
              <div className="w-14 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#04AA6D] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-bold text-[#04AA6D]">{progressPercent}%</span>
            </div>

            {/* Backup & Sync Button */}
            <button
              onClick={onOpenSyncModal}
              className="p-2 rounded-lg theme-card-subtle theme-heading hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title="Backup & Sync Progres (Ekspor / Impor JSON)"
              aria-label="Backup and Sync Progress"
            >
              <FolderSync size={15} className="text-[#04AA6D]" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg theme-card-subtle theme-heading hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title={isLight ? "Beralih ke Dark Mode" : "Beralih ke Light Mode"}
              aria-label="Toggle Dark and Light Mode"
            >
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Fixed for phone viewports) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 theme-navbar border-t border-slate-200 dark:border-white/[0.08] px-2 py-1.5 flex items-center justify-around shadow-2xl backdrop-blur-md">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                isActive
                  ? "text-[#04AA6D] font-extrabold"
                  : "theme-muted hover:theme-heading"
              }`}
            >
              <Icon size={18} className={isActive ? "text-[#04AA6D]" : ""} />
              <span className="mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
