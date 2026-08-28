import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Code,
  Play,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  HelpCircle,
  Terminal,
  Trophy,
  Flame,
  ArrowRight,
  Check,
  Lightbulb,
  Unlock,
  Copy,
  ExternalLink,
  Timer,
  Pause,
  Layers,
  AlertCircle,
  Zap
} from "lucide-react";
import { executeMultiCode, SUPPORTED_LANGUAGES } from "../../services/languageManager";
import FriendlyErrorBox from "../common/FriendlyErrorBox";

export const CODING_CHALLENGES = [
  {
    id: "fizzbuzz",
    title: "1. FizzBuzz Klasik",
    difficulty: "Easy",
    category: "Logika & Percabangan",
    description: `Diberikan sebuah angka integer \`n\`. Buatlah fungsi yang mengembalikan string berdasarkan aturan HackerRank:
- Jika \`n\` kelipatan 3 dan 5, kembalikan **"FizzBuzz"**
- Jika \`n\` kelipatan 3, kembalikan **"Fizz"**
- Jika \`n\` kelipatan 5, kembalikan **"Buzz"**
- Jika bukan kelipatan keduanya, kembalikan angka tersebut dalam bentuk string (contoh: **"7"**)`,
    starters: {
      go: `package main

import (
    "fmt"
    "strconv"
)

// Selesaikan fungsi FizzBuzz di bawah ini:
func FizzBuzz(n int) string {
    // TODO: Tulis kodemu di sini
    
    return ""
}

func main() {
    fmt.Println(FizzBuzz(3))
}`,
      python: `# Selesaikan fungsi FizzBuzz di bawah ini:
def fizz_buzz(n: int) -> str:
    # TODO: Tulis kodemu di sini
    pass

if __name__ == "__main__":
    print(fizz_buzz(3))`,
      javascript: `// Selesaikan fungsi fizzBuzz di bawah ini:
function fizzBuzz(n) {
    // TODO: Tulis kodemu di sini
    return "";
}

console.log(fizzBuzz(3));`,
      java: `public class Main {
    public static String fizzBuzz(int n) {
        // TODO: Tulis kodemu di sini
        return "";
    }

    public static void main(String[] args) {
        System.out.println(fizzBuzz(3));
    }
}`,
      php: `<?php
function fizzBuzz($n) {
    // TODO: Tulis kodemu di sini
    return "";
}

echo fizzBuzz(3);`,
    },
    solutions: {
      go: `package main

import (
    "fmt"
    "strconv"
)

func FizzBuzz(n int) string {
    if n%15 == 0 {
        return "FizzBuzz"
    } else if n%3 == 0 {
        return "Fizz"
    } else if n%5 == 0 {
        return "Buzz"
    }
    return strconv.Itoa(n)
}

func main() {
    fmt.Println(FizzBuzz(3))
}`,
      python: `def fizz_buzz(n: int) -> str:
    if n % 15 == 0:
        return "FizzBuzz"
    elif n % 3 == 0:
        return "Fizz"
    elif n % 5 == 0:
        return "Buzz"
    return str(n)

if __name__ == "__main__":
    print(fizz_buzz(3))`,
      javascript: `function fizzBuzz(n) {
    if (n % 15 === 0) return "FizzBuzz";
    if (n % 3 === 0) return "Fizz";
    if (n % 5 === 0) return "Buzz";
    return String(n);
}

console.log(fizzBuzz(3));`,
      java: `public class Main {
    public static String fizzBuzz(int n) {
        if (n % 15 == 0) return "FizzBuzz";
        if (n % 3 == 0) return "Fizz";
        if (n % 5 == 0) return "Buzz";
        return String.valueOf(n);
    }

    public static void main(String[] args) {
        System.out.println(fizzBuzz(3));
    }
}`,
      php: `<?php
function fizzBuzz($n) {
    if ($n % 15 === 0) return "FizzBuzz";
    if ($n % 3 === 0) return "Fizz";
    if ($n % 5 === 0) return "Buzz";
    return (string)$n;
}

echo fizzBuzz(3);`,
    },
    testCases: [
      { id: 1, inputDisplay: "n = 3", expected: "Fizz", isHidden: false, call: { go: "fmt.Println(FizzBuzz(3))", python: "print(fizz_buzz(3))", javascript: "console.log(fizzBuzz(3));", java: "System.out.println(fizzBuzz(3));", php: "echo fizzBuzz(3);" } },
      { id: 2, inputDisplay: "n = 5", expected: "Buzz", isHidden: false, call: { go: "fmt.Println(FizzBuzz(5))", python: "print(fizz_buzz(5))", javascript: "console.log(fizzBuzz(5));", java: "System.out.println(fizzBuzz(5));", php: "echo fizzBuzz(5);" } },
      { id: 3, inputDisplay: "n = 15", expected: "FizzBuzz", isHidden: true, call: { go: "fmt.Println(FizzBuzz(15))", python: "print(fizz_buzz(15))", javascript: "console.log(fizzBuzz(15));", java: "System.out.println(fizzBuzz(15));", php: "echo fizzBuzz(15);" } },
      { id: 4, inputDisplay: "n = 7", expected: "7", isHidden: true, call: { go: "fmt.Println(FizzBuzz(7))", python: "print(fizz_buzz(7))", javascript: "console.log(fizzBuzz(7));", java: "System.out.println(fizzBuzz(7));", php: "echo fizzBuzz(7);" } },
      { id: 5, inputDisplay: "n = 30", expected: "FizzBuzz", isHidden: true, call: { go: "fmt.Println(FizzBuzz(30))", python: "print(fizz_buzz(30))", javascript: "console.log(fizzBuzz(30));", java: "System.out.println(fizzBuzz(30));", php: "echo fizzBuzz(30);" } },
    ],
    hints: [
      "Gunakan operator modulo '%' untuk mengecek sisa bagi (misal n%3 == 0).",
      "Periksa kondisi kelipatan 15 (kelipatan 3 DAN 5) paling awal sebelum mengecek kelipatan 3 atau 5.",
      "Ubah integer ke string jika bukan kelipatan 3 atau 5.",
    ],
    xpReward: 50,
  },
  {
    id: "palindrome",
    title: "2. Deteksi Kata Palindrome",
    difficulty: "Easy",
    category: "String & Two Pointers",
    description: `Diberikan sebuah string kata \`s\`. Periksa apakah kata tersebut merupakan **Palindrome** (jika dibaca dari depan maupun belakang hasilnya persis sama).
- Kembalikan \`true\` jika kata tersebut palindrome.
- Kembalikan \`false\` jika bukan.
- Contoh: \`"katak"\` $\\rightarrow$ \`true\`, \`"golang"\` $\\rightarrow$ \`false\`.`,
    starters: {
      go: `package main

import "fmt"

func IsPalindrome(s string) bool {
    // TODO: Tulis kodemu di sini
    return false
}

func main() {
    fmt.Println(IsPalindrome("katak"))
}`,
      python: `def is_palindrome(s: str) -> bool:
    # TODO: Tulis kodemu di sini
    return False

if __name__ == "__main__":
    print(is_palindrome("katak"))`,
      javascript: `function isPalindrome(s) {
    // TODO: Tulis kodemu di sini
    return false;
}

console.log(isPalindrome("katak"));`,
      java: `public class Main {
    public static boolean isPalindrome(String s) {
        // TODO: Tulis kodemu di sini
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("katak"));
    }
}`,
      php: `<?php
function isPalindrome($s) {
    // TODO: Tulis kodemu di sini
    return false;
}

echo isPalindrome("katak") ? "true" : "false";`,
    },
    solutions: {
      go: `package main

import "fmt"

func IsPalindrome(s string) bool {
    n := len(s)
    for i := 0; i < n/2; i++ {
        if s[i] != s[n-1-i] {
            return false
        }
    }
    return true
}

func main() {
    fmt.Println(IsPalindrome("katak"))
}`,
      python: `def is_palindrome(s: str) -> bool:
    return s == s[::-1]

if __name__ == "__main__":
    print(is_palindrome("katak"))`,
      javascript: `function isPalindrome(s) {
    const rev = s.split("").reverse().join("");
    return s === rev;
}

console.log(isPalindrome("katak"));`,
      java: `public class Main {
    public static boolean isPalindrome(String s) {
        int n = s.length();
        for (int i = 0; i < n/2; i++) {
            if (s.charAt(i) != s.charAt(n - 1 - i)) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("katak"));
    }
}`,
      php: `<?php
function isPalindrome($s) {
    return $s === strrev($s);
}

echo isPalindrome("katak") ? "true" : "false";`,
    },
    testCases: [
      { id: 1, inputDisplay: 's = "katak"', expected: "true", isHidden: false, call: { go: 'fmt.Println(IsPalindrome("katak"))', python: 'print(str(is_palindrome("katak")).lower())', javascript: 'console.log(isPalindrome("katak"));', java: 'System.out.println(isPalindrome("katak"));', php: 'echo isPalindrome("katak") ? "true" : "false";' } },
      { id: 2, inputDisplay: 's = "golang"', expected: "false", isHidden: false, call: { go: 'fmt.Println(IsPalindrome("golang"))', python: 'print(str(is_palindrome("golang")).lower())', javascript: 'console.log(isPalindrome("golang"));', java: 'System.out.println(isPalindrome("golang"));', php: 'echo isPalindrome("golang") ? "true" : "false";' } },
      { id: 3, inputDisplay: 's = "radar"', expected: "true", isHidden: true, call: { go: 'fmt.Println(IsPalindrome("radar"))', python: 'print(str(is_palindrome("radar")).lower())', javascript: 'console.log(isPalindrome("radar"));', java: 'System.out.println(isPalindrome("radar"));', php: 'echo isPalindrome("radar") ? "true" : "false";' } },
      { id: 4, inputDisplay: 's = "kasurrusak"', expected: "true", isHidden: true, call: { go: 'fmt.Println(IsPalindrome("kasurrusak"))', python: 'print(str(is_palindrome("kasurrusak")).lower())', javascript: 'console.log(isPalindrome("kasurrusak"));', java: 'System.out.println(isPalindrome("kasurrusak"));', php: 'echo isPalindrome("kasurrusak") ? "true" : "false";' } },
    ],
    hints: [
      "Bandingkan karakter indeks awal dengan karakter indeks ujung.",
      "Cukup lakukan iterasi hingga setengah panjang string.",
    ],
    xpReward: 60,
  },
  {
    id: "twosum",
    title: "3. Two Sum Target Index",
    difficulty: "Medium",
    category: "Hash Map (LeetCode #1)",
    description: `Diberikan array angka \`nums\` dan integer \`target\`.
Temukan **dua indeks** dari angka-angka yang jika dijumlahkan bernilai sama dengan \`target\`.
- Output berupa format indeks terpisah spasi: contoh \`0 1\`.`,
    starters: {
      go: `package main

import "fmt"

func TwoSum(nums []int, target int) (int, int) {
    // TODO: Gunakan Map untuk O(n) lookup
    return -1, -1
}

func main() {
    a, b := TwoSum([]int{2, 7, 11, 15}, 9)
    fmt.Printf("%d %d\\n", a, b)
}`,
      python: `def two_sum(nums, target):
    # TODO: Gunakan dictionary/hash map
    return (-1, -1)

if __name__ == "__main__":
    a, b = two_sum([2, 7, 11, 15], 9)
    print(f"{a} {b}")`,
      javascript: `function twoSum(nums, target) {
    // TODO: Gunakan Map/Object
    return [-1, -1];
}

const [a, b] = twoSum([2, 7, 11, 15], 9);
console.log(\`\${a} \${b}\`);`,
      java: `import java.util.HashMap;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        int[] res = twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(res[0] + " " + res[1]);
    }
}`,
      php: `<?php
function twoSum($nums, $target) {
    return [-1, -1];
}

[$a, $b] = twoSum([2, 7, 11, 15], 9);
echo "$a $b";`,
    },
    solutions: {
      go: `package main

import "fmt"

func TwoSum(nums []int, target int) (int, int) {
    seen := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if idx, exists := seen[complement]; exists {
            return idx, i
        }
        seen[num] = i
    }
    return -1, -1
}

func main() {
    a, b := TwoSum([]int{2, 7, 11, 15}, 9)
    fmt.Printf("%d %d\\n", a, b)
}`,
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return (seen[complement], i)
        seen[num] = i
    return (-1, -1)

if __name__ == "__main__":
    a, b = two_sum([2, 7, 11, 15], 9)
    print(f"{a} {b}")`,
      javascript: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (seen.has(comp)) return [seen.get(comp), i];
        seen.set(nums[i], i);
    }
    return [-1, -1];
}

const [a, b] = twoSum([2, 7, 11, 15], 9);
console.log(\`\${a} \${b}\`);`,
      java: `import java.util.HashMap;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (seen.containsKey(comp)) return new int[]{seen.get(comp), i};
            seen.put(nums[i], i);
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        int[] res = twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(res[0] + " " + res[1]);
    }
}`,
      php: `<?php
function twoSum($nums, $target) {
    $seen = [];
    foreach ($nums as $i => $num) {
        $comp = $target - $num;
        if (isset($seen[$comp])) return [$seen[$comp], $i];
        $seen[$num] = $i;
    }
    return [-1, -1];
}

[$a, $b] = twoSum([2, 7, 11, 15], 9);
echo "$a $b";`,
    },
    testCases: [
      { id: 1, inputDisplay: "nums = [2, 7, 11, 15], target = 9", expected: "0 1", isHidden: false, call: { go: 'a, b := TwoSum([]int{2, 7, 11, 15}, 9); fmt.Printf("%d %d\\n", a, b)', python: 'a, b = two_sum([2, 7, 11, 15], 9); print(f"{a} {b}")', javascript: 'console.log(twoSum([2, 7, 11, 15], 9).join(" "));', java: 'int[] r = twoSum(new int[]{2, 7, 11, 15}, 9); System.out.println(r[0] + " " + r[1]);', php: 'echo implode(" ", twoSum([2, 7, 11, 15], 9));' } },
      { id: 2, inputDisplay: "nums = [3, 2, 4], target = 6", expected: "1 2", isHidden: false, call: { go: 'a, b := TwoSum([]int{3, 2, 4}, 6); fmt.Printf("%d %d\\n", a, b)', python: 'a, b = two_sum([3, 2, 4], 6); print(f"{a} {b}")', javascript: 'console.log(twoSum([3, 2, 4], 6).join(" "));', java: 'int[] r = twoSum(new int[]{3, 2, 4}, 6); System.out.println(r[0] + " " + r[1]);', php: 'echo implode(" ", twoSum([3, 2, 4], 6));' } },
      { id: 3, inputDisplay: "nums = [3, 3], target = 6", expected: "0 1", isHidden: true, call: { go: 'a, b := TwoSum([]int{3, 3}, 6); fmt.Printf("%d %d\\n", a, b)', python: 'a, b = two_sum([3, 3], 6); print(f"{a} {b}")', javascript: 'console.log(twoSum([3, 3], 6).join(" "));', java: 'int[] r = twoSum(new int[]{3, 3}, 6); System.out.println(r[0] + " " + r[1]);', php: 'echo implode(" ", twoSum([3, 3], 6));' } },
    ],
    hints: [
      "Simpan nilai yang sudah dikunjungi ke dalam Hash Map.",
      "Cari selisih complement: target - num.",
    ],
    xpReward: 100,
  },
  {
    id: "valid_parentheses",
    title: "4. Valid Parentheses Stack",
    difficulty: "Medium",
    category: "Stack Data Structure",
    description: `Diberikan sebuah string tanda kurung \`s\` hanya berisi karakter \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\`, dan \`']'\`.
Tentukan apakah string tanda kurung tersebut valid secara berpasangan dan urutannya benar.
- Contoh: \`"()[]{}"\` $\\rightarrow$ \`true\`, \`"(]"\` $\\rightarrow$ \`false\`, \`"([)]"\` $\\rightarrow$ \`false\`.`,
    starters: {
      go: `package main

import "fmt"

func IsValid(s string) bool {
    // TODO: Gunakan Stack Slice
    return false
}

func main() {
    fmt.Println(IsValid("()[]{}"))
}`,
      python: `def is_valid(s: str) -> bool:
    # TODO: Gunakan list sebagai stack
    return False

if __name__ == "__main__":
    print(is_valid("()[]{}"))`,
      javascript: `function isValid(s) {
    // TODO: Gunakan stack array
    return false;
}

console.log(isValid("()[]{}"));`,
      java: `import java.util.Stack;

public class Main {
    public static boolean isValid(String s) {
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isValid("()[]{}"));
    }
}`,
      php: `<?php
function isValid($s) {
    return false;
}

echo isValid("()[]{}") ? "true" : "false";`,
    },
    solutions: {
      go: `package main

import "fmt"

func IsValid(s string) bool {
    stack := []rune{}
    pairs := map[rune]rune{')': '(', '}': '{', ']': '['}
    for _, ch := range s {
        if open, exists := pairs[ch]; exists {
            if len(stack) == 0 || stack[len(stack)-1] != open {
                return false
            }
            stack = stack[:len(stack)-1]
        } else {
            stack = append(stack, ch)
        }
    }
    return len(stack) == 0
}

func main() {
    fmt.Println(IsValid("()[]{}"))
}`,
      python: `def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for ch in s:
        if ch in pairs:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
        else:
            stack.append(ch)
    return len(stack) == 0

if __name__ == "__main__":
    print(str(is_valid("()[]{}")).lower())`,
      javascript: `function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    for (const ch of s) {
        if (pairs[ch]) {
            if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) return false;
            stack.pop();
        } else {
            stack.push(ch);
        }
    }
    return stack.length === 0;
}

console.log(isValid("()[]{}"));`,
      java: `import java.util.Stack;

public class Main {
    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isValid("()[]{}"));
    }
}`,
      php: `<?php
function isValid($s) {
    $stack = [];
    $pairs = [')' => '(', '}' => '{', ']' => '['];
    for ($i = 0; $i < strlen($s); $i++) {
        $c = $s[$i];
        if (isset($pairs[$c])) {
            if (empty($stack) || array_pop($stack) !== $pairs[$c]) return false;
        } else {
            array_push($stack, $c);
        }
    }
    return empty($stack);
}

echo isValid("()[]{}") ? "true" : "false";`,
    },
    testCases: [
      { id: 1, inputDisplay: 's = "()[]{}"', expected: "true", isHidden: false, call: { go: 'fmt.Println(IsValid("()[]{}"))', python: 'print(str(is_valid("()[]{}")).lower())', javascript: 'console.log(isValid("()[]{}"));', java: 'System.out.println(isValid("()[]{}"));', php: 'echo isValid("()[]{}") ? "true" : "false";' } },
      { id: 2, inputDisplay: 's = "(]"', expected: "false", isHidden: false, call: { go: 'fmt.Println(IsValid("(]"))', python: 'print(str(is_valid("(]")).lower())', javascript: 'console.log(isValid("(]"));', java: 'System.out.println(isValid("(]"));', php: 'echo isValid("(]") ? "true" : "false";' } },
      { id: 3, inputDisplay: 's = "([)]"', expected: "false", isHidden: true, call: { go: 'fmt.Println(IsValid("([)]"))', python: 'print(str(is_valid("([)]")).lower())', javascript: 'console.log(isValid("([)]"));', java: 'System.out.println(isValid("([)]"));', php: 'echo isValid("([)]") ? "true" : "false";' } },
      { id: 4, inputDisplay: 's = "{[]}"', expected: "true", isHidden: true, call: { go: 'fmt.Println(IsValid("{[]}"))', python: 'print(str(is_valid("{[]}")).lower())', javascript: 'console.log(isValid("{[]}"));', java: 'System.out.println(isValid("{[]}"));', php: 'echo isValid("{[]}") ? "true" : "false";' } },
    ],
    hints: [
      "Gunakan struktur data Stack (LIFO: Last In First Out).",
      "Setiap kali menemukan kurung tutup, pastikan elemen teratas stack adalah pasangannya.",
    ],
    xpReward: 90,
  },
];

