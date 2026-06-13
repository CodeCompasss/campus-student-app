import { NextResponse } from "next/server";
import db from "@/lib/db";

// Helper function to convert binary image to base64 data URL
function processEventImage(event: any) {
  if (!event.image_data) return { ...event, imageData: null };
  
  try {
    const buffer = Buffer.isBuffer(event.image_data) 
      ? event.image_data 
      : Buffer.from(event.image_data as unknown as ArrayBuffer);
    
    const base64Image = buffer.toString('base64');
    const mimeType = event.image_mime_type || 'image/jpeg';
    
    return {
      ...event,
      imageData: `data:${mimeType};base64,${base64Image}`,
      imageMimeType: mimeType
    };
  } catch (error) {
    console.error('Error processing image:', error);
    return { ...event, imageData: null, imageMimeType: null };
  }
}

export async function GET() {
  try {
    const client = await db.connect();
    try {
      const result = await client.query('SELECT * FROM events ORDER BY created_at DESC');
      
      const events = result.rows.map(event => {
        const processedEvent = processEventImage(event);
        return {
          id: processedEvent.id,
          slug: processedEvent.slug || processedEvent.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
          title: processedEvent.title,
          description: processedEvent.description,
          venue: processedEvent.venue,
          date: processedEvent.date,
          time: processedEvent.time,
          image: processedEvent.imageData,
          imageMimeType: processedEvent.imageMimeType
        };
      });
      
      return NextResponse.json(events);
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error("Error fetching events:", err);
    return NextResponse.json(
      { error: "Failed to fetch events: " + (err.message || 'Unknown error') },
      { status: 500 }
    );
  }
}
