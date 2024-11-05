import { BehaviorSubject } from "rxjs";
import React from "react";
import { Currency } from "../data/currency";

export interface CurrencyState {
  currency$: BehaviorSubject<Currency>;
  updateCurrency: (currency: Currency) => void;
}

export function useCurrencyContext(): CurrencyState {
  const currencyState = React.useContext(CurrencyContext);

  if (currencyState === null) {
    throw "Did not find CurrencyContext, did you forget to add CurrencyContext.Provider to the tree";
  }

  return currencyState;
}

export const CurrencyContext = React.createContext<CurrencyState | null>(null);
