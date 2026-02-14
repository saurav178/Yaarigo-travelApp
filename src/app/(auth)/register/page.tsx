


"use client";

import { useState } from "react";
import { useModal } from "../../../context/ModalContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { RegisterData } from "../../../types/auth";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { register } = useAuth(); // Global register function
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Payload matching your exact CURL requirement
    const payload: RegisterData = {
      email: email.trim(),
      full_name: fullName.trim(),
      password: password,
      phone_number: phoneNumber.trim() || "+910000000000",
      role: "INDIVIDUAL",
      organization_name: "Travio User",
    };

    try {
      // API call through context
      await register(payload);

      // --- SUCCESS FLOW ---
      setShowSuccessToast(true);

   
      setTimeout(() => {
        setShowSuccessToast(false);
        closeModal(); 
        router.push("/login"); 
        setTimeout(() => {
          openModal("login");
        }, 400);
      }, 2000);

    } catch (error: unknown) {
      let message = "Registration Failed. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      }
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex w-screen h-screen bg-white overflow-hidden">
  
      {showSuccessToast && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-md animate-in fade-in duration-500">
          <div className="text-center p-12 rounded-3xl bg-white shadow-2xl border border-gray-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Registration Successful!</h3>
            <p className="text-gray-500 mt-2">Opening login screen...</p>
          </div>
        </div>
      )}

      
      <div className="hidden lg:flex lg:w-[40%] bg-[#1D4350] relative p-16 flex-col justify-between text-white">
        <div>
          <h1 className="text-5xl font-bold tracking-tighter">Travio.</h1>
          <h2 className="mt-8 text-3xl font-light">Join the <span className="font-bold text-[#A43931]">extraordinary.</span></h2>
        </div>
        <p className="text-white/40 text-sm tracking-widest uppercase">© 2026 Travio Adventures</p>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="w-full lg:w-[60%] h-full bg-white flex flex-col items-center justify-center relative overflow-y-auto">
        <button onClick={closeModal} className="absolute top-8 right-8 p-2 text-gray-400 hover:text-black">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full max-w-lg px-8 py-12">
          <h2 className="text-4xl font-black text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-500 mb-8 text-lg">Sign up to explore the world.</p>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold animate-pulse">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <input
                type="text"
                required
                disabled={isLoading}
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email"
                  required
                  disabled={isLoading}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all"
                  placeholder="john@travio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                <input
                  type="tel"
                  required
                  disabled={isLoading}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all"
                  placeholder="+91..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1D4350] hover:bg-[#15323b] text-white font-black py-5 rounded-2xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 text-lg"
            >
              {isLoading ? "Creating Account..." : "Create Free Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


