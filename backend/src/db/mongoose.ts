import mongoose from 'mongoose';

export async function connectDB() {
  let url = process.env.MONGO_URL || process.env.MONGODB_URI || '';
  if (!url) {
    url = 'mongodb://127.0.0.1:27017/video-curator';
    console.warn('[backend] MONGO_URL not set, falling back to local:', url);
  }
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(url);
  console.log('[backend] connected to MongoDB');
}
