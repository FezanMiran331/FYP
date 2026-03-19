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
// import summaryRoutes from "./routes/SummaryRoutes.js"; // NEW
import summaryRoutes from "./routes/SummaryRoutes.js";

// Load environment variables (must run before using process.env)
dotenv.config();

const app = express();
const httpServer = createServer(app); // Wrap express app with HTTP server

/**
 * SOCKET.IO SETUP FOR REAL-TIME SUMMARY BROADCASTING
 */
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Make io accessible in route handlers
app.set('io', io);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);
  
  // Join a specific meeting room
  socket.on('join-room', (roomName) => {
    socket.join(roomName);
    console.log(`📍 User ${socket.id} joined room: ${roomName}`);
    
    // Notify others in the room
    socket.to(roomName).emit('user-joined', {
      socketId: socket.id,
      timestamp: new Date()
    });
  });
  
  // Leave a meeting room
  socket.on('leave-room', (roomName) => {
    socket.leave(roomName);
    console.log(`👋 User ${socket.id} left room: ${roomName}`);
    
    // Notify others in the room
    socket.to(roomName).emit('user-left', {
      socketId: socket.id,
      timestamp: new Date()
    });
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
  
  // Custom event: Request summary status
  socket.on('request-summary-status', async (data) => {
    const { meetingId, roomName } = data;
    // You can emit back the current status
    socket.emit('summary-status', {
      meetingId,
      status: 'processing' // or fetch from DB
    });
  });
});

/**
 * MIDDLEWARE
 */
// parse JSON bodies
app.use(express.json());

// CORS - allow your frontend (adjust origin as needed)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    // origin: "*" // Use specific origin in production for security
    credentials: true
  })
);

/**
 * ROUTES
 * Keep route prefixes intentional.
 */
app.use("/api", contactRoutes);
app.use("/api", Registeration_router);
app.use("/api", login_router);
app.use("/api/password", passwordRouter);
app.use("/api/meetings", meetingRoutes);
app.use('/api/meetings', meetingRoutes);
app.use("/api/profile", userRoutes); 
// app.use("/api/summaries", summaryRoutes); // NEW - AI Summary routes
app.use("/api/summary", summaryRoutes);
app.use('/uploads', express.static('uploads'));

// Serve recordings directory (if needed for playback)
app.use('/recordings', express.static('recordings'));

/**
 * Simple test route to verify server is running
 */
app.get("/api/test", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

/**
 * Health check route with Socket.io status
 */
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date(),
    socketConnections: io.engine.clientsCount,
    message: "Server and Socket.io are running"
  });
});

/**
 * 404 handler for unknown routes
 */
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

/**
 * Basic error handler
 */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/**
 * MONGO CONNECTION & SERVER START
 */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/YourDBName";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    
    // Use httpServer instead of app for Socket.io support
    httpServer.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`🔌 Socket.io ready for real-time communication`);
      console.log(`📊 API Endpoints:`);
      console.log(`   - POST /api/summaries/generate (Generate AI Summary)`);
      console.log(`   - GET  /api/summaries/:summaryId (Get Summary)`);
      console.log(`   - GET  /api/summaries/meeting/:meetingId (Get by Meeting)`);
      console.log(`   - GET  /api/summaries/:summaryId/pdf (Export PDF)`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/**
 * Graceful shutdown handling
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  httpServer.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

export default app; // Export for testing if needed