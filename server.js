const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("public"));
app.set("view engine", "ejs");
const server = createServer(app);
const io = require("socket.io")(server);

const PORT = 7001;

const users = {};

app.get("/", (req, res) => {
  HOST = `${req.protocol}://${req.hostname}`;
  res.render("index", { port: PORT, host: HOST });
});

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    console.log("\nConnected    User: ", users[socket.id]);
    console.log("Active users: ", socket.client.conn.server.clientsCount);
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      user: users[socket.id],
      message: message,
    });
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing", users[socket.id]);
  });

  socket.on("disconnect", () => {
    console.log("\nDisconnected User: ", users[socket.id]);
    console.log("Active users: ", socket.client.conn.server.clientsCount);
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
