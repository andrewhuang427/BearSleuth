import React from "react";
import Navbar from "../components/Navbar";
import Network from "../components/Network";
import { useHistory } from "react-router-dom";


function NetworkPage() {
  let history = useHistory();
  if (!localStorage.getItem("username")){
    history.push("/login");
  }
  return (
    <>
      <Navbar />
      <Network />
    </>
  );
}

export default NetworkPage;
