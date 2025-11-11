import express from "express";
import { register, verfy } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verfy);


export default router;