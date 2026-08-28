import { useState, useRef, useEffect } from "react";
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
  ChevronDown,
  Check,
  Zap,
  Flame,
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
  totalLessonsCount = 34,
  activeLanguage = "go",
  onSelectLanguage,
  onOpenCommandPalette,
  onOpenStreakModal,
}) {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));
  const userLevel = Math.floor(progress.totalXP / 300) + 1;
  const isLight = theme === "light";

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { id: "tutorial", label: "Tutorial", icon: BookOpen },
    { id: "labs", label: "Interactive Labs", icon: FlaskConical },
    { id: "interview", label: "Interview Prep", icon: Briefcase },
    { id: "cheatsheet", label: "Cheatsheet", icon: FileCode },
  ];

  const languages = [
    { id: "go", name: "Go (Golang)", icon: "🐹", color: "#04AA6D", badge: "34 Pelajaran" },
    { id: "java", name: "Java (OOP & Spring)", icon: "☕", color: "#f89820", badge: "20 Pelajaran" },
    { id: "python", name: "Python 3", icon: "🐍", color: "#3776AB", badge: "16 Pelajaran" },
    { id: "javascript", name: "JavaScript / TS", icon: "🟨", color: "#E5A00D", badge: "12 Pelajaran" },
  ];

  const currentLang = languages.find((l) => l.id === activeLanguage) || languages[0];

  return (
    <>
      <header className="sticky top-0 z-50 theme-navbar h-[57px] flex items-center px-3 md:px-6 shadow-sm border-b border-slate-200 dark:border-white/[0.08]">
        <div className="w-full flex items-center justify-between gap-2 md:gap-4">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
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
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black shadow-sm group-hover:scale-105 transition-transform"
                style={{ backgroundColor: currentLang.color }}
              >
                <span className="text-base">{currentLang.icon}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-base md:text-lg theme-heading tracking-tight">
                  M3.<span style={{ color: currentLang.color }}>learn</span>
                </span>
              </div>
            </div>

            {/* Compact Language Selector Dropdown */}
            {onSelectLanguage && (
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setIsLangDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-200/80 dark:bg-white/10 text-xs font-bold font-mono theme-heading hover:bg-slate-300/80 dark:hover:bg-white/15 transition-all cursor-pointer border border-slate-300/60 dark:border-white/10 shadow-2xs"
                  title="Pilih Bahasa Pemrograman"
                >
                  <span>{currentLang.icon} {currentLang.name.split(" ")[0]}</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu Popover */}
                {isLangDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-[#0d1527] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-1.5 z-50 animate-scaleUp">
                    <div className="px-2.5 py-1.5 text-[10px] font-mono font-bold theme-muted uppercase tracking-wider border-b border-slate-100 dark:border-white/5 mb-1">
                      Pilih Kurikulum Bahasa
                    </div>
                    {languages.map((lang) => {
                      const isSelected = lang.id === activeLanguage;
                      return (
                        <button
                          key={lang.id}
                          onClick={() => {
                            onSelectLanguage(lang.id);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-slate-100 dark:bg-white/10 text-[#04AA6D]"
                              : "theme-body hover:bg-slate-50 dark:hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{lang.icon}</span>
                            <div className="text-left">
                              <div className="leading-tight">{lang.name}</div>
                              <span className="text-[10px] font-normal theme-muted">{lang.badge}</span>
                            </div>
                          </div>
                          {isSelected && <Check size={14} className="text-[#04AA6D]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Middle: 4 Clean Primary Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "text-white shadow-sm"
                      : "theme-body hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                  style={isActive ? { backgroundColor: currentLang.color } : {}}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Search, Unified Stats, Sync, Theme */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Quick Search Button (Ctrl + K) */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-200/70 dark:bg-white/10 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer border border-slate-300/60 dark:border-white/10 shadow-2xs hover:scale-[1.02]"
                title="Cari Materi / Aksi Cepat (Ctrl + K)"
              >
                <Search size={13} className="text-[#04AA6D]" />
                <span className="font-medium text-[11px] hidden sm:inline">Cari...</span>
                <kbd className="hidden sm:inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-black/40 border border-slate-300 dark:border-white/10 text-slate-500 dark:text-slate-400">
                  Ctrl K
                </kbd>
              </button>
            )}

            {/* Interactive Daily Streak Pill */}
            {onOpenStreakModal && (
              <button
                onClick={onOpenStreakModal}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-mono font-bold transition-all cursor-pointer border border-orange-500/30 shadow-2xs hover:scale-105"
                title="Lihat Rincian Daily Learning Streak"
              >
                <Flame size={13} className="text-orange-500 fill-orange-500 animate-pulse" />
                <span>{progress.currentStreak || 1}d</span>
              </button>
            )}

            {/* Unified XP & Level Stats Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl theme-card-subtle text-xs font-mono font-bold border border-slate-200 dark:border-white/5">
              <span className="text-amber-500 flex items-center gap-0.5">
                <Zap size={11} className="fill-amber-500" /> {progress.totalXP}
              </span>
              <span className="h-3 w-px bg-slate-300 dark:bg-white/10" />
              <span className="text-[#04AA6D] flex items-center gap-1">
                <Award size={11} /> Lvl {userLevel}
              </span>
              <span className="h-3 w-px bg-slate-300 dark:bg-white/10 hidden md:block" />
              <span className="hidden md:inline text-slate-400 font-medium">
                {progressPercent}%
              </span>
            </div>

            {/* Backup & Sync Button */}
            <button
              onClick={onOpenSyncModal}
              className="p-1.5 rounded-xl theme-card-subtle theme-heading hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border border-slate-200 dark:border-white/5"
              title="Backup & Sync Progres (Ekspor / Impor JSON)"
              aria-label="Backup and Sync Progress"
            >
              <FolderSync size={14} className="text-[#04AA6D]" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-xl theme-card-subtle theme-heading hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border border-slate-200 dark:border-white/5"
              title={isLight ? "Beralih ke Dark Mode" : "Beralih ke Light Mode"}
              aria-label="Toggle Dark and Light Mode"
            >
              {isLight ? <Moon size={14} /> : <Sun size={14} />}
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
