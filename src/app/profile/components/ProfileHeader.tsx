"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaHeart, FaShieldAlt, FaUserFriends, FaUserCheck, FaMapMarkedAlt } from "react-icons/fa";

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
  const [isFavourite, setIsFavourite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleFavouriteToggle = () => {
    const newFavourite = !isFavourite;
    setIsFavourite(newFavourite);
    setPopupMessage(newFavourite ? "Added to favourite" : "Removed from favourite");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="relative pt-15">
      {/* Cover Image Section */}
      <div className="w-full h-40 md:h-48 overflow-hidden relative">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Cover"
          fill
          className="object-cover"
        />
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-white bg-black/40 px-3 py-1 hover:bg-black/60 transition z-10"
        >
          ← Back
        </button>
      </div>

      {/* Profile Section */}
      <div
        className="relative bg-white shadow-lg p-6 md:p-8 w-full mx-auto flex flex-col items-center md:items-start"
        style={{ marginTop: "-2rem" }}
      >
        {/* Buttons positioned at top right */}
        <div className="flex flex-wrap justify-center md:absolute md:top-4 md:right-4 gap-4 mt-4 md:mt-0">
          <button
            onClick={onFollowToggle}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-[#1D4350] text-white hover:bg-[#0f2a35] transition-all duration-200"
          >
            {!isFollowing && (
              <Image src="/join-trip.png" alt="Follow" width={20} height={20} className="filter invert" />
            )}
            {isFollowing ? "Following" : "Follow"}
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#1D4350] hover:bg-[#0f2a35] text-white px-5 py-2 transition-all duration-200">
            <Image src="/view-trip.png" alt="View Trip" width={20} height={20} className="filter invert" />
            Join Trip
          </button>
          <button onClick={onChatOpen} className="p-3 bg-[#1D4350] text-white rounded-full hover:bg-[#0f2a35] shadow-md transition-all">
            <Image src="/chat-icon.png" alt="Chat" width={22} height={22} className="filter invert" />
          </button>
          <button onClick={handleFavouriteToggle} className="p-3 bg-[#1D4350] text-white rounded-full hover:bg-[#0f2a35] shadow-md transition-all">
            <FaHeart className={isFavourite ? "text-red-500" : "text-white"} size={22} />
          </button>
        </div>

        {/* Avatar - Floating partially over cover */}
        <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-10 -top-20 md:-top-24 w-40 h-40 md:w-72 md:h-64 overflow-hidden shadow-md z-20 border-4 border-white bg-white">
          <Image
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        {/* Info Container - Shifted Right on Desktop */}
        <div className="w-full flex flex-col items-center md:items-start md:pl-[340px] mt-24 md:mt-0">
          
          <div className="flex flex-col items-center md:items-start w-full">
            <h2 className="text-2xl md:text-3xl font-semibold flex flex-wrap items-center justify-center md:justify-start gap-2 text-gray-800">
              Jane Cooper
              <span className="bg-emerald-500 text-white text-[10px] md:text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Image src="/ic_baseline-check-circle-outline.png" alt="Verified" width={14} height={14} className="filter brightness-0 invert" />
                Verified Traveler
              </span>
            </h2>

            <p className="text-gray-600 flex items-center gap-1 mt-2">
              <FaMapMarkerAlt className="text-black" /> Kiev, Ukraine
            </p>

            <div className="text-sm text-gray-500 mt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center">
                <Image src="/star-icon.png" alt="Star" width={16} height={16} className="inline mr-1" 
                  style={{ filter: "invert(0%) sepia(100%) saturate(10000%) hue-rotate(45deg) brightness(500%) contrast(100%)" }} 
                />
                4.1 (410 reviews)
              </div>
              <span className="font-medium bg-green-100 text-green-700 rounded-full px-2 py-1 inline-flex items-center">
                <FaShieldAlt className="text-green-600 mr-1" size={16} />
                88% Safe
              </span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8 w-full">
            {[
              { label: "Followers", value: followersCount, icon: <FaUserFriends /> },
              { label: "Following", value: "567", icon: <FaUserCheck /> },
              { label: "Trips Done", value: "15", icon: <FaMapMarkedAlt /> },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-100 py-3 px-6 shadow-sm flex flex-col items-center justify-center gap-1 rounded-lg min-w-[130px]">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-2xl">{stat.icon}</span>
                  <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                </div>
                <p className="text-gray-500 text-xs font-medium uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {popupMessage}
        </div>
      )}
    </div>
  );
}