
<template>
    <div>
        <p class="test_des">moncao_editor编辑器的使用</p>
        <div id="container" class="container"></div>
    </div>
    <!--https://www.oschina.net/p/monaco-editor?hmsr=aladdin1e1-->
    <!--https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html#definetheme-->
</template>
<script>
    import * as monaco from 'monaco-editor';
    
    export default {
        name: 'monacoEditor',
        data() {
            return {
                monacoEditor: null,
                value: 'this is test fun'
            }
        },
        mounted() {
            monaco.editor.defineTheme('mytheme', {
                base: 'vs',
                inherit: false,
                rules: [
                    {token: 'source.myLang', foreground: '606266'},
                    {background: 'DC143C'}
                ],
                colors: {
                    'editor.background': '#8fbda8',
                    'editor.lineHighlightBorder': '#cccccc'
                }
            });
            this.monacoEditor = monaco.editor.create(document.getElementById('container'), {
                value: this.value,
                language: 'javascript',
                BuiltinTheme: 'vs-dark'
            });
        }
    }
</script>  

<style scoped>
    .test_des {
        text-align: left;
    }
    .container {
        width:1000px;
        height:600px;
        border:1px solid grey;
        text-align: left;
    }
</style>