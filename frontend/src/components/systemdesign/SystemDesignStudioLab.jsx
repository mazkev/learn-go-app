import React, { useState, useEffect, useMemo } from "react";
import {
  Layers,
  Cpu,
  Database,
  Activity,
  Zap,
  Globe,
  Server,
  Shield,
  ArrowRight,
  RefreshCw,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  Box,
  Flame,
  Radio,
  Share2,
  HardDrive,
  Network
} from "lucide-react";

export const ARCHITECTURE_PRESETS = [
  {
    id: "ecommerce",
    title: "🛒 E-Commerce High-Scale Microservices",
    scale: "500,000 Req/Detik (Flash Sale)",
    description: "Arsitektur multi-tier pemrosesan pesanan cepat dengan Go API Gateway, Java Order Engine, Kafka Event Queue, Redis Cache, dan PostgreSQL Read Replicas.",
    nodes: [
      { id: "client", name: "Client Apps (Web/Mobile)", type: "client", icon: Globe, color: "#38bdf8", status: "healthy", rps: 100000, latency: "5ms" },
      { id: "cdn", name: "Cloudflare Edge CDN", type: "edge", icon: Shield, color: "#f59e0b", status: "healthy", rps: 100000, latency: "8ms" },
      { id: "gateway", name: "Go API Gateway & Rate Limiter", type: "gateway", icon: Network, color: "#00ADD8", status: "healthy", rps: 45000, latency: "12ms" },
      { id: "auth_service", name: "Auth & User Service (Go)", type: "service", icon: Server, color: "#00ADD8", status: "healthy", rps: 20000, latency: "15ms" },
      { id: "order_service", name: "Order & Payment Engine (Java)", type: "service", icon: Server, color: "#f89820", status: "healthy", rps: 25000, latency: "25ms" },
      { id: "redis", name: "Redis Cluster (Cache-Aside)", type: "cache", icon: Zap, color: "#ef4444", status: "healthy", rps: 40000, latency: "1.2ms" },
      { id: "kafka", name: "Apache Kafka Event Bus", type: "queue", icon: Radio, color: "#a855f7", status: "healthy", rps: 25000, latency: "4ms" },
      { id: "postgres", name: "PostgreSQL (Master + 3 Replicas)", type: "database", icon: Database, color: "#3b82f6", status: "healthy", rps: 5000, latency: "18ms" },
    ],
    connections: [
      { from: "client", to: "cdn" },
      { from: "cdn", to: "gateway" },
      { from: "gateway", to: "auth_service" },
      { from: "gateway", to: "order_service" },
      { from: "gateway", to: "redis" },
      { from: "order_service", to: "kafka" },
      { from: "kafka", to: "postgres" },
      { from: "auth_service", to: "postgres" },
    ],
  },
  {
    id: "ride_hailing",
    title: "🚗 Real-Time Ride Hailing & GPS Tracking (Gojek/Uber Style)",
    scale: "2,000,000 GPS Pings/Detik",
    description: "Ingestion data lokasi real-time dari jutaan driver dengan Go WebSockets, Redis Geospatial, Kafka Stream, dan Algoritma Driver Matching.",
    nodes: [
      { id: "drivers", name: "Driver & Passenger Apps", type: "client", icon: Globe, color: "#10b981", status: "healthy", rps: 200000, latency: "20ms" },
      { id: "ws_gateway", name: "Go WebSocket Gateway (Goroutines)", type: "gateway", icon: Network, color: "#00ADD8", status: "healthy", rps: 200000, latency: "6ms" },
      { id: "redis_geo", name: "Redis Geo In-Memory Store", type: "cache", icon: Zap, color: "#ef4444", status: "healthy", rps: 180000, latency: "0.8ms" },
      { id: "matching_engine", name: "Driver Match Engine (Go/C++)", type: "service", icon: Cpu, color: "#00ADD8", status: "healthy", rps: 40000, latency: "14ms" },
      { id: "trip_kafka", name: "Kafka Trip Stream", type: "queue", icon: Radio, color: "#a855f7", status: "healthy", rps: 40000, latency: "3ms" },
      { id: "trip_db", name: "ScyllaDB / Cassandra (History)", type: "database", icon: Database, color: "#3b82f6", status: "healthy", rps: 20000, latency: "10ms" },
    ],
    connections: [
      { from: "drivers", to: "ws_gateway" },
      { from: "ws_gateway", to: "redis_geo" },
      { from: "ws_gateway", to: "matching_engine" },
      { from: "matching_engine", to: "trip_kafka" },
      { from: "trip_kafka", to: "trip_db" },
    ],
  },
  {
    id: "ai_rag",
    title: "🤖 AI Knowledge Base & RAG Search Engine",
    scale: "Semantic Vector Search",
    description: "Pipeline pencarian pintar dengan Next.js Frontend, Python FastAPI backend, Vector Database (Qdrant/Milvus), LLM Inference, dan PostgreSQL Metadata.",
    nodes: [
      { id: "client_ai", name: "React / Next.js User Portal", type: "client", icon: Globe, color: "#E5A00D", status: "healthy", rps: 5000, latency: "10ms" },
      { id: "fastapi", name: "Python FastAPI RAG Orchestrator", type: "service", icon: Server, color: "#3776AB", status: "healthy", rps: 5000, latency: "45ms" },
      { id: "redis_cache", name: "Redis Semantic Cache", type: "cache", icon: Zap, color: "#ef4444", status: "healthy", rps: 4000, latency: "1.5ms" },
      { id: "vector_db", name: "Vector DB (Milvus / Qdrant)", type: "database", icon: Database, color: "#14b8a6", status: "healthy", rps: 1500, latency: "35ms" },
      { id: "llm_worker", name: "DeepSeek / OpenAI Inference", type: "service", icon: Cpu, color: "#8b5cf6", status: "healthy", rps: 1000, latency: "350ms" },
    ],
    connections: [
      { from: "client_ai", to: "fastapi" },
      { from: "fastapi", to: "redis_cache" },
      { from: "fastapi", to: "vector_db" },
      { from: "fastapi", to: "llm_worker" },
    ],
  },
];

