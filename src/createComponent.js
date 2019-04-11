 /**
 * 创建组件vue, scss文件, entry文件, router文件, 配置fileConfig
 */
// demo: npm run createComponent text002
var mkdirp = require('mkdirp');
var fs = require("fs");
let componentName = process.argv.slice(2)[0] // component name
let componentIncludedFile = process.argv.slice(3)[0] //  detect detail/list from index
let componentDel = ''
let argv3 = process.argv.slice(3)[0]
if (argv3 === 'del') {
  componentIncludedFile = ''
  componentDel = 'del'
} else {
  componentDel = process.argv.slice(4)[0]
}

// pathConfig
let configDir = './configs/filePath.json'

// component
let componentDir = `src/views/${componentName}`
let scssDir = `src/sass/${componentName}`
let componentFileName = `${componentDir}/index.vue`
let scssFileName = `${scssDir}/index.scss`

// routerFile
let routerFile = `src/entries/${componentName}/router.js`

// entryDir
let entryDir = `src/entries/${componentName}`
let entryFile = `${entryDir}/${componentName}.js`

if (componentIncludedFile) { // index component had created before
  componentFileName = `${componentDir}/${componentIncludedFile}.vue`
  scssFileName = `${scssDir}/${componentIncludedFile}.scss`
  routerFile = ''
}

let filesArray = []
let dirArray = []
filesArray.push(componentFileName, scssFileName, routerFile, entryFile)
dirArray.push(componentDir, scssDir, entryDir)

// initial fun
function initCreateComponent() {
  filesArray.length > 0 && filesArray.forEach(fileName => {
    fileName && openFile(fileName)
  })
  if (componentIncludedFile) {
    return;
  } else {
    addFilePahtContent(configDir)
  }
}

// create dir 
function createDir(fileObj) {
  return new Promise(function (resolve, reject) {
    if (fs.existsSync(fileObj.dirName) && isExists(fileObj.fileName)) {
      reject({ code: 0, msg: 'dir and file exist', dirName: fileObj.dirName })
      return;
    }
    mkdirp(fileObj.dirName, function (err) {
      if (err) {
        reject(err)
        return;
      } else {
        let obj = { code: 1, msg: 'makeDir succ' }
        resolve(obj);
      }
    })
  })
}

function getFileInfo (fileName) {
  let _fixMark = fileName.slice(fileName.lastIndexOf('.') + 1)
  let fileMatch = {
    vue: {
      fileName,
      dirName: componentDir,
      fileInitConent: getComponentContent(componentIncludedFile)
    },
    scss: {
      fileName,
      dirName: scssDir,
      fileInitConent: getScssContent()
    },
    js: {
      fileName,
      dirName: entryDir,
      fileInitConent: getEntryContent(fileName.indexOf('router.js') > -1)
    }
  }
  return fileMatch[_fixMark]
}

// dir || file exists
function isExists (filePath) {
  fs.exists(filePath, function(exists){
    return exists;
  });
}

// openFile(异步)
function openFile(fileName) {
  let fileObj = getFileInfo(fileName)
  let dirName = fileObj.dirName
  if (fs.existsSync(dirName)) { // if dir exists
    _openFile(fileName)
  } else {
    createDir(fileObj).then((obj) => {
      if (obj.code === 1) _openFile(fileName)
    }).catch(err => {
      console.table(err)
    })
  }
  function _openFile(fileName) {
    fs.open(fileName, 'ax+', function (err, fd) {
      if (err) {
        return false;
      }
      addContent(fileName, fileObj.fileInitConent, fd)
    });
  }
}

// append content
function addContent(fileName, initialContent, fd) {
  fs.appendFile(fileName, initialContent, (err) => {
    if (err) {
      console.log("appendFile fail");
      return false;
    }
    // getContentSync(componentFileName)
    closeFile(fd)
  })
}

// close file 
function closeFile(fd) {
  fs.close(fd, () => {
    return true
  })
}

