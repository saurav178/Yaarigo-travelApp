// // export default function Banner() {
// //   return (
// //     <div className="relative overflow-hidden text-white shadow-2xl mb-8">
// //       {/* Animated Background Pattern */}

// //       <div
// //         className="absolute inset-0 opacity-10 bg-cover bg-center"
// //         style={{
// //           backgroundImage: "url('/banner.jpg')",
// //         }}
// //       >
// //         {/* optional dark overlay for contrast */}
// //         <div className="absolute inset-0 bg-black/30" />

// //         {/* dot pattern overlay */}
// //         <div
// //           className="absolute inset-0"
// //           style={{
// //             backgroundImage:
// //               "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
// //             backgroundSize: "40px 40px",
// //           }}
// //         />
// //       </div>

// //       <div className="relative z-10 px-6 py-16 md:px-8 md:py-20">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="max-w-3xl">
// //             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 drop-shadow-lg leading-tight">
// //               Welcome back, <span className="text-white">John!</span>
// //             </h1>
// //             <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed">
// //               Your next adventure awaits. Where will you go?
// //             </p>
// //             <button className="group relative px-6 py-3 bg-white text-[#1DA69B] font-semibold text-sm shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
// //               <span className="relative z-10">Plan New Adventure</span>
// //               <svg
// //                 className="w-4 h-4 group-hover:translate-x-1 transition-transform"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M13 7l5 5m0 0l-5 5m5-5H6"
// //                 />
// //               </svg>
// //               <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* CSS Animations */}

// //       <style jsx>{`
// //         @keyframes pulse-ring {
// //           0% {
// //             transform: scale(0.8);
// //             opacity: 1;
// //           }
// //           100% {
// //             transform: scale(2);
// //             opacity: 0;
// //           }
// //         }
// //         @keyframes orbit {
// //           from {
// //             transform: rotate(0deg) translateX(40px) rotate(0deg);
// //           }
// //           to {
// //             transform: rotate(360deg) translateX(40px) rotate(-360deg);
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// export default function Banner() {
//   return (
//     <div className="relative overflow-hidden text-white shadow-2xl mb-8">
//       {/* Background with image */}
//       <div
//         className="absolute inset-0 opacity-30 bg-cover bg-center"
//         // style={{
//         //   backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop')",
//         // }}
//       >
//         {/* Dark overlay for contrast */}
//         <div className="absolute inset-0 bg-black/20" />

//         {/* Dot pattern overlay */}
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       <div className="relative z-10 px-6 py-16 md:px-8 md:py-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="max-w-3xl">
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 drop-shadow-lg leading-tight">
//               Welcome back, <span className="text-white">John!</span>
//             </h1>
//             <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed">
//               Your next adventure awaits. Where will you go?
//             </p>
//             <button className="group relative px-6 py-3 bg-white text-[#1DA69B] font-semibold text-sm shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
//               <span className="relative z-10">Plan New Adventure</span>
//               <svg
//                 className="w-4 h-4 group-hover:translate-x-1 transition-transform"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 7l5 5m0 0l-5 5m5-5H6"
//                 />
//               </svg>
//               <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes pulse-ring {
//           0% {
//             transform: scale(0.8);
//             opacity: 1;
//           }
//           100% {
//             transform: scale(2);
//             opacity: 0;
//           }
//         }
//         @keyframes orbit {
//           from {
//             transform: rotate(0deg) translateX(40px) rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg) translateX(40px) rotate(-360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


export default function Banner() {
  return (
    <div className="relative overflow-hidden text-white shadow-2xl mb-8 h-[200px] md:h-[400px]">
      {/* Full Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/banner.jpg" 
          alt="Travel Banner" 
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 px-6 py-16 md:px-8 md:py-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-2xl leading-tight">
              Welcome back, <span className="text-white">John!</span>
            </h1>
            <p className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed drop-shadow-lg">
              Your next adventure awaits. Where will you go?
            </p>
            <button className="group relative px-8 py-4 bg-white text-[#1DA69B] font-semibold text-base rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
              <span className="relative z-10">Plan New Adventure</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(40px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(40px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}