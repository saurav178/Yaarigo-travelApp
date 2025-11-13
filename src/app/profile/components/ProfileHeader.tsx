"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaCheckCircle, FaCheck } from "react-icons/fa";

interface ProfileHeaderProps {
  isFollowing: boolean;
  followersCount: number;
  onFollowToggle: () => void;
  onChatOpen: () => void;
}

export default function ProfileHeader({
  isFollowing,
  followersCount,
  onFollowToggle,
  onChatOpen,
}: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative mx-6">
      {/* Cover Image Section */}
      <div className="w-full h-64 overflow-hidden relative">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Cover"
          fill
          className="object-cover"
        />
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-white bg-black/40 px-3 py-1 rounded-md hover:bg-black/60 transition z-10"
        >
          ← Back
        </button>
      </div>

      {/* Profile Section */}
      <div
        className="relative bg-white shadow-lg p-8 w-full mx-auto mt-0 flex flex-col md:flex-row gap-6 items-center"
        style={{ marginTop: "-2rem" }}
      >
        {/* Avatar - positioned floating over cover image half */}
        <div className="absolute left-16 -top-26 w-75 h-70 overflow-hidden shadow-md z-20">
          <Image
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        {/* Info */}
        <div className="flex-1 mt-0 text-center ml-0">
          <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
            Jane Cooper
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              <Image
                src="/ic_baseline-check-circle-outline.png"
                alt="Verified"
                width={16}
                height={16}
              />{" "}
              Verified Traveler
            </span>
          </h2>
          <p className="text-gray-600 flex items-center ml-98 gap-1 mt-1">
            <FaMapMarkerAlt className="text-black" /> Kiev, Ukraine
          </p>
          <div className="text-sm text-gray-500 mt-2">
            <Image
              src="/star-icon.png"
              alt="Star"
              width={16}
              height={16}
              className="inline mr-1"
              style={{
                filter:
                  "invert(0%) sepia(100%) saturate(10000%) hue-rotate(45deg) brightness(500%) contrast(100%)",
              }}
            />{" "}
            4.1 (410 reviews){" "}
            <div className="relative inline-block mr-1">
              <Image
                src="/shield.png"
                alt="Safety"
                width={16}
                height={16}
                className="inline filter grayscale"
              />
              <FaCheck
                className="absolute inset-0 m-auto text-white"
                size={10}
              />
            </div>{" "}
            <span className="font-medium">88%</span> Safe Traveler
          </div>

          {/* Stats - adjusted spacing and alignment */}
          <div className="flex justify-center gap-4 mt-6 ml-30 text-center">
            <div className="bg-gray-200 py-3 px-6 shadow-sm">
              <p className="text-lg font-semibold">{followersCount}</p>
              <p className="text-gray-500 text-sm">Followers</p>
            </div>
            <div className="bg-gray-200 py-3 px-6 shadow-sm">
              <p className="text-lg font-semibold">567</p>
              <p className="text-gray-500 text-sm">Following</p>
            </div>
            <div className="bg-gray-200 py-3 px-6 shadow-sm">
              <p className="text-lg font-semibold">15</p>
              <p className="text-gray-500 text-sm">Trips Completed</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mr-4">
          <button
            onClick={onFollowToggle}
            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-md hover:scale-105 transition-all duration-200 ${
              isFollowing
                ? "bg-[#1D4350] text-white hover:bg-[#0f2a35]"
                : "bg-[#1D4350] text-white hover:bg-[#0f2a35]"
            }`}
          >
            {!isFollowing && (
              <Image
                src="/join-trip.png"
                alt="Follow"
                width={20}
                height={20}
                className="filter invert"
              />
            )}
            {isFollowing ? "Following" : "Follow"}
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#1D4350] hover:bg-[#0f2a35] text-white px-5 py-2 rounded-md hover:scale-105 transition-all duration-200">
            <Image
              src="/view-trip.png"
              alt="View Trip"
              width={20}
              height={20}
              className="filter invert"
            />{" "}
            Join Trip
          </button>
          <button
            onClick={onChatOpen}
            className="flex items-center justify-center bg-[#1D4350] text-white p-3 rounded-full hover:bg-[#0f2a35] hover:scale-110 transition-all duration-200 shadow-md"
          >
            <Image
              src="/chat-icon.png"
              alt="Chat"
              width={22}
              height={22}
              className="filter invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
