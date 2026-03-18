import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ city: null });
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GMAP_LOC}`
    );

    const data = await res.json();

    const cityComponent = data.results?.[0]?.address_components?.find(
      (comp: any) => comp.types.includes("locality")
    );

    const city = cityComponent?.long_name || null;

    return NextResponse.json({ city });

  } catch (error) {
    return NextResponse.json({ city: null });
  }
}