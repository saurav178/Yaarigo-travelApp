import { NextResponse } from "next/server";

const travellers = [
  {
    id: 1,
    name: "Alice",
    destination: "Paris",
    dates: { start: "2025-10-20", end: "2025-10-25" },
    interests: ["food", "art", "hiking"],
    budget: 1000,
  },
  {
    id: 2,
    name: "Bob",
    destination: "Paris",
    dates: { start: "2025-10-22", end: "2025-10-27" },
    interests: ["music", "art", "photography"],
    budget: 1200,
  },
  {
    id: 3,
    name: "Charlie",
    destination: "Tokyo",
    dates: { start: "2025-11-01", end: "2025-11-10" },
    interests: ["anime", "tech"],
    budget: 1500,
  },
];

// 🔸 Calculate overlap in days between two date ranges
function dateOverlap(a: { start: string; end: string }, b: { start: string; end: string }) {
  const startA = new Date(a.start).getTime();
  const endA = new Date(a.end).getTime();
  const startB = new Date(b.start).getTime();
  const endB = new Date(b.end).getTime();

  const overlapStart = Math.max(startA, startB);
  const overlapEnd = Math.min(endA, endB);
  const overlap = overlapEnd - overlapStart;

  return overlap > 0 ? overlap / (1000 * 60 * 60 * 24) : 0; // in days
}

// 🔸 Calculate compatibility score between two travelers
function calculateScore(current: any, other: any): number {
  let score = 0;

  // Destination match → 30%
  if (current.destination === other.destination) {
    score += 30;
  }

  // Date overlap → 20%
  const overlapDays = dateOverlap(current.dates, other.dates);
  if (overlapDays > 0) {
    score += 20;
  }

  // Interests similarity → 30%
  const commonInterests = current.interests.filter((i: string) =>
    other.interests.includes(i)
  ).length;
  const maxInterests = Math.max(current.interests.length, other.interests.length);
  if (maxInterests > 0) {
    score += (commonInterests / maxInterests) * 30;
  }

  // Budget similarity → 20%
  const budgetDiff = Math.abs(current.budget - other.budget);
  if (budgetDiff <= 200) score += 20;
  else if (budgetDiff <= 500) score += 10;

  return Math.round(score);
}

// 📡 POST /api/match
export async function POST(req: Request) {
  try {
    const currentUser = await req.json(); // expects the current user's data

    const matches = travellers
      .filter((t) => t.id !== currentUser.id) // exclude self
      .map((t) => ({
        ...t,
        compatibilityScore: calculateScore(currentUser, t),
      }))
      .filter((t) => t.compatibilityScore > 0) // remove no-match travelers
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore); // highest first

    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error in matching API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
