<template>
  <div class="word-des">
    这是一个公共组件，每个地方都会用的到的，所以是全局注册（registerComponent.js）
  </div>
</template>
<script>
export default {
  name: 'CommonComponent'
}
</script>
<style>
.word-des{
  font-size:20px;
  color:red;
}
</style>

