"use client";

import { useState } from "react";
import TripCard from "./TripsCard";
import Package from "./Package";
import Pagination from "./Pagination";

interface CombinedContentProps {
  trips: any[];
  packages: any[];
}

const TRIPS_PER_PAGE = 10;
const PACKAGES_PER_PAGE = 20;
const TRIPS_PER_BLOCK = 2;
const PACKAGES_PER_BLOCK = 4;

export default function CombinedContent({ trips, packages }: CombinedContentProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate items for current page
  const startTripIndex = (currentPage - 1) * TRIPS_PER_PAGE;
  const endTripIndex = startTripIndex + TRIPS_PER_PAGE;
  const startPackageIndex = (currentPage - 1) * PACKAGES_PER_PAGE;
  const endPackageIndex = startPackageIndex + PACKAGES_PER_PAGE;

  const pageTrips = trips.slice(startTripIndex, endTripIndex);
  const pagePackages = packages.slice(startPackageIndex, endPackageIndex);

  // Create alternating blocks: 2 trips → 4 packages → 2 trips → 4 packages → ...
  const blocks: Array<{ type: 'trips' | 'packages'; items: any[] }> = [];
  let tripIndex = 0;
  let packageIndex = 0;
  let isTripsTurn = true; // Start with trips

  while (tripIndex < pageTrips.length || packageIndex < pagePackages.length) {
    if (isTripsTurn && tripIndex < pageTrips.length) {
      // Add 2 trips block
      const remainingTrips = pageTrips.length - tripIndex;
      const tripsToTake = Math.min(TRIPS_PER_BLOCK, remainingTrips);
      blocks.push({
        type: 'trips',
        items: pageTrips.slice(tripIndex, tripIndex + tripsToTake)
      });
      tripIndex += tripsToTake;
    } else if (!isTripsTurn && packageIndex < pagePackages.length) {
      // Add 4 packages block
      const remainingPackages = pagePackages.length - packageIndex;
      const packagesToTake = Math.min(PACKAGES_PER_BLOCK, remainingPackages);
      blocks.push({
        type: 'packages',
        items: pagePackages.slice(packageIndex, packageIndex + packagesToTake)
      });
      packageIndex += packagesToTake;
    }

    // Alternate turns
    isTripsTurn = !isTripsTurn;

    // If we can't add the current type, try the other type
    if (isTripsTurn && tripIndex >= pageTrips.length && packageIndex < pagePackages.length) {
      isTripsTurn = false;
    } else if (!isTripsTurn && packageIndex >= pagePackages.length && tripIndex < pageTrips.length) {
      isTripsTurn = true;
    }
  }

  const totalPages = Math.ceil(Math.max(trips.length / TRIPS_PER_PAGE, packages.length / PACKAGES_PER_PAGE));

  return (
    <div>
      {blocks.map((block, index) => (
        <div key={index} className="mb-8">
          {block.type === 'trips' && block.items.length > 0 && (
            <TripCard trips={block.items} />
          )}
          {block.type === 'packages' && block.items.length > 0 && (
            <Package packages={block.items} />
          )}
        </div>
      ))}

      {totalPages >= 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(totalPages, 3)} // Show at least 3 pages for demonstration
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
