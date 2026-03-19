//routes//summaryRoutes
import express from "express";
import { generateAISummary } from "../controllers/summaryController.js";
import { downloadSummaryPDF, downloadSummaryDocx } from "../controllers/exportController.js";

const router = express.Router();

// Host triggers summary generation
router.post("/:meetingId/generate", generateAISummary);

// Participants download results
router.get("/:meetingId/download/pdf", downloadSummaryPDF);
router.get("/:meetingId/download/docx", downloadSummaryDocx);

export default router;