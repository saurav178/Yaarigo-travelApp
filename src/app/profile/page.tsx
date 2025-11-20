"use client";
import React, { useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import AboutSection from "./components/AboutSection";
import TabsSection from "./components/TabsSection";
import SimilarTravelersSection from "./components/SimilarTravelersSection";
import FeaturedTripLeaderSection from "./components/FeaturedTripLeaderSection";
import FeaturedTravelAgencySection from "./components/FeaturedTravelAgencySection";
import ChatWindow from "./components/ChatWindow";

export default function ProfilePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1234);

  const handleFollowToggle = () => {
    const newFollowing = !isFollowing;
    setIsFollowing(newFollowing);
    setFollowersCount((prev) =>
      newFollowing ? prev + 1 : prev - 1
    );
  };

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

      <SimilarTravelersSection />
      <FeaturedTripLeaderSection />
      <FeaturedTravelAgencySection />

      <ChatWindow isOpen={isChatOpen} onClose={handleChatClose} />
    </div>
  );
}