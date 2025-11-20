"use client";

interface CommunitySectionProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function CommunitySection({
  isVisible,
  setIsVisible,
}: CommunitySectionProps) {
  return (
    <section
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4 md:px-12 relative overflow-hidden"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="relative inline-block text-3xl md:text-3xl font-bold text-gray-900 mb-4">
            Join Our Global Community
            <span
              className={`absolute left-1/2 bottom-[-8px] h-[4px] rounded-full transition-all duration-700 ease-out ${
                isVisible ? "w-[150%]" : "w-0"
              }`}
              style={{
                transform: "translateX(-50%)",
                backgroundImage: "linear-gradient(to right, #06b6d4, #1D4350)",
              }}
            ></span>
          </h2>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Hear from travelers who've found their perfect travel companions
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-3 max-w-6xl mx-auto mb-10">
          {[
            {
              name: "Sarah Chen",
              location: "Tokyo, Japan",
              text: "I found the perfect travel buddy for my Southeast Asia trip! We had similar interests and it made the journey unforgettable.",
              initials: "SC",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              name: "Marcus Rodriguez",
              location: "Barcelona, Spain",
              text: "The AI matching is incredible. Every person I connected with was genuinely compatible with my travel style.",
              initials: "MR",
              gradient: "from-emerald-500 to-teal-500",
            },
            {
              name: "Emma Wilson",
              location: "New York, USA",
              text: "Safety features gave me peace of mind. I felt secure meeting new people and exploring together.",
              initials: "EW",
              gradient: "from-emerald-500 to-teal-500",
            },
            {
              name: "Raj Patel",
              location: "Mumbai, India",
              text: "Made lifelong friends through Travio. Now we're planning our third trip together awesome!",
              initials: "RP",
              gradient: "from-blue-500 to-cyan-500",
            },
          ].map((review, i) => (
            <div key={i} className="group relative overflow-hidden">
              {/* Card with gradient border effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom right, cyan, #1D4350)",
                }}
              ></div>

              <div className="relative bg-white p-5 shadow-lg hover:shadow-2xl transition-all duration-500 m-0.5">
                {/* Gradient top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
                  style={{ backgroundColor: "#1D4350" }}
                ></div>

                {/* User Info at Top */}
                <div className="flex items-center gap-3 mb-3 pt-2">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.gradient} text-white flex items-center justify-center font-bold text-sm shadow-lg transform transition-all duration-300 group-hover:scale-110`}
                  >
                    {review.initials}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">
                      {review.name}
                    </h4>
                    <p className="text-gray-500 text-xs flex items-center gap-1.5 mt-0.5">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {review.location}
                    </p>
                  </div>

                  {/* Stars in header */}
                  <div className="flex gap-0.5">
                    {Array(5)
                      .fill(null) //changes
                      .map((_, idx) => (
                        <svg
                          key={idx}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="w-3.5 h-3.5 text-yellow-400"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.4 4.304h4.523c.969 0 1.371 1.24.588 1.81l-3.66 2.661 1.4 4.304c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.662 2.777c-.784.57-1.838-.197-1.539-1.118l1.4-4.304-3.66-2.661c-.784-.57-.381-1.81.588-1.81h4.523l1.4-4.304z" />
                        </svg>
                      ))}
                  </div>
                </div>

                {/* Large Quote Icon */}
                <svg
                  className={`w-4 h-4 mb-2 opacity-20 bg-gradient-to-r ${review.gradient} bg-clip-text`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "{review.text}"
                </p>

                {/* Decorative bottom accent */}
                <div
                  className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${review.gradient} opacity-5 rounded-tl-full`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="shadow-xl p-4 md:p-6 -mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              {[
                {
                  value: "50K+",
                  label: "Active Travelers",
                },
                {
                  value: "150+",
                  label: "Countries",
                },
                {
                  value: "100K+",
                  label: "Trips Planned",
                },
                {
                  value: "4.9/5",
                  label: "User Rating",
                },
              ].map((stat, i) => (
                <div key={i} className="text-center group cursor-default">
                  <h3
                    className="text-2xl md:text-2xl font-bold transform transition-transform duration-300 group-hover:scale-110"
                    style={{ color: "#1D4350" }}
                  >
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-2 font-medium">
                    {stat.label}
                  </p>
                  {/* Animated underline - THIS WAS MISSING */}
                  <div
                    className="h-1 w-0 group-hover:w-full mx-auto mt-2 rounded-full transition-all duration-500"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, cyan, #1D4350)",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
