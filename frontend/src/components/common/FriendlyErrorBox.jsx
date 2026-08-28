import React, { useState } from "react";
import {
  AlertTriangle,
  Lightbulb,
  Wrench,
  ChevronDown,
  ChevronUp,
  Terminal,
  Stethoscope,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { explainPolyglotError } from "../../services/errorExplainer";

export default function FriendlyErrorBox({ rawError, codeContext = "", language = "go" }) {
  const [showRawLog, setShowRawLog] = useState(false);
  const diagnosis = explainPolyglotError(rawError, codeContext, language);

  if (!rawError || !diagnosis) return null;

  return (
    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/20 p-4 space-y-3.5 text-xs animate-in fade-in duration-200">
      {/* Header Diagnosa */}
      <div className="flex items-start justify-between gap-3 border-b border-rose-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center shrink-0">
            <Stethoscope size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500 font-mono">
                AI Smart Code Doctor ({String(language).toUpperCase()})
              </span>
            </div>
            <h4 className="text-sm font-black text-rose-600 dark:text-rose-400">
              {diagnosis.title}
            </h4>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 font-bold shrink-0">
          Evaluasi Gagal
        </span>
      </div>

      {/* Penjelasan Masalah */}
      <div className="space-y-1.5 bg-white/60 dark:bg-black/30 p-3 rounded-xl border border-rose-500/15">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
          <Lightbulb size={14} className="text-amber-500 shrink-0" />
          <span>Apa Masalahnya?</span>
        </div>
        <p className="theme-muted leading-relaxed pl-5">
          {diagnosis.explanation}
        </p>
      </div>

      {/* Solusi Perbaikan */}
      <div className="space-y-1.5 bg-emerald-500/10 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/25">
        <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
          <Wrench size={14} className="text-emerald-500 shrink-0" />
          <span>Petunjuk Solusi:</span>
        </div>
        <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed pl-5 font-mono text-[11px]">
          {diagnosis.solution}
        </p>
      </div>

      {/* Collapsible Raw Compiler Error Log */}
      <div className="pt-1">
        <button
          onClick={() => setShowRawLog((prev) => !prev)}
          className="flex items-center justify-between w-full py-1.5 px-3 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 theme-muted transition-colors cursor-pointer font-mono text-[11px]"
        >
          <span className="flex items-center gap-1.5">
            <Terminal size={12} />
            <span>{showRawLog ? "Sembunyikan" : "Lihat"} Pesan Asli Compiler</span>
          </span>
          {showRawLog ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showRawLog && (
          <pre className="mt-2 p-3 rounded-xl bg-slate-950 text-rose-400 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap border border-rose-500/30 leading-relaxed shadow-inner">
            {rawError}
          </pre>
        )}
      </div>
    </div>
  );
}
