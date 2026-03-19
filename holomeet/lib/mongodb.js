// lib/mongodb.js
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  try {
    return await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log("MongoDB Error:", err);
  }
};
