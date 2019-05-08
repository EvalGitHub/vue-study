<template>
    <div class="component-wrapper">
        <div id="renderCom">
            <render-component :data="data"/>
            <button @click="change('img')">切换为图片为组件</button>
            <button @click="change('video')">切换为视频为组件</button>
            <button @click="change('text')">切换为文本组件</button>
        </div>
    </div>
</template>
<script>
// https://segmentfault.com/a/1190000010913794?utm_source=tag-newest
 import Vue from 'vue'
 let ImgItem = {
    props: ['data'],
    render: function (createElement) {
        return createElement('div', [
            createElement('p', '图片组件'),
            createElement('img', {
                attrs: {
                    src: this.data.url
                }
            })
        ])
    }
 }

 let VideoItem = {
    props: ['data'],
    render: function (createElement) {
        return createElement("div", [
            createElement('p', '视频组件'),
            createElement('video', {
                attrs: {
                    src: this.data.url,
                    controls: 'controls',
                    autoplay: 'autoplay'
                }
            }),
        ])
    }
 }

var TextItem = {
    props: ['data'],
    render: function(createElement) {
        return createElement('div', [
            createElement('p', '纯文本组件'),
            createElement('p', this.data.text)
        ]);
    }
};
 Vue.component("render-component", {
    render: function (createElement) {
        let data = this.data
        function getComponent () {
            if (data.type === 'img') return ImgItem
            if (data.type === 'video') return VideoItem
            return TextItem    
        }
        return createElement(
            getComponent(),
            {
                props: {
                    data: data
                }
            },
            // data.children
        )
    },
    props: {
        data: {
            type: Object,
            require: true
        }
    }
 })  
 export default {
    name: 'RenderComponentFun',
    data () {
        return {
            data: {}
        }
    },
    methods: {
        change: function (type) {
            if (type === 'img') {
                this.data = {
                    type: 'img',
                    url: 'https://raw.githubusercontent.com/iview/iview/master/assets/logo.png'
                }
            } else if (type === 'video') {
                this.data = {
                    type: 'video',
                    url: 'http://vjs.zencdn.net/v/oceans.mp4'
                }
            } else if (type === 'text') {
                this.data = {
                    type: 'text',
                    content: '这是一段纯文本'
                }
            }
        }
    },
    created: function () {
        this.change('img')
    }
 }

</script>