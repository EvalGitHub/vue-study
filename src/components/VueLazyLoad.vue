<template>
  <div class="container">
    <ul class="outer-wrapper">
      <li v-for="(img, key) in list" :key=key class="wrapper-item">
        <img v-lazy="img.src" >
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
      list: [
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '0'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '1'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '2'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '3'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '4'}
      ]
    }
  },
  methods: {
    getImgsList () {
      debugger
      serveFun.getImgsFun().then(res => {
        console.log(res.data);
        if (res.data.code === 0) {
          this.list = res.data.data
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
