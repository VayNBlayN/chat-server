const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Abilita CORS
app.use(cors());

// Servi file statici dalla root della repo
app.use(express.static(__dirname)); // ora cerca index.html e renderer.js nella root

// Rotta principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // index.html deve essere nella root
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('✅ Un utente si è connesso');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('❌ Utente disconnesso');
  });
});

// Porta
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Server attivo sulla porta ${PORT}`);
});
