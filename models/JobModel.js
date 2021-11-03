const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DetectedExtensionsSchema = new Schema({
  posted_at: {
    type: String,
  },
  schedule_type: {
    type: String,
  },
  work_from_home: {
    type: Boolean,
  },
});

const JobSchema = new Schema({
  title: {
    type: String,
  },
  company_name: {
    type: String,
  },
  location: {
    type: String,
  },
  via: { type: String },
  description: { type: String },
  thumbnail: {
    type: String,
  },
  detected_extensions: {
    type: DetectedExtensionsSchema,
  },
  job_id: {
    type: String,
  },
  link: {
    type: String,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

const JobModel = mongoose.model("Job", JobSchema);

module.exports = JobModel;
