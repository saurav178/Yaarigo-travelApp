"use client";
import DashboardHeader from "./DashboardHeader";

interface QuickAction {
  icon: string;
  color: string;
  title: string;
  desc: string;
}

interface Trip {
  id: string;
  title: string;
  image: string;
  gradient: string;
  status: {
    label: string;
    color: string;
    emoji: string;
  };
  dates: string;
  buttonText: string;
  buttonStyle: string;
}

export default function DashboardPage() {
  const quickActions: QuickAction[] = [
    {
      icon: "M12 4v16m8-8H4",
      color: "from-[#1DA69B] to-[#1D4350]",
      title: "Plan Trip",
      desc: "New adventure",
    },
    {
      icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
      color: "from-blue-500 to-blue-600",
      title: "Explore",
      desc: "Destinations",
    },
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      color: "from-purple-500 to-purple-600",
      title: "Community",
      desc: "Connect",
    },
    {
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
      color: "from-orange-500 to-orange-600",
      title: "Nearby",
      desc: "Find places",
    },
  ];

  const recentTrips: Trip[] = [
    {
      id: "1",
      title: "Paris Adventure",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", // Eiffel Tower at sunset
      gradient: "from-blue-400 via-purple-400 to-pink-400",
      status: {
        label: "Upcoming",
        color: "text-blue-600",
        emoji: "Rocket",
      },
      dates: "Dec 15 - Dec 22, 2024",
      buttonText: "View Details",
      buttonStyle:
        "bg-gradient-to-r from-[#1DA69B] to-[#1D4350] text-white hover:shadow-xl",
    },
    {
      id: "2",
      title: "Bali Getaway",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", // Stunning Bali beach temple
      gradient: "from-green-400 via-teal-400 to-blue-400",
      status: {
        label: "Completed",
        color: "text-green-600",
        emoji: "Checkmark",
      },
      dates: "Nov 10 - Nov 17, 2024",
      buttonText: "View Memories",
      buttonStyle: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
    {
      id: "3",
      title: "Tokyo Exploration",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80", // Tokyo skyline at night
      gradient: "from-purple-400 via-pink-400 to-red-400",
      status: {
        label: "Planning",
        color: "text-purple-600",
        emoji: "Pencil",
      },
      dates: "Jan 5 - Jan 12, 2025",
      buttonText: "Continue Planning",
      buttonStyle:
        "bg-gradient-to-r from-[#1DA69B] to-[#1D4350] text-white hover:shadow-xl",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Welcome Section with Mind-Blowing Animation */}
          <div className="relative mb-12 overflow-hidden bg-gradient-to-r from-[#1D4350] via-[#1DA69B] to-[#1D4350] p-8 md:p-12 shadow-2xl">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-blob"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Floating Travel Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 text-white/10 text-4xl animate-float">
                🌍
              </div>
              <div className="absolute top-20 right-20 text-white/10 text-3xl animate-float animation-delay-1000">
                🗺️
              </div>
              <div className="absolute bottom-20 left-20 text-white/10 text-3xl animate-float animation-delay-2000">
                🏖️
              </div>
              <div className="absolute bottom-10 right-32 text-white/10 text-4xl animate-float animation-delay-3000">
                ⛰️
              </div>
              <div className="absolute top-1/2 right-10 text-white/10 text-3xl animate-float animation-delay-4000">
                🎒
              </div>
            </div>

            {/* Flying Airplane Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute text-white/40 text-4xl animate-fly-plane transform-gpu">
                ✈️
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-6 md:mb-0">
                <div className="animate-fadeInUp">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3">
                    Welcome back,{" "}
                    <span className="inline-block animate-wave">👋</span>
                    <br />
                    <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent animate-gradient">
                      John!
                    </span>
                  </h1>
                </div>
                <p className="text-lg text-white/90 mb-6 animate-fadeInUp animation-delay-300">
                  Your next adventure awaits. Where will you go?
                </p>
                <button className="bg-white text-[#1D4350] px-8 py-3 font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg animate-fadeInUp animation-delay-600 hover:shadow-2xl">
                  <span className="flex items-center space-x-2">
                    <span>Plan New Adventure</span>
                    <svg
                      className="w-5 h-5 animate-bounce-slow"
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
                  </span>
                </button>
              </div>

              {/* Animated Travel Icon */}
              <div className="hidden md:block animate-fadeInUp animation-delay-900">
                <div className="relative">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse-slow">
                    <svg
                      className="w-20 h-20 text-white animate-spin-slow"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  {/* Orbiting dots */}
                  <div className="absolute top-0 left-0 w-full h-full animate-spin-very-slow">
                    <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full -ml-1.5 shadow-lg"></div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full animate-spin-very-slow animation-delay-2000">
                    <div className="absolute bottom-0 right-1/2 w-3 h-3 bg-yellow-300 rounded-full -mr-1.5 shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* CSS Animations */}
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

              @keyframes float {
                0%,
                100% {
                  transform: translateY(0) rotate(0deg);
                }
                50% {
                  transform: translateY(-20px) rotate(10deg);
                }
              }

              @keyframes wave {
                0%,
                100% {
                  transform: rotate(0deg);
                }
                10%,
                30% {
                  transform: rotate(14deg);
                }
                20% {
                  transform: rotate(-8deg);
                }
                40%,
                100% {
                  transform: rotate(0deg);
                }
              }

              @keyframes gradient {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }

              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes spin-slow {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }

              @keyframes spin-very-slow {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }

              @keyframes pulse-slow {
                0%,
                100% {
                  transform: scale(1);
                  opacity: 1;
                }
                50% {
                  transform: scale(1.05);
                  opacity: 0.9;
                }
              }

              @keyframes bounce-slow {
                0%,
                100% {
                  transform: translateX(0);
                }
                50% {
                  transform: translateX(5px);
                }
              }

              @keyframes fly-plane {
                0% {
                  left: -10%;
                  top: -5%;
                  transform: rotate(25deg) scale(0.8);
                  opacity: 0;
                }
                5% {
                  opacity: 1;
                }
                15% {
                  transform: rotate(28deg) scale(0.9);
                }
                30% {
                  transform: rotate(25deg) scale(1);
                }
                50% {
                  transform: rotate(27deg) scale(1.05);
                }
                70% {
                  transform: rotate(26deg) scale(1);
                }
                85% {
                  transform: rotate(28deg) scale(0.95);
                }
                95% {
                  opacity: 1;
                }
                100% {
                  left: 110%;
                  top: 105%;
                  transform: rotate(25deg) scale(0.8);
                  opacity: 0;
                }
              }

              .animate-blob {
                animation: blob 7s infinite;
              }

              .animate-float {
                animation: float 6s ease-in-out infinite;
              }

              .animate-wave {
                animation: wave 2s ease-in-out infinite;
                transform-origin: 70% 70%;
                display: inline-block;
              }

              .animate-gradient {
                background-size: 200% 200%;
                animation: gradient 3s ease infinite;
              }

              .animate-fadeInUp {
                animation: fadeInUp 0.8s ease-out forwards;
              }

              .animate-spin-slow {
                animation: spin-slow 20s linear infinite;
              }

              .animate-spin-very-slow {
                animation: spin-very-slow 15s linear infinite;
              }

              .animate-pulse-slow {
                animation: pulse-slow 3s ease-in-out infinite;
              }

              .animate-bounce-slow {
                animation: bounce-slow 1.5s ease-in-out infinite;
              }

              .animate-fly-plane {
                animation: fly-plane 12s ease-in-out infinite;
              }

              .animation-delay-300 {
                animation-delay: 0.3s;
              }

              .animation-delay-600 {
                animation-delay: 0.6s;
              }

              .animation-delay-900 {
                animation-delay: 0.9s;
              }

              .animation-delay-1000 {
                animation-delay: 1s;
              }

              .animation-delay-2000 {
                animation-delay: 2s;
              }

              .animation-delay-3000 {
                animation-delay: 3s;
              }

              .animation-delay-4000 {
                animation-delay: 4s;
              }
            `}</style>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Total Trips */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Total Trips
                    </p>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                      12
                    </h3>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    +2 this month
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Upcoming
                    </p>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
                      3
                    </h3>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Next in 5 days
                  </span>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Completed
                    </p>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                      9
                    </h3>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                    Last 2 weeks ago
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions with Modern Cards */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action: QuickAction, idx: number) => (
                <button
                  key={idx}
                  className="group relative overflow-hidden bg-white p-4 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
                >
                  <div
                    className={`w-14 h-12 bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={action.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500">{action.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Trips with Enhanced Design */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Recent Trips</h2>
              <button className="flex items-center space-x-2 text-[#1DA69B] hover:text-[#1D4350] font-semibold transition-all group">
                <span>View All</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3"
                >
                  {/* Trip Image with Hover Zoom */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/95 backdrop-blur-sm shadow-xl ${trip.status.color}`}
                      >
                        {trip.status.emoji} {trip.status.label}
                      </span>
                    </div>

                    {/* Trip Title on Image */}
                    <div className="absolute bottom-5 left-6 text-white">
                      <h3 className="text-2xl font-bold drop-shadow-lg">
                        {trip.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Bottom */}
                  <div className="p-6 bg-white">
                    <div className="flex items-center text-gray-600 mb-5">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium">{trip.dates}</span>
                    </div>

                    <button
                      className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all transform group-hover:scale-105 shadow-lg ${trip.buttonStyle}`}
                    >
                      {trip.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
