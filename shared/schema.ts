import { sql } from "drizzle-orm";
import { mysqlTable, varchar, text, datetime } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  plan: text("plan").default("free"),
});

// --- Важно: исключаем system-поля и password_hash ---
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_at: true,
  password_hash: true,
}).extend({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
