<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="default" :defaultSlot="slotProps.defaultSlot">
        {{slotProps.defaultSlot.name}}
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
  props: {
    slotProps: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
}
</script>
