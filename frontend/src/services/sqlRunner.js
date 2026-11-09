/**
 * SQL Runner Service
 * In-Browser Fast Relational Database SQL Interpreter & Table Formatter
 * Mendukung DDL (CREATE, DROP), DML (INSERT, SELECT, UPDATE, DELETE),
 * JOINS (INNER, LEFT, RIGHT), Aggregations (COUNT, SUM, AVG, MIN, MAX),
 * GROUP BY, HAVING, ORDER BY, LIMIT, LIKE, IN, BETWEEN, IS NULL, dsb.
 */

export async function executeSqlCode(rawCode) {
  const startTime = performance.now();
  const code = (rawCode || "").trim();

  if (!code) {
    return {
      success: false,
      output: "Kode SQL kosong. Silakan tulis query SQL terlebih dahulu.",
      isError: true,
      executionTime: "0.00s",
      source: "SQL Query Engine",
    };
  }

  try {
    const engine = new SqlEngine();
    const resultOutput = engine.executeScript(code);
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

    return {
      success: true,
      output: resultOutput || "Query OK (0 baris diproses).",
      isError: false,
      executionTime: `${elapsed}s`,
      source: "In-Browser SQL Relational Engine",
    };
  } catch (err) {
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    return {
      success: false,
      output: `SQL Error: ${err.message || String(err)}`,
      isError: true,
      executionTime: `${elapsed}s`,
      source: "In-Browser SQL Relational Engine",
    };
  }
}

class SqlEngine {
  constructor() {
    this.tables = new Map();
    this.seedDefaultDatabase();
  }

  executeScript(script) {
    // 1. Bersihkan komentar SQL (-- komentar dan /* komentar */)
    let cleanScript = script
      .replace(/--.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "");

    // 2. Pisahkan pernyataan berdasarkan tanda titik koma (;)
    // Namun jangan pisahkan jika ; ada di dalam string literal tanda petik
    const statements = this.splitStatements(cleanScript);
    const outputs = [];

    for (const rawStmt of statements) {
      const stmt = rawStmt.trim();
      if (!stmt) continue;

      const out = this.executeStatement(stmt);
      if (out) outputs.push(out);
    }

    return outputs.join("\n\n");
  }

