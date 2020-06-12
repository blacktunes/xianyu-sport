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
            <card :key="item.date">
              <div slot="header" class="header">
                <div class="date">{{item.date}}</div>
              </div>
              <template v-for="detail in item.list">
                <card :key="detail.id">
                  <div slot="header" class="user">
                    <div class="user">{{detail.user}}</div>
                  </div>
                  <div class="content">
                    <div class="text">{{detail.walk === 1 ? '已散步' : '没散步'}}</div>
                    <div class="text">{{detail.sport === 1 ? '已运动' : '没运动'}}</div>
                    <div class="text">体重:{{!detail.weight || detail.weight.length &lt; 1 ? '???kg' : detail.weight + 'kg'}}</div>
                    <div class="text">体脂:{{!detail.fatRatio || detail.fatRatio.length &lt; 1 ? '???%' : detail.fatRatio + '%'}}</div>
                  </div>
                </card>
              </template>
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
        const temp = {}
        const data = []
        res.data.forEach(item => {
          const date = new Date(item.date).toLocaleDateString()
          if (temp[date]) {
            temp[date].list.push(item)
          } else {
            temp[date] = {
              date: date,
              list: [item]
            }
          }
        })
        for (const i in temp) {
          data.push(temp[i])
        }
        this.data = data
        this.showList = true
        if (this.data.length < 1) {
          this.listEmpty = true
        }
      })
      .catch((err) => {
        console.log(err)
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
  animation icon-shake 4s linear infinite
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
    .date
      display inline-block
      font-size 20px
      color #aaa
      line-height 100%
  .user
    display inline-block
    font-size 18px
    padding 2px 5px
  .content
    display flex
    flex-wrap wrap
    .text
      padding 10px 5px
      font-size 15px
</style>
