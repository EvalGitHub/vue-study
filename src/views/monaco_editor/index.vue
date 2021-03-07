
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
    // import {EditorRuleColorConfig, EditorColorConfig} from './editor_config';
    export default {
        name: 'monacoEditor',
        data() {
            return {
                monacoEditor: null,
                value: 'this is test fun'
            }
        },
        mounted() {
            monaco.editor.defineTheme('myCustomTheme', {
                "inherit":true,
                "base":"vs-dark",
                "colors": {
                    "editor.background": '#101010'
                },
                "rules": [
                    { token: 'custom-info', foreground: 'a3a7a9', background: 'ffffff' },
                    { token: 'custom-error', foreground: 'ee4444' },
                    { token: 'custom-notice', foreground: '1055af' },
                    { token: 'custom-date', foreground: '20aa20' },
                ]
            });
            this.monacoEditor = monaco.editor.create(document.getElementById('container'), {
                value: this.value,
                language: 'javascript',
                BuiltinTheme: 'vs-dark',
                theme: 'myCustomTheme'
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