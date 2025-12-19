"use client";

import { ShieldCheck, Sparkles, Users } from "lucide-react";
import { whyChooseFeatures } from "../data";

interface WhyChooseSectionProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function WhyChooseSection({ isVisible, setIsVisible }: WhyChooseSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="w-10 h-10 text-white" />;
      case "Sparkles":
        return <Sparkles className="w-10 h-10 text-white" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-10 h-10 text-white" />;
      default:
        return <Users className="w-10 h-10 text-white" />;
    }
  };

  return (
    <section
      className="py-20 bg-white"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="text-center mb-12 px-6">
        <h2
          className="text-3xl md:text-3xl font-bold text-gray-900 inline-block relative cursor-default"
        >
          Why Choose Travio
          <span
            className={`absolute bottom-[-8px] left-1/2 h-[4px] transition-all duration-700 ease-out rounded-full ${
              isVisible ? "w-[150%]" : "w-0"
            }`}
            style={{
              backgroundImage: "linear-gradient(to right, #06b6d4, #1D4350)",
              transform: "translateX(-50%)",
            }}
          ></span>
        </h2>

        <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
          Experience travel like never before with features designed for
          modern explorers
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3 max-w-5xl mx-auto px-5">
        {whyChooseFeatures.map((feature, i) => (
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
                  {getIcon(feature.iconName)}
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
                {feature.description}
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
  );
}