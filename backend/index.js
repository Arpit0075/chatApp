const express = require("express");
const mongo = require("./connection");
const cors = require("cors");
const port = process.env.PORT || 3001;
const app = express();
const usersRouter = require("./Routes/users");
const chatsRouter = require("./Routes/chats");
const authorization = require("./Module/authorization");
require("dotenv").config();
const { createServer } = require("http");
const { Server } = require("socket.io");

app.use(cors());
const httpServer = createServer(app);

//connection db

mongo.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello!");
});

//routes
app.use("/users", usersRouter);

//middleware for authentication
app.use(authorization.auth);

//protected route
app.use("/chats", chatsRouter);

httpServer.listen(port);

//socketio
const users = [{}];
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  //console.log("New connection");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    //console.log(`${user} has joined`);

    socket.broadcast.emit("userJoined", {
      user: "",
      message: `${users[socket.id]} has joined `,
    });

    socket.emit("welcome", {
      user: "",
      message: `Welcome to the Chat,${users[socket.id]}!`,
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnected", () => {
    //console.log("user disconnected");

    socket.broadcast.emit("leave", {
      user: "",
      message: `${users[socket.id]} has left the chat`,
    });
  });
});
