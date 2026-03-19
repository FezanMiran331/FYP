// routes/Contactroutes.js
import express from "express";
import { submitContactForm } from "../controllers/ContactController.js";

const router = express.Router();

// POST route to save contact form data
router.post("/contact", submitContactForm);

export default router;
