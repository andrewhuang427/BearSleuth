import React from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import { useHistory } from "react-router-dom";


function LoginPage() {
  let history = useHistory();
  if (localStorage.getItem("username")){
    history.push("/");
  }

  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
}

export default LoginPage;
