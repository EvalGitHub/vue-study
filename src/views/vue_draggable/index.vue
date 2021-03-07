<template>
    <div class="drag_container">
        this is test page
        <draggable v-model="myArray">
            <transition-group>
                <div v-for="element in myArray" :key="element.id" class="drag_item">
                    {{element.name}}
                </div>
            </transition-group>
        </draggable>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'
    export default {
        name: 'ViewDragable',
        data () {
            return {
                myArray: [
                    {id: 1, name: 'this is a part'},
                    {id: 2, name: 'this is b part'},
                ]
            };
        },
        components: {
            draggable,
        },
    }
</script>
<style scoped>
.drag_container {
    text-align: center;
}
.drag_item {
    height: 20px;
    width: 100px;
    background: #ddd;
    margin-top: 20px;
} 
</style>