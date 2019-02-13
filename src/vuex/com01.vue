<template>
  <div>
    <div>
      <span>
        com01 page中的count: {{count}}
      </span>
      <button @click="decActionCount">减少count</button>
      <button @click="increment">增加count</button>
    </div>
    <div>
       <span>
        com01 page中的name: {{name}}
      </span>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'com01',
  computed: {
    ...mapState('a' ,[
      'count',
      'name',
      'age',
      'upperName'
    ]),
    ...mapGetters('a',{
      name: 'upperName'
    })
  },
  methods: {
    ...mapMutations('a',[
      'increment'
    ]),
    ...mapActions('a',[
      'decrementAsync'
    ]),
    decCount () {
      this.$store.commit('a/decrement')
    },
    decrementAsynce () {
      this.decrementAsync({amount:20})
    },
    decActionCount () {
      this.$store.dispatch('a/decrementAsync',{amount:10})
    }
  }
}
</script>
