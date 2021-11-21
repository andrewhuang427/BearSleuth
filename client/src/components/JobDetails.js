import React, { useState, useEffect, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
//import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
//import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
//import TurnedInIcon from "@mui/icons-material/TurnedIn";
//import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
//import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
//import ShareIcon from "@mui/icons-material/Share";
import UserContext from "../providers/UserContext";
import {host} from "../index"

import axios from "axios";
import { TechSkillsFind, LanguageFind,requirementFind } from "./SearchRegex.js";

function JobDetails({ jobId }) {
  const { user } = useContext(UserContext);
  const [job, setJob] = useState(null);
  const [extras, setExtras] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [requirements, setReq] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const path = host + `api/jobs/${jobId}`;
        const response = await axios.get(path);
        console.log(response);

        setJob(response.data.job);
        setExtras(response.data.extras);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobDetails();
  }, []);

  useEffect(() => {
    if (job != null) {
      setLanguages(LanguageFind(job.description));
      setSkills(TechSkillsFind(job.description));
      setReq(requirementFind(job.description));
    }
  }, [job]);

  //const handleAddToFavorites = () => {};

  return (
    <>
      {job != null ? (
        <Box marginTop={2} marginLeft={2} marginRight={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Paper>
                <Box padding={5}>
                  <Box
                    textAlign="left"
                    fontWeight={800}
                    color={"#137658"}
                    marginBottom={2}
                  >
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
                      {job.description}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Paper>
                <Box padding={5}>
                  <Box textAlign="left" fontWeight={800}>
                    <Toolbar disableGutters>
                      <Box flexGrow={1}>
                        <Typography variant="subtitle1">Job Actions</Typography>
                      </Box>
                    </Toolbar>
                  </Box>
                  <Divider />
                  <Extras extras={extras} />
                  <LanguagesAndSkills languages={languages} skills={skills} requirements={requirements} />
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
                    <Box marginBottom={2}>
                      <Friends friends={user != null ? user.friends : []} />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}

function Tags({ Details }) {
  return (
    <>
      {Details != null ? (
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
      ) : (
        ""
      )}
    </>
  );
}

function Extras({ extras }) {
  return (
    <>
      {extras != null ? (
        <Box marginTop={1} marginBottom={3}>
          {extras.apply_options.map((option) => {
            return (
              <Box marginTop={2} marginBottom={2} key={option.link}>
                <a
                  href={option.link}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Button
                    size="small"
                    startIcon={<PendingActionsIcon />}
                    variant="outlined"
                  >
                    {option.title}
                  </Button>
                </a>
              </Box>
            );
          })}
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
                // secondaryAction={
                //   <Chip
                //     variant="outlined"
                //     color="primary"
                //     clickable
                //     label="Share"
                //     icon={<AddIcon />}
                //   />
                // }
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

function LanguagesAndSkills({ languages, skills,requirements }) {
  return (
    <>
      {languages.length > 0 ? (
        <Box marginBottom={3}>
          <Box marginBottom={2}>
            <Typography variant="subtitle1">Recommended Languages:</Typography>
          </Box>
          <Divider />
          <Box marginTop={2} display="flex">
            {languages.map((l) => {
              return (
                <Box marginRight={1}>
                  <Chip
                    key={l}
                    label={l.charAt(0).toUpperCase() + l.slice(1)}
                    variant="outlined"
                    color="secondary"
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : (
        ""
      )}
      {skills.length > 0 ? (
        <Box marginBottom={2}>
          <Box marginBottom={2}>
            <Typography variant="subtitle1">Recommended Skills:</Typography>
          </Box>
          <Divider />
          <Box marginTop={2} display="flex">
            {skills.map((s) => {
              return (
                <Box marginRight={1}>
                  <Chip
                    key={s}
                    label={s.charAt(0).toUpperCase() + s.slice(1)}
                    variant="outlined"
                    color="secondary"
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : (
        ""
      )}
            {requirements.length > 0 ? (
        <Box marginBottom={3}>
          <Box marginBottom={2}>
            <Typography variant="subtitle1">Job Requirements:</Typography>
          </Box>
          <Divider />
          <Box marginTop={2} display="flex">
            {requirements.map((r) => {
              return (
                <Box marginRight={1}>
                  <Chip
                    key={r}
                    label={r.charAt(0).toUpperCase() + r.slice(1)}
                    variant="outlined"
                    color="secondary"
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}

export default JobDetails;
