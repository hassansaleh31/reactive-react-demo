import "./App.css";
import { Cart } from "./components/Cart";
import { ProductListTile } from "./components/ProductListTile";
import { useProductList } from "./hooks/useProductList";
import { useCartProducts } from "./hooks/useCartProducts";
import { CartContext } from "./context/CartContext";

function App() {
  const { products, loading } = useProductList();
  const cartState = useCartProducts();

  return (
    <CartContext.Provider value={cartState}>
      <h1>Trending Products</h1>
      {
        <div className="page-wrapper">
          <div
            style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}
          >
            {loading
              ? "Loading..."
              : products.map((e) => {
                  return <ProductListTile key={e.id} product={e} />;
                })}
          </div>
          <div
            style={{ width: "320px", marginLeft: "20px", marginRight: "20px" }}
          >
            <Cart />
          </div>
        </div>
      }
    </CartContext.Provider>
  );
}

export default App;
