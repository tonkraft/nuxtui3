export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode'
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  app: {
    pageTransition: false
  },

  compatibilityDate: '2025-05-15'
})
