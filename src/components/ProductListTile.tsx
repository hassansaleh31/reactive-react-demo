import React from "react";
import "./ProductListTile.css";
import { Product } from "../data/product";
import { useCartApi, useCartContext } from "../context/CartContext";
import { CurrencyPrice } from "./CurrencyPrice";

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
        <p>
          <CurrencyPrice price={product.price} />
        </p>
        <Actions product={product} />
      </div>
    </div>
  );
}

function Actions({ product }: { product: Product }): React.ReactElement {
  const cartProducts = useCartContext();

  const quantity =
    cartProducts.find((cartProduct) => cartProduct.product.id === product.id)
      ?.quantity ?? 0;

  return (
    <div>
      <RemoveButton disabled={quantity <= 0} id={product.id} />
      {` ${quantity} `}
      <AddButton product={product} />
    </div>
  );
}

const RemoveButton = React.memo(function RemoveButton({
  id,
  disabled,
}: {
  id: number;
  disabled: boolean;
}): React.ReactElement {
  const { removeProduct } = useCartApi();
  return (
    <button disabled={disabled} onClick={() => removeProduct(id)}>
      -
    </button>
  );
});

const AddButton = React.memo(function AddButton({
  product,
}: Pick<ProductListTileProps, "product">): React.ReactElement {
  const { addProduct } = useCartApi();

  return <button onClick={() => addProduct(product)}>+</button>;
});
