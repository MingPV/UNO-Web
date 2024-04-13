import express from "express";

import * as playerController from "../controllers/playerController.js";


const router = express.Router();

router.get("/", playerController.getPlayers);
router.post("/", playerController.createPlayer);
// router.get("/:id", playerController.getCards);
//router.delete("/:id", playerController.deleteCard);
// router.put("/:id", playerController.testupdate);
router.put("/:id/:tmpcards", playerController.inHandCardUpdate);

export default router;
