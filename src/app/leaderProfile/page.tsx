"use client";

import React, { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import AboutSection from "./components/AboutSection";
import TabsSection from "./components/TabsSection";
import ChatWindow from "./components/ChatWindow";
import Loader from "../../components/Loader/Loader";

export default function LeaderProfilePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1234);
  const [showLoader, setShowLoader] = useState(true);

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

  const handleFollowToggle = () => {
    setIsFollowing((prev) => {
      setFollowersCount((count) => (prev ? count - 1 : count + 1));
      return !prev;
    });
  };

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-18">
      <ProfileHeader
        isFollowing={isFollowing}
        followersCount={followersCount}
        onFollowToggle={handleFollowToggle}
        onChatOpen={handleChatOpen}
      />

      <div className="mt-8 px-4 flex flex-col md:flex-row md:items-start gap-8">
        <AboutSection />
        <TabsSection />
      </div>

      <ChatWindow isOpen={isChatOpen} onClose={handleChatClose} />
    </div>
  );
}
