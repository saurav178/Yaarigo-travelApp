// AgencyCarousel

"use client";

import AgencyCard from "./AgencyCard";
import type { Agency } from "../types/types";

type Props = { 
  agencies: Agency[]; // Changed: No default value
};
export default function AgencyCarousel({ agencies}: Props) {
  return (
    <div className="flex flex-col gap-3 w-full   mx-auto">
      {agencies.map((agency) => (
        <div key={agency.id} className="w-full">
          <AgencyCard agency={agency} />
        </div>
      ))}
    </div>
  );
}