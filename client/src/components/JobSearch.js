import React, { useState, useEffect, useContext } from "react";
import UserContext from "../providers/UserContext";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useHistory } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import {host} from "../index"


function Home() {
  const { user, setUser } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [toggleId, setToggleId] = useState("");
  const [isFavoriting, setIsFavoriting] = useState(false);
  const history = useHistory();

  const handleSearchByRole = async () => {
    if (query !== "") {
      setIsLoading(true);
      try {
        const url =
          host + "api/jobs/search?query=" + encodeURI(query);
        const response = await axios.get(url);
        setJobs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(host + "api/jobs");
        setJobs(response.data);
        console.log(jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  const handleToggleFavorites = (jobId) => {
    if (user != null) {
      setIsFavoriting(true);
      setToggleId(jobId);
      if (favorites.includes(jobId)) {
        handleRemoveFromFavorites(jobId);
      } else {
        handleAddToFavorites(jobId);
      }
    }
  };

  const handleRemoveFromFavorites = async (jobId) => {
    try {
      const jwt = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const body = { jobId };
      const response = await axios.post(
        host + "api/user/removeFavorite",
        body,
        config
      );
      setUser(response.data);
      refreshFavs();
      setIsFavoriting(false);
      setToggleId("");
    } catch (error) {
      console.log(error);
      setIsFavoriting(false);
      setToggleId("");
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
        host + "api/user/addFavorite",
        body,
        config
      );
      setUser(response.data);
      refreshFavs();
      setIsFavoriting(false);
      setToggleId("");
    } catch (error) {
      console.log(error);
      setIsFavoriting(false);
      setToggleId("");
    }
  };

  const refreshFavs = () => {
    if (user != null && user.favorites != null) {
      let newFavs = [];
      for (let i = 0; i < user.favorites.length; ++i) {
        newFavs.push(user.favorites[i]._id);
      }
      setFavorites(newFavs);
    }
  };

  const updateHistory= async (job)=> {
    try {
      const jwt = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const body = { job };
      const response = await axios.post(
        host + "api/user/addHistory",
        body,
        config
      );
      setUser(response.data);
      setToggleId("");
    } catch (error) {
      console.log(error);
      setToggleId("");
    }
  }

  useEffect(() => {
    if (user != null) {
      console.log(user);
      refreshFavs();
    }
  }, [user]);

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
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />
              </Box>
              <Box>
                <Button variant="outlined" onClick={handleSearchByRole}>
                  {isLoading ? <CircularProgress size={20} /> : "Search"}
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
              <Grid item xs={12} sm={4} key={job.job_id}>
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
                          {isFavoriting && toggleId === job._id ? (
                            <ClipLoader
                              color={"rgba(58, 180, 75, 1)"}
                              size={30}
                            />
                          ) : (
                            <Tooltip title="Favorite">
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
                            </Tooltip>
                          )}
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
                              updateHistory(job);
                             // history.push(`/jobs/${job._id}`);
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
