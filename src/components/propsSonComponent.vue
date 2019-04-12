<template>
    <div>
        <div>this is props son组件</div>
        <ul>
            <li>{{name}}</li>
            <li>{{age}}</li>
            <li>{{sex}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'propsSonComponent',
    props: {
        name: String,
        age: Number,
        sex: String
    }
}
</script>