  splitStatements(sql) {
    const stmts = [];
    let cur = "";
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < sql.length; i++) {
      const ch = sql[i];
      if (ch === "'" && !inDouble) {
        if (inSingle && sql[i + 1] === "'") {
          cur += "''";
          i++;
          continue;
        }
        inSingle = !inSingle;
        cur += ch;
      } else if (ch === '"' && !inSingle) {
        inDouble = !inDouble;
        cur += ch;
      } else if (ch === ";" && !inSingle && !inDouble) {
        if (cur.trim()) stmts.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    if (cur.trim()) stmts.push(cur.trim());
    return stmts;
  }

  executeStatement(stmt) {
    const upper = stmt.trim().toUpperCase();

    if (upper === "SHOW TABLES" || upper === "SHOW TABLES;") {
      return this.handleShowTables();
    } else if (upper.startsWith("DESCRIBE ") || upper.startsWith("DESC ")) {
      return this.handleDescribe(stmt);
    } else if (upper.startsWith("CREATE TABLE")) {
      return this.handleCreateTable(stmt);
    } else if (upper.startsWith("DROP TABLE")) {
      return this.handleDropTable(stmt);
    } else if (upper.startsWith("INSERT INTO")) {
      return this.handleInsert(stmt);
    } else if (upper.startsWith("SELECT")) {
      return this.handleSelect(stmt);
    } else if (upper.startsWith("UPDATE")) {
      return this.handleUpdate(stmt);
    } else if (upper.startsWith("DELETE FROM") || upper.startsWith("DELETE")) {
      return this.handleDelete(stmt);
    } else {
      throw new Error(`Sintaks SQL tidak dikenali atau belum didukung: "${stmt.slice(0, 40)}..."`);
    }
  }


  handleShowTables() {
    const tableNames = Array.from(this.tables.keys()).sort();
    const rows = tableNames.map(t => ({ Tables_in_database: t }));
    return this.formatAsciiTable(rows, [{ raw: "Tables_in_database", colName: "Tables_in_database" }]);
  }

  handleDescribe(stmt) {
    const match = stmt.match(/^(?:DESCRIBE|DESC)\s+([a-zA-Z0-9_`]+)/i);
    if (!match) throw new Error("Sintaks DESCRIBE tidak valid. Format: DESCRIBE <nama_tabel>");
    const tableName = match[1].replace(/[`"]/g, "").toLowerCase();
    const table = this.tables.get(tableName);
    if (!table) throw new Error(`Tabel '${match[1]}' tidak ditemukan.`);

    const rows = table.columns.map(c => ({
      Field: c.name,
      Type: c.type,
      Null: c.isNotNull ? "NO" : "YES",
      Key: c.isPrimaryKey ? "PRI" : "",
      Default: c.defaultVal !== undefined ? String(c.defaultVal) : "NULL",
    }));

    return this.formatAsciiTable(rows, [
      { raw: "Field", colName: "Field" },
      { raw: "Type", colName: "Type" },
      { raw: "Null", colName: "Null" },
      { raw: "Key", colName: "Key" },
      { raw: "Default", colName: "Default" },
    ]);
  }

  seedDefaultDatabase() {
    this.tables.set("mahasiswa", {
      name: "mahasiswa",
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "nim", type: "VARCHAR(10)", isNotNull: true },
        { name: "nama", type: "VARCHAR(50)", isNotNull: true },
        { name: "jurusan", type: "VARCHAR(30)", isNotNull: false },
        { name: "ipk", type: "DECIMAL(3,2)", isNotNull: false }
      ],
      rows: [
        { id: 1, nim: "2026001", nama: "Kevin Pratama", jurusan: "Informatika", ipk: 3.92 },
        { id: 2, nim: "2026002", nama: "Siti Aminah", jurusan: "Sistem Informasi", ipk: 3.85 },
        { id: 3, nim: "2026003", nama: "Budi Santoso", jurusan: "Informatika", ipk: 3.45 },
        { id: 4, nim: "2026004", nama: "Rina Kusuma", jurusan: "Sistem Informasi", ipk: 3.70 },
        { id: 5, nim: "2026005", nama: "Dewi Lestari", jurusan: "Teknik Komputer", ipk: 3.90 }
      ],
      autoInc: 6
    });

    this.tables.set("karyawan", {
      name: "karyawan",
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "nama_depan", type: "VARCHAR(30)", isNotNull: true },
        { name: "nama_belakang", type: "VARCHAR(30)", isNotNull: true },
        { name: "divisi", type: "VARCHAR(30)", isNotNull: true },
        { name: "gaji", type: "INT", isNotNull: true },
        { name: "kota", type: "VARCHAR(30)", isNotNull: false }
      ],
      rows: [
        { id: 1, nama_depan: "Kevin", nama_belakang: "Pratama", divisi: "Engineering", gaji: 12500000, kota: "Jakarta" },
        { id: 2, nama_depan: "Siti", nama_belakang: "Aminah", divisi: "Design", gaji: 9500000, kota: "Bandung" },
        { id: 3, nama_depan: "Budi", nama_belakang: "Santoso", divisi: "Engineering", gaji: 11000000, kota: "Jakarta" },
        { id: 4, nama_depan: "Rina", nama_belakang: "Wati", divisi: "HR", gaji: 7500000, kota: "Surabaya" },
        { id: 5, nama_depan: "Agus", nama_belakang: "Setiawan", divisi: "Marketing", gaji: 8000000, kota: "Yogyakarta" }
      ],
      autoInc: 6
    });

    this.tables.set("produk", {
      name: "produk",
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "nama", type: "VARCHAR(50)", isNotNull: true },
        { name: "nama_produk", type: "VARCHAR(50)", isNotNull: true },
        { name: "kategori", type: "VARCHAR(30)", isNotNull: true },
        { name: "harga", type: "INT", isNotNull: true },
        { name: "stok", type: "INT", isNotNull: false }
      ],
      rows: [
        { id: 1, nama: "MacBook Pro M3", nama_produk: "MacBook Pro M3", kategori: "Laptop", harga: 24000000, stok: 12 },
        { id: 2, nama: "Logitech MX Master", nama_produk: "Logitech MX Master", kategori: "Aksesoris", harga: 1400000, stok: 35 },
        { id: 3, nama: "Dell XPS 15", nama_produk: "Dell XPS 15", kategori: "Laptop", harga: 21000000, stok: 8 },
        { id: 4, nama: "Keychron K2 Mechanical", nama_produk: "Keychron K2 Mechanical", kategori: "Aksesoris", harga: 1200000, stok: 20 },
        { id: 5, nama: "LG UltraFine 4K", nama_produk: "LG UltraFine 4K", kategori: "Monitor", harga: 6500000, stok: 15 }
      ],
      autoInc: 6
    });

    const userRows = [
      { id: 1, nama: "Kevin Pratama", email: "kevin@gmail.com", kota: "Jakarta" },
      { id: 2, nama: "Siti Aminah", email: "siti@gmail.com", kota: "Bandung" },
      { id: 3, nama: "Budi Santoso", email: "budi@yahoo.com", kota: "Surabaya" },
      { id: 4, nama: "Dewi Lestari", email: "dewi@outlook.com", kota: "Semarang" }
    ];

    this.tables.set("users", {
      name: "users",
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "nama", type: "VARCHAR(50)", isNotNull: true },
        { name: "email", type: "VARCHAR(50)", isNotNull: true },
        { name: "kota", type: "VARCHAR(30)", isNotNull: false }
      ],
      rows: userRows.map(r => ({ ...r })),
      autoInc: 5
    });

    this.tables.set("pelanggan", {
      name: "pelanggan",
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "nama", type: "VARCHAR(50)", isNotNull: true },
        { name: "email", type: "VARCHAR(50)", isNotNull: true },
        { name: "kota", type: "VARCHAR(30)", isNotNull: false }
      ],
      rows: userRows.map(r => ({ ...r })),
      autoInc: 5
    });

    this.tables.set("pengguna", {
      name: "pengguna",
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "nama", type: "VARCHAR(50)", isNotNull: true },
        { name: "email", type: "VARCHAR(50)", isNotNull: true }
      ],
      rows: [
        { id: 1, nama: "Alexander Kevin", email: "kevin@gmail.com" },
        { id: 2, nama: "Budi Santoso", email: "budi@yahoo.com" },
        { id: 3, nama: "Alexandria Siti", email: "siti@gmail.com" },
        { id: 4, nama: "Cindy Claudia", email: "cindy@perusahaan.co.id" }
      ],
      autoInc: 5
    });

    this.tables.set("pesanan", {
      name: "pesanan",
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "user_id", type: "INT", isNotNull: true },
        { name: "pelanggan", type: "VARCHAR(50)", isNotNull: true },
        { name: "produk", type: "VARCHAR(50)", isNotNull: true },
        { name: "jumlah", type: "INT", isNotNull: false },
        { name: "total", type: "INT", isNotNull: true },
        { name: "nominal", type: "INT", isNotNull: true },
        { name: "status", type: "VARCHAR(20)", isNotNull: true },
        { name: "catatan", type: "VARCHAR(50)", isNotNull: false }
      ],
      rows: [
        { id: 101, user_id: 1, pelanggan: "Kevin Pratama", produk: "MacBook Pro M3", jumlah: 1, total: 24000000, nominal: 24000000, status: "SELESAI", catatan: "Packing aman ya" },
        { id: 102, user_id: 1, pelanggan: "Kevin Pratama", produk: "Logitech MX Master", jumlah: 2, total: 2800000, nominal: 2800000, status: "SELESAI", catatan: "Warna Space Grey" },
        { id: 103, user_id: 2, pelanggan: "Siti Aminah", produk: "Keychron K2 Mechanical", jumlah: 1, total: 1200000, nominal: 1200000, status: "PROSES", catatan: null },
        { id: 104, user_id: 2, pelanggan: "Siti Aminah", produk: "LG UltraFine 4K", jumlah: 1, total: 6500000, nominal: 6500000, status: "PENDING", catatan: null },
        { id: 105, user_id: 4, pelanggan: "Dewi Lestari", produk: "Dell XPS 15", jumlah: 1, total: 21000000, nominal: 21000000, status: "SELESAI", catatan: "Tolong kirim siang" }
      ],
      autoInc: 106
    });

    this.tables.set("buku", {
      name: "buku",
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "judul", type: "VARCHAR(100)", isNotNull: true },
        { name: "penulis", type: "VARCHAR(50)", isNotNull: true },
        { name: "harga", type: "INT", isNotNull: true }
      ],
      rows: [
        { id: 1, judul: "Belajar SQL & Relational Database", penulis: "Kevin Pratama", harga: 85000 },
        { id: 2, judul: "Mastering Clean Architecture in Go", penulis: "M3 Team", harga: 145000 },
        { id: 3, judul: "Spring Boot Microservices", penulis: "Enterprise Architect", harga: 175000 }
      ],
      autoInc: 4
    });

    this.tables.set("skor_game", {
      name: "skor_game",
      columns: [
        { name: "pemain", type: "VARCHAR(30)", isNotNull: true },
        { name: "skor", type: "INT", isNotNull: true }
      ],
      rows: [
        { pemain: "Dewi", skor: 1580 },
        { pemain: "Kevin", skor: 1420 },
        { pemain: "Siti", skor: 1190 },
        { pemain: "Andi", skor: 850 },
        { pemain: "Budi", skor: 670 }
      ],
      autoInc: 6
    });

    this.tables.set("anggota", {
      name: "anggota",
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "nama", type: "VARCHAR(50)", isNotNull: true },
        { name: "status", type: "VARCHAR(20)", isNotNull: true },
        { name: "poin", type: "INT", isNotNull: true }
      ],
      rows: [
        { id: 1, nama: "Kevin Pratama", status: "Silver", poin: 150 },
        { id: 2, nama: "Siti Aminah", status: "Silver", poin: 200 },
        { id: 3, nama: "Budi Santoso", status: "Bronze", poin: 50 }
      ],
      autoInc: 4
    });

    this.tables.set("keranjang", {
      name: "keranjang",
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "produk", type: "VARCHAR(50)", isNotNull: true },
        { name: "qty", type: "INT", isNotNull: true }
      ],
      rows: [
        { id: 1, produk: "Kaos Polos Cotton 30s", qty: 2 },
        { id: 2, produk: "Topi Baseball Snapback", qty: 1 },
        { id: 3, produk: "Stiker Developer Pack", qty: 5 }
      ],
      autoInc: 4
    });

    this.tables.set("penjualan", {
      name: "penjualan",
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "produk", type: "VARCHAR(50)", isNotNull: true },
        { name: "jumlah", type: "INT", isNotNull: true },
        { name: "harga", type: "INT", isNotNull: true }
      ],
      rows: [
        { id: 1, produk: "Laptop", jumlah: 2, harga: 10000000 },
        { id: 2, produk: "Monitor", jumlah: 5, harga: 2000000 },
        { id: 3, produk: "Mouse", jumlah: 10, harga: 250000 },
        { id: 4, produk: "Keyboard", jumlah: 4, harga: 750000 }
      ],
      autoInc: 5
    });
  }

  // --- DDL: CREATE TABLE ---
  handleCreateTable(stmt) {
    const match = stmt.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_`]+)\s*\(([\s\S]+)\)/i);
    if (!match) throw new Error("Sintaks CREATE TABLE tidak valid.");

    const tableName = match[1].replace(/[`"]/g, "");
    const colDefsStr = match[2];
    const columns = [];
    const colDefs = this.splitCommaGuarded(colDefsStr);

    for (const def of colDefs) {
      const trimmed = def.trim();
      if (!trimmed) continue;
      if (/^PRIMARY\s+KEY/i.test(trimmed)) {
        const pkCol = trimmed.match(/PRIMARY\s+KEY\s*\(([^)]+)\)/i);
        if (pkCol) {
          const colName = pkCol[1].replace(/[`"]/g, "").trim();
          const target = columns.find(c => c.name.toLowerCase() === colName.toLowerCase());
          if (target) target.isPrimaryKey = true;
        }
        continue;
      }

      const parts = trimmed.split(/\s+/);
      const colName = parts[0].replace(/[`"]/g, "");
      const colType = (parts[1] || "TEXT").toUpperCase();
      const isPk = /PRIMARY\s+KEY/i.test(trimmed);
      const isNotNull = /NOT\s+NULL/i.test(trimmed) || isPk;
      const isAuto = /AUTO_INCREMENT|SERIAL/i.test(trimmed);

      columns.push({
        name: colName,
        type: colType,
        isPrimaryKey: isPk,
        isNotNull,
        isAutoIncrement: isAuto,
      });
    }

    this.tables.set(tableName.toLowerCase(), {
      name: tableName,
      columns,
      rows: [],
      autoInc: 1,
    });

    return `Query OK: Tabel '${tableName}' berhasil dibuat dengan ${columns.length} kolom.`;
  }

  // --- DDL: DROP TABLE ---
  handleDropTable(stmt) {
    const match = stmt.match(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_`]+)/i);
    if (!match) throw new Error("Sintaks DROP TABLE tidak valid.");
    const tableName = match[1].replace(/[`"]/g, "");
    this.tables.delete(tableName.toLowerCase());
    return `Query OK: Tabel '${tableName}' berhasil dihapus.`;
  }

  // --- DML: INSERT INTO ---
  handleInsert(stmt) {
    const match = stmt.match(/INSERT\s+INTO\s+([a-zA-Z0-9_`]+)(?:\s*\(([^)]+)\))?\s+VALUES\s*([\s\S]+)/i);
    if (!match) throw new Error("Sintaks INSERT INTO tidak valid.");

    const tableName = match[1].replace(/[`"]/g, "");
    const table = this.tables.get(tableName.toLowerCase());
    if (!table) throw new Error(`Tabel '${tableName}' tidak ditemukan. Buat tabel terlebih dahulu dengan CREATE TABLE.`);

    let targetCols = [];
    if (match[2]) {
      targetCols = match[2].split(",").map(c => c.replace(/[`"]/g, "").trim());
    } else {
      targetCols = table.columns.map(c => c.name);
    }

    const valuesBlock = match[3].trim();
    // Parse baris-baris nilai: (1, 'Budi'), (2, 'Siti')
    const valueTuples = this.extractValueTuples(valuesBlock);
    let insertedCount = 0;

    for (const tuple of valueTuples) {
      const vals = this.splitCommaGuarded(tuple).map(v => this.parseLiteral(v.trim()));
      const row = {};

      // Inisialisasi default
      for (const col of table.columns) {
        if (col.isAutoIncrement) {
          row[col.name] = table.autoInc++;
        } else {
          row[col.name] = null;
        }
      }

      // Assign nilai sesuai urutan kolom target
      for (let i = 0; i < targetCols.length; i++) {
        const colName = targetCols[i];
        if (vals[i] !== undefined) {
          row[colName] = vals[i];
        }
      }

      table.rows.push(row);
      insertedCount++;
    }

    return `Query OK, ${insertedCount} row${insertedCount > 1 ? "s" : ""} affected (${insertedCount} baris data berhasil ditambahkan).`;
  }

  // --- DML: UPDATE ---
  handleUpdate(stmt) {
    const match = stmt.match(/UPDATE\s+([a-zA-Z0-9_`]+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!match) throw new Error("Sintaks UPDATE tidak valid.");

    const tableName = match[1].replace(/[`"]/g, "");
    const table = this.tables.get(tableName.toLowerCase());
    if (!table) throw new Error(`Tabel '${tableName}' tidak ditemukan.`);

    const setClause = match[2];
    const whereClause = match[3] || null;

    // Parse SET statements: col1 = val1, col2 = val2
    const setAssignments = this.splitCommaGuarded(setClause).map(assign => {
      const p = assign.split("=");
      return {
        col: p[0].replace(/[`"]/g, "").trim(),
        valExpr: p.slice(1).join("=").trim(),
      };
    });

    let updatedCount = 0;
    for (const row of table.rows) {
      if (!whereClause || this.evaluateCondition(whereClause, row, table)) {
        for (const assign of setAssignments) {
          row[assign.col] = this.parseLiteral(assign.valExpr);
        }
        updatedCount++;
      }
    }

    return `Query OK, ${updatedCount} row${updatedCount > 1 ? "s" : ""} affected (${updatedCount} baris data berhasil diperbarui).`;
  }

  // --- DML: DELETE ---
  handleDelete(stmt) {
    const match = stmt.match(/DELETE\s+FROM\s+([a-zA-Z0-9_`]+)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!match) throw new Error("Sintaks DELETE FROM tidak valid.");

    const tableName = match[1].replace(/[`"]/g, "");
    const table = this.tables.get(tableName.toLowerCase());
    if (!table) throw new Error(`Tabel '${tableName}' tidak ditemukan.`);

    const whereClause = match[2] || null;
    const initialCount = table.rows.length;

    if (!whereClause) {
      table.rows = [];
      return `Query OK, ${initialCount} row${initialCount > 1 ? "s" : ""} affected (Seluruh isi tabel '${tableName}' telah dikosongkan).`;
    }

    table.rows = table.rows.filter(row => !this.evaluateCondition(whereClause, row, table));
    const deletedCount = initialCount - table.rows.length;

    return `Query OK, ${deletedCount} row${deletedCount > 1 ? "s" : ""} affected (${deletedCount} baris data berhasil dihapus).`;
  }

  // --- DML: SELECT ---
  handleSelect(stmt) {
    // Regex parsing SELECT clauses
    const regex = /^SELECT\s+([\s\S]+?)\s+FROM\s+([a-zA-Z0-9_`]+)([\s\S]*)$/i;
    const match = stmt.match(regex);
    if (!match) throw new Error("Sintaks SELECT tidak valid. Format: SELECT ... FROM tabel ...");

    const selectFieldsStr = match[1].trim();
    const fromTableRaw = match[2].replace(/[`"]/g, "").trim();
    const restClauses = match[3] || "";

    const mainTable = this.tables.get(fromTableRaw.toLowerCase());
    if (!mainTable) throw new Error(`Tabel '${fromTableRaw}' tidak ditemukan. Silakan buat tabel dengan CREATE TABLE.`);

    // 1. Tangani JOIN (INNER JOIN, LEFT JOIN, RIGHT JOIN)
    let joinedRows = mainTable.rows.map(r => ({ ...r }));
    let currentColumns = [...mainTable.columns];

    const joinMatch = restClauses.match(/(?:(INNER|LEFT|RIGHT|FULL)\s+)?JOIN\s+([a-zA-Z0-9_`]+)\s+ON\s+([\s\S]+?)(?=\bWHERE\b|\bGROUP\s+BY\b|\bORDER\s+BY\b|\bLIMIT\b|;|$)/i);
    if (joinMatch) {
      const joinType = (joinMatch[1] || "INNER").toUpperCase();
      const joinTableName = joinMatch[2].replace(/[`"]/g, "");
      const onCondition = joinMatch[3].trim();
      const joinTable = this.tables.get(joinTableName.toLowerCase());

      if (!joinTable) throw new Error(`Tabel JOIN '${joinTableName}' tidak ditemukan.`);

      joinedRows = this.performJoin(joinedRows, mainTable, joinTable, onCondition, joinType);
    }

    // 2. WHERE clause
    let filteredRows = joinedRows;
    const whereMatch = restClauses.match(/\bWHERE\s+([\s\S]+?)(?=\bGROUP\s+BY|\bORDER\s+BY|\bLIMIT|$)/i);
    if (whereMatch) {
      const whereCond = whereMatch[1].trim();
      filteredRows = filteredRows.filter(row => this.evaluateCondition(whereCond, row, mainTable));
    }

    // 3. GROUP BY & HAVING
    const groupByMatch = restClauses.match(/\bGROUP\s+BY\s+([\s\S]+?)(?=\bHAVING|\bORDER\s+BY|\bLIMIT|$)/i);
    const havingMatch = restClauses.match(/\bHAVING\s+([\s\S]+?)(?=\bORDER\s+BY|\bLIMIT|$)/i);

    let projectedRows = [];
    const fields = this.splitCommaGuarded(selectFieldsStr).map(f => this.parseSelectField(f.trim()));

    const hasAggregate = fields.some(f => f.aggFunc !== null);

    if (groupByMatch || hasAggregate) {
      const groupCols = groupByMatch
        ? groupByMatch[1].split(",").map(c => c.replace(/[`"]/g, "").trim())
        : [];

      // Kelompokkan data
      const groups = new Map();
      for (const row of filteredRows) {
        const key = groupCols.map(c => String(this.resolveColValue(row, c))).join(":::_:::");
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(row);
      }

      // Jika tidak ada groupCols tetapi ada aggregate dan tidak ada data
      if (groups.size === 0 && hasAggregate && !groupByMatch) {
        groups.set("__ALL__", []);
      }

      for (const [key, groupRows] of groups.entries()) {
        const outRow = {};
        for (const f of fields) {
          const val = this.computeAggregate(f, groupRows);
          outRow[f.alias || f.raw] = val;
        }
        projectedRows.push(outRow);
      }

      if (havingMatch) {
        const havingCond = havingMatch[1].trim();
        projectedRows = projectedRows.filter(row => this.evaluateCondition(havingCond, row, mainTable));
      }
    } else {
      // Proyeksi normal tanpa GROUP BY
      for (const row of filteredRows) {
        const outRow = {};
        for (const f of fields) {
          if (f.raw === "*") {
            Object.assign(outRow, row);
          } else {
            outRow[f.alias || f.raw] = this.resolveColValue(row, f.colName);
          }
        }
        projectedRows.push(outRow);
      }
    }

    // 4. ORDER BY
    const orderByMatch = restClauses.match(/\bORDER\s+BY\s+([\s\S]+?)(?=\bLIMIT|$)/i);
    if (orderByMatch) {
      const orderDef = orderByMatch[1].trim();
      const parts = orderDef.split(/\s+/);
      const orderCol = parts[0].replace(/[`"]/g, "");
      const isDesc = parts[1] && parts[1].toUpperCase() === "DESC";

      projectedRows.sort((a, b) => {
        const valA = a[orderCol] !== undefined ? a[orderCol] : this.resolveColValue(a, orderCol);
        const valB = b[orderCol] !== undefined ? b[orderCol] : this.resolveColValue(b, orderCol);
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        if (valA < valB) return isDesc ? 1 : -1;
        return isDesc ? -1 : 1;
      });
    }

    // 5. LIMIT & OFFSET
    const limitMatch = restClauses.match(/\bLIMIT\s+(\d+)(?:\s+(?:OFFSET|,)\s*(\d+))?/i);
    if (limitMatch) {
      let limit = parseInt(limitMatch[1], 10);
      let offset = limitMatch[2] ? parseInt(limitMatch[2], 10) : 0;
      projectedRows = projectedRows.slice(offset, offset + limit);
    }

    // 6. Format sebagai Tabel Terminal ASCII
    return this.formatAsciiTable(projectedRows, fields);
  }

  // --- JOIN HANDLER ---
  performJoin(rowsA, tableA, tableB, onCondition, joinType) {
    const onParts = onCondition.split("=");
    if (onParts.length !== 2) throw new Error(`Kondisi ON pada JOIN tidak valid: ${onCondition}`);

    const leftRef = onParts[0].trim();
    const rightRef = onParts[1].trim();

    const result = [];

    for (const rA of rowsA) {
      let matched = false;
      for (const rB of tableB.rows) {
        const valLeft = this.resolveColValue(rA, leftRef);
        const valRight = this.resolveColValue(rB, rightRef);

        if (valLeft !== null && valLeft !== undefined && String(valLeft) === String(valRight)) {
          // Gabungkan row A dan row B (sediakan akses dengan dan tanpa prefix tabel)
          const combined = {};
          for (const [k, v] of Object.entries(rA)) {
            combined[k] = v;
            combined[`${tableA.name}.${k}`] = v;
          }
          for (const [k, v] of Object.entries(rB)) {
            combined[`${tableB.name}.${k}`] = v;
            if (combined[k] === undefined) {
              combined[k] = v;
            }
          }
          result.push(combined);
          matched = true;
        }
      }

      if (!matched && (joinType === "LEFT" || joinType === "FULL")) {
        const nullRow = {};
        for (const [k, v] of Object.entries(rA)) {
          nullRow[k] = v;
          nullRow[`${tableA.name}.${k}`] = v;
        }
        for (const c of tableB.columns) {
          nullRow[c.name] = null;
          nullRow[`${tableB.name}.${c.name}`] = null;
        }
        result.push(nullRow);
      }
    }

    return result;
  }

  // --- AGGREGATE COMPUTATION ---
  computeAggregate(field, rows) {
    const fn = field.aggFunc;
    if (!fn) {
      // Bukan fungsi agregat, ambil dari baris pertama jika ada
      return rows[0] ? this.resolveColValue(rows[0], field.colName) : null;
    }

    if (fn === "COUNT") {
      if (field.colName === "*") return rows.length;
      return rows.filter(r => this.resolveColValue(r, field.colName) !== null).length;
    }

    const nums = rows
      .map(r => Number(this.resolveColValue(r, field.colName)))
      .filter(n => !isNaN(n));

    if (nums.length === 0) return 0;

    if (fn === "SUM") return nums.reduce((acc, v) => acc + v, 0);
    if (fn === "AVG") return parseFloat((nums.reduce((acc, v) => acc + v, 0) / nums.length).toFixed(2));
    if (fn === "MIN") return Math.min(...nums);
    if (fn === "MAX") return Math.max(...nums);

    return 0;
  }

  parseSelectField(raw) {
    // col AS alias atau func(col) AS alias
    const asMatch = raw.match(/^(.+?)\s+AS\s+([a-zA-Z0-9_`]+)$/i);
    const expr = asMatch ? asMatch[1].trim() : raw;
    const alias = asMatch ? asMatch[2].replace(/[`"]/g, "").trim() : null;

    const aggMatch = expr.match(/^(COUNT|SUM|AVG|MIN|MAX)\s*\(([^)]+)\)$/i);
    if (aggMatch) {
      return {
        raw,
        aggFunc: aggMatch[1].toUpperCase(),
        colName: aggMatch[2].replace(/[`"]/g, "").trim(),
        alias: alias || expr,
      };
    }

    return {
      raw,
      aggFunc: null,
      colName: expr.replace(/[`"]/g, "").trim(),
      alias: alias || (expr === "*" ? null : expr.replace(/[`"]/g, "").trim()),
    };
  }

  // --- WHERE CONDITION EVALUATOR ---
  evaluateCondition(condition, row, table) {
    // Dukung AND & OR majemuk
    if (/\s+OR\s+/i.test(condition)) {
      const parts = condition.split(/\s+OR\s+/i);
      return parts.some(p => this.evaluateCondition(p.trim(), row, table));
    }
    if (/\s+AND\s+/i.test(condition)) {
      const parts = condition.split(/\s+AND\s+/i);
      return parts.every(p => this.evaluateCondition(p.trim(), row, table));
    }

    // 1. IS NULL & IS NOT NULL
    const isNullMatch = condition.match(/^([a-zA-Z0-9_`.]+)\s+IS\s+(NOT\s+)?NULL$/i);
    if (isNullMatch) {
      const val = this.resolveColValue(row, isNullMatch[1]);
      const isNot = Boolean(isNullMatch[2]);
      const isNull = val === null || val === undefined;
      return isNot ? !isNull : isNull;
    }

    // 2. LIKE 'pattern'
    const likeMatch = condition.match(/^([a-zA-Z0-9_`.]+)\s+LIKE\s+['"]([^'"]+)['"]$/i);
    if (likeMatch) {
      const val = String(this.resolveColValue(row, likeMatch[1]) ?? "");
      const pattern = likeMatch[2];
      const regexStr = "^" + pattern.replace(/%/g, ".*").replace(/_/g, ".") + "$";
      return new RegExp(regexStr, "i").test(val);
    }

    // 3. IN (val1, val2)
    const inMatch = condition.match(/^([a-zA-Z0-9_`.]+)\s+(NOT\s+)?IN\s*\(([^)]+)\)$/i);
    if (inMatch) {
      const val = this.resolveColValue(row, inMatch[1]);
      const isNot = Boolean(inMatch[2]);
      const list = this.splitCommaGuarded(inMatch[3]).map(v => this.parseLiteral(v.trim()));
      const included = list.some(item => String(item) === String(val));
      return isNot ? !included : included;
    }

    // 4. BETWEEN a AND b
    const betweenMatch = condition.match(/^([a-zA-Z0-9_`.]+)\s+BETWEEN\s+(.+?)\s+AND\s+(.+)$/i);
    if (betweenMatch) {
      const val = Number(this.resolveColValue(row, betweenMatch[1]));
      const low = Number(this.parseLiteral(betweenMatch[2]));
      const high = Number(this.parseLiteral(betweenMatch[3]));
      return val >= low && val <= high;
    }

    // 5. Operator Perbandingan: =, !=, <>, >=, <=, >, <
    const compMatch = condition.match(/^([a-zA-Z0-9_`.]+)\s*(=|!=|<>|>=|<=|>|<)\s*(.+)$/);
    if (compMatch) {
      const colName = compMatch[1].trim();
      const op = compMatch[2];
      const rightVal = this.parseLiteral(compMatch[3].trim());
      const leftVal = this.resolveColValue(row, colName);

      if (op === "=") return String(leftVal) === String(rightVal);
      if (op === "!=" || op === "<>") return String(leftVal) !== String(rightVal);
      if (op === ">") return Number(leftVal) > Number(rightVal);
      if (op === "<") return Number(leftVal) < Number(rightVal);
      if (op === ">=") return Number(leftVal) >= Number(rightVal);
      if (op === "<=") return Number(leftVal) <= Number(rightVal);
    }

    return true;
  }

  resolveColValue(row, colRef) {
    if (!row) return null;
    const cleanRef = colRef.replace(/[`"]/g, "").trim();

    // Cek direct property
    if (row[cleanRef] !== undefined) return row[cleanRef];

    // Cek case-insensitive
    for (const [k, v] of Object.entries(row)) {
      if (k.toLowerCase() === cleanRef.toLowerCase()) return v;
    }

    // Jika memiliki prefix nama tabel: mahasiswa.nim
    if (cleanRef.includes(".")) {
      const colOnly = cleanRef.split(".").pop();
      for (const [k, v] of Object.entries(row)) {
        if (k.toLowerCase() === colOnly.toLowerCase()) return v;
      }
    }

    return null;
  }

  parseLiteral(valStr) {
    if (valStr === undefined || valStr === null) return null;
    const trimmed = valStr.trim();
    if (/^null$/i.test(trimmed)) return null;
    if (/^true$/i.test(trimmed)) return true;
    if (/^false$/i.test(trimmed)) return false;
    if ((trimmed.startsWith("'") && trimmed.endsWith("'")) ||
        (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
      return trimmed.slice(1, -1).replace(/''/g, "'");
    }
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
      return Number(trimmed);
    }
    return trimmed;
  }

  extractValueTuples(str) {
    const tuples = [];
    let cur = "";
    let depth = 0;
    let inQuote = false;

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === "'" || ch === '"') {
        inQuote = !inQuote;
        if (depth > 0) cur += ch;
      } else if (ch === "(" && !inQuote) {
        depth++;
        if (depth === 1) cur = "";
        else cur += ch;
      } else if (ch === ")" && !inQuote) {
        depth--;
        if (depth === 0) {
          tuples.push(cur);
          cur = "";
        } else {
          cur += ch;
        }
      } else if (depth > 0) {
        cur += ch;
      }
    }
    return tuples;
  }

  splitCommaGuarded(str) {
    const parts = [];
    let cur = "";
    let inParen = 0;
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === "'" && !inDouble) {
        inSingle = !inSingle;
        cur += ch;
      } else if (ch === '"' && !inSingle) {
        inDouble = !inDouble;
        cur += ch;
      } else if (ch === "(" && !inSingle && !inDouble) {
        inParen++;
        cur += ch;
      } else if (ch === ")" && !inSingle && !inDouble) {
        inParen--;
        cur += ch;
      } else if (ch === "," && inParen === 0 && !inSingle && !inDouble) {
        parts.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    if (cur.trim()) parts.push(cur);
    return parts;
  }

  // --- ASCII TABLE RENDERER ---
  formatAsciiTable(rows, fields) {
    if (!rows || rows.length === 0) {
      // Ambil kolom dari fields
      const cols = fields.map(f => f.alias || f.colName || f.raw).filter(c => c !== "*");
      if (cols.length === 0) cols.push("result");
      const headerBorder = "+" + cols.map(c => "-".repeat(Math.max(c.length + 2, 6))).join("+") + "+";
      const headerRow = "|" + cols.map(c => ` ${c.padEnd(Math.max(c.length, 4))} `).join("|") + "|";
      return `${headerBorder}\n${headerRow}\n${headerBorder}\n(Empty set: 0 baris ditemukan)`;
    }

    const columnNames = Object.keys(rows[0]);
    const colWidths = {};

    for (const col of columnNames) {
      colWidths[col] = col.length;
    }

    for (const row of rows) {
      for (const col of columnNames) {
        const valStr = row[col] === null ? "NULL" : String(row[col]);
        if (valStr.length > colWidths[col]) {
          colWidths[col] = valStr.length;
        }
      }
    }

    const border = "+" + columnNames.map(col => "-".repeat(colWidths[col] + 2)).join("+") + "+";
    const header = "|" + columnNames.map(col => ` ${col.padEnd(colWidths[col])} `).join("|") + "|";

    const dataRows = rows.map(row => {
      return "|" + columnNames.map(col => {
        const val = row[col];
        const valStr = val === null ? "NULL" : String(val);
        // Jika angka, bisa right-align atau left-align
        return ` ${valStr.padEnd(colWidths[col])} `;
      }).join("|") + "|";
    });

    const summary = `(${rows.length} row${rows.length > 1 ? "s" : ""} in set)`;

    return [border, header, border, ...dataRows, border, summary].join("\n");
  }
}
