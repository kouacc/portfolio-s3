import { drizzle } from "drizzle-orm/connect";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { defineConfig } from 'drizzle-kit';

export const db = await drizzle('libsql', './database.db');

const projectTable = sqliteTable('projects', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    content: text('content').notNull(),
    year: integer('year').notNull(),
    status: text('status', { enum: ['Terminé', 'En cours', 'En pause', 'Abandonné'] }).notNull().default('En cours'),
    repository_link: text('repository_link'),
    tools: text('tools', { mode: 'json' }).notNull().default(sql`'[]'`),
    created_at: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
    modified_at: text('modified_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

const userTable = sqliteTable('users', {
    id: integer('id').primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    created_at: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
    modified_at: text('modified_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
})

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/schema.ts",
});