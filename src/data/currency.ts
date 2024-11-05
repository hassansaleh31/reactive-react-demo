export interface Currency {
  symbol: string;
  rate: number;
}

export const availableCurrencies: Currency[] = [
  {
    symbol: "$",
    rate: 1,
  },
  {
    symbol: "€",
    rate: 1.2,
  },
  {
    symbol: "CZK",
    rate: 23,
  },
];
