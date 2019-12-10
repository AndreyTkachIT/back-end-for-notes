const mongoose = require("mongoose");
const refreshTokenSchema = require("../../models/refreshTokens");

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

async function find(token) {
  return RefreshToken.findOne({ refreshToken: token }).exec();
}

async function create(userId, refreshToken) {
  await new RefreshToken({
    userId,
    refreshToken,
    date: Date.now()
  }).save();
}

async function removeOne(token) {
  RefreshToken.deleteOne({ refreshToken: token }).exec();
}

async function removeAll(userId) {
  RefreshToken.deleteMany({userId}).exec();
}

module.exports = {
  find,
  create,
  removeOne,
  removeAll,
};
