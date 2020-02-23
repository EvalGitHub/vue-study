<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="default" v-bind:userInfo="userInfo">
        {{userInfo.defaultSlot.name}}
      </slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'BaseLayout',
  data () {
    return {
      userInfo: {
        defaultSlot: {
          name: 'default Name',
          comment: 'this is show for default name'
        },
        headerSlot: {
          name: 'header Name',
          comment: 'this is show for header name'
        },
        footerSlot: {
          name: 'footer Name',
          comment: 'this is show for footer name'
        }
      }
    }
  }
}
</script>
