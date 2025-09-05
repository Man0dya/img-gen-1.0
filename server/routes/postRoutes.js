import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import Post from '../mongodb/models/post.js';

dotenv.config();
const router = express.Router();

// In-memory storage for posts when database is not available
let inMemoryPosts = [];

// GET all posts
router.route('/').get(async (req, res) => {
    try {
        console.log('Fetching posts...');
        console.log('MongoDB connection state:', mongoose.connection.readyState);

        // Check if MongoDB is connected
        if (mongoose.connection.readyState === 1) {
            console.log('Using database for posts');
            const posts = await Post.find({});
            console.log('Found posts in database:', posts.length);
            res.status(200).json({ success: true, data: posts });
        } else {
            console.log('Using in-memory storage for posts');
            console.log('Found posts in memory:', inMemoryPosts.length);
            res.status(200).json({ success: true, data: inMemoryPosts });
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        // Fallback to in-memory storage
        console.log('Fallback to in-memory storage');
        res.status(200).json({ success: true, data: inMemoryPosts });
    }
});

// CREATE a post
router.route('/').post(async (req, res) => {
    try {
        console.log('Creating post with data:', req.body);

        const { name, prompt, photo } = req.body;

        // Create post object
        const newPost = {
            _id: Date.now().toString(), // Simple ID for in-memory storage
            name,
            prompt,
            photo: photo, // Save the imgbb hosted image URL
            createdAt: new Date()
        };

        // Try to save to database if connected
        if (mongoose.connection.readyState === 1) {
            console.log('Saving post to database...');
            const dbPost = await Post.create({
                name,
                prompt,
                photo: photo,
            });
            console.log('Post saved to database successfully:', dbPost._id);
            newPost._id = dbPost._id; // Use database ID
        } else {
            console.log('Database not connected, saving to in-memory storage');
        }

        // Always save to in-memory storage
        inMemoryPosts.unshift(newPost); // Add to beginning of array
        console.log('Post saved to in-memory storage. Total posts:', inMemoryPosts.length);

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE a post by ID (for cleanup)
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting post with ID:', id);

        // Try to delete from database if connected
        if (mongoose.connection.readyState === 1) {
            const deletedPost = await Post.findByIdAndDelete(id);
            if (deletedPost) {
                console.log('Post deleted from database:', deletedPost._id);
                // Also remove from in-memory storage if it exists
                inMemoryPosts = inMemoryPosts.filter(post => post._id !== id);
                res.status(200).json({ success: true, message: 'Post deleted successfully' });
            } else {
                res.status(404).json({ success: false, message: 'Post not found' });
            }
        } else {
            // Delete from in-memory storage
            const initialLength = inMemoryPosts.length;
            inMemoryPosts = inMemoryPosts.filter(post => post._id !== id);
            if (inMemoryPosts.length < initialLength) {
                console.log('Post deleted from in-memory storage');
                res.status(200).json({ success: true, message: 'Post deleted from memory' });
            } else {
                res.status(404).json({ success: false, message: 'Post not found in memory' });
            }
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
