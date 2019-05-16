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
  import {baseOptions} from '@/mixin/baseOptions'
  require("@/components/globalComponent")
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

 