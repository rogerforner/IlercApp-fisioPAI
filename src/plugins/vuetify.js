import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ca from 'vuetify/es5/locale/ca'

Vue.use(Vuetify, {
  theme: {
    primary: '#4A148C',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  customProperties: true,
  iconfont: 'fa',
  lang: {
    locales: { ca },
    current: 'ca'
  },
})
