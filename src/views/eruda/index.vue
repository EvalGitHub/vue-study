<template>
    <div>
     <div id="erudaContainer"/>
    </div>
</template>
<script>
    import eruda from 'eruda';
    export default {
        mounted() {
            var script = document.createElement('script'); 
            script.src = '//cdn.jsdelivr.net/npm/eruda';
            document.body.appendChild(script); 
            let el = document.getElementById('erudaContainer');
            script.onload = function () { eruda.init({
                container: el,
            }) }
        }
    }
</script>
<style scoped>
    #erudaContainer {
        height: 400px;
        width: 400px;
    }
</style>