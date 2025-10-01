"use client";

import { useState } from "react";
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

    
  );
}
