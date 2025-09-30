"use client";

import { useState } from "react";
import LandingPage from "./landingpage/landingpage";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function Page() {
  const [showLogin, setShowLogin] = useState(true);

  const switchToSignup = () => setShowLogin(false);
  const switchToLogin = () => setShowLogin(true);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Carousel container */}
      <div className="relative h-screen overflow-hidden">
        <LandingPage />

        {/* Sticky form overlay */}
         <div className="absolute top-20 right-4 md:right-16 md:w-1/3 w-full z-50">
          <div className="sticky top-20">
            {showLogin ? (
              <Login
                onLogin={(email, password) => console.log("Login:", email, password)}
                switchToSignup={switchToSignup}
                error={""}
              />
            ) : (
              <Signup
                onSignup={(name, email, password) =>
                  console.log("Signup:", name, email, password)
                }
                switchToLogin={switchToLogin}
                error={""}
              />
            )}
          </div>
        </div>
      </div>
       {/* Explore Trips section */}
      {/* <div className="px-4 md:px-16 py-10 bg-gray-900">
        <ExploreTrips />
      </div> */}
    </div>
   
  );
}
