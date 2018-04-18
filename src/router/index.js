import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/components/Base'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Base',
      component: Base
    }
  ]
})
