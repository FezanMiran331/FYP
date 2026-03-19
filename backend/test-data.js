import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Meeting from './models/Meeting.js'; // Check path sahi ho

dotenv.config();

const updateMeetingWithText = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB...");

    // YAHAN APNI MEETING ID DAALEIN (Jo aapke browser URL mein hai)
    const meetingId = "69b92045c26a1988ea18cb83"; 

    const dummyTranscript = `
      Speaker 1: Welcome everyone to the HoloMeet project discussion.
      Speaker 2: Today we are reviewing the AI transcription module.
      Speaker 1: Great. We decided to remove the manual audio recording and move to live text.
      Speaker 3: I will handle the frontend updates for the summary display.
      Speaker 2: I'll make sure the OpenAI API key is working for GPT-4o.
      Speaker 1: Perfect. Let's finish this by Friday.
    `;

    const updated = await Meeting.findByIdAndUpdate(
      meetingId,
      { transcriptText: dummyTranscript },
      { new: true }
    );

    if (updated) {
      console.log("✅ Success! Transcript added to Meeting:", updated.title);
    } else {
      console.log("❌ Meeting not found. Check the ID.");
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateMeetingWithText();