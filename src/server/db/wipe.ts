import { conn, db } from '~/server/db/index';
import { ALL_TABLES } from './schema';

async function wipeDatabase() {
  console.log('Wiping database...');

  for (const table of ALL_TABLES) {
    await db.delete(table);
  }

  console.log('Database wiped successfully.');

  // Close the database connection
  await conn.end();
}

wipeDatabase().catch(console.error);
