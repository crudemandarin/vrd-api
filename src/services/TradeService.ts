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
		logger.info(
			`TradeService.createTrade invoked! trade = ${JSON.stringify(trade)}`
		);

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

	static async createTrades(trades: TradeModel[]) {
		logger.info(
			`TradeService.createTrades invoked! trades = ${JSON.stringify(trades)}`
		);

		const format = trades.map((trade) => {
			const dates = {
				date: new Date(trade.date),
				deliveryStart: new Date(trade.deliveryStart),
				deliveryEnd: new Date(trade.deliveryEnd),
				expiration: new Date(trade.expiration),
			};
			return { ...trade, ...dates };
		});

		const result = await prisma.trade.createMany({
			data: format,
		});

		return result;
	}

	static async updateTrade(id: string, updates: TradeModel) {
		logger.info(
			`TradeService.updateTrade invoked! id = ${id}, updates = ${JSON.stringify(
				updates
			)}`
		);

		const dates = {
			date: new Date(updates.date),
			deliveryStart: new Date(updates.deliveryStart),
			deliveryEnd: new Date(updates.deliveryEnd),
			expiration: new Date(updates.expiration),
		};
		const format = { ...updates, ...dates };

		const result = await prisma.trade.update({
			where: {
				id,
			},
			data: {
				...format,
			},
		});

		return result;
	}

	// static async deactivateTrade(id: string) {
	// 	logger.info("TradeService.deactivateTrade invoked!");
	// 	const result = await this.updateTrade(id, {});
	// 	return result;
	// }
}

export default TradeService;
