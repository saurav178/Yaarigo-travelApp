

// // "use client";

// // import React, { useCallback, useMemo, useState } from "react";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import {
// //   Flame,
// //   MessageCircleQuestion,
// //   CalendarDays,
// //   Users,
// //   Radio,
// //   X,
// //   SendHorizonal,
// // } from "lucide-react";

// // type TabKey = "trending" | "qa" | "events" | "travel-twins" | "live";

// // export default function Sidebar() {
// //   const router = useRouter();
// //   const search = useSearchParams();

// //   // read active tab from URL; safely cast to union or fallback
// //   const active: TabKey =
// //     ((search.get("tab") as TabKey | null) ?? "trending");

// //   // --- Q&A Chat State ---
// //   const [showChat, setShowChat] = useState(false);
// //   const [message, setMessage] = useState("");
// //   const [chat, setChat] = useState<string[]>([]);

// //   const tabs: Array<{
// //     key: TabKey;
// //     label: string;
// //     icon: React.ReactElement;
// //     hover: string;
// //     border: string;
// //   }> = useMemo(
// //     () => [
// //       {
// //         key: "trending",
// //         label: "Trending",
// //         icon: <Flame size={20} className="text-orange-500" />,
// //         hover: "hover:bg-orange-50",
// //         border: "hover:border-orange-200",
// //       },
// //       {
// //         key: "qa",
// //         label: "Q&A Hub",
// //         icon: <MessageCircleQuestion size={20} className="text-blue-500" />,
// //         hover: "hover:bg-blue-50",
// //         border: "hover:border-blue-200",
// //       },
// //       {
// //         key: "events",
// //         label: "Events",
// //         icon: <CalendarDays size={20} className="text-indigo-500" />,
// //         hover: "hover:bg-indigo-50",
// //         border: "hover:border-indigo-200",
// //       },
// //       {
// //         key: "travel-twins",
// //         label: "Travel Twins",
// //         icon: <Users size={20} className="text-green-500" />,
// //         hover: "hover:bg-green-50",
// //         border: "hover:border-green-200",
// //       },
// //       {
// //         key: "live",
// //         label: "Live Updates",
// //         icon: <Radio size={20} className="text-red-500" />,
// //         hover: "hover:bg-red-50",
// //         border: "hover:border-red-200",
// //       },
// //     ],
// //     []
// //   );

// //   const go = useCallback(
// //     (key: TabKey) => {
// //       const params = new URLSearchParams(search.toString());
// //       params.set("tab", key); // key is TabKey (string literal union) → ok
// //       router.push(`?${params.toString()}`);

// //       // Toggle small chat when clicking Q&A
// //       if (key === "qa") setShowChat((prev) => !prev);
// //     },
// //     [router, search]
// //   );

// //   const handleSend = () => {
// //     const trimmed = message.trim();
// //     if (!trimmed) return;
// //     setChat((prev) => [...prev, trimmed]);
// //     setMessage("");
// //   };

// //   return (
// //     <>
// //       {/* Sidebar */}
// //       <aside className="card h-fit p-4 sticky top-4">
// //         <h2 className="text-2xl font-semibold mb-3">Community</h2>

// //         <nav
// //           aria-label="Community navigation"
// //           className="space-y-3 px-4 py-3 bg-white shadow-soft border border-neutral-200"
// //         >
// //           {tabs.map((t) => {
// //             const isActive = active === t.key;
// //             return (
// //               <button
// //                 key={t.key}
// //                 onClick={() => go(t.key)}
// //                 className={[
// //                   "w-full flex items-center justify-between px-4 py-3 transition border cursor-pointer ",
// //                   t.hover,
// //                   t.border,
// //                   isActive
// //                     ? "bg-neutral-100 border-neutral-300"
// //                     : "border-transparent",
// //                 ].join(" ")}
// //                 aria-current={isActive ? "page" : undefined}
// //               >
// //                 <span className="flex items-center gap-3">
// //                   {t.icon}
// //                   <span
// //                     className={[
// //                       "font-medium",
// //                       isActive ? "text-neutral-900" : "text-neutral-800",
// //                     ].join(" ")}
// //                   >
// //                     {t.label}
// //                   </span>
// //                 </span>

// //                 {t.key === "live" && (
// //                   <span
// //                     className="flex items-center gap-1 text-xs"
// //                     aria-label="live status"
// //                   >
// //                     <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
// //                     <span className="text-neutral-500">live</span>
// //                   </span>
// //                 )}
// //               </button>
// //             );
// //           })}
// //         </nav>

// //         {/* Journey Card */}
// //         <div className="mt-6 bg-white border border-neutral-200 shadow-soft p-5">
// //           <div className="flex items-center justify-between mb-4">
// //             <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
// //               🧭 Your Journey
// //             </h3>
// //             <span className="px-3 py-1 text-sm font-medium text-white bg-[#1D4350] rounded-full shadow-sm">
// //               Level 7
// //             </span>
// //           </div>

// //           <div className="text-sm space-y-2">
// //             <div className="flex justify-between items-center">
// //               <span className="text-neutral-600">Countries Visited</span>
// //               <span className="font-semibold text-neutral-900">23</span>
// //             </div>

// //             <div className="text-neutral-600 flex items-center gap-1">
// //               <span>🎯</span>
// //               <span>
// //                 Next milestone:{" "}
// //                 <span className="font-medium text-neutral-800">25 countries</span>
// //               </span>
// //             </div>

// //             <div className="mt-3 h-2 bg-neutral-200 rounded-full overflow-hidden">
// //               <div className=" h-full bg-linear-to-r from-[#1D4350] w-[70%] to-[#3b97f3ff] " />
// //               {/* //className="h-full bg-linear-to-r from-[#1D4350] w-[70%] to-[#3b97f3ff]  */}
// //             </div>
// //           </div>

// //           <div className="mt-4 text-xs text-neutral-600 border-t border-neutral-100 pt-3 flex justify-between">
// //             <span>
// //               💬 Community Answers:{" "}
// //               <span className="font-semibold text-neutral-800">62</span>/50 helpful
// //             </span>
// //             <span className="text-orange-500 font-medium">★ +8 bonus</span>
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Bottom-right floating chat box */}

// //       {showChat && (
// //         <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden animate-fadeIn z-50">

// //           {/* Header */}

// //           <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
// //             <span className="font-medium flex items-center gap-2">
// //               <MessageCircleQuestion size={18} /> Q&A Chat
// //             </span>
// //             <button
// //               onClick={() => setShowChat(false)}
// //               className="hover:text-gray-200 transition"
// //               aria-label="Close chat"
// //               title="Close"
// //             >
// //               <X size={18} />
// //             </button>
// //           </div>

// //           {/* Messages */}

// //           <div className="p-3 h-60 overflow-y-auto bg-neutral-50 space-y-2 text-sm">
// //             {chat.length === 0 ? (
// //               <p className="text-neutral-400 text-center mt-10">
// //                 💬 Ask a question below!
// //               </p>
// //             ) : (
// //               chat.map((msg, i) => (
// //                 <div
// //                   key={i}
// //                   className="bg-blue-100 text-blue-900 px-3 py-2 rounded-md w-fit max-w-[85%]"
// //                 >
// //                   {msg}
// //                 </div>
// //               ))
// //             )}
// //           </div>

