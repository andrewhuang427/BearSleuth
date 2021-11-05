import React, { useState, useContext } from "react";
import UserContext from "../providers/UserContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import {loggedin} from "./Navbar"
import { useHistory } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  let history = useHistory();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleUserNameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const body = { username: username, password: password };
      const response = await axios.post("http://localhost:5000/login", body);
      const data = response.data;
      alert(data.message);
      if (data.success) {
        localStorage.setItem("username", username);
        localStorage.setItem("token", data.accessToken);
        history.push("/home");
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      id="loginForm"
      // display="none"
      marginTop={3}
      marginLeft="auto"
      marginRight="auto"
      maxWidth={400}
    >
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
