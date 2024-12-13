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

  sitemap: {
    sitemapsPathPrefix: "/sitemap",
    sitemaps: {
      pages: {
        includeAppSources: true,
      },
      projects: {
        sources: ["/api/__sitemap__/urls"],
      },
    },
  },

  robots: {
    disallow: ["/admin/**"],
    blockNonSeoBots: true,
    blockAiBots: true,
  },

  site: {
    url: "https://maxencelallemand.fr",
    name: "Portfolio - Maxence Lallemand",
  },

  app: {
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },

  runtimeConfig: {
    JWT_SECRET: "",
    ADMIN_PASSWORD: "",
  },

  nitro: {
    storage: {
      content: {
        driver: "fs",
        base: "./public/content",
      },
    },
    publicAssets: [
      {
        dir: "./public/content",
        maxAge: 60 * 60 * 24 * 365,
      },
    ],
  },

  modules: ["@nuxt/fonts", "@nuxt/icon", "@vueuse/nuxt", "@nuxtjs/seo"],
});