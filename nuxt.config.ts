// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  /* experimental: {
    viewTransition: true
  }, */

  runtimeConfig: {
    JWT_SECRET: '',
    ADMIN_PASSWORD: ''
  },

  nitro: {
    storage: {
      content: {
        driver: 'fs',
        base: './public/content'
      }
    }
  },

  modules: ["@nuxt/fonts", "@nuxt/icon", "@vueuse/nuxt"],
});