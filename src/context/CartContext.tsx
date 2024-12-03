import { CartProduct } from "../data/cartProduct";
import { Product } from "../data/product";
import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface CartState {
  cartProducts: CartProduct[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  removeAll: (productId: number) => void;
}

export type CartApi = Pick<
  CartState,
  "addProduct" | "removeProduct" | "removeAll"
>;

export function useCartContext(): CartProduct[] {
  const cartProducts = useContext(CartContext);

  if (cartProducts === null) {
    throw "Did not find CartContext, did you forget to add CartContextProvider to the tree";
  }

  return cartProducts;
}

export function useCartApi(): CartApi {
  const api = useContext(CartApiContext);

  if (api === null) {
    throw "Did not find CartApiContext, did you forget to add CartContextProvider to the tree";
  }

  return api;
}

export function useCartProducts(): CartState {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const onAddProduct = useCallback((product: Product) => {
    setCartProducts((currentValue) => {
      // check if product already in cart
      const isInCart = !!currentValue.find((e) => e.product.id === product.id);

      if (isInCart) {
        return currentValue.map((e) => {
          if (e.product.id === product.id) {
            return {
              product: e.product,
              quantity: e.quantity + 1,
            };
          }
          return e;
        });
      }

      return [
        ...currentValue,
        {
          product,
          quantity: 1,
        },
      ];
    });
  }, []);

  const onRemoveProduct = useCallback((productId: number) => {
    setCartProducts((currentValue) => {
      const isOnlyOne =
        currentValue.find((e) => e.product.id === productId)?.quantity === 1;

      if (isOnlyOne) {
        return currentValue.filter((e) => e.product.id != productId);
      }

      return currentValue.map((e) => {
        if (e.product.id === productId) {
          return {
            product: e.product,
            quantity: e.quantity - 1,
          };
        }
        return e;
      });
    });
  }, []);

  const onRemoveAll = useCallback((productId: number) => {
    setCartProducts((currentValue) =>
      currentValue.filter((e) => e.product.id != productId)
    );
  }, []);

  return {
    cartProducts,
    addProduct: onAddProduct,
    removeProduct: onRemoveProduct,
    removeAll: onRemoveAll,
  };
}

export function CartContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const { cartProducts, addProduct, removeAll, removeProduct } =
    useCartProducts();

  const apiState = useMemo<CartApi>(
    () => ({
      addProduct,
      removeAll,
      removeProduct,
    }),
    [addProduct, removeAll, removeProduct]
  );

  return (
    <CartContext.Provider value={cartProducts}>
      <CartApiContext.Provider value={apiState}>
        {children}
      </CartApiContext.Provider>
    </CartContext.Provider>
  );
}

const CartContext = createContext<CartProduct[]>([]);
const CartApiContext = createContext<CartApi | null>(null);
