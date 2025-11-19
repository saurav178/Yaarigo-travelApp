import React from "react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <div
      className="w-full md:w-96 md:self-start bg-white shadow-lg  p-4"
      style={{ boxShadow: "4px 0 8px rgba(0,0,0,0.1)" }}
    >
      <h3 className="text-lg mb-1 bg-gray-200 px-2 py-1 w-full">About</h3>
      <p className="text-gray-600 text-sm">
        Wildlife photographer and nature lover. Eco-conscious traveler.
      </p>

      <h4 className="mt-4 mb-4">Experience</h4>
      <p className="text-gray-600 text-sm">5 years as a professional trip leader</p>

      <h4 className="mt-4 mb-4 flex items-center gap-2">
        <svg
          width={20}
          height={20}
          viewBox="0 0 512 512"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M349.565 98.783C295.978 98.783 251.721 64 184.348 64c-24.955 0-47.309 4.384-68.045 12.013a55.947 55.947 0 0 0 3.586-23.562C118.117 24.015 94.806 1.206 66.338.048 34.345-1.254 8 24.296 8 56c0 19.026 9.497 35.825 24 45.945V488c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-94.4c28.311-12.064 63.582-22.122 114.435-22.122 53.588 0 97.844 34.783 165.217 34.783 48.169 0 86.667-16.294 122.505-40.858C506.84 359.452 512 349.571 512 339.045v-243.1c0-23.393-24.269-38.87-45.485-29.016-34.338 15.948-76.454 31.854-116.95 31.854z"></path>
        </svg>
        Trips Completed
      </h4>
      <p className="text-gray-600 text-sm">25 successful trips</p>

      <h4 className="mt-4 mb-4 flex items-center gap-2">
        <Image
          src="/premium-badge.png"
          alt="Premium Badge"
          width={20}
          height={20}
        />
        Badges
      </h4>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-gray-200 text-black rounded-full text-xs font-medium flex items-center gap-1">
          <Image
            src="/star-icon.png"
            alt="Badge"
            width={12}
            height={12}
          />
          Expert Guide
        </span>
        <span className="px-3 py-1 bg-gray-200 text-black rounded-full text-xs font-medium flex items-center gap-1">
          <Image
            src="/star-icon.png"
            alt="Badge"
            width={12}
            height={12}
          />
          Safety Certified
        </span>
        <span className="px-3 py-1 bg-gray-200 text-black rounded-full text-xs font-medium flex items-center gap-1">
          <Image
            src="/star-icon.png"
            alt="Badge"
            width={12}
            height={12}
          />
          Top Rated
        </span>
      </div>

      <h4 className=" mt-4 mb-4 flex items-center gap-2">
        <Image
          src="/language.png"
          alt="Languages"
          width={20}
          height={20}
          className="[filter:brightness(0)]"
        />
        Languages
      </h4>
      <div className="flex flex-wrap gap-2 ">
        {["English", "Spanish", "Ukrainian"].map((lang) => (
          <span
            key={lang}
            className="px-3 py-1 border border-gray-300 rounded-full text-gray-700 text-sm"
          >
            {lang}
          </span>
        ))}
      </div>

      <h4 className=" mt-6 mb-4"> Travel Style</h4>
      <div className="flex flex-wrap gap-2">
        {["Adventure", "Cultural", "Budget-friendly"].map((style) => (
          <span
            key={style}
            className="px-3 py-1 border border-gray-300 rounded-full text-gray-700 text-sm"
          >
            {style}
          </span>
        ))}
      </div>

      <h4 className=" mt-6 mb-4"> Interests</h4>
      <div className="flex flex-wrap gap-2">
        {["Hiking", "Photography", "Local cuisine"].map((interest) => (
          <span
            key={interest}
            className="px-3 py-1 border border-gray-300 rounded-full text-gray-700 text-sm"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}
