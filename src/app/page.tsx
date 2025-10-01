"use client";

import { useState } from "react";
<<<<<<< HEAD
import LandingPage from "./landingpage/landingpage";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ProfileSetup from "../components/ProfileSetup";
import ExploreTrips from "./trips/screens/ExploreTrips/ExploreTrips";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const switchToSignup = () => setShowLogin(false);
  const switchToLogin = () => setShowLogin(true);

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    setShowProfileSetup(true);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    setIsLoggedIn(true);
    setShowProfileSetup(true);
  };

  const handleProfileSave = (profileData: any) => {
    console.log("Profile saved:", profileData);
    setShowProfileSetup(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {!isLoggedIn ? (
        <div className="relative h-screen overflow-hidden">
          <LandingPage />

          <div className="absolute top-20 right-4 md:right-16 md:w-1/3 w-full z-50">
            <div className="sticky top-20">
              {showLogin ? (
                <Login
                  onLogin={handleLogin}
                  switchToSignup={switchToSignup}
                  error=""
                />
              ) : (
                <Signup
                  onSignup={handleSignup}
                  switchToLogin={switchToLogin}
                  error=""
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative min-h-screen bg-white text-white ">
          {/* ExploreTrips scrollable background */}
          <div className="px-4 md:px-16 py-10">
            <ExploreTrips />
          </div>

          {/* ProfileSetup modal overlay */}
          {showProfileSetup && (
            <div className="fixed inset-0 z-50 flex justify-center items-start bg-black/50 backdrop-blur-sm overflow-auto pt-24 px-4">
              <div className="w-full max-w-5xl">
                <ProfileSetup
                  onProfileSave={handleProfileSave}
                  onCancel={() => setShowProfileSetup(false)}
                  error=""
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    
=======
import TravellerCard from "@/components/TravellerCard";
import SectionTitle from "@/components/SectionTitle";
import TripCard from "@/components/TripCard";
import EventCard from "@/components/EventCard";

import { travellers as travellersData } from "@/data/travellers";
import { trips } from "@/data/trips";
import { events } from "@/data/events";

export default function Home() {
  const [travellers, setTravellers] = useState(travellersData);
  const [shortlist, setShortlist] = useState<any[]>([]);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleDismiss = (id: number) => {
    setTravellers(travellers.filter((t) => t.id !== id));
    if (activeCardId === id) setActiveCardId(null); 
  };

  const handleInterested = (id: number) => {
    const selected = travellers.find((t) => t.id === id);
    if (selected) {
      setShortlist([...shortlist, selected]);
      setTravellers(travellers.filter((t) => t.id !== id));
      if (activeCardId === id) setActiveCardId(null); 
    }
  };

  return (
    <main className="pt-24 px-8 py-10 max-w-7xl mx-auto">
      <h1 className="relative text-center text-3xl md:text-4xl font-bold mb-13 text-[#3B82F6] tracking-wide">
        Find your people, Plan your adventures
        <span className="absolute left-1/2 -bottom-5 w-300 h-[4px] bg-gray-400 transform -translate-x-1/2"></span>
      </h1>

      {/* Fellow Travellers */}
      <div className="flex items-center justify-between mb-6 pb-2">
        <h2 className="text-lg font-semibold">
          Connect with Fellow Travellers
        </h2>
        <button className="px-5 py-2 bg-[#3B82F6] text-white rounded-lg text-sm hover:bg-[#2e7a76] transition">
          Set as Preference
        </button>
      </div>

      <div className="flex flex-wrap gap-5 justify-center">
        {travellers.map((t) => (
          <TravellerCard
            key={t.id}
            {...t}
            isActive={activeCardId === t.id}
            onToggle={(id) => setActiveCardId(activeCardId === id ? null : id)}
            onDismiss={() => handleDismiss(t.id)}
            onInterested={() => handleInterested(t.id)}
          />
        ))}
      </div>

      {/* Shortlist section */}
      {shortlist.length > 0 && (
        <div className="mt-10">
          <SectionTitle title="Shortlisted Travellers" />
          <ul className="list-disc pl-5 text-gray-700">
            {shortlist.map((s) => (
              <li key={s.id}>
                {s.name} – {s.location}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trips */}
      <SectionTitle title="Sponsored Trips" />
      <div className="flex flex-wrap gap-8 justify-center">
        {trips.map((trip) => (
          <TripCard key={trip.id} {...trip} />
        ))}
      </div>

      {/* Events */}
      <SectionTitle title="Community Events" />
      <div className="flex gap-14 overflow-x-auto pb-3">
        {events.map((e) => (
          <EventCard key={e.id} {...e} />
        ))}
      </div>
    </main>
>>>>>>> origin/feature/community-nearby-essential
  );
}
