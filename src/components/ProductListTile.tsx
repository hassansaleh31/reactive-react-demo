import React, { useMemo } from "react";
import "./ProductListTile.css";
import { Product } from "../data/product";
import { map } from "rxjs";
import { useObservableState } from "../hooks/useObservableState";
import { useCartContext } from "../context/CartContext";

interface ProductListTileProps {
  product: Product;
}

export function ProductListTile({
  product,
}: ProductListTileProps): React.ReactElement {
  return (
    <div className="product-wrapper">
      <img src={product.thumbnail} className="product-image" />
      <div className="product-content">
        <p>{product.name}</p>
        <span>Category: {product.category}</span>
      </div>
      <div className="product-suffix">
        <p>${product.price}</p>
        <Actions product={product} />
      </div>
    </div>
  );
}

function Actions({ product }: { product: Product }): React.ReactElement {
  const { cartProducts$, addProduct, removeProduct } = useCartContext();

  const quantity$ = useMemo(
    () =>
      cartProducts$.pipe(
        map(
          (cartProducts) =>
            cartProducts.find(
              (cartProduct) => cartProduct.product.id === product.id
            )?.quantity ?? 0
        )
      ),
    [cartProducts$, product.id]
  );

  const quantity = useObservableState(quantity$) ?? 0;
  return (
    <div>
      <button
        disabled={quantity === 0}
        onClick={() => removeProduct(product.id)}
      >
        -
      </button>
      {` ${quantity} `}
      <button onClick={() => addProduct(product)}>+</button>
    </div>
  );
}
