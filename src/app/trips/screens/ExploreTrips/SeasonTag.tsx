import { CheckCircle, Clock, XCircle } from "lucide-react";

interface SeasonTagProps {
  season: string;
}

export default function SeasonTag({ season }: SeasonTagProps) {
  const config = {
    "Best Time to Visit": {
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      tooltip: "Best Time to Visit (Highly Recommended)",
    },
    "Okay to Visit": {
      icon: <Clock className="w-4 h-4 text-yellow-500" />,
      tooltip: "Okay to Visit (Manageable but Busy)",
    },
    "Too Crowded": {
      icon: <XCircle className="w-4 h-4 text-red-500" />,
      tooltip: "Too Crowded (Avoid if Possible)",
    },
  };

  const { icon, tooltip } = config[season] || {};

  return (
    <span
      className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-black"
      title={tooltip}
    >
      {icon}
      <span className="hidden sm:inline">{season}</span>
    </span>
  );
}
