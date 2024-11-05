import React from "react";
import { useCurrencyContext } from "../context/CurrencyContext";
import { useObservableState } from "../hooks/useObservableState";

export const CurrencyPrice = React.memo(function CurrencyPrice({
  price,
}: {
  price: number;
}): React.ReactElement {
  const { currency$ } = useCurrencyContext();

  const currency = useObservableState(currency$);

  return (
    <>
      {currency.symbol} {(price * currency.rate).toFixed(2)}
    </>
  );
});
