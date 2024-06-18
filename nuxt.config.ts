export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 3000,
  },
  auth: {
    globalAppMiddleware: true,
    baseURL: 'https://laptops.ithub-rostov.ru/api/auth'
  },
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth", "@nuxtjs/google-fonts"],

  tailwindcss: {
    exposeConfig: true,
  },

  googleFonts: {
    families: {
      Montserrat: true,
    },
    download: true,
    preconnect: true,
    prefetch: true,
    preload: true,
  },

  colorMode: {
    classSuffix: "",
  },

  typescript: {
    shim: false,
  },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
    ],
  },

  app: {
    head: {
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js",
          defer: true,
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js",
          defer: true,
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.png" }],
    },
  },
});
