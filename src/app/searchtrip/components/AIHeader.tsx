// src/components/AIHeader.tsx
"use client";

import { Sparkles } from "lucide-react";

export default function AIHeader({ count = 3 }: { count?: number }) {
  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 mb-6">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-emerald-100 rounded-md">
          <Sparkles className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">AI-Powered Recommendations</h3>
          <p className="text-sm text-gray-600">
            Based on your interests & travel history, we found {count} perfect destinations for you.
          </p>
        </div>
      </div>
    </div>
  );
}
