const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobGroupSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    tags: [{ type: String }],
    duration: { type: String },
    image_url: { type: String },
    jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    created_at: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  { _id: true }
);

const JobGroupModel = mongoose.model("Job Group", JobGroupSchema);

module.exports = JobGroupModel;
