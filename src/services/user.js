const mongoose = require("mongoose");
const userSchema = require("../../models/users");
const User = mongoose.model("User", userSchema);
const bcrypt = require('bcryptjs');

async function find(login) {
  return User.findOne({ login: login });
}

async function create(userParam) {
  // TODO: Fill all param
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
  find,
  create,

};
