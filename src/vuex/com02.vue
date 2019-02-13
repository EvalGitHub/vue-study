<template>
  <div>
    {{count}}
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'com02',
  computed: {
    // count () {
    //   return this.$store.state.count
    // }
    ...mapState('a',[
      'count',
      'name'
    ]),
    ...mapGetters('a',[
      'upperName'
    ])
  }
}
</script>
