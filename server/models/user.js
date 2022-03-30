const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },

  email_verfied: {
    type: Boolean,
    required: true,
  },
  account_created: {
    type: String,
    default: Date.now,
  },
  auth_time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