// //           {/* Input */}

// //           <div className="flex items-center gap-2 border-t border-neutral-200 p-2">
// //             <input
// //               type="text"
// //               placeholder="Type your question..."
// //               value={message}
// //               onChange={(e) => setMessage(e.target.value)}
// //               className="flex-1 border border-neutral-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             />
// //             <button
// //               onClick={handleSend}
// //               className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 flex items-center gap-1"
// //             >
// //               <SendHorizonal size={14} />
// //               Send
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }


// "use client";

// import React, { useCallback, useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   Flame,
//   // MessageCircleQuestion,
//   CalendarDays,
//   Users,
//   Radio,
//   X,
//   SendHorizonal,
//   MessageCircleQuestion as MessageIcon,
// } from "lucide-react";

// type TabKey = "trending" | "qa" | "events" | "travel-twins" | "live";
// type ChatMsg = { role: "user" | "bot"; text: string };

// export default function Sidebar() {
//   const router = useRouter();
//   const search = useSearchParams();

//   // read active tab from URL; safely cast to union or fallback
//   const active: TabKey = ((search.get("tab") as TabKey | null) ?? "trending");

//   // --- Q&A Chat State ---
//   const [showChat, setShowChat] = useState(false);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState<ChatMsg[]>([]);
//   const [typing, setTyping] = useState(false);

//   const tabs: Array<{
//     key: TabKey;
//     label: string;
//     icon: React.ReactElement;
//     hover: string;
//     border: string;
//   }> = useMemo(
//     () => [
//       {
//         key: "trending",
//         label: "Trending",
//         icon: <Flame size={20} className="text-orange-500" />,
//         hover: "hover:bg-orange-50",
//         border: "hover:border-orange-200",
//       },
//       {
//         key: "qa",
//         label: "Q&A Hub",
//         icon: <MessageIcon size={20} className="text-blue-500" />,
//         hover: "hover:bg-blue-50",
//         border: "hover:border-blue-200",
//       },
//       {
//         key: "events",
//         label: "Events",
//         icon: <CalendarDays size={20} className="text-indigo-500" />,
//         hover: "hover:bg-indigo-50",
//         border: "hover:border-indigo-200",
//       },
//       {
//         key: "travel-twins",
//         label: "Travel Twins",
//         icon: <Users size={20} className="text-green-500" />,
//         hover: "hover:bg-green-50",
//         border: "hover:border-green-200",
//       },
//       {
//         key: "live",
//         label: "Live Updates",
//         icon: <Radio size={20} className="text-red-500" />,
//         hover: "hover:bg-red-50",
//         border: "hover:border-red-200",
//       },
//     ],
//     []
//   );

//   const go = useCallback(
//     (key: TabKey) => {
//       const params = new URLSearchParams(search.toString());
//       params.set("tab", key);
//       router.push(`?${params.toString()}`);

//       // Toggle small chat when clicking Q&A
//       if (key === "qa") setShowChat((prev) => !prev);
//     },
//     [router, search]
//   );

//   // --- Simple auto-reply rules ---
//   const getBotReply = (msg: string): string => {
//     const m = msg.toLowerCase();
//     if (m.includes("hello") || m.includes("hi")) {
//       return "Hey there 👋 How can I help you today?";
//     }
//     if (m.includes("how are you")) {
//       return "I’m doing great! Thanks for asking. What can I help you with?";
//     }
//     if (m.includes("help")) {
//       return "Sure! Ask me anything about trips, events, or the community.";
//     }
//     if (m.includes("bye")) {
//       return "Goodbye! 👋 Have a wonderful day.";
//     }
//     if (m.includes("thanks") || m.includes("thank you")) {
//       return "You're welcome! 💙";
//     }
//     if (m.includes("name")) {
//       return "I’m your Q&A assistant 🤖.";
//     }
//     return "Hmm 🤔 I didn’t quite get that. Could you rephrase your question?";
//   };

//   const sendMessage = (text: string) => {
//     // add user message
//     setChat((prev) => [...prev, { role: "user", text }]);
//     setTyping(true);

//     // simulate bot thinking
//     const reply = getBotReply(text);
//     setTimeout(() => {
//       setChat((prev) => [...prev, { role: "bot", text: reply }]);
//       setTyping(false);
//     }, 700);
//   };

//   const handleSend = () => {
//     const trimmed = message.trim();
//     if (!trimmed) return;
//     setMessage("");
//     sendMessage(trimmed);
//   };

//   return (
//     <>
//       {/* Sidebar */}
//       <aside className="card h-fit p-4 sticky top-18">
//         <h2 className="text-2xl font-semibold mb-3">Community</h2>

//         <nav
//           aria-label="Community navigation"
//           className="space-y-3 px-4 py-3 bg-white shadow-soft border border-neutral-200"
//         >
//           {tabs.map((t) => {
//             const isActive = active === t.key;
//             return (
//               <button
//                 key={t.key}
//                 onClick={() => go(t.key)}
//                 className={[
//                   "w-full flex items-center justify-between px-4 py-3 transition border cursor-pointer ",
//                   t.hover,
//                   t.border,
//                   isActive
//                     ? "bg-neutral-100 border-neutral-300"
//                     : "border-transparent",
//                 ].join(" ")}
//                 aria-current={isActive ? "page" : undefined}
//               >
//                 <span className="flex items-center gap-3">
//                   {t.icon}
//                   <span
//                     className={[
//                       "font-medium",
//                       isActive ? "text-neutral-900" : "text-neutral-800",
//                     ].join(" ")}
//                   >
//                     {t.label}
//                   </span>
//                 </span>

//                 {t.key === "live" && (
//                   <span
//                     className="flex items-center gap-1 text-xs"
//                     aria-label="live status"
//                   >
//                     <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
//                     <span className="text-neutral-500">live</span>
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </nav>

//         {/* Journey Card */}
//         <div className="mt-6 bg-white border border-neutral-200 shadow-soft p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
//               🧭 Your Journey
//             </h3>
//             <span className="px-3 py-1 text-sm font-medium text-white bg-[#1D4350] rounded-full shadow-sm">
//               Level 7
//             </span>
//           </div>

//           <div className="text-sm space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-neutral-600">Countries Visited</span>
//               <span className="font-semibold text-neutral-900">23</span>
//             </div>

//             <div className="text-neutral-600 flex items-center gap-1">
//               <span>🎯</span>
//               <span>
//                 Next milestone:{" "}
//                 <span className="font-medium text-neutral-800">25 countries</span>
//               </span>
//             </div>

//             <div className="mt-3 h-2 bg-neutral-200 rounded-full overflow-hidden">
//               <div className=" h-full bg-linear-to-r from-[#1D4350] w-[70%] to-[#3b97f3ff] " />
//             </div>
//           </div>

