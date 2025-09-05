// In-memory storage for posts (persists during function runtime)
let inMemoryPosts = [];

export async function handler(event, context) {
  // Handle CORS preflight requests
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
      console.log('Fetching posts from memory, count:', inMemoryPosts.length);

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
        body: JSON.stringify({
          success: true,
          data: inMemoryPosts.reverse() // Show newest first
        })
      };

    } else if (event.httpMethod === 'POST') {
      // Create a new post
      const { name, prompt, photo } = JSON.parse(event.body);

      if (!name || !prompt || !photo) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
          },
          body: JSON.stringify({ error: 'Name, prompt, and photo are required' })
        };
      }

      // Create new post object
      const newPost = {
        _id: Date.now().toString(),
        name,
        prompt,
        photo,
        createdAt: new Date().toISOString()
      };

      // Add to in-memory storage
      inMemoryPosts.unshift(newPost);

      console.log('Post created successfully, total posts:', inMemoryPosts.length);

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
    console.error('Error in posts function:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify({ error: error.message || 'Something went wrong' })
    };
  }
}
