import React, { useState } from "react";
import {
  Folder,
  FolderOpen,
  FileCode,
  Copy,
  Check,
  Download,
  Sparkles,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Layers,
  Terminal,
  ChevronRight,
  ExternalLink,
  Code2
} from "lucide-react";

export const BLUEPRINTS = [
  {
    id: "jwt-auth",
    title: "1. JWT Authentication & RBAC Starter",
    badge: "Enterprise Security",
    icon: ShieldCheck,
    description: "Sistem autentikasi lengkap dengan Bcrypt password hashing, pembuatan Access/Refresh token JWT, dan RBAC Middleware.",
    files: [
      {
        path: "cmd/api/main.go",
        name: "main.go",
        folder: "cmd/api",
        description: "Entry point aplikasi: Inisialisasi router, koneksi database, dan registrasi endpoint terproteksi.",
        code: `package main

import (
    "log"
    "net/http"
    "time"

    "myproject/internal/handler"
    "myproject/internal/middleware"
)

func main() {
    mux := http.NewServeMux()

    // 1. Public Endpoints (Tanpa Token)
    mux.HandleFunc("POST /api/auth/register", handler.RegisterHandler)
    mux.HandleFunc("POST /api/auth/login", handler.LoginHandler)

    // 2. Protected Endpoints (Wajib JWT Token)
    profileHandler := http.HandlerFunc(handler.GetProfileHandler)
    adminHandler := http.HandlerFunc(handler.AdminDashboardHandler)

    mux.Handle("GET /api/user/profile", middleware.AuthMiddleware(profileHandler))
    mux.Handle("GET /api/admin/dashboard", middleware.AuthMiddleware(middleware.RequireRole("ADMIN")(adminHandler)))

    server := &http.Server{
        Addr:         ":8080",
        Handler:      mux,
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
    }

    log.Println("🚀 Server Auth berjalan di http://localhost:8080")
    if err := server.ListenAndServe(); err != nil {
        log.Fatal(err)
    }
}`
      },
      {
        path: "internal/middleware/jwt_auth.go",
        name: "jwt_auth.go",
        folder: "internal/middleware",
        description: "Middleware untuk memverifikasi header 'Authorization: Bearer <token>' dan mengekstrak user claims.",
        code: `package middleware

import (
    "context"
    "net/http"
    "strings"
    "github.com/golang-jwt/jwt/v5"
)

var JwtSecret = []byte("super-secret-key-change-in-production")

type UserClaims struct {
    UserID int    \`json:"user_id"\`
    Email  string \`json:"email"\`
    Role   string \`json:"role"\`
    jwt.RegisteredClaims
}

type contextKey string
const UserContextKey = contextKey("userClaims")

func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
            http.Error(w, "Unauthorized: Header Authorization Bearer diperlukan", http.StatusUnauthorized)
            return
        }

        tokenString := strings.TrimPrefix(authHeader, "Bearer ")
        claims := &UserClaims{}

        token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
            return JwtSecret, nil
        })

        if err != nil || !token.Valid {
            http.Error(w, "Unauthorized: Token tidak valid atau kadaluarsa", http.StatusUnauthorized)
            return
        }

        // Teruskan data user ke context request
        ctx := context.WithValue(r.Context(), UserContextKey, claims)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

// Middleware Pemeriksa Role (RBAC)
func RequireRole(requiredRole string) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            claims, ok := r.Context().Value(UserContextKey).(*UserClaims)
            if !ok || claims.Role != requiredRole {
                http.Error(w, "Forbidden: Akses ditolak untuk role Anda", http.StatusForbidden)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}`
      },
      {
        path: "internal/handler/auth_handler.go",
        name: "auth_handler.go",
        folder: "internal/handler",
        description: "Handler registrasi & login dengan Bcrypt hashing dan pembuatan token JWT.",
        code: `package handler

import (
    "encoding/json"
    "net/http"
    "time"

    "myproject/internal/middleware"
    "github.com/golang-jwt/jwt/v5"
    "golang.org/x/crypto/bcrypt"
)

type LoginRequest struct {
    Email    string \`json:"email"\`
    Password string \`json:"password"\`
}

type AuthResponse struct {
    Token string \`json:"access_token"\`
    Role  string \`json:"role"\`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
    var req LoginRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid payload", http.StatusBadRequest)
        return
    }

    // 1. Verifikasi Password dengan Bcrypt (Simulasi password hash dari DB)
    hashedPasswordInDB := "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy" // 'rahasia123'
    if err := bcrypt.CompareHashAndPassword([]byte(hashedPasswordInDB), []byte(req.Password)); err != nil {
        http.Error(w, "Email atau password salah", http.StatusUnauthorized)
        return
    }

    // 2. Buat Token JWT dengan Claims dan Waktu Expired (24 Jam)
    claims := &middleware.UserClaims{
        UserID: 101,
        Email:  req.Email,
        Role:   "USER",
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
            IssuedAt:  jwt.NewNumericDate(time.Now()),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    signedToken, err := token.SignedString(middleware.JwtSecret)
    if err != nil {
        http.Error(w, "Gagal membuat token", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(AuthResponse{
        Token: signedToken,
        Role:  claims.Role,
    })
}`
      },
      {
        path: "Dockerfile",
        name: "Dockerfile",
        folder: "root",
        description: "Multi-stage build Dockerfile untuk memproduksi container biner super ramping (~15 MB).",
        code: `# Stage 1: Build Binary
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o server ./cmd/api

# Stage 2: Minimal Distroless / Alpine Runtime
FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /root/
COPY --from=builder /app/server .

EXPOSE 8080
CMD ["./server"]`
      }
    ]
  },
  {
    id: "websockets-chat",
    title: "2. Real-time WebSockets Chat Hub",
    badge: "High Concurrency",
    icon: Zap,
    description: "Server komunikasi real-time menggunakan goroutine broadcast hub yang sanggup melayani ribuan koneksi konkuren.",
    files: [
      {
        path: "cmd/chat/main.go",
        name: "main.go",
        folder: "cmd/chat",
        description: "Inisialisasi WebSocket Hub di background goroutine dan endpoint upgrade HTTP ke WebSocket.",
        code: `package main

import (
    "log"
    "net/http"
    "myproject/internal/ws"
)

func main() {
    hub := ws.NewHub()
    go hub.Run() // Jalankan Goroutine Broadcast Hub di background

    http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
        ws.ServeWs(hub, w, r)
    })

    log.Println("⚡ WebSocket Chat Server aktif di ws://localhost:8080/ws")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}`
      },
      {
        path: "internal/ws/hub.go",
        name: "hub.go",
        folder: "internal/ws",
        description: "Struktur Hub yang mengelola registrasi klien dan broadcast pesan via channel tanpa data race.",
        code: `package ws

type Hub struct {
    Clients    map[*Client]bool
    Broadcast  chan []byte
    Register   chan *Client
    Unregister chan *Client
}

func NewHub() *Hub {
    return &Hub{
        Clients:    make(map[*Client]bool),
        Broadcast:  make(chan []byte),
        Register:   make(chan *Client),
        Unregister: make(chan *Client),
    }
}

func (h *Hub) Run() {
    for {
        select {
        case client := <-h.Register:
            h.Clients[client] = true
        case client := <-h.Unregister:
            if _, ok := h.Clients[client]; ok {
                delete(h.Clients, client)
                close(client.Send)
            }
        case message := <-h.Broadcast:
            for client := range h.Clients {
                select {
                case client.Send <- message:
                default:
                    close(client.Send)
                    delete(h.Clients, client)
                }
            }
        }
    }
}`
      },
      {
        path: "internal/ws/client.go",
        name: "client.go",
        folder: "internal/ws",
        description: "Pengelola koneksi individu klien dengan ReadPump & WritePump goroutine.",
        code: `package ws

import (
    "net/http"
    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin: func(r *http.Request) bool { return true },
}

type Client struct {
    Hub  *Hub
    Conn *websocket.Conn
    Send chan []byte
}

func (c *Client) ReadPump() {
    defer func() {
        c.Hub.Unregister <- c
        c.Conn.Close()
    }()

    for {
        _, message, err := c.Conn.ReadMessage()
        if err != nil {
            break
        }
        c.Hub.Broadcast <- message
    }
}

func (c *Client) WritePump() {
    defer c.Conn.Close()

    for message := range c.Send {
        w, err := c.Conn.NextWriter(websocket.TextMessage)
        if err != nil {
            return
        }
        w.Write(message)
        w.Close()
    }
}

func ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        return
    }

    client := &Client{Hub: hub, Conn: conn, Send: make(chan []byte, 256)}
    client.Hub.Register <- client

    go client.WritePump()
    go client.ReadPump()
}`
      }
    ]
  },
  {
    id: "clean-ecommerce",
    title: "3. E-Commerce Microservice (Clean Arch + Redis)",
    badge: "Industry Standard",
    icon: ShoppingBag,
    description: "Arsitektur enterprise lengkap dengan Cache-Aside pattern Redis, GORM PostgreSQL, dan Graceful Shutdown.",
    files: [
      {
        path: "cmd/api/main.go",
        name: "main.go",
        folder: "cmd/api",
        description: "Inisialisasi Clean Architecture dengan Graceful Shutdown saat menerima sinyal SIGINT/SIGTERM.",
        code: `package main

import (
    "context"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "myproject/internal/repository"
    "myproject/internal/usecase"
)

func main() {
    // 1. Inisialisasi Database & Redis
    db := repository.NewPostgresDB()
    redisClient := repository.NewRedisClient()

    // 2. Dependency Injection (Layering)
    productRepo := repository.NewProductRepoGORM(db)
    cacheRepo := repository.NewProductCacheRedis(redisClient)
    productUseCase := usecase.NewProductUseCase(productRepo, cacheRepo)

    mux := http.NewServeMux()
    mux.HandleFunc("GET /api/products/{id}", productUseCase.GetProductHandler)

    server := &http.Server{Addr: ":8080", Handler: mux}

    // 3. Jalankan Server di Background Goroutine
    go func() {
        log.Println("🛒 E-Commerce API aktif di :8080")
        if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatalf("Server error: %v", err)
        }
    }()

    // 4. Graceful Shutdown Listener
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit
    log.Println("🛑 Mematikan server secara graceful...")

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    if err := server.Shutdown(ctx); err != nil {
        log.Fatalf("Server forced to shutdown: %v", err)
    }
    log.Println("✓ Server berhasil dimatikan dengan aman")
}`
      },
      {
        path: "internal/usecase/product_usecase.go",
        name: "product_usecase.go",
        folder: "internal/usecase",
        description: "Business logic dengan strategi Cache-Aside: Cek Redis dulu, jika miss query ke DB dan simpan ke Redis.",
        code: `package usecase

import (
    "context"
    "encoding/json"
    "net/http"
    "strconv"
    "time"

    "myproject/internal/domain"
)

type ProductUseCase struct {
    repo  domain.ProductRepository
    cache domain.ProductCacheRepository
}

func NewProductUseCase(r domain.ProductRepository, c domain.ProductCacheRepository) *ProductUseCase {
    return &ProductUseCase{repo: r, cache: c}
}

func (u *ProductUseCase) GetProductHandler(w http.ResponseWriter, r *http.Request) {
    idStr := r.PathValue("id")
    id, _ := strconv.Atoi(idStr)
    ctx := r.Context()

    // 1. Cek Redis Cache (Sangat cepat: ~1ms)
    if cached, err := u.cache.Get(ctx, id); err == nil && cached != nil {
        w.Header().Set("X-Cache-Status", "HIT")
        json.NewEncoder(w).Encode(cached)
        return
    }

    // 2. Cache Miss: Query ke PostgreSQL Database
    product, err := u.repo.FindByID(ctx, id)
    if err != nil {
        http.Error(w, "Produk tidak ditemukan", http.StatusNotFound)
        return
    }

    // 3. Simpan ke Redis secara asinkron (TTL 10 Menit)
    go u.cache.Set(context.Background(), product, 10*time.Minute)

    w.Header().Set("X-Cache-Status", "MISS")
    json.NewEncoder(w).Encode(product)
}`
      }
    ]
  }
];

