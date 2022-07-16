import { Router } from "express";

import TradeService from "../services/TradeService";
import PrismaUtil from "../utils/PrismaUtil";
import logger from "../utils/logger/logger";

const router = Router();

/* GET /trades */

router.get("/", async (_, res) => {
	try {
		const trades = await TradeService.getTrades();
		return res.status(200).json({ trades });
	} catch (err) {
		const error = PrismaUtil.handleError(err);
		logger.error(`TradeService.getTrades failed. Error = ${error.message}`);
		return res.status(error.code).json({ message: error.message });
	}
});

export default router;
