const express = require("express");
const JobGroupModel = require("../models/JobGroupModel");
const UserModel = require("../models/UserModel");
const { withAuth } = require("../middleware/AuthenticationMiddleware");

const Router = express.Router();

Router.route("/").get((req, res) => {
  const query = JobGroupModel.find({})
    .populate({
      path: "creator",
      select: "username major desiredRole -_id",
    })
    .populate("jobs");
  query.exec((error, docs) => {
    if (error) {
      console.log(err);
      return res.status(500).send({ msg: "internal server error" });
    }
    return res.send(docs);
  });
});

Router.route("/me").get(withAuth, (req, res) => {
  const { name } = req.user;
  const query = UserModel.findOne({ username: name });
  query.exec((err, user) => {
    const groupQuery = JobGroupModel.find({ creator: user._id });
    groupQuery.exec((error, docs) => {
      if (error) {
        console.log(err);
        return res.status(500).send({ msg: "internal server error" });
      }
      return res.send(docs);
    });
  });
});

Router.route("/").post(withAuth, (req, res) => {
  const { name } = req.user;
  const query = UserModel.findOne({ username: name });
  query.exec((err, user) => {
    let data = req.body;
    data.creator = user._id;
    const jobGroup = new JobGroupModel(data);
    jobGroup.save((error, doc) => {
      if (error) {
        console.log(err);
        return res.status(500).send({ msg: "internal server error" });
      }
      return res.send(doc);
    });
  });
});

Router.route("/:id").get((req, res) => {});

Router.route("/:id/addJob").post(withAuth, (req, res) => {
  const groupId = req.params.id;
  const { jobId } = req.body;
  const query = JobGroupModel.findByIdAndUpdate(groupId, {
    $addToSet: { jobs: jobId },
  });
  query.exec((error, doc) => {
    if (error) {
      console.log(err);
      return res.status(500).send({ msg: "internal server error" });
    }
    return res.send(doc);
  });
});
module.exports = Router;
