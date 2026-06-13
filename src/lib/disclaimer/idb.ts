import { openDB } from "idb";

const DB_NAME = "GecianHubDB";
const STORE_NAME = "userPreferences";
const DISCLAIMER_KEY = "disclaimerSeen";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "key",
        });
      }
    },
  });
}

/**
 * Check if the user has seen the disclaimer
 * @returns true if the user has seen the disclaimer, false otherwise
 */
export async function hasSeenDisclaimer(): Promise<boolean> {
  try {
    const db = await getDB();
    const result = await db.get(STORE_NAME, DISCLAIMER_KEY);
    return result?.value === true;
  } catch (error) {
    console.error("Error checking disclaimer status:", error);
    return false;
  }
}

/**
 * Mark the disclaimer as seen by the user
 */
export async function markDisclaimerAsSeen(): Promise<void> {
  try {
    const db = await getDB();
    await db.put(STORE_NAME, {
      key: DISCLAIMER_KEY,
      value: true,
    });
  } catch (error) {
    console.error("Error marking disclaimer as seen:", error);
  }
}


