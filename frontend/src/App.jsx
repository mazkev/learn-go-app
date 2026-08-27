import React, { useState, useEffect, Suspense, lazy, useCallback } from "react";
import Navbar from "./components/common/Navbar";
import W3Sidebar from "./components/w3layout/W3Sidebar";
import W3TutorialReader from "./components/w3layout/W3TutorialReader";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { useLearningProgress } from "./store/learningStore";

// Code-split heavy views with React.lazy
const W3TryItStudio = lazy(() => import("./components/w3layout/W3TryItStudio"));
const LabsHub = lazy(() => import("./components/labs/LabsHub"));
const InterviewPrepLab = lazy(() => import("./components/interview/InterviewPrepLab"));
const CheatSheet = lazy(() => import("./components/cheatsheet/CheatSheet"));
const BackupSyncModal = lazy(() => import("./components/sync/BackupSyncModal"));

const THEME_STORAGE_KEY = "w3_golearn_theme";

export default function App() {
  const [activeTab, setActiveTab] = useState("tutorial");
  const [currentLessonId, setCurrentLessonId] = useState("1-1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tryItCode, setTryItCode] = useState(null);
  const [isTryItMode, setIsTryItMode] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) return saved;
    } catch {}
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const {
    progress,
    markLessonComplete,
    recordQuizResult,
    saveUserCode,
    importProgress,
    resetAllProgress,
  } = useLearningProgress();

  const handleSelectLesson = useCallback((lessonId) => {
    setCurrentLessonId(lessonId);
    setIsTryItMode(false);
    setActiveTab("tutorial");
  }, []);

  const handleOpenTryIt = useCallback((codeSnippet) => {
    setTryItCode(codeSnippet);
    setIsTryItMode(true);
  }, []);

  const handleLoadSnippetToTryIt = useCallback((customCode) => {
    setTryItCode(customCode);
    setIsTryItMode(true);
    setActiveTab("tutorial");
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#04AA6D]/20 selection:text-[#04AA6D]">
      {/* Top Header Navbar (4 Primary Hubs) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsTryItMode(false);
        }}
        progress={progress}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
      />

      {/* Main App Body */}
      <div className="flex-1 flex min-h-0 pb-14 md:pb-0">
        {/* Hub 1: W3 Tutorial Mode */}
        {activeTab === "tutorial" && (
          <>
            {!isTryItMode ? (
              <div className="flex-1 flex min-h-0">
                {/* W3 Collapsible Sidebar */}
                <W3Sidebar
                  currentLessonId={currentLessonId}
                  onSelectLesson={handleSelectLesson}
                  progress={progress}
                  isOpen={isSidebarOpen}
                  onCloseMobile={() => setIsSidebarOpen(false)}
                />

                {/* Central Tutorial Article Reader */}
                <main className="flex-1 overflow-y-auto">
                  <W3TutorialReader
                    currentLessonId={currentLessonId}
                    onSelectLesson={handleSelectLesson}
                    onOpenTryIt={handleOpenTryIt}
                    progress={progress}
                    markLessonComplete={markLessonComplete}
                    recordQuizResult={recordQuizResult}
                  />
                </main>
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
              <LabsHub />
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
    </div>
  );
}
