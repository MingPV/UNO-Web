import express from "express";

import * as cardController from "../controllers/cardController.js";

const router = express.Router();

router.get("/", cardController.getCards);
router.post("/", cardController.createCard);
router.delete("/:id", cardController.deleteCard);

export default router;
