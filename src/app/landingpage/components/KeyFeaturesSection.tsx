"use client";

import Image from "next/image";
import { keyFeatures, featureImages } from "../data";

interface KeyFeaturesSectionProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function KeyFeaturesSection({
  isVisible,
  setIsVisible,
}: KeyFeaturesSectionProps) {
  return (
    <section
      className="py-12 bg-white"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="relative inline-block text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          Key Features
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

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left side - Features */}
          <div className="flex flex-col gap-6 text-left">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Image grid */}
          <div className="grid grid-cols-2 w-[90%] md:w-[80%] lg:w-[80%] mx-auto h-auto gap-2 bg-white">
            {featureImages.map((img, i) => {
              let cornerClass = "";
              if (i === 0) cornerClass = "rounded-tr-[30px] rounded-bl-[30px]";
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
  );
}