const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({
  position: {
    type: String,
    required: true,
  },
  description: { type: String },
  salary_range: {
    type: String,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  status: {
    type: String,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

const JobModel = mongoose.model("Job", JobSchema);

module.exports = JobModel;
