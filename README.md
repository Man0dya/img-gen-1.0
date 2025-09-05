# AI Image Generator

**Live Demo 👉 [img-generator-1-0.netlify.app](https://img-generator-1-0.netlify.app)**

---

## 🌍 AI-Powered Art Generation 🍃🎨

**img-gen-1.0** is a full-stack web application that makes AI image generation accessible to everyone. With **dual-API fallback**, **permanent image hosting**, and a **community-powered gallery**, you can generate, save, and share AI art effortlessly.

---

## 🚀 What’s Inside

✅ **Dual-API Image Generation**: OpenAI DALL·E + free subnp.com fallback  
✅ **Permanent Image Hosting**: All images stored on imgbb  
✅ **Community Gallery**: MongoDB-powered searchable gallery  
✅ **Responsive Design**: Beautiful UI with Tailwind CSS & React  
✅ **Netlify Ready**: Seamlessly deployed frontend

---

## 💡 Key Features

### 🎨 **AI Image Generation**
- **Primary**: OpenAI DALL·E (requires API key)
- **Fallback**: subnp.com free API (no API key required)
- **Multiple Models**: flux, turbo, magic, etc.
- **High Resolution**: Quality AI-generated art

### 🖼️ **Image Hosting & Gallery**
- **Permanent Storage** via imgbb
- **Community Gallery** with artist names & prompts
- **Search Functionality** to filter images
- **Responsive Grid Layout** for a clean design

### 🔧 **Technical Highlights**
- **Dual Database**: MongoDB + in-memory fallback
- **Error Handling** with graceful API fallback
- **Environment Config**: Supports dynamic API URLs
- **SPA Routing**: React Router with Netlify redirects

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- OpenAI API (DALL·E)
- subnp.com API (fallback, no key needed)

### Hosting & Services
- Netlify (frontend hosting)
- imgbb (image hosting)
- MongoDB Atlas (database)

---

## 📁 Project Structure

```
img-gen-1.0/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   ├── dist/               # Production build
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── mongodb/            # Database models
│   └── package.json
├── netlify.toml            # Netlify config
└── README.md
```

---

## 🎯 API Endpoints (Netlify Functions)

### Generate Image
```
POST /.netlify/functions/generate-image
Body: { "prompt": "your image description" }
Response: { "success": true, "photo": "imgbb-url", "description": "prompt" }
```

### Get Gallery
```
GET /.netlify/functions/posts
Response: { "success": true, "data": [posts] }
```

### Share Image
```
POST /.netlify/functions/posts
Body: { "name": "artist", "prompt": "description", "photo": "imgbb-url" }
```

---

## 🔄 How the Dual-API System Works

1. User submits a prompt → Client sends it to backend
2. Backend tries **OpenAI** first → Returns result if successful
3. If OpenAI fails → Automatically switches to **subnp.com**
4. Generated image → Uploaded to **imgbb** for permanent storage
5. imgbb URL → Returned to frontend & displayed in gallery

✅ **Reliable** (works even if one API is down)  
✅ **Cost-Effective** (free fallback available)  
✅ **No Keys Needed** (subnp API works without authentication)  
✅ **High-Quality Results**

---

## 🎨 Try It Out

👉 Visit the live demo: [img-generator-1-0.netlify.app](https://img-generator-1-0.netlify.app)

### How to Use:
1. Enter a descriptive prompt
2. Click **Generate Image**
3. Wait a few seconds for AI magic ✨
4. Preview, download, or share your creation
5. Explore the **Community Gallery** for inspiration

---

## 📈 Performance & Optimization

- **Lazy Loading**: Smooth gallery browsing
- **API Caching**: Faster responses
- **Image Compression**: Optimized delivery
- **Global CDN**: Powered by Netlify

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Submit a pull request

---

## 🙏 Acknowledgments

- **OpenAI** for DALL·E
- **subnp.com** for free fallback API
- **imgbb** for image hosting
- **Netlify** for frontend hosting
- **MongoDB Atlas** for database hosting

---
