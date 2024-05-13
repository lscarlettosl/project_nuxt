export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 5000,
  },

  // auth: {
  //   enableGlobalAppMiddleWare: true
  // }
  modules: [
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",

  ],

  tailwindcss: {
    exposeConfig: true,
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
      script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js",
        defer: true
      }, {
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js",
        defer: true
      }]
    }
  }
});