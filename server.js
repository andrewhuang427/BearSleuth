const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const LoginReg = require("./routes/login-register.js");
const http = require("http");
const socketIO = require("socket.io");

const app = express();

// ----- Socket.IO -----
// setup the port our backend app will run on
const SOCKPORT = 3030;
const NEW_MESSAGE_EVENT = "new-message-event";

const server = http.createServer(app);

const io = socketIO(server, {
  cors: true,
  origins: ["localhost:3000"],
});

// Hardcoding a room name here. This is to indicate that you can do more by creating multiple rooms as needed.
const room = "general";

io.on("connection", (socket) => {
  socket.join(room);

  socket.on(NEW_MESSAGE_EVENT, (data) => {
    io.in(room).emit(NEW_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    socket.leave(room);
  });
});

server.listen(SOCKPORT, () => {
  console.log(`listening on *:${SOCKPORT}`);
});

// ----- Import API Routes -----
const AuthenticationRoutes = require("./routes/AuthenticationRoutes");
const UserRoutes = require("./routes/UserRoutes");
const JobRouter = require("./routes/JobRoutes");

// ----- Job Scraping Route -----
// const { removeAllJobs, scrapeJobs } = require("./utils/ScrapeJobs");
// removeAllJobs()
// scrapeJobs()

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
app.use("/api/jobs", JobRouter);
app.use("/api/user", UserRoutes);

app.get("/", (req, res) => {
  res.send("Hello Word!");
});

app.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});

app.use(LoginReg);

app.get("/users", async (req, res) => {
  var query = UserModel.find();
  query.select("-_id");
  query.exec(function (err, users) {
    if (err) return err;
    res.send(users);
  });
});
