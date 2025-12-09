"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupProfilePage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [bio, setBio] = useState("");

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Japan",
    "China",
    "India",
    "Brazil",
    "Mexico",
    "South Korea",
    "Netherlands"
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Korean",
    "Hindi",
    "Arabic",
    "Russian",
    "Dutch",
    "Swedish",
    "Turkish"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const previewUrl = URL.createObjectURL(selectedFile);
      setAvatarPreview(previewUrl);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      fullName,
      gender,
      dob,
      country,
      language,
      bio,
      file,
    });
    router.push('/profilesetup/travelstyle');
  };

  return (
    <section className="w-full min-h-screen px-6 py-8 flex flex-col items-center pb-20">
      <div className="w-full max-w-3xl mt-14 mb-4">
        <button
          onClick={handleBackClick}
          className="flex items-center text-gray-700 gap-2 text-sm mb-4"
        >
          ← Back
        </button>
        <div className="w-full">
          <div className="w-full h-2 rounded-full overflow-hidden bg-blue-400">
            <div className="h-full rounded-full" style={{
                width: "60%",
                background: "linear-gradient(90deg, #1D4350 0%, #1D4350 80%, #3b97f3ff 100%)"}}></div>
          </div>
          <p className="text-gray-400 text-xs mt-2">Step 3 of 5</p>
        </div>
      </div>

      {/* Avatar */}
      <div className="mt-10 flex flex-col items-center">
          <div className="relative inline-block">
          <Image
            src={avatarPreview ? avatarPreview : "/avartar.png"}
            width={110}
            height={110}
            alt="Profile"
            className="rounded-full border-2 border-gray-300"
          />
            <label className="absolute bottom-1 right-1 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer shadow-lg bg-[#1D4350]">
              <Image src="/camera.png" width={18} height={18} alt="Upload" className="invert" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

        <h2 className="text-2xl mt-4">Setup Your Profile</h2>
        <p className="text-gray-500 text-sm">
          Tell us about yourself and your travel preferences
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-3xl space-y-6 overflow-visible">
        {/* Full Name */}
        <div>
          <label className="text-sm">Full Name</label>
          <input
            type="text"
            placeholder="Write  your full name"
            className="w-full border px-3 py-2 mt-1"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Gender + DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm">Gender</label>
            <select
              className="w-full border px-3 py-2 mt-1"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select an Option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Date of Birth</label>
          <div className="flex items-center border px-3 py-2 mt-1">

            <input
              type="date"
              className="flex-grow border-none focus:ring-0"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />


          </div>
          </div>
        </div>

        {/* Country + Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-visible z-10">
          <div>
            <label className="text-sm">Country</label>
            <select
              className="w-full border px-3 py-2 mt-1 z-20"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">select Country</option>
              {countries.map((countryName) => (
                <option key={countryName} value={countryName}>
                  {countryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm">Language</label>
            <select
              className="w-full border px-3 py-2 mt-1 z-20"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Select languages</option>
              {languages.map((languageName) => (
                <option key={languageName} value={languageName}>
                  {languageName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="text-sm">Bio</label>
          <textarea
            rows={4}
            placeholder="Write your bio...."
            className="w-full border px-3 py-2 mt-1"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-6 text-white text-base"
            style={{ backgroundColor: "#1D4350" }}
          >
            Continue
          </button>
        </div>
      </form>
    </section>
  );
}
