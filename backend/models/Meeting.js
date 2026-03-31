// models/Meeting.js
import mongoose from "mongoose";
const MeetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  roomName: { type: String }, 
  hostId: { type: String },   
  transcriptText: { type: String, default: "" },
  isTranscriptionEnabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Meeting || mongoose.model("Meeting", MeetingSchema);