const Schema = require("mongoose").Schema;

const Notes = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = Notes;
