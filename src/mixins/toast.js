import toast from '@/utils/toast'
export default {
  methods: {
    toast (msg, classes = '') {
      toast(msg, classes)
    },
    toastErr (msg) {
      this.toast(msg, 'red')
    },
    toastSuc (msg) {
      this.toast(msg, 'green')
    },
    toastWar (msg) {
      this.toast(msg, 'yellow darken-4')
    }
  }
}
