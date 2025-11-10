import { sql } from "drizzle-orm";
import { mysqlTable, varchar, text, datetime } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Таблица user
export const users = mysqlTable("user", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  plan: text("plan").default("free"),
});

// Схема для вставки пользователя (без id, created_at, plan)
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_at: true,
  plan: true,
});

// Схема для логина
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Типы
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
