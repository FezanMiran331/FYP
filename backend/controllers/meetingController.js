// backend/controllers/meetingController.js
import Meeting from "../models/Meeting.js";

/**
 * @desc    Initialize a new meeting with host and transcription support
 * @route   POST /api/meetings/create
 */
export const createMeeting = async (req, res) => {
  try {
    const { title, date, description, hostId, roomName } = req.body;

    if (!title || !date || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const meeting = await Meeting.create({ 
      title, 
      date, 
      description,
      hostId, 
      roomName: roomName || `room-${Date.now()}`, 
      transcriptText: "" 
    });

    res.status(201).json({ success: true, meeting });
  } catch (error) {
    console.error("Create Meeting Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

/**
 * @desc    Get a single meeting by ID (ISKI KAMI THI!)
 * @route   GET /api/meetings/:id
 */
export const getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findById(id);

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    res.status(200).json(meeting);
  } catch (error) {
    console.error("Get Meeting By ID Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

/**
 * @desc    Append live text to the meeting transcript in real-time
 * @route   PATCH /api/meetings/append-transcription
 */
export const appendTranscription = async (req, res) => {
  try {
    const { meetingId, newText } = req.body;

    const meeting = await Meeting.findByIdAndUpdate(
      meetingId,
      { $set: { transcriptText: newText } }, 
      { new: true }
    );

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    res.status(200).json({ success: true, message: "Live transcript updated" });
  } catch (error) {
    console.error("Transcription Update Error:", error);
    res.status(500).json({ error: "Failed to update transcription" });
  }
};

/**
 * @desc    Get all meetings sorted by latest first
 * @route   GET /api/meetings
 */
export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 });
    res.status(200).json(meetings);
  } catch (error) {
    console.error("Get Meetings Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};