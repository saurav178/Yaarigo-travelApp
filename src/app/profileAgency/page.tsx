"use client";
import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import StatsCards from "./components/StatsCards";
import AboutSection from "./components/AboutSection";
import TabNavigation from "./components/TabNavigation";
import UpcomingTripCard from "./components/UpcomingTripCard";
import PastTripCard from "./components/PastTripCard";
import ReviewCard from "./components/ReviewCard";
import TravelPhotos from "./components/TravelPhotos";
import SimilarAgenciesCarousel from "./components/SimilarAgenciesCarousel";
import ContactInfo from "./components/ContactInfo";
import TrustSafety from "./components/TrustSafety";
import SimilarAgencies from "./components/SimilarAgencies";
import Loader from "./components/Loader";

export default function TripAgency() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("profileAgency/api/agencyData");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch agency data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  if (!data)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Failed to load data.
      </div>
    );

  const {
    hero,
    stats,
    about,
    upcomingTrips,
    pastTrips,
    reviews,
    travelPhotos,
    similarAgencies,
    contactInfo,
    trustSafety,
  } = data;

  const tabs = [
    { id: "upcoming", label: "Upcoming Trips", count: upcomingTrips.length },
    { id: "past", label: "Past Trips", count: pastTrips.length },
    { id: "reviews", label: "Reviews", count: reviews.length },
    { id: "photos", label: "Travel Photos", count: travelPhotos.length },
  ];

  const handleRatingClick = (reviewIndex: number, newRating: number) => {
    reviews[reviewIndex].rating = newRating; // optional: maintain state if needed
  };

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">

      <HeroSection hero={hero} />

      <div className="w-full px-4 md:px-6 py-6 mt-6 md:mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Left/Main Content */}
          <div className="lg:col-span-2 space-y-5">
            <StatsCards stats={stats} />
            <AboutSection about={about} />

            <div className="space-y-4">
              <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* White box wrapper */}
              <div className="bg-white shadow-md p-4 max-h-[70vh] md:max-h-[600px] overflow-y-auto space-y-4">

                {activeTab === "upcoming" &&
                  upcomingTrips.map((trip: any, i: number) => (
                    <UpcomingTripCard key={i} trip={trip} />
                  ))}

                {activeTab === "past" &&
                  pastTrips.map((trip: any, i: number) => (
                    <PastTripCard key={i} trip={trip} />
                  ))}

                {activeTab === "reviews" &&
                  reviews.map((review: any, i: number) => (
                    <ReviewCard key={i} review={review} />
                  ))}

                {activeTab === "photos" && (
                  <TravelPhotos photos={travelPhotos} />
                )}
              </div>
            </div>

            <SimilarAgenciesCarousel agencies={similarAgencies} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            <ContactInfo contact={contactInfo} />
            <TrustSafety items={trustSafety} />
            {/* <SimilarAgencies agencies={similarAgencies} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}