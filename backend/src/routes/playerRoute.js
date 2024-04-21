import express from "express";

import * as playerController from "../controllers/playerController.js";


const router = express.Router();

router.get("/", playerController.getPlayers);
router.post("/", playerController.createPlayer);
router.delete("/:id", playerController.deletePlayer);
router.put("/:id/:tmpcards", playerController.inHandCardUpdate);
router.get('/subscribeToUpdates', playerController.subscribeToUpdates);

export default router;
