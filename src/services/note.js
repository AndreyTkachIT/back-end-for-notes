const mongoose = require("mongoose");
const noteSchema = require("../../models/notes");

const Note = mongoose.model("Note", noteSchema);

async function listNotes() {
  const query = Note.find();
  query.getFilter();
  return query;
}

async function findNoteById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) { return null}

  const query = Note.findById(id);
  query.getFilter();
  return query;
}

async function deleteNote(query) {}

module.exports = {
  listNotes,
  findNoteById,
  deleteNote
};
