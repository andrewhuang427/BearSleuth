const express = require("express");

const CompanyRouter = express.Router();

// ---------- TODO: Fill in api end points for company creation and retreival ----------

CompanyRouter.route("/").get((req, res) => {
  res.status(200).json({ msg: "getting all companies" });
});

CompanyRouter.route("/:id").get((req, res) => {
  const companyId = req.params.id;
  res
    .status(200)
    .json({ msg: `getting details for company with id ${companyId}` });
});

CompanyRouter.route("/create").post((req, res) => {
  res.status(200).json({ msg: "create company endpoint" });
});

const JobRouter = express.Router();

// ---------- TODO: Fill in api end points for job creation and retreival ---------

JobRouter.route("/").get((req, res) => {
  res.status(200).json({ msg: "getting all jobs" });
});

JobRouter.route("/:id").get((req, res) => {
  const jobId = req.params.id;
  res.status(200).json({ msg: `getting details for job with id ${jobId}` });
});

JobRouter.route("/create").post((req, res) => {
  res.status(200).json({ msg: "create job endpoint" });
});

module.exports = {
  CompanyRouter,
  JobRouter,
};
