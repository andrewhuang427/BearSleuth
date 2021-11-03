import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import JobDetails from "../components/JobDetails";
import { useParams } from "react-router-dom";

function JobPage() {
  const { jobId } = useParams();

  return (
    <>
      <Navbar />
      <JobDetails jobId={jobId} />
    </>
  );
}

export default JobPage;
