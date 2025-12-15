// "use client";

// import { useEffect, useState } from "react";

// export default function TravioLoader() {
//   const text = "Travio.";
//   const [startAnimation, setStartAnimation] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setStartAnimation(true), 50); // small delay to prevent FOUT
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <style jsx global>{`
//         @keyframes travioAppear {
//           0% {
//             opacity: 0;
//             transform: scale(0.5) translateY(-20px);
//           }
//           100% {
//             opacity: 1;
//             transform: scale(1) translateY(0);
//           }
//         }

//         .travio-char {
//           display: inline-block;
//           opacity: 0; /* prevents plain text flash */
//           font-weight: bold;
//           font-size: 2rem;
//           color: #1d4350;
//           visibility: hidden; /* fully hidden at mount */
//         }

//         .travio-start {
//           visibility: visible;
//           animation: travioAppear 0.6s ease-out forwards;
//           animation-delay: calc(var(--i) * 0.1s);
//         }
//       `}</style>

//       <div className="fixed inset-0 z-[999999] bg-white flex justify-center items-center">
//         {text.split("").map((char, i) => (
//           <span
//             key={i}
//             className={`travio-char ${startAnimation ? "travio-start" : ""}`}
//             style={{ ["--i" as any]: i }}
//           >
//             {char}
//           </span>
//         ))}
//       </div>
//     </>
//   );
// }










"use client";

import { useEffect, useState, CSSProperties } from "react";

export default function TravioLoader() {
  const text = "Travio.";
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), 50); // small delay to prevent FOUT
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes travioAppear {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .travio-char {
          display: inline-block;
          opacity: 0;
          font-weight: bold;
          font-size: 2rem;
          color: #1d4350;
          visibility: hidden;
        }

        .travio-start {
          visibility: visible;
          animation: travioAppear 0.6s ease-out forwards;
          animation-delay: calc(var(--i) * 0.1s);
        }
      `}</style>

      <div className="fixed inset-0 z-[999999] bg-white flex justify-center items-center">
        {text.split("").map((char, i) => {
          const style: CSSProperties = {
            "--i": i,
          } as unknown as CSSProperties;

          return (
            <span
              key={i}
              className={`travio-char ${startAnimation ? "travio-start" : ""}`}
              style={style}
            >
              {char}
            </span>
          );
        })}
      </div>
    </>
  );
}
