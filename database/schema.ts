import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";
import { sql, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

export const projectTable = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  year: text("year").notNull(),
  status: text("status", {
    enum: ["Terminé", "En cours", "En pause", "Abandonné"],
  })
    .notNull()
    .default("En cours"),
  repository_link: text("repository_link"),
  tools: text("tools", { mode: "json" })
    .notNull()
    .default(sql`'[]'`),
  cover: text("cover"),
  images: text("images", { mode: "json" }).default(sql`'[]'`),
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
  name: text('name').notNull(),
  password_hash: blob("password_hash", { mode: 'buffer'}).notNull(),
  salt: blob("salt", { mode: 'buffer'}).notNull(),
  created_at: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  modified_at: text("modified_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const contactTable = sqliteTable("contact_forms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  created_at: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
})

export type Project = InferSelectModel<typeof projectTable>;
export type User = InferSelectModel<typeof userTable>;
export type Contact = InferInsertModel<typeof contactTable>;
export type ContactSelect = InferSelectModel<typeof contactTable>;

