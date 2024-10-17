import { verifyJWT } from "../utils/jwt";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // get the HTTP Authorization header
  const headers = await useRequestHeaders();
  let authorization = headers.cookie;
  console.log(authorization);
  /* if (!authorization) {
    return navigateTo("/admin/login");
  } */

  
});
