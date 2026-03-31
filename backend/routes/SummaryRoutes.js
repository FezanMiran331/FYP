//summaryroutes
import express from "express";
import { generateAISummary, listAvailableModels } from "../controllers/SummaryController.js";
// Assuming you have these exported in exportController.js
import { downloadSummaryPDF, downloadSummaryDocx } from "../controllers/exportController.js"; 

const router = express.Router();

// Host triggers summary generation
router.post("/:meetingId/generate", generateAISummary);
router.get("/list-models", listAvailableModels);

// Participants download results
router.get("/:meetingId/download/pdf", downloadSummaryPDF);
router.get("/:meetingId/download/docx", downloadSummaryDocx);

export default router;