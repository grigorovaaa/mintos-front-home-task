<template>
    <div></div>
</template>

<script>
export default {
  name: 'Logout',
  mounted () {
    this.$store.commit('Auth/token', '')
    this.$store.commit('Auth/refresh_token', '')
    this.$router.push({ name: 'Home' })
  }
}
</script>

<style scoped>

</style>
