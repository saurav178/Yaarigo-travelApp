import { Trip } from "@/app/searchtrip/types/types";

export function mapApiTripToTrip(apiTrip: any): Trip {
  return {
    id: parseInt(apiTrip._id, 10) || 0,
    title: apiTrip.title,
    description: apiTrip.description,
    tags: apiTrip.tripStyles ?? [],

    from: `${apiTrip.fromLocation.city}, ${apiTrip.fromLocation.country}`,
    to: `${apiTrip.toLocation.city}, ${apiTrip.toLocation.country}`,

    travelersNeeded: apiTrip.totalSeats - apiTrip.bookedSeats,
    spotsLeft: apiTrip.totalSeats - apiTrip.bookedSeats,

    price: apiTrip.partnerPreferences?.budget
      ? `₹${apiTrip.partnerPreferences.budget.min} - ₹${apiTrip.partnerPreferences.budget.max}`
      : "Price on request",

    date: `${new Date(apiTrip.startDate).toLocaleDateString()} – ${new Date(
      apiTrip.endDate
    ).toLocaleDateString()}`,

    host: {
      name: apiTrip.creatorType === "AGENCY" ? "Trip Agency" : "Trip Leader",
      age: 0,
      verified: true,
      location: apiTrip.fromLocation.city,
      rating: 4.5,
      match: 90,
      safeScore: 85,
      category: "Featured Trip Agency",
    },

    image:
      apiTrip.ogImage ??
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  };
}
