"use client";
import React, { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import AboutSection from "./components/AboutSection";
import TabsSection from "./components/TabsSection";

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

  if (showLoader) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);

  return (
<div className="min-h-screen w-screen bg-gray-50 flex flex-col overflow-x-hidden" style={{ overflowY: 'hidden' }}>
      {/* Sticky Header */}
      <div className="top-0 z-50">
        <ProfileHeader
          isFollowing={isFollowing}
          followersCount={followersCount}
          onFollowToggle={handleFollowToggle}
          onChatOpen={handleChatOpen}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden mt-8 w-full">
        {/* Left Column: Sticky About Section, shifted slightly right */}
        <div className="hidden md:block md:w-1/3 md:sticky md:top-36 self-start md:ml-8 h-screen overflow-auto">
          <AboutSection />
        </div>

        {/* Right Column: Tabs Section (vertical scroll only) */}
        <div className="flex-1 h-screen overflow-y-auto px-4 md:px-6">
  <div className="w-full max-w-full overflow-x-hidden">
    <TabsSection />
  </div>
</div>
      </div>

      <ChatWindow isOpen={isChatOpen} onClose={handleChatClose} />
    </div>
  );
}