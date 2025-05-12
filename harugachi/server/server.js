const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // 리액트 포트
    methods: ['GET', 'POST'],
  },
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', ({ userId }) => {
    onlineUsers.set(userId, socket.id);
    console.log(`${userId} joined with socket ${socket.id}`);
  });

  socket.on('leave', ({ userId }) => {
    onlineUsers.delete(userId);
    console.log(`${userId} left`);
  });

  socket.on('message', ({ to, message }) => {
    console.log(`${message.sender} → ${to}: ${message.content}`);

    const targetSocketId = onlineUsers.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit('message', message);
    }
  });

  socket.on('disconnect', () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log(`${userId} disconnected`);
        break;
      }
    }
  });
});

server.listen(3001, () => {
  console.log('Socket.IO server running on http://localhost:3001');
});
