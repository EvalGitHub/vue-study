<template>
  <div>
    <p>this is slot </p>
    <div class="slot-container">
      <base-layout>
        <template v-slot:header>
          <h1 style="color: red"> header here might be a page title</h1>
        </template>

         <template v-slot:default>
           <div style="color: green">
              <p>A paragraph for the main content.</p>
              <p>And another one.</p>  
              <span v-if="userInfo">name: {{userInfo.defaultSlot.name}}</span> 
              ---
              <span v-if="userInfo">>comment: {{userInfo.defaultSlot.comment}}</span> 
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
}
</script>

