// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/ui', '@nuxt/icon', '@nuxt/fonts', '@nuxtjs/color-mode'],
  css: ['~/assets/css/main.css'],
  ui: {
    theme: {
      colors: ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'primary']
    },
    shortcuts: true,
    overlay: true,
    toast: true
  },
  colorMode: {
    preference: 'dark'
  }
})
