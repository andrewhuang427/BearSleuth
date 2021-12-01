const express = require("express");
const JobModel = require("../models/JobModel");
const SerpApi = require("google-search-results-nodejs");
const JobRouter = express.Router();

JobRouter.route("/").get((req, res) => {
  const query = JobModel.aggregate([{ $sample: { size: 30 } }]);
  query.exec(function (err, jobs) {
    if (err) res.status(500).send({ msg: "internal server error" });
    res.send(jobs);
  });
});

JobRouter.route("/all").get((req, res) => {
  const query = JobModel.find({});
  query.exec((error, docs) => {
    if (error) {
      console.log(error);
      res.send("error occurred");
    } else {
      console.log(docs.length);
      res.send(docs);
    }
  });
});

const search = new SerpApi.GoogleSearch(
  // "1086b13baea75f7900c66d417654cf1901f7592a10da4b4a4cfb5eaeee0d0804"
  // "5097e0046df5919092c731814afd5dc7f9de268c7023eb43c97f0765085cf3a2"
  // "e255048f0bbb97ef8eeec424adeb461e2e9941b22f19f43f25c88b1b5bb40b34",
  "1220720a3ce3dc2a9c179bdc85acf3514309dd1a7daae8b3591b0ff189769167"
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
