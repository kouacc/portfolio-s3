import { db } from "#imports";
import { projectTable } from "~/database/schema";
import fs from "node:fs";
import { useAuthorization } from "~/server/composables/useAuthorization"

export default defineEventHandler(async (event) => {
  // read the authorization header
  const authorization = event.headers.get("Authorization");
  if (!authorization || !await useAuthorization(authorization)) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const id = Number(getRouterParam(event, "id"));

  await db.delete(projectTable).where(eq(projectTable.id, id));

  //delete files from fs
  const dirPath = `./public/content/${id}`;
    if (fs.existsSync(dirPath)) {
        fs.rmdirSync(dirPath, { recursive: true });
    }

    return {
        status: 202, 
    };
});
