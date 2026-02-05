
// "use client";
// import { useState } from "react";
// import axiosClient from "@/lib/axios-client"; 
// import { useAuth } from "@/context/AuthContext";
// import { X, Building2, Loader2, Globe } from "lucide-react";

// export default function BusinessForm({ onClose }: { onClose: () => void }) {
//   const {token} = useAuth(); 
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     legal_name: "",
//     display_name: "",
//     slug: "" ,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Auth check
//     const activeToken = token || localStorage.getItem("token");
//     if (!activeToken) {
//       setError("Unauthorized: Please login again.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await axiosClient.post(
//         '/api/organizations/register-base',
//         {
//           legal_name: formData.legal_name,
//           display_name: formData.display_name || formData.legal_name,
//           slug: formData.slug,
        
//         }
//       );

//       const slug = response.data?.organization?.slug || response.data?.slug || formData.slug;
      
//       window.location.href = `/dashboard/${slug}`;
//       onClose();
      
//     } catch (err: any) {
//       console.error("Org Registration Error:", err.response?.data);
//       const msg = err.response?.data?.message;
//       setError(Array.isArray(msg) ? msg[0] : (msg || "Failed to register business"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       <div 
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
//         onClick={onClose} 
//       />

//       <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl relative border border-gray-100 animate-in zoom-in-95 duration-200 z-10">
//         <button 
//           onClick={onClose} 
//           className="absolute right-6 top-6 text-gray-400 hover:text-gray-800 transition-colors"
//         >
//           <X size={24} />
//         </button>

//         <div className="flex items-center gap-4 mb-8">
//           <div className="p-3 bg-[#1D4350]/10 rounded-2xl text-[#1D4350]">
//             <Building2 size={28} />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">New Business</h2>
//             <p className="text-sm text-gray-500 font-medium">Register your organization</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Business Legal Name</label>
//             <input
//               required
//               className="w-full mt-1.5 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all"
//               placeholder="e.g. Aegixa Technologies"
//               value={formData.legal_name}
//               onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL Slug (Unique)</label>
//             <div className="relative mt-1.5">
//                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                <input
//                   required
//                   className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] font-mono text-blue-600 outline-none transition-all"
//                   placeholder="aegixa-tech"
//                   value={formData.slug}
//                   onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
//                 />
//             </div>
//             <p className="text-[10px] text-gray-400 mt-2 ml-1">Your dashboard: travio.com/dashboard/{formData.slug || '...'}</p>
//           </div>

//           {error && (
//             <div className="p-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-medium flex gap-2 items-center">
//               <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 bg-[#1D4350] hover:bg-[#15323c] text-white rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400 mt-4 active:scale-95"
//           >
//             {loading ? <Loader2 className="animate-spin" size={20} /> : "Launch Organization"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useState } from "react";
// import axios from "axios"; 
// import axiosClient from "@/lib/axios-client"; 
// import { useAuth } from "@/context/AuthContext";
// import { X, Building2, Loader2, Globe } from "lucide-react";
// import { RegisterOrgPayload, RegisterOrgResponse, ApiErrorResponse } from "@/types/auth";

// interface BusinessFormProps {
//   onClose: () => void;
// }

// export default function BusinessForm({ onClose }: BusinessFormProps) {
//   // context mein agar token na ho toh undefined/null handle karein
//   const { user } = useAuth(); 
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
  
//   const [formData, setFormData] = useState<RegisterOrgPayload>({
//     legal_name: "",
//     display_name: "",
//     slug: "" ,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Auth Check: LocalStorage fallback for production
//     const activeToken = localStorage.getItem("token");
//     if (!activeToken) {
//       setError("Unauthorized: Please login again.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       // Axios call with proper Generics <PayloadType, ResponseType>
//       const response = await axiosClient.post<RegisterOrgResponse>(
//         '/api/organizations/register-base',
//         {
//           legal_name: formData.legal_name,
//           display_name: formData.display_name || formData.legal_name,
//           slug: formData.slug,
//         }
//       );

//       // Nullish coalescing for safety
//       const slug = response.data?.organization?.slug || response.data?.slug || formData.slug;
      
//       // Full page redirect to dashboard with new slug
//       window.location.href = `/dashboard/${slug}`;
//       onClose();
      
//     } catch (err: unknown) {
//       // Type-safe Axios error handling
//       if (axios.isAxiosError(err)) {
//         const serverError = err.response?.data as ApiErrorResponse;
//         const msg = serverError?.message;
        
//         setError(Array.isArray(msg) ? msg[0] : (msg || "Failed to register business"));
//       } else {
//         setError("An unexpected error occurred");
//       }
//       console.error("Org Registration Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       {/* Overlay logic same rahega */}
//       <div 
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
//         onClick={onClose} 
//       />

