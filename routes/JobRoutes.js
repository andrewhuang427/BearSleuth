const express = require("express");
const JobModel = require("../models/JobModel");

const JobRouter = express.Router();

// ---------- TODO: Fill in api end points for job creation and retreival ---------

JobRouter.route("/").get((req, res) => {
  var query = JobModel.find();
  query.exec(function (err, jobs) {
    if (err) res.status(500).send({ msg: "internal service error" });
    res.send(jobs);
  });
});

JobRouter.route("/:id").get((req, res) => {
  const jobId = req.params.id;
  console.log(jobId);
  var query = JobModel.findById(jobId);
  query.exec((err, doc) => {
    console.log(doc);
    if (err) res.status(500).send({ msg: "internal service error" });
    res.send(doc);
  });
});

JobRouter.route("/create").post((req, res) => {
  res.status(200).json({ msg: "create job endpoint" });
});

module.exports = {
  JobRouter,
};
