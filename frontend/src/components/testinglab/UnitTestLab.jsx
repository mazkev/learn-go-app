import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Plus,
  Trash2,
  Terminal,
  ShieldCheck,
  Percent,
  Check,
  AlertTriangle,
  Code2,
  FileCode,
  Sparkles,
  BookOpen,
  Zap,
  Sliders
} from "lucide-react";

export const TEST_SUITES = [
  {
    id: "discount",
    title: "1. E-Commerce Discount Engine (Table-Driven)",
    functionName: "HitungDiskon",
    targetFile: "internal/service/discount.go",
    testFile: "internal/service/discount_test.go",
    sourceCodeLines: [
      { line: 1, code: "package service", covered: true },
      { line: 2, code: "", covered: true },
      { line: 3, code: "func HitungDiskon(isMember bool, total float64) float64 {", covered: true },
      { line: 4, code: "    if total <= 0 {", covered: true, branchId: "negative" },
      { line: 5, code: "        return 0", covered: true, branchId: "negative" },
      { line: 6, code: "    }", covered: true },
      { line: 7, code: "    if isMember && total >= 100000 {", covered: true, branchId: "member_vip" },
      { line: 8, code: "        return total * 0.85 // Diskon 15% untuk VIP", covered: true, branchId: "member_vip" },
      { line: 9, code: "    }", covered: true },
      { line: 10, code: "    if isMember {", covered: true, branchId: "member_regular" },
      { line: 11, code: "        return total * 0.95 // Diskon 5% untuk Member Biasa", covered: true, branchId: "member_regular" },
      { line: 12, code: "    }", covered: true },
      { line: 13, code: "    return total // Non-Member harga normal", covered: true, branchId: "non_member" },
      { line: 14, code: "}", covered: true },
    ],
    cases: [
      {
        id: "c1",
        name: "VIP Member (Belanja >= 100rb)",
        isMember: true,
        total: 100000,
        expected: 85000,
        coveredBranch: "member_vip",
        active: true,
      },
      {
        id: "c2",
        name: "Member Biasa (Belanja < 100rb)",
        isMember: true,
        total: 50000,
        expected: 47500,
        coveredBranch: "member_regular",
        active: true,
      },
      {
        id: "c3",
        name: "Non-Member (Harga Normal)",
        isMember: false,
        total: 80000,
        expected: 80000,
        coveredBranch: "non_member",
        active: true,
      },
      {
        id: "c4",
        name: "Edge Case: Belanja Nol atau Negatif",
        isMember: true,
        total: -5000,
        expected: 0,
        coveredBranch: "negative",
        active: true,
      },
    ],
  },
  {
    id: "password",
    title: "2. Password Security Validator",
    functionName: "ValidasiPassword",
    targetFile: "internal/auth/validator.go",
    testFile: "internal/auth/validator_test.go",
    sourceCodeLines: [
      { line: 1, code: "package auth", covered: true },
      { line: 2, code: "", covered: true },
      { line: 3, code: "func ValidasiPassword(pwd string) bool {", covered: true },
      { line: 4, code: "    if len(pwd) < 8 {", covered: true, branchId: "too_short" },
      { line: 5, code: "        return false // Terlalu pendek", covered: true, branchId: "too_short" },
      { line: 6, code: "    }", covered: true },
      { line: 7, code: "    if pwd == \"password123\" || pwd == \"12345678\" {", covered: true, branchId: "blacklist" },
      { line: 8, code: "        return false // Password pasaran dilarang", covered: true, branchId: "blacklist" },
      { line: 9, code: "    }", covered: true },
      { line: 10, code: "    return true // Password lolos validasi", covered: true, branchId: "valid" },
      { line: 11, code: "}", covered: true },
    ],
    cases: [
      {
        id: "p1",
        name: "Password Kuat & Valid",
        pwd: "GopherMaster2026!",
        expected: true,
        coveredBranch: "valid",
        active: true,
      },
      {
        id: "p2",
        name: "Password Kurang dari 8 Karakter",
        pwd: "go123",
        expected: false,
        coveredBranch: "too_short",
        active: true,
      },
      {
        id: "p3",
        name: "Password Terlalu Pasaran (Blacklist)",
        pwd: "password123",
        expected: false,
        coveredBranch: "blacklist",
        active: true,
      },
    ],
  },
];

