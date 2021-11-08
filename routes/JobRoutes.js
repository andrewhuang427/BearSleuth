const express = require("express");
const JobModel = require("../models/JobModel");
const SerpApi = require("google-search-results-nodejs");
const JobRouter = express.Router();

JobRouter.route("/").get((req, res) => {
  var query = JobModel.find();
  query.exec(function (err, jobs) {
    if (err) res.status(500).send({ msg: "internal server error" });
    res.send(jobs);
  });
});

const search = new SerpApi.GoogleSearch(
  "1086b13baea75f7900c66d417654cf1901f7592a10da4b4a4cfb5eaeee0d0804"
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
      if (err) res.status(500).send({ msg: "internal server error" });
      res.send(docs);
    });
  });
});

JobRouter.route("/:id").get((req, res) => {
  const jobId = req.params.id;
  var query = JobModel.findById(jobId);
  query.exec((err, doc) => {
    if (err) res.status(500).send({ msg: "internal server error" });
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
