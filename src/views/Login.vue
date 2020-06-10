<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="title">{{title}}</div>
      <cube-input class="input" v-model="value" ref="input"></cube-input>
    </div>
    <cube-button class="button" @click="setName">填完按这</cube-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '你是谁',
      value: ''
    }
  },
  methods: {
    setName () {
      if (this.value && this.value.length > 0) {
        localStorage.setItem('name', this.value)
        this.$router.push('/')
      } else {
        this.title = '快点填'
        this.$refs.input.focus()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-wrapper
  width 100vw
  height 100vh
  // background #66FFFF
  .login
    position fixed
    top 20%
    display flex
    flex-direction column
    align-items center
    width 100vw
    .title
      font-size 35px
      margin-bottom 15px
    .input
      line-height 30px
      font-size 25px
      width 35%
      // background #66FFFF
      outline none
      border-bottom 2px solid rgba(0, 0, 0, 0.5)
      & >>> input
        color #000
        text-align center !important
        outline none
      &:after
        display none
  .button
    width 50%
    position fixed
    bottom 70px
    left 50%
    transform translate3D(-50%, 0, 0)
</style>
