

"use client";

import { useState } from "react";
import { useModal } from "@/context/ModalContext";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes"; 
import { authService } from "../../../services/auth-service"; 

export default function RegisterForm() {
  // States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const payload = {
      email,
      full_name: fullName,
      password,
      phone_number: phoneNumber || "+910000000000",
      role: "INDIVIDUAL" as const,
      organization_name: "Travio User",
    };

    try {
      // Professional approach: calling from centralized service
      const response = await authService.register(payload);
      
      if (response) {
        setShowSuccessToast(true);
        
        // Auto-hide toast -> close modal -> open login modal
        setTimeout(() => {
          setShowSuccessToast(false);
          closeModal();
          // User experience ke liye login modal open kar rahe hain
          setTimeout(() => openModal("login"), 300);
        }, 3000);
      }
    } catch (error: any) {
      // Axios error handle kar rahe hain jo service se throw hua
      const message = error.response?.data?.message || error.message || "Registration Failed";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fadeIn">
      {/* SUCCESS TOAST — TOP PE SHOW HOGA */}
      {showSuccessToast && (
        <div className="fixed inset-x-0 top-0 flex justify-center pt-6 px-4 z-[100] pointer-events-none">
          <div className="max-w-sm w-full animate-slideDownFast">
            <div className="glassmorphism-card p-5 rounded-2xl shadow-2xl border border-white/40 flex items-center gap-4 backdrop-blur-xl bg-white/90">
              <div className="p-3 bg-green-100 rounded-full animate-bounce">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-lg">Welcome to Travio!</p>
                <p className="text-sm text-gray-600">Account created successfully</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6 animate-slideDown">
        <div className="inline-block p-2.5 bg-gradient-to-r from-[#1D4350] to-[#A43931] rounded-full mb-3 animate-bounce-slow">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-[#1D4350] to-[#A43931] bg-clip-text text-transparent">
          Create Account
        </h2>
        {errorMsg && (
          <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded text-red-600 text-xs font-medium animate-shake">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4350] transition-all"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4350] transition-all"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div className="animate-slideUp" style={{ animationDelay: "0.25s" }}>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            required
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4350] transition-all"
            placeholder="+91 999999999"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="animate-slideUp" style={{ animationDelay: "0.3s" }}>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4350] pr-10"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform"
            >
              {showPassword ? (
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="animate-slideUp pt-2" style={{ animationDelay: "0.4s" }}>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#1D4350] to-[#A43931] text-white font-semibold rounded-lg hover:from-[#A43931] hover:to-[#1D4350] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Processing...
              </div>
            ) : "Create Account"}
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center pt-2 animate-slideUp" style={{ animationDelay: "0.5s" }}>
          <span className="text-xs text-gray-600">
            Already have an accounttttt?{" "}
            <button
              type="button"
              onClick={() => openModal("login")}
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1D4350] to-[#A43931] hover:scale-105 transition-all"
            >
              Login
            </button>
          </span>
        </div>
      </form>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDownFast { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-slideDownFast { animation: slideDownFast 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.7s ease-out both; }
        .animate-bounce { animation: bounce 2s infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }

        .glassmorphism-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}