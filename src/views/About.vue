<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="outer"  @mouseover="mouseoverEvent">
      this is outer
      <div class="inner">
        this is inner
      </div>
    </div>
    <props-component :name="name" :age="age" :sex="sex"/>
  </div>
</template>
<script>
/* eslint-disable */
import propsComponent from "@/components/propsComponent"
export default {
  name: 'About',
  components: {
    propsComponent
  },
  data () {
    return {
      name: 'tom',
      age: 33,
      sex: 'man'
    }
  },
  methods: {
    mouseenterEvent () {
      console.log('mouseenterEvent')
    },
    mouseoverEvent () {
      console.log('mouseoverEvent')
    },
  },
  created () {
    console.log("组件生成created")
  },
  activated () {
    // 当使用keep-alive 缓存路由的时候,全局vue.js不强制刷新或者重启时只创建一次，也就是说，created()只会触发一次；
    // activated()：在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等
    console.log("组件挂载activated")
  },
  mounted () {
    console.log("组件挂载mounted")
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
