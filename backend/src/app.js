import express from "express";
import cors from "cors";

import ItemRoute from "./routes/itemRoute.js";
import PlayerRoute from "./routes/playerRoute.js";
import TableRoute from "./routes/tableRoute.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use("/items", ItemRoute);
app.use("/players", PlayerRoute);
app.use("/tables", TableRoute)

export default app;
