"use client";

import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* This wrapper matches your modal styling */}
      <div className="max-w-md w-full bg-white shadow-2xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}