import {  Profile ,} from "./Types";

export const initialProfile: Profile = {
  firstName: "Sarah",
  lastName: "Anderson",
  email: "sarah.anderson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, USA",
  dob: "1995-06-15",
  gender: "female",
  occupation: "Digital Marketing Specialist",
  about:
    "Passionate traveler seeking adventure and authentic cultural experiences. Love hiking, photography, and trying local cuisine.",
  profilePhoto:
    "https://image2url.com/images/1764151322305-1bf3fa50-3256-4304-b882-d47e247246ab.jpg",
  coverPhoto:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",

  travelStyles: ["Adventure", "Culture", "Photography"],

  languages: ["English", "Spanish", "French"],

  social: {
    instagram: "@sarahtravels",
    facebook: "sarah.anderson",
  },

  emergency: {
    contactName: "John Anderson",
    contactPhone: "+1 (555) 987-6543",
  },

  trips: [
    {
      id: "t1",
      title: "Paris Adventure",
      location: "Paris, France",
      start: "2025-12-15",
      end: "2025-12-22",
      image:
        "https://image2url.com/images/1764150430906-6eb57ad0-bfca-451c-9fbe-98dc64cd99a2.jpg",
      status: "confirmed",
      participants: ["You", "Alice", "Bob"],
      rating: 5.0,
    },
    {
      id: "t2",
      title: "London Travel",
      location: "London, United Kingdom",
      start: "2026-02-10",
      end: "2026-02-15",
      image:
        "https://image2url.com/images/1764150334632-363c37b6-5e03-4f01-8ed0-1501d67b352d.jpg",
      status: "planning",
      participants: ["You", "Charlie"],
      rating: null,
    },
    {
      id: "t3",
      title: "Iceland Escape",
      location: "Reykjavik, Iceland",
      start: "2024-08-01",
      end: "2024-08-10",
      image:
        "https://image2url.com/images/1764150334632-363c37b6-5e03-4f01-8ed0-1501d67b352d.jpg",
      status: "completed",
      participants: ["You", "John"],
      rating: 4.9,
    },
  ],

  gallery: [
    "https://image2url.com/images/1764150430906-6eb57ad0-bfca-451c-9fe-98dc64cd99a2.jpg".replace(
      "fe-",
      "cd99a2.jpg"
    ), // just ensuring format; you can use original
    "https://image2url.com/images/1764150896914-959b53ea-538c-4e5f-8d4a-4fbe1bfc9d39.jpg",
    "https://image2url.com/images/1764150670732-fbf48988-50a8-4724-8904-d50aac4832f3.jpg",
    "https://image2url.com/images/1764150711499-01fc1220-71fb-4bc2-925f-5d82f986d195.jpg",
    "https://image2url.com/images/1764150734823-6a65b79f-4fde-4179-bda3-4ca8a6c65127.jpg",
    "https://image2url.com/images/1764150770745-11d4c638-8eb3-4a72-89c9-1e1904909cd6.jpg",
    "https://image2url.com/images/1764150801945-123b5d76-e6aa-4bd8-99ea-5ea06ebc7b71.jpg",
    "https://image2url.com/images/1764150823896-2086331c-8e19-4653-8891-202a8abe664f.jpg",
    "https://image2url.com/images/1764150896914-959b53ea-538c-4e5f-8d4a-4fbe1bfc9d39.jpg",
  ],
  showAllGallery: false,

  reviews:  [
    {
      id: "r1",
      name: "John Davis",
      title: "Seoul Food & Culture Trip",
      text:
        "Sarah was an amazing travel companion! She's adventurous, respectful, and always up for trying new experiences. Her photography skills meant we got incredible shots on our trip. Highly recommend traveling with her!",
      tags: ["Adventurous", "Respectful", "Fun"],
      date: "August 2024",
      rating: 5,
      image:
        "https://image2url.com/images/1764151322305-1bf3fa50-3256-4304-b882-d47e247246ab.jpg",
    },
    {
      id: "r2",
      name: "Jenny Wilson",
      title: "Seoul Food & Culture Trip",
      text:
        "Sarah was an amazing travel companion! She's adventurous, respectful, and always up for trying new experiences. Her photography skills meant we got incredible shots on our trip. Highly recommend traveling with her!",
      tags: ["Adventurous", "Respectful", "Fun"],
      date: "August 2024",
      rating: 4.8,
      image:
        "https://image2url.com/images/1764151081021-1b8e9ce1-9be0-40c4-9cff-b93d88058010.jpg",
    },
    {
      id: "r3",
      name: "John Davis",
      title: "Seoul Food & Culture Trip",
      text:
        "Sarah was an amazing travel companion! She's adventurous, respectful, and always up for trying new experiences. Her photography skills meant we got incredible shots on our trip. Highly recommend traveling with her!",
      tags: ["Adventurous", "Respectful", "Fun"],
      date: "August 2024",
      rating: 5,
      image:
        "https://image2url.com/images/1764151322305-1bf3fa50-3256-4304-b882-d47e247246ab.jpg",
    },
    {
      id: "r4",
      name: "Jenny Wilson",
      title: "Seoul Food & Culture Trip",
      text:
        "Sarah was an amazing travel companion! She's adventurous, respectful, and always up for trying new experiences. Her photography skills meant we got incredible shots on our trip. Highly recommend traveling with her!",
      tags: ["Adventurous", "Respectful", "Fun"],
      date: "August 2024",
      rating: 4.8,
      image:
        "https://image2url.com/images/1764151081021-1b8e9ce1-9be0-40c4-9cff-b93d88058010.jpg",
    },
  ],
  showAllReviews: false,

  followers: 1234,
  following: 567,
  tripsCompleted: 15,

  followersList: [
    {
      name: "khushiii056",
      username: "khushii04",
      image:
        "https://image2url.com/images/1764151081021-1b8e9ce1-9be0-40c4-9cff-b93d88058010.jpg",
    },
    {
      name: "gajendarsingh_sodha",
      username: "gajendar singh sodha",
      image:
        "https://image2url.com/images/1764151322305-1bf3fa50-3256-4304-b882-d47e247246ab.jpg",
      isFollowing: true,
    },
    {
      name: "hemanggour",
      username: "Hemang Gour",
      image:
        "https://image2url.com/images/1764151081021-1b8e9ce1-9be0-40c4-9cff-b93d88058010.jpg",
    },
  ],

  followingList: [
    {
      name: "johncarter",
      username: "John Carter",
      image:
        "https://image2url.com/images/1764151322305-1bf3fa50-3256-4304-b882-d47e247246ab.jpg",
      isFollowing: true,
    },
    {
      name: "emilydoe",
      username: "Emily Doe",
      image:
        "https://image2url.com/images/1764151081021-1b8e9ce1-9be0-40c4-9cff-b93d88058010.jpg",
      isFollowing: true,
    },
  ],
};

export const ALL_TRAVEL_STYLES: string[] = [
  "Adventure",
  "Relaxation",
  "Culture",
  "Food",
  "Nature",
  "Photography",
  "Nightlife",
  "Budget",
];

export const ALL_LANGUAGES: string[] = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Chinese",
  "Portuguese",
];
