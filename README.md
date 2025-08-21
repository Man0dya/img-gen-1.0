# img-gen-1.0

<<<<<<< Updated upstream
Image generation App made with OpenAi API to generate images and share with community
=======
An AI-powered image generation application built with React and Node.js, featuring DALL-E integration for creating stunning AI-generated images.

## 🚀 Features

- **AI Image Generation**: Create images using DALL-E AI with text prompts
- **Community Sharing**: Share your generated images with the community
- **Random Prompt Generator**: Get creative inspiration with the "Surprise Me" feature
- **Search Functionality**: Search through shared images by name or prompt
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Google Gemini API
- Cloudinary (Image Storage)

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v16 or higher)
2. **MongoDB** database (local or cloud)
3. **Google Gemini API Key** (Get from [Google AI Studio](https://aistudio.google.com/))
4. **Cloudinary Account** (Get from [Cloudinary](https://cloudinary.com/console))

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd img-gen-1.0
```

### 2. Install dependencies
```bash
npm run install-all
```

### 3. Set up environment variables

Create a `.env` file in the `server` directory:
```env
MONGODB_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the application
```bash
npm run dev
```

This will start both the backend server (port 8080) and frontend development server (port 5173).

## 📁 Project Structure

```
img-gen-1.0/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main pages (Home, CreatePost)
│   │   ├── assets/        # Images and static files
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API endpoints
│   ├── mongodb/          # Database models and connection
│   └── package.json
└── package.json
```

## 🔧 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend development server
- `npm run install-all` - Install dependencies for all packages

## 🌐 API Endpoints

### Image Generation
- `POST /api/v1/imgGen` - Generate image description using Gemini

### Posts
- `GET /api/v1/post` - Get all shared posts
- `POST /api/v1/post` - Create a new post

## 🎨 Usage

1. **Generate Images**: Navigate to "Create" page and enter a prompt
2. **Use Surprise Me**: Click "Surprise Me" for random creative prompts
3. **Share Images**: After generating, click "Share with the community"
4. **Browse Gallery**: View all shared images on the home page
5. **Search**: Use the search bar to find specific images

**Note**: This version uses Gemini API for image descriptions. For actual image generation, you may want to integrate with services like Stable Diffusion or other image generation APIs.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.
>>>>>>> Stashed changes
