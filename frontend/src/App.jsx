import React, { useState, useEffect } from "react";
import Navbar from "./components/common/Navbar";
import W3Sidebar from "./components/w3layout/W3Sidebar";
import W3TutorialReader from "./components/w3layout/W3TutorialReader";
import W3TryItStudio from "./components/w3layout/W3TryItStudio";
import LabsHub from "./components/labs/LabsHub";
import InterviewPrepLab from "./components/interview/InterviewPrepLab";
import CheatSheet from "./components/cheatsheet/CheatSheet";
import BackupSyncModal from "./components/sync/BackupSyncModal";
import { useLearningProgress } from "./store/learningStore";

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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const {
    progress,
    markLessonComplete,
    recordQuizResult,
    saveUserCode,
    importProgress,
    resetAllProgress,
  } = useLearningProgress();

  const handleSelectLesson = (lessonId) => {
    setCurrentLessonId(lessonId);
    setIsTryItMode(false);
    setActiveTab("tutorial");
  };

  const handleOpenTryIt = (codeSnippet) => {
    setTryItCode(codeSnippet);
    setIsTryItMode(true);
  };

  const handleLoadSnippetToTryIt = (customCode) => {
    setTryItCode(customCode);
    setIsTryItMode(true);
    setActiveTab("tutorial");
  };

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
      <div className="flex-1 flex min-h-0">
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
                <W3TryItStudio
                  key={`${currentLessonId}_${tryItCode ? tryItCode.slice(0, 15) : ""}`}
                  initialCode={tryItCode}
                  lessonTitle={`Lesson ${currentLessonId}`}
                  onBackToTutorial={() => setIsTryItMode(false)}
                  theme={theme}
                  onToggleTheme={toggleTheme}
                />
              </div>
            )}
          </>
        )}

        {/* Hub 2: Interactive Labs Workbench */}
        {activeTab === "labs" && (
          <main className="flex-1 overflow-y-auto">
            <LabsHub />
          </main>
        )}

        {/* Hub 3: Interview Preparation Center */}
        {activeTab === "interview" && (
          <main className="flex-1 overflow-y-auto">
            <InterviewPrepLab />
          </main>
        )}

        {/* Hub 4: Cheatsheet & Snippets Reference */}
        {activeTab === "cheatsheet" && (
          <main className="flex-1 overflow-y-auto">
            <CheatSheet onLoadSnippetToStudio={handleLoadSnippetToTryIt} />
          </main>
        )}
      </div>

      {/* Backup & Sync Modal */}
      <BackupSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        progress={progress}
        onImportProgress={importProgress}
        onResetProgress={resetAllProgress}
      />
    </div>
  );
}
