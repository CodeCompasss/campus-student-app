// app/events/[id]/page.tsx
import { notFound } from "next/navigation";
import db from "@/lib/db";
import EventDetail from "@/components/events/EventDetail";

export interface EventItem {
  id: string;
  slug?: string | null;
  title: string;
  description: string;
  venue: string;
  date: string | Date | null;
  time: string | null;
  image_data?: Buffer | null;
  image_mime_type?: string | null;
  image?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Convert binary image to base64
function processEventImage(event: EventItem): EventItem {
  if (!event.image_data) return { ...event, image: null };
  const base64 = Buffer.from(event.image_data).toString("base64");
  return {
    ...event,
    image: `data:${event.image_mime_type || "image/jpeg"};base64,${base64}`,
  };
}

async function getEvent(id: string): Promise<EventItem | null> {
  const client = await db.connect();
  try {
    const result = await client.query("SELECT * FROM events WHERE id = $1", [id]);
    if (result.rows.length === 0) return null;
    return processEventImage(result.rows[0]);
  } finally {
    client.release();
  }
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await getEvent(id);
  
  if (!event) return notFound();

  // Ensure all dates are proper Date objects
  const processedEvent = {
    ...event,
    date: event.date ? new Date(event.date) : null,
    time: event.time || null,
    createdAt: event.createdAt ? new Date(event.createdAt) : new Date(),
    updatedAt: event.updatedAt ? new Date(event.updatedAt) : new Date(),
  };

  return <EventDetail event={processedEvent} />;
}
