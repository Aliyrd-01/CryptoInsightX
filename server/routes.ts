import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
import MemoryStore from "memorystore";
import { storage } from "./storage";
import { insertUserSchema, loginSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import { pool } from "./db";

const MySQLStore = MySQLStoreFactory(session);
const MemoryStoreSession = MemoryStore(session);

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  const sessionStore = pool
    ? new MySQLStore({}, pool as any)
    : new MemoryStoreSession({
        checkPeriod: 86400000,
      });

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "crypto-analyzer-secret-key-change-in-production",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );

  // --- Register ---
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);

      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) return res.status(400).json({ error: "User with this email already exists" });

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      const user = await storage.createUser({
        ...validatedData,
        password_hash: hashedPassword,
      });

      // Устанавливаем сессию сразу
      req.session.userId = user.id;

      const { password_hash, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Invalid registration data" });
    }
  });

  // --- Login ---
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) return res.status(401).json({ error: "Invalid email or password" });

      const isValidPassword = await bcrypt.compare(validatedData.password, user.password_hash);
      if (!isValidPassword) return res.status(401).json({ error: "Invalid email or password" });

      req.session.userId = user.id;

      const { password_hash, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ error: "Invalid login data" });
    }
  });

  // --- Logout ---
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Failed to logout" });
      res.json({ message: "Logged out successfully" });
    });
  });

  // --- Current user ---
  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const user = await storage.getUser(req.session.userId);
    if (!user) return res.status(401).json({ error: "User not found" });

    const { password_hash, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  return createServer(app);
}
