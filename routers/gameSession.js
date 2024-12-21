const express = require("express");
const router = express.Router();

gameSessionController = require("../controllers/gameSession");
const { authenticateToken } = require("../middlewares/auth");

router.post(
  "/api/game-session/play",
  authenticateToken,
  gameSessionController.startGameSession
);

module.exports = router;
