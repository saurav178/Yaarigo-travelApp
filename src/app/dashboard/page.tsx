"use client";

import DashboardHeader from "./components/DashboardHeader";
import Banner from "./components/Banner";
import StatsCards from "./components/StatsCards";
import QuickActions from "./components/QuickActions";
import RecommendedSection from "./components/RecommendedSection";
import RecentTrips from "./components/RecentTrips";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";

export default function DashboardPage() {

const [showLoader, setShowLoader] = useState<boolean>(true);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="px-0 py-8">
        {/* Full Width Banner */}
        <Banner />

        {/* Page Content Container - Very minimal padding for maximum width */}
        <div className="px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8">
          {/* Enhanced Stats Cards */}
          <StatsCards />

          {/* Quick Actions with Modern Cards */}
          <QuickActions />

          {/* Sponsored / Recommended Section */}
          <RecommendedSection />

          {/* Recent Trips with Enhanced Design */}
          <RecentTrips />
        </div>
      </main>
    </div>
  );
}