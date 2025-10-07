"use client";

interface DestinationBadgeProps {
  destination: string;
}

export default function DestinationBadge({ destination }: DestinationBadgeProps) {
  return (
    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      {destination}
    </span>
  );
}
