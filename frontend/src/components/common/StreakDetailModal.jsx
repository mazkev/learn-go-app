import React from "react";
import { Flame, Trophy, Calendar, Sparkles, X, Check, Zap, Target } from "lucide-react";

export default function StreakDetailModal({ isOpen, onClose, progress }) {
  if (!isOpen) return null;

  const currentStreak = progress.currentStreak || 1;
  const longestStreak = progress.longestStreak || currentStreak;
  const activeDays = Array.isArray(progress.activeDaysHistory) ? progress.activeDaysHistory : [];

  // Generate 7 days for current week
  const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const today = new Date();
  const currentDayIndex = today.getDay(); // 0 = Sunday

  // Get date strings for the last 7 days ending today
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const dayName = daysOfWeek[d.getDay()];
    const isToday = i === 0;
    const isActive = activeDays.includes(dateStr);

    last7Days.push({
      dateStr,
      dayName,
      isToday,
      isActive,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md theme-card rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-300 dark:border-white/15 animate-scaleUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white theme-card-subtle transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Hero Flame Header */}
        <div className="pt-8 pb-6 px-6 text-center bg-gradient-to-b from-orange-500/15 to-transparent flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/30 mb-4 animate-bounce">
            <Flame size={44} className="text-white fill-white" />
          </div>
          <h3 className="text-2xl font-black theme-heading tracking-tight flex items-center gap-2">
            <span>{currentStreak} Hari Streak!</span>
            <span className="text-xl">🔥</span>
          </h3>
          <p className="text-xs theme-muted mt-1 max-w-xs">
            {currentStreak > 1
              ? `Luar biasa! Anda telah belajar pemrograman selama ${currentStreak} hari berturut-turut.`
              : "Awal yang hebat! Belajar sedikit setiap hari untuk mempertahankan api streak Anda."}
          </p>
        </div>

        {/* 7-Day Activity Calendar */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between text-xs font-bold font-mono theme-muted mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#04AA6D]" /> 7 Hari Terakhir
            </span>
            <span className="text-[11px] text-amber-500">Aktif Hari Ini ✓</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {last7Days.map((day, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center p-2 rounded-2xl border transition-all ${
                  day.isActive
                    ? "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400 shadow-2xs"
                    : "theme-card-subtle border-slate-200 dark:border-white/5 text-slate-400"
                } ${day.isToday ? "ring-2 ring-[#04AA6D]" : ""}`}
              >
                <span className="text-[10px] font-mono font-bold">{day.dayName}</span>
                <div
                  className={`w-7 h-7 rounded-xl mt-1.5 flex items-center justify-center ${
                    day.isActive
                      ? "bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-xs"
                      : "bg-slate-200/60 dark:bg-white/5 text-slate-400"
                  }`}
                >
                  {day.isActive ? (
                    <Flame size={14} className="fill-white" />
                  ) : (
                    <span className="text-[10px]">•</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-6 py-3 grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl theme-card-subtle border border-slate-200 dark:border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
              <Trophy size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono theme-muted font-bold block">REKOR TERPANJANG</span>
              <span className="text-base font-black theme-heading">{longestStreak} Hari</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl theme-card-subtle border border-slate-200 dark:border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#04AA6D]/10 flex items-center justify-center text-[#04AA6D] shrink-0">
              <Zap size={20} className="fill-[#04AA6D]" />
            </div>
            <div>
              <span className="text-[10px] font-mono theme-muted font-bold block">TOTAL XP BELAJAR</span>
              <span className="text-base font-black theme-heading">{progress.totalXP} XP</span>
            </div>
          </div>
        </div>

        {/* Daily Motivation Banner */}
        <div className="p-6 pt-2 pb-6">
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#04AA6D]/10 to-teal-500/10 border border-[#04AA6D]/20 text-xs flex items-center gap-3">
            <Sparkles size={18} className="text-[#04AA6D] shrink-0" />
            <p className="theme-body leading-relaxed text-[11px]">
              <strong>Tips Konsistensi:</strong> Belajar 15 menit setiap hari jauh lebih efektif daripada 5 jam sekaligus dalam 1 minggu!
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 py-3 rounded-2xl bg-[#04AA6D] hover:bg-[#059862] text-white text-xs font-extrabold transition-all shadow-md cursor-pointer text-center"
          >
            Lanjutkan Belajar Sekarang 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
