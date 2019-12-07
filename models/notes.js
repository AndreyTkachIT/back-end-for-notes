const Schema = require('mongoose').Schema;

const Notes = new Schema({
    _id: Schema.Types.ObjectID,
    title: {type: String, required: true},
    date: {type: Date, required: true},
});

module.exports = Notes;