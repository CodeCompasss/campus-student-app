// src/app/events/[id]/route.ts

import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a new pool instance (best practice: one instance per route file/serverless invocation)
const pool = new Pool({
  connectionString: process.env.EVENT_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Helper: convert binary image to base64 Data URL
function processEventImage(event: any) {
  if (!event.image_data) return { ...event, imageData: null };

  try {
    const buffer = Buffer.isBuffer(event.image_data)
      ? event.image_data
      : Buffer.from(event.image_data as unknown as ArrayBuffer);

    const base64Image = buffer.toString("base64");
    const mimeType = event.image_mime_type || "image/jpeg";

    return {
      ...event,
      imageData: `data:${mimeType};base64,${base64Image}`,
      imageMimeType: mimeType,
    };
  } catch (error) {
    console.error("Error processing image:", error);
    return { ...event, imageData: null, imageMimeType: null };
  }
}

// Main GET route handler for /events/[id]
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const client = await pool.connect();

  try {
    console.log("Fetching event with ID:", id);

    // Detect UUID (canonical format)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isUuid = uuidRegex.test(id);

    let result;

    if (isUuid) {
      // Direct query by UUID
      result = await client.query("SELECT * FROM events WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
    } else {
      // If not a UUID, lookup by slug or slugified title
      const slug = id.toLowerCase();
      result = await client.query(
        `SELECT * FROM events
         WHERE LOWER(slug) = $1 
         OR LOWER(REGEXP_REPLACE(REPLACE(title, ' ', '-'), '[^\\w-]', '', 'g')) = $1
         LIMIT 1`,
        [slug]
      );
      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
    }

    const event = result.rows[0];
    const processedEvent = processEventImage(event);

    // Format the response for frontend consumption
    const formattedEvent = {
      id: processedEvent.id,
      slug:
        processedEvent.slug ||
        processedEvent.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      title: processedEvent.title,
      description: processedEvent.description,
      venue: processedEvent.venue,
      date: processedEvent.date,
      time: processedEvent.time,
      image: processedEvent.imageData,
      imageMimeType: processedEvent.imageMimeType,
    };

    return NextResponse.json(formattedEvent);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
