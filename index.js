const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // accetta tutto, puoi restringere dopo
  }
});

const PORT = process.env.PORT || 10000;

io.on("connection", (socket) => {
  console.log("🟢 Nuovo utente connesso");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Utente disconnesso");
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server attivo su porta ${PORT}`);
});
