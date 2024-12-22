const pool = require("../db/db");
// const userRepository = require("./users");

const createGameSession = async (userId, sessionScore, sessionStreak) => {
  try {
    const result = await pool.query(
      `INSERT INTO game_sessions (user_id, session_score, session_streak, created_at, ended_at)
      VALUES ($1, $2, COALESCE($3, 0), NOW(), NOW())
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

module.exports = {
  createGameSession,
  getLastGameSession,
};
