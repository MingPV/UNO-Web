import express from "express";

import * as cardController from "../controllers/cardController.js";

const router = express.Router();

router.get("/", cardController.getCards);
router.post("/", cardController.createCard);
//router.post("/filter", itemController.filterItems);
router.delete("/:id", cardController.deleteCard);
// TODO3: add a router for the filter function

export default router;
