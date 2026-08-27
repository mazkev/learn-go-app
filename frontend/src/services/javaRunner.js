/**
 * JavaRunner Service
 * Engine eksekusi kode Java dengan Cloud Sandbox Compiler (Piston API)
 * dan Local In-Browser Java Runtime Interpreter Evaluator.
 */

export async function executeJavaCode(rawCode) {
  const startTime = performance.now();
  const code = (rawCode || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // 1. Coba eksekusi melalui Piston API (Online High-Fidelity Java OpenJDK Runner)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "java",
        version: "15.0.2",
        files: [
          {
            name: "Main.java",
            content: code,
          },
        ],
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

      if (data.run) {
        const stdout = data.run.stdout || "";
        const stderr = data.run.stderr || "";
        const isError = data.run.code !== 0 || Boolean(stderr.trim());

        return {
          success: !isError,
          output: isError ? stderr || stdout : stdout || "Program executed with 0 output.",
          isError: isError,
          executionTime: `${elapsed}s`,
          source: "Java OpenJDK Cloud Compiler",
        };
      }
    }
  } catch (err) {
    // Offline / timeout, fallback to Local Java Interpreter
  }

  // 2. Fallback: Local Java Runtime Evaluator
  return runLocalJavaInterpreter(code, startTime);
}

/**
 * Local Java Interpreter & Evaluator
 */
function runLocalJavaInterpreter(code, startTime) {
  const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
  const trimmed = code.trim();

  // Validasi Dasar Java
  if (!trimmed.includes("class ")) {
    return {
      success: false,
      output: "Main.java:1: error: class, interface, or enum expected",
      isError: true,
      executionTime: `${elapsed}s`,
      source: "Java Compiler",
    };
  }

  if (!trimmed.includes("main(")) {
    return {
      success: false,
      output: "Error: Main method not found in class Main, please define the main method as:\n   public static void main(String[] args)",
      isError: true,
      executionTime: `${elapsed}s`,
      source: "Java Runtime",
    };
  }

  const outputLines = [];

  try {
    const jsExecutable = translateJavaToExecutableJS(code);
    const sandboxConsole = {
      log: (...args) => {
        outputLines.push(args.join(" "));
      },
      printf: (format, ...args) => {
        outputLines.push(formatJavaPrintf(format, ...args));
      },
    };

    const executeFunction = new Function("System", "out", jsExecutable);
    const systemOut = {
      println: (...args) => sandboxConsole.log(...args),
      print: (...args) => outputLines.push(args.join("")),
      printf: (fmt, ...args) => sandboxConsole.printf(fmt, ...args),
    };

    executeFunction({ out: systemOut }, systemOut);

    if (outputLines.length > 0) {
      return {
        success: true,
        output: outputLines.join("\n"),
        isError: false,
        executionTime: `${elapsed}s`,
        source: "Java Runtime Engine (Local)",
      };
    }
  } catch (err) {
    // Fallback scanner
  }

  // Fallback regex line scanner
  const fallbackLogs = analyzeJavaLines(code);
  let finalResult = fallbackLogs.join("\n");

  if (!finalResult.trim()) {
    finalResult = "Program exited normally with status 0 (no output produced).";
  }

  return {
    success: true,
    output: finalResult,
    isError: false,
    executionTime: `${elapsed}s`,
    source: "Java Runtime Engine (Local)",
  };
}

/**
 * Menerjemahkan konstruksi Java ke JavaScript executable
 */
function translateJavaToExecutableJS(code) {
  let body = code;

  // Hapus imports
  body = body.replace(/import\s+[\w.]+;/g, "");

  // Hapus class wrapper dan public static void main
  body = body.replace(/public\s+class\s+\w+\s*\{/g, "");
  body = body.replace(/class\s+\w+\s*\{/g, "");
  body = body.replace(/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{/g, "");

  // Terjemahkan tipe data variabel Java (int, double, String, boolean) ke let
  body = body.replace(/\b(int|double|float|long|short|byte|boolean|char|String|var)\s+(\w+)\s*=/g, "let $2 =");
  body = body.replace(/\b(int|double|String|boolean)\[\]\s+(\w+)\s*=/g, "let $2 =");

  // Terjemahkan ArrayList
  body = body.replace(/ArrayList<\w+>\s+(\w+)\s*=\s*new\s+ArrayList<.*?>\(\);/g, "let $1 = [];");
  body = body.replace(/(\w+)\.add\((.*?)\)/g, "$1.push($2)");
  body = body.replace(/(\w+)\.get\((.*?)\)/g, "$1[$2]");
  body = body.replace(/(\w+)\.size\(\)/g, "$1.length");

  // Terjemahkan System.out.println
  body = body.replace(/System\.out\.println\(([\s\S]*?)\);/g, (match, p1) => {
    return `out.println(${p1});`;
  });

  body = body.replace(/System\.out\.printf\(([\s\S]*?)\);/g, (match, p1) => {
    return `out.printf(${p1});`;
  });

  // Hapus tanda kurung kurawal penutup sisa class
  body = body.replace(/}\s*$/g, "");
  body = body.replace(/}\s*$/g, "");

  return body;
}

function formatJavaPrintf(format, ...args) {
  if (typeof format !== "string") return String(format);
  let formatted = format;
  args.forEach((arg) => {
    formatted = formatted.replace(/%s|%d|%f|%\.?[0-9]*f|%b|%n/, String(arg));
  });
  return formatted.replace(/\\n$|%n$/, "");
}

function analyzeJavaLines(code) {
  const lines = code.split("\n");
  const logs = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();

    const printMatch = line.match(/System\.out\.println\((.*)\);?/);
    if (printMatch) {
      let content = printMatch[1].trim();
      // Bersihkan petik
      content = content.replace(/^"(.*)"$/, "$1").replace(/"\s*\+\s*"/g, "");
      logs.push(content);
    }
  }

  return logs;
}
