export const ROUTES = {
  LANDING_PAGE: "/",
  TRIP_DETAILS: "/TripViewDetails",
  VIEW_PROFILE: "/profileAgency",
  USER_PROFILE: "/profile",
  PROFILE_LEADER: "/leaderProfile",
  LOGIN: "/auth/login",
  VERIFICATION : "/verification",
  BACKLOGIN : "/register",
  PROFILESETUP : "/profilesetup",
  DASHBOARD : "/dashboard",
  USERPROFILE : "/userProfile",
  COMMUNITY_PAGE : "/community",
  VIEW_PACKAGE: "/viewPackage",
   TRIP_DETAILS_WITH_ID: (tripId: string) => `/TripViewDetails/${tripId}`,
};

