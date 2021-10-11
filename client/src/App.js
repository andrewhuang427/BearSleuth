import "./App.css";
import Navbar from "./components/Navbar"
import LoginForm from "./components/LoginForm";
import Logo from "./BearSleuth(site).png"
import Register from "./components/Register";
function App() {
  return (
    
    <>
      <Navbar/>
      <LoginForm id="loginForm"/>
      <Register/>
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
