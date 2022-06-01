<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import home from '@/views/home/home'

export default {
  name: 'App',
  components: {
    home
  },
  created () {
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
