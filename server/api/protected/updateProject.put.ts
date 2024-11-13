import { db } from "#imports";
import { projectTable } from "~/database/schema";
import fs from "node:fs";

export default defineEventHandler(async (event) => {
  // read the authorization header
  const authorization = event.headers.get("Authorization");
  if (!authorization) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  
});