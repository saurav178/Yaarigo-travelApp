"use client";
import React, { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import AboutSection from "./components/AboutSection";
import TabsSection from "./components/TabsSection";
import Similar from "./components/Similar";


import ChatWindow from "./components/ChatWindow";
import Loader from "@/components/Loader/Loader";

export default function ProfilePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1234);
  const [showLoader, setShowLoader] = useState(true);

  const handleFollowToggle = () => {
    const newFollowing = !isFollowing;
    setIsFollowing(newFollowing);
    setFollowersCount((prev) =>
      newFollowing ? prev + 1 : prev - 1
    );
  };

   useEffect(() => {
      const timer = setTimeout(() => setShowLoader(false), 2000);
      return () => clearTimeout(timer);
    }, []);
  
    // Show loader if either loading data or 2-second timer is active
    if (showLoader) {
      return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
          <Loader />
        </div>
      );
    }

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-18">
      <ProfileHeader
        isFollowing={isFollowing}
        followersCount={followersCount}
        onFollowToggle={handleFollowToggle}
        onChatOpen={handleChatOpen}
      />

      {/* About + Tabs Section */}
      <div className="mt-8 px-4 flex flex-col md:flex-row md:items-start gap-8">
        <AboutSection />
        <TabsSection />
      </div>
      <Similar   />

      <ChatWindow isOpen={isChatOpen} onClose={handleChatClose} />
    </div>
  );
}