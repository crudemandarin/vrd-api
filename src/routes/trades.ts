import { Router } from "express";
import { body, validationResult } from "express-validator";

import TradeService from "../services/TradeService";
import PrismaUtil from "../utils/PrismaUtil";
import AuthUtil from "../utils/AuthUtil";
import logger from "../utils/logger/logger";


const router = Router();

/* GET /trades */

router.get("/", AuthUtil.authenticateToken, async (_, res) => {
	try {
		const trades = await TradeService.getTrades();
		return res.status(200).json({ trades });
	} catch (err) {
		const error = PrismaUtil.handleError(err);
		logger.error(`TradeService.getTrades failed. Error = ${error.message}`);
		return res.status(error.code).json({ message: error.message });
	}
});

/* POST /trades */

router.post(
	"/",
	AuthUtil.authenticateToken,
	body("trades").isArray().isLength({ min: 1 }),
	body("trades.*").isObject(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { trades } = req.body;

		try {
			const result = await TradeService.createTrades(trades);
			return res.status(200).json({ result });
		} catch (err) {
			const error = PrismaUtil.handleError(err);
			logger.error(`TradeService.createTrade failed. Error = ${error.message}`);
			return res.status(error.code).json({ message: error.message });
		}
	}
);

export default router;
