import React, { useState, useEffect, Suspense, lazy, useCallback } from "react";
import Navbar from "./components/common/Navbar";
import W3Sidebar from "./components/w3layout/W3Sidebar";
import W3TutorialReader from "./components/w3layout/W3TutorialReader";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { useLearningProgress } from "./store/learningStore";
import { getLanguageConfig } from "./services/languageManager";

// Code-split heavy views with React.lazy
const W3TryItStudio = lazy(() => import("./components/w3layout/W3TryItStudio"));
const LabsHub = lazy(() => import("./components/labs/LabsHub"));
const InterviewPrepLab = lazy(() => import("./components/interview/InterviewPrepLab"));
const CheatSheet = lazy(() => import("./components/cheatsheet/CheatSheet"));
const BackupSyncModal = lazy(() => import("./components/sync/BackupSyncModal"));
const CommandPaletteModal = lazy(() => import("./components/common/CommandPaletteModal"));
const StreakDetailModal = lazy(() => import("./components/common/StreakDetailModal"));
const MobileLearningHub = lazy(() => import("./components/mobile/MobileLearningHub"));

const THEME_STORAGE_KEY = "w3_golearn_theme";
const LANG_STORAGE_KEY = "w3_active_language";

export default function App() {
  const [activeTab, setActiveTab] = useState("tutorial");
  const [mobileTutorialMode, setMobileTutorialMode] = useState("hub"); // "hub" | "reader"
  const [activeLanguage, setActiveLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved) return saved;
    } catch {}
    return "go";
  });

  const langConfig = getLanguageConfig(activeLanguage);
  const activeModules = langConfig.modules;

  const [currentLessonId, setCurrentLessonId] = useState(() => {
    return activeModules[0]?.lessons[0]?.id || "1-1";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tryItCode, setTryItCode] = useState(null);
  const [isTryItMode, setIsTryItMode] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) return saved;
    } catch {}
    return "light";
  });

  // Global Ctrl + K / Cmd + K shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const {
    progress,
    markLessonComplete,
    recordQuizResult,
    saveUserCode,
    importProgress,
    resetAllProgress,
  } = useLearningProgress();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const handleSelectLanguage = useCallback((langId) => {
    setActiveLanguage(langId);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, langId);
    } catch {}
    const config = getLanguageConfig(langId);
    if (config && config.modules && config.modules[0]?.lessons[0]?.id) {
      setCurrentLessonId(config.modules[0].lessons[0].id);
    }
  }, []);

  const handleSelectLesson = useCallback((lessonId, openReader = false) => {
    setCurrentLessonId(lessonId);
    setIsTryItMode(false);
    if (openReader) {
      setMobileTutorialMode("reader");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleOpenTryIt = useCallback((codeSnippet) => {
    setTryItCode(codeSnippet);
    setIsTryItMode(true);
  }, []);

  const handleLoadSnippetToTryIt = useCallback((codeSnippet) => {
    setTryItCode(codeSnippet);
    setActiveTab("tutorial");
    setIsTryItMode(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsTryItMode(false);
          if (tab === "tutorial") setMobileTutorialMode("hub");
        }}
        progress={progress}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        activeLanguage={activeLanguage}
        onSelectLanguage={handleSelectLanguage}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
      />

      {/* Main App Body */}
      <div className="flex-1 flex min-h-0 pb-14 md:pb-0">
        {/* Hub 1: W3 Tutorial Mode */}
        {activeTab === "tutorial" && (
          <>
            {!isTryItMode ? (
              <div className="flex-1 flex min-h-0">
                {/* Mobile View: Dedicated Mobile Learning Hub vs Reader */}
                <div className="flex-1 md:hidden overflow-y-auto">
                  {mobileTutorialMode === "hub" ? (
                    <Suspense fallback={<LoadingSpinner message="Memuat Peta Petualangan Belajar..." />}>
                      <MobileLearningHub
                        activeLanguage={activeLanguage}
                        onSelectLanguage={handleSelectLanguage}
                        modules={activeModules}
                        currentLessonId={currentLessonId}
                        onSelectLesson={(lessonId) => handleSelectLesson(lessonId, true)}
                        progress={progress}
                        onOpenStreakModal={() => setIsStreakModalOpen(true)}
                        onOpenSyncModal={() => setIsSyncModalOpen(true)}
                      />
                    </Suspense>
                  ) : (
                    <W3TutorialReader
                      currentLessonId={currentLessonId}
                      onSelectLesson={handleSelectLesson}
                      onOpenTryIt={handleOpenTryIt}
                      progress={progress}
                      markLessonComplete={markLessonComplete}
                      recordQuizResult={recordQuizResult}
                      modules={activeModules}
                      activeLanguage={activeLanguage}
                      onBackToMobileHub={() => setMobileTutorialMode("hub")}
                    />
                  )}
                </div>

                {/* Desktop View: Split Sidebar + Reader */}
                <div className="hidden md:flex flex-1 min-h-0">
                  <W3Sidebar
                    currentLessonId={currentLessonId}
                    onSelectLesson={handleSelectLesson}
                    progress={progress}
                    isOpen={isSidebarOpen}
                    onCloseMobile={() => setIsSidebarOpen(false)}
                    modules={activeModules}
                    activeLanguage={activeLanguage}
                  />

                  <main className="flex-1 overflow-y-auto">
                    <W3TutorialReader
                      currentLessonId={currentLessonId}
                      onSelectLesson={handleSelectLesson}
                      onOpenTryIt={handleOpenTryIt}
                      progress={progress}
                      markLessonComplete={markLessonComplete}
                      recordQuizResult={recordQuizResult}
                      modules={activeModules}
                      activeLanguage={activeLanguage}
                    />
                  </main>
                </div>
              </div>
            ) : (
              /* W3 Split-Screen Tryit Editor */
              <div className="flex-1">
                <Suspense fallback={<LoadingSpinner message="Mempersiapkan W3 Tryit Studio..." />}>
                  <W3TryItStudio
                    key={`${currentLessonId}_${tryItCode ? tryItCode.slice(0, 15) : ""}`}
                    initialCode={tryItCode}
                    lessonTitle={`Lesson ${currentLessonId}`}
                    onBackToTutorial={() => setIsTryItMode(false)}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    language={activeLanguage}
                  />
                </Suspense>
              </div>
            )}
          </>
        )}

        {/* Hub 2: Interactive Labs Workbench */}
        {activeTab === "labs" && (
          <main className="flex-1 overflow-y-auto">
            <Suspense fallback={<LoadingSpinner message="Memuat Interactive Labs Workbench..." />}>
              <LabsHub onOpenTryIt={handleLoadSnippetToTryIt} />
            </Suspense>
          </main>
        )}

        {/* Hub 3: Interview Preparation Center */}
        {activeTab === "interview" && (
          <main className="flex-1 overflow-y-auto">
            <Suspense fallback={<LoadingSpinner message="Memuat Interview Prep & Quiz Arena..." />}>
              <InterviewPrepLab />
            </Suspense>
          </main>
        )}

        {/* Hub 4: Cheatsheet & Snippets Reference */}
        {activeTab === "cheatsheet" && (
          <main className="flex-1 overflow-y-auto">
            <Suspense fallback={<LoadingSpinner message="Memuat Go Cheatsheet..." />}>
              <CheatSheet onLoadSnippetToStudio={handleLoadSnippetToTryIt} />
            </Suspense>
          </main>
        )}
      </div>

      {/* Backup & Sync Modal */}
      {isSyncModalOpen && (
        <Suspense fallback={null}>
          <BackupSyncModal
            isOpen={isSyncModalOpen}
            onClose={() => setIsSyncModalOpen(false)}
            progress={progress}
            onImportProgress={importProgress}
            onResetProgress={resetAllProgress}
          />
        </Suspense>
      )}

      {/* Global Command Palette (Ctrl + K) */}
      {isCommandPaletteOpen && (
        <Suspense fallback={null}>
          <CommandPaletteModal
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            activeLanguage={activeLanguage}
            onSelectLanguage={handleSelectLanguage}
            onSelectLesson={handleSelectLesson}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setIsTryItMode(false);
            }}
            darkMode={theme === "dark"}
            setDarkMode={(isDark) => setTheme(isDark ? "dark" : "light")}
            onOpenSync={() => setIsSyncModalOpen(true)}
          />
        </Suspense>
      )}

      {/* Daily Learning Streak Detail Modal */}
      {isStreakModalOpen && (
        <Suspense fallback={null}>
          <StreakDetailModal
            isOpen={isStreakModalOpen}
            onClose={() => setIsStreakModalOpen(false)}
            progress={progress}
          />
        </Suspense>
      )}
    </div>
  );
}
