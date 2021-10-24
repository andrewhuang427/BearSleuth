import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {LanguageFind} from "./SearchRegex";

// const SerpApi = require('google-search-results-nodejs');
// const search = new SerpApi.GoogleSearch("df6a71fa7a6e850a4c1c34e54e6dc4071c296cb642e6ae8082baac5cb4ab2114");
// const params = {
//   engine: "google_jobs",
//   q: "Software Engineer ",
//   gl:"us",
//   lrad:"20",
// };



function SearchAPI() {
  // const data = { roleName: document.getElementById('roleQuery').value + " " + document.getElementById('') };
  const data = { apiName: document.getElementById('apiName').value };
  fetch("http://localhost:5000/getAPI", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      var jobs = response.values.jobs_results
      const list = document.getElementById("list");
      list.innerHTML = "";
      alert("Found " + jobs.length + " jobs")
      for (let i = 0; i < jobs.length; i++) {
        const listing = document.createElement("div");
        const info = document.createTextNode(jobs[i].title + " at " + jobs[i].company_name + " in " + jobs[i].location);
        const desc = document.createTextNode(LanguageFind(jobs[i]))
        //const desc = document.createTextNode(jobs[i].description);
        listing.appendChild(info);
        listing.appendChild(desc);
        list.appendChild(listing);
        listing.classList.add("job");
      }
    })
}




function Homepage() {

  return (
    <Box id="search" display="none">
      <h1>What role are you searching for?</h1>
      <form>
        <input id="roleQuery" type="text" />
{/* //        <Button id="searchButton" onClick={RoleSubmit}>Go</Button> */}
        <Button id="searchButton" onClick={SearchAPI}>Go</Button>
      </form>
      <h1>Or Search by Company</h1>
      <form id="csearch">
        <input id="CompanyQuery" type="text" />
        <Button id="searchButton" onClick={CompanySubmit}>Go</Button>
      </form>
      <h1>API</h1>
      <form id="APIsearch">
        <input id="apiName" type="text" />
        <Button id="searchButton" onClick={SearchAPI}>Go</Button>
      </form>

      <div id ="list"/>

    </Box>
  );
}





const RoleSubmit = () => {
  const data = { roleName: document.getElementById('roleQuery').value};
  fetch("http://localhost:5000/getJobsByTitle", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      const list = document.getElementById("list");
      list.innerHTML = "";
      alert("Found " + response.values.length + " jobs")
      for (let i = 0; i < response.values.length; i++){
        const listing = document.createElement("div");
        const info = document.createTextNode(response.values[i].position + " at " + response.values[i].company);
        listing.appendChild(info);
        list.appendChild(listing);
        listing.classList.add("job");
        //alert((response.values[i].position + " at " + response.values[i].company ))
      }

    })
    .catch((error) => console.error("Error:", error));
  };


const CompanySubmit = () => {
  const data = { companyName: document.getElementById('CompanyQuery').value };
  fetch("http://localhost:5000/getJobsByCompany", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((response) => {
      const list = document.getElementById("list");
      list.innerHTML = "";
      alert("Found " + response.values.length + " jobs")
      for (let i = 0; i < response.values.length; i++){
        const listing = document.createElement("div");
        const info = document.createTextNode(response.values[i].position + " at " + response.values[i].company);
        listing.appendChild(info);
        list.appendChild(listing);
        listing.classList.add("job");
      }


    })
    .catch((error) => console.error("Error:", error));
};

  

export default Homepage;
