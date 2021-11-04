import React from "react";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";
import { useHistory } from "react-router-dom";

function RegisterPage() {
  let history = useHistory();
  if (localStorage.getItem("username")){
    history.push("/");
  }
  return (
    <>
      <Navbar />
      <RegisterForm />
    </>
  );
}

export default RegisterPage;
