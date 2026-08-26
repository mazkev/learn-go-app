# 🐹 GoLearn Hub • Platform Belajar Golang Interaktif dengan React

Platform pembelajaran interaktif komprehensif untuk menguasai bahasa pemrograman **Golang** dari dasar hingga arsitektur backend skala produksi (*Production-Grade*), dibangun dengan **React**, **Vite**, **Tailwind CSS**, dan **Monaco Editor**.

---

## ✨ Roadmap Pembelajaran 8 Modul Lengkap (Bahasa Indonesia)

1. **Dasar Pemrograman Go**: Instalasi, anatomi file `package main`, variabel (`var` & `:=`), tipe data, kondisi `if/else`/`switch`, dan perulangan `for`.
2. **Struktur Data & Logika**: Array vs Slice, Map (`comma-ok`), Struct & Komposisi, Fungsi variadic & multiple returns.
3. **Konsep Menengah (OOP ala Go)**: Pointer, Method & Receiver, Interface implisit (Duck Typing), Error handling & `defer/panic/recover`.
4. **Konkurensi (Concurrency)**: Goroutines (~2KB green threads), Channels (Buffered & Unbuffered), `select` multiplexer, `sync.WaitGroup` & `sync.Mutex`.
5. **Pemrograman Web & REST API**: HTTP server bawaan (`net/http`), route pattern matching Go 1.22+, Middleware chaining, RESTful JSON serialization.
6. **Manajemen Database & GORM**: Connection pool (`database/sql`), `gorm.Model` & Soft Delete, operasi CRUD penuh, relasi One-to-Many & Preloading.
7. **Konteks, Testing & Arsitektur Backend (Production Grade)**:
   - `context.Context`, Cancellation signal & timeout (mencegah Goroutine leak).
   - Table-Driven Unit Testing (`testing.T`, `go test -cover`).
   - Clean Architecture di Go (Domain, Repository, UseCase/Service, Delivery Handler).
   - Standardized API Response Envelope (`{success, message, data, errors}`).
8. **Microservices, Caching & Deployment (Cloud Native)**:
   - gRPC & Protocol Buffers (Komunikasi biner berkecepatan tinggi via HTTP/2).
   - Redis Caching (Pola Cache-Aside & TTL).
   - Event-Driven Architecture & Message Broker (Kafka / RabbitMQ background tasks).
   - Dockerization & Production Build Optimization (Multi-stage Dockerfile ~15MB scratch image).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Code Editor**: `@monaco-editor/react` (VS Code Editor Engine)
- **Go Engine**: Official Go Playground API with Local Intelligent Simulator Fallback
- **Dual Theme**: Tema Terang (*Light Mode*) dan Tema Gelap (*Dark Mode*)

---

## 🚀 Panduan Menjalankan Aplikasi

```bash
# 1. Clone Repositori
git clone https://github.com/mazkev/learn-go-app.git
cd learn-go-app/frontend

# 2. Install Dependensi
npm install

# 3. Jalankan Development Server
npm run dev
```

Buka browser di alamat: **`http://localhost:5173/`**

---

Dibuat dengan 💙 untuk seluruh Gophers Indonesia.
