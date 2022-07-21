const AWS = require("aws-sdk");
const fs = require("fs");
const nanoid = require("nanoid");
const path = require('path');
const mime = require('mime');

AWS.config.update({region: 'us-east-1'});

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = (filePath, ext, next) => {
    fs.readFile(filePath, (err, data) => {
        if (err) return next(err);
        let fileName = nanoid.nanoid() + (ext || path.extname(filePath));
        const params = {
            Bucket: process.env.PRODUCT_MANAGER_S3_BUCKET,
            Key: fileName,
            Body: data,
            ACL: "public-read"
        };
        s3.upload(params, function (s3Err, data) {
            if (s3Err) return next(s3Err);
            next(null, data.Key);
        });
    });
};

const getFile = function (req, res, next) {
    try {
        let key = req.params.file;
        let params = {Bucket: process.env.PRODUCT_MANAGER_S3_BUCKET, Key: key};
        let mimeType = mime.getType(key);
        s3.getObject(params)
            .on('httpHeaders', function (statusCode, headers) {
                res.set('Content-Length', headers['content-length']);
                res.set('Content-Type', mimeType);
                this.response.httpResponse.createUnbufferedStream()
                    .pipe(res);
            })
            .send();
    } catch (e) {
        next(e);
    }
}

module.exports = {uploadFile, getFile};