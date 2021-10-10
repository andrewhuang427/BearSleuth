import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../BearSleuth(site).png"
import "./test.css";

function loginOn(){
  document.getElementById("loginForm").style.display="block";
  document.getElementById("registerForm").style.display="none";
}
function registerOn(){
  document.getElementById("registerForm").style.display="block";
  document.getElementById("loginForm").style.display="none";
}
export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div id="leftTool">
          <Typography id="name" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bear Sleuth
            <img  id="logo" src={Logo}/>
          </Typography> 
          </div>
          <div id="rightTool">
          <Button color="inherit" onClick={loginOn}>Login</Button>
          <Button color="inherit" onClick={registerOn}>New Account</Button>
          </div>
          

        </Toolbar>
      </AppBar>
    </Box>
  );
}
