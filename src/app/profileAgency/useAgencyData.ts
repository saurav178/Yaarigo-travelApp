import { useEffect, useState } from "react";

export default function useAgencyData() {
  const [data, setData] = useState<any>(null);
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