//           <div className="mt-4 text-xs text-neutral-600 border-t border-neutral-100 pt-3 flex justify-between">
//             <span>
//               💬 Community Answers:{" "}
//               <span className="font-semibold text-neutral-800">62</span>/50 helpful
//             </span>
//             <span className="text-orange-500 font-medium">★ +8 bonus</span>
//           </div>
//         </div>
//       </aside>

//       {/* Bottom-right floating chat box */}
//       {showChat && (
//         <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden animate-fadeIn z-50">
//           {/* Header */}
//           <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
//             <span className="font-medium flex items-center gap-2">
//               <MessageIcon size={18} /> Q&A Chat
//             </span>
//             <button
//               onClick={() => setShowChat(false)}
//               className="hover:text-gray-200 transition"
//               aria-label="Close chat"
//               title="Close"
//             >
//               <X size={18} />
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="p-3 h-60 overflow-y-auto bg-neutral-50 space-y-2 text-sm">
//             {chat.length === 0 ? (
//               <p className="text-neutral-400 text-center mt-10">
//                 💬 Ask a question below!
//               </p>
//             ) : (
//               chat.map((m, i) => (
//                 <div
//                   key={i}
//                   className={[
//                     "px-3 py-2 rounded-md w-fit max-w-[85%]",
//                     m.role === "user"
//                       ? "bg-blue-100 text-blue-900 ml-auto"
//                       : "bg-gray-200 text-gray-800",
//                   ].join(" ")}
//                 >
//                   {m.text}
//                 </div>
//               ))
//             )}

//             {typing && (
//               <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md w-fit max-w-[85%]">
//                 <span className="inline-flex items-center gap-2">
//                   <span className="h-2 w-2 rounded-full bg-gray-500 animate-pulse" />
//                   typing…
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Input */}
//           <div className="flex items-center gap-2 border-t border-neutral-200 p-2">
//             <input
//               type="text"
//               placeholder="Type your question..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               className="flex-1 border border-neutral-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={handleSend}
//               className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 flex items-center gap-1"
//             >
//               <SendHorizonal size={14} />
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// "use client";

// import React, { useCallback, useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   Flame,
//   CalendarDays,
//   Users,
//   Radio,
//   X,
//   SendHorizonal,
//   MessageCircleQuestion as MessageIcon,
// } from "lucide-react";

// type TabKey = "trending" | "qa" | "events" | "travel-twins" | "live" | "solo" | "travel-stories";
// type ChatMsg = { role: "user" | "bot"; text: string };

// export default function Sidebar() {
//   const router = useRouter();
//   const search = useSearchParams();

//   // read active tab from URL; safely cast to union or fallback
//   const active: TabKey = ((search.get("tab") as TabKey | null) ?? "trending");

//   // --- Q&A Chat State ---
//   const [showChat, setShowChat] = useState(false);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState<ChatMsg[]>([]);
//   const [typing, setTyping] = useState(false);

//   const tabs: Array<{
//     key: TabKey;
//     label: string;
//     icon: React.ReactElement;
//     hover: string;
//     border: string;
//   }> = useMemo(
//     () => [
//       {
//         key: "trending",
//         label: "Trending",
//         icon: <Flame size={20} className="text-orange-500" />,
//         hover: "hover:bg-orange-50",
//         border: "hover:border-orange-200",
//       },
      
//       {
//         key: "solo",
//         label: "Solo female travel",
//         icon: <CalendarDays size={20} className="text-indigo-500" />,
//         hover: "hover:bg-indigo-50",
//         border: "hover:border-indigo-200",
//       },
//       {
//         key: "events",
//         label: "Events/Meetups",
//         icon: <CalendarDays size={20} className="text-indigo-500" />,
//         hover: "hover:bg-indigo-50",
//         border: "hover:border-indigo-200",
//       },
//       {
//         key: "travel-twins",
//         label: "Travel Twins",
//         icon: <Users size={20} className="text-green-500" />,
//         hover: "hover:bg-green-50",
//         border: "hover:border-green-200",
//       },
//       {
//         key: "travel-stories",
//         label: "Travel Stories/Journals",
//         icon: <CalendarDays size={20} className="text-indigo-500" />,
//         hover: "hover:bg-indigo-50",
//         border: "hover:border-indigo-200",
//       },
//       {
//         key: "live",
//         label: "Live Updates",
//         icon: <Radio size={20} className="text-red-500" />,
//         hover: "hover:bg-red-50",
//         border: "hover:border-red-200",
//       },
//       {
//         key: "qa",
//         label: "Discussion Forums",
//         icon: <MessageIcon size={20} className="text-blue-500" />,
//         hover: "hover:bg-blue-50",
//         border: "hover:border-blue-200",
//       },
//     ],
//     []
//   );

//   const go = useCallback(
//     (key: TabKey) => {
//       const params = new URLSearchParams(search.toString());
//       params.set("tab", key);
//       router.push(`?${params.toString()}`);

//       // Toggle small chat when clicking Q&A
//       if (key === "qa") setShowChat((prev) => !prev);
//     },
//     [router, search]
//   );

//   // --- Simple auto-reply rules ---
//   const getBotReply = (msg: string): string => {
//     const m = msg.toLowerCase();
//     if (m.includes("hello") || m.includes("hi")) {
//       return "Hey there 👋 How can I help you today?";
//     }
//     if (m.includes("how are you")) {
//       return "I’m doing great! Thanks for asking. What can I help you with?";
//     }
//     if (m.includes("help")) {
//       return "Sure! Ask me anything about trips, events, or the community.";
//     }
//     if (m.includes("bye")) {
//       return "Goodbye! 👋 Have a wonderful day.";
//     }
//     if (m.includes("thanks") || m.includes("thank you")) {
//       return "You're welcome! 💙";
//     }
//     if (m.includes("name")) {
//       return "I’m your Q&A assistant 🤖.";
//     }
//     return "Hmm 🤔 I didn’t quite get that. Could you rephrase your question?";
//   };

//   const sendMessage = (text: string) => {
//     setChat((prev) => [...prev, { role: "user", text }]);
//     setTyping(true);

//     const reply = getBotReply(text);
//     setTimeout(() => {
//       setChat((prev) => [...prev, { role: "bot", text: reply }]);
//       setTyping(false);
//     }, 700);
//   };

//   const handleSend = () => {
//     const trimmed = message.trim();
//     if (!trimmed) return;
//     setMessage("");
//     sendMessage(trimmed);
//   };

//   return (
//     <>
//       {/* Sidebar (kept same logic/structure) */}
//       <aside className="card h-fit p-4 sticky top-18">
//         <h2 className="text-2xl font-semibold mb-3">Community</h2>

//         <nav
//           aria-label="Community navigation"
//           className="space-y-3 px-4 py-3 bg-white shadow-soft border border-neutral-200"
//         >
//           {tabs.map((t) => {
//             const isActive = active === t.key;
//             return (
//               <button
//                 key={t.key}
//                 onClick={() => go(t.key)}
//                 className={[
//                   "w-full flex items-center justify-between px-4 py-3 transition border cursor-pointer ",
//                   t.hover,
//                   t.border,
//                   isActive
//                     ? "bg-neutral-100 border-neutral-300"
//                     : "border-transparent",
//                 ].join(" ")}
//                 aria-current={isActive ? "page" : undefined}
//               >
//                 <span className="flex items-center gap-3">
//                   {t.icon}
//                   <span
//                     className={[
//                       "font-medium",
//                       isActive ? "text-neutral-900" : "text-neutral-800",
//                     ].join(" ")}
//                   >
//                     {t.label}
//                   </span>
//                 </span>

