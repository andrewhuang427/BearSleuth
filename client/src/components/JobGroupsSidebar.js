import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import ClipLoader from "react-spinners/ClipLoader";
import { host } from "../index";
import axios from "axios";

const drawerWidth = 375;

function JobGroup() {
  const [modalOpen, setModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get(host + "api/groups");
      setGroups(response.data);
    };
    fetchGroups();
  }, []);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box marginTop={2} padding={3}>
          <Box marginBottom={2}>
            <Toolbar disableGutters>
              <Box flexGrow={1}>
                <Typography variant="subtitle1">Job Groups</Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Create
              </Button>
            </Toolbar>
          </Box>
          <Box>
            {groups.length > 0 ? (
              <>
                {groups.map((group) => {
                  return (
                    <Box marginBottom={2} key={group._id}>
                      <Paper variant="outlined">
                        <Box>
                          <Box padding={3}>
                            <Toolbar disableGutters>
                              <Box flexGrow={1} marginRight={1}>
                                <Typography fontSize={12} variant="subtitle1">
                                  {group.name}
                                </Typography>
                              </Box>
                              <Box>
                                <Avatar
                                  color="primary"
                                  sx={{ height: 30, width: 30, fontSize: 12 }}
                                >
                                  {group.jobs.length}
                                </Avatar>
                              </Box>
                            </Toolbar>
                            <Box marginBottom={2}>
                              {group.tags.map((tag) => {
                                return (
                                  <Chip
                                    label={tag}
                                    size="small"
                                    variant="outlined"
                                    style={{
                                      marginRight: 5,
                                      fontSize: 12,
                                    }}
                                  />
                                );
                              })}
                            </Box>
                            <Box>
                              <Typography fontSize={12} variant="subtitle2">
                                Created by: {group.creator.username}
                              </Typography>
                            </Box>
                          </Box>
                          <Divider />

                          <Box display="flex" justifyContent="end" padding={2}>
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              style={{ fontSize: 12, marginRight: 8 }}
                            >
                              View Jobs
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              style={{ fontSize: 12 }}
                            >
                              Join Group
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                    </Box>
                  );
                })}
              </>
            ) : (
              <>
                <Box textAlign="center" padding={3}>
                  <Typography variant="subtitle2">No groups found</Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
      <NewGroupModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}

export default JobGroup;

const allIndustries = [
  "Aerospace",
  "Banking",
  "Consulting",
  "Engineering",
  "Education",
  "Energy",
  "Finance",
  "Hardware",
  "Healthcare",
  "Software",
  "Technology",
  "Transportation",
];

const durations = ["Internship", "Full-time", "Part-time", "Volunteer"];

function NewGroupModal({ open, setOpen }) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const handleToggleIndustries = (industry) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
    } else if (selectedIndustries.length >= 3) {
      const copy = [...selectedIndustries];
      copy.shift();
      copy.push(industry);
      setSelectedIndustries(copy);
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  useEffect(() => {
    console.log(selectedIndustries);
  }, [selectedIndustries]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const jwt = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    const data = {
      name: groupName,
      description,
      tags: selectedIndustries,
      duration: selectedDuration,
    };
    console.log(data);
    const response = await axios.post(host + "api/groups", data, config);
    console.log(response.data);
    setIsLoading(false);
  };

  return (
    <Modal
      aria-labelled
      by="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            width: 600,
            boxShadow: 24,
          }}
        >
          <Box padding={4}>
            <Box marginBottom={1}>
              <Typography variant="subtitle1">
                Create a new Job Group
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">
                Job groups can be used to save and group similar jobs
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box padding={4}>
            <Box marginBottom={2}>
              <TextField
                label="Room Name"
                fullWidth
                onChange={(event) => {
                  setGroupName(event.target.value);
                }}
              />
            </Box>
            <Box marginBottom={2}>
              <Box marginLeft={1} marginBottom={2}>
                <Typography variant="subtitle2">
                  Select Industries (maximum 3)
                </Typography>
              </Box>
              {allIndustries.map((industry) => {
                return (
                  <Chip
                    color={
                      selectedIndustries.includes(industry)
                        ? "primary"
                        : "default"
                    }
                    variant="contained"
                    label={industry}
                    key={industry}
                    style={{ marginRight: 8, marginBottom: 8 }}
                    onClick={() => {
                      handleToggleIndustries(industry);
                    }}
                  />
                );
              })}
            </Box>
            <Box marginBottom={2}>
              <Box marginLeft={1} marginBottom={2}>
                <Typography variant="subtitle2">
                  Select Industries (maximum 3)
                </Typography>
              </Box>
              {durations.map((duration) => {
                return (
                  <Chip
                    color={
                      selectedDuration === duration ? "primary" : "default"
                    }
                    label={duration}
                    style={{ marginRight: 8, marginBottom: 8 }}
                    onClick={() => {
                      setSelectedDuration(duration);
                    }}
                  />
                );
              })}
            </Box>
            <Box marginBottom={2}>
              <TextField
                label="Room Description"
                multiline
                rows={3}
                fullWidth
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Box>
            <Box>
              <Button
                color="primary"
                variant={isLoading ? "outlined" : "contained"}
                onClick={handleSubmit}
                fullWidth
              >
                {isLoading ? (
                  <ClipLoader color={"rgba(58, 180, 75, 1)"} size={30} />
                ) : (
                  "Create Room"
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
}
