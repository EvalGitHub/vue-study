export function xhrFun({ url, method = "post", data, headers = {}, onProgress, requestList}) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        typeof onProgress === 'function' && xhr.upload.addEventListener("progress", (e) => {
            onProgress(e);
        }, false);
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
            xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = e => {
            if (requestList) {
                const xhrIndex = requestList.findIndex(item => item === xhr);
                requestList.splice(xhrIndex, 1);
            }
            resolve({
                data: e.target.response
            });
        };
        // 暴露当前 xhr 给外部
        Array.isArray(requestList) && requestList.push(xhr);
    });  
}