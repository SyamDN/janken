const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/users");
const { generateAccessToken } = require("../utils/authUtil");

const createUser = async (userData) => {
  let user = await userRepository.findUserByUsername(userData.username);
  if (user.rows.length > 0) {
    throw new Error("user already exist");
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const newUser = { ...userData, password: hashedPassword };
  user = await userRepository.createUser(newUser);
  return user;
};

const getUser = async (id) => {
  let user = await userRepository.getUser(id);
  if (user.rows.length === 0) {
    throw new Error("user not found");
  }
  return user.rows[0];
};

const getUsers = async () => {
  let users = await userRepository.getUsers();
  if (users.length === 0) {
    throw new Error("user not found");
  }
  return users;
};

const login = async (userData) => {
  let user = await userRepository.findUserByUsername(userData.username);
  if (user.rows.length === 0) {
    throw new Error(404);
  }
  const isPasswordMatched = await bcrypt.compare(
    userData.password,
    user.rows[0].password
  );

  if (!isPasswordMatched) {
    throw new Error(`${404} password is incorrect`);
  }

  const token = generateAccessToken({
    username: userData.email,
    id: user.rows[0].id,
  });

  return token;
};

const updateWinStreak = async (userId, isWin) => {
  let user = await userRepository.getUser(userId);
  if (user.rows.length === 0) {
    throw new Error("user not found");
  }

  let newWinStreak = user.rows[0].win_streak;
  if (isWin) {
    newWinStreak += 1;
  } else {
    newWinStreak = 0;
  }
  return await userRepository.updateWinStreak(userId, newWinStreak);
};

module.exports = { createUser, getUser, getUsers, login, updateWinStreak };
