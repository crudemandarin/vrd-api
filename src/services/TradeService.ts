import { PrismaClient } from "@prisma/client";
import { TradeModel } from "../models/trade.model";

import logger from "../utils/logger/logger";

const prisma = new PrismaClient();

class TradeService {
	static async getTrade(id: string) {
		logger.info(`TradeService.getTrade invoked! id = "${id}"`);
		const trade = prisma.trade.findUnique({ where: { id } });
		return trade;
	}

	static async getTrades() {
		logger.info("TradeService.getTrades invoked!");
		const trades = prisma.trade.findMany();
		return trades;
	}

	static async createTrade(trade: TradeModel) {
		logger.info("TradeService.createTrade invoked!");

		const dates = {
			date: new Date(trade.date),
			deliveryStart: new Date(trade.deliveryStart),
			deliveryEnd: new Date(trade.deliveryEnd),
			expiration: new Date(trade.expiration),
		};
		const format = { ...trade, ...dates };

		const result = await prisma.trade.create({
			data: {
				...format,
			},
		});

		return result;
	}

	static async updateTrade() {
		logger.info("TradeService.updateTrade invoked!");
	}

	static async deactivateTrade() {
		logger.info("TradeService.deactivateTrade invoked!");
		const result = await this.updateTrade();
		return result;
	}
}

export default TradeService;
