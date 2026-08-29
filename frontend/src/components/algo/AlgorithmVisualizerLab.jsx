import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Activity,
  Code2,
  Sparkles,
  BarChart2,
  GitGraph,
  Compass,
  ArrowRight,
  CheckCircle2,
  Zap,
  Layers,
  ChevronRight,
  TrendingUp
} from "lucide-react";

export default function AlgorithmVisualizerLab() {
  const [activeTab, setActiveTab] = useState("sorting"); // "sorting" | "pathfinding" | "tree"

  // ==========================================
  // 1. SORTING VISUALIZER STATE & LOGIC
  // ==========================================
  const [arraySize, setArraySize] = useState(25);
  const [speedMs, setSpeedMs] = useState(40);
  const [selectedAlgo, setSelectedAlgo] = useState("quick"); // "bubble", "quick", "merge", "insertion"
  const [arrayBars, setArrayBars] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]); // indices being compared/swapped
  const [sortedIndices, setSortedIndices] = useState([]);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, timeElapsed: 0 });

  const abortControllerRef = useRef(false);

  // Generate random array
  const generateRandomArray = (size = arraySize) => {
    abortControllerRef.current = true;
    setIsSorting(false);
    setActiveIndices([]);
    setSortedIndices([]);
    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0 });

    const newArr = [];
    for (let i = 0; i < size; i++) {
      newArr.push(Math.floor(Math.random() * 85) + 12);
    }
    setArrayBars(newArr);
  };

  useEffect(() => {
    generateRandomArray(arraySize);
  }, [arraySize]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // --- BUBBLE SORT ---
  const runBubbleSort = async () => {
    const arr = [...arrayBars];
    let comps = 0;
    let swaps = 0;
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (abortControllerRef.current) return;
        comps++;
        setActiveIndices([j, j + 1]);
        setStats((prev) => ({ ...prev, comparisons: comps, swaps }));

        if (arr[j] > arr[j + 1]) {
          swaps++;
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArrayBars([...arr]);
          setStats((prev) => ({ ...prev, comparisons: comps, swaps }));
        }
        await sleep(speedMs);
      }
      setSortedIndices((prev) => [...prev, n - 1 - i]);
    }
    setSortedIndices(arr.map((_, i) => i));
    setActiveIndices([]);
    setIsSorting(false);
  };

  // --- INSERTION SORT ---
  const runInsertionSort = async () => {
    const arr = [...arrayBars];
    let comps = 0;
    let swaps = 0;

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        if (abortControllerRef.current) return;
        comps++;
        swaps++;
        setActiveIndices([j, j + 1]);
        arr[j + 1] = arr[j];
        setArrayBars([...arr]);
        setStats({ comparisons: comps, swaps, timeElapsed: 0 });
        j = j - 1;
        await sleep(speedMs);
      }
      arr[j + 1] = key;
      setArrayBars([...arr]);
      setSortedIndices(Array.from({ length: i + 1 }, (_, k) => k));
    }
    setSortedIndices(arr.map((_, i) => i));
    setActiveIndices([]);
    setIsSorting(false);
  };

  // --- QUICK SORT ---
  const runQuickSort = async () => {
    const arr = [...arrayBars];
    let comps = 0;
    let swaps = 0;

    const partition = async (low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (abortControllerRef.current) return;
        comps++;
        setActiveIndices([j, high]);
        setStats({ comparisons: comps, swaps, timeElapsed: 0 });

        if (arr[j] < pivot) {
          i++;
          swaps++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArrayBars([...arr]);
          setStats({ comparisons: comps, swaps, timeElapsed: 0 });
        }
        await sleep(speedMs);
      }
      swaps++;
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArrayBars([...arr]);
      await sleep(speedMs);
      return i + 1;
    };

    const quickSortHelper = async (low, high) => {
      if (low < high) {
        if (abortControllerRef.current) return;
        const pi = await partition(low, high);
        setSortedIndices((prev) => [...prev, pi]);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      } else if (low >= 0 && low === high) {
        setSortedIndices((prev) => [...prev, low]);
      }
    };

    await quickSortHelper(0, arr.length - 1);
    setSortedIndices(arr.map((_, i) => i));
    setActiveIndices([]);
    setIsSorting(false);
  };

  const handleStartSort = () => {
    if (isSorting) {
      abortControllerRef.current = true;
      setIsSorting(false);
      return;
    }

    abortControllerRef.current = false;
    setIsSorting(true);
    setSortedIndices([]);
    setActiveIndices([]);

    if (selectedAlgo === "bubble") runBubbleSort();
    else if (selectedAlgo === "insertion") runInsertionSort();
    else if (selectedAlgo === "quick") runQuickSort();
  };

  // ==========================================
  // 2. PATHFINDING MAZE STATE & LOGIC
  // ==========================================
  const GRID_ROWS = 12;
  const GRID_COLS = 22;
  const [grid, setGrid] = useState(() => {
    const initial = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      const row = [];
      for (let c = 0; c < GRID_COLS; c++) {
        row.push({
          r,
          c,
          isStart: r === 5 && c === 3,
          isEnd: r === 5 && c === 18,
          isWall: false,
          isVisited: false,
          isPath: false,
        });
      }
      initial.push(row);
    }
    return initial;
  });
  const [isFindingPath, setIsFindingPath] = useState(false);
  const [pathStats, setPathStats] = useState({ visitedCount: 0, pathLength: 0 });

  const toggleWall = (r, c) => {
    if (isFindingPath) return;
    setGrid((prev) => {
      const next = prev.map((row) => row.map((cell) => ({ ...cell })));
      if (!next[r][c].isStart && !next[r][c].isEnd) {
        next[r][c].isWall = !next[r][c].isWall;
      }
      return next;
    });
  };

  const resetPathfinding = () => {
    setIsFindingPath(false);
    setPathStats({ visitedCount: 0, pathLength: 0 });
    setGrid((prev) =>
      prev.map((row) =>
        row.map((cell) => ({
          ...cell,
          isVisited: false,
          isPath: false,
        }))
      )
    );
  };

  const runBFSPathfinding = async () => {
    resetPathfinding();
    setIsFindingPath(true);

    const start = { r: 5, c: 3 };
    const end = { r: 5, c: 18 };

    const queue = [[start]];
    const visited = new Set([`${start.r}-${start.c}`]);
    let visitedCount = 0;

    while (queue.length > 0) {
      const currentPath = queue.shift();
      const current = currentPath[currentPath.length - 1];

      if (current.r === end.r && current.c === end.c) {
        // Path found! Animate shortest path
        for (const node of currentPath) {
          setGrid((prev) => {
            const next = prev.map((row) => [...row]);
            if (!next[node.r][node.c].isStart && !next[node.r][node.c].isEnd) {
              next[node.r][node.c].isPath = true;
            }
            return next;
          });
          await sleep(25);
        }
        setPathStats({ visitedCount, pathLength: currentPath.length });
        setIsFindingPath(false);
        return;
      }

      // Check neighbors (Up, Down, Left, Right)
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];

      for (const [dr, dc] of directions) {
        const nr = current.r + dr;
        const nc = current.c + dc;
        const key = `${nr}-${nc}`;

        if (
          nr >= 0 &&
          nr < GRID_ROWS &&
          nc >= 0 &&
          nc < GRID_COLS &&
          !visited.has(key) &&
          !grid[nr][nc].isWall
        ) {
          visited.add(key);
          visitedCount++;
          queue.push([...currentPath, { r: nr, c: nc }]);

          // Animate search exploration
          setGrid((prev) => {
            const next = prev.map((row) => [...row]);
            if (!next[nr][nc].isStart && !next[nr][nc].isEnd) {
              next[nr][nc].isVisited = true;
            }
            return next;
          });
          setPathStats({ visitedCount, pathLength: 0 });
          await sleep(15);
        }
      }
    }
    setIsFindingPath(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-6 py-6 space-y-6 pb-28">
      {/* 1. Studio Header */}
      <div className="bg-white dark:bg-[#162032] p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-mono font-bold text-xs uppercase tracking-wider mb-1">
            <Activity size={15} />
            <span>Interactive Data Structures & Algorithm Studio</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Algorithm Step-by-Step Visualizer
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Saksikan proses kerja internal algoritma sorting dan graf pathfinding secara visual, frame demi frame dengan visualisasi interaktif.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-black/30 rounded-2xl border border-slate-200 dark:border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab("sorting")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "sorting"
                ? "bg-[#04AA6D] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BarChart2 size={14} />
            <span>Sorting Race</span>
          </button>

          <button
            onClick={() => setActiveTab("pathfinding")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "pathfinding"
                ? "bg-[#04AA6D] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Compass size={14} />
            <span>Grid Pathfinding</span>
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* VIEW 1: SORTING RACE VISUALIZER           */}
      {/* ========================================== */}
      {activeTab === "sorting" && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white dark:bg-[#162032] p-4 md:p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs flex flex-wrap items-center justify-between gap-4">
            {/* Algorithm Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500">Algoritma:</span>
              <select
                value={selectedAlgo}
                onChange={(e) => setSelectedAlgo(e.target.value)}
                disabled={isSorting}
                className="bg-slate-100 dark:bg-black/30 font-bold text-xs p-2 rounded-xl text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 cursor-pointer disabled:opacity-50"
              >
                <option value="quick">⚡ Quick Sort (O(n log n) - Tercepat)</option>
                <option value="bubble">🫧 Bubble Sort (O(n²) - Sederhana)</option>
                <option value="insertion">🃏 Insertion Sort (O(n²) - Adaptif)</option>
              </select>
            </div>

            {/* Sliders: Size & Speed */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">Jumlah Data: {arraySize}</span>
                <input
                  type="range"
                  min="15"
                  max="45"
                  value={arraySize}
                  disabled={isSorting}
                  onChange={(e) => setArraySize(parseInt(e.target.value))}
                  className="w-24 accent-[#04AA6D] cursor-pointer disabled:opacity-50"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">Kecepatan: {speedMs}ms</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={speedMs}
                  onChange={(e) => setSpeedMs(parseInt(e.target.value))}
                  className="w-24 accent-[#04AA6D] cursor-pointer"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => generateRandomArray()}
                disabled={isSorting}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-black/30 hover:bg-slate-200 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RotateCcw size={13} />
                <span>Acak Ulang</span>
              </button>

              <button
                onClick={handleStartSort}
                className={`px-5 py-2 rounded-xl font-mono font-bold text-xs text-white transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                  isSorting ? "bg-amber-600 hover:bg-amber-700" : "bg-[#04AA6D] hover:bg-[#038857]"
                }`}
              >
                {isSorting ? <Pause size={14} /> : <Play size={14} className="fill-white" />}
                <span>{isSorting ? "Jeda / Stop" : "Mulai Visualisasi"}</span>
              </button>
            </div>
          </div>

          {/* Telemetry Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-[#162032] p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Perbandingan (Comparisons)</span>
              <div className="text-lg font-black text-amber-500 font-mono">{stats.comparisons.toLocaleString()}</div>
            </div>
            <div className="bg-white dark:bg-[#162032] p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Pertukaran Posisi (Swaps)</span>
              <div className="text-lg font-black text-rose-500 font-mono">{stats.swaps.toLocaleString()}</div>
            </div>
            <div className="bg-white dark:bg-[#162032] p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Kompleksitas Rata-rata</span>
              <div className="text-lg font-black text-emerald-500 font-mono">
                {selectedAlgo === "quick" ? "O(n log n)" : "O(n²)"}
              </div>
            </div>
            <div className="bg-white dark:bg-[#162032] p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Status Sorting</span>
              <div className="text-xs font-black font-mono mt-1">
                {isSorting ? (
                  <span className="text-amber-500 animate-pulse">⚡ Sedang Mengurutkan...</span>
                ) : sortedIndices.length === arrayBars.length ? (
                  <span className="text-[#04AA6D]">✓ Selesai Terurut Rapi!</span>
                ) : (
                  <span className="text-slate-400">Siap Dijalankan</span>
                )}
              </div>
            </div>
          </div>

          {/* Bar Chart Display Canvas */}
          <div className="bg-white dark:bg-[#162032] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs h-[380px] flex items-end justify-center gap-1.5 sm:gap-2">
            {arrayBars.map((val, idx) => {
              const isActive = activeIndices.includes(idx);
              const isSorted = sortedIndices.includes(idx);

              let barColor = "#38bdf8"; // default cyan
              if (isActive) barColor = "#f59e0b"; // comparing amber
              if (isSorted) barColor = "#10b981"; // sorted emerald

              return (
                <div
                  key={idx}
                  className="flex-1 rounded-t-lg transition-all duration-75 relative group flex flex-col justify-end items-center"
                  style={{
                    height: `${val}%`,
                    backgroundColor: barColor,
                  }}
                >
                  <span className="text-[9px] font-mono font-bold text-slate-700 dark:text-slate-200 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {val}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Color Legend */}
          <div className="flex items-center justify-center gap-6 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#38bdf8]" /> Belum Terurut
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]" /> Sedang Dibandingkan (Active)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#10b981]" /> Sudah Selesai (Sorted)
            </span>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* VIEW 2: GRID PATHFINDING MAZE             */}
      {/* ========================================== */}
      {activeTab === "pathfinding" && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white dark:bg-[#162032] p-4 md:p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                Breadth-First Search (BFS) & Shortest Path Finder
              </span>
              <p className="text-[11px] text-slate-500">
                Klik kotak pada grid untuk membuat/menghapus dinding rintangan (Wall Obstacle).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetPathfinding}
                disabled={isFindingPath}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-black/30 hover:bg-slate-200 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <RotateCcw size={13} /> Reset Jalur
              </button>

              <button
                onClick={runBFSPathfinding}
                disabled={isFindingPath}
                className="px-5 py-2 rounded-xl bg-[#04AA6D] hover:bg-[#038857] text-white font-mono font-bold text-xs transition-all flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Play size={14} className="fill-white" />
                <span>Mulai Cari Rute Terpendek</span>
              </button>
            </div>
          </div>

          {/* Telemetry Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-[#162032] p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Node Dikunjungi</span>
              <div className="text-lg font-black text-purple-500 font-mono">{pathStats.visitedCount}</div>
            </div>
            <div className="bg-white dark:bg-[#162032] p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Panjang Rute Optimal</span>
              <div className="text-lg font-black text-[#04AA6D] font-mono">{pathStats.pathLength} Langkah</div>
            </div>
            <div className="bg-white dark:bg-[#162032] p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Titik Awal (Start)</span>
              <div className="text-xs font-bold text-emerald-500 font-mono mt-1">🟢 Hijau (Baris 5, Kolom 3)</div>
            </div>
            <div className="bg-white dark:bg-[#162032] p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Titik Target (End)</span>
              <div className="text-xs font-bold text-rose-500 font-mono mt-1">🔴 Merah (Baris 5, Kolom 18)</div>
            </div>
          </div>

          {/* Interactive Grid Canvas */}
          <div className="bg-white dark:bg-[#162032] p-4 md:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs overflow-x-auto">
            <div className="inline-grid gap-1 bg-slate-100 dark:bg-black/40 p-2 rounded-2xl border border-slate-200 dark:border-white/5 mx-auto">
              {grid.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1">
                  {row.map((cell) => {
                    let cellColor = "bg-white dark:bg-[#162032]";
                    if (cell.isStart) cellColor = "bg-emerald-500 shadow-sm";
                    else if (cell.isEnd) cellColor = "bg-rose-500 shadow-sm";
                    else if (cell.isWall) cellColor = "bg-slate-800 dark:bg-slate-300";
                    else if (cell.isPath) cellColor = "bg-amber-400 animate-pulse";
                    else if (cell.isVisited) cellColor = "bg-purple-500/25";

                    return (
                      <div
                        key={`${cell.r}-${cell.c}`}
                        onClick={() => toggleWall(cell.r, cell.c)}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md cursor-pointer transition-all ${cellColor} hover:scale-105 border border-slate-200/50 dark:border-white/5`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
