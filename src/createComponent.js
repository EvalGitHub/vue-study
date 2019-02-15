// npm run createComponent text002
var fs = require("fs");
let componentName = process.argv.slice(2)[0]

const componentFileName = `src/components/${componentName}.vue`
const scssFileName = `src/scss/${componentName}.scss`
let filesArray = []
filesArray.push(componentFileName)
filesArray.push(scssFileName)

filesArray.forEach((fileName) => {
    openFile(fileName)
}) 

// 异步打开文件
function openFile (fileName) {
    fs.open(fileName, 'ax+', function(err, fd) {
       if (err) {
           console.error(err);
       }
       var fileAfterFix = fileName.slice(fileName.lastIndexOf('.')+1); 
       addContent(fileName, fileAfterFix === 'scss' ? getScssContent() : getComponentContent(), fd)
    });
}


// 追加内容
function addContent (fileName, initialContent, fd) {
    fs.appendFile(fileName, initialContent, (err) => {
        if (err) {
            console.log("appendFile fail");
            return false;
        }
        fs.close(fd, () => {
            return true
        })
    })
}

function getComponentContent () {
    return `<template>
    <div></div>
</template>
<script>
export default {
    name: '${componentName}'
}
</script>
<style scoped lang="scss">
    @import '${scssFileName}'
</style>`
}

function getScssContent () {
    return `/*write your scss style*/`
}