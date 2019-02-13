<template>
  <div class="container">
    <ul class="outer-wrapper">
      <li v-for="(img, key) in list" :key="key" class="wrapper-item">
        <img v-lazy="img.imgUrl" >
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */
import serveFun from '@/service/demo/index'
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getImgsList () {
      serveFun.getImgsFun().then(res => {
        console.log(res.data.data);
        if (res.data.code === 0) {
          this.list = res.data.data.slice()
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
  created () {
    this.getImgsList();
  }
}
</script>
<style scoped>
.container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.outer-wrapper{
  width:300px;
  height:400px;
  padding:0;
  display: flex;
  flex-wrap:wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border:2px solid pink;
  overflow-y: scroll;
}
.wrapper-item, .wrapper-item img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* border: 1px solid #ddd; */
}
li{
  list-style: none;
}
</style>
