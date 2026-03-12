"use client";

import JoinedTravelers from "./JoinedTravelers";
import TripRoadmap from "./TripRoadmap";
import SafetyInformation from "./SafetyInformation";
import ShareThisTrip from "./ShareThisTrip";
import CancellationPolicy from "./CancellationPolicy";

interface TripDetailsProps {
  trip: any;
  tripId: string;
}

const TripDetails: React.FC<TripDetailsProps> = ({
  trip,
  tripId,
}) => {
  if (!trip) return null;

  return (
    <div className="bg-gray-50 min-h-screen px-5 sm:px-10 py-10">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Safety Info receives trip */}
          <SafetyInformation trip={trip} />

          {/* Cancellation Policy receives trip */}
          <CancellationPolicy trip={trip} />

        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-6">

          {/* Joined Travelers requires tripId */}
          {tripId && <JoinedTravelers tripId={tripId} />}

          {/* Roadmap based on itinerary */}
          {trip?.itinerary && (
            <TripRoadmap itinerary={trip.itinerary} />
          )}

          <ShareThisTrip trip={trip} />

        </div>
      </div>

      {/* Featured Travel Agencies */}
      {/* You can later connect this dynamically to backend */}
    </div>
  );
};

export default TripDetails;