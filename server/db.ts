import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@shared/schema";

// Create MySQL connection pool only if DATABASE_URL is provided
export const pool = process.env.DATABASE_URL 
  ? mysql.createPool(process.env.DATABASE_URL)
  : null;

// Create Drizzle instance only if pool exists
export const db = pool ? drizzle(pool, { schema, mode: "default" }) : null;
