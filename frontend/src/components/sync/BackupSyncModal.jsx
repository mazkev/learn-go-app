import React, { useState } from "react";
import {
  X,
  Download,
  Upload,
  Copy,
  Check,
  RotateCcw,
  ShieldAlert,
  FileJson,
  Database,
  Sparkles,
  CheckCircle2,
  FolderSync
} from "lucide-react";

export default function BackupSyncModal({
  isOpen,
  onClose,
  progress,
  onImportProgress,
  onResetProgress
}) {
  const [activeTab, setActiveTab] = useState("file"); // 'file' | 'json' | 'reset'
  const [pastedJson, setPastedJson] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isResetConfirming, setIsResetConfirming] = useState(false);

  if (!isOpen) return null;

  const showToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const currentPayload = {
    appName: "W3.GoLearn",
    version: "1.22",
    exportedAt: new Date().toISOString(),
    progress: progress,
  };

  const handleDownloadBackup = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(currentPayload, null, 2));
    const downloadAnchor = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `golearn_backup_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("✓ File backup berhasil diunduh!");
  };

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const progressData = parsed.progress || parsed;
        const success = onImportProgress(progressData);
        if (success) {
          showToast("✓ Progres belajar berhasil dipulihkan dari file!");
        } else {
          showToast("Format file backup tidak valid.", true);
        }
      } catch (err) {
        showToast("Gagal membaca file JSON: " + err.message, true);
      }
    };
    fileReader.readAsText(file);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(currentPayload, null, 2));
    setCopySuccess(true);
    showToast("✓ Teks JSON disalin ke clipboard!");
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleApplyPastedJson = () => {
    try {
      const parsed = JSON.parse(pastedJson);
      const progressData = parsed.progress || parsed;
      const success = onImportProgress(progressData);
      if (success) {
        showToast("✓ Progres belajar berhasil diperbarui!");
        setPastedJson("");
      } else {
        showToast("Data JSON tidak sesuai struktur progres GoLearn.", true);
      }
    } catch (err) {
      showToast("JSON Syntax Error: " + err.message, true);
    }
  };

  const handleConfirmReset = () => {
    onResetProgress();
    setIsResetConfirming(false);
    showToast("Data progres telah di-reset ke awal.");
    onClose();
  };

  const completedLessonsCount = progress.completedLessons?.length || 0;
  const completedQuizzesCount = Object.keys(progress.completedQuizzes || {}).length;
  const savedCodesCount = Object.keys(progress.userCodes || {}).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl theme-card rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-[#070d19]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#04AA6D]/15 flex items-center justify-center text-[#04AA6D]">
              <FolderSync size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold theme-heading">
                Backup & Sync Progres Belajar
              </h2>
              <p className="text-[11px] theme-muted">
                Simpan atau pindahkan data belajar Anda ke laptop / perangkat lain
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg theme-card-subtle theme-muted hover:theme-heading cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Quick Statistics Banner */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl theme-inset text-center space-y-0.5">
              <span className="text-[10px] theme-muted font-bold uppercase tracking-wider">
                Total XP
              </span>
              <div className="text-base font-black text-amber-500 font-mono">
                ⚡ {progress.totalXP || 0}
              </div>
            </div>
            <div className="p-3 rounded-xl theme-inset text-center space-y-0.5">
              <span className="text-[10px] theme-muted font-bold uppercase tracking-wider">
                Materi Selesai
              </span>
              <div className="text-base font-black text-[#04AA6D] font-mono">
                {completedLessonsCount} / 32
              </div>
            </div>
            <div className="p-3 rounded-xl theme-inset text-center space-y-0.5">
              <span className="text-[10px] theme-muted font-bold uppercase tracking-wider">
                Kuis Lulus
              </span>
              <div className="text-base font-black text-purple-600 dark:text-purple-400 font-mono">
                {completedQuizzesCount} Kuis
              </div>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 theme-card-subtle p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("file")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "file"
                  ? "bg-[#04AA6D] text-white shadow-sm"
                  : "theme-muted hover:theme-heading"
              }`}
            >
              File Backup (.json)
            </button>
            <button
              onClick={() => setActiveTab("json")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "json"
                  ? "bg-[#04AA6D] text-white shadow-sm"
                  : "theme-muted hover:theme-heading"
              }`}
            >
              Manual Copy / Paste
            </button>
            <button
              onClick={() => setActiveTab("reset")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "reset"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "theme-muted hover:text-rose-500"
              }`}
            >
              Reset Data
            </button>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150 ${
                toastMessage.isError
                  ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                  : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
              }`}
            >
              <CheckCircle2 size={14} className="shrink-0" />
              <span>{toastMessage.text}</span>
            </div>
          )}

          {/* Tab 1: File Backup */}
          {activeTab === "file" && (
            <div className="space-y-4">
              {/* Export Box */}
              <div className="p-4 rounded-xl theme-card-subtle border border-slate-200 dark:border-white/10 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold theme-heading flex items-center gap-1.5">
                    <Download size={14} className="text-[#04AA6D]" /> Ekspor & Unduh File Backup
                  </h4>
                  <p className="text-[11px] theme-muted">
                    Simpan salinan data XP, materi selesai, dan kode latihan ke file <code>.json</code>.
                  </p>
                </div>
                <button
                  onClick={handleDownloadBackup}
                  className="w3-btn-green px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
                >
                  <Download size={13} />
                  <span>Unduh .json</span>
                </button>
              </div>

              {/* Import Box */}
              <div className="p-4 rounded-xl theme-card-subtle border border-slate-200 dark:border-white/10 space-y-2.5">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold theme-heading flex items-center gap-1.5">
                    <Upload size={14} className="text-sky-500" /> Impor / Pulihkan File Backup
                  </h4>
                  <p className="text-[11px] theme-muted">
                    Pilih file <code>golearn_backup.json</code> untuk memulihkan seluruh progres Anda.
                  </p>
                </div>

                <label className="border-2 border-dashed border-slate-300 dark:border-white/15 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 hover:border-[#04AA6D] transition-colors cursor-pointer text-center bg-black/[0.01] dark:bg-white/[0.01]">
                  <Upload size={20} className="theme-muted" />
                  <span className="text-xs font-bold theme-heading">
                    Klik untuk memilih file .json
                  </span>
                  <span className="text-[10px] theme-muted">
                    Format: golearn_backup_*.json
                  </span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Tab 2: Manual JSON */}
          {activeTab === "json" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold theme-heading">Data JSON Saat Ini:</span>
                <button
                  onClick={handleCopyJson}
                  className="px-3 py-1.5 rounded-lg theme-card-subtle text-xs font-bold theme-heading hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 cursor-pointer"
                >
                  {copySuccess ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  <span>{copySuccess ? "Tersalin!" : "Salin JSON"}</span>
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-xs theme-muted font-bold">
                  Tempel / Paste JSON untuk Memulihkan Data:
                </span>
                <textarea
                  value={pastedJson}
                  onChange={(e) => setPastedJson(e.target.value)}
                  placeholder='Tempel data JSON di sini (contoh: { "completedLessons": ["1-1", "1-2"], ... })'
                  rows={4}
                  className="w-full bg-slate-100 dark:bg-[#070d19] text-slate-800 dark:text-emerald-400 border border-slate-200 dark:border-white/10 rounded-xl p-3 font-mono text-xs focus:outline-none focus:border-[#04AA6D] shadow-inner"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleApplyPastedJson}
                  disabled={!pastedJson.trim()}
                  className="w3-btn-green px-4 py-2 rounded-lg text-xs font-bold cursor-pointer disabled:opacity-40"
                >
                  Terapkan Data JSON »
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Reset Data */}
          {activeTab === "reset" && (
            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-4">
              <div className="flex items-start gap-3">
                <ShieldAlert size={22} className="text-rose-500 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <strong className="text-rose-600 dark:text-rose-400 font-extrabold text-sm block">
                    Zona Bahaya: Reset Seluruh Progres
                  </strong>
                  <p className="theme-muted leading-relaxed">
                    Tindakan ini akan menghapus seluruh akumulasi XP, status centang materi selesai, dan kode yang Anda simpan di browser.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                {!isResetConfirming ? (
                  <button
                    onClick={() => setIsResetConfirming(true)}
                    className="px-4 py-2 rounded-lg bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors shadow-sm cursor-pointer"
                  >
                    Reset Semua Data
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsResetConfirming(false)}
                      className="px-3 py-1.5 rounded-lg theme-card-subtle text-xs font-bold theme-heading cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleConfirmReset}
                      className="px-4 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shadow-md cursor-pointer animate-pulse"
                    >
                      Ya, Hapus Semua Sekarang!
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-[#070d19]/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg theme-card-subtle text-xs font-bold theme-heading cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
