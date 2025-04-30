import express from "express";
import { register, login, logout } from "../controllers/authcontrollers.js";
import upload from "../utils/multer.js";

const router = express.Router();

// KAYIT
router.post("/register", upload.single("photo"), register);

// GİRİŞ
router.post("/login", login);

// ÇIKIŞ
router.post("/logout", logout);

export default router;
