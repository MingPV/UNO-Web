import Player from "../models/playerModel.js"


export const createPlayer = async (req, res) => {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    sendSSE({ message: "Player Updated", newPlayer });
    res.status(201).send("ok");
};

export const getPlayers = async (req, res) => {
    res.status(200).send(await Player.find());
};

export const deleteCard = async (req, res) => {
    console.log(req.params.id)
    res.status(200).send("OK");
};

export const inHandCardUpdate = async (req, res) => {
    //console.log(req.params)

    const filter = { _id: req.params.id }
    const update = { cards: JSON.parse(req.params.tmpcards) }

    //console.log(update.cards)

    const doc = await Player.findOneAndUpdate(filter, { cards: update.cards }, {
        new: true
    });

    // Do not fix now it's work

    res.status(200).send("OK");
};

export const deletePlayer = async (req, res) => {
  try {
      const playerId = req.params.id;
      //console.log(playerId, "what")
      const deletedPlayer = await Player.deleteOne({_id: req.params.id});
      if (!deletedPlayer) {
          return res.status(404).send("Player not found");
      }
      sendSSE({ message: "Player Updated" });
      res.status(200).send("Player deleted successfully");
  } catch (error) {
      console.error("Error deleting player:", error);
      res.status(500).send("Internal Server Error");
  }
};

const clients = new Map();

// Function to send SSE to all connected clients
const sendSSE = (data) => {
  clients.forEach((connections) => {
    connections.forEach((connection) => {
      connection.res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  });
};

export const subscribeToUpdates = (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Keep the connection open
  res.flushHeaders();

  // Add the client's connection to the map of clients
  const clientId = req.query.clientId; // Assuming each client has a unique identifier
  const connection = { req, res };

  if (clients.has(clientId)) {
    clients.get(clientId).push(connection);
  } else {
    clients.set(clientId, [connection]);
  }

  // Remove the client's connection from the map when the connection closes
  req.on("close", () => {
    if (clients.has(clientId)) {
      const connections = clients.get(clientId);
      const index = connections.findIndex((conn) => conn === connection);
      if (index !== -1) {
        connections.splice(index, 1);
        if (connections.length === 0) {
          clients.delete(clientId);
        }
      }
    }
  });
};