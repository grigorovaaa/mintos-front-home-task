<template>
  <div class="container height100">
    <div class="row height100">
      <div class="valign-wrapper height100">
        <form class="col s12 m6 l4" style="margin-right: auto;margin-top: 3rem;">
          <div class="row">
            <div class="col s12">
              <h5>{{ $t('ui.headers.registration') }}</h5>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" class="validate" v-model="email" v-on:blur="checkEmail"
                     :class="{valid: valid.email === true, invalid: valid.email === false}">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" v-model="password"
                     :class="{valid: valid.password === true, invalid: valid.password === false}">
              <label for="password">{{ $t('ui.pages.registration.password') }}</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="confirm_password" type="password" class="validate" v-model="confirm_password"
                     :class="{valid: valid.confirm_password === true, invalid: valid.confirm_password === false}">
              <label for="confirm_password">{{ $t('ui.pages.registration.confirmPassword') }}</label>
            </div>
          </div>
          <div class="row center-align">
            <div class="col s12">
              <button class="btn waves-effect waves-light" v-on:click="registration">{{ $t('ui.buttons.registration') }}</button>
            </div>
          </div>
          <div class="row center-align">
            <div class="col s12">
              <router-link :to="{name: 'Login'}" class="btn-flat green-text">
                {{ $t('ui.buttons.enter') }}
              </router-link>
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
  name: 'Registration',
  mixins: [toast],
  data () {
    return {
      valid: {
        email: null,
        password: null,
        confirm_password: null
      },
      email: '',
      password: '',
      confirm_password: ''
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
    },
    confirm_password (val) {
      this.valid.confirm_password = this.password === val
    }
  },
  methods: {
    checkEmail () {
      if ((this.email) && (this.valid.email === true)) {
        const params = {
          email: this.email
        }
        this.$store.dispatch('Api/REGISTRATION_CHECK', { params })
          .then(isFree => {
            if (isFree === false) {
              this.toastErr('there is already someone with such email')
              this.valid.email = false
            }
          })
          .catch(e => {
            console.error(e)
            this.toastErr('Error during email check - try later')
          })
          .finally(() => {
          })
      }
    },
    registration () {
      const params = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('Api/REGISTRATION', { params })
        .then(isCreated => {
          if (isCreated === true) {
            this.$router.push({ name: 'Login' })
            this.toastSuc('Success registration')
          } else {
            this.toastErr('Unable to create do registration - there is already someone with such email')
            this.valid.email = false
          }
        })
        .catch(e => {
          this.toastErr(e.message)
        })
        .finally(() => {
        })
    }
  }
}
</script>

<style scoped>

</style>
