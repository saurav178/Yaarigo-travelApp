"use client";

import { useState } from "react";
import { useModal } from "../../../context/ModalContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { X, Mail, Lock } from "lucide-react";
import Image from "next/image"; // Image import kiya

export default function LoginForm() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); 
  
  const { login } = useAuth(); 
  const { closeModal } = useModal();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      await login({ 
        email: emailOrPhone, 
        password 
      }); 

      closeModal();
      router.push("/"); 
      router.refresh(); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex w-screen h-screen bg-white overflow-hidden animate-in fade-in duration-300">
     
      <div className="hidden lg:flex lg:w-[40%] bg-[#1D4350] relative p-16 flex-col justify-between text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')]"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold tracking-tighter">Travio.</h1>
          <p className="mt-6 text-xl text-blue-100 font-light leading-relaxed max-w-sm">
            Experience the world like never before.
          </p>
        </div>
        <div className="relative z-10 text-sm font-mono text-white/30 uppercase tracking-[0.3em]">
          Secure Access Protocol v2.0
        </div>
      </div>

      <div className="w-full lg:w-[60%] h-full flex flex-col items-center justify-center relative bg-white overflow-y-auto">
        <button 
          onClick={closeModal}
          className="absolute top-10 right-10 p-2 text-gray-400 hover:text-gray-900 transition-colors z-50"
        >
          <X size={32} />
        </button>

        <div className="w-full max-w-md px-10 py-12">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Welcome back</h2>
            <p className="text-gray-500 mt-3 text-lg">Enter your credentials to manage your trips.</p>
            
            {errorMsg && (
              <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium flex items-center gap-3 animate-bounce">
                <span role="img" aria-label="warning">⚠️</span> {errorMsg}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account Email / Username</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all"
                  placeholder="partner_admin"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-12 pr-16 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 hover:text-[#1D4350]"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1D4350] hover:bg-[#15323b] text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-50 text-lg"
            >
              {isLoading ? (
                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Continue to Dashboard"
              )}
            </button>
            
             <div className="relative py-4">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
               <div className="relative flex justify-center text-[10px] font-black uppercase tracking-tighter"><span className="bg-white px-4 text-gray-300">Fast Connect</span></div>
            </div>

           <div className="grid grid-cols-2 gap-4">
               <button type="button" className="flex items-center justify-center py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm gap-3">
                 <Image src="https://www.svgrepo.com/show/475656/google-color.svg" width={20} height={20} alt="Google" /> Google
               </button>
               <button type="button" className="flex items-center justify-center py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm gap-3">
                 <Image src="https://www.svgrepo.com/show/448234/linkedin.svg" width={20} height={20} alt="LinkedIn" /> LinkedIn
               </button>
             </div>

             <p className="text-center text-sm text-gray-500 pt-6">
               Don&apos;t have an account?{" "}
               <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-[#A43931] font-black hover:underline"
              >
                Create account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}