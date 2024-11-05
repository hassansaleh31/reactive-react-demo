import React from "react";
import { useCurrencyContext } from "../context/CurrencyContext";

export const CurrencyPrice = React.memo(function CurrencyPrice({
  price,
}: {
  price: number;
}): React.ReactElement {
  const { currency } = useCurrencyContext();

  return (
    <>
      {currency.symbol} {(price * currency.rate).toFixed(2)}
    </>
  );
});
