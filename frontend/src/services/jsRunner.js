/**
 * JavaScript & TypeScript Runner Service
 * Engine eksekusi kode JS/TS instan berbasis in-browser sandbox runner & console interceptor.
 */

export async function executeJsCode(rawCode) {
  const startTime = performance.now();
  const code = (rawCode || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const logs = [];

  // Custom Console Interceptor
  const customConsole = {
    log: (...args) => {
      logs.push(args.map((a) => formatArg(a)).join(" "));
    },
    error: (...args) => {
      logs.push(`[ERROR] ` + args.map((a) => formatArg(a)).join(" "));
    },
    warn: (...args) => {
      logs.push(`[WARN] ` + args.map((a) => formatArg(a)).join(" "));
    },
    info: (...args) => {
      logs.push(`[INFO] ` + args.map((a) => formatArg(a)).join(" "));
    },
  };

  function formatArg(arg) {
    if (typeof arg === "object" && arg !== null) {
      try {
        return JSON.stringify(arg, null, 2);
      } catch {
        return String(arg);
      }
    }
    return String(arg);
  }

  try {
    // Strip simple TypeScript type annotations for browser runtime
    let sanitizedCode = code
      .replace(/:\s*(string|number|boolean|any|void|object|unknown|never)(\[\])?/g, "")
      .replace(/interface\s+\w+\s*\{[^}]*\}/g, "")
      .replace(/type\s+\w+\s*=\s*[^;]+;/g, "");

    // Execute in sandboxed Function
    const runner = new Function("console", `"use strict";\n${sanitizedCode}`);
    const result = runner(customConsole);

    if (result instanceof Promise) {
      await result;
    }

    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    const outputText = logs.length > 0 ? logs.join("\n") : "Program executed successfully with 0 output.";

    return {
      success: true,
      output: outputText,
      isError: false,
      executionTime: `${elapsed}s`,
      source: "JavaScript V8 Sandbox Engine",
    };
  } catch (err) {
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    return {
      success: false,
      output: `${err.name}: ${err.message}`,
      isError: true,
      executionTime: `${elapsed}s`,
      source: "JavaScript V8 Sandbox Engine",
    };
  }
}
