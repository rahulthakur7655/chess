import jwt from "jsonwebtoken";
import { config } from "../config.js";

export function createToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      username: user.username,
      email: user.email
    },
    config.jwtSecret,
    { expiresIn: "7d" }
  );
}

export function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    wins: user.wins,
    losses: user.losses,
    draws: user.draws,
    rating: user.rating,
    rank: user.rank
  };
}
