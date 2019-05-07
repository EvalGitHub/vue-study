<template>
  <transition name="fade">
    <div class="message" :class="type" v-show="show">
      <i class="icon"></i>
      <span class="text">{{text}}</span>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Toast",
  props: {
    type: {
      type: String,
      default: 'info',
      validator: val => ['info', 'success', 'warning', 'error'].includes(val)
    },
    text: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="scss">
  .fade-enter-active,
  .fade-leave-active  {
     transition: opacity .3s
  }
  .fade-enter,
  .fade-leave-to {
     opacity: 0
  }
  .message {
    position: fixed;
    top: 0.2rem;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    min-width: 0.8rem;
    padding: 5px 20px;
    color: #fff;
    background-color: #009cde;
    font-size: 0.14rem;
    line-height: 1.4;
    border-radius: 0.1rem;
    z-index: 1000;
    box-shadow: 0 1.46px 3.67px 0 rgba(0, 155, 222, .7);
    &.info{
      // color: #05D3E5;
      color: #fff;
    }
    &.success {
      color: #73BC65 ;
    }
    &.error {
      color: #E54305;
    }
    &.warning {
     color:  #E5B705;
    }
  }
</style>