// initial content
function getComponentContent(flag) {
  let indexTemplate = `<template>
<div class="wrapper">
  <router-view></router-view>
</div>
</template>
<script>
export default {
  components: {},
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    const dom = weex.requireModule('dom')
    dom.getComponentRect('viewport', option => {
      const width = 750 * 750 / option.size.width
      const meta = weex.requireModule('meta')
      meta.setViewport({
        width: width
      })
      this.$router.push('/')
    })
  }
}
</script>

<style scoped lang="scss">
@import '@/sass/${componentName}/index.scss';
.wrapper {
flex: 1;
}
</style>
`;
  let otherTemplate = `<template>
  <div></div>
</template>
<script>
export default {
  name: '${componentIncludedFile ? componentIncludedFile : componentName}'
}
</script>
<style scoped lang="scss">
  @import '@/sass/${componentName}/${componentIncludedFile}.scss'
</style>`;
  return !flag ? indexTemplate : otherTemplate;
}

function getScssContent() {
  return `/*write your scss style*/`
}

function getEntryContent(flag) {
  let entryTemplate = `/* global Vue */

/* weex initialized here, please do not move this line */
const router = require('./router')
const App = require('@/views/${componentName}/index.vue')
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App))`;

  let routerTemplate = `import Router from 'vue-router'
import ${componentName} from '@/views/${componentName}'
Vue.use(Router)
module.exports = new Router({
  routes: [
    {
      path: '/',
      name: '${componentName.toLowerCase()}',
      component: ${componentName}
    }]
})`
  return flag ? routerTemplate : entryTemplate
}

function writeFilePath (source) {
  fs.writeFile(configDir, JSON.stringify(source, null, '\t'), (err) => {
    return err ? console.log(err) : ''
  })
}

// revise(add) content 
function addFilePahtContent(configDir) {
  let source = require(configDir)
  let _componentName = componentIncludedFile ? componentIncludedFile : componentName
  source.entryFilePathMap[_componentName] = `entries/${_componentName}/${_componentName}.js`
  source.routerFilePathMap[_componentName] = `entries/${_componentName}/router.js`
  writeFilePath (source)
}

// delete component
function deleteFileAndDir (curPath) {
  let files = []
  if (fs.existsSync(curPath)) { // dir exists
    files = fs.statSync(curPath).isDirectory() ? fs.readdirSync(curPath) : [] // get array of files and dir
    files.length > 0 ? _deleteFileAndDir(curPath) : fs.unlinkSync(curPath)
  }
  // is dir
  function _deleteFileAndDir (curPath) {
    files.forEach((file) => {
      let _curPath = `${curPath}/${file}`
      if (fs.statSync(_curPath).isDirectory()) { // if is Dir
        deleteFileAndDir(_curPath)
      } else { // or not
        fs.unlinkSync(_curPath)
      }
    }) 
    fs.rmdirSync(curPath)
  }
}

function deleteFilePahtContent () {
  let source = require(configDir)
  source.entryFilePathMap[componentName] && delete source.entryFilePathMap[componentName]
  source.routerFilePathMap[componentName] && delete source.routerFilePathMap[componentName]
  writeFilePath(source)
}

function initDeleteComponent () {
  let targetFile = []
  if (componentIncludedFile) { // delete files related to componentName（com.vue, scss）
    targetFile.push(`${componentDir}/${componentIncludedFile}.vue`, `${scssDir}/${componentIncludedFile}.scss`)
  } else { // delete (index.vue(dir), index.scss(dir), entry(dir), revise filePath.json )
    targetFile.push(componentDir, scssDir, entryDir)
    deleteFilePahtContent()
  }
  targetFile.length > 0 && targetFile.forEach(curPath => deleteFileAndDir(curPath))
}

/**
 * @desc create component `npm run component ComponentName [.subName]`
 * first npm run component ComponentName
 * second npm run component ComponentName subComponentName
 * 
 * @desc delete component `npm run component ComName [.subName] del`
 * */
!componentDel ? initCreateComponent() : initDeleteComponent() 