import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("❌ Missing MONGODB_URI in .env.local");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return; // Already connected → skip

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      dbName: "travio",
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
};
