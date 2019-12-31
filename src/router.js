import Vue from 'vue'
import Router from 'vue-router'

import NavBar from '@/components/NavBar'
import SideNav from '@/components/SideNav'

import HomePage from '@/views/HomePage'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        navbar: NavBar,
        sidenav: SideNav,
        default: HomePage
      },
      // beforeEnter: needAuth
    }
  ]
})
