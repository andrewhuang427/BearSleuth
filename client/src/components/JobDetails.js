import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
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

function JobDetails({ jobId }) {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const path = `http://localhost:5000/api/jobs/${jobId}`;
        const response = await axios.get(path);
        console.log(response.data);
        setJob(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobDetails();
  }, []);

  useEffect(() => {
    if (job != null) {
      console.log(job);
      console.log(job.description);
    }
  }, [job]);

  const handleAddToFavorites = () => {};

  return (
    <>
      {job != null ? (
        <Box marginTop={2} marginLeft={2} marginRight={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Paper>
                <Box padding={5}>
                  <Box textAlign="left" fontWeight={800} color={"#137658"}>
                    <Toolbar disableGutters>
                      <Box flexGrow={1}>
                        <Typography variant="h6">{job.company_name}</Typography>
                      </Box>
                    </Toolbar>
                  </Box>
                  <Box textAlign="left" marginBottom={2}>
                    <Typography variant="subtitle1">{job.title}</Typography>
                  </Box>
                  <Box marginBottom={2}>
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
                          <Typography variant="subtitle1"> Job Actions</Typography>
                        </Box>
                      </Toolbar>
                    </Box>
                  </Box>
                  <Divider />
                  <Box marginTop={1} marginBottom={3}>
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
                      <ListItemButton
                        secondaryAction={
                          <IconButton>
                            <ShareIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>A</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={"Andrew Huang"}
                          secondary={"Looking for Software Engineering Roles"}
                        />
                      </ListItemButton>
                      <ListItemButton
                        secondaryAction={
                          <IconButton>
                            <ShareIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>B</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={"Ben Gross"}
                          secondary={"Looking for Software Engineering Roles"}
                        />
                      </ListItemButton>
                      <ListItemButton
                        secondaryAction={
                          <IconButton>
                            <ShareIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>A</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={"Allen Buckner"}
                          secondary={"Looking for Software Engineering Roles"}
                        />
                      </ListItemButton>
                      <ListItemButton
                        secondaryAction={
                          <IconButton>
                            <ShareIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>T</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={"Teddy Fujimoto"}
                          secondary={"Looking for Software Engineering Roles"}
                        />
                      </ListItemButton>
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
