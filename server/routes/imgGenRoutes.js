import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

console.log('OpenAI API key loaded:', process.env.OPENAI_API_KEY ? 'yes' : 'no');
console.log('OpenAI API key starts with:', process.env.OPENAI_API_KEY?.substring(0,10));

router.route('/').get((req, res) => {
    res.send('Hello from ImgGen!');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log('Received prompt:', prompt);

        const response = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
        });

        console.log('OpenAI response:', response);

        const imageUrl = response.data[0].url;

        res.status(200).json({
            success: true,
            photo: imageUrl,
            description: prompt
        });

    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: error.message || 'Something went wrong' });
    }
});

export default router;
