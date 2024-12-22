const gameSessionRepository = require("../repositories/gameSession");
const userRepository = require("../repositories/users");

const createGameSession = async (userId, sessionScore, sessionStreak) => {
  try {
    const gameSession = await gameSessionRepository.createGameSession(
      userId,
      sessionScore,
      sessionStreak
    );

    await userRepository.updateWinStreak(userId, sessionStreak);

    if (sessionScore === 0) {
      await gameSessionRepository.updateGameSessionEndedAt(gameSession.game_id);
    }

    return gameSession;
  } catch (error) {
    console.error("Error in createGameSession:", error);
    throw new Error("Error in creating game session");
  }
};

const getLastGameSession = async (userId) => {
  try {
    const result = await gameSessionRepository.getLastGameSession(userId);
    return result;
  } catch (error) {
    console.error("Error in getLastGameSession:", error);
    throw new Error("Error fetching last game session");
  }
};

const updateGameSessionEndedAt = async (gameId) => {
  try {
    const result = await gameSessionRepository.updateGameSessionEndedAt(gameId);
    return result;
  } catch (error) {
    console.error("Error in updateGameSessionEndedAt:", error);
    throw new Error("Error updating game session ended_at");
  }
};
module.exports = {
  createGameSession,
  getLastGameSession,
  updateGameSessionEndedAt,
};
