 <template>
  <div class="render-child-wrappe">
    <div class="by-common">
      <child :level="level">这是通过常用方式注册组件</child>
    </div>
    <GlobalChild :level="level">这是通过Vue.component注册的全局组件</GlobalChild>
  </div>
</template>
<script type='text/javascript'>
  // https://juejin.im/post/5afd6a88f265da0b9127a879
  import Child from "@/components/child"
  import Vue from 'vue'
  Vue.component('GlobalChild', {
    render(h) {
      const tag = ['div', 'p', 'strong', 'h1', 'h2', 'textarea'][this.level]
      return h(tag, 
      {
        style: {
          color: 'red',
          fontSize: '15px'
        },
        'class': {
          foo: true,
          bar: false
        },
        attrs: {
          id: 'foo'
        },
        // domProps: {
        //   innerHTML: this.$slots.default
        // }
      },
      [
        h('h1', '主标'),//createElement函数返回VNode对象
        h('h2', '副标'),
        h('h2', this.$slots.default),
        h('button', {
          on: {
            click: this.handleClick
          },
          style: {
            color: 'red',
            background: 'orange',
            fontSize: '15px',
            outline:'none',
            border: 'none',
            minWidth:'100px',
            height:'25px',
            borderRadius: '4px'
          },
        }, 'click this button')
      ])
    },
    props: {
      level: {  type: Number,  required: true  } 
    },
    methods: {
      handleClick () {
        alert('event by button')
      }
    }
  })   
   
  export default {
    name: 'RenderChildComponent',
    components: {
      Child
    },
    data() { return { level: 3 } }
  }
</script>
<style>
.render-child-wrappe{
  font-size:20px;
  color:black;
}
</style>

 