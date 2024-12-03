import React from "react";
import { useCartContext } from "../context/CartContext";
import { CartProductItem } from "./CartProductItem";
import { CurrencyPrice } from "./CurrencyPrice";

export function Cart(): React.ReactElement {
  return (
    <div style={{ position: "sticky", top: "0" }}>
      <h2>Cart</h2>
      <CartContent />
    </div>
  );
}

function CartContent(): React.ReactElement {
  const cartProducts = useCartContext();

  if (cartProducts.length === 0) return <span>Your cart is empty</span>;

  const total = cartProducts.reduce(
    (acc, cartProduct) =>
      acc + cartProduct.quantity * cartProduct.product.price,
    0
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {cartProducts.map(({ product }) => {
        return (
          <CartProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        );
      })}
      <div style={{ borderBottom: "1px solid", marginTop: "10px" }}></div>
      <CartTotal total={total} />
    </div>
  );
}

function CartTotal({ total }: { total: number }): React.ReactElement {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <span style={{ flexGrow: "1" }}>Total</span>
      <span>
        <CurrencyPrice price={total ?? 0} />
      </span>
    </div>
  );
}
