export default defineNuxtRouteMiddleware(async () => {
  const cookie = useCookie('token');

  if (cookie.value) {
      const isValid = await useJWT(cookie.value);
      const now = Math.floor(Date.now() / 1000);

      if (!isValid || !isValid.payload || (isValid.payload.exp && isValid.payload.exp < now)) {
        return ('/admin/login');
      } else {
        return;
      }
  } else {
    const userCount = await $fetch('/api/usercount');
    if (userCount >= 1) {
        return ('/admin/login');
    } else {
        return;
    }
  }
});