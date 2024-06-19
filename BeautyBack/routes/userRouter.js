const express = require("express");
const authController = require("../controller/authController");
const {
  getAllUsers,
  getUser,
  updateUser,
} = require("../controller/userController");
const { signup, login } = authController;

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);
userRouter.route("/:id").get(getUser).patch(updateUser);

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);

module.exports = userRouter;
