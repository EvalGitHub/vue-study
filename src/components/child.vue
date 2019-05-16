 <template>
  <div class="render-child-wrappe">
      <div v-if="level === 1"> <slot></slot> </div>
      <p v-else-if="level === 2"> <slot></slot> </p>
      <h1 v-else-if="level === 3"> <slot></slot> </h1>
      <h2 v-else-if="level === 4"> <slot></slot> </h2>
      <p v-else-if="level === 5"> <slot></slot></p>
      <textarea v-else> <slot></slot> </textarea>
      <!-- <div v-bind="$attrs" v-on="$listeners">$attrs , $listeners</div> -->
      <!-- <input v-bind="$attrs" /> -->
      <span>学习$attrs：</span>
      <child-child v-on="$listeners"  v-bind="$attrs"/>
  </div>  
</template>
<script>
require('@/components/globalComponent')
export default {
    name: 'child',
    props: {
       level:Number 
    },
    methods: {
        sentMsg (msg) {
            console.log("我是child组件" + msg)
        }
    },
    // beforeCreate () {
    //   console.log("this is child beforeCreate")
    // },
    // created () {
    //   console.log("this is child created")
    // },
    // beforeMount() {
    //   console.log("this is child  beforeMount ")
    // },
    // mounted() {
    //   console.log("this is child  mounted ")
    // },
    // beforeDestroy() {
    //   console.log("this is child  beforeDestroy ")
    // },
    // destroyed() {
    //  console.log("this is child  destroyed ")
    // }
    mounted () {
        console.log(this.$attrs)
    }
}
</script>