import { ROADMAP_MODULES } from "../data/curriculum";
import { JAVA_MODULES } from "../data/javaCurriculum";
import { executeGoCode } from "./goRunner";
import { executeJavaCode } from "./javaRunner";

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
];

export function getLanguageConfig(langId = "go") {
  return SUPPORTED_LANGUAGES.find((l) => l.id === langId) || SUPPORTED_LANGUAGES[0];
}

export async function executeMultiCode(rawCode, langId = "go") {
  if (langId === "java") {
    return executeJavaCode(rawCode);
  }
  return executeGoCode(rawCode);
}
