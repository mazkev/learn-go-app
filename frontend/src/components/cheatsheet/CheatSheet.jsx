import React, { useState, useMemo, useCallback } from "react";
import {
  BookOpen,
  Search,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Sparkles,
  Layers
} from "lucide-react";
import { CHEATSHEET_CATEGORIES } from "../../data/curriculum";

export default function CheatSheet({ onLoadSnippetToStudio }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = useCallback((text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return CHEATSHEET_CATEGORIES.map((cat, idx) => {
      // Category filter check
      if (selectedCategory !== "all" && String(idx) !== selectedCategory) {
        return null;
      }

      if (!q) return cat;

      const filteredSnippets = cat.snippets.filter(
        (s) =>
          s.label.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q)
      );
      return { ...cat, snippets: filteredSnippets };
    }).filter((cat) => cat && cat.snippets.length > 0);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 pb-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-bold text-xs uppercase tracking-wider mb-1.5 font-mono">
            <BookOpen size={14} />
            <span>Referensi Cepat & Algoritma</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black theme-heading tracking-tight">
            Golang <span className="gopher-gradient-text">Cheat Sheet & Snippets</span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1">
            Kumpulan sintaks esensial, algoritma dasar, dan pola idiomatis Go siap pakai untuk kebutuhan kerja dan wawancara coding.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 theme-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari algoritma, pointer, channel..."
            className="w-full theme-card rounded-xl pl-10 pr-4 py-2 text-xs theme-heading focus:outline-none focus:border-[#04AA6D] transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono shrink-0 transition-all cursor-pointer border ${
            selectedCategory === "all"
              ? "bg-[#04AA6D] text-white border-transparent shadow-xs scale-102"
              : "theme-card theme-muted hover:theme-heading border-slate-200 dark:border-white/10"
          }`}
        >
          Semua Kategori ({CHEATSHEET_CATEGORIES.length})
        </button>
        {CHEATSHEET_CATEGORIES.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(String(idx))}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono shrink-0 transition-all cursor-pointer border ${
              selectedCategory === String(idx)
                ? "bg-[#04AA6D] text-white border-transparent shadow-xs scale-102"
                : "theme-card theme-muted hover:theme-heading border-slate-200 dark:border-white/10"
            }`}
          >
            {cat.title.split(". ")[1] || cat.title}
          </button>
        ))}
      </div>

      {/* Snippet Grid */}
      <div className="space-y-8">
        {filteredCategories.map((category, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h2 className="text-base md:text-lg font-black theme-heading flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#04AA6D] shadow-xs" />
              <span>{category.title}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.snippets.map((snippet, snipIdx) => {
                const uniqueKey = `${catIdx}-${snipIdx}`;
                const isCopied = copiedIndex === uniqueKey;

                return (
                  <div
                    key={snipIdx}
                    className="theme-card rounded-2xl p-5 flex flex-col justify-between space-y-3.5 shadow-xs hover:shadow-md transition-all hover:border-[#04AA6D]/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#04AA6D] font-mono tracking-tight flex items-center gap-1.5">
                        <Code2 size={13} />
                        <span>{snippet.label}</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(snippet.code, uniqueKey)}
                          className="p-2 rounded-lg theme-card-subtle theme-muted hover:theme-heading transition-colors cursor-pointer"
                          title="Copy Code"
                        >
                          {isCopied ? (
                            <Check size={14} className="text-emerald-500" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>

                        <button
                          onClick={() =>
                            onLoadSnippetToStudio(`package main\n\nimport (\n    "fmt"\n    "strings"\n    "sort"\n    "time"\n    "sync"\n)\n\nfunc main() {\n    fmt.Println("=== Snippet: ${snippet.label} ===")\n    \n    // Kode Snippet:\n    ${snippet.code.replace(/\n/g, "\n    ")}\n}`)
                          }
                          className="p-2 rounded-lg theme-card-subtle hover:bg-[#04AA6D] hover:text-white theme-muted transition-colors cursor-pointer"
                          title="Buka dan Jalankan di Tryit Editor"
                        >
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>

                    <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl border border-slate-800 dark:border-white/10 font-mono text-xs overflow-x-auto whitespace-pre-wrap shadow-inner leading-relaxed">
                      {snippet.code}
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 theme-muted space-y-2">
            <p>Tidak ditemukan snippet yang cocok dengan pencarian "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs text-[#04AA6D] hover:underline font-bold cursor-pointer"
            >
              Reset filter pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
