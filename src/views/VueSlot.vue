<template>
  <div>
    <p>this is slot </p>
    <div class="slot-container">
      <base-layout :slotProps="slotProps">
        <template v-slot:header>
          <h1 style="color: red"> header here might be a page title</h1>
        </template>

         <template v-slot:default="{defaultSlot}">
           <div style="color: green">
              <p>A paragraph for the main content.</p>
              <p>And another one.</p>  
              <span>name: {{defaultSlot.name}}</span> 
              ---
              <span>comment: {{defaultSlot.comment}}</span> 
           </div>
         </template>

        <template v-slot:footer>
          <p style="color: orange;font-size:20px">footer Here's some contact info</p>
        </template>
      </base-layout>
    </div>
  </div>
</template>
<script>
import BaseLayout from '@/components/slot/baseLayout'
export default {
  name: 'slotName',
  components: {
    BaseLayout
  },
  data () {
    return {
      slotProps: {
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

