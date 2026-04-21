import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { User } from "../models/User.js";
import { calculateNextRatings, getRankFromRating } from "../services/ranking.js";
import { sanitizeUser } from "../services/auth.js";

const queue = [];
const matches = new Map();

function removeFromQueue(userId) {
  const index = queue.findIndex((entry) => entry.userId === userId);

  if (index >= 0) {
    queue.splice(index, 1);
  }
}

function buildMatchPayload(match, userId) {
  const isWhite = match.white.userId === userId;
  const opponent = isWhite ? match.black : match.white;

  return {
    matchId: match.id,
    color: isWhite ? "w" : "b",
    opponent: {
      username: opponent.username,
      rating: opponent.rating,
      rank: opponent.rank
    }
  };
}

async function updateRatings(match, winnerUserId, isDraw) {
  const white = await User.findById(match.white.userId);
  const black = await User.findById(match.black.userId);

  if (!white || !black) {
    return;
  }

  const whiteScore = isDraw ? 0.5 : winnerUserId === white.id ? 1 : 0;
  const blackScore = isDraw ? 0.5 : winnerUserId === black.id ? 1 : 0;

  white.rating = calculateNextRatings(white.rating, black.rating, whiteScore);
  black.rating = calculateNextRatings(black.rating, white.rating, blackScore);
  white.rank = getRankFromRating(white.rating);
  black.rank = getRankFromRating(black.rating);

  if (isDraw) {
    white.draws += 1;
    black.draws += 1;
  } else if (winnerUserId === white.id) {
    white.wins += 1;
    black.losses += 1;
  } else {
    black.wins += 1;
    white.losses += 1;
  }

  await white.save();
  await black.save();

  return {
    white: sanitizeUser(white),
    black: sanitizeUser(black)
  };
}

export function attachMatchmaking(io) {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Missing token"));
      }

      const payload = jwt.verify(token, config.jwtSecret);
      const user = await User.findById(payload.id);

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = sanitizeUser(user);
      return next();
    } catch {
      return next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("queue:join", () => {
      removeFromQueue(socket.user.id);

      const opponentIndex = queue.findIndex(
        (entry) => Math.abs(entry.rating - socket.user.rating) <= 250
      );

      if (opponentIndex === -1) {
        queue.push({
          socketId: socket.id,
          userId: socket.user.id,
          username: socket.user.username,
          rating: socket.user.rating,
          rank: socket.user.rank
        });

        socket.emit("queue:waiting");
        return;
      }

      const opponent = queue.splice(opponentIndex, 1)[0];
      const whiteFirst = Math.random() > 0.5;
      const match = {
        id: `${Date.now()}-${socket.user.id}-${opponent.userId}`,
        white: whiteFirst
          ? {
              socketId: socket.id,
              userId: socket.user.id,
              username: socket.user.username,
              rating: socket.user.rating,
              rank: socket.user.rank
            }
          : opponent,
        black: whiteFirst
          ? opponent
          : {
              socketId: socket.id,
              userId: socket.user.id,
              username: socket.user.username,
              rating: socket.user.rating,
              rank: socket.user.rank
            },
        finished: false
      };

      matches.set(match.id, match);
      io.to(match.white.socketId).emit(
        "match:found",
        buildMatchPayload(match, match.white.userId)
      );
      io.to(match.black.socketId).emit(
        "match:found",
        buildMatchPayload(match, match.black.userId)
      );
    });

    socket.on("queue:leave", () => {
      removeFromQueue(socket.user.id);
    });

    socket.on("move:play", ({ matchId, move }) => {
      const match = matches.get(matchId);

      if (!match || match.finished) {
        return;
      }

      const isParticipant =
        match.white.userId === socket.user.id || match.black.userId === socket.user.id;

      if (!isParticipant) {
        return;
      }

      const opponentSocketId =
        match.white.userId === socket.user.id
          ? match.black.socketId
          : match.white.socketId;

      io.to(opponentSocketId).emit("move:played", { matchId, move });
    });

    socket.on("match:finish", async ({ matchId, result }) => {
      const match = matches.get(matchId);

      if (!match || match.finished) {
        return;
      }

      match.finished = true;
      const winnerUserId =
        result === "draw" ? null : result === "win" ? socket.user.id : null;
      const updatedUsers = await updateRatings(match, winnerUserId, result === "draw");

      io.to(match.white.socketId).emit("match:finished", {
        result:
          result === "draw"
            ? "draw"
            : match.white.userId === socket.user.id
              ? "win"
              : "loss",
        profile: updatedUsers?.white
      });

      io.to(match.black.socketId).emit("match:finished", {
        result:
          result === "draw"
            ? "draw"
            : match.black.userId === socket.user.id
              ? "win"
              : "loss",
        profile: updatedUsers?.black
      });

      matches.delete(matchId);
    });

    socket.on("disconnect", () => {
      removeFromQueue(socket.user.id);
    });
  });
}
