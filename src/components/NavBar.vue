<template>
  <div class="navbar-fixed ">
    <nav>
      <div class="nav-wrapper green">
        <ul id="nav-menu" class="left">
          <li>
            <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          </li>
        </ul>
        <ul class="right">
          <li>
            <a href="#" class="dropdown-trigger" data-target="dropdown-language">
              <i class="material-icons">{{ $t('ui.menu.language') }}</i>
            </a>
            <ul class="dropdown-content" id="dropdown-language">
              <li v-for="l in localesList" :key="l" v-on:click="changeLocale(l)">{{ $t('ui.locales.' + l) }}</li>
            </ul>
          </li>
          <li>
            <router-link :to="{name: 'Logout'}"><i class="material-icons">{{ $t('ui.menu.exit') }}</i></router-link>
          </li>
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down navbar-hidden-hack">
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  data () {
    return {
      localesList: ['en']
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    M.AutoInit()
  },
  computed: {
  },
  methods: {
    changeLocale (locale) {
      this.$i18n.locale = locale
    }
  }
}
</script>

<style scoped>

</style>
