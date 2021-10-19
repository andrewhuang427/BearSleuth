import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";



function Homepage() {

  return (
    <Box id="search" display="none">
      <h1>What role are you searching for?</h1>
      <form>
        <input id="roleQuery" type="text" />
        <Button id="searchButton" onClick={RoleSubmit}>Go</Button>
      </form>
      <h1>Or Search by Company</h1>
      <form id="csearch">
        <input id="CompanyQuery" type="text" />
        <Button id="searchButton" onClick={CompanySubmit}>Go</Button>
      </form>

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
      alert("Found " + response.values.length + " jobs")
      for (let i = 0; i < response.values.length; i++){
        const listing = document.createElement("div");
        const info = document.createTextNode(response.values[i].position + " at " + response.values[i].company);
        listing.appendChild(info);
        const home = document.getElementById("search");
        home.appendChild(listing);
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
      alert("Found " + response.values.length + " jobs")
      for (let i = 0; i < response.values.length; i++){
        alert((response.values[i].position + " at " + response.values[i].company ))
      }


    })
    .catch((error) => console.error("Error:", error));
};

  





export default Homepage;
