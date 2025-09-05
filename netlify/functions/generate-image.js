import fetch from 'node-fetch';
import FormData from 'form-data';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

export async function handler(event, context) {
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

    let imageUrl;

    // Try OpenAI first
    try {
      console.log('Trying OpenAI...');

      const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          prompt,
          n: 1,
          size: '1024x1024'
        })
      });

      if (!openaiResponse.ok) {
        throw new Error('OpenAI API failed');
      }

      const openaiData = await openaiResponse.json();
      imageUrl = openaiData.data[0].url;
      console.log('OpenAI success:', imageUrl);

    } catch (openaiError) {
      console.log('OpenAI failed, trying subnp.com fallback...');

      // Fallback to subnp.com
      try {
        const subnpResponse = await fetch('https://subnp.com/api/free/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt: prompt,
            model: 'flux'
          })
        });

        const responseText = await subnpResponse.text();
        console.log('Subnp response:', responseText);

        // Parse the streaming response
        const lines = responseText.split('\n');
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
        console.error('Both OpenAI and subnp failed');
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Both image generation services failed' })
        };
      }
    }

    // Download the image
    console.log('Downloading image from:', imageUrl);
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    // Upload to imgbb
    console.log('Uploading to imgbb...');
    const formData = new FormData();
    formData.append('image', Buffer.from(imageBuffer), { filename: 'generated_image.png' });

    const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData
    });

    const imgbbData = await imgbbResponse.json();

    if (!imgbbData.success) {
      throw new Error('Failed to upload to imgbb');
    }

    const hostedImageUrl = imgbbData.data.url;
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
      body: JSON.stringify({ error: error.message || 'Something went wrong' })
    };
  }
}
