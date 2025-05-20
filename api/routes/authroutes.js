import express from "express";
import { login, logout, register } from "../controllers/authcontrollers.js";
import upload from "../utils/multer.js";

// router oluşturma
const router = express.Router();

// yolları belirle
router.post("/register", upload.single("photo"), register);
router.post("/login", login);
router.post("/logout", logout);

// routeri app'e tanıtma
export default router;
