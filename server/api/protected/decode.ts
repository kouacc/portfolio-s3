import { verifyJWT } from "~/utils/jwt";

export default defineEventHandler(async (event) => {
  // read the authorization header
  const authorization = event.headers.get("Authorization");
  if (!authorization) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  return verifyJWT(authorization)
});
