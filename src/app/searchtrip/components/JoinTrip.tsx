"use client";

import { useEffect, useState, useRef } from "react";
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaCompass 
} from "react-icons/fa";

interface JoinTripProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  tripTitle: string;
}

export default function JoinTrip({
  isOpen,
  onClose,
  tripId,
  tripTitle,
}: JoinTripProps) {
  const [status, setStatus] = useState<"confirm" | "loading" | "success" | "error">("confirm");
  const joinBtnRef = useRef<HTMLButtonElement>(null);
  
  const HOST_NAME = "Jane Cooper";
  const isLoading = status === "loading";

  useEffect(() => {
    if (isOpen) setStatus("confirm");
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose, isLoading]);

  if (!isOpen) return null;

  const handleJoin = async () => {
    if (isLoading) return;
    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 " 
        onClick={() => !isLoading && onClose()} 
      />

      {/* Modal Card - Shifted 320px Right and 30 (120px) Up */}
      <div
        role="dialog"
        className="relative w-full max-w-[340px] bg-white rounded-[32px] shadow-2xl animate-in fade-in zoom-in-95 duration-300 translate-x-[320px] -translate-y-28"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- UPDATED: LARGE DOWNWARD POINTING TAIL --- */}
        {/* Increased size to w-8 h-8 and moved to bottom center */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rotate-45 rounded-sm -z-10 shadow-2xl border-r border-b border-gray-100" />

        <div className="overflow-hidden rounded-[32px] bg-white">
          {/* 1. Header Image */}
          <div className="relative h-32 w-full">
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" 
              alt="Destination" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            
            <div className="absolute bottom-2 left-5 flex items-center gap-2">
              <img 
                src={`https://i.pravatar.cc/150?u=jane`} 
                className="w-9 h-9 rounded-full border-2 border-white shadow-md"
                alt="Host"
              />
              <div className="drop-shadow-sm">
                <p className="text-[8px] uppercase tracking-wider text-black font-bold opacity-90">Organizer</p>
                <p className="text-xs font-bold text-black leading-none">{HOST_NAME}</p>
              </div>
            </div>
          </div>

          {/* 2. Content Body */}
          <div className="px-6 pb-6">
            
            {/* Floating Compass Icon */}
            <div className="relative z-10 flex justify-center -mt-6 mb-1">
              <div className="bg-[#E0FAFB] p-3 rounded-full shadow-md border-[3px] border-white">
                <FaCompass className="text-[#20D3E5] text-lg" />
              </div>
            </div>

            {status === "confirm" && (
              <div className="text-center">
                <h2 className="text-lg font-extrabold text-gray-900 leading-tight mb-1">
                  Join {tripTitle}?
                </h2>
                <p className="text-[12px] text-gray-500 leading-snug px-2 mb-5">
                  Ready for the valleys and peaks? We'll notify {HOST_NAME} once you join.
                </p>

                <div className="space-y-2">
                  <button
                    ref={joinBtnRef}
                    onClick={handleJoin}
                    className="w-full py-3.5 bg-[#276074] hover:bg-[#276074] text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    Join Trip
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-2 text-gray-400 font-bold hover:text-gray-600 transition-all text-xs"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            )}

            {status === "loading" && (
              <div className="py-8 flex flex-col items-center">
                <div className="w-9 h-9 border-4 border-[#20D3E5]/20 border-t-[#20D3E5] rounded-full animate-spin mb-3" />
                <p className="text-[11px] font-bold text-gray-400">Sending request...</p>
              </div>
            )}

            {status === "success" && (
              <div className="animate-in slide-in-from-bottom-2 duration-300 text-center">
                <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100">
                  <FaCheckCircle className="text-[#4CAF50] text-3xl mb-2 mx-auto" />
                  <h3 className="font-extrabold text-gray-900 text-sm">Request Sent!</h3>
                  <p className="text-[11px] text-gray-500 my-2">Your request has been sent to {HOST_NAME}.</p>
                  <button 
                    onClick={onClose}
                    className="w-full bg-[#276074] text-white py-2.5 rounded-xl font-bold text-xs hover:#276074-600 shadow-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="animate-in shake duration-300 text-center">
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                  <FaExclamationCircle className="text-red-500 text-3xl mb-2 mx-auto" />
                  <h3 className="font-extrabold text-gray-900 text-sm">Error Occurred</h3>
                  <div className="flex gap-2 mt-4">
                    <button onClick={onClose} className="flex-1 py-2 bg-white text-gray-400 font-bold rounded-lg border border-gray-200 text-[10px]">Close</button>
                    <button onClick={() => setStatus("confirm")} className="flex-1 py-2 bg-[#20D3E5] text-white font-bold rounded-lg shadow-md text-[10px]">Retry</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}