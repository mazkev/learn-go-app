import React, { useState } from "react";
import {
  Layers,
  FolderCode,
  Activity,
  Globe,
  Zap,
  Database,
  FlaskConical,
  Sparkles
} from "lucide-react";
import CleanArchLab from "../cleanarch/CleanArchLab";
import ProjectStartersLab from "../starters/ProjectStartersLab";
import ConcurrencyVisualizer from "../visualizer/ConcurrencyVisualizer";
import APITester from "../apitester/APITester";
import GrpcCompareLab from "../grpccompare/GrpcCompareLab";
import GormLab from "../gormlab/GormLab";

export const LAB_TABS = [
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

export default function LabsHub({ defaultSubTab = "cleanarch" }) {
  const [activeSubTab, setActiveSubTab] = useState(defaultSubTab);

  const currentLab = LAB_TABS.find((t) => t.id === activeSubTab) || LAB_TABS[0];

  return (
    <div className="min-h-full flex flex-col">
      {/* Sub-Header Toolbar for Labs */}
      <div className="theme-navbar border-b border-slate-200 dark:border-white/[0.08] px-4 md:px-8 py-3 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#04AA6D]/15 flex items-center justify-center text-[#04AA6D]">
              <FlaskConical size={18} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold theme-heading flex items-center gap-2">
                <span>Interactive Labs Workbench</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#04AA6D]/15 text-[#04AA6D] font-mono font-bold">
                  6 Simulator
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

      {/* Active Lab Body Area */}
      <div className="flex-1 overflow-y-auto">
        {activeSubTab === "cleanarch" && <CleanArchLab />}
        {activeSubTab === "starters" && <ProjectStartersLab />}
        {activeSubTab === "concurrency" && <ConcurrencyVisualizer />}
        {activeSubTab === "apitester" && <APITester />}
        {activeSubTab === "grpc" && <GrpcCompareLab />}
        {activeSubTab === "gorm" && <GormLab />}
      </div>
    </div>
  );
}
