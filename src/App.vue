<template>
  <transition name="first-fade" appear>
    <div id="app">
      <router-view/>
    </div>
  </transition>
</template>

<script>

/* eslint-disable no-undef */
export default {
  computed: {
    firstStart () {
      if (sessionStorage.getItem('first')) {
        return ''
      } else {
        return 'fade'
      }
    }
  },
  methods: {
    plusReady () {
      // Android处理返回键
      plus.key.addEventListener('backbutton', () => {
        if (this.$route.path === '/login' || this.$route.path === '/sport') {
          this.$createDialog({
            type: 'confirm',
            title: '确定退出？',
            maskClosable: true,
            confirmBtn: {
              text: '是',
              active: true,
              disabled: false
            },
            cancelBtn: {
              text: '否',
              active: false,
              disabled: false
            },
            onConfirm: () => {
              plus.runtime.quit()
            }
          }).show()
        } else if (this.$route.path === '/list') {
          this.$router.push('/sport')
        }
      }, false)
    }
  },
  created () {
    if (window.plus) {
      this.plusReady()
    } else {
      document.addEventListener('plusready', this.plusReady, false)
    }
  }
}
</script>

<style lang="stylus">

</style>
