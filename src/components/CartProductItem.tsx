import React from "react";
import { useCartContext } from "../context/CartContext";
import { map } from "rxjs";
import { usePipedObserbaleState } from "../hooks/usePipedObservableState";
import { CurrencyPrice } from "./CurrencyPrice";

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
  const { removeAll } = useCartContext();

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <span style={{ flexGrow: "1" }}>{name}</span>
      <span>
        <CurrencyPrice price={price} />
      </span>
      <span style={{ marginInline: "5px" }}> {"x"} </span>
      <Quantity id={id} />
      <button
        style={{ marginInlineStart: "5px", color: "red" }}
        onClick={() => removeAll(id)}
      >
        x
      </button>
    </div>
  );
});

function Quantity({ id }: { id: number }): React.ReactElement {
  const { cartProducts$ } = useCartContext();

  const quantity = usePipedObserbaleState(
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

  return <span>{quantity}</span>;
}
