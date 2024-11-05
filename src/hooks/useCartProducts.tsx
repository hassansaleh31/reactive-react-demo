import { useCallback } from "react";
import { CartState } from "../context/CartContext";
import { CartProduct } from "../data/cartProduct";
import { Product } from "../data/product";
import { useBehaviourSubject } from "./useBehaviourSubject";

export function useCartProducts(): CartState {
  const [cartProducts$, setCartProducts] = useBehaviourSubject<CartProduct[]>(
    []
  );

  const onAddProduct = useCallback(
    (product: Product) => {
      const cartProducts = cartProducts$.value;

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
    },
    [cartProducts$, setCartProducts]
  );

  const onRemoveProduct = useCallback(
    (productId: number) => {
      const cartProducts = cartProducts$.value;

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
    },
    [cartProducts$, setCartProducts]
  );

  return {
    cartProducts$,
    addProduct: onAddProduct,
    removeProduct: onRemoveProduct,
  };
}
