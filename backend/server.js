// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import 'dotenv/config';
import { createServer } from "http";
import { Server } from "socket.io";

import contactRoutes from "./routes/Contactroutes.js";
import Registeration_router from "./routes/Registeration_route.js";
import login_router from "./routes/LoginRoute.js";
import passwordRouter from "./routes/PasswordRoute.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import summaryRoutes from "./routes/SummaryRoutes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app); 

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);
  
  socket.on('join-room', (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit('user-joined', { socketId: socket.id, timestamp: new Date() });
  });
  
  socket.on('leave-room', (roomName) => {
    socket.leave(roomName);
    socket.to(roomName).emit('user-left', { socketId: socket.id, timestamp: new Date() });
  });
  
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true
  })
);

app.use("/api", contactRoutes);
app.use("/api", Registeration_router);
app.use("/api", login_router);
app.use("/api/password", passwordRouter);
app.use("/api/meetings", meetingRoutes);
app.use("/api/profile", userRoutes); 
app.use("/api/summary", summaryRoutes);

app.get("/api/test", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/YourDBName";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    httpServer.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

export default app;