import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";



function Network() {
  return (
      <>
    <Box id="searchFriend" display="none">
      <h1>Search for friends by Major</h1>
      <form>
        <input id="usernameSearch" type="text" />
        <Button id="searchButton" onClick={userSearch}>Search</Button>
      </form>
      <div id="userlist">

      </div>
      <div id="friends">
      </div>
    </Box>
    </>

    
  );
}
function getFriends(){
    let current="bob";
    const data={username:current};
    fetch("http://localhost:5000/getFriends", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        alert((response.message))
        if (response.success) {
            let friendsList=response.values[0].friends;
            const friends = document.getElementById("friends");
            friends.innerHTML = "";

            for (let i = 0; i < friendsList.length; i++){
                console.log(friendsList[i]);
                const user = document.createElement("div");
                let hiddenName=document.createElement("p");
                hiddenName.innerText=friendsList[i];
                user.appendChild(hiddenName);
                friends.appendChild(user);
                //const addFriendBut=document.createElement("button");
                //addFriendBut.innerText="Add";
                //user.appendChild(addFriendBut);
                //addFriendBut.addEventListener("click",addFriend);
                
              }
        }
      })
      .catch((error) => console.error("Error:", error));
}
function addFriend(e){
    let current="bob";
    let newFriend=e.target.parentNode.firstChild.innerText;
    const data = { username: current, new:newFriend };
    fetch("http://localhost:5000/addFriend", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        alert((response.message))
        if (response.success) {
          //console.log("useradded");
        }
      })
      .catch((error) => console.error("Error:", error));
        

}





const userSearch = () => {
    let query=document.getElementById('usernameSearch').value
  let data = { major:query};
  //console.log(data);
  fetch("http://localhost:5000/getUsers", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      const userlist = document.getElementById("userlist");
      userlist.innerHTML = "";
      //console.log(response);
      for (let i = 0; i < response.values.length; i++){
        const user = document.createElement("div");
        let hiddenName=document.createElement("p");
        hiddenName.innerText=response.values[i].username;
        userlist.appendChild(user);
        //user.appendChild(info);
        user.appendChild(hiddenName);
        const addFriendBut=document.createElement("button");
        addFriendBut.innerText="Add";
        user.appendChild(addFriendBut);
        addFriendBut.addEventListener("click",addFriend);
        
      }
      getFriends();
      

    })
    .catch((error) => console.error("Error:", error));
  };

  





export default Network;
