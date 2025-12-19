"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { howItWorksSteps } from "../data";

interface HowItWorksSectionProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function HowItWorksSection({ isVisible, setIsVisible }: HowItWorksSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [imageSrc, setImageSrc] = useState<string>(howItWorksSteps[0].image);
  const titleRef = useRef(null);

  return (
    <section
      className="py-20 bg-indigo-50"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <h2
            ref={titleRef}
            className="text-3xl md:text-3xl font-bold text-gray-900 inline-block relative cursor-default"
          >
            How it works
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

          <p className="text-gray-500 max-w-2xl mx-auto mt-6">
            Experience travel like never before with features designed for
            modern explorers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start relative">
          {/* Left Image */}
          <div className="flex justify-center -mt-5">
            <div className="relative overflow-hidden rounded-tl-[100px] rounded-br-[100px] shadow-md w-[350px] h-[400px]">
              <Image
                src={imageSrc}
                alt="How it works"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>

          {/* Right Steps with Progress Bar */}
          <div className="relative mt-6 md:mt-12">
            <div className="absolute left-4 top-0 h-full w-1 bg-gray-300 rounded-full" />

            <div
              className="absolute left-3.5 w-2 h-18 bg-gradient-to-tr from-[#0073B9] to-[#1B3F72] rounded-full transition-all duration-500"
              style={{
                top: `${(activeStep - 1) * (100 / (howItWorksSteps.length - 1))}%`,
                transform: "translateY(-50%)",
              }}
            />

            <div className="flex flex-col gap-8 ml-10 relative">
              {howItWorksSteps.map(({ step, title, image }) => (
                <button
                  key={step}
                  onClick={() => {
                    setActiveStep(step);
                    setImageSrc(image);
                  }}
                  className="flex items-start gap-4 text-left group"
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      activeStep >= step
                        ? "bg-gradient-to-tr from-[#2a92d3] to-[#2a92d3] text-white border-none"
                        : "border-gray-400 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>

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
  );
}