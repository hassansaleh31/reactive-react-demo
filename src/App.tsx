import "./App.css";
import { CartContextProvider } from "./context/CartContext";
import { CurrencyContextProvider } from "./context/CurrencyContext";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";

function App() {
  return (
    <CurrencyContextProvider>
      <Header />
      <CartContextProvider>
        <div className="page-wrapper">
          <ProductList />
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
      </CartContextProvider>
    </CurrencyContextProvider>
  );
}

export default App;
