import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ message = "Memuat modul..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 space-y-3 min-h-[300px] text-center animate-in fade-in duration-150">
      <div className="w-10 h-10 rounded-xl bg-[#04AA6D]/15 flex items-center justify-center text-[#04AA6D]">
        <Loader2 className="animate-spin" size={22} />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-extrabold theme-heading tracking-wide">{message}</p>
        <p className="text-[10px] theme-muted font-mono">M3.learn Platform Engine</p>
      </div>
    </div>
  );
}
