import { Suspense } from 'react';
import SearchTripClient from "./SearchTripClient";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading search filters...</div>
      </div>
    }>
      <SearchTripClient />
    </Suspense>
  );
}