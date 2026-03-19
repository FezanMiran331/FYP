import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";

const router = express.Router();

// GET /api/profile?email=user@example.com

router.get("/", getProfile);

// PUT /api/profile

router.put("/", updateProfile);

export default router;