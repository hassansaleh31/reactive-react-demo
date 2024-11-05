import React, { useMemo } from "react";
import { useCartContext } from "../context/CartContext";
import { map } from "rxjs";
import { useObservableState } from "../hooks/useObservableState";

export interface CartProductItemProps {
  id: number;
  name: string;
  price: number;
}

export const CartProductItem = React.memo(function CartProductItem({
  id,
  name,
  price,
}: CartProductItemProps): React.ReactElement {
  const { cartProducts$ } = useCartContext();

  const quantity$ = useMemo(
    () =>
      cartProducts$.pipe(
        map(
          (cartProducts) =>
            cartProducts.find((cartProduct) => cartProduct.product.id === id)
              ?.quantity ?? 0
        )
      ),
    [cartProducts$, id]
  );
  const quantity = useObservableState(quantity$);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <span style={{ flexGrow: "1" }}>{name}</span>
      <span>
        ${price} x {quantity}
      </span>
    </div>
  );
});
