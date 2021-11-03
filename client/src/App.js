import "./App.css";
import React from "react";

// Import React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NetworkPage from "./pages/NetworkPage";
import JobPage from "./pages/JobPage";

function App() {
  return (
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
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
