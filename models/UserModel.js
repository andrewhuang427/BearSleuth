const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    register_date: {
      type: Date,
      default: Date.now,
    },
    major: {
      type: String,
      required: false,
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    history: {
      type: Array,
      required: false,
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    desiredRole: {
      type: String,
      unique: true,
      required: true,
    },
    desiredLocation: {
      type: String,
      unique: true,
      required: false,
    },
  },
  { _id: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