export default function UnitTestLab() {
  const [selectedSuiteId, setSelectedSuiteId] = useState("discount");
  const currentSuite = TEST_SUITES.find((s) => s.id === selectedSuiteId) || TEST_SUITES[0];

  const [testCases, setTestCases] = useState(currentSuite.cases);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [newCaseName, setNewCaseName] = useState("");
  const [newTotal, setNewTotal] = useState("150000");
  const [newIsMember, setNewIsMember] = useState(true);
  const [newExpected, setNewExpected] = useState("127500");

  const handleSwitchSuite = (suiteId) => {
    setSelectedSuiteId(suiteId);
    const suite = TEST_SUITES.find((s) => s.id === suiteId);
    if (suite) {
      setTestCases(suite.cases);
      setTestResults(null);
    }
  };

  const handleToggleCase = (id) => {
    setTestCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const handleDeleteCase = (id) => {
    setTestCases((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddDiscountCase = (e) => {
    e.preventDefault();
    if (!newCaseName.trim()) return;

    const totalVal = parseFloat(newTotal) || 0;
    const expVal = parseFloat(newExpected) || 0;

    let branch = "non_member";
    if (totalVal <= 0) branch = "negative";
    else if (newIsMember && totalVal >= 100000) branch = "member_vip";
    else if (newIsMember) branch = "member_regular";

    const newCase = {
      id: `custom-${Date.now()}`,
      name: newCaseName.trim(),
      isMember: newIsMember,
      total: totalVal,
      expected: expVal,
      coveredBranch: branch,
      active: true,
    };

    setTestCases((prev) => [...prev, newCase]);
    setNewCaseName("");
  };

  const handleRunTests = () => {
    setIsRunning(true);
    setTestResults(null);

    setTimeout(() => {
      const activeCases = testCases.filter((c) => c.active);
      const results = activeCases.map((tc) => {
        let actual;
        if (selectedSuiteId === "discount") {
          // Calculate actual
          if (tc.total <= 0) actual = 0;
          else if (tc.isMember && tc.total >= 100000) actual = tc.total * 0.85;
          else if (tc.isMember) actual = tc.total * 0.95;
          else actual = tc.total;
        } else {
          // Password Suite
          if (tc.pwd.length < 8) actual = false;
          else if (tc.pwd === "password123" || tc.pwd === "12345678") actual = false;
          else actual = true;
        }

        const passed = actual === tc.expected;
        return {
          ...tc,
          actual,
          passed,
        };
      });

      // Calculate coverage
      const coveredBranches = new Set(
        results.filter((r) => r.passed).map((r) => r.coveredBranch)
      );

      const totalBranches = selectedSuiteId === "discount" ? 4 : 3;
      const coveragePercent = Math.min(
        100,
        Math.round((coveredBranches.size / totalBranches) * 100)
      );

      setTestResults({
        items: results,
        allPassed: results.every((r) => r.passed),
        coveragePercent,
        coveredBranches: Array.from(coveredBranches),
        executionTime: "0.003s",
      });

      setIsRunning(false);
    }, 600);
  };

  const handleReset = () => {
    setTestCases(currentSuite.cases);
    setTestResults(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-bold text-xs uppercase tracking-wider mb-1.5">
            <ShieldCheck size={15} />
            <span>Interactive Test Runner & Coverage</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black theme-heading tracking-tight">
            Go <span className="gopher-gradient-text">Unit Testing & Code Coverage Lab</span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1 max-w-2xl leading-relaxed">
            Pahami skema pengujian bawaan Go: <code>*_test.go</code>, pola <em>Table-Driven Tests</em>, dan analisis cakupan kode (<em>Statement Coverage</em>) secara langsung.
          </p>
        </div>

        {/* Action Run Test Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl theme-card-subtle text-xs font-bold theme-muted hover:theme-heading cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw size={13} /> Reset
          </button>

          <button
            onClick={handleRunTests}
            disabled={isRunning || testCases.filter((c) => c.active).length === 0}
            className="w3-btn-green px-5 py-2 rounded-xl text-xs md:text-sm font-black flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            <Play size={14} className={isRunning ? "animate-spin" : "fill-white"} />
            <span>{isRunning ? "Running 'go test'..." : "Jalankan 'go test -v'"}</span>
          </button>
        </div>
      </div>

      {/* Suite Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TEST_SUITES.map((suite) => (
          <button
            key={suite.id}
            onClick={() => handleSwitchSuite(suite.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              selectedSuiteId === suite.id
                ? "bg-[#04AA6D] text-white shadow-sm"
                : "theme-card hover:border-[#04AA6D]/40 theme-heading"
            }`}
          >
            <FileCode size={14} />
            <span>{suite.title}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Left Source Code + Coverage Heatmap (5 Cols) vs Right Test Cases & Terminal (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Source Code with Line Coverage Heatmap */}
        <div className="lg:col-span-5 theme-card rounded-2xl p-5 space-y-4 shadow-md flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#04AA6D] font-bold uppercase tracking-wider block">
                Target Source Code
              </span>
              <h3 className="text-xs font-extrabold theme-heading font-mono">{currentSuite.targetFile}</h3>
            </div>

            {testResults && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#04AA6D]/15 text-[#04AA6D] text-xs font-bold font-mono">
                <Percent size={13} />
                <span>{testResults.coveragePercent}% Coverage</span>
              </div>
            )}
          </div>

          {/* Line-by-Line Code Display */}
          <div className="bg-slate-100 dark:bg-[#070d19] rounded-xl p-3 font-mono text-[11px] leading-relaxed border border-slate-200 dark:border-white/10 overflow-x-auto flex-1 shadow-inner">
            {currentSuite.sourceCodeLines.map((l) => {
              const isCovered =
                !testResults ||
                !l.branchId ||
                testResults.coveredBranches.includes(l.branchId);

              const isUncovered = testResults && l.branchId && !testResults.coveredBranches.includes(l.branchId);

              return (
                <div
                  key={l.line}
                  className={`flex items-center gap-3 px-1.5 py-0.5 rounded transition-colors ${
                    isUncovered
                      ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold"
                      : isCovered && testResults && l.branchId
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold"
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <span className="w-5 text-slate-400 select-none text-[10px] text-right font-mono shrink-0">
                    {l.line}
                  </span>
                  <pre className="m-0 font-mono">{l.code || " "}</pre>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl theme-inset text-[11px] theme-body space-y-1">
            <strong className="text-[#04AA6D] font-bold block">💡 Code Coverage Principle:</strong>
            <p className="theme-muted">
              Baris berwarna hijau menandakan percabangan <code>if/else</code> telah berhasil diuji oleh test case. Baris merah belum tersentuh pengujian!
            </p>
          </div>
        </div>

        {/* Right: Table-Driven Test Cases + Terminal Runner Output */}
        <div className="lg:col-span-7 space-y-6">
          {/* Test Case Table Manager */}
          <div className="theme-card rounded-2xl p-5 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#04AA6D] font-bold uppercase tracking-wider block">
                  Table-Driven Test Cases
                </span>
                <h3 className="text-xs font-extrabold theme-heading font-mono">{currentSuite.testFile}</h3>
              </div>
              <span className="text-[11px] font-mono theme-muted font-bold">
                {testCases.filter((c) => c.active).length} Kasus Aktif
              </span>
            </div>

            {/* List of Cases */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {testCases.map((tc) => (
                <div
                  key={tc.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${
                    tc.active
                      ? "theme-card hover:border-[#04AA6D]/40"
                      : "opacity-50 bg-slate-100 dark:bg-white/5 border-dashed"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={tc.active}
                      onChange={() => handleToggleCase(tc.id)}
                      className="w-4 h-4 accent-[#04AA6D] cursor-pointer"
                    />
                    <div>
                      <h4 className="font-extrabold theme-heading">{tc.name}</h4>
                      <p className="text-[10px] font-mono theme-muted">
                        {selectedSuiteId === "discount" ? (
                          <>Member: <code>{String(tc.isMember)}</code> | Total: <code>Rp {tc.total.toLocaleString()}</code> → Ekspektasi: <code>Rp {tc.expected.toLocaleString()}</code></>
                        ) : (
                          <>Input: <code>"{tc.pwd}"</code> → Ekspektasi: <code>{String(tc.expected)}</code></>
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteCase(tc.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Hapus Kasus Uji"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            {/* Form Tambah Test Case Khusus Discount */}
            {selectedSuiteId === "discount" && (
              <form onSubmit={handleAddDiscountCase} className="pt-3 border-t border-slate-200 dark:border-white/[0.08] space-y-3">
                <span className="text-[10px] font-extrabold theme-heading uppercase tracking-wider block">
                  + Tambah Skenario Uji Baru:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <input
                    type="text"
                    placeholder="Nama skenario uji..."
                    value={newCaseName}
                    onChange={(e) => setNewCaseName(e.target.value)}
                    className="sm:col-span-3 p-2 rounded-lg theme-input text-xs"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Total Belanja"
                    value={newTotal}
                    onChange={(e) => setNewTotal(e.target.value)}
                    className="p-2 rounded-lg theme-input text-xs font-mono"
                    required
                  />
                  <select
                    value={newIsMember ? "true" : "false"}
                    onChange={(e) => setNewIsMember(e.target.value === "true")}
                    className="p-2 rounded-lg theme-input text-xs"
                  >
                    <option value="true">Status: Member</option>
                    <option value="false">Status: Non-Member</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Ekspektasi Output"
                    value={newExpected}
                    onChange={(e) => setNewExpected(e.target.value)}
                    className="p-2 rounded-lg theme-input text-xs font-mono"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-[#04AA6D]/15 text-[#04AA6D] hover:bg-[#04AA6D] hover:text-white transition-colors text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Tambahkan Kasus ke Tabel</span>
                </button>
              </form>
            )}
          </div>

          {/* Terminal Test Results Window */}
          <div className="theme-card rounded-2xl p-5 space-y-3 shadow-md bg-slate-900 text-slate-100 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#04AA6D]" />
                <span className="text-xs font-mono font-bold text-slate-300">Terminal: go test -v -cover</span>
              </div>

              {testResults && (
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    testResults.allPassed
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  {testResults.allPassed ? "PASS ✓" : "FAIL ✗"}
                </span>
              )}
            </div>

            <div className="font-mono text-xs space-y-1 overflow-x-auto max-h-48">
              {!testResults ? (
                <p className="text-slate-500 italic">
                  Klik tombol hijau "Jalankan 'go test -v'" di pojok kanan atas untuk mengeksekusi suite pengujian...
                </p>
              ) : (
                <div className="space-y-1">
                  <p className="text-slate-400">=== RUN   Test{currentSuite.functionName}</p>
                  {testResults.items.map((r, i) => (
                    <p key={i} className={r.passed ? "text-emerald-400" : "text-rose-400 font-bold"}>
                      {r.passed
                        ? `  --- PASS: Test${currentSuite.functionName}/${r.name.replace(/\s+/g, "_")} (${testResults.executionTime})`
                        : `  --- FAIL: Test${currentSuite.functionName}/${r.name.replace(/\s+/g, "_")} (Ekspektasi: ${r.expected}, Dapat: ${r.actual})`}
                    </p>
                  ))}
                  <p className={testResults.allPassed ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {testResults.allPassed ? "PASS" : "FAIL"}
                  </p>
                  <p className="text-amber-400">
                    coverage: {testResults.coveragePercent}.0% of statements
                  </p>
                  <p className="text-slate-400">
                    ok      myproject/{currentSuite.targetFile.replace(/\/[^/]+$/, "")}    {testResults.executionTime}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
