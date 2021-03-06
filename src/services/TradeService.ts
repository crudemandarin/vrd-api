import { PrismaClient } from "@prisma/client";

import { TradeModel, UpdateTradeModel } from "../models/trade.model";
import logger from "../utils/logger/logger";

const prisma = new PrismaClient();

class TradeService {
	static async getTrade(trade_id: string) {
		logger.info(`TradeService.getTrade invoked! trade_id = "${trade_id}"`);
		const trade = prisma.trade.findUnique({ where: { trade_id } });
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
			trade_date: new Date(trade.trade_date),
			delivery_start: new Date(trade.delivery_start),
			delivery_end: new Date(trade.delivery_end),
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
				trade_date: new Date(trade.trade_date),
				delivery_start: new Date(trade.delivery_start),
				delivery_end: new Date(trade.delivery_end),
				expiration: new Date(trade.expiration),
			};
			return { ...trade, ...dates };
		});

		const result = await prisma.trade.createMany({
			data: format,
		});

		return result;
	}

	static async updateTrade(trade_id: string, updates: UpdateTradeModel) {
		logger.info(
			`TradeService.updateTrade invoked! trade_id = ${trade_id}, updates = ${JSON.stringify(
				updates
			)}`
		);

		const dates = {
			trade_date: new Date(updates.trade_date),
			delivery_start: new Date(updates.delivery_start),
			delivery_end: new Date(updates.delivery_end),
			expiration: new Date(updates.expiration),
		};
		const format = { ...updates, ...dates };

		const result = await prisma.trade.update({
			where: {
				trade_id,
			},
			data: {
				...format,
			},
		});

		return result;
	}

	static async toggleActive(trade_id: string) {
		logger.info("TradeService.deactivateTrade invoked!");
		const trade = await TradeService.getTrade(trade_id);
		const updates = { active: !trade.active };
		const result = await TradeService.updateTrade(trade_id, updates);
		return result;
	}
}

export default TradeService;
