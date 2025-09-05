// Simple in-memory storage for posts (resets on function cold start)
// In production, consider using a database service or Netlify's built-in storage
let posts = [
    {
        _id: 'sample-1',
        name: 'Demo Artist',
        prompt: 'A beautiful sunset over mountains, digital art',
        photo: 'https://i.ibb.co/example1.jpg',
        createdAt: new Date().toISOString()
    },
    {
        _id: 'sample-2',
        name: 'AI Creator',
        prompt: 'Cyberpunk cityscape at night, neon lights',
        photo: 'https://i.ibb.co/example2.jpg',
        createdAt: new Date().toISOString()
    }
];

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
            },
            body: ''
        };
    }

    try {
        if (event.httpMethod === 'GET') {
            // Return all posts
            console.log('Fetching posts, count:', posts.length);

            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                },
                body: JSON.stringify({
                    success: true,
                    data: posts.reverse() // Most recent first
                })
            };

        } else if (event.httpMethod === 'POST') {
            // Create new post
            const { name, prompt, photo } = JSON.parse(event.body);

            if (!name || !prompt || !photo) {
                return {
                    statusCode: 400,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                    },
                    body: JSON.stringify({
                        error: 'Name, prompt, and photo are required'
                    })
                };
            }

            const newPost = {
                _id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name,
                prompt,
                photo,
                createdAt: new Date().toISOString()
            };

            // Add to beginning of array (most recent first)
            posts.unshift(newPost);

            console.log('New post created:', newPost._id);

            return {
                statusCode: 201,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                },
                body: JSON.stringify({
                    success: true,
                    data: newPost
                })
            };

        } else {
            return {
                statusCode: 405,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                },
                body: JSON.stringify({ error: 'Method not allowed' })
            };
        }

    } catch (error) {
        console.error('Posts function error:', error);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
            },
            body: JSON.stringify({
                error: error.message || 'Internal server error'
            })
        };
    }
};
