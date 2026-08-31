import React, { useState, useMemo } from "react";
import {
  Zap,
  Cpu,
  Brain,
  Layers,
  Database,
  Award,
  Sparkles,
  TrendingUp,
  Activity,
  Code2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Flame,
  Globe,
  Sliders,
  Scale
} from "lucide-react";
import LanguageLogo from "../common/LanguageLogo";

export const LANGUAGES_BENCHMARK = [
  {
    id: "go",
    name: "Go (Golang)",
    icon: "🐹",
    color: "#00ADD8",
    tagline: "Cloud Native, Concurrency & Microservices Master",
    runtimeType: "Compiled directly to Native Machine Binary",
    ratings: {
      speed: 9.8,
      easeOfLearning: 8.8,
      concurrency: 10.0,
      memoryEfficiency: 9.7,
      ecosystemJobs: 9.0,
      startupTime: 9.9,
    },
    pros: [
      "Kompilasi super cepat langsung ke single binary mandiri tanpa dependensi runtime.",
      "Goroutine sangat ringan (~2 KB memory) mampu menangani jutaan konkurensi.",
      "Sintaks sangat sederhana, konsisten, dan mudah dipelihara di tim besar.",
      "Standar de facto industri untuk Docker, Kubernetes, Terraform, dan Cloud Tools.",
    ],
    cons: [
      "Tidak memiliki inheritance OOP klasik (menggunakan komposisi struct & interface).",
      "Handling error eksplisit (`if err != nil`) membutuhkan penulisan berulang.",
    ],
    useCases: [
      "Cloud-Native Microservices ber-throughput tinggi",
      "Kubernetes & Docker tooling",
      "High-performance REST / gRPC Backend APIs",
      "Network proxy, distributed systems, & CLI tools",
    ],
    sampleCode: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "⚡ Hello from Go Microservice!")
    })
    http.ListenAndServe(":8080", nil)
}`,
  },
  {
    id: "java",
    name: "Java (JVM)",
    icon: "☕",
    color: "#f89820",
    tagline: "Enterprise Grade, Spring Boot & Robust Architecture",
    runtimeType: "Bytecode executed on JVM (Java Virtual Machine) with JIT compiler",
    ratings: {
      speed: 8.9,
      easeOfLearning: 7.2,
      concurrency: 8.6,
      memoryEfficiency: 6.2,
      ecosystemJobs: 9.8,
      startupTime: 6.0,
    },
    pros: [
      "Ekosistem enterprise terbesar di dunia dengan Spring Boot & Hibernate.",
      "Sangat stabil, backwards-compatible, dan teruji di bank & sistem transaksi global.",
      "JVM JIT compiler mengoptimalkan performa hotspot kode saat runtime.",
      "Virtual Threads (Project Loom) di Java 21+ membuat konkurensi jauh lebih ringan.",
    ],
    cons: [
      "Konsumsi RAM baseline cukup tinggi (100MB+ untuk JVM runtime).",
      "Sintaks relatif lebih panjang (*boilerplate*) dibandingkan bahasa modern lainnya.",
    ],
    useCases: [
      "Core Banking & Financial Transaction Systems",
      "Large-scale Enterprise Distributed Backend",
      "Big Data Processing (Apache Kafka, Hadoop, Spark)",
      "Android Native Legacy & Enterprise ERP Software",
    ],
    sampleCode: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Main {
    @GetMapping("/")
    public String home() {
        return "☕ Hello from Spring Boot Enterprise!";
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}`,
  },
  {
    id: "python",
    name: "Python 3",
    icon: "🐍",
    color: "#3776AB",
    tagline: "AI, Machine Learning, Data Science & Fast Prototyping",
    runtimeType: "Interpreted Bytecode via CPython VM",
    ratings: {
      speed: 6.5,
      easeOfLearning: 9.9,
      concurrency: 6.8,
      memoryEfficiency: 7.2,
      ecosystemJobs: 9.7,
      startupTime: 8.5,
    },
    pros: [
      "Sintaks paling bersih, elegan, dan paling mudah dipelajari oleh pemula.",
      "Raja mutlak ekosistem AI / Machine Learning (PyTorch, TensorFlow, Pandas, Scikit-learn).",
      "Sangat cepat untuk prototyping ide bisnis (*rapid time-to-market*).",
      "Framework modern seperti FastAPI memiliki performa async yang mumpuni.",
    ],
    cons: [
      "Kecepatan eksekusi CPU-bound lebih lambat karena sifat bahasa dinamis & GIL (Global Interpreter Lock).",
      "Dynamic typing bisa menimbulkan bug tipe saat aplikasi berkembang sangat masif.",
    ],
    useCases: [
      "Artificial Intelligence & LLM Applications (OpenAI / DeepSeek / PyTorch)",
      "Data Analytics, Big Data Pandas & Business Intelligence",
      "Web Scraping, Automation Scripts, & Devops Automation",
      "FastAPI / Django REST API Services",
    ],
    sampleCode: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "🐍 Hello from Python FastAPI AI Engine!"}`,
  },
  {
    id: "javascript",
    name: "JavaScript / TypeScript",
    icon: "🟨",
    color: "#E5A00D",
    tagline: "Universal Fullstack, Web, Node.js & React Ecosystem",
    runtimeType: "JIT Compiled on Chrome V8 Engine / Node.js Runtime",
    ratings: {
      speed: 8.0,
      easeOfLearning: 8.9,
      concurrency: 8.0,
      memoryEfficiency: 7.5,
      ecosystemJobs: 9.9,
      startupTime: 9.0,
    },
    pros: [
      "Satu-satunya bahasa yang berjalan natively di browser frontend sekaligus backend server (Node.js).",
      "TypeScript menambahkan type safety modern yang sangat powerful.",
      "Non-blocking I/O event loop sangat efisien untuk aplikasi real-time I/O (Chat, streaming).",
      "NPM adalah registri paket open-source terbesar di dunia.",
    ],
    cons: [
      "Single-threaded CPU event loop (kurang cocok untuk komputasi berat tanpa Worker Threads).",
      "Ekosistem frontend berubah sangat cepat (*framework fatigue*).",
    ],
    useCases: [
      "Modern Web Applications (React, Next.js, Vue)",
      "Real-time WebSocket Chat Apps & Collaboration Tools",
      "Fullstack Web Development & Serverless Functions",
      "Mobile Cross-Platform Apps (React Native)",
    ],
    sampleCode: `import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "🟨 Hello from Node.js Express Fullstack!" });
});

