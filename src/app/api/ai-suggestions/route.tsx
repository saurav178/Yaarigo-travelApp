import { NextResponse } from "next/server";

// Example AI-powered logic mock
function generateChatStarters(interests: string[]) {
  const templates = [
    (i: string) => `Hey! I also love ${i}. Have you ever tried it while traveling?`,
    (i: string) => `Looks like we both enjoy ${i}! What's your favorite experience with it?`,
    (i: string) => `I saw you're into ${i} — that’s awesome! Ever thought of doing that abroad?`,
  ];

  // generate 3 random unique chat starters
  const shuffled = [...interests].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3).map((i) => {
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template(i);
  });
}

// Predict travel destinations based on user’s past data
function suggestDestinations(history: string[], preferences: string[]) {
  const popular = ["Bali", "Iceland", "Japan", "New Zealand", "Greece", "Italy"];
  const overlap = popular.filter((p) =>
    preferences.some((pref) => p.toLowerCase().includes(pref.toLowerCase()))
  );

  // fallback if no overlap found
  const base = overlap.length ? overlap : popular.sort(() => 0.5 - Math.random());
  return base.slice(0, 3);
}

function suggestTimings(preferences: string[]) {
  if (preferences.includes("beach")) return ["March - June", "October"];
  if (preferences.includes("mountain")) return ["December - February"];
  if (preferences.includes("festival")) return ["August - November"];
  return ["Anytime in Spring or Autumn"];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { interests = [], history = [], preferences = [] } = body;

    const chatStarters = generateChatStarters(interests);
    const destinations = suggestDestinations(history, preferences);
    const timings = suggestTimings(preferences);

    return NextResponse.json({
      success: true,
      data: {
        chatStarters,
        destinations,
        timings,
      },
    });
  } catch (error) {
    console.error("AI suggestion error:", error);
    return NextResponse.json(
      { success: false, message: "Error generating AI suggestions" },
      { status: 500 }
    );
  }
}
