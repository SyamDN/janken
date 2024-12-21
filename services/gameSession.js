const gameSessionRepository = require("../repositories/gameSession");
const userRepository = require("../repositories/users");

const createGameSession = async (userId, sessionScore) => {
  try {
    const gameSession = await gameSessionRepository.createGameSession(
      userId,
      sessionScore
    );

    await userRepository.updateWinStreak(userId, sessionScore);

    return gameSession;
  } catch (error) {
    console.error("Error in createGameSession:", error);
    throw new Error("Error in creating game session");
  }
};

module.exports = { createGameSession };
