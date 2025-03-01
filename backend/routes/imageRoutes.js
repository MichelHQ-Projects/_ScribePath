const express = require('express');
const multer = require('multer');
const {uploadImageToS3, deleteImageFromS3} = require("../services/awsService");
const authenticateUser = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route POST /api/images/upload
 * @desc Upload an image to AWS S3
 * @access Private
 */

router.post("/upload", authenticateUser, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        //Validate file type and size

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({ message: "Invalid file type. Only JPEG, JPG, PNG files are allowed." });
        }
        if (req.file.size > 5 * 1024 * 1024) {
            return res.status(400).json({ message: "File size exceeds 5MB" });
        }

        const imageUrl =  await uploadImageToS3(req.file);
        res.status(201).json({ imageUrl });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route DELETE /api/images/delete
 * @desc Delete an image from AWS S3
 * @access Private
 */

router.delete("/delete", authenticateUser, async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: "Image URL is required" });
        }

        await deleteImageFromS3(imageUrl);
        res.status(200).json({ message: "Image deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;