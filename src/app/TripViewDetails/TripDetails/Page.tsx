import TripDetailsPage from "./TripDetailsPage";
import TripDetails from "../triphighlight/TripDetails";

interface PageProps {
  params: {
    tripId: string;
  };
}

export default function Page({ params }: PageProps) {
  const { tripId } = params;

  return (
    <div className="relative min-h-screen overflow-visible">
      <TripDetailsPage tripId={tripId} />
      <TripDetails />
    </div>
  );
}