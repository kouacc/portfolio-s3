import { db } from "#imports";
import { projectTable } from "~/database/schema";
import { useAuthorization } from "~/server/composables/useAuthorization";

export default defineEventHandler(async (event) => {
  // read the authorization header
  const authorization = event.headers.get("Authorization");
  if (!authorization || !(await useAuthorization(authorization))) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  // read the JSON file from the request body
  const json = await readBody<typeof projectTable.$inferInsert>(event)
  // check if the json exists and if it's valid with the projectsTable
  if (!json || !json.title || !json.content || !json.created_at || !json.modified_at) {
    return {
      status: 400,
      body: "Invalid JSON",
    };
  }

  await db.insert(projectTable)
  .values(json)
  .onConflictDoNothing()
});
