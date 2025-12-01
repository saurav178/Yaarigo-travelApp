
// import { Post } from "../types/types";



// const imageMap: Record<string, string> = {
//   Meghalaya:
//     "https://images.unsplash.com/photo-1620489277692-b48d40cb8808?auto=format&fit=crop&w=800&q=80",
//   Kyoto:
//     "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80",
//   Bali:
//     "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
//   Istanbul:
//     "https://images.unsplash.com/photo-1552849394-9471c0f91914?auto=format&fit=crop&w=800&q=80",
//   Santorini:
//     "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
// };
// // Seed items used as a base to generate more
const seed: Post[] = [
   {
    id: "1",
    author: "Ravi Kumar",
    location: "Meghalaya",
    timeAgo: "2h ago",
    text:
      "Found this incredible hidden temple in Meghalaya! The bamboo forest creates the most magical morning light. Totally worth the 6 AM wakeup!",
    bestTime: "6:00 AM",
  },
  {
    id: "2",
    author: "Aarav Sharma",
    location: "Kyoto",
    timeAgo: "5h ago",
    text:
      "The Arashiyama bamboo grove was breathtaking early morning. Pro tip: arrive before 7 AM to enjoy the serenity!",
    bestTime: "7:00 AM",
  },
  {
    id: "3",
    author: "Raju Chauhan",
    location: "Bali",
    timeAgo: "1d ago",
    text:
      "Spent the evening at a hidden beach in Bali — the sunset reflections were unreal!",
    bestTime: "5:30 PM",
  },
  {
    id: "4",
    author: "Ananya Verma",
    location: "Istanbul",
    timeAgo: "3d ago",
    text:
      "Exploring the Grand Bazaar was a colorful chaos! Tried authentic Turkish tea and loved it.",
    bestTime: "10:00 AM",
  },
  {
    id: "5",
    author: "Rajesh Patel",
    location: "Santorini",
    timeAgo: "4d ago",
    text:
      "Caught the famous blue domes at sunrise. The golden light over the cliffs was magical!",
    bestTime: "6:30 AM",
  },
];

// // Simple helper to generate deterministic “mock” posts up to `count`
export function getPosts(count = 10): Post[] {
  const out: Post[] = [];
  const pool = [
    "meghalaya",
    "kyoto",
    "bali",
    "jaipur",
    "rome",
    "hanoi",
    "banff",
    "marrakech",
    "queenstown",
    "santorini",
  ];
  const texts = [
    "Hidden café with the best sunrise view.",
    "Street food hunt was a blast!",
    "Trek trail opened after monsoon—totally worth it.",
    "Local guide shared an incredible story about this place.",
    "Budget tips: buses are faster than you’d think.",
    "This beach is empty at dawn—pure magic.",
    "Tried the local dessert. 11/10.",
    "Best rooftop for golden hour shots.",
    "Bring cash—many vendors don’t take cards.",
    "Watch for sudden rain, carry a light poncho.",
  ];

  // Always include the seed first (up to count)
  for (let i = 0; i < Math.min(seed.length, count); i++) {
    out.push(seed[i]);
  }

  // Generate the rest by remixing
  let idNum = seed.length + 1;
  while (out.length < count) {
    const idx = out.length % pool.length;
    const txtIdx = out.length % texts.length;

    out.push({
      id: String(idNum++),
      author: ["Ravi Kumar", "Traveller", "Santosh", "Aarav", "Lena"][idx % 5],
      location: pool[idx],
      timeAgo: [`${(idx % 10) + 1}h ago`, `${(idx % 3) + 1}d ago`][idx % 2],
      text: texts[txtIdx],
      bestTime: idx % 3 === 0 ? `${6 + (idx % 3)}:00 AM` : undefined,
    });
  }

  return out;


}

import { Post } from "../types/types";

// simple image mapping based on location keywords
const imageMap: Record<string, string> = {
  Meghalaya:
    "https://images.unsplash.com/photo-1669628182335-4c50980f419d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Kyoto:
    "https://images.unsplash.com/photo-1558870832-c8db4b5b47d1?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Bali:
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Istanbul:
    "https://images.unsplash.com/photo-1621873129944-8d88a5328a0c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Santorini:
    "https://plus.unsplash.com/premium_photo-1697729900945-598459160f7b?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

// data generator
export function getFivePosts(): Post[] {
  const authors = [
    "Ravi Kumar",
    "Aarav Sharma",
    "Megha Chauhan",
    "Ananya Verma",
    "Rajesh Patel",
  ];
  const locations = ["Meghalaya", "Kyoto", "Bali", "Istanbul", "Santorini"];
  const times = ["2h ago", "5h ago", "1d ago", "3d ago", "4d ago"];
  const texts = [
    "Found this incredible hidden temple in Meghalaya! The bamboo forest creates the most magical morning light. Totally worth the 6 AM wakeup!",
    "The Arashiyama bamboo grove was breathtaking early morning. Arrive before 7 AM for peace!",
    "Spent the evening at a hidden beach in Bali — the sunset reflections were unreal!",
    "Exploring the Grand Bazaar was a colorful chaos! Tried authentic Turkish tea and loved it.",
    "Caught the famous blue domes at sunrise. The golden light over the cliffs was magical!",
  ];

  return locations.map((loc, i) => ({
    id: String(i + 1),
    author: authors[i],
    location: loc,
    timeAgo: times[i],
    text: texts[i],
    bestTime: `${6 + i}:00 AM`,
    imageUrl: imageMap[loc], // 🆕 adds matching image
  }));
}
