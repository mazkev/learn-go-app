import React, { useState } from "react";
import {
  Globe,
  Send,
  CheckCircle2,
  Server
} from "lucide-react";

export default function APITester() {
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("/api/gophers");
  const [requestBody, setRequestBody] = useState(
    JSON.stringify({ name: "Gopher Gamma", role: "Cloud Specialist", level: 4 }, null, 2)
  );

  const [dbData, setDbData] = useState([
    { id: 1, name: "Gopher Alpha", role: "Backend Architect", level: 5 },
    { id: 2, name: "Gopher Beta", role: "Concurrency Engineer", level: 3 },
  ]);

  const [response, setResponse] = useState({
    status: 200,
    statusText: "OK",
    timeMs: 12,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Server": "Go net/http Server (v1.22+)",
      "X-Powered-By": "GoLearn REST Engine",
    },
    body: {
      code: 200,
      message: "Daftar gophers berhasil diambil",
      data: [
        { id: 1, name: "Gopher Alpha", role: "Backend Architect", level: 5 },
        { id: 2, name: "Gopher Beta", role: "Concurrency Engineer", level: 3 },
      ],
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = () => {
    setIsLoading(true);

    setTimeout(() => {
      let resStatus = 200;
      let resText = "OK";
      let resData = null;
      let resMsg = "";

      if (endpoint === "/api/health") {
        resData = { uptime: "99.99%", status: "Healthy 🚀" };
        resMsg = "Server berjalan normal";
      } else if (endpoint === "/api/gophers") {
        if (method === "GET") {
          resData = dbData;
          resMsg = `Berhasil memuat ${dbData.length} records`;
        } else if (method === "POST") {
          try {
            const parsed = JSON.parse(requestBody);
            const newItem = { id: dbData.length + 1, ...parsed };
            const updated = [...dbData, newItem];
            setDbData(updated);
            resStatus = 201;
            resText = "Created";
            resData = newItem;
            resMsg = "Data Gopher baru berhasil dibuat";
          } catch (e) {
            resStatus = 400;
            resText = "Bad Request";
            resMsg = "Invalid JSON Body: " + e.message;
          }
        }
      } else if (endpoint.startsWith("/api/gophers/")) {
        const id = parseInt(endpoint.replace("/api/gophers/", ""), 10);
        const item = dbData.find((x) => x.id === id);

        if (!item) {
          resStatus = 404;
          resText = "Not Found";
          resMsg = `Gopher dengan ID ${id} tidak ditemukan`;
        } else if (method === "GET") {
          resData = item;
          resMsg = `Detail Gopher ID ${id}`;
        } else if (method === "DELETE") {
          setDbData((prev) => prev.filter((x) => x.id !== id));
          resData = { deletedId: id };
          resMsg = `Gopher ID ${id} berhasil dihapus`;
        }
      } else {
        resStatus = 404;
        resText = "Not Found";
        resMsg = "Endpoint route tidak terdaftar di ServeMux";
      }

      setResponse({
        status: resStatus,
        statusText: resText,
        timeMs: Math.floor(Math.random() * 20) + 8,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Server": "Go net/http Server (v1.22+)",
          "X-Powered-By": "GoLearn REST Engine",
        },
        body: {
          code: resStatus,
          message: resMsg,
          data: resData,
        },
      });

      setIsLoading(false);
    }, 150);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-bold text-xs uppercase tracking-wider mb-1.5">
            <Globe size={14} />
            <span>Interactive REST API Client</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black theme-heading tracking-tight">
            Go <span className="gopher-gradient-text">REST API Tester</span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1">
            Uji coba endpoint HTTP yang dibangun dengan <code>net/http</code> dan ServeMux Go secara interaktif.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setMethod("GET");
              setEndpoint("/api/gophers");
            }}
            className="px-3 py-1.5 rounded-lg bg-[#04AA6D]/10 border border-[#04AA6D]/30 text-[#04AA6D] text-xs font-mono font-bold hover:bg-[#04AA6D]/20 transition-all cursor-pointer"
          >
            GET /api/gophers
          </button>
          <button
            onClick={() => {
              setMethod("POST");
              setEndpoint("/api/gophers");
            }}
            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-500/20 transition-all cursor-pointer"
          >
            POST /api/gophers
          </button>
          <button
            onClick={() => {
              setMethod("GET");
              setEndpoint("/api/gophers/1");
            }}
            className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 text-xs font-mono font-bold hover:bg-purple-500/20 transition-all cursor-pointer"
          >
            GET /api/gophers/1
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Request Builder (6 cols) */}
        <div className="lg:col-span-6 theme-card rounded-2xl p-6 space-y-5 shadow-md">
          <h3 className="text-base font-extrabold theme-heading flex items-center gap-2">
            <Send size={16} className="text-[#04AA6D]" /> HTTP Request Builder
          </h3>

          {/* Method & URL Input */}
          <div className="flex items-center gap-2 theme-inset p-2 rounded-xl shadow-inner">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className={`font-black font-mono text-xs px-3 py-2 rounded-lg bg-transparent focus:outline-none ${
                method === "GET"
                  ? "text-sky-600 dark:text-sky-400 bg-sky-500/15"
                  : method === "POST"
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/15"
                  : method === "DELETE"
                  ? "text-rose-600 dark:text-rose-400 bg-rose-500/15"
                  : "text-amber-600 dark:text-amber-400 bg-amber-500/15"
              }`}
            >
              <option value="GET" className="bg-white dark:bg-[#0e1626] text-slate-900 dark:text-white">GET</option>
              <option value="POST" className="bg-white dark:bg-[#0e1626] text-slate-900 dark:text-white">POST</option>
              <option value="DELETE" className="bg-white dark:bg-[#0e1626] text-slate-900 dark:text-white">DELETE</option>
            </select>

            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/api/..."
              className="flex-1 bg-transparent font-mono text-xs theme-heading px-2 focus:outline-none"
            />

            <button
              onClick={handleSendRequest}
              disabled={isLoading}
              className="w3-btn-green px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Send size={13} />
              <span>{isLoading ? "Sending..." : "Send"}</span>
            </button>
          </div>

          {/* Request Body Editor */}
          {method === "POST" && (
            <div className="space-y-2">
              <span className="text-xs theme-muted font-bold">Request Body (JSON):</span>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                rows={6}
                className="w-full bg-slate-100 dark:bg-[#070d19] text-slate-800 dark:text-emerald-400 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-mono text-xs focus:outline-none focus:border-[#04AA6D] shadow-inner leading-relaxed"
              />
            </div>
          )}

          {/* Go Route Handler Preview */}
          <div className="p-4 rounded-xl theme-card-subtle space-y-2 text-xs theme-body">
            <span className="font-bold text-[#04AA6D] flex items-center gap-1.5">
              <Server size={14} /> Go Route Handler Preview:
            </span>
            <pre className="font-mono text-[11px] bg-slate-100 dark:bg-[#070d19] text-slate-800 dark:text-slate-200 p-3 rounded-lg border border-slate-200 dark:border-white/10 overflow-x-auto">
{`mux := http.NewServeMux()
mux.HandleFunc("${method} ${endpoint}", func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
})`}
            </pre>
          </div>
        </div>

        {/* Right: Response Viewer (6 cols) */}
        <div className="lg:col-span-6 theme-card rounded-2xl p-6 space-y-5 flex flex-col shadow-md">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
            <h3 className="text-base font-extrabold theme-heading flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#04AA6D]" /> HTTP Response
            </h3>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                  response.status >= 200 && response.status < 300
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40"
                    : "bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40"
                }`}
              >
                {response.status} {response.statusText}
              </span>
              <span className="text-[11px] font-mono theme-muted font-bold">⏱ {response.timeMs}ms</span>
            </div>
          </div>

          {/* Response Headers */}
          <div className="space-y-1.5">
            <span className="text-[11px] theme-muted font-bold uppercase tracking-wider">Headers:</span>
            <div className="theme-inset p-3 rounded-xl font-mono text-[11px] theme-body space-y-0.5 shadow-inner">
              {Object.entries(response.headers).map(([k, v]) => (
                <div key={k}>
                  <span className="text-[#04AA6D] font-bold">{k}</span>: {v}
                </div>
              ))}
            </div>
          </div>

          {/* Response JSON Body */}
          <div className="space-y-1.5 flex-1 flex flex-col min-h-0">
            <span className="text-[11px] theme-muted font-bold uppercase tracking-wider">Response JSON Body:</span>
            <div className="bg-slate-100 dark:bg-[#070d19] text-slate-800 dark:text-emerald-400 p-4 rounded-xl border border-slate-200 dark:border-white/10 font-mono text-xs overflow-y-auto flex-1 max-h-[300px] shadow-inner leading-relaxed">
              <pre>{JSON.stringify(response.body, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
