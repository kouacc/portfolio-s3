import { db } from "#imports";
import { useAuthorization } from "~/server/composables/useAuthorization";

export default defineEventHandler(async (event) => {
  // read the authorization header
  const authorization = event.headers.get('Authorization');
  if (!authorization || !(await useAuthorization(authorization))) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const forms_response = await db.query.contactTable.findMany()
  return forms_response
});
