import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {LanguageFind, TechSkillsFind} from "./SearchRegex";
import {host} from "../index"

// const SerpApi = require('google-search-results-nodejs');
// const search = new SerpApi.GoogleSearch("df6a71fa7a6e850a4c1c34e54e6dc4071c296cb642e6ae8082baac5cb4ab2114");
// const params = {
//   engine: "google_jobs",
//   q: "Software Engineer ",
//   gl:"us",
//   lrad:"20",
// };
getHistory();
getRecs();
function visit(event){
  let current="bob";
  let jobName=event.target.childNodes[0].innerText;
  const data = { username: current, jobVisited:jobName };
    fetch(host + "addHistory", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {})
      .catch((error) => console.error("Error:", error));
}
function getHistory(){
  let current="bob";
  const data={username:current};
  fetch(host + "getHistory", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
          let history=response.values[0].history;
          const previousHistory = document.getElementById("last5Jobs");
          previousHistory.innerHTML = "";
        console.log(history);
          for (let i = history.length-1; i >= history.length-5; i--){
              const job = document.createElement("div");
              let jobVisitedName=document.createElement("p");
              jobVisitedName.innerText=history[i];
              job.appendChild(jobVisitedName);
              previousHistory.appendChild(job);
            }
      }
    })
    .catch((error) => console.error("Error:", error));
}


function SearchAPI() {
  // const data = { roleName: document.getElementById('roleQuery').value + " " + document.getElementById('') };
  const data = { apiName: document.getElementById('apiName').value };
  fetch( host + "getAPI", {
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
        listing.addEventListener("click",visit);
        let info=document.createElement('p');
        info.innerHTML=jobs[i].title + " at " + jobs[i].company_name + " in " + jobs[i].location;
        //const info = document.createTextNode(jobs[i].title + " at " + jobs[i].company_name + " in " + jobs[i].location);
        const langs = document.createTextNode(LanguageFind(jobs[i]))
        const techSkills = document.createTextNode(TechSkillsFind(jobs[i]))
        //const desc = document.createTextNode(jobs[i].description);
        listing.appendChild(info);
        listing.appendChild(langs);
        listing.appendChild(techSkills);
        list.appendChild(listing);
        listing.classList.add("job");
      }
    })
}

function getRecs(){
  let role="SWE";
  let data={role:role};
  fetch(host + "getRecs", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
         let recs=response.values;
         console.log(recs);
        const recList = document.getElementById("recs");
          recList.innerHTML = "";
          for (let i = 0; i < recs.length; i++){
              const job = document.createElement("div");
              let name=document.createElement("p");
              name.innerText=recs[i].position+" at "+ recs[i].company;
              job.appendChild(name);
              recList.appendChild(job);
            }
      }
    })
    .catch((error) => console.error("Error:", error));

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
      <div id="previousHistory">
        <div className="title">
        Recently Viewed Jobs:
        <div id="last5Jobs"> 

        </div>
        </div>
      </div>
      <div id="recommendedSection">
        <div className="title">
       Recommended Jobs:
        <div id="recs"> 

        </div>
        </div>
        
      </div>

    </Box>
  );
}





const RoleSubmit = () => {
  const data = { roleName: document.getElementById('roleQuery').value};
  fetch(host + "getJobsByTitle", {
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
  fetch(host + "getJobsByCompany", {
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
