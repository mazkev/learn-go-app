import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  BookOpen,
  Cpu,
  FileCode2,
  Moon,
  Sun,
  Database,
  Layers,
  Terminal,
  X,
  ArrowRight,
  Sparkles,
  Command,
} from "lucide-react";
import { ROADMAP_MODULES } from "../../data/curriculum";
import { JAVA_MODULES } from "../../data/javaCurriculum";
import { PYTHON_MODULES } from "../../data/pythonCurriculum";
import { JS_MODULES } from "../../data/jsCurriculum";
import { PHP_MODULES } from "../../data/phpCurriculum";
import { CHEATSHEET_CATEGORIES } from "../../data/curriculum";

export default function CommandPaletteModal({
  isOpen,
  onClose,
  activeLanguage,
  onSelectLanguage,
  onSelectLesson,
  setActiveTab,
  darkMode,
  setDarkMode,
  onOpenSync,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build searchable items index
  const allItems = React.useMemo(() => {
    const items = [];

    // 1. Quick Actions
    items.push(
      {
        id: "action-lang-go",
        type: "action",
        category: "⚡ Aksi Cepat",
        title: "Ganti Bahasa ke Go (Golang)",
        subtitle: "Aktifkan kurikulum dan runtime Golang",
        icon: "🐹",
        badge: "Bahasa",
        action: () => {
          onSelectLanguage("go");
          setActiveTab("tutorial");
          onClose();
        },
      },
      {
        id: "action-lang-java",
        type: "action",
        category: "⚡ Aksi Cepat",
        title: "Ganti Bahasa ke Java (OOP & Spring)",
        subtitle: "Aktifkan kurikulum dan runtime Java",
        icon: "☕",
        badge: "Bahasa",
        action: () => {
          onSelectLanguage("java");
          setActiveTab("tutorial");
          onClose();
        },
      },
      {
        id: "action-lang-python",
        type: "action",
        category: "⚡ Aksi Cepat",
        title: "Ganti Bahasa ke Python 3",
        subtitle: "Aktifkan kurikulum dan runtime Python",
        icon: "🐍",
        badge: "Bahasa",
        action: () => {
          onSelectLanguage("python");
          setActiveTab("tutorial");
          onClose();
        },
      },
      {
        id: "action-lang-javascript",
        type: "action",
        category: "⚡ Aksi Cepat",
        title: "Ganti Bahasa ke JavaScript / TypeScript",
        subtitle: "Aktifkan kurikulum dan runtime JS/TS modern",
        icon: "🟨",
        badge: "Bahasa",
        action: () => {
          onSelectLanguage("javascript");
          setActiveTab("tutorial");
          onClose();
        },
      },
      {
        id: "action-lang-php",
        type: "action",
        category: "⚡ Aksi Cepat",
        title: "Ganti Bahasa ke PHP 8 & Laravel",
        subtitle: "Aktifkan kurikulum dan runtime PHP 8 & Laravel 11",
        icon: "🐘",
        badge: "Bahasa",
        action: () => {
          onSelectLanguage("php");
          setActiveTab("tutorial");
          onClose();
        },
      },
      {
        id: "action-toggle-theme",
        type: "action",
        category: "⚡ Aksi Cepat",
        title: darkMode ? "Beralih ke Light Mode" : "Beralih ke Dark Mode",
        subtitle: "Mengubah tema visual platform M3.learn",
        icon: darkMode ? "☀️" : "🌙",
        badge: "Tema",
        action: () => {
          setDarkMode(!darkMode);
          onClose();
        },
      },
      {
        id: "action-open-sync",
        type: "action",
        category: "⚡ Aksi Cepat",
        title: "Backup & Sinkronisasi Progress",
        subtitle: "Ekspor atau impor data belajar ke JSON file",
        icon: "💾",
        badge: "Data",
        action: () => {
          onClose();
          onOpenSync?.();
        },
      }
    );

    // 2. Interactive Labs Hub
    const labs = [
      { id: "visual_builder", title: "🧩 Visual Code Builder (LEGO Mode)", desc: "Rakit kode Go secara visual" },
      { id: "clean_arch", title: "🏛️ Clean Architecture Workbench", desc: "Eksplorasi 4 layer arsitektur standar industri" },
      { id: "api_tester", title: "⚡ Interactive API Client Tester", desc: "Simulasi HTTP REST Request & Response" },
      { id: "concurrency", title: "🔀 Concurrency & Race Visualizer", desc: "Visualisasi eksekusi Goroutine & Channel" },
      { id: "gorm_lab", title: "🗄️ GORM & SQLite Playground", desc: "Eksperimen query database ORM interaktif" },
      { id: "grpc_compare", title: "🔄 gRPC vs REST Benchmark Lab", desc: "Perbandingan performa Protobuf vs JSON" },
      { id: "unit_test", title: "🧪 Table-Driven Unit Test Lab", desc: "Uji logika kode dengan automated assertion test cases" },
      { id: "interview_prep", title: "💼 Tech Interview & Quiz Arena", desc: "25+ Bank soal interview teknis & kuis interaktif" },
    ];

    labs.forEach((lab) => {
      items.push({
        id: `lab-${lab.id}`,
        type: "lab",
        category: "🎮 Interactive Labs",
        title: lab.title,
        subtitle: lab.desc,
        icon: "🧪",
        badge: "Lab",
        action: () => {
          setActiveTab("labs");
          onClose();
        },
      });
    });

    // 3. Cheatsheet Categories
    CHEATSHEET_CATEGORIES.forEach((cat, idx) => {
      items.push({
        id: `cheatsheet-${idx}`,
        type: "cheatsheet",
        category: "📋 Cheatsheet & Snippets",
        title: `Cheatsheet: ${cat.title}`,
        subtitle: `${cat.snippets.length} snippet kode siap pakai (If/Else, Loops, Concurrency, dll)`,
        icon: "📋",
        badge: "Cheatsheet",
        action: () => {
          setActiveTab("cheatsheet");
          onClose();
        },
      });
    });

    // 4. Go Lessons
    ROADMAP_MODULES.forEach((mod) => {
      mod.lessons.forEach((l) => {
        items.push({
          id: `lesson-go-${l.id}`,
          type: "lesson",
          lang: "go",
          category: `🐹 Go: ${mod.title}`,
          title: l.title,
          subtitle: l.summary,
          icon: "🐹",
          badge: "Go Lesson",
          action: () => {
            onSelectLanguage("go");
            setActiveTab("tutorial");
            onSelectLesson(l.id);
            onClose();
          },
        });
      });
    });

    // 5. Java Lessons
    JAVA_MODULES.forEach((mod) => {
      mod.lessons.forEach((l) => {
        items.push({
          id: `lesson-java-${l.id}`,
          type: "lesson",
          lang: "java",
          category: `☕ Java: ${mod.title}`,
          title: l.title,
          subtitle: l.summary,
          icon: "☕",
          badge: "Java Lesson",
          action: () => {
            onSelectLanguage("java");
            setActiveTab("tutorial");
            onSelectLesson(l.id);
            onClose();
          },
        });
      });
    });

    // 6. Python Lessons
    PYTHON_MODULES.forEach((mod) => {
      mod.lessons.forEach((l) => {
        items.push({
          id: `lesson-python-${l.id}`,
          type: "lesson",
          lang: "python",
          category: `🐍 Python: ${mod.title}`,
          title: l.title,
          subtitle: l.summary,
          icon: "🐍",
          badge: "Python Lesson",
          action: () => {
            onSelectLanguage("python");
            setActiveTab("tutorial");
            onSelectLesson(l.id);
            onClose();
          },
        });
      });
    });

    // 7. JavaScript / TypeScript Lessons
    JS_MODULES.forEach((mod) => {
      mod.lessons.forEach((l) => {
        items.push({
          id: `lesson-js-${l.id}`,
          type: "lesson",
          lang: "javascript",
          category: `🟨 JS/TS: ${mod.title}`,
          title: l.title,
          subtitle: l.summary,
          icon: "🟨",
          badge: "JS/TS Lesson",
          action: () => {
            onSelectLanguage("javascript");
            setActiveTab("tutorial");
            onSelectLesson(l.id);
            onClose();
          },
        });
      });
    });

    // 8. PHP 8 & Laravel Lessons
    PHP_MODULES.forEach((mod) => {
      mod.lessons.forEach((l) => {
        items.push({
          id: `lesson-php-${l.id}`,
          type: "lesson",
          lang: "php",
          category: `🐘 PHP: ${mod.title}`,
          title: l.title,
          subtitle: l.summary,
          icon: "🐘",
          badge: "PHP Lesson",
          action: () => {
            onSelectLanguage("php");
            setActiveTab("tutorial");
            onSelectLesson(l.id);
            onClose();
          },
        });
      });
    });

    return items;
  }, [darkMode, onSelectLanguage, onSelectLesson, setActiveTab, setDarkMode, onOpenSync, onClose]);

  // Filter items based on query
  const filteredItems = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default: show quick actions and top lessons
      return allItems.slice(0, 15);
    }
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
    );
  }, [query, allItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/40 dark:bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl theme-card rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh] animate-scaleUp border border-slate-300 dark:border-white/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-3 theme-card-subtle">
          <Search size={20} className="text-[#04AA6D] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Cari materi pelajaran, simulator lab, cheatsheet, atau aksi... (Ketik apa saja)"
            className="flex-1 bg-transparent text-sm md:text-base theme-heading focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-white/10 rounded border border-slate-300 dark:border-white/15 shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-white/[0.04]">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 space-y-2">
              <Sparkles size={32} className="mx-auto text-amber-400/80 animate-pulse" />
              <p className="text-sm font-semibold theme-heading">Tidak ada hasil yang cocok dengan "{query}"</p>
              <p className="text-xs theme-muted">Coba kata kunci lain seperti "Go", "Java", "Python", "if", "loop", "api", atau "test".</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  data-index={idx}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-100 dark:bg-white/10 text-[#04AA6D] shadow-2xs ring-1 ring-[#04AA6D]/30"
                      : "hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="text-xl shrink-0 p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200/60 dark:border-white/5">
                      {item.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold theme-heading truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 shrink-0 font-semibold border border-slate-300/60 dark:border-white/10">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs theme-muted truncate mt-0.5">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">[{item.category}]</span> {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 text-slate-400 dark:text-slate-500">
                    {isSelected && (
                      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold bg-[#04AA6D] text-white rounded shadow-xs animate-fadeIn">
                        Buka ↵
                      </kbd>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200 dark:border-white/10 theme-card-subtle flex items-center justify-between text-[11px] font-mono theme-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400">↓</kbd> Navigasi
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400">↵</kbd> Pilih
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400">ESC</kbd> Tutup
            </span>
          </div>
          <span className="hidden sm:inline text-[#04AA6D] font-bold">
            M3.learn Command Hub
          </span>
        </div>
      </div>
    </div>
  );
}
