"use client";

import { useState } from "react";
import { useModal } from "../../../context/ModalContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { X, Mail, Lock } from "lucide-react";
import Image from "next/image"; 
import { motion } from "framer-motion";

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
  const handleClose = () => {
  closeModal(); 
 if (window.history.length > 2) {
    router.back();
  } else {
    router.push("/");
  }
};

  return (
    <div className="fixed inset-0 z-[1000] flex w-screen h-screen bg-white overflow-hidden animate-in fade-in duration-300">
     
     <div className="hidden lg:flex lg:w-[42%] bg-[#1D4350] relative p-16 flex-col justify-between text-white overflow-hidden">
         {/* Animated Background Gradients */}
         <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />

         <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <h1 className="text-6xl font-black tracking-tighter italic">Travio<span className="text-red-00">.</span></h1>
          <p className="mt-6 text-lg text-slate-400 font-light leading-relaxed max-w-xs">
            The next generation of travel management. Simple. Aesthetic. Fast.
          </p>
        </motion.div>

        {/* Glassmorphism Quote Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 p-8 bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl"
        >
          <p className="text-xl font-medium leading-relaxed italic text-slate-200">
            &quot;Travel is the only thing you buy that makes you <span className="text-red-400">richer.</span>&quot;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-[2px] w-12 bg-red-500" />
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Curated Experience</span>
          </div>
        </motion.div>

        <div className="relative z-10 text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">
          System Status: Optimal / Auth v2.4
        </div>
      </div>

      <div className="w-full lg:w-[60%] h-full flex flex-col items-center justify-center relative bg-white overflow-y-auto">
     <button 
  onClick={handleClose} 
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
              className="w-full bg-[#1D4350] hover:bg-[#15323b] text-white font-black py-5 transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-50 text-lg"
            >
              {isLoading ? (
                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Login"
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

