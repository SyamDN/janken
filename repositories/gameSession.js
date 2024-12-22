const pool = require("../db/db");
// const userRepository = require("./users");

const createGameSession = async (userId, sessionScore, sessionStreak) => {
  try {
    const result = await pool.query(
      `INSERT INTO game_sessions (user_id, session_score, session_streak, created_at)
      VALUES ($1, $2, COALESCE($3, 0), NOW())
      RETURNING *;`,
      [userId, sessionScore, sessionStreak]
    );
    console.log("Result from database:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error saving game session:", error);
    throw new Error("Error saving game session");
  }
};

const getLastGameSession = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM game_sessions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1",
      [userId]
    );

    if (result.rows[0]) {
      result.rows[0].session_score = parseInt(result.rows[0].session_score, 10);
      result.rows[0].session_streak = parseInt(
        result.rows[0].session_streak,
        10
      );
    }
    console.log("Result from database:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching last game session:", error);
    throw new Error("Error fetching last game session");
  }
};

const updateGameSessionEndedAt = async (gameId) => {
  try {
    const result = await pool.query(
      `UPDATE game_sessions
       SET ended_at = NOW()
       WHERE game_id = $1
       RETURNING *;`,
      [gameId]
    );
    console.log("Updated game session:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating game session ended_at:", error);
    throw new Error("Error updating game session ended_at");
  }
};

module.exports = {
  createGameSession,
  getLastGameSession,
  updateGameSessionEndedAt,
};