//                 {t.key === "live" && (
//                   <span
//                     className="flex items-center gap-1 text-xs"
//                     aria-label="live status"
//                   >
//                     <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
//                     <span className="text-neutral-500">live</span>
//                   </span>
//                 )}
//               </button>
//             );
//           })}

//           <div className="bg-neutral-50 border border-neutral-200 p-5">
//           <div className="mt-5 border-t border-neutral-200 pt-4">
//             <h4 className="font-semibold text-sm mb-2 text-neutral-800 flex items-center gap-1">
//               🤖 AI Enhancements
//             </h4>
//             <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Spam filtering & moderation</li>
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Story summarization</li>
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Personalized feed</li>
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">“Ask a Local” feature</li>
//             </ul>
//           </div>

//           <div className="mt-5 border-t border-neutral-200 pt-4">
//             <h4 className="font-semibold text-sm mb-2 text-neutral-800 flex items-center gap-1">
//               🏆 Gamification
//             </h4>
//             <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Badges</li>
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Leaderboards</li>
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Challenges</li>
//             </ul>
//           </div>
//         </div>
//         </nav>

//         {/* <div className="bg-neutral-50 border border-neutral-200 p-5">
//           <div className="mt-5 border-t border-neutral-200 pt-4">
//             <h4 className="font-semibold text-sm mb-2 text-neutral-800 flex items-center gap-1">
//               🤖 AI Enhancements
//             </h4>
//             <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Spam filtering & moderation</li>
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Story summarization</li>
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Personalized feed</li>
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">“Ask a Local” feature</li>
//             </ul>
//           </div>

//           <div className="mt-5 border-t border-neutral-200 pt-4">
//             <h4 className="font-semibold text-sm mb-2 text-neutral-800 flex items-center gap-1">
//               🏆 Gamification
//             </h4>
//             <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Badges</li>
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Leaderboards</li>
//               <li className="cursor-pointer hover:text-[#3b97f3ff]">Challenges</li>
//             </ul>
//           </div>
//         </div> */}
//         {/* Journey Card */}
//         <div className="mt-6 bg-white border border-neutral-200 shadow-soft p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
//               🧭 Your Journey
//             </h3>
//             <span className="px-3 py-1 text-sm font-medium text-white bg-[#1D4350] rounded-full shadow-sm">
//               Level 7
//             </span>
//           </div>

//           <div className="text-sm space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-neutral-600">Countries Visited</span>
//               <span className="font-semibold text-neutral-900">23</span>
//             </div>

//             <div className="text-neutral-600 flex items-center gap-1">
//               <span>🎯</span>
//               <span>
//                 Next milestone:{" "}
//                 <span className="font-medium text-neutral-800">25 countries</span>
//               </span>
//             </div>

//             <div className="mt-3 h-2 bg-neutral-200 rounded-full overflow-hidden">
//               <div className=" h-full bg-linear-to-r from-[#1D4350] w-[70%] to-[#3b97f3ff] " />
//             </div>
//           </div>

//           <div className="mt-4 text-xs text-neutral-600 border-t border-neutral-100 pt-3 flex justify-between">
//             <span>
//               💬 Community Answers:{" "}
//               <span className="font-semibold text-neutral-800">62</span>/50 helpful
//             </span>
//             <span className="text-orange-500 font-medium">★ +8 bonus</span>
//           </div>
//         </div>
//       </aside>

//       {/* Bottom-right floating chat box (unchanged logic) */}
//       {showChat && (
//         <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden animate-fadeIn z-50">
//           {/* Header */}
//           <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
//             <span className="font-medium flex items-center gap-2">
//               <MessageIcon size={18} /> Q&A Chat
//             </span>
//             <button
//               onClick={() => setShowChat(false)}
//               className="hover:text-gray-200 transition"
//               aria-label="Close chat"
//               title="Close"
//             >
//               <X size={18} />
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="p-3 h-60 overflow-y-auto bg-neutral-50 space-y-2 text-sm">
//             {chat.length === 0 ? (
//               <p className="text-neutral-400 text-center mt-10">
//                 💬 Ask a question below!
//               </p>
//             ) : (
//               chat.map((m, i) => (
//                 <div
//                   key={i}
//                   className={[
//                     "px-3 py-2 rounded-md w-fit max-w-[85%]",
//                     m.role === "user"
//                       ? "bg-blue-100 text-blue-900 ml-auto"
//                       : "bg-gray-200 text-gray-800",
//                   ].join(" ")}
//                 >
//                   {m.text}
//                 </div>
//               ))
//             )}

//             {typing && (
//               <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md w-fit max-w-[85%]">
//                 <span className="inline-flex items-center gap-2">
//                   <span className="h-2 w-2 rounded-full bg-gray-500 animate-pulse" />
//                   typing…
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Input */}
//           <div className="flex items-center gap-2 border-t border-neutral-200 p-2">
//             <input
//               type="text"
//               placeholder="Type your question..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               className="flex-1 border border-neutral-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={handleSend}
//               className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 flex items-center gap-1"
//             >
//               <SendHorizonal size={14} />
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// "use client";

// import React, { useCallback, useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   Flame,
//   CalendarDays,
//   Users,
//   Radio,
//   X,
//   SendHorizonal,
//   Bot,
//   Shield,
//   BookOpen,
//   Compass,
//   MapPin,
//   MessageCircleQuestion as MessageIcon,
// } from "lucide-react";

// type TabKey =
//   | "trending"
//   | "qa"
//   | "events"
//   | "travel-twins"
//   | "live"
//   | "solo"
//   | "travel-stories"
//   // individual AI feature tabs:
//   | "ai-spam"
//   | "ai-summary"
//   | "ai-feed"
//   | "ai-local";

// type ChatMsg = { role: "user" | "bot"; text: string };

// export default function Sidebar() {
//   const router = useRouter();
//   const search = useSearchParams();

//   const active: TabKey = ((search.get("tab") as TabKey | null) ?? "trending");

//   // --- Q&A Chat State ---
//   const [showChat, setShowChat] = useState(false);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState<ChatMsg[]>([]);
//   const [typing, setTyping] = useState(false);

