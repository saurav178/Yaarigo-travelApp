"use client";
import DashboardHeader from "./DashboardHeader";
import Banner from "./Banner";
import StatsCards from "./StatsCards";
import QuickActions from "./QuickActions";
import RecommendedSection from "./RecommendedSection";
import RecentTrips from "./RecentTrips";
export default function DashboardPage() {
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