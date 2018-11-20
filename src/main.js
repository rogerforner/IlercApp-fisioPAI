import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'


import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
