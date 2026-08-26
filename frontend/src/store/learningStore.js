import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { ROADMAP_MODULES } from "../data/curriculum";

const STORAGE_KEY = "golearn_user_progress_v1";

export function useLearningProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Gagal membaca progress dari storage", e);
    }
    return {
      completedLessons: ["1-1"], // Default sudah mulai lesson pertama
      completedQuizzes: {},
      totalXP: 50,
      badges: ["Gopher Rookie"],
      userCodes: {},
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Gagal menyimpan progress", e);
    }
  }, [progress]);

  const markLessonComplete = (lessonId, xpReward = 100) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00ADD8", "#10B981", "#8B5CF6", "#F59E0B"],
        });
      } catch {}

      const nextCompleted = [...prev.completedLessons, lessonId];
      const nextXP = prev.totalXP + xpReward;

      // Cek apakah ada badge baru
      const newBadges = [...prev.badges];
      ROADMAP_MODULES.forEach((mod) => {
        const allDone = mod.lessons.every((l) => nextCompleted.includes(l.id));
        if (allDone && !newBadges.includes(mod.badge)) {
          newBadges.push(mod.badge);
        }
      });

      return {
        ...prev,
        completedLessons: nextCompleted,
        totalXP: nextXP,
        badges: newBadges,
      };
    });
  };

  const recordQuizResult = (lessonId, score, passed) => {
    setProgress((prev) => ({
      ...prev,
      completedQuizzes: {
        ...prev.completedQuizzes,
        [lessonId]: { score, passed, timestamp: Date.now() },
      },
      totalXP: passed ? prev.totalXP + 50 : prev.totalXP,
    }));
  };

  const saveUserCode = (lessonId, code) => {
    setProgress((prev) => ({
      ...prev,
      userCodes: {
        ...prev.userCodes,
        [lessonId]: code,
      },
    }));
  };

  const importProgress = (importedData) => {
    if (!importedData || typeof importedData !== "object") return false;
    const merged = {
      completedLessons: Array.isArray(importedData.completedLessons) ? importedData.completedLessons : ["1-1"],
      completedQuizzes: importedData.completedQuizzes || {},
      totalXP: typeof importedData.totalXP === "number" ? importedData.totalXP : 50,
      badges: Array.isArray(importedData.badges) ? importedData.badges : ["Gopher Rookie"],
      userCodes: importedData.userCodes || {},
    };
    setProgress(merged);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {}
    return true;
  };

  const resetAllProgress = () => {
    const fresh = {
      completedLessons: ["1-1"],
      completedQuizzes: {},
      totalXP: 50,
      badges: ["Gopher Rookie"],
      userCodes: {},
    };
    setProgress(fresh);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    progress,
    markLessonComplete,
    recordQuizResult,
    saveUserCode,
    importProgress,
    resetAllProgress,
  };
}
