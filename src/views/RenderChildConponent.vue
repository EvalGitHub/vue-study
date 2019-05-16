 <template>
  <div class="render-child-wrappe">
    <div class="child-item">
      <div class="by-common">
        <child :level="level" maxLength="4" value="agere4" @childChild="childChilds">这是通过常用方式注册组件</child>
      </div>
    </div>

    <div class="child-item">
      <GlobalChild :level="level">这是通过Vue.component注册的全局组件</GlobalChild>
    </div>

    <div class="child-item">
      <el-input :name="name" @modelInput="val=>name=val"></el-input>
      <div>v-model: {{name}}</div>
    </div>

    <div class="child-item">
      <p>这是通过render 创建的组件中的slot</p>
      <com-slot>
        <h1 slot="header"><span>header slot</span></h1>
        <h1><span>header default</span></h1>
        <h1 slot="footer"><span>footer slot</span></h1>
      </com-slot>
    </div>

    <div class="child-item">
      <RenderComponentFun />
    </div>

    <div class="child-item">
      <button @click="getName">点击click</button>
    </div>
  </div>
</template>
<script type='text/javascript'>
  // https://juejin.im/post/5afd6a88f265da0b9127a879
  import RenderComponentFun from "@/components/renderComponentFun"
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
  
  // v-model
  Vue.component("el-input", {
    render: function (createElement) {
      var self = this
      return createElement('input', {
        domProps: {
          value: self.name
        },
        style: {
          height: '20px',
          padding: '5px'
        },
        on: {
          input: function (event) {
            self.$emit("modelInput", event.target.value)
          }
        }
      })
    },
    props: {
      name: String
    }
  })

  // this.$slot的用法
  Vue.component("com-slot", {
    render (h) {
      let header = this.$slots.header
      let body = this.$slots.default
      let footer = this.$slots.footer
      console.log("footer-slot", footer)
      return h("div", [
        h("header", header),
        h("main", body),
        h("footer", footer),
      ])
    },
    beforeCreate () {
      console.log("this is com-slot beforeCreate")
    },
    created () {
      console.log("this is com-slot created")
    },
    beforeMount () {
      console.log("this is com-slot befroeMount")
    },
    mounted () {
      console.log("this is com-slot mounted")
    }
  })

  // mixin
  const baseOptions = {
    // template: `<p>{{firstName}}--{{lastName}}</p>`,
    data: function () {
      return {
        firstName: 'Tom',
        lastName: 'hans'
      }
    },
    methods: {
      getName () {
        console.log(this.firstName + "---" + this.lastName)
      }
    },
    beforeCreate () {
      console.log("this is baseOptions beforeCreate")
    },
    created () {
      console.log("this is baseOptions created")
    },
    beforeMount() {
      console.log("this is baseOptions  beforeMount ")
    },
    mounted() {
      console.log("this is baseOptions  mounted ")
    },
    beforeDestroy() {
      console.log("this is baseOptions  beforeDestroy ")
    },
    destroyed() {
     console.log("this is baseOptions  destroyed ")
    }
  }

  export default {
    name: 'RenderChildComponent',
    // extends: baseOptions,
    mixins: [baseOptions],
    components: {
      Child,
      RenderComponentFun
    },
    data() { 
      return {
        name: 'this is el-input',
        level: 3 
      } 
    },
    methods: {
      getName () {
        console.log(this.name)
      },
      childChilds (msg) {
        console.log(msg)
      }
    },
    beforeCreate () {
      console.log("this is main beforeCreate")
    },
    created () {
      console.log("this is main created")
    },
    beforeMount() {
      console.log("this is main  beforeMount ")
    },
    mounted() {
      console.log("this is main  mounted ")
    },
    beforeDestroy() {
      console.log("this is main  beforeDestroy ")
    },
    destroyed() {
      console.log("this is main  mounted ")
    }
  }
</script>
<style>
.render-child-wrappe{
  font-size:20px;
  color:black;
}
.child-item{
  background: #ddd;
  margin:10px;
  padding:10px
}
</style>

 