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
export default {
  data () {
    return {
      list: [
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '0'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '1'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '2'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '3'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '4'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '5'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '6'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '7'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '8'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '9'},
        {imgDes: 'ImageThree', src: 'httddps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '10'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '11'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '12'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '13'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '14'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '15'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '16'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '17'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '18'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '19'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '0'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '1'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '2'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '3'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '4'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '5'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '6'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '7'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '8'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '9'},
        {imgDes: 'ImageThree', src: 'httddps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '10'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '11'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '12'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '13'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '14'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '15'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '16'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '17'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '18'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '19'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '0'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '1'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '2'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '3'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '4'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '5'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '6'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '7'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '8'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '9'},
        {imgDes: 'ImageThree', src: 'httddps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '10'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '11'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '12'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '13'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '14'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '15'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '16'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '17'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '18'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '19'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '0'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '1'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '2'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '3'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '4'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '5'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '6'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '7'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '8'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '9'},
        {imgDes: 'ImageThree', src: 'httddps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '10'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '11'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '12'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '13'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '14'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '15'},
        {imgDes: 'imageOne', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3365018759,2226705862&fm=27&gp=0.jpg', id: '16'},
        {imgDes: 'ImageTow', src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=935292084,2640874667&fm=27&gp=0.jpg', id: '17'},
        {imgDes: 'ImageThree', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3853852840,331334549&fm=27&gp=0.jpg', id: '18'},
        {imgDes: 'ImageFour', src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1778874458,2287009633&fm=27&gp=0.jpg', id: '19'},
      ]
    }
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
