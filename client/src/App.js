import "./App.css";
import Navbar from "./components/Navbar"
import Network from "./components/Network"
import LoginForm from "./components/LoginForm";
import Logo from "./BearSleuth(site).png"
import Register from "./components/Register";
//import Button from "@mui/material/Button";
import Homepage from "./components/Homepage"


function App() {
  return (
   

    <>
        <Navbar/>
        <LoginForm id="loginForm" />
        <Register />
        <Homepage/>
        <Network/>
        <div id="default">
          <img id="img1" alt="webLogo" src={Logo}/>
          <h2>Our Mission</h2>
          <p>Bear Sleuth is an independently developed site that seeks to provide WashU students with a hub for job search</p>
          <h2>Who are we?</h2>
          <p>We are a group of WashU students developing the app to suit WashU students' needs</p>
        </div>
    </>
    // <div className="App">
    //   <h1 id="title">
    //     Bear Sleuth
    //   </h1>
    //   <form id="login">
    //     <input id="username" type="text" placeholder ="username"></input><span></span>
    //     <input id="password" type="password" placeholder ="password"></input><span></span>
    //     <input id="loginBut" type="submit" value="Login" onClick={login} ></input>
    //   </form>
    //   <form id="Register">
    //     <p>Don't have an account? Click here</p>
    //     <input type="submit" onClick={newAccount} value="Register Here"></input>
    //   </form>
    //   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguXSl2UiC7ZSxPiZELnOZjqdSFXzyAwgVhw&usqp=CAU"></img>
    // </div>
  );
}

export default App;
