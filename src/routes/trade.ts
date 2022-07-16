import { Router } from "express";
import { body, query, validationResult } from "express-validator";

import TradeService from "../services/TradeService";
import logger from "../utils/logger/logger";
import PrismaUtil from "../utils/PrismaUtil";

const router = Router();

/* GET /trade?id= */

router.get(
	"/",
	query("id").isString().isLength({ min: 36, max: 36 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id } = req.query;

		try {
			const trade = await TradeService.getTrade(id);

			if (!trade) {
				return res.status(404).json({ message: "Trade does not exist." });
			}

			return res.status(200).json({ trade });
		} catch (err) {
			const error = PrismaUtil.handleError(err);
			logger.error(`TradeService.createTrade failed. Error = ${error.message}`);
			return res.status(error.code).json({ message: error.message });
		}
	}
);

/* POST /trade */

router.post("/", body("trade").exists(), async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { trade } = req.body;

	try {
		const result = await TradeService.createTrade(trade);
		return res.status(200).json({ result });
	} catch (err) {
		const error = PrismaUtil.handleError(err);
		logger.error(`TradeService.createTrade failed. Error = ${error.message}`);
		return res.status(error.code).json({ message: error.message });
	}
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
