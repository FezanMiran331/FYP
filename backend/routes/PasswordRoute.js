import express from "express";
import {
  requestResetPassword,
  setNewPassword,
} from "../controllers/PasswordController.js";

const router = express.Router();

// Step 1: verify email
router.post("/request-reset", requestResetPassword);

// Step 2: set new password
router.post("/set-new-password", setNewPassword);

export default router;