export default function SystemDesignStudioLab() {
  const [selectedPresetId, setSelectedPresetId] = useState("ecommerce");
  const [trafficLoad, setTrafficLoad] = useState(50); // 1 to 100 multiplier
  const [isSimulating, setIsSimulating] = useState(true);
  const [isCacheEnabled, setIsCacheEnabled] = useState(true);
  const [isQueueEnabled, setIsQueueEnabled] = useState(true);
  const [isDatabaseHealthy, setIsDatabaseHealthy] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const preset = useMemo(() => {
    return ARCHITECTURE_PRESETS.find((p) => p.id === selectedPresetId) || ARCHITECTURE_PRESETS[0];
  }, [selectedPresetId]);

  // Dynamic system telemetry calculation
  const metrics = useMemo(() => {
    const rawRps = Math.round(trafficLoad * 2500);
    const cacheHitRatio = isCacheEnabled ? 0.88 : 0.0;
    const dbLoadRps = Math.round(rawRps * (1 - cacheHitRatio));
    
    // Latency calculation with bottleneck factors
    let baseLatency = 12;
    if (!isCacheEnabled) baseLatency += 120;
    if (!isQueueEnabled) baseLatency += 85;
    if (!isDatabaseHealthy) baseLatency += 450;
    if (trafficLoad > 80) baseLatency += Math.round((trafficLoad - 80) * 8);

    const errorRate = !isDatabaseHealthy
      ? 68.5
      : !isCacheEnabled && trafficLoad > 75
      ? 14.2
      : 0.02;

    return {
      totalRps: rawRps.toLocaleString(),
      avgLatency: `${baseLatency} ms`,
      cacheHitPercent: `${Math.round(cacheHitRatio * 100)}%`,
      errorRate: `${errorRate.toFixed(2)}%`,
      dbLoadRps: dbLoadRps.toLocaleString(),
      isCritical: errorRate > 5 || baseLatency > 200,
    };
  }, [trafficLoad, isCacheEnabled, isQueueEnabled, isDatabaseHealthy]);

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-6 py-6 space-y-6 pb-28">
      {/* 1. Studio Header */}
      <div className="bg-white dark:bg-[#162032] p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-mono font-bold text-xs uppercase tracking-wider mb-1">
            <Network size={15} />
            <span>Interactive Cloud Architecture & System Design Studio</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            High-Concurrency System Design Canvas
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Simulasi visual interaktif alur paket data, load balancing, caching, message queue, dan deteksi bottleneck latensi secara real-time.
          </p>
        </div>

        {/* Preset Architecture Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto">
          {ARCHITECTURE_PRESETS.map((p) => {
            const active = p.id === preset.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPresetId(p.id);
                  setSelectedNodeId(null);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold font-mono transition-all shrink-0 cursor-pointer border ${
                  active
                    ? "bg-[#04AA6D] text-white border-transparent shadow-xs scale-105"
                    : "bg-slate-100 dark:bg-black/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-200"
                }`}
              >
                <span>{p.title.split(" ")[0]}</span>
                <span className="ml-1.5 hidden sm:inline">{p.title.split(" ").slice(1, 3).join(" ")}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Real-Time Telemetry & Stress Test Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Metric 1: Total Traffic RPS */}
        <div className="bg-white dark:bg-[#162032] p-4 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            ⚡ Ingestion Traffic
          </span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono flex items-center gap-1.5">
            <span>{metrics.totalRps}</span>
            <span className="text-xs font-normal text-slate-400">req/s</span>
          </div>
          <span className="text-[11px] text-blue-500 font-bold">Volume Real-Time</span>
        </div>

        {/* Metric 2: Latency */}
        <div className="bg-white dark:bg-[#162032] p-4 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            ⏱️ Avg Response Latency
          </span>
          <div className={`text-xl font-black font-mono ${metrics.isCritical ? "text-rose-500 animate-pulse" : "text-[#04AA6D]"}`}>
            {metrics.avgLatency}
          </div>
          <span className={`text-[11px] font-bold ${metrics.isCritical ? "text-rose-500" : "text-emerald-500"}`}>
            {metrics.isCritical ? "⚠️ Bottleneck Detected!" : "✓ Fast Response SLA"}
          </span>
        </div>

        {/* Metric 3: Cache Hit */}
        <div className="bg-white dark:bg-[#162032] p-4 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            🚀 Redis Cache Hit Ratio
          </span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            {metrics.cacheHitPercent}
          </div>
          <span className="text-[11px] text-purple-500 font-bold">Offloaded from DB</span>
        </div>

        {/* Metric 4: DB Load */}
        <div className="bg-white dark:bg-[#162032] p-4 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            🗄️ Database Write/Read Load
          </span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            {metrics.dbLoadRps} <span className="text-xs font-normal text-slate-400">qps</span>
          </div>
          <span className="text-[11px] text-amber-500 font-bold">Direct Disk Queries</span>
        </div>

        {/* Metric 5: Error Rate */}
        <div className="bg-white dark:bg-[#162032] p-4 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            🛡️ Error Rate (HTTP 5xx)
          </span>
          <div className={`text-xl font-black font-mono ${parseFloat(metrics.errorRate) > 1 ? "text-rose-500" : "text-emerald-500"}`}>
            {metrics.errorRate}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">99.99% Availability Target</span>
        </div>
      </div>

      {/* 3. Interactive Chaos Engineering & Stress Sliders */}
      <div className="bg-white dark:bg-[#162032] p-4 md:p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sliders size={16} className="text-[#04AA6D]" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Chaos Testing & Load Generator Controls:
            </span>
          </div>

          {/* Preset Stress Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setTrafficLoad(20)}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-black/30 hover:bg-slate-200 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              Normal (50k RPS)
            </button>
            <button
              onClick={() => setTrafficLoad(80)}
              className="px-2.5 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 cursor-pointer"
            >
              ⚡ Flash Sale Surge (200k RPS)
            </button>
            <button
              onClick={() => setTrafficLoad(100)}
              className="px-2.5 py-1 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 cursor-pointer"
            >
              🔥 Max Stress (250k RPS)
            </button>
          </div>
        </div>

        {/* Slider & Toggle Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center pt-1">
          {/* Traffic Multiplier Slider */}
          <div className="space-y-1.5 md:col-span-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              <span>Beban Traffic: {trafficLoad}%</span>
              <span className="text-emerald-500">{metrics.totalRps} Request/Detik</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={trafficLoad}
              onChange={(e) => setTrafficLoad(parseInt(e.target.value))}
              className="w-full accent-[#04AA6D] cursor-pointer"
            />
          </div>

          {/* Toggle Cache */}
          <button
            onClick={() => setIsCacheEnabled(!isCacheEnabled)}
            className={`p-2.5 rounded-2xl text-xs font-bold font-mono transition-all border flex items-center justify-between cursor-pointer ${
              isCacheEnabled
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
            }`}
          >
            <span>Redis Cache:</span>
            <span>{isCacheEnabled ? "✓ AKTIF (Fast)" : "✗ MATI (Degraded)"}</span>
          </button>

          {/* Toggle Database Health (Simulate Chaos Crash) */}
          <button
            onClick={() => setIsDatabaseHealthy(!isDatabaseHealthy)}
            className={`p-2.5 rounded-2xl text-xs font-bold font-mono transition-all border flex items-center justify-between cursor-pointer ${
              isDatabaseHealthy
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                : "bg-rose-500/20 border-rose-500/50 text-rose-700 dark:text-rose-300 animate-pulse"
            }`}
          >
            <span>Database Status:</span>
            <span>{isDatabaseHealthy ? "✓ HEALTHY" : "🔥 CRASH / DOWN"}</span>
          </button>
        </div>
      </div>

      {/* 4. Interactive Visual Architecture Canvas */}
      <div className="bg-white dark:bg-[#162032] p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{preset.title}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {preset.description}
            </p>
          </div>
          <span className="hidden sm:inline px-3 py-1 rounded-full bg-[#04AA6D]/15 text-[#04AA6D] font-mono text-xs font-bold">
            Target SLA: {preset.scale}
          </span>
        </div>

        {/* Nodes Grid Canvas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 relative">
          {preset.nodes.map((node, nIdx) => {
            const isSelected = selectedNodeId === node.id;
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-3 relative overflow-hidden ${
                  isSelected
                    ? "border-[#04AA6D] shadow-md scale-102 bg-emerald-500/5"
                    : "bg-slate-50 dark:bg-black/20 border-slate-200 dark:border-white/5 hover:border-slate-300"
                }`}
              >
                {/* Node Top Header */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ backgroundColor: node.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                    Step {nIdx + 1}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    {node.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                    <span>{node.latency}</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{node.rps.toLocaleString()} RPS</span>
                  </div>
                </div>

                {/* Animated Packet Stream Bar */}
                {isSimulating && (
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-transparent via-[#04AA6D] to-transparent animate-pulse"
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Architectural Design Deep-Dive Insights */}
        <div className="p-4 rounded-3xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 space-y-3">
          <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Zap size={14} className="text-[#04AA6D]" />
            <span>Kunci Arsitektur Ber-Throughput Tinggi di {preset.title.split(" ")[1]}:</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3 rounded-2xl bg-white dark:bg-[#162032] border border-slate-200 dark:border-white/5 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">1. Cache-Aside Pattern</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Aplikasi selalu memeriksa Redis terlebih dahulu. 90% query tertahan di RAM tanpa membebani disk database.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-[#162032] border border-slate-200 dark:border-white/5 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">2. Asynchronous Queue (Kafka)</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Operasi berat (notifikasi, payment verification) dimasukkan ke message broker agar response ke client tetap instan (&lt;20ms).
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-[#162032] border border-slate-200 dark:border-white/5 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">3. Lightweight Go Goroutines</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Setiap koneksi HTTP masuk ditangani oleh goroutine independen yang hanya memakan memori 2 KB per koneksi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
