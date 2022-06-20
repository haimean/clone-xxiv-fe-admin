export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'clone-xxiv-fe-admin',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'https://xxivstore.com/wp-content/themes/yootheme/cache/XXIV-Logo-Web-da8bec8c.webp' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.scss',],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{src: '~/plugins/api.ts'}, {src: '~plugins/vee-validate.js'}, ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
  },

  i18n: {
    locales: [
      {
        code: 'ja',
        file: 'ja.js',
      },
      {
        code: 'en',
        file: 'en.js'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'ja',
  },

  router: {
    middleware: ['auth'],
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    strategies: {
      local: {
        url: process.env.API_URL,
        endpoints: {
          login: { url: '/login', method: 'post' },
          refresh: { url: '/refresh-token', method: 'post' },
          user: { url: '/me', method: 'get' },
          logout: { url: '/logout', method: 'post' },
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60 * 24 * 7,
        },
        refreshToken: {
          maxAge: 20160 * 60,
        },
        user: {
          property: '',
        }
      },
    },
  },

  tailwindcss: {
    // Options
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules', 'vue-tooltip'],
    postcss: {
      plugins: {
        'postcss-custom-properties': {},
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}

