"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Building2, UserPlus, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BusinessForm from "../components/Modal/BusinessForm";
import { Organization } from "../types/auth";

export default function UserDropdown({
  isHeroPage,
  isScrolled,
}: {
  isHeroPage: boolean;
  isScrolled: boolean;
}) {
  const { user, organization, logout, switchOrganization } = useAuth();
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

  const buttonStyles =
    isHeroPage && !isScrolled
      ? "bg-white/10 border-white/20 hover:bg-white/20 text-white"
      : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800";

  const handleOrgClick = (org: Organization) => {
    // store selected org
    localStorage.setItem("selectedOrgId", org.id);

    // optional: close dropdown immediately
    setIsOpen(false);
    setView("menu");
    switchOrganization(org.id);
    // force HARD reload
  
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center space-x-2 p-1.5 pr-3 rounded-full border transition-all ${buttonStyles}`}
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            {user?.email?.[0].toUpperCase()}
          </div>
          <span className="text-sm font-bold truncate max-w-[80px]">
            {user?.email?.split("@")[0]}
          </span>
          <ChevronDown
            size={14}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-3 w-64 bg-white shadow-2xl border border-gray-100 py-2 text-gray-800 z-[70] animate-in zoom-in-95 duration-200">
            {view === "menu" ? (
              <div className="flex flex-col">
                <button
                  onClick={() => setView("orgs")}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex items-center space-x-3 text-blue-600">
                    <Building2 size={18} className="text-gray-500" />
                    <span className="font-semibold">My Organisations</span>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 text-[10px] font-bold">
                    {organization?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setShowBusinessForm(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-green-50 transition-colors"
                >
                  <UserPlus size={18} className="text-gray-500" />
                  <span className="font-medium">Register Business</span>
                </button>

                <div className="h-[1px] bg-gray-100 my-1 mx-4" />

                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-500 hover:bg-red-50 transition-colors font-semibold"
                >
                  <LogOut size={18} className="text-gray-500" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-4 duration-200">
                <div className="px-4 py-2 border-b flex items-center gap-2">
                  <button
                    onClick={() => setView("menu")}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <ArrowLeft size={16} className="text-gray-500" />
                  </button>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                    Your Organizations
                  </span>
                </div>

                <div className="max-h-60 overflow-y-auto p-2">
                  {organization?.map((org: Organization) => (
                    <div
                      key={org.id}
                      onClick={() => handleOrgClick(org)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 mb-1 border border-transparent transition-all cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                        {org.name?.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-bold text-gray-800 text-sm truncate">
                          {org.name}
                        </p>
                        <p className="text-[10px] text-gray-400 truncate">
                          @{org.slug}
                        </p>
                      </div>
                    </div>
                  ))}

                  {organization?.length === 0 && (
                    <p className="text-center py-4 text-xs text-gray-400 font-medium">
                      No business found
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showBusinessForm && (
        <BusinessForm onClose={() => setShowBusinessForm(false)} />
      )}
    </>
  );
}


// "use client";
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { ChevronDown, Building2, UserPlus, LogOut, ArrowLeft } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import BusinessForm from "../components/Modal/BusinessForm";
// import { Organization } from "../types/auth";

// export default function UserDropdown({ isHeroPage, isScrolled }: { isHeroPage: boolean, isScrolled: boolean }) {
//   const { user, organization, logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [view, setView] = useState<"menu" | "orgs">("menu");
//   const [showBusinessForm, setShowBusinessForm] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

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
//           <div className="absolute right-0 mt-3 w-64 bg-white shadow-2xl border border-gray-100 py-2 text-gray-800 z-[70] animate-in zoom-in-95 duration-200">
//             {view === "menu" ? (
//               <div className="flex flex-col">
//                 <button onClick={() => setView("orgs")} className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-blue-50 transition-colors group">
//                   <div className="flex items-center space-x-3 text-blue-600">
//                     <Building2 size={18} className="text-gray-500" />
//                     <span className="font-semibold">My Organisations</span>
//                   </div>
//                   <span className="bg-blue-100 text-blue-600 px-2 py-0.5  text-[10px] font-bold">
//                     {organization?.length || 0}
//                   </span>
//                 </button>

//                 <button
//                   onClick={() => { setShowBusinessForm(true); setIsOpen(false); }}
//                   className="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-green-50 transition-colors"
//                 >
//                   <UserPlus size={18} className="text-gray-500" />
//                   <span className="font-medium">Register Business</span>
//                 </button>

//                 <div className="h-[1px] bg-gray-100 my-1 mx-4" />
//                 <button
//                   onClick={logout} // Ye context wala logout trigger karega
//                   className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-500 hover:bg-red-50 transition-colors font-semibold"
//                 >
//                   <LogOut size={18} className="text-gray-500" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <div className="animate-in slide-in-from-right-4 duration-200">
//                 <div className="px-4 py-2 border-b flex items-center gap-2">
//                   <button onClick={() => setView("menu")} className="p-1 hover:bg-gray-100 rounded-full">
//                     <ArrowLeft size={16} className="text-gray-500" />
//                   </button>
//                   <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Your Organizations</span>
//                 </div>
//                 <div className="max-h-60 overflow-y-auto p-2">
//                   {/* Typed map: organization array contains Organization objects */}
//                   {organization?.map((org: Organization) => (
//                     <Link
//                       key={org.id}
//                       href={`https://business.dev.yaarigo.com/`}
//                       //${org.slug} remove here add link to business page
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

//                   {organization?.length === 0 && (
//                     <p className="text-center py-4 text-xs text-gray-400 font-medium">No business found</p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {showBusinessForm && <BusinessForm onClose={() => setShowBusinessForm(false)} />}
//     </>
//   );
// }