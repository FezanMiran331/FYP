//Controllers/exportControllers
// backend/controllers/exportController.js
import MeetingSummary from "../models/MeetingSummary.js";
import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

// Export as PDF
export const downloadSummaryPDF = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const summary = await MeetingSummary.findOne({ meetingId });

    if (!summary) return res.status(404).json({ error: "Summary not found" });

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=HoloMeet_Summary_${meetingId}.pdf`);

    doc.pipe(res);

    // Header
    doc.fillColor("#2563eb").fontSize(24).text("HoloMeet: Meeting Summary", { align: "center" });
    doc.moveDown();

    // Main Topic & Overview
    doc.fillColor("black").fontSize(16).text(`Topic: ${summary.mainTopic}`, { underline: true });
    doc.fontSize(12).text(`Participants: ${summary.participantCount}`);
    doc.moveDown(0.5);
    doc.fontSize(11).italic().text(summary.shortOverview);
    doc.moveDown();

    // Discussion Points
    doc.fontSize(14).fillColor("#1e40af").text("Key Discussion Points:");
    summary.keyDiscussionPoints.forEach(point => doc.fontSize(11).fillColor("black").text(`• ${point}`));
    doc.moveDown();

    // Decisions
    doc.fontSize(14).fillColor("#1e40af").text("Important Decisions:");
    summary.importantDecisions.forEach(decision => doc.fontSize(11).fillColor("black").text(`✔ ${decision}`));
    doc.moveDown();

    // Action Items Table-like format
    doc.fontSize(14).fillColor("#1e40af").text("Action Items:");
    summary.actionItems.forEach(item => {
      doc.fontSize(11).fillColor("black").text(`- ${item.task} (Assigned to: ${item.assignedTo}, Deadline: ${item.deadline})`);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: "PDF Generation failed" });
  }
};

// Export as DOCX
export const downloadSummaryDocx = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const summary = await MeetingSummary.findOne({ meetingId });

    if (!summary) return res.status(404).json({ error: "Summary not found" });

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({ text: "HoloMeet Summary", heading: HeadingLevel.TITLE }),
          new Paragraph({ text: `Topic: ${summary.mainTopic}`, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: summary.shortOverview, italic: true }),
          
          new Paragraph({ text: "Key Discussion Points", heading: HeadingLevel.HEADING_2 }),
          ...summary.keyDiscussionPoints.map(p => new Paragraph({ text: `• ${p}`, bullet: { level: 0 } })),

          new Paragraph({ text: "Action Items", heading: HeadingLevel.HEADING_2 }),
          ...summary.actionItems.map(a => new Paragraph({ text: `${a.task} - Assigned to: ${a.assignedTo} (By: ${a.deadline})` }))
        ],
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.setHeader("Content-Disposition", `attachment; filename=Summary_${meetingId}.docx`);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: "DOCX Generation failed" });
  }
};