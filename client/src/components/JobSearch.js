import React, { useState, useEffect, useContext } from "react";
import UserContext from "../providers/UserContext";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from '@mui/icons-material/Search';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { host } from "../index";
import GroupContext from "../providers/GroupContext";

function SearchBar({ setJobs }) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchByRole = async () => {
    if (query !== "") {
      setIsLoading(true);
      try {
        const url = host + "api/jobs/search?query=" + encodeURI(query);
        const response = await axios.get(url);
        setJobs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <Paper variant="outlined">
      <Box padding={3}>
        <Toolbar>
          <Box flexGrow={1} marginRight={2}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              label="Job Search"
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
  );
}

function Home() {
  const { user, setUser } = useContext(UserContext);
  const { myGroups } = useContext(GroupContext);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [toggleId, setToggleId] = useState("");
  const [favoriting, setFavoriting] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(host + "api/jobs");
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  const handleToggleFavorites = (jobId) => {
    if (user != null) {
      setFavoriting(true);
      setToggleId(jobId);
      if (favorites.includes(jobId)) {
        removeFromFavorites(jobId);
      } else {
        addToFavorites(jobId);
      }
    }
  };

  const removeFromFavorites = async (jobId) => {
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
      refreshFavorites();
      setFavoriting(false);
      setToggleId("");
    } catch (error) {
      console.log(error);
      setFavoriting(false);
      setToggleId("");
    }
  };

  const addToFavorites = async (jobId) => {
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
      refreshFavorites();
      setFavoriting(false);
      setToggleId("");
    } catch (error) {
      console.log(error);
      setFavoriting(false);
      setToggleId("");
    }
  };

  const refreshFavorites = () => {
    if (user != null && user.favorites != null) {
      let newFavorites = [];
      for (let i = 0; i < user.favorites.length; ++i) {
        newFavorites.push(user.favorites[i]._id);
      }
      setFavorites(newFavorites);
    }
  };

  const updateHistory = async (job) => {
    console.log(user);
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
      console.log(response.data);
      setUser(response.data);
      setToggleId("");
    } catch (error) {
      console.log(error);
      setToggleId("");
    }
  };

  useEffect(() => {
    if (user != null) {
      refreshFavorites();
    }
  }, [user]);

  const filterResults = async () => {
    let filteredJobs = [];
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].location.includes(filter)) {
        filteredJobs.push(jobs[i]);
      }
    }
    setJobs(filteredJobs);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Box marginRight={2} marginLeft={2} marginTop={2}>
        <SearchBar setJobs={setJobs} />
      </Box>
      {/* <Box marginRight={2} marginLeft={2} marginTop={2}>
        <Paper variant="outlined">
          <Box padding={3}>
            <Toolbar>
              <Box flexGrow={1} marginRight={2}>
                <TextField
                  fullWidth
                  label="Filter Results (City, State)"
                  variant="outlined"
                  value={filter}
                  onChange={(event) => {
                    setFilter(event.target.value);
                  }}
                />
              </Box>
              <Box>
                <Button variant="outlined" onClick={filterResults}>
                  Filter
                </Button>
              </Box>
            </Toolbar>
          </Box>
        </Paper>
      </Box> */}
      <Box marginTop={2} marginLeft={2} marginRight={2}>
        <Grid container spacing={2}>
          {jobs.map((job) => {
            return (
              <JobCard
                key={job.job_id}
                job={job}
                groups={myGroups}
                settingToFavorite={favoriting}
                toggleId={toggleId}
                handleToggleFavorites={handleToggleFavorites}
                favorites={favorites}
                updateHistory={updateHistory}
              />
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;

function JobCard({
  job,
  groups,
  settingToFavorite,
  toggleId,
  handleToggleFavorites,
  favorites,
  updateHistory,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { fetchMyGroups } = useContext(GroupContext);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToGroup = async (groupId) => {
    const jwt = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    const data = { jobId: job._id };
    await axios.post(host + `api/groups/${groupId}/addJob`, data, config);
    fetchMyGroups();
    handleClose();
  };

  return (
    <Grid item xs={12} sm={6}>
      <Paper variant="outlined" style={{ height: "100%" }}>
        <Box padding={3}>
          <Box
            textAlign="left"
            fontWeight={800}
            color={"#137658"}
            marginBottom={1}
          >
            <Toolbar disableGutters>
              <Box marginRight={2}>
                <Avatar src={job.thumbnail} sx={{ height: 30, width: 30 }} />
              </Box>
              <Box flexGrow={1}>
                <Typography variant="h6">{job.company_name}</Typography>
              </Box>
              <Box marginRight={1}>
                {settingToFavorite && toggleId === job._id ? (
                  <ClipLoader color={"rgba(58, 180, 75, 1)"} size={30} />
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
              <Box>
                <Tooltip title="Add to Job Group">
                  <IconButton onClick={handleClick}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  {groups !== null
                    ? [
                        groups.map((group) => {
                          return (
                            <MenuItem
                              key={group._id}
                              onClick={() => {
                                handleAddToGroup(group._id);
                              }}
                            >
                              {group.name}
                            </MenuItem>
                          );
                        }),
                      ]
                    : ""}
                </Menu>
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
            <Typography variant="subtitle2">{job.description}</Typography>
          </Box>
          <Box>
            <Toolbar disableGutters>
              <Box flexGrow={1} textAlign="left">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    updateHistory(job);
                    history.push(`/jobs/${job._id}`);
                  }}
                >
                  See more
                </Button>
              </Box>
              <Box>
                <Typography style={{ fontSize: 12 }}>{job.location}</Typography>
              </Box>
            </Toolbar>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
