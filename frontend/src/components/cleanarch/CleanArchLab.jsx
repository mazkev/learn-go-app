import React, { useState, useEffect } from "react";
import {
  Layers,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Server,
  Database,
  Cpu,
  Globe,
  FileCode,
  ShieldCheck,
  Check
} from "lucide-react";

export const SCENARIOS = [
  {
    id: "create-order",
    method: "POST",
    endpoint: "/api/orders",
    title: "1. Pembuatan Pesanan (Create Order)",
    description: "Alur validasi bisnis stok, pemotongan saldo, dan penyimpanan transaksi ke database.",
    requestPayload: {
      user_id: 101,
      item_name: "Mechanical Keyboard Gopher Edition",
      quantity: 1,
      total_price: 850000,
    },
    steps: [
      {
        layer: "Client",
        title: "1. Client HTTP Request",
        badge: "HTTP / REST",
        color: "#0284C7",
        codeSnippet: `// HTTP Request Body
POST /api/orders HTTP/1.1
Host: api.golearn.id
Content-Type: application/json

{
  "user_id": 101,
  "item_name": "Mechanical Keyboard Gopher Edition",
  "quantity": 1,
  "total_price": 850000
}`,
        outputLog: "Payload HTTP JSON dikirim dari frontend React ke web server Go.",
      },
      {
        layer: "Delivery / Handler",
        title: "2. Delivery Layer (HTTP Handler)",
        badge: "delivery/http/order_handler.go",
        color: "#04AA6D",
        codeSnippet: `func (h *OrderHandler) CreateOrder(w http.ResponseWriter, r *http.Request) {
    var req dto.CreateOrderRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
        return
    }

    // Panggil Service Layer via Interface
    res, err := h.orderService.ProcessOrder(r.Context(), req)
    if err != nil {
        http.Error(w, err.Error(), http.StatusUnprocessableEntity)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(res)
}`,
        outputLog: "JSON diparsing ke struct DTO. Handler memanggil orderService.ProcessOrder() tanpa tahu jenis database yang digunakan.",
      },
      {
        layer: "Service / UseCase",
        title: "3. UseCase Layer (Business Logic)",
        badge: "usecase/order_service.go",
        color: "#8B5CF6",
        codeSnippet: `func (s *OrderService) ProcessOrder(ctx context.Context, req dto.CreateOrderRequest) (*entity.Order, error) {
    // 1. Validasi Aturan Bisnis
    if req.Quantity <= 0 || req.TotalPrice <= 0 {
        return nil, errors.New("jumlah dan harga harus lebih besar dari 0")
    }

    // 2. Buat Domain Entity murni
    order := entity.Order{
        UserID:     req.UserID,
        ItemName:   req.ItemName,
        Quantity:   req.Quantity,
        TotalPrice: req.TotalPrice,
        Status:     "PAID",
        CreatedAt:  time.Now(),
    }

    // 3. Simpan via Repository Interface
    return s.orderRepo.Create(ctx, &order)
}`,
        outputLog: "Business rules divalidasi. Struct Entity murni dibuat dan diteruskan ke OrderRepository interface.",
      },
      {
        layer: "Repository",
        title: "4. Repository Layer (Data Access)",
        badge: "repository/gorm/order_repo.go",
        color: "#EC4899",
        codeSnippet: `type OrderRepositoryGORM struct {
    db *gorm.DB
}

func (r *OrderRepositoryGORM) Create(ctx context.Context, order *entity.Order) (*entity.Order, error) {
    // Jalankan query SQL/GORM berparameter (Aman dari SQL Injection)
    result := r.db.WithContext(ctx).Create(order)
    if result.Error != nil {
        return nil, result.Error
    }
    return order, nil
}`,
        outputLog: "GORM membungkus context dan mengeksekusi prepared statement INSERT INTO orders.",
      },
      {
        layer: "Database",
        title: "5. PostgreSQL Database Engine",
        badge: "PostgreSQL Database (ACID)",
        color: "#F59E0B",
        codeSnippet: `INSERT INTO "orders" ("user_id","item_name","quantity","total_price","status","created_at") 
VALUES (101, 'Mechanical Keyboard Gopher Edition', 1, 850000, 'PAID', NOW()) 
RETURNING "id";

-- Result: Order ID #ORD-9942 Sukses Tersimpan (Commit Transaction)`,
        outputLog: "Database mengunci row, menyimpan record transaksi, dan mengembalikan generated ID #ORD-9942.",
      },
    ],
  },
  {
    id: "get-profile",
    method: "GET",
    endpoint: "/api/users/101",
    title: "2. Ambil Profil User (Cache Aside Pattern)",
    description: "Alur query data profil dengan pengecekan Redis cache sebelum query ke PostgreSQL database.",
    requestPayload: { user_id: 101 },
    steps: [
      {
        layer: "Client",
        title: "1. Client HTTP Request",
        badge: "GET /api/users/101",
        color: "#0284C7",
        codeSnippet: `GET /api/users/101 HTTP/1.1
Host: api.golearn.id
Authorization: Bearer eyJhbGciOi...`,
        outputLog: "Request GET dikirim beserta header JWT token autentikasi.",
      },
      {
        layer: "Delivery / Handler",
        title: "2. Delivery Layer (Auth & Path Extractor)",
        badge: "delivery/http/user_handler.go",
        color: "#04AA6D",
        codeSnippet: `func (h *UserHandler) GetProfile(w http.ResponseWriter, r *http.Request) {
    idStr := r.PathValue("id")
    id, _ := strconv.Atoi(idStr)

    profile, err := h.userService.GetByID(r.Context(), id)
    if err != nil {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }

    json.NewEncoder(w).Encode(profile)
}`,
        outputLog: "Path parameter {id} diekstrak dengan r.PathValue() Go 1.22+.",
      },
      {
        layer: "Service / UseCase",
        title: "3. UseCase Layer (Cache Check Logic)",
        badge: "usecase/user_service.go",
        color: "#8B5CF6",
        codeSnippet: `func (s *UserService) GetByID(ctx context.Context, id int) (*entity.User, error) {
    // 1. Cek Redis Cache terlebih dahulu
    if cached, err := s.cacheRepo.GetUser(ctx, id); err == nil && cached != nil {
        return cached, nil // Cache Hit (Super Cepat!)
    }

    // 2. Cache Miss: Ambil dari DB SQL
    user, err := s.userRepo.FindByID(ctx, id)
    if err != nil {
        return nil, err
    }

    // 3. Simpan ke Cache untuk request berikutnya
    go s.cacheRepo.SetUser(context.Background(), user, 10*time.Minute)
    return user, nil
}`,
        outputLog: "Service memeriksa Redis cache, bila miss mengambil ke SQL DB dan memperbarui cache secara asinkron.",
      },
      {
        layer: "Repository",
        title: "4. Repository Layer (Postgres Data Access)",
        badge: "repository/postgres/user_repo.go",
        color: "#EC4899",
        codeSnippet: `func (r *UserRepoPostgres) FindByID(ctx context.Context, id int) (*entity.User, error) {
    var user entity.User
    err := r.db.WithContext(ctx).First(&user, id).Error
    return &user, err
}`,
        outputLog: "Mengeksekusi SELECT * FROM users WHERE id = 101 LIMIT 1.",
      },
      {
        layer: "Database",
        title: "5. Database & Cache Engine",
        badge: "PostgreSQL + Redis Storage",
        color: "#F59E0B",
        codeSnippet: `SELECT * FROM "users" WHERE "id" = 101 AND "deleted_at" IS NULL;

-- Redis Cache Updated: SET user:101 '{"id":101,"name":"Alex"}' EX 600`,
        outputLog: "Data dikembalikan ke client dengan response time 1.8ms.",
      },
    ],
  },
];

