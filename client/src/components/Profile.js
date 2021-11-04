import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
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

import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";

import { deepOrange, green } from "@mui/material/colors";

function Profile() {
  return (
    <Box marginLeft={2} marginRight={2} marginTop={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Box padding={5}>
              <Box marginBottom={3} textAlign="center">
                <Typography variant="subtitle1">Your Profile</Typography>
              </Box>
              <Box display="flex" justifyContent="center" marginBottom={3}>
                <Avatar sx={{ height: 100, width: 100 }}>A</Avatar>
              </Box>
              <Box textAlign="center" marginBottom={3}>
                <Box>
                  <Typography variant="subtitle1">Andrew Huang</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">
                    Computer Science Major
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center">
                <Box marginRight={1}>
                  <Button variant="outlined" size="small">
                    Edit Profile
                  </Button>
                </Box>
                <Box>
                  <Button variant="outlined" size="small">
                    Logout
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box padding={3} marginBottom={2}>
              <Box>
                <Toolbar disableGutters>
                  <Box marginRight={2}>
                    <Avatar sx={{ height: 35, width: 35 }} variant="squared">
                      <PlaylistAddCheckIcon />
                    </Avatar>
                  </Box>
                  <Box flexGrow={1}>
                    <Typography>Your Experience</Typography>
                  </Box>
                  <Box>
                    <Chip
                      color="primary"
                      icon={<AddIcon />}
                      clickable
                      label={"Add Experience"}
                      variant="outlined"
                    />
                  </Box>
                </Toolbar>
                <Box textAlign="center" marginBottom={2}>
                  <Typography style={{ fontSize: 12 }}>
                    Your currently do not have any experience
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
          <Paper>
            <Box padding={3} marginBottom={2}>
              <Toolbar disableGutters>
                <Box marginRight={2}>
                  <Avatar sx={{ height: 35, width: 35 }} variant="squared">
                    <StarIcon />
                  </Avatar>
                </Box>
                <Box flexGrow={1}>
                  <Typography>Your Favorites</Typography>
                </Box>
                <Box>
                  <Chip
                    color="primary"
                    icon={<AddIcon />}
                    clickable
                    label={"Explore Jobs"}
                    variant="outlined"
                  />
                </Box>
              </Toolbar>
              <Box textAlign="center" marginBottom={2}>
                <Typography style={{ fontSize: 12 }}>
                  Your currently do not have any favorited jobs
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper>
            <Box padding={3} marginBottom={2}>
              <Toolbar disableGutters>
                <Box marginRight={2}>
                  <Avatar sx={{ height: 35, width: 35 }} variant="squared">
                    <GroupAddIcon />
                  </Avatar>
                </Box>
                <Box flexGrow={1}>
                  <Typography>Your Network</Typography>
                </Box>
                <Box>
                  <Chip
                    color="primary"
                    icon={<AddIcon />}
                    clickable
                    label={"Add Friends"}
                    variant="outlined"
                  />
                </Box>
              </Toolbar>
              <Box textAlign="center" marginBottom={2}>
                <Friends />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;

function Friends() {
  return (
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
  );
}
