export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BOOKING_URL;

export const API_ENDPOINTS_CONFIG = {
  BOOKING: {
    CREATE_CART: `${API_BASE_URL}/booking-service/booking-cart/active`,
    TRAVELER_PROFILES: `${API_BASE_URL}/booking-service/traveler-profiles`,
    ADD_TRAVELERS: (cartId: string) => `${API_BASE_URL}/booking-service/booking-cart/${cartId}/travelers`,
    REMOVE_TRAVELERS: (cartId: string, travelerId: string) => `${API_BASE_URL}/booking-service/booking-cart/${cartId}/travelers/${travelerId}`,
  }
};