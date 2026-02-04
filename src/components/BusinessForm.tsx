// // // "use client";
// // // import { useState } from "react";
// // // import axios from "axios";
// // // import { useAuth } from "@/context/AuthContext";
// // // import { X, Loader2 } from "lucide-react";

// // // export default function BusinessRegisterForm({ onClose }: { onClose: () => void }) {
// // //   const { token } = useAuth(); 
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");

// // //   const [formData, setFormData] = useState({
// // //     legal_name: "",
// // //     display_name: "",
// // //     slug: "",
// // //   });

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!token) return setError("User not authenticated");
    
// // //     setLoading(true);
// // //     setError("");

// // //     try {
// // //       // API integration with your NestJS Backend (:3105)
// // //       const response = await axios.post(
// // //         "http://localhost:3015/organizations/register-base",
// // //         formData,
// // //         {
// // //           headers: { 
// // //             Authorization: `Bearer ${token}`,
// // //             'Content-Type': 'application/json' 
// // //           },
// // //         }
// // //       );

// // //       alert("Business Registered Successfully!");
// // //       onClose(); 
// // //       window.location.reload(); // Refresh data
// // //     } catch (err: any) {
// // //       setError(err.response?.data?.message || "Something went wrong. Check DB connection.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 relative">
// // //       <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
// // //         <X size={20} />
// // //       </button>

// // //       <h2 className="text-xl font-bold text-gray-800 mb-4">Register Business</h2>

// // //       <form onSubmit={handleSubmit} className="space-y-4">
// // //         <div>
// // //           <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Legal Name *</label>
// // //           <input
// // //             required
// // //             className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
// // //             placeholder="e.g. Aegixa Technologies Pvt Ltd"
// // //             onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Display Name</label>
// // //           <input
// // //             className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
// // //             placeholder="e.g. Aegixa Tech"
// // //             onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">URL Slug</label>
// // //           <input
// // //             className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
// // //             placeholder="aegixa-tech"
// // //             onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
// // //           />
// // //         </div>

// // //         {error && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg font-medium">{error}</div>}

// // //         <button
// // //           type="submit"
// // //           disabled={loading}
// // //           className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:bg-blue-300"
// // //         >
// // //           {loading && <Loader2 size={18} className="animate-spin" />}
// // //           {loading ? "Registering..." : "Create Organisation"}
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }



// // "use client";
// // import { useState } from "react";
// // import axios from "axios";
// // import { useAuth } from "@/context/AuthContext";
// // import { X, Loader2, Building2 } from "lucide-react";

// // export default function BusinessForm({ onClose }: { onClose: () => void }) {
// //   const { token } = useAuth();
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [formData, setFormData] = useState({
// //     legal_name: "",
// //     display_name: "",
// //     slug: "",
// //   });

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");

// //     try {
// //       await axios.post(
// //         "http://localhost:3015/organizations/register-base",
// //         formData,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       alert("Business Registered Successfully!");
// //       onClose();
// //       window.location.reload(); // Data refresh ke liye
// //     } catch (err: any) {
// //       setError(err.response?.data?.message || "Registration failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="bg-white p-6 rounded-2xl w-full max-w-md relative">
// //       <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
// //         <X size={20} />
// //       </button>
      
// //       <div className="flex items-center gap-2 mb-6 text-blue-600">
// //         <Building2 size={24} />
// //         <h2 className="text-xl font-bold text-gray-800">New Organisation</h2>
// //       </div>

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input
// //           required
// //           placeholder="Legal Name (e.g. Aegixa Tech Pvt Ltd)"
// //           className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-blue-500"
// //           onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
// //         />
// //         <input
// //           placeholder="Display Name"
// //           className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-blue-500"
// //           onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
// //         />
// //         <input
// //           required
// //           placeholder="URL Slug (e.g. aegixa-tech)"
// //           className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-blue-500 font-mono text-sm"
// //           onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
// //         />
        
// //         {error && <p className="text-red-500 text-xs">{error}</p>}

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
// //         >
// //           {loading ? <Loader2 className="animate-spin" size={18} /> : "Create Business"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { useAuth } from "@/context/AuthContext";
// import { X, Loader2, Building2, CheckCircle2 } from "lucide-react";

// export default function BusinessForm({ onClose }: { onClose: () => void }) {
//   const { token } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [formData, setFormData] = useState({
//     legal_name: "",
//     display_name: "",
//     slug: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!token) return setError("Authentication token missing. Please login.");
    
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/organizations/register-base`,
//         formData,
//         { 
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           } 
//         }
//       );

//       // Backend se organization ID aur info milne par
//       console.log("Registered Org ID:", response.data.organization.id);
//       setSuccess(true);
      
//       setTimeout(() => {
//         onClose();
//         window.location.href = `/dashboard/${response.data.organization.slug}`;
//       }, 2000);

//     } catch (err: any) {
//       setError(err.response?.data?.message || "Database connection error (Check MongoDB/Redis)");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <div className="bg-white p-10 rounded-3xl flex flex-col items-center text-center animate-in zoom-in-95">
//         <CheckCircle2 size={60} className="text-green-500 mb-4" />
//         <h2 className="text-2xl font-bold">Registration Successful!</h2>
//         <p className="text-gray-500">Redirecting to your dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-8 rounded-3xl w-full max-w-md relative shadow-2xl">
//       <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
//         <X size={24} />
//       </button>
      
//       <div className="flex items-center gap-3 mb-6">
//         <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
//           <Building2 size={24} />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">Register Business</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="text-sm font-bold text-gray-500 mb-1 block">Legal Name</label>
//           <input
//             required
//             className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all"
//             placeholder="Aegixa Technologies Pvt Ltd"
//             onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="text-sm font-bold text-gray-500 mb-1 block">Display Name</label>
//           <input
//             className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all"
//             placeholder="Aegixa Tech"
//             onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="text-sm font-bold text-gray-500 mb-1 block">URL Slug</label>
//           <input
//             required
//             className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-500 font-mono text-blue-600"
//             placeholder="aegixa-tech"
//             value={formData.slug}
//             onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
//           />
//         </div>
        
//         {error && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-bold border border-red-100">{error}</div>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-gray-300"
//         >
//           {loading ? <Loader2 className="animate-spin" size={20} /> : "Create Organization"}
//         </button>
//       </form>
//     </div>
//   );
// }