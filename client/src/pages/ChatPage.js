import React from "react";
import Navbar from "../components/Navbar";
import Chat from "../components/Socket/Chat";
import { useHistory } from "react-router-dom";



function ChatPage() {
  let history = useHistory();
  if (!localStorage.getItem("username")){
    history.push("/login");
  }
  return (
    <>
      <Navbar />
      <Chat />
    </>
  );
}
export default ChatPage;
