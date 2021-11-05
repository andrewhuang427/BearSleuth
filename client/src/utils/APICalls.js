function getFavorites() {
  let current = "bob";
  const data = { username: current };
  fetch("http://localhost:5000/getFavorites", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
        let favorites = response.values[0];
        const favs = document.getElementById("favorites");
        favs.innerHTML = "";
        console.log(favorites);
        for (let i = 0; i < favorites.length; i++) {
          const job = document.createElement("div");
          let jobVisitedName = document.createElement("p");
          jobVisitedName.innerText = favorites[i];
          job.appendChild(jobVisitedName);
          favs.appendChild(job);
        }
      }
    })
    .catch((error) => console.error("Error:", error));
}

function getFriends() {
  let current = "bob";
  const data = { username: current };
  fetch("http://localhost:5000/getFriends", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
        let friendsList = response.values[0].friends;
        const friends = document.getElementById("friends");
        friends.innerHTML = "";

        for (let i = 0; i < friendsList.length; i++) {
          console.log(friendsList[i]);
          const user = document.createElement("div");
          let hiddenName = document.createElement("p");
          hiddenName.innerText = friendsList[i];
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
function getHistory() {
  let current = "bob";
  const data = { username: current };
  fetch("http://localhost:5000/getHistory", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
        let history = response.values[0].history;
        const previousHistory = document.getElementById("last5Jobs");
        previousHistory.innerHTML = "";
        console.log(history);
        for (let i = history.length - 1; i >= history.length - 5; i--) {
          const job = document.createElement("div");
          let jobVisitedName = document.createElement("p");
          jobVisitedName.innerText = history[i];
          job.appendChild(jobVisitedName);
          previousHistory.appendChild(job);
        }
      }
    })
    .catch((error) => console.error("Error:", error));
}

function addFriend(e) {
  let current = "bob";
  let newFriend = e.target.parentNode.firstChild.innerText;
  const data = { username: current, new: newFriend };
  fetch("http://localhost:5000/addFriend", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
        //console.log("useradded");
        getFriends();
      }
    })
    .catch((error) => console.error("Error:", error));
}
function userSearch() {
  let query = document.getElementById("usernameSearch").value;
  let data = { major: query };
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
      for (let i = 0; i < response.values.length; i++) {
        const user = document.createElement("div");
        let hiddenName = document.createElement("p");
        hiddenName.innerText = response.values[i].username;
        userlist.appendChild(user);
        //user.appendChild(info);
        user.appendChild(hiddenName);
        const addFriendBut = document.createElement("button");
        addFriendBut.innerText = "Add";
        user.appendChild(addFriendBut);
        addFriendBut.addEventListener("click", addFriend);
      }
      getFriends();
    })
    .catch((error) => console.error("Error:", error));
}
