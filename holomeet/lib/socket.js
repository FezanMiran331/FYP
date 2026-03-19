import { io } from 'socket.io-client';

let socket = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001', {
      transports: ['websocket'],
      reconnection: true,
    });

    socket.on('connect', () => {
      console.log('✅ Socket.io connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket.io disconnected');
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};

export const joinMeetingRoom = (roomName) => {
  const socket = getSocket();
  socket.emit('join-room', roomName);
  console.log(`📍 Joined room: ${roomName}`);
};

export const leaveMeetingRoom = (roomName) => {
  const socket = getSocket();
  socket.emit('leave-room', roomName);
  console.log(`👋 Left room: ${roomName}`);
};