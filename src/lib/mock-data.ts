export type Status = "IN POS" | "IDLE" | "PAUSED";

export type Strategy = {
  id: number;
  name: string;
  underlying: string;
  kind: "BATCH" | "SIGNAL";
  horizon: "POSITIONAL" | "INTRADAY";
  broker: string;
  status: Status;
  pnl: number;
  legs: number;
};

export const strategies: Strategy[] = [
  { id: 12628, name: "BTC-MOMENTUM", underlying: "BTC", kind: "BATCH", horizon: "INTRADAY", broker: "Delta Exchange", status: "IDLE", pnl: 0, legs: 0 },
  { id: 10362, name: "BATCH-BTC-MORNING", underlying: "BTC", kind: "BATCH", horizon: "POSITIONAL", broker: "Delta Exchange", status: "IN POS", pnl: 83.3, legs: 2 },
  { id: 6653, name: "BTC_Sell_CE_PE", underlying: "BTC", kind: "SIGNAL", horizon: "POSITIONAL", broker: "Delta Exchange", status: "IDLE", pnl: 0, legs: 0 },
  { id: 641, name: "CRUDEOILM_SELL_CE_PE", underlying: "CRUDEOILM", kind: "SIGNAL", horizon: "POSITIONAL", broker: "Kotak Neo", status: "IN POS", pnl: -269, legs: 2 },
  { id: 18144, name: "BATCH-ETH-MOMENTUM", underlying: "ETH", kind: "BATCH", horizon: "INTRADAY", broker: "Delta Exchange", status: "IDLE", pnl: 0, legs: 0 },
  { id: 11608, name: "BATCH-ETH", underlying: "ETH", kind: "BATCH", horizon: "POSITIONAL", broker: "Delta Exchange", status: "IDLE", pnl: 0, legs: 0 },
  { id: 18526, name: "NIFTY_OTM15_NEXT_WEEK", underlying: "NIFTY", kind: "BATCH", horizon: "POSITIONAL", broker: "Kotak Neo", status: "IN POS", pnl: 29.25, legs: 4 },
  { id: 271, name: "NIFTY-SELL-PE (Copy)", underlying: "NIFTY", kind: "SIGNAL", horizon: "POSITIONAL", broker: "Legacy", status: "PAUSED", pnl: 0, legs: 0 },
  { id: 266, name: "NIFTY-Sell-CE-PE", underlying: "NIFTY", kind: "SIGNAL", horizon: "POSITIONAL", broker: "Kotak Neo", status: "IN POS", pnl: 1969.5, legs: 2 },
];

export const regimes = [
  { symbol: "NIFTY", price: "24,200.65", meta: "SYN FUT 24216.30", chg: -0.36, bias: "BEARISH" as const },
  { symbol: "SENSEX", price: "77,378.23", meta: "SYN FUT 77467.55", chg: -0.45, bias: "BEARISH" as const },
  { symbol: "BTC", price: "64,212.76", meta: "24H 63,263 – 64,602", chg: 0.12, bias: "NEUTRAL" as const },
  { symbol: "ETH", price: "1,897.81", meta: "24H 1,884.6 – 1,918.2", chg: -0.04, bias: "NEUTRAL" as const },
];

export const inr = (n: number) =>
  `${n > 0 ? "+" : n < 0 ? "-" : ""}₹${Math.abs(n).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const groupByUnderlying = (rows: Strategy[]) => {
  const map = new Map<string, Strategy[]>();
  for (const r of rows) {
    const list = map.get(r.underlying) ?? [];
    list.push(r);
    map.set(r.underlying, list);
  }
  return [...map.entries()];
};

export type Position = {
  symbol: string;
  expiry: string;
  side: "SELL" | "BUY";
  qty: number;
  avg: number;
  ltp: number;
  pnl: number;
  strategy: string;
  broker: string;
};

export const positions: Position[] = [
  { symbol: "BTC 64000 PE", expiry: "29 AUG", side: "SELL", qty: 2, avg: 812.5, ltp: 770.2, pnl: 84.6, strategy: "BATCH-BTC-MORNING", broker: "Delta Exchange" },
  { symbol: "BTC 66000 CE", expiry: "29 AUG", side: "SELL", qty: 2, avg: 640.0, ltp: 640.65, pnl: -1.3, strategy: "BATCH-BTC-MORNING", broker: "Delta Exchange" },
  { symbol: "CRUDEOILM 5800 CE", expiry: "18 SEP", side: "SELL", qty: 1, avg: 96.4, ltp: 108.1, pnl: -117.0, strategy: "CRUDEOILM_SELL_CE_PE", broker: "Kotak Neo" },
  { symbol: "CRUDEOILM 5400 PE", expiry: "18 SEP", side: "SELL", qty: 1, avg: 88.2, ltp: 103.4, pnl: -152.0, strategy: "CRUDEOILM_SELL_CE_PE", broker: "Kotak Neo" },
  { symbol: "NIFTY 24600 CE", expiry: "28 AUG", side: "SELL", qty: 75, avg: 61.35, ltp: 60.9, pnl: 33.75, strategy: "NIFTY_OTM15_NEXT_WEEK", broker: "Kotak Neo" },
  { symbol: "NIFTY 23800 PE", expiry: "28 AUG", side: "SELL", qty: 75, avg: 54.2, ltp: 54.26, pnl: -4.5, strategy: "NIFTY_OTM15_NEXT_WEEK", broker: "Kotak Neo" },
  { symbol: "NIFTY 24400 CE", expiry: "04 SEP", side: "SELL", qty: 150, avg: 88.6, ltp: 75.5, pnl: 1965.0, strategy: "NIFTY-Sell-CE-PE", broker: "Kotak Neo" },
  { symbol: "NIFTY 24000 PE", expiry: "04 SEP", side: "BUY", qty: 150, avg: 41.1, ltp: 41.13, pnl: 4.5, strategy: "NIFTY-Sell-CE-PE", broker: "Kotak Neo" },
];

export const groupByStrategy = (rows: Position[]) => {
  const map = new Map<string, Position[]>();
  for (const r of rows) {
    const list = map.get(r.strategy) ?? [];
    list.push(r);
    map.set(r.strategy, list);
  }
  return [...map.entries()];
};

export const num = (n: number, d = 2) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
