console.log("Hello from Server.");
const { Socket } = require("dgram");
const express = require("express");
const htttp = require("http");
const mongoose = require("mongoose");
const app = express();
const port = process.env.port || 3000;
const Room = require("./models/room.js");
var server = htttp.createServer(app);
var io = require("socket.io")(server);

//middle ware
app.use(express.json());

io.on("connection", (socket) => {
  //   console.log("socket connected");
  socket.on("createRoom", async ({ nickname }) => {
    console.log(nickname);
    try {
      let room = new Room();
      let player = {
        socketID: socket.id,
        nickname,
        playerType: "X",
      };
      room.players.push(player);
      room.turn = player;
      room = await room.save();
      const roomId = room._id.toString();
      socket.join(roomId);
      io.to(roomId).emit("createRoomSuccess", room);
    } catch (e) {
      console.log(e.toString());
    }
  });
});

const DB =
  "mongodb+srv://amartya:amartya@cluster0.eurd8ke.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log(e);
  });

server.listen(port, "0.0.0.0", () => {
  console.log(`server started on  port ${port}`);
});
