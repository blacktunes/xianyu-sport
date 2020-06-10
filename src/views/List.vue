<template>
  <div class="title" @click="click">还没做</div>
</template>

<script>
export default {
  methods: {
    click () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  position fixed
  top 30%
  text-align center
  width 100%
  font-size 50px
</style>
