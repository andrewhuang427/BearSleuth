import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";
import GroupProvider from "../providers/GroupProvider";
import JobGroupsSidebar from "../components/JobGroupsSidebar";
import JobGroup from "../components/JobGroup";
import { useParams } from "react-router-dom";
function JobGroupsPage() {
  const { groupId } = useParams();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar />
        <JobGroupsSidebar />
        <JobGroup groupId={groupId} />
      </Box>
    </>
  );
}

export default JobGroupsPage;
