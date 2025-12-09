// "use client";
// import { useState, useEffect } from "react";
// import HeroSection from "./components/HeroSection";
// import StatsCards from "./components/StatsCards";
// import AboutSection from "./components/AboutSection";
// import TabNavigation from "./components/TabNavigation";
// import UpcomingTripCard from "./components/UpcomingTripCard";
// import PastTripCard from "./components/PastTripCard";
// import ReviewCard from "./components/ReviewCard";
// import TravelPhotos from "./components/TravelPhotos";
// // import SimilarAgenciesCarousel from "./components/SimilarAgenciesCarousel";
// import ContactInfo from "./components/ContactInfo";
// import TrustSafety from "./components/TrustSafety";
// import Loader from "../../components/Loader/Loader";

// import { AGENCIES_DEMO } from "../searchtrip/data/data";
// import TripsCard from "../searchtrip/components/TripsCard";

// export default function TripAgency() {
//   const [activeTab, setActiveTab] = useState("upcoming");
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [showLoader, setShowLoader] = useState(true);

//   // Fetch data
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch("profileAgency/api/agencyData");
//         const json = await res.json();
//         setData(json);
//       } catch (err) {
//         console.error("Failed to fetch agency data:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   // Hide loader after 2 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => setShowLoader(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Show loader if either loading data or 2-second timer is active
//   if (showLoader) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center bg-white">
//         <Loader />
//       </div>
//     );
//   }

//   if (!data)
//     return (
//       <div className="min-h-screen flex justify-center items-center text-red-500">
//         Failed to load data.
//       </div>
//     );

//   const {
//     hero,
//     stats,
//     about,
//     upcomingTrips,
//     pastTrips,
//     reviews,
//     travelPhotos,
//     similarAgencies,
//     contactInfo,
//     trustSafety,
//   } = data;

//   const tabs = [
//     { id: "upcoming", label: "Upcoming Trips", count: upcomingTrips.length },
//     { id: "past", label: "Past Trips", count: pastTrips.length },
//     { id: "reviews", label: "Reviews", count: reviews.length },
//     { id: "photos", label: "Travel Photos", count: travelPhotos.length },
//   ];

//   return (
// <<<<<<< HEAD
//     // <div className="min-h-screen bg-white">
//     <div className="min-h-screen bg-white w-full overflow-x-hidden">

// =======
//     <div className="min-h-screen bg-white w-full overflow-x-hidden">
// >>>>>>> 63e90ead738cf5ea157132bf932819acaa4b2043
//       <HeroSection hero={hero} />

//       <div className="w-full px-4 md:px-6 py-6 mt-6 md:mt-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
// <<<<<<< HEAD

// =======
// >>>>>>> 63e90ead738cf5ea157132bf932819acaa4b2043
//           {/* Left/Main Content */}
//           <div className="lg:col-span-2 space-y-5">
//             <StatsCards stats={stats} />
//             <AboutSection about={about} />

//             <div className="space-y-4">
//               <TabNavigation
//                 tabs={tabs}
//                 activeTab={activeTab}
//                 onTabChange={setActiveTab}
//               />

// <<<<<<< HEAD
//               {/* White box wrapper */}
//               <div className="bg-white shadow-md p-4 max-h-[70vh] md:max-h-[600px] overflow-y-auto space-y-4 rounded-xl">

// =======
//               <div className="bg-white shadow-md p-4 max-h-[70vh] md:max-h-[600px] overflow-y-auto space-y-4">
// >>>>>>> 63e90ead738cf5ea157132bf932819acaa4b2043
//                 {activeTab === "upcoming" &&
//                   upcomingTrips.map((trip: any, i: number) => (
//                     <UpcomingTripCard key={i} trip={trip} />
//                   ))}

//                 {activeTab === "past" &&
//                   pastTrips.map((trip: any, i: number) => (
//                     <PastTripCard key={i} trip={trip} />
//                   ))}

//                 {activeTab === "reviews" &&
//                   reviews.map((review: any, i: number) => (
//                     <ReviewCard key={i} review={review} />
//                   ))}

//                 {activeTab === "photos" && (
//                   <TravelPhotos photos={travelPhotos} />
//                 )}
//               </div>
//             </div>

//             {/* <SimilarAgenciesCarousel agencies={similarAgencies} /> */}
//           </div>

//           {/* Right Sidebar */}
//           <div className="space-y-5">
//             <ContactInfo contact={contactInfo} />
//             <TrustSafety items={trustSafety} />
//           </div>
//         </div>

//         {/* Featured Travel Agencies */}
//         <div className="w-full mt-8">
//           <h2 className="text-xl font-semibold mb-3">
//             Featured Travel Agencies
//           </h2>
//           <div className="flex space-x-4 overflow-x-auto pb-3 w-full">
//             {AGENCIES_DEMO.map((trip) => (
//               <div key={trip.id} className="flex-shrink-0 min-w-[300px]">
//                 <TripsCard trips={[trip]} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



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
import ContactInfo from "./components/ContactInfo";
import TrustSafety from "./components/TrustSafety";
import Loader from "../../components/Loader/Loader";

import { AGENCIES_DEMO } from "../searchtrip/data/data";
import TripsCard from "../searchtrip/components/TripsCard";

export default function TripAgency() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [data, setData] = useState<any>(null);
  const [showLoader, setShowLoader] = useState(true);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("profileAgency/api/agencyData");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch agency data:", err);
      }
    }
    fetchData();
  }, []);

  // Show Loader for 2 sec
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

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">

      {/* HERO SECTION */}
      <HeroSection hero={hero} />

      <div className="w-full px-4 md:px-6 py-6 mt-6 md:mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* MAIN CONTENT (LEFT) */}
          <div className="lg:col-span-2 space-y-5">

            <StatsCards stats={stats} />
            <AboutSection about={about} />

            <div className="space-y-4">

              <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* WHITE BOX WRAPPER */}
              <div className="bg-white shadow-md p-4 max-h-[70vh] md:max-h-[600px] overflow-y-auto space-y-4 rounded-xl">

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
          </div>

          {/* SIDEBAR (RIGHT) */}
          <div className="space-y-5">
            <ContactInfo contact={contactInfo} />
            <TrustSafety items={trustSafety} />
          </div>
        </div>

        {/* FEATURED AGENCIES */}
        <div className="w-full mt-8">
          <h2 className="text-xl font-semibold mb-3">
            Featured Travel Agencies
          </h2>

          <div className="flex space-x-4 overflow-x-auto pb-3 w-full">
            {AGENCIES_DEMO.map((trip) => (
              <div key={trip.id} className="flex-shrink-0 min-w-[300px]">
                <TripsCard trips={[trip]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
