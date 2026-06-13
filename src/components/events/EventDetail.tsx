"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import type { EventItem } from "@/app/events/[id]/page";

const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return 'Date not specified';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
};

interface EventDetailProps {
  event: EventItem;
}

export default function EventDetail({ event }: EventDetailProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </button>
      </div>

      {/* Event Content */}
      <div className="container mx-auto px-4 pb-16 max-w-5xl">
        {/* Event Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          {/* Event Image */}
          <div className="relative w-full h-64 md:h-96 bg-gray-100">
            {event.image ? (
              <img 
                src={event.image || ''} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
                <span className="text-gray-400 text-lg">No image available</span>
              </div>
            )}
          </div>

          {/* Event Info */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{event.title}</h1>
            
            {/* Meta Information */}
            <div className="grid gap-4 md:grid-cols-2 mb-8">
              <div className="flex items-start">
                <div className="bg-blue-50 p-3 rounded-lg mr-4">
                  <CalendarDays className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date & Time</h3>
                  <p className="text-gray-900 font-medium">
                    {formatDate(event.date)}
                    {event.time && (
                      <span className="block text-gray-600 text-sm font-normal mt-1">
                        <Clock className="w-4 h-4 inline-block mr-1 -mt-0.5" />
                        {event.time}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-50 p-3 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Location</h3>
                  <p className="text-gray-900 font-medium">{event.venue || 'Location not specified'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Event</h3>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {event.description ? (
                  <p className="whitespace-pre-line">{event.description}</p>
                ) : (
                  <p className="text-gray-500 italic">No description available for this event.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
