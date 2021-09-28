const express = require("express");
require("dotenv").config();

const app = express();

const PORT = 5000;

app.get("/*", (req, res) => {
  res.send("Hello Word!");
});

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
