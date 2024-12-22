const pool = require("../db/db");

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users where email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    throw new Error("Error in findUserByEmail repository");
  }
};

const createUser = async (user) => {
  const { username, email, password, win_streak } = user;

  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, password, win_streak, created_at, updated_at) VALUES ($1, $2, $3, $4, now(), now()) RETURNING *",
      [username, email, password, win_streak]
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error in createUser repository");
  }
};

const getUser = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM users where id = $1", [id]);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong in db");
  }
};

const getUsers = async (limit = 10, offset = 0) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY win_streak DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    if (!result.rows || result.rows.length === 0) {
      return [];
    }

    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Error in getUsers repository");
  }
};

// const updateWinStreak = async (userId, sessionScore) => {
//   try {
//     const user = await pool.query(
//       "SELECT win_streak FROM users WHERE id = $1",
//       [userId]
//     );

//     if (user.rows.length === 0) {
//       throw new Error("User not found");
//     }

//     const currentWinStreak = user.rows[0].win_streak;
//     if (sessionScore > currentWinStreak) {
//       await pool.query("UPDATE users SET win_streak = $1 WHERE id = $2", [
//         sessionScore,
//         userId,
//       ]);
//       console.log("win_streak updated to", sessionScore);
//     } else {
//       console.log("win_streak remains the same");
//     }
//   } catch (error) {
//     console.error("Error updating win_streak:", error);
//     throw new Error("Error updating win_streak");
//   }
// };

const updateWinStreak = async (userId, sessionStreak) => {
  try {
    const user = await pool.query(
      "SELECT win_streak FROM users WHERE id = $1",
      [userId]
    );

    if (user.rows.length === 0) {
      throw new Error("User not found");
    }

    const currentWinStreak = parseInt(user.rows[0].win_streak, 10);

    if (sessionStreak > currentWinStreak) {
      await pool.query("UPDATE users SET win_streak = $1 WHERE id = $2", [
        sessionStreak,
        userId,
      ]);
      console.log(`win_streak updated to ${sessionStreak}`);
    } else {
      console.log("win_streak remains the same");
    }
  } catch (error) {
    console.error("Error updating win_streak:", error);
    throw new Error("Error updating win_streak");
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  getUser,
  getUsers,
  updateWinStreak,
};
