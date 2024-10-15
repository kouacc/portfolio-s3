import { db } from "../utils/orm";

export default defineEventHandler(async (event) => {
  const projects = await db.projects.findMany();
  return projects.data;
});
