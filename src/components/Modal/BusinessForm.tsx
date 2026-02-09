"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { X, Building2, Loader2, Globe, User as UserIcon, Rocket, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


interface BusinessFormProps {
  onClose: () => void;
}

export default function BusinessForm({ onClose }: BusinessFormProps) {
  const { user, isAuthenticated, registerOrganization } = useAuth(); 
  const router = useRouter();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  const [formData, setFormData] = useState({
    legal_name: "",
    display_name: "",
    slug: "" ,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      setError("Please login to register a business.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await registerOrganization({
        legal_name: formData.legal_name,
        display_name: formData.display_name || formData.legal_name,
        slug: formData.slug,
      });
      onClose();
      router.push(`/`);
    } catch (err: any) {
      setError(err.message || "Failed to register business");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[1000] flex w-screen h-screen bg-white overflow-hidden"
    >
      <div className="hidden lg:flex lg:w-[50%] bg-[#1D4350] relative p-20 flex-col justify-between text-white overflow-hidden pt-32">
  {/* Decorative Background Pattern */}
  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')]"></div>
  <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
  
  <motion.div 
    initial={{ x: 30, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.4 }}
    className="relative z-10"
  >
    <Rocket size={60} className="mb-8 text-blue-300/50" />
    <h1 className="text-6xl font-black tracking-tighter leading-tight mb-6 italic">
      Open Your Business <br /> 
      on <span className="text-blue-300">YaariGo.</span>
    </h1>
    <p className="text-xl text-blue-100/70 font-medium leading-relaxed max-w-md">
      Start selling, sharing, and earning. Anyone can start — we make it simple. Fill the form to begin.
    </p>
  </motion.div>

  {/* Professional Quotes / Benefits */}
  <motion.div 
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.6 }}
    className="relative z-10 space-y-8"
  >
    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
       <p className="text-blue-300 text-xs font-black uppercase tracking-widest mb-4">Turn Your Work Into Earnings</p>
       <div className="space-y-4">
          <div className="flex items-start gap-4">
             <CheckCircle2 className="text-blue-400 shrink-0" size={24} />
             <p className="font-bold text-lg">Fast setup in minutes</p>
          </div>
          <div className="flex items-start gap-4">
             <CheckCircle2 className="text-blue-400 shrink-0" size={24} />
             <p className="font-bold text-lg">Earn from sales & commissions</p>
          </div>
          <div className="flex items-start gap-4">
             <CheckCircle2 className="text-blue-400 shrink-0" size={24} />
             <p className="font-bold text-lg">Full support to grow your pace</p>
          </div>
       </div>
    </div>

    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] text-center">
      YaariGo Business Registry v1.0
    </p>
  </motion.div>
</div>


     {/* right */}
      <div className="w-full lg:w-[50%] h-full flex flex-col items-center justify-center relative bg-white px-8 lg:px-20 overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-10 right-10 p-3 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Launch Business</h2>
            <p className="text-gray-500 mt-2 text-lg font-medium">Setup your professional organization profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Legal Entity Name</label>
              <input
                required
                disabled={loading}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all disabled:opacity-50 font-medium"
                placeholder="e.g. Aegixa Technologies"
                value={formData.legal_name}
                onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Unique URL Slug</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  required
                  disabled={loading}
                  className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] font-mono text-blue-600 outline-none transition-all disabled:opacity-50"
                  placeholder="aegixa-tech"
                  value={formData.slug}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-') 
                  })}
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="p-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-bold flex gap-3 items-center"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading || !isAuthenticated}
              className="w-full py-5 bg-[#1D4350] hover:bg-[#15323c] text-white rounded-2xl font-black shadow-2xl shadow-blue-900/20 transition-all flex items-center justify-center gap-3 disabled:bg-gray-100 disabled:text-gray-400 active:scale-95 text-lg"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : (
                <>Register Organization</>
              )}
            </button>

            {user && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                  Identity Verified: <span className="text-[#1D4350]">{user.full_name}</span>
                </p>
              </div>
            )}
          </form>
        </motion.div>
      </div>
   
    </motion.div>
  );
}

