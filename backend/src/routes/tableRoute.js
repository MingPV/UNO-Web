import express from "express";

import * as tableController from "../controllers/tableController.js";

const router = express.Router();

router.get("/", tableController.getTables);
router.post("/:id", tableController.createCardAtTopOfTable);
//router.post("/filter", itemController.filterItems);
router.delete("/:id", tableController.deleteCardInTable);
// TODO3: add a router for the filter function

export default router;
