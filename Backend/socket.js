

import { Server } from 'socket.io';
import User from './models/user.models.js';
import captainModel from './models/caption.models.js';

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    socket.on('join', async (data) => {
      try {
        const { userId, userType } = data;

        console.log(`📥 Join event received:`, data);

        if (!userId || !userType) {
          console.log("❌ Missing userId or userType in join data.");
          return;
        }

        if (userType === 'user') {
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );

          if (updatedUser) {
            console.log(`✅ User (${userId}) socket ID updated: ${socket.id}`);
          } else {
            console.log(`❌ No user found with ID: ${userId}`);
            
          }
        } else if (userType === 'captain') {
          const updatedCaptain = await captainModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );

          if (updatedCaptain) {
            console.log(`✅ Captain (${userId}) socket ID updated: ${socket.id}`);
          } else {
            console.log(`❌ No captain found with ID: ${userId}`);
          }
        } else {
          console.log(`❌ Unknown userType: ${userType}`);
        }
      } catch (err) {
        console.error("❌ Error handling join event:", err);
      }
    });

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit('error', { message: 'Invalid location data' });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng
        }
      });
    });

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log("📤 Sending message:", messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log('❌ Socket.io not initialized.');
  }
};

export { initializeSocket, sendMessageToSocketId };
