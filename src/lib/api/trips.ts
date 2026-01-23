import { Trip } from "@/app/searchtrip/types/types";
import { mapApiTripToTrip } from "@/lib/mappers/trip.mapper";

export async function fetchTrips(): Promise<Trip[]> {
  const res = await fetch(
    "https://api.business.travio.cepialabs.com/api/trips/search",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();
  
  return data.results.map(mapApiTripToTrip);
}
