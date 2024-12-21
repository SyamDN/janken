const pool = require("../db/db");
const userRepository = require("./users");

const createGameSession = async (userId, sessionScore) => {
  try {
    const result = await pool.query(
      "INSERT INTO game_sessions (user_id, session_score, created_at, ended_at) VALUES ($1, $2, NOW(), NOW())",
      [userId, sessionScore]
    );

    await userRepository.updateWinStreak(userId, sessionScore);

    return result.rows[0];
  } catch (error) {
    console.error("Error saving game session:", error);
    throw new Error("Error saving game session");
  }
};

module.exports = {
  createGameSession,
};
