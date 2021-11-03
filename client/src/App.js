import "./App.css";
import React from "react";

// Import React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NetworkPage from "./pages/NetworkPage";

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
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

      {/* <div id="default">
        <img id="img1" alt="webLogo" src={Logo} />
        <h2>Our Mission</h2>
        <p>
          Bear Sleuth is an independently developed site that seeks to provide
          WashU students with a hub for job search
        </p>
        <h2>Who are we?</h2>
        <p>
          We are a group of WashU students developing the app to suit WashU
          students' needs
        </p>
      </div> */}
    </Router>
  );
}

export default App;
