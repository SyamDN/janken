const gameSessionService = require("../services/gameSession");

const startGameSession = async (req, res) => {
  try {
    const { userChoice } = req.body;
    const userId = req.user.id;

    const computerChoice = generateComputerChoice();
    const result = determineWinner(userChoice, computerChoice);

    const lastGameSession = await gameSessionService.getLastGameSession(userId);

    let sessionScore = 0;
    let sessionStreak = 0;

    if (result === "win") {
      sessionScore = lastGameSession
        ? parseInt(lastGameSession.session_score, 10) + 1
        : 1;
      
      let newSessionScore = lastGameSession
        ? parseInt(lastGameSession.session_score, 10)
        : 0;

      sessionStreak = lastGameSession
        ? parseInt(lastGameSession.session_streak, 10) + 1
        : 1;

        if (sessionStreak <= sessionScore) {
          sessionScore = newSessionScore
        }

        else if (sessionStreak > sessionScore) {
          sessionScore = sessionStreak;
        }
        
    } else if (result === "draw") {
      sessionScore = lastGameSession
        ? parseInt(lastGameSession.session_score, 10)
        : 0;

      sessionStreak = lastGameSession
        ? parseInt(lastGameSession.session_streak, 10)
        : 0;
        
    } else {
      sessionScore = lastGameSession
        ? parseInt(lastGameSession.session_score, 10)
        : 0;
      sessionStreak = 0;
    }

    console.log("Session Streak being passed:", sessionStreak);

    const gameSession = await gameSessionService.createGameSession(
      userId,
      sessionScore,
      sessionStreak,
    );

    let updatedGameSession = gameSession;

    if (sessionStreak === 0) {
      const updatedGameSession =
        await gameSessionService.updateGameSessionEndedAt(gameSession.game_id);
      console.log("Updated game session with ended_at:", updatedGameSession);
    }

    res.status(200).json({
      message: "Game played successfully",
      data: {
        userChoice,
        computerChoice,
        result,
        gameSession: updatedGameSession,
      },
    });
  } catch (error) {
    console.error("Error in playGame:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const generateComputerChoice = () => {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return "draw";
  }
  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "rock")
  ) {
    return "win";
  }
  return "lose";
};

module.exports = { startGameSession };
