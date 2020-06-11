<template>
  <transition name="left" appear>
    <div>
      <i class="cubeic-back icon" @click="back"></i>
      <cube-loading :size="40" class="loading" v-if="!showList"></cube-loading>
      <transition name="fade">
        <div class="loading" v-if="listEmpty">暂无数据</div>
      </transition>
      <transition name="fade">
        <cube-scroll class="scroll" ref="scroll" :data="data" v-show="showList">
          <template v-for="item in data">
            <card :key="item.id">
              <div slot="header" class="header">
                <div class="user">{{item.user}}</div>
                <div class="date">{{new Date(item.date).toLocaleDateString()}}</div>
              </div>
              <div class="content">
                <div class="text">{{item.walk === 1 ? '已散步' : '没散步'}}</div>
                <div class="text">{{item.sport === 1 ? '已运动' : '没运动'}}</div>
                <div class="text">体重:{{!item.weight || item.weight.length &lt; 1 ? '???kg' : item.weight + 'kg'}}</div>
                <div class="text">体脂:{{!item.fatRatio || item.fatRatio.length &lt; 1 ? '???%' : item.fatRatio + '%'}}</div>
              </div>
            </card>
          </template>
        </cube-scroll>
      </transition>
    </div>
  </transition>
</template>

<script>
import Card from '../components/common/Card'
import { getList } from '../api/store'

export default {
  components: {
    Card
  },
  data () {
    return {
      data: [],
      showList: false,
      listEmpty: false
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    getList()
      .then(res => {
        this.data = res.data
        this.showList = true
        console.log(this.data)
        if (this.data.length < 1) {
          this.listEmpty = true
        }
      })
      .catch(() => {
        this.$createToast({
          type: 'error',
          txt: '未知错误'
        }).show()
        this.showList = true
        this.listEmpty = true
      })
  }
}
</script>

<style lang="stylus" scoped>
.icon
  position fixed
  font-size 25px
  top 15px
  left 15px
  animation shake 4s linear infinite
.loading
  position fixed
  top 50vh
  left 50vw
  transform translate3d(-50%, -50%, 0)
.scroll
  position fixed
  top 45px
  left 0
  height calc(100vh - 45px)
  width 100vw
  .header
    padding 5px
    .user
      display inline-block
      font-size 20px
      margin-right 15px
    .date
      display inline-block
      font-size 18px
      color #aaa
      line-height 100%
  .content
    display flex
    flex-wrap wrap
    .text
      padding 10px 5px

.left-leave-active, .left-enter-active
  transition transform 0.5s
.left-enter, .left-leave-to
  transform translate3d(-100%, 0, 0)

.fade-enter-active, .fade-leave-active
  transition opacity 0.5s
.fade-enter, .fade-leave-to
  opacity 0

@keyframes shake
  0%
    transform translate(0, 0)
  20%
    transform translate(0, 0)
  25%
    transform translate(-15%, 0)
  30%
    transform translate(0, 0)
  35%
    transform translate(-15%, 0)
  40%
    transform translate(0, 0)
  100%
    transform translate(0, 0)
</style>
