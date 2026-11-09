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
    this.tables = new Map(); // tableName (lowercase) -> { name, columns: [], rows: [], autoInc: 1 }
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

    if (upper.startsWith("CREATE TABLE")) {
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
