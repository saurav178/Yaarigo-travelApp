import axios from "axios";



export interface SoloJoinPayload {
  tripId: string;
  ownerId: string;
  tripName: string;
  requesterName: string;
  message: string;
}
export interface InitJoinPayload {
  tripId: string;
  requesterName: string;
  ownerId: string;
  tripName: string;
  travellerCount: number;
}
export interface TravellerProfile {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
}

export interface NewTravellerPayload {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  nationality: string;
  travellerType: string;
  isDefault: boolean;
}

export interface SelectedTraveller {
  travellerProfileId: string;
  name: string;
  dob: string;
  gender: string;
  nationality: string;
  travellerType: string;
}

export interface JoinResponse {
  id: string;
  message: string;
}

/* ================= AXIOS INSTANCE ================= */

/**
 * We are enabling 'withCredentials' because your AuthContext 
 * uses cookie-based sessions. This ensures the session cookie 
 * is sent with every request to the Yaarigo microservices.
 */
const tripJoinAPI = axios.create({
  baseURL: "https://api.dev.yaarigo.com",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

/* NOTE: Manual localStorage interceptor is removed because 
  withCredentials automatically handles the session token 
  via browser cookies.
*/
tripJoinAPI.interceptors.request.use(
  (config) => {
    // 1. Find the token
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
    // 2. Attach it if it exists
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/* ================= API CALLS ================= */

export const joinSoloTrip = async (data: SoloJoinPayload): Promise<JoinResponse> => {
  // Path uses 'enggagement-service' as per your network logs
  const res = await tripJoinAPI.post("/enggagement-service/trip-join/solo", data);
  return res.data;
};

// Add this to your joinTripApi.ts
export const initTripJoin = async (payload: InitJoinPayload): Promise<{ id: string }> => {
  // Use the exact path from your Swagger curl
  const res = await tripJoinAPI.post("/enggagement-service/trip-join/init", payload);
  return res.data;
};
export const getTravelerProfiles = async (): Promise<TravellerProfile[]> => {
  const res = await tripJoinAPI.get<TravellerProfile[]>("/booking-service/traveler-profiles");
  return res.data;
};

export const createTravelerProfile = async (data: NewTravellerPayload): Promise<TravellerProfile> => {
  const res = await tripJoinAPI.post("/booking-service/traveler-profiles", data);
  return res.data;
};

export const addTravellersToTrip = async (
  joinId: string,
  travellers: SelectedTraveller[]
): Promise<any> => {
  // WRAP THE ARRAY: Change 'travellers' to '{ travellers }'
  const res = await tripJoinAPI.post(
    `/enggagement-service/trip-join/${joinId}/travellers`, 
    { travellers } 
  );
  return res.data;
};
export const submitJoinRequest = async (
  joinId: string,
  message: string
): Promise<any> => {

  const res = await tripJoinAPI.post(
    `/enggagement-service/trip-join/${joinId}/submit`,
    { message }
  );

  return res.data;
};