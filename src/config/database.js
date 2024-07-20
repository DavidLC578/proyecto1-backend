import mongoose from 'mongoose';
import './dotenv.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 
        'mongodb://localhost:27017/proyecto', {
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
