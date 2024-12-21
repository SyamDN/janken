const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const { authenticateToken } = require("../middlewares/auth");

router.post("/api/users", userController.createUser);
router.get("/api/users", userController.getUsers);
router.post("/api/auth/login", userController.login);
router.get("/api/profile", authenticateToken, userController.getUserByToken);

module.exports = router;
