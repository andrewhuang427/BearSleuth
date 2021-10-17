import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {loggedin} from "./Navbar"

function LoginForm() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    const data = { username: username, password: password };
    fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        alert((response.message))
        if (response.success) {
          localStorage.setItem("username", data.username)
          localStorage.setItem("token", response.accessToken)
          loggedin()

        }
      })
      .catch((error) => console.error("Error:", error));
  
    };

  return (

    <Box  id="loginForm"display="none" marginTop={3} marginLeft="auto" marginRight="auto" maxWidth={400}>
      <Paper elevation={3}>
        <Box padding={3}>
          <Box marginBottom={2}>
            <Typography variant="h5">Login</Typography>
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
          <Box>
            <Button variant="contained" onClick={handleSubmit}>
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginForm;
