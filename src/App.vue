<template>
  <body id="app">
  <router-view name="navbar"></router-view>
  <router-view name="sidenav"></router-view>
  <router-view/>
  </body>
</template>

<script>

  export default {
    name: 'app',
    components: {
    }
  }
</script>

<style>
</style>
