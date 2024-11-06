const io = require("socket.io")(5000, {
  cors: true,
});

const users = {};

io.on("connection", (socket) => {
  console.log("New User Connected with socket id: ", socket.id);

  socket.on("new-user", (name) => {
    users[socket.id] = name;
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
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
