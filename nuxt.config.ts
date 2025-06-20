// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "@/assets/scss/tailwind.scss",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  build: {
    transpile: ["vuetify"],
  },
  tailwindcss: {
    cssPath: "~/assets/scss/tailwind.scss",
    configPath: "tailwind.config.ts",
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    ssr: {
      noExternal: ["vuetify"],
    },
  },
  pinia: {
    storesDirs: ["./stores/**", "./src/**"],
  },

  runtimeConfig: {
    public: {
      defaultTheme: "light", //client-side for toggling themes
    },
  },
});
