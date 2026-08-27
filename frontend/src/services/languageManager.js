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

export function getLanguageConfig(langId = "go") {
  return SUPPORTED_LANGUAGES.find((l) => l.id === langId) || SUPPORTED_LANGUAGES[0];
}

export async function executeMultiCode(rawCode, langId = "go") {
  if (langId === "java") {
    return executeJavaCode(rawCode);
  }
  if (langId === "python") {
    return executePythonCode(rawCode);
  }
  return executeGoCode(rawCode);
}
