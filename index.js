import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// Socket.IO server con CORS abilitato
const io = new Server(server, {
  cors: {
    origin: "*", // Puoi restringere se vuoi
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('🔌 Nuovo client connesso:', socket.id);

  // Riceve un messaggio dal client
  socket.on('messaggio', (data) => {
    console.log('📨 Messaggio ricevuto:', data);
    // Invia il messaggio a tutti tranne chi l'ha mandato
    socket.broadcast.emit('messaggio', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnesso:', socket.id);
  });
});

// Porta dinamica per Render (non usare porta fissa come 10000)
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Server in ascolto sulla porta ${PORT}`);
});
