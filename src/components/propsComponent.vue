<template>
<div>
    <div>this is props 组件</div>
    <props-son-component v-bind="$props"/>
</div>
</template>
<script>
import propsSonComponent from "@/components/propsSonComponent"
export default {
    name: 'propsComponent',
    components: {
        propsSonComponent
    }
}
</script>
