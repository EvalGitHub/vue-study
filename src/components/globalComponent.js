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

// $attrs $listeners
Vue.component("ChildChild", {
  render (h) {
      return h('div',{
          style: {
              "padding": "5px"
          },
          attrs: {
              id: 'child-child'
          },
         
      },[
          h('input',{
              attrs: {
                  value: this.value,
                  maxLength: this.maxLength
              }
          }),
          h('button', {
              // attrs: {
              //     value: '触发第一层组件的方法'
              // },
              on: {
                  click: this.clickMe
              }
          },'$listener触发第一层组件的方法')
      ])
  },
  props: ['value','maxLength'],
  // inheritAttrs:false,
  methods: {
      clickMe () {
          this.$emit("childChild","click.childChild")
      }
  },
})