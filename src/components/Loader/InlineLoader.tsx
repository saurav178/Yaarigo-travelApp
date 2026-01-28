"use client";

import { Loader2 } from "lucide-react";

interface InlineLoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function InlineLoader({
  message = "Loading...",
  size = "md",
  className = ""
}: InlineLoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-[#1D4350] mb-2`} />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}
