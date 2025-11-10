console.log("DB type:", typeof db?.select);

import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { User } from "@shared/schema";

export const storage = {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db
      ?.select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result?.[0];
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db
      ?.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result?.[0];
  },

  async createUser(data: {
    email: string;
    password_hash: string;
    plan?: string;
  }): Promise<User> {
    const [newUser] = await db
      ?.insert(users)
      .values({
        email: data.email,
        password_hash: data.password_hash,
        plan: data.plan ?? "free",
      })
      .returning();

    return newUser!;
  },
};
