const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    imageURL: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("song", SongSchema);
