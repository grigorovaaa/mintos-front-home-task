import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'
import messages from './i18n'

import 'materialize-css'
import './assets/materialize.css'

Vue.config.productionTip = false

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
