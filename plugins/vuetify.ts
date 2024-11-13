import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    // 他の設定をここに記述していく
    theme: {
      themes: {
        light: {
          colors: {
            surface: '#ffffff',
            background: '#f0f0f0',
          },
        },
      },
    },
  })

  // Vue.js で Vuetify を使用する
  nuxtApp.vueApp.use(vuetify)
  nuxtApp.vueApp.use(VCalendar)
})
