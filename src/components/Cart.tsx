import React from "react";
import { map } from "rxjs";
import { useCartContext } from "../context/CartContext";
import { CartProductItem } from "./CartProductItem";
import { usePipedObserbaleState } from "../hooks/usePipedObservableState";

export function Cart(): React.ReactElement {
  return (
    <div style={{ position: "sticky", top: "0" }}>
      <h2>Cart</h2>
      <CartContent />
    </div>
  );
}

function CartContent(): React.ReactElement {
  const { cartProducts$ } = useCartContext();

  const products =
    usePipedObserbaleState(
      () =>
        cartProducts$.pipe(
          map((cartProducts) =>
            cartProducts.map((cartProduct) => cartProduct.product)
          )
        ),
      [cartProducts$]
    ) ?? [];

  if (products.length === 0) return <span>Your cart is empty</span>;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {products.map((product) => {
        return <CartProductItem key={product.id} {...product} />;
      })}
      <div style={{ borderBottom: "1px solid", marginTop: "10px" }}></div>
      <CartTotal />
    </div>
  );
}

function CartTotal(): React.ReactElement {
  const { cartProducts$ } = useCartContext();

  const total = usePipedObserbaleState(
    () =>
      cartProducts$.pipe(
        map((cartProducts) =>
          cartProducts
            .reduce(
              (acc, cartProduct) =>
                acc + cartProduct.quantity * cartProduct.product.price,
              0
            )
            .toFixed(2)
        )
      ),
    [cartProducts$]
  );

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <span style={{ flexGrow: "1" }}>Total</span>
      <span>${total}</span>
    </div>
  );
}
