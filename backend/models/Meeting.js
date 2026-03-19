// models/Meeting.js
import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  // ... any other fields you added
  transcription: { type: String, default: "" },
  summary: { type: Object, default: null }
});

// This is the critical line
const Meeting = mongoose.models.Meeting || mongoose.model("Meeting", MeetingSchema);
export default Meeting;