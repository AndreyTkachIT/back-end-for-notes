const Schema = require("mongoose").Schema;

const Users = new Schema({
  login: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now() }
});

module.exports = Users;
