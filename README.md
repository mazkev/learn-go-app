# 🐹 GoLearn Hub • Platform Belajar Golang Interaktif dengan React

Platform pembelajaran interaktif komprehensif untuk menguasai bahasa pemrograman **Golang** dari dasar hingga arsitektur backend, dibangun dengan **React**, **Vite**, **Tailwind CSS**, dan **Monaco Editor**.

---

## ✨ Fitur-Fitur Utama

- 🗺️ **Roadmap Pembelajaran 6 Modul Lengkap (Bahasa Indonesia)**:
  1. **Dasar Pemrograman Go**: Instalasi, anatomi file `package main`, variabel (`var` & `:=`), tipe data, kondisi `if/else`/`switch`, dan perulangan `for`.
  2. **Struktur Data & Logika**: Array vs Slice, Map (`comma-ok`), Struct & Komposisi, Fungsi variadic & multiple returns.
  3. **Konsep Menengah (OOP ala Go)**: Pointer, Method & Receiver, Interface implisit (Duck Typing), Error handling & `defer/panic/recover`.
  4. **Konkurensi (Concurrency)**: Goroutines (~2KB green threads), Channels (Buffered & Unbuffered), `select` multiplexer, `sync.WaitGroup` & `sync.Mutex`.
  5. **Pemrograman Web & REST API**: HTTP server bawaan (`net/http`), route pattern matching Go 1.22+, Middleware chaining, RESTful JSON serialization.
  6. **Manajemen Database & GORM**: Connection pool (`database/sql`), `gorm.Model` & Soft Delete, operasi CRUD penuh, relasi One-to-Many & Preloading.
- 💻 **Code Studio (Monaco Editor & Terminal)**: Editor VS Code di browser dengan Go Execution Engine, terminal console, materi teori, tantangan coding, dan kuis pilihan ganda.
- 🧪 **Visual Concurrency Lab**: Simulator visual interaktif untuk alur pengiriman Channel & Buffer queue, Worker Pool dispatcher, dan pembuktian Data Race vs Mutex.
- 🌐 **Interactive REST API Tester**: HTTP Client bawaan bergaya Postman untuk mencoba endpoint `GET`, `POST`, `DELETE` dan JSON response.
- 🗄️ **GORM & Database Lab**: Visualizer tabel SQLite dengan trigger query GORM live & auto-generated Raw SQL inspector.
- 📚 **Golang Cheatsheet**: Kumpulan referensi cepat sintaks idiomatis Go dengan fitur pencarian dan copy code instan.
- ☀️🌙 **Dual Theme Support**: Dukungan penuh Tema Terang (*Light Mode*) dan Tema Gelap (*Dark Mode*) dengan transisi halus.
- 🏆 **Gamifikasi & Tracking**: Perhitungan XP, level badge, dan animasi perayaan confetti saat menyelesaikan materi.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Code Editor**: `@monaco-editor/react` (VS Code Editor Engine)
- **Go Engine**: Official Go Playground API with Local Intelligent Simulator Fallback

---

## 🚀 Panduan Menjalankan Aplikasi

### 1. Clone Repositori
```bash
git clone https://github.com/mazkev/learn-go-app.git
cd learn-go-app
```

### 2. Masuk ke Direktori Frontend & Install Dependensi
```bash
cd frontend
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```

Buka browser di alamat: **`http://localhost:5173/`**

---

## 📦 Build untuk Produksi

```bash
cd frontend
npm run build
```

---

Dibuat dengan 💙 untuk seluruh Gophers Indonesia.
