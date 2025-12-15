import { NextResponse } from "next/server";

export async function GET() {
  const travelers = [
    { id: 1, name: "Alice Johnson", photo: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Bob Smith", photo: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Charlie Brown", photo: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Diana Prince", photo: "https://i.pravatar.cc/150?img=4" },
  ];

  return NextResponse.json(travelers);
}
