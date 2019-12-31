import Vue from 'vue'
import Vuex from 'vuex'
import camelCase from 'lodash/camelCase'
import ucfirst from 'lodash/startCase'
import debug from '@/utils/debug'

Vue.use(Vuex)

// загружаем модули Vuex из директории ./store и добавляем их в Vuex
let requireModules = require.context('./store', false, /\.js/)
let modules = {}
requireModules.keys().forEach(fileName => {
  let moduleName = ucfirst(camelCase(fileName.replace(/(\.\/|\.js)/g, ''))).replace(' ', '')
  modules[moduleName] = {
    namespaced: true,
    ...requireModules(fileName).default
  }
})

const store = new Vuex.Store({
  modules,
  state: {},
  getters: {
    isAuth (state) {
      return state.Auth.token !== ''
    }
  },
  mutations: {},
  actions: {}
})

// store.subscribe((mutation, state) => {
store.subscribe((mutation) => {
  if (mutation.type === 'Auth/token') {
    if (mutation.payload !== '') {
      for (let moduleName of Object.keys(modules)) {
        if (modules[moduleName].actions && modules[moduleName].actions.initAuth) {
          store.dispatch(`${moduleName}/initAuth`)
        }
      }
    } else {
      for (let moduleName of Object.keys(modules)) {
        if (modules[moduleName].actions && modules[moduleName].actions.initLogout) {
          store.dispatch(`${moduleName}/initLogout`)
          debug(`${moduleName}/initLogout`)
        }
      }
    }
  }
})

// запускаем инициализацию модулей
for (let moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions && modules[moduleName].actions.init) {
    store.dispatch(`${moduleName}/init`)
  }
}

export default store
