import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import NavBar from '@/components/NavBar'
import SideNav from '@/components/SideNav'

import HomePage from '@/views/HomePage'
import Registration from '@/views/Registration'
import Login from '@/views/Login'
import Logout from '@/views/Logout'

Vue.use(Router)

const needAuth = (to, from, next) => {
  if (!store.getters['Auth/UID']) {
    next({ name: 'Login' })
    return
  }

  next()
}
const noAuth = (to, from, next) => {
  if (store.getters['Auth/UID']) {
    next({ name: 'Home' })
    return
  }

  next()
}

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
      beforeEnter: needAuth
    },
    {
      path: '/registration',
      name: 'Registration',
      components: {
        default: Registration
      },
      beforeEnter: noAuth
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        default: Login
      },
      beforeEnter: noAuth
    },
    {
      path: '/logout',
      name: 'Logout',
      components: {
        default: Logout
      },
      beforeEnter: needAuth
    }
  ]
})
