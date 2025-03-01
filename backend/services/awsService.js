const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const path = require('path');

//AWS S3 bucket name
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_CONTENT;

/**
 * Upload an image to S3
 * @param {Object} file - Multer file object
 * @returns {String} - Image URL
 */

const uploadImageToS3 = async (file) => {
    const uniqueKey = `${crypto.randomUUID()}${path.extname(file.originalname)}`;

    const params = {
        Bucket: BUCKET_NAME,
        Key: uniqueKey,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    return `https://${BUCKET_NAME}.s3.amazonaws.com/${uniqueKey}`;
};

/**
 * Delete an image from S3
 * @param {String} imageUrl - URL of image to delete
 */

const deleteImageFromS3 = async (imageUrl)  => {
    const key = imageUrl.split("/").pop();

    const params = {
        Bucket: BUCKET_NAME,
        Key: key
    };

    await s3.send(new DeleteObjectCommand(params));
};

module.exports = { uploadImageToS3, deleteImageFromS3 };