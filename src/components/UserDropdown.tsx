// "use client";
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { User, ChevronDown, Building2, UserPlus, LogOut, ArrowLeft } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import { useModal } from "@/context/ModalContext";
// import BusinessForm from "../components/Modal/BusinessForm"
// import LoginForm from "@/app/(auth)/login/LoginForm";

// export default function UserDropdown({ isHeroPage, isScrolled }: { isHeroPage: boolean, isScrolled: boolean }) {
//   const { user, organization, logout } = useAuth();
//   const { openModal } = useModal();
//   const [isOpen, setIsOpen] = useState(false);
//   const [view, setView] = useState<"menu" | "orgs">("menu");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close when clicking outside
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setIsOpen(false);
//         setView("menu"); // Reset to main menu on close
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const buttonStyles = isHeroPage && !isScrolled 
//     ? "bg-white/10 border-white/20 hover:bg-white/20 text-white" 
//     : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800";

//     const renderModal = () => {
//   switch (modalType) { // modalType wo ID hai jo openModal se aati hai
//     case "business-form":
//       return <BusinessForm onClose={closeModal} />;

//     // Aapke purane modals yahan honge...
//     case "login":
//       return <LoginForm onClose={closeModal} />;

//     default:
//       return null;
//   }
// };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         className={`flex items-center space-x-2 p-1.5 pr-3 rounded-full border transition-all outline-none ${buttonStyles}`}
//       >
//         <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
//           {user?.email?.[0].toUpperCase() || <User size={16} />}
//         </div>
//         <span className="text-sm font-bold truncate max-w-[80px]">
//           {user?.email?.split('@')[0]}
//         </span>
//         <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 overflow-hidden text-gray-800 z-[70] animate-in fade-in zoom-in-95 duration-200">

//           {view === "menu" ? (
//             <div className="flex flex-col">
//               <button 
//                 onClick={() => setView("orgs")}
//                 className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-blue-50 transition-colors group"
//               >
//                 <div className="flex items-center space-x-3">
//                   <Building2 size={18} className="text-blue-500" />
//                   <span className="font-medium">My Organisations</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
//                     {organization?.length || 0}
//                   </span>
//                   <ChevronDown size={14} className="-rotate-90 text-gray-400 group-hover:translate-x-1 transition-transform" />
//                 </div>
//               </button>

//               <button 
//                 onClick={() => { openModal("business-form"); setIsOpen(false); }}
//                 className="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-green-50 transition-colors"
//               >
//                 <UserPlus size={18} className="text-green-500" />
//                 <span className="font-medium">Register Business</span>
//               </button>

//               <div className="h-[1px] bg-gray-100 my-1 mx-4" />
//               <button onClick={logout} className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-semibold">
//                 <LogOut size={18} />
//                 <span>Logout</span>
//               </button>
//             </div>
//           ) : (
//             <div className="animate-in slide-in-from-right-4 duration-200">
//               <div className="px-4 py-2 border-b border-gray-50 flex items-center gap-2">
//                 <button onClick={() => setView("menu")} className="p-1 hover:bg-gray-100 rounded-full transition">
//                   <ArrowLeft size={16} className="text-blue-600" />
//                 </button>
//                 <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Organisation</span>
//               </div>

//               <div className="max-h-60 overflow-y-auto custom-scrollbar p-2">
//                 {organization && organization.length > 0 ? (
//                   organization.map((org: any) => (
//                     <Link 
//                       key={org.id} 
//                       href={`/dashboard/${org.slug}`}
//                       className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 mb-1 group"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold text-xs shadow-sm">
//                         {org.name?.substring(0, 2).toUpperCase()}
//                       </div>
//                       <div className="flex-1 overflow-hidden">
//                         <p className="font-bold text-gray-800 text-sm truncate group-hover:text-blue-700 transition-colors">{org.name}</p>
//                         <p className="text-[10px] text-gray-400 font-medium italic uppercase tracking-tighter">
//                           Role: {org.role?.name || "Member"}
//                         </p>
//                       </div>
//                     </Link>
//                   ))
//                 ) : (
//                   <div className="py-10 text-center text-gray-400">
//                     <Building2 size={32} className="mx-auto opacity-20 mb-2" />
//                     <p className="text-xs">No Orgs Found</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import {ChevronDown, Building2, UserPlus, LogOut, ArrowLeft } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import BusinessForm from "../components/Modal/BusinessForm"; // Import the form

// export default function UserDropdown({ isHeroPage, isScrolled }: { isHeroPage: boolean, isScrolled: boolean }) {
//   const { user, organization, logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [view, setView] = useState<"menu" | "orgs">("menu");
//   const [showBusinessForm, setShowBusinessForm] = useState(false); // Dynamic State
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close when clicking outside
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setIsOpen(false);
//         setView("menu");
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const buttonStyles = isHeroPage && !isScrolled
//     ? "bg-white/10 border-white/20 hover:bg-white/20 text-white"
//     : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800";

