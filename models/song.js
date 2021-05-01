const mongoose = require("mongoose"); // requiring the mongoose package

const SongSchema = new mongoose.Schema({
  title: {
    type: String, // task is a string
    unique: true, // it has to be unique
    required: true, // it is required
  },
  lyrics: {
    type: String, // task is a string
    unique: false, // it has to be unique
    required: true, // it is required
  },
  image_link: {
    type: String, // task is a string
    unique: true, // it has to be unique
    required: true, // it is required
  },
  audio_link: {
    type: String, // task is a string
    unique: true, // it has to be unique
    required: true, // it is required
  },
});

const songModel = mongoose.model("Song", SongSchema); // creating the model from the schema

module.exports = songModel; // exporting the model