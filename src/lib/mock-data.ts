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
