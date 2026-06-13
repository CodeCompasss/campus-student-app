// src/lib/db/schema.ts
import { pgTable, text, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { customType } from 'drizzle-orm/pg-core';

// Custom bytea type for binary data
const bytea = customType<{ data: Buffer }>({
  dataType() {
    return 'bytea';
  },
  toDriver(value: Buffer): Buffer {
    return value;
  },
  fromDriver(value: unknown): Buffer {
    if (Buffer.isBuffer(value)) {
      return value;
    }
    if (value instanceof Uint8Array) {
      return Buffer.from(value);
    }
    throw new Error('Expected Buffer or Uint8Array');
  },
});

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  venue: varchar('venue', { length: 255 }),
  date: timestamp('date', { mode: 'date' }),
  time: varchar('time', { length: 50 }),
  imageData: bytea('image_data'),
  imageMimeType: varchar('image_mime_type', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Event = typeof events.$inferSelect;
