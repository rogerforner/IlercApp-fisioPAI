import Vue from 'vue'
import Router from 'vue-router'
import Pai from '../components/Pai.vue'
import Config from '../components/Config.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'pai',
      component: Pai
    },
    {
      path: '/configuration',
      name: 'config',
      component: Config
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})