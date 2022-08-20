console.log("Hello from Server.");
const { Socket } = require("dgram");
const express = require("express");
const htttp = require("http");
const mongoose = require("mongoose");
const app = express();
const port = process.env.port || 3000;

var server = htttp.createServer(app);
var io = require("socket.io")(server);

//middle ware
app.use(express.json());

io.on("connection", (socket) => {
  console.log("socket connected");
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