app.listen(3000);`,
  },
  {
    id: "php",
    name: "PHP 8 & Laravel",
    icon: "🐘",
    color: "#8892BF",
    tagline: "Rapid Web Development, SaaS & E-Commerce Giant",
    runtimeType: "Interpreted Zend Engine with PHP 8+ JIT Compiler",
    ratings: {
      speed: 7.4,
      easeOfLearning: 9.2,
      concurrency: 6.5,
      memoryEfficiency: 7.6,
      ecosystemJobs: 8.9,
      startupTime: 8.8,
    },
    pros: [
      "Laravel 11 menyediakan framework web paling komplit dan elegan (Auth, ORM, Queue, Storage).",
      "Stateless per-request model membuat aplikasi anti-memory leak dan mudah di-deploy.",
      "Menggerakkan lebih dari 75% website di dunia (WordPress, Magento, Drupal, Custom SaaS).",
      "PHP 8+ membawa peningkatan kecepatan drastis dengan JIT & Constructor Property Promotion.",
    ],
    cons: [
      "Secara arsitektur tradisional tidak dibuat untuk long-running memory resident daemon (tanpa Swoole/RoadRunner).",
      "Stigma kode masa lalu (PHP 5) meskipun PHP 8 modern sudah sangat berbeda dan berkelas.",
    ],
    useCases: [
      "Rapid SaaS Web Product Development",
      "E-Commerce & Digital Store Platforms",
      "Content Management Systems (CMS) & Portal Berita",
      "B2B Administrative Web Panels & Backoffice Portals",
    ],
    sampleCode: `<?php

