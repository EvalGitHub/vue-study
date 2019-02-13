<template>
  <div class="about">
    <h1>This is an about Vuex</h1>
    <input type="text"  v-model="phone" />
    phone： {{phone}}
    <div class="wrapper">
      <div class="label">
       vuex page中的count: {{count}}
      </div>
      <button @click="addCount">增加count</button>
    </div>
    <div class="wrapper">
      <div class="label">
        vuex page中的name: {{name}} 
      </div>
    </div>
    测试邮箱：{{flag}}
    <button @click="testEmails">testEmail</button>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {testEmail} from 'common-fun'
export default {
  name: 'Vuex',
  data () {
    return {
      de_phone: '',
      flag: ''
    }
  },
  computed: {
    phone: {
      get () {
        return this.$store.state.a.phone
      },
      set (val) {
        // this.$store.state.a.phone = val
        this.$store.commit('a/updatePhone', {phone: val})
      }
    },
    ...mapState('a',{
      count: 'count',
      // phone: 'phone',
      name: 'name',
      // name (state) {
      //   return state.a.name.toUpperCase()
      // },
      // upperName () {
      //   return this.$store.getters.upperName
      // }
    })
  },
  methods: {
    addCount () {
      this.$store.commit('a/increment')
    },
    testEmails () {
      let email = '333@qq.com'
      this.flag = testEmail(email)
    }
  }
}
</script>
<style>
.wrapper{
  height:40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.label{
  margin-right:20px;
}
</style>

