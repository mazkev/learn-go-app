import React from "react";

/**
 * Official Brand Vector Logos for Programming Languages (Zero Emojis!)
 * Go, Java, Python, JavaScript, PHP
 */

export function GoLogo({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Go (Golang) Official Logo"
    >
      <path
        d="M2 9.5C2 9.5 3.5 8 7 8C11 8 12.5 10.5 12.5 12.5C12.5 15.5 10 17 6.5 17C3.5 17 2 15 2 15"
        stroke="#00ADD8"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M7.5 12.5H12.5"
        stroke="#00ADD8"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle
        cx="17.5"
        cy="12.5"
        r="4"
        stroke="#00ADD8"
        strokeWidth="2.4"
      />
      <path
        d="M3 6.5L6.5 6.5"
        stroke="#00ADD8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M1 18L4.5 18"
        stroke="#00ADD8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function JavaLogo({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Java Official Logo"
    >
      {/* Steam lines */}
      <path
        d="M11 2C11 2 13 3.5 11 5C9 6.5 11.5 8 11.5 8"
        stroke="#EA2D2E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 2.5C14 2.5 16 4 14 5.5C12.5 7 14.5 8.5 14.5 8.5"
        stroke="#EA2D2E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Cup Body */}
      <path
        d="M5 11C5 11 4.5 15.5 8 18C11.5 20.5 15.5 19 16 16C16.5 13 16 11 16 11H5Z"
        fill="#5382A1"
      />
      {/* Cup Handle */}
      <path
        d="M16 12C18 12 19.5 13 19.5 14.5C19.5 16 18 17 16 17"
        stroke="#5382A1"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Saucer */}
      <path
        d="M4 20.5C8 22 15 22 19 20.5"
        stroke="#5382A1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PythonLogo({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Python Official Logo"
    >
      {/* Top Blue Snake */}
      <path
        d="M11.8 2C6.9 2 7.2 4.1 7.2 4.1L7.2 6.3H12V7H5.2C5.2 7 2 6.6 2 11.5C2 16.4 4.8 16.1 4.8 16.1H6.3V13.8C6.3 11.2 8.5 11.2 8.5 11.2H13.2C13.2 11.2 15.3 11.2 15.3 9.1V4.4C15.3 4.4 15.6 2 11.8 2ZM9.5 3.5C10.1 3.5 10.5 3.9 10.5 4.5C10.5 5.1 10.1 5.5 9.5 5.5C8.9 5.5 8.5 5.1 8.5 4.5C8.5 3.9 8.9 3.5 9.5 3.5Z"
        fill="#3776AB"
      />
      {/* Bottom Yellow Snake */}
      <path
        d="M12.2 22C17.1 22 16.8 19.9 16.8 19.9L16.8 17.7H12V17H18.8C18.8 17 22 17.4 22 12.5C22 7.6 19.2 7.9 19.2 7.9H17.7V10.2C17.7 12.8 15.5 12.8 15.5 12.8H10.8C10.8 12.8 8.7 12.8 8.7 14.9V19.6C8.7 19.6 8.4 22 12.2 22ZM14.5 20.5C13.9 20.5 13.5 20.1 13.5 19.5C13.5 18.9 13.9 18.5 14.5 18.5C15.1 18.5 15.5 18.9 15.5 19.5C15.5 20.1 15.1 20.5 14.5 20.5Z"
        fill="#FFD438"
      />
    </svg>
  );
}

export function JavaScriptLogo({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="JavaScript Official Logo"
    >
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M6 17.5C6.5 18.5 7.5 19 9 19C10.8 19 11.8 18 11.8 16.2V9.5H9.5V16C9.5 16.8 9 17.2 8.2 17.2C7.5 17.2 7 16.8 6.7 16.2L6 17.5Z"
        fill="#000000"
      />
      <path
        d="M13.5 17.2C14.2 18.4 15.5 19 17.2 19C19.2 19 20.5 17.8 20.5 16.2C20.5 14.5 19.2 13.8 17.8 13.2L17.2 12.9C16.2 12.5 15.6 12 15.6 11.2C15.6 10.4 16.2 9.8 17.1 9.8C18 9.8 18.6 10.2 19.1 11.1L20.3 10.3C19.6 9.1 18.5 8.5 17.1 8.5C15.3 8.5 14 9.6 14 11.2C14 12.8 15.1 13.6 16.5 14.2L17.1 14.5C18.2 14.9 18.9 15.5 18.9 16.4C18.9 17.3 18.1 17.8 17.2 17.8C16 17.8 15.2 17.1 14.7 16.1L13.5 17.2Z"
        fill="#000000"
      />
    </svg>
  );
}

export function PhpLogo({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="PHP Official Logo"
    >
      <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4" />
      <path
        d="M5 9H8C9.5 9 10.5 9.5 10.5 10.8C10.5 12 9.5 12.7 8 12.7H6.5L5.8 15H4.2L5 9ZM6.9 11.5H7.8C8.5 11.5 9 11.2 9 10.8C9 10.4 8.5 10.2 7.8 10.2H7.2L6.9 11.5Z"
        fill="#FFFFFF"
      />
      <path
        d="M10.8 9H12.3L11.7 11.2H13.8L14.4 9H15.9L14.3 15H12.8L13.4 12.5H11.3L10.7 15H9.2L10.8 9Z"
        fill="#FFFFFF"
      />
      <path
        d="M16 9H19C20.5 9 21.5 9.5 21.5 10.8C21.5 12 20.5 12.7 19 12.7H17.5L16.8 15H15.2L16 9ZM17.9 11.5H18.8C19.5 11.5 20 11.2 20 10.8C20 10.4 19.5 10.2 18.8 10.2H18.2L17.9 11.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Universal Language Logo Dispatcher
 */
export default function LanguageLogo({ language = "go", size = 18, className = "" }) {
  const langKey = (language || "").toLowerCase();

  switch (langKey) {
    case "go":
    case "golang":
      return <GoLogo size={size} className={className} />;
    case "java":
      return <JavaLogo size={size} className={className} />;
    case "python":
      return <PythonLogo size={size} className={className} />;
    case "javascript":
    case "js":
    case "ts":
    case "typescript":
      return <JavaScriptLogo size={size} className={className} />;
    case "php":
      return <PhpLogo size={size} className={className} />;
    default:
      return <GoLogo size={size} className={className} />;
  }
}
