const gameSessionService = require("../services/gameSession");

const startGameSession = async (req, res) => {
  try {
    const { userChoice } = req.body;
    const userId = req.user.id;

    const computerChoice = generateComputerChoice();
    const result = determineWinner(userChoice, computerChoice);

    // Ambil sesi terakhir user
    const lastGameSession = await gameSessionService.getLastGameSession(userId);

    let sessionScore = 0;
    let sessionStreak = 0;

    if (result === "win") {
      sessionScore = lastGameSession
        ? parseInt(lastGameSession.session_score, 10) + 1
        : 1;

      sessionStreak = lastGameSession
        ? parseInt(lastGameSession.session_streak, 10) + 1
        : 1; // Tambah streak
    } else if (result === "draw") {
      sessionScore = lastGameSession
        ? parseInt(lastGameSession.session_score, 10)
        : 0;

      sessionStreak = lastGameSession
        ? parseInt(lastGameSession.session_streak, 10)
        : 0; // Pertahankan streak
    } else {
      sessionScore = lastGameSession
        ? parseInt(lastGameSession.session_score, 10)
        : 0; // Tidak reset session_score saat kalah
      sessionStreak = 0; // Reset streak saat kalah
    }

    console.log("Session Streak being passed:", sessionStreak);
    // Simpan sesi game ke database
    const gameSession = await gameSessionService.createGameSession(
      userId,
      sessionScore,
      sessionStreak
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
