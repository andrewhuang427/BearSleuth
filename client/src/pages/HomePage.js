import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";
import JobSearch from "../components/JobSearch";
import JobGroupsSidebar from "../components/JobGroupsSidebar";
import GroupProvider from "../providers/GroupProvider";
import { useHistory } from "react-router-dom";

function HomePage() {
  let history = useHistory();

  if (!localStorage.getItem("username")) {
    history.push("/login");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <JobGroupsSidebar />
      <JobSearch />
    </Box>
  );
}

export default HomePage;
