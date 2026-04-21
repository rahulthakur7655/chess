export function getRankFromRating(rating) {
  if (rating >= 2200) return "Diamond";
  if (rating >= 1800) return "Platinum";
  if (rating >= 1400) return "Gold";
  if (rating >= 1000) return "Silver";
  return "Bronze";
}

export function calculateNextRatings(playerRating, opponentRating, score) {
  const expected = 1 / (1 + 10 ** ((opponentRating - playerRating) / 400));
  const kFactor = playerRating < 2000 ? 32 : 24;
  return Math.round(playerRating + kFactor * (score - expected));
}
