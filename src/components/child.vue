 <template>
  <div class="render-child-wrappe">
      <div v-if="level === 1"> <slot></slot> </div>
      <p v-else-if="level === 2"> <slot></slot> </p>
      <h1 v-else-if="level === 3"> <slot></slot> </h1>
      <h2 v-else-if="level === 4"> <slot></slot> </h2>
      <p v-else-if="level === 5"> <slot></slot></p>
      <textarea v-else> <slot></slot> </textarea>
  </div>  
</template>
<script>
export default {
    name: 'child',
    props: {
       level:Number 
    }
}
</script>