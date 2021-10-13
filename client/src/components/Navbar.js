import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../BearSleuth(site).png"
import { deepOrange } from '@mui/material/colors';
import "./test.css";

function loginOn(){
  document.getElementById("loginForm").style.display="block";
  document.getElementById("registerForm").style.display="none";
}
function registerOn(){
  document.getElementById("registerForm").style.display="block";
  document.getElementById("loginForm").style.display="none";
}
function loggedin(){
  document.getElementById("loginButton").style.display="none";
  document.getElementById("RegistrationButton").style.display="none";
  document.getElementById("loginForm").style.display="none"
  document.getElementById("registerForm").style.display="none"
  document.getElementById("Homepage").style.display="block";
  document.getElementById("loginGroup").style.display="block";
  
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
        <Toolbar>
          
          <div id="leftTool">
          <img  id="logo" src={Logo} />

          <IconButton onClick={loggedin}>
            <MenuIcon>

            </MenuIcon>
          </IconButton>
          <Box align="center">
            <Typography align="center" id="name" variant="h6" component="div" sx={{ flexGrow: 1 }} position="static">
              Bear Sleuth
            </Typography> 
          </Box>
          </div>
          <div id="rightTool" marginRight={1}>
          <Button id="loginButton"  display="block" color="inherit" onClick={loginOn}>Login</Button>
          <Button id="RegistrationButton" display="block" color="inherit" onClick={registerOn}>New Account</Button>
          </div>
          <Box id="loginGroup" display="none">
          <Avatar id="profileAvatar" display="none" {...stringAvatar('Eiw')}/>
          </Box>
          

        </Toolbar>
      </AppBar>
    </Box>
  );
}


export {loggedin, loginOn}