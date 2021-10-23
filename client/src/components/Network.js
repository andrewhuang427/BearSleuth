import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";



function Network() {

  return (
    <Box id="searchFriend" display="none">
      <h1>Search for friends by Major</h1>
      <form>
        <input id="usernameSearch" type="text" />
        <Button id="searchButton" onClick={userSearch}>Search</Button>
      </form>
    </Box>
  );
}
function addFriend(e){
    let current="john";
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
          console.log("useradded");
        }
      })
      .catch((error) => console.error("Error:", error));
        

}





const userSearch = () => {
    let query=document.getElementById('usernameSearch').value
  let data = { major:query};
  console.log(data);
  fetch("http://localhost:5000/getUsers", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      const userlist = document.getElementById("list");
      userlist.innerHTML = "";
      console.log(response);
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
        userlist.classList.add("users");
      }

    })
    .catch((error) => console.error("Error:", error));
  };

/*
const CompanySubmit = () => {
  const data = { companyName: document.getElementById('CompanyQuery').value };
  fetch("http://localhost:5000/getJobsByCompany", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((response) => {
      const list = document.getElementById("list");
      list.innerHTML = "";
      alert("Found " + response.values.length + " jobs")
      for (let i = 0; i < response.values.length; i++){
        const listing = document.createElement("div");
        const info = document.createTextNode(response.values[i].position + " at " + response.values[i].company);
        listing.appendChild(info);
        list.appendChild(listing);
        listing.classList.add("job");
      }


    })
    .catch((error) => console.error("Error:", error));
};*/

  





export default Network;
