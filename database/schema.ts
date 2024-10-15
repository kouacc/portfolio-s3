import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql, type InferSelectModel } from "drizzle-orm";

export const projectTable = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  year: integer("year").notNull(),
  status: text("status", {
    enum: ["Terminé", "En cours", "En pause", "Abandonné"],
  })
    .notNull()
    .default("En cours"),
  repository_link: text("repository_link"),
  tools: text("tools", { mode: "json" })
    .notNull()
    .default(sql`'[]'`),
  created_at: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  modified_at: text("modified_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const userTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").notNull(),
  password_hash: text("password_hash").notNull(),
  created_at: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  modified_at: text("modified_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export type Project = InferSelectModel<typeof projectTable>;
export type User = InferSelectModel<typeof userTable>;

