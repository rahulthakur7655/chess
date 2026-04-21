import bcrypt from "bcryptjs";
import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { User } from "../models/User.js";
import { createToken, sanitizeUser } from "../services/auth.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username }]
  });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email: email.toLowerCase(),
    passwordHash
  });

  return res.status(201).json({
    token: createToken(user),
    user: sanitizeUser(user)
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  return res.json({
    token: createToken(user),
    user: sanitizeUser(user)
  });
});

router.get("/me", requireAuth, async (req, res) => {
  return res.json({ user: sanitizeUser(req.user) });
});

export default router;