//   // --- Tabs: added 4 AI items as first-class tabs ---
//   const tabs: Array<{
//     key: TabKey;
//     label: string;
//     icon: React.ReactElement;
//   }> = useMemo(
//     () => [
//       { key: "trending", label: "Trending", icon: <Flame size={20} className="text-orange-500" /> },
//       { key: "solo", label: "Solo Female Travel", icon: <CalendarDays size={20} className="text-indigo-500" /> },
//       { key: "events", label: "Events / Meetups", icon: <CalendarDays size={20} className="text-indigo-500" /> },
//       { key: "travel-twins", label: "Travel Twins", icon: <Users size={20} className="text-green-500" /> },
//       { key: "travel-stories", label: "Travel Stories / Journals", icon: <CalendarDays size={20} className="text-indigo-500" /> },
//       { key: "live", label: "Live Updates", icon: <Radio size={20} className="text-red-500" /> },
//       { key: "qa", label: "Discussion Forums", icon: <MessageIcon size={20} className="text-blue-500" /> },
//       // AI options as peers:
//       { key: "ai-spam", label: "AI: Spam Filtering", icon: <Shield size={20} className="text-purple-600" /> },
//       { key: "ai-summary", label: "AI: Story Summarization", icon: <BookOpen size={20} className="text-purple-600" /> },
//       { key: "ai-feed", label: "AI: Personalized Feed", icon: <Compass size={20} className="text-purple-600" /> },
//       { key: "ai-local", label: "AI: Ask a Local", icon: <MapPin size={20} className="text-purple-600" /> },
//     ],
//     []
//   );

//   const go = useCallback(
//     (key: TabKey) => {
//       const params = new URLSearchParams(search.toString());
//       params.set("tab", key);
//       router.push(`?${params.toString()}`);

//       // keep your original behavior: toggle chat when QA selected
//       if (key === "qa") setShowChat((prev) => !prev);
//     },
//     [router, search]
//   );

//   // --- Simple auto-reply rules (unchanged) ---
//   const getBotReply = (msg: string): string => {
//     const m = msg.toLowerCase();
//     if (m.includes("hello") || m.includes("hi")) return "Hey there 👋 How can I help you today?";
//     if (m.includes("how are you")) return "I’m doing great! Thanks for asking. What can I help you with?";
//     if (m.includes("help")) return "Sure! Ask me anything about trips, events, or the community.";
//     if (m.includes("bye")) return "Goodbye! 👋 Have a wonderful day.";
//     if (m.includes("thanks") || m.includes("thank you")) return "You're welcome! 💙";
//     if (m.includes("name")) return "I’m your Q&A assistant 🤖.";
//     return "Hmm 🤔 I didn’t quite get that. Could you rephrase your question?";
//   };

//   const sendMessage = (text: string) => {
//     setChat((prev) => [...prev, { role: "user", text }]);
//     setTyping(true);

//     const reply = getBotReply(text);
//     setTimeout(() => {
//       setChat((prev) => [...prev, { role: "bot", text: reply }]);
//       setTyping(false);
//     }, 700);
//   };

//   const handleSend = () => {
//     const trimmed = message.trim();
//     if (!trimmed) return;
//     setMessage("");
//     sendMessage(trimmed);
//   };

//   // helper: AI tab quick actions
//   const openQAWith = (prompt: string) => {
//     const params = new URLSearchParams(search.toString());
//     params.set("tab", "qa");
//     router.push(`?${params.toString()}`);
//     setShowChat(true);
//     sendMessage(prompt);
//   };

//   // --- Render details panel for AI tabs only ---
//   const renderPanel = () => {
//     if (active === "ai-spam") {
//       return (
//         <div className="mt-5 bg-white border border-neutral-200 rounded-md p-5 shadow-soft">
//           <div className="flex items-center gap-2 text-neutral-800 font-semibold mb-2">
//             <Shield size={18} className="text-purple-600" /> AI: Spam Filtering & Moderation
//           </div>
//           <p className="text-sm text-neutral-700 mb-3">
//             Auto-detect and hide spam, scams, and abusive content. Community stays clean and helpful.
//           </p>
//           <button
//             onClick={() => openQAWith("How does AI filter spam and moderate posts here?")}
//             className="text-sm bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
//           >
//             Ask how it works
//           </button>
//         </div>
//       );
//     }
//     if (active === "ai-summary") {
//       return (
//         <div className="mt-5 bg-white border border-neutral-200 rounded-md p-5 shadow-soft">
//           <div className="flex items-center gap-2 text-neutral-800 font-semibold mb-2">
//             <BookOpen size={18} className="text-purple-600" /> AI: Story Summarization
//           </div>
//           <p className="text-sm text-neutral-700 mb-3">
//             TL;DR for long travel stories and threads. Skim faster, read deeper when you want.
//           </p>
//           <button
//             onClick={() => openQAWith("Can you summarize long travel stories automatically?")}
//             className="text-sm bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
//           >
//             Try a summary
//           </button>
//         </div>
//       );
//     }
//     if (active === "ai-feed") {
//       return (
//         <div className="mt-5 bg-white border border-neutral-200 rounded-md p-5 shadow-soft">
//           <div className="flex items-center gap-2 text-neutral-800 font-semibold mb-2">
//             <Compass size={18} className="text-purple-600" /> AI: Personalized Feed
//           </div>
//           <p className="text-sm text-neutral-700 mb-3">
//             A smarter feed tuned to your destinations, budget, and style—no extra settings needed.
//           </p>
//           <button
//             onClick={() => openQAWith("How can AI personalize my travel feed?")}
//             className="text-sm bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
//           >
//             Personalize my feed
//           </button>
//         </div>
//       );
//     }
//     if (active === "ai-local") {
//       return (
//         <div className="mt-5 bg-white border border-neutral-200 rounded-md p-5 shadow-soft">
//           <div className="flex items-center gap-2 text-neutral-800 font-semibold mb-2">
//             <MapPin size={18} className="text-purple-600" /> AI: Ask a Local
//           </div>
//           <p className="text-sm text-neutral-700 mb-3">
//             Get local tips fast—what to eat, safer routes, hidden gems—powered by community knowledge.
//           </p>
//           <button
//             onClick={() => openQAWith("How does the 'Ask a Local' feature work and what can I ask?")}
//             className="text-sm bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
//           >
//             Ask a local
//           </button>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <>
//       {/* Sidebar */}
//       <aside className="card h-fit p-4 sticky top-18">
//         <h2 className="text-2xl font-semibold mb-3">Community</h2>

//         {/* Tabs */}
//         <nav
//           aria-label="Community navigation"
//           className="space-y-3 px-4 py-3 bg-white shadow-soft border border-neutral-200"
//         >
//           {tabs.map((t) => {
//             const isActive = active === t.key;
//             return (
//               <button
//                 key={t.key}
//                 onClick={() => go(t.key)}
//                 className={`w-full flex items-center justify-between px-4 py-3 transition border cursor-pointer rounded-md ${
//                   isActive ? "bg-neutral-100 border-neutral-300" : "border-transparent hover:bg-neutral-50"
//                 }`}
//                 aria-current={isActive ? "page" : undefined}
//               >
//                 <span className="flex items-center gap-3">
//                   {t.icon}
//                   <span className={`font-medium ${isActive ? "text-neutral-900" : "text-neutral-800"}`}>
//                     {t.label}
//                   </span>
//                 </span>

//                 {t.key === "live" && (
//                   <span className="flex items-center gap-1 text-xs" aria-label="live status">
//                     <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
//                     <span className="text-neutral-500">live</span>
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </nav>

