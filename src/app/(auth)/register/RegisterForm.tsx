"use client";

import { useState } from "react";
import { useModal } from "@/context/ModalContext";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const { openModal, closeModal } = useModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Register error:", data);
        setIsLoading(false);
        return;
      }

      console.log("User registered:", data);
      setIsLoading(false);

      // Show success toast at the top
      setShowSuccessToast(true);

      // Auto-hide after 3s → close modal → open login
      setTimeout(() => {
        setShowSuccessToast(false);
        closeModal();
        setTimeout(() => openModal("login"), 300);
      }, 3000);
    } catch (err) {
      console.error("Request failed:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fadeIn">
      {/* SUCCESS TOAST — AT THE TOP */}
      {showSuccessToast && (
        <div className="fixed inset-x-0 top-0 flex justify-center pt-6 px-4 z-50 pointer-events-none">
          <div className="max-w-sm w-full animate-slideDownFast">
            <div className="glassmorphism-card p-5 rounded-2xl shadow-2xl border border-white/40 flex items-center gap-4 backdrop-blur-xl">
              <div className="p-3 bg-green-100 rounded-full animate-bounce">
                <svg
                  className="w-7 h-7 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-lg">
                  Welcome to Travio!
                </p>
                <p className="text-sm text-gray-600">
                  Account created successfully
                </p>
              </div>
              <div className="text-xs text-gray-500 animate-pulse">
                Redirecting...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6 animate-slideDown">
        <div className="inline-block p-2.5 bg-gradient-to-r from-[#1D4350] to-[#A43931] rounded-full mb-3 animate-bounce-slow">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-[#1D4350] to-[#A43931] bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-xs text-gray-600 mt-1">Join Travio today</p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
          <label
            htmlFor="full-name"
            className="block text-xs font-semibold text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="full-name"
            type="text"
            required
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4350] focus:border-transparent transition-all duration-300"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4350] focus:border-transparent transition-all duration-300"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="animate-slideUp" style={{ animationDelay: "0.3s" }}>
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4350] focus:border-transparent transition-all duration-300 pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200"
            >
              {showPassword ? (
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="animate-slideUp" style={{ animationDelay: "0.4s" }}>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#1D4350] to-[#A43931] text-white font-semibold rounded-lg hover:from-[#A43931] hover:to-[#1D4350] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center pt-2 animate-slideUp" style={{ animationDelay: "0.5s" }}>
          <span className="text-xs text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => openModal("login")}
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1D4350] to-[#A43931] hover:from-[#A43931] hover:to-[#1D4350] transition-all duration-300 hover:scale-105"
            >
              Login
            </button>
          </span>
        </div>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDownFast {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-slideDownFast {
          animation: slideDownFast 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.7s ease-out both;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .glassmorphism-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
            0 2px 8px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
