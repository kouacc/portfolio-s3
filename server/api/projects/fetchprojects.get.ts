import { db } from "../../utils/orm";
import { projectTable } from "~/database/schema";

export default defineEventHandler(async (event) => {
  const projects = await db.select().from(projectTable).all();
  return projects;
});
