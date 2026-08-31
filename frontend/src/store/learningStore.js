import { useState, useEffect, useCallback } from "react";
import { ROADMAP_MODULES } from "../data/curriculum";

const STORAGE_KEY = "golearn_user_progress_v1";

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getYesterdayDateString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
}

export function useLearningProgress() {
  const [progress, setProgress] = useState(() => {
    const today = getLocalDateString();
    const defaultData = {
      completedLessons: ["1-1"],
      completedQuizzes: {},
      totalXP: 50,
      badges: ["Gopher Rookie"],
      userCodes: {},
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: today,
      activeDaysHistory: [today],
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const yesterday = getYesterdayDateString();

        let currentStreak = parsed.currentStreak || 1;
        let longestStreak = parsed.longestStreak || currentStreak;
        let lastActive = parsed.lastActiveDate || "";
        const history = Array.isArray(parsed.activeDaysHistory) ? parsed.activeDaysHistory : [];

        // Check if streak is broken or continued
        if (lastActive === today) {
          // Already recorded today
        } else if (lastActive === yesterday) {
          // Continued streak today!
          currentStreak += 1;
          lastActive = today;
          if (currentStreak > longestStreak) longestStreak = currentStreak;
          if (!history.includes(today)) history.push(today);
        } else if (lastActive) {
          // Missed one or more days -> Reset to 1
          currentStreak = 1;
          lastActive = today;
          if (!history.includes(today)) history.push(today);
        } else {
          lastActive = today;
          if (!history.includes(today)) history.push(today);
        }

        return {
          ...defaultData,
          ...parsed,
          currentStreak,
          longestStreak,
          lastActiveDate: lastActive,
          activeDaysHistory: history,
        };
      }
    } catch (e) {
      console.error("Gagal membaca progress dari storage", e);
    }
    return defaultData;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (e) {
        console.error("Gagal menyimpan progress", e);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [progress]);

  const markLessonComplete = useCallback((lessonId, xpReward = 100) => {
    setProgress((prev) => {
      const today = getLocalDateString();
      const history = prev.activeDaysHistory ? [...prev.activeDaysHistory] : [];
      if (!history.includes(today)) history.push(today);

      if (prev.completedLessons.includes(lessonId)) {
        return { ...prev, activeDaysHistory: history };
      }

      // Trigger Confetti asynchronously (zero initial bundle impact)
      import("canvas-confetti")
        .then((m) => {
          m.default({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#00ADD8", "#10B981", "#8B5CF6", "#F59E0B"],
          });
        })
        .catch(() => {});

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
        activeDaysHistory: history,
      };
    });
  }, []);

  const recordQuizResult = useCallback((lessonId, score, passed) => {
    setProgress((prev) => {
      const today = getLocalDateString();
      const history = prev.activeDaysHistory ? [...prev.activeDaysHistory] : [];
      if (!history.includes(today)) history.push(today);

      return {
        ...prev,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [lessonId]: { score, passed, timestamp: Date.now() },
        },
        totalXP: passed ? prev.totalXP + 50 : prev.totalXP,
        activeDaysHistory: history,
      };
    });
  }, []);

  const saveUserCode = useCallback((lessonId, code) => {
    setProgress((prev) => ({
      ...prev,
      userCodes: {
        ...prev.userCodes,
        [lessonId]: code,
      },
    }));
  }, []);

  const importProgress = useCallback((importedData) => {
    if (!importedData || typeof importedData !== "object") return false;
    const today = getLocalDateString();
    const merged = {
      completedLessons: Array.isArray(importedData.completedLessons) ? importedData.completedLessons : ["1-1"],
      completedQuizzes: importedData.completedQuizzes || {},
      totalXP: typeof importedData.totalXP === "number" ? importedData.totalXP : 50,
      badges: Array.isArray(importedData.badges) ? importedData.badges : ["Gopher Rookie"],
      userCodes: importedData.userCodes || {},
      currentStreak: importedData.currentStreak || 1,
      longestStreak: importedData.longestStreak || 1,
      lastActiveDate: importedData.lastActiveDate || today,
      activeDaysHistory: Array.isArray(importedData.activeDaysHistory) ? importedData.activeDaysHistory : [today],
    };
    setProgress(merged);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {}
    return true;
  }, []);

  const resetAllProgress = useCallback(() => {
    const today = getLocalDateString();
    const fresh = {
      completedLessons: ["1-1"],
      completedQuizzes: {},
      totalXP: 50,
      badges: ["Gopher Rookie"],
      userCodes: {},
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: today,
      activeDaysHistory: [today],
    };
    setProgress(fresh);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    progress,
    markLessonComplete,
    recordQuizResult,
    saveUserCode,
    importProgress,
    resetAllProgress,
  };
}
