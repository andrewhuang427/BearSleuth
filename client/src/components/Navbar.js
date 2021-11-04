import { React, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Logo from "../BearSleuth(site).png";
import { useHistory } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import "./test.css";

// function loginOn() {
//   document.getElementById("loginForm").style.display = "block";
//   document.getElementById("default").style.display = "none";

//   document.getElementById("registerForm").style.display = "none";
// }
// function registerOn() {
//   document.getElementById("registerForm").style.display = "block";
//   document.getElementById("loginForm").style.display = "none";
//   document.getElementById("default").style.display = "none";
// }
// function loggedin() {
//   document.getElementById("loginButton").style.display = "none";
//   document.getElementById("network").style.display = "block";
//   document.getElementById("search").style.display = "block";
//   document.getElementById("logoutBut").style.display = "block";
//   document.getElementById("default").style.display = "none";
//   document.getElementById("RegistrationButton").style.display = "none";
//   document.getElementById("loginForm").style.display = "none";
//   document.getElementById("registerForm").style.display = "none";
//   // document.getElementById("Homepage").style.display="block";
//   document.getElementById("loginGroup").style.display = "block";
// }

// function loggedOut() {
//   document.getElementById("default").style.display = "block";
//   document.getElementById("network").style.display = "none";
//   document.getElementById("searchFriend").style.display = "none";
//   document.getElementById("search").style.display = "none";
//   document.getElementById("logoutBut").style.display = "none";
//   document.getElementById("loginButton").style.display = "block";
//   document.getElementById("RegistrationButton").style.display = "block";
//   document.getElementById("loginForm").style.display = "none";
//   document.getElementById("registerForm").style.display = "none";
//   //document.getElementById("Homepage").style.display="none";
//   document.getElementById("loginGroup").style.display = "none";
//   localStorage.removeItem("username");
//   localStorage.removeItem("token");
// }
// function getNetwork() {
//   document.getElementById("search").style.display = "none";
//   document.getElementById("searchFriend").style.display = "block";
// }

function DropDownMenu() {
  const [opened, setOpened] = useState(null);
  const open = Boolean(opened);

  function handleClick() {
    setOpened(!opened);
  }
  function handleClose() {
    setOpened(null);
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar id="profileAvatar" display="none" {...stringAvatar("Eiw")} />
      </Button>
      <Menu
        id="basic-menu"
        opened={opened}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      ></Menu>
    </div>
  );
}

function stringAvatar(name) {
  if (localStorage.getItem("username")) {
    name = localStorage.getItem("username");
  }
  return {
    sx: {
      bgcolor: deepOrange[500],
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

export default function Navbar() {
  let history = useHistory();

  const handleLogout = () => {};

  return (
    <Box flexGrow={1}>
      <AppBar position="static" style={{ background: "#fefefe" }}>
        <Toolbar>
          <Box marginRight={1}>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Box>
          <Box flexGrow={1} paddingTop={1}>
            <img
              src={Logo}
              style={{ height: 60, objectFit: "contain", cursor: "pointer" }}
              onClick={() => {
                history.push("/");
              }}
            />
          </Box>
          <Box>
            {/* <Button
              id="loginButton"
              display="block"
              color="inherit"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Button> */}
            {/* <Button
              id="RegistrationButton"
              display="block"
              color="inherit"
              onClick={() => {
                history.push("/register");
              }}
            >
              New Account
            </Button> */}
            <Button
              onClick={() => {
                history.push("/");
              }}
            >
              Jobs
            </Button>
            <Button
              id="network"
              onClick={() => {
                history.push("/me");
              }}
            >
              Profile
            </Button>
            {/* <Button id="logoutBut" onClick={handleLogout}>
              Logout
            </Button> */}
          </Box>
          {/* <Box id="loginGroup" display="none">
            <DropDownMenu />
          </Box> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// export { loggedin, loginOn };
