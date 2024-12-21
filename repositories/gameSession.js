const pool = require("../db/db");
const userRepository = require("./users");

const createGameSession = async (userId, sessionScore) => {
  try {
    const lastSession = await pool.query(
      "SELECT session_streak FROM game_sessions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1",
      [userId]
    );

    const sessionStreak =
      lastSession.rows.length > 0 && sessionScore === 1
        ? lastSession.rows[0].session_streak + 1
        : sessionScore === 1
        ? 1
        : 0;

    const result = await pool.query(
      "INSERT INTO game_sessions (user_id, session_score, session_streak, created_at, ended_at) VALUES ($1, $2, $3, NOW(), NOW())",
      [userId, sessionScore, sessionStreak]
    );

    await userRepository.updateWinStreak(userId, sessionStreak);

    return result.rows[0];
  } catch (error) {
    console.error("Error saving game session:", error);
    throw new Error("Error saving game session");
  }
};

module.exports = {
  createGameSession,
};
