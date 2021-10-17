import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../BearSleuth(site).png"
import { deepOrange } from '@mui/material/colors';
import "./test.css";

function loginOn(){
  document.getElementById("loginForm").style.display="block";
  document.getElementById("default").style.display="none";

  document.getElementById("registerForm").style.display="none";
}
function registerOn(){
  document.getElementById("registerForm").style.display="block";
  document.getElementById("loginForm").style.display="none";
  document.getElementById("default").style.display="none";
}
function loggedin(){
  document.getElementById("loginButton").style.display="none";
  document.getElementById("default").style.display="none";
  document.getElementById("RegistrationButton").style.display="none";
  document.getElementById("loginForm").style.display="none"
  document.getElementById("registerForm").style.display="none"
  document.getElementById("Homepage").style.display="block";
  document.getElementById("loginGroup").style.display="block";  
}

function loggedOut(){
  document.getElementById("default").style.display="block";
  document.getElementById("loginButton").style.display="block";
  document.getElementById("RegistrationButton").style.display="block";
  document.getElementById("loginForm").style.display="none"
  document.getElementById("registerForm").style.display="none"
  document.getElementById("Homepage").style.display="none";
  document.getElementById("loginGroup").style.display="none";  
  localStorage.removeItem("username")
  localStorage.removeItem("token")
}


function DropDownMenu() {
  const [opened, setOpened] = useState(null)
  const open = Boolean(opened);
  function handleClick(){
    setOpened(!opened)
  }
  function handleClose(){
    setOpened(null)
  };
  return (
    
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar id="profileAvatar" display="none" {...stringAvatar('Eiw')}/>
      </Button>
      <Menu
        id="basic-menu"
        opened={opened}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={loggedOut}>Logout</MenuItem>
      </Menu>
    </div>

  )



}



function stringAvatar(name) {
  if (localStorage.getItem("username")){
    name = localStorage.getItem("username")
  }
  return {
    sx: {
      bgcolor: deepOrange[500],
    },
    children: `${name.split(' ')[0][0]}`,
  };
}



export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          
          <div id="leftTool">
            <div id="MenuLogo">
              <IconButton onClick={loggedin}>
                <MenuIcon fontSize="large">

                </MenuIcon>
              </IconButton>
              <img  id="logo" src={Logo} />
            </div>
          </div>
          <div id = "midTool">
          <Typography align="center" id="name" variant="h6" component="div" sx={{ flexGrow: 1 }} position="static">
                Welcome to Bear Sleuth!
            </Typography> 
          </div>
          <div id="rightTool" marginRight={1}>
            <div id="rightItems">
              <Button id="loginButton"  display="block" color="inherit" onClick={loginOn}>Login</Button>
              <Button id="RegistrationButton" display="block" color="inherit" onClick={registerOn}>New Account</Button>
            </div>
          </div>
          <Box id="loginGroup" display="none">
            <DropDownMenu/>
          </Box>
          

        </Toolbar>
      </AppBar>
    </Box>
  );
}


export {loggedin, loginOn}