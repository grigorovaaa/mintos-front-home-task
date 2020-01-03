<template>
  <div class="container height100">
    <div class="row height100">
      <div class="valign-wrapper height100">
        <form class="col s12 m6 l4" style="margin-right: auto;margin-top: 3rem;">
          <div class="row">
            <div class="col s12">
              <h5>{{ $t('ui.headers.login') }}</h5>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" class="validate" v-model="email" :class="{valid: valid.email === true, invalid: valid.email === false}">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" v-model="password" :class="{valid: valid.password === true, invalid: valid.password === false}">
              <label for="password">{{ $t('ui.pages.login.password') }}</label>
            </div>
          </div>
          <div class="row center-align">
            <div class="col s12">
              <button class="btn waves-effect waves-light" v-on:click="login">{{ $t('ui.buttons.enter') }}</button>
            </div>
          </div>
          <div class="row center-align">
            <div class="col s12">
              <router-link :to="{name: 'Registration'}" class="btn-flat green-text">
                {{ $t('ui.buttons.registration') }}
              </router-link>
            </div>
          </div>
          <div class="row center-align" v-if="false">
            <div class="col s12">
              <a href="#">{{ $t('ui.buttons.resetPassword') }}</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import toast from '@/mixins/toast'
export default {
  name: 'Login',
  mixins: [toast],
  data () {
    return {
      valid: {
        email: null,
        password: null
      },
      email: '',
      password: ''
    }
  },
  watch: {
    email (val) {
      // eslint-disable-next-line no-useless-escape
      let regexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      this.valid.email = regexp.test(String(val))
    },
    password (val) {
      let regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i
      this.valid.password = regexp.test(String(val))
    }
  },
  methods: {
    login () {
      this.$store.dispatch('Api/LOGIN', { params: { username: this.email, password: this.password } })
        .then(result => {
          const token = result.data.token
          const refreshToken = result.data.refresh_token
          this.$store.commit('Auth/token', token)
          this.$store.commit('Auth/refresh_token', refreshToken)
          if (token) {
            this.$router.push({ name: 'Home' })
          } else {
            this.toastErr('wrong login or password')
          }
        })
        .catch(e => {
          this.toastErr('wrong login or password')
        })
        .finally(() => {
          this.$store.dispatch('Auth/init')
        })
    }
  }
}
</script>

<style scoped>

</style>
