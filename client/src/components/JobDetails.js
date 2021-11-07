import React, { useState, useEffect,useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import axios from "axios";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ShareIcon from "@mui/icons-material/Share";
import UserContext from "../providers/UserContext";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import {TechSkillsFind,LanguageFind} from "./SearchRegex.js";
//import Friends from "./Profile.js";

function JobDetails({ jobId }) {
  const { user, setUser } = useContext(UserContext);
  const [job, setJob] = useState(null);
  let languages=[];
  let skills=[];
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const path = `http://localhost:5000/api/jobs/${jobId}`;
        const response = await axios.get(path);
        setJob(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobDetails();
  }, []);

  useEffect(() => {
    if (job != null) {
      //console.log(job);
      //console.log(job.description);
       languages=LanguageFind(job.description);
       skills=TechSkillsFind(job.description);
       console.log(languages);
       console.log(skills);
       GetLanguages();
    }
  }, [job]);

  function GetLanguages(){
    console.log(languages);
    return(
    <List>
         {languages.length > 0 ? (
          <>
            {languages.map((language) => {
              console.log(language);
              return (
                <ListItem>
                  <ListItemText
                    primary={language}
                  />
                </ListItem>
              );
            })}
          </>
        ) : (
          <Typography style={{ fontSize: 12 }}>
            No skills or languages were found
          </Typography>
        )}
    </List>
    );
  }
  
  const handleAddToFavorites = () => {};

  return (
    <>
      {job != null ? (
        <Box marginTop={2} marginLeft={2} marginRight={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Paper>
                <Box padding={5}>
                  <Box textAlign="left" fontWeight={800} color={"#137658"} marginBottom={2}>
                    <Toolbar disableGutters>
                      <Box marginRight={2}>
                        <Avatar src={job.thumbnail} />
                      </Box>
                      <Box flexGrow={1}>
                        <Typography variant="h6">{job.company_name}</Typography>
                      </Box>
                    </Toolbar>
                  </Box>
                  <Box textAlign="left" marginBottom={3}>
                    <Typography variant="subtitle1">{job.title}</Typography>
                  </Box>
                  <Box marginBottom={3}>
                    <Tags Details={job.detected_extensions} />
                  </Box>
                  <Box marginBottom={3} textAlign="left" color="#616161">
                    <Typography
                      variant="subtitle2"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {`${job.description}`}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Paper>
                <Box padding={5}>
                  <Box>
                    <Box textAlign="left" fontWeight={800}>
                      <Toolbar disableGutters>
                        <Box flexGrow={1}>
                          <Typography variant="subtitle1">
                            {" "}
                            Job Actions
                          </Typography>
                        </Box>
                      </Toolbar>
                    </Box>
                  </Box>
                  <Divider />
                  {/* <Box marginTop={1} marginBottom={3}>
                    <Toolbar disableGutters>
                      <Box marginRight={1}>
                        <Button
                          size="small"
                          startIcon={<TurnedInNotIcon />}
                          variant="outlined"
                        >
                          Save Job
                        </Button>
                      </Box>
                      <Box marginRight={1}>
                        <Button
                          size="small"
                          startIcon={<PendingActionsIcon />}
                          variant="outlined"
                        >
                          Apply
                        </Button>
                      </Box>
                      <Box marginRight={1}>
                        <Button
                          size="small"
                          startIcon={<LocalPhoneIcon />}
                          variant="outlined"
                        >
                          Contact Recruiter
                        </Button>
                      </Box>
                    </Toolbar>
                  </Box> */}
                                    <Box textAlign="left" fontWeight={800}>
                    <Toolbar disableGutters>
                      <Box flexGrow={1}>
                        <Typography variant="subtitle1">
                          Recommended Languages
                        </Typography>
                      </Box>
                    </Toolbar>
                  </Box>
                  <Divider />
                  <Box marginTop={1}>
                    <List>
                    <Paper>
                  <Box padding={3} marginBottom={2}>
                    <Toolbar disableGutters>
                      <Box marginRight={2}>
                      </Box>
                    </Toolbar>
                    <Box textAlign="center" marginBottom={1}>
                     <GetLanguages/>
                    </Box>
                  </Box>
                  </Paper>
                    </List>
                  </Box>
                  <Box textAlign="left" fontWeight={800}>
                    <Toolbar disableGutters>
                      <Box flexGrow={1}>
                        <Typography variant="subtitle1">
                          Share with friends
                        </Typography>
                      </Box>
                    </Toolbar>
                  </Box>
                  <Divider />
                  <Box marginTop={1}>
                    <List>
                    <Paper>
                  <Box padding={3} marginBottom={2}>
                    <Toolbar disableGutters>
                      <Box marginRight={2}>
                      </Box>
                    </Toolbar>
                    <Box textAlign="center" marginBottom={1}>
                      <Friends friends={user != null ? user.friends : []} />
                    </Box>
                  </Box>
                  </Paper>
                    </List>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
function Friends({ friends }) {
  return (
    <List>
      {friends.length > 0 ? (
        <>
          {friends.map((friend) => {
            return (
              <ListItem
                secondaryAction={
                  <Chip
                    variant="outlined"
                    color="primary"
                    clickable
                    label="Share this Job"
                    icon={<AddIcon />}
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ height: 30, width: 30, bgcolor: "blue" }}>
                    {friend.username.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={friend.username}
                  secondary={`Looking for ${friend.desiredRole} Roles`}
                />
              </ListItem>
            );
          })}
        </>
      ) : (
        <Typography style={{ fontSize: 12 }}>
          Your currently do not have any friends
        </Typography>
      )}
    </List>
  );
}

function Tags({ Details }) {
  return (
    <Box display="flex">
      {Details.posted_at != null ? (
        <Box marginRight={1}>
          <Chip
            icon={<AccessTimeIcon />}
            label={"Posted: " + Details.posted_at}
            variant="outlined"
          />
        </Box>
      ) : (
        ""
      )}
      {Details.schedule_type != null ? (
        <Box marginRight={1}>
          <Chip
            icon={<DateRangeIcon />}
            label={Details.schedule_type}
            variant="outlined"
          />
        </Box>
      ) : (
        ""
      )}
      {Details.work_from_home != null ? (
        <Box>
          <Chip
            icon={<HomeIcon />}
            label={"Work From Home"}
            variant="outlined"
          />
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}

export default JobDetails;
