const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ---- Import API Routes -----
const AuthenticationRoutes = require("./routes/AuthenticationRoutes");

app.use(cors());
// app.options("*", cors());
// app.use(express.json());
// app.use(express.urlencoded());

const PORT = 5000;

// ----- Database Connection -----
mongoose
  .connect(
    "mongodb+srv://Ben:Password123@bearsleuth.tjsia.mongodb.net/sample_airbnb?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("connection successful");
  })
  .catch((error) => {
    console.log(error);
    console.log("connection unsuccessful");
  });

// ----- API Routes ----
app.use("/api/auth", AuthenticationRoutes);

app.get("/*", (req, res) => {
  res.send("Hello Word!");
});

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});

app.post("/login", (req, res) => {
  let data = req.body;
  let username = data.user;
  let password = data.pass;
  console.log(username);
  console.log(password);
});
