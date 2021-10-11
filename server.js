const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/AuthRoutes.js")


const app = express();

// ---- Import API Routes -----
const AuthenticationRoutes = require("./routes/AuthenticationRoutes");

app.use(cors());
 app.options("*", cors());
 app.use(express.json());
 app.use(express.urlencoded());

const PORT = 5000;

// ----- Database Connection -----
mongoose
  .connect(
    "mongodb+srv://Ben:Password123@bearsleuth.tjsia.mongodb.net/BearSleuth?retryWrites=true&w=majority"
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

app.get("/", (req, res) => {
  res.send("Hello Word!");
});

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});


app.use(AuthRoutes)


app.get("/users", async (req, res) => {
  var query = usermodel.find();
  query.select('-_id');
  query.exec(function (err, users) {
      if (err) return (err);
      res.send(users);
  })
});