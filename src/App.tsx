import "./App.css";
import { Cart } from "./components/Cart";
import { ProductListTile } from "./components/ProductListTile";
import { useProductList } from "./hooks/useProductList";
import { useCartProducts } from "./hooks/useCartProducts";
import { CartContext } from "./context/CartContext";
import { useBehaviourSubject } from "./hooks/useBehaviourSubject";
import { Currency } from "./data/currency";
import { CurrencyContext } from "./context/CurrencyContext";
import { Header } from "./components/Header";

function App() {
  const { products, loading } = useProductList();
  const cartState = useCartProducts();
  const [currency$, updateCurrency] = useBehaviourSubject<Currency>({
    symbol: "$",
    rate: 1,
  });

  return (
    <CurrencyContext.Provider value={{ currency$, updateCurrency }}>
      <CartContext.Provider value={cartState}>
        <Header />
        {
          <div className="page-wrapper">
            <div
              style={{
                flexGrow: "1",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {loading
                ? "Loading..."
                : products.map((e) => {
                    return <ProductListTile key={e.id} product={e} />;
                  })}
            </div>
            <div
              style={{
                width: "320px",
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              <Cart />
            </div>
          </div>
        }
      </CartContext.Provider>
    </CurrencyContext.Provider>
  );
}

export default App;
