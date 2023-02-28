export default {
  head: {
    title: "Home",
    titleTemplate: "Flagedu | %s",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        hid: "viewport",
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { hid: "description", property: "description", content: "" },
      { property: "format-detection", content: "telephone=no" },
      {
        hid: "og:type",
        property: "og:type",
        content: "",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "",
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "",
      },
      {
        hid: "Keywords",
        property: "Keywords",
        content: "",
      },
      {
        hid: "Description",
        property: "Description",
        content: "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "/css/bootstrap.min.css" },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css",
      },
    ],
    script: [{ type: "text/javascript", src: "/js/bootstrap.min.js" }],
  },

  env: {
    HOST:
      process.env.VUE_APP_STATIC_HOST ||
      process.env.VUE_APP_DEVHOST ||
      process.env.VUE_APP_DEVBROWSERHOST ||
      "http://localhost:8000",
    SITE_URL: process.env.VUE_APP_SITE_URL || "http://localhost:3000",
  },

  publicRuntimeConfig: {
    HOST:
      process.env.VUE_APP_STATIC_HOST ||
      process.env.VUE_APP_DEVBROWSERHOST ||
      process.env.VUE_APP_DEVHOST ||
      "http://localhost:3000",
    SITE_URL: process.env.VUE_APP_SITE_URL || "http://localhost:3000",
  },

  css: ["~/assets/css/main.scss"],

  styleResources: {
    scss: ["~/assets/css/_config.scss"],
  },

  axios: {
    baseURL: process.env.VUE_APP_DEVHOST || "http://localhost:8000",
    browserBaseURL:
      process.env.VUE_APP_DEVBROWSERHOST ||
      process.env.VUE_APP_DEVHOST ||
      "http://localhost:8000",
    prefix: "/",
  },

  plugins: [
    {
      src: "~/plugins/validate.js",
      ssr: false,
    },
    {
      src: "~/plugins/vue-toast-notification.js",
      mode: "client",
    },
    {
      src: "~/plugins/clickaway.js",
      ssr: false,
    },
    {
      src: "~/plugins/vue-otp-input.js",
      ssr: false,
    },
    // {
    // 	src: "~/plugins/vue-loading-overlay.js",
    // 	ssr: false,
    // },
    {
      src: "~/plugins/vue-countdown.js",
      ssr: false,
    },
    {
      src: "~/plugins/vue-debounce.js",
      ssr: false,
    },
  ],

  components: true,

  buildModules: ["@nuxtjs/style-resources"],

  modules: ["@nuxtjs/axios", "@nuxtjs/dayjs", "cookie-universal-nuxt"],

  build: {
    transpile: ["vee-validate/dist/rules"],
    extend(config, ctx) {},
  },
};
