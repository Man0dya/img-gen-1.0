# 🎨 Image Generation App  
You can try the app here - **[🌐 Live Demo](https://img-gen-image-generator.netlify.app)**  

A modern web application for generating AI-powered images and sharing them with the community.  

---

## ✨ Features  

- 🖌️ **AI Image Generation** – Create stunning images using advanced AI models  
- 🌍 **Community Gallery** – Share and discover images created by the community  
- 💡 **Smart Prompts** – Get creative inspiration with intelligent prompt suggestions  
- 🔎 **Search & Filter** – Easily find images by tags, descriptions, or creators  
- 📱 **Responsive Design** – Beautiful interface that works on all devices  
- ⚡ **Real-time Updates** – See new community posts as they’re shared  

---

## 🛠️ Technology Stack  

### **Frontend**  
- ⚛️ **React 19** – Modern UI framework  
- ⚡ **Vite** – Fast build tool and dev server  
- 🎨 **Tailwind CSS** – Utility-first CSS framework  
- 🛤️ **React Router** – Client-side routing  

### **Backend**  
- 🟢 **Node.js** – JavaScript runtime  
- 🚀 **Express.js** – Web application framework  
- 🍃 **MongoDB** – NoSQL database  
- 🗂️ **Mongoose** – MongoDB object modeling  

### **External APIs & Services**  
- 🤖 **AI Image Generation API** – For creating images from text prompts  
- ☁️ **Cloudinary** – Cloud image storage and optimization  

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- API keys for image generation service
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd img-gen-1.0
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   AI_API_KEY=your_image_generation_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 8080) and frontend (port 5173).

## 📁 Project Structure

```
img-gen-1.0/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── assets/        # Static assets and images
│   │   ├── utils/         # Utility functions and helpers
│   │   └── constants/     # Application constants
│   ├── public/            # Public static files
│   └── package.json
├── server/                # Node.js backend API
│   ├── routes/           # API route handlers
│   ├── mongodb/          # Database models and connection
│   └── package.json
└── package.json          # Root package.json for scripts
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run server` | Start only the backend server |
| `npm run client` | Start only the frontend development server |
| `npm run install-all` | Install dependencies for all packages |

## 🌐 API Endpoints

### Image Generation
- `POST /api/v1/imgGen` - Generate image from text prompt

### Posts
- `GET /api/v1/post` - Retrieve all community posts
- `POST /api/v1/post` - Create a new community post

## 🎨 How to Use

1. **Generate Images**
   - Navigate to the "Create" page
   - Enter a descriptive prompt for your image
   - Click "Generate" to create your AI image

2. **Get Inspiration**
   - Use the "Surprise Me" feature for random creative prompts
   - Browse the community gallery for ideas

3. **Share with Community**
   - After generating an image, click "Share with the community"
   - Add a title and description for your post
   - Your image will appear in the community gallery

4. **Discover Content**
   - Browse the home page to see all shared images
   - Use the search functionality to find specific content
   - Filter and sort posts as needed

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Built with modern web technologies
- Powered by AI image generation APIs
- Community-driven development
