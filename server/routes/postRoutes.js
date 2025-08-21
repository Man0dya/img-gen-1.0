import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import {v2 as cloudinary} from 'cloudinary';
import Post from '../mongodb/models/post.js';

dotenv.config();
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET all posts
router.route('/').get(async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({ 
                success: true, 
                data: [],
                message: "Database not connected - no posts available"
            });
        }
        
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// CREATE a post
router.route('/').post(async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ 
                success: false, 
                message: "Database not connected - cannot save posts"
            });
        }

        const { name, prompt, photo } = req.body;
        
        // For now, skip Cloudinary upload and save the photo directly
        // You can add Cloudinary back later when you have the credentials
        const newPost = await Post.create({
            name,
            prompt,
            photo: photo, // Save the base64 image directly
        });

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;