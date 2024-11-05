import { useState } from "react";
import "./App.css";
import { Cart } from "./components/Cart";
import { ProductListTile } from "./components/ProductListTile";
import { useProductList } from "./hooks/useProductList";
import { CartProduct } from "./data/cartProduct";
import { Product } from "./data/product";

function App() {
  const { products, loading } = useProductList();
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

  const onRemoveProduct = (product: Product) => {
    const isOnlyOne =
      cartProducts.find((e) => e.product.id === product.id)?.quantity === 1;

    if (isOnlyOne) {
      setCartProducts(cartProducts.filter((e) => e.product.id != product.id));
    } else {
      setCartProducts(
        cartProducts.map((e) => {
          if (e.product.id === product.id) {
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

  return (
    <>
      <h1>Trending Products</h1>
      {
        <div className="page-wrapper">
          <div
            style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}
          >
            {loading
              ? "Loading..."
              : products.map((e) => {
                  const quantity =
                    cartProducts.find((p) => p.product.id === e.id)?.quantity ??
                    0;
                  return (
                    <ProductListTile
                      key={e.id}
                      product={e}
                      quantity={quantity}
                      onAdd={() => {
                        onAddProduct(e);
                      }}
                      onRemove={() => {
                        onRemoveProduct(e);
                      }}
                    />
                  );
                })}
          </div>
          <div
            style={{ width: "320px", marginLeft: "20px", marginRight: "20px" }}
          >
            <Cart products={cartProducts} />
          </div>
        </div>
      }
    </>
  );
}

export default App;
