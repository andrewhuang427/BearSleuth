import React from "react";
import Navbar from "../components/Navbar";
import JobDetails from "../components/JobDetails";
import { useParams, useHistory } from "react-router-dom";

function JobPage() {
  const { jobId } = useParams();
  let history = useHistory();

  if (!localStorage.getItem("username")) {
    history.push("/login");
  }

  return (
    <>
      <Navbar />
      <JobDetails jobId={jobId} />
    </>
  );
}

export default JobPage;
