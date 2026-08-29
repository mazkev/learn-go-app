import React, { useState, Suspense, lazy } from "react";
import {
  Layers,
  FolderCode,
  ShieldCheck,
  Activity,
  Globe,
  Zap,
  Database,
  FlaskConical,
  Sparkles,
  Blocks,
  Scale,
  Network,
  BarChart2
} from "lucide-react";
import LoadingSpinner from "../common/LoadingSpinner";

// Lazy-load individual simulators on demand for fast initial load
const AlgorithmVisualizerLab = lazy(() => import("../algo/AlgorithmVisualizerLab"));
const VisualCodeBuilder = lazy(() => import("../builder/VisualCodeBuilder"));
const PolyglotBenchmarkLab = lazy(() => import("../benchmark/PolyglotBenchmarkLab"));
const SystemDesignStudioLab = lazy(() => import("../systemdesign/SystemDesignStudioLab"));
const CleanArchLab = lazy(() => import("../cleanarch/CleanArchLab"));
const ProjectStartersLab = lazy(() => import("../starters/ProjectStartersLab"));
const UnitTestLab = lazy(() => import("../testinglab/UnitTestLab"));
const ConcurrencyVisualizer = lazy(() => import("../visualizer/ConcurrencyVisualizer"));
const APITester = lazy(() => import("../apitester/APITester"));
const GrpcCompareLab = lazy(() => import("../grpccompare/GrpcCompareLab"));
const GormLab = lazy(() => import("../gormlab/GormLab"));

export const LAB_TABS = [
  {
    id: "algorithm",
    label: "🎮 Algorithm Visualizer",
    icon: BarChart2,
    description: "Studio animasi visual langkah demi langkah: Sorting Race & Grid Pathfinding Maze BFS",
  },
  {
    id: "systemdesign",
    label: "🏗️ System Design Canvas",
    icon: Network,
    description: "Studio arsitektur cloud & microservices interaktif dengan simulasi stress test 500k RPS",
  },
  {
    id: "benchmark",
    label: "⚖️ 5-Language Benchmark",
    icon: Scale,
    description: "Diagram radar & matriks perbandingan performa, RAM, konkurensi, dan kemudahan 5 bahasa",
  },
  {
    id: "builder",
    label: "🧩 Visual Code Builder",
    icon: Blocks,
    description: "Rakit dan pahami kode Go secara visual seperti LEGO tanpa takut salah ketik (Cocok untuk Pemula)",
  },
  {
    id: "cleanarch",
    label: "Clean Architecture",
    icon: Layers,
    description: "Simulasi visual alur data: Handler -> UseCase -> Repository -> Database",
  },
  {
    id: "starters",
    label: "Production Starters",
    icon: FolderCode,
    description: "Blueprint template proyek nyata: JWT Auth, WebSockets Chat, dan Clean Microservice",
  },
  {
    id: "testing",
    label: "Unit Testing & Coverage",
    icon: ShieldCheck,
    description: "Simulator pengujian *_test.go, Table-Driven Tests, dan Line Coverage Heatmap",
  },
  {
    id: "concurrency",
    label: "Concurrency & Mutex",
    icon: Activity,
    description: "Visualisasi Channels, Buffer Queue, Worker Pool, dan Data Race vs Mutex",
  },
  {
    id: "apitester",
    label: "REST API Client",
    icon: Globe,
    description: "Uji coba endpoint HTTP yang dibangun dengan net/http dan ServeMux Go",
  },
  {
    id: "grpc",
    label: "gRPC vs REST Benchmark",
    icon: Zap,
    description: "Bandingkan payload size biner Protobuf vs teks JSON secara real-time",
  },
  {
    id: "gorm",
    label: "GORM & SQL Engine",
    icon: Database,
    description: "Visualizer tabel SQLite dengan trigger query GORM live & SQL inspector",
  },
];

export default function LabsHub({ defaultSubTab = "algorithm", onOpenTryIt }) {
  const [activeSubTab, setActiveSubTab] = useState(defaultSubTab);

  const currentLab = LAB_TABS.find((t) => t.id === activeSubTab) || LAB_TABS[0];

  return (
    <div className="h-[calc(100vh-57px)] flex flex-col theme-card overflow-hidden">
      {/* Top Labs Hub Toolbar */}
      <div className="theme-navbar px-4 py-2.5 border-b border-slate-200 dark:border-white/10 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#04AA6D]/15 text-[#04AA6D] flex items-center justify-center font-bold shrink-0">
              <FlaskConical size={18} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold theme-heading flex items-center gap-2">
                <span>Interactive Labs Workbench</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#04AA6D]/15 text-[#04AA6D] font-mono font-bold">
                  11 Simulator
                </span>
              </h2>
              <p className="text-[11px] theme-muted">{currentLab.description}</p>
            </div>
          </div>

          {/* Sub-tab Pill Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {LAB_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#04AA6D] text-white shadow-sm"
                      : "theme-card-subtle theme-muted hover:theme-heading hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Lab Body Area with Suspense Lazy Loading */}
      <div className="flex-1 overflow-y-auto">
        <Suspense fallback={<LoadingSpinner message={`Memuat ${currentLab.label}...`} />}>
          {activeSubTab === "algorithm" && <AlgorithmVisualizerLab />}
          {activeSubTab === "systemdesign" && <SystemDesignStudioLab />}
          {activeSubTab === "benchmark" && <PolyglotBenchmarkLab />}
          {activeSubTab === "builder" && <VisualCodeBuilder onOpenTryIt={onOpenTryIt} />}
          {activeSubTab === "cleanarch" && <CleanArchLab />}
          {activeSubTab === "starters" && <ProjectStartersLab />}
          {activeSubTab === "testing" && <UnitTestLab />}
          {activeSubTab === "concurrency" && <ConcurrencyVisualizer />}
          {activeSubTab === "apitester" && <APITester />}
          {activeSubTab === "grpc" && <GrpcCompareLab />}
          {activeSubTab === "gorm" && <GormLab />}
        </Suspense>
      </div>
    </div>
  );
}
