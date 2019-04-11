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
        if (res.data.code == 0) {
          this.list = res.data.data.slice()
        }
      }).catch(err => {
        this.list = [{imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg',title: 'noImg'}]
      })
    }
  },
  created () {
    console.log(process.env.NODE_ENV);
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
  background: #2c3e50;
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
