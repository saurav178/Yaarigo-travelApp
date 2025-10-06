export default function AvailabilityBadge({ status }) {
  const colors = {
    Available: "bg-green-100 text-green-700",
    Limited: "bg-yellow-100 text-yellow-700",
    "Fully Booked": "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}
    >
      {status}
    </span>
  );
}
