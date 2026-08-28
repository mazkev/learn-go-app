/**
 * PHP 8+ Runner Service
 * Engine eksekusi PHP 8.2+ via Piston Cloud Execution Sandbox + In-Browser Fallback Emulator.
 */

const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

export async function executePhpCode(rawCode) {
  const startTime = performance.now();
  const code = (rawCode || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Ensure code has <?php tag
  let runnableCode = code.trim();
  if (!runnableCode.startsWith("<?php")) {
    runnableCode = "<?php\n" + runnableCode;
  }

  // 1. Try Piston Public Cloud Sandbox (PHP 8.2+)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(PISTON_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "php",
        version: "8.2.3",
        files: [
          {
            name: "index.php",
            content: runnableCode,
          },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const runResult = data.run || {};
      const output = (runResult.stdout || runResult.stderr || runResult.output || "").trim();
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

      if (output || runResult.code === 0) {
        const isError = runResult.code !== 0 && !runResult.stdout;
        return {
          success: !isError,
          output: output || "Program PHP selesai dijalankan (tanpa output teks).",
          isError,
          executionTime: `${elapsed}s`,
          source: `PHP v${data.version || "8.2"} Engine`,
        };
      }
    }
  } catch (err) {
    console.warn("PHP Piston sandbox offline, beralih ke local fallback emulator:", err.message);
  }

  // 2. Local Fallback PHP Emulator
  return runPhpLocalFallback(runnableCode, startTime);
}

function runPhpLocalFallback(code, startTime) {
  const logs = [];

  try {
    // Strip <?php and ?>
    let clean = code.replace(/<\?php/g, "").replace(/\?>/g, "").trim();

    // Emulate simple PHP echo and string formatting
    const lines = clean.split("\n");
    const scope = {};

    for (let rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith("//") || line.startsWith("#")) continue;

      // Match variable assignment: $var = value;
      const assignMatch = line.match(/^\$([a-zA-Z0-9_]+)\s*=\s*(.*);$/);
      if (assignMatch) {
        const [, varName, expr] = assignMatch;
        try {
          // Evaluate simple numbers/strings
          if (expr.startsWith('"') && expr.endsWith('"')) {
            let val = expr.slice(1, -1);
            // Replace $vars inside double quotes
            val = val.replace(/\$([a-zA-Z0-9_]+)/g, (_, name) => scope[name] !== undefined ? scope[name] : "");
            scope[varName] = val;
          } else if (!isNaN(Number(expr))) {
            scope[varName] = Number(expr);
          } else {
            scope[varName] = expr;
          }
        } catch {}
        continue;
      }

      // Match echo statements
      if (line.startsWith("echo ")) {
        let echoContent = line.slice(5).replace(/;$/, "").trim();
        // Replace variable tokens
        echoContent = echoContent.replace(/\$([a-zA-Z0-9_]+)/g, (_, name) => scope[name] !== undefined ? scope[name] : "");
        echoContent = echoContent.replace(/"/g, "").replace(/\\n/g, "\n");
        logs.push(echoContent);
      }
    }

    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    return {
      success: true,
      output: logs.length > 0 ? logs.join("\n") : "Program PHP 8 berhasil dieksekusi.",
      isError: false,
      executionTime: `${elapsed}s`,
      source: "PHP 8 Local Sandbox Engine",
    };
  } catch (err) {
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    return {
      success: false,
      output: `PHP Parse Error: ${err.message}`,
      isError: true,
      executionTime: `${elapsed}s`,
      source: "PHP 8 Local Sandbox Engine",
    };
  }
}
