// mixin
export const baseOptions = {
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
