const express = require("express");
const usermodel = require("../models/UserModel");
const jobModel = require("../models/JobModel");

const app = express();
const mongoose = require('mongoose');
const path = require('path')
var fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


    

app.post("/login", async (request, response) => {
    data = (request.body);
    query = usermodel.findOne({ username: data.username }, function (err, user) {
        if (err) return (err);
        if (user == null) {
            ret = { "message": "User Does not Exist", "success": false }
            response.json(ret)
        }
        else {
            bcrypt.compare(data.password, user.hash).then((result) => {
                console.log(result)
                if (result) {
                    const username = data.username
                    const user = { name : username}
                    console.log(user.name)
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                    response.json({"message" : "Logged in Successfully" ,accessToken : accessToken, "success": true})
                }
                else {
                    ret = { "message": "Incorrect Password", "success": false }
                    response.json(ret)
                }
            })
        }
    })
});


function authenticateToken(req, res, next) {
    token = req.body.accessToken
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.get("/users", async (req, res) => {
    var query = usermodel.find();
    query.select('-_id');
    query.exec(function (err, users) {
        if (err) return (err);
        res.send(users);
    })
  });



  app.get("/jobs", async (req, res) => {
    var query = jobModel.find();
    query.select('-_id');
    query.exec(function (err, jobs) {
        if (err) return (err);
        res.send(jobs);
    })
  });

  

app.post("/register", async (request, response) => {
    data = (request.body);
    console.log(data.username)
    query = usermodel.exists({ username: data.username }, function (err, user) {
        if (err) return (err);
        if (user == null) {
            salt = bcrypt.genSaltSync(10)
            bcrypt.hash(data.password, salt).then((result) => {
                query = usermodel.create({ username: data.username, email: data.email, hash: result, major : data.major, friends: []}, function (err) {
                    if (err) return (err)
                    ret = { "message": "Registration Successful", "success": true }
                    response.json(ret)
                })

            })

        }
        else {
            ret = { "message": "User Already Exists", "success": false }
            response.json(ret)
        }
    })
});




app.post("/getJobsByTitle", async (request, response) => {
    data = (request.body);
    query = jobModel.find({ "position": { "$regex": data.roleName, "$options": "i" } }, function (err, jobs) {
            if (err) return (err)
            console.log(jobs.length)
            console.log(jobs[0])

            ret = { "values": jobs, "success": true }
            response.json(ret)
        })


});


app.post("/getJobsByCompany", async (request, response) => {
    data = (request.body);
    query = jobModel.find({ "company": data.companyName }, function (err, jobs) {
            if (err) return (err)
            console.log(jobs.length)
            console.log(jobs[0])

            ret = { "values": jobs, "success": true }
            console.log(ret.values[0])

            response.json(ret)
        })

});

app.post("/addFriend", async (request, response) => {
    data = (request.body);
    console.log(data)
    query=usermodel.updateOne( {username: data.username}, {$push : {friends: data.new}},function (err, users) {
        if (err) {
            return (err)
        }
        else{
            console.log(users)
            ret = { "success": true }
            response.json(ret)
        }
    
    })
    
});

app.post("/getFriends", async (request, response) => {
    data = (request.body);
    console.log(data.major);
   query = usermodel.find({ "username": { "$regex": data.username} }, function (err, users) {
            if (err) return (err)
            ret = { "values": users, "success": true }
            response.json(ret)
        })


});

app.post("/getUsers", async (request, response) => {
    data = (request.body);
    console.log(data.major);
   query = usermodel.find({ "major": { "$regex": data.major, "$options": "i" } }, function (err, users) {
            if (err) return (err)
            console.log(users.length)
            console.log(users)

            ret = { "values": users, "success": true }
            response.json(ret)
        })


});
    
// jobModel.create({position : "SWE", salary_range: "$100,000", company:"LinkedIn" })
// jobModel.create({position : "SWE", salary_range: "$100,000", company:"Amazon" })
// jobModel.create({position : "SWE", salary_range: "$100,000", company:"Facebook" })




module.exports = app;
