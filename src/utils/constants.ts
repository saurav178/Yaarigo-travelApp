import { config } from "@/utils/env";

export const API_BASE_URL = config.API_BASE_URL;

export const API_ENDPOINTS = {
  PACKAGES: `${API_BASE_URL}/packages`,
  LOCATION_SEARCH: "/api/location",
};

export const APP_ROUTES = {
  SEARCH_TRIP: "/searchtrip",
  VIEW_PACKAGE: "/viewPackage",
  PROFILE: "/profile",
};
