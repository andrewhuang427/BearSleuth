import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 id="title">
        Bear Sleuth
      </h1>
      <form id="login">
        <input type="text"></input>
        <input type="password"></input>
        <input id="loginBut" type="submit" value="Login"></input>
      </form>
      <form id="Register">
        <p>Don't have an account? Click here</p>
        <input type="submit" value="Register Here"></input>
      </form>
    </div>
  );
}

export default App;
