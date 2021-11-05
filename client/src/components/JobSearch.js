import React, { useState, useEffect, useContext } from "react";
import UserContext from "../providers/UserContext";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useHistory } from "react-router-dom";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const history = useHistory();

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchByRole = () => {
    const data = { query };
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  const handleToggleFavorites = (jobId) => {
    console.log("toggle favs...")
    if (user != null) {
      if (favorites.includes(jobId)) {
        // remove from favories
        setFavorites(favorites.filter((fav) => fav != jobId));
      } else {
        // add to favorites
        let newFavs = [...favorites];
        newFavs.push(jobId);
        handleAddToFavorites(jobId);
        setFavorites(newFavs);
      }
    }
  };

  const handleAddToFavorites = async (jobId) => {
    try {
      const jwt = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const body = { jobId };
      const response = await axios.post(
        "http://localhost:5000/api/user/addFavorite",
        body,
        config
      );
      console.log(response.data);
      setUser(response.data);
      refreshFavs();
    } catch (error) {
      console.log(error);
    }
  };

  const refreshFavs = () => {
    if (user != null) {
      let newFavs = [];
      for (let i = 0; i < user.favorites.length; ++i) {
        newFavs.push(user.favorites[i]._id);
      }
      console.log(newFavs)
      setFavorites(newFavs);
    }
    
  };

  // useEffect(() => {
  //   console.log(favorites);
  //   let username = "bob";
  //   let data = { user: username, fav: favorites };
  //   console.log(favorites);
  //   fetch("http://localhost:5000/setFavorites", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       if (response.success) {
  //         console.log("Favorites Updated");
  //       }
  //     })
  //     .catch((error) => console.error("Error:", error));
  // }, [favorites]);

  return (
    <Box id="search">
      <Box marginRight={2} marginLeft={2} marginTop={2}>
        <Paper elevation={2}>
          <Box padding={3}>
            <Toolbar>
              <Box marginRight={2}>
                <Typography>What role are you searching for?</Typography>
              </Box>
              <Box flexGrow={1} marginRight={2}>
                <TextField
                  fullWidth
                  label="Enter Role"
                  variant="outlined"
                  onChange={handleQueryChange}
                />
              </Box>
              <Box>
                <Button variant="outlined" onClick={handleSearchByRole}>
                  Search
                </Button>
              </Box>
            </Toolbar>
          </Box>
        </Paper>
      </Box>
      <Box marginTop={2} marginLeft={2} marginRight={2}>
        <Grid container spacing={2}>
          {jobs.map((job) => {
            return (
              <Grid item xs={12} sm={4}>
                <Paper elevation={2} style={{ height: "100%" }}>
                  <Box padding={3}>
                    <Box
                      textAlign="left"
                      fontWeight={800}
                      color={"#137658"}
                      marginBottom={1}
                    >
                      <Toolbar disableGutters>
                        <Box marginRight={2}>
                          <Avatar
                            src={job.thumbnail}
                            sx={{ height: 30, width: 30 }}
                          />
                        </Box>
                        <Box flexGrow={1}>
                          <Typography variant="h6">
                            {job.company_name}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            onClick={() => {
                              handleToggleFavorites(job._id);
                            }}
                          >
                            {favorites.includes(job._id) ? (
                              <StarIcon style={{ color: "#cfc644" }} />
                            ) : (
                              <StarBorderIcon />
                            )}
                          </IconButton>
                        </Box>
                      </Toolbar>
                    </Box>
                    <Box textAlign="left" marginBottom={3}>
                      <Typography variant="subtitle1">{job.title}</Typography>
                    </Box>
                    <Box
                      marginBottom={3}
                      maxHeight={100}
                      textAlign="left"
                      overflow="scroll"
                      color="#616161"
                      style={{ overflowX: "hidden" }}
                      paddingRight={2}
                    >
                      <Typography variant="subtitle2">
                        {job.description}
                      </Typography>
                    </Box>
                    <Box>
                      <Toolbar disableGutters>
                        <Box flexGrow={1} textAlign="left">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                              history.push(`/jobs/${job._id}`);
                            }}
                          >
                            See more
                          </Button>
                        </Box>
                        <Box>
                          <Typography style={{ fontSize: 12 }}>
                            {job.location}
                          </Typography>
                        </Box>
                      </Toolbar>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;

// getHistory();
// getRecs();

// function visit(event){
//   let current="bob";
//   let jobName=event.target.childNodes[0].innerText;
//   const data = { username: current, jobVisited:jobName };
//     fetch("http://localhost:5000/addHistory", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((response) => {})
//       .catch((error) => console.error("Error:", error));
// }
// function getHistory(){
//   let current="bob";
//   const data={username:current};
//   fetch("http://localhost:5000/getHistory", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((response) => {
//       if (response.success) {
//           let history=response.values[0].history;
//           const previousHistory = document.getElementById("last5Jobs");
//           previousHistory.innerHTML = "";
//         console.log(history);
//           for (let i = history.length-1; i >= history.length-5; i--){
//               const job = document.createElement("div");
//               let jobVisitedName=document.createElement("p");
//               jobVisitedName.innerText=history[i];
//               job.appendChild(jobVisitedName);
//               previousHistory.appendChild(job);
//             }
//       }
//     })
//     .catch((error) => console.error("Error:", error));
// }

// function SearchAPI() {
//   // const data = { roleName: document.getElementById('roleQuery').value + " " + document.getElementById('') };
//   const data = { apiName: document.getElementById('apiName').value };
//   fetch("http://localhost:5000/getAPI", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((response) => {
//       var jobs = response.values.jobs_results
//       const list = document.getElementById("list");
//       list.innerHTML = "";
//       alert("Found " + jobs.length + " jobs")
//       for (let i = 0; i < jobs.length; i++) {
//         const listing = document.createElement("div");
//         listing.addEventListener("click",visit);
//         let info=document.createElement('p');
//         info.innerHTML=jobs[i].title + " at " + jobs[i].company_name + " in " + jobs[i].location;
//         //const info = document.createTextNode(jobs[i].title + " at " + jobs[i].company_name + " in " + jobs[i].location);
//         const langs = document.createTextNode(LanguageFind(jobs[i]))
//         const techSkills = document.createTextNode(TechSkillsFind(jobs[i]))
//         //const desc = document.createTextNode(jobs[i].description);
//         listing.appendChild(info);
//         listing.appendChild(langs);
//         listing.appendChild(techSkills);
//         list.appendChild(listing);
//         listing.classList.add("job");
//       }
//     })
// }

// function getRecs(){
//   let role="SWE";
//   let data={role:role};
//   fetch("http://localhost:5000/getRecs", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((response) => {
//       if (response.success) {
//          let recs=response.values;
//          console.log(recs);
//         const recList = document.getElementById("recs");
//           recList.innerHTML = "";
//           for (let i = 0; i < recs.length; i++){
//               const job = document.createElement("div");
//               let name=document.createElement("p");
//               name.innerText=recs[i].position+" at "+ recs[i].company;
//               job.appendChild(name);
//               recList.appendChild(job);
//             }
//       }
//     })
//     .catch((error) => console.error("Error:", error));

// }

// const RoleSubmit = () => {
//   const data = { roleName: document.getElementById('roleQuery').value};
//   fetch("http://localhost:5000/getJobsByTitle", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((response) => {
//       const list = document.getElementById("list");
//       list.innerHTML = "";
//       alert("Found " + response.values.length + " jobs")
//       for (let i = 0; i < response.values.length; i++){
//         const listing = document.createElement("div");
//         const info = document.createTextNode(response.values[i].position + " at " + response.values[i].company);
//         listing.appendChild(info);
//         list.appendChild(listing);
//         listing.classList.add("job");
//         //alert((response.values[i].position + " at " + response.values[i].company ))
//       }

//     })
//     .catch((error) => console.error("Error:", error));
//   };

// const CompanySubmit = () => {
//   const data = { companyName: document.getElementById('CompanyQuery').value };
//   fetch("http://localhost:5000/getJobsByCompany", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       const list = document.getElementById("list");
//       list.innerHTML = "";
//       alert("Found " + response.values.length + " jobs")
//       for (let i = 0; i < response.values.length; i++){
//         const listing = document.createElement("div");
//         const info = document.createTextNode(response.values[i].position + " at " + response.values[i].company);
//         listing.appendChild(info);
//         list.appendChild(listing);
//         listing.classList.add("job");
//       }

//     })
//     .catch((error) => console.error("Error:", error));
// };
