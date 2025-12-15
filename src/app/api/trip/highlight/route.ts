import { NextResponse } from "next/server";

export async function GET() {
  const highlights = [
    { id: 1, title: "Sunset at the Beach", image: "https://source.unsplash.com/300x200/?beach,sunset" },
    { id: 2, title: "Mountain Trekking", image: "https://source.unsplash.com/300x200/?mountains,trek" },
    { id: 3, title: "City Tour", image: "https://source.unsplash.com/300x200/?city,travel" },
    { id: 4, title: "Safari Adventure", image: "https://source.unsplash.com/300x200/?safari,animals" },
  ];

  return NextResponse.json(highlights);
}
