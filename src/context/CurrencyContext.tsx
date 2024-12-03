import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Currency } from "../data/currency";

export interface CurrencyState {
  currency: Currency;
  updateCurrency: (currency: Currency) => void;
}

export function useCurrencyContext(): CurrencyState {
  const currencyState = useContext(CurrencyContext);

  if (currencyState === null) {
    throw "Did not find CurrencyContext, did you forget to add CurrencyContext.Provider to the tree";
  }

  return currencyState;
}

export function CurrencyContextProvider({ children }: { children: ReactNode }) {
  const [currency, updateCurrency] = useState<Currency>({
    symbol: "$",
    rate: 1,
  });

  const currencyState = useMemo<CurrencyState>(
    () => ({
      currency,
      updateCurrency,
    }),
    [currency, updateCurrency]
  );

  return (
    <CurrencyContext.Provider value={currencyState}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const CurrencyContext = createContext<CurrencyState | null>(null);
