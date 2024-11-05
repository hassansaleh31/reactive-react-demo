import React from "react";
import { useCurrencyContext } from "../context/CurrencyContext";
import { availableCurrencies } from "../data/currency";

export function Header(): React.ReactElement {
  return (
    <header
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <h1 style={{ flexGrow: "1" }}>Trending Products</h1>
      <span style={{ marginInlineEnd: "5px" }}>Currency:</span>
      <CurrencyPicker />
    </header>
  );
}

function CurrencyPicker(): React.ReactElement {
  const { currency, updateCurrency } = useCurrencyContext();

  return (
    <select
      value={currency.symbol}
      onChange={(e) => {
        const newCurrency = availableCurrencies.find(
          (c) => c.symbol === e.target.value
        );
        if (newCurrency) {
          updateCurrency(newCurrency);
        }
      }}
    >
      {availableCurrencies.map((c) => (
        <option key={c.symbol} value={c.symbol}>
          {c.symbol}
        </option>
      ))}
    </select>
  );
}
