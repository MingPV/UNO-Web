import express from "express";

import * as gameController from "../controllers/gameController.js";


const router = express.Router();

router.post("/", gameController.initGame);
router.get("/get", gameController.getGame);
router.get('/getRnd', gameController.getRandomCardFromDeck);
router.post('/update', gameController.updateGame);

export default router;