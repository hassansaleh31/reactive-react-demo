import { useEffect, useState } from "react";
import { Product } from "../data/product";

interface UseProductListReturn {
  products: Product[];
  loading: boolean;
}

export function useProductList(): UseProductListReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        if ("products" in res) {
          if (Array.isArray(res["products"])) {
            setProducts(
              res["products"].map((e) => ({
                id: e["id"],
                name: e["title"],
                category: e["category"],
                price: e["price"],
                thumbnail: e["thumbnail"],
              }))
            );
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    products,
    loading,
  };
}
