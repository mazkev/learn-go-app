import React from "react";

/**
 * Official M3.learn Tech Brand Vector Logo
 * Eliminates generic AI look with a sleek, geometric hexagonal code prism
 */
export default function BrandLogo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="M3.learn Official Brand Logo"
    >
      <defs>
        {/* Modern Emerald-to-Cyan Tech Gradient */}
        <linearGradient id="m3BrandGrad" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#04AA6D" />
          <stop offset="50%" stopColor="#00ADD8" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        <linearGradient id="m3InnerGlow" x1="10" y1="8" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Hexagonal Outer Shield / Prism */}
      <rect
        x="2"
        y="2"
        width="32"
        height="32"
        rx="10"
        fill="url(#m3BrandGrad)"
        className="drop-shadow-sm"
      />

      {/* Subtle Inner Glass Overlay */}
      <rect
        x="3"
        y="3"
        width="30"
        height="15"
        rx="9"
        fill="white"
        fillOpacity="0.12"
      />

      {/* Stylized 'M' and '3' Geometric Circuit Node Vector */}
      <path
        d="M9 25V11L14 18L19 11V25"
        stroke="url(#m3InnerGlow)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 12C25 12 26.5 13 26.5 14.8C26.5 16.2 25.5 17.2 24 17.5C26 17.8 27 19 27 20.8C27 23 25 24 23 24H21.5"
        stroke="url(#m3InnerGlow)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pulsing Quantum Node Dot */}
      <circle cx="28" cy="8" r="2" fill="#10B981" />
    </svg>
  );
}
