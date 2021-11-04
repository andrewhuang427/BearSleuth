import "./App.css";
import React from "react";

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

function App() {
  return (
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
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
