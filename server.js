// // server.js
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// io.on('connection', (socket) => {
//   console.log('A user connected');
  
//   // Listen for messages
//   socket.on('message', (msg) => {
//     console.log('Message received: ', msg);
//     // Respond with "Hi"
//     socket.emit('message', 'Hi');
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// const PORT = process.env.PORT || 3005;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// ---------------

// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:3001' }));

// // Serve a simple HTML file for testing (optional)
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // WebSocket connection event
// io.on('connection', (socket) => {
//   console.log('A user connected');
  
//   // Listen for 'message' event from the client
//   socket.on('message', (msg) => {
//     console.log('Message received:', msg); // Log the incoming message
//     if (msg) {
//       // Respond with "Hi"
//       socket.emit('message', 'Hi');
//     } else {
//       // Handle undefined or empty messages
//       console.log('Received an empty or undefined message');
//       socket.emit('message', 'Error: No message received');
//     }
//   });

//   // Disconnect event
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3005;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// ---------------------------------------------
// WITH CORS

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// CORS configuration for Express
app.use(cors({ 
  origin: 'http://localhost:3001', // Allow requests from your React app
  methods: ['GET', 'POST'],       // Allow specified HTTP methods
}));

// CORS configuration for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3001', // Allow requests from your React app
    methods: ['GET', 'POST'],       // Allow specified HTTP methods
    credentials: true,              // Allow cookies and credentials
  },
});

// Serve a simple HTML file for testing (optional)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// WebSocket connection event
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Listen for 'message' event from the client
  socket.on('message', (msg) => {
    console.log('Message received:', msg); // Log the incoming message
    if (msg) {
      // Respond with "Hi"
      socket.emit('message', 'Hi');
    } else {
      // Handle undefined or empty messages
      console.log('Received an empty or undefined message');
      socket.emit('message', 'Error: No message received');
    }
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
