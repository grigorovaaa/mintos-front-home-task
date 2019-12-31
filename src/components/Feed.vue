<template>
    <div class="container">
        <div class="row">
            <h2><div class="feed-title">{{ feed.title }}</div></h2>
            <h3><div class="feed-subtitle">{{ feed.subtitle }}</div></h3>
        </div>
        <div class="row">
            <div class="col xs12 s12 m12 l12 feed-article" v-for="(entry, key) in feed.entryCollection" :key="key">
                <a target="_blank" :href="entry.link" class="story_link">
                    <h3>
                        <div v-html="entry.title"></div>
                    </h3>
                    <div v-html="entry.summary"></div>
                </a>
                <a target="_blank" :href="entry.author.uri" class="author_link">
                    <span>{{entry.author.name}}</span>
                </a>
                <div>{{ entry.updated | moment("dddd, MMMM Do YYYY") }}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Feed',
  components: {
  },
  data () {
    return {
      feed: {
        entryCollection: {}
      }
    }
  },
  mounted () {
    this.loadFeed()
  },
  computed: {},
  methods: {
    loadFeed () {
      this.$store.dispatch('Api/FEED', { method: '', params: [] })
        .then(result => {
          this.feed = result.data.feed
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
.feed-article {
    background-color: #c3f1c4;
    margin: 10px;
}
.story_link {
    color: black;
}
.author_link {
    color: #00727a;
}
.feed-title, .feed-subtitle {
    background-color: #78ad7a;
}
</style>
