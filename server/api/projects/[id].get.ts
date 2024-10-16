import { db } from "../../utils/orm";
import { projectTable } from "~/database/schema";
import { eq } from "../../utils/orm";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request"
        })
    }

  const project = await db.select().from(projectTable).where(eq(projectTable.id, id));
  return project;
});
