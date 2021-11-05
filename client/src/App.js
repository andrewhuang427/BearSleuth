import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
// Import React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Import Theme
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./providers/Theme";
// Import Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NetworkPage from "./pages/NetworkPage";
import JobPage from "./pages/JobPage";
import ProfilePage from "./pages/ProfilePage";
// User Context
import UserContext from "./providers/UserContext";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const fetchUser = async () => {
      const jwt = localStorage.getItem("token");
      console.log(jwt)
      if (jwt != null) {
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        };
        const response = await axios.get(
          "http://localhost:5000/api/user",
          config
        );
        console.log(response.data);
        if (response.status === 200) {
          setUser(response.data);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={value}>
      <ThemeProvider theme={Theme}>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/network">
              <NetworkPage />
            </Route>
            <Route path="/jobs/:jobId">
              <JobPage />
            </Route>
            <Route path="/me">
              <ProfilePage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
