const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middleware/Authentication");
const {
  validateUpdateProfileData,
  validatePassword,
} = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  // validate the field whether update is allowed or not
  try {
    if (!validateUpdateProfileData(req)) {
      throw new Error("You are not allowed to update the given field");
    }
    // i shold know to whom data i have to update, it will be provided by userAuth middleware => req.user = user
    const LoggedInUser = req.user;
    // update the data to the DB
    Object.keys(req.body).forEach(
      (fields) => (LoggedInUser[fields] = req.body[fields])
    );
    // save the data in DB
    await LoggedInUser.save();
    res.send(`${LoggedInUser.firstName} your data is updated`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  // verify old password by creating the hash of the password with the passwordHash stored in DB
  try {
    if (!validatePassword(req)) {
      throw new Error("Please enter the correct old password");
    }
    const user = req.user;
    const { newPassword } = req.body;
    const passHash = await bcrypt.hash(newPassword, 10);
    user.password = passHash;
    await user.save();
    res.send("Password updated Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
