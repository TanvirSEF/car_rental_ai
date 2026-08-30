/**
 * One-time (or reset) database setup: runs supabase/schema.sql + supabase/seed.sql
 * through the self-hosted Supabase pg-meta API (same engine Studio's SQL editor uses).
 *
 * Usage:  node scripts/db-setup.mjs
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// load .env manually (no dotenv dependency needed for a setup script)
for (const line of readFileSync(join(root, ".env"), "utf8").split(/\r?\n/)) {
  if (!line.includes("=") || line.startsWith("#")) continue;
  const idx = line.indexOf("=");
  process.env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
}

const base = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!base || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

async function runSql(label, file) {
  const sql = readFileSync(join(root, file), "utf8");
  const res = await fetch(`${base}/pg/query`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  const body = await res.text();
  if (!res.ok) {
    console.error(`✗ ${label} failed (${res.status}):`, body.slice(0, 500));
    process.exit(1);
  }
  console.log(`✓ ${label} applied`);
}

async function verify() {
  const res = await fetch(`${base}/pg/query`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query:
        "select (select count(*) from public.cars) as cars, (select count(*) from public.bookings) as bookings",
    }),
  });
  const rows = await res.json();
  console.log(`✓ verify — cars: ${rows[0].cars}, bookings: ${rows[0].bookings}`);
}

await runSql("schema.sql", "supabase/schema.sql");
await runSql("seed.sql", "supabase/seed.sql");
await verify();
console.log("Done.");
