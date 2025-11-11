import express from "express";
import { login, logout, register, verfy } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verfy);
router.post("/login", login);
router.post("/logout", logout);


export default router;