export default function CleanArchLab() {
  const [selectedScenarioId, setSelectedScenarioId] = useState("create-order");
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState("code"); // 'code' | 'diagram'

  const currentScenario =
    SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  useEffect(() => {
    setActiveStepIndex(0);
    setIsSimulating(false);
  }, [selectedScenarioId]);

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setActiveStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < currentScenario.steps.length) {
        setActiveStepIndex(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1200);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setActiveStepIndex(0);
  };

  const currentStep = currentScenario.steps[activeStepIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-bold text-xs uppercase tracking-wider mb-1.5">
            <Layers size={15} />
            <span>Interactive Architecture Sandbox</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black theme-heading tracking-tight">
            Clean Architecture <span className="gopher-gradient-text">Flow Simulator</span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1 max-w-2xl leading-relaxed">
            Amati bagaimana data berpindah langkah demi langkah dari HTTP Handler, UseCase, Repository, hingga ke Database.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-lg theme-card theme-heading text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <RotateCcw size={13} /> Reset
          </button>

          <button
            onClick={handleStartSimulation}
            disabled={isSimulating}
            className="w3-btn-green px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            <Play size={14} className={isSimulating ? "animate-spin" : "fill-white"} />
            <span>{isSimulating ? "Menjalankan Flow..." : "Jalankan Simulasi Alur"}</span>
          </button>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCENARIOS.map((sc) => {
          const isSelected = sc.id === selectedScenarioId;
          return (
            <div
              key={sc.id}
              onClick={() => setSelectedScenarioId(sc.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer shadow-sm ${
                isSelected
                  ? "border-[#04AA6D] bg-[#04AA6D]/5 ring-1 ring-[#04AA6D]"
                  : "theme-card hover:border-[#04AA6D]/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    sc.method === "POST"
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                      : "bg-sky-500/15 text-sky-600 dark:text-sky-300"
                  }`}
                >
                  {sc.method} {sc.endpoint}
                </span>
                {isSelected && <Check size={16} className="text-[#04AA6D]" />}
              </div>
              <h3 className="font-extrabold theme-heading text-sm mt-2">{sc.title}</h3>
              <p className="text-xs theme-muted mt-1">{sc.description}</p>
            </div>
          );
        })}
      </div>

      {/* Visual Pipeline Stepper (Interactive 5 Nodes) */}
      <div className="theme-card rounded-2xl p-6 space-y-4 shadow-md overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] gap-2 relative">
          {currentScenario.steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const isPassed = activeStepIndex > idx;

            return (
              <React.Fragment key={idx}>
                {/* Node Box */}
                <div
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex-1 p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 select-none ${
                    isActive
                      ? "border-[#04AA6D] bg-[#04AA6D]/15 shadow-md scale-105"
                      : isPassed
                      ? "border-emerald-500/40 bg-emerald-500/5"
                      : "theme-card-subtle opacity-70"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isActive
                        ? "bg-[#04AA6D] text-white"
                        : isPassed
                        ? "bg-emerald-500 text-white"
                        : "theme-inset theme-muted"
                    }`}
                  >
                    {isPassed ? "✓" : idx + 1}
                  </div>
                  <span className="text-xs font-extrabold theme-heading truncate max-w-[110px]">
                    {step.layer}
                  </span>
                  <span className="text-[10px] font-mono theme-muted truncate max-w-[100px]">
                    {step.badge.split("/")[0]}
                  </span>
                </div>

                {/* Connector Arrow */}
                {idx < currentScenario.steps.length - 1 && (
                  <div className="text-slate-300 dark:text-white/20 shrink-0">
                    <ArrowRight size={16} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Current Step Detailed Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Viewer (7 cols) */}
        <div className="lg:col-span-7 theme-card rounded-2xl p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#04AA6D] font-bold uppercase tracking-wider">
                Step {activeStepIndex + 1} of {currentScenario.steps.length}
              </span>
              <h3 className="text-base font-extrabold theme-heading">{currentStep.title}</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md theme-card-subtle theme-muted">
              {currentStep.badge}
            </span>
          </div>

          <pre className="bg-slate-100 dark:bg-[#070d19] text-slate-800 dark:text-emerald-400 p-4 rounded-xl border border-slate-200 dark:border-white/10 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
            {currentStep.codeSnippet}
          </pre>

          <div className="p-3.5 rounded-xl theme-card-subtle text-xs theme-body flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#04AA6D] shrink-0" />
            <span>{currentStep.outputLog}</span>
          </div>
        </div>

        {/* Right: Architectural Principles & Key Insights (5 cols) */}
        <div className="lg:col-span-5 theme-card rounded-2xl p-6 space-y-5 flex flex-col shadow-md">
          <h3 className="text-base font-extrabold theme-heading flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#04AA6D]" /> Prinsip Clean Architecture
          </h3>

          <div className="space-y-3.5 text-xs theme-body leading-relaxed flex-1">
            <div className="p-3.5 rounded-xl theme-inset space-y-1">
              <strong className="text-[#04AA6D] font-bold">1. Aturan Ketergantungan (Dependency Rule):</strong>
              <p>
                Layer dalam (Domain & UseCase) <strong>tidak boleh tahu</strong> detail implementasi layer luar (GORM, PostgreSQL, HTTP Router).
              </p>
            </div>

            <div className="p-3.5 rounded-xl theme-inset space-y-1">
              <strong className="text-purple-600 dark:text-purple-400 font-bold">2. Dependency Inversion:</strong>
              <p>
                UseCase memanggil interface <code>OrderRepository</code>. Struct GORM mengimplementasikan interface tersebut di layer luar.
              </p>
            </div>

            <div className="p-3.5 rounded-xl theme-inset space-y-1">
              <strong className="text-sky-600 dark:text-sky-400 font-bold">3. Kemudahan Pengujian (Testability):</strong>
              <p>
                Anda dapat menulis 100% Unit Test pada UseCase menggunakan <em>Mock Repository</em> tanpa perlu menyalakan database asli!
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center border-t border-slate-200 dark:border-white/10">
            <span className="text-xs theme-muted">Navigasi Manual:</span>
            <div className="flex gap-2">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded-lg theme-card-subtle text-xs font-bold theme-heading disabled:opacity-40 cursor-pointer"
              >
                ❮ Prev Step
              </button>
              <button
                disabled={activeStepIndex === currentScenario.steps.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(currentScenario.steps.length - 1, prev + 1))}
                className="w3-btn-green px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-40 cursor-pointer"
              >
                Next Step ❯
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
