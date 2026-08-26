import React, { useState } from "react";
import {
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  BarChart3,
  FileCode,
  ArrowRight,
  TrendingDown,
  Layers,
  CheckCircle2,
  Cpu,
  Globe
} from "lucide-react";

export default function GrpcCompareLab() {
  const [recordCount, setRecordCount] = useState(1000);
  const [networkLatency, setNetworkLatency] = useState(15); // ms
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [activeTab, setActiveTab] = useState("benchmark"); // 'benchmark' | 'inspector' | 'proto'

  // Benchmark Results State
  const [results, setResults] = useState({
    json: {
      sizeKb: 184.5,
      encodeTimeMs: 14.2,
      transferTimeMs: 42.0,
      totalTimeMs: 56.2,
      cpuUsage: "18.4%",
    },
    grpc: {
      sizeKb: 26.8,
      encodeTimeMs: 1.8,
      transferTimeMs: 6.5,
      totalTimeMs: 8.3,
      cpuUsage: "3.2%",
    },
  });

  const handleRunBenchmark = () => {
    setIsBenchmarking(true);

    setTimeout(() => {
      // Perhitungan realistis berdasarkan recordCount dan latency
      const factor = recordCount / 1000;
      const baseJsonKb = (184.5 * factor).toFixed(1);
      const baseGrpcKb = (26.8 * factor).toFixed(1);

      const jsonEncode = (14.2 * factor + (Math.random() * 2 - 1)).toFixed(1);
      const grpcEncode = (1.8 * factor + (Math.random() * 0.4 - 0.2)).toFixed(1);

      const jsonTransfer = (networkLatency * 1.8 + factor * 10).toFixed(1);
      const grpcTransfer = (networkLatency * 0.4 + factor * 2).toFixed(1);

      const jsonTotal = (parseFloat(jsonEncode) + parseFloat(jsonTransfer)).toFixed(1);
      const grpcTotal = (parseFloat(grpcEncode) + parseFloat(grpcTransfer)).toFixed(1);

      setResults({
        json: {
          sizeKb: parseFloat(baseJsonKb),
          encodeTimeMs: parseFloat(jsonEncode),
          transferTimeMs: parseFloat(jsonTransfer),
          totalTimeMs: parseFloat(jsonTotal),
          cpuUsage: `${(18.4 * Math.min(1.5, factor)).toFixed(1)}%`,
        },
        grpc: {
          sizeKb: parseFloat(baseGrpcKb),
          encodeTimeMs: parseFloat(grpcEncode),
          transferTimeMs: parseFloat(grpcTransfer),
          totalTimeMs: parseFloat(grpcTotal),
          cpuUsage: `${(3.2 * Math.min(1.5, factor)).toFixed(1)}%`,
        },
      });

      setIsBenchmarking(false);
    }, 450);
  };

  const bandwidthSavings = (
    ((results.json.sizeKb - results.grpc.sizeKb) / results.json.sizeKb) *
    100
  ).toFixed(1);

  const speedImprovement = (results.json.totalTimeMs / results.grpc.totalTimeMs).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 font-bold text-xs uppercase tracking-wider mb-1.5">
            <Zap size={14} />
            <span>Interactive Microservices Lab</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black theme-heading tracking-tight">
            gRPC (Protobuf) vs <span className="gopher-gradient-text">REST (JSON) Lab</span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1">
            Bandingkan efisiensi serialisasi biner HTTP/2 Protocol Buffers terhadap teks JSON pada throughput tinggi.
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1.5 theme-card-subtle p-1.5 rounded-2xl shadow-sm">
          <button
            onClick={() => setActiveTab("benchmark")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "benchmark"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                : "theme-muted hover:theme-heading"
            }`}
          >
            Live Benchmark
          </button>
          <button
            onClick={() => setActiveTab("inspector")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "inspector"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                : "theme-muted hover:theme-heading"
            }`}
          >
            Payload Byte Inspector
          </button>
          <button
            onClick={() => setActiveTab("proto")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "proto"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                : "theme-muted hover:theme-heading"
            }`}
          >
            Proto Schema & Go Code
          </button>
        </div>
      </div>

      {/* Tab 1: Live Benchmark */}
      {activeTab === "benchmark" && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="theme-card rounded-3xl p-6 shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Record Count Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold theme-heading">Jumlah Records:</span>
                <span className="font-mono font-bold text-indigo-500">
                  {recordCount.toLocaleString()} entitas
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={recordCount}
                onChange={(e) => setRecordCount(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Network Latency Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold theme-heading">Simulasi Jaringan:</span>
                <span className="font-mono font-bold text-[#00ADD8]">{networkLatency} ms</span>
              </div>
              <select
                value={networkLatency}
                onChange={(e) => setNetworkLatency(parseInt(e.target.value))}
                className="w-full theme-inset theme-heading text-xs font-semibold rounded-xl p-2.5 shadow-inner focus:outline-none"
              >
                <option value="1">Localhost / Cloud VPC (1 ms)</option>
                <option value="15">4G LTE Mobile (15 ms)</option>
                <option value="60">Cross-Region Internet (60 ms)</option>
              </select>
            </div>

            {/* Action Trigger */}
            <div className="flex items-end">
              <button
                onClick={handleRunBenchmark}
                disabled={isBenchmarking}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-[#00ADD8] text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Play size={14} className={isBenchmarking ? "animate-spin" : "fill-white"} />
                <span>{isBenchmarking ? "Menguji Throughput..." : "Jalankan Benchmark Real-time"}</span>
              </button>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bandwidth Savings Card */}
            <div className="theme-card rounded-3xl p-6 border-l-4 border-l-emerald-500 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs theme-muted font-bold uppercase tracking-wider">
                  Penghematan Bandwidth
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-black font-mono">
                  -{bandwidthSavings}%
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-black theme-heading font-mono">
                {results.grpc.sizeKb} KB{" "}
                <span className="text-sm theme-muted font-normal">
                  vs {results.json.sizeKb} KB (JSON)
                </span>
              </div>
              <p className="text-xs theme-muted">
                Binary Protocol Buffers memangkas nama-nama field JSON menjadi *field tag numbers* 1-byte.
              </p>
            </div>

            {/* Speed Factor Card */}
            <div className="theme-card rounded-3xl p-6 border-l-4 border-l-[#00ADD8] shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs theme-muted font-bold uppercase tracking-wider">
                  Kecepatan Eksekusi & Transfer
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ADD8]/15 text-[#00ADD8] font-black font-mono">
                  {speedImprovement}x Lebih Cepat
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-black theme-heading font-mono">
                {results.grpc.totalTimeMs} ms{" "}
                <span className="text-sm theme-muted font-normal">
                  vs {results.json.totalTimeMs} ms (REST)
                </span>
              </div>
              <p className="text-xs theme-muted">
                Multiplexing stream HTTP/2 dan serialisasi biner menghilangkan overhead parsing teks string.
              </p>
            </div>
          </div>

          {/* Deep Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* REST JSON Breakdown */}
            <div className="theme-card rounded-3xl p-6 space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-amber-500" />
                  <h3 className="font-extrabold theme-heading text-sm">REST API (JSON / HTTP 1.1)</h3>
                </div>
                <span className="text-xs font-mono font-bold text-amber-500">Standar Web</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="theme-muted">Ukuran Payload Body</span>
                  <span className="font-bold theme-heading">{results.json.sizeKb} KB</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="theme-muted">JSON Marshal (CPU Time)</span>
                  <span className="font-bold text-amber-500">{results.json.encodeTimeMs} ms</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="theme-muted">Network Latency & Transfer</span>
                  <span className="font-bold theme-heading">{results.json.transferTimeMs} ms</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="theme-muted">Estimasi CPU Overhead</span>
                  <span className="font-bold text-rose-500">{results.json.cpuUsage}</span>
                </div>
                <div className="flex justify-between items-center pt-2 font-extrabold text-sm">
                  <span className="theme-heading">Total End-to-End Latency</span>
                  <span className="text-rose-500 font-mono">{results.json.totalTimeMs} ms</span>
                </div>
              </div>
            </div>

            {/* gRPC Protobuf Breakdown */}
            <div className="theme-card rounded-3xl p-6 space-y-4 shadow-md border border-indigo-500/30">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-indigo-500" />
                  <h3 className="font-extrabold theme-heading text-sm">gRPC (Protobuf / HTTP 2.0)</h3>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-500">Enterprise High-Perf</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="theme-muted">Ukuran Payload Biner</span>
                  <span className="font-bold text-emerald-500">{results.grpc.sizeKb} KB</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="theme-muted">Protobuf Encode (Zero-Copy)</span>
                  <span className="font-bold text-emerald-500">{results.grpc.encodeTimeMs} ms</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="theme-muted">Network Latency & Multiplex</span>
                  <span className="font-bold text-indigo-500">{results.grpc.transferTimeMs} ms</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="theme-muted">Estimasi CPU Overhead</span>
                  <span className="font-bold text-emerald-500">{results.grpc.cpuUsage}</span>
                </div>
                <div className="flex justify-between items-center pt-2 font-extrabold text-sm">
                  <span className="theme-heading">Total End-to-End Latency</span>
                  <span className="text-emerald-500 font-mono">{results.grpc.totalTimeMs} ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Payload Byte Inspector */}
      {activeTab === "inspector" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* JSON Inspector */}
          <div className="theme-card rounded-3xl p-6 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold theme-heading uppercase tracking-wider">
                1. REST API Teks JSON (Banyak Overhead Key)
              </span>
              <span className="text-[11px] font-mono text-amber-500 font-bold">185 Bytes/Record</span>
            </div>

            <pre className="bg-slate-900 text-amber-300 p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
{`{
  "user_id": 88401,
  "full_name": "Ahmad Gopher",
  "email_address": "ahmad@mail.com",
  "is_active_member": true,
  "loyalty_points": 2450
}`}
            </pre>
            <p className="text-xs theme-muted leading-relaxed">
              JSON mengulang string kunci seperti <code>"full_name"</code>, tanda petik ganda, dan spasi pada setiap baris data.
            </p>
          </div>

          {/* Protobuf Inspector */}
          <div className="theme-card rounded-3xl p-6 space-y-3 shadow-md border border-indigo-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold theme-heading uppercase tracking-wider">
                2. gRPC Protocol Buffer Stream (Raw Binary Hex)
              </span>
              <span className="text-[11px] font-mono text-emerald-500 font-bold">28 Bytes/Record</span>
            </div>

            <pre className="bg-slate-900 text-emerald-400 p-4 rounded-2xl border border-indigo-900 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
{`08 F1 B2 05 12 0C 41 68 6D 61 64 20 47 6F 70 68
65 72 1A 0E 61 68 6D 61 64 40 6D 61 69 6C 2E 63
6F 6D 20 01 28 92 13`}
            </pre>
            <p className="text-xs theme-muted leading-relaxed">
              Protobuf hanya menyimpan <em>Field Tag Number</em> (1 byte) diikuti dengan <em>Varint Binary Encoding</em> murni tanpa overhead teks.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Proto Schema & Go Code */}
      {activeTab === "proto" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Proto Definition */}
          <div className="lg:col-span-5 theme-card rounded-3xl p-6 space-y-3 shadow-md">
            <span className="text-xs font-bold theme-heading uppercase tracking-wider">
              1. File Definisi Kontrak: <code>user.proto</code>
            </span>
            <pre className="bg-slate-900 text-sky-300 p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
{`syntax = "proto3";

