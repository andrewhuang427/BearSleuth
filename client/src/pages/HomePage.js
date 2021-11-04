import React from "react";
import Navbar from "../components/Navbar";
import JobSearch from "../components/JobSearch";
import { useHistory } from "react-router-dom";



function HomePage() {
  let history = useHistory();
  if (!localStorage.getItem("username")){
    history.push("/login");
  }

  return (
    <>
      <Navbar />
      <JobSearch />
    </>
  );
}

export default HomePage;
