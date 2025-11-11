import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@shared/schema";

function buildPool() {
  const databaseUrl = process.env.DATABASE_URL;
  const fallbackHost = process.env.DB_HOST;

  // Detect if SSL is likely required (Hostinger, managed MySQL, or explicit flag)
  const explicitSsl =
    (process.env.DB_SSL || "").toLowerCase() === "true" ||
    (process.env.MYSQL_SSL || "").toLowerCase() === "true";

  const needsSsl = explicitSsl;

  try {
    if (databaseUrl) {
      // Parse URL so we can inject SSL reliably (URL query ssl param with JSON is fragile)
      const u = new URL(databaseUrl);
      const host = u.hostname;
      const port = u.port ? parseInt(u.port, 10) : 3306;
      const user = decodeURIComponent(u.username);
      const password = decodeURIComponent(u.password);
      const database = u.pathname.replace(/^\//, "");

      const pool = mysql.createPool({
        host,
        port,
        user,
        password,
        database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        ssl: needsSsl
          ? {
              rejectUnauthorized: true,
              minVersion: "TLSv1.2",
            }
          : undefined,
      });

      return pool;
    }

    if (fallbackHost) {
      const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
      const user = process.env.DB_USER || "";
      const password = process.env.DB_PASSWORD || "";
      const database = process.env.DB_NAME || "";

      const pool = mysql.createPool({
        host: fallbackHost,
        port,
        user,
        password,
        database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        ssl: needsSsl
          ? {
              rejectUnauthorized: true,
              minVersion: "TLSv1.2",
            }
          : undefined,
      });

      return pool;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to initialize MySQL pool:", err);
  }

  // eslint-disable-next-line no-console
  console.error(
    "DATABASE_URL or DB_HOST is not set. MySQL connection pool was not created."
  );
  return null;
}

// Create MySQL connection pool from env (supports SSL)
export const pool = buildPool();

// Create Drizzle instance only if pool exists
export const db = pool ? drizzle(pool, { schema, mode: "default" }) : null;
