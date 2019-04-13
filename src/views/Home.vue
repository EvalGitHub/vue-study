<template>
  <div class="home">
    <div class="common-component-wrapper">
      <common-component/>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
 /* eslint-disable */ 
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    routeChange (to, from) {
      console.log("routeChange")
      console.log("to", to)
    }
  },
  watch: {
    '$route':  { // 在组件中进行监听的时候，route需要是有子组件才行，否则要加上immediate
      handler: 'routeChange',
      immediate: true
    }
  }
}
</script>
<style>
</style>

