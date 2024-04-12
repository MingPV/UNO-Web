import express from "express";

import * as playerController from "../controllers/playerController.js";


const router = express.Router();

router.get("/", playerController.getPlayers);
router.post("/", playerController.createPlayer);
router.get("/:id", playerController.getCards);
router.delete("/:id", playerController.deleteCard);

export default router;