//         {/* AI panels (only when an AI tab is selected) */}
//         {renderPanel()}

//         {/* Gamification (unchanged) */}
//         <div className="mt-4 bg-neutral-50 border border-neutral-200 rounded-md p-5">
//           <h4 className="font-semibold text-sm mb-3 text-neutral-800 flex items-center gap-2">
//             🏆 Gamification
//           </h4>

//           <div className="flex items-center justify-between text-sm mb-2">
//             <span className="text-neutral-600">Level</span>
//             <span className="font-semibold text-neutral-900">7</span>
//           </div>
//           <div className="h-2 bg-neutral-200 rounded-full overflow-hidden mb-3">
//             <div className="h-full w-[68%] bg-linear-to-r from-[#1D4350] to-[#3b97f3ff]" />
//           </div>
//           <div className="flex items-center justify-between text-xs text-neutral-600 mb-4">
//             <span>XP</span>
//             <span className="font-medium text-neutral-800">680 / 1000</span>
//           </div>

//           <div className="mb-4">
//             <div className="text-xs font-semibold text-neutral-800 mb-2">Badges</div>
//             <div className="flex flex-wrap gap-2">
//               <span className="px-2 py-1 text-xs bg-white border border-neutral-200 rounded-full">Trailblazer</span>
//               <span className="px-2 py-1 text-xs bg-white border border-neutral-200 rounded-full">Storyteller</span>
//               <span className="px-2 py-1 text-xs bg-white border border-neutral-200 rounded-full">Helpful ✨</span>
//             </div>
//           </div>
//         </div>

//         {/* Journey Card (unchanged) */}
//         <div className="mt-6 bg-white border border-neutral-200 shadow-soft p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">🧭 Your Journey</h3>
//             <span className="px-3 py-1 text-sm font-medium text-white bg-[#1D4350] rounded-full shadow-sm">Level 7</span>
//           </div>

//           <div className="text-sm space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-neutral-600">Countries Visited</span>
//               <span className="font-semibold text-neutral-900">23</span>
//             </div>

//             <div className="text-neutral-600 flex items-center gap-1">
//               <span>🎯</span>
//               <span>
//                 Next milestone: <span className="font-medium text-neutral-800">25 countries</span>
//               </span>
//             </div>

//             <div className="mt-3 h-2 bg-neutral-200 rounded-full overflow-hidden">
//               <div className="h-full bg-linear-to-r from-[#1D4350] w-[70%] to-[#3b97f3ff]" />
//             </div>
//           </div>

//           <div className="mt-4 text-xs text-neutral-600 border-t border-neutral-100 pt-3 flex justify-between">
//             <span>
//               💬 Community Answers: <span className="font-semibold text-neutral-800">62</span>/50 helpful
//             </span>
//             <span className="text-orange-500 font-medium">★ +8 bonus</span>
//           </div>
//         </div>
//       </aside>

//       {/* Bottom-right floating chat box (unchanged) */}
//       {showChat && (
//         <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden animate-fadeIn z-50">
//           <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
//             <span className="font-medium flex items-center gap-2">
//               <MessageIcon size={18} /> Q&A Chat
//             </span>
//             <button
//               onClick={() => setShowChat(false)}
//               className="hover:text-gray-200 transition"
//               aria-label="Close chat"
//               title="Close"
//             >
//               <X size={18} />
//             </button>
//           </div>

//           <div className="p-3 h-60 overflow-y-auto bg-neutral-50 space-y-2 text-sm">
//             {chat.length === 0 ? (
//               <p className="text-neutral-400 text-center mt-10">💬 Ask a question below!</p>
//             ) : (
//               chat.map((m, i) => (
//                 <div
//                   key={i}
//                   className={`px-3 py-2 rounded-md w-fit max-w-[85%] ${
//                     m.role === "user" ? "bg-blue-100 text-blue-900 ml-auto" : "bg-gray-200 text-gray-800"
//                   }`}
//                 >
//                   {m.text}
//                 </div>
//               ))
//             )}
//             {typing && (
//               <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md w-fit max-w-[85%]">
//                 <span className="inline-flex items-center gap-2">
//                   <span className="h-2 w-2 rounded-full bg-gray-500 animate-pulse" />
//                   typing…
//                 </span>
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-2 border-t border-neutral-200 p-2">
//             <input
//               type="text"
//               placeholder="Type your question..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               className="flex-1 border border-neutral-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={handleSend}
//               className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 flex items-center gap-1"
//             >
//               <SendHorizonal size={14} />
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Flame,
  CalendarDays,
  Users,
  Radio,
  X,
  SendHorizonal,
  Shield,
  BookOpen,
  Compass,
  MapPin,
  MessageCircleQuestion as MessageIcon,
} from "lucide-react";

type TabKey =
  | "trending"
  | "qa"
  | "events"
  | "travel-twins"
  | "live"
  | "solo"
  | "travel-stories"
  | "ai-spam"
  | "ai-summary"
  | "ai-feed"
  | "ai-local";

type ChatMsg = { role: "user" | "bot"; text: string };

