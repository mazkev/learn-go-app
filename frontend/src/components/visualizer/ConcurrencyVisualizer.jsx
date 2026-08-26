import React, { useState } from "react";
import {
  Activity,
  Play,
  Plus,
  Send,
  Download,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Sparkles
} from "lucide-react";

export default function ConcurrencyVisualizer() {
  const [activeTab, setActiveTab] = useState("channel");

  // Tab 1: Channel Simulator State
  const [bufferCapacity, setBufferCapacity] = useState(3);
  const [channelQueue, setChannelQueue] = useState(["Task #1", "Task #2"]);
  const [channelLogs, setChannelLogs] = useState([
    "make(chan string, 3) diinisialisasi",
    "<- 'Task #1' dikirim ke channel",
    "<- 'Task #2' dikirim ke channel",
  ]);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleSendToChannel = () => {
    if (channelQueue.length >= bufferCapacity) {
      setIsBlocked(true);
      setChannelLogs((prev) => [
        `🚫 [BLOCKED] Buffer Penuh (${channelQueue.length}/${bufferCapacity})! Goroutine pengirim tertahan...`,
        ...prev,
      ]);
      return;
    }
    const newId = `Task #${Math.floor(Math.random() * 900) + 100}`;
    setChannelQueue((prev) => [...prev, newId]);
    setIsBlocked(false);
    setChannelLogs((prev) => [
      `📤 ch <- "${newId}" [Tersimpan di Buffer: ${channelQueue.length + 1}/${bufferCapacity}]`,
      ...prev,
    ]);
  };

  const handleReceiveFromChannel = () => {
    if (channelQueue.length === 0) {
      setChannelLogs((prev) => [
        "⚠️ [BLOCKED] Buffer Kosong! Goroutine penerima menunggu pengirim...",
        ...prev,
      ]);
      return;
    }
    const item = channelQueue[0];
    setChannelQueue((prev) => prev.slice(1));
    setIsBlocked(false);
    setChannelLogs((prev) => [
      `📥 data := <-ch (Menerima "${item}") [Sisa Buffer: ${channelQueue.length - 1}/${bufferCapacity}]`,
      ...prev,
    ]);
  };

  // Tab 2: Worker Pool State
  const [workers, setWorkers] = useState([
    { id: 1, name: "Worker 1", status: "Idle", currentJob: null },
    { id: 2, name: "Worker 2", status: "Idle", currentJob: null },
    { id: 3, name: "Worker 3", status: "Idle", currentJob: null },
  ]);
  const [jobQueue, setJobQueue] = useState([101, 102, 103, 104, 105]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [isProcessingPool, setIsProcessingPool] = useState(false);

  const handleStartWorkerPool = () => {
    if (isProcessingPool || jobQueue.length === 0) return;
    setIsProcessingPool(true);

    const interval = setInterval(() => {
      setJobQueue((currentJobs) => {
        if (currentJobs.length === 0) {
          clearInterval(interval);
          setIsProcessingPool(false);
          setWorkers((w) => w.map((x) => ({ ...x, status: "Idle", currentJob: null })));
          return [];
        }

        const nextJob = currentJobs[0];
        const remaining = currentJobs.slice(1);

        setWorkers((currentWorkers) => {
          const idleIdx = currentWorkers.findIndex((w) => w.status === "Idle");
          if (idleIdx === -1) return currentWorkers;

          const updated = [...currentWorkers];
          updated[idleIdx] = {
            ...updated[idleIdx],
            status: "Processing",
            currentJob: nextJob,
          };

          setTimeout(() => {
            setWorkers((w) => {
              const res = [...w];
              if (res[idleIdx]) {
                res[idleIdx] = { ...res[idleIdx], status: "Idle", currentJob: null };
              }
              return res;
            });
            setCompletedJobs((prev) => [
              { job: nextJob, worker: updated[idleIdx].name, time: new Date().toLocaleTimeString() },
              ...prev,
            ]);
          }, 1200);

          return updated;
        });

        return remaining;
      });
    }, 600);
  };

  const handleAddJobs = () => {
    const newBatch = Array.from({ length: 5 }, () => Math.floor(Math.random() * 800) + 200);
    setJobQueue((prev) => [...prev, ...newBatch]);
  };

  // Tab 3: Mutex vs Race Condition State
  const [unsafeCounter, setUnsafeCounter] = useState(0);
  const [safeCounter, setSafeCounter] = useState(0);
  const [isMutexLocked, setIsMutexLocked] = useState(false);
  const [simulatingRace, setSimulatingRace] = useState(false);

  const handleSimulateRaceCondition = () => {
    setSimulatingRace(true);
    setUnsafeCounter(0);
    setSafeCounter(0);

    const totalRoutines = 40;

    for (let i = 0; i < totalRoutines; i++) {
      setTimeout(() => {
        setIsMutexLocked(true);
        setSafeCounter((prev) => prev + 1);
        setTimeout(() => setIsMutexLocked(false), 20);
      }, i * 30);
    }

    for (let i = 0; i < totalRoutines; i++) {
      setTimeout(() => {
        if (Math.random() > 0.35) {
          setUnsafeCounter((prev) => prev + 1);
        }
      }, i * 25);
    }

    setTimeout(() => {
      setSimulatingRace(false);
    }, totalRoutines * 35);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider mb-1.5">
            <Activity size={14} />
            <span>Simulasi Konkurensi Realtime</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black theme-heading tracking-tight">
            Visual <span className="gopher-gradient-text">Concurrency Lab</span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1">
            Visualisasikan alur pengiriman Channel, arsitektur Worker Pool, dan proteksi Mutex secara interaktif.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 theme-card-subtle p-1.5 rounded-2xl shadow-sm">
          <button
            onClick={() => setActiveTab("channel")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "channel"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25"
                : "theme-muted hover:theme-heading"
            }`}
          >
            Channels & Buffer
          </button>
          <button
            onClick={() => setActiveTab("workerpool")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "workerpool"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25"
                : "theme-muted hover:theme-heading"
            }`}
          >
            Worker Pool
          </button>
          <button
            onClick={() => setActiveTab("mutex")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "mutex"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25"
                : "theme-muted hover:theme-heading"
            }`}
          >
            Mutex vs Race Condition
          </button>
        </div>
      </div>

      {/* Tab 1: Channel & Buffer Simulator */}
      {activeTab === "channel" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 theme-card rounded-3xl p-7 space-y-6 shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-extrabold theme-heading">Buffered Channel Pipeline</h3>
                <p className="text-xs theme-muted mt-0.5">
                  Kapasitas Buffer: <span className="font-mono font-extrabold text-[#00ADD8]">{bufferCapacity} slot</span>
                </p>
              </div>

              {/* Buffer Size Selector */}
              <div className="flex items-center gap-2 theme-card-subtle px-3 py-1.5 rounded-2xl">
                <span className="text-xs theme-muted font-medium">Kapasitas:</span>
                {[0, 1, 3, 5].map((cap) => (
                  <button
                    key={cap}
                    onClick={() => {
                      setBufferCapacity(cap);
                      setChannelQueue((prev) => prev.slice(0, cap));
                      setChannelLogs((prev) => [`make(chan string, ${cap})`, ...prev]);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                      bufferCapacity === cap
                        ? "bg-[#00ADD8] text-white shadow-sm"
                        : "theme-muted hover:theme-heading"
                    }`}
                  >
                    {cap === 0 ? "0 (Unbuffered)" : cap}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Channel Pipe */}
            <div className="relative py-8 theme-inset rounded-3xl p-6 flex flex-col items-center justify-center min-h-[220px] shadow-inner">
              {isBlocked && (
                <div className="absolute top-3 bg-rose-500/20 border border-rose-500 text-rose-600 dark:text-rose-300 px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse">
                  <AlertTriangle size={14} /> Buffer Penuh! Goroutine Pengirim Tertahan (Blocked)
                </div>
              )}

              {/* Pipeline Container */}
              <div className="w-full flex items-center justify-between gap-4">
                {/* Sender Goroutine */}
                <div className="flex flex-col items-center gap-2 theme-card p-4 rounded-2xl w-36 shrink-0 text-center shadow-md">
                  <div className="w-11 h-11 rounded-2xl bg-[#00ADD8]/15 border border-[#00ADD8] text-[#00ADD8] flex items-center justify-center font-mono font-extrabold text-sm">
                    G1
                  </div>
                  <span className="text-xs font-bold theme-heading">Sender (G1)</span>
                  <button
                    onClick={handleSendToChannel}
                    className="w-full mt-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#00ADD8] to-[#0284C7] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#00ADD8]/25 hover:opacity-95 transition-all"
                  >
                    <Send size={12} /> Kirim Data
                  </button>
                </div>

                {/* The Channel Tube */}
                <div className="flex-1 theme-card-subtle p-4 rounded-3xl border-2 border-dashed border-[#00ADD8]/40 flex items-center justify-center min-h-[100px] gap-2.5 overflow-x-auto shadow-inner">
                  {bufferCapacity === 0 ? (
                    <div className="text-center text-xs theme-muted italic px-4">
                      Unbuffered Channel (Pengirim dan penerima harus siap secara sinkron bersamaan)
                    </div>
                  ) : (
                    Array.from({ length: bufferCapacity }).map((_, index) => {
                      const item = channelQueue[index];
                      return (
                        <div
                          key={index}
                          className={`w-24 h-16 rounded-2xl border flex flex-col items-center justify-center text-xs font-mono transition-all duration-300 ${
                            item
                              ? "bg-gradient-to-br from-[#00ADD8]/20 to-[#8B5CF6]/20 border-[#00ADD8] theme-heading shadow-md scale-105"
                              : "theme-inset text-slate-400"
                          }`}
                        >
                          <span className="text-[10px] theme-muted">Slot #{index + 1}</span>
                          <span className="font-bold truncate max-w-[80px] theme-heading">{item || "Kosong"}</span>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Receiver Goroutine */}
                <div className="flex flex-col items-center gap-2 theme-card p-4 rounded-2xl w-36 shrink-0 text-center shadow-md">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500 text-emerald-500 flex items-center justify-center font-mono font-extrabold text-sm">
                    G2
                  </div>
                  <span className="text-xs font-bold theme-heading">Receiver (G2)</span>
                  <button
                    onClick={handleReceiveFromChannel}
                    className="w-full mt-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/25 hover:opacity-95 transition-all"
                  >
                    <Download size={12} /> Ambil Data
                  </button>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 rounded-2xl theme-card-subtle text-xs theme-body space-y-1 leading-relaxed">
              <span className="font-bold text-amber-500">💡 Karakteristik Channel:</span>
              <p>
                Ketika kapasitas buffer tercapai, pengiriman data baru akan diblokir sampai goroutine penerima mengambil data dengan <code>&lt;-ch</code>.
              </p>
            </div>
          </div>

          {/* Event Logs */}
          <div className="lg:col-span-4 theme-card rounded-3xl p-6 flex flex-col h-full min-h-[380px] shadow-md">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3 mb-3">
              <span className="text-xs font-bold theme-heading flex items-center gap-2">
                <Activity size={14} className="text-amber-500" /> Channel Event Logs
              </span>
              <button
                onClick={() => setChannelLogs([])}
                className="text-[11px] theme-muted hover:theme-heading"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-2 pr-1">
              {channelLogs.map((log, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl leading-relaxed ${
                    log.includes("BLOCKED")
                      ? "bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300"
                      : log.includes("dikirim") || log.includes("ch <-")
                      ? "bg-[#00ADD8]/10 text-[#00ADD8] border border-[#00ADD8]/20"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Worker Pool */}
      {activeTab === "workerpool" && (
        <div className="theme-card rounded-3xl p-7 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold theme-heading">Worker Pool Dispatcher</h3>
              <p className="text-xs theme-muted mt-0.5">
                Mendistribusikan ratusan tugas ke Goroutine worker tetap untuk menghemat alokasi resource CPU & RAM.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleAddJobs}
                className="px-4 py-2 rounded-xl theme-card-subtle theme-heading text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus size={14} /> +5 Tugas
              </button>
              <button
                onClick={handleStartWorkerPool}
                disabled={isProcessingPool || jobQueue.length === 0}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/25 disabled:opacity-50 transition-all"
              >
                <Play size={14} className="fill-slate-950" />
                <span>{isProcessingPool ? "Sedang Memproses..." : "Jalankan Worker Pool"}</span>
              </button>
            </div>
          </div>

          {/* Job Queue */}
          <div className="theme-inset p-5 rounded-2xl space-y-2 shadow-inner">
            <span className="text-xs theme-muted font-bold">
              Jobs Channel Queue ({jobQueue.length} tugas menunggu):
            </span>
            <div className="flex items-center gap-2.5 overflow-x-auto py-2">
              {jobQueue.length === 0 ? (
                <span className="text-xs theme-muted italic">Tidak ada tugas dalam antrian.</span>
              ) : (
                jobQueue.map((job, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl theme-card border border-amber-500/40 text-amber-600 dark:text-amber-300 font-mono text-xs font-bold shrink-0 shadow-sm"
                  >
                    Task #{job}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Workers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {workers.map((worker) => (
              <div
                key={worker.id}
                className={`p-5 rounded-2xl border transition-all ${
                  worker.status === "Processing"
                    ? "bg-amber-500/[0.08] border-amber-500 shadow-md scale-[1.02]"
                    : "theme-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Cpu size={18} className={worker.status === "Processing" ? "text-amber-500 animate-spin" : "theme-muted"} />
                    <span className="text-sm font-extrabold theme-heading">{worker.name}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold font-mono ${
                      worker.status === "Processing"
                        ? "bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 animate-pulse"
                        : "theme-card-subtle theme-muted"
                    }`}
                  >
                    {worker.status}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 text-xs theme-body">
                  {worker.currentJob ? (
                    <span className="text-amber-600 dark:text-amber-300 font-mono font-bold">Mengerjakan Task #{worker.currentJob}...</span>
                  ) : (
                    <span className="theme-muted">Standby (Idle)</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {completedJobs.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-bold theme-muted">Tugas Selesai Dikerjakan:</span>
              <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-32 overflow-y-auto">
                {completedJobs.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-mono flex items-center justify-between">
                    <span className="font-bold">✓ Task #{c.job}</span>
                    <span className="text-[10px] theme-muted">{c.worker}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Mutex vs Race Condition */}
      {activeTab === "mutex" && (
        <div className="theme-card rounded-3xl p-7 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold theme-heading">Demonstrasi Sync Mutex vs Data Race</h3>
              <p className="text-xs theme-muted mt-0.5">
                Lihat apa yang terjadi ketika 40 Goroutine mencoba menambah nilai counter tanpa dan dengan penguncian Mutex.
              </p>
            </div>

            <button
              onClick={handleSimulateRaceCondition}
              disabled={simulatingRace}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 disabled:opacity-50 transition-all hover:scale-105"
            >
              <Sparkles size={15} />
              <span>{simulatingRace ? "Mengeksekusi 40 Goroutine..." : "Tembak 40 Goroutine Sekaligus"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unsafe Card */}
            <div className="p-6 rounded-3xl bg-rose-500/[0.04] border border-rose-500/30 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-500 font-extrabold text-sm">
                  <AlertTriangle size={18} />
                  <span>Tanpa Mutex (Data Race)</span>
                </div>
                <span className="text-xs px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-300 font-mono font-bold">
                  Unsafe
                </span>
              </div>

              <p className="text-xs theme-body leading-relaxed">
                Beberapa goroutine membaca dan menulis memori serentak sehingga terjadi *Lost Updates* dan nilai akhir tidak konsisten.
              </p>

              <div className="theme-inset p-6 rounded-2xl border border-rose-500/20 text-center shadow-inner">
                <div className="text-5xl font-black text-rose-500 font-mono">{unsafeCounter} / 40</div>
                <div className="text-xs theme-muted mt-2 font-medium">Hasil Counter (Tidak Konsisten)</div>
              </div>
            </div>

            {/* Safe Mutex Card */}
            <div className="p-6 rounded-3xl bg-emerald-500/[0.04] border border-emerald-500/30 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-500 font-extrabold text-sm">
                  <CheckCircle2 size={18} />
                  <span>Dengan sync.Mutex (Aman)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-mono font-bold">
                  {isMutexLocked ? <Lock size={12} className="text-amber-500" /> : <Unlock size={12} className="text-emerald-500" />}
                  <span>{isMutexLocked ? "Locked" : "Unlocked"}</span>
                </div>
              </div>

              <p className="text-xs theme-body leading-relaxed">
                Setiap goroutine memanggil <code>mu.Lock()</code> sebelum memodifikasi counter dan <code>mu.Unlock()</code> setelahnya.
              </p>

              <div className="theme-inset p-6 rounded-2xl border border-emerald-500/20 text-center shadow-inner">
                <div className="text-5xl font-black text-emerald-500 font-mono">{safeCounter} / 40</div>
                <div className="text-xs theme-muted mt-2 font-medium">Hasil Counter (100% Sempurna)</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
