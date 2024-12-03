import React from "react";
import { useProductList } from "../hooks/useProductList";
import { ProductListTile } from "./ProductListTile";

export function ProductList(): React.ReactElement {
  const { products, loading } = useProductList();

  return (
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
  );
}
