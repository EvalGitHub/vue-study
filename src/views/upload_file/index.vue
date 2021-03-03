<template>
   <div>
    <input type="file" @change="handleFileChange" />
    <button @click="handleUpload">上传</button>
    <span>{{uploadPercentage}}</span>
    <p>
        <button @click="handlePause">暂停上传</button>
    </p>
  </div>
</template>

<script>
const SIZE = 50 * 1024 * 1024;
import {xhrFun} from '../../utils/common.js';
export default {
    name: 'uploadFile',
    computed: {
        uploadPercentage() {
            if (!this.container.file || !this.fileData.length) return 0;
            const loaded = this.fileData.map(item => item.size * item.percentage).reduce((acc, cur) => acc + cur);
            return parseInt((loaded / this.container.file.size).toFixed(2));
        }
    },
    data: () => ({
        container: {
            file: null,
            hash: null
        },
        fileData: [],
        hashPercentage: null,
        requestList: [],
    }),
    methods: {
        handleFileChange(e) {
            const [file] = e.target.files;
            if (!file) return;
            Object.assign(this.$data, this.$options.data());
            this.container.file = file;
        },

        handlePause() {
            this.requestList.forEach(xhr => xhr.abort());
            this.requestList = [];
        },

        // 生成文件切片
        createFileChunk(file, size=SIZE) {
            const fileChunkList = [];
            let cur = 0;
            while(cur < file.size) {
                fileChunkList.push({file: file.slice(cur, cur+size)});
                cur += size;
            }
            return fileChunkList;
        },

        calculateHash(fileChunkList) {
            return new Promise(resolve => {
                // 添加 worker 属性
                this.container.worker = new Worker("/hash.js");
                this.container.worker.postMessage({ fileChunkList });
                this.container.worker.onmessage = e => {
                    const { percentage, hash } = e.data;
                    this.hashPercentage = percentage;
                    if (hash) {
                        resolve(hash);
                    }
                };
            });
        },

        // 上传切片
        async uploadChunks() {
           const requestList = this.fileData.map(({chunk, hash,index}) => {
               const formData = new FormData;
                formData.append("chunk", chunk);
                formData.append("hash", hash);
                formData.append("filename", this.container.file.name);
                return {formData, index};
           }).map(async({formData, index}) => xhrFun({  
                url: "http://localhost:3000",
                data: formData, 
                onProgress: this.createProgressHandler(this.fileData[index]),
                requestList: this.requestList
            }));
           await Promise.all(requestList); // 并发切片
           await this.mergeRequest();
        },

        // 文件秒传进行校验
        async verifyUplaod(fileName, fileHash) {
            const {data} = await xhrFun({
                url: "http://localhost:3000/verify",
                headers: {
                    'content-type': 'application/json'
                },
                data: JSON.stringify({
                    filename: fileName,
                    fileHash,
                })
            }); 
            return JSON.parse(data);
        },

        async handleUpload() {
            if (!this.container.file) return;
            const fileChunkList = this.createFileChunk(this.container.file);
            this.container.hash = await this.calculateHash(fileChunkList);
            // const {shouldUpload} = await this.verifyUplaod(this.container.file.name, this.container.hash);
      /*       if (!shouldUpload) {
                alert('文件传递成功了');
                return;
            }
 */
            this.fileData = fileChunkList.map(({file}, index) => ({
                fileHash: this.container.hash,
                chunk: file,
                index: index,
                size: file.size,
                hash: this.container.file.name + '-' + index,
                percentage:0
            }));
            await this.uploadChunks();
        },

        async mergeRequest() {
            await xhrFun({
                url: "http://localhost:3000/merge",
                headers: {
                    "content-tyep": "application/json"
                },
                data: JSON.stringify({
                    size: SIZE,
                    filename: this.container.file.name,
                })
            })
        },

        createProgressHandler(item) {
            return e => {
                item.percentage = parseInt(String((e.loaded / e.total) * 100));
            }
        },
    }
};
</script>
