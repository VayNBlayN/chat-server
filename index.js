const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", // accetta tutte le connessioni
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Nuovo utente connesso:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("💬 Messaggio ricevuto:", msg);
    io.emit("chat message", msg); // lo rimanda a tutti
  });

  socket.on("disconnect", () => {
    console.log("🔴 Utente disconnesso:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("✅ Server in ascolto su http://localhost:3000");
});
