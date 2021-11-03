const fs = require("fs");
const { getSystemErrorMap } = require("util");
const JobModel = require("../models/JobModel");

const queries = [
  "software engineering intern",
  "software engineer",
  "mechanical engineer",
  "hardware engineer",
  "quantitative trader",
  "electrical engineer",
  "biomedical engineer",
];

function removeAllJobs() {
  JobModel.remove({}, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

function scrapeJobs() {
  const SerpApi = require("google-search-results-nodejs");
  const search = new SerpApi.GoogleSearch(
    "df6a71fa7a6e850a4c1c34e54e6dc4071c296cb642e6ae8082baac5cb4ab2114"
  );
  const params = {
    engine: "google_jobs",
    q: "biomedical engineer",
    gl: "us",
    lrad: "20",
  };
  search.json(params, (result) => {
    const jobResults = result.jobs_results;
    for (let i in jobResults) {
      const job = jobResults[i];

      const {
        title,
        company_name,
        location,
        via,
        description,
        thumbnail,
        detected_extensions,
        job_id,
      } = job;

      const newJob = new JobModel({
        title,
        company_name,
        location,
        via,
        description,
        thumbnail,
        detected_extensions,
        job_id,
      });

      newJob.save();
    }
  });
}

module.exports = { removeAllJobs, scrapeJobs };
