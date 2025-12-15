// "use client";

// import AgencyCard from "./AgencyCard";
// import useAgencyData from "../useAgencyData";

// interface Agency {
//   logo?: string;
//   image?: string;
//   name: string;
//   rating?: number;
//   trips?: number;
// }

// interface DisplayAgency {
//   image: string;
//   name: string;
//   rating: number;
//   trips: number;
// }

// interface SimilarAgenciesProps {
//   agencies?: Agency[] | null;
// }

// export default function SimilarAgencies({ agencies }: SimilarAgenciesProps) {
//   const { data, loading } = useAgencyData();
//   if (loading) return null;

//   const fallbackAgencies: DisplayAgency[] = [
//     { image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=80&q=80", name: "Nomad Traveler", rating: 4.3, trips: 4 },
//     { image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=80&q=80", name: "Nomad Traveler", rating: 4.0, trips: 3 },
//     { image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=80&q=80", name: "Explorer Agency", rating: 4.5, trips: 5 },
//     { image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=80&q=80", name: "Travel Buddy", rating: 4.2, trips: 2 },
//   ];

//   const displayAgencies: DisplayAgency[] =
//     (agencies ?? data?.similarAgencies)?.map((a: Agency) => ({
//       image: a.logo ?? a.image ?? "",
//       name: a.name,
//       rating: a.rating ?? 4.5,
//       trips: a.trips ?? 5,
//     })) ?? fallbackAgencies;

//   return (
//     <div className="bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 p-5 w-full max-w-md ml-10">
//       <h3 className="text-base font-bold mb-4 text-gray-900">Similar Agencies</h3>
//       <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
//         {displayAgencies.map((agency: DisplayAgency, i: number) => (
//           <AgencyCard
//             key={i}
//             image={agency.image}
//             name={agency.name}
//             rating={agency.rating}
//             trips={agency.trips}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }














"use client";
import AgencyCard from "./AgencyCard";
import type { SimilarAgency } from '../types/types';

interface SimilarAgenciesProps {
  agencies?: SimilarAgency[];
}

export default function SimilarAgencies({ agencies }: SimilarAgenciesProps) {
  const fallbackAgencies: SimilarAgency[] = [
    { 
      id: 1,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=80&q=80", 
      name: "Nomad Traveler", 
      rating: 4.3, 
      trips: 4 
    },
    { 
      id: 2,
      image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=80&q=80", 
      name: "Nomad Traveler", 
      rating: 4.0, 
      trips: 3 
    },
    { 
      id: 3,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=80&q=80", 
      name: "Explorer Agency", 
      rating: 4.5, 
      trips: 5 
    },
    { 
      id: 4,
      image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=80&q=80", 
      name: "Travel Buddy", 
      rating: 4.2, 
      trips: 2 
    },
  ];

  const displayAgencies = agencies && agencies.length > 0 ? agencies : fallbackAgencies;

  return (
    <div className="bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 p-5 w-full max-w-md">
      <h3 className="text-base font-bold mb-4 text-gray-900">Similar Agencies</h3>
      <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
        {displayAgencies.map((agency, i) => (
          <AgencyCard
            key={agency.id || i}
            image={agency.logo || agency.image || ""}
            name={agency.name}
            rating={agency.rating ?? 4.5}
            trips={agency.trips ?? 5}
          />
        ))}
      </div>
    </div>
  );
}