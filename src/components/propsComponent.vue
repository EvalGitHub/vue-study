<template>
<div>
    <div>this is props 组件</div>
    <props-son-component v-bind="$props"/>
    <button @click="handleClick">事件触发</button>
</div>
</template>
<script>
import propsSonComponent from "@/components/propsSonComponent"
export default {
    name: 'propsComponent',
    components: {
        propsSonComponent
    },
    methods: {
        handleClick: function () {
            this.$emit("input", '测试数据')
        }
    }
}
</script>
