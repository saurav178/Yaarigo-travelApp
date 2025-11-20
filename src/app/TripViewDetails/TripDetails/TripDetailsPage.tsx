

 
"use client";
import { useEffect, useState } from "react";
import TripOverview from "./TripOverview";
import TripActions from "./TripActions";
import TripLeader from "./TripLeader";
import DetailedItinerary from "../triphighlight/DetailedItinerary";
import TripHighlights from "../triphighlight/TripHighlights";
 
export default function TripDetailsPage() {
  const [tripData, setTripData] = useState<any>(null);
  const [leaderData, setLeaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
 
  // Dummy data (fallback)
  const dummyTrip = {
    tripId: 101,
    title: "Trip Overview",
    description: "Relax and explore the beaches of Goa with friends!",
    from: "Mumbai, India",
    startDate: "Nov-01",
    endDate: "Nov-05, 2025" ,
    budget: 1000,
    maxTravelers: 6,
    joinedTravelers: 4,
    groupSize: "2–4 travelers",
    tripStyle: "Beach & Adventure",
    travelStyle: "Road Trip",
    duration: "5 days",
    languages: ["English", "Hindi"],
    splitCost: true,
    lookingFor: "Any",
    foodPreference: "Veg",
    itinerary: [
      {
        location: "Panaji",
        activities: ["Arrival & hotel check-in", "Evening beach walk", "Dinner by the sea"],
      },
      {
        location: "Baga Beach",
        activities: ["Water sports", "Shopping", "Beach shack lunch"],
      },
      {
        location: "Old Goa",
        activities: ["Visit Basilica of Bom Jesus", "Explore old churches", "Local market stroll"],
      },
    ],
  };
 
  const dummyLeader = {
    leaderId: 1001,
    name: "Courtney Henry",
    rating: 4.8,
    reviewsCount: 56,
    bio: "Adventurous, social and culture lover! Enjoys exploring off-beat destinations.",
    photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  };
 
  useEffect(() => {
    // Using dummy data for now
    setTripData(dummyTrip);
    setLeaderData(dummyLeader);
    setLoading(false);
  }, []);
 
  if (loading) return <div className="p-10 text-center">Loading trip details...</div>;
 
  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <TripOverview trip={tripData} />
           <TripHighlights />
          <DetailedItinerary itinerary={tripData.itinerary} />
        </div>
 
        {/* Right Section */}
       <div className="flex flex-col gap-6 -mt-1">
  <TripActions trip={tripData} />
  <TripLeader leader={leaderData} />
</div>
      </div>
    </div>
  );
}
 
 

