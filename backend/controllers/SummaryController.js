// backend/controllers/summaryController.js
// backend/controllers/summaryController.js
import Meeting from "../models/Meeting.js";
import MeetingSummary from "../models/MeetingSummary.js";
import { GoogleGenAI } from "@google/genai";

// 1. Available models ki list dikhane wala function
export const listAvailableModels = async (req, res) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const modelsResponse = await ai.models.list();
    
    console.log("--- Available Gemini Models ---");
    const modelList = [];
    
    for await (const model of modelsResponse) { 
      console.log(model.name);
      modelList.push(model.name);
    }
    
    res.json({ success: true, models: modelList });
  } catch (error) {
    console.error("Models fetch failed:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// 2. Main Summary Function
export const generateAISummary = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const meeting = await Meeting.findById(meetingId);
    
    if (!meeting) return res.status(404).json({ error: "Meeting not found" });

    // FIX: Match the model's schema field 'transcriptText'
    if (!meeting.transcriptText || meeting.transcriptText.length < 5) {
      return res.status(400).json({ error: "No transcription text found." });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
      Summarize this meeting into a strict JSON object:
      {
        "mainTopic": "String",
        "shortOverview": "String",
        "participantCount": Number,
        "keyDiscussionPoints": ["String"],
        "importantDecisions": ["String"],
        "actionItems": [{ "assignedTo": "String", "task": "String", "deadline": "String" }]
      }
      Transcription: ${meeting.transcriptText} 
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { responseMimeType: "application/json" }
    });

    // FIX: Safely parse JSON in case the AI wraps it in markdown backticks
    const cleanText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    const aiData = JSON.parse(cleanText);

    const updatedSummary = await MeetingSummary.findOneAndUpdate(
      { meetingId: meeting._id },
      { 
        ...aiData, 
        meetingId: meeting._id, 
        hostId: meeting.hostId, 
        transcriptText: meeting.transcriptText, 
        status: 'completed' 
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, summary: updatedSummary });

  } catch (error) {
    console.error("Gemini Final Error:", error.message);
    
    // NEW ADDITION: Catch Quota/Rate Limit errors gracefully
    if (error.status === 429 || error.message.includes("quota") || error.message.includes("429")) {
      return res.status(429).json({
        success: false,
        error: "Quota limit reached. Please wait a minute and try again."
      });
    }

    // Default fallback for other errors
    res.status(500).json({ 
        success: false,
        error: "AI Processing failed.", 
        message: error.message 
    });
  }
};