import { Router } from "express";

import TradeService from "../services/TradeService";
import logger from "../utils/logger/logger";

const router = Router();

/* GET /trade */

router.get("/", async (_, res) => {
	try {
		const trades = await TradeService.getTrades();
		return res.status(200).json({ trades });
	} catch (err) {
		logger.error("TradeService.getTrades failed. Error:");
		logger.error(err);
	}

	res.status(500).json({ message: "Internal Server Error" });
});

/* POST /trade */

router.post("/", async (req, res) => {
	try {
		const result = await TradeService.createTrade();
		return res.status(200).json({ result });
	} catch (err) {
		logger.error("TradeService.createTrade failed");
		logger.error(err);
	}

	res.status(500).json({ message: "Internal Server Error" });
});

/* PUT /trade */

router.put("/", async (req, res) => {
	try {
		const result = await TradeService.updateTrade();
		return res.status(200).json({ result });
	} catch (err) {
		logger.error("TradeService.updateTrade failed.");
		logger.error(err);
	}

	res.status(500).json({ message: "Internal Server Error" });
});

/* PUT /trade/deactivate */

router.put("/deactivate", async (req, res) => {
	try {
		const result = await TradeService.deactivateTrade();
		return res.status(200).json({ result });
	} catch (err) {
		logger.error("TradeService.deactivateTrade failed.");
		logger.error(err);
	}

	res.status(500).json({ message: "Internal Server Error" });
});

export default router;