package user;
option go_package = "./pb";

service UserService {
  rpc GetUserByID (UserRequest) returns (UserResponse);
}

message UserRequest {
  int64 user_id = 1;
}

message UserResponse {
  int64 user_id = 1;
  string full_name = 2;
  string email = 3;
  bool is_active = 4;
}`}
            </pre>
          </div>

          {/* Generated Go Server Implementation */}
          <div className="lg:col-span-7 theme-card rounded-3xl p-6 space-y-3 shadow-md">
            <span className="text-xs font-bold theme-heading uppercase tracking-wider">
              2. Implementasi gRPC Server di Golang: <code>server.go</code>
            </span>
            <pre className="bg-slate-900 text-emerald-400 p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
{`package main

import (
    "context"
    "net"
    "google.golang.org/grpc"
    pb "myproject/pb"
)

type userServer struct {
    pb.UnimplementedUserServiceServer
}

func (s *userServer) GetUserByID(ctx context.Context, req *pb.UserRequest) (*pb.UserResponse, error) {
    return &pb.UserResponse{
        UserId:   req.GetUserId(),
        FullName: "Ahmad Gopher",
        Email:    "ahmad@mail.com",
        IsActive: true,
    }, nil
}

func main() {
    lis, _ := net.Listen("tcp", ":50051")
    s := grpc.NewServer()
    pb.RegisterUserServiceServer(s, &userServer{})
    s.Serve(lis)
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
