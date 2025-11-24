// app/loading.tsx
"use client";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className="flex flex-col items-center gap-4 p-6">
        {/* Spinner */}
        <svg
          className="h-16 w-16 animate-spin"
          viewBox="0 0 50 50"
          aria-hidden="true"
        >
          <circle
            className="opacity-20"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
          />
          <path
            className="opacity-100"
            fill="currentColor"
            d="M25 5a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1z"
            transform="rotate(0 25 25)"
          />
        </svg>

        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-medium text-white">Loading...</p>
          <p className="mt-1 text-xs text-white/80">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
}
