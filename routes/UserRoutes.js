const express = require("express");
const UserModel = require("../models/UserModel");
const { withAuth } = require("../middleware/AuthenticationMiddleware");

const Router = express.Router();

Router.route("/all").get((req, res) => {
  const query = UserModel.find()
    .populate(["friends", "favorites"])
    .select(["username", "major", "desiredLocation"]);
  query.exec((err, docs) => {
    if (err) res.status(500).send({ msg: "internal service error" });
    res.send(docs);
  });
});

Router.route("/").get(withAuth, (req, res) => {
  const { name } = req.user;
  const query = UserModel.findOne({ username: name })
    .populate(["friends", "favorites"])
    .select(["-hash"]);
  query.exec((err, doc) => {
    if (err) res.status(500).send({ msg: "internal service error" });
    res.send(doc);
  });
});

Router.route("/addFriend").post(withAuth, async (req, res) => {
  const { name } = req.user;
  const { uid } = req.body;
  const query = UserModel.findOneAndUpdate(
    { username: name },
    { $addToSet: { friends: uid } },
    { new: true }
  ).populate(["friends", "favorites"]);
  query.exec((err, doc) => {
    if (err) res.status(500).send({ msg: "internal server error" });
    res.send(doc);
  });
});

Router.route("/addFavorite").post(withAuth, async (req, res) => {
  const { name } = req.user;
  const { jobId } = req.body;
  const query = UserModel.findOneAndUpdate(
    { username: name },
    { $addToSet: { favorites: jobId } },
    { new: true }
  ).populate(["friends", "favorites"]);
  query.exec((err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).send({ msg: "internal server error" });
    }
    res.send(doc);
  });
});

Router.route("/removeFavorite").post(withAuth, async (req,res) => {
  const { name } = req.user;
  const { jobId } = req.body;
  const query = UserModel.findOneAndUpdate(
    { username: name },
    { $pull: { favorites: jobId } },
    { new: true }
  ).populate(["friends", "favorites"]);
  query.exec((err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).send({ msg: "internal server error" });
    }
    res.send(doc);
  });
})
module.exports = Router;
