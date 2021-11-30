import "./App.css";
import React, { useState, useEffect, useMemo } from "react";

// Import React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import Theme
import { ThemeProvider } from "@mui/material/styles";
import GroupProvider from "./providers/GroupProvider";
import Theme from "./providers/Theme";

// Import Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobPage from "./pages/JobPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import JobGroupsPage from "./pages/JobGroupsPage";

// User Context
import UserContext from "./providers/UserContext";
import axios from "axios";
import { host } from "./index.js";

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const fetchUser = async () => {
      const jwt = localStorage.getItem("token");
      if (jwt != null) {
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        };
        const response = await axios.get(host + "api/user", config);
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
            <Route path="/jobs/:jobId">
              <JobPage />
            </Route>
            <Route path="/me">
              <ProfilePage />
            </Route>
            <Route path="/chat">
              <ChatPage />
            </Route>
            <GroupProvider>
              <Route path="/groups/:groupId">
                <JobGroupsPage />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
            </GroupProvider>
          </Switch>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
