// lib/db.ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.EVENT_DATABASE_URL, // from Neon
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
