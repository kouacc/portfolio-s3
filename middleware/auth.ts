import { verifyJWT } from "../utils/jwt";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // get the HTTP Authorization header
  const headers = await useRequestHeaders();
  if (!headers.cookie) {
    console.log('No token found');
    return navigateTo("/admin/login");
  }

  let authorization = headers.cookie;
  const token = authorization.split("token=")[1];
  
  const isValid = await verifyJWT(token);
  
  //get the current unix timestamp
  const now = Math.floor(Date.now() / 1000);
  

  if (!isValid || !isValid.payload) {
    console.log('Invalid token');
    return abortNavigation()
  } else {
    if (isValid.payload.exp && isValid.payload.exp < now) {
      return abortNavigation();
    }
  }

  return;

  
});
