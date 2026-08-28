import { ROADMAP_MODULES } from "../data/curriculum";
import { JAVA_MODULES } from "../data/javaCurriculum";
import { PYTHON_MODULES } from "../data/pythonCurriculum";
import { executeGoCode } from "./goRunner";
import { executeJavaCode } from "./javaRunner";
import { executePythonCode } from "./pythonRunner";

export const SUPPORTED_LANGUAGES = [
  {
    id: "go",
    name: "Go (Golang)",
    shortName: "Go",
    icon: "🐹",
    color: "#00ADD8",
    editorLang: "go",
    tagline: "High-Performance Concurrency & Cloud Native",
    modules: ROADMAP_MODULES,
    starterCode: `package main

import "fmt"

func main() {
    fmt.Println("Halo dari M3.learn!")
}`,
  },
  {
    id: "java",
    name: "Java (OOP & JVM)",
    shortName: "Java",
    icon: "☕",
    color: "#f89820",
    editorLang: "java",
    tagline: "Enterprise Grade & Object-Oriented Programming",
    modules: JAVA_MODULES,
    starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Halo dari M3.learn!");
    }
}`,
  },
  {
    id: "python",
    name: "Python 3",
    shortName: "Python",
    icon: "🐍",
    color: "#3776AB",
    editorLang: "python",
    tagline: "Clean Syntax, Data Science & Web APIs",
    modules: PYTHON_MODULES,
    starterCode: `# Python 3 di M3.learn
print("Halo dari M3.learn!")
print("Belajar Python jadi sangat mudah dan ringkas.")`,
  },
];

// In-Memory Execution Memoization Map
const executionCache = new Map();
const MAX_CACHE_ENTRIES = 120;

function computeCodeHash(langId, code) {
  const normalized = (code || "").trim().replace(/\r\n/g, "\n");
  let hash = 0;
  const str = `${langId}:::${normalized}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `m3_exec_${langId}_${hash}`;
}

export function getLanguageConfig(langId = "go") {
  return SUPPORTED_LANGUAGES.find((l) => l.id === langId) || SUPPORTED_LANGUAGES[0];
}

export async function executeMultiCode(rawCode, langId = "go", forceLive = false) {
  const cacheKey = computeCodeHash(langId, rawCode);

  // 1. Check in-memory & session storage cache (0ms instant execution)
  if (!forceLive) {
    if (executionCache.has(cacheKey)) {
      const cached = executionCache.get(cacheKey);
      return {
        ...cached,
        executionTime: "0.00s (⚡ Instant Cache)",
        cached: true,
      };
    }
    try {
      const stored = sessionStorage.getItem(cacheKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        executionCache.set(cacheKey, parsed);
        return {
          ...parsed,
          executionTime: "0.00s (⚡ Instant Cache)",
          cached: true,
        };
      }
    } catch {}
  }

  // 2. Live Cloud / Runtime Execution
  let result;
  if (langId === "java") {
    result = await executeJavaCode(rawCode);
  } else if (langId === "python") {
    result = await executePythonCode(rawCode);
  } else {
    result = await executeGoCode(rawCode);
  }

  // 3. Cache successful results
  if (result && result.success && !result.isError) {
    if (executionCache.size >= MAX_CACHE_ENTRIES) {
      const firstKey = executionCache.keys().next().value;
      executionCache.delete(firstKey);
    }
    executionCache.set(cacheKey, result);
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
    } catch {}
  }

  return result;
}

