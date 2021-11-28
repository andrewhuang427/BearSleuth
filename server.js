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
var STATIC_CHANNELS = [{
    name: 'Global chat',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'Funny',
    participants: 0,
    id: 2,
    sockets: []
}];

const io = sio(http, {
  cors: true,
  origins:["localhost:3000"]
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})


http.listen(SOCKETPORT, () => {
    console.log(`listening on *:${SOCKETPORT}`);
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
                    io.emit('channel', c);
                }
            }
        });

        return id;
    });
    socket.on('send-message', message => {
        io.emit('message', message);
        //messageStore.saveMessage(message);
    });

    socket.on('disconnect', () => {
        STATIC_CHANNELS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c);
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
