<template>
    <div class="container">
        <div class="row">
            <div class="col xs2 s2 m2 l2" v-for="(keyword, key) in keywords" :key="key">
                <div class="key-word">{{ key }} ({{keyword}})</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'FeedKeyWords',
  components: {
  },
  data () {
    return {
      keywords: {}
    }
  },
  mounted () {
    this.loadKeywords()
  },
  computed: {},
  methods: {
    loadKeywords () {
      this.$store.dispatch('Api/KEYWORDS', { method: '', params: [] })
        .then(result => {
          this.keywords = result.data.list
        })
        .catch(e => {
          console.error(e)
          this.toastErr(e.message)
        })
    }
  }
}
</script>

<style scoped>
    .key-word {
        background-color: #c3f1c4;
        margin: 10px;
    }
</style>
