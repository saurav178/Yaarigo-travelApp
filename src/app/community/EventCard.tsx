import { FC } from "react";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";

interface EventProps {
  title: string;
  subtitle: string;
  image: string;
  date?: string;
  location?: string;
}

const EventCard: FC<EventProps> = ({
  title,
  subtitle,
  image,
  date,
  location,
}) => {
  return (
    <div className="w-[260px] flex-shrink-0 bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <Image
        src={image}
        alt={title}
        width={400}
        height={176}
        className="w-[400px] h-44 object-cover"
      />

      {/* Content */}
      <div className="p-3 bg-gray-100">
        <h4 className="font-semibold text-lg text-gray-800 mb-1">{title}</h4>

        <p className="text-sm text-gray-600 mb-2">{subtitle}</p>

        {/* Details stacked column wise */}
        <div className="flex flex-col gap-1 text-sm text-gray-700">
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>{location}</span>
            </div>
          )}

          {date && (
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-amber-600" />
              <span>{date}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
