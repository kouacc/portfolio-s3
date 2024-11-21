import { useJWT } from "~/composables/useJWT";

export default defineNuxtRouteMiddleware(async () => {
  const cookie = useCookie('token');

  if (!cookie.value) {
    return navigateTo('/admin/login');
  }

  const isValid = await useJWT(cookie.value);
  const now = Math.floor(Date.now() / 1000);

  console.log(isValid)
  
  if (!isValid || !isValid.payload || (isValid.payload.exp && isValid.payload.exp < now)) {
    return ('/admin/login');
  } 

  return;
});
