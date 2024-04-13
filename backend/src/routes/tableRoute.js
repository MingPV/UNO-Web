import express from "express";

import * as tableController from "../controllers/tableController.js";

const router = express.Router();

router.get("/", tableController.getTables);
router.post("/:id", tableController.createCardAtTopOfTable);
router.delete("/:id", tableController.deleteCardInTable);

export default router;
