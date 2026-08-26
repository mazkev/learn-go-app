import React, { useState, useEffect } from "react";
import Navbar from "./components/common/Navbar";
import RoadmapView from "./components/roadmap/RoadmapView";
import LessonStudio from "./components/editor/LessonStudio";
import ConcurrencyVisualizer from "./components/visualizer/ConcurrencyVisualizer";
import APITester from "./components/apitester/APITester";
import GrpcCompareLab from "./components/grpccompare/GrpcCompareLab";
import GormLab from "./components/gormlab/GormLab";
import CheatSheet from "./components/cheatsheet/CheatSheet";
import { useLearningProgress } from "./store/learningStore";

const THEME_STORAGE_KEY = "golearn_theme_mode";

export default function App() {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [currentLessonId, setCurrentLessonId] = useState("1-1");
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
    resetAllProgress,
  } = useLearningProgress();

  const handleSelectLesson = (lessonId) => {
    setCurrentLessonId(lessonId);
    setActiveTab("studio");
  };

  const handleOpenLab = (labTab) => {
    setActiveTab(labTab);
  };

  const handleLoadSnippetToStudio = (customCode) => {
    saveUserCode(currentLessonId, customCode);
    setActiveTab("studio");
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#00ADD8]/25 selection:text-[#00ADD8] transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
        onResetProgress={resetAllProgress}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {activeTab === "roadmap" && (
          <RoadmapView
            onSelectLesson={handleSelectLesson}
            progress={progress}
            onOpenLab={handleOpenLab}
          />
        )}

        {activeTab === "studio" && (
          <LessonStudio
            currentLessonId={currentLessonId}
            setCurrentLessonId={setCurrentLessonId}
            progress={progress}
            markLessonComplete={markLessonComplete}
            recordQuizResult={recordQuizResult}
            saveUserCode={saveUserCode}
            theme={theme}
          />
        )}

        {activeTab === "concurrency" && <ConcurrencyVisualizer />}

        {activeTab === "apitester" && <APITester />}

        {activeTab === "grpc" && <GrpcCompareLab />}

        {activeTab === "gorm" && <GormLab />}

        {activeTab === "cheatsheet" && (
          <CheatSheet onLoadSnippetToStudio={handleLoadSnippetToStudio} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/[0.08] py-4 px-6 text-center text-xs theme-muted theme-card-subtle transition-colors">
        <p>
          GoLearn Hub • Platform Belajar Golang & React Interaktif • Dibuat dengan 💙 untuk Gophers Indonesia
        </p>
      </footer>
    </div>
  );
}
