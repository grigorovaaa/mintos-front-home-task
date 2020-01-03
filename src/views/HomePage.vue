<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col s12">
          <feed-key-words />
          <feed />
        </div>
      </div>
    </div>
  </main>
</template>

<script>

import Feed from '@/components/Feed'
import FeedKeyWords from '@/components/FeedKeyWords'

export default {
  name: 'HomePage',
  components: {
    Feed,
    FeedKeyWords
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
  }
}

</script>

<style scoped>

</style>
