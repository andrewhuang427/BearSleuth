const express = require("express");
const usermodel = require("../models/UserModel");
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


//go to homepage
// app.get('/homepage', authenticateToken, async (req, res) => {
//     res.json(req.body.accessToken)
// )
    

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
                    response.json({accessToken : accessToken, "success": true})
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
  

app.post("/register", async (request, response) => {
    data = (request.body);
    console.log(data.username)
    query = usermodel.exists({ username: data.username }, function (err, user) {
        if (err) return (err);
        if (user == null) {
            salt = bcrypt.genSaltSync(10)
            bcrypt.hash(data.password, salt).then((result) => {
                query = usermodel.create({ username: data.username, email: data.email, hash: result}, function (err) {
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

module.exports = app;