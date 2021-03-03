const http = require("http");
const path = require("path");
const server = http.createServer();
const fse = require("fs-extra");
const multiparty = require("multiparty");

const UPLOAD_DIR = path.resolve(__dirname, "./", "target"); // 大文件存储目录
const extractExt = filename => filename.slice(filename.lastIndexOf("."), filename.length);

const resolvePost = req => new Promise(resolve => {
    let chunk = "";
    req.on('data', data => {
        chunk+=data;
    });
    req.on('end', () => {
        resolve(JSON.parse(chunk));
    })
});

const pipeStream = (path, writeStream) =>
  new Promise(resolve => {
    const readStream = fse.createReadStream(path);
    readStream.on("end", () => {
      fse.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
});

// 返回已上传文件列表
const createUploadedList = async fileHash => {
  return fse.existsSync(path.resolve(UPLOAD_DIR, fileHash)) ? await fse.readdir(path.resolve(UPLOAD_DIR, fileHash)) : [];
};

// 合并切片
const mergeFileChunk = async (filePath, fileHash, size) => {
    const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
    const chunkPaths = await fse.readdir(chunkDir);
    // 根据切片下标进行排序
    // 否则直接读取目录的获得的顺序可能会错乱
    chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
    await Promise.all(
      chunkPaths.map((chunkPath, index) =>
        pipeStream(
          path.resolve(chunkDir, chunkPath),
          // 指定位置创建可写流
          fse.createWriteStream(filePath, {
            start: index * size,
            end: (index + 1) * size
          })
        )
      )
    );
    fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
  };
  

server.on("request", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        res.status = 200;
        res.end();
        return;
    }

    if (req.url === "/merge") { // 文件合并
        const data = await resolvePost(req);
        const { filename,size, fileHash } = data;
        const ext = extractExt(filename);
        const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);
        await mergeFileChunk(filePath, fileHash, size);
        res.end(
            JSON.stringify({
                code: 0,
                message: "file merged success"
            })
        );
    }

    if (req.url === '/verify') {
      const data = await resolvePost(req);
      const {fileHash, filename} = data;
      const ext = extractExt(filename);
      const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);
      if (fse.existsSync(filePath)) {
        res.end(JSON.stringify({
          shouldUpload: false
        }));
      } else {
        let list = await createUploadedList(fileHash)
        res.end(JSON.stringify({
          shouldUpload: true,
          uploadedList: list,
        }));
      }
    }

    if (req.url === '/') {
      const multipart = new multiparty.Form();
      multipart.parse(req, async(err, fields, files) => {
          if (err) {
              return;
          }
          const [chunk] = files.chunk;
          const [hash] = fields.hash;
          const [fileHash] = fields.fileHash;
          const [filename] = fields.filename;
          const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
          const filePath = path.resolve(
            UPLOAD_DIR,
            `${fileHash}${extractExt(filename)}`
          );

          // 文件存在直接返回
          if (fse.existsSync(filePath)) {
            res.end("file exist");
            return;
          }

          // 切片目录不存在，创建切片目录
          if (!fse.existsSync(chunkDir)) {
              await fse.mkdirs(chunkDir);
          }
          await fse.move(chunk.path, path.resolve(chunkDir, hash));
          res.end("received file chunk");
      })
    }
});

server.listen(3000, () => console.log("正在监听 3000 端口"));
