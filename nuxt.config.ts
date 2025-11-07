import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    'motion-v/nuxt',
    'nuxt-lucide-icons',
    'shadcn-nuxt',
  ],
  css: ['~/assets/styles/app.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  dayjs: {
    plugins: ['relativeTime', 'timezone', 'weekday'],
  },
  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },
  colorMode: {
    classSuffix: '',
  },

  runtimeConfig: {
    // use to encode, decode JWT tokens and save sessions
    jwtSecret: '',
    // backendAPI authorization token
    apiToken: '',
    // Backend Url
    backendUrl: '',
    public: {
      // Storage Url for media files
      storageUrl: '',
      // ImgBB API key for image uploads
      imgbbApiKey: 'd51fd5e5e179dcfb85f6bc1546803c6f',
    },
  },

})
