const Schema = require("mongoose").Schema;

const RefreshTokens = new Schema({
  userId: { type: String, required: true },
  refreshToken: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = RefreshTokens;
