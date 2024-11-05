import React from "react";
import "./ProductListTile.css";
import { Product } from "../data/product";

interface ProductListTileProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function ProductListTile({
  product,
  quantity,
  onAdd,
  onRemove,
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
        <div>
          <button disabled={quantity === 0} onClick={onRemove}>
            -
          </button>
          {` ${quantity} `}
          <button onClick={onAdd}>+</button>
        </div>
      </div>
    </div>
  );
}
