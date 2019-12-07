const mongoose = require("mongoose");
const userSchema = require("../../models/users");
const User = mongoose.model("User", userSchema);
const bcrypt = require('bcryptjs');

async function findByUser(userParam) {
  return User.findOne({ login: userParam });
}

async function createUser(userParam) {
  if (await User.findOne({ login: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

module.exports = {
  findByUser,
  createUser,

};
