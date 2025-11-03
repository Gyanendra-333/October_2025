import express from "express";
import { getUser, signin, signout, signup, updateProfile } from "../controller/user.controller.js";
import { isAuthenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.get("/sign-out", isAuthenticate, signout);
router.get("/me", isAuthenticate, getUser);
router.put("/update-profile", isAuthenticate, updateProfile);

export default router;
