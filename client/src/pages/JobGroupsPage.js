import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";
import GroupProvider from "../providers/GroupProvider";
import JobGroupsSidebar from "../components/JobGroupsSidebar";
import JobGroup from "../components/JobGroup";
function JobGroupsPage() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar />
        <GroupProvider>
          <JobGroupsSidebar />
          <JobGroup />
        </GroupProvider>
      </Box>
    </>
  );
}

export default JobGroupsPage;