export default function Sidebar() {
  const router = useRouter();
  const search = useSearchParams();

  const active: TabKey = ((search.get("tab") as TabKey | null) ?? "trending");

  // --- Q&A Chat State ---
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState(false);

  // Tabs (AI items are peers)
  const tabs: Array<{
    key: TabKey;
    label: string;
    icon: React.ReactElement;
  }> = useMemo(
    () => [
      { key: "trending", label: "Trending", icon: <Flame size={20} className="text-orange-500" /> },
      { key: "solo", label: "Solo Female Travel", icon: <CalendarDays size={20} className="text-indigo-500" /> },
      { key: "events", label: "Events / Meetups", icon: <CalendarDays size={20} className="text-indigo-500" /> },
      { key: "travel-twins", label: "Travel Twins", icon: <Users size={20} className="text-green-500" /> },
      { key: "travel-stories", label: "Travel Stories / Journals", icon: <CalendarDays size={20} className="text-indigo-500" /> },
      { key: "live", label: "Live Updates", icon: <Radio size={20} className="text-red-500" /> },
      { key: "qa", label: "Discussion Forums", icon: <MessageIcon size={20} className="text-blue-500" /> },
      // AI feature tabs:
      { key: "ai-spam", label: "AI: Spam Filtering", icon: <Shield size={20} className="text-purple-600" /> },
      { key: "ai-summary", label: "AI: Story Summarization", icon: <BookOpen size={20} className="text-purple-600" /> },
      { key: "ai-feed", label: "AI: Personalized Feed", icon: <Compass size={20} className="text-purple-600" /> },
      { key: "ai-local", label: "AI: Ask a Local", icon: <MapPin size={20} className="text-purple-600" /> },
    ],
    []
  );

  const go = useCallback(
    (key: TabKey) => {
      const params = new URLSearchParams(search.toString());
      params.set("tab", key);
      router.push(`?${params.toString()}`);
      if (key === "qa") setShowChat((prev) => !prev);
    },
    [router, search]
  );

  // --- Simple auto-reply rules ---
  const getBotReply = (msg: string): string => {
    const m = msg.toLowerCase();
    if (m.includes("hello") || m.includes("hi")) return "Hey there 👋 How can I help you today?";
    if (m.includes("how are you")) return "I’m doing great! Thanks for asking. What can I help you with?";
    if (m.includes("help")) return "Sure! Ask me anything about trips, events, or the community.";
    if (m.includes("bye")) return "Goodbye! 👋 Have a wonderful day.";
    if (m.includes("thanks") || m.includes("thank you")) return "You're welcome! 💙";
    if (m.includes("name")) return "I’m your Q&A assistant 🤖.";
    return "Hmm 🤔 I didn’t quite get that. Could you rephrase your question?";
  };

  const sendMessage = (text: string) => {
    setChat((prev) => [...prev, { role: "user", text }]);
    setTyping(true);
    const reply = getBotReply(text);
    setTimeout(() => {
      setChat((prev) => [...prev, { role: "bot", text: reply }]);
      setTyping(false);
    }, 700);
  };

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessage("");
    sendMessage(trimmed);
  };

  // quick actions for AI tabs
  const openQAWith = (prompt: string) => {
    const params = new URLSearchParams(search.toString());
    params.set("tab", "qa");
    router.push(`?${params.toString()}`);
    setShowChat(true);
    sendMessage(prompt);
  };

  // Panels for AI tabs (only when selected)
  const renderPanel = () => {
    if (active === "ai-spam") {
      return (
        <div className="mt-4 bg-white border border-neutral-200  p-5 shadow-sm">
          <div className="flex items-center gap-2 text-neutral-800 font-semibold mb-2">
            <Shield size={18} className="text-purple-600" /> AI: Spam Filtering & Moderation
          </div>
          <p className="text-sm text-neutral-700 mb-3">
            Auto-detect and hide spam, scams, and abusive content. Community stays clean and helpful.
          </p>
          <button
            onClick={() => openQAWith("How does AI filter spam and moderate posts here?")}
            className="text-sm bg-blue-500 text-white px-3 py-2  hover:bg-blue-600 cursor-pointer"
          >
            Ask how it works
          </button>
        </div>
      );
    }
    if (active === "ai-summary") {
      return (
        <div className="mt-4 bg-white border border-neutral-200  p-5 shadow-sm cursor-pointer">
          <div className="flex items-center gap-2 text-neutral-800 font-semibold mb-2">
            <BookOpen size={18} className="text-purple-600" /> AI: Story Summarization
          </div>
          <p className="text-sm text-neutral-700 mb-3">
            TL;DR for long travel stories and threads. Skim faster, read deeper when you want.
          </p>
          <button
            onClick={() => openQAWith("Can you summarize long travel stories automatically?")}
            className="text-sm bg-blue-500 text-white px-3 py-2  hover:bg-blue-600"
          >
            Try a summary
          </button>
        </div>
      );
    }
    if (active === "ai-feed") {
      return (
        <div className="mt-4 bg-white border border-neutral-200  p-5 shadow-sm">
          <div className="flex items-center gap-2 text-neutral-800 font-semibold mb-2">
            <Compass size={18} className="text-purple-600 cursor-pointer" /> AI: Personalized Feed
          </div>
          <p className="text-sm text-neutral-700 mb-3">
            A smarter feed tuned to your destinations, budget, and style—no extra settings needed.
          </p>
          <button
            onClick={() => openQAWith("How can AI personalize my travel feed?")}
            className="text-sm bg-blue-500 text-white px-3 py-2  hover:bg-blue-600 cursor-pointer"
          >
            Personalize my feed
          </button>
        </div>
      );
    }
    if (active === "ai-local") {
      return (
        <div className="mt-4 bg-white border border-neutral-200  p-5 shadow-sm">
          <div className="flex items-center gap-2 text-neutral-800 font-semibold mb-2">
            <MapPin size={18} className="text-purple-600" /> AI: Ask a Local
          </div>
          <p className="text-sm text-neutral-700 mb-3">
            Get local tips fast—what to eat, safer routes, hidden gems—powered by community knowledge.
          </p>
          <button
            onClick={() => openQAWith("How does the 'Ask a Local' feature work and what can I ask?")}
            className="text-sm bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
          >
            Ask a local
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* Sidebar card */}
      <aside className="bg-white border border-neutral-200  p-4 shadow-sm sticky top-4">
        <h2 className="text-2xl font-semibold mb-3">Community</h2>

        {/* Tabs */}
        <nav
          aria-label="Community navigation"
          className="space-y-3 px-3 py-3 bg-white border border-neutral-200"
        >
          {tabs.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => go(t.key)}
                className={`w-full flex items-center justify-between px-4 py-3 transition border cursor-pointer  ${
                  isActive ? "bg-neutral-100 border-neutral-300" : "border-transparent hover:bg-neutral-50"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex items-center gap-3">
                  {t.icon}
                  <span className={`font-medium ${isActive ? "text-neutral-900" : "text-neutral-800"}`}>
                    {t.label}
                  </span>
                </span>

                {t.key === "live" && (
                  <span className="flex items-center gap-1 text-xs" aria-label="live status">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-neutral-500">live</span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Panels */}

        {renderPanel()}

        {/* Gamification */}

        {/* <div className="mt-4 bg-neutral-50 border border-neutral-200  p-5">
          <h4 className="font-semibold text-sm mb-3 text-neutral-800 flex items-center gap-2">
            🏆 Gamification
          </h4>

          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-neutral-600">Level</span>
            <span className="font-semibold text-neutral-900">7</span>
          </div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden mb-3">
            <div className="h-full w-[68%] bg-gradient-to-r from-[#1D4350] to-[#3b97f3ff]" />
          </div>
          <div className="flex items-center justify-between text-xs text-neutral-600 mb-4">
            <span>XP</span>
            <span className="font-medium text-neutral-800">680 / 1000</span>
          </div>

          <div className="mb-2">
            <div className="text-xs font-semibold text-neutral-800 mb-2">Badges</div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-white border border-neutral-200 rounded-full">Trailblazer</span>
              <span className="px-2 py-1 text-xs bg-white border border-neutral-200 rounded-full">Storyteller</span>
              <span className="px-2 py-1 text-xs bg-white border border-neutral-200 rounded-full">Helpful ✨</span>
            </div>
          </div>
        </div> */}

        <div className="mt-4 bg-neutral-50 border border-neutral-200 rounded-md p-5">
  {/* Header */}
  <div className="flex items-center justify-between mb-3">
    <h4 className="font-semibold text-sm text-neutral-900 flex items-center gap-2">
      🏆 Gamification
    </h4>
    <span className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-white border border-neutral-200">
      🎮 Level <span className="font-semibold text-neutral-800">7</span>
    </span>
  </div>

  {/* Progress */}
  <div className="mb-4">
    <div className="flex items-center justify-between text-xs text-neutral-600 mb-1">
      <span>XP Progress</span>
      <span className="font-medium text-neutral-800">680 / 1000</span>
    </div>
    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
      <div className="h-full w-[68%] bg-gradient-to-r from-[#1D4350] to-[#3b97f3ff]" />
    </div>
  </div>

  {/* Quick stats */}
  <div className="grid grid-cols-3 gap-2 text-center mb-5">
    <div className="bg-white border border-neutral-200 rounded-md py-2">
      <div className="text-[11px] text-neutral-500">🔥 Streak</div>
      <div className="text-sm font-semibold text-neutral-900">4 days</div>
    </div>
    <div className="bg-white border border-neutral-200 rounded-md py-2">
      <div className="text-[11px] text-neutral-500">🏅 Rank</div>
      <div className="text-sm font-semibold text-neutral-900">#12</div>
    </div>
    <div className="bg-white border border-neutral-200 rounded-md py-2">
      <div className="text-[11px] text-neutral-500">⭐ Points</div>
      <div className="text-sm font-semibold text-neutral-900">2,430</div>
    </div>
  </div>

  {/* Leaderboard */}
  <div className="mb-5">
    <div className="flex items-center justify-between mb-2">
      <div className="text-sm font-semibold text-neutral-800">🏆 Leaderboard</div>
      <button className="text-xs text-blue-600 hover:underline">View all</button>
    </div>

    <ul className="space-y-1 text-sm">
      <li className="flex items-center justify-between bg-white border border-neutral-200 rounded-md px-3 py-2">
        <span className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 grid place-items-center text-[12px]">🥇</span>
          Anika
        </span>
        <span className="text-neutral-700 font-medium">3,120</span>
      </li>
      <li className="flex items-center justify-between bg-white border border-neutral-200 rounded-md px-3 py-2">
        <span className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 grid place-items-center text-[12px]">🥈</span>
          Ravi
        </span>
        <span className="text-neutral-700 font-medium">2,950</span>
      </li>
      <li className="flex items-center justify-between bg-white border border-neutral-200 rounded-md px-3 py-2">
        <span className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 grid place-items-center text-[12px]">🥉</span>
          Isha
        </span>
        <span className="text-neutral-700 font-medium">2,740</span>
      </li>
    </ul>
  </div>

  {/* Challenges */}
  <div className="mb-5">
    <div className="text-sm font-semibold text-neutral-800 mb-2">🎯 Challenges</div>
    <ul className="space-y-2 text-sm">
      <li className="flex items-center justify-between bg-white border border-neutral-200 rounded-md px-3 py-2">
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded border border-neutral-300 bg-neutral-50"></span>
          Share 1 helpful tip in Discussions
        </span>
        <button className="text-xs px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">
          Mark done
        </button>
      </li>
      <li className="flex items-center justify-between bg-white border border-neutral-200 rounded-md px-3 py-2">
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded border border-neutral-300 bg-neutral-50"></span>
          Earn 10 likes on a post
        </span>
        <button className="text-xs px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">
          Track
        </button>
      </li>
      <li className="flex items-center justify-between bg-white border border-neutral-200 rounded-md px-3 py-2">
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded border border-neutral-300 bg-neutral-50"></span>
          Join an events/meetup this week
        </span>
        <button className="text-xs px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">
          Explore
        </button>
      </li>
    </ul>
  </div>

  {/* Badges */}
  <div>
    <div className="text-sm font-semibold text-neutral-800 mb-2">🪪 Badges</div>
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-white border border-neutral-200 rounded-md py-3 text-center">
        <div className="text-lg">🥇</div>
        <div className="text-[11px] mt-1 text-neutral-700">Trailblazer</div>
      </div>
      <div className="bg-white border border-neutral-200 rounded-md py-3 text-center">
        <div className="text-lg">📖</div>
        <div className="text-[11px] mt-1 text-neutral-700">Storyteller</div>
      </div>
      <div className="bg-white border border-neutral-200 rounded-md py-3 text-center">
        <div className="text-lg">✨</div>
        <div className="text-[11px] mt-1 text-neutral-700">Helpful</div>
      </div>
      {/* Locked examples */}
      <div className="bg-white border border-dashed border-neutral-200 rounded-md py-3 text-center opacity-60">
        <div className="text-lg">🔒</div>
        <div className="text-[11px] mt-1 text-neutral-500">Explorer</div>
      </div>
      <div className="bg-white border border-dashed border-neutral-200 rounded-md py-3 text-center opacity-60">
        <div className="text-lg">🔒</div>
        <div className="text-[11px] mt-1 text-neutral-500">Local Guru</div>
      </div>
      <div className="bg-white border border-dashed border-neutral-200 rounded-md py-3 text-center opacity-60">
        <div className="text-lg">🔒</div>
        <div className="text-[11px] mt-1 text-neutral-500">Globetrotter</div>
      </div>
    </div>

    <div className="mt-3 text-right">
      <button className="text-xs text-neutral-600 hover:text-neutral-800 hover:underline">
        View all achievements →
      </button>
    </div>
  </div>
</div>


        {/* Journey */}
        
        <div className="mt-4 bg-white border border-neutral-200  p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">🧭 Your Journey</h3>
            <span className="px-3 py-1 text-sm font-medium text-white bg-[#1D4350] rounded-full shadow-sm">
              Level 7
            </span>
          </div>

          <div className="text-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Countries Visited</span>
              <span className="font-semibold text-neutral-900">23</span>
            </div>

            <div className="text-neutral-600 flex items-center gap-1">
              <span>🎯</span>
              <span>
                Next milestone: <span className="font-medium text-neutral-800">25 countries</span>
              </span>
            </div>

            <div className="mt-3 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#1D4350] w-[70%] to-[#3b97f3ff]" />
            </div>
          </div>

          <div className="mt-4 text-xs text-neutral-600 border-t border-neutral-100 pt-3 flex justify-between">
            <span>
              💬 Community Answers: <span className="font-semibold text-neutral-800">62</span>/50 helpful
            </span>
            <span className="text-orange-500 font-medium">★ +8 bonus</span>
          </div>
        </div>
      </aside>

      {/* Floating Q&A chat */}
      {showChat && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[92vw] max-w-[22rem] bg-white  shadow-xl border border-neutral-200 overflow-hidden animate-fadeIn z-50">
          {/* Header */}
          <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-medium flex items-center gap-2">
              <MessageIcon size={18} /> Q&A Chat
            </span>
            <button
              onClick={() => setShowChat(false)}
              className="hover:text-gray-200 transition cursor-pointer"
              aria-label="Close chat"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="p-3 h-60 overflow-y-auto bg-neutral-50 space-y-2 text-sm">
            {chat.length === 0 ? (
              <p className="text-neutral-400 text-center mt-10">💬 Ask a question below!</p>
            ) : (
              chat.map((m, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-md w-fit max-w-[85%] ${
                    m.role === "user" ? "bg-blue-100 text-blue-900 ml-auto" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
              ))
            )}

            {typing && (
              <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md w-fit max-w-[85%]">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gray-500 animate-pulse" />
                  typing…
                </span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-neutral-200 p-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-neutral-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-3 py-1.5  hover:bg-blue-600 flex items-center gap-1 cursor-pointer"
            >
              <SendHorizonal size={14} />
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
