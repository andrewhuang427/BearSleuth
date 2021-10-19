import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


function JobSearch(){
let role=document.getElementById("query").value;

}

function Homepage() {

   return (
     <Box id="search" display="none">
       <h1>What role are you searching for?</h1>
        <form>
          <input id="query" type="text"/>
          <Button id="searchButton" onClick={JobSearch}>Go</Button>
        </form>
     </Box>
  );
}

export default Homepage;
