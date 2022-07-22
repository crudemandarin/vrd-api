import { Router } from "express";
import { body, query, validationResult } from "express-validator";

import TradeService from "../services/TradeService";
import PrismaUtil from "../utils/PrismaUtil";
import AuthUtil from "../utils/AuthUtil";
import logger from "../utils/logger/logger";


const router = Router();

/* GET /trade?id= */

router.get(
	"/",
	AuthUtil.authenticateToken,
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

router.post("/", AuthUtil.authenticateToken, body("trade").exists(), async (req, res) => {
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

router.put(
	"/",
	AuthUtil.authenticateToken,
	body("id").isString().isLength({ min: 36, max: 36 }),
	body("updates").exists(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id, updates } = req.body;

		try {
			const result = await TradeService.updateTrade(id, updates);
			return res.status(200).json({ result });
		} catch (err) {
			const error = PrismaUtil.handleError(err);
			logger.error(`TradeService.updateTrade failed. Error = ${error.message}`);
			return res.status(error.code).json({ message: error.message });
		}
	}
);

/* PUT /trade/toggle-active */

router.put("/toggle-active",
	AuthUtil.authenticateToken,
	body("id").isString().isLength({ min: 36, max: 36 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id } = req.body;

		try {
			const result = await TradeService.toggleActive(id);
			return res.status(200).json({ result });
		} catch (err) {
			const error = PrismaUtil.handleError(err);
			logger.error(`TradeService.updateTrade failed. Error = ${error.message}`);
			return res.status(error.code).json({ message: error.message });
		}
	});

export default router;
