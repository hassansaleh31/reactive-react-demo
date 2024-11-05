import React from "react";
import { CartProduct } from "../data/cartProduct";

interface CartProps {
  products: CartProduct[];
}

export function Cart(props: CartProps): React.ReactElement {
  return (
    <div style={{ position: "sticky", top: "0" }}>
      <h2>Cart</h2>
      <CartContent {...props} />
    </div>
  );
}

function CartContent({ products }: CartProps): React.ReactElement {
  if (products.length === 0) return <span>Your cart is empty</span>;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {products.map((e) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span style={{ flexGrow: "1" }}>{e.product.name}</span>
            <span>
              ${e.product.price} x {e.quantity}
            </span>
          </div>
        );
      })}
      <div style={{ borderBottom: "1px solid", marginTop: "10px" }}></div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <span style={{ flexGrow: "1" }}>Total</span>
        <span>
          $
          {products
            .reduce((acc, p) => acc + p.quantity * p.product.price, 0)
            .toFixed(2)}
        </span>
      </div>
    </div>
  );
}
