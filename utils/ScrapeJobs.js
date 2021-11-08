const fs = require("fs");
const JobModel = require("../models/JobModel");
const SerpApi = require("google-search-results-nodejs");
// var request = require('request')


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
  const search = new SerpApi.GoogleSearch(
    "df6a71fa7a6e850a4c1c34e54e6dc4071c296cb642e6ae8082baac5cb4ab2114"
  );
  const params = {
    engine: "google_jobs",
    q: "biomedical engineer",
    gl: "us",
    lrad: "20",
    output: "output  = 'html'"

  };
  search.json(params, (result) => {
    const jobResults = result.jobs_results;
    // const url = result.search_metadata.raw_html_file
    // request({uri: url}, 
    //   function(error, response, body) {
    //   const vals = body.split("pMhGee Co68jc j0vryd")
    //   for (i=1; i<vals.length;i++){
    //     second = vals[i].split("href=")
    //     ret = second[1].split('" title')
    //     console.log(ret[0])
    //   }
      
    // })


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
