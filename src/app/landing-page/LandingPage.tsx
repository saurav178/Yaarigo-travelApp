"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Sparkles, Users } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

type Step = {
  step: number;
  title: string;
  image: string;
};

import { ROUTES } from "@/src/routes";

export default function LandingPage() {
  const features = [
    {
      image: "/images/container1.png",
      title: "Verified Profiles",
      bgColor: "bg-blue-100",
    },
    {
      image: "/images/container2.png",
      title: "Safety Check-ins",
      bgColor: "bg-orange-100",
    },
    {
      image: "/images/container3.png",
      title: "AI-Based Compatibility & Moderation",
      bgColor: "bg-pink-100",
    },
    {
      image: "/images/container4.png",
      title: 'Emergency Assistance or "Travel Buddy" Mode',
      bgColor: "bg-green-100",
    },
  ];

  const steps: Step[] = [
    { step: 1, title: "Plan smarter with AI", image: "/images/how1.jpg" },
    {
      step: 2,
      title: "Meet verified, like-minded travelers",
      image: "/images/how2.jpg",
    },
    {
      step: 3,
      title: "Stay safe with built-in protection",
      image: "/images/how3.jpg",
    },
    {
      step: 4,
      title: "Earn rewards and discover authentic experiences",
      image: "/images/how4.jpg",
    },
  ];

  const [activeStep, setActiveStep] = useState<number>(1);
  const [imageSrc, setImageSrc] = useState<string>(steps[0].image);
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleGoToTrip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!location || !date) {
      alert("Please select both location and date!");
      return;
    }

    // Encode query params to prevent URL issues
    const query = new URLSearchParams({ location, date }).toString();
    router.push(`/searchtrip?${query}`);
  };

  return (
    <main className="flex flex-col">
      {/* ================= Hero Section ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/travell-people.jpg"
            alt="Hero background"
            className="w-full h-full object-cover object-center"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/80 via-cyan-800/50 to-cyan-600/20"></div> */}
        </div>

        {/* Hero Content */}
        <div className="relative container max-w-4xl px-4 z-10 text-center">
          <div className="py-28 sm:py-32">
            <p className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-1 text-xs mb-6 mx-auto text-white border border-white/20">
              <span className="text-xs">★</span> Join 50,000+ Travel Enthusiasts
            </p>

            <h1 className="text-white/95 font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight drop-shadow-2xl">
              Meet
              <span className="mx-2 inline-block w-3 h-3 bg-white/90 rounded-full shadow-lg"></span>
              Match
              <span className="mx-2 inline-block w-3 h-3 bg-white/90 rounded-full shadow-lg"></span>
              Travel
              <span className="mx-2 inline-block w-3 h-3 bg-white/90 rounded-full shadow-lg"></span>
            </h1>

            <p className="mt-4 text-white/85 text-lg drop-shadow-2xl max-w-2xl mx-auto font-medium">
              Connect with like-minded travelers, personalize your <br />
              journey, and explore the world safely with AI-powered matches.
            </p>

            {/* Search card */}
            <div className="mt-10 flex justify-center">
              <div className="bg-white/75 backdrop-blur-md rounded-lg p-3 shadow-2xl flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Location Input */}
                <div className="flex-1 min-w-[200px]">
                  <label htmlFor="location" className="sr-only">
                    Location
                  </label>
                  <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-[#008ECF] transition-colors">
                    <svg
                      className="w-5 h-5 mr-2 text-[#1D4350]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <input
                      id="location"
                      name="location"
                      placeholder="Simla"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-transparent outline-none placeholder-gray-400 text-gray-700 w-full font-medium"
                    />
                  </div>
                </div>

                {/* Date Input */}
                <div className="sm:w-44 relative">
                  <label htmlFor="date" className="sr-only">
                    Date
                  </label>
                  <div className="relative">
                    <svg
                      className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1D4350] pointer-events-none"
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

                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-lg pl-10 pr-3 py-2.5 bg-white/45 outline-none text-gray-700 text-sm
      placeholder-gray-400 font-medium focus:border-[#008ECF] transition-colors
      cursor-pointer
      [&::-webkit-calendar-picker-indicator]:opacity-0
      [&::-webkit-calendar-picker-indicator]:absolute
      [&::-webkit-calendar-picker-indicator]:right-3
      [&::-webkit-calendar-picker-indicator]:w-full
      [&::-webkit-calendar-picker-indicator]:h-full"
                      placeholder="mm/dd/yyyy"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleGoToTrip}
                  className="bg-[#1D4350] hover:bg-[#006DA3] text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Find Trips →
                </button>
              </div>
            </div>

            {/* Stats Line Below */}
            <p className="mt-6 text-white/85 text-sm drop-shadow-2xl max-w-2xl mx-auto font-medium">
              100k+ Verified Travelers ★ 98% Safety Rating ★ AI-Powered Matching
            </p>
          </div>
        </div>
      </section>

      {/* ================= Key Features Section ================= */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left side - Features */}
            <div className="flex flex-col gap-4">
              {/* Feature 1 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 -mt-6">
                  <Image
                    src="/images/tripplanner2.png"
                    alt="AI Trip Planner Icon"
                    width={70}
                    height={70}
                    className="object-contain red-icon"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    AI Trip Planner
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Personalized itineraries based on your preferences, time,
                    and budget — crafted intelligently for every journey.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 -mt-6">
                  <Image
                    src="/images/travelmatching2.png"
                    alt="Travel Matching Icon"
                    width={70}
                    height={70}
                    className="object-contain text-red-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Travel Matching
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Find travel companions who share your vibe and explore
                    destinations together.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 -mt-6">
                  <Image
                    src="/images/safety2.png"
                    alt="Safety Icon"
                    width={70}
                    height={70}
                    className="object-contain text-red-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Safety & Trust
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Verified users, in-app check-ins, and trusted community
                    ratings for peace of mind.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 -mt-6">
                  <Image
                    src="/images/social2.png"
                    alt="Social Discovery Icon"
                    width={70}
                    height={70}
                    className="object-contain text-red-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Social Discovery
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Share your travel stories, join groups, and connect with
                    explorers around the globe.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Image grid */}
            <div className="grid grid-cols-2 w-[90%] md:w-[80%] lg:w-[80%] mx-auto h-auto gap-2 bg-white">
              {[
                { src: "/images/img1.jpg", alt: "Trip 1" },
                { src: "/images/img2.jpg", alt: "Trip 2" },
                { src: "/images/img3.jpg", alt: "Trip 3" },
                { src: "/images/img4.jpg", alt: "Trip 4" },
              ].map((img, i) => {
                let cornerClass = "";
                if (i === 0)
                  cornerClass = "rounded-tr-[30px] rounded-bl-[30px]";
                else if (i === 1)
                  cornerClass = "rounded-tl-[30px] rounded-br-[30px]";
                else if (i === 2)
                  cornerClass = "rounded-tl-[30px] rounded-br-[30px]";
                else if (i === 3)
                  cornerClass = "rounded-tr-[30px] rounded-bl-[30px]";

                return (
                  <div
                    key={i}
                    className={`overflow-hidden shadow-md ${cornerClass} w-full h-full`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300 ease-out"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= Why Choose Travio Section ================= */}
      {/* <section className="py-20 bg-white text-center">
        <h2 className="text-3xl md:text-3xl font-bold text-gray-900">
          Why Choose Travio?
        </h2>
        <p className="text-gray-500 mt-3">
          Experience travel like never before with features designed for modern
          explorers
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-6">
          {[
            {
              iconBg: "bg-blue-400",
              title: "Connect Authentically",
              desc: "Meet verified travelers who share your interests, travel style, and destinations. Build meaningful connections before you go.",
              icon: <Users className="w-6 h-6 text-white" />,
            },
            {
              iconBg: "bg-blue-400",
              title: "AI-Powered Matching",
              desc: "Our smart algorithm matches you with compatible travel companions based on your preferences, personality, and travel goals.",
              icon: <Sparkles className="w-6 h-6 text-white" />,
            },
            {
              iconBg: "bg-blue-400",
              title: "Travel Safely",
              desc: "Verified profiles, secure messaging, and safety features ensure you can focus on the adventure, not the worries.",
              icon: <ShieldCheck className="w-6 h-6 text-white" />,
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-md transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              <div
                className={`inline-flex items-center justify-center p-4 rounded-2xl shadow-md ${feature.iconBg}`}
              >
                {feature.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section> */}

      <section className="py-20 bg-white">
        <div className="text-center mb-12 px-6">
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
            Why Choose Travio?
          </h2>
          <p className="text-gray-600 text-lg mt-3 max-w-2xl mx-auto">
            Experience travel like never before with features designed for
            modern explorers
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3 max-w-5xl mx-auto px-5">
          {[
            {
              gradient: "from-blue-500 to-cyan-500",
              bgGradient: "from-blue-50 to-cyan-50",
              title: "Connect Authentically",
              desc: "Meet verified travelers who share your interests, travel style, and destinations. Build meaningful connections before you go.",
              icon: <Users className="w-10 h-10 text-white" />,
            },
            {
              gradient: "from-purple-500 to-pink-500",
              bgGradient: "from-purple-50 to-pink-50",
              title: "AI-Powered Matching",
              desc: "Our smart algorithm matches you with compatible travel companions based on your preferences, personality, and travel goals.",
              icon: <Sparkles className="w-10 h-10 text-white" />,
            },
            {
              gradient: "from-emerald-500 to-teal-500",
              bgGradient: "from-emerald-50 to-teal-50",
              title: "Travel Safely",
              desc: "Verified profiles, secure messaging, and safety features ensure you can focus on the adventure, not the worries.",
              icon: <ShieldCheck className="w-10 h-10 text-white" />,
            },
          ].map((feature, i) => (
            <div key={i} className="group relative">
              {/* Animated background blob */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100`}
              ></div>

              {/* Card */}
              <div className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100">
                {/* Icon container with gradient */}
                <div className="relative mb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  {/* Decorative dots */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>

                {/* Hover indicator */}
                <div className="mt-6 flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                  <span className="text-sm">Learn more</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {/* Decorative corner accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-bl-full rounded-tr-3xl`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================How it Works================================== */}

      <section className="py-20 bg-indigo-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Centered Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-1">
              How it works
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Experience travel like never before with features designed for
              modern explorers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start relative">
            {/* Left Image */}
            <div className="flex justify-center">
              <Image
                src={imageSrc}
                alt="How it works"
                width={350}
                height={350}
                className="object-cover shadow-md transition-all duration-500 
             rounded-tl-[100px] rounded-br-[100px] rounded-tr-none rounded-bl-none"
              />
            </div>

            {/* Right Steps with Progress Bar */}
            <div className="relative mt-6 md:mt-12">
              {/* Vertical line (progress track) */}
              <div className="absolute left-4 top-0 h-full w-1 bg-gray-300 rounded-full" />

              {/* Filled progress */}
              <div
                className="absolute left-3.5 w-2 h-18 bg-gradient-to-tr from-[#0073B9] to-[#1B3F72] rounded-full transition-all duration-500"
                style={{
                  top: `${(activeStep - 1) * (100 / (steps.length - 1))}%`,
                  transform: "translateY(-50%)",
                }}
              />

              {/* Steps */}
              <div className="flex flex-col gap-8 ml-10 relative">
                {steps.map(({ step, title, image }) => (
                  <button
                    key={step}
                    onClick={() => {
                      setActiveStep(step);
                      setImageSrc(image);
                    }}
                    className="flex items-start gap-4 text-left group"
                  >
                    {/* Step Number Circle */}
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        activeStep >= step
                          ? "bg-gradient-to-tr from-[#2a92d3] to-[#2a92d3] text-white border-none"
                          : "border-gray-400 text-gray-600"
                      }`}
                    >
                      {step}
                    </div>

                    {/* Step Content */}
                    <div>
                      <h3
                        className={`text-lg font-semibold ${
                          activeStep === step
                            ? "text-[#0073B9]"
                            : "text-gray-800 group-hover:text-[#08254d]"
                        }`}
                      >
                        Step {step}
                      </h3>
                      <p className="text-gray-600">{title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Safety & Trust Section ================= */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900">
            Safety & Trust
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Experience travel like never before with features designed for
            modern explorers.
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: Icon Grid */}
          <div className="grid grid-cols-2 gap-10 flex-1">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3"
              >
                <div
                  className={`flex items-center justify-center w-20 h-20 rounded-full ${feature.bgColor} shadow-sm`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-700 text-sm md:text-base font-medium leading-tight">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Main image */}
          <div className="flex-1 flex justify-center">
            <img
              src="/images/safety-trust1.png"
              alt="Safety and Trust"
              className="w-[360px] h-[400px] object-cover shadow-md rounded-tl-[100px] rounded-br-[100px]"
            />
          </div>
        </div>
      </section>

      {/* ================= Join Our Global Community Section ================= */}

       <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4 md:px-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
            Join Our Global Community
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Hear from travelers who've found their perfect travel companions
          </p>
        </div>

        {/* Testimonials Grid - Reduced gap from gap-6 to gap-3 */}
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
              gradient: "from-purple-500 to-pink-500",
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
              gradient: "from-orange-500 to-red-500",
            },
          ].map((review, i) => (
            <div key={i} className="group relative overflow-hidden">
              {/* Card with gradient border effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${review.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
              ></div>

              {/* Reduced padding from p-8 to p-5 */}
              <div className="relative bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 m-0.5">
                {/* Gradient top bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${review.gradient} rounded-t-3xl`}
                ></div>

                {/* User Info at Top - Reduced gap and margin */}
                <div className="flex items-center gap-3 mb-3 pt-2">
                  {/* Reduced avatar from w-14 h-14 to w-12 h-12 */}
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
                      .fill()
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

                {/* Large Quote Icon - Reduced size and margin */}
                <svg
                  className={`w-4 h-4 mb-2 opacity-20 bg-gradient-to-r ${review.gradient} bg-clip-text`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Review Text - Reduced line height */}
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
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl shadow-xl p-6 md:p-12 -mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              {[
                {
                  value: "50K+",
                  label: "Active Travelers",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  value: "150+",
                  label: "Countries",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  value: "100K+",
                  label: "Trips Planned",
                  gradient: "from-emerald-500 to-teal-500",
                },
                {
                  value: "4.9/5",
                  label: "Average Rating",
                  gradient: "from-orange-500 to-red-500",
                },
              ].map((stat, i) => (
                <div key={i} className="text-center group cursor-default">
                  <h3
                    className={`text-2xl md:text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent transform transition-transform duration-300 group-hover:scale-110`}
                  >
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-2 font-medium">
                    {stat.label}
                  </p>
                  {/* Animated underline */}
                  <div
                    className={`h-1 w-0 group-hover:w-full mx-auto mt-2 bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-500`}
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

      {/* ================= Footer Section ================= */}
      <footer className="bg-[#1D4350] text-white py-6">
        {/* Newsletter Section */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-3">
              <Image
                src="/images/mail.png"
                alt="Mail Icon"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Stay Connected</h2>
            <p className="text-sm mb-5">
              Get travel tips, match suggestions, and exclusive offers delivered
              to your inbox
            </p>
            <div className="flex justify-center items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-xl bg-white text-gray-800 w-64 outline-none placeholder:text-gray-600"
              />
              <button className="bg-white text-[#f36b6b] font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          {/* Logo and Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              {/* 🔴 Red circular background with icon */}
              <div className="bg-[#1D4350] rounded-full p-2 w-10 h-10 flex items-center justify-center border border-white/30">
                <Image
                  src="/images/aeroplane.png"
                  alt="Travio Icon"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>
              Travio.
            </h3>
            <p className="text-white/80 mb-4">
              Connecting travelers worldwide for unforgettable journeys and
              meaningful friendships.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-white/20 p-2 rounded-full hover:ring-2 hover:ring-white hover:scale-110 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-white/20 p-2 rounded-full hover:ring-2 hover:ring-white hover:scale-110 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="bg-white/20 p-2 rounded-full hover:ring-2 hover:ring-white hover:scale-110 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-white/20 p-2 rounded-full hover:ring-2 hover:ring-white hover:scale-110 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">How It Works</a>
              </li>
              <li>
                <a href="#">AI Tools</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Safety</a>
              </li>
              <li>
                <a href="#">Community Guidelines</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Cookie Policy</a>
              </li>
              <li>
                <a href="#">Licenses</a>
              </li>
            </ul>
          </div>
        </div>

        {/* <hr className="border-white/30 mt-6" /> */}
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-white/60 to-transparent my-6" />

        {/* Bottom Line */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70 mt-6 px-6">
          <p>© 2025 Travio. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
