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
import TextField from "@mui/material/TextField";

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
import { useHistory } from "react-router-dom";
import { deepOrange, green } from "@mui/material/colors";





function Profile() {
  let history = useHistory();
  const logout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    history.push('/login')
  }
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
                  <Button variant="outlined" size="small" onClick={logout}>
                    Logout
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper>
            {/* <Box padding={3} marginBottom={2}>
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
            </Box> */}
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
                <Favorites/>
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
            <Box padding={3} marginBottom={2}>
              <Toolbar disableGutters>
                <Box marginRight={2}>
                  <Avatar sx={{ height: 35, width: 35 }} variant="squared">
                    <GroupAddIcon />
                  </Avatar>
                </Box>
                <Box flexGrow={1}>
                  <Typography>Search New Users (By Major)</Typography>
                </Box>
                <Box>
                  <Chip
                    color="primary"
                    icon={<AddIcon />}
                    clickable
                    label={"User Search"}
                    variant="outlined"
                  />
                </Box>
              </Toolbar>
              <Box textAlign="center" marginBottom={2}>
                <FindAFriend/>
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
                  <Typography>Your Recent History</Typography>
                </Box>
                <Box>
                  <Chip
                    color="primary"
                    icon={<AddIcon />}
                    clickable
                    label={"Recent History"}
                    variant="outlined"
                  />
                </Box>
              </Toolbar>
              <Box textAlign="center" marginBottom={2}>
                <History/>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
function getFavorites(){
    let current="bob";
    const data={username:current};
    fetch("http://localhost:5000/getFavorites", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
            let favorites=response.values[0];
            const favs = document.getElementById("favorites");
            favs.innerHTML = "";
          console.log(favorites);
            for (let i = 0; i < favorites.length; i++){
                const job = document.createElement("div");
                let jobVisitedName=document.createElement("p");
                jobVisitedName.innerText=favorites[i];
                job.appendChild(jobVisitedName);
                favs.appendChild(job);
              }
        }
      })
      .catch((error) => console.error("Error:", error));
  
}

function getFriends() {
  let current = "bob";
  const data = { username: current };
  fetch("http://localhost:5000/getFriends", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
        let friendsList = response.values[0].friends;
        const friends = document.getElementById("friends");
        friends.innerHTML = "";

        for (let i = 0; i < friendsList.length; i++) {
          console.log(friendsList[i]);
          const user = document.createElement("div");
          let hiddenName = document.createElement("p");
          hiddenName.innerText = friendsList[i];
          user.appendChild(hiddenName);
          friends.appendChild(user);
          //const addFriendBut=document.createElement("button");
          //addFriendBut.innerText="Add";
          //user.appendChild(addFriendBut);
          //addFriendBut.addEventListener("click",addFriend);
        }
      }
    })
    .catch((error) => console.error("Error:", error));
}
function getHistory(){
  let current="bob";
  const data={username:current};
  fetch("http://localhost:5000/getHistory", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
          let history=response.values[0].history;
          const previousHistory = document.getElementById("last5Jobs");
          previousHistory.innerHTML = "";
        console.log(history);
          for (let i = history.length-1; i >= history.length-5; i--){
              const job = document.createElement("div");
              let jobVisitedName=document.createElement("p");
              jobVisitedName.innerText=history[i];
              job.appendChild(jobVisitedName);
              previousHistory.appendChild(job);
            }
      }
    })
    .catch((error) => console.error("Error:", error));
}
function History(){ //to do *make it work on load rather than button submission
  return(
    <>
  <input type="hidden" onLoad={getHistory}/>
  <Button onClick={getHistory}>Get History</Button>
  <List id="last5Jobs">

  </List>
  </>);
}
function FindAFriend(){
  return(
    <>
    <Box id="searchFriend">
        <form>
          <input id="usernameSearch" type="text" />
          <Button id="searchButton" onClick={userSearch}>
            Search
          </Button>
        </form>
        <div id="userResults">
          <div id="userlist"></div>
        </div>
        </Box>
  </>);
}
function addFriend(e) {
  let current = "bob";
  let newFriend = e.target.parentNode.firstChild.innerText;
  const data = { username: current, new: newFriend };
  fetch("http://localhost:5000/addFriend", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
        //console.log("useradded");
        getFriends();
      }
    })
    .catch((error) => console.error("Error:", error));
}
function userSearch () {
  let query = document.getElementById("usernameSearch").value;
  let data = { major: query };
  //console.log(data);
  fetch("http://localhost:5000/getUsers", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      const userlist = document.getElementById("userlist");
      userlist.innerHTML = "";
      //console.log(response);
      for (let i = 0; i < response.values.length; i++) {
        const user = document.createElement("div");
        let hiddenName = document.createElement("p");
        hiddenName.innerText = response.values[i].username;
        userlist.appendChild(user);
        //user.appendChild(info);
        user.appendChild(hiddenName);
        const addFriendBut = document.createElement("button");
        addFriendBut.innerText = "Add";
        user.appendChild(addFriendBut);
        addFriendBut.addEventListener("click", addFriend);
      }
      getFriends();
    })
    .catch((error) => console.error("Error:", error));
}
function Favorites(){
  return(<>
  <input type="hidden" onLoad={getFavorites}/>
  <Button onClick={getFavorites}>Get Favorites</Button>
  <List id="favorites">

  </List>
  </>);
}
function Friends() { //to do *make it work on load rather than button submission
  return (
    <>
    <input type="hidden" onLoad={getFriends}/>
    <Button onClick={getFriends}>Get Friends</Button>
    <List id="friends">

    </List>
    </>
    /*<List>
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
    </List>*/
  );
  
}
