import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import imgGenRoutes from './routes/imgGenRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/imgGen', imgGenRoutes);

app.get('/', async(req, res) => {
    res.send('Hello from Img_gen_1.0!');
})

const startServer = async() => {

    try {
        // Try to connect to MongoDB, but don't fail if it's not available
        try {
            await connectDB(process.env.MONGODB_URL);
            console.log('MongoDB connected successfully');
        } catch (dbError) {
            console.log('MongoDB connection failed, but server will continue without database functionality');
            console.log('To enable full features, please start MongoDB or use MongoDB Atlas');
        }
        
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'));

    } catch (error) {
        console.error(error);
    } 
}

startServer();
