//Models/MeetingSummary
import mongoose from "mongoose";

const ActionItemSchema = new mongoose.Schema({
  assignedTo: { type: String },
  task: { type: String },
  deadline: { type: String }
}, { _id: false }); // _id is false because we don't need unique IDs for sub-documents here

const MeetingSummarySchema = new mongoose.Schema({
  // --- References to the original meeting ---
  meetingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Meeting", 
    required: true 
  },
  hostId: { type: String },
  transcriptText: { type: String }, // Saving a snapshot of the text used
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },

  // --- AI Generated Fields ---
  mainTopic: { type: String },
  shortOverview: { type: String },
  participantCount: { type: Number },
  keyDiscussionPoints: [{ type: String }],
  importantDecisions: [{ type: String }],
  actionItems: [ActionItemSchema],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.MeetingSummary || mongoose.model("MeetingSummary", MeetingSummarySchema);