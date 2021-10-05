const express = require("express");

const Router = express.Router();

Router.route("/new").get((req, res) => {
  const data = {
    success: true,
    msg: "user created successfully",
    path: "/api/auth/new",
  };
  res.status(200).json(data);
});

module.exports = Router;
