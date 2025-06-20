import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: "mdi",
    },
    theme: {
      defaultTheme: "light",
      themes: {
        dark: {
          dark: true,
          colors: {
            background: "#121212",
            surface: "#1E1E1E",
            primary: "#1E88E5",
            secondary: "#03DAC6",
            error: "#CF6679",
          },
        },
        light: {
          dark: false,
          colors: {
            background: "#FAFAFA",
            surface: "#F2F2F2",
            primary: "#1E88E5",
            secondary: "#03DAC6",
            error: "#B00020",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
