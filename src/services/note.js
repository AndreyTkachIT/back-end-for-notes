const mongoose = require("mongoose");
const noteSchema = require("../../models/notes");

const Note = mongoose.model("Note", noteSchema);

async function list() {
  return Note.find().exec();
}

async function findById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) { return null}

  return Note.findById(id).exec();
}

async function remove(query) {}

module.exports = {
  list,
  findById,
  remove
};
