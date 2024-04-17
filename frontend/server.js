// import express from "express";

// const app = express();

// app.use(express.static("public"));

// const PORT = 3000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Frontend Server ready at http://localhost:${PORT}`);
// });
import { randomInt } from "crypto";
import express from "express";
import http from "http";
import { disconnect } from "process";
import { Server as socketIOServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new socketIOServer(server);

// Generate unique IDs for clients
let nextClientId = 1;
let currentClient = new Set();
let players = [];

function generateUniqueId() {
  return nextClientId++;
}

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + "/public"));
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
io.on("connection", (socket) => {
  console.log("New client connected (id:", socket.id, ")");

  // Emit the client's ID

  socket.emit("yourId", socket.id);

  // When a player joins the game
  socket.on("joinGame", (playerName) => {
    console.log(`${playerName} joined the game`);

    // Add player to the game
    if (!currentClient.has(socket.id)) {
      currentClient.add(socket.id);
      console.log(currentClient);
      console.log("joined!");
      players.push({
        id: socket.id,
        name: playerName,
        number: [
          getRandomInt(1000, 9999),
          getRandomInt(1000, 9999),
          getRandomInt(1000, 9999),
          getRandomInt(1000, 9999),
          getRandomInt(1000, 9999),
          getRandomInt(1000, 9999),
        ],
        id: socket.id,
      });
    } else {
      console.log("already!");
    }

    // Notify all clients that a player joined
    io.emit("playerJoined", playerName);

    // Start the game if all players have joined
    if (currentClient.size === 4) {
      startGame();
    }
  });

  // Disconnect handling
  socket.on("disconnect", () => {
    console.log("Client disconnected (id:", socket.id, ")");
    currentClient.delete(socket.id);
    const disconnectedPlayer = players.find((p) => p.id === socket.id);
    if (disconnectedPlayer) {
      // Remove disconnected player from the game
      players = players.filter((p) => p.id !== socket.id);
      // Notify all clients that a player left
      io.emit("playerLeft", disconnectedPlayer.name);
      // If the game is ongoing and a player leaves, end the game
      if (game) {
        endGame();
      }
    }
  });
});

function startGame() {
  const playerData = players.map((player) => ({
    name: player.name,
    number: player.number,
    id: player.id,
  }));
  io.emit("playersData", playerData);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});