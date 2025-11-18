

// "use client";

import AgencyCard, { Agency } from "./AgencyCard";

// Sample data for agencies
export const AGENCIES_DEMO: Agency[] = [
  {
    id: 1,
    title: "Wanderlust Adventures",
    description:
      "Discover extraordinary travel experiences with us! We specialize in curated adventure tours across breathtaking destinations. From mountain expeditions to cultural immersions, our expert guides ensure every journey is unforgettable.",
    tags: ["Adventure Travel", "Cultural Tours", "Sustainable Travel"],
    from: "Kolkata, West Bengal",
    to: "Simla, Himachal Pradesh",
    travelersNeeded: 3,
    verified: true,
    price: "₹1,500 / person (shared costs)",
    date: "Dec 15–17, 2025",
    spotsLeft: 2,
    stats: {
      travelersEnrolled: "500+",
      tripsCompleted: "150+",
      yearsInBusiness: "8+",
    },
    host: {
      name: "Sarah Johnson",
      age: 26,
      verified: true,
      location: "Goa, India",
      rating: 4.8,
      match: 92,
      safeScore: 88,
      category: "Featured Trip Agency",
    },
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80",
  },
  {
    id: 2,
    title: "Nomadic Escapes",
    description:
      "Join us for a thrilling desert safari experience in Jaisalmer! Camel rides, star gazing, and camping in golden dunes await.Join us for a thrilling desert safari experience in Jaisalmer! Camel rides, star gazing, and camping in golden dunes await.",
    tags: ["Backpacking", "Local Culture", "Food Tours"],
    from: "Ahmedabad, Gujarat",
    to: "Jaisalmer, Rajasthan",
    travelersNeeded: 4,
    verified: true,
    price: "₹2,000 / person (shared costs)",
    date: "Jan 10–12, 2026",
    spotsLeft: 1,
    stats: {
      travelersEnrolled: "500+",
      tripsCompleted: "150+",
      yearsInBusiness: "8+",
    },
    host: {
      name: "Ravi Patel",
      age: 29,
      verified: true,
      location: "Surat, India",
      rating: 4.9,
      match: 88,
      safeScore: 72,
      category: "Featured Trip Agency",
    },
    image:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=475&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Coastal Voyages",
    description:
      "Relax and rejuvenate by the beach with guided meditation, yoga sessions, and peaceful sunsets.Join us for a thrilling desert safari experience in Jaisalmer! Camel rides, star gazing, and camping in golden dunes await.",
    tags: ["Mountaineering", "Trekking", "Adventure Sports"],
    from: "Mumbai, India",
    to: "Gokarna, Karnataka",
    verified: true,
    travelersNeeded: 5,
    price: "₹1,800 / person (shared costs)",
    date: "Feb 5–9, 2026",
    spotsLeft: 3,
    stats: {
      travelersEnrolled: "500+",
      tripsCompleted: "150+",
      yearsInBusiness: "8+",
    },
    host: {
      name: "Ananya Verma",
      age: 30,
      verified: true,
      location: "Bangalore, India",
      rating: 4.7,
      match: 90,
      safeScore: 45,
      category: "Featured Trip Agency",
    },
    image:
      "https://images.unsplash.com/photo-1553342385-111fd6bc6ab3?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Historical City Walk in Delhi",
    description:
      "Discover the rich history of Delhi with a guided walk through ancient monuments and bustling markets.Join us for a thrilling desert safari experience in Jaisalmer! Camel rides, star gazing, and camping in golden dunes await.",
    tags: ["Cruise Trips", "Beach Escapes", "Luxury Travel"],
    from: "Chennai, Tamil Nadu",
    to: "Delhi, Delhi",
    travelersNeeded: 4,
    verified: true,
    price: "₹1,200 / person (shared costs)",
    date: "Apr 1-3, 2026",
    spotsLeft: 2,
    stats: {
      travelersEnrolled: "500+",
      tripsCompleted: "150+",
      yearsInBusiness: "8+",
    },
    host: {
      name: "Akash Sharma",
      age: 32,
      verified: true,
      location: "Delhi, India",
      rating: 4.6,
      match: 85,
      safeScore: 78,
      category: "Featured Trip Agency",
    },
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80",
  },
  {
    id: 5,
    title: "Wildlife Safari in Ranthambore",
    description:
      "Experience thrilling jeep safaris to spot tigers and other wildlife in Ranthambore National Park.Join us for a thrilling desert safari experience in Jaisalmer! Camel rides, star gazing, and camping in golden dunes await.",
    tags: ["Historical Tours", "Art & Heritage", "Cultural Immersion"],
    from: "Jaipur, Rajasthan",
    to: "Ranthambore, Rajasthan",
    travelersNeeded: 6,
    verified: true,
    price: "₹3,000 / person (shared costs)",
    date: "May 10-14, 2026",
    spotsLeft: 4,
    stats: {
      travelersEnrolled: "500+",
      tripsCompleted: "150+",
      yearsInBusiness: "8+",
    },
    host: {
      name: "Priya Singh",
      age: 28,
      verified: true,
      location: "Jaipur, India",
      rating: 4.9,
      match: 95,
      safeScore: 90,
      category: "Featured Trip Agency",
    },
    image:
      "https://images.unsplash.com/photo-1553342385-111fd6bc6ab3?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

type AgencyCarouselProps = {
  agencies?: Agency[];
};

export default function AgencyCarousel({
  agencies = AGENCIES_DEMO,
}: AgencyCarouselProps) {
  return (
    // ✅ no min-h-screen, no fixed width, just a vertical stack
    <div className="flex flex-col gap-3 w-full">
      {agencies.map((agency) => (
        <div
          key={agency.id}
          className="w-full"
          aria-labelledby={`agency-${agency.id}-heading`}
        >
          <AgencyCard agency={agency} />
        </div>
      ))}
    </div>
  );
}

