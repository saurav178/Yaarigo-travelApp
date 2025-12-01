
// data/posts.ts
import type { Post } from "../types/types";

// ---- image mapping (case-insensitive) ----
const imageMap: Record<string, string> = {
  meghalaya:
    "https://images.unsplash.com/photo-1669628182335-4c50980f419d?q=80&w=870&auto=format&fit=crop",
  kyoto:
    "https://images.unsplash.com/photo-1558870832-c8db4b5b47d1?q=80&w=870&auto=format&fit=crop",
  bali:
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=870&auto=format&fit=crop",
  istanbul:
    "https://images.unsplash.com/photo-1621873129944-8d88a5328a0c?q=80&w=870&auto=format&fit=crop",
  santorini:
    "https://plus.unsplash.com/premium_photo-1697729900945-598459160f7b?q=80&w=870&auto=format&fit=crop",
  hanoi:
    "https://images.unsplash.com/photo-1678461863258-185d001d7a1b?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  banff:
    "https://images.unsplash.com/photo-1662434449168-35f32702b665?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  marrakech:
    "https://images.unsplash.com/photo-1596750320291-a082a23dcc19?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  queenstown:
    "https://plus.unsplash.com/premium_photo-1661964091508-b77d484a3003?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const imageFor = (location: string) => {
  const key = location.toLowerCase().trim();
  if (imageMap[key]) return imageMap[key];
  const query = encodeURIComponent(key);
  return `https://source.unsplash.com/480x360/?${query}`;
};

const titleCase = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// ---- Seed (enriched when returned) ----
const seedBase: Omit<Post, "imageUrl">[] = [
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

// Pools for deterministic generation
const poolLocations = [
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

const poolAuthors = ["Ravi Kumar", "Traveller", "Santosh", "Aarav", "Lena"];

const poolTexts = [
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

// Public API
export function getPosts(count = 5): Post[] {
  const out: Post[] = [];

  // 1) Enrich seed with imageUrl
  for (let i = 0; i < Math.min(seedBase.length, count); i++) {
    const s = seedBase[i];
    const loc = titleCase(s.location);
    out.push({
      ...s,
      location: loc,
      imageUrl: imageFor(loc),
    });
  }

  // 2) Generate remainder deterministically
  let idNum = seedBase.length + 1;
  while (out.length < count) {
    const idx = out.length % poolLocations.length;
    const loc = titleCase(poolLocations[idx]);
    const txtIdx = out.length % poolTexts.length;
    const time =
      idx % 2 === 0 ? `${(idx % 10) + 1}h ago` : `${(idx % 3) + 1}d ago`;

    out.push({
      id: String(idNum++),
      author: poolAuthors[idx % poolAuthors.length],
      location: loc,
      timeAgo: time,
      text: poolTexts[txtIdx],
      bestTime: idx % 3 === 0 ? `${6 + (idx % 3)}:00 AM` : undefined,
      imageUrl: imageFor(loc),
    });
  }

  return out;
}

// Convenience: always return exactly five with images
export function getFivePosts(): Post[] {
  return getPosts(5);
}
