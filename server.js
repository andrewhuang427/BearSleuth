const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const LoginReg = require("./routes/login-register.js");
//import { host } from "./index.js"

const app = express();

// ----- Socket.IO -----

//const { InMemoryMessageStore } = require("./Storage/messageStore");
//const messageStore = new InMemoryMessageStore();   


var http = require('http').createServer(app);
const SOCKETPORT = 3030;
const sio = require('socket.io');
var history = {};
var STATIC_CHANNELS = [{
    name: 'Computer Science',
    participants: 0,
    id: 1,
    sockets: [],
    history: []
}, 
{
    name: 'Biomedical Engineering',
    participants: 0,
    id: 2,
    sockets: [],
    history: []
},
{
    name: 'Computer Engineering',
    participants: 0,
    id: 3,
    sockets: [],
    history: []
},
{
    name: 'Data Science',
    participants: 0,
    id: 4,
    sockets: [],
    history: []
},
{
    name: 'Electrical Engineering',
    participants: 0,
    id: 5,
    sockets: [],
    history: []
},
{
    name: 'Chemical Engineering',
    participants: 0,
    id: 6,
    sockets: [],
    history: []
}];

const io = sio(http, {
  cors: true,
//  origins:["http://localhost:3000/"]
  origins:["http://ec2-18-223-203-85.us-east-2.compute.amazonaws.com:3000/"]
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})


http.listen(SOCKETPORT, () => {
    console.log(`listening on *:${SOCKETPORT}`);
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
  });

io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
    console.log('new client connected');
    socket.emit('connection', null);
    // const messagesPerUser = new Map();
    // messageStore.findMessagesForUser(socket.userID).forEach((message) => {
    //   const { from, to } = message;
    //   const otherUser = socket.userID === from ? to : from;
    //   if (messagesPerUser.has(otherUser)) {
    //     messagesPerUser.get(otherUser).push(message);
    //   } else {
    //     messagesPerUser.set(otherUser, [message]);
    //   }
    // });
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
     users.push({
            userID: id,
            username: socket.username,
        });
    }
    socket.emit("users", users);

    io.on("connection", (socket) => {
        // notify existing users
        socket.broadcast.emit("user connected", {
          userID: socket.id,
          username: socket.username,
        });

      });

    io.on("connection", (socket) => {
  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });
});
    socket.on('channel-join', id => {
        console.log('channel join', id);
        STATIC_CHANNELS.forEach(c => {
            if (c.id === id) {
                if (c.sockets.indexOf(socket.id) == (-1)) {
                    c.sockets.push(socket.id);
                    c.participants++;
                    io.emit('channel', c);
                    console.log("hi");
                }
            } else {
                let index = c.sockets.indexOf(socket.id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants--;
                    io.emit('channel', c); //send channel with all content
                }
            }
        });

        return id;
    });
    socket.on('send-message', message => {
        STATIC_CHANNELS.forEach(c => {
            if (c.id === message.channel_id) {
                    c.history.push(message);
            }
            console.log(c.history);
        });
        io.emit('message', message);
        //messageStore.saveMessage(message);
    });

    socket.on('disconnect', () => {
        STATIC_CHANNELS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c); //send channel with all content
            }
        });
    });

});



/**
 * @description This methos retirves the static channels
 */
app.get('/getChannels', (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    })
});








// ----- Import API Routes -----
const AuthenticationRoutes = require("./routes/AuthenticationRoutes");
const UserRoutes = require("./routes/UserRoutes");
const JobRoutes = require("./routes/JobRoutes");
const JobGroupRoutes = require("./routes/JobGroupRoutes");
const JobGroupModel = require("./models/JobGroupModel.js");

// ----- Job Scraping Route -----
// const { removeAllJobs, scrapeJobs } = require("./utils/ScrapeJobs");
// removeAllJobs()
// scrapeJobs()

// function removeJobGroups() {
//   JobGroupModel.deleteMany({}, (error) => {
//     if (error) {
//       console.log(error);
//     }
//   });
// }

// removeJobGroups();

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
app.use("/api/jobs", JobRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/groups", JobGroupRoutes);

app.get("/", (req, res) => {
  res.send("Hello Word!");
});

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});

app.use(LoginReg);

// app.get("/users", async (req, res) => {
//   var query = UserModel.find();
//   query.select("-_id");
//   query.exec(function (err, users) {
//     if (err) return err;
//     res.send(users);
//   });
// });
