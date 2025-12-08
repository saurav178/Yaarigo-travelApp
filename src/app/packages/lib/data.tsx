// lib/data.ts
import type {
  Hero,
  FeaturedPackage,
  RecommendedPackage,
  PopularPackage,
} from "./types";

// ---------------------------------------------
// HERO SECTION (used in NewPackage)
// ---------------------------------------------
export const hero: Hero = {
  image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&auto=format&fit=crop&q=80",
  title: "Tropical Paradise Retreat",
  location: "Maldives",
  price: 2100,
  days: 7,
  nights: 6,
};

// ---------------------------------------------
// THUMBNAILS (used in NewPackage)
// ---------------------------------------------
export const thumbs: string[] = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=400&auto=format&fit=crop&q=80",
];

// ---------------------------------------------
// FEATURED PACKAGES (used in FeatureCard)
// ---------------------------------------------
export const featured: FeaturedPackage[] = [
  {
    id: "2",
    title: "Safari Adventure",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1400&auto=format&fit=crop",
    rating: 4.9,
    price: 3200,
    days: 8,
    nights: 7,
    location: "Serengeti, Tanzania",
    accommodation:
      "Luxury tented camp with panoramic views of the savannah.",
    includedMeals:
      "All meals and beverages included with local specialties.",
    extras: "Evening bonfire and guided wildlife photography session.",
    activities: [
      "Sunrise and sunset game drives",
      "Hot-air balloon ride over the plains",
      "Visit to a Maasai village",
      "Stargazing sessions with expert guides",
    ],
  },
  {
    id: "3",
    title: "Bali Bliss Getaway",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&auto=format&fit=crop&q=80",
    rating: 4.7,
    price: 2100,
    days: 7,
    nights: 6,
    location: "Bali, Indonesia",
    accommodation: "Stay at a beachfront villa with private infinity pool.",
    includedMeals:
      "Breakfast included with one Balinese dinner experience.",
    extras: "Airport pickup and complimentary yoga sessions.",
    activities: [
      "Temple visits and cultural performances",
      "Beach relaxation and water sports",
      "Balinese cooking class",
      "Visit to the Ubud Monkey Forest",
    ],
  },
];

// ---------------------------------------------
// RECOMMENDED PACKAGES (used in RecommendedGrid)
// ---------------------------------------------
export const recommended: RecommendedPackage[] = [
  {
    id: "r1",
    title: "Bali Beach Escape",
    location: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    price: 1600,
    days: 5,
    nights: 4,
  },
  {
    id: "r2",
    title: "Tokyo Cultural Adventure",
    location: "Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800&auto=format&fit=crop&q=80",
    price: 2500,
    days: 7,
    nights: 6,
  },
  {
    id: "r3",
    title: "New York City Highlights",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&auto=format&fit=crop&q=80",
    price: 1400,
    days: 4,
    nights: 3,
  },
  {
    id: "r4",
    title: "Sydney Explorer",
    location: "Sydney, Australia",
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&auto=format&fit=crop&q=80",
    price: 2500,
    days: 6,
    nights: 5,
  },
];

// ---------------------------------------------
// POPULAR PACKAGES (used in PopularList)
// ---------------------------------------------
export const popular: PopularPackage[] = [
  {
    id: "p1",
    title: "Alpine Escape",
    location: "Swiss Alps",
    price: 2400,
    days: 6,
    nights: 5,
    rating: 4.8,
    reviews: 341,
    image:
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "Caribbean Cruise",
    location: "Bahamas",
    price: 3100,
    days: 8,
    nights: 7,
    rating: 4.6,
    reviews: 512,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p3",
    title: "Parisian Romance",
    location: "Paris, France",
    price: 1800,
    days: 5,
    nights: 4,
    rating: 4.7,
    reviews: 1102,
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p4",
    title: "Greek Island Hopping",
    location: "Cyclades, Greece",
    price: 2700,
    days: 7,
    nights: 6,
    rating: 4.9,
    reviews: 221,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p5",
    title: "Greek Island Hopping",
    location: "Cyclades, Greece",
    price: 2700,
    days: 7,
    nights: 6,
    rating: 4.9,
    reviews: 221,
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1200&auto=format&fit=crop",
  },
];
