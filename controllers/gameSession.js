const gameSessionService = require("../services/gameSession");

const startGameSession = async (req, res) => {
  try {
    const { userChoice } = req.body;
    const userId = req.user.id;

    const computerChoice = generateComputerChoice();

    const result = determineWinner(userChoice, computerChoice);

    const sessionScore = result === "win" ? 1 : 0;

    const gameSession = await gameSessionService.createGameSession(
      userId,
      sessionScore
    );

    res.status(200).json({
      message: "Game played successfully",
      data: {
        userChoice,
        computerChoice,
        result,
        gameSession,
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
