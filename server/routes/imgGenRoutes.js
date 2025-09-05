import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import axios from 'axios';
import FormData from 'form-data';

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

        let imageUrl;

        // Try OpenAI first
        try {
            console.log('Trying OpenAI...');
            const response = await openai.images.generate({
                prompt,
                n: 1,
                size: '1024x1024',
            });
            imageUrl = response.data[0].url;
            console.log('OpenAI success:', imageUrl);
        } catch (openaiError) {
            console.log('OpenAI failed, trying subnp.com fallback...');

            // Fallback to subnp.com
            try {
                const subnpResponse = await axios.post('https://subnp.com/api/free/generate', {
                    prompt: prompt,
                    model: 'flux' // Using flux model as default
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 60000 // 60 second timeout
                });

                // Parse the streaming response
                const responseData = subnpResponse.data;
                console.log('Subnp response:', responseData);

                // Extract the final result from streaming data
                const lines = responseData.split('\n');
                let finalResult = null;

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.substring(6));
                            if (data.status === 'complete' && data.success && data.imageUrl) {
                                finalResult = data;
                                break;
                            }
                        } catch (e) {
                            // Skip invalid JSON
                        }
                    }
                }

                if (finalResult && finalResult.imageUrl) {
                    imageUrl = finalResult.imageUrl;
                    console.log('Subnp success:', imageUrl);
                } else {
                    throw new Error('Failed to get image URL from subnp response');
                }

            } catch (subnpError) {
                console.error('Both OpenAI and subnp failed:', subnpError.message);
                throw new Error('Both image generation services failed');
            }
        }

        // Download the image
        console.log('Downloading image from:', imageUrl);
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        console.log('Image downloaded, size:', imageBuffer.length);

        // Upload to imgbb
        console.log('Uploading to imgbb...');
        const formData = new FormData();
        formData.append('image', imageBuffer, { filename: 'generated_image.png' });

        const imgbbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, formData, {
            headers: formData.getHeaders(),
        });

        const hostedImageUrl = imgbbResponse.data.data.url;
        console.log('Imgbb upload successful:', hostedImageUrl);

        res.status(200).json({
            success: true,
            photo: hostedImageUrl,
            description: prompt
        });

    } catch (error) {
        console.error('Error generating or uploading image:', error);
        res.status(500).json({ error: error.message || 'Something went wrong' });
    }
});

export default router;