use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return response()->json([
        'message' => '🐘 Hello from PHP 8 & Laravel 11 SaaS Platform!'
    ]);
});`,
  },
];

const METRIC_DEFINITIONS = [
  { key: "speed", label: "⚡ Kecepatan Eksekusi (Raw Speed)", desc: "Seberapa cepat instruksi CPU dan komputasi dieksekusi" },
  { key: "easeOfLearning", label: "🧠 Kemudahan Belajar (Simplicity)", desc: "Kemudahan sintaks dipahami pemula & kebersihan kode" },
  { key: "concurrency", label: "🏎️ Konkurensi & Skalabilitas", desc: "Kemampuan menangani jutaan koneksi paralel secara efisien" },
  { key: "memoryEfficiency", label: "💾 Efisiensi Memori (Low RAM)", desc: "Keringanan konsumsi RAM dan binary footprint yang kecil" },
  { key: "ecosystemJobs", label: "💼 Peluang Karir & Ekosistem", desc: "Ketersediaan lowongan kerja, komunitas, dan library" },
  { key: "startupTime", label: "⏱️ Waktu Booting (Startup Time)", desc: "Kecepatan proses mulai menyala (Sangat penting untuk Serverless/Cold Start)" },
];

export default function PolyglotBenchmarkLab() {
  const [activeTab, setActiveTab] = useState("matrix"); // "matrix" | "radar" | "versus" | "advisor"
  const [selectedLangs, setSelectedLangs] = useState(["go", "java", "python", "javascript", "php"]);
  const [versusLangA, setVersusLangA] = useState("go");
  const [versusLangB, setVersusLangB] = useState("java");

  // Advisor State
  const [advisorAnswers, setAdvisorAnswers] = useState({
    projectType: "cloud", // "cloud", "ai", "enterprise", "web", "saas"
    priority: "speed", // "speed", "simplicity", "jobs"
  });

  const toggleLanguageSelect = (langId) => {
    if (selectedLangs.includes(langId)) {
      if (selectedLangs.length > 1) {
        setSelectedLangs(selectedLangs.filter((id) => id !== langId));
      }
    } else {
      setSelectedLangs([...selectedLangs, langId]);
    }
  };

  const langA = LANGUAGES_BENCHMARK.find((l) => l.id === versusLangA) || LANGUAGES_BENCHMARK[0];
  const langB = LANGUAGES_BENCHMARK.find((l) => l.id === versusLangB) || LANGUAGES_BENCHMARK[1];

  // Advisor Recommendation Calculator
  const recommendedLanguage = useMemo(() => {
    if (advisorAnswers.projectType === "ai") return LANGUAGES_BENCHMARK.find((l) => l.id === "python");
    if (advisorAnswers.projectType === "cloud") return LANGUAGES_BENCHMARK.find((l) => l.id === "go");
    if (advisorAnswers.projectType === "enterprise") return LANGUAGES_BENCHMARK.find((l) => l.id === "java");
    if (advisorAnswers.projectType === "web") return LANGUAGES_BENCHMARK.find((l) => l.id === "javascript");
    if (advisorAnswers.projectType === "saas") return LANGUAGES_BENCHMARK.find((l) => l.id === "php");
    return LANGUAGES_BENCHMARK[0];
  }, [advisorAnswers]);

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-6 py-6 space-y-6 pb-28">
      {/* 1. Header Banner */}
      <div className="bg-white dark:bg-[#162032] p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-mono font-bold text-xs uppercase tracking-wider mb-1">
            <Scale size={15} />
            <span>Architecture & Performance Lab</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            5-Language Polyglot Benchmark & Radar Matrix
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Perbandingan komparatif mendalam antara <strong>Go</strong>, <strong>Java</strong>, <strong>Python</strong>, <strong>JavaScript</strong>, dan <strong>PHP</strong> dari segi kecepatan, efisiensi memori, konkurensi, hingga peluang karir industri.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-black/30 rounded-2xl border border-slate-200 dark:border-white/10 shrink-0 w-full md:w-auto overflow-x-auto">
          {[
            { id: "matrix", label: "📊 Tabel Metrik", icon: Sliders },
            { id: "radar", label: "🕸️ Radar Visual", icon: Activity },
            { id: "versus", label: "⚔️ Head-to-Head", icon: Scale },
            { id: "advisor", label: "🧭 Panduan Rekomendasi", icon: Brain },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer shrink-0 ${
                  active
                    ? "bg-[#04AA6D] text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Filter Language Selector Checkboxes */}
      {activeTab !== "versus" && activeTab !== "advisor" && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1">
            Bahasa yang Ditampilkan:
          </span>
          {LANGUAGES_BENCHMARK.map((lang) => {
            const isChecked = selectedLangs.includes(lang.id);
            return (
              <button
                key={lang.id}
                onClick={() => toggleLanguageSelect(lang.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold font-mono transition-all cursor-pointer border ${
                  isChecked
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-xs"
                    : "bg-white dark:bg-[#162032] text-slate-400 border-slate-200 dark:border-white/10 opacity-60"
                }`}
              >
                <LanguageLogo language={lang.id} size={15} />
                <span>{lang.name}</span>
                {isChecked && <CheckCircle2 size={13} className="text-[#04AA6D]" />}
              </button>
            );
          })}
        </div>
      )}

      {/* VIEW 1: COMPARISON MATRIX & METRIC BARS */}
      {activeTab === "matrix" && (
        <div className="space-y-6">
          {/* Detailed Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {METRIC_DEFINITIONS.map((metric) => (
              <div
                key={metric.key}
                className="bg-white dark:bg-[#162032] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-3.5"
              >
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{metric.label}</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {metric.desc}
                  </p>
                </div>

                {/* Bars for Selected Languages */}
                <div className="space-y-2.5 pt-1">
                  {LANGUAGES_BENCHMARK.filter((l) => selectedLangs.includes(l.id)).map((lang) => {
                    const val = lang.ratings[metric.key] || 0;
                    const percent = (val / 10) * 100;

                    return (
                      <div key={lang.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <span>{lang.icon}</span>
                            <span>{lang.name}</span>
                          </span>
                          <span className="font-black text-[#04AA6D]">{val} / 10</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 dark:bg-black/30 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${percent}%`,
                              backgroundColor: lang.color || "#04AA6D",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Full Comparison Table */}
          <div className="bg-white dark:bg-[#162032] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xs">
            <div className="p-4 bg-slate-50 dark:bg-black/20 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-800 dark:text-white">
                📋 Ringkasan Karakteristik Arsitektur
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-black/40 text-slate-700 dark:text-slate-300 font-mono font-bold">
                  <tr>
                    <th className="p-3.5">Bahasa</th>
                    <th className="p-3.5">Model Runtime</th>
                    <th className="p-3.5">Kekuatan Utama</th>
                    <th className="p-3.5">Domain Industri Terbaik</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {LANGUAGES_BENCHMARK.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="text-base">{l.icon}</span>
                        <span>{l.name}</span>
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                        {l.runtimeType}
                      </td>
                      <td className="p-3.5 text-slate-700 dark:text-slate-200">
                        {l.tagline}
                      </td>
                      <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">
                        {l.useCases[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: RADAR CHART VISUAL */}
      {activeTab === "radar" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visual Radar Container */}
          <div className="lg:col-span-7 bg-white dark:bg-[#162032] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs flex flex-col items-center justify-center space-y-4">
            <h3 className="text-sm font-mono font-black uppercase tracking-wider text-slate-900 dark:text-white">
              🕸️ Radar Diagram Multi-Dimensi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center max-w-md">
              Visualisasi poligon kekuatan komputasi masing-masing bahasa pemrograman berdasarkan 6 metrik utama.
            </p>

            {/* SVG Radar Chart */}
            <div className="w-full max-w-[380px] aspect-square relative flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Background Radar Webs */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, lIdx) => {
                  const r = 140 * level;
                  const angles = [0, 60, 120, 180, 240, 300];
                  const points = angles
                    .map((a) => {
                      const rad = (a * Math.PI) / 180;
                      const x = 200 + r * Math.cos(rad);
                      const y = 200 + r * Math.sin(rad);
                      return `${x},${y}`;
                    })
                    .join(" ");

                  return (
                    <polygon
                      key={lIdx}
                      points={points}
                      fill="none"
                      stroke="currentColor"
                      className="text-slate-200 dark:text-white/10"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Radar Spokes */}
                {[0, 60, 120, 180, 240, 300].map((a, aIdx) => {
                  const rad = (a * Math.PI) / 180;
                  const x2 = 200 + 140 * Math.cos(rad);
                  const y2 = 200 + 140 * Math.sin(rad);
                  return (
                    <line
                      key={aIdx}
                      x1="200"
                      y1="200"
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-white/10"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Language Polygons */}
                {LANGUAGES_BENCHMARK.filter((l) => selectedLangs.includes(l.id)).map((lang) => {
                  const metricKeys = ["speed", "easeOfLearning", "concurrency", "memoryEfficiency", "ecosystemJobs", "startupTime"];
                  const angles = [0, 60, 120, 180, 240, 300];

                  const polyPoints = metricKeys
                    .map((k, i) => {
                      const val = lang.ratings[k] || 5;
                      const r = (val / 10) * 140;
                      const rad = (angles[i] * Math.PI) / 180;
                      const x = 200 + r * Math.cos(rad);
                      const y = 200 + r * Math.sin(rad);
                      return `${x},${y}`;
                    })
                    .join(" ");

                  return (
                    <g key={lang.id}>
                      <polygon
                        points={polyPoints}
                        fill={lang.color}
                        fillOpacity="0.18"
                        stroke={lang.color}
                        strokeWidth="2.5"
                      />
                    </g>
                  );
                })}

                {/* Metric Labels */}
                <text x="350" y="205" textAnchor="start" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Speed ⚡</text>
                <text x="280" y="340" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Ease 🧠</text>
                <text x="120" y="340" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Concurrency 🏎️</text>
                <text x="40" y="205" textAnchor="end" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Memory 💾</text>
                <text x="120" y="70" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Jobs 💼</text>
                <text x="280" y="70" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Startup ⏱️</text>
              </svg>
            </div>
          </div>

          {/* Radar Legend & Summary */}
          <div className="lg:col-span-5 space-y-3">
            {LANGUAGES_BENCHMARK.filter((l) => selectedLangs.includes(l.id)).map((lang) => (
              <div
                key={lang.id}
                className="bg-white dark:bg-[#162032] p-4 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{lang.name}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                    Skor Rata-rata: {(Object.values(lang.ratings).reduce((a, b) => a + b, 0) / 6).toFixed(1)}/10
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {lang.tagline}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: HEAD-TO-HEAD VERSUS MODE */}
      {activeTab === "versus" && (
        <div className="space-y-6">
          {/* Language Selector Versus Bar */}
          <div className="bg-white dark:bg-[#162032] p-4 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Lang A Select */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-mono font-bold text-slate-500">Kandidat A:</span>
              <select
                value={versusLangA}
                onChange={(e) => setVersusLangA(e.target.value)}
                className="bg-slate-100 dark:bg-black/30 font-bold text-xs p-2 rounded-xl text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 cursor-pointer"
              >
                {LANGUAGES_BENCHMARK.map((l) => (
                  <option key={l.id} value={l.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#04AA6D] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
              VS
            </div>

            {/* Lang B Select */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-mono font-bold text-slate-500">Kandidat B:</span>
              <select
                value={versusLangB}
                onChange={(e) => setVersusLangB(e.target.value)}
                className="bg-slate-100 dark:bg-black/30 font-bold text-xs p-2 rounded-xl text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 cursor-pointer"
              >
                {LANGUAGES_BENCHMARK.map((l) => (
                  <option key={l.id} value={l.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[langA, langB].map((lang, idx) => (
              <div
                key={lang.id}
                className="bg-white dark:bg-[#162032] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-white/5">
                      <LanguageLogo language={lang.id} size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">{lang.name}</h3>
                      <span className="text-[11px] font-mono text-slate-500">{lang.runtimeType}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold" style={{ backgroundColor: `${lang.color}20`, color: lang.color }}>
                    Kandidat {idx === 0 ? "A" : "B"}
                  </span>
                </div>

                {/* Strengths / Pros */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                    ✓ Kelebihan Utama:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {lang.pros.map((pro, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses / Cons */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                    ✗ Hal yang Perlu Diperhatikan:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {lang.cons.map((con, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <span className="text-rose-500 mt-0.5">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sample Code Snippet */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                    💻 Contoh Sintaks HTTP Web Server:
                  </span>
                  <pre className="p-3.5 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto leading-relaxed border border-white/5">
                    {lang.sampleCode}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: LANGUAGE ADVISOR & DECISION TREE */}
      {activeTab === "advisor" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white dark:bg-[#162032] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                🧭 Smart Language Decision Advisor
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Jawab 2 pertanyaan singkat di bawah ini untuk mengetahui bahasa pemrograman mana yang paling optimal untuk kebutuhan proyek atau karir Anda.
              </p>
            </div>

            {/* Question 1: Project Type */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-white uppercase tracking-wider block">
                1. Apa domain atau jenis proyek yang ingin Anda bangun?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {[
                  { id: "cloud", label: "Cloud Microservices & High Scale", icon: "🐹" },
                  { id: "ai", label: "Artificial Intelligence & Data Science", icon: "🐍" },
                  { id: "web", label: "Fullstack Web & Realtime Apps", icon: "🟨" },
                  { id: "enterprise", label: "Core Banking & Enterprise Scale", icon: "☕" },
                  { id: "saas", label: "Rapid SaaS Web & E-Commerce", icon: "🐘" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAdvisorAnswers((prev) => ({ ...prev, projectType: item.id }))}
                    className={`p-3.5 rounded-2xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center gap-2.5 ${
                      advisorAnswers.projectType === item.id
                        ? "bg-[#04AA6D] text-white border-transparent shadow-xs"
                        : "bg-slate-50 dark:bg-black/20 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/5 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation Result Card */}
            {recommendedLanguage && (
              <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-[#04AA6D]/30 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{recommendedLanguage.icon}</span>
                  <div>
                    <span className="text-[10px] font-mono font-black text-[#04AA6D] uppercase tracking-wider">
                      Rekomendasi Terbaik untuk Anda:
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {recommendedLanguage.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {recommendedLanguage.tagline}. Bahasa ini dirancang khusus untuk memberikan efisiensi maksimal pada domain <strong>{recommendedLanguage.useCases[0]}</strong>.
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    ✓ Nilai Kecepatan: {recommendedLanguage.ratings.speed}/10 • Konkurensi: {recommendedLanguage.ratings.concurrency}/10 • Karir: {recommendedLanguage.ratings.ecosystemJobs}/10
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
