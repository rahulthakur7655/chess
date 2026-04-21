import express from "express";
import { User } from "../models/User.js";
import { sanitizeUser } from "../services/auth.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const users = await User.find().sort({ rating: -1, wins: -1 }).limit(20);
  return res.json({ users: users.map(sanitizeUser) });
});

export default router;
