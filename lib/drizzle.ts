import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../db/schema";

const sql = postgres(process.env.DATABASE_URL || "");
const db = drizzle(sql, { schema });

export { db };