//   return (
//     <>
//       <div className="relative" ref={dropdownRef}>
//         <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center space-x-2 p-1.5 pr-3 rounded-full border transition-all ${buttonStyles}`}>
//           <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
//             {user?.email?.[0].toUpperCase()}
//           </div>
//           <span className="text-sm font-bold truncate max-w-[80px]">{user?.email?.split('@')[0]}</span>
//           <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//         </button>

//         {isOpen && (
//           <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 text-gray-800 z-[70] animate-in zoom-in-95 duration-200">
//             {view === "menu" ? (
//               <div className="flex flex-col">
//                 <button onClick={() => setView("orgs")} className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-blue-50 transition-colors group">
//                   <div className="flex items-center space-x-3 text-blue-600">
//                     <Building2 size={18} />
//                     <span className="font-semibold">My Organisations</span>
//                   </div>
//                   <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
//                     {organization?.length || 0}
//                   </span>
//                 </button>

//                 <button
//                   onClick={() => { setShowBusinessForm(true); setIsOpen(false); }} // Dynamic Logic
//                   className="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-green-50 transition-colors"
//                 >
//                   <UserPlus size={18} className="text-green-500" />
//                   <span className="font-medium">Register Business</span>
//                 </button>

//                 <div className="h-[1px] bg-gray-100 my-1 mx-4" />
//                 <button onClick={logout} className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-semibold">
//                   <LogOut size={18} />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <div className="animate-in slide-in-from-right-4 duration-200">
//                 <div className="px-4 py-2 border-b flex items-center gap-2">
//                   <button onClick={() => setView("menu")} className="p-1 hover:bg-gray-100 rounded-full"><ArrowLeft size={16} className="text-blue-600" /></button>
//                   <span className="text-xs font-bold text-gray-400">YOUR ORGANIZATIONS</span>
//                 </div>
//                 <div className="max-h-60 overflow-y-auto p-2">
//                   {organization?.map((org: any) => (
//                     <Link
//                       key={org.id}
//                       href={`/dashboard/${org.slug}`}
//                       className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 mb-1 border border-transparent transition-all"
//                     >
//                       <div className="w-8 h-8 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
//                         {org.name?.substring(0, 2).toUpperCase()}
//                       </div>
//                       <div className="flex-1 overflow-hidden">
//                         <p className="font-bold text-gray-800 text-sm truncate">{org.name}</p>
//                         <p className="text-[10px] text-gray-400 truncate">@{org.slug}</p>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* DYNAMIC FORM RENDER */}
//       {showBusinessForm && <BusinessForm onClose={() => setShowBusinessForm(false)} />}
//     </>
//   );
// }


"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Building2, UserPlus, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BusinessForm from "../components/Modal/BusinessForm";
import { Organization } from "../types/auth"; 

export default function UserDropdown({ isHeroPage, isScrolled }: { isHeroPage: boolean, isScrolled: boolean }) {
  const { user, organization, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"menu" | "orgs">("menu");
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setView("menu");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const buttonStyles = isHeroPage && !isScrolled
    ? "bg-white/10 border-white/20 hover:bg-white/20 text-white"
    : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800";

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center space-x-2 p-1.5 pr-3 rounded-full border transition-all ${buttonStyles}`}>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            {user?.email?.[0].toUpperCase()}
          </div>
          <span className="text-sm font-bold truncate max-w-[80px]">{user?.email?.split('@')[0]}</span>
          <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 text-gray-800 z-[70] animate-in zoom-in-95 duration-200">
            {view === "menu" ? (
              <div className="flex flex-col">
                <button onClick={() => setView("orgs")} className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-blue-50 transition-colors group">
                  <div className="flex items-center space-x-3 text-blue-600">
                    <Building2 size={18} />
                    <span className="font-semibold">My Organisations</span>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {organization?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => { setShowBusinessForm(true); setIsOpen(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-green-50 transition-colors"
                >
                  <UserPlus size={18} className="text-green-500" />
                  <span className="font-medium">Register Business</span>
                </button>

                <div className="h-[1px] bg-gray-100 my-1 mx-4" />
                <button onClick={logout} className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-semibold">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-4 duration-200">
                <div className="px-4 py-2 border-b flex items-center gap-2">
                  <button onClick={() => setView("menu")} className="p-1 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={16} className="text-blue-600" />
                  </button>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Your Organizations</span>
                </div>
                <div className="max-h-60 overflow-y-auto p-2">
                  {/* Typed map: organization array contains Organization objects */}
                  {organization?.map((org: Organization) => (
                    <Link
                      key={org.id}
                      href={`/dashboard/${org.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 mb-1 border border-transparent transition-all"
                    >
                      <div className="w-8 h-8 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                        {org.name?.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-bold text-gray-800 text-sm truncate">{org.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">@{org.slug}</p>
                      </div>
                    </Link>
                  ))}
                  
                  {organization?.length === 0 && (
                    <p className="text-center py-4 text-xs text-gray-400 font-medium">No business found</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showBusinessForm && <BusinessForm onClose={() => setShowBusinessForm(false)} />}
    </>
  );
}