import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LoginOn from "./Navbar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {host} from "../index"


function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [role, setRole] = useState("");
  const [loc, setLoc] = useState("");

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleLocChange = (event) => {
    setLoc(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const majors = [
    "Computer Science",
    "Biomedical Engineering",
    "Computer Engineering",
    "Data Science",
    "Electrical Engineering",
    "Chemical Engineering",
    "Mechanical Engineering",
  ];

  const handleSubmit = () => {
    const data = {
      username: username,
      password: password,
      email: email,
      major: major,
      role: role,
      location: loc,
      history:[],
    };
    console.log(data);
    fetch(host + "register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.message);
        if (response.success) {
          LoginOn();
          
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <Box
      id="registerForm"
      // display="none"
      marginTop={3}
      marginLeft="auto"
      marginRight="auto"
      maxWidth={400}
    >
      <Paper elevation={3}>
        <Box padding={3}>
          <Box marginBottom={2}>
            <Typography variant="h5">Create New Account</Typography>
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="Username"
              type="text"
              fullWidth
              value={username}
              onChange={handleUserNameChange}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="Email Address"
              type="text"
              fullWidth
              value={email}
              onChange={handleEmailChange}
            />
          </Box>
          <Box marginBottom={2}>
            <Select
              value={major}
              label="Select your Major"
              fullWidth
              onChange={handleMajorChange}
            >
              <MenuItem value={majors[0]}>Computer Science</MenuItem>
              <MenuItem value={majors[1]}>Biomedical Engineering</MenuItem>
              <MenuItem value={majors[2]}>Computer Engineering</MenuItem>
              <MenuItem value={majors[3]}>Data Science</MenuItem>
              <MenuItem value={majors[4]}>Electrical Engineering</MenuItem>
              <MenuItem value={majors[5]}>Chemical Engineering</MenuItem>
            </Select>
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="Desired Role"
              type="text"
              fullWidth
              value={role}
              onChange={handleRoleChange}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="Desired Location"
              type="text"
              fullWidth
              value={loc}
              onChange={handleLocChange}
            />
          </Box>
          <Box>
            <Button variant="contained" onClick={handleSubmit}>
              Register
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default RegisterForm;
