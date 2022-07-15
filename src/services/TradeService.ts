import { TradeModel } from "../models/trade.model";
import logger from "../utils/logger/logger";

class TradeService {
	static async getTrades(): Promise<TradeModel[]> {
		logger.info("TradeService.getTrades invoked!");
		return [];
	}

	static async createTrade() {
		logger.info("TradeService.createTrade invoked!");
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
