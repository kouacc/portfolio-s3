import { db } from "../../utils/orm";
import { projectTable } from "~/database/schema";

export default defineEventHandler(async (event) => {
  const projects = await db.query.projectTable.findMany({
    columns: {
      id: true,
      title: true,
      year: true,
      created_at: true,
    }
  });
  return projects;
});
