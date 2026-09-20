import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { pool } from '../config/db';

async function migrate(): Promise<void> {
  const migrationsDir = path.join(__dirname, '../../migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  const client = await pool.connect();
  try {
    // Create migrations tracking table
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    for (const file of files) {
      const applied = await client.query('SELECT id FROM _migrations WHERE filename = $1', [file]);
      if (applied.rows.length > 0) {
        console.log(`[migrate] Skipping ${file} (already applied)`);
        continue;
      }
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
      console.log(`[migrate] Applying ${file}…`);
      await client.query(sql);
      await client.query('INSERT INTO _migrations (filename) VALUES ($1)', [file]);
      console.log(`[migrate] ✅ ${file} applied`);
    }
    console.log('\n[migrate] All migrations complete.\n');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(err => { console.error('[migrate] Failed:', err); process.exit(1); });
