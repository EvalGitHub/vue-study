 <template>
  <div class="render-child-wrappe">
    <div class="by-common">
      <child :level="level">这是通过常用方式注册组件</child>
    </div>
    <child :level="level">这是通过Vue.component注册组件</child>
  </div>
</template>
<script type='text/javascript'>
  // https://juejin.im/post/5afd6a88f265da0b9127a879
  import Child from "@/components/child"
  import Vue from 'vue'
  Vue.component('child', {
    render(h) {
      const tag = ['div', 'p', 'strong', 'h1', 'h2', 'textarea'][this.level]
      return h(tag, this.$slots.default)
    },
    props: {
      level: {  type: Number,  required: true  } 
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

 