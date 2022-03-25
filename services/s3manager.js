const AWS = require("aws-sdk");
const fs = require("fs");
const nanoid = require("nanoid");
const path = require('path');
const authConfig = require("../config/auth.config");

AWS.config.update({region: 'us-east-1'});

const s3 = new AWS.S3({
    accessKeyId: authConfig.aws.accessKeyId,
    secretAccessKey: authConfig.aws.secretAccessKey
});

const uploadFile = (filePath, ext, next) => {
    fs.readFile(filePath, (err, data) => {
        if (err) return next(err);
        let fileName = nanoid.nanoid() + (ext || path.extname(filePath));
        const params = {
            Bucket: authConfig.aws.bucket,
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

module.exports = {uploadFile};