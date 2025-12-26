import express from "express";
import { forgotPassword, login, logout, register, resetPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgetPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

export default router;