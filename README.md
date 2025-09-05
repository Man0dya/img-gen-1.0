# 🌞 FutureWatt AI Image Generator

**Clean Energy. Smarter Living. AI-Powered Art Generation** 🍃🌍🎨

FutureWatt is a full-stack web application that revolutionizes AI image generation with dual-API fallback, permanent image hosting, and a beautiful community gallery.

---

## 🚀 What We Built

✅ **Dual-API Image Generation**: OpenAI DALL-E + subnp.com fallback (no API key required)
✅ **Permanent Image Hosting**: All images uploaded to imgbb for long-term storage
✅ **Community Gallery**: MongoDB-powered gallery with search functionality
✅ **Responsive Design**: Beautiful UI with Tailwind CSS and React
✅ **Netlify Ready**: Fully configured for Netlify deployment

---

## 💡 Key Features

### 🎨 **AI Image Generation**
- **Primary**: OpenAI DALL-E (requires API key)
- **Fallback**: subnp.com free API (no API key needed)
- **Models**: Supports multiple AI models (flux, turbo, magic, etc.)
- **Quality**: High-resolution image generation

### 🖼️ **Image Hosting & Gallery**
- **Permanent Storage**: imgbb integration for reliable hosting
- **Community Gallery**: View all generated images
- **Search Functionality**: Find images by name or prompt
- **Responsive Grid**: Beautiful card-based layout

### 🔧 **Technical Features**
- **Dual Database**: MongoDB + in-memory fallback
- **Error Handling**: Graceful API failure management
- **Environment Config**: Dynamic API base URL support
- **SPA Routing**: React Router with Netlify redirects

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **OpenAI API** - Primary image generation
- **subnp.com API** - Free fallback generation

### Hosting & Services
- **Netlify** - Frontend deployment
- **imgbb** - Image hosting service
- **MongoDB Atlas** - Database hosting

---

## 📁 Project Structure

```
img-gen-1.0/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   ├── dist/              # Built production files
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   ├── mongodb/           # Database models
│   └── package.json
├── netlify.toml           # Netlify configuration
└── README.md
```

---

## 🚀 Deployment to Netlify

### Step 1: Prepare Your Backend
1. **Deploy Backend Separately** (Heroku, Vercel, or VPS)
2. **Get Your Backend URL** (e.g., `https://your-backend.herokuapp.com`)
3. **Ensure CORS is configured** for your frontend domain

### Step 2: Deploy Frontend to Netlify

#### Option A: GitHub Integration (Recommended)
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure build settings:
     - **Branch**: `main`
     - **Build command**: `npm run build`
     - **Publish directory**: `client/dist`

3. **Set Environment Variables**:
   - Go to Site Settings → Environment Variables
   - Add: `VITE_API_BASE_URL=https://your-backend-url.com`

4. **Deploy**: Click "Deploy site"

#### Option B: Manual Drag & Drop
1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Deploy manually"
   - Drag the entire `client/dist` folder into the deployment area
   - Click "Deploy site"

### Step 3: Configure Environment
Create a `.env` file in the client folder:
```bash
VITE_API_BASE_URL=https://your-backend-url.com
```

---

## 🔧 Environment Variables

### Backend (.env)
```bash
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
OPENAI_API_KEY=sk-proj-your-openai-key
IMGBB_API_KEY=your-imgbb-api-key
```

### Frontend (.env)
```bash
VITE_API_BASE_URL=https://your-backend-url.com
```

---

## 🎯 API Endpoints

### Image Generation
```
POST /api/v1/imgGen
Body: { "prompt": "your image description" }
Response: { "success": true, "photo": "imgbb-url", "description": "prompt" }
```

### Gallery
```
GET /api/v1/post
Response: { "success": true, "data": [posts] }
```

### Create Post
```
POST /api/v1/post
Body: { "name": "artist", "prompt": "description", "photo": "imgbb-url" }
```

---

## 🔄 How the Dual-API System Works

1. **User submits prompt** → Client sends to backend
2. **Backend tries OpenAI first** → If successful, returns image
3. **If OpenAI fails** → Automatically switches to subnp.com
4. **Image downloaded** → Uploaded to imgbb for permanent hosting
5. **imgbb URL returned** → Displayed in gallery

### Benefits:
- ✅ **Reliability**: Works even if OpenAI is down
- ✅ **Cost-effective**: Free fallback option
- ✅ **No API keys needed**: subnp.com works without authentication
- ✅ **Quality**: Both APIs produce high-quality images

---

## 🎨 Usage

### Generate Images
1. Enter a descriptive prompt
2. Click "Generate Image"
3. Wait for AI generation (10-30 seconds)
4. Preview your creation

### Share with Community
1. Add your artist name
2. Click "Share with Community"
3. Image appears in the gallery instantly

### Browse Gallery
1. View all community-generated images
2. Search by artist name or prompt
3. Get inspired by others' creations

---

## 🐛 Troubleshooting

### Common Issues:

**Gallery not loading:**
- Check MongoDB connection
- Verify backend URL in environment variables
- Check browser console for CORS errors

**Image generation failing:**
- OpenAI API key might be invalid/expired
- subnp.com might be temporarily down
- Check network connectivity

**Build failing on Netlify:**
- Ensure Node.js version is set to 18
- Check build command: `npm run build`
- Verify publish directory: `client/dist`

---

## 📈 Performance & Optimization

- **Lazy Loading**: Images load as you scroll
- **Caching**: API responses cached for better performance
- **Compression**: Images optimized for web delivery
- **CDN**: Netlify's global CDN for fast loading

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **OpenAI** for DALL-E image generation
- **subnp.com** for free AI image generation
- **imgbb** for reliable image hosting
- **Netlify** for amazing deployment platform
- **MongoDB Atlas** for database hosting

---

**Made with ❤️ for the AI art community**
