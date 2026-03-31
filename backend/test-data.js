//backend/test-data.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Meeting from './models/Meeting.js'; 

dotenv.config();
const updateMeetingWithText = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB...");

    const meetingId = "69acde686974013eaa7edf57"; 

    const dummyTranscript = `
      Speaker 1: Welcome everyone to the HoloMeet project discussion.
      Speaker 2: We are testing the Gemini summary generation today.
      Speaker 3: Everything looks good on the frontend.
      Speaker 1: Let's aim to finish this by Friday.
    `;

    // FIX: Model ke mutabiq field name 'transcriptText' use kiya hai
    const updated = await Meeting.findByIdAndUpdate(
      meetingId,
      { transcriptText: dummyTranscript }, 
      { new: true }
    );

    if (updated) {
      console.log("✅ SUCCESS: Data added to 'transcriptText' field for:", updated.title);
    } else {
      console.log("❌ ERROR: Meeting ID not found.");
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateMeetingWithText();