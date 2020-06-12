<template>
  <transition name="right" appear>
    <div class="home-wrapper">
      <i class="cubeic-tag icon" @click="more"></i>
      <div class="home">
        <div class="title">{{today}}</div>
        <cube-switch class="switch" v-model="walk">{{walkValue}}</cube-switch>
        <cube-switch class="switch" v-model="sport">{{sportValue}}</cube-switch>
        <cube-input class="input" v-model="weight">
          <div slot="prepend">体重:</div>
          <div slot="append">kg</div>
        </cube-input>
        <cube-input class="input" v-model="fatRatio">
          <div slot="prepend">体脂:</div>
          <div slot="append">%</div>
        </cube-input>
        <cube-button class="button" @click="submit">填完按这</cube-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { addSport, updateSport } from '../api/store'

export default {
  data () {
    return {
      today: '',
      walk: false,
      sport: false,
      weight: '',
      fatRatio: ''
    }
  },
  computed: {
    walkValue () {
      if (this.walk) {
        return '今天散步了'
      } else {
        return '今天没散步'
      }
    },
    sportValue () {
      if (this.sport) {
        return '今天运动了'
      } else {
        return '今天没运动'
      }
    }
  },
  methods: {
    uploading () {
      this.$createToast({
        txt: '提交中',
        time: 0,
        mask: true
      }).show()
    },
    success () {
      this.walk = false
      this.sport = false
      this.weight = ''
      this.fatRatio = ''
      this.$createToast({
        type: 'correct',
        txt: '提交成功'
      }).show()
    },
    error () {
      this.$createToast({
        type: 'error',
        txt: '未知错误'
      }).show()
    },
    more () {
      this.$router.push('/list')
    },
    submit () {
      this.uploading()
      addSport({
        user: localStorage.getItem('name'),
        date: this.today,
        walk: this.walk,
        sport: this.sport,
        weight: this.weight,
        fatRatio: this.fatRatio
      })
        .then(res => {
          if (res.data.code === 0) {
            this.success()
          } else if (res.data.code === 1) {
            this.$createToast().hide()
            this.$createDialog({
              type: 'confirm',
              title: '你今天提交过了',
              content: '是否覆盖原来的提交？',
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
                this.uploading()
                updateSport({
                  user: localStorage.getItem('name'),
                  date: this.today,
                  walk: this.walk,
                  sport: this.sport,
                  weight: this.weight,
                  fatRatio: this.fatRatio
                })
                  .then(res => {
                    if (res.data.code === 0) {
                      this.success()
                    }
                  })
                  .catch(() => {
                    this.error()
                  })
              }
            }).show()
          }
        })
        .catch(() => {
          this.error()
        })
    }
  },
  created () {
    if (!localStorage.getItem('name')) {
      this.$router.push('/login')
    } else {
      const date = new Date(Date.now() - 1000 * 60 * 60 * 6)
      this.today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-wrapper
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  .icon
    position fixed
    font-size 25px
    top 15px
    right 15px
    transform rotate(90deg)
    animation back-shake 2s linear infinite
  .home
    position fixed
    top 20%
    display flex
    flex-direction column
    align-items center
    width 100vw
    .title
      font-size 50px
      margin-bottom 30px
    .switch
      margin 10px auto
      line-height 30px
      font-size 25px
    .input
      margin 10px auto
      line-height 30px
      font-size 25px
      width 50%
      outline none
      border-bottom 2px solid rgba(0, 0, 0, 0.5)
      & >>> input
        color #000
        text-align center !important
        outline none
      &:after
        display none
    .button
      margin-top 24%
      width 50%
</style>
