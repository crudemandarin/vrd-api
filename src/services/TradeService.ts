import { PrismaClient, trade } from "@prisma/client";

import { UpdateTradeModel } from "../models/trade.model";
import logger from "../utils/logger/logger";

class TradeService {
	static async getTrade(trade_id: string) {
		logger.info(`TradeService.getTrade invoked! trade_id = "${trade_id}"`);
		const prisma = new PrismaClient();
		const trade = prisma.trade.findUnique({ where: { trade_id } });
		return trade;
	}

	static async getTrades() {
		logger.info("TradeService.getTrades invoked!");
		const prisma = new PrismaClient();
		const trades = prisma.trade.findMany();
		return trades;
	}

	static async createTrade(trade: trade, auth_user_id: string) {
		logger.info(
			`TradeService.createTrade invoked! trade = ${JSON.stringify(trade)}`
		);

		const audit = {
			created_by: auth_user_id,
			updated_by: auth_user_id,
			active: true,
		};
		const dates = {
			trade_date: new Date(trade.trade_date),
			delivery_start: new Date(trade.delivery_start),
			delivery_end: new Date(trade.delivery_end),
			expiration: new Date(trade.expiration),
		};
		const format = { ...trade, ...audit, ...dates };

		const prisma = new PrismaClient();
		const result = await prisma.trade.create({
			data: {
				...format,
			},
		});

		return result;
	}

	static async createTrades(trades: trade[], auth_user_id: string) {
		logger.info(
			`TradeService.createTrades invoked! trades = ${JSON.stringify(trades)}`
		);

		const format = trades.map((trade) => {
			const audit = {
				created_by: auth_user_id,
				updated_by: auth_user_id,
				active: true,
			};
			const dates = {
				trade_date: new Date(trade.trade_date),
				delivery_start: new Date(trade.delivery_start),
				delivery_end: new Date(trade.delivery_end),
				expiration: new Date(trade.expiration),
			};
			return { ...trade, ...audit, ...dates };
		});

		const prisma = new PrismaClient();
		const result = await prisma.trade.createMany({
			data: format,
		});

		return result;
	}

	static async updateTrade(
		trade_id: string,
		updates: UpdateTradeModel,
		auth_user_id: string
	) {
		logger.info(
			`TradeService.updateTrade invoked! trade_id = ${trade_id}, updates = ${JSON.stringify(
				updates
			)}`
		);

		const audit = {
			updated_by: auth_user_id,
			updated_at: new Date(),
		};

		const dates: { [key: string]: Date } = {};
		if ("trade_date" in updates) dates.trade_date = new Date(updates.trade_date);
		if ("delivery_start" in updates) dates.delivery_start = new Date(updates.delivery_start);
		if ("delivery_end" in updates) dates.delivery_end = new Date(updates.delivery_end);
		if ("expiration" in updates) dates.expiration = new Date(updates.expiration);

		const format = { ...updates, ...audit, ...dates };

		const prisma = new PrismaClient();
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

	static async toggleActive(trade_id: string, auth_user_id: string) {
		logger.info("TradeService.toggleActive invoked!");
		const trade = await TradeService.getTrade(trade_id);
		const updates = { active: !trade.active };
		const result = await TradeService.updateTrade(
			trade_id,
			updates,
			auth_user_id
		);
		return result;
	}
}

export default TradeService;
