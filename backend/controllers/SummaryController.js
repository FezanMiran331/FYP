// // backend/controllers/summaryController.js
// // backend/controllers/summaryController.js
// import { OpenAI } from "openai";
// import Meeting from "../models/Meeting.js";
// import MeetingSummary from "../models/MeetingSummary.js";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export const generateAISummary = async (req, res) => {
//   try {
//     const { meetingId } = req.params;
    
//     // 1. Fetch meeting and check for transcription text
//     const meeting = await Meeting.findById(meetingId);
//     if (!meeting) return res.status(404).json({ error: "Meeting not found" });

//     if (!meeting.transcriptText || meeting.transcriptText.length < 10) {
//       return res.status(400).json({ error: "No transcription data available for summarization." });
//     }

//     // 2. GPT-4o: Process the text transcript
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//         { 
//           role: "system", 
//           content: `Summarize the meeting transcript into a professional JSON format. 
//           Include: mainTopic, shortOverview, participantCount (number), 
//           keyDiscussionPoints (array), importantDecisions (array), 
//           and actionItems (array of objects with keys: assignedTo, task, deadline).` 
//         },
//         { role: "user", content: meeting.transcriptText }
//       ],
//       response_format: { type: "json_object" }
//     });

//     const aiSummary = JSON.parse(completion.choices[0].message.content);

//     // 3. SAVE to MeetingSummary Collection
//     const newSummary = await MeetingSummary.findOneAndUpdate(
//       { meetingId: meeting._id },
//       {
//         meetingId: meeting._id,
//         roomName: meeting.roomName,
//         hostId: meeting.hostId,
//         mainTopic: aiSummary.mainTopic,
//         shortOverview: aiSummary.shortOverview,
//         participantCount: aiSummary.participantCount,
//         keyDiscussionPoints: aiSummary.keyDiscussionPoints,
//         importantDecisions: aiSummary.importantDecisions,
//         actionItems: aiSummary.actionItems,
//         transcriptText: meeting.transcriptText,
//         status: 'completed'
//       },
//       { upsert: true, new: true }
//     );

//     // 4. Real-time broadcast via Socket.io
//     const io = req.app.get('io');
//     if (io) io.to(meeting.roomName).emit('summary-generated', newSummary);

//     res.json({ success: true, summary: newSummary });
//   } catch (error) {
//     console.error("AI Error:", error);
//     res.status(500).json({ error: "Failed to generate summary", details: error.message });
//   }
// };
import { OpenAI } from "openai";
import Meeting from "../models/Meeting.js";
import MeetingSummary from "../models/MeetingSummary.js";

export const generateAISummary = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const meeting = await Meeting.findById(meetingId);
    
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });

    // FIXED: Uses text from database, not a file
    if (!meeting.transcriptText || meeting.transcriptText.length < 5) {
      return res.status(400).json({ error: "No transcription text found. Summarization cannot proceed." });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "Summarize this meeting into JSON: mainTopic, shortOverview, participantCount, keyDiscussionPoints[], importantDecisions[], actionItems[{assignedTo, task, deadline}]." 
        },
        { role: "user", content: meeting.transcriptText }
      ],
      response_format: { type: "json_object" }
    });

    const aiData = JSON.parse(completion.choices[0].message.content);

    // Save/Update the summary in the specific MeetingSummary collection
    const updatedSummary = await MeetingSummary.findOneAndUpdate(
      { meetingId: meeting._id },
      { ...aiData, meetingId: meeting._id, hostId: meeting.hostId, transcriptText: meeting.transcriptText, status: 'completed' },
      { upsert: true, new: true }
    );

    res.json({ success: true, summary: updatedSummary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Summarization failed. Check API Quota." });
  }
};