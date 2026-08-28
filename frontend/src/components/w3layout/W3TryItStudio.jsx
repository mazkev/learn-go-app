import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, ArrowLeft, Terminal, Check, Moon, Sun, Sparkles, Code } from "lucide-react";
import { executeMultiCode } from "../../services/languageManager";
import FriendlyErrorBox from "../common/FriendlyErrorBox";
import CodeAnatomyModal from "../common/CodeAnatomyModal";

export default function W3TryItStudio({
  initialCode,
  lessonTitle,
  onBackToTutorial,
  theme = "dark",
  onToggleTheme,
  language = "go"
}) {
  const editorRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mobileTab, setMobileTab] = useState("editor"); // "editor" | "output"
  const [output, setOutput] = useState({
    text: "Klik tombol hijau 'Run ❯' untuk melihat output kompilasi.",
    isError: false,
    executionTime: null,
    source: null,
  });

  const [toastMessage, setToastMessage] = useState(null);
  const [isAnatomyOpen, setIsAnatomyOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleRun = async () => {
    const codeToRun = editorRef.current ? editorRef.current.getValue() : (initialCode || "");
    setIsRunning(true);
    // Auto-switch to output tab on mobile
    setMobileTab("output");
    setOutput({
      text: "⚡ Mengompilasi kode...",
      isError: false,
      executionTime: null,
      source: null,
    });

    try {
      const result = await executeMultiCode(codeToRun, language);
      setOutput({
        text: result.output,
        isError: result.isError,
        executionTime: result.executionTime,
        source: result.source,
      });
    } catch (e) {
      setOutput({
        text: `Error: ${e.message}`,
        isError: true,
        executionTime: null,
        source: "Local Error",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.setValue(initialCode || "");
    }
    setOutput({
      text: "Kode di-reset. Klik 'Run ❯' untuk menguji.",
      isError: false,
      executionTime: null,
      source: null,
    });
    showToast("✓ Kode berhasil di-reset");
  };

  const monacoTheme = theme === "light" ? "light" : "vs-dark";

  return (
    <div className="h-[calc(100vh-57px)] flex flex-col theme-card overflow-hidden relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-[#04AA6D] text-white px-4 py-2 rounded-lg shadow-xl font-bold text-xs flex items-center gap-2">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Tryit Header Toolbar */}
      <div className="theme-navbar px-3 md:px-4 py-2.5 flex items-center justify-between gap-2 md:gap-3 shrink-0 border-b border-slate-200 dark:border-white/10 flex-wrap">
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onBackToTutorial}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg theme-card-subtle text-xs font-bold theme-heading hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">« Back to Tutorial</span>
            <span className="sm:hidden">« Kembali</span>
          </button>

          <span className="h-4 w-px bg-slate-300 dark:bg-white/10 hidden md:block" />

          <div className="hidden md:flex items-center gap-2">
            <span className="font-mono font-black text-xs text-[#04AA6D]">M3.learn Tryit Editor</span>
            <span className="text-xs theme-muted truncate max-w-xs">• {lessonTitle}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Bedah Kode Button */}
          <button
            onClick={() => setIsAnatomyOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-[#04AA6D] border border-[#04AA6D]/30 text-xs font-bold transition-all cursor-pointer shadow-xs"
            title="Bedah fungsi dan alur kode baris per baris"
          >
            <Sparkles size={13} />
            <span className="hidden sm:inline">🔬 Bedah Kode</span>
            <span className="sm:hidden">🔬 Bedah</span>
          </button>

          <button
            onClick={handleReset}
            title="Reset Kode"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg theme-card-subtle text-xs font-bold theme-muted hover:theme-heading transition-colors cursor-pointer"
          >
            <RotateCcw size={13} /> Reset
          </button>

          {/* Iconic W3 Green Run Button */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="w3-btn-green px-4 md:px-5 py-1.5 rounded-lg text-xs md:text-sm font-black flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
          >
            <Play size={14} className={isRunning ? "animate-spin" : "fill-white"} />
            <span>{isRunning ? "Running..." : "Run ❯"}</span>
          </button>
        </div>
      </div>

      {/* Mobile View Switcher Tabs (Phone Viewports) */}
      <div className="md:hidden flex items-center p-1 bg-slate-100 dark:bg-black/40 border-b border-slate-200 dark:border-white/10 shrink-0">
        <button
          onClick={() => setMobileTab("editor")}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileTab === "editor"
              ? "bg-white dark:bg-[#1e293b] text-[#04AA6D] shadow-xs"
              : "theme-muted hover:theme-heading"
          }`}
        >
          <Code size={14} />
          <span>Kode Editor</span>
        </button>
        <button
          onClick={() => setMobileTab("output")}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer relative ${
            mobileTab === "output"
              ? "bg-white dark:bg-[#1e293b] text-[#04AA6D] shadow-xs"
              : "theme-muted hover:theme-heading"
          }`}
        >
          <Terminal size={14} />
          <span>Output Terminal</span>
          {output.executionTime && (
            <span className="w-2 h-2 rounded-full bg-[#04AA6D] animate-ping" />
          )}
        </button>
      </div>

      {/* Split Screen / Mobile Single View */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10 min-h-0 overflow-hidden">
        {/* Left: Monaco Editor */}
        <div className={`flex flex-col min-h-0 bg-white dark:bg-[#070d19] ${mobileTab === "editor" ? "flex-1" : "hidden md:flex"}`}>
          <div className="px-4 py-1.5 bg-slate-100 dark:bg-[#0b1120] border-b border-slate-200 dark:border-white/10 text-xs font-mono font-bold theme-muted flex items-center justify-between shrink-0">
            <span>Source: {language === "java" ? "Main.java" : language === "python" ? "main.py" : language === "javascript" ? "main.js" : language === "php" ? "main.php" : "main.go"}</span>
            <span className="text-[11px] text-[#04AA6D]">{
              language === "java"
                ? "Java OpenJDK 15+"
                : language === "python"
                ? "Python 3.12+"
                : language === "javascript"
                ? "Node.js / V8 Engine"
                : language === "php"
                ? "PHP 8.2+ Engine"
                : "Golang v1.22+"
            }</span>
          </div>

          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage={language}
              language={language}
              theme={monacoTheme}
              defaultValue={initialCode || ""}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 13,
                fontFamily: "'Fira Code', Consolas, 'Courier New', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                formatOnPaste: false,
                formatOnType: false,
                autoClosingBrackets: "languageDefined",
                autoClosingQuotes: "languageDefined",
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnCommitCharacter: false,
                tabCompletion: "on",
                disableMonospaceOptimizations: true,
                renderWhitespace: "none",
                unicodeHighlight: { ambiguousCharacters: false, invisibleCharacters: false },
                padding: { top: 12, bottom: 12 },
              }}
            />
          </div>
        </div>

        {/* Right: Result Pane */}
        <div className={`flex flex-col min-h-0 bg-white dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 ${mobileTab === "output" ? "flex-1" : "hidden md:flex"}`}>
          <div className="px-4 py-1.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 text-xs font-mono font-bold theme-muted flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-[#04AA6D]" />
              <span className="theme-heading">Result Output:</span>
            </div>
            {output.executionTime && (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">⏱ {output.executionTime}</span>
            )}
          </div>

          <div className="p-4 flex-1 overflow-y-auto font-mono text-xs shadow-inner">
            {output.isError ? (
              <FriendlyErrorBox rawError={output.text} />
            ) : (
              <pre className="whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-emerald-400">
                {output.text}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Code Anatomy Modal */}
      <CodeAnatomyModal
        isOpen={isAnatomyOpen}
        onClose={() => setIsAnatomyOpen(false)}
        code={editorRef.current ? editorRef.current.getValue() : (initialCode || "")}
        title={lessonTitle || "W3 Tryit Code"}
      />
    </div>
  );
}
