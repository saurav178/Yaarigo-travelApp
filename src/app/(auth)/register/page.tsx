"use client";

import { useState } from "react";
import { useModal } from "@/context/ModalContext";
import { useRouter } from "next/navigation";
import { authService } from "../../../services/auth-service";

export default function RegisterForm() {
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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setErrorMsg("");

  //   const payload = {
  //     email,
  //     full_name: fullName,
  //     password,
  //     phone_number: phoneNumber || "+910000000000",
  //     role: "INDIVIDUAL" as const,
  //     organization_name: "Travio User",
  //   };

  //   try {
  //     const response = await authService.register(payload);
  //     if (response) {
  //       setShowSuccessToast(true);
  //       setTimeout(() => {
  //         setShowSuccessToast(false);
  //         closeModal();
  //         setTimeout(() => openModal("login"), 300);
  //       }, 3000);
  //     }
  //   } catch (error: any) {
  //     const message = error.response?.data?.message || error.message || "Registration Failed";
  //     setErrorMsg(message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
      const response = await authService.register(payload);

      if (response.status === 201 || response) {
        setShowSuccessToast(true);

        setTimeout(() => {
          setShowSuccessToast(false);

          closeModal();

          setTimeout(() => {
            openModal("login");
          }, 300);
        }, 2000);
      }
    } catch (error: unknown) {
      let message = "Registration Failed. Please try again.";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response?.data?.message === "string"
      ) {
        message = (error as any).response.data.message;
      }

      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex w-screen h-screen bg-white overflow-hidden animate-in fade-in duration-300">
      {showSuccessToast && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-md animate-fadeIn">
          <div className="text-center p-12 rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col items-center max-w-sm">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 tracking-tight">
              Account Created!
            </h3>
            <p className="text-gray-500 mt-3 text-lg">
              Redirecting you to login...
            </p>
          </div>
        </div>
      )}

      <div className="hidden lg:flex lg:w-[40%] bg-[#1D4350] relative p-16 flex-col justify-between text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]"></div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-tighter">Travio.</h1>
          <h2 className="mt-12 text-4xl font-light leading-tight">
            Start your journey <br />
            <span className="font-bold text-[#A43931]">
              to the extraordinary.
            </span>
          </h2>
        </div>

        <div className="relative z-10 space-y-10 mb-10">
          <div className="flex items-start gap-6">
            <div className="p-3 bg-white/10 rounded-2xl text-2xl">🌍</div>
            <div>
              <h4 className="font-bold text-xl">Global Destinations</h4>
              <p className="text-white/60 mt-1">
                Access to 500+ premium tours worldwide.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="p-3 bg-white/10 rounded-2xl text-2xl">🛡️</div>
            <div>
              <h4 className="font-bold text-xl">Secure Booking</h4>
              <p className="text-white/60 mt-1">
                Your data and payments are always protected.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-white/30 tracking-widest uppercase">
          © 2026 Travio Ltd.
        </div>

        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white opacity-[0.02] rounded-full"></div>
      </div>

      <div className="w-full lg:w-[60%] h-full bg-white flex flex-col items-center justify-center relative overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-800 transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-full max-w-lg px-8 md:px-12 py-12">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-500 mt-3 text-lg">
              Join thousands of travelers around the world.
            </p>

            {errorMsg && (
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl animate-shake flex items-center gap-3">
                <span className="text-lg">⚠️</span>
                {errorMsg}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all text-gray-800"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all text-gray-800"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all text-gray-800"
                  placeholder="+91..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all text-gray-800"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] font-black tracking-widest hover:text-[#1D4350]"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1D4350] hover:bg-[#15323c] text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-900/10 transition-all active:scale-[0.99] disabled:opacity-70 mt-4 text-lg"
            >
              {isLoading ? "Sign Up" : "Create Free Account"}
            </button>

            <p className="text-center text-gray-500 mt-10">
              Already a member?{" "}
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  setTimeout(() => router.push("/login"), 100);
                }}
                className="text-[#A43931] font-extrabold hover:underline"
              >
                Login here
              </button>
            </p>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
