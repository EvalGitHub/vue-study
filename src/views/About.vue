<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="outer"  @mouseover="mouseoverEvent">
      this is outer
      <div class="inner">
        this is inner
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'About',
  methods: {
    mouseenterEvent () {
      console.log('mouseenterEvent')
    },
    mouseoverEvent () {
      console.log('mouseoverEvent')
    }
  }
}
</script>
<style scoped>
  .about{
    background: #2c3e50;
  }
  .outer{
    padding:20px;
    background: aqua;
  }
  .inner{
    width: 100px;
    height:100px;
    background: blueviolet
  }
</style>
