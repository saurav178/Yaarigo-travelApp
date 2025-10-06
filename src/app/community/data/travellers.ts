const getRandomImage = (gender: "men" | "women" = "men") =>
  `https://randomuser.me/api/portraits/${gender}/${Math.floor(
    Math.random() * 100
  )}.jpg`;

const calculateSafetyScore = (traveller: {
  verified?: boolean;
  age?: number;
  image?: string;
  rating?: number;
}) => {
  let score = 0;
  if (traveller.verified) score += 50;
  if (traveller.age && traveller.age >= 18) score += 10;
  if (traveller.image) score += 10;
  if (traveller.rating && traveller.rating >= 4) score += 20;
  return Math.min(score, 100);
};

export interface Traveller {
  id: number;
  name: string;
  location: string;
  Destination: string;
  description: string;
  image: string;
  verified: boolean;
  age: number;
  genderPreference: "Male" | "Female";
  compatibility: number;
  rating: number;
  safety: number;
  startDate: string;
  endDate: string;
}

export const travellers: Traveller[] = [
  {
    id: 1,
    name: "Amrit",
    location: "Punjab, Ludhiana",
    Destination: "Delhi, India",
    description: `I’m planning a trek to Pin Parvati Valley, starting from Delhi...`,
    image: getRandomImage("men"),
    verified: true,
    age: 26,
    genderPreference: "Male",
    compatibility: 92,
    rating: 4.8,
    safety: calculateSafetyScore({
      verified: true,
      age: 26,
      image: "male",
      rating: 4.8,
    }),
    startDate: "2025-11-15",
    endDate: "2025-11-20",
  },
  {
    id: 2,
    name: "David",
    location: "Odisha, Bhubaneswar",
    Destination: "Goa, India",
    description: `Exploring Pin Parvati Valley with like-minded travellers.`,
    image: getRandomImage("men"),
    verified: true,
    age: 30,
    genderPreference: "Male",
    compatibility: 85,
    rating: 4.5,
    safety: calculateSafetyScore({
      verified: true,
      age: 30,
      image: "male",
      rating: 4.5,
    }),
    startDate: "2025-12-05",
    endDate: "2025-12-10",
  },
  {
    id: 3,
    name: "Sam",
    location: "Kolkata, West Bengal",
    Destination: "Manali, Himachal Pradesh",
    description: `Backpacking trip to Himachal Pradesh this winter.`,
    image: getRandomImage("men"),
    verified: true,
    age: 24,
    genderPreference: "Male",
    compatibility: 78,
    rating: 4.2,
    safety: calculateSafetyScore({
      verified: true,
      age: 24,
      image: "male",
      rating: 4.2,
    }),
    startDate: "2026-01-05",
    endDate: "2026-01-10",
  },
  {
    id: 4,
    name: "Riya",
    location: "Delhi, Connaught Place",
    Destination: "Shillong, Meghalaya",
    description: `Trekking lover! Planning to explore Northeast this year.`,
    image: getRandomImage("women"),
    verified: true,
    age: 27,
    genderPreference: "Female",
    compatibility: 88,
    rating: 4.7,
    safety: calculateSafetyScore({
      verified: true,
      age: 27,
      image: "female",
      rating: 4.7,
    }),
    startDate: "2026-02-05",
    endDate: "2026-02-10",
  },
  {
    id: 5,
    name: "Neha",
    location: "Mumbai, Maharashtra",
    Destination: "Jaipur, Rajasthan",
    description: `Interested in cultural trips and foodie trails.`,
    image: getRandomImage("women"),
    verified: true,
    age: 29,
    genderPreference: "Female",
    compatibility: 81,
    rating: 4.3,
    safety: calculateSafetyScore({
      verified: true,
      age: 29,
      image: "female",
      rating: 4.3,
    }),
    startDate: "2026-03-15",
    endDate: "2026-03-20",
  },
  {
    id: 6,
    name: "Arjun",
    location: "Odisha, Bhubaneswar",
    Destination: "Rishikesh, Uttarakhand",
    description: `Weekend treks and adventure sports enthusiast.`,
    image: getRandomImage("men"),
    verified: true,
    age: 32,
    genderPreference: "Male",
    compatibility: 74,
    rating: 4.6,
    safety: calculateSafetyScore({
      verified: true,
      age: 32,
      image: "male",
      rating: 4.6,
    }),
    startDate: "2026-04-05",
    endDate: "2026-04-10",
  },
  {
    id: 7,
    name: "Sana",
    location: "Bangalore, Karnataka",
    Destination: "Coorg, Karnataka",
    description: `Love coffee plantations and nature trails.`,
    image: getRandomImage("women"),
    verified: true,
    age: 25,
    genderPreference: "Female",
    compatibility: 90,
    rating: 4.9,
    safety: calculateSafetyScore({
      verified: true,
      age: 25,
      image: "female",
      rating: 4.9,
    }),
    startDate: "2026-05-10",
    endDate: "2026-05-15",
  },
  {
    id: 8,
    name: "Rohan",
    location: "Chennai, Tamil Nadu",
    Destination: "Ooty, Tamil Nadu",
    description: `Weekend getaway with friends.`,
    image: getRandomImage("men"),
    verified: true,
    age: 28,
    genderPreference: "Male",
    compatibility: 82,
    rating: 4.4,
    safety: calculateSafetyScore({
      verified: true,
      age: 28,
      image: "male",
      rating: 4.4,
    }),
    startDate: "2026-06-01",
    endDate: "2026-06-05",
  },
  {
    id: 9,
    name: "Ananya",
    location: "Pune, Maharashtra",
    Destination: "Lonavala, Maharashtra",
    description: `Short hikes and nature photography lover.`,
    image: getRandomImage("women"),
    verified: true,
    age: 26,
    genderPreference: "Female",
    compatibility: 87,
    rating: 4.5,
    safety: calculateSafetyScore({
      verified: true,
      age: 26,
      image: "female",
      rating: 4.5,
    }),
    startDate: "2026-07-10",
    endDate: "2026-07-15",
  },
  {
    id: 10,
    name: "Ananya",
    location: "Pune, Maharashtra",
    Destination: "Lonavala, Maharashtra",
    description: `Short hikes and nature photography lover.`,
    image: getRandomImage("women"),
    verified: true,
    age: 26,
    genderPreference: "Female",
    compatibility: 87,
    rating: 4.5,
    safety: calculateSafetyScore({
      verified: true,
      age: 26,
      image: "female",
      rating: 4.5,
    }),
    startDate: "2026-07-10",
    endDate: "2026-07-15",
  },

  {
    id: 11,
    name: "Ananya",
    location: "Pune, Maharashtra",
    Destination: "Lonavala, Maharashtra",
    description: `Short hikes and nature photography lover.`,
    image: getRandomImage("women"),
    verified: true,
    age: 26,
    genderPreference: "Female",
    compatibility: 87,
    rating: 4.5,
    safety: calculateSafetyScore({
      verified: true,
      age: 26,
      image: "female",
      rating: 4.5,
    }),
    startDate: "2026-07-10",
    endDate: "2026-07-15",
  },

];
