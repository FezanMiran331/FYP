//Models/MeetingSummary
import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  roomName: { type: String }, // LiveKit room identify karne ke liye
  hostId: { type: String },   // Only host can generate summary
  
  // LIVE TRANSCRIPTION DATA
  transcriptText: { 
    type: String, 
    default: "" // Meeting ke dauran isme text append hota rahega
  },
  
  // STATUS FOR UI
  isTranscriptionEnabled: { 
    type: Boolean, 
    default: false 
  },
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Meeting || mongoose.model("Meeting", MeetingSchema);