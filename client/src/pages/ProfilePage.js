import React from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import { useHistory } from "react-router-dom";



function ProfilePage() {
  let history = useHistory();
  if (!localStorage.getItem("username")){
    history.push("/login");
  }
  return (
    <>
      <Navbar />
      <Profile />
    </>
  );
}

export default ProfilePage;
