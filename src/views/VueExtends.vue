<template>
  <div>
    <p class="title">关于vue.extends的使用</p>
    <ul>
      <li>
         <button  class="btn btn-primary" @click="weakUpToast">点击触发 Toast (vue.extend)</button> 
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'VueExtend',
  methods: {
    weakUpToast () {
      this.$message.info('我是通过vue.extend实现的组件构造器') 
    }
  }
}
</script>
<style lang="scss">
  .title{
    font-size:25px;
  } 
  .btn {
    border:none;
    outline: none;
  }
  .btn-primary {
    background: greenyellow;
    height:30px;
    padding:5px;
    border-radius: 10px;
  }
</style>