export default function ProjectStartersLab() {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState("jwt-auth");
  const [selectedFilePath, setSelectedFilePath] = useState("cmd/api/main.go");
  const [copySuccess, setCopySuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const currentBlueprint =
    BLUEPRINTS.find((b) => b.id === selectedBlueprintId) || BLUEPRINTS[0];

  const currentFile =
    currentBlueprint.files.find((f) => f.path === selectedFilePath) ||
    currentBlueprint.files[0];

  const handleSelectBlueprint = (id) => {
    setSelectedBlueprintId(id);
    const bp = BLUEPRINTS.find((b) => b.id === id);
    if (bp && bp.files.length > 0) {
      setSelectedFilePath(bp.files[0].path);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopySuccess(true);
    setToastMessage(`✓ ${currentFile.name} berhasil disalin!`);
    setTimeout(() => {
      setCopySuccess(false);
      setToastMessage(null);
    }, 2500);
  };

  const handleDownloadAll = () => {
    const bundleObj = {
      blueprintName: currentBlueprint.title,
      description: currentBlueprint.description,
      files: currentBlueprint.files,
    };
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(bundleObj, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${currentBlueprint.id}_bundle.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setToastMessage("✓ Seluruh file blueprint berhasil diunduh!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-bold text-xs uppercase tracking-wider mb-1.5">
            <Code2 size={15} />
            <span>Production Architecture Starters</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black theme-heading tracking-tight">
            Go <span className="gopher-gradient-text">Project Starters & Boilerplates</span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1 max-w-2xl leading-relaxed">
            Struktur folder proyek backend siap pakai standar industri: JWT Auth, WebSockets Chat, dan Clean Architecture Microservice.
          </p>
        </div>

        <button
          onClick={handleDownloadAll}
          className="w3-btn-green px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer shrink-0"
        >
          <Download size={14} />
          <span>Unduh Semua File Paket</span>
        </button>
      </div>

      {/* Blueprint Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BLUEPRINTS.map((bp) => {
          const Icon = bp.icon;
          const isSelected = bp.id === selectedBlueprintId;

          return (
            <div
              key={bp.id}
              onClick={() => handleSelectBlueprint(bp.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer shadow-sm flex flex-col justify-between ${
                isSelected
                  ? "border-[#04AA6D] bg-[#04AA6D]/5 ring-1 ring-[#04AA6D]"
                  : "theme-card hover:border-[#04AA6D]/40"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#04AA6D]/15 text-[#04AA6D] font-mono">
                    {bp.badge}
                  </span>
                  <Icon size={18} className="text-[#04AA6D]" />
                </div>
                <h3 className="font-extrabold theme-heading text-sm">{bp.title}</h3>
                <p className="text-xs theme-muted leading-relaxed">{bp.description}</p>
              </div>

              <div className="pt-3 text-[11px] font-mono theme-muted flex items-center gap-1">
                <span>📁 {bp.files.length} File Produksi</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
          <Check size={14} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Split: File Tree (4 cols) vs Code Viewer (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive File Tree Explorer */}
        <div className="lg:col-span-4 theme-card rounded-2xl p-5 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
            <h3 className="text-xs font-extrabold theme-heading uppercase tracking-wider flex items-center gap-1.5">
              <FolderOpen size={15} className="text-[#04AA6D]" /> Project File Tree
            </h3>
            <span className="text-[10px] font-mono theme-muted font-bold">Standard Layout</span>
          </div>

          <div className="space-y-1 text-xs font-mono">
            {currentBlueprint.files.map((file) => {
              const isSelected = file.path === selectedFilePath;
              return (
                <div
                  key={file.path}
                  onClick={() => setSelectedFilePath(file.path)}
                  className={`p-2.5 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#04AA6D] text-white font-bold shadow-sm"
                      : "theme-body hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode size={14} className={isSelected ? "text-white" : "text-[#04AA6D]"} />
                    <span className="truncate">{file.path}</span>
                  </div>
                  {isSelected && <ChevronRight size={14} />}
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl theme-inset text-[11px] theme-body space-y-1">
            <strong className="text-[#04AA6D] font-bold block">💡 Standard Go Layout:</strong>
            <p className="theme-muted">
              Folder <code>cmd/</code> berisi entry point biner, sedangkan <code>internal/</code> melindungi modul privat dari import luar.
            </p>
          </div>
        </div>

        {/* Right: Code Viewer & Description */}
        <div className="lg:col-span-8 theme-card rounded-2xl p-6 space-y-4 shadow-md flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#04AA6D] font-bold uppercase tracking-wider">
                {currentFile.folder}
              </span>
              <h3 className="text-base font-extrabold theme-heading flex items-center gap-2">
                <FileCode size={16} className="text-[#04AA6D]" />
                <span>{currentFile.name}</span>
              </h3>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg theme-card-subtle text-xs font-bold theme-heading hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copySuccess ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              <span>{copySuccess ? "Tersalin!" : "Salin Kode"}</span>
            </button>
          </div>

          <p className="text-xs theme-muted leading-relaxed">
            {currentFile.description}
          </p>

          <div className="relative flex-1">
            <pre className="bg-slate-100 dark:bg-[#070d19] text-slate-800 dark:text-emerald-400 p-4 rounded-xl border border-slate-200 dark:border-white/10 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner max-h-[480px]">
              {currentFile.code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
