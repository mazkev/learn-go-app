import React, { useState, useMemo } from "react";
import {
  X,
  Sparkles,
  Layers,
  Code,
  BookOpen,
  ArrowRight,
  Filter,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Activity
} from "lucide-react";
import { analyzeGoCodeAnatomy } from "../../services/codeExplainer";

export default function CodeAnatomyModal({ isOpen, onClose, code = "", title = "Bedah Kode Go" }) {
  const [selectedLineNum, setSelectedLineNum] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const anatomy = useMemo(() => {
    return analyzeGoCodeAnatomy(code);
  }, [code]);

  const categories = useMemo(() => {
    const set = new Set(["Semua"]);
    anatomy.forEach((item) => set.add(item.category));
    return Array.from(set);
  }, [anatomy]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "Semua") return anatomy;
    return anatomy.filter((item) => item.category === selectedCategory);
  }, [anatomy, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#0b1120] rounded-3xl w-full max-w-5xl h-[85vh] max-h-[850px] shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between gap-4 bg-slate-50 dark:bg-[#070d19] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#04AA6D]/15 text-[#04AA6D] flex items-center justify-center shadow-inner">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#04AA6D]">
                  Interactive Code Anatomy
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 theme-muted font-mono font-bold">
                  {anatomy.length} Baris Dianalisis
                </span>
              </div>
              <h3 className="text-base md:text-lg font-black theme-heading tracking-tight">
                🔬 Bedah Baris per Baris: <span className="gopher-gradient-text">{title}</span>
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl theme-card-subtle theme-muted hover:theme-heading hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Tutup Modal (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Filter Pills Toolbar */}
        <div className="px-6 py-2.5 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1120] flex items-center gap-1.5 overflow-x-auto shrink-0">
          <span className="text-[11px] font-bold theme-muted mr-1.5 flex items-center gap-1 shrink-0">
            <Filter size={12} /> Kategori:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#04AA6D] text-white shadow-xs"
                  : "theme-card-subtle theme-muted hover:theme-heading"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Modal Body: Two Columns (Code Left | Explanation Cards Right) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-white/10 min-h-0 overflow-hidden">
          {/* Left Column (5 cols): Complete Code View with Line Highlighting */}
          <div className="lg:col-span-5 flex flex-col min-h-0 bg-slate-950 text-slate-100 overflow-hidden">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] font-mono font-bold text-slate-400 flex items-center justify-between shrink-0">
              <span>Source: main.go</span>
              <span className="text-emerald-400">Klik baris untuk fokus 👆</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1">
              {(code || "").split("\n").map((line, idx) => {
                const lineNum = idx + 1;
                const isSelected = selectedLineNum === lineNum;
                const hasExplanation = anatomy.some((a) => a.lineNum === lineNum);

                return (
                  <div
                    key={lineNum}
                    onClick={() => hasExplanation && setSelectedLineNum(lineNum)}
                    className={`flex items-start gap-3 px-2.5 py-1 rounded-lg transition-all ${
                      hasExplanation ? "cursor-pointer" : "opacity-40"
                    } ${
                      isSelected
                        ? "bg-[#04AA6D]/25 border-l-4 border-l-[#04AA6D] font-bold text-white shadow-sm"
                        : "hover:bg-white/5 text-slate-300"
                    }`}
                  >
                    <span className="text-slate-600 select-none w-6 text-right shrink-0">
                      {lineNum}
                    </span>
                    <span className="whitespace-pre overflow-x-auto flex-1">
                      {line || " "}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 cols): Detailed Breakdown Cards */}
          <div className="lg:col-span-7 flex flex-col min-h-0 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-[#070d19]/40">
            {filteredItems.map((item) => {
              const isSelected = selectedLineNum === item.lineNum;

              return (
                <div
                  key={item.lineNum}
                  onClick={() => setSelectedLineNum(item.lineNum)}
                  className={`theme-card rounded-2xl p-5 space-y-3 shadow-xs border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#04AA6D] ring-2 ring-[#04AA6D]/20 shadow-md bg-[#04AA6D]/5"
                      : "hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  {/* Top line banner */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-emerald-400 font-mono font-bold text-xs">
                        Baris #{item.lineNum}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${item.badgeColor}`}>
                        {item.category}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="text-[10px] font-bold text-[#04AA6D] flex items-center gap-1 font-mono">
                        <CheckCircle2 size={12} /> Fokus Terpilih
                      </span>
                    )}
                  </div>

                  {/* Code snippet display */}
                  <pre className="bg-slate-100 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-800 dark:text-emerald-300 overflow-x-auto shadow-inner">
                    {item.code}
                  </pre>

                  {/* Explanation Title & Summary */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-black theme-heading">
                      {item.title}
                    </h4>
                    <p className="text-xs theme-body leading-relaxed">
                      💡 <strong>Fungsi:</strong> {item.summary}
                    </p>
                  </div>

                  {/* Deep Details */}
                  <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-[11px] theme-muted leading-relaxed">
                    🔍 <strong>Detail Teknis:</strong> {item.details}
                  </div>
                </div>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="text-center py-16 theme-muted space-y-2">
                <p>Tidak ada baris kode dalam kategori "{selectedCategory}".</p>
                <button
                  onClick={() => setSelectedCategory("Semua")}
                  className="text-xs text-[#04AA6D] font-bold hover:underline"
                >
                  Reset Kategori
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
