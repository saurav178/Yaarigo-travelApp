// AgencyCarousel

"use client";

import AgencyCard from "./AgencyCard";
import type { Agency } from "../types/types";
import { AGENCIES_DEMO } from "../data/data";

type Props = { agencies?: Agency[] };

export default function AgencyCarousel({ agencies = AGENCIES_DEMO }: Props) {
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
