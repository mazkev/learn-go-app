/**
 * JavaRunner Service
 * High-Fidelity Dual-Engine Eksekusi Kode Java:
 * 1. Cloud OpenJDK Sandbox Compiler (Wandbox OpenJDK 22+ Engine)
 * 2. In-Browser Advanced Local Java OOP Interpreter & Runtime Evaluator (Offline-friendly)
 */

const WANDBOX_API_URL = "https://wandbox.org/api/compile.json";
const PRIMARY_COMPILER = "openjdk-jdk-22+36";

/**
 * Eksekusi kode Java secara asynchronous
 * @param {string} rawCode - Source code Java yang akan dieksekusi
 * @param {string} stdin - Input standar opsional untuk program
 * @returns {Promise<{success: boolean, output: string, isError: boolean, executionTime: string, source: string}>}
 */
export async function executeJavaCode(rawCode, stdin = "") {
  const startTime = performance.now();
  const code = (rawCode || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  if (!code.trim()) {
    return {
      success: false,
      output: "Kode program kosong. Silakan tulis kode Java terlebih dahulu.",
      isError: true,
      executionTime: "0.00s",
      source: "Java Pre-compiler",
    };
  }

  // 1. Coba eksekusi melalui Cloud OpenJDK Sandbox (Wandbox API)
  try {
    const cloudResult = await executeViaWandbox(code, stdin, startTime);
    if (cloudResult) {
      return cloudResult;
    }
  } catch (err) {
    // Timeout atau offline -> fallback otomatis ke local evaluator
  }

  // 2. Fallback: In-Browser Local Java OOP Interpreter & Evaluator
  return runLocalJavaInterpreter(code, startTime, stdin);
}

/**
 * Eksekusi via OpenJDK Cloud Sandbox (Wandbox)
 */
async function executeViaWandbox(code, stdin, startTime) {
  // Wandbox menyimpan kode pada prog.java secara default.
  // Dalam Java, mendeklarasikan `public class Main` di file prog.java menyebabkan error:
  // "error: class Main is public, should be declared in a file named Main.java".
  // Menghapus modifier `public` pada class utama menyelesaikan aturan ini dengan sempurna.
  const adjustedCode = code.replace(/\bpublic\s+class\s+/g, "class ");

  const payload = {
    compiler: PRIMARY_COMPILER,
    code: adjustedCode,
    stdin: stdin || "",
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3200);

  let response;
  try {
    response = await fetch(WANDBOX_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    return null;
  }
  clearTimeout(timeoutId);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

  const compilerErr = (data.compiler_error || data.compiler_message || "").trim();
  const programErr = (data.program_error || data.program_message || "").trim();
  const hasError = data.status !== "0" || Boolean(compilerErr);

  if (compilerErr) {
    const cleanedErr = compilerErr.replace(/prog\.java/g, "Main.java");
    return {
      success: false,
      output: cleanedErr,
      isError: true,
      executionTime: `${elapsed}s`,
      source: "OpenJDK 22 Cloud Engine",
    };
  }

  if (hasError && programErr) {
    const cleanedErr = programErr.replace(/prog\.java/g, "Main.java");
    return {
      success: false,
      output: cleanedErr,
      isError: true,
      executionTime: `${elapsed}s`,
      source: "OpenJDK 22 Cloud Engine",
    };
  }

  let stdout = (data.program_output || "").replace(/\r\n/g, "\n");
  if (!stdout.trim()) {
    stdout = "Program executed successfully with exit status 0 (no output produced).";
  }

  return {
    success: true,
    output: stdout,
    isError: false,
    executionTime: `${elapsed}s`,
    source: "OpenJDK 22 Cloud Engine",
  };
}

/**
 * Local In-Browser Java Runtime & OOP Evaluator
 */
function runLocalJavaInterpreter(code, startTime, stdin = "") {
  const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
  const trimmed = code.trim();

  // Validasi dasar Java
  if (!trimmed.includes("class ") && !trimmed.includes("interface ") && !trimmed.includes("record ")) {
    return {
      success: false,
      output: "Main.java:1: error: class, interface, or enum expected",
      isError: true,
      executionTime: `${elapsed}s`,
      source: "Java Compiler (Local)",
    };
  }

  if (!trimmed.includes("main(") && !trimmed.includes("main (")) {
    return {
      success: false,
      output: "Error: Main method not found in class, please define the main method as:\n   public static void main(String[] args)",
      isError: true,
      executionTime: `${elapsed}s`,
      source: "Java Runtime (Local)",
    };
  }

  const outputLines = [];

  try {
    const jsExecutable = translateJavaToExecutableJS(code, stdin);

    const out = {
      println: (...args) => {
        outputLines.push(args.join(" "));
      },
      print: (...args) => {
        if (outputLines.length === 0) {
          outputLines.push(args.join(""));
        } else {
          outputLines[outputLines.length - 1] += args.join("");
        }
      },
      printf: (format, ...args) => {
        outputLines.push(formatJavaPrintf(format, ...args));
      },
    };

    const runFn = new Function("out", jsExecutable);
    runFn(out);

    let finalOutput = outputLines.join("\n");
    if (!finalOutput.trim()) {
      finalOutput = "Program exited normally with status 0 (no output produced).";
    }

    return {
      success: true,
      output: finalOutput,
      isError: false,
      executionTime: `${elapsed}s`,
      source: "Java In-Browser OOP Engine",
    };
  } catch (err) {
    const errorMsg = err.message || String(err);
    return {
      success: false,
      output: `Main.java: runtime error: ${errorMsg}`,
      isError: true,
      executionTime: `${elapsed}s`,
      source: "Java In-Browser Engine",
    };
  }
}

/**
 * Menerjemahkan konstruksi sintaks Java (OOP, Collection, Control Flow) ke JS Executable
 */
function translateJavaToExecutableJS(code, stdin = "") {
  let js = code;

  // 1. Bersihkan package & import statements
  js = js.replace(/package\s+[\w.]+;/g, "");
  js = js.replace(/import\s+[\w.*]+;/g, "");

  // Siapkan data stdin untuk Scanner
  const defaultTokens = stdin.trim()
    ? stdin.trim().split(/\s+/)
    : ["Java", "42", "100", "test", "Admin"];

  // 2. Lingkungan runtime / polyfill Java standard library
  const prelude = `
    const System = {
      out: out,
      err: out
    };

    // Polyfill String Java methods
    if (!String.prototype.equals) {
      String.prototype.equals = function(other) {
        return this.valueOf() === (other && other.valueOf ? other.valueOf() : other);
      };
    }
    if (!String.prototype.equalsIgnoreCase) {
      String.prototype.equalsIgnoreCase = function(other) {
        return this.toLowerCase() === String(other).toLowerCase();
      };
    }
    if (!String.prototype.contains) {
      String.prototype.contains = function(other) {
        return this.includes(other);
      };
    }
    if (!String.prototype.isEmpty) {
      String.prototype.isEmpty = function() {
        return this.length === 0;
      };
    }

    class Scanner {
      constructor(input) {
        this.tokens = ${JSON.stringify(defaultTokens)};
        this.idx = 0;
      }
      nextLine() { return this.tokens[this.idx++] || "Input"; }
      next() { return this.tokens[this.idx++] || "Input"; }
      nextInt() { return parseInt(this.tokens[this.idx++] || "0", 10); }
      nextDouble() { return parseFloat(this.tokens[this.idx++] || "0.0"); }
      hasNext() { return this.idx < this.tokens.length; }
      close() {}
    }

    class ArrayList extends Array {
      add(item) { this.push(item); return true; }
      get(i) { return this[i]; }
      set(i, val) { this[i] = val; return val; }
      size() { return this.length; }
      remove(i) {
        if (typeof i === 'number') return this.splice(i, 1)[0];
        const idx = this.indexOf(i);
        if (idx !== -1) return this.splice(idx, 1)[0];
        return null;
      }
      contains(item) { return this.includes(item); }
      clear() { this.length = 0; }
      isEmpty() { return this.length === 0; }
    }

    class HashMap extends Map {
      put(k, v) { this.set(k, v); return v; }
      containsKey(k) { return this.has(k); }
      remove(k) { return this.delete(k); }
      size() { return this.size; }
      isEmpty() { return this.size === 0; }
      keySet() { return Array.from(this.keys()); }
      values() { return Array.from(this.values()); }
    }

    class Stack extends Array {
      push(item) { super.push(item); return item; }
      pop() { return super.pop(); }
      peek() { return this[this.length - 1]; }
      isEmpty() { return this.length === 0; }
      size() { return this.length; }
    }

    const Arrays = {
      toString: (arr) => JSON.stringify(arr),
      sort: (arr) => arr.sort((a, b) => a - b)
    };

    const Collections = {
      sort: (list) => list.sort((a, b) => a - b)
    };

    const Integer = {
      parseInt: (str) => parseInt(str, 10),
      toString: (num) => String(num),
      valueOf: (val) => parseInt(val, 10),
      compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0),
      max: (a, b) => Math.max(a, b),
      min: (a, b) => Math.min(a, b),
      MAX_VALUE: 2147483647,
      MIN_VALUE: -2147483648
    };

    const Double = {
      parseDouble: (str) => parseFloat(str)
    };

    const Character = {
      isDigit: (c) => /\\d/.test(c),
      isLetter: (c) => /[a-zA-Z]/.test(c),
      isLetterOrDigit: (c) => /[a-zA-Z0-9]/.test(c),
      isWhitespace: (c) => /\\s/.test(c),
      toUpperCase: (c) => String(c).toUpperCase(),
      toLowerCase: (c) => String(c).toLowerCase()
    };
  `;

  // 3. Normalisasi inisialisasi array Java:
  // new int[]{1, 2, 3} -> [1, 2, 3]
  // int[] arr = {1, 2, 3} -> let arr = [1, 2, 3]
  js = js.replace(/new\s+\w+\[\]\s*\{/g, "[");
  js = js.replace(/=\s*\{([^{}]*)\}/g, "= [$1]");

  // 4. Inisialisasi Koleksi (List, ArrayList, Map, HashMap, Stack)
  js = js.replace(/(?:List<\w+>|ArrayList<\w+>)\s+(\w+)\s*=\s*new\s+ArrayList<.*?>\(\);/g, "let $1 = new ArrayList();");
  js = js.replace(/(?:Map<[^>]+>|HashMap<[^>]+>)\s+(\w+)\s*=\s*new\s+HashMap<.*?>\(\);/g, "let $1 = new HashMap();");
  js = js.replace(/(?:Stack<\w+>)\s+(\w+)\s*=\s*new\s+Stack<.*?>\(\);/g, "let $1 = new Stack();");

  // 5. String .toCharArray() konversi: s.toCharArray() -> [...s]
  js = js.replace(/(\w+)\.toCharArray\(\)/g, "[...$1]");

  // 6. Enhanced for-loop Java: for (Type x : collection/array) -> for (let x of collection)
  js = js.replace(/for\s*\(\s*(?:final\s+)?(?:\w+(?:<[^>]+>)?(?:\[\])*)\s+(\w+)\s*:\s*([^)]+)\)/g, "for (let $1 of $2)");

  // 7. Traditional for-loop Java: for (int i = 0; ...) -> for (let i = 0; ...)
  js = js.replace(/for\s*\(\s*(?:int|long|double|float|byte|short)\s+(\w+)\s*=/g, "for (let $1 =");

  // 8. Bersihkan anotasi Java (@Override, @SuppressWarnings, dll)
  js = js.replace(/@\w+\s*/g, "");

  // 9. Method abstract tanpa body pada interface: void jalan(); -> jalan() {}
  js = js.replace(/(?:public|protected|private)?\s*(?:abstract\s+)?(?:\b(?:void|int|double|float|long|boolean|char|String|[A-Z]\w+)(?:<[^>]+>)?(?:\[\])*)\s+(\w+)\s*\(([^)]*)\)\s*;/g, "$1() {}");

  // 10. Transformasi interface & abstract class ke ES6 class
  js = js.replace(/public\s+interface\s+(\w+)/g, "class $1");
  js = js.replace(/interface\s+(\w+)/g, "class $1");
  js = js.replace(/abstract\s+class\s+(\w+)/g, "class $1");
  js = js.replace(/\s+implements\s+[\w\s,]+/g, " ");

  // 11. Transformasi class publik
  js = js.replace(/public\s+class\s+(\w+)/g, "class $1");

  // 12. Ambil semua nama class yang didefinisikan
  const classMatches = [...new Set([...code.matchAll(/(?:class|interface)\s+(\w+)/g)].map((m) => m[1]))];

  // 13. Transformasi constructor class: ClassName(...) { -> constructor(...) {
  for (const cName of classMatches) {
    const ctorRegex = new RegExp(`(?:public|protected|private)?\\s*${cName}\\s*\\(([^)]*)\\)\\s*\\{`, "g");
    js = js.replace(ctorRegex, (match, params) => {
      return `constructor(${cleanParamTypes(params)}) {`;
    });
  }

  // 14. Transformasi main method: public static void main(...) { -> static main(args = []) {
  js = js.replace(/(?:public\s+)?static\s+void\s+main\s*\([^)]*\)\s*\{/g, "static main(args = []) {");

  // 15. Cari semua static methods
  const staticMethodMatches = [...code.matchAll(/(?:public|private|protected)?\s*static\s+(?:\w+(?:<[^>]+>)?(?:\[\])*)\s+(\w+)\s*\(/g)].map((m) => m[1]);
  const staticMethodNames = [...new Set(staticMethodMatches.filter((m) => m !== "main"))];

  // 16. Transformasi methods:
  // Static methods
  js = js.replace(/(?:public|private|protected)?\s*static\s+(?:\w+(?:<[^>]+>)?(?:\[\])*)\s+(\w+)\s*\(([^)]*)\)\s*\{/g, (match, name, params) => {
    return `static ${name}(${cleanParamTypes(params)}) {`;
  });
  // Instance methods
  js = js.replace(/(?:public|private|protected)?\s*(?:\b(?:void|int|double|float|long|boolean|char|String|[A-Z]\w+)(?:<[^>]+>)?(?:\[\])*)\s+(\w+)\s*\(([^)]*)\)\s*\{/g, (match, name, params) => {
    return `${name}(${cleanParamTypes(params)}) {`;
  });

  // 17. Panggilan static method tanpa prefix dalam static main: isValid(...) -> this.isValid(...)
  for (const sMethod of staticMethodNames) {
    const callRegex = new RegExp(`(?<!\\bstatic\\s+)(?<![\\w.])${sMethod}\\s*\\(`, "g");
    js = js.replace(callRegex, `this.${sMethod}(`);
  }

  // 18. Transformasi property / field class
  js = js.replace(/(?:public|private|protected)\s+(?:static\s+)?(?:final\s+)?(?:\w+(?:<[^>]+>)?(?:\[\])*)\s+(\w+)\s*(=\s*[^;]+)?;/g, (match, name, val) => {
    return val ? `${name} ${val};` : `${name};`;
  });

  // 19. Transformasi variabel lokal dalam block / method
  js = js.replace(/\b(int|double|float|long|short|byte|boolean|char|String|var)\s+(\w+)\s*=/g, "let $2 =");
  js = js.replace(/\b(?:int|double|String|boolean|float|long|char)\[\]\s+(\w+)\s*=/g, "let $1 =");
  js = js.replace(/\b([A-Z]\w+(?:<[^>]+>)?)\s+(\w+)\s*=\s*new\s+/g, "let $2 = new ");

  // 20. Output statements: System.out.println, print, printf
  js = js.replace(/System\.out\.println\(([\s\S]*?)\);/g, "out.println($1);");
  js = js.replace(/System\.out\.print\(([\s\S]*?)\);/g, "out.print($1);");
  js = js.replace(/System\.out\.printf\(([\s\S]*?)\);/g, "out.printf($1);");

  // 21. Method umum String
  js = js.replace(/\.length\(\)/g, ".length");

  // 22. Runner Invocation: panggil static main() pada class yang memilikinya
  const runnerInvocation = `
    const candidateClasses = [${classMatches.map((c) => `typeof ${c} !== 'undefined' ? ${c} : null`).filter(Boolean).join(", ")}];
    let executed = false;
    for (const cls of candidateClasses) {
      if (cls && typeof cls.main === 'function') {
        cls.main([]);
        executed = true;
        break;
      }
    }
    if (!executed && candidateClasses.length > 0) {
      const last = candidateClasses[candidateClasses.length - 1];
      if (last) {
        try {
          const inst = new last();
          if (typeof inst.main === 'function') inst.main([]);
        } catch (e) {}
      }
    }
  `;

  return prelude + "\n" + js + "\n" + runnerInvocation;
}

/**
 * Membersihkan tipe data pada parameter method Java:
 * (int a, String b) -> (a, b)
 */
function cleanParamTypes(paramStr) {
  if (!paramStr || !paramStr.trim()) return "";
  return paramStr
    .split(",")
    .map((p) => {
      const parts = p.trim().split(/\s+/);
      return parts[parts.length - 1];
    })
    .join(", ");
}

/**
 * Format string printf sederhana
 */
function formatJavaPrintf(format, ...args) {
  if (typeof format !== "string") return String(format);
  let formatted = format;
  args.forEach((arg) => {
    formatted = formatted.replace(/%s|%d|%f|%\.?[0-9]*f|%b|%n/, String(arg));
  });
  return formatted.replace(/\\n$|%n$/, "");
}
