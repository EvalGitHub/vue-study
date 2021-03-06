<template>
    <article>
        <section>
            <input type="file" @change="handleFileChange" />
            <el-button @click="handleUpload">上传</el-button>
            <span>--- {{uploadPercentage}}</span>
            <el-button @click="getFile">下载文件</el-button> 
            <p>
                <el-button @click="handlePause">暂停上传</el-button> 
                <el-button @click="handleResume">恢复上传</el-button> 
            </p>
            <div class="text-align-left">计算文件 hash</div>
            <el-progress :percentage="hashPercentage"></el-progress>
            <div class="text-align-left">总进度</div>
            <el-progress :percentage="uploadPercentage"></el-progress>
            <el-table :data="fileData">
                <el-table-column
                    prop="hash"
                    label="切片hash"
                    align="center"
                ></el-table-column>
                <el-table-column label="大小(KB)" align="center" width="120">
                    <template v-slot="{ row }">
                    {{ row.size | transformByte }}
                    </template>
                </el-table-column>
                <el-table-column label="进度" align="center">
                    <template v-slot="{ row }">
                        <el-progress
                            :percentage="row.percentage"
                            color="#909399"
                        ></el-progress>
                    </template>
                </el-table-column>
            </el-table>
        </section>
  </article>
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

        filters: {
            transformByte(val) {
                return Number((val / 1024).toFixed(0));
            }
        },

        watch: {
            uploadPercentage(now) {
                if (now > this.fakeUploadPercentage) {
                    this.fakeUploadPercentage = now;
                }
            }
        },

        data: () => ({
            container: {
                file: null,
                hash: null
            },

            fileData: [],
            hashPercentage: 0,
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

            async handleResume() {
                const {uploadedList} = await this.verifyUplaod(this.container.file.name, this.container.hash);
                await this.uploadChunks(uploadedList);
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
            async uploadChunks(uploadedList = []) {
                const requestList = this.fileData.filter(({ hash }) => !uploadedList.includes(hash))
                    .map(({chunk, hash, index}) => {
                    const formData = new FormData;
                        formData.append("chunk", chunk);
                        formData.append("hash", hash);
                        formData.append("filename", this.container.file.name);
                        formData.append("fileHash", this.container.hash);
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
                const {shouldUpload, uploadedList} = await this.verifyUplaod(this.container.file.name, this.container.hash);
                if (!shouldUpload) {
                    alert('文件传递成功了');
                    return;
                }
                this.fileData = fileChunkList.map(({file}, index) => ({
                    fileHash: this.container.hash,
                    chunk: file,
                    index: index,
                    size: file.size,
                    hash: this.container.hash +  '-' + index, //this.container.file.name + '-' + index,
                    percentage: uploadedList.includes(index) ? 100 : 0
                }));
                await this.uploadChunks(uploadedList);
            },

            async mergeRequest() {
                await xhrFun({
                    url: "http://localhost:3000/merge",
                    headers: {
                        "content-tyep": "application/json"
                    },
                    data: JSON.stringify({
                        size: SIZE,
                        fileHash: this.container.hash,
                        filename: this.container.file.name,
                    })
                })
            },

            createProgressHandler(item) {
                return e => {
                    item.percentage = parseInt(String((e.loaded / e.total) * 100));
                }
            },

            // 文件下载
             /*   downloadRange(url, start, end, i) {

            }, */

            /*      getFileInfo() {
                return xhrFun({
                    url: "http://localhost:3000/download/file",
                    method: 'head',
                }); 
            }, */

            async getFile() {
                const fileSize = this.container.file.size;
                console.log('fileSize', fileSize);
                const downloadReqArr = [];
                let start = 0;
                let i = 0;
                while(start < fileSize) {
                    downloadReqArr.push(this.downloadFile(start, start + SIZE -1, i++));
                    start+=SIZE;
                }
                let dataSectionArr = await Promise.all(downloadReqArr);
                this.concatenate(dataSectionArr);
            },

            async downloadFile(start, end, i) {
            /*     const {data} = await xhrFun({
                    url: "http://localhost:3000/download/file",
                    headers: {
                        'content-type': 'application/json',
                        'range': `bytes=${start}-${end}`,
                    },
                    data: JSON.stringify({
                        filehash: this.container.hash,
                        filename: this.container.file.name,
                    }),
                    responseType: 'blob',
                }); 
                return data; */
                let count = 0;
                return new Promise((resolve) => {
                    const req = new XMLHttpRequest();
                    req.open("POST", "http://localhost:3000/download/file", true);
                    req.setRequestHeader("range", `bytes=${start}-${end}`);
                    req.setRequestHeader("content-type", 'application/json');
                    req.responseType = "blob";
                    req.onload = function () {
                        req.response.arrayBuffer().then((res) => {
                            count++;
                            console.log(`下载百分比${((count / length) * 100).toFixed(2)}`);
                            resolve({
                                i,
                                buffer: JSON.parse(res),
                            });
                        });
                    };
                    req.send(JSON.stringify({
                        filehash: this.container.hash,
                        filename: this.container.file.name,
                    }),);
                });
            },

            // 合并文件
            concatenate(dataSectionArr) {
                console.log('dataSectionArr', dataSectionArr);
                // resultConstructor, arrays
                const arrBufferList = dataSectionArr.sort(item => item.i - item.i).map(item => new Uint8Array(item.buffer));
                console.log('arrBufferList', arrBufferList);
                let totalLength = 0;
                for (let arr of arrBufferList) {
                    totalLength += arr.length;
                }
                let result = new Uint8Array(totalLength);
                let offset = 0;
                for (let arr of arrBufferList) {
                    result.set(arr, offset);
                    offset += arr.length;
                }
                this.downFileFun(result);
            },

            downFileFun(data) {
                const aTag = document.createElement('a');
                const blob = new Blob([data],  { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                const blobUrl = URL.createObjectURL(blob);
                aTag.href = blobUrl;
                aTag.download = 'downFile';
                aTag.click();
                URL.revokeObjectURL(blob);
                console.timeEnd("直接下载");
            }
        }
    };
</script>

<style scoped>
    .text-align-left {
        text-align: left;
    }
</style>
