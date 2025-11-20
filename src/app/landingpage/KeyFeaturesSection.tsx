"use client";

import Image from "next/image";
import { useState } from "react";

interface KeyFeaturesSectionProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function KeyFeaturesSection({ isVisible, setIsVisible }: KeyFeaturesSectionProps) {
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
            {/* Feature 1 */}
            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/tripplanner2.png"
                  alt="AI Trip Planner Icon"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  AI Trip Planner
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Personalized itineraries based on your preferences, time,
                  and budget — crafted intelligently for every journey.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/travelmatching2.png"
                  alt="Travel Matching Icon"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Travel Matching
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Find travel companions who share your vibe and explore
                  destinations together.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/safety2.png"
                  alt="Safety Icon"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Safety & Trust
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Verified users, in-app check-ins, and trusted community
                  ratings for peace of mind.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/social2.png"
                  alt="Social Discovery Icon"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
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
  );
}