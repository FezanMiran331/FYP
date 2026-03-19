import express from "express";
import { loginUser } from "../controllers/LoginController.js";

const login_router = express.Router();

login_router.post("/login", loginUser);

export default login_router;
