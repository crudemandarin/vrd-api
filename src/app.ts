import express from "express";
import cors from "cors";

import httpLogger from "./utils/logger/http-logger";

import indexRoute from "./routes/index";
import authRoute from "./routes/auth";
import tradeRoute from "./routes/trade";
import tradesRoute from "./routes/trades";

const app = express();

// Configuration
app.use(express.json());
app.use(cors());
app.use(httpLogger);

// Routes
app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/trade", tradeRoute);
app.use("/trades", tradesRoute);

// Default to 404 if Endpoint/Method Not Recognized
app.use((req, res) => res.status(404).json({ message: "Not found" }));

export default app;
