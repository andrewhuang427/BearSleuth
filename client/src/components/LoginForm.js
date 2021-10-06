import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <Box marginTop={3} marginLeft="auto" marginRight="auto" maxWidth={400}>
      <Paper elevation={3}>
        <Box padding={3}>
          <Box marginBottom={2}>
            <Typography variant="h5">Login</Typography>
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="Email"
              type="text"
              fullWidth
              value={email}
              onChange={handleEmailChange}
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
