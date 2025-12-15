import { useEffect, useState } from "react";

interface Agency {
  logo?: string;
  image?: string;
  name: string;
  rating?: number;
  trips?: number;
}

interface AgencyData {
  hero?: unknown;
  stats?: unknown;
  about?: unknown;
  upcomingTrips?: unknown[];
  pastTrips?: unknown[];
  reviews?: unknown[];
  travelPhotos?: string[];
  similarAgencies?: Agency[];
  contactInfo?: unknown;
  trustSafety?: unknown[];
}

export default function useAgencyData() {
  const [data, setData] = useState<AgencyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("../profileAgency/api/agencyData");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching agency data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
}