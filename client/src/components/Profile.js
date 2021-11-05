import React, { useState, useEffect, useContext } from "react";
import UserContext from "../providers/UserContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { deepOrange, deepPurple, green, blue } from "@mui/material/colors";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import { useHistory } from "react-router-dom";

import AddFriendsModal from "./AddFriendsModal";

import axios from "axios";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    history.push("/login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (user != null) {
        const jwt = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        };
        const response = await axios.get(
          "http://localhost:5000/api/user/all",
          config
        );
        setUsers(response.data);
      }
    };
    fetchUsers();
  }, [user]);

  const handleAddFriend = async (uid) => {
    console.log(uid);
    try {
      const jwt = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const data = { uid };
      const response = await axios.post(
        "http://localhost:5000/api/user/addFriend",
        data,
        config
      );
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                  <Box marginBottom={1}>
                    <Typography variant="subtitle1">
                      {user != null ? user.username : ""}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">
                      {user != null ? user.major + " Major" : ""}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">
                      {user != null ? user.desiredLocation : ""}
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
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleLogout}
                    >
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
                  <Favorites favorites={user != null ? user.favorites : []} />
                </Box>
              </Box>
              <Box padding={3} marginBottom={2}>
                <Toolbar disableGutters>
                  <Box marginRight={2}>
                    <Avatar sx={{ height: 35, width: 35 }} variant="squared">
                      <GroupAddIcon />
                    </Avatar>
                  </Box>
                  <Box flexGrow={1}>
                    <Typography>Recent Job Search History</Typography>
                  </Box>
                </Toolbar>
                <Box textAlign="center" marginBottom={2}>
                  <History history={user != null ? user.history : []} />
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
                      onClick={() => {
                        setModalOpen(true);
                      }}
                    />
                  </Box>
                </Toolbar>
                <Box textAlign="center" marginBottom={2}>
                  <Friends friends={user != null ? user.friends : []} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <AddFriendsModal
        open={modalOpen}
        setOpen={setModalOpen}
        users={users}
        addFriend={handleAddFriend}
      />
    </>
  );
}

export default Profile;

function Favorites({ favorites }) {
  return (
    <Box>
      {favorites.length > 0 ? (
        ""
      ) : (
        <Typography style={{ fontSize: 12 }}>
          Your currently do not have any favorited jobs
        </Typography>
      )}
    </Box>
  );
}
function History({ history }) {
  return (
    <Box>
      {history.length > 0 ? (
        ""
      ) : (
        <Typography style={{ fontSize: 12 }}>
          Your currently do not have any favorited jobs
        </Typography>
      )}
    </Box>
  );
}

const colors = [deepOrange, deepPurple, green, blue];

const getColor = () => {
  const random = Math.random();
  const index = parseInt(random * 4);
  return colors[index]["500"];
};

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
                    label="Send Message"
                    icon={<AddIcon />}
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ height: 30, width: 30, bgcolor: getColor() }}>
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

function FindAFriend() {
  return (
    <>
      <Box id="searchFriend">Find Friend</Box>
    </>
  );
}
