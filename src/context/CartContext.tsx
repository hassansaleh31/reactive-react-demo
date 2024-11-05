import { BehaviorSubject } from "rxjs";
import { CartProduct } from "../data/cartProduct";
import { Product } from "../data/product";
import React from "react";

export interface CartState {
  cartProducts$: BehaviorSubject<CartProduct[]>;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
}

export function useCartContext(): CartState {
  const cartState = React.useContext(CartContext);

  if (cartState === null) {
    throw "Did not find CartContext, did you forget to add CartContext.Provider to the tree";
  }

  return cartState;
}

export const CartContext = React.createContext<CartState | null>(null);
