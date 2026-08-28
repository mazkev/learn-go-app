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
  FolderSync,
  Search,
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
  totalLessonsCount = 32,
  activeLanguage = "go",
  onSelectLanguage,
  onOpenCommandPalette,
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
              <div className={`w-8 h-8 rounded-lg ${
                activeLanguage === "java"
                  ? "bg-[#f89820]"
                  : activeLanguage === "python"
                  ? "bg-[#3776AB]"
                  : "bg-[#04AA6D]"
              } flex items-center justify-center text-white font-black shadow-sm group-hover:scale-105 transition-transform`}>
                <span className="text-base">
                  {activeLanguage === "java" ? "☕" : activeLanguage === "python" ? "🐍" : "🐹"}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-base md:text-lg theme-heading tracking-tight">
                  M3.<span className={
                    activeLanguage === "java"
                      ? "text-[#f89820]"
                      : activeLanguage === "python"
                      ? "text-[#3776AB]"
                      : "text-[#04AA6D]"
                  }>learn</span>
                </span>
                <span className="text-[10px] font-mono text-[#04AA6D] font-bold hidden sm:inline">
                  {activeLanguage === "java" ? "• Java" : activeLanguage === "python" ? "• Python 3" : "• Go"}
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
                      ? `${
                          activeLanguage === "java"
                            ? "bg-[#f89820]"
                            : activeLanguage === "python"
                            ? "bg-[#3776AB]"
                            : "bg-[#04AA6D]"
                        } text-white shadow-sm`
                      : "theme-body hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Search, Language Switcher, Stats, Sync, Progress, Theme */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button (Ctrl + K) */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-200/70 dark:bg-white/10 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer border border-slate-300/60 dark:border-white/10 shadow-2xs hover:scale-[1.02]"
                title="Cari Materi / Aksi Cepat (Ctrl + K)"
              >
                <Search size={13} className="text-[#04AA6D]" />
                <span className="font-medium text-[11px]">Cari...</span>
                <kbd className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-black/40 border border-slate-300 dark:border-white/10 text-slate-500 dark:text-slate-400">
                  Ctrl K
                </kbd>
              </button>
            )}

            {/* Language Switcher Pill */}
            {onSelectLanguage && (
              <div className="flex items-center p-0.5 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-bold font-mono">
                <button
                  onClick={() => onSelectLanguage("go")}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    activeLanguage === "go"
                      ? "bg-[#04AA6D] text-white shadow-xs"
                      : "theme-muted hover:theme-heading"
                  }`}
                  title="Pindah ke materi Go"
                >
                  <span>🐹 Go</span>
                </button>
                <button
                  onClick={() => onSelectLanguage("java")}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    activeLanguage === "java"
                      ? "bg-[#f89820] text-white shadow-xs"
                      : "theme-muted hover:theme-heading"
                  }`}
                  title="Pindah ke materi Java"
                >
                  <span>☕ Java</span>
                </button>
                <button
                  onClick={() => onSelectLanguage("python")}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    activeLanguage === "python"
                      ? "bg-[#3776AB] text-white shadow-xs"
                      : "theme-muted hover:theme-heading"
                  }`}
                  title="Pindah ke materi Python 3"
                >
                  <span>🐍 Python</span>
                </button>
              </div>
            )}
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
