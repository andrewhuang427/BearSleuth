import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    const data = { user: username, pass: password };
    fetch("http://localhost:5000/Register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => console.log("Success:", JSON.stringify(response)))
      .catch((error) => console.error("Error:", error));
  };

  return (

    <Box id="registerForm" display="none" marginTop={3} marginLeft="auto" marginRight="auto" maxWidth={400}>
      <Paper elevation={3}>
        <Box padding={3}>
          <Box marginBottom={2}>
            <Typography variant="h5">Create New Account</Typography>
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="username"
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
            <TextField
              label="Major"
              type="text"
              fullWidth
              value={email}
              onChange={handleEmailChange}
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

export default Register;
