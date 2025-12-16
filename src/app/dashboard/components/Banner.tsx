export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1DA69B] via-[#1D7A6E] to-[#1D4350] text-white shadow-2xl mb-8">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1DA69B] to-[#1D4350]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 px-6 py-16 md:px-8 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 drop-shadow-lg leading-tight">
              Welcome back, <span className="text-white">John!</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed">
              Your next adventure awaits. Where will you go?
            </p>
            <button className="group relative px-6 py-3 bg-white text-[#1DA69B] font-semibold text-sm shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <span className="relative z-10">Plan New Adventure</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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

      {/* Animated Travel Icon */}
      {/* <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
          <div
            className="absolute inset-0 bg-white/30 rounded-full"
            style={{ animation: "pulse-ring 2s ease-out infinite" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl">🧳</span>
          </div> */}

          {/* Orbiting dots */}
          
          {/* <div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
            style={{ animation: "orbit 3s linear infinite" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
            style={{
              animation: "orbit 3s linear infinite",
              animationDelay: "1s",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
            style={{
              animation: "orbit 3s linear infinite",
              animationDelay: "2s",
            }}
          />
        </div>
      </div> */}

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