export default function CodingChallengeLab() {
  const [selectedLanguage, setSelectedLanguage] = useState("go");
  const [selectedChallengeId, setSelectedChallengeId] = useState(CODING_CHALLENGES[0].id);
  const [userCodes, setUserCodes] = useState({});
  const [activeTestCaseTab, setActiveTestCaseTab] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [mobileTab, setMobileTab] = useState("problem"); // "problem" | "editor" | "results"
  const [isRunning, setIsRunning] = useState(false);

  // Timer State (30-Minute Assessment Countdown)
  const [timerSeconds, setTimerSeconds] = useState(1800);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const currentChallenge = useMemo(() => {
    return CODING_CHALLENGES.find((c) => c.id === selectedChallengeId) || CODING_CHALLENGES[0];
  }, [selectedChallengeId]);

  const currentCode = useMemo(() => {
    const key = `${currentChallenge.id}_${selectedLanguage}`;
    if (userCodes[key] !== undefined) return userCodes[key];
    return currentChallenge.starters[selectedLanguage] || currentChallenge.starters.go;
  }, [currentChallenge, selectedLanguage, userCodes]);

  const editorRef = useRef(null);

  const [testResults, setTestResults] = useState(null);
  const [overallVerdict, setOverallVerdict] = useState(null); // ACCEPTED, WRONG_ANSWER, ERROR

  const handleLanguageChange = (langId) => {
    setSelectedLanguage(langId);
    setShowSolution(false);
    setTestResults(null);
    setOverallVerdict(null);
  };

  const handleSelectChallenge = (cId) => {
    setSelectedChallengeId(cId);
    setShowSolution(false);
    setTestResults(null);
    setOverallVerdict(null);
    setActiveTestCaseTab(0);
  };

  const handleReset = () => {
    const defaultCode = currentChallenge.starters[selectedLanguage] || currentChallenge.starters.go;
    const key = `${currentChallenge.id}_${selectedLanguage}`;
    setUserCodes((prev) => ({ ...prev, [key]: defaultCode }));
    if (editorRef.current) {
      editorRef.current.setValue(defaultCode);
    }
    setTestResults(null);
    setOverallVerdict(null);
  };

  const handleApplySolution = () => {
    const sol = currentChallenge.solutions[selectedLanguage] || currentChallenge.solutions.go;
    const key = `${currentChallenge.id}_${selectedLanguage}`;
    setUserCodes((prev) => ({ ...prev, [key]: sol }));
    if (editorRef.current) {
      editorRef.current.setValue(sol);
    }
  };

  // Run HackerRank Test Cases
  const handleRunTests = async () => {
    const code = editorRef.current ? editorRef.current.getValue() : currentCode;
    const key = `${currentChallenge.id}_${selectedLanguage}`;
    setUserCodes((prev) => ({ ...prev, [key]: code }));

    setIsRunning(true);
    setMobileTab("results");

    try {
      const results = [];
      let allPassed = true;

      for (const tc of currentChallenge.testCases) {
        // Construct runner code snippet
        const callSnippet = tc.call[selectedLanguage] || tc.call.go;
        let testCode = code;

        if (selectedLanguage === "go") {
          testCode = testCode.replace(/func main\(\)\s*\{[\s\S]*?\}/, `func main() {\n    ${callSnippet}\n}`);
        } else if (selectedLanguage === "python") {
          testCode = testCode.replace(/if __name__ == "__main__":[\s\S]*/, `if __name__ == "__main__":\n    ${callSnippet}`);
        } else if (selectedLanguage === "javascript") {
          testCode = testCode.replace(/console\.log\(.*?\);?$/, callSnippet);
        } else if (selectedLanguage === "java") {
          testCode = testCode.replace(/public static void main\(String\[\] args\)\s*\{[\s\S]*?\}/, `public static void main(String[] args) {\n        ${callSnippet}\n    }`);
        } else if (selectedLanguage === "php") {
          testCode = testCode.replace(/echo\s+.*?;?$/, callSnippet);
        }

        const runRes = await executeMultiCode(testCode, selectedLanguage);
        const actualTrimmed = (runRes.output || "").trim();
        const expectedTrimmed = tc.expected.trim();
        const isPassed = !runRes.isError && actualTrimmed.includes(expectedTrimmed);

        if (!isPassed) allPassed = false;

        results.push({
          id: tc.id,
          inputDisplay: tc.inputDisplay,
          expected: tc.expected,
          actual: runRes.output,
          isPassed,
          isError: runRes.isError,
          executionTime: runRes.executionTime,
          isHidden: tc.isHidden,
        });
      }

      setTestResults(results);
      setOverallVerdict(allPassed ? "ACCEPTED" : "WRONG_ANSWER");
    } catch (e) {
      setOverallVerdict("ERROR");
    } finally {
      setIsRunning(false);
    }
  };

  const passCount = testResults ? testResults.filter((r) => r.isPassed).length : 0;
  const totalCount = currentChallenge.testCases.length;
  const scorePercent = Math.round((passCount / totalCount) * 100);

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6 space-y-6 pb-24">
      {/* 1. HackerRank Assessment Header & Timer Bar */}
      <div className="bg-white dark:bg-[#162032] p-4 md:p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#04AA6D] font-mono font-bold text-xs uppercase tracking-wider mb-1">
            <Trophy size={15} />
            <span>HackerRank Live Coding Assessment Arena</span>
          </div>
          <h1 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Technical Problem Solving Suite
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Selesaikan studi kasus algoritma industri dengan sistem evaluasi otomatis & multi-language compiler.
          </p>
        </div>

        {/* Assessment Timer & Score */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Timer Card */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 font-mono">
            <Timer size={16} className={isTimerRunning ? "text-amber-500 animate-spin" : "text-slate-400"} />
            <span className="text-sm font-black text-slate-900 dark:text-white">{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="ml-1 text-[11px] font-bold text-[#04AA6D] hover:underline cursor-pointer"
            >
              {isTimerRunning ? "Jeda" : "Mulai"}
            </button>
          </div>

          {/* Polyglot Language Selector Pill */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10">
            {["go", "java", "python", "javascript", "php"].map((lId) => {
              const active = selectedLanguage === lId;
              const meta = SUPPORTED_LANGUAGES.find((l) => l.id === lId);
              return (
                <button
                  key={lId}
                  onClick={() => handleLanguageChange(lId)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                    active
                      ? "bg-[#04AA6D] text-white shadow-xs scale-105"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>{meta?.icon}</span>
                  <span className="hidden sm:inline ml-1 uppercase">{lId}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Challenge Selection Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CODING_CHALLENGES.map((c) => {
          const isCurrent = c.id === currentChallenge.id;
          return (
            <button
              key={c.id}
              onClick={() => handleSelectChallenge(c.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold font-mono shrink-0 transition-all cursor-pointer border flex items-center gap-2 ${
                isCurrent
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-md scale-105"
                  : "bg-white dark:bg-[#162032] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${c.difficulty === "Easy" ? "bg-emerald-500" : "bg-amber-500"}`} />
              <span>{c.title}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Mobile View Switcher (Tabs) */}
      <div className="md:hidden flex items-center p-1 bg-slate-200/60 dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/10">
        <button
          onClick={() => setMobileTab("problem")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mobileTab === "problem" ? "bg-white dark:bg-[#1e293b] text-[#04AA6D] shadow-xs" : "text-slate-600 dark:text-slate-400"
          }`}
        >
          📋 Soal & Kasus
        </button>
        <button
          onClick={() => setMobileTab("editor")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mobileTab === "editor" ? "bg-white dark:bg-[#1e293b] text-[#04AA6D] shadow-xs" : "text-slate-600 dark:text-slate-400"
          }`}
        >
          💻 Kode Editor
        </button>
        <button
          onClick={() => setMobileTab("results")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
            mobileTab === "results" ? "bg-white dark:bg-[#1e293b] text-[#04AA6D] shadow-xs" : "text-slate-600 dark:text-slate-400"
          }`}
        >
          🧪 Evaluasi Test
          {testResults && (
            <span className="w-2 h-2 rounded-full bg-[#04AA6D] absolute top-2 right-2 animate-ping" />
          )}
        </button>
      </div>

      {/* 4. Main HackerRank Workspace (Left: Problem & Tests, Right: Monaco & Suite) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 min-h-[560px]">
        {/* Left Column (5 cols): Problem Description & Sample Cases */}
        <div className={`md:col-span-5 flex flex-col gap-4 ${mobileTab === "problem" ? "flex" : "hidden md:flex"}`}>
          <div className="bg-white dark:bg-[#162032] p-5 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-[#04AA6D] text-[10px] font-mono font-bold">
                {currentChallenge.category}
              </span>
              <span className="text-xs font-mono font-bold text-amber-500 flex items-center gap-1">
                <Zap size={13} className="fill-amber-500" /> +{currentChallenge.xpReward} XP
              </span>
            </div>

            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {currentChallenge.title}
            </h2>

            <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {currentChallenge.description}
            </div>

            {/* Sample Cases */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                📋 Sample Test Cases:
              </h4>
              {currentChallenge.testCases.slice(0, 2).map((tc, idx) => (
                <div key={tc.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 font-mono text-xs space-y-1">
                  <p className="text-slate-500 dark:text-slate-400 font-bold">Sample Case #{idx + 1}:</p>
                  <p className="text-slate-800 dark:text-slate-200">Input: <span className="text-blue-600 dark:text-blue-400">{tc.inputDisplay}</span></p>
                  <p className="text-slate-800 dark:text-slate-200">Expected: <span className="text-emerald-600 dark:text-emerald-400">{tc.expected}</span></p>
                </div>
              ))}
            </div>

            {/* Hints & Solution Lock */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
              <div className="space-y-1.5">
                {currentChallenge.hints.map((h, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-amber-500/10 text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                    💡 <strong>Tip #{i + 1}:</strong> {h}
                  </div>
                ))}
              </div>

              {!showSolution ? (
                <button
                  onClick={() => setShowSolution(true)}
                  className="w-full mt-2 py-2 px-3 rounded-2xl border border-dashed border-[#04AA6D]/40 text-[#04AA6D] hover:bg-[#04AA6D]/10 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Unlock size={14} /> Buka Kunci Solusi ({selectedLanguage.toUpperCase()})
                </button>
              ) : (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      ✓ Kunci Solusi:
                    </span>
                    <button
                      onClick={handleApplySolution}
                      className="px-2.5 py-1 rounded-lg bg-[#04AA6D] text-white text-[10px] font-bold cursor-pointer"
                    >
                      Terapkan ke Editor »
                    </button>
                  </div>
                  <pre className="p-2.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto">
                    {currentChallenge.solutions[selectedLanguage] || currentChallenge.solutions.go}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Code Editor & HackerRank Live Test Suite */}
        <div className={`md:col-span-7 flex flex-col gap-4 ${mobileTab === "problem" ? "hidden md:flex" : "flex"}`}>
          {/* Monaco Code Editor */}
          <div className={`bg-white dark:bg-[#162032] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xs flex flex-col ${mobileTab === "results" ? "hidden md:flex" : "flex"}`}>
            <div className="px-4 py-2.5 bg-slate-100 dark:bg-black/30 border-b border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Solution ({selectedLanguage.toUpperCase()})
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            <div className="h-[320px]">
              <Editor
                height="100%"
                defaultLanguage={selectedLanguage === "go" ? "go" : selectedLanguage === "python" ? "python" : selectedLanguage === "javascript" ? "javascript" : selectedLanguage === "java" ? "java" : "php"}
                language={selectedLanguage === "go" ? "go" : selectedLanguage === "python" ? "python" : selectedLanguage === "javascript" ? "javascript" : selectedLanguage === "java" ? "java" : "php"}
                theme="vs-dark"
                value={currentCode}
                key={`${currentChallenge.id}_${selectedLanguage}`}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
                options={{
                  fontSize: 13,
                  fontFamily: "'Fira Code', Consolas, 'Courier New', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  padding: { top: 10, bottom: 10 },
                }}
              />
            </div>
          </div>

          {/* HackerRank Test Suite Evaluation Panel */}
          <div className={`bg-white dark:bg-[#162032] rounded-3xl p-5 border border-slate-200 dark:border-white/10 shadow-xs space-y-4 ${mobileTab === "editor" ? "hidden md:block" : "block"}`}>
            {/* Header Action Bar */}
            <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-100 dark:border-white/5 pb-3">
              <div>
                <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-800 dark:text-white block">
                  Automated Test Suite
                </span>
                {testResults && (
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Skor: {scorePercent}/100 ({passCount}/{totalCount} Kasus Lolos)
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunTests}
                  disabled={isRunning}
                  className="px-5 py-2 rounded-2xl bg-[#04AA6D] hover:bg-[#038857] text-white text-xs font-black transition-all flex items-center gap-2 shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <Play size={14} className={isRunning ? "animate-spin" : "fill-white"} />
                  <span>{isRunning ? "Running Suite..." : "Run Test Suite ❯"}</span>
                </button>
              </div>
            </div>

            {/* Test Case Tabs */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {currentChallenge.testCases.map((tc, idx) => {
                  const res = testResults ? testResults[idx] : null;
                  const isActive = activeTestCaseTab === idx;

                  return (
                    <button
                      key={tc.id}
                      onClick={() => setActiveTestCaseTab(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                        isActive
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-xs"
                          : "bg-slate-100 dark:bg-black/20 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5"
                      }`}
                    >
                      {res ? (
                        res.isPassed ? (
                          <CheckCircle2 size={13} className="text-emerald-500" />
                        ) : (
                          <XCircle size={13} className="text-rose-500" />
                        )
                      ) : tc.isHidden ? (
                        <span className="text-slate-400">🔒</span>
                      ) : (
                        <span>•</span>
                      )}
                      <span>Case #{idx + 1}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Test Case Inspector */}
              {(() => {
                const currentTestCase = currentChallenge.testCases[activeTestCaseTab];
                const res = testResults ? testResults[activeTestCaseTab] : null;

                if (!currentTestCase) return null;

                return (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {currentTestCase.isHidden ? "🔒 Hidden Assessment Case" : "📋 Public Sample Case"}
                      </span>
                      {res && (
                        <span className={`font-bold px-2 py-0.5 rounded-md ${res.isPassed ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/15 text-rose-600 dark:text-rose-400"}`}>
                          {res.isPassed ? "✓ PASSED" : "✗ FAILED (Wrong Answer)"}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Input Parameter:</span>
                        <p className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-blue-600 dark:text-blue-400">
                          {currentTestCase.inputDisplay}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Expected Output:</span>
                        <p className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-emerald-600 dark:text-emerald-400">
                          {currentTestCase.expected}
                        </p>
                      </div>

                      {res && (
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Your Actual Output:</span>
                          <p className={`p-2 rounded-xl border font-mono ${res.isPassed ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 text-emerald-600 dark:text-emerald-400" : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400"}`}>
                            {res.actual || "(No output returned)"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
