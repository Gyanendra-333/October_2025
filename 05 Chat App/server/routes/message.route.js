import express from "express";
import { isAuthenticate } from "../middleware/auth.middleware.js";
import { getAllUsers, getMessage, sendMessage } from "../controller/message.controller.js";

const router = express.Router();

router.get("/all-users", isAuthenticate, getAllUsers)
router.get("/:id", isAuthenticate, getMessage);
router.get("send/:id", isAuthenticate, sendMessage);


export default router;