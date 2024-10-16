import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
export { eq, lt, gte, ne } from "drizzle-orm";
import * as schema from '../../database/schema';

export const sqlite = new Database('./database/database.db');
export const db = drizzle(sqlite, { schema: schema });