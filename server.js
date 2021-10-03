const express = require("express");
require("dotenv").config();

const app = express();
const cors=require('cors');
app.use(cors())
app.options('*',cors())
app.use(express.json());
app.use(express.urlencoded());

const PORT = 5000;

app.get("/*", (req, res) => {
  res.send("Hello Word!");
});


app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});

app.post('/login',(req, res) => {

  let data=req.body;
  let username=data.user;
  let password=data.pass;
  console.log(username);
  console.log(password);
})
