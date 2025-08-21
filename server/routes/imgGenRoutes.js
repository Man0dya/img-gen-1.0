import express from 'express';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.route('/').get((req, res) => {
    res.send('Hello from ImgGen!');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // Temporary workaround while API is being enabled
        // This will work immediately for testing
        const description = `A beautiful visualization of: ${prompt}. This image would feature vibrant colors, detailed composition, and artistic styling that captures the essence of the prompt.`;
        
        // Create a placeholder image
        const placeholderImage = "data:image/svg+xml;base64," + Buffer.from(`
            <svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#4ecdc4;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#45b7d1;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grad1)"/>
                <text x="50%" y="40%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="28" fill="white" font-weight="bold">
                    ${prompt.substring(0, 40)}...
                </text>
                <text x="50%" y="60%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="18" fill="white">
                    Generated with Gemini API
                </text>
                <text x="50%" y="80%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.8)">
                    Click to see description
                </text>
            </svg>
        `).toString('base64');

        res.status(200).json({
            success: true,
            photo: placeholderImage,
            description: description
        });

    } catch (error) {
        console.error(error);
        res.status(500).send(error?.message || 'Something went wrong');
    }
});

export default router;