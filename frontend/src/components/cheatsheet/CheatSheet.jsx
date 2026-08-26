import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Copy,
  Check,
  ExternalLink
} from "lucide-react";
import { CHEATSHEET_CATEGORIES } from "../../data/curriculum";

export default function CheatSheet({ onLoadSnippetToStudio }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredCategories = CHEATSHEET_CATEGORIES.map((cat) => {
    const filteredSnippets = cat.snippets.filter(
      (s) =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, snippets: filteredSnippets };
  }).filter((cat) => cat.snippets.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-bold text-xs uppercase tracking-wider mb-1.5">
            <BookOpen size={14} />
            <span>Referensi Cepat</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black theme-heading tracking-tight">
            Golang <span className="gopher-gradient-text">Cheat Sheet & Snippets</span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1">
            Kumpulan sintaks esensial dan pola idiomatis Go yang sering digunakan dalam pengembangan software.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 theme-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari sintaks, pointer, channel..."
            className="w-full theme-card rounded-xl pl-10 pr-4 py-2 text-xs theme-heading focus:outline-none focus:border-[#04AA6D] transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Snippet Grid */}
      <div className="space-y-8">
        {filteredCategories.map((category, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h2 className="text-base md:text-lg font-black theme-heading flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#04AA6D] shadow-sm" />
              <span>{category.title}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.snippets.map((snippet, snipIdx) => {
                const uniqueKey = `${catIdx}-${snipIdx}`;
                const isCopied = copiedIndex === uniqueKey;

                return (
                  <div
                    key={snipIdx}
                    className="theme-card rounded-2xl p-5 flex flex-col justify-between space-y-3.5 shadow-sm hover:shadow-md transition-all hover:border-[#04AA6D]/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#04AA6D] font-mono tracking-tight">
                        {snippet.label}
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
                            onLoadSnippetToStudio(`package main\n\nimport (\n    "fmt"\n    "time"\n    "sync"\n)\n\nfunc main() {\n    // Snippet: ${snippet.label}\n    ${snippet.code.replace(/\n/g, "\n    ")}\n}`)
                          }
                          className="p-2 rounded-lg theme-card-subtle hover:bg-[#04AA6D] hover:text-white theme-muted transition-colors cursor-pointer"
                          title="Buka di Tryit Editor"
                        >
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>

                    <pre className="bg-slate-100 dark:bg-[#070d19] text-slate-800 dark:text-emerald-400 p-4 rounded-xl border border-slate-200 dark:border-white/10 font-mono text-xs overflow-x-auto whitespace-pre-wrap shadow-inner leading-relaxed">
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
              onClick={() => setSearchQuery("")}
              className="text-xs text-[#04AA6D] hover:underline font-bold"
            >
              Reset pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
