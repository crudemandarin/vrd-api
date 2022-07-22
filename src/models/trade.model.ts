export interface UpdateTradeModel {
	trade_id?: string;
	created_by?: string;
	created_at?: string;
	active?: boolean;
	trade_date?: string;
	trade_type?: string;
	market?: string;
	commodity?: string;
	contract_name?: string;
	settlement_type?: string;
	settlement_market?: string;
	trader_name?: string;
	counter_party?: string;
	other_counter_party?: string;
	settlement_point?: string;
	settlement_location?: string;
	book?: string;
	transaction?: string;
	delivery_start?: string;
	delivery_end?: string;
	expiration?: string;
	volume?: number;
	price?: number;
	fee?: number;
	strike?: number;
}
