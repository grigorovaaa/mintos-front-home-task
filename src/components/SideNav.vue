<template>
  <ul id="slide-out" class="sidenav sidenav-fixed">
    <li>
      <router-link :to="{name: 'Home'}" class="brand-logo center">
        <h4 class="green-text" style="margin: 0.6rem;">{{ $t('ui.navBar.ProjectName') }}</h4>
      </router-link>
    </li>
    <li>
      <div class="divider"></div>
    </li>
     <li>
      <router-link :to="{name: 'Logout'}" class="waves-effect">
        {{ $t('ui.menu.exit') }}
      </router-link>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'SideNav',
  mounted () {
    // eslint-disable-next-line no-undef
    M.Sidenav.init(document.querySelector('#slide-out'), {})
  },
  computed: {

  }
}
</script>

<style scoped>
</style>
