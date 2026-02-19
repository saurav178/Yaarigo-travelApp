// Static data for the chatbot knowledge base
export interface Trip {
  id: string;
  title: string;
  guideName: string;
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  agencyName: string;
  matchPercentage?: number;
  spotsLeft?: number;
  genderPreference?: 'ANY' | 'MALE ONLY' | 'FEMALE ONLY';
  description: string;
  imageUrl?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface UserQuery {
  id: string;
  keywords: string[];
  response: string;
}

// Static trips data
export const trips: Trip[] = [
  {
    id: "trip-001",
    title: "Banaue Rice Terraces Adventure",
    guideName: "Mike's Trekking",
    from: "Manila",
    to: "Banaue",
    startDate: "2026-03-15",
    endDate: "2026-03-20",
    minPrice: 15000,
    maxPrice: 25000,
    rating: 4.8,
    agencyName: "North Trek Expeditions",
    matchPercentage: 95,
    spotsLeft: 3,
    genderPreference: "ANY",
    description: "Experience the stunning Banaue Rice Terraces with expert local guides. Includes accommodation and meals."
  },
  {
    id: "trip-002",
    title: "Palawan Island Hopping",
    guideName: "Island Explorers",
    from: "Puerto Princesa",
    to: "El Nido",
    startDate: "2026-04-10",
    endDate: "2026-04-15",
    minPrice: 20000,
    maxPrice: 35000,
    rating: 4.9,
    agencyName: "Palawan Adventures",
    matchPercentage: 88,
    spotsLeft: 5,
    genderPreference: "ANY",
    description: "Explore the pristine beaches and lagoons of Palawan. Snorkeling equipment and boat transfers included."
  },
  {
    id: "trip-003",
    title: "Siargao Surf Camp",
    guideName: "Surf Masters",
    from: "Cebu",
    to: "Siargao",
    startDate: "2026-05-05",
    endDate: "2026-05-12",
    minPrice: 18000,
    maxPrice: 28000,
    rating: 4.7,
    agencyName: "Siargao Surf Co.",
    matchPercentage: 82,
    spotsLeft: 2,
    genderPreference: "ANY",
    description: "Learn to surf in the world-famous Cloud 9. Daily lessons and accommodation included."
  },
  {
    id: "trip-004",
    title: "Bohol Countryside Tour",
    guideName: "Chocolate Hills Explorers",
    from: "Cebu",
    to: "Bohol",
    startDate: "2026-03-25",
    endDate: "2026-03-28",
    minPrice: 12000,
    maxPrice: 18000,
    rating: 4.6,
    agencyName: "Bohol Nature Tours",
    matchPercentage: 75,
    spotsLeft: 8,
    genderPreference: "ANY",
    description: "Visit the Chocolate Hills, Tarsier Sanctuary, and Loboc River Cruise."
  }
];

// Static FAQ data
export const faqs: FAQ[] = [
  {
    id: "faq-001",
    question: "How do I book a trip?",
    answer: "You can book a trip by clicking on 'Join Trip' on any trip card. You'll need to create an account or log in to complete the booking.",
    category: "booking"
  },
  {
    id: "faq-002",
    question: "What is the cancellation policy?",
    answer: "Cancellations made 7 days before the trip start date receive a full refund. Cancellations within 7 days receive a 50% refund.",
    category: "policy"
  },
  {
    id: "faq-003",
    question: "Are meals included?",
    answer: "Most trips include basic meals, but it varies by trip. Check the specific trip details for inclusions.",
    category: "trip-details"
  },
  {
    id: "faq-004",
    question: "Can I join as a solo traveler?",
    answer: "Yes! Many travelers join solo. You'll be matched with other solo travelers or small groups.",
    category: "travel"
  }
];

// Static query-response pairs
export const queryResponses: UserQuery[] = [
  {
    id: "query-001",
    keywords: ["price", "cost", "budget", "cheap", "expensive"],
    response: "Trip prices range from ₱10,000 to ₱50,000 depending on duration and inclusions. You can filter by budget using the price slider."
  },
  {
    id: "query-002",
    keywords: ["date", "when", "schedule", "availability"],
    response: "Trip dates vary. Use the date filter to find trips starting on your preferred date. Most trips are 3-7 days long."
  },
  {
    id: "query-003",
    keywords: ["destination", "where", "location", "place", "go to"],
    response: "We offer trips to various destinations including Banaue, Palawan, Siargao, and Bohol. Use the destination filter to explore specific locations."
  },
  {
    id: "query-004",
    keywords: ["gender", "male", "female", "safety", "preference"],
    response: "You can filter trips by gender preference: 'ANY' or 'MALE ONLY'. This helps create comfortable experiences for all travelers."
  },
  {
    id: "query-005",
    keywords: ["spots", "available", "left", "full", "capacity"],
    response: "Spots left are shown on each trip card. Popular trips fill up quickly, so book early!"
  }
];

// Chat message types
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  trips?: Trip[];
}

// Predefined bot responses for common greetings
export const greetingResponses = [
  "Hello! How can I help you plan your next adventure? 🏝️",
  "Hi there! Looking for a trip? I can help you find the perfect destination.",
  "Welcome to Yaarigo! Ask me about trips, destinations, or booking information."
];

export const fallbackResponse = "I'm not sure about that. You can try asking about trips, prices, destinations, or check our FAQ section. Or would you like to see available trips?";