import Link from "next/link";
import { CalendarDays, MapPin, Clock } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description?: string | null;
    venue?: string | null;
    date?: Date | null;
    time?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "Date not specified";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time: string | null | undefined) => {
    if (!time) return "";
    return time;
  };

  return (
    <Link
      href={`/events/${event.id}`}
      className="block group h-full cursor-pointer"
    >
      <div className="h-full bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group-hover:shadow-lg hover:border-blue-100">
        <div className="p-6 flex flex-col h-full">
          {/* Header with Title */}
          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {event.title}
            </h2>
          </div>

          {/* Event Details */}
          <div className="space-y-4 mb-4">
            {/* Date and Time */}
            {(event.date || event.time) && (
              <div className="flex items-start">
                <div className="bg-blue-50 p-2 rounded-lg mr-3">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    When
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    {event.date && (
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(event.date)}
                      </span>
                    )}
                    {event.time && (
                      <span className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" />
                        {formatTime(event.time)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Venue */}
            {event.venue && (
              <div className="flex items-start">
                <div className="bg-green-50 p-2 rounded-lg mr-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Where
                  </h4>
                  <p className="text-sm text-gray-700">{event.venue}</p>
                </div>
              </div>
            )}
          </div>

          {/* Expanded Description */}
          <div className="mt-2 flex-grow">
            {event.description ? (
              <p className="text-sm text-gray-600 line-clamp-5">
                {event.description}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">No description available</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
