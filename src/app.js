import express from 'express';
import connectDB from './config/database.js';
import './config/dotenv.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes  from './routes/authRoutes.js';
import cors from 'cors'

const app = express();
connectDB();

app.use(cors())

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


app.use('/api', userRoutes);
app.use('/api', authRoutes);

export default app;
