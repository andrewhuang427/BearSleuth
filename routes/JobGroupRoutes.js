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
  const groupQuery = JobGroupModel.find({ creator: req.user._id })
    .populate({
      path: "creator",
      select: "username major desiredRole -_id",
    })
    .populate("jobs");
  groupQuery.exec((error, docs) => {
    if (error) {
      console.log(err);
      return res.status(500).send({ msg: "internal server error" });
    }
    return res.send(docs);
  });
});

Router.route("/").post(withAuth, (req, res) => {
  let data = req.body;
  data.creator = req.user._id;
  const jobGroup = new JobGroupModel(data);
  jobGroup.save((error, doc) => {
    if (error) {
      console.log(err);
      return res.status(500).send({ msg: "internal server error" });
    }
    return res.send(doc);
  });
});

Router.route("/friends").get(withAuth, (req, res) => {
  const userId = req.user._id;
  const query = UserModel.findById(userId);
  query.exec((error, user) => {
    const groupsQuery = JobGroupModel.find({ creator: { $in: user.friends } })
      .populate({
        path: "creator",
        select: "username major desiredRole -_id",
      })
      .populate("jobs");
    groupsQuery.exec((error, docs) => {
      if (error) {
        console.log(err);
        return res.status(500).send({ msg: "internal server error" });
      }
      return res.send(docs);
    });
  });
});

Router.route("/:id").get((req, res) => {
  const id = req.params.id;
  const query = JobGroupModel.findById(id).populate("jobs").populate("creator");
  query.exec((error, doc) => {
    if (error) {
      console.log(err);
      return res.status(500).send({ msg: "internal server error" });
    }
    return res.send(doc);
  });
});

Router.route("/:id").delete(withAuth, (req, res) => {
  const id = req.params.id;
  const query = JobGroupModel.findByIdAndDelete(id);
  query.exec((error) => {
    if (error) {
      console.log(err);
      return res.status(500).send({ msg: "internal server error" });
    }
    return res.send("successfully deleted doc");
  });
});

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
