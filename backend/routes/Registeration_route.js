import express from "express";
import { registerUser } from "../controllers/RegisterController.js";
const Registeration_router = express.Router();

Registeration_router.post("/register", registerUser);

export default Registeration_router;
