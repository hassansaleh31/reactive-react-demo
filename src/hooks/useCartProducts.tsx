import { useState } from "react";
import { CartState } from "../context/CartContext";
import { CartProduct } from "../data/cartProduct";
import { Product } from "../data/product";

export function useCartProducts(): CartState {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const onAddProduct = (product: Product) => {
    // check if product already in cart
    const isInCart = !!cartProducts.find((e) => e.product.id === product.id);

    if (isInCart) {
      setCartProducts(
        cartProducts.map((e) => {
          if (e.product.id === product.id) {
            return {
              product: e.product,
              quantity: e.quantity + 1,
            };
          }
          return e;
        })
      );
    } else {
      setCartProducts([
        ...cartProducts,
        {
          product,
          quantity: 1,
        },
      ]);
    }
  };

  const onRemoveProduct = (productId: number) => {
    const isOnlyOne =
      cartProducts.find((e) => e.product.id === productId)?.quantity === 1;

    if (isOnlyOne) {
      setCartProducts(cartProducts.filter((e) => e.product.id != productId));
    } else {
      setCartProducts(
        cartProducts.map((e) => {
          if (e.product.id === productId) {
            return {
              product: e.product,
              quantity: e.quantity - 1,
            };
          }
          return e;
        })
      );
    }
  };

  const onRemoveAll = (productId: number) => {
    setCartProducts(cartProducts.filter((e) => e.product.id != productId));
  };

  return {
    cartProducts,
    addProduct: onAddProduct,
    removeProduct: onRemoveProduct,
    removeAll: onRemoveAll,
  };
}
