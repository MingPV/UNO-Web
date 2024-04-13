import express from "express";

import * as gameController from "../controllers/gameController.js";


const router = express.Router();

router.get("/", gameController.initGame);
router.get("/", gameController.getGame);
router.get('/', gameController.getRandomCardFromDeck);

export default router;