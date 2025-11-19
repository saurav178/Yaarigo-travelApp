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

      <h4 className=" mt-2 mb-4 flex items-center gap-1">
        <Image
          src="/language.png"
          alt="Languages"
          width={16}
          height={16}
          className="[filter:brightness(0)]"
        />{" "}
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

      <h4 className=" mt-6 mb-1"> Travel Style</h4>
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

      <h4 className=" mt-6 mb-1"> Interests</h4>
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