//       <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl relative border border-gray-100 animate-in zoom-in-95 duration-200 z-10">
//         <button 
//           onClick={onClose} 
//           className="absolute right-6 top-6 text-gray-400 hover:text-gray-800 transition-colors"
//         >
//           <X size={24} />
//         </button>

//         {/* ... UI Header ... */}
//         <div className="flex items-center gap-4 mb-8">
//           <div className="p-3 bg-[#1D4350]/10 rounded-2xl text-[#1D4350]">
//             <Building2 size={28} />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">New Business</h2>
//             <p className="text-sm text-gray-500 font-medium">Register your organization</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Business Legal Name</label>
//             <input
//               required
//               className="w-full mt-1.5 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all"
//               placeholder="e.g. Aegixa Technologies"
//               value={formData.legal_name}
//               onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL Slug (Unique)</label>
//             <div className="relative mt-1.5">
//                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                <input
//                   required
//                   className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] font-mono text-blue-600 outline-none transition-all"
//                   placeholder="aegixa-tech"
//                   value={formData.slug}
//                   onChange={(e) => setFormData({ 
//                     ...formData, 
//                     slug: e.target.value.toLowerCase().replace(/\s+/g, '-') 
//                   })}
//                 />
//             </div>
//           </div>

//           {error && (
//             <div className="p-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-medium flex gap-2 items-center">
//               <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 bg-[#1D4350] hover:bg-[#15323c] text-white rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400 mt-4 active:scale-95"
//           >
//             {loading ? <Loader2 className="animate-spin" size={20} /> : "Launch Organization"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import axios from "axios"; 
import axiosClient from "../../lib/axios-client"; 
import { useAuth } from "../../context/AuthContext";
import { X, Building2, Loader2, Globe, User as UserIcon } from "lucide-react"; // User icon add kiya
import { RegisterOrgPayload, RegisterOrgResponse, ApiErrorResponse } from "../../types/auth";

interface BusinessFormProps {
  onClose: () => void;
}

export default function BusinessForm({ onClose }: BusinessFormProps) {
  const { user, isAuthenticated } = useAuth(); 
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  const [formData, setFormData] = useState<RegisterOrgPayload>({
    legal_name: "",
    display_name: "",
    slug: "" ,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 2. User/Auth check using context state instead of just localStorage
    if (!isAuthenticated || !user) {
      setError("Please login as an admin to register a business.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosClient.post<RegisterOrgResponse>(
        '/api/organizations/register-base',
        {
          legal_name: formData.legal_name,
          display_name: formData.display_name || formData.legal_name,
          slug: formData.slug,
        }
      );

      const slug = response.data?.organization?.slug || response.data?.slug || formData.slug;
      window.location.href = `/dashboard/${slug}`;
      onClose();
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverError = err.response?.data as ApiErrorResponse;
        const msg = serverError?.message;
        setError(Array.isArray(msg) ? msg[0] : (msg || "Failed to register business"));
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl relative border border-gray-100 animate-in zoom-in-95 duration-200 z-10">
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-gray-800 transition-colors">
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-[#1D4350]/10 rounded-2xl text-[#1D4350]">
            <Building2 size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">New Business</h2>
            <p className="text-sm text-gray-500 font-medium">Register your organization</p>
          </div>
        </div>

        {/* 3. User object ka use UI mein personalize karne ke liye */}
        {user && (
          <div className="flex items-center gap-2 mb-8 mt-2 px-1">
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
              <UserIcon size={12} className="text-gray-400" />
            </div>
            <p className="text-[10px] text-gray-400 font-medium italic">
              Registering as: <span className="text-[#A43931] font-bold">{user.full_name}</span>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ... Inputs same rahenge ... */}
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Business Legal Name</label>
            <input
              required
              disabled={loading}
              className="w-full mt-1.5 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] outline-none transition-all disabled:opacity-50"
              placeholder="e.g. Aegixa Technologies"
              value={formData.legal_name}
              onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL Slug (Unique)</label>
            <div className="relative mt-1.5">
               <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input
                  required
                  disabled={loading}
                  className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#1D4350]/5 focus:border-[#1D4350] font-mono text-blue-600 outline-none transition-all disabled:opacity-50"
                  placeholder="aegixa-tech"
                  value={formData.slug}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-') 
                  })}
                />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-medium flex gap-2 items-center">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isAuthenticated} // Extra safety using context
            className="w-full py-4 bg-[#1D4350] hover:bg-[#15323c] text-white rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400 mt-4 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Launch Organization"}
          </button>
        </form>
      </div>
    </div>
  );
}