// // travellers.ts

// // Function to get a random image
// const getRandomImage = (gender: "men" | "women" = "men") =>
//   `https://randomuser.me/api/portraits/${gender}/${Math.floor(
//     Math.random() * 100
//   )}.jpg`;

// export const travellers = [
//   {
//     id: 1,
//     name: "Amrit",
//     location: "Punjab, Ludhiana",
//     description: `I’m planning a trek to "Pin Parvati Valley”, starting from Delhi, Anand Vihar Bus Stand...`,
//     image: getRandomImage("men"),
//     verified: true,
//   },
//   {
//     id: 2,
//     name: "David",
//     location: "Odisha, Bhubaneswar",
//     description: `I’m planning a trek to "Pin Parvati Valley”, starting from Delhi, Anand Vihar Bus Stand...`,
//     image: getRandomImage("men"),
//     verified: true,
//   },
//   {
//     id: 3,
//     name: "Sam",
//     location: "Kolkata, West Bengal",
//     description: `I’m planning a trek to "Pin Parvati Valley”, starting from Delhi, Anand Vihar Bus Stand...`,
//     image: getRandomImage("men"),
//     verified: true,
//   },
//   {
//     id: 4,
//     name: "Amrit",
//     location: "Punjab, Ludhiana",
//     description: `I’m planning a trek to "Pin Parvati Valley”, starting from Delhi, Anand Vihar Bus Stand...`,
//     image: getRandomImage("men"),
//     verified: true,
//   },
//   {
//     id: 5,
//     name: "Sam",
//     location: "Kolkata, West Bengal",
//     description: `I’m planning a trek to "Pin Parvati Valley”, starting from Delhi, Anand Vihar Bus Stand...`,
//     image: getRandomImage("men"),
//     verified: true,
//   },
//   {
//     id: 6,
//     name: "David",
//     location: "Odisha, Bhubaneswar",
//     description: `I’m planning a trek to "Pin Parvati Valley”, starting from Delhi, Anand Vihar Bus Stand...`,
//     image: getRandomImage("men"),
//     verified: true,
//   },
// ];



// travellers.ts

// Function to get a random image
// const getRandomImage = (gender: "men" | "women" = "men") =>
//   `https://randomuser.me/api/portraits/${gender}/${Math.floor(
//     Math.random() * 100
//   )}.jpg`;

// export const travellers = [
//   {
//     id: 1,
//     name: "Amrit",
//     location: "Punjab, Ludhiana",
//     currentLocation: "Delhi, India",
//     description: `I’m planning a trek to "Pin Parvati Valley”, starting from Delhi, Anand Vihar Bus Stand...`,
//     image: getRandomImage("men"),
//     verified: true,
//     age: 26,
//     genderPreference: "Female",
//     compatibility: 92,
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     name: "David",
//     location: "Odisha, Bhubaneswar",
//     currentLocation: "Goa, India",
//     description: `Exploring Pin Parvati Valley with like-minded travellers.`,
//     image: getRandomImage("men"),
//     verified: true,
//     age: 30,
//     genderPreference: "Any",
//     compatibility: 85,
//     rating: 4.5,
//   },
//   {
//     id: 3,
//     name: "Sam",
//     location: "Kolkata, West Bengal",
//     currentLocation: "Manali, Himachal Pradesh",
//     description: `Backpacking trip to Himachal Pradesh this winter.`,
//     image: getRandomImage("men"),
//     verified: true,
//     age: 24,
//     genderPreference: "Male",
//     compatibility: 78,
//     rating: 4.2,
//   },
//   {
//     id: 4,
//     name: "Riya",
//     location: "Delhi, Connaught Place",
//     currentLocation: "Shillong, Meghalaya",
//     description: `Trekking lover! Planning to explore Northeast this year.`,
//     image: getRandomImage("women"),
//     verified: true,
//     age: 27,
//     genderPreference: "Male",
//     compatibility: 88,
//     rating: 4.7,
//   },
//   {
//     id: 5,
//     name: "Neha",
//     location: "Mumbai, Maharashtra",
//     currentLocation: "Jaipur, Rajasthan",
//     description: `Interested in cultural trips and foodie trails.`,
//     image: getRandomImage("women"),
//     verified: true,
//     age: 29,
//     genderPreference: "Any",
//     compatibility: 81,
//     rating: 4.3,
//   },
//   {
//     id: 6,
//     name: "David",
//     location: "Odisha, Bhubaneswar",
//     currentLocation: "Rishikesh, Uttarakhand",
//     description: `Weekend treks and adventure sports enthusiast.`,
//     image: getRandomImage("men"),
//     verified: true,
//     age: 32,
//     genderPreference: "Female",
//     compatibility: 74,
//     rating: 4.6,
//   },
// ];


const getRandomImage = (gender: "men" | "women" = "men") =>
  `https://randomuser.me/api/portraits/${gender}/${Math.floor(
    Math.random() * 100
  )}.jpg`;

// Function to calculate safety score
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

export const travellers = [
  {
    id: 1,
    name: "Amrit",
    location: "Punjab, Ludhiana",
    currentLocation: "Delhi, India",
    description: `I’m planning a trek to "Pin Parvati Valley”, starting from Delhi, Anand Vihar Bus Stand...`,
    image: getRandomImage("men"),
    verified: true,
    age: 26,
    genderPreference: "Female",
    compatibility: 92,
    rating: 4.8,
    safety: calculateSafetyScore({ verified: true, age: 26, image: "male", rating: 4.8 }),
  },
  {
    id: 2,
    name: "David",
    location: "Odisha, Bhubaneswar",
    currentLocation: "Goa, India",
    description: `Exploring Pin Parvati Valley with like-minded travellers.`,
    image: getRandomImage("men"),
    verified: true,
    age: 30,
    genderPreference: "Any",
    compatibility: 85,
    rating: 4.5,
    safety: calculateSafetyScore({ verified: true, age: 30, image: "male", rating: 4.5 }),
  },
  {
    id: 3,
    name: "Sam",
    location: "Kolkata, West Bengal",
    currentLocation: "Manali, Himachal Pradesh",
    description: `Backpacking trip to Himachal Pradesh this winter.`,
    image: getRandomImage("men"),
    verified: true,
    age: 24,
    genderPreference: "Male",
    compatibility: 78,
    rating: 4.2,
    safety: calculateSafetyScore({ verified: true, age: 24, image: "male", rating: 4.2 }),
  },
  {
    id: 4,
    name: "Riya",
    location: "Delhi, Connaught Place",
    currentLocation: "Shillong, Meghalaya",
    description: `Trekking lover! Planning to explore Northeast this year.`,
    image: getRandomImage("women"),
    verified: true,
    age: 27,
    genderPreference: "Male",
    compatibility: 88,
    rating: 4.7,
    safety: calculateSafetyScore({ verified: true, age: 27, image: "female", rating: 4.7 }),
  },
  {
    id: 5,
    name: "Neha",
    location: "Mumbai, Maharashtra",
    currentLocation: "Jaipur, Rajasthan",
    description: `Interested in cultural trips and foodie trails.`,
    image: getRandomImage("women"),
    verified: true,
    age: 29,
    genderPreference: "Any",
    compatibility: 81,
    rating: 4.3,
    safety: calculateSafetyScore({ verified: true, age: 29, image: "female", rating: 4.3 }),
  },
  {
    id: 6,
    name: "Arjun",
    location: "Odisha, Bhubaneswar",
    currentLocation: "Rishikesh, Uttarakhand",
    description: `Weekend treks and adventure sports enthusiast.`,
    image: getRandomImage("men"),
    verified: true,
    age: 32,
    genderPreference: "Female",
    compatibility: 74,
    rating: 4.6,
    safety: calculateSafetyScore({ verified: true, age: 32, image: "male", rating: 4.6 }),
  },
];
