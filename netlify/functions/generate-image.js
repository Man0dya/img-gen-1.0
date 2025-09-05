const OpenAI = require('openai');
const axios = require('axios');
const FormData = require('form-data');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { prompt } = JSON.parse(event.body);

        if (!prompt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Prompt is required' })
            };
        }

        console.log('Generating image for prompt:', prompt);

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
                    model: 'flux'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 60000
                });

                const responseData = subnpResponse.data;
                console.log('Subnp response:', responseData);

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
                            continue;
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

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({
                success: true,
                photo: hostedImageUrl,
                description: prompt
            })
        };

    } catch (error) {
        console.error('Error generating or uploading image:', error);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({
                error: error.message || 'Something went wrong'
            })
        };
    }
};
