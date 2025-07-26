import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // oppure specifica i domini Electron
  }
});

io.on('connection', (socket) => {
  console.log('🔌 Client connesso:', socket.id);

  socket.on('messaggio', (data) => {
    console.log('📩 Ricevuto:', data);
    socket.broadcast.emit('messaggio', data); // invia a tutti gli altri client
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnesso:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server attivo su http://localhost:${PORT}`);
});
