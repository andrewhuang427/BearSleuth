import './App.css';

function App() {
  function login(event){
    event.preventDefault();
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    console.log(username);
    console.log(password);
    const data={user: username, pass: password}
    fetch('http://localhost:5000/login', {
      method: "POST",
      body:JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:',error))
  }
  function newAccount(event){
    event.preventDefault();
  }
  return (
    <div className="App">
      <h1 id="title">
        Bear Sleuth
      </h1>
      <form id="login">
        <input id="username" type="text" placeholder ="username"></input><span></span>
        <input id="password" type="password" placeholder ="password"></input><span></span>
        <input id="loginBut" type="submit" value="Login" onClick={login} ></input>
      </form>
      <form id="Register">
        <p>Don't have an account? Click here</p>
        <input type="submit" onClick={newAccount} value="Register Here"></input>
      </form>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguXSl2UiC7ZSxPiZELnOZjqdSFXzyAwgVhw&usqp=CAU"></img>
    </div>
  );
}

export default App;
