import express from "express";

import * as gameController from "../controllers/gameController.js";


const router = express.Router();

router.post("/", gameController.initGame);
router.get("/get", gameController.getGame);
router.get('/getRnd', gameController.getRandomCardFromDeck);
router.post('/update/:game', gameController.updateGame);

export default router;