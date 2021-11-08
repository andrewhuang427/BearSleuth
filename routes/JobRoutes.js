const express = require("express");
const JobModel = require("../models/JobModel");
const SerpApi = require("google-search-results-nodejs");
const JobRouter = express.Router();

JobRouter.route("/").get((req, res) => {
  var query = JobModel.find();
  query.exec(function (err, jobs) {
    if (err) res.status(500).send({ msg: "internal service error" });
    res.send(jobs);
  });
});

const search = new SerpApi.GoogleSearch(
  "df6a71fa7a6e850a4c1c34e54e6dc4071c296cb642e6ae8082baac5cb4ab2114"
);

JobRouter.route("/search").get((req, res) => {
  const query = decodeURI(req.query.query);
  const params = {
    engine: "google_jobs",
    q: query,
    gl: "us",
  };
  search.json(params, (result) => {
    const jobResults = result.jobs_results;
    JobModel.insertMany(jobResults, (err, docs) => {
      if (err) res.status(500).send({ msg: "internal service error" });
      res.send(docs);
    });
  });
});

JobRouter.route("/:id").get((req, res) => {
  const jobId = req.params.id;
  console.log(jobId);
  var query = JobModel.findById(jobId);
  query.exec((err, doc) => {
    console.log(doc);
    console.log(err);
    if (err) res.status(500).send({ msg: "internal service error" });
    const params = {
      engine: "google_jobs_listing",
      q: doc.job_id,
    };
    search.json(params, (result) => {
      res.json({ job: doc, extras: result });
    });
  });
});

module.exports = JobRouter;
