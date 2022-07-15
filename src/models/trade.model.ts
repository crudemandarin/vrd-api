export interface TradeModel {
	id: string;
	date: string;
	type: string;
	market: string;
	commodity: string;
	contractName: string;
	settlementType: string;
	settlementMarket: string;
	traderName: string;
	counterParty: string;
	otherCounterParty: string;
	settlementPoint: string;
	settlementLocation: string;
	book: string;
	transaction: string;
	deliveryStart: string;
	deliveryEnd: string;
	expiration: string;
	volume: number;
	price: number;
	fee: number;
	strike: number;